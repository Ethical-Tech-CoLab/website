#!/usr/bin/env node
/**
 * Sync bundled newsletter issues from the Ethical-Tech-CoLab/newsletter repo
 * into this site's public/newsletter/ so /newsletter/<slug> can embed them.
 *
 * Source of truth: the newsletter repo's self-contained email/*.html files.
 * Usage:
 *   node scripts/sync-newsletter.mjs
 *   NEWSLETTER_REPO=/path/to/newsletter node scripts/sync-newsletter.mjs
 */
import { readdirSync, copyFileSync, mkdirSync, readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { homedir } from "node:os";

const here = dirname(fileURLToPath(import.meta.url));
const siteRoot = join(here, "..");

// Resolve the newsletter repo: env override, sibling checkout, or ~/newsletter.
const candidates = [
  process.env.NEWSLETTER_REPO,
  join(siteRoot, "..", "newsletter"),
  join(homedir(), "newsletter"),
].filter(Boolean);
const repo = candidates.find((p) => existsSync(join(p, "email")));

if (!repo) {
  console.error(
    "✗ Could not find the newsletter repo (looked for an email/ dir in:\n  " +
      candidates.join("\n  ") +
      "\n  Set NEWSLETTER_REPO=/path/to/newsletter and retry.",
  );
  process.exit(1);
}

const srcDir = join(repo, "email");
const destDir = join(siteRoot, "public", "newsletter");
mkdirSync(destDir, { recursive: true });

const issues = readdirSync(srcDir)
  .filter((f) => /^\d{4}-\d{2}\.html$/.test(f))
  .sort();

if (issues.length === 0) {
  console.error(`✗ No YYYY-MM.html issues found in ${srcDir}`);
  process.exit(1);
}

for (const file of issues) {
  copyFileSync(join(srcDir, file), join(destDir, file));
  console.log(`✓ ${file}`);
}
console.log(`\nSynced ${issues.length} issue(s) from ${repo} → public/newsletter/`);

// Flag issues that have no entry in src/content/newsletter.ts.
const contentPath = join(siteRoot, "src", "content", "newsletter.ts");
if (existsSync(contentPath)) {
  const content = readFileSync(contentPath, "utf8");
  const missing = issues
    .map((f) => f.replace(/\.html$/, ""))
    .filter((slug) => !content.includes(`slug: "${slug}"`));
  if (missing.length) {
    console.log(
      `\n⚠ These issues have no entry in src/content/newsletter.ts yet:\n  ` +
        missing.join("\n  ") +
        `\n  Add one { slug, edition, date, blurb } per issue for it to appear.`,
    );
  }
}
