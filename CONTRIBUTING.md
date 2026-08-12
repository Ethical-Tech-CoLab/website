# How to contribute safely

This guide is for maintainers and contributors updating the Ethical Tech CoLab
website. It reflects the repository as verified on 2026-08-08.

The goal is not merely to make a change that builds. A safe contribution must
also preserve research accuracy, visual consistency, generated artifacts, and a
clear review history.

## 1. Start from a clean, current branch

Do not make routine changes directly on `main`.

**Fetch first, every time.** More than one person maintains this site, and work
often lands between sessions. Branching from a stale `origin/main` is the most
common way to create avoidable conflicts here, because a stale branch that
regenerates `static-site/` will overwrite the generated output of changes it
never saw. If a branch has been open for more than a day, fetch and rebase again
before regenerating the snapshot or opening a pull request.

```powershell
git fetch origin
git switch -c <your-name>/<short-topic> origin/main
git status --short
npm ci
```

Use one branch and one pull request per focused change. Before editing:

1. Check [BACKLOG.md](BACKLOG.md) and the open GitHub issues.
2. Tell the relevant maintainer what you plan to change. Until `CODEOWNERS`
   exists (see `UPD-003` in [UPDATES-NEEDED.md](UPDATES-NEEDED.md)), most
   website commits come from
   [@carolina-moron](https://github.com/carolina-moron), with
   [@alx-du](https://github.com/alx-du) also contributing. Request review by
   role — see the reviewer roles in section 5 — rather than routing every
   change through one person.
3. Identify the authoritative source for every name, link, image, claim, and
   research figure.
4. Avoid overlapping work in `src/content/site.ts`; it is the most frequently
   maintained file in this repository.

Use `npm ci` for a reproducible install. Use `npm install <package>@<version>`
only when intentionally changing dependencies, and commit both `package.json`
and `package-lock.json`.

## 2. Edit the source of truth

| Change | Authoritative location |
|---|---|
| General site data, navigation, projects, demos, cohorts, partners, and team | `src/content/site.ts` |
| Newsletter listing metadata | `src/content/newsletter.ts` |
| Publication report bodies | `src/content/publications/` |
| Page composition and routing | `src/app/` |
| Reusable presentation and interaction | `src/components/` |
| Design tokens and global styles | `src/app/globals.css` |
| Public images, documents, and copied newsletter HTML | `public/` |
| Generated static snapshot | `static-site/` - never hand-edit |

### Projects and people can appear in several collections

Search before editing. A project may appear in `researchAreas`, `products`,
`archivedProjects`, `cohorts`, and `publications`. Reuse an existing shared
constant when the same URL or data appears in more than one place.

For people, verify the slug, role, term, biography, links, and matching asset
path together. Follow `public/team/README.md` for headshots.

### Publications require source-level verification

The website copies or adapts research from other CoLab repositories. Do not
correct a number, citation, methodology statement, or conclusion only on this
site.

1. Verify the claim against the primary source.
2. Update the originating paper or project repository when appropriate.
3. Update the matching file under `src/content/publications/`.
4. Confirm that summaries, hero statistics, charts, and citations still agree.
5. Record unresolved credibility questions in the appropriate review location;
   do not turn an uncertainty into confident public copy.

See the publication review notes in [BACKLOG.md](BACKLOG.md).

### Newsletter HTML is synchronized, not independently authored here

The rendered issue files in `public/newsletter/` come from the separate
newsletter repository.

```powershell
$env:NEWSLETTER_REPO = "C:\path\to\newsletter"
npm run sync:newsletter
```

Then add or update the issue metadata in `src/content/newsletter.ts`. Make the
authoritative content correction in the newsletter repository first.

### Assets must work under the production base path

Production is served under `/website`, while local development runs at `/`.
When a component renders a raw asset from `public/`, use the existing `asset()`
helper from `src/lib/asset.ts`. A path that works at `http://localhost:3000`
may otherwise fail on GitHub Pages.

Confirm that every contributed asset:

- has permission to be published;
- contains no private metadata or credentials;
- uses an appropriate format and file size;
- has meaningful alternative text where it is rendered;
- follows any crop, aspect-ratio, and naming rules documented in the backlog.

### Design changes must preserve the whole system

Follow [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md). Check:

- dark and light themes;
- narrow mobile and wide desktop layouts;
- keyboard navigation and visible focus;
- reduced-motion behavior;
- text contrast and readable line lengths;
- loading, empty, and error states where relevant.

Do not copy framework code from a generic tutorial. This repository uses the
exact Next.js version in `package.json`; read the relevant installed
documentation under `node_modules/next/dist/docs/` before changing framework
APIs, routing, configuration, or build behavior.

## 3. Validate the source change

Run the smallest targeted lint command that covers the files you changed:

```powershell
npx eslint src\path\to\changed-file.tsx
```

The repository's full lint baseline currently has known legacy failures. Do not
introduce a new warning or error, and do not hide a new failure behind the
baseline. See [UPDATES-NEEDED.md](UPDATES-NEEDED.md).

Always run the production build:

```powershell
npm run build
```

Then review affected pages locally:

```powershell
npm run dev
```

For every affected route:

1. Test desktop and mobile widths.
2. Test dark and light themes.
3. Follow every changed internal and external link.
4. Confirm images, downloads, embedded demos, and publication anchors.
5. Check the browser console for errors.
6. Review copy in context rather than only in the source file.

Before generating the snapshot, inspect the source diff:

```powershell
git diff --check
git diff --stat
git diff
git status --short
```

## 4. Regenerate the tracked static snapshot

`src/` is the source of truth. `static-site/` is a generated convenience
snapshot and is not the GitHub Pages deployment source.

**Any change under `src/` needs this step.** The deployed site is built from
source by CI, so skipping it does not break the live site — but it leaves the
tracked snapshot describing a version of the site that no longer exists, which
is exactly the drift the snapshot is supposed to prevent.

After the source change and build are correct:

```powershell
npm run sync:static
git status --short
git diff --stat
```

The sync command requires Bash. On Windows, run it from an environment with
Git Bash available.

Never repair generated files manually. If the output looks wrong, fix the
source and run the command again.

Because regeneration can touch hundreds of files, keep it in a separate commit
after the human-readable source commit. This keeps review practical:

1. Commit the focused source change.
2. Run `npm run sync:static`.
3. Commit only the generated snapshot with a clear message such as
   `Re-sync static-site after <change>`.

### Checking for drift

The snapshot is byte-stable: the Next.js build ID is pinned to a placeholder in
the snapshot copy, and line endings are fixed by `.gitattributes`. So
regenerating it on an unchanged checkout should produce no diff at all, on any
platform.

That makes drift easy to check. From a clean tree:

```powershell
npm run sync:static
git status --short
```

Anything reported means the snapshot did not match the current source. A large
diff is normal after editing a component that every page renders, such as
`SiteHeader`, because the shared chunk's content hash changes.

## 5. Open a reviewable pull request

Push the branch without force:

```powershell
git push -u origin HEAD
```

The pull request should state:

- what changed and why;
- the authoritative source for factual or research content;
- affected routes and collections;
- commands run and their results;
- visual checks performed;
- known limitations or follow-up decisions;
- whether `static-site/` was regenerated;
- any relevant AI-assisted workflow detail needed to reproduce the work.

Include screenshots for visible changes. Keep unrelated formatting,
dependencies, generated files, and content decisions out of the pull request.

Wait for an appropriate reviewer before merging:

- a content owner for names, roles, partnerships, and public positioning;
- a research owner for methods, numbers, citations, and conclusions;
- a technical maintainer for components, dependencies, configuration, or
  deployment;
- an asset or brand owner when publication rights or visual identity are in
  question.

## 6. Verify after merge

1. Confirm the GitHub Pages workflow succeeds.
2. Open the live site under
   `https://ethical-tech-colab.github.io/website/`.
3. Recheck the changed route, assets, links, and mobile presentation.
4. Update the originating issue or backlog item only after the change is live.

If a production change must be undone, use a normal revert pull request or
revert commit. Do not rewrite shared history or force-push `main`.

## Never do these

- Do not commit credentials, tokens, cookies, private prompts, or `.env` files.
- Do not hand-edit `static-site/` or ignored `out/`.
- Do not publish unverified claims, biographies, affiliations, or partner
  relationships.
- Do not run `npm audit fix --force` or make an unreviewed framework upgrade.
- Do not combine a content update with broad refactoring or dependency churn.
- Do not bypass Git hooks, required checks, or reviewer decisions.
- Do not expose a confidential security report in a public issue; follow
  [SECURITY.md](SECURITY.md).
