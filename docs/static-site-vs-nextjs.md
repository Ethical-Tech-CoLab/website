# Next.js app vs. `static-site/` mirror — what to do about the duplication

## The problem

This repo currently contains two independent copies of the same design:

1. **The Next.js app** (`src/app/`, `src/components/`, `src/content/site.ts`) — the real source, built with `next build`. `next.config.ts` already sets `output: "export"`, so this build already emits a fully static site into `out/`, deployed to GitHub Pages at `https://ethical-tech-colab.github.io/website/`.
2. **`static-site/`** — a hand-authored plain HTML/CSS/JS mirror (`index.html`, `about.html`, `cohorts.html`, `contact.html`, `portfolio.html`, `team.html`, `assets/site.css`, `assets/site.js`). It was added in commit `d850623` explicitly as "a hand-authored 6-page HTML/CSS/JS mirror of the app... for design reference outside the Next.js build" — i.e. a convenience so the design could be previewed without running `npm run dev`/`build`.

**There is no build step or sync tool connecting the two.** Editing a component like `src/components/SiteHeader.tsx` has zero effect on `static-site/index.html` — someone has to manually port the change over. Recent commits (e.g. `8b0a6be`, `5292433`) show this has already caused the two to be edited in parallel by hand, which is error-prone and doubles the work for every change.

**Additional wrinkle found mid-discussion:** GitHub Pages' repo setting is currently configured as **"Deploy from a branch"**, pointing directly at `static-site/index.html` — meaning the site currently live is the hand-authored mirror, not the Next.js export (`out/`), even though `next.config.ts` was clearly set up assuming the export would be what's deployed.

## Options considered

1. **Delete `static-site/`, keep only Next.js.** Rely on the existing `output: "export"` config — `next build` already produces a real static site in `out/`. Single source of truth, no more manual duplication. Loses the "just open an HTML file, no build step" convenience for quick design previews.

2. **Delete the Next.js app, keep only `static-site/`.** Simplest possible stack, no Node/build dependency. Loses TypeScript, the centralized copy source (`src/content/site.ts`), component reuse, and whatever client-side interactivity currently lives in React components (e.g. `PortfolioExplorer.tsx`, `ResearchersExplorer.tsx` — worth auditing before going this route). Also throws away the GitHub Pages export pipeline already built into `next.config.ts`.

3. **Keep both, but make `static-site/` a *generated* artifact instead of hand-edited** — e.g. a script that runs `next build` and post-processes `out/` into `static-site/`'s format, or generates the HTML pages from `src/content/site.ts`. Keeps the "plain HTML for quick preview" convenience without manual duplication, at the cost of building/maintaining that generator script.

4. **Keep both, hand-maintained, but formalize the workflow** (e.g. a checklist to always update both together). No architecture change, least effort now, but the exact problem being discussed here persists indefinitely.

## Open question: GitHub Pages source setting, if pursuing option 3

Switching GitHub Pages' **Source** setting to **"GitHub Actions"** is *not* required by option 3 — it's an independent decision about *where the generation step runs*:

- **Stay on "Deploy from a branch"** (current setting): run the generator locally, commit the resulting `static-site/` files, push as normal. No workflow needed. Downside: generated HTML shows up as regular diffs in git history, and it's on you to remember to regenerate before pushing.
- **Switch to "GitHub Actions"**: a workflow builds/generates the static output on every push and publishes it directly as the deploy artifact — nothing generated needs to be committed at all. Cleaner long-term, but requires writing a `.github/workflows/*.yml` and changing the repo setting.

**Flag either way:** `static-site/index.html` references `../public/etc-logo.png` (a relative path assuming `public/` is a sibling directory). That currently works because GitHub Pages is serving the whole repo. If the deploy source changes to the Next.js export (`out/`) instead, asset paths/structure will differ and need reconciling.

## Status

No decision made yet — this doc captures the discussion for reference. Next step is to decide between options 1–4 above.
