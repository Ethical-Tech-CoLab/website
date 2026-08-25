# Performance analysis — image and asset weight

Measured on 2026-08-25 against `main` at `32e1ab9f` and the live site at
<https://ethical-tech-colab.github.io/website/>.

> **Status: Tier 1 and Tier 2 are done.** Every committed image was resized to
> its display size, and a budget check now runs in CI. Full-resolution originals
> remain in git history at `32e1ab9f` and earlier. The measurements below are
> kept as they were taken, so the "before" figures still describe the problem
> the change fixed; §8 records what actually shipped.

**Headline:** the site was heavy because **source images were published at their
original camera resolution and never resized**. `/team` shipped **8.5 MB**, of
which **7.6 MB was images**. It is now **2.1 MB**.

## 1. Why nothing is being optimized automatically

[`next.config.ts`](../next.config.ts) sets:

```ts
output: "export",
images: { unoptimized: true },   // GitHub Pages has no image optimization server
```

That second line is correct for a static export, but it has a consequence worth
stating plainly: **`next/image` does no work here.** It emits a plain `<img>`
pointing at the original file, with no resizing, no `srcset`, and no WebP/AVIF
negotiation. A 2644×2644 JPEG referenced through `next/image` is downloaded at
2644×2644.

Since the build will not resize anything, **the committed file *is* the served
file**. Sizing has to happen before commit.

## 2. How images are surfaced — three different paths

| Path | Used by | Lazy? | Resized? |
|---|---|---|---|
| `next/image` + `unoptimized` | page heroes, header logo | No — heroes use `priority` | No |
| Raw `<img loading="lazy">` | [TeamAvatar](../src/components/TeamAvatar.tsx), `/media`, `OrgShowcase`, `SlideDeck`, `IssueFrame` | Yes | No |
| CSS `background-image` | [SiteBackground](../src/components/SiteBackground.tsx), `RepoShowcase`, `PortfolioExplorer`, `DemoRunner` | **No — cannot be** | No |

The lazy `<img>` usage is good practice and is doing real work. The problem is
that all three paths ultimately serve **unscaled originals**.

The CSS `background-image` path deserves attention because a background image
cannot opt into `loading="lazy"`. Every poster and page background referenced by
a rendered element is fetched eagerly.

## 3. Measured page weight

Per-route totals from the built `out/` directory (HTML + JS/CSS + referenced images):

| Route | Total | Images | Code |
|---|---|---|---|
| `/team` | **8.5 MB** | 7,633 KB | 927 KB |
| `/demos` | 4.6 MB | 3,697 KB | 932 KB |
| `/media` | 3.5 MB | 2,615 KB | 918 KB |
| `/team/alex-du` | 2.6 MB | 1,730 KB | 918 KB |
| `/team/grace-driscoll` | 2.5 MB | 1,595 KB | 918 KB |
| `/` | 2.3 MB | 1,376 KB | 934 KB |
| `/portfolio` | 1.9 MB | 950 KB | 918 KB |

JavaScript (~920 KB uncompressed on disk) is **not** the problem. It is gzipped
in transit — a sampled chunk went 23,985 → 7,485 bytes (-69%), putting the real
JS cost near 300 KB. Images are the problem.

## 4. Findings, worst first

### 4.1 Team headshots are camera originals — the single biggest issue

Avatars render in a **48px** circle on `/team` (128px for the founder, 120px on
a profile page). A 256px file covers every one of those at 2× density.

| File | Actual | Weight | Rendered at |
|---|---|---|---|
| `team/alex.jpg` | 2644×2644 | **1,096 KB** | 48px |
| `team/grace.jpg` | 3201×3218 (9.8 MP) | **960 KB** | 48px |
| `team/mohagani.jpg` | 2701×2908 | **924 KB** | 48px |
| `team/amanda.jpg` | 1424×1441 | 467 KB | 48px |
| `team/alexa.jpeg` | 1883×1887 | 455 KB | 48px |

**26 of 27 avatars exceed 256px; all 27 together weigh 5.26 MB.** Re-encoded to
256px WebP they total **0.18 MB — a 97% reduction.** `alex.jpg` alone goes from
1,096 KB to about 5 KB.

This is a direct consequence of the documented intake process: headshots are
dropped in and converted, with no resize step
([`public/team/README.md`](../public/team/README.md)).

### 4.2 Hero photos are preloaded at full size

`/`, `/team`, and `/portfolio` each render a hero through `next/image` with
`priority`. Next turns that into a preload hint, verified in the built HTML:

```html
<link rel="preload" as="image" href="/website/nyu-subway.jpg"/>
```

That instructs the browser to fetch **548 KB** at high priority before almost
anything else — and the image is then covered by two darkening overlays. The
same applies to `nyu-w4.jpg` (534 KB) on `/portfolio`.

`priority` is the right instinct for an LCP element; the file behind it is the
problem. At 1920px WebP, `nyu-subway.jpg` is 113 KB (-79%).

### 4.3 Page backgrounds are full-resolution photos shown at 9% opacity

[`SiteBackground`](../src/components/SiteBackground.tsx) sets a per-section
photo as a CSS background. Per the design system it renders **grayscale ~0.74 at
~0.09 opacity** — a texture, not a picture.

`washington-square-arch-isabella.jpg` is **741 KB** (2000×1500) for that effect,
and loads eagerly on the landing page. All eight backgrounds total 2.99 MB and
compress to 1.09 MB at 1920px (-64%) — and could go far below that, because
almost no detail survives a 9%-opacity grayscale wash.

### 4.4 Project posters load eagerly as CSS backgrounds

27 posters totalling 3.37 MB, mostly 1440×900, displayed in small 2:3 cards.
Because they are CSS backgrounds they cannot be lazy-loaded, which is why
`/demos` reaches 4.6 MB. At a 600px budget they total 0.57 MB (-83%).

### 4.5 Opening a book downloads every page at once

The book viewer is well built for load: it is behind a click, and `page-flip` is
dynamically imported, so **none of the 58 MB of book pages affects normal page
load**. That is worth preserving.

However, `mountFlipbook` calls `flip.loadFromImages(pages)`, which creates an
`<img>` for **every** page immediately. Opening *What Is Ethical AI* pulls **46
pages / 8.7 MB** in one burst; *After the Corridor* pulls 4.6 MB.

Pages are rendered at `--scale 2` / `--quality 82` (≈150 dpi, 1190×1684). The
viewer caps page height at 1100 CSS px, so the extra resolution is only useful
on high-density screens. Re-rendering at a lower scale/quality **halves** the
payload: sampled pages went 258 KB → 128 KB.

### 4.6 A throwaway font lab is live in production

`/font-lab/` returns **HTTP 200** on the public site. It was added as "a
throwaway font lab for choosing the wordmark face" and pulls **three extra
Google font families** (Sixtyfour, Pixelify Sans, Silkscreen) — 18 `woff2`
files, 163 KB — that nothing else on the site uses.

It does not slow down other pages, but it is publicly reachable, publicly
indexable, and ships fonts the site does not use. The 18 `/print/<slug>/` routes
(build-time scaffolding for the book renderer) are likewise public.

### 4.7 GitHub Pages caching amplifies every byte

Verified against production:

```
Cache-Control: max-age=600      # on *everything*
```

Ten minutes — even for content-hashed `_next/static/*` assets that are safe to
cache forever. GitHub Pages does not allow custom headers, so **this cannot be
fixed**; it can only be designed around. Practically, a returning visitor
re-downloads the whole page, so the 8.5 MB `/team` page is paid repeatedly
rather than once.

This makes payload reduction unusually valuable here compared with a host where
`immutable` caching would absorb the cost.

Good news: HTML, JS, and CSS **are** gzipped in transit (verified). Images are
not compressible further, which is precisely why their dimensions matter so
much.

## 5. Projected result

Re-encoding to display-appropriate sizes, per asset class:

| Class | Files | Now | Optimized | Saved |
|---|---|---|---|---|
| Team avatars | 27 | 5.26 MB | 0.18 MB | **97%** |
| Project posters | 27 | 3.37 MB | 0.57 MB | **83%** |
| Page backgrounds | 8 | 2.99 MB | 1.09 MB | 64% |
| Summit photos | 13 | 2.07 MB | 0.89 MB | 57% |
| Root hero photos | 5 | 1.29 MB | 0.39 MB | 70% |
| Partner logos | 15 | 1.04 MB | 0.09 MB | 91% |
| **Total** | **95** | **16.01 MB** | **3.21 MB** | **80%** |

Per route:

| Route | Now | After | Cut |
|---|---|---|---|
| `/team` | 8.5 MB | **1.5 MB** | -94% images |
| `/demos` | 4.6 MB | 1.7 MB | -81% images |
| `/media` | 3.5 MB | 2.0 MB | -61% images |
| `/team/<person>` | 2.6 MB | 1.0 MB | -95% images |
| `/` | 2.3 MB | 1.3 MB | -81% images |
| `/portfolio` | 1.9 MB | 1.4 MB | -58% images |

These are measured re-encodes, not estimates.

## 6. Recommendations, in priority order

### Tier 1 — large win, no visible change, low risk

1. **Resize the team headshots to 256px.** Recovers 5.1 MB and takes `/team`
   from 8.5 MB to about 1.5 MB. Nothing on screen changes: the images are
   currently downscaled by the browser anyway.
2. **Resize the hero and background photos to ≤1920px** and re-encode. The
   backgrounds can go further still, since they render at 9% opacity in
   grayscale — quality there is nearly free to trade away.
3. **Resize the project posters to ~600px wide.** They display in small 2:3
   cards, and they load eagerly because they are CSS backgrounds.
4. **Keep the originals somewhere outside the deployed tree** before any
   re-encode. Re-encoding is lossy and irreversible; the backlog already records
   an earlier lossy poster re-crop as a regret.

### Tier 2 — process, so this does not recur

5. **Add an image budget to the contribution guide and the team-photo README**
   — e.g. avatars ≤256px, posters ≤600px, heroes/backgrounds ≤1920px, and a
   per-file ceiling of ~250 KB. The current intake process explicitly has no
   resize step, which is the root cause.
6. **Add a `scripts/optimize-images.mjs`** using `sharp` so contributors run one
   command rather than resizing by hand. Note that `sharp` is currently only
   available transitively through `next`; it should be an explicit
   `devDependency` if a script depends on it.
7. **Add a CI check that fails on oversized committed images.** This is the only
   durable fix — it catches the next 3201×3218 headshot automatically. It fits
   naturally into the pull-request CI proposed in
   [SITE-CONTROL-RECOMMENDATIONS.md](../SITE-CONTROL-RECOMMENDATIONS.md).

### Tier 3 — worthwhile, slightly more involved

8. **Serve responsive `srcset` for the few large heroes.** Because
   `unoptimized` disables Next's generation, this means emitting 2–3 widths per
   hero at build time and writing `srcset`/`sizes` by hand. Worth it only for
   the handful of genuinely large images.
9. **Re-render book pages at a lower scale/quality** (`--scale`/`--quality` are
   already CLI options). Halves a 4–9 MB burst when a reader opens a book.
10. **Lazy-load book pages** in `read-as-book` rather than
    `loadFromImages(all)` — load the current spread plus one either side. This
    is an upstream change in that package and the highest-effort item here.
11. **Remove `/font-lab` from the production build** once the wordmark is
    chosen, or exclude it from export. Same question for the 18 `/print/`
    routes, which exist to feed the book renderer rather than to be visited.

### Explicitly not recommended

- **Do not turn off `unoptimized`.** It is required for `output: "export"`; the
  build would fail or demand a runtime image server.
- **Do not chase the JS bundle.** At ~920 KB uncompressed and gzipped in
  transit, it is not what changed and not what is slow.
- **Do not try to fix caching with headers.** GitHub Pages does not permit it.
  The only lever is sending fewer bytes.

## 7. How these numbers were produced

- Dimensions parsed from JPEG/PNG/WebP headers for all 491 raster files.
- Per-route weight computed by scanning each built `out/**/index.html` for
  `<img>`, `srcset`, and CSS `url(...)` references and summing the real files.
- Savings measured by actually re-encoding with `sharp` at the display budget
  for each asset class — not estimated from a compression ratio.
- Production behaviour (status, `Content-Length`, `Cache-Control`,
  `Content-Encoding`) confirmed with live requests against GitHub Pages.

## 8. What shipped

Tier 1 and Tier 2 were implemented together.

**Result: 95 images, 16.01 MB -> 4.57 MB (-71%).** Measured page weight, which
includes ~920 KB of JavaScript per route that gzips to roughly 300 KB in
transit:

| Route | Before | After | Change |
|---|---|---|---|
| `/team` | 8.5 MB | **2.1 MB** | -76% |
| `/demos` | 4.6 MB | 2.4 MB | -48% |
| `/media` | 3.5 MB | 2.4 MB | -32% |
| `/` | 2.3 MB | 1.3 MB | -46% |
| `/portfolio` | 1.9 MB | 1.4 MB | -29% |
| `/team/<person>` | 2.6 MB | 1.1 MB | -60% |

The saving is smaller than the 80% projected in §5 because that projection
assumed conversion to WebP. Formats and filenames were deliberately left
unchanged: renaming `team/alex.jpg` would mean editing every reference in
`src/content`, and a missed one fails *silently* — `TeamAvatar` falls back to
initials rather than showing a broken image. Nearly all of the win comes from
the resize, so the risk was not worth the remaining few percent.

### How it is enforced

[`scripts/optimize-images.mjs`](../scripts/optimize-images.mjs) resizes in place
against a per-directory budget, and `npm run check:images` runs in CI. Adding a
2644px headshot now fails the pull request with the command that fixes it.

The script only touches files that break their budget, so it is idempotent and
never re-compresses a compliant file a second generation. It also applies EXIF
orientation before stripping metadata, which removes any GPS coordinates a
camera recorded.

### Two things worth knowing

**A bug this change nearly introduced.** sharp's `png({ effort })` and
`png({ palette })` options put libvips into a palette-quantizing path that
*silently drops the alpha channel* on some images. It dropped it on four logos.
`coinbase.png` is mostly transparent, so it would have arrived on the white logo
tile as a solid dark rectangle — while still passing the build, the byte budget,
and every automated check. The encoder now uses `compressionLevel` only, and
verifies after encoding that an image which had transparency still has it.

**Budgets are per-directory, with per-file overrides.** The root of `public/`
mixes hero photographs that need 1600px with small marks that do not:
`etc-logo.png` renders at 32px in the header on every page and was 238px / 87 KB.
`logos/microsoft-garage.png` is exempt outright — it is 696px but only 12 KB, and
every re-encode comes out larger.

Items 8-11 in §6 (responsive `srcset`, lower book render scale, lazy book pages,
removing `/font-lab`) were **not** done. They are tracked as UPD-015 and UPD-016
in [UPDATES-NEEDED.md](../UPDATES-NEEDED.md).
