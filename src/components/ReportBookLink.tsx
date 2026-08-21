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
}: {
  slug: string;
  title: string;
  /** Overrides the rendered PDF, for reports with a designed edition hosted elsewhere. */
  pdfUrl?: string;
}) {
  const book = bookViews[slug];
  if (!book) return null;

  return (
    <ReportBook
      title={title}
      pages={[...book.pages]}
      aspect={book.aspect}
      pdfUrl={pdfUrl ?? asset(book.pdf)}
    />
  );
}
