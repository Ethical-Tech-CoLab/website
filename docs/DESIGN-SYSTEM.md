# Ethical Tech CoLab — Design System & Site Map

The complete, replicable specification for the ETC website (NYU CGA × Microsoft).
Every color, token, typeface, and structural rule is recorded here with its
rationale, so the identity can be rebuilt in any codebase, not just this Next.js app.

- **Source of truth for tokens:** [`src/app/globals.css`](../src/app/globals.css)
- **Fonts wired in:** [`src/app/layout.tsx`](../src/app/layout.tsx)
- **Nav & content model:** [`src/content/site.ts`](../src/content/site.ts)

Palette origin: the *Summer '26 Tech Rehearsal* deck — a near-black purple
ground, a signature lime accent, and an electric-violet glow. Dark is the
flagship theme; light is a daylight inversion that keeps the same identity.

---

## 1. Color

Colors are defined as CSS custom properties on `:root`/`[data-theme="dark"]`
and overridden under `[data-theme="light"]`. Components read them through the
`@theme inline` mapping (Tailwind v4), never as raw hex.

### 1.1 Dark theme (flagship, default)

| Token | Hex / value | Role |
|---|---|---|
| `--background` | `#120c1a` | Page ground — near-black purple |
| `--surface` | `#1b1226` | Raised surfaces, nav on scroll |
| `--card` | `#201630` | Card fills |
| `--secondary` | `#3b1878` | Deep purple fill / secondary emphasis |
| `--foreground` | `#f3eefb` | Primary text (near-white lilac) |
| `--muted` | `rgba(233,228,244,0.52)` | Secondary text |
| `--border` | `rgba(139,92,246,0.26)` | Purple-tinted hairline (matches deck panels) |
| `--border-strong` | `rgba(200,240,75,0.4)` | Lime-tinted emphasis border |
| `--accent` | `#c8f04b` | **Signature lime** — buttons, links, emphasis |
| `--accent-ink` | `#141414` | Near-black ink that sits ON lime |
| `--glow` | `#7b5cff` | Electric-violet radial glow |
| `--glow-2` | `#b8d400` | Olive secondary glow |
| `--grain-opacity` | `0.04` | Film-grain overlay strength |

### 1.2 Light theme (daylight inversion)

Keeps the purple/lime identity; the accent flips to a **darker olive** so it
stays legible on a light ground (lime-on-white fails contrast).

| Token | Hex / value | Role |
|---|---|---|
| `--background` | `#f5f2f9` | Page ground — faint lilac white |
| `--surface` | `#ffffff` | Raised surfaces |
| `--card` | `#ffffff` | Card fills |
| `--secondary` | `#e4dcf3` | Soft purple fill |
| `--foreground` | `#1a1020` | Primary text (near-black purple) |
| `--muted` | `rgba(26,16,32,0.6)` | Secondary text |
| `--border` | `rgba(59,24,120,0.18)` | Purple hairline |
| `--border-strong` | `rgba(95,107,0,0.5)` | Olive emphasis border |
| `--accent` | `#5f6b00` | Darker lime/olive for contrast on light |
| `--accent-ink` | `#ffffff` | White ink on the olive accent |
| `--glow` | `#6d28d9` | Violet glow |
| `--glow-2` | `#7c9a00` | Olive secondary glow |
| `--grain-opacity` | `0.03` | Slightly lighter grain on light |

### 1.3 Chart series (validated, per-theme)

Two categorical slots in fixed order, snapped to a step that clears the palette
checks against `--card`: lightness band, chroma floor, CVD separation, contrast.
The UI accent `#c8f04b` (L≈0.90) is too loud next to violet, so charts use a
**darker lime step**, re-validated per theme rather than flipped.

| Token | Dark | Light | Role |
|---|---|---|---|
| `--chart-1` | `#89a000` | `#5f6b00` | Series 1 (lime step) |
| `--chart-2` | `#7b5cff` | `#6d28d9` | Series 2 (violet) |
| `--chart-track` | `rgba(233,228,244,0.1)` | `rgba(26,16,32,0.1)` | Unfilled bar track |
| `--chart-wash` | `rgba(137,160,0,0.22)` | `rgba(95,107,0,0.18)` | Range wash |

### 1.4 Demo posters (intentionally NOT themed)

A poster is artwork; artwork doesn't invert when the page around it does. Held
dark in both modes so the catalogue wall reads as one set and titles keep
contrast. Light mode without these washed the posters to near-white.

| Token | Value | Role |
|---|---|---|
| `--poster-ground` | `#241a35` | Poster background (both themes) |
| `--poster-ink` | `#f3eefb` | Poster text |
| `--poster-ink-muted` | `rgba(233,228,244,0.62)` | Poster secondary text |
| `--poster-accent` | `#c8f04b` | Poster keeps the lime in both themes |
| `--poster-accent-ink` | `#141414` | Ink on poster accent |

### 1.5 Rules

- **`::selection`** paints `--accent` background with `--background` text.
- **`.display-em`** — the emphasis word inside a heading — is set in `--accent`.
- Theme is applied **pre-paint** by an inline script in `<head>` reading
  `localStorage.theme` (defaults to `dark`) to avoid a flash of the wrong theme.

---

## 2. Typography

Two Google fonts, loaded via `next/font/google` and exposed as CSS variables.

| Role | Family | Weight/style | Variable | Notes |
|---|---|---|---|---|
| Display / headings | **Bebas Neue** | 400 | `--font-bebas` → `--font-heading`/`--font-serif` | Condensed. `h1–h3` use it, `letter-spacing: 0.02em`, `font-weight: 400` |
| Body / UI / mono | **Space Mono** | 400, 700, normal + italic | `--font-space-mono` → `--font-sans`/`--font-mono` | Body font is the monospace — a deliberate editorial choice |

> Note: `--font-sans` **is** Space Mono. The site runs monospace body copy by
> design; there is no separate sans face.

### Fluid display scale (`clamp(min, vw, max)`)

| Class | Size | Line-height | Letter-spacing |
|---|---|---|---|
| `.fluid-hero` | `clamp(3.25rem, 11vw, 9rem)` | `0.9` | `-0.01em` |
| `.fluid-h2` | `clamp(2rem, 4.6vw, 3.5rem)` | `0.98` | — |

---

## 3. Atmosphere & effects

The "not-templated" layer. All defined in `globals.css`.

| Effect | Class / hook | What it does |
|---|---|---|
| Film grain | `body::after` | Tiled SVG turbulence, `mix-blend-mode: overlay`, opacity `--grain-opacity` |
| Photographic ground | `.site-bg` (+ `SiteBackground.tsx`) | Greenwich Village / NYU photo, grayscale ~0.74, opacity ~0.09, under a purple scrim |
| Ambient aura | `.aura` | Two blurred radial pools (`--glow`, `--glow-2`), blur 110px, rotate over 48s |
| Frosted glass | `.glass` | `backdrop-filter: blur(14px) saturate(1.3)`; solid `--background` fallback |
| Card cursor-glow | `.card-glow` | Lime radial follows cursor via `--mx/--my` |
| 3D tilt | `.tilt-scene` / `.tilt-card` / `.depth` / `.tilt-glare` | Perspective 900px, violet drop-shadow on hover, specular sheen |
| Wireframe globe | `.globe-*` | 280px, spins 14s; explicit 0→180→360 keyframes so it never renders static |
| CTA sweep | `.btn-sweep` | White gradient wipes across on hover |
| Link underline | `.link-underline` | Accent underline grows 0→100% on hover |
| Scroll/reveal | `.diagram-live`, `@keyframes reveal-up`, `Reveal.tsx` | Draw-in strokes, pop-in nodes, translateY reveals |

**Motion easing signature:** `cubic-bezier(0.16, 1, 0.3, 1)` (a soft overshoot),
used across sweeps, underlines, and diagram draws.

**Reduced motion:** `@media (prefers-reduced-motion: reduce)` collapses all
animation/transition durations to ~0; the aura stops; the globe keeps a slow
spin so it never reads as broken.

---

## 4. Layout tokens

| Concern | Value |
|---|---|
| Primary container | `max-w-6xl` (nav, most sections) |
| Reading measure | `max-w-2xl` (body copy — keeps ~65ch) |
| Wide content | `max-w-4xl` |
| Horizontal padding | `px-6` |
| Nav | `sticky top-0 z-50`, `.glass`, `border-b border-border`, `py-4` |
| Corner radius | pills (`rounded-full`) for nav items & CTAs; `rounded-xl` for menus/cards |
| Z-index ladder | site-bg `-1` · content `0` · aura `0` · nav `50` · grain `60` |

---

## 5. Site map

```
/                         Home — hero, mission/vision, research questions, cohorts, newsletter
│
├── /portfolio            Portfolio overview (research questions → projects explorer)
│     │  ── nav dropdown + SectionTabs mirror these four ──
│     ├── /demos          Live Demos catalogue (poster rail, per-theme + per-semester filters)
│     ├── /publications   Publications catalogue (filter by topic)
│     │     ├── /publications/after-the-corridor
│     │     ├── /publications/ai-carbon-footprint
│     │     ├── /publications/ai-models-research
│     │     ├── /publications/ai-research-assistant
│     │     ├── /publications/cerai
│     │     ├── /publications/digital-provenance-passport
│     │     ├── /publications/diplomatic-simulator
│     │     ├── /publications/ercf
│     │     ├── /publications/erus
│     │     ├── /publications/evacuation-inform-index
│     │     ├── /publications/evacuation-simulation
│     │     ├── /publications/forced-labor-structural-risk-index
│     │     ├── /publications/haste
│     │     ├── /publications/mariupol-severity-model
│     │     ├── /publications/provenance-search
│     │     ├── /publications/vango
│     │     └── /publications/what-is-ethical-ai
│     └── /media          Media & moments, past events
│
├── /team                 Team grid + alumni
│     └── /team/[slug]    Individual member page (dynamic)
│
├── /contact              Contact (header CTA button)
│
└── /about                PRESERVED but hidden from nav (page still exists)
```

### Navigation model (`src/content/site.ts` → `nav`)

- **Top nav:** Home · Portfolio (dropdown) · Team, plus a **Contact** pill CTA.
- **Portfolio** is the parent for Live Demos, Publications, and Media — shown as
  a hover dropdown in the header **and** a `SectionTabs` bar on the pages.
- **Cohorts** tab was removed (content moved to Home). **About** is hidden but
  the page is preserved.

### Content architecture

The site is content-driven: all copy lives in `src/content/site.ts` so pages
stay presentational. Key collections:

- `researchAreas` — 4 research questions (Evacuation, Cultural heritage,
  Traceability, Diplomacy), each with sub-projects.
- `publications` — the academic reports, grouped by `publicationTopics`.
- `products` — live demos, filtered by `productThemes` and `productTerms`.
- `archivedProjects` — earlier-cohort work.

---

## 6. How to replicate elsewhere

1. Copy the token blocks in §1 into a `:root` / `[data-theme="light"]` pair.
2. Load **Bebas Neue** (display) + **Space Mono** (body/UI) and map them to
   `--font-heading` and `--font-sans`.
3. Default to dark; apply theme pre-paint from `localStorage` to avoid a flash.
4. Style every element through the tokens — never raw hex.
5. Layer the atmosphere (§3) sparingly: grain + one aura + glass nav is the
   core "signature"; the rest is per-component seasoning.
6. Keep the accent as the single loud element; everything else stays quiet.
</content>
</invoke>
