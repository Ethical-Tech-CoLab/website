# Website backlog — what's still missing

Living checklist of open items. Everything not listed here is done and live at
<https://ethical-tech-colab.github.io/website/>. After adding any asset below,
run `npm run sync:static`, then commit + push (or ask me to).

Last updated: 2026-07-23.

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

These render in the **Partners & collaborators** band at the bottom of `/team`.
They used to live only on `/about`, which is hidden (§7), so until 2026-07-23
any logo added here appeared nowhere.

That band is **one merged list** of 19 organisations — founding partners first,
then everyone else. `about` still stores founding partners, clients, and
partners as three separate arrays because the hidden `/about` page renders them
that way; `/team` concatenates them. The "Clients" grouping was dropped from the
public view on 2026-07-23: the client/partner split was not a distinction worth
making to a visitor. If `/about` is ever restored, decide whether it should
match `/team` or keep the three-way split.

Still showing a monogram (no file yet):
- [ ] `mesur-io.*`
- [ ] `supplytrace.*`
- [ ] `human-generated-by-blockapps.*`
- [ ] `osce-odihr-anti-trafficking.*`
- [ ] **Better source files for the two screenshot logos** — Art & Antiquities
      Blockchain Consortium and Blockchain for Social Impact were supplied as
      screen grabs, so they carry their page background (cream and white) rather
      than transparency, and cannot scale cleanly. Ask each for a PNG/SVG on
      transparent.
- [ ] **Sayari renders small** — the supplied wordmark is ~5.7:1, so inside the
      56px square tile it lands about 56×10px. A stacked or icon-only mark would
      read better.

*Done:* Microsoft (`microsoft.svg`), NYU SPS + CGA (`nyu-sps-cga-logo.jpg`),
and added 2026-07-23 from the local "Partners Logos" folder — Generative AI for
Good, D_ID, Rivr, 100x, Apne Aap Women Worldwide, Gaia, Grid Bank — plus
Sayari, Art & Antiquities Blockchain Consortium, and Blockchain for Social
Impact, which were new organisations and needed `partners` entries too. Each is
wired to an explicit `logo:` path in `site.ts` so the browser skips the
extension-probe fallback. Gaia's supplied file was near-white on transparency
and would have been invisible on the white logo tile, so it was recoloured to
the light-theme ink (`#1a1020`); swap in a dark-on-transparent original if the
brand team provides one.

Added later the same day: **NYU SPS** now has its own SPS lockup
(`/logos/nyu-sps.jpg`, trimmed from a wide export and re-centred on NYU purple)
— it had been pointing at the CGA logo, so the school and the centre showed the
same mark. **Coinbase** and **x402 Foundation** were split out of a single
"Coinbase & x402 Foundation" entry so each could carry its own logo. **UN
Commission on the Status of Women (CSW)** was removed from partners entirely.

## 3. Client / partner details (`src/content/site.ts`)

- [ ] Website URLs for clients still blank: **Generative AI for Good**,
      **SupplyTrace**, **Rivr**. (D_ID, Mesur.io, BlockApps already linked.)
- [ ] Short "what we do together" blurbs + URLs for partners: **100x**,
      **Apne Aap Women Worldwide** (url set), **Gaia**, **Grid Bank**.
- [ ] **Confirm the collaboration for the three partners added 2026-07-23** —
      **Sayari**, **Art & Antiquities Blockchain Consortium**, and **Blockchain
      for Social Impact**. Their `about` text currently describes what each
      organisation *does*, sourced from its own site, because the CoLab's actual
      relationship with each was not confirmed. Rewrite each as a "what we do
      together" line (as OSCE/ODIHR and Coinbase have) once known — and check
      they belong under Partners rather than Clients.

## 4a. Poster art (`public/repos/<key>.jpg`)

Posters render in a **2:3 portrait** frame with `bg-cover bg-top`, in all three
places they appear (`RepoShowcase`, `PortfolioExplorer`, `DemoRunner`). A
1440×900 screenshot dropped in that frame shows only its **centre 42%**, so any
screenshot with a flush-left headline gets sliced mid-word.

Eleven posters were re-cropped left-anchored to 600×900 on 2026-07-23 — the
four new project ones (Provenance Search, Digital Passport for Artworks, AI's
Carbon Footprint, AI Research Question Assistant) and all seven practice-guide
ones. The wide originals are in git history, in the commits that first added
them.

- [ ] **The other 16 posters are still wide** and centre-cropped. Most read
      acceptably (War-Games and Avatar Storytelling centre well; MVDC shows its
      map), so this is a look-and-see pass, not a defect list. Check each in the
      2:3 frame before deciding.
- [ ] **Consider a `posterFocus` field instead.** Re-cropping is lossy and has
      to be redone if the frame ratio ever changes. A `"left" | "center"` field
      on `Product` / `RunnableDemo`, mapped to `background-position` in the
      three components, would keep the wide originals and fix the framing in
      CSS. Not done on 2026-07-23 only because it touches five files and the
      site was being presented that day.
- [ ] **Synthetic Data & Seeding Models** has a *centred* title slide, so no 2:3
      crop shows the whole title. It reads "Synthetic Da…" left-anchored. A
      re-shot portrait screenshot is the only real fix.

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

## 5. Publications (`src/content/site.ts` → `publications`) — ✅ complete

The four umbrella placeholder cards (indices 01–04: *AI-Informed Evacuation
Decision-Making*, *Verifiable Provenance for the Ethical Return…*, *Making
Ethical Supply-Chain Claims Verifiable*, *Rehearsing High-Stakes Diplomacy…*)
were removed on 2026-07-23. Each promised a synthesis report that did not
exist, and every area they covered is served by published reports already on
the site — Evacuation by 07–12 and 27, Cultural heritage by 13–15, Traceability
by 16, Diplomacy by 17. Every catalogue entry now has a report behind it.

Two consequences worth knowing:
- The **"In preparation" filter chip** on `/publications` was removed with them
  — with nothing unpublished left it returned an empty page. Restore it
  alongside the first entry that ships without a `url`.
- **"Readable now"** now filters on `readable()` (has a url *and* is not
  `access: "internal"`), not on `url` alone, so it excludes the seven CoLab-only
  guides rather than matching everything.

`index` is a React key and cover-art seed only, never displayed, so the 01–04
gap is invisible — do not renumber, it would reshuffle every cover.

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
- [ ] **Summer 2026 cohort card says "Four projects" over five bullets**
      (`cohorts` in `src/content/site.ts`). The heading was corrected to four on
      2026-07-23 to match the four research areas on `/portfolio`, and keeping
      all five bullets was a deliberate call — AI Models Research is cohort work
      but not one of the four portfolio questions. Either drop that bullet, or
      reword the heading so the count is not read as a count of the list.
- [ ] **Notify past cohorts / alumni** — message old cohort members (Spring 2025,
      Fall 2025, and any earlier) to let them know their profile is now live on
      the website, so they can review it and flag any corrections.
- [ ] **Dead reference link — UN R2P** (`after-the-corridor.ts`). The citation
      "UN Office on Genocide Prevention and the Responsibility to Protect…"
      points at `.../about-responsibility-to-protect.shtml`, which 404s since
      un.org migrated off `.shtml`. Three sibling dead links were fixed on
      2026-07-23 (Copernicus EMS → `rapidmapping.emergency.copernicus.eu`,
      Meta → the 2024 sustainability report, UCI → the guide root), but un.org
      blocks automated requests with a redirect loop, so the replacement could
      not be verified from the CLI. Open it in a browser, grab the current URL,
      and paste it in.

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

### Left open by the favicon sweep (2026-07-23)

All twenty ETC Pages sites now serve the purple ETC mark as `etc-icon.svg` +
`etc-icon.png`, verified live. These are the things that pass could not settle.

- [ ] **FLSRI: subresource-integrity hardening is committed but not deployed**
      (`forced-labor-structural-risk-index`). `main`'s `public/` adds SRI
      `integrity`/`crossorigin` attributes to the Leaflet and topojson CDN tags,
      and pins topojson to 3.1.0; the `gh-pages` branch has none of it. The
      favicon went onto `gh-pages` on its own rather than shipping that change
      as a side effect, so five files (`index.html`, `bundle.html`,
      `pages/explore.html`, `pages/profiles.html`, `pages/simulate.html`) still
      differ between the two branches. Deploying `public/` → `gh-pages` is a
      call for whoever wrote the hardening.
- [ ] **grant-valuation-tool cannot be rebuilt from source.** The `gh-pages`
      branch holds a Next.js static build, but the repo has no
      `output: "export"`, no deploy script, and no workflow — the branch was
      pushed by hand, so nothing regenerates it. The favicon was applied to the
      branch directly for that reason; `src/app/icon.svg` on `main` only helps
      once a real build path exists. Worth adding an export config + deploy
      workflow before the next content change, or the branch drifts further
      from source.
- [x] **arts-provenance-agent: watchlist and methodology — ✅ shipped.** The
      stolen-art watchlist landed via PR #6 and the limits copy via PR #7. A
      Methodology tab was added on 2026-07-23 (run order, every source and how
      each is actually reached, metadata, scoring, watchlist query, passport
      signature, payment, limits), and `gh-pages` was republished, so the live
      site is current. Two things that page now states publicly are worth
      carrying into the write-ups if they are not there yet: the web pipeline
      still runs the non-canonical deduction scorer, and the catalogue's
      confidence scores are researched by hand rather than computed.
- [ ] **The `gh` token has no `workflow` scope.** Any push touching
      `.github/workflows/*` in an ETC repo is rejected outright. It forced a
      redesign in `ercf` (the icon href is relative so no build-time rewrite is
      needed, which is the better fix anyway) but it will block the next
      workflow change. Re-authorise with `workflow` scope when convenient.
- [ ] **ethicaltechlab.org did not resolve.** The live site answered on
      <https://ethical-tech-colab.github.io/website/>; the apex domain returned
      nothing when tested on 2026-07-23. Could be local network rather than DNS,
      but worth confirming the custom domain is still pointed and the CNAME set,
      since the site's `metadataBase` names it.
- [ ] **provenance-search's Pages site is only a redirect.** What GitHub serves
      is a meta-refresh to a Railway app, so the URL dead-ends if that app ever
      lapses. Both pages carry the icon, but the redirect is worth revisiting —
      a static snapshot would survive Railway going away.

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

---

## 10. UX/UI review — 2026-07-23

An expert-review pass over every page, run against the core user task for each
surface, looking at usability heuristics, cognitive load and flow, and basic
accessibility.

**Method and its limits.** This was read from source and built HTML, not from a
browser session with real users, so it catches structural and heuristic problems
rather than anything you would only learn from watching someone use the site.
Three claims were checked empirically rather than assumed, and one of them came
back negative — noted inline. Nothing here is a defect in the sense of "broken";
the site builds clean and every link resolves. These are friction points.

### 10.1 Site-wide chrome

*Core task: get oriented and reach the thing you came for.*

**The breakdown**

1. **The intro curtain blocks the home page on every fresh load.**
   `IntroCurtain` renders a full-screen overlay, sets `body.overflow = "hidden"`,
   and waits for a click — with a 5-second failsafe that dismisses it if no
   click lands. There is no persistence, so a returning visitor pays the toll
   every full page load, and someone arriving from search hits a logo before
   the content they were promised. This is a "user control and freedom"
   violation: the site decides when the visitor may proceed.
2. **Its dismiss target is a `div`, not a button.** `role="button"` plus
   `tabIndex={0}` plus a hand-rolled Enter/Space handler reimplements what a
   real `<button>` does natively, and does it slightly differently for assistive
   tech.
3. **"Tap to enter" assumes a touchscreen.** On desktop — where most of a
   conference or funder audience will see it — the instruction names a gesture
   that does not exist.
4. **`/about` returns a 404.** For an organisation's site, About is the first
   place a new visitor looks to answer "who are you and why should I trust
   this". Any external link or search result pointing there hard-fails. See §7.
5. **The newsletter block is a control that cannot be operated.** A disabled
   email input next to a "Coming soon" button reads as a form, invites a click,
   and returns nothing. A dead control is worse than no control.

**Actionable fixes**

1. Gate the curtain on first visit only: set a `localStorage` flag on dismiss
   and skip it when present. One `useEffect`, no layout change. If it should
   stay on every load, cut the failsafe to ~1.5s so it never feels like a wait.
2. Add a visible skip affordance — a small "Skip →" in a corner — so the exit
   is discoverable rather than "click anywhere and hope".
3. Swap the `motion.div` for `motion.button`; drop the manual key handler and
   the `role`/`tabIndex` pair. Fixes the a11y semantics and clears the
   `set-state-in-effect` lint error in one edit.
4. Change the label to "Enter" or "Click to enter", or detect a coarse pointer
   and vary the word.
5. Decide `/about` (§7). If it stays hidden, at minimum make `/about` redirect
   to `/team` rather than 404, so the URL is not a dead end.
6. Until Mailchimp is wired (§6), replace the newsletter form with a single
   "Email us to be added" link to `site.email`. Restore the form when the
   action URL exists.

### 10.2 `/demos` — Live Demos

*Core task: find a demo and run it.*

**The breakdown**

1. **On a phone there is no sign the rails scroll.** The arrow buttons are
   `hidden sm:flex`, and the rail hides its scrollbar (`no-scrollbar`). A rail
   can hold nine posters; a phone shows about two. Everything past the second
   is undiscoverable unless the visitor happens to swipe a region that looks
   like a static card. This is the single biggest flow problem on the site.
2. **The primary call to action is invisible on touch.** The "▶ Run" badge is
   `opacity-0` until `group-hover` or `group-focus-visible`. Touch devices have
   neither. A mobile visitor sees a poster with a "Live" chip and no instruction
   that pressing it runs anything.
3. **Two filter rows, no combined reset.** Semester and Theme are independent,
   and clearing both means finding "All" in each row. After filtering into an
   empty result the visitor gets "No demos match those filters" with no button
   to undo it.
4. **The runner has no failure state.** `DemoRunner` drops the URL into an
   `<iframe>` with no `onError` and no timeout. *Checked: none of the current
   hosts — Railway, Vercel, Netlify, GitHub Pages, D-ID — send
   `X-Frame-Options` or a `frame-ancestors` CSP, so nothing is broken today.*
   But the day any host adds one, the visitor gets a blank white pane and no
   explanation, on the page the site is proudest of.
5. **`sandbox="allow-scripts allow-same-origin"` is not a sandbox.** Those two
   tokens together let framed content reach its own origin and remove its own
   sandboxing. Low risk while every frame is CoLab-owned, but it is not
   providing the protection its presence implies.

**Actionable fixes**

1. Show the rail's overflow on small screens: either reveal the scrollbar below
   `sm`, or fade the right edge with a gradient mask whenever `atEnd` is false —
   an edge fade is the cheapest honest "there is more this way" signal.
2. Render the arrows at all breakpoints. They are already positioned and
   already hide themselves when the rail fits, so dropping `hidden sm:flex` is
   close to a one-word change.
3. Make the "Run" badge permanently visible on coarse pointers —
   `@media (hover: none) { opacity: 1 }` — or simply always show it on cards
   that are `live`. The scrim already guarantees it will read.
4. Add a "Clear filters" chip that appears only when a filter is active, and
   put the same action inside the empty state so the dead end has an exit.
5. Give the iframe an `onError` and a load timeout that swaps in a short
   message plus the "Open in new tab" link that already exists in the control
   bar. The escape hatch is built — it just is not reachable from the failure.
6. Drop `allow-same-origin`, or drop `sandbox` entirely and say plainly in a
   comment that these are first-party frames. The middle position is the one
   that misleads.

### 10.3 `/publications`

*Core task: find the report answering a question you have.*

**The breakdown**

1. **The first shelf is the one most visitors cannot open.** `publicationTopics`
   puts "Guidelines" first, and all seven guides are `access: "internal"`,
   pointing at private repos. The catalogue opens on a row of things that turn
   the visitor away.
2. **Same rail-discoverability problem as §10.2** — `PublicationsShowcase` uses
   the same `PosterRail`, so every fix there applies here.
3. **The status filter is now two near-identical chips.** Since every entry has
   a `url`, "All" and "Readable now" differ only by the seven internal guides.
   Two controls that produce almost the same list invite a pointless click.
4. **27 entries across 7 rails is a lot of vertical travel** with no way to jump
   to a topic other than the filter chips at the top, which scroll away.

**Actionable fixes**

1. Move "Guidelines" to the end of `publicationTopics`, or split it below a
   "For CoLab members" rule so the public work leads. One array reorder.
2. Apply the §10.2 rail fixes — they are shared components, so both catalogues
   improve at once.
3. Either relabel the pair to something with an obvious difference ("Everything"
   / "Public reports only"), or drop the status row and mark the guides visually
   in the rail instead.
4. Make the topic chips sticky under the header, so the way to jump shelves
   stays reachable at any scroll depth.

### 10.4 `/portfolio`

*Core task: understand what the cohort is working on.*

**The breakdown**

1. **The archive's key instruction is far from the thing it describes.** "Open a
   project with a `+` to launch its live demo" sits in the section intro; the
   cards it explains are below the fold. A card with no `+` gives no hint why.
2. **Two different interaction models on one page.** `PortfolioExplorer`
   (expanding research questions) and `ArchiveExplorer` (year-grouped cards)
   behave differently, and the page does not signal the shift.
3. **Four archive projects still have no demo, repo, or write-up** (§4), so they
   read as inert names — the visitor cannot tell "nothing here yet" from
   "you are missing the affordance".

**Actionable fixes**

1. Move the `+` explanation into the archive card grid as a one-line legend
   directly above the cards, and give demo-less cards a quiet "Write-up coming"
   marker so their state is stated rather than inferred.
2. Give the archive a visibly different section treatment — it already has
   `bg-surface/40`; add the year as a sticky sub-heading so the grouping is
   legible while scrolling.
3. Close out §4 so the name-only cards get content.

### 10.5 `/team`

*Core task: see who is behind the work, and who backs it.*

**The breakdown**

1. **Four org cards promise details they do not have.** Every card in the
   Partners & collaborators grid says "View details →", but **100x, Apne Aap
   Women Worldwide, Gaia, and Grid Bank** have an empty `about`, and 100x, Gaia,
   and Grid Bank also have no `url`. Clicking opens a modal containing a logo
   and a name. Now that all 19 organisations sit in one grid (2026-07-23), these
   dead ends are adjacent to rich ones, which makes them more obvious.
2. **The page is very long** — hero, founder, researchers, alumni, advisors,
   collaborators, then 19 organisations — with no in-page navigation.
3. **Five participants still have no bio** (§7), so their cards and profile
   pages show no blurb while their neighbours' do.

**Actionable fixes**

1. Suppress the "View details →" line when an org has neither `about` nor `url`,
   and make those cards non-interactive — a logo and a name, presented as such.
   Roughly three lines in `OrgShowcase`. Then fill the four blurbs (§3).
2. Add a sticky sub-nav for the team page (Founder · Researchers · Alumni ·
   Advisors · Partners), mirroring `SectionTabs` on the portfolio pages.
3. Close out the missing bios in §7.

### 10.6 `/contact`

*Core task: start a conversation.*

**The breakdown**

1. **There is no contact form.** The page's entire conversion path is a
   `mailto:` link and two links to LinkedIn. This is the page whose single job
   is capturing an inbound enquiry.
2. **Both channels have real drop-off.** LinkedIn requires an account and a
   login, which excludes plenty of institutional and government contacts;
   `mailto:` does nothing useful for anyone on webmail, and on mobile it can
   open an unconfigured mail app.
3. **`README.md` claims a `ContactForm` component that does not exist** in
   `src/components/`. Anyone picking up the repo will look for it.

**Actionable fixes**

1. Add a form. With a static export there is no server, so post to a
   third-party endpoint — Formspree, Netlify Forms, or a Google Form embed —
   and keep the email and LinkedIn links as alternates beneath it. This is the
   highest-value single addition on the site.
2. Until then, make the email address the primary visual CTA rather than
   LinkedIn: it is the channel with no account requirement.
3. Correct the component list in `README.md`.

### 10.7 Report pages (`/publications/<slug>` ×15)

*Core task: read a report and judge whether to trust it.*

**The breakdown**

1. **No reading affordances on a very long document.** `ScrollProgress` exists
   as a component, but these pages carry no table of contents and no
   section jump, so a reader who wants section 07 must scroll for it.
2. **Only one report offers a PDF** (After the Corridor). For an academic
   audience that expects to download and cite, that is an inconsistent contract
   across the set.
3. **References are a flat list.** With no back-links from the citation to the
   point it supports, checking a claim means scrolling away and losing place.

**Actionable fixes**

1. Add a sticky table of contents from the section headings `ReportBody`
   already receives — the data to build it is in hand.
2. Decide the PDF question as a set: either generate one per report or drop the
   affordance from After the Corridor, so the offer is consistent.
3. Number the references and link each in-text marker to its entry, with a
   return link back.

### 10.8 Accessibility — cross-cutting

**The breakdown**

1. **Muted text passes AA with almost no margin.** Measured:
   `--muted` over `--background` is **4.76:1** dark and **4.69:1** light; over
   `--card` it is **4.63:1**. The AA threshold is 4.5:1, so every one of these
   passes — but with under 6% headroom, and all fail AAA (7:1). Any future
   darkening of the token or lightening of a surface silently breaks
   compliance.
2. **That token is used at very small sizes** — `text-xs` (12px) and, on the
   posters, `text-[10px]` and `text-[9px]`. Small text at barely-AA contrast is
   the combination most likely to fail a real reader even while passing the
   automated check.
3. **Hover-only affordances** (§10.2) are keyboard-reachable via
   `focus-visible` but not touch-reachable at all.
4. **The intro curtain's non-native button** (§10.1).

**Actionable fixes**

1. Raise `--muted` opacity from `0.52` to about `0.62` dark and `0.60` to `0.68`
   light. That lifts every instance clear of the threshold — roughly 6.2:1 —
   and costs nothing but a slightly less recessive grey.
2. Set a floor of 12px for anything using `text-muted`; for the 9–10px poster
   metadata, use `--foreground` at reduced opacity instead so the contrast
   budget is spent where the text is smallest.
3. Apply the touch fixes in §10.2.
4. Apply the button fix in §10.1.

### 10.9 Suggested order

Ranked by visitor impact against effort, not by section number:

1. `/contact` gets a form (§10.6) — biggest functional gap on the site.
2. Rail affordance and the touch-invisible Run badge (§10.2) — affects every
   mobile visitor to the two catalogue pages.
3. Muted-contrast bump (§10.8) — one token, whole-site effect.
4. Intro curtain: first-visit-only, real button, skip control (§10.1).
5. Suppress dead "View details →" on the four empty org cards (§10.5).
6. Move Guidelines off the front of the publications catalogue (§10.3).
