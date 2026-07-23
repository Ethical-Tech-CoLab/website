"use client";

import { useState } from "react";
import { Link } from "next-view-transitions";
import {
  publications,
  publicationTopics,
  type Publication,
} from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

/**
 * The publications catalogue: one section per topic, stacked down the page,
 * with chips to narrow to a single topic.
 *
 * Topic is a separate axis from the research area a report came out of: the
 * AI-practice write-ups group under Guidelines because they are advice on
 * doing the work rather than findings about a domain. Sections and chips both
 * mirror the Live Demos page so the two catalogues read the same way.
 */
/** One report. Split out so each topic section can render a grid of them
 *  without repeating the card. */
function PubCard({ pub }: { pub: Publication }) {
  return (
            <article className="card-glow flex h-full flex-col rounded-2xl border border-border bg-card p-7 transition-colors hover:border-border-strong">
              {/* No "07 / Evacuation" eyebrow: the index numbers are internal
                  ordering that means nothing to a reader, and the topic is
                  already the heading this card sits under. The status badge
                  keeps the row. */}
              <div className="flex items-center justify-end gap-3">
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

              {/* h3: the topic heading this section carries is the h2 above. */}
              <h3 className="mt-4 font-heading text-xl uppercase leading-snug tracking-wide sm:text-2xl">
                {pub.title}
              </h3>
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
  );
}

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

  // One section per topic, in the order publicationTopics lists them. Filtering
  // narrows to a single section rather than flattening the page, so a report
  // sits under the same heading whether or not a chip is active.
  const grouped = publicationTopics
    .map((t) => ({ topic: t, items: visible.filter((p) => p.topic === t) }))
    .filter((s) => s.items.length > 0);

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

      <div className="mt-12 space-y-16">
        {grouped.map((s) => (
          <section key={s.topic}>
            <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
              <h2 className="font-heading text-2xl uppercase tracking-wide sm:text-3xl">
                {s.topic}
              </h2>
              <span className="shrink-0 font-mono text-xs text-muted">
                {s.items.length} {s.items.length === 1 ? "report" : "reports"}
              </span>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {s.items.map((pub) => (
                <Reveal key={pub.index}>
                  <PubCard pub={pub} />
                </Reveal>
              ))}
            </div>
          </section>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="py-16 text-muted">No reports under that topic.</p>
      )}
    </div>
  );
}
