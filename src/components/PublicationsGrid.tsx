"use client";

import { useState } from "react";
import { Link } from "next-view-transitions";
import { publications, publicationTopics } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

/**
 * The publications grid, filterable by topic.
 *
 * Topic is a separate axis from the research area a report came out of: the
 * AI-practice write-ups group under Guidelines because they are advice on
 * doing the work rather than findings about a domain. The chips mirror the
 * Live Demos filters so the two catalogues behave the same way.
 */
export function PublicationsGrid() {
  const [topic, setTopic] = useState<string | null>(null);

  const visible = publications.items.filter((p) => !topic || p.topic === topic);
  // Internal guides carry a url but are not published work — counting them as
  // published would overstate what a visitor can actually read.
  const published = visible.filter(
    (p) => p.url && p.access !== "internal",
  ).length;
  const internal = visible.filter((p) => p.access === "internal").length;

  // Topics with nothing in them would be dead chips, so only offer the ones
  // that actually match something.
  const topics = publicationTopics.filter((t) =>
    publications.items.some((p) => p.topic === t),
  );

  const chip = (active: boolean) =>
    `rounded-full border px-3 py-1.5 text-sm transition-colors ${
      active
        ? "border-accent bg-accent font-semibold text-accent-ink"
        : "border-border text-muted hover:border-accent hover:text-accent"
    }`;

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="border-b border-border pb-8">
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
          {topics.map((t) => (
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
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {visible.map((pub) => (
          <Reveal key={pub.index}>
            <article className="card-glow flex h-full flex-col rounded-2xl border border-border bg-card p-7 transition-colors hover:border-border-strong">
              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-sm text-accent">
                  {pub.index} / {pub.topic}
                </p>
                {pub.access === "internal" ? (
                  <span className="shrink-0 rounded-full border border-border px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-muted">
                    CoLab only
                  </span>
                ) : pub.url ? (
                  <span className="shrink-0 rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent-ink">
                    ● Published
                  </span>
                ) : (
                  <span className="shrink-0 rounded-full border border-border px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-muted">
                    {pub.status}
                  </span>
                )}
              </div>

              <h2 className="mt-4 font-heading text-xl uppercase leading-snug tracking-wide sm:text-2xl">
                {pub.title}
              </h2>
              {pub.date && (
                <p className="mt-2 font-mono text-xs text-muted">{pub.date}</p>
              )}
              <p className="mt-2 text-sm font-medium text-muted">
                {pub.question}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {pub.summary}
              </p>

              <div className="mt-auto pt-6">
                {pub.access === "internal" ? (
                  /* Private repo: say so on the button rather than letting a
                     reader discover it as a 404. */
                  <a
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:border-accent hover:text-accent"
                  >
                    Open in the CoLab repo{" "}
                    <span className="text-xs">(sign-in required)</span>{" "}
                    <span aria-hidden>↗</span>
                  </a>
                ) : pub.url ? (
                  pub.url.startsWith("/") ? (
                    <Link
                      href={pub.url}
                      className="btn-sweep inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-ink transition-transform hover:scale-[1.03]"
                    >
                      Read report <span aria-hidden>→</span>
                    </Link>
                  ) : (
                    <a
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-sweep inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-ink transition-transform hover:scale-[1.03]"
                    >
                      Read report <span aria-hidden>↗</span>
                    </a>
                  )
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-border px-5 py-2.5 text-sm text-muted">
                    Academic report — coming soon
                  </span>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="py-16 text-muted">No reports under that topic.</p>
      )}
    </div>
  );
}
