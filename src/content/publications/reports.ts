// One registry of every publication, keyed by its /publications/<slug>.
//
// The report pages each import their own content module directly — they are
// hand-laid-out and want the exact named export. This registry exists for the
// things that must treat all reports uniformly: today, the printable view at
// /print/<slug> that scripts/render-report-books.mjs turns into book pages.
//
// Adding a report: add its module here. The print route, the PDF render, and
// the "Read as book" button all follow from this one line.

import type { Citation, Paragraph } from "./types";

import { afterTheCorridorReport } from "./after-the-corridor";
import { observatoryReport } from "./agentic-behavior-observatory";
import { agenticLanguageReport } from "./agentic-language-development";
import { carbonReport } from "./ai-carbon-footprint";
import { aiModelsResearchReport } from "./ai-models-research";
import { researchReport } from "./ai-research-assistant";
import { ceraiReport } from "./cerai";
import { provenancePassportReport } from "./digital-provenance-passport";
import { diplomaticSimulatorReport } from "./diplomatic-simulator";
import { ercfReport } from "./ercf";
import { erusReport } from "./erus";
import { evacuationIndexReport } from "./evacuation-inform-index";
import { evacuationSimulationReport } from "./evacuation-simulation";
import { forcedLaborRiskReport } from "./forced-labor-structural-risk-index";
import { hasteReport } from "./haste";
import { mariupolReport } from "./mariupol-severity-model";
import { provenanceSearchReport } from "./provenance-search";
import { vangoReport } from "./vango";
import { warGamesReport } from "./war-games";
import { whatIsEthicalAiReport } from "./what-is-ethical-ai";

/** The fields every report carries, plus the ones only some do.
 *
 *  Sections name their body `paragraphs`, except the AI research assistant
 *  report, which calls it `blocks`. Both are read here so no content file
 *  has to be rewritten for the sake of the printable view. */
export interface PrintableReport {
  eyebrow: string;
  title: string;
  subtitle: string;
  org: string;
  advisor?: string;
  date?: string;
  authors: string;
  thesis: string;
  disclaimer?: string;
  acknowledgement?: string;
  stats: readonly { value: string; label: string }[];
  sections: readonly {
    id: string;
    number: string;
    title: string;
    paragraphs?: readonly Paragraph[];
    blocks?: readonly Paragraph[];
  }[];
  citations: readonly Citation[];
}

export const reports: Record<string, PrintableReport> = {
  "after-the-corridor": afterTheCorridorReport,
  "agentic-behavior-observatory": observatoryReport,
  "agentic-language-development": agenticLanguageReport,
  "ai-carbon-footprint": carbonReport,
  "ai-models-research": aiModelsResearchReport,
  "ai-research-assistant": researchReport,
  cerai: ceraiReport,
  "digital-provenance-passport": provenancePassportReport,
  "diplomatic-simulator": diplomaticSimulatorReport,
  ercf: ercfReport,
  erus: erusReport,
  "evacuation-inform-index": evacuationIndexReport,
  "evacuation-simulation": evacuationSimulationReport,
  "forced-labor-structural-risk-index": forcedLaborRiskReport,
  haste: hasteReport,
  "mariupol-severity-model": mariupolReport,
  "provenance-search": provenanceSearchReport,
  vango: vangoReport,
  "war-games": warGamesReport,
  "what-is-ethical-ai": whatIsEthicalAiReport,
};

export const reportSlugs = Object.keys(reports);

/** A section's body, whichever field the content file used for it. */
export function sectionParagraphs(
  section: PrintableReport["sections"][number],
): Paragraph[] {
  return [...(section.paragraphs ?? section.blocks ?? [])];
}
