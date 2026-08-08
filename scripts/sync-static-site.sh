#!/usr/bin/env bash
# Regenerate static-site/ as a 1:1 snapshot of the Next.js static export.
#
# The Next.js app in src/ is the single source of truth. `next build`
# (output: "export") emits a fully static site into out/, which is also what
# GitHub Pages deploys. This script mirrors that export into the tracked
# static-site/ directory so the two never drift.
#
# Usage:  npm run sync:static
set -euo pipefail
cd "$(dirname "$0")/.."

echo "▸ Building Next.js static export…"
npm run build

echo "▸ Snapshotting out/ → static-site/…"
rm -rf static-site
mkdir -p static-site
cp -R out/. static-site/

# `next build` mints a random build ID every run and stamps it into every
# prerendered document, so an un-normalized snapshot rewrites ~490 files on
# every sync. Pin it to a placeholder here (snapshot only — out/ keeps the real
# ID) so the diff shows just what actually changed.
node scripts/normalize-static-build-id.mjs

# Marker so it's obvious this directory is generated, not hand-edited.
cat > static-site/GENERATED.md <<'NOTE'
# Generated — do not hand-edit

Everything in this directory is a snapshot of the Next.js static export (`out/`),
produced by `npm run sync:static`. Edit the app in `src/` and re-run the script;
manual changes here will be overwritten on the next sync.

The Next.js build ID is rewritten to the fixed placeholder `static-snapshot`, so
regenerating this snapshot only changes files whose content actually changed.
The deployed site in `out/` keeps its real, unique build ID.
NOTE

echo "✓ static-site/ is now in sync with the Next.js export."
