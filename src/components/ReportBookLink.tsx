import type { ReactNode } from "react";

import { ReportBook } from "@/components/ReportBook";
import { bookViews } from "@/content/publications/books";
import { asset } from "@/lib/asset";

/**
 * The "Read as book" button for a report page, looked up by slug.
 *
 * Every report page carries one of these in its hero. Keeping the lookup here
 * means a page needs no knowledge of whether its pages have been rendered yet:
 * if the slug has no book view, the button simply does not render.
 */
export function ReportBookLink({
  slug,
  title,
  pdfUrl,
  className,
  children,
}: {
  slug: string;
  title: string;
  /** Overrides the rendered PDF, for reports with a designed edition hosted elsewhere. */
  pdfUrl?: string;
  /** Trigger styling. Defaults to the report page's pill button; the demo
   *  runner passes its own so the book sits in the list of ways in. */
  className?: string;
  /** Trigger content, when the default "Read as book" label does not fit
   *  the surface it is placed on. */
  children?: ReactNode;
}) {
  const book = bookViews[slug];
  if (!book) return null;

  return (
    <ReportBook
      title={title}
      pages={[...book.pages]}
      aspect={book.aspect}
      pdfUrl={pdfUrl ?? asset(book.pdf)}
      className={className}
    >
      {children}
    </ReportBook>
  );
}
