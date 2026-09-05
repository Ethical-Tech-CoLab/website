import type { Metadata } from "next";
import {
  dictionaryDomains,
  dictionaryTerms,
  libraryShelves,
  librarySources,
} from "@/content/publications/cyber-dictionary-data";

// The printed edition of the Cyber Dictionary and Database Library.
//
// The live tool is a search box: you arrive knowing the word you want. Print
// cannot do that, so this edition uses the two forms that solved the same
// problem before search existed — an A-to-Z dictionary you thumb through by
// running head, and a library catalogue arranged by shelf.
//
// It has its own route rather than going through /print/[slug] because the
// generic printable edition typesets prose sections, and none of this is
// prose: it is 542 headwords in two columns and 105 catalogue cards.
//
// This is what scripts/render-report-books.mjs prints for the book view, so
// every rule here is a rule about paper.

export const metadata: Metadata = {
  title: "The Cyber Dictionary and Database Library (print edition)",
  // A printable duplicate of a page that is already indexed.
  robots: { index: false, follow: false },
};

/** The letter a headword files under. Digits and symbols share one section,
 *  the way a printed dictionary puts them before A rather than inventing a
 *  section per character. */
function fileLetter(term: string): string {
  const first = term.trim()[0]?.toUpperCase() ?? "";
  return /[A-Z]/.test(first) ? first : "#";
}

/** Sort the way a dictionary does: ignore case, spaces and punctuation, so
 *  "Air-gap", "Airgap" and "air gap" would land next to each other. */
const sortKey = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

export default function CyberDictionaryPrintPage() {
  /* Four figures on a title page want their separator. */
  const termCount = dictionaryTerms.length.toLocaleString("en-GB");
  const sorted = [...dictionaryTerms].sort((a, b) =>
    sortKey(a.term).localeCompare(sortKey(b.term)),
  );

  // One section per letter, in the order the letters actually occur.
  const letters: { letter: string; entries: typeof sorted }[] = [];
  for (const entry of sorted) {
    const letter = fileLetter(entry.term);
    const last = letters[letters.length - 1];
    if (last && last.letter === letter) last.entries.push(entry);
    else letters.push({ letter, entries: [entry] });
  }

  const shelves = libraryShelves
    .map((shelf) => ({
      shelf,
      sources: librarySources.filter((s) => s.shelf === shelf),
    }))
    .filter((s) => s.sources.length > 0);

  const domainCounts = dictionaryDomains
    .map((domain) => ({
      domain,
      count: dictionaryTerms.filter((t) => t.domain === domain).length,
    }))
    .filter((d) => d.count > 0)
    .sort((a, b) => b.count - a.count);

  const freeSources = librarySources.filter((s) =>
    /^free/i.test(s.cost.trim()),
  ).length;

  return (
    <div data-theme="light" className="print-edition dict-edition">
      <style>{PRINT_CSS}</style>

      {/* Cover */}
      <section className="print-page print-cover">
        <p className="print-eyebrow">Ethical Tech CoLab · Reference edition</p>
        <h1 className="print-title">
          The Cyber
          <br />
          Dictionary
          <br />
          and Database Library
        </h1>
        <p className="print-subtitle">
          {termCount} terms in plain English, and{" "}
          {librarySources.length} places to get the data
        </p>
        <div className="print-byline">
          <p>Ethical Tech CoLab</p>
          <p>September 2026</p>
          <p className="print-authors">
            Compiled from the live dictionary at
            ethical-tech-colab.github.io/cyber-dictionary
          </p>
        </div>
        <p className="print-thesis">
          A dictionary is a machine for the moment you looked something up. This
          edition keeps that moment intact on paper: the terms run A to Z with
          the range printed at the head of every page, and the database library
          is a catalogue you walk shelf by shelf rather than a search box you
          have to already know the answer for.
        </p>
      </section>

      {/* Front matter */}
      <section className="print-page">
        <p className="print-section-number">Front matter</p>
        <h2 className="print-h2">How to use this book</h2>
        <div className="dict-frontmatter">
          <p>
            The book has two rooms. <strong>The Dictionary</strong> defines{" "}
            {termCount} technology and cybersecurity terms across{" "}
            {dictionaryDomains.length} domains, each in a sentence or two of the
            plain English you wanted at the moment you actually looked the term
            up. <strong>The Database Library</strong> catalogues{" "}
            {librarySources.length} open data sources and open-source
            technologies across {shelves.length} shelves, each with what it
            gives you, how to reach it, and what it costs.
          </p>
          <p>
            Entries in the Dictionary are filed by headword, ignoring case,
            spaces and hyphens, so <em>air-gap</em> and <em>airgap</em> sit
            together. Where a term is normally met as an abbreviation, the
            expansion follows the headword in italics; where it is normally met
            expanded, the abbreviation does. The small capitals at the end of a
            definition name the domain the term belongs to, which is the answer
            to the second question a reader usually has: not only what it means,
            but which part of the field is talking.
          </p>
          <p>
            The Database Library is arranged by shelf rather than alphabetically, because
            nobody arrives at a library knowing the name of the thing they need.
            Each catalogue card gives the operator, the address, what the source
            actually holds, how to connect a program to it, and the cost line —
            which is the field most likely to have changed since printing, and
            the one worth checking against the live entry before you build on
            it.
          </p>
          <p className="dict-caveat">
            <strong>A note on currency.</strong> Definitions age slowly;
            endpoints, licences and free tiers age fast. The live edition is the
            authority on the Database Library. Treat a cost line here as a description of
            what the source offered when this edition was compiled, not as a
            promise about today.
          </p>
        </div>
      </section>

      {/* Key figures */}
      <section className="print-page">
        <p className="print-section-number">The collection in numbers</p>
        <h2 className="print-h2">What is in here</h2>
        <div className="print-stats">
          <div className="print-stat">
            <p className="print-stat-value">{termCount}</p>
            <p className="print-stat-label">
              terms defined, across {dictionaryDomains.length} domains
            </p>
          </div>
          <div className="print-stat">
            <p className="print-stat-value">{librarySources.length}</p>
            <p className="print-stat-label">
              sources catalogued, across {shelves.length} shelves
            </p>
          </div>
          <div className="print-stat">
            <p className="print-stat-value">{letters.length}</p>
            <p className="print-stat-label">
              alphabetical sections, {letters[0]?.letter} to{" "}
              {letters[letters.length - 1]?.letter}
            </p>
          </div>
          <div className="print-stat">
            <p className="print-stat-value">{freeSources}</p>
            <p className="print-stat-label">
              sources free to use at the tier described
            </p>
          </div>
        </div>

        <h3 className="dict-h3">Terms by domain</h3>
        <table className="dict-table">
          <tbody>
            {domainCounts.map((d) => (
              <tr key={d.domain}>
                <td>{d.domain}</td>
                <td className="dict-num">{d.count}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="dict-h3">Sources by shelf</h3>
        <table className="dict-table">
          <tbody>
            {shelves.map((s) => (
              <tr key={s.shelf}>
                <td>{s.shelf}</td>
                <td className="dict-num">{s.sources.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Part one: the dictionary */}
      <section className="print-page dict-divider">
        <p className="print-section-number">Part one</p>
        <h2 className="dict-part">The Dictionary</h2>
        <p className="dict-part-note">
          {termCount} terms, A to Z. The head of each page carries
          the range of terms on it.
        </p>
      </section>

      {/* One continuous two-column flow, the way a dictionary is set: the
          letter bands travel with the text rather than starting a new sheet,
          so no column is left half-empty because a letter ran short. */}
      <div className="dict-columns">
        {letters.map(({ letter, entries }) => (
          <div key={letter} className="dict-letter-group">
            <div className="dict-letter-rule">
              <span className="dict-letter">{letter}</span>
              <span className="dict-letter-count">
                {entries.length} {entries.length === 1 ? "entry" : "entries"}
              </span>
            </div>
            {entries.map((entry) => (
              <div key={entry.term} className="dict-entry">
                <p className="dict-headword">
                  {entry.term}
                  {entry.alias && (
                    <span className="dict-alias"> {entry.alias}</span>
                  )}
                </p>
                <p className="dict-def">
                  {entry.definition}{" "}
                  <span className="dict-domain">{entry.domain}</span>
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Part two: the library */}
      <section className="print-page dict-divider">
        <p className="print-section-number">Part two</p>
        <h2 className="dict-part">The Database Library</h2>
        <p className="dict-part-note">
          {librarySources.length} open data sources and open-source tools,
          arranged by shelf.
        </p>
      </section>

      {shelves.map(({ shelf, sources }) => (
        <section key={shelf} className="lib-shelf-section">
          <div className="dict-letter-rule">
            <span className="dict-shelf">{shelf}</span>
            <span className="dict-letter-count">
              {sources.length} {sources.length === 1 ? "source" : "sources"}
            </span>
          </div>
          <div className="lib-columns">
            {sources.map((source) => (
              <div key={source.name} className="lib-card">
                <p className="lib-name">{source.name}</p>
                <p className="lib-operator">
                  {source.operator} · {source.cost}
                </p>
                <p className="lib-what">{source.what}</p>
                <p className="lib-how">
                  <span className="lib-label">How to connect</span> {source.how}
                </p>
                <p className="lib-url">{source.url.replace(/^https?:\/\//, "")}</p>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Colophon */}
      <section className="print-page">
        <p className="print-section-number">Colophon</p>
        <h2 className="print-h2">About this edition</h2>
        <div className="dict-frontmatter">
          <p>
            Compiled by the Ethical Tech CoLab from the Cyber Dictionary and
            Library, a searchable web tool published at
            ethical-tech-colab.github.io/cyber-dictionary. The entries in this
            book and the entries in that tool come from the same two files in
            the same repository; this edition is typeset from them rather than
            rewritten, so the two cannot drift apart in wording.
          </p>
          <p>
            Definitions are written to be read cold, by someone who does not yet
            have the surrounding vocabulary. That is a deliberate constraint and
            it costs precision: where a term has a formal standards definition,
            this book gives the working one instead, and says what the term is
            for rather than exactly what it denotes.
          </p>
          <p className="dict-caveat">
            Source and citation:
            github.com/Ethical-Tech-CoLab/cyber-dictionary
          </p>
        </div>
      </section>
    </div>
  );
}

// Kept inline rather than in globals.css: these rules exist only for this
// route, and every one of them is about a printed page.
const PRINT_CSS = `
@page {
  size: 210mm 297mm;
  margin: 18mm 16mm 20mm;
}

.dict-edition {
  --print-ink: #14101c;
  --print-accent: #5f6b00;
  background: #ffffff;
  color: var(--print-ink);
  max-width: 178mm;
  margin: 0 auto;
  padding: 12mm 0;
  font-size: 10.5pt;
  line-height: 1.55;
  /* The site sets body copy in a monospace face. A dictionary is the one
     place that is wrong: 542 justified definitions in monospace read as a
     code listing, and the even colour of a serif is what makes a column of
     them scannable. Georgia is on every machine this is printed from. */
  font-family: Georgia, "Iowan Old Style", "Times New Roman", serif;
}

.print-cover { break-after: page; padding-top: 14mm; }
.print-page + .print-page { margin-top: 12mm; }
.print-eyebrow {
  font-family: var(--font-space-mono), monospace;
  font-size: 8pt; letter-spacing: 0.16em; text-transform: uppercase;
  color: rgba(20, 16, 28, 0.55);
}
.print-title {
  font-family: var(--font-bebas), sans-serif;
  font-size: 46pt; line-height: 0.92; text-transform: uppercase;
  margin-top: 8mm;
}
.print-subtitle {
  font-family: var(--font-bebas), sans-serif;
  font-size: 16pt; line-height: 1.15; text-transform: uppercase;
  letter-spacing: 0.02em; color: rgba(20, 16, 28, 0.62); margin-top: 6mm;
}
.print-byline { margin-top: 10mm; font-size: 9.5pt; }
.print-byline p { color: rgba(20, 16, 28, 0.7); }
.print-authors { margin-top: 3mm; }
.print-thesis {
  margin-top: 12mm; padding-left: 6mm;
  border-left: 2px solid var(--print-accent);
  font-size: 11pt; line-height: 1.6;
}
.print-section-number {
  font-family: var(--font-space-mono), monospace;
  font-size: 9pt; color: var(--print-accent);
}
.print-h2 {
  font-family: var(--font-bebas), sans-serif;
  font-size: 22pt; line-height: 1.05; text-transform: uppercase;
  margin-top: 2mm; margin-bottom: 6mm;
  break-after: avoid;
}
.print-stats { display: grid; grid-template-columns: repeat(2, 1fr); gap: 6mm; }
.print-stat { border-top: 1px solid rgba(20, 16, 28, 0.18); padding-top: 4mm; }
.print-stat-value {
  font-family: var(--font-bebas), sans-serif;
  font-size: 26pt; line-height: 1; color: var(--print-accent);
}
.print-stat-label { margin-top: 2mm; font-size: 9pt; color: rgba(20, 16, 28, 0.7); }

.dict-frontmatter p { margin-bottom: 4mm; max-width: 150mm; }
.dict-caveat {
  border-top: 1px solid rgba(20, 16, 28, 0.18);
  padding-top: 4mm; font-size: 9.5pt; color: rgba(20, 16, 28, 0.78);
}

.dict-h3 {
  font-family: var(--font-bebas), sans-serif;
  font-size: 14pt; text-transform: uppercase; letter-spacing: 0.02em;
  margin-top: 10mm; margin-bottom: 3mm; break-after: avoid;
}
.dict-table { width: 100%; font-size: 9.5pt; border-collapse: collapse; }
.dict-table td {
  border-bottom: 1px solid rgba(20, 16, 28, 0.12);
  padding: 1.6mm 0;
}
.dict-num {
  text-align: right;
  font-family: var(--font-space-mono), monospace;
  font-size: 9pt; color: var(--print-accent);
}

/* A part title gets a sheet of its own, the way a book's does. */
.dict-divider {
  break-before: page;
  padding-top: 60mm;
  text-align: center;
}
.dict-divider .print-section-number { color: rgba(20, 16, 28, 0.5); }
.dict-part {
  font-family: var(--font-bebas), sans-serif;
  font-size: 40pt; line-height: 1; text-transform: uppercase;
  margin-top: 4mm;
}
.dict-part-note {
  margin: 6mm auto 0; max-width: 110mm;
  font-size: 10pt; color: rgba(20, 16, 28, 0.7);
}

/* The dictionary proper starts on a fresh sheet; the letters inside it do
   not, so the columns stay full to the last page. */
.dict-columns { break-before: page; }
.dict-letter-group { break-inside: auto; }
.lib-shelf-section { break-before: page; }
.dict-letter-rule {
  display: flex; align-items: baseline; justify-content: space-between;
  border-bottom: 2px solid var(--print-ink);
  padding-bottom: 1.6mm; margin-bottom: 3mm;
  /* A letter band with nothing under it is the one thing worse than a short
     column, so it is glued to the entries that follow. */
  break-after: avoid;
  break-inside: avoid;
}
.dict-letter {
  font-family: var(--font-bebas), sans-serif;
  font-size: 22pt; line-height: 1;
}
.dict-letter-group + .dict-letter-group .dict-letter-rule { margin-top: 5mm; }
.dict-shelf {
  font-family: var(--font-bebas), sans-serif;
  font-size: 20pt; line-height: 1.05; text-transform: uppercase;
  max-width: 130mm;
}
.dict-letter-count {
  font-family: var(--font-space-mono), monospace;
  font-size: 8pt; letter-spacing: 0.1em; text-transform: uppercase;
  color: rgba(20, 16, 28, 0.55); flex: none;
}

/* Two columns is what makes it read as a dictionary rather than a list: the
   measure drops to roughly forty characters, which is where a one-sentence
   definition scans in a single eye movement. */
.dict-columns {
  column-count: 2;
  column-gap: 8mm;
  column-rule: 1px solid rgba(20, 16, 28, 0.14);
}
.dict-columns { orphans: 2; widows: 2; }
.dict-entry {
  break-inside: avoid;
  margin-bottom: 3.4mm;
}
.dict-headword {
  font-weight: 700;
  font-size: 9.6pt;
  line-height: 1.3;
}
.dict-alias {
  font-weight: 400; font-style: italic;
  color: rgba(20, 16, 28, 0.68);
}
.dict-def {
  font-size: 9pt;
  line-height: 1.42;
  color: rgba(20, 16, 28, 0.9);
  text-align: justify;
  /* Justification stops at the last line: the domain tag rides at the end of
     it, and stretching a three-word tail across the measure to accommodate
     the tag opens rivers a reader trips over. */
  text-align-last: left;
  hyphens: auto;
}
.dict-domain {
  font-family: var(--font-space-mono), monospace;
  font-size: 6.6pt; letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--print-accent);
  white-space: nowrap;
}

/* Catalogue cards carry five fields each, so they get a wider measure than a
   definition does — two columns, but no rule between them. */
.lib-columns { column-count: 2; column-gap: 8mm; }
.lib-card {
  break-inside: avoid;
  border-top: 1px solid rgba(20, 16, 28, 0.16);
  padding-top: 2.4mm;
  margin-bottom: 4.5mm;
}
.lib-name { font-weight: 700; font-size: 9.8pt; line-height: 1.25; }
.lib-operator {
  font-family: var(--font-space-mono), monospace;
  font-size: 7pt; letter-spacing: 0.06em; text-transform: uppercase;
  color: var(--print-accent);
  margin-top: 1mm;
}
.lib-what { font-size: 8.8pt; line-height: 1.42; margin-top: 1.6mm; }
.lib-how {
  font-size: 8.4pt; line-height: 1.4; margin-top: 1.6mm;
  color: rgba(20, 16, 28, 0.82);
}
.lib-label {
  font-family: var(--font-space-mono), monospace;
  font-size: 6.6pt; letter-spacing: 0.1em; text-transform: uppercase;
  color: rgba(20, 16, 28, 0.55);
}
.lib-url {
  font-family: var(--font-space-mono), monospace;
  font-size: 7.4pt; margin-top: 1.4mm; color: var(--print-accent);
  word-break: break-all;
}
`;
