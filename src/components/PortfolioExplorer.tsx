"use client";

import { useState } from "react";
import { researchAreas } from "@/content/site";

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
  const [activeTag, setActiveTag] = useState<string | null>(null);
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
      <div className="divide-y divide-border">
        {visible.map((area) => {
          const isOpen = Boolean(open[area.key]);
          return (
            <div key={area.key} className="py-8">
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
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                    {area.question}
                  </h2>
                  <p className="mt-3 max-w-2xl leading-relaxed text-muted">
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
                      {area.projects.map((project) => (
                        <li
                          key={project.name}
                          className="rounded-xl border border-border p-5"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <h3 className="font-semibold tracking-tight">
                              {project.name}
                            </h3>
                            {project.status && (
                              <span
                                className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                  project.status === "Active"
                                    ? "bg-accent text-background"
                                    : "border border-border text-muted"
                                }`}
                              >
                                {project.status}
                              </span>
                            )}
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-muted">
                            {project.summary}
                          </p>
                          {project.repo && (
                            <a
                              href={project.repo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent transition-opacity hover:opacity-80"
                            >
                              View code <span aria-hidden>↗</span>
                            </a>
                          )}
                        </li>
                      ))}
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
            </div>
          );
        })}
      </div>

      {visible.length === 0 && (
        <p className="py-16 text-muted">
          No research questions match that filter.
        </p>
      )}
    </div>
  );
}
