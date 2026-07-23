"use client";

import { useState } from "react";
import {
  products,
  productTerms,
  productThemes,
  type Product,
} from "@/content/site";
import { asset } from "@/lib/asset";
import { PosterRail } from "@/components/PosterRail";
import { Tilt3D } from "@/components/motion/Tilt3D";
import {
  DemoRunner,
  demoCount,
  runTarget,
  type RunnableDemo,
} from "@/components/DemoRunner";

/**
 * The Live Demos catalog.
 *
 * Laid out as a film catalogue: the page runs vertically through one rail per
 * subject, and each rail is a row of portrait posters browsed by dragging or
 * by the arrow buttons. The demo's own screen is the poster art.
 *
 * Picking a poster opens the shared DemoRunner, which the portfolio page also
 * uses, so a project opens the same way wherever it is clicked.
 */

/** A catalogue product, in the shape the runner understands. */
function toRunnable(p: Product): RunnableDemo {
  return {
    name: p.name,
    blurb: p.blurb,
    demo: p.demo,
    demos: p.demos,
    repo: p.repo,
    posterKey: p.repoName,
    meta: [p.theme, p.term, p.language],
    access: p.access,
    publication: p.publication,
  };
}

const LANG_COLOR: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f0db4f",
  HTML: "#e34c26",
  Python: "#3572A5",
};

function langColor(l: string) {
  return LANG_COLOR[l] ?? "var(--muted)";
}

/** Initials for the fallback field, shown when a project has no screenshot.
 *  Strips the leading acronym-and-dash some names carry. */
function monogram(name: string) {
  return name
    .replace(/^[A-Z]+\s*[—–-]\s*/, "")
    .split(/\s+/)
    .filter((w) => /[a-z0-9]/i.test(w[0] ?? ""))
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

/* ── Poster ──────────────────────────────────────────────────────────── */

function Poster({
  product,
  onOpen,
}: {
  product: Product;
  onOpen: () => void;
}) {
  const live = Boolean(runTarget(product));
  const count = demoCount(product);

  return (
    <Tilt3D max={5} className="h-full">
      <button
        type="button"
        onClick={onOpen}
        aria-label={
          live
            ? `Open the ${product.name} demo`
            : `${product.name}, source only`
        }
        className="group/poster relative flex aspect-[2/3] h-full w-full flex-col justify-end overflow-hidden rounded-xl border border-border p-4 text-left transition-colors hover:border-accent focus-visible:border-accent focus-visible:outline-none"
        style={{ background: "var(--poster-ground)" }}
      >
        {/* The demo's own screen is the poster art, full strength. Behind it
            sits a monogram, so a project with no capture still gets a composed
            poster rather than a hole. */}
        <span
          aria-hidden
          className="absolute inset-0 flex items-center justify-center font-heading text-7xl uppercase"
          style={{
            color: "color-mix(in oklab, var(--poster-accent) 20%, transparent)",
          }}
        >
          {monogram(product.name)}
        </span>
        <span
          aria-hidden
          className="absolute inset-0 bg-cover bg-top transition-transform duration-500 group-hover/poster:scale-[1.05]"
          style={{
            backgroundImage: `url(${asset(`/repos/${product.repoName}.jpg`)})`,
          }}
        />
        {/* Scrim: the art runs the full height, so the lower half is darkened
            to hold the title. Weighted to the bottom to keep the screen
            itself readable up top. */}
        <span
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent 30%, color-mix(in oklab, var(--poster-ground) 72%, transparent) 58%, var(--poster-ground) 92%)",
          }}
        />

        {/* Status rides the poster, the way one carries its rating */}
        <span className="absolute right-3 top-3">
          {product.access === "internal" ? (
            <span className="rounded-full border border-white/35 bg-black/45 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-white/85 backdrop-blur">
              CoLab only
            </span>
          ) : live ? (
            <span
              className="rounded-full px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider"
              style={{
                background: "var(--poster-accent)",
                color: "var(--poster-accent-ink)",
              }}
            >
              Live
            </span>
          ) : (
            <span
              className="rounded-full border border-border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider"
              style={{ color: "var(--poster-ink-muted)" }}
            >
              Source
            </span>
          )}
        </span>

        {live && (
          <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover/poster:opacity-100 group-focus-visible/poster:opacity-100">
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-lg"
              style={{
                background: "var(--poster-accent)",
                color: "var(--poster-accent-ink)",
              }}
            >
              ▶ Run
            </span>
          </span>
        )}

        {/* Guides have nothing to run, but the card still opens — say so, or
            the poster reads as inert. */}
        {!live && product.access === "internal" && (
          <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover/poster:opacity-100 group-focus-visible/poster:opacity-100">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-black/60 px-4 py-2 text-sm font-semibold text-white shadow-lg backdrop-blur">
              Read the guide
            </span>
          </span>
        )}

        <div className="relative">
          {/* The subject the demo belongs to, on the card itself */}
          <p
            className="font-mono text-[10px] uppercase tracking-wider"
            style={{ color: "var(--poster-accent)" }}
          >
            {product.theme}
          </p>

          {/* Colour set as a utility, not inline: an inline style would beat
              the hover variant and the title would never take the accent. */}
          <h3 className="mt-1.5 font-heading text-2xl uppercase leading-[1.05] tracking-[0.02em] text-[color:var(--poster-ink)] transition-colors group-hover/poster:text-[color:var(--poster-accent)]">
            {product.name}
          </h3>

          <div
            className="mt-3 font-mono text-[10px] uppercase tracking-wider"
            style={{ color: "var(--poster-ink-muted)" }}
          >
            <div className="flex items-center gap-1.5">
              <span
                aria-hidden
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: langColor(product.language) }}
              />
              <span className="truncate">{product.language}</span>
              <span aria-hidden className="text-border-strong">
                ·
              </span>
              <span className="shrink-0">{product.term}</span>
            </div>
            {count > 1 && (
              <div className="mt-1" style={{ color: "var(--poster-accent)" }}>
                {count} demos
              </div>
            )}
          </div>
        </div>
      </button>
    </Tilt3D>
  );
}

/* ── Shelf ───────────────────────────────────────────────────────────── */

/** One subject's rail. The scroll mechanics live in PosterRail, which the
 *  Publications catalogue shares, so the two browse identically. */
function Shelf({
  theme,
  items,
  onOpen,
}: {
  theme: string;
  items: Product[];
  onOpen: (p: Product) => void;
}) {
  return (
    <PosterRail
      title={theme}
      count={items.length}
      countNoun="title"
      ariaLabel={`${theme} demos`}
    >
      {items.map((product) => (
        <div
          key={product.repoName}
          id={product.repoName}
          className="w-[190px] shrink-0 snap-start scroll-mt-24 sm:w-[215px]"
        >
          <Poster product={product} onOpen={() => onOpen(product)} />
        </div>
      ))}
    </PosterRail>
  );
}

/* ── Catalog ─────────────────────────────────────────────────────────── */

export function RepoShowcase() {
  const [term, setTerm] = useState<string | null>(null);
  const [theme, setTheme] = useState<string | null>(null);
  const [open, setOpen] = useState<Product | null>(null);

  const visible = products.filter(
    (p) => (!term || p.term === term) && (!theme || p.theme === theme),
  );

  // Themes that still have something in them under the current filters, in
  // the canonical order. An empty shelf is not drawn.
  const shelves = productThemes
    .map((t) => ({ theme: t, items: visible.filter((p) => p.theme === t) }))
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
        {/* filter row — by semester */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 w-20 shrink-0 text-xs uppercase tracking-wider text-muted">
            Semester
          </span>
          <button
            type="button"
            onClick={() => setTerm(null)}
            className={chip(term === null)}
          >
            All
          </button>
          {productTerms.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTerm((v) => (v === t ? null : t))}
              className={chip(term === t)}
            >
              {t}
            </button>
          ))}
          <span className="ml-auto font-mono text-xs text-muted">
            {visible.filter((p) => runTarget(p)).length} live ·{" "}
            {visible.length} shown
          </span>
        </div>

        {/* filter row — by theme */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 w-20 shrink-0 text-xs uppercase tracking-wider text-muted">
            Theme
          </span>
          <button
            type="button"
            onClick={() => setTheme(null)}
            className={chip(theme === null)}
          >
            All
          </button>
          {productThemes.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTheme((v) => (v === t ? null : t))}
              className={chip(theme === t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* One rail per subject, stacked down the page */}
      <div className="mt-12 space-y-14">
        {shelves.map((shelf) => (
          <Shelf
            key={shelf.theme}
            theme={shelf.theme}
            items={shelf.items}
            onOpen={setOpen}
          />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="py-16 text-muted">No demos match those filters.</p>
      )}

      {open && (
        <DemoRunner
          key={open.repoName}
          demo={toRunnable(open)}
          onClose={() => setOpen(null)}
        />
      )}
    </div>
  );
}
