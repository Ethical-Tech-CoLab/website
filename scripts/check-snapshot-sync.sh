#!/usr/bin/env bash
# Fail if static-site/ no longer describes src/.
#
# Run `npm run sync:static` first: this only reports what that left behind.
# CI runs the pair on every push to main and every pull request, and you can
# run the same pair locally before pushing:
#
#   npm run build && npm run sync:static && npm run check:snapshot
#
# --porcelain rather than `git diff`, so a page added to src/ without
# regenerating the snapshot is caught too: its new file under static-site/
# would be untracked, and untracked files are invisible to `git diff`.
#
# __next.* files are excluded. Next.js writes its RSC segment-cache prefetch
# payloads with a platform-dependent path shape: Linux emits a flat
# `about/__next.about.__PAGE__.txt`, Windows emits a nested
# `about/__next.about/__PAGE__.txt`. Same content, different layout, so a
# snapshot generated on one platform can never match a rebuild on the other.
# Everything else (HTML, JS, CSS, assets) is byte-identical across both.
# Tracked as UPD-004 in UPDATES-NEEDED.md.
set -euo pipefail

drift="$(git status --porcelain -- static-site | grep -v '/__next\.' || true)"

if [ -z "$drift" ]; then
  echo "static-site/ matches src/."
  exit 0
fi

echo "::error::static-site/ is out of sync with src/. Run 'npm run sync:static' and commit the result as a separate commit (see CONTRIBUTING.md section 4)."
echo "$drift"
exit 1
