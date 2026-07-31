// Regenerate HASTE-Paper.md from the website's haste.ts so the two match.
// The .ts is authoritative: it carries the peer-review revisions and the
// copyedit pass. Run from the website repo root (needs its typescript).
import ts from "typescript";
import { readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const SRC = new URL("../src/content/publications/haste.ts", import.meta.url).pathname;
const OUT = process.argv[2];

// Transpile away the types, then import the module for real data.
const js = ts.transpileModule(readFileSync(SRC, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ESNext },
}).outputText;
const tmp = join(tmpdir(), "haste-report.mjs");
writeFileSync(tmp, js);
const { hasteReport: r } = await import(tmp);

const wrap = (s, w = 78) => {
  const out = [];
  let line = "";
  for (const word of s.split(/\s+/)) {
    if (line && (line + " " + word).length > w) { out.push(line); line = word; }
    else line = line ? line + " " + word : word;
  }
  if (line) out.push(line);
  return out.join("\n");
};

const L = [];
L.push(`# ${r.title}`, "");
L.push(`### A Research Report on ${r.subtitle}`, "");
L.push("*Prepared as a plain-language review of the HASTE research platform*");
L.push("*based on the software and documentation contained in this repository*", "");
L.push("---", "");
L.push(wrap(r.thesis), "", "---", "");

for (const s of r.sections) {
  const n = Number(s.number);
  L.push(n === 0 ? `## ${s.title}` : `## ${n}. ${s.title}`, "");
  for (const p of s.paragraphs) {
    if (typeof p === "string") L.push(wrap(p), "");
    else if (p.lead) L.push(wrap(`**${p.lead}** ${p.text}`), "");
    else if (p.list) {
      if (p.intro) L.push(wrap(p.intro), "");
      for (const item of p.list) {
        const [first, ...rest] = wrap(item, 74).split("\n");
        L.push(`- ${first}`, ...rest.map((x) => `  ${x}`));
      }
      L.push("");
    } else if (p.table) {
      const t = p.table;
      L.push(`| ${t.headers.join(" | ")} |`);
      L.push(`| ${t.headers.map(() => "---").join(" | ")} |`);
      for (const row of t.rows) L.push(`| ${row.join(" | ")} |`);
      L.push("");
      if (t.caption) L.push(wrap(`*${t.caption}*`), "");
    }
  }
  L.push("---", "");
}

L.push("## Sources", "");
for (const c of r.citations) L.push(`- ${c.ref}${c.url ? ` <${c.url}>` : ""}`);
L.push("", "---", "");
L.push("## Attribution", "");
L.push(wrap(r.authors), "");
L.push("> Note: This report is a plain-language summary of an applied research");
L.push("> platform. HASTE outputs are preliminary and exploratory, are not");
L.push("> authoritative damage assessments, and are not a substitute for field survey,");
L.push("> ground-truth reporting, or assessment by qualified humanitarian and");
L.push("> geospatial professionals.");

writeFileSync(OUT, L.join("\n").replace(/\n{3,}/g, "\n\n") + "\n");
console.log("wrote", OUT);
