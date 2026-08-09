# Updates needed - review queue

This file records verified legacy gaps and draft discovery requests. It is a
triage document, not an approved backlog.

**Do not copy an item into `BACKLOG.md` or create a GitHub issue until a
maintainer has reviewed its accuracy, scope, priority, and owner.**

Last verified: 2026-08-08.

## How to use this review queue

For each item:

1. Confirm it is still true on the latest `main`.
2. Decide whether it is a content task, technical issue, governance decision,
   private operational note, or no longer needed.
3. Identify an owner and acceptance criteria.
4. Check for secrets, private information, partner restrictions, and security
   details before publishing it.
5. Only then move it to the appropriate location.

Use `BACKLOG.md` for public-site content work. Use GitHub issues for bounded,
actionable implementation. Keep sensitive operational material in an approved
private location.

## A. Confirmed legacy and control gaps

### UPD-001 - Repair the lint baseline

**Priority:** High — **done.**

`npm run lint` reported 15 errors: 10 in generated JavaScript under
`static-site/`, one unescaped-entity error in
`src/app/publications/ai-carbon-footprint/page.tsx`, and effect/state errors in
`IntroCurtain.tsx`, `MobileNavSidebar.tsx`, and `SiteHeader.tsx`.

`static-site/**` is now in ESLint's global ignores, and all five source errors
are fixed, along with the three warnings that exposed. `npm run lint` prints
nothing and exits 0, so it is ready to be required once pull-request CI exists.

**Acceptance:** met — clean `npm run lint`, successful `npm run build`, and no
linting of generated output.

### UPD-002 - Add pull-request CI and protect `main`

**Priority:** High

The repository has no branch protection or rulesets. The Pages workflow runs
only on pushes to `main`, so an invalid pull request receives no automated
build before merge.

**Blocked by:** the `gh` token in use has no `workflow` scope, so any push
touching `.github/workflows/*` is rejected outright (recorded in `BACKLOG.md`
section 8). Adding pull-request CI means adding a file under
`.github/workflows/`, so re-authorising that token is a prerequisite of this
item — and therefore of every control that depends on a required build check.

**Proposed update:** Re-authorise the `gh` token with `workflow` scope, add
non-deploying pull-request CI, then require its build status and pull-request
approval through a GitHub ruleset. Follow
[SITE-CONTROL-RECOMMENDATIONS.md](SITE-CONTROL-RECOMMENDATIONS.md).

**Acceptance:** A test pull request cannot merge until its required build
passes and its review requirement is met.

### UPD-003 - Add ownership and review templates

**Priority:** High

There is no `CODEOWNERS`, pull-request template, or issue template.

**Proposed update:** Agree on content, research, technical, asset-rights, and
security ownership before adding files. The pull-request template should ask
for source evidence, affected routes, checks run, screenshots, generated
snapshot status, and risk classification.

**Acceptance:** High-risk file changes automatically request the agreed owner,
and new pull requests consistently capture validation and provenance.

### UPD-004 - Make static snapshot synchronization cross-platform

**Priority:** Medium

`npm run sync:static` calls a Bash script. This creates avoidable setup
differences for Windows maintainers and AI clients.

**Proposed update:** Replace or wrap the script with a Node-based equivalent
that preserves the current build, clean copy, and `GENERATED.md` behavior.
Review destructive file operations carefully and test path handling on Windows
and Linux.

**Acceptance:** The same npm command produces an equivalent snapshot on Windows
and Linux from a clean checkout.

### UPD-005 - Decide the long-term `static-site/` policy

**Priority:** Medium

The tracked snapshot is not deployed, contributes lint noise, and can obscure
source review. It remains useful as a no-server convenience copy.

**Resolved since this item was written:** the snapshot used to rewrite ~490
files on every regeneration. That was not staleness or drift. `next build`
mints a random build ID per run and embeds it in every prerendered document, so
486 of 489 files in one snapshot commit differed only by that ID. The build ID
is now pinned to a placeholder in the snapshot copy only
(`scripts/normalize-static-build-id.mjs`), which leaves the deployed `out/`
untouched. A content change now touches only the pages it affects — a one-line
edit went from ~490 files to 9 — so the snapshot is byte-stable and a drift
check is finally implementable.

**Proposed decision:** Choose and document one of:

1. retain it, exclude it from source checks, and verify drift automatically;
2. generate it only as a workflow artifact;
3. remove it and use the normal Next.js export for all previews.

Until that decision is approved, preserve the current policy and keep generated
changes in a separate commit.

**Note for option 1:** a drift check is now possible — run `npm run sync:static`
in CI and fail if `git status` is dirty — but the repository has no
`.gitattributes` while Git for Windows defaults to `core.autocrlf=true`. A
Windows checkout therefore reports hundreds of modified snapshot files that have
no content change at all. Pin the snapshot's line endings before relying on such
a check.

**Acceptance:** One documented policy, one generation path, and an automated
way to detect accidental drift where applicable.

### UPD-006 - Assess and patch dependency advisories

**Priority:** High

On 2026-08-08:

- `npm audit --omit=dev` reported 5 high-severity production dependency
  findings;
- full `npm audit` reported 8 findings: 7 high and 1 moderate;
- affected packages included direct `next` and `pdfjs-dist` dependencies and
  transitive `nanoid`, `postcss`, and `sharp`;
- npm reported a non-major Next.js fix from 16.2.9 to 16.2.12, while other
  packages require separate dependency-tree review.

Audit severity does not establish exploitability for this static deployment.
Do not apply an automatic forced fix.

**Proposed update:**

1. Read the exact advisories and map each affected code path to this static
   export.
2. Read the installed Next.js migration and deprecation guidance.
3. Apply the smallest compatible patches in a dedicated pull request.
4. Build and inspect all publication, book, image, and static-export routes.
5. Record any accepted residual risk with a review date.

**Acceptance:** Patched compatible dependencies or documented, owner-approved
risk decisions for each remaining production finding.

### UPD-007 - Pin the local Node version

**Priority:** Medium

GitHub Actions uses Node 20, but the repository has no `.nvmrc`,
`.node-version`, or `package.json` `engines` declaration.

**Proposed update:** Select a repository-supported Node 20 release and expose it
through the local version mechanism the maintainers actually use. Keep it
aligned with deployment.

**Acceptance:** A new contributor can select the supported Node version before
running `npm ci`, and local and CI builds use the same major version.

### UPD-008 - Add focused smoke checks

**Priority:** Medium

There is no automated test script. The production build succeeds, but a build
alone does not prove that key routes, base-path assets, publication anchors, or
generated slugs are correct.

**Proposed update:** Start with a small check over critical exported files and
known content invariants. Add browser automation only when it protects a
specific high-value interaction and can remain reliable.

**Acceptance:** CI detects at least a missing critical route, broken local
asset reference, or invalid generated content mapping before merge.

### UPD-009 - Separate website issues from wider CoLab operations

**Priority:** Medium

The issue tracker contains a mix of website work and broader organizational
tasks. Most open issues have no labels, and several do not describe a bounded
website change.

**Proposed update:** Agree on issue labels and decide where non-website
operations belong. Do not move or close existing issues until their owners
confirm the destination.

**Acceptance:** New issues identify type, owner, and acceptance criteria; the
website tracker can be filtered to actionable site work.

### UPD-010 - Confirm domain ownership and monitoring

**Priority:** Medium

`BACKLOG.md` already records that `ethicaltechlab.org` did not resolve during a
previous check even though site metadata refers to it.

**Proposed update:** Assign an owner to verify DNS, GitHub Pages custom-domain
configuration, renewal responsibility, and the intended canonical URL. Keep
account and registrar details private.

**Acceptance:** The intended domain resolves correctly or metadata is updated
to the confirmed canonical URL, with a named private renewal owner.

### UPD-011 - Decide repository and asset licensing

**Priority:** Medium

The public repository has no root license file. The site also contains
third-party logos, photos, research text, and generated presentation assets
that may have different reuse rights.

**Proposed update:** Obtain an owner/legal decision on code and content
licensing. Record asset provenance and restrictions without claiming rights the
CoLab does not hold.

**Acceptance:** A clear, approved statement distinguishes code, original
content, research publications, and third-party assets.

## B. Draft requests to document the maintenance workflow - review before sending

Addressed to [@carolina-moron](https://github.com/carolina-moron), who authors
most commits on `main`.

### Purpose

Most maintenance appears to have been performed through an AI-assisted client
workflow; the requests below should confirm the details. That is a valid
maintenance model, but it creates continuity risk if the effective instructions,
skills, and validation steps exist only on one device or in private chat
history.

The requests below are about the workflow, not the person: they seek to
reproduce and back up what already works so a second maintainer can run it.
They are drafts only.

### Safety note to include with every request

Please do **not** share passwords, API keys, access tokens, cookies, private
keys, `.env` values, personal chat history, confidential partner data, or
private repository content. Names of environment variables and redacted
examples are sufficient. If an instruction contains sensitive information,
describe its purpose and storage location rather than copying its value.

### WF-01 - AI client and tool inventory

**Draft request:**

> Could you list the AI clients, IDEs, extensions, command-line tools, browser
> tools, and Git/GitHub integrations you use for this website? For each one,
> please include the product name, version if visible, what role it plays, and
> whether it is essential or just convenient. Please do not include account
> identifiers or credentials.

**Why:** Establishes the actual maintenance environment and avoids assuming
that repository files describe the whole system.

**Review decision:** [ ] Send as written  [ ] Revise  [ ] Do not send

### WF-02 - Client-side skills, agents, and custom instructions

**Draft request:**

> Could you export or list any client-level custom instructions, skills, slash
> commands, agents, rules, project memories, MCP/server connections, or reusable
> prompt files that you use when working on this site but that are not stored in
> the repository? For each, please say where it lives, how it is activated, and
> what problem it prevents. Please redact secrets and private material.

**Why:** These instructions may explain why the workflow is more reliable than
the repository alone would suggest.

**Review decision:** [ ] Send as written  [ ] Revise  [ ] Do not send

### WF-03 - End-to-end "golden path"

**Draft request:**

> Could you describe one successful website update from start to finish,
> including how you ask the AI to refresh from GitHub, choose or create a
> branch, make the edit, check the result, regenerate `static-site`, commit,
> push, and verify the live site? Example prompts are welcome if they contain no
> sensitive information.

**Why:** Captures ordering and checkpoints that a tool inventory cannot show.

**Review decision:** [ ] Send as written  [ ] Revise  [ ] Do not send

### WF-04 - Local setup and repository layout

**Draft request:**

> What operating system, shell, Node version, workspace layout, and sibling
> repository checkouts does your AI workflow expect? Are there environment
> variable names, local folders, Git settings, or GitHub permissions that must
> exist for newsletter, publication, image, or static-site work? Please provide
> names and setup steps only, never secret values.

**Why:** Makes the workflow reproducible on a second maintainer's machine.

**Review decision:** [ ] Send as written  [ ] Revise  [ ] Do not send

### WF-05 - Validation and visual review

**Draft request:**

> What exact prompts, commands, browser checks, screenshots, or live-site checks
> do you ask the AI to perform before and after a contribution? How do you
> distinguish a known baseline warning from a new failure, and what result makes
> you stop rather than push?

**Why:** Identifies the practical quality gate currently operating outside CI.

**Review decision:** [ ] Send as written  [ ] Revise  [ ] Do not send

### WF-06 - Content provenance and cross-repository synchronization

**Draft request:**

> How do you tell the AI which source wins when website content also exists in a
> project paper, another GitHub repository, the newsletter repository, or local
> image folders? Please share any checklists or prompts used to verify research
> claims, citations, biographies, partner descriptions, demo links, and copied
> assets.

**Why:** Protects against silent drift and unsourced public claims.

**Review decision:** [ ] Send as written  [ ] Revise  [ ] Do not send

### WF-07 - Deployment, permissions, and rollback

**Draft request:**

> How does your workflow decide whether to open a pull request or push directly,
> monitor the GitHub Pages deployment, verify the published site, and recover
> from a bad change? Which permissions are required? Please describe the process
> without sharing tokens, account details, or security-sensitive values.

**Why:** Documents the highest-risk part of maintenance and reveals any
single-account dependency.

**Review decision:** [ ] Send as written  [ ] Revise  [ ] Do not send

### WF-08 - Guardrails and known failure modes

**Draft request:**

> What instructions do you give the AI about actions it must never take? Which
> mistakes, confusing behaviors, or failed approaches have you encountered, and
> what prompt or workflow change prevented them from recurring?

**Why:** Existing lessons are often more valuable than a newly invented
process.

**Review decision:** [ ] Send as written  [ ] Revise  [ ] Do not send

### WF-09 - Safe transfer and backup

**Draft request:**

> Which parts of your setup can be exported or recreated for a backup
> maintainer? Are any instructions tied to a paid account, private client
> storage, or vendor feature that cannot be committed here? Could we test the
> sanitized setup on a clean checkout without changing the live site?

**Why:** Turns documentation into a tested continuity plan while respecting
vendor and privacy boundaries.

**Review decision:** [ ] Send as written  [ ] Revise  [ ] Do not send

## C. Review and disposition of the responses

Do not paste raw responses into a public issue. Review them first:

| Response type | Proposed destination after approval |
|---|---|
| Durable, non-sensitive repository rule | `CONTRIBUTING.md`, `AGENTS.md`, or a reviewed repository skill |
| Bounded technical implementation | GitHub issue |
| Public-site content follow-up | `BACKLOG.md` |
| Credential, account, or private deployment detail | Approved private runbook or secret manager |
| Vendor-specific export | Approved private backup unless safe and licensed for the repository |
| Obsolete or duplicative instruction | Record the decision, then omit it |

Before promoting any response:

1. Verify it on a clean branch or clean checkout.
2. Confirm it does not depend on one maintainer's personal identity, device, or
   private data.
3. Replace machine-specific paths with documented placeholders where possible.
4. Name an owner and backup.
5. Add an acceptance check.
6. Obtain explicit approval for the target location.
