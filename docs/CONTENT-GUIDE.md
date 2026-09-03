# Content editing guide

How to update the words, people, projects, logos, and links on the site —
**without touching page layout or React code**.

This is the *reference* half of the documentation: what each field means and
where it renders. The *process* half — branching, validating, regenerating the
static snapshot, and opening a pull request — lives in
[`CONTRIBUTING.md`](../CONTRIBUTING.md). Read that before you push anything.

> **Golden rule:** almost all copy lives in one file — [`src/content/site.ts`](../src/content/site.ts).
> Pages in `src/app/` are presentational: they read from `site.ts` and render it.
> Edit content there first; only touch `src/components/` or `src/app/` when you
> need to change *how* something looks, not *what* it says.

---

## 1. Where each thing lives

`src/content/site.ts` is organized into named exports. Each maps to a page/section:

| Export | Drives | Page(s) |
|--------|--------|---------|
| `site` | Name, tagline, email, LinkedIn, footer blurb, **social links**, legal text | Header, footer (all pages) |
| `newsletter` | Newsletter signup copy + Mailchimp action URL | Footer / signup block |
| `nav` | Top navigation menu items | Header (all pages) |
| `researchAreas` | The 4 research questions + their sub-projects | Home, `/portfolio` |
| `publications` | Academic report cards | `/publications` |
| `archivedProjects` | Older / archived project cards | `/portfolio` |
| `products` + `productThemes` + `productTerms` | Live products showcase | Home, `/demos` |
| `cohorts` | Cohort history (Spring 2025 → Summer 2026) | Home |
| `about` | Mission, vision, director, collaborators/partners | `/contact` (and the hidden `/about`) |
| `team` | Founder, advisors, resident fellows, researchers, collaborators | `/team`, `/team/[slug]` |
| `teamOrgs` | Ordered org grid under "The organisations behind the work" | `/team` |
| `cohortTerms` | Terms in the researcher filter, alumni grouping, and archive grouping | `/team`, `/portfolio` |
| `media` | Event photos, press items, gallery cards | `/media` |

To find a section fast, search the file for `export const <name>`.

Two content areas live outside `site.ts`:

- **Newsletter issues** — [`src/content/newsletter.ts`](../src/content/newsletter.ts).
  The rendered issue HTML in `public/newsletter/` is *synchronized from the
  separate newsletter repository*, not authored here. See
  [`CONTRIBUTING.md`](../CONTRIBUTING.md).
- **Publication bodies** — [`src/content/publications/`](../src/content/publications/).
  Numbers and claims must be corrected in the originating paper first.

> **`/about` is hidden.** The route still exists but returns 404, so edits to
> `about.mission` / `about.vision` only surface through `/contact` and whatever
> else imports them. Check where a field actually renders before rewriting it.

---

## 2. Common edits (step by step)

### Change a headline, blurb, or link
1. Open [`src/content/site.ts`](../src/content/site.ts).
2. Find the relevant export (see the table above).
3. Edit the string value. Keep the quotes and trailing commas intact.
4. Save. `npm run dev` hot-reloads at <http://localhost:3000>.

### Add / edit a team member
Each person is a `TeamMember` object. Fields:

```ts
{
  initials: "AB",              // shown when there is no photo
  name: "Ada Byron",
  role: "Applied AI Researcher",
  linkedin: "https://www.linkedin.com/in/…",  // optional
  website: "https://…",        // optional — renders a "Website ↗" link
  org: "NYU CGA",              // optional
  photo: "/team/ada.jpg",      // optional — see §3
  bio: "One or two sentences.", // optional — needed for a rich /team/[slug] page
  term: "Summer 2026",         // optional — defaults to current cohort
  slug: "ada-byron",           // optional — omit to make the card non-clickable
}
```

- Add the object to the right array inside `team` (`advisors`, `residentFellows`,
  `researchers`, or `collaborators`).
- A person may appear in more than one list; the detail page prefers the record
  that has a `bio` (see [`src/lib/team.ts`](../src/lib/team.ts)).
- No photo yet? Leave `photo` out — the card shows clean initials, never a broken
  image.
- Changing the cohort size means updating the count in **three** places:
  `team.researchersCount`, the matching `cohorts` entry's `items`, and
  [`README.md`](../README.md). Run `npm run check:content` to confirm all three
  agree with the roster — CI runs it, and it will fail the pull request if they
  do not.
- Never publish a name, role, affiliation, or biography you have not verified
  against an authoritative source.

### Add / edit an organisation card
Orgs on the Team page are `PartnerOrg` objects:

```ts
{
  name: "Example Org",
  about: "One sentence on the relationship.",  // optional — shown in the modal
  url: "https://example.org/",                 // optional
  logo: "/logos/example.png",                  // optional — see §3 for auto-discovery
  logoTile: "dark",                            // optional — see below
}
```

Logos sit on a **white** tile. A brand that only publishes a white or very light
mark would vanish there, so set `logoTile: "dark"` to place it on the dark tile
it was drawn for. Prefer a vendor-supplied dark variant when one exists; only
reach for `logoTile` when it does not.

The display order of the grid is set by `teamOrgOrder` (just above the
`teamOrgs` export). Any org not named there sorts to the end, so nothing
silently disappears when you add one.

### Add / edit a research area or sub-project
- Top-level entries in `researchAreas` are the big research **questions**.
- Each has a `projects: []` array of `SubProject` objects:
  ```ts
  {
    name: "Project name",
    summary: "What it does.",
    status: "Active",                                   // optional badge
    repo: "https://github.com/Ethical-Tech-CoLab/…",    // optional "View code"
    demo: "https://…",                                  // optional "▶ Launch live demo" + LIVE badge
  }
  ```
- Adding a `demo` URL is all it takes to surface a live-demo button — no code change.

### Add a publication
- Add an object to `publications`. When a report is ready, add its `url` — the card
  automatically switches from "coming soon" to a "Read report" button.

### Update social / newsletter
- Social handles: edit `site.social.instagram` / `site.social.twitter`. Set a value
  to `""` to hide that link entirely.
- Newsletter (Mailchimp, no server involved — the browser posts straight to
  Mailchimp): in Mailchimp, go to **Audience → Signup forms → Embedded forms**,
  generate the embed code, then copy two values out of it into
  [`src/content/site.ts`](../src/content/site.ts):
  1. The `<form action="...">` URL → paste into `newsletter.action`.
  2. The hidden bot-protection input's `name` attribute (looks like
     `b_XXXXXXXX_YYYYYYYY`) → paste into `newsletter.hiddenField`.
  Until both are set the form renders in a disabled "coming soon" state; the
  moment they're filled in it goes live with no other code changes. See
  [`BACKLOG.md`](../BACKLOG.md) for why this direct-post pattern (rather than a
  custom API or a Google Form) is the right fit for a server-less static site.

---

## 3. Images (photos & logos) — no code required

### Team headshots
1. Drop the image into [`public/team/`](../public/team/). Square images crop best
   (displayed as circles).
2. Set the person's `photo:` field in `site.ts` to `/team/<file>` (match the exact
   extension — `.jpg`, `.jpeg`, or `.png`).
3. See [`public/team/README.md`](../public/team/README.md) for the expected filenames.

### Client / partner logos
- Just drop `/logos/<slug>.<ext>` into [`public/logos/`](../public/logos/) — it is
  **auto-discovered** and appears in the org grid on the Team page with no code
  change.
- `<slug>` = org name lowercased with non-letters turned into dashes
  (e.g. "Grid Bank" → `grid-bank`). Lookup order: `.svg`, `.png`, `.webp`, `.jpg`.
- No file found → a lettered monogram is shown as a fallback.
- To use a different filename, set the org's `logo:` field in `site.ts`.
- Full list in [`public/logos/README.md`](../public/logos/README.md).

> **Check the logo is actually visible.** The tile is white. Open the Team page
> and look before you call it done — a white-on-transparent mark renders as an
> empty box, not as an error. See `logoTile` in §2.

> **Asset paths:** reference public assets as `/team/…` or `/logos/…`. In component
> code these are wrapped by [`asset()`](../src/lib/asset.ts) so they resolve both in
> local dev (`/`) and on GitHub Pages (`/website`). Don't hardcode `/website/…`.

---

## 4. Preview locally

```bash
npm ci             # first time, and after any dependency change
npm run dev        # live preview at http://localhost:3000
```

Review the page you changed at both desktop and mobile widths, in dark and light
themes, and follow every link you touched.

**Before you commit, switch to [`CONTRIBUTING.md`](../CONTRIBUTING.md).** A
content edit is not finished when it looks right in `npm run dev`. It also needs
a lint run, a production build, and a regenerated `static-site/` snapshot
committed separately — sections 3 to 5 of that guide. Skipping the snapshot is
the single most common way this repository ends up describing a version of the
site that no longer exists.

The site auto-deploys to GitHub Pages via `.github/workflows/deploy.yml` on every
push to `main` (it runs `next build` and publishes `out/`).

> The `static-site/` directory is a **generated** snapshot for offline design
> preview — never hand-edit it. It is not the deployed artifact. See
> [`docs/static-site-vs-nextjs.md`](./static-site-vs-nextjs.md).

---

## 5. Outstanding content tasks

Open content items (headshots, logos, missing URLs, bios) are tracked in
[`BACKLOG.md`](../BACKLOG.md). Check items off there as you add assets, and only
once the change is live.
