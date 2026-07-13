import type { Metadata } from "next";
import { Link } from "next-view-transitions";
import { PortfolioExplorer } from "@/components/PortfolioExplorer";
import { archivedProjects } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Research questions the current cohort is exploring across disaster response, cultural heritage, supply chains, and diplomacy.",
};

export default function PortfolioPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <span className="aura" />
        <div className="relative mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <p className="text-xs uppercase tracking-wider text-muted">
              Portfolio · Current cohort
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-4 fluid-hero font-heading uppercase leading-[0.9]">
              Four questions. <span className="display-em">One frontier.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
              The current cohort is exploring research questions across disaster
              response, cultural heritage, supply chains, and diplomacy. Open a
              question to see the projects exploring it, or filter by topic.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="pt-12">
        <PortfolioExplorer />
      </div>

      {/* Shortcuts: Live Demos + Publications */}
      <section id="products" className="scroll-mt-24 border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-16 sm:grid-cols-2">
          <Reveal>
            <Link
              href="/demos"
              className="group card-glow flex h-full flex-col justify-between gap-6 rounded-2xl border border-border bg-card p-8 transition-colors hover:border-border-strong"
            >
              <div>
                <p className="text-xs uppercase tracking-wider text-muted">
                  Live demos · Open source
                </p>
                <h2 className="mt-3 fluid-h2 font-heading uppercase">
                  Run the <span className="display-em">research</span>.
                </h2>
                <p className="mt-3 max-w-xl leading-relaxed text-muted">
                  Every project ships as an open repository — most run live in
                  your browser. Press play on any demo, or read the source.
                </p>
              </div>
              <span className="btn-sweep inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-ink transition-transform group-hover:scale-[1.03]">
                See live demos <span aria-hidden>→</span>
              </span>
            </Link>
          </Reveal>

          <Reveal delay={0.05}>
            <Link
              href="/publications"
              className="group card-glow flex h-full flex-col justify-between gap-6 rounded-2xl border border-border bg-card p-8 transition-colors hover:border-border-strong"
            >
              <div>
                <p className="text-xs uppercase tracking-wider text-muted">
                  Publications · Writing
                </p>
                <h2 className="mt-3 fluid-h2 font-heading uppercase">
                  Read the <span className="display-em">findings</span>.
                </h2>
                <p className="mt-3 max-w-xl leading-relaxed text-muted">
                  Papers, reports, and essays where the cohort shares its
                  methods, results, and lessons for others to build on.
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors group-hover:border-accent group-hover:text-accent">
                See publications <span aria-hidden>→</span>
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Archive — previous portfolios */}
      {archivedProjects.length > 0 && (
        <section className="border-t border-border bg-surface/40">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <Reveal>
              <p className="text-xs uppercase tracking-wider text-muted">
                Archive
              </p>
              <h2 className="mt-3 fluid-h2 font-heading uppercase">
                Previous portfolios.
              </h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-muted">
                Projects from earlier cohorts that shaped the lab&apos;s direction.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {archivedProjects.map((project) => (
                <article
                  key={project.name}
                  className="flex flex-col rounded-2xl border border-border bg-background p-7"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs uppercase tracking-wider text-muted">
                      {project.term}
                    </span>
                    <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted">
                      Archived
                    </span>
                  </div>
                  <h3 className="mt-4 font-heading text-xl uppercase tracking-wide sm:text-2xl">
                    {project.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {project.summary}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted"
                      >
                        #{tag.replace(/\s+/g, "")}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
