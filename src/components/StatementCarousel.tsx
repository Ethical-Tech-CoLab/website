"use client";

import {
  useCallback,
  useEffect,
  useRef,
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
  /**
   * One line of context under the figure. Same string-or-node rule. A card
   * with neither a figure nor a line folds the copy area away while it shows,
   * which is how a card with a `block` sits straight under its heading.
   */
  line?: ReactNode;
  /**
   * The single call to action, given as both together or neither: a card that
   * stands for the page a reader is already on has nowhere to send them, and
   * shows no button. It sits above the controls, under the card's block or
   * copy.
   */
  cta?: string;
  href?: string;
  /**
   * What tells this card apart from the others when several share a heading:
   * it names the card on its dot. Cards with the same heading keep that
   * heading on screen as one, rather than fading it out and back in.
   */
  name?: string;
  /**
   * A block shown between the copy and the button while this card is showing,
   * and folded away when it is not — a picture, say. The card's `cta` sits
   * directly under it.
   */
  block?: ReactNode;
}

/** What the carousel measures, in px, to hold its controls level across cards. */
interface Sizes {
  /** Each heading at its own height. */
  headings: number[];
  /** The stacked copy area, top padding included: the tallest card's copy. */
  body: number;
  /** Each card's block at its natural height, top padding included; 0 for a
   *  card that has none. */
  blocks: number[];
  /** The button row, top padding included. The same on every card. */
  cta: number;
}

/** A card with neither figure nor line folds the copy area away while showing. */
function hasNoCopy(statement: Statement): boolean {
  return !statement.figure && !statement.line;
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
 * The slides do not cross-fade. Every slide occupies the same grid cell, so
 * fading two at once paints one statement through the other, which reads as a
 * rendering bug rather than as a transition. The outgoing slide fades out
 * first and the incoming one waits the same 300ms before it starts, so only
 * one statement is ever visible.
 *
 * Every slide sits in the SAME grid cell rather than being absolutely
 * positioned inside a guessed min-height, so the band is exactly as tall as
 * its tallest slide at every viewport width. A guessed height has to be right
 * at every width simultaneously, and the type here is fluid, so it would not
 * stay right for long.
 *
 * Text that keeps moving while somebody is reading it is hostile, so rotation
 * pauses while the pointer is over the band, while it holds focus, and while
 * the tab is hidden — and resumes when that ends. Only an explicit act stops
 * it for good: the dots, the arrow keys, or the Pause button. Those two are
 * separate on purpose. Making hover a permanent stop reads as "the carousel
 * is broken", because the hero sits where the cursor already is. The Back
 * button is the exception among the controls: it steps without stopping.
 *
 * Under reduced motion it never autoplays at all and the control becomes a
 * manual "Next".
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
  // Cards that share a heading share one line of it in the `<h1>`, so the
  // heading holds still across them instead of fading out and back in.
  // `headingSlot[i]` is the slot in `headings` that card `i` shows.
  const headingKeys = statements.map(headingOf);
  const headings = statements.filter(
    (_, i) => headingKeys.indexOf(headingKeys[i]) === i,
  );
  const headingSlot = headingKeys.map((key) =>
    headings.findIndex((statement) => headingOf(statement) === key),
  );
  const headingCount = headings.length;
  const headingRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const bodyRef = useRef<HTMLDivElement>(null);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);
  /** Null until the first measurement lands. */
  const [sizes, setSizes] = useState<Sizes | null>(null);

  const show = useCallback(
    (n: number) => setIndex(((n % count) + count) % count),
    [count],
  );

  const held = hovered || focused || hidden;

  useEffect(() => {
    if (!playing || held || reduce || count < 2) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), INTERVAL_MS);
    return () => clearInterval(timer);
  }, [playing, held, reduce, count]);

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // The headings share one grid cell, so the heading area is as tall as the
  // tallest of them — the wordmark, which runs to two lines. Measuring each
  // lets a card with a block size the area to its own heading instead, and
  // measuring the copy area and the blocks gives the height of the tallest
  // card, which the stage is then held to (see `stageHeight`). An observer
  // reports once as soon as it starts watching, which is what fills this in
  // on mount, so nothing is set from the effect body itself.
  //
  // The lists are built by index rather than by mapping over the refs: only a
  // card with a block fills its slot in `blockRefs`, and `map` skips the holes.
  useEffect(() => {
    const slots = <T,>(refs: (T | null)[], length: number) =>
      Array.from({ length }, (_, i) => refs[i] ?? null);
    const measure = () => {
      const next: Sizes = {
        headings: slots(headingRefs.current, headingCount).map(
          (el) => el?.offsetHeight ?? 0,
        ),
        body: bodyRef.current?.offsetHeight ?? 0,
        blocks: slots(blockRefs.current, count).map(
          (el) => el?.offsetHeight ?? 0,
        ),
        cta: ctaRef.current?.offsetHeight ?? 0,
      };
      setSizes((prev) =>
        prev && JSON.stringify(prev) === JSON.stringify(next) ? prev : next,
      );
    };
    const observer = new ResizeObserver(measure);
    [
      bodyRef.current,
      ctaRef.current,
      ...slots(headingRefs.current, headingCount),
      ...slots(blockRefs.current, count),
    ].forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [count, headingCount]);

  const stop = useCallback(() => setPlaying(false), []);

  const current = statements[index];
  const bodyless = hasNoCopy(current);

  // Both stay unset until everything has been measured, so the first paint
  // (and the static HTML) keep the plain layout.
  //
  // `headingHeight`: a card with a block takes its own heading's height;
  // every other card takes the tallest, which is what the grid would give it
  // anyway — stating it is what lets the height animate between the two
  // rather than jump.
  //
  // `stageHeight`: what sits above the controls — heading, copy, block — is
  // not the same height on every card. A card with a block is its own heading,
  // plus its copy if it has any, plus the block; any other is the tallest
  // heading plus the tallest copy. The stage is held to the tallest of those on
  // every card, so the controls under it cannot move, whatever the content
  // inside is doing while it rotates. A shorter card simply leaves room at the
  // bottom of the stage.
  const measured = sizes !== null && sizes.headings.every((h) => h > 0);
  let headingHeight: number | undefined;
  let stageHeight: number | undefined;
  if (sizes && measured) {
    const tallest = Math.max(...sizes.headings);
    const stageOf = (i: number) =>
      (statements[i].block ? sizes.headings[headingSlot[i]] : tallest) +
      (hasNoCopy(statements[i]) ? 0 : sizes.body) +
      sizes.blocks[i] +
      sizes.cta;
    headingHeight = current.block
      ? sizes.headings[headingSlot[index]]
      : tallest;
    stageHeight = Math.max(...statements.map((_, i) => stageOf(i)));
  }

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
      {/* The stage: everything above the controls, at one height for every
          card (see `stageHeight`). Nothing here has to be level with anything
          else, because the height it takes is not the content's to decide. */}
      <div style={{ height: stageHeight }}>
        {/* Heading and body are one live region, not two: they change together,
            and a region each would announce every rotation twice. */}
        <div aria-live="polite">
          {/* The destination's own heading, in the destination's own colours —
              the accent half is the same `display-em` that page sets on its
              `<h1>` — so the hero reads as a door into that page rather than as
              a slogan with a statistic under it. */}
          <h1
            // The single row is pinned to the h1's own height so a heading taller
            // than that overflows the box (unseen: only the showing one is
            // visible) instead of pushing its row taller and the showing heading
            // off-centre.
            style={
              headingHeight === undefined
                ? undefined
                : { height: headingHeight, gridTemplateRows: "100%" }
            }
            className="mx-auto grid max-w-4xl items-center fluid-hero font-heading uppercase leading-[0.95] transition-[height] duration-500 ease-out motion-reduce:transition-none"
          >
            {headings.map((statement, i) => {
              const active = i === headingSlot[index];
              return (
                <span
                  key={headingOf(statement)}
                  ref={(el) => {
                    headingRefs.current[i] = el;
                  }}
                  aria-hidden={!active}
                  style={{ gridArea: "1 / 1" }}
                  className={`block transition-opacity duration-300 motion-reduce:transition-none ${
                    statement.headingClass ?? ""
                  } ${active ? "opacity-100 delay-300" : "opacity-0"}`}
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
              the dots, so the text itself is not a link. Folds to nothing while
              the showing card has no copy, rather than leaving a gap the height
              of the tallest card's. The top spacing is padding, not margin, so
              it folds with it. */}
          <div
            className={`grid transition-[grid-template-rows] duration-500 ease-out motion-reduce:transition-none ${
              bodyless ? "grid-rows-[0fr]" : "grid-rows-[1fr]"
            }`}
          >
            <div className="min-h-0 overflow-hidden">
              <div
                ref={bodyRef}
                className="grid items-start pt-8 text-center"
              >
                {statements.map((statement, i) => {
                  const active = i === index;
                  return (
                    <div
                      key={i}
                      // Inactive slides are still painted (they hold the band
                      // open), so they have to be taken out of the accessibility
                      // tree explicitly.
                      inert={!active}
                      aria-hidden={!active}
                      style={{ gridArea: "1 / 1" }}
                      className={`block transition-opacity duration-300 motion-reduce:transition-none ${
                        active ? "opacity-100 delay-300" : "opacity-0"
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
          </div>
        </div>

        {/* Page-width blocks, between the copy and the controls. The wrapper is
            as wide as the viewport and centred on the column, and folds to
            nothing while its card is not showing (0fr → 1fr on the grid row is
            how a height animates to and from auto). Inert while folded, so its
            links are out of the tab order. */}
        {statements.map((statement, i) => {
          if (!statement.block) return null;
          const active = i === index;
          return (
            <div
              key={i}
              inert={!active}
              aria-hidden={!active}
              className={`grid transition-[grid-template-rows] duration-500 ease-out motion-reduce:transition-none ${
                active ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="min-h-0 overflow-hidden">
                {/* Measured at its natural height whether or not it is folded.
                    The gap above it is padding, not margin, so it is counted in
                    that height and folds away with the block. */}
                <div
                  ref={(el) => {
                    blockRefs.current[i] = el;
                  }}
                  className="pt-5"
                >
                  {statement.block}
                </div>
              </div>
            </div>
          );
        })}

        {/* A single call to action rather than a fixed pair, because the hero
            no longer says one thing: it points wherever the card showing
            points, and its label changes with it. It sits in the stage, above
            the controls, straight under the card's block or copy. The row
            keeps the same height on the card that has no button, so the stage
            is the same size whichever card is showing. */}
        <div ref={ctaRef} className="min-h-[4.25rem] pt-6 text-center">
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

      <div className="mt-4 flex items-center justify-center">
        {/* Steps back one card, wrapping from the first to the last. Unlike the
            dots it does not stop the rotation for good: it holds focus once
            clicked, and focus already holds the rotation, so a reader can page
            back through the cards and it carries on afterwards. */}
        <button
          type="button"
          onClick={() => show(index - 1)}
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
              show(i);
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
