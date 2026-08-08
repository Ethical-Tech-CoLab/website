# Site control recommendations

This document proposes governance and technical controls for maintaining the
Ethical Tech CoLab website safely when work is performed by people, AI clients,
or a combination of both.

These are recommendations, not a record that the controls have already been
enabled. GitHub settings changes require repository-owner approval.

## Current control baseline

Verified on 2026-08-08:

| Area | Current state |
|---|---|
| Default branch | `main` |
| Branch protection | None |
| Repository rulesets | None |
| Pull-request checks | No workflow runs before merge |
| Deployment | GitHub Actions runs `npm ci` and `npm run build` after a push to `main` |
| Deployment permissions | GitHub Pages OIDC with scoped `contents`, `pages`, and `id-token` permissions |
| Deployment concurrency | One Pages deployment at a time; an active publish is not cancelled |
| Lint | Configured, but the legacy full-repository baseline fails |
| Automated tests | No test script |
| Production source | Next.js static export from `src/` |
| Tracked mirror | `static-site/`, generated from `out/` |
| Maintainer continuity | The repository does not document whether important client-only AI instructions exist |

The deployment workflow is simple and has recently succeeded, but it detects a
bad build only after code is already on `main`. The absence of branch controls
also allows accidental direct pushes, history deletion, or unreviewed changes.

## 1. Protect `main`

Create a GitHub ruleset or branch-protection rule with:

- pull requests required before merge;
- at least one approval;
- required approval from an appropriate owner for high-risk content;
- required status checks once pull-request CI exists;
- all review conversations resolved;
- force pushes and branch deletion blocked;
- stale approvals dismissed when relevant files change;
- an explicitly documented emergency path for repository owners.

Do not enable a required lint check until the baseline in
[UPDATES-NEEDED.md](UPDATES-NEEDED.md) is fixed. A permanently failing required
check teaches maintainers to bypass controls.

Prefer squash merge or another agreed history policy, but do not rewrite
already shared commits solely to make history look tidy.

## 2. Establish ownership without creating a bottleneck

Add a `CODEOWNERS` file after the maintainers agree on roles. Use ownership by
risk domain, not merely by file count:

| Domain | Approval responsibility |
|---|---|
| Public positioning, team, partners, and biographies | Designated content owner |
| Publication claims, methods, citations, and statistics | Designated research owner |
| Components, dependencies, Next.js configuration, and workflows | Designated technical owner |
| Logos, photos, and third-party media | Designated brand or rights owner |
| Security-sensitive changes | Security contact under `SECURITY.md` |

Name at least one backup for each critical role. The current maintenance
workflow — most of it [@carolina-moron](https://github.com/carolina-moron)'s —
should be captured, but no deployment or maintenance path should depend on one
person's device, account, chat history, or AI subscription.

## 3. Run checks before merge

**Prerequisite:** the `gh` token currently in use has no `workflow` scope, so
any push that adds or edits a file under `.github/workflows/` is rejected
outright (`BACKLOG.md` section 8). Re-authorise with `workflow` scope before
attempting this section.

Add a pull-request CI workflow that uses the same Node version and install
method as deployment:

1. `npm ci`
2. `npm run lint` after the baseline is repaired
3. `npm run build`
4. focused smoke checks for critical generated routes and assets

Keep deployment restricted to `main`. A pull request should build and validate
without publishing.

Further recommendations:

- pin a local Node version to match the workflow's Node 20;
- cache npm downloads, not generated output;
- exclude `static-site/` from lint because it is generated;
- add a drift check if retaining the tracked static snapshot;
- add dependency update automation with small, reviewable pull requests;
- never auto-merge framework or security updates without a successful build
  and route review.

## 4. Classify changes by review risk

### Low risk

Examples: verified typo, confirmed dead link replacement, or an approved image
swap with no layout change.

Required control: focused pull request, build, route review, one maintainer.

### Medium risk

Examples: new project card, team biography, partner description, navigation
change, demo embedding, or styling change.

Required control: content or technical owner as appropriate, responsive and
theme review, full production build.

### High risk

Examples: publication numbers or conclusions, legal or institutional
statements, dependency/framework upgrades, GitHub workflow changes, domain
changes, security behavior, or removal of public content.

Required control: subject-matter approval plus technical approval, explicit
source evidence, rollback plan, and live-site verification.

## 5. Treat AI configuration as operational infrastructure

AI assistance does not reduce the need for review. It introduces an additional
configuration layer that must be governed.

Durable, non-sensitive instructions needed to maintain the site should be
versioned in the repository or linked from it. This includes:

- project-specific rules and source-of-truth maps;
- reusable skills, agents, or commands;
- expected validation commands;
- generated-artifact procedures;
- prompts or checklists that enforce research sourcing;
- known failure modes and recovery steps.

Client-only configuration should have an inventory that records:

- tool and version;
- purpose;
- activation method;
- owner and backup;
- whether an export is stored;
- data or repositories the tool can access;
- review date.

Never place tokens, cookies, private keys, personal chat exports, or restricted
partner material in this public repository. Record environment-variable names
and setup procedures, but keep values in an approved secret store.

For AI-assisted pull requests, reviewers should evaluate the actual diff and
evidence. A statement that an AI generated or checked something is not itself a
control.

## 6. Control content provenance

Every consequential factual change should be traceable to an authoritative
source. Pull requests should identify:

- the source repository, document, or primary URL;
- who approved biographies, affiliations, and partner relationships;
- publication page or section for a quantitative claim;
- date checked for volatile external links or statistics;
- licensing or permission basis for contributed media.

Where the website mirrors another repository, define which repository wins and
how synchronization occurs. Do not maintain two independent versions by hand.

## 7. Control generated artifacts and releases

Maintain one deployment path: GitHub Actions building the Next.js source.

- Never deploy by hand-editing `static-site/`.
- Keep the generated snapshot in a separate commit if it remains tracked.
- Consider replacing the Bash sync script with a cross-platform script.
- Consider removing the tracked snapshot in a future architecture decision if
  its convenience no longer justifies review noise and repository size.
- Do not change the artifact policy casually; document and approve the decision
  first.

After each merge, monitor the Pages workflow and verify the live route. For
rollback, revert the bad change through normal Git history and let the workflow
redeploy.

## 8. Maintain operational visibility

At minimum:

- verify the Pages workflow and live site after each merge;
- periodically check important external links and embedded demos;
- assign an owner for custom-domain and DNS checks;
- review dependency advisories on a schedule;
- keep `SECURITY.md` current;
- record maintenance decisions in pull requests, not only in private chats.

Issue labels should distinguish website defects, content requests, research
review, infrastructure, external-repository work, and organizational tasks.
The website issue tracker should not become the only record for unrelated CoLab
operations.

## Recommended implementation order

1. Re-authorise the `gh` token with `workflow` scope. Without it, any push
   touching `.github/workflows/*` is rejected, which blocks steps 2 and 3
   below (see `UPD-002` and `BACKLOG.md` section 8).
2. Review the maintainer-workflow questions in
   [UPDATES-NEEDED.md](UPDATES-NEEDED.md) and capture the existing workflow
   without secrets.
3. Repair the lint baseline and add a pull-request build workflow.
4. Protect `main` and require the passing build.
5. Agree on ownership and add `CODEOWNERS` plus a pull-request template.
6. Pin the local Node version and assess dependency advisories.
7. Add focused smoke checks.
8. Decide the long-term policy for `static-site/`.
9. Review issue taxonomy, domain ownership, licensing, and continuity every
   six months.

Each control should have a named owner, a backup, an acceptance test, and a
review date before it is considered complete.
