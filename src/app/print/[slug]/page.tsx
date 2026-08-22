import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { reports, reportSlugs, sectionParagraphs } from "@/content/publications/reports";
import { ReportBody } from "@/components/ReportBody";

// The printable edition of a report: the same content as
// /publications/<slug>, laid out for paper rather than for scrolling.
//
// Only two reports have a designed PDF of their own. The rest are web-native,
// so this route is where their PDF comes from: scripts/render-report-books.mjs
// prints these pages with headless Chrome, and the resulting PDF is rasterized
// into the page images the "Read as book" viewer flips through.
//
// It is deliberately plain — no motion, no site chrome, light theme — because
// every pixel here ends up as a printed page.

export const dynamicParams = false;

export function generateStaticParams() {
  return reportSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const report = reports[slug];
  return {
    title: report ? `${report.title} (print edition)` : "Print edition",
    // A printable duplicate of a page that is already indexed.
    robots: { index: false, follow: false },
  };
}

export default async function PrintReportPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const report = reports[slug];
  if (!report) notFound();

  const byline = [report.org, report.advisor, report.date].filter(Boolean);

  return (
    <div data-theme="light" className="print-edition">
      <style>{PRINT_CSS}</style>

      {/* Cover */}
      <section className="print-page print-cover">
        <p className="print-eyebrow">{report.eyebrow}</p>
        <h1 className="print-title">{report.title}</h1>
        <p className="print-subtitle">{report.subtitle}</p>
        <div className="print-byline">
          {byline.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
          <p className="print-authors">{report.authors}</p>
        </div>
        <p className="print-thesis">{report.thesis}</p>
      </section>

      {/* Key figures */}
      {report.stats.length > 0 && (
        <section className="print-page">
          <h2 className="print-h2">Key figures</h2>
          <div className="print-stats">
            {report.stats.map((stat) => (
              <div key={stat.value} className="print-stat">
                <p className="print-stat-value">{stat.value}</p>
                <p className="print-stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Body */}
      {report.sections.map((section) => (
        <section key={section.id} className="print-page">
          <p className="print-section-number">{section.number}</p>
          <h2 className="print-h2">{section.title}</h2>
          <ReportBody paragraphs={sectionParagraphs(section)} />
        </section>
      ))}

      {/* References */}
      <section className="print-page">
        <p className="print-section-number">References</p>
        <h2 className="print-h2">Sources</h2>
        <ol className="print-refs">
          {report.citations.map((cite, i) => (
            <li key={i}>
              <span className="print-ref-num">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{cite.ref}</span>
            </li>
          ))}
        </ol>
        {report.acknowledgement && (
          <p className="print-note">{report.acknowledgement}</p>
        )}
        {report.disclaimer && (
          <p className="print-note">{report.disclaimer}</p>
        )}
      </section>
    </div>
  );
}

// Kept inline rather than in globals.css: these rules exist only for this
// route. Switching off the site chrome is layout.tsx's job.
const PRINT_CSS = `
@page { size: 210mm 297mm; margin: 20mm 18mm; }

.print-edition {
  --print-ink: #14101c;
  background: #ffffff;
  color: var(--print-ink);
  max-width: 174mm;
  margin: 0 auto;
  padding: 12mm 0;
  font-size: 10.5pt;
  line-height: 1.55;
}

/* Sections flow on from one another the way a book's do; only the cover is
   given a sheet of its own. Forcing a break per section left half the pages
   near-empty. */
.print-cover { break-after: page; padding-top: 12mm; }
.print-page + .print-page { margin-top: 12mm; }
.print-eyebrow {
  font-family: var(--font-space-mono), monospace;
  font-size: 8pt; letter-spacing: 0.16em; text-transform: uppercase;
  color: rgba(20, 16, 28, 0.55);
}
.print-title {
  font-family: var(--font-bebas), sans-serif;
  font-size: 40pt; line-height: 0.95; text-transform: uppercase;
  margin-top: 8mm;
}
.print-subtitle {
  font-family: var(--font-bebas), sans-serif;
  font-size: 18pt; line-height: 1.15; text-transform: uppercase;
  letter-spacing: 0.02em; color: rgba(20, 16, 28, 0.62); margin-top: 6mm;
}
.print-byline { margin-top: 10mm; font-size: 9.5pt; }
.print-byline p { color: rgba(20, 16, 28, 0.7); }
.print-authors { margin-top: 3mm; }
.print-thesis {
  margin-top: 12mm; padding-left: 6mm;
  border-left: 2px solid #5f6b00;
  font-size: 11.5pt; line-height: 1.6;
}

.print-section-number {
  font-family: var(--font-space-mono), monospace;
  font-size: 9pt; color: #5f6b00;
}
.print-h2 {
  font-family: var(--font-bebas), sans-serif;
  font-size: 22pt; line-height: 1.05; text-transform: uppercase;
  margin-top: 2mm; margin-bottom: 6mm;
  break-after: avoid;
}

.print-stats {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 6mm;
}
.print-stat { border-top: 1px solid rgba(20, 16, 28, 0.18); padding-top: 4mm; }
.print-stat-value {
  font-family: var(--font-bebas), sans-serif;
  font-size: 26pt; line-height: 1; color: #5f6b00;
}
.print-stat-label { margin-top: 2mm; font-size: 9pt; color: rgba(20, 16, 28, 0.7); }

.print-refs { margin-top: 6mm; font-size: 9pt; line-height: 1.5; }
.print-refs li { display: flex; gap: 3mm; margin-bottom: 3mm; break-inside: avoid; }
.print-ref-num {
  font-family: var(--font-space-mono), monospace;
  font-size: 8pt; color: #5f6b00; flex: none;
}
.print-note {
  margin-top: 8mm; padding-top: 4mm; font-size: 8.5pt;
  border-top: 1px solid rgba(20, 16, 28, 0.18);
  color: rgba(20, 16, 28, 0.7);
}

/* Blocks should not be split across a page fold. */
.print-edition figure,
.print-edition table,
.print-edition li { break-inside: avoid; }
.print-edition p { orphans: 2; widows: 2; }
`;
