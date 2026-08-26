import { bookViews } from "@/content/publications/books";
import { asset } from "@/lib/asset";

/**
 * The "Download the PDF" button for a report page, looked up by slug.
 *
 * The PDF a report is printed from is the same file the book view turns, so
 * the registry in books.ts is the single source for both. A report with no
 * rendered PDF simply does not get the button, exactly like ReportBookLink.
 */
export function ReportPdfLink({
  slug,
  /** Overrides the registry, for reports with a designed edition hosted elsewhere. */
  pdfUrl,
}: {
  slug: string;
  pdfUrl?: string;
}) {
  const href = pdfUrl ?? (bookViews[slug] ? asset(bookViews[slug].pdf) : null);
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-sweep inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-ink transition-transform hover:scale-[1.03]"
    >
      Download the PDF <span aria-hidden>↗</span>
    </a>
  );
}
