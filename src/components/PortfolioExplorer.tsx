"use client";

import { useState } from "react";
import { Link } from "next-view-transitions";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { asset } from "@/lib/asset";
import {
  researchAreas,
  products,
  type Product,
  type SubProject,
} from "@/content/site";
import { ProjectDiagram } from "@/components/ProjectDiagram";
import {
  DemoRunner,
  runTarget,
  type RunnableDemo,
} from "@/components/DemoRunner";

/** A project finds its Live Demos product by repo URL, falling back to demo
 *  URL. Repo alone was too brittle: a portfolio entry that lists only a demo
 *  link (FLSRI) matched nothing, so it opened with no poster and no credits
 *  even though its product sat right there in the catalogue. */
const productByRepo = new Map(
  products.filter((p) => p.repo).map((p) => [p.repo as string, p]),
);
const productByDemo = new Map(
  products.filter((p) => p.demo).map((p) => [p.demo as string, p]),
);

function productFor(project: SubProject) {
  return (
    (project.repo && productByRepo.get(project.repo)) ||
    (project.demo && productByDemo.get(project.demo)) ||
    undefined
  );
}

/** A portfolio project, in the shape the runner understands. A project can
 *  carry its own demo URL, or inherit the richer entry (several named demos,
 *  poster art) from its matching Live Demos product. */
function toRunnable(project: SubProject, product?: Product): RunnableDemo {
  return {
    name: project.name,
    blurb: project.summary,
    demo: project.demo ?? product?.demo,
    demos: product?.demos,
    repo: project.repo ?? product?.repo,
    posterKey: product?.repoName,
    meta: [product?.theme, product?.term, product?.language].filter(
      (m): m is string => Boolean(m),
    ),
  };
}

const allTags = Array.from(new Set(researchAreas.flatMap((a) => a.tags)));
const hashtag = (tag: string) => `#${tag.replace(/\s+/g, "")}`;

function chipClass(active: boolean, small = false) {
  const size = small ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm";
  return `rounded-full border ${size} transition-colors ${
    active
      ? "border-accent bg-accent font-semibold text-background"
      : "border-border text-muted hover:border-accent hover:text-accent"
  }`;
}

export function PortfolioExplorer() {
  const reduce = useReducedMotion();
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [openDemo, setOpenDemo] = useState<RunnableDemo | null>(null);
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(researchAreas.map((a) => [a.key, false])),
  );

  const visible = activeTag
    ? researchAreas.filter((a) => a.tags.includes(activeTag))
    : researchAreas;

  const toggle = (key: string) =>
    setOpen((o) => ({ ...o, [key]: !o[key] }));

  const pickTag = (tag: string) =>
    setActiveTag((t) => (t === tag ? null : tag));

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24">
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border pb-8">
        <span className="mr-2 text-xs uppercase tracking-wider text-muted">
          Filter
        </span>
        <button
          type="button"
          onClick={() => setActiveTag(null)}
          className={chipClass(activeTag === null)}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => pickTag(tag)}
            className={chipClass(activeTag === tag)}
          >
            {hashtag(tag)}
          </button>
        ))}
      </div>

      {/* Research questions */}
      <motion.div layout className="divide-y divide-border">
        <AnimatePresence mode="popLayout">
        {visible.map((area) => {
          const isOpen = Boolean(open[area.key]);
          return (
            <motion.div
              key={area.key}
              layout={!reduce}
              initial={{ opacity: 0, scale: reduce ? 1 : 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: reduce ? 1 : 0.98 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="card-glow rounded-2xl py-8"
            >
              <div className="grid items-center gap-8 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
                <ProjectDiagram
                  variant={area.key}
                  className="diagram-live group aspect-[16/10] w-full overflow-hidden rounded-xl border border-border bg-surface/60"
                />
                <button
                  type="button"
                  onClick={() => toggle(area.key)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start justify-between gap-6 text-left"
                >
                  <div>
                    <p className="font-mono text-sm text-accent">
                      {area.index} / {area.key}
                    </p>
                    <h2 className="mt-3 font-heading text-3xl uppercase tracking-wide sm:text-4xl group-hover:text-accent">
                      {area.question}
                    </h2>
                    <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
                      {area.summary}
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className={`mt-1 shrink-0 text-3xl leading-none text-accent transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
              </div>

              {/* Hashtags (clickable filters) */}
              <div className="mt-5 flex flex-wrap gap-2">
                {area.tags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => pickTag(tag)}
                    className={chipClass(activeTag === tag, true)}
                  >
                    {hashtag(tag)}
                  </button>
                ))}
              </div>

              {/* Expanded: projects + stack */}
              {isOpen && (
                <div className="mt-8 grid gap-10 md:grid-cols-[1.4fr_0.6fr]">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted">
                      {area.projects.length}{" "}
                      {area.projects.length === 1 ? "project" : "projects"}
                    </p>
                    <ul className="mt-4 space-y-4">
                      {area.projects.map((project) => {
                        const product = productFor(project);
                        const runnable = toRunnable(project, product);
                        const hasDemo = Boolean(runTarget(runnable));
                        return (
                          <li key={project.name}>
                            {/* An article, not one big button: the card carries
                                a demo action AND a link to the write-up, and a
                                link nested inside a button is invalid. The
                                poster and title stay clickable for the demo. */}
                            <article className="group card-glow flex gap-5 rounded-xl border border-border p-5 transition-colors hover:border-border-strong sm:p-6">
                              {runnable.posterKey && (
                                <button
                                  type="button"
                                  onClick={() => setOpenDemo(runnable)}
                                  aria-label={`Open ${project.name}`}
                                  className="hidden w-[92px] shrink-0 overflow-hidden rounded-lg border border-border bg-cover bg-top transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:block"
                                  style={{
                                    aspectRatio: "2 / 3",
                                    backgroundImage: `url(${asset(
                                      `/repos/${runnable.posterKey}.jpg`,
                                    )})`,
                                    backgroundColor: "var(--poster-ground)",
                                  }}
                                />
                              )}

                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-3">
                                  <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                                    {project.name}
                                  </h3>
                                  {hasDemo ? (
                                    <span className="shrink-0 rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent-ink">
                                      ● Live
                                    </span>
                                  ) : (
                                    project.status && (
                                      <span
                                        className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                          project.status === "Active"
                                            ? "bg-accent text-accent-ink"
                                            : "border border-border text-muted"
                                        }`}
                                      >
                                        {project.status}
                                      </span>
                                    )
                                  )}
                                </div>

                                <p className="mt-3 text-base leading-relaxed text-muted">
                                  {project.summary}
                                </p>

                                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium">
                                  <button
                                    type="button"
                                    onClick={() => setOpenDemo(runnable)}
                                    className="inline-flex items-center gap-1 text-muted transition-colors hover:text-accent"
                                  >
                                    {hasDemo
                                      ? "Open live demo"
                                      : "Project details"}{" "}
                                    <span aria-hidden>→</span>
                                  </button>

                                  {project.publication && (
                                    <Link
                                      href={project.publication}
                                      className="inline-flex items-center gap-1 text-muted transition-colors hover:text-accent"
                                    >
                                      Read the report{" "}
                                      <span aria-hidden>→</span>
                                    </Link>
                                  )}

                                  {runnable.repo && (
                                    <a
                                      href={runnable.repo}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 text-muted transition-colors hover:text-accent"
                                    >
                                      View code{" "}
                                      <span aria-hidden>↗</span>
                                    </a>
                                  )}
                                </div>
                              </div>
                            </article>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted">
                      Stack
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-foreground/80">
                      {area.stack.map((tech) => (
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
              )}
            </motion.div>
          );
        })}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 && (
        <p className="py-16 text-muted">
          No research questions match that filter.
        </p>
      )}

      {openDemo && (
        <DemoRunner
          key={openDemo.name}
          demo={openDemo}
          onClose={() => setOpenDemo(null)}
        />
      )}
    </div>
  );
}
