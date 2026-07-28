// Rasterize report PDFs into per-page WebP images for the "book" viewer.
//
// The rendering itself now lives in the read-as-book package
// (github.com/Ethical-Tech-CoLab/read-as-book), extracted from this script so
// any site can do the same. What remains here is our list of reports and the
// paths they live at.
//
// Usage:
//   node scripts/render-report-pages.mjs            # render every report
//   node scripts/render-report-pages.mjs <slug>     # render just one
//
// Per report <slug>:
//   Input:  public/publications/<slug>/report.pdf
//   Output: public/publications/<slug>/pages/pNN.webp + manifest.json
//           src/content/publications/<slug>-book.ts  (typed manifest module)
//
// Deps (already in the repo): pdfjs-dist, @napi-rs/canvas, sharp.

import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { access } from "node:fs/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

// Reports with a vendored report.pdf under public/publications/<slug>/.
const REPORTS = ["after-the-corridor", "what-is-ethical-ai"];

const cli = join(root, "node_modules/read-as-book/bin/render-pages.mjs");

/** after-the-corridor -> afterTheCorridorBook */
function exportName(slug) {
  const camel = slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  return `${camel}Book`;
}

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function renderReport(slug) {
  const base = join(root, "public/publications", slug);
  const pdfPath = join(base, "report.pdf");

  if (!(await exists(pdfPath))) {
    console.warn(`! skipping ${slug}: no report.pdf at ${pdfPath}`);
    return;
  }

  console.log(`\n▸ ${slug}`);
  const result = spawnSync(
    process.execPath,
    [
      cli,
      pdfPath,
      "--out", join(base, "pages"),
      // Manifest paths are web-root relative — how ReportBook asks for them.
      "--base", `publications/${slug}/pages`,
      "--ts", join(root, "src/content/publications", `${slug}-book.ts`),
      "--name", exportName(slug),
    ],
    { stdio: "inherit" },
  );
  if (result.status !== 0) {
    throw new Error(`read-as-book-pages failed for ${slug}`);
  }
}

async function main() {
  if (!(await exists(cli))) {
    throw new Error("read-as-book is not installed — run `npm install` first");
  }
  const only = process.argv[2];
  for (const slug of only ? [only] : REPORTS) {
    await renderReport(slug);
  }
  console.log("\n✓ done");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
