"use client";

// "Read as book" — an old-school flipbook view of the report's original PDF.
//
// The viewer itself now lives in its own package, read-as-book
// (github.com/Ethical-Tech-CoLab/read-as-book), extracted from this file so the
// page-turn is reusable outside the site. What stays here is the site-specific
// part: our trigger-button styling, and running page paths through asset() so
// they resolve under the GitHub Pages base path.
//
// Pages are still pre-rendered to WebP at build time
// (scripts/render-report-pages.mjs) so the browser never loads pdf.js.

import { useMemo, type ReactNode } from "react";
import { ReadAsBook } from "read-as-book/react";
import "read-as-book/styles.css";
import { asset } from "@/lib/asset";

type Props = {
  /** Page image srcs relative to public root, e.g. "publications/…/pages/p01.webp". */
  pages: string[];
  /** Page aspect ratio (width / height) used to size the spread. */
  aspect: number;
  /** Title shown in the viewer chrome. */
  title: string;
  /** External PDF URL for the download link inside the viewer. */
  pdfUrl?: string;
  /** Optional class overrides for the trigger button. */
  className?: string;
  /** Optional custom trigger content; defaults to "Read as book 📖". */
  children?: ReactNode;
};

export function ReportBook({
  pages,
  aspect,
  title,
  pdfUrl,
  className,
  children,
}: Props) {
  // Memoised: a fresh array on every render would rebuild an open book.
  const srcs = useMemo(() => pages.map((p) => asset(`/${p}`)), [pages]);

  return (
    <ReadAsBook
      pages={srcs}
      aspect={aspect}
      title={title}
      pdfUrl={pdfUrl}
      className={
        className ??
        "btn-sweep inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-border-strong"
      }
    >
      {children}
    </ReadAsBook>
  );
}
