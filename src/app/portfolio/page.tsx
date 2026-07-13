import type { Metadata } from "next";
import { PortfolioExplorer } from "@/components/PortfolioExplorer";
import { SectionTabs } from "@/components/SectionTabs";
import { archivedProjects, cohortTerms } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Research questions the current cohort is exploring across disaster response, cultural heritage, supply chains, and diplomacy.",
};

export default function PortfolioPage() {
  // Group archived projects by cohort term, newest year first.
  const projectsByTerm = archivedProjects.reduce<
    Record<string, typeof archivedProjects>
  >((acc, project) => {
    (acc[project.term] ??= []).push(project);
    return acc;
  }, {});
  const archiveTerms = Object.keys(projectsByTerm).sort(
    (a, b) => cohortTerms.indexOf(b) - cohortTerms.indexOf(a),
  );

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

      <SectionTabs />

      <div className="pt-12">
        <PortfolioExplorer />
      </div>

      {/* Archive — previous portfolios, separated by year */}
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
                Projects from earlier cohorts, grouped by the year they were
                worked on.
              </p>
            </Reveal>

            {archiveTerms.map((term) => (
              <div key={term} className="mt-14 first:mt-12">
                <div className="flex items-center gap-4">
                  <h3 className="font-heading text-xl uppercase tracking-wide text-accent">
                    {term}
                  </h3>
                  <span className="h-px flex-1 bg-border" />
                  <span className="font-mono text-xs text-muted">
                    {projectsByTerm[term].length}{" "}
                    {projectsByTerm[term].length === 1 ? "project" : "projects"}
                  </span>
                </div>

                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  {projectsByTerm[term].map((project) => (
                    <article
                      key={project.name}
                      className="flex flex-col rounded-2xl border border-border bg-background p-7"
                    >
                      <h4 className="font-heading text-xl uppercase tracking-wide sm:text-2xl">
                        {project.name}
                      </h4>
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
            ))}
          </div>
        </section>
      )}
    </>
  );
}
