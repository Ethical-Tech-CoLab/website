// ─────────────────────────────────────────────────────────────────────────
// Shared paragraph types for the publication reports.
//
// Each report content file may declare its own narrower Paragraph union.
// TypeScript structural typing means a narrower union stays assignable to
// this one, so existing content files need no change unless they want to
// use a block type they did not previously use.
//
// House style for these reports: no em dashes, no dash ranges, no inline
// bold. Emphasis is carried by the `lead` field, not by markup.
// ─────────────────────────────────────────────────────────────────────────

/** Prose introduced by an accent-coloured lead-in. Used for labelled
 *  entries such as limitations and defined variables. */
export interface LeadParagraph {
  lead: string;
  text: string;
}

/** A formula shown in monospace, kept alongside its plain-language
 *  description rather than instead of it. Several formulas are ambiguous
 *  when written out in words. */
export interface FormulaBlock {
  formula: string;
  note?: string;
}

/** A bulleted or numbered list. Papers use lists heavily for risk factors,
 *  data sources, and legal provisions; flattening them into prose costs
 *  the reader the ability to scan. */
export interface ListBlock {
  intro?: string;
  list: string[];
  ordered?: boolean;
}

/** A simple data table. Rows must all have the same length as `headers`. */
export interface TableBlock {
  table: {
    caption?: string;
    headers: string[];
    rows: string[][];
  };
}

export type Paragraph =
  | string
  | LeadParagraph
  | FormulaBlock
  | ListBlock
  | TableBlock;

export interface ReportSection {
  id: string;
  number: string;
  title: string;
  paragraphs: Paragraph[];
}

export interface Citation {
  ref: string;
  url?: string;
}
