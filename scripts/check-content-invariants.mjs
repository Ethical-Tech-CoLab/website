// Content invariants that a successful build does not prove.
//
// The cohort head-counts are written by hand in three places — the roster
// itself, `team.researchersCount`, the `cohorts` cards, and the README — and
// nothing has ever forced them to agree. Both times this repository has
// published a wrong cohort size, the cause was the same: a researcher was
// added or missed in one place and the other numbers were never touched. A
// build cannot catch that, because every one of those values is a valid
// string.
//
// Run with `npm run check:content`.

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { team, cohorts, cohortTerms } = await import(
  new URL("../src/content/site.ts", import.meta.url).href
);
const { cyberDictionaryFingerprint } = await import(
  new URL("../src/content/publications/cyber-dictionary-data.ts", import.meta.url).href
);

const failures = [];
const fail = (msg) => failures.push(msg);

const currentTerm = cohortTerms[cohortTerms.length - 1];

/** Researchers actually on the roster for a term. */
function rosterCount(term) {
  return team.researchers.filter((r) => (r.term ?? currentTerm) === term).length;
}

/** "7 researchers" -> 7 */
function statedCount(text) {
  const m = /^(\d+)\s+researchers?$/.exec(text.trim());
  return m ? Number(m[1]) : null;
}

// 1. Every cohort card's head-count matches the roster for that term.
for (const cohort of cohorts) {
  const counts = cohort.items
    .filter((item) => typeof item === "string")
    .map(statedCount)
    .filter((n) => n !== null);

  if (counts.length === 0) {
    fail(`cohorts["${cohort.term}"] has no "N researchers" item to check.`);
    continue;
  }
  for (const stated of counts) {
    const actual = rosterCount(cohort.term);
    if (stated !== actual) {
      fail(
        `cohorts["${cohort.term}"] says ${stated} researchers, but the roster ` +
          `holds ${actual}. Either a researcher is missing from team.researchers ` +
          `or the count is stale.`
      );
    }
  }
}

// 2. team.researchersCount matches the current cohort.
{
  const stated = statedCount(team.researchersCount);
  const actual = rosterCount(currentTerm);
  if (stated === null) {
    fail(`team.researchersCount ("${team.researchersCount}") is not "N researchers".`);
  } else if (stated !== actual) {
    fail(
      `team.researchersCount says ${stated}, but the ${currentTerm} roster holds ${actual}.`
    );
  }
}

// 3. The README's prose count matches the current cohort. This is the exact
//    claim that was wrong: it read "eight applied researchers" against a roster
//    of seven.
{
  const WORDS = [
    "zero", "one", "two", "three", "four", "five", "six", "seven", "eight",
    "nine", "ten", "eleven", "twelve",
  ];
  const readme = fs.readFileSync(path.join(root, "README.md"), "utf8");
  const m = /(\w+)\s+applied researchers/i.exec(readme);
  if (!m) {
    fail("README.md no longer states a '<number> applied researchers' count.");
  } else {
    const actual = rosterCount(currentTerm);
    const stated = WORDS.indexOf(m[1].toLowerCase());
    if (stated !== actual) {
      fail(
        `README.md says "${m[1]} applied researchers", but the ${currentTerm} ` +
          `roster holds ${actual} (${WORDS[actual] ?? actual}).`
      );
    }
  }
}

// 4. A slug must identify one person. The same person may legitimately appear
//    in more than one collection (a fellow who is also a researcher), but two
//    different people sharing a slug would collide on /team/[slug].
{
  const bySlug = new Map();
  const everyone = [
    team.founder,
    ...team.advisors,
    ...team.residentFellows,
    ...team.researchers,
    ...team.collaborators,
  ];
  for (const person of everyone) {
    if (!person?.slug) continue;
    const seen = bySlug.get(person.slug);
    if (seen && seen !== person.name) {
      fail(
        `slug "${person.slug}" is used by two different people: ` +
          `"${seen}" and "${person.name}".`
      );
    }
    bySlug.set(person.slug, person.name);
  }
}


// ---------------------------------------------------------------------------
// The Cyber Dictionary publication is a copy of another repository's data, and
// copies drift. This one had gone three releases stale before anyone noticed —
// the page claiming 1,020 terms while the tool served 1,219 — which is exactly
// the class of error a build cannot catch, because a stale number is a valid
// number. So compare what we hold against what is actually published.
//
// A network failure is not drift. Offline builds are normal and a timeout says
// nothing about upstream, so it warns and moves on.
// ---------------------------------------------------------------------------
async function checkCyberDictionarySync() {
  const BASE = "https://ethical-tech-colab.github.io/cyber-dictionary";
  let live;
  try {
    const sandbox = { window: {} };
    vm.createContext(sandbox);
    for (const file of ["terms.js", "library.js", "cases.js"]) {
      const res = await fetch(`${BASE}/${file}`, { signal: AbortSignal.timeout(20000) });
      if (!res.ok) throw new Error(`${file} returned HTTP ${res.status}`);
      vm.runInContext(await res.text(), sandbox, { filename: file });
    }
    live = {
      terms: sandbox.window.TERMS.length,
      domains: sandbox.window.DOMAINS.length,
      sources: sandbox.window.SOURCES.length,
      shelves: sandbox.window.SHELVES.length,
      cases: sandbox.window.CASES.length,
    };
  } catch (err) {
    console.warn(
      `  ! could not reach the Cyber Dictionary to check for drift ` +
        `(${err.message}) — skipping that check.`
    );
    return;
  }

  const drifted = Object.entries(live).filter(
    ([key, upstream]) => cyberDictionaryFingerprint[key] !== upstream
  );
  if (drifted.length > 0) {
    fail(
      "the Cyber Dictionary publication is behind the live tool — " +
        drifted
          .map(([k, v]) => `${k}: this site has ${cyberDictionaryFingerprint[k]}, upstream has ${v}`)
          .join("; ") +
        ". Fix with: node scripts/sync-cyber-dictionary.mjs && " +
        "npm run build && npm run render:books cyber-dictionary -- --force"
    );
  }
}

await checkCyberDictionarySync();

if (failures.length > 0) {
  console.error("Content invariants failed:\n");
  for (const f of failures) console.error("  - " + f);
  console.error("");
  process.exit(1);
}

console.log(
  `Content invariants OK (${cohorts.length} cohorts, ` +
    `${team.researchers.length} researcher records, ` +
    `Cyber Dictionary in sync at ${cyberDictionaryFingerprint.terms} terms).`
);
