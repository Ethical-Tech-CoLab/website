"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  products,
  productTerms,
  productThemes,
  type Product,
} from "@/content/site";
import { asset } from "@/lib/asset";
import { Tilt3D } from "@/components/motion/Tilt3D";

/**
 * The Live Demos catalog.
 *
 * Laid out as a film catalogue: the page runs vertically through one section
 * per theme, and each section is a shelf of portrait posters. A poster is
 * composed here rather than being an image file, because the only artwork the
 * projects have is a landscape screenshot, and no crop of a 1600x1000 browser
 * capture makes a poster. So the screenshot becomes a band inside a designed
 * card, under the title and over the credits.
 *
 * Picking a poster opens the runner: an iframe for a project with a single
 * live URL, or a chooser for a project that ships several.
 */

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

/** Is there anything to run, and where does it point? */
function runTarget(p: Product) {
  return p.demo ?? p.demos?.[0]?.href ?? null;
}

function demoCount(p: Product) {
  return p.demos?.length ?? (p.demo ? 1 : 0);
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
        {/* The screenshot is texture, not subject. These are all pale, dense
            dashboard captures; at poster size they read as identical grey
            noise and drown the title. Desaturated, tinted to the brand purple
            and held well back, they give each poster a distinct field without
            competing with the type. Behind it sits a monogram, so a project
            with no capture still gets a composed poster rather than a hole. */}
        <span
          aria-hidden
          className="absolute inset-0 flex items-center justify-center font-heading text-7xl uppercase text-accent/[0.07]"
        >
          {monogram(product.name)}
        </span>
        <span
          aria-hidden
          className="absolute inset-0 bg-cover bg-top opacity-30 mix-blend-luminosity transition-all duration-500 group-hover/poster:scale-[1.04] group-hover/poster:opacity-45"
          style={{
            backgroundImage: `url(${asset(`/repos/${product.repoName}.jpg`)})`,
          }}
        />
        {/* Scrim: keeps the credits and title legible over any field */}
        <span
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in oklab, var(--poster-ground) 30%, transparent) 0%, color-mix(in oklab, var(--poster-ground) 80%, transparent) 45%, var(--poster-ground) 100%)",
          }}
        />

        {/* Status rides the poster, the way one carries its rating */}
        <span className="absolute right-3 top-3">
          {live ? (
            <span className="rounded-full bg-accent px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-accent-ink">
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
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-ink shadow-lg">
              ▶ Run
            </span>
          </span>
        )}

        {/* The title is the artwork. Everything above is its ground. */}
        <div className="relative">
          {/* Colour set as a utility, not inline: an inline style would beat
              the hover variant and the title would never take the accent. */}
          <h3 className="font-heading text-2xl uppercase leading-[0.92] tracking-wide text-[color:var(--poster-ink)] transition-colors group-hover/poster:text-accent sm:text-[1.75rem]">
            {product.name}
          </h3>

          <div className="mt-3 h-px w-10 bg-accent" />

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
            {count > 1 && <div className="mt-1 text-accent">{count} demos</div>}
          </div>
        </div>
      </button>
    </Tilt3D>
  );
}

/* ── Catalog ─────────────────────────────────────────────────────────── */

export function RepoShowcase() {
  const [term, setTerm] = useState<string | null>(null);
  const [theme, setTheme] = useState<string | null>(null);
  const [open, setOpen] = useState<Product | null>(null);
  const [src, setSrc] = useState<string | null>(null);
  const reduce = useReducedMotion();

  const visible = products.filter(
    (p) => (!term || p.term === term) && (!theme || p.theme === theme),
  );

  // Themes that still have something in them under the current filters, in
  // the canonical order. An empty shelf is not drawn.
  const shelves = productThemes
    .map((t) => ({ theme: t, items: visible.filter((p) => p.theme === t) }))
    .filter((s) => s.items.length > 0);

  // Picking a poster opens the title page, not the demo. The poster face has
  // room for a name and its credits and nothing else, so the blurb, the demo
  // list, and the source link live one step in. Press play from there.
  const openProduct = (p: Product) => {
    setOpen(p);
    setSrc(null);
  };

  const close = () => {
    setOpen(null);
    setSrc(null);
  };

  // Close on Escape, and lock body scroll while the runner is up.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

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

      {/* Shelves, one per theme, stacked down the page. The shelves themselves
          are plain sections: only the posters inside them animate, because
          nesting one AnimatePresence popLayout inside another leaves the
          children stuck at their initial opacity. */}
      <div className="mt-12 space-y-16">
        {shelves.map((shelf) => (
            <section key={shelf.theme}>
              <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
                <h2 className="font-heading text-2xl uppercase tracking-wide sm:text-3xl">
                  {shelf.theme}
                </h2>
                <span className="shrink-0 font-mono text-xs text-muted">
                  {shelf.items.length}{" "}
                  {shelf.items.length === 1 ? "title" : "titles"}
                </span>
              </div>

              <motion.div
                layout={!reduce}
                className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4"
              >
                {/* initial={false} so the posters render visible on load. The
                    catalog is the whole page, and it should not depend on an
                    entrance animation completing to be seen. Filtering still
                    animates: exit fades a poster out, layout reflows the rest. */}
                <AnimatePresence mode="popLayout" initial={false}>
                  {shelf.items.map((product) => (
                    <motion.div
                      key={product.repoName}
                      id={product.repoName}
                      layout={!reduce}
                      exit={{ opacity: 0, scale: reduce ? 1 : 0.97 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full scroll-mt-24"
                    >
                      <Poster
                        product={product}
                        onOpen={() => openProduct(product)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </section>
          ))}
      </div>

      {visible.length === 0 && (
        <p className="py-16 text-muted">No demos match those filters.</p>
      )}

      {/* Runner */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-background"
          role="dialog"
          aria-modal="true"
          aria-label={src ? `${open.name} live demo` : open.name}
        >
          {/* control bar */}
          <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5">
            <div className="min-w-0">
              <h3 className="truncate font-heading text-base uppercase tracking-wide">
                {open.name}
              </h3>
              <p className="truncate font-mono text-[10px] text-muted">
                {src
                  ? new URL(src).host
                  : `${demoCount(open)} ${demoCount(open) === 1 ? "demo" : "demos"}`}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {src && (
                <button
                  type="button"
                  onClick={() => setSrc(null)}
                  className="rounded-full border border-border px-4 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  ← Details
                </button>
              )}
              {src && (
                <a
                  href={src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-border px-4 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  Open in new tab ↗
                </a>
              )}
              <button
                type="button"
                onClick={close}
                className="rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-accent-ink transition-transform hover:scale-[1.03]"
              >
                ✕ Close
              </button>
            </div>
          </div>

          {src ? (
            <iframe
              src={src}
              title={`${open.name} live demo`}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              className="w-full flex-1 border-0 bg-white"
            />
          ) : (
            /* Title page: the blurb, then every way in. A project that names
               no demos individually still gets one entry, so the sheet reads
               the same whether it ships one demo or four. Projects whose only
               links are third-party pages refuse to be framed, so those open
               in a new tab instead of in the runner. */
            <div className="flex-1 overflow-y-auto">
              <div className="mx-auto max-w-2xl px-6 py-14">
                <p className="text-lg leading-relaxed text-foreground/85">
                  {open.blurb}
                </p>
                <div className="mt-10 space-y-3">
                  {(open.demos?.length
                    ? open.demos
                    : open.demo
                      ? [{ label: "Run the demo", href: open.demo }]
                      : []
                  ).map((d) => {
                    const framed = Boolean(open.demo);
                    return framed ? (
                      <button
                        key={d.href}
                        type="button"
                        onClick={() => setSrc(d.href)}
                        className="flex w-full items-center justify-between gap-4 rounded-xl border border-border bg-card px-5 py-4 text-left transition-colors hover:border-accent"
                      >
                        <span className="font-semibold text-foreground">
                          {d.label}
                        </span>
                        <span aria-hidden className="text-accent">
                          ▶
                        </span>
                      </button>
                    ) : (
                      <a
                        key={d.href}
                        href={d.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-between gap-4 rounded-xl border border-border bg-card px-5 py-4 transition-colors hover:border-accent"
                      >
                        <span className="font-semibold text-foreground">
                          {d.label}
                        </span>
                        <span aria-hidden className="text-accent">
                          ↗
                        </span>
                      </a>
                    );
                  })}
                  {!open.demo && !open.demos?.length && (
                    <p className="text-sm text-muted">
                      This project ships as source only. There is no hosted
                      demo to run.
                    </p>
                  )}
                </div>
                <div className="mt-10 flex flex-wrap gap-x-4 gap-y-2 border-t border-border pt-6 font-mono text-xs text-muted">
                  <span>{open.theme}</span>
                  <span>{open.term}</span>
                  <span>{open.language}</span>
                  {open.repo && (
                    <a
                      href={open.repo}
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
          )}
        </div>
      )}
    </div>
  );
}
