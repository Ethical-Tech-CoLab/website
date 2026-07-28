// Registry of reports that have an old-school "book" view (a page-curl over the
// original PDF, see ReportBook.tsx). Keyed by the report's slug so both the
// report page and the /publications catalogue can offer the book consistently.
//
// A report appears here only once its pages have been pre-rendered by
// scripts/render-report-pages.mjs. Today that is After the Corridor, the one
// report with a designed PDF.

import { afterTheCorridorBook } from "./after-the-corridor-book";
import { whatIsEthicalAiBook } from "./what-is-ethical-ai-book";

export type BookView = {
  pages: string[];
  aspect: number;
};

export const bookViews: Record<string, BookView> = {
  "after-the-corridor": {
    pages: [...afterTheCorridorBook.pages],
    aspect: afterTheCorridorBook.aspect,
  },
  "what-is-ethical-ai": {
    pages: [...whatIsEthicalAiBook.pages],
    aspect: whatIsEthicalAiBook.aspect,
  },
};

/** Find a book view from a publication URL like "/publications/after-the-corridor". */
export function bookForUrl(url?: string): BookView | undefined {
  if (!url) return undefined;
  const match = url.match(/\/publications\/([^/?#]+)/);
  return match ? bookViews[match[1]] : undefined;
}
