"use client";

import {
  useCallback,
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { Link } from "next-view-transitions";
import { Magnetic } from "@/components/motion/Magnetic";

export interface Statement {
  /**
   * The headline of the page this slide links to, split the way that page
   * splits its own `<h1>`: plain text, then the part it sets in the accent
   * colour, then whatever trails it. Kept in three parts rather than as one
   * string so the slide can reproduce the destination's heading exactly —
   * "Run the " + "research" + "." — instead of approximating it.
   */
  lead: string;
  /** Omitted on a heading its page sets in one colour throughout. */
  em?: string;
  tail?: string;
  /**
   * Extra classes for this card's heading — a size override, typically. The
   * stack is only as tall as its tallest heading and every heading is centred
   * within it, so one card can be set larger without the others drifting.
   */
  headingClass?: string;
  /**
   * The caps line under the heading, e.g. "26 demos you can open". Optional:
   * the card standing for the home page has no figure to report.
   *
   * A string gets the card's own caps styling. Pass a node instead and it is
   * rendered untouched — that is how the home card reproduces the home page's
   * serif mission line, accent and all, rather than approximating it here.
   */
  figure?: ReactNode;
  /** One line of context under the figure. Same string-or-node rule. */
  line: ReactNode;
  /**
   * The single call to action, given as both together or neither: a card that
   * stands for the page a reader is already on has nowhere to send them, and
   * shows no button.
   */
  cta?: string;
  href?: string;
}

/** The heading as plain text, for labels and React keys. */
function headingOf(statement: Statement): string {
  return `${statement.lead}${statement.em ?? ""}${statement.tail ?? ""}`;
}

const INTERVAL_MS = 5200;

const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Read as an external store rather than through a mount effect: the value has
 * to differ between the static HTML (false, nothing to animate yet) and the
 * hydrated page without React reporting it as a mismatch.
 */
function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(REDUCE_QUERY);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(REDUCE_QUERY).matches,
    () => false,
  );
}

/**
 * A rotating band of single-statement slides, each one a link into the site.
 *
 * The rotating heading IS the page title: it is rendered as the `<h1>` and
 * sized like every other page's hero heading, so the hero says where a reader
 * can go rather than repeating a slogan above it. One `<h1>` wraps the whole
 * stack — not one per slide, which would leave the page with several — and the
 * inactive slides inside it are `aria-hidden`, so the heading's accessible
 * name is whichever statement is showing.
 *
 * Every slide sits in the SAME grid cell rather than being absolutely
 * positioned inside a guessed min-height, so the band is exactly as tall as
 * its tallest slide at every viewport width. A guessed height has to be right
 * at every width simultaneously, and the type here is fluid, so it would not
 * stay right for long.
 *
 * Text that keeps moving while somebody is reading it is hostile, so rotation
 * stops on hover, on focus, when the tab is hidden, and permanently once the
 * reader touches the dots. Under reduced motion it never autoplays at all and
 * the control becomes a manual "Next".
 */
export function StatementCarousel({
  statements,
  label = "Highlights",
  className = "",
}: {
  statements: Statement[];
  /** Accessible name for the carousel region and its dot controls. */
  label?: string;
  className?: string;
}) {
  const reduce = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const count = statements.length;

  const show = useCallback(
    (n: number) => setIndex(((n % count) + count) % count),
    [count],
  );

  useEffect(() => {
    if (!playing || reduce || count < 2) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), INTERVAL_MS);
    return () => clearInterval(timer);
  }, [playing, reduce, count]);

  // A hidden tab is not being read; resume is the reader's call, not ours.
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) setPlaying(false);
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const stop = useCallback(() => setPlaying(false), []);

  const current = statements[index];

  // Left/right arrows move between slides while the band holds focus, which is
  // what a keyboard user expects from a group of related controls.
  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    stop();
    show(index + (event.key === "ArrowRight" ? 1 : -1));
  };

  return (
    <div
      className={className}
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={stop}
      onFocus={stop}
      onKeyDown={onKeyDown}
    >
      {/* Heading and body are one live region, not two: they change together,
          and a region each would announce every rotation twice. */}
      <div aria-live="polite">
        {/* The destination's own heading, in the destination's own colours —
            the accent half is the same `display-em` that page sets on its
            `<h1>` — so the hero reads as a door into that page rather than as
            a slogan with a statistic under it. */}
        <h1 className="mx-auto grid max-w-4xl items-center fluid-hero font-heading uppercase leading-[0.95]">
          {statements.map((statement, i) => {
            const active = i === index;
            return (
              <span
                key={headingOf(statement)}
                aria-hidden={!active}
                style={{ gridArea: "1 / 1" }}
                className={`block transition-opacity duration-500 motion-reduce:transition-none ${
                  statement.headingClass ?? ""
                } ${active ? "opacity-100" : "opacity-0"}`}
              >
                {statement.lead}
                {statement.em && (
                  <span className="display-em">{statement.em}</span>
                )}
                {statement.tail}
              </span>
            );
          })}
        </h1>

        {/* Copy only: the way into the destination is the single button under
            the dots, so the text itself is not a link. */}
        <div className="mt-8 grid items-start text-center">
          {statements.map((statement, i) => {
            const active = i === index;
            return (
              <div
                key={headingOf(statement)}
                // Inactive slides are still painted (they hold the band open),
                // so they have to be taken out of the accessibility tree
                // explicitly.
                inert={!active}
                aria-hidden={!active}
                style={{ gridArea: "1 / 1" }}
                className={`block transition-opacity duration-500 motion-reduce:transition-none ${
                  active ? "opacity-100" : "opacity-0"
                }`}
              >
                {typeof statement.figure === "string" ? (
                  <span className="mb-2 block text-sm font-semibold uppercase tracking-[0.12em] text-foreground sm:text-base">
                    {statement.figure}
                  </span>
                ) : (
                  statement.figure
                )}
                {typeof statement.line === "string" ? (
                  <span className="mx-auto block max-w-[40em] leading-relaxed text-muted">
                    {statement.line}
                  </span>
                ) : (
                  statement.line
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-7 flex items-center justify-center gap-2">
        {statements.map((statement, i) => (
          <button
            key={headingOf(statement)}
            type="button"
            aria-current={i === index}
            aria-label={`${label} ${i + 1} of ${count}: ${headingOf(statement)}${typeof statement.figure === "string" ? ` — ${statement.figure}` : ""}`}
            onClick={() => {
              stop();
              show(i);
            }}
            className={`h-1.5 w-8 rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
              i === index ? "bg-accent" : "bg-foreground/25 hover:bg-foreground/45"
            }`}
          />
        ))}
        <button
          type="button"
          onClick={() => {
            if (reduce) return show(index + 1);
            setPlaying((p) => !p);
          }}
          aria-label={
            reduce
              ? `Show the next ${label.toLowerCase()}`
              : playing
                ? `Pause the rotating ${label.toLowerCase()}`
                : `Resume the rotating ${label.toLowerCase()}`
          }
          className="ml-2 rounded-full border border-border px-3 py-1 text-xs text-muted transition-colors hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {reduce ? "Next" : playing ? "Pause" : "Play"}
        </button>
      </div>

      {/* A single call to action rather than a fixed pair, because the hero no
          longer says one thing: it points wherever the card showing points,
          and its label changes with it. The row keeps its height on the card
          that has no button, so the hero does not resize under the reader
          every time that card comes round. */}
      <div className="mt-10 min-h-[2.75rem] text-center">
        {current.cta && current.href && (
          <Magnetic className="inline-block">
            <Link
              href={current.href}
              className="btn-sweep inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-ink transition-transform hover:scale-[1.02]"
            >
              {current.cta} <span aria-hidden>→</span>
            </Link>
          </Magnetic>
        )}
      </div>
    </div>
  );
}
