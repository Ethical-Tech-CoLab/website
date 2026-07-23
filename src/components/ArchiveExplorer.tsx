"use client";

import { useState } from "react";
import { Link } from "next-view-transitions";
import { archivedProjects, cohortTerms } from "@/content/site";

/**
 * Previous-cohort portfolio, grouped by year. Each project with a live demo (or
 * repo) gets a "+" that expands to reveal its links — the same expand-to-open
 * pattern the current cohort's research questions use.
 */
export function ArchiveExplorer() {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const toggle = (name: string) =>
    setOpen((o) => ({ ...o, [name]: !o[name] }));

  // Group by term, newest year first.
  const byTerm = archivedProjects.reduce<Record<string, typeof archivedProjects>>(
    (acc, project) => {
      (acc[project.term] ??= []).push(project);
      return acc;
    },
    {},
  );
  const terms = Object.keys(byTerm).sort(
    (a, b) => cohortTerms.indexOf(b) - cohortTerms.indexOf(a),
  );

  return (
    <>
      {terms.map((term) => (
        <div key={term} className="mt-14 first:mt-12">
          <div className="flex items-center gap-4">
            <h3 className="font-heading text-xl uppercase tracking-wide text-accent">
              {term}
            </h3>
            <span className="h-px flex-1 bg-border" />
            <span className="font-mono text-xs text-muted">
              {byTerm[term].length}{" "}
              {byTerm[term].length === 1 ? "project" : "projects"}
            </span>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {byTerm[term].map((project) => {
              const hasLinks =
                Boolean(project.demo) ||
                Boolean(project.demos?.length) ||
                Boolean(project.repo) ||
                Boolean(project.publication);
              const isOpen = Boolean(open[project.name]);
              return (
                <article
                  key={project.name}
                  className="flex flex-col rounded-2xl border border-border bg-background p-7"
                >
                  {hasLinks ? (
                    <button
                      type="button"
                      onClick={() => toggle(project.name)}
                      aria-expanded={isOpen}
                      className="group flex w-full items-start justify-between gap-3 text-left"
                    >
                      <h4 className="font-heading text-xl uppercase tracking-wide sm:text-2xl group-hover:text-accent">
                        {project.name}
                      </h4>
                      <span
                        aria-hidden
                        className={`mt-1 shrink-0 text-2xl leading-none text-accent transition-transform ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      >
                        +
                      </span>
                    </button>
                  ) : (
                    <h4 className="font-heading text-xl uppercase tracking-wide sm:text-2xl">
                      {project.name}
                    </h4>
                  )}

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

                  {hasLinks && isOpen && (
                    <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-5">
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-sweep inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-ink transition-transform hover:scale-[1.03]"
                        >
                          ▶ Launch live demo
                        </a>
                      )}
                      {project.demos?.map((d) => (
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
                      {project.publication && (
                        <Link
                          href={project.publication}
                          className="inline-flex items-center gap-1 text-sm font-medium text-accent transition-opacity hover:opacity-80"
                        >
                          Read the report <span aria-hidden>→</span>
                        </Link>
                      )}
                      {project.repo && (
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-medium text-accent transition-opacity hover:opacity-80"
                        >
                          View code <span aria-hidden>↗</span>
                        </a>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}
