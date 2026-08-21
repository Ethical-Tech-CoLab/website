// Build the "Read as book" pages for every report.
//
// Two reports (After the Corridor, What Is Ethical AI) ship a designed PDF of
// their own; those are used as-is. The rest are web-native, so their PDF is
// printed here from the site's own printable edition at /print/<slug>, using
// the copy of Chrome already on the machine. Either way the PDF then goes
// through scripts/render-report-pages.mjs, which rasterizes it to WebP pages.
//
// This is a local, one-off step, not part of `npm run build`: the page images
// and the generated <slug>-book.ts manifests are committed, so the deploy
// needs neither Chrome nor a PDF toolchain.
//
// Usage:
//   npm run render:books            # every report that needs one
//   npm run render:books <slug>     # just one
//   npm run render:books -- --force # re-print PDFs that already exist
//
// Per report <slug>:
//   /print/<slug>  ->  public/publications/<slug>/report.pdf
//                  ->  public/publications/<slug>/pages/pNN.webp
//                  ->  src/content/publications/<slug>-book.ts

import { spawn, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { access, mkdir, readdir, rm, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = join(root, "out");

// Reports whose PDF is authored elsewhere and vendored in. Never re-printed:
// the designed edition is better than anything this script would produce.
const VENDORED = new Set(["after-the-corridor", "what-is-ethical-ai"]);

const CHROME =
  process.env.CHROME_PATH ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".pdf": "application/pdf",
  ".txt": "text/plain; charset=utf-8",
};

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

/** The slugs the print route was built for, read back off the export. */
async function builtSlugs() {
  const entries = await readdir(join(outDir, "print"), { withFileTypes: true });
  return entries.filter((e) => e.isDirectory()).map((e) => e.name).sort();
}

/** Serve out/ so Chrome can load the page with its CSS, fonts and scripts. */
function serve(dir) {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      // A production export writes to out/ but links assets under the
      // "/website" base path, so serve that prefix from the same root.
      const url = decodeURIComponent((req.url ?? "/").split("?")[0]).replace(
        /^\/website(?=\/|$)/,
        "",
      );
      let path = join(dir, url);
      if (await exists(path)) {
        const s = await stat(path);
        if (s.isDirectory()) path = join(path, "index.html");
      } else if (await exists(`${path}.html`)) {
        path = `${path}.html`;
      }
      if (!(await exists(path))) {
        res.writeHead(404).end("not found");
        return;
      }
      const ext = path.slice(path.lastIndexOf("."));
      res.writeHead(200, { "content-type": MIME[ext] ?? "application/octet-stream" });
      createReadStream(path).pipe(res);
    });
    server.listen(0, "127.0.0.1", () => resolve(server));
  });
}

/** Print one printable edition to PDF with headless Chrome.
 *
 *  --headless=new writes the PDF and then keeps running, so the file itself is
 *  the completion signal: once it stops growing, the print is done and Chrome
 *  is shut down. */
function printToPdf(url, outPath, userDataDir) {
  return new Promise((resolve, reject) => {
    let settled = false;
    const finish = (err) => {
      if (settled) return;
      settled = true;
      clearInterval(watch);
      clearTimeout(hardStop);
      if (err) {
        try {
          child.kill("SIGKILL");
        } catch {}
        reject(err);
        return;
      }
      // Let Chrome wind down before the caller touches its profile.
      const done = () => resolve();
      child.once("exit", done);
      try {
        child.kill("SIGTERM");
      } catch {}
      setTimeout(() => {
        child.off("exit", done);
        try {
          child.kill("SIGKILL");
        } catch {}
        resolve();
      }, 5000);
    };

    const child = spawn(
      CHROME,
      [
        "--headless=new",
        "--disable-gpu",
        "--no-first-run",
        "--no-default-browser-check",
        `--user-data-dir=${userDataDir}`,
        "--no-pdf-header-footer",
        "--print-to-pdf-no-header",
        `--print-to-pdf=${outPath}`,
        // The page pulls webfonts and renders charts; give it room to settle.
        "--virtual-time-budget=20000",
        url,
      ],
      { stdio: "ignore" },
    );
    child.on("error", finish);
    child.on("exit", (code) =>
      finish(code === 0 || settled ? undefined : new Error(`Chrome exited ${code}`)),
    );

    let lastSize = -1;
    let stableFor = 0;
    const watch = setInterval(async () => {
      let size;
      try {
        size = (await stat(outPath)).size;
      } catch {
        return; // not written yet
      }
      stableFor = size > 0 && size === lastSize ? stableFor + 1 : 0;
      lastSize = size;
      if (stableFor >= 3) finish(); // ~3s unchanged
    }, 1000);

    const hardStop = setTimeout(
      () => finish(new Error(`timed out printing ${url}`)),
      180_000,
    );
  });
}

async function main() {
  const args = process.argv.slice(2);
  const force = args.includes("--force");
  const only = args.find((a) => !a.startsWith("--"));

  if (!(await exists(outDir))) {
    throw new Error("no out/ — run `npm run build` first");
  }
  if (!(await exists(CHROME))) {
    throw new Error(`Chrome not found at ${CHROME} (set CHROME_PATH)`);
  }

  const slugs = only ? [only] : await builtSlugs();
  const server = await serve(outDir);
  const { port } = server.address();

  const rendered = [];
  try {
    for (const slug of slugs) {
      const base = join(root, "public/publications", slug);
      const pdfPath = join(base, "report.pdf");
      await mkdir(base, { recursive: true });

      if (VENDORED.has(slug)) {
        if (!(await exists(pdfPath))) {
          console.warn(`! ${slug}: vendored PDF missing at ${pdfPath}`);
          continue;
        }
        console.log(`· ${slug}: using the vendored PDF`);
      } else if ((await exists(pdfPath)) && !force) {
        console.log(`· ${slug}: report.pdf already printed (--force to redo)`);
      } else {
        // basePath is "/website" in a production export.
        const url = `http://127.0.0.1:${port}/website/print/${slug}/`;
        console.log(`▸ ${slug}: printing ${url}`);
        // A fresh profile per print, outside the repo. Chrome is shut down
        // rather than allowed to exit, which leaves the profile locked, and it
        // refuses to start on a locked one (exit 21).
        const userDataDir = join(tmpdir(), `etc-print-${process.pid}-${slug}`);
        await mkdir(userDataDir, { recursive: true });
        try {
          await printToPdf(url, pdfPath, userDataDir);
        } finally {
          // Best effort: a straggling Chrome helper can still be writing here.
          await rm(userDataDir, { recursive: true, force: true }).catch(() => {});
        }
      }
      rendered.push(slug);
    }
  } finally {
    server.close();
  }

  // Rasterize each PDF into the page images the viewer flips through.
  for (const slug of rendered) {
    const result = spawnSync(
      process.execPath,
      [join(__dirname, "render-report-pages.mjs"), slug],
      { stdio: "inherit" },
    );
    if (result.status !== 0) throw new Error(`page render failed for ${slug}`);
  }

  await writeBooksRegistry(rendered);
  console.log(`\n✓ ${rendered.length} report(s) have a book view`);
}

/** Rewrite books.ts to cover every report with a generated manifest. */
async function writeBooksRegistry() {
  const dir = join(root, "src/content/publications");
  const manifests = (await readdir(dir))
    .filter((f) => f.endsWith("-book.ts"))
    .map((f) => f.replace(/-book\.ts$/, ""))
    .sort();

  const camel = (slug) => slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  const imports = manifests
    .map((s) => `import { ${camel(s)}Book } from "./${s}-book";`)
    .join("\n");
  const entries = manifests
    .map(
      (s) =>
        `  ${/^[a-z][a-zA-Z0-9]*$/.test(s) ? s : `"${s}"`}: {\n` +
        `    pages: [...${camel(s)}Book.pages],\n` +
        `    aspect: ${camel(s)}Book.aspect,\n` +
        `    pdf: "/publications/${s}/report.pdf",\n  },`,
    )
    .join("\n");

  const file = `// GENERATED by scripts/render-report-books.mjs — do not edit by hand.
//
// Registry of reports that have an old-school "book" view (a page-curl over the
// report's PDF, see ReportBook.tsx). Keyed by the report's slug so the report
// page and the /publications catalogue offer the book consistently.
//
// A report appears here once its pages have been rendered. Reports with a
// designed PDF use it directly; the rest are printed from their own printable
// edition at /print/<slug>.

${imports}

export type BookView = {
  pages: string[];
  aspect: number;
  /** The PDF these pages came from, under public/. */
  pdf: string;
};

export const bookViews: Record<string, BookView> = {
${entries}
};

/** Find a book view from a publication URL like "/publications/after-the-corridor". */
export function bookForUrl(url?: string): BookView | undefined {
  if (!url) return undefined;
  const match = url.match(/\\/publications\\/([^/?#]+)/);
  return match ? bookViews[match[1]] : undefined;
}
`;
  await writeFile(join(dir, "books.ts"), file);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
