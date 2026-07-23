"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * One horizontal rail of poster cards, under a section heading.
 *
 * Shared by the Live Demos catalogue and the Publications catalogue so the two
 * browse identically: posters run off the right edge and are moved by dragging,
 * trackpad-swiping, or the arrow buttons, rather than wrapping onto more rows.
 *
 * Native overflow scrolling does the work, so touch and trackpad gestures come
 * for free and the arrows are an addition for mouse and keyboard rather than
 * the only way through.
 */
export function PosterRail({
  title,
  count,
  countNoun,
  ariaLabel,
  children,
}: {
  title: string;
  /** Shown at the right of the heading rule, e.g. "6 titles". */
  count: number;
  /** Singular noun; pluralised with an "s". */
  countNoun: string;
  /** Describes the rail's contents to a screen reader. */
  ariaLabel: string;
  children: React.ReactNode;
}) {
  const rail = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);

  const sync = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    // 1px of slack: fractional scroll widths never land exactly on the end.
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 1);
  }, []);

  useEffect(() => {
    sync();
    const el = rail.current;
    if (!el) return;
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, [sync, children]);

  const page = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  // Nothing to page through when every poster already fits.
  const scrollable = !(atStart && atEnd);

  const arrow = (enabled: boolean) =>
    `pointer-events-auto grid h-9 w-9 place-items-center rounded-full border border-border bg-background/90 text-foreground backdrop-blur transition-all ${
      enabled
        ? "opacity-100 hover:border-accent hover:text-accent"
        : "cursor-default opacity-0"
    }`;

  return (
    <section>
      <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
        <h2 className="font-heading text-2xl uppercase tracking-wide sm:text-3xl">
          {title}
        </h2>
        <span className="shrink-0 font-mono text-xs text-muted">
          {count} {count === 1 ? countNoun : `${countNoun}s`}
        </span>
      </div>

      <div className="relative mt-6">
        <div
          ref={rail}
          onScroll={sync}
          tabIndex={0}
          role="group"
          aria-label={ariaLabel}
          // scroll-pl-6 matches the px-6 bleed: without it, mandatory snapping
          // rests the first card at scrollLeft 24 rather than 0, so the rail
          // loads looking already scrolled and the left arrow never hides.
          className="no-scrollbar -mx-6 flex snap-x snap-mandatory scroll-pl-6 gap-5 overflow-x-auto px-6 pb-2 focus-visible:outline-none"
        >
          {children}
        </div>

        {/* Arrows sit over the rail's edges and never block a drag */}
        {scrollable && (
          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden items-center justify-between sm:flex">
            <button
              type="button"
              onClick={() => page(-1)}
              disabled={atStart}
              aria-label={`Scroll ${title} left`}
              className={`-ml-4 ${arrow(!atStart)}`}
            >
              <span aria-hidden>←</span>
            </button>
            <button
              type="button"
              onClick={() => page(1)}
              disabled={atEnd}
              aria-label={`Scroll ${title} right`}
              className={`-mr-4 ${arrow(!atEnd)}`}
            >
              <span aria-hidden>→</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
