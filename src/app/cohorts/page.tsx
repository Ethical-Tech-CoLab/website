import type { Metadata } from "next";
import Link from "next/link";
import { cohorts } from "@/content/site";

export const metadata: Metadata = {
  title: "Cohorts",
  description:
    "Each cohort of the Ethical Tech CoLab takes on applied research and proof-of-concept projects on migration, forced labor, IDPs and refugees.",
};

export default function CohortsPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="text-xs uppercase tracking-wider text-muted">
            Projects · 2025 — 2026
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-6xl">
            Projects.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
            Each cohort of the Ethical Tech CoLab takes on applied research and
            proof-of-concept projects on migration, forced labor, IDPs and
            refugees — combining desk research, interviews, and technical
            interventions.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-8">
        <ol className="relative border-l border-border">
          {cohorts.map((cohort) => (
            <li key={cohort.index} className="ml-6 py-10">
              <span
                aria-hidden
                className={`absolute -left-[7px] mt-2 h-3.5 w-3.5 rounded-full border-2 ${
                  cohort.current
                    ? "border-accent bg-accent"
                    : "border-border bg-background"
                }`}
              />
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-sm text-muted">
                  {cohort.index}
                </span>
                <span className="text-lg font-semibold tracking-tight">
                  {cohort.term}
                </span>
                {cohort.current && (
                  <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-background">
                    Current
                  </span>
                )}
              </div>

              <h2 className="mt-4 text-2xl font-semibold tracking-tight">
                {cohort.title}
              </h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted">
                {cohort.body}
              </p>

              <ul className="mt-5 space-y-2 text-sm text-foreground/85">
                {cohort.items.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span aria-hidden className="text-accent">
                      —
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              {cohort.archive && (
                <p className="mt-5 text-xs uppercase tracking-wider text-muted">
                  {cohort.archive}
                </p>
              )}

              {cohort.current && (
                <div className="mt-6 flex flex-wrap gap-4">
                  <Link
                    href="/portfolio"
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
                  >
                    See the portfolio →
                  </Link>
                  <Link
                    href="/team"
                    className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
                  >
                    Meet the cohort
                  </Link>
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
