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
- [ ] **Avatar Storytelling — deploy the code.** The Generative AI for Good /
      Avatar Storytelling project currently only has D-ID share links (four
      videos). Get the project code hosted so it has a real live demo + repo,
      then point `avatarStorytellingDemos` / the `avatar-storytelling` product
      at the deployed app instead of (or in addition to) the D-ID links.
- [ ] **Previous-cohort projects — gather missing links & content.** Track down
      the remaining repos, live demos, write-ups, and descriptions for earlier
      cohorts' projects (Spring 2025 and Fall 2025) so the archive cards and
      Live Demos page are complete rather than name-only.

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

---

## 9. Peer-review findings still open across the reports

Added 2026-07-23. The reports on this site are hand-transcribed from papers in
the project repos, so a finding closed in a repo is not closed here until the
copy in `src/content/publications/` is edited too. These are the ones still
genuinely open, i.e. not yet fixed anywhere.

- [ ] **ERUS reports no results** (`erus.ts`, and the paper in
      `India-EvacSimulation`). The report poses three research questions and
      answers none of them with a number: no worked scenario, no sensitivity
      curve values, no information-value ranking, no assignment matrix. The
      generator is seeded and deterministic, so one or two fully specified
      runs would fix it and would let the report answer its own questions
      rather than restate them. Backlogged in detail in that repo. Run it from
      the browser; the page's top-level code is DOM-bound and lifting the
      engine out is easy to get subtly wrong.
- [ ] **AI's Carbon Footprint: the thesis qualifier is never argued**
      (`ai-carbon-footprint.ts`, thesis / S1 / S7). The claim that mitigation
      can cut the footprint "without hindering its development and role in
      advancing society" is the clause that makes the report more than a
      polemic, and nothing in the body defends it. Needs engagement with the
      rebound problem, which the report's own "inference dominates at scale"
      argument implies, and with the possibility that binding regulation slows
      deployment. Either argue it or drop it.
- [ ] **Digital Provenance Passport: extend the permitted-source list**
      (`arts-provenance-agent`). The report and the source now both state the
      coverage bias plainly and name this as the first substantive extension.
      Adding the Getty Provenance Index, the German Lost Art Foundation,
      Interpol, and source-country heritage authorities changes what every run
      returns, so it needs validating against known cases rather than being
      bundled into a documentation pass. Once done, `digital-provenance-passport.ts`
      section 08 needs updating with it.
- [ ] **Diplomatic Simulator: the mixed-model comparison is n = 1**
      (`diplomatic-simulator.ts`, Limitations). Rotating tiers across seats,
      replicating, and a blind second coding of the red-line audit are what
      would turn documented instances into rates. Backlogged in that repo. The
      site's copy already states what the comparison does and does not license,
      so this only comes back here if the numbers change.
