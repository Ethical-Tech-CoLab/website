"use client";

// "Read as book" — an old-school flipbook view of the report's original PDF.
//
// The pages are pre-rendered to WebP at build time
// (scripts/render-report-pages.mjs) so the browser never loads pdf.js. This
// component lazy-loads page-flip (StPageFlip) only when the reader opens the
// book, instantiates a real page-curl over those images, and overlays it full
// screen. Desktop shows a two-page spread; narrow screens show one page.
//
// It is deliberately self-contained: give it the manifest values and the base
// image path and it renders. Only wired on After the Corridor for now.

import { useCallback, useEffect, useRef, useState } from "react";
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
};

export function ReportBook({ pages, aspect, title, pdfUrl, className }: Props) {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [page, setPage] = useState(0);
  // Bumped on viewport resize to force a rebuild at the new spread size.
  const [resizeTick, setResizeTick] = useState(0);
  const holderRef = useRef<HTMLDivElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const flipRef = useRef<any>(null);

  const total = pages.length;

  // Build/tear-down the flipbook when the overlay opens/closes.
  useEffect(() => {
    if (!open) return;
    let disposed = false;
    let onResize: (() => void) | null = null;

    (async () => {
      const { PageFlip } = await import("page-flip");
      if (disposed || !holderRef.current) return;

      const el = holderRef.current;
      const single = window.matchMedia("(max-width: 640px)").matches;

      // Fit the spread inside the viewport, leaving room for the chrome.
      const maxH = Math.min(window.innerHeight - 150, 1100);
      const maxW = window.innerWidth - 48;
      let pageH = maxH;
      let pageW = pageH * aspect;
      const spreadW = single ? pageW : pageW * 2;
      if (spreadW > maxW) {
        const scale = maxW / spreadW;
        pageW *= scale;
        pageH *= scale;
      }

      const flip = new PageFlip(el, {
        width: Math.round(pageW),
        height: Math.round(pageH),
        size: "fixed",
        showCover: true,
        usePortrait: single,
        maxShadowOpacity: 0.4,
        mobileScrollSupport: true,
        flippingTime: 700,
        drawShadow: true,
      });

      flip.loadFromImages(pages.map((p) => asset(`/${p}`)));
      flip.on("flip", (e: { data: number }) => setPage(e.data));
      flipRef.current = flip;
      setReady(true);

      // page-flip has no live re-fit; rebuild the effect on the next resize by
      // bumping resizeTick. The effect cleanup destroys this instance first.
      onResize = () => setResizeTick((t) => t + 1);
      window.addEventListener("resize", onResize, { once: true });
    })();

    return () => {
      disposed = true;
      if (onResize) window.removeEventListener("resize", onResize);
      if (flipRef.current) {
        flipRef.current.destroy();
        flipRef.current = null;
      }
      setReady(false);
    };
  }, [open, aspect, resizeTick]);

  const prev = useCallback(() => flipRef.current?.flipPrev(), []);
  const next = useCallback(() => flipRef.current?.flipNext(), []);
  const close = useCallback(() => setOpen(false), []);

  // Keyboard: arrows to turn, Escape to close. Lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, prev, next, close]);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setPage(0);
          setOpen(true);
        }}
        className={
          className ??
          "btn-sweep inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-border-strong"
        }
      >
        Read as book <span aria-hidden>📖</span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} — page view`}
          className="fixed inset-0 z-[100] flex flex-col bg-black/92 backdrop-blur-sm"
        >
          {/* Chrome */}
          <div className="flex items-center justify-between gap-3 px-4 py-3 text-sm text-white/85 sm:px-6">
            <span className="min-w-0 truncate font-heading uppercase tracking-wide">
              {title}
            </span>
            <div className="flex items-center gap-3">
              <span className="tabular-nums text-white/60">
                {total ? `${Math.min(page + 1, total)} / ${total}` : ""}
              </span>
              {pdfUrl && (
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden rounded-full border border-white/25 px-3 py-1.5 text-xs font-semibold text-white/85 transition-colors hover:border-white/60 sm:inline-flex"
                >
                  Download PDF ↗
                </a>
              )}
              <button
                type="button"
                onClick={close}
                aria-label="Close book view"
                className="rounded-full border border-white/25 px-3 py-1.5 text-xs font-semibold text-white/85 transition-colors hover:border-white/60"
              >
                Close ✕
              </button>
            </div>
          </div>

          {/* Book stage */}
          <div className="relative flex flex-1 items-center justify-center overflow-hidden px-2 sm:px-6">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous page"
              className="absolute left-2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white/85 transition-colors hover:border-white/60 hover:bg-white/10 sm:left-4"
            >
              ‹
            </button>

            <div className="max-h-full max-w-full">
              <div ref={holderRef} className="shadow-2xl" />
              {!ready && (
                <p className="mt-6 text-center text-sm text-white/50">
                  Opening the book…
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Next page"
              className="absolute right-2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white/85 transition-colors hover:border-white/60 hover:bg-white/10 sm:right-4"
            >
              ›
            </button>
          </div>

          <p className="pb-3 text-center text-xs text-white/40">
            Use the arrows or ← → keys to turn pages · Esc to close
          </p>
        </div>
      )}
    </>
  );
}
