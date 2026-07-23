"use client";

import { useEffect, useState } from "react";
import { Link } from "next-view-transitions";
import type { DemoLink } from "@/content/site";
import { asset } from "@/lib/asset";

/**
 * The full-screen demo runner, shared by the Live Demos catalogue and the
 * portfolio page so a project opens the same way from either.
 *
 * It opens on the title page: the poster, the description, and every way in.
 * Pressing play swaps the sheet for the demo running in an iframe, with a way
 * back. Projects whose links are third-party pages that refuse to be framed
 * open in a new tab instead.
 */

/** The minimum a thing needs to be openable here. Both `Product` (Live Demos)
 *  and `SubProject` (portfolio) are mapped onto this, so the runner does not
 *  need to know which page it was opened from. */
export interface RunnableDemo {
  name: string;
  blurb: string;
  /** Primary hosted URL. Its presence is what makes framing possible. */
  demo?: string;
  /** Named demos, when a project ships more than one. */
  demos?: DemoLink[];
  repo?: string;
  /** public/repos/<posterKey>.jpg — the poster art, when there is any. */
  posterKey?: string;
  /** Small facts for the footer row, e.g. theme, term, language. */
  meta?: string[];
  /** Source lives in a private CoLab repo: the sheet says the link needs a
   *  sign-in rather than presenting it as openly readable. */
  access?: "internal";
  /** Route of the written-up report, shown under the demo entries. */
  publication?: string;
}

export function demoCount(d: RunnableDemo) {
  return d.demos?.length ?? (d.demo ? 1 : 0);
}

export function runTarget(d: RunnableDemo) {
  return d.demo ?? d.demos?.[0]?.href ?? null;
}

export function DemoRunner({
  demo,
  onClose,
}: {
  demo: RunnableDemo;
  onClose: () => void;
}) {
  // null = showing the title page rather than a running demo. Callers key
  // this component by project, so opening a different one remounts it and
  // the title page comes back without an effect resetting state.
  const [src, setSrc] = useState<string | null>(null);

  // Close on Escape, and lock body scroll while the runner is up.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const count = demoCount(demo);
  const framed = Boolean(demo.demo);
  const entries: DemoLink[] = demo.demos?.length
    ? demo.demos
    : demo.demo
      ? [{ label: "Run the demo", href: demo.demo }]
      : [];

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-background"
      role="dialog"
      aria-modal="true"
      aria-label={src ? `${demo.name} live demo` : demo.name}
    >
      {/* control bar */}
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5">
        <div className="min-w-0">
          <h3 className="truncate font-heading text-xl uppercase tracking-[0.02em] sm:text-2xl">
            {demo.name}
          </h3>
          <p className="truncate font-mono text-[10px] text-muted">
            {src
              ? new URL(src).host
              : demo.access === "internal"
                ? "Practice guide"
                : `${count} ${count === 1 ? "demo" : "demos"}`}
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
            onClick={onClose}
            className="rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-accent-ink transition-transform hover:scale-[1.03]"
          >
            ✕ Close
          </button>
        </div>
      </div>

      {src ? (
        <iframe
          src={src}
          title={`${demo.name} live demo`}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          className="w-full flex-1 border-0 bg-white"
        />
      ) : (
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto grid max-w-4xl gap-10 px-6 py-12 sm:grid-cols-[minmax(0,200px)_1fr] sm:py-14">
            {/* The card you clicked, carried into the sheet */}
            {demo.posterKey && (
              <div
                className="hidden aspect-[2/3] w-full overflow-hidden rounded-xl border border-border bg-cover bg-top sm:block"
                style={{
                  backgroundImage: `url(${asset(`/repos/${demo.posterKey}.jpg`)})`,
                  backgroundColor: "var(--poster-ground)",
                }}
              />
            )}

            <div>
              <p className="text-lg leading-relaxed text-foreground/85">
                {demo.blurb}
              </p>

              <div className="mt-8 space-y-3">
                {entries.map((d) =>
                  framed ? (
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
                  ),
                )}
                {/* The research behind the thing you just ran. Sits with the
                    run entries rather than in the footer meta, because having
                    played with a tool is exactly when someone wants it. */}
                {demo.publication && (
                  <Link
                    href={demo.publication}
                    className="flex w-full items-center justify-between gap-4 rounded-xl border border-border bg-card px-5 py-4 transition-colors hover:border-accent"
                  >
                    <span className="font-semibold text-foreground">
                      Read the research report
                    </span>
                    <span aria-hidden className="text-accent">
                      →
                    </span>
                  </Link>
                )}
                {entries.length === 0 && !demo.publication && (
                  <p className="text-sm text-muted">
                    {demo.access === "internal"
                      ? "A written guide rather than a running demo. It lives in a private CoLab repository, so opening it needs a GitHub account with access to the org."
                      : "This project ships as source only. There is no hosted demo to run."}
                  </p>
                )}
              </div>

              <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2 border-t border-border pt-6 font-mono text-xs text-muted">
                {demo.meta?.map((m) => <span key={m}>{m}</span>)}
                {demo.repo && (
                  <a
                    href={demo.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto text-foreground/80 transition-colors hover:text-accent"
                  >
                    {demo.access === "internal"
                      ? "Open in the CoLab repo (sign-in required) ↗"
                      : "View source ↗"}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
