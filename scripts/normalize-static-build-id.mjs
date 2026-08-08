#!/usr/bin/env node
/**
 * Normalize the Next.js build ID inside the tracked static-site/ snapshot.
 *
 * Why this exists
 * ---------------
 * `next build` mints a fresh random build ID on every run and embeds it in
 * every prerendered document (the `"b":"…"` field of the RSC payload) and in
 * the `_next/static/<buildId>/` directory name. Because of that, re-running
 * `npm run sync:static` rewrote ~490 files even when nothing had changed, which
 * buried real edits and made GitHub refuse to render the diff (>300 files).
 *
 * Replacing that ID with a fixed placeholder makes the snapshot byte-stable, so
 * a regenerated snapshot only differs where the site actually changed — and a
 * drift check becomes possible.
 *
 * This rewrites the snapshot only. `out/` is what GitHub Pages deploys and is
 * left untouched, so the published site keeps its real, unique build ID.
 */
import { existsSync, readFileSync, readdirSync, renameSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const PLACEHOLDER = "static-snapshot";

/** Only rewrite text formats; images and fonts are copied verbatim. */
const TEXT_EXTENSIONS = new Set([
  ".html", ".js", ".mjs", ".json", ".css", ".map", ".txt", ".rsc", ".xml", ".svg",
]);

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const snapshotDir = join(root, "static-site");
const buildIdFile = join(root, ".next", "BUILD_ID");

function fail(message) {
  console.error(`✗ normalize-static-build-id: ${message}`);
  process.exit(1);
}

if (!existsSync(snapshotDir)) fail(`${snapshotDir} does not exist — run the snapshot step first.`);
if (!existsSync(buildIdFile)) fail(`${buildIdFile} does not exist — run \`next build\` first.`);

const buildId = readFileSync(buildIdFile, "utf8").trim();
if (!buildId) fail("BUILD_ID is empty.");
if (buildId === PLACEHOLDER) {
  console.log("▸ Build ID is already normalized; nothing to do.");
  process.exit(0);
}

function walk(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (entry.isFile()) files.push(full);
  }
  return files;
}

let rewritten = 0;
for (const file of walk(snapshotDir)) {
  const dot = file.lastIndexOf(".");
  if (dot === -1 || !TEXT_EXTENSIONS.has(file.slice(dot).toLowerCase())) continue;

  const original = readFileSync(file, "utf8");
  if (!original.includes(buildId)) continue;

  writeFileSync(file, original.split(buildId).join(PLACEHOLDER));
  rewritten++;
}

// The build ID is also a directory name under _next/static/.
const buildIdDir = join(snapshotDir, "_next", "static", buildId);
if (existsSync(buildIdDir)) {
  renameSync(buildIdDir, join(snapshotDir, "_next", "static", PLACEHOLDER));
}

console.log(`▸ Normalized build ID ${buildId} → ${PLACEHOLDER} in ${rewritten} file(s).`);
