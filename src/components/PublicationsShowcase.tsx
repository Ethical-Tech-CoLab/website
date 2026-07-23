"use client";

import { useEffect, useState } from "react";
import { Link } from "next-view-transitions";
import {
  publications,
  publicationTopics,
  type Publication,
} from "@/content/site";
import { PosterRail } from "@/components/PosterRail";
import { Tilt3D } from "@/components/motion/Tilt3D";

/**
 * The Publications catalogue.
 *
 * Laid out exactly like Live Demos: one rail per topic, browsed by dragging or
 * by the arrow buttons, with portrait posters you pick from. Where a demo's
 * poster art is its own screen, a report has no screen, so each cover is drawn
 * instead: a topic-coloured ground under an abstract motif that stands for the
 * subject. Reports in the same topic therefore read as one series, and the
 * topics read apart from each other at a glance.
 *
 * Picking a cover opens a sheet with the research question and the summary,
 * then the way in, mirroring how DemoRunner opens on a title page before it
 * runs anything.
 */

/* ── Cover art ───────────────────────────────────────────────────────── */

/** Ground gradient per topic. The lime accent is constant across the site, so
 *  the ground is what distinguishes one topic's shelf from another's. */
const TOPIC_GROUND: Record<string, [string, string]> = {
  Guidelines: ["#1d2440", "#0d1020"],
  Evacuation: ["#3b1878", "#160d1c"],
  "Cultural heritage": ["#4a1d3d", "#1a0d18"],
  Traceability: ["#123a3a", "#0a1a1c"],
  Diplomacy: ["#2a2160", "#100d20"],
  Sustainability: ["#1c3a24", "#0b1710"],
  "Disaster response": ["#4a2417", "#1a0e0a"],
};

/** The ground for one cover. The topic fixes the hue pair; `seed` swings the
 *  gradient angle and how far the light end reaches, so covers on the same
 *  shelf read as a series without reading as reprints of each other. */
function ground(topic: string, seed = 0) {
  const [a, b] = TOPIC_GROUND[topic] ?? ["#241a35", "#120d1c"];
  const angle = 130 + ((seed * 31) % 60);
  const stop = 64 + ((seed * 17) % 26);
  return `linear-gradient(${angle}deg, ${a} 0%, ${b} ${stop}%)`;
}

/**
 * The motif for a topic, drawn on a 200x300 portrait field.
 *
 * Each one is a diagram of the thing the topic is about rather than decoration:
 * routes for evacuation, a broken chain for traceability, a radar sweep for
 * disaster response. `seed` shifts the drawing slightly so two reports on the
 * same shelf are not identical prints of each other.
 */
function CoverMotif({ topic, seed }: { topic: string; seed: number }) {
  const line = "var(--poster-accent)";
  const faint = "color-mix(in oklab, var(--poster-accent) 26%, transparent)";
  const ghost = "color-mix(in oklab, var(--poster-accent) 12%, transparent)";
  // Deterministic per-card jitter. No randomness: the server and the client
  // must draw the same thing or React reports a hydration mismatch.
  const j = (n: number, amp = 1) => ((((seed * 37 + n * 11) % 13) - 6) / 6) * amp;

  const art = () => {
    switch (topic) {
      // Branching routes out of a single origin. One route is dashed: the
      // portfolio's recurring point is that a way out can be closed.
      case "Evacuation":
        return (
          <>
            <circle cx={40} cy={250} r={5} fill={line} />
            {[
              { d: `M40 250 C 70 ${210 + j(1, 8)}, 120 ${200 + j(2, 8)}, 160 150`, dash: false },
              { d: `M40 250 C 60 ${190 + j(3, 8)}, 90 ${140 + j(4, 8)}, 150 96`, dash: true },
              { d: `M40 250 C 80 ${230 + j(5, 8)}, 130 ${230 + j(6, 8)}, 168 200`, dash: false },
            ].map((p, i) => (
              <path
                key={i}
                d={p.d}
                fill="none"
                stroke={p.dash ? faint : line}
                strokeWidth={1.4}
                strokeDasharray={p.dash ? "5 5" : undefined}
                opacity={p.dash ? 1 : 0.75}
              />
            ))}
            {[
              [160, 150],
              [150, 96],
              [168, 200],
            ].map(([x, y], i) => (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={4}
                fill="none"
                stroke={i === 1 ? faint : line}
                strokeWidth={1.4}
              />
            ))}
          </>
        );

      // A checklist: the practice guides are procedure, so the motif is one.
      case "Guidelines":
        return (
          <>
            {Array.from({ length: 6 }).map((_, i) => {
              const y = 110 + i * 26;
              const done = (seed + i) % 3 !== 0;
              return (
                <g key={i}>
                  <rect
                    x={38}
                    y={y - 7}
                    width={14}
                    height={14}
                    rx={3}
                    fill="none"
                    stroke={done ? line : ghost}
                    strokeWidth={1.4}
                  />
                  {done && (
                    <path
                      d={`M41.5 ${y} l3 3.5 l6.5 -7.5`}
                      fill="none"
                      stroke={line}
                      strokeWidth={1.6}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}
                  <rect
                    x={62}
                    y={y - 3}
                    width={70 + j(i, 26)}
                    height={3}
                    rx={1.5}
                    fill={done ? faint : ghost}
                  />
                </g>
              );
            })}
          </>
        );

      // Nested arches around a sealed object: provenance and repatriation.
      case "Cultural heritage":
        return (
          <>
            {[0, 1, 2].map((i) => (
              <path
                key={i}
                d={`M${60 + i * 14} 250 L${60 + i * 14} ${170 - i * 16} A${40 - i * 14} ${40 - i * 14} 0 0 1 ${140 - i * 14} ${170 - i * 16} L${140 - i * 14} 250`}
                fill="none"
                stroke={i === 0 ? line : faint}
                strokeWidth={1.4}
                opacity={1 - i * 0.18}
              />
            ))}
            <circle cx={100} cy={198} r={11} fill="none" stroke={line} strokeWidth={1.4} />
            <path
              d="M95.5 198 l3 3.4 l6 -7"
              fill="none"
              stroke={line}
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        );

      // A chain with one link broken: the point of a trace record is finding
      // the link that cannot be verified.
      case "Traceability":
        return (
          <>
            {Array.from({ length: 5 }).map((_, i) => {
              const broken = i === 2 + (seed % 2);
              const y = 110 + i * 30;
              return (
                <g key={i}>
                  <rect
                    x={62}
                    y={y}
                    width={76}
                    height={20}
                    rx={10}
                    fill="none"
                    stroke={broken ? ghost : line}
                    strokeWidth={1.4}
                    strokeDasharray={broken ? "4 4" : undefined}
                    opacity={broken ? 1 : 0.8}
                  />
                  {i < 4 && (
                    <line
                      x1={100}
                      y1={y + 20}
                      x2={100}
                      y2={y + 30}
                      stroke={broken ? ghost : faint}
                      strokeWidth={1.4}
                    />
                  )}
                </g>
              );
            })}
          </>
        );

      // Two parties' positions reaching across a table. Where a pair of bars
      // overlaps is the zone of possible agreement, and it is the only part
      // drawn at full strength.
      case "Diplomacy": {
        const rows = [0, 1, 2, 3, 4].map((i) => {
          const left = 96 + j(i, 30);
          const right = 104 - j(i + 3, 30);
          return { y: 108 + i * 28, left, right, agreed: left > right };
        });
        return (
          <>
            <line
              x1={100}
              y1={92}
              x2={100}
              y2={250}
              stroke={ghost}
              strokeWidth={1.4}
            />
            {rows.map((r, i) => (
              <g key={i}>
                <line
                  x1={34}
                  y1={r.y}
                  x2={r.left}
                  y2={r.y}
                  stroke={r.agreed ? line : faint}
                  strokeWidth={r.agreed ? 2.4 : 1.6}
                  strokeLinecap="round"
                />
                <line
                  x1={r.right}
                  y1={r.y}
                  x2={166}
                  y2={r.y}
                  stroke={r.agreed ? line : faint}
                  strokeWidth={r.agreed ? 2.4 : 1.6}
                  strokeLinecap="round"
                />
                {r.agreed && (
                  <circle cx={(r.left + r.right) / 2} cy={r.y} r={3.6} fill={line} />
                )}
              </g>
            ))}
          </>
        );
      }

      // A load curve bending down: the mitigation the report argues for.
      case "Sustainability":
        return (
          <>
            <path
              d={`M34 250 L34 110 M34 250 L170 250`}
              fill="none"
              stroke={ghost}
              strokeWidth={1.4}
            />
            <path
              d={`M34 ${232 + j(1, 6)} C 74 ${232 + j(1, 6)}, 92 130, 170 ${118 + j(2, 8)}`}
              fill="none"
              stroke={faint}
              strokeWidth={1.4}
              strokeDasharray="4 4"
            />
            <path
              d={`M34 ${232 + j(1, 6)} C 74 ${232 + j(1, 6)}, 96 168, 170 ${186 + j(3, 8)}`}
              fill="none"
              stroke={line}
              strokeWidth={1.6}
            />
            {[
              [34, 232],
              [170, 186],
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y + j(i + 1, 6)} r={4} fill={line} />
            ))}
          </>
        );

      // A radar sweep over a marked site.
      case "Disaster response":
        return (
          <>
            {[54, 40, 26].map((r, i) => (
              <circle
                key={i}
                cx={100}
                cy={180}
                r={r}
                fill="none"
                stroke={i === 0 ? faint : ghost}
                strokeWidth={1.4}
              />
            ))}
            <line
              x1={100}
              y1={180}
              x2={100 + 54 * Math.cos((seed % 6) - 2.4)}
              y2={180 + 54 * Math.sin((seed % 6) - 2.4)}
              stroke={line}
              strokeWidth={1.6}
            />
            <circle cx={100} cy={180} r={4.5} fill={line} />
          </>
        );

      default:
        return null;
    }
  };

  // The motifs are drawn on the full 200x300 field, then lifted and shrunk
  // into the upper two-thirds. The lower third is where the title sits, and
  // art running under the type made both harder to read.
  const rotate = ((seed * 23) % 9) - 4;
  const scale = 0.74 + ((seed * 13) % 7) / 100;
  const dx = 100 - 100 * scale + (((seed * 7) % 11) - 5);
  const dy = -34 - ((seed * 5) % 14);

  return (
    <svg
      viewBox="0 0 200 300"
      aria-hidden
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* A faint rule grid under every motif, so the covers read as one series
          however different the drawings on top of them are. */}
      <g stroke={ghost} strokeWidth={0.6}>
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={i} x1={0} y1={30 + i * 30} x2={200} y2={30 + i * 30} />
        ))}
      </g>
      <g
        transform={`translate(${dx} ${dy}) scale(${scale}) rotate(${rotate} 100 170)`}
      >
        {art()}
      </g>
    </svg>
  );
}

/* ── Poster ──────────────────────────────────────────────────────────── */

/** Split a title on its colon so a cover can set the short name large and the
 *  subtitle small, the way a book jacket does. */
function splitTitle(title: string): [string, string | null] {
  const i = title.indexOf(":");
  if (i === -1 || i > 48) return [title, null];
  return [title.slice(0, i), title.slice(i + 1).trim()];
}

function readable(pub: Publication) {
  return Boolean(pub.url) && pub.access !== "internal";
}

function Cover({ pub, onOpen }: { pub: Publication; onOpen: () => void }) {
  const [main, sub] = splitTitle(pub.title);
  const seed = Number(pub.index);

  return (
    <Tilt3D max={5} className="h-full">
      <button
        type="button"
        onClick={onOpen}
        aria-label={
          readable(pub)
            ? `Open ${pub.title}`
            : `${pub.title}, ${pub.status.toLowerCase()}`
        }
        className="group/cover relative flex aspect-[2/3] h-full w-full flex-col justify-end overflow-hidden rounded-xl border border-border p-4 text-left transition-colors hover:border-accent focus-visible:border-accent focus-visible:outline-none"
        style={{ background: ground(pub.topic, seed) }}
      >
        <CoverMotif topic={pub.topic} seed={seed} />

        {/* Scrim: the motif runs the full height, so the lower half is
            darkened to hold the title. */}
        <span
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent 34%, color-mix(in oklab, #0c0812 68%, transparent) 58%, #0c0812 92%)",
          }}
        />

        {/* Status rides the cover the way a poster carries its rating */}
        <span className="absolute right-3 top-3">
          {pub.access === "internal" ? (
            <span className="rounded-full border border-white/35 bg-black/45 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-white/85 backdrop-blur">
              CoLab only
            </span>
          ) : pub.url ? (
            <span
              className="rounded-full px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider"
              style={{
                background: "var(--poster-accent)",
                color: "var(--poster-accent-ink)",
              }}
            >
              Published
            </span>
          ) : (
            <span
              className="rounded-full border border-border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider"
              style={{ color: "var(--poster-ink-muted)" }}
            >
              In prep
            </span>
          )}
        </span>

        {readable(pub) && (
          <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover/cover:opacity-100 group-focus-visible/cover:opacity-100">
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-lg"
              style={{
                background: "var(--poster-accent)",
                color: "var(--poster-accent-ink)",
              }}
            >
              Read
            </span>
          </span>
        )}

        <div className="relative">
          <p
            className="font-mono text-[10px] uppercase tracking-wider"
            style={{ color: "var(--poster-accent)" }}
          >
            {pub.topic}
          </p>

          {/* Colour set as a utility, not inline: an inline style would beat
              the hover variant and the title would never take the accent. */}
          <h3 className="mt-1.5 line-clamp-3 font-heading text-xl uppercase leading-[1.05] tracking-[0.02em] text-[color:var(--poster-ink)] transition-colors group-hover/cover:text-[color:var(--poster-accent)]">
            {main}
          </h3>
          {sub && (
            <p
              className="mt-1.5 line-clamp-2 text-[11px] leading-snug"
              style={{ color: "var(--poster-ink-muted)" }}
            >
              {sub}
            </p>
          )}

          <div
            className="mt-3 font-mono text-[10px] uppercase tracking-wider"
            style={{ color: "var(--poster-ink-muted)" }}
          >
            {pub.date ?? pub.status}
          </div>
        </div>
      </button>
    </Tilt3D>
  );
}

/* ── Sheet ───────────────────────────────────────────────────────────── */

/** The title page for a report: the cover you clicked, the question it asks,
 *  what it found, and the ways in. Mirrors DemoRunner so a card opens the same
 *  way on either catalogue. */
function PublicationSheet({
  pub,
  onClose,
}: {
  pub: Publication;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const [main, sub] = splitTitle(pub.title);
  const onSite = pub.url.startsWith("/");

  const action =
    "flex w-full items-center justify-between gap-4 rounded-xl border border-border bg-card px-5 py-4 text-left transition-colors hover:border-accent";

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-background"
      role="dialog"
      aria-modal="true"
      aria-label={pub.title}
    >
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5">
        <div className="min-w-0">
          <h3 className="truncate font-heading text-xl uppercase tracking-[0.02em] sm:text-2xl">
            {main}
          </h3>
          <p className="truncate font-mono text-[10px] text-muted">
            {pub.topic}
            {pub.date && ` · ${pub.date}`}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-accent-ink transition-transform hover:scale-[1.03]"
        >
          ✕ Close
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto grid max-w-4xl gap-10 px-6 py-12 sm:grid-cols-[minmax(0,200px)_1fr] sm:py-14">
          <div
            className="relative hidden aspect-[2/3] w-full overflow-hidden rounded-xl border border-border sm:block"
            style={{ background: ground(pub.topic, Number(pub.index)) }}
          >
            <CoverMotif topic={pub.topic} seed={Number(pub.index)} />
          </div>

          <div>
            {sub && (
              <p className="font-heading text-lg uppercase leading-snug tracking-wide text-muted">
                {sub}
              </p>
            )}
            <p className="mt-4 border-l-2 border-accent pl-5 text-lg leading-relaxed text-foreground/90">
              {pub.question}
            </p>
            <p className="mt-6 leading-relaxed text-muted">{pub.summary}</p>

            <div className="mt-8 space-y-3">
              {pub.access === "internal" ? (
                <a
                  href={pub.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={action}
                >
                  <span className="font-semibold text-foreground">
                    Open in the CoLab repo{" "}
                    <span className="font-normal text-muted">
                      (sign-in required)
                    </span>
                  </span>
                  <span aria-hidden className="text-accent">
                    ↗
                  </span>
                </a>
              ) : pub.url ? (
                <>
                  {onSite ? (
                    <Link href={pub.url} className={action}>
                      <span className="font-semibold text-foreground">
                        Read the report
                      </span>
                      <span aria-hidden className="text-accent">
                        →
                      </span>
                    </Link>
                  ) : (
                    <a
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={action}
                    >
                      <span className="font-semibold text-foreground">
                        Read the report
                      </span>
                      <span aria-hidden className="text-accent">
                        ↗
                      </span>
                    </a>
                  )}
                  {pub.pdf && (
                    <a
                      href={pub.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={action}
                    >
                      <span className="font-semibold text-foreground">
                        Download the PDF
                      </span>
                      <span aria-hidden className="text-accent">
                        ↗
                      </span>
                    </a>
                  )}
                </>
              ) : (
                <p className="rounded-xl border border-dashed border-border px-5 py-4 text-sm text-muted">
                  This report is {pub.status.toLowerCase()}. The research it
                  writes up is already running, so the demos and the source are
                  the way in until it publishes.
                </p>
              )}
            </div>

            <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2 border-t border-border pt-6 font-mono text-xs text-muted">
              <span>{pub.area}</span>
              <span>{pub.status}</span>
              {pub.date && <span>{pub.date}</span>}
              {pub.repo && (
                <a
                  href={pub.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto text-foreground/80 transition-colors hover:text-accent"
                >
                  View source ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Catalogue ───────────────────────────────────────────────────────── */

export function PublicationsShowcase() {
  const [topic, setTopic] = useState<string | null>(null);
  const [status, setStatus] = useState<"published" | "upcoming" | null>(null);
  const [open, setOpen] = useState<Publication | null>(null);

  const visible = publications.items.filter((p) => {
    if (topic && p.topic !== topic) return false;
    if (status === "published" && !p.url) return false;
    if (status === "upcoming" && p.url) return false;
    return true;
  });

  // Internal guides carry a url but are not published work — counting them as
  // published would overstate what a visitor can actually read.
  const published = visible.filter(readable).length;
  const internal = visible.filter((p) => p.access === "internal").length;

  // Shelves with nothing on them are not drawn, in the canonical topic order.
  const shelves = publicationTopics
    .map((t) => ({ topic: t, items: visible.filter((p) => p.topic === t) }))
    .filter((s) => s.items.length > 0);

  const chip = (active: boolean) =>
    `rounded-full border px-3 py-1.5 text-sm transition-colors ${
      active
        ? "border-accent bg-accent font-semibold text-accent-ink"
        : "border-border text-muted hover:border-accent hover:text-accent"
    }`;

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24">
      <div className="space-y-4 border-b border-border pb-8">
        {/* filter row — by topic */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 w-20 shrink-0 text-xs uppercase tracking-wider text-muted">
            Topic
          </span>
          <button
            type="button"
            onClick={() => setTopic(null)}
            className={chip(topic === null)}
          >
            All
          </button>
          {publicationTopics
            .filter((t) => publications.items.some((p) => p.topic === t))
            .map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTopic((v) => (v === t ? null : t))}
                className={chip(topic === t)}
              >
                {t}
              </button>
            ))}
          <span className="ml-auto font-mono text-xs text-muted">
            {published} published
            {internal > 0 && ` · ${internal} CoLab only`} · {visible.length}{" "}
            shown
          </span>
        </div>

        {/* filter row — by status */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 w-20 shrink-0 text-xs uppercase tracking-wider text-muted">
            Status
          </span>
          <button
            type="button"
            onClick={() => setStatus(null)}
            className={chip(status === null)}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => setStatus((v) => (v === "published" ? null : "published"))}
            className={chip(status === "published")}
          >
            Readable now
          </button>
          <button
            type="button"
            onClick={() => setStatus((v) => (v === "upcoming" ? null : "upcoming"))}
            className={chip(status === "upcoming")}
          >
            In preparation
          </button>
        </div>
      </div>

      {/* One rail per topic, stacked down the page */}
      <div className="mt-12 space-y-14">
        {shelves.map((shelf) => (
          <PosterRail
            key={shelf.topic}
            title={shelf.topic}
            count={shelf.items.length}
            countNoun="report"
            ariaLabel={`${shelf.topic} reports`}
          >
            {shelf.items.map((pub) => (
              <div
                key={pub.index}
                className="w-[190px] shrink-0 snap-start scroll-mt-24 sm:w-[215px]"
              >
                <Cover pub={pub} onOpen={() => setOpen(pub)} />
              </div>
            ))}
          </PosterRail>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="py-16 text-muted">No reports match those filters.</p>
      )}

      {open && (
        <PublicationSheet
          key={open.index}
          pub={open}
          onClose={() => setOpen(null)}
        />
      )}
    </div>
  );
}
