---
name: add-team-profile
description: Add or update a person's profile (advisor, staff, cohort researcher, or collaborator) on the /team page — headshot, TeamMember record in src/content/site.ts, and validation. Use when asked to add someone to the Team page, add an advisor/researcher/staff member/collaborator, or update an existing team member's bio, photo, role, or org.
---

# Add a Team Profile

## What this touches

- [`src/content/site.ts`](../../../src/content/site.ts) — the `team` export, the
  single source of truth for everyone on `/team`
- [`public/team/`](../../../public/team/) — headshots
- [`public/team/README.md`](../../../public/team/README.md) — headshot status list
- `README.md` and `team.researchersCount` / `cohorts` — **only** when adding a
  **researcher** to the current cohort (step 5)

Nothing else needs to change. Pages under `src/app/team/` are presentational —
they render whatever is in `team` and degrade gracefully when a field is
missing. Full field reference:
[`docs/CONTENT-GUIDE.md`](../../../docs/CONTENT-GUIDE.md) §2, "Add / edit a team
member" — this skill covers the *procedure*, not a full field-by-field spec.

## Required inputs — gather these before writing anything

| Field | Required? | Notes |
|---|---|---|
| Full name | Required | Exactly as they want it published. |
| Which list | Required | `advisors`, `residentFellows` (staff), `researchers` (current cohort), or `collaborators`. Ask if unclear. |
| Role / title | Required | For advisors, match the existing pattern: `"Advisor · <their focus area at the CoLab>"` (e.g. `"Advisor · Civilian Protection & IHL"`). Ask what they advise on if it isn't obvious from context. |
| Org / affiliation line | Recommended | Their day job or institution, e.g. `"Product Manager, Microsoft"`. Shown under the role. |
| Headshot | Recommended | A real photo file. Without one the card shows clean initials — acceptable, not an error, but flag it so it isn't forgotten. |
| LinkedIn URL | Recommended | Full profile URL. |
| Personal / faculty website | Optional | Only if distinct from LinkedIn. |
| Bio | Recommended for advisors | One to three short paragraphs, third person, past/present tense matching the existing bios. Without one, the detail page just shows "Bio coming soon." |
| Cohort term | Only for `researchers` | e.g. `"Summer 2026"`. Advisors, staff, and collaborators don't need this. |
| Slug | Recommended | `firstname-lastname`, in lower case, hyphenated. Omit only if the card should be non-clickable. |

**Never fabricate any "Recommended" field.** If a bio, LinkedIn URL, or photo
isn't supplied, either omit the field (the site handles a missing
photo/bio/LinkedIn gracefully) or ask for it — don't invent biographical claims,
credentials, or a URL for a real person. This is an explicit rule in
`docs/CONTENT-GUIDE.md`: *"Never publish a name, role, affiliation, or biography
you have not verified against an authoritative source."*

## Procedure

### 1. Confirm the category

Advisor, staff (`residentFellows`), current-cohort researcher, or collaborator.
This decides which array in `team` the object goes into, and whether step 5
(the cohort-count invariant) applies.

### 2. Add the headshot (if supplied)

1. Drop the file into `public/team/<firstname>.<ext>` (`.jpg`, `.jpeg`, or
   `.png`) — first name in lower case, matching the existing filenames.
2. Run:
   ```
   npm run optimize:images
   ```
   Resizes in place to the 384px team budget and strips EXIF. Safe to run
   every time — a no-op on files that already fit.
3. Add a status line for them in `public/team/README.md`, matching the
   existing list format.
4. **No photo yet?** Leave `photo` out of the object entirely. The card falls
   back to initials — never point `photo:` at a file that doesn't exist.

### 3. Add the `TeamMember` object

Open `src/content/site.ts`, find `export const team = {`, and add the object
to the right array (`advisors`, `residentFellows`, `researchers`, or
`collaborators`):

```ts
{
  initials: "BG",
  name: "Brianna Gabaldon",
  role: "Advisor · <specific focus — ask if not given>",
  org: "Product Manager, Microsoft",
  linkedin: "https://www.linkedin.com/in/…",   // the real URL — ask for it
  photo: "/team/brianna.jpg",                    // omit if no photo yet
  slug: "brianna-gabaldon",
  bio: "…",                                      // real, verified copy — ask; omit if not supplied yet
},
```

Match the array's existing style — some are cast with `as TeamMember[]` on the
array itself; don't add a redundant per-object cast if so.

### 4. Slug collisions

Slugs are unique **across every category**, not per-list — the founder, an
advisor, and a researcher all share one `/team/[slug]` namespace.
`npm run check:content` (step 6) catches a collision; always run it.

### 5. Only when adding a `researchers` entry: the three-place cohort-count invariant

Adding a **researcher** to the *current* cohort means updating, in the same
change:

1. `team.researchersCount` (e.g. `"7 researchers"` → `"8 researchers"`)
2. The matching entry's `"N researchers"` item in `cohorts`
3. The prose count in `README.md` ("`<number>` applied researchers")

`npm run check:content` fails if these three — plus the actual roster — don't
agree. This exact mistake has reached production twice before.

**Advisors, staff, and collaborators do not touch this invariant.** Skip this
step for anyone outside `researchers`.

### 6. Validate

```
npx eslint src/content/site.ts
npm run check:content
npm run check:images
npm run build
```

All four must pass. If `check:images` fails, the photo just added is still at
full camera resolution — re-run `npm run optimize:images`.

### 7. Visual check

```
npm run dev
```

Open `/team` and confirm:

- The card appears in the right section with a real photo (not a broken
  image) or clean initials.
- If a slug was given, click through to `/team/<slug>` and confirm photo,
  role, org, LinkedIn/website links, and bio all render as expected.
- Check both dark and light themes.
- Advisors render in a 2-column layout — an odd total just leaves one empty
  slot on the last row; that's expected, not a bug.

### 8. Regenerate the snapshot — only if publishing this change on its own

If this is a standalone content pull request, follow
[`CONTRIBUTING.md`](../../../CONTRIBUTING.md) §4: commit the
`src/content/site.ts` (+ `public/team/`) change first, then run
`npm run sync:static` and commit `static-site/` **separately**. If this is
bundled with other work that already regenerates the snapshot, don't
regenerate twice.

## Worked example: adding Brianna Gabaldon (Advisor)

Given: *"Brianna Gabaldon, Microsoft Product Manager, and CGA grad, being
added as an advisor."*

That names the category and gives a start on `org`, but is **not enough to
publish** — the specific advisory focus, photo, LinkedIn, and bio are still
unverified:

```ts
{
  initials: "BG",
  name: "Brianna Gabaldon",
  role: "Advisor · <ask: what does she advise the CoLab on?>",
  org: "Product Manager, Microsoft · NYU CGA alum",
  linkedin: "<ask for her LinkedIn URL>",
  // photo: "/team/brianna.jpg",  // add once a headshot is supplied
  slug: "brianna-gabaldon",
  // bio: "<ask for 1-3 sentences, third person, verified>",
},
```

Add this to `team.advisors` in `src/content/site.ts`. Uncomment `photo`/`bio`
once supplied, run `npm run optimize:images` for the headshot, and complete
steps 4, 6, and 7 above before treating her as published.

## Learnings

- **A missing photo or bio is not a bug.** The card and detail page degrade
  gracefully (initials; "Bio coming soon."). Never invent content to fill the
  gap — leave the field out and flag it as still needed.
- **`team.researchersCount` only tracks `researchers`.** Don't run the
  cohort-count reconciliation (step 5) for an advisor, staff member, or
  collaborator — they aren't part of that invariant.
- **Slugs are global, not per-category.** Check for a collision with anyone
  already on the roster, including the founder, before picking one.
- **A phone-camera headshot ships at full resolution** if `optimize:images`
  isn't run afterward — `npm run check:images` exists specifically to catch
  this in CI before merge.
