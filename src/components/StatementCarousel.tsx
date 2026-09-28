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
   * Extra classes for this card's heading — a size override, typically. A
   * size has to be marked important (`text-[…]!`): the heading's own
   * `fluid-hero` size sits outside Tailwind's layers, so it beats any plain
   * utility.
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
  line?: ReactNode;
  /**
   * The single call to action, given as both together or neither: a card that
   * stands for the page a reader is already on has nowhere to send them, and
   * shows no button. It sits under the card's block or copy.
   */
  cta?: string;
  href?: string;
  /**
   * What tells this card apart from the others when several share a heading:
   * it names the card on its dot.
   */
  name?: string;
  /** A block shown between the copy and the button — a picture, say. */
  block?: ReactNode;
}

/** The heading as plain text, for labels. */
function headingOf(statement: Statement): string {
  return `${statement.lead}${statement.em ?? ""}${statement.tail ?? ""}`;
}

const INTERVAL_MS = 5200;

const SLIDE = "500ms cubic-bezier(0.16, 1, 0.3, 1) both";

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
 * Where the carousel is: the card showing, the one that showed before it
 * (-1 until the first move), and which way the move went — 1 forward, -1
 * back.
 */
interface Position {
  index: number;
  prev: number;
  dir: 1 | -1;
}

/**
 * A rotating band of single-statement slides, each one a link into the site.
 *
 * The rotating heading IS the page title: it is sized like every other page's
 * hero heading, so the hero says where a reader can go rather than repeating a
 * slogan above it. Only the showing card's heading is an `<h1>` — the others
 * are set identically but as `<p>`, so the page has one `<h1>` at a time.
 *
 * Each card is one whole slide — heading, copy, block, button — and every
 * change is a horizontal slide: the showing card leaves to one side as the
 * next arrives from the other, forwards to the left and back to the right.
 * Nothing fades and nothing folds. Every slide sits in the SAME grid cell, so
 * the band is as tall as its tallest card at every viewport width and the
 * controls under it never move; a shorter card leaves room at the bottom.
 * Only the arriving and departing cards are visible; the rest wait hidden.
 *
 * Text that keeps moving while somebody is reading it is hostile, so rotation
 * pauses while the pointer is over the band, while it holds focus, and while
 * the tab is hidden — and resumes when that ends. Only an explicit act stops
 * it for good: the dots, the arrow keys, or the Pause button. Those two are
 * separate on purpose. Making hover a permanent stop reads as "the carousel
 * is broken", because the hero sits where the cursor already is. The Back
 * button is the exception among the controls: it steps without stopping.
 *
 * Under reduced motion it never autoplays, cards swap without sliding, and
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
  const [{ index, prev, dir }, setPosition] = useState<Position>({
    index: 0,
    prev: -1,
    dir: 1,
  });
  /** The reader's own choice, changed only by the dots, arrows, and Pause. */
  const [playing, setPlaying] = useState(true);
  /**
   * Reading conditions, not a choice: hover, focus, and a hidden tab each
   * hold rotation and release it again. Kept as three flags rather than one
   * counter so that leaving with the pointer cannot cancel a hold the
   * keyboard still has.
   */
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const count = statements.length;

  /** Steps one card either way, wrapping at the ends. */
  const step = useCallback(
    (d: 1 | -1) =>
      setPosition((p) => ({
        index: (p.index + d + count) % count,
        prev: p.index,
        dir: d,
      })),
    [count],
  );

  /** Goes straight to a card, sliding the way the dots run. */
  const jump = useCallback(
    (n: number) =>
      setPosition((p) =>
        n === p.index
          ? p
          : { index: n, prev: p.index, dir: n > p.index ? 1 : -1 },
      ),
    [],
  );

  const held = hovered || focused || hidden;

  useEffect(() => {
    if (!playing || held || reduce || count < 2) return;
    const timer = setInterval(() => step(1), INTERVAL_MS);
    return () => clearInterval(timer);
  }, [playing, held, reduce, count, step]);

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const stop = useCallback(() => setPlaying(false), []);

  // Left/right arrows move between slides while the band holds focus, which is
  // what a keyboard user expects from a group of related controls.
  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    stop();
    step(event.key === "ArrowRight" ? 1 : -1);
  };

  /**
   * The arriving card slides in from the side the move is heading towards and
   * the departing one out the other. Neither animates before the first move,
   * so the page loads on its first card standing still.
   */
  const animationOf = (i: number): string | undefined => {
    if (prev < 0) return undefined;
    if (i === index) {
      return `${dir > 0 ? "slide-in-from-right" : "slide-in-from-left"} ${SLIDE}`;
    }
    if (i === prev) {
      return `${dir > 0 ? "slide-out-to-left" : "slide-out-to-right"} ${SLIDE}`;
    }
    return undefined;
  };

  return (
    <div
      className={className}
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      // onBlur bubbles from the dots and the button, so a move between two of
      // them would otherwise read as focus leaving the band entirely.
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setFocused(false);
        }
      }}
      onKeyDown={onKeyDown}
    >
      {/* The stage: one grid cell every card shares, so it is as tall as the
          tallest. One live region for the whole card, so a rotation is
          announced once. The column is held to the stage's width, so a
          heading set on one line cannot widen it and push the card over. */}
      <div
        aria-live="polite"
        className="grid grid-cols-[minmax(0,1fr)] items-start"
      >
        {statements.map((statement, i) => {
          const active = i === index;
          // The departing card stays visible for its slide out; its
          // animation holds it off-screen once that is done.
          const shown = active || i === prev;
          const Heading = active ? "h1" : "p";
          return (
            <div
              key={i}
              // Inactive slides are still laid out (they hold the stage open),
              // so they have to be taken out of the accessibility tree and the
              // tab order explicitly.
              inert={!active}
              aria-hidden={!active}
              style={{ gridArea: "1 / 1", animation: animationOf(i) }}
              className={shown ? undefined : "invisible"}
            >
              {/* The destination's own heading, in the destination's own
                  colours — the accent half is the same `display-em` that page
                  sets on its `<h1>` — so the hero reads as a door into that
                  page rather than as a slogan with a statistic under it. */}
              <Heading
                className={`mx-auto block max-w-4xl fluid-hero font-heading uppercase leading-[0.95] ${
                  statement.headingClass ?? ""
                }`}
              >
                {statement.lead}
                {statement.em && (
                  <span className="display-em">{statement.em}</span>
                )}
                {statement.tail}
              </Heading>

              {/* Copy only: the way into the destination is the button, so the
                  text itself is not a link. */}
              {(statement.figure || statement.line) && (
                <div className="pt-8 text-center">
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
              )}

              {statement.block && <div className="pt-5">{statement.block}</div>}

              {/* A single call to action rather than a fixed pair: each card
                  points wherever it points. */}
              {statement.cta && statement.href && (
                <div className="pt-6 text-center">
                  <Magnetic className="inline-block">
                    <Link
                      href={statement.href}
                      className="btn-sweep inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-ink transition-transform hover:scale-[1.02]"
                    >
                      {statement.cta} <span aria-hidden>→</span>
                    </Link>
                  </Magnetic>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-center">
        {/* Steps back one card, wrapping from the first to the last. Unlike the
            dots it does not stop the rotation for good: it holds focus once
            clicked, and focus already holds the rotation, so a reader can page
            back through the cards and it carries on afterwards. */}
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label={`Previous ${label.toLowerCase()}`}
          className="mr-3 inline-grid h-11 w-11 place-items-center rounded-full border-2 border-accent text-base font-semibold text-accent transition-colors hover:bg-accent hover:text-accent-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <span aria-hidden>←</span>
        </button>
        {statements.map((statement, i) => (
          // The button is a 44px-tall target around a slim bar: the bar is what
          // is seen, the padding is what is clicked. The focus ring goes on the
          // bar so it hugs what the reader is looking at, not the padding.
          <button
            key={i}
            type="button"
            aria-current={i === index}
            aria-label={`${label} ${i + 1} of ${count}: ${statement.name ?? headingOf(statement)}${typeof statement.figure === "string" ? ` — ${statement.figure}` : ""}`}
            onClick={() => {
              stop();
              jump(i);
            }}
            className="group flex h-11 w-10 items-center justify-center focus-visible:outline-none"
          >
            <span
              aria-hidden
              className={`h-2 w-8 rounded-full transition-colors group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-accent ${
                i === index
                  ? "bg-accent"
                  : "bg-foreground/40 group-hover:bg-foreground/70"
              }`}
            />
          </button>
        ))}
        <button
          type="button"
          onClick={() => {
            if (reduce) return step(1);
            setPlaying((p) => !p);
          }}
          aria-label={
            reduce
              ? `Show the next ${label.toLowerCase()}`
              : playing
                ? `Pause the rotating ${label.toLowerCase()}`
                : `Resume the rotating ${label.toLowerCase()}`
          }
          // Outlined rather than filled: the solid accent button below is the
          // page's one primary action, and two of them would compete.
          className="ml-3 inline-flex min-h-11 items-center gap-1.5 rounded-full border-2 border-accent px-5 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-accent-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {reduce ? "Next" : playing ? "Pause" : "Play"}
          {reduce && <span aria-hidden>→</span>}
        </button>
      </div>
    </div>
  );
}
