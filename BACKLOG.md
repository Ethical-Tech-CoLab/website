# Website backlog — what's still missing

Living checklist of open items. Everything not listed here is done and live at
<https://ethical-tech-colab.github.io/website/>. After adding any asset below,
run `npm run sync:static`, then commit + push (or ask me to).

Last updated: 2026-07-13.

---

## 1. Team headshots — ✅ complete

Every team member now has a headshot in `public/team/` (new ones are added by
dropping a file into the local "Pictures website" folder and converting it to
`public/team/<slug>.jpg`; filenames must match the `photo` path in `site.ts`).

*Done:* founder, advisors (incl. Teresa Cantero and Sylvia Maier), all Summer
2026 / Fall 2025 researchers, staff, collaborators, and all six Spring 2025
headshots (Smita Samanta, Elizabeth Matthews, Renata Gladkikh, Jennifer Hofmann,
Emily Harrington, Natasha Nagarajan).

## 2. Client & partner logos

Drop into `public/logos/` (auto-discovered by filename; falls back to a
monogram). See `public/logos/README.md`.

Clients:
- [ ] `generative-ai-for-good.png`
- [ ] `d-id.png`
- [ ] `mesur-io.png`
- [ ] `supplytrace.png`
- [ ] `rivr.png`
- [ ] `human-generated-by-blockapps.png`

Partners:
- [ ] `100x.png`
- [ ] `apne-aap-women-worldwide.png`
- [ ] `gaia.png`
- [ ] `grid-bank.png`

*Done:* Microsoft (`microsoft.svg`), NYU SPS + CGA (`nyu-sps-cga-logo.jpg`).

## 3. Client / partner details (`src/content/site.ts`)

- [ ] Website URLs for clients still blank: **Generative AI for Good**,
      **SupplyTrace**, **Rivr**. (D_ID, Mesur.io, BlockApps already linked.)
- [ ] Short "what we do together" blurbs + URLs for partners: **100x**,
      **Apne Aap Women Worldwide** (url set), **Gaia**, **Grid Bank**.

## 4. Live demos / project links

- [ ] **3D Online Gallery** — needs a hosted URL (Cultural-heritage project).
- [ ] **Arts Provenance Agent** — a static mock demo is live. PR
      [arts-provenance-agent#1](https://github.com/Ethical-Tech-CoLab/arts-provenance-agent/pull/1)
      is still open if you want the *full* server version (real SSE stream) on
      Render instead.
- [ ] **Provenance Search** — repo is public now, but it's a server app with no
      live demo yet (needs hosting).
- [ ] **Portfolio archive — missing live demos.** These previous-cohort projects
      have no live-demo link yet, so their card shows no `+` to expand. Add a
      `demo` (single URL), `demos` (list of `{label, href}`), and/or `repo` to
      the matching entry in `archivedProjects` (`src/content/site.ts`) and the
      `+`-to-open live demo appears automatically (as it now does for Forced
      Labor Structural Risk Index and Avatar Storytelling).
    - [ ] Online Grooming Prevention (Spring 2025)
    - [ ] ESG Labels & Certificates Transparency (Spring 2025)
    - [ ] AI's Carbon Footprint (Spring 2025)
    - [ ] Academic Research Tool (Fall 2025)

## 5. Publications (`src/content/site.ts` → `publications`)

Four academic-report cards are placeholders ("coming soon"). Add a `url` to each
as reports are published — the card auto-switches to a "Read report" button.
- [ ] Evacuation — *AI-Informed Evacuation Decision-Making*
- [ ] Cultural heritage — *Verifiable Provenance for the Ethical Return…*
- [ ] Traceability — *Making Ethical Supply-Chain Claims Verifiable*
- [ ] Diplomacy — *Rehearsing High-Stakes Diplomacy with Culturally Grounded AI Agents*

## 6. Social & newsletter

- [ ] **Newsletter** — real Mailchimp (or other) embed/URL to replace the
      placeholder in `newsletter`.
- [ ] **Instagram** — handle appears to be `@NYUSPS_ETHICALTECH_LAB` (from the
      summit deck); confirm and wire into `site.social`.
- [ ] **X / Twitter** — handle to confirm + wire (currently placeholder).
- [ ] **LinkedIn URLs** for collaborators **Adeline Daab** and **Susan DeMinil**.

## 7. Content polish / open decisions

- [ ] **Fall 2025 alumni bios** are short placeholders ("NYU student and Applied
      AI Researcher…") — swap in real bios when available.
- [ ] **Missing bios / resume blurbs** — team cards now show a short bio excerpt
      for everyone who has a `bio` in `src/content/site.ts`. These participants
      have none yet, so their cards (and profile pages) show no blurb: **Hannah
      Zhao, Kirsten Co, Alex Du, Adeline Daab, Susan deMenil**. Add a `bio` for
      each and it appears automatically.
- [ ] **Cohort project placeholders** (Spring 2025: AI's Carbon Footprint,
      Generative AI for Good; Fall 2025: Academic Research Tool — LLM prompting;
      Summer 2026: Synthetic Data Guidelines for Beginners) — add descriptions
      or links if you want them to be more than name-only bullets.
- [ ] **Alex Du & Hannah Zhao** were Spring 2025 fellows but are listed in their
      current roles (Staff / Collaborator), not under Spring 2025 Alumni. Decide
      whether to also list them there.
- [ ] **Notify past cohorts / alumni** — message old cohort members (Spring 2025,
      Fall 2025, and any earlier) to let them know their profile is now live on
      the website, so they can review it and flag any corrections.
- [ ] **About page is hidden** — the whole `/about` page is currently disabled
      (removed from the nav; the route serves a 404). Nothing is deleted: the
      full layout is preserved as comments in `src/app/about/page.tsx`, and all
      its content still lives in the `about` object in `src/content/site.ts`.
      Decide what to do with it, then restore by: (1) deleting the `notFound()`
      stub and uncommenting the component in `about/page.tsx`, and (2) re-adding
      `{ label: "About", href: "/about" }` to `nav` in `site.ts`.

## 8. Technical / infrastructure checks (project repos, not this site)

- [ ] **Tavily search — token/credit usage.** Confirm whether the searches that
      use Tavily are consuming tokens/credits, and how much, so usage doesn't
      run up unexpectedly.
- [ ] **ACLED API keys — evacuation projects.** Verify the ACLED API keys are
      still preserved (and valid) in the evacuation projects, so the data feeds
      don't silently break.
