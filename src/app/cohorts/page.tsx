import type { Metadata } from "next";
import { Link } from "next-view-transitions";
import { cohorts } from "@/content/site";
import { Tilt3D } from "@/components/motion/Tilt3D";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Cohorts",
  description:
    "Each cohort of the Ethical Tech CoLab takes on applied research and proof-of-concept projects on intervention opportunities at the intersection of emerging technologies and the human condition.",
};

export default function CohortsPage() {
  // Newest cohort first.
  const ordered = [...cohorts].reverse();

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <span className="aura" />
        <div className="relative mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <p className="text-xs uppercase tracking-wider text-muted">
              Cohorts · 2025-2026
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-4 fluid-hero font-heading uppercase leading-[0.9]">
              Cohorts.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
              Each cohort of the Ethical Tech CoLab takes on applied research and
              proof-of-concept projects on intervention opportunities at the
              intersection of emerging technologies and the human condition.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ordered.map((cohort) => (
            <Tilt3D key={cohort.index} max={7}>
            <article
              className={`flex h-full flex-col rounded-2xl border bg-card p-7 transition-colors ${
                cohort.current
                  ? "border-accent/60"
                  : "border-border hover:border-foreground/25"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-muted">
                  {cohort.index}
                </span>
                {cohort.current ? (
                  <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-background">
                    Current
                  </span>
                ) : (
                  <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted">
                    Past
                  </span>
                )}
              </div>

              <h2 className="mt-4 text-xl font-semibold tracking-tight">
                {cohort.term}
              </h2>
              <p className="mt-1 text-sm font-medium text-accent">
                {cohort.title}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {cohort.body}
              </p>

              <ul className="mt-5 space-y-2 text-sm text-foreground/85">
                {cohort.items.map((item) => {
                  const isLink = typeof item !== "string";
                  const key = isLink ? item.label : item;
                  return (
                    <li key={key} className="flex gap-2.5">
                      <span aria-hidden className="mt-1 text-accent">
                        ◦
                      </span>
                      {isLink ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-accent underline-offset-4 transition-opacity hover:underline hover:opacity-80"
                        >
                          {item.label} <span aria-hidden>↗</span>
                        </a>
                      ) : (
                        <span>{item}</span>
                      )}
                    </li>
                  );
                })}
              </ul>

              <div className="mt-auto pt-6">
                {cohort.archive && (
                  <p className="text-xs uppercase tracking-wider text-muted">
                    {cohort.archive}
                  </p>
                )}
                {cohort.current && (
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/portfolio"
                      className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90"
                    >
                      Portfolio →
                    </Link>
                    <Link
                      href="/team"
                      className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
                    >
                      Meet the cohort
                    </Link>
                  </div>
                )}
              </div>
            </article>
            </Tilt3D>
          ))}
        </div>
      </div>
    </>
  );
}
