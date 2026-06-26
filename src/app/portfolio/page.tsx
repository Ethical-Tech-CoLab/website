import type { Metadata } from "next";
import { projects } from "@/content/site";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Four projects across disaster response, cultural heritage, supply chains, and diplomacy.",
};

export default function PortfolioPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="text-xs uppercase tracking-wider text-muted">
            Portfolio · Current cohort
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-6xl">
            Four projects.
            <br />
            <span className="display-em">One frontier.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
            The current cohort is building across disaster response, cultural
            heritage, supply chains, and diplomacy — each project pairing applied
            AI research with deployable interventions.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        {projects.map((project) => (
          <section
            key={project.key}
            className="grid gap-10 border-b border-border py-20 md:grid-cols-[0.8fr_1.2fr]"
          >
            <div>
              <p className="font-mono text-sm text-accent">
                Project {project.index}
              </p>
              <p className="mt-3 text-sm uppercase tracking-wider text-muted">
                {project.key}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-3 py-1 text-xs text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-semibold tracking-tight">
                {project.title}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-foreground/90">
                {project.summary}
              </p>
              <p className="mt-4 leading-relaxed text-muted">{project.detail}</p>

              <div className="mt-8">
                <p className="text-xs uppercase tracking-wider text-muted">
                  Stack
                </p>
                <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground/80">
                  {project.stack.map((tech) => (
                    <li key={tech} className="flex items-center gap-2">
                      <span aria-hidden className="text-accent">
                        ◦
                      </span>
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
