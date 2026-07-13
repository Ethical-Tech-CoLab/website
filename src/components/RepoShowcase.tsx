"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  products,
  productTerms,
  productThemes,
  type Product,
} from "@/content/site";
import { asset } from "@/lib/asset";
import { Tilt3D } from "@/components/motion/Tilt3D";

const LANG_COLOR: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f0db4f",
  HTML: "#e34c26",
  Python: "#3572A5",
};

function langColor(l: string) {
  return LANG_COLOR[l] ?? "var(--muted)";
}

/** A minimal browser-chrome frame around a poster that swaps to a live iframe. */
function DemoFrame({
  product,
  active,
  onRun,
  onStop,
}: {
  product: Product;
  active: boolean;
  onRun: () => void;
  onStop: () => void;
}) {
  const host = product.demo ? new URL(product.demo).host : "";
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface/60">
      {/* chrome bar */}
      <div className="flex items-center gap-2 border-b border-border bg-background/60 px-3 py-2">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/70" />
        </span>
        <span className="ml-1 flex-1 truncate rounded-md bg-surface px-2 py-0.5 font-mono text-[10px] text-muted">
          {host}
        </span>
        {active ? (
          <button
            type="button"
            onClick={onStop}
            className="rounded-md px-2 py-0.5 font-mono text-[10px] text-muted transition-colors hover:text-accent"
          >
            ✕ stop
          </button>
        ) : (
          <a
            href={product.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md px-2 py-0.5 font-mono text-[10px] text-muted transition-colors hover:text-accent"
          >
            open ↗
          </a>
        )}
      </div>

      {/* stage */}
      <div className="relative aspect-[16/10] w-full">
        {active ? (
          <iframe
            src={product.demo}
            title={`${product.name} live demo`}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            className="absolute inset-0 h-full w-full bg-white"
          />
        ) : (
          <button
            type="button"
            onClick={onRun}
            aria-label={`Run live demo of ${product.name}`}
            className="group/frame absolute inset-0 h-full w-full"
          >
            {/* poster: real screenshot if present, else branded gradient */}
            <span
              aria-hidden
              className="absolute inset-0 bg-cover bg-center opacity-90 transition-opacity group-hover/frame:opacity-100"
              style={{
                backgroundImage: `url(${asset(`/repos/${product.repoName}.jpg`)})`,
                backgroundColor: "var(--secondary)",
              }}
            />
            <span
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, transparent 40%, color-mix(in oklab, var(--background) 70%, transparent))",
              }}
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="btn-sweep inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-ink shadow-lg transition-transform group-hover/frame:scale-105">
                ▶ Run live demo
              </span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

function ProductCard({
  product,
  active,
  onRun,
  onStop,
}: {
  product: Product;
  active: boolean;
  onRun: () => void;
  onStop: () => void;
}) {
  return (
    <Tilt3D max={6} disabled={active} className="h-full">
    <div
      className={`card-glow flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-border-strong`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-heading text-xl uppercase tracking-wide sm:text-2xl">
            {product.name}
          </h3>
          {product.repo && (
            <p className="mt-1 font-mono text-xs text-muted">
              {product.repoName}
            </p>
          )}
        </div>
        {product.demo || product.demos?.length ? (
          <span className="shrink-0 rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent-ink">
            ● Live
          </span>
        ) : (
          <span className="shrink-0 rounded-full border border-border px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-muted">
            Source
          </span>
        )}
      </div>

      <p className="mt-3 text-sm leading-relaxed text-muted">{product.blurb}</p>

      {product.demo && (
        <div className="mt-5">
          <DemoFrame
            product={product}
            active={active}
            onRun={onRun}
            onStop={onStop}
          />
        </div>
      )}

      {product.demos && product.demos.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {product.demos.map((d) => (
            <a
              key={d.href}
              href={d.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sweep inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-ink transition-transform hover:scale-[1.03]"
            >
              ▶ {d.label}
            </a>
          ))}
        </div>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-5 font-mono text-xs text-muted">
        <span className="inline-flex items-center gap-1.5">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: langColor(product.language) }}
          />
          {product.language}
        </span>
        <span className="rounded-full border border-border px-2 py-0.5">
          #{product.theme.replace(/\s+/g, "")}
        </span>
        <span className="rounded-full border border-border px-2 py-0.5">
          {product.term}
        </span>
        {product.repo && (
          <a
            href={product.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto text-foreground/80 transition-colors hover:text-accent"
          >
            View source ↗
          </a>
        )}
      </div>
    </div>
    </Tilt3D>
  );
}

export function RepoShowcase() {
  const [term, setTerm] = useState<string | null>(null);
  const [theme, setTheme] = useState<string | null>(null);
  const [activeRepo, setActiveRepo] = useState<string | null>(null);
  const reduce = useReducedMotion();

  const visible = products.filter(
    (p) => (!term || p.term === term) && (!theme || p.theme === theme),
  );

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
            {visible.filter((p) => p.demo || p.demos?.length).length} live ·{" "}
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

      {/* bento grid — FLIP reflow on filter change */}
      <motion.div layout className="mt-10 grid gap-6 lg:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((product) => (
            <motion.div
              key={product.repoName}
              id={product.repoName}
              layout={!reduce}
              initial={{ opacity: 0, scale: reduce ? 1 : 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: reduce ? 1 : 0.97 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="h-full scroll-mt-24"
            >
              <ProductCard
                product={product}
                active={activeRepo === product.repoName}
                onRun={() => setActiveRepo(product.repoName)}
                onStop={() => setActiveRepo(null)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 && (
        <p className="py-16 text-muted">No demos match those filters.</p>
      )}
    </div>
  );
}
