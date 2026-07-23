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
export interface TableData {
  caption?: string;
  headers: string[];
  rows: string[][];
}

export interface TableBlock {
  table: TableData;
}

// ── Charts ───────────────────────────────────────────────────────────────
//
// Quantitative comparisons render as charts rather than tables: a reader
// comparing eight prices or four benchmark scores is asking a question about
// magnitude, and a bar answers it faster than a column of numerals.
//
// Categorical tables stay tables. A chart of "risk tier to control posture"
// would be a bar chart of nothing.
//
// Every chart carries its own `data` table, rendered in a disclosure beneath
// it. The figures are therefore never gated behind the graphic: screen
// readers, print, and anyone who wants the exact numbers get the table.

/** One labelled row on any of the chart forms. */
interface ChartRowBase {
  label: string;
  /** Optional second line under the row label, e.g. "6B active of 119B". */
  note?: string;
}

/** Single-series horizontal bars. Nominal categories, so every bar takes the
 *  same hue: bar length already encodes the value, and spending the identity
 *  channel on it as well would say nothing new. */
export interface BarsChart {
  kind: "bars";
  caption?: string;
  /** Axis maximum. Defaults to the largest value in the set. */
  max?: number;
  rows: (ChartRowBase & { value: number; valueLabel: string })[];
  data: TableData;
}

/** Two-segment stacked bars, for a total that decomposes into two parts. */
export interface StackChart {
  kind: "stack";
  caption?: string;
  /** Legend labels for the two segments, in stacking order. */
  keys: [string, string];
  max?: number;
  rows: (ChartRowBase & { parts: [number, number]; valueLabel: string })[];
  data: TableData;
}

/** Paired dots joined by a connector: two measures of the same row where the
 *  distance between them is the point. `b` may be absent when the second
 *  measure was not reported, in which case `missingLabel` says so. */
export interface DumbbellChart {
  kind: "dumbbell";
  caption?: string;
  keys: [string, string];
  max?: number;
  rows: (ChartRowBase & {
    a: number;
    aLabel: string;
    b?: number;
    bLabel?: string;
    missingLabel?: string;
  })[];
  data: TableData;
}

/** A point estimate with an optional uncertainty band around it. Used where
 *  reporting the central figure alone would overstate its precision. */
export interface RangeChart {
  kind: "range";
  caption?: string;
  max?: number;
  /** Legend label for the band, e.g. "Interquartile range". */
  bandKey?: string;
  /** Legend label for the point, e.g. "Median estimate". */
  pointKey: string;
  rows: (ChartRowBase & {
    low?: number;
    high?: number;
    point: number;
    pointLabel: string;
  })[];
  data: TableData;
}

export interface ChartBlock {
  chart: BarsChart | StackChart | DumbbellChart | RangeChart;
}

export type Paragraph =
  | string
  | LeadParagraph
  | FormulaBlock
  | ListBlock
  | TableBlock
  | ChartBlock;

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
