import type { Metadata } from "next";
import { Link } from "next-view-transitions";
import { ceraiReport } from "@/content/publications/cerai";
import { SectionTabs } from "@/components/SectionTabs";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "The Civilian Evacuation Risk Anticipation Index",
  description:
    "An Ethical Tech CoLab report on CERAI, a research prototype that scores civilian endangerment separately from evacuation feasibility so that operational difficulty never obscures the legal obligation to protect civilians.",
};

export default function CeraiPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <span className="aura" />
        <div className="relative mx-auto max-w-4xl px-6 py-20 sm:py-24">
          <Reveal>
            <Link
              href="/publications"
              className="link-underline text-xs uppercase tracking-wider text-muted"
            >
              ← {ceraiReport.eyebrow}
            </Link>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 fluid-hero font-heading uppercase leading-[0.9]">
              The Civilian Evacuation{" "}
              <span className="display-em">Risk Anticipation</span> Index
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-2xl font-heading text-2xl uppercase tracking-wide text-muted sm:text-3xl">
              {ceraiReport.subtitle}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-accent">
              <span className="font-semibold">{ceraiReport.org}</span>
              <span aria-hidden className="text-muted">
                ·
              </span>
              <span>{ceraiReport.advisor}</span>
              {ceraiReport.date && (
                <>
                  <span aria-hidden className="text-muted">
                    ·
                  </span>
                  <span>{ceraiReport.date}</span>
                </>
              )}
            </div>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
              {ceraiReport.authors}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={ceraiReport.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-sweep inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-ink transition-transform hover:scale-[1.03]"
              >
                Open the live prototype <span aria-hidden>↗</span>
              </a>
              <a
                href={ceraiReport.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-sweep inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-border-strong"
              >
                Source and paper <span aria-hidden>↗</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <SectionTabs />

      {/* Key figures */}
      <section className="border-b border-border bg-surface/40">
        <div className="mx-auto grid max-w-6xl gap-px overflow-hidden border-x border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {ceraiReport.stats.map((stat) => (
            <div key={stat.value} className="bg-background p-7">
              <p className="font-heading text-4xl uppercase leading-none text-accent sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
        {/* Thesis / abstract */}
        <Reveal>
          <p className="border-l-2 border-accent pl-6 text-lg leading-relaxed text-foreground/90">
            {ceraiReport.thesis}
          </p>
        </Reveal>

        {/* Contents */}
        <Reveal delay={0.05}>
          <nav
            aria-label="Contents"
            className="mt-12 rounded-2xl border border-border bg-card p-6"
          >
            <p className="text-xs uppercase tracking-wider text-muted">
              Contents
            </p>
            <ol className="mt-4 grid gap-2 sm:grid-cols-2">
              {ceraiReport.sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="link-underline inline-flex gap-2 text-sm text-foreground/85"
                  >
                    <span className="font-mono text-accent">
                      {section.number}
                    </span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </Reveal>

        {/* Body */}
        {ceraiReport.sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="mt-16 scroll-mt-24"
          >
            <Reveal>
              <p className="font-mono text-sm text-accent">{section.number}</p>
              <h2 className="mt-2 fluid-h2 font-heading uppercase">
                {section.title}
              </h2>
            </Reveal>
            <div className="mt-6 space-y-5 leading-relaxed text-foreground/85">
              {section.paragraphs.map((para, i) =>
                typeof para === "string" ? (
                  <p key={i}>{para}</p>
                ) : (
                  <p key={i}>
                    <span className="font-semibold text-accent">
                      {para.lead}
                    </span>{" "}
                    {para.text}
                  </p>
                ),
              )}
            </div>
          </section>
        ))}

        {/* References */}
        <section id="references" className="mt-16 scroll-mt-24">
          <Reveal>
            <p className="font-mono text-sm text-accent">References</p>
            <h2 className="mt-2 fluid-h2 font-heading uppercase">Sources</h2>
          </Reveal>
          <ol className="mt-8 space-y-4 text-sm leading-relaxed text-muted">
            {ceraiReport.citations.map((cite, i) => (
              <li key={i} className="flex gap-3">
                <span className="shrink-0 font-mono text-xs text-accent/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  {cite.url ? (
                    <a
                      href={cite.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline break-words text-foreground/80"
                    >
                      {cite.ref}
                    </a>
                  ) : (
                    <span className="text-foreground/80">{cite.ref}</span>
                  )}
                </span>
              </li>
            ))}
          </ol>
        </section>

        {/* Standing disclaimer, carried over from the source paper. */}
        <section className="mt-16 rounded-2xl border border-border bg-card p-6">
          <p className="text-sm leading-relaxed text-muted">
            This report is a plain-language summary of a research prototype. The
            prototype is for academic demonstration only, its weights are
            provisional, and it is not authorised for operational use without
            expert validation. Its outputs are indicative and are not a
            substitute for operational decision-making, legal advice, or
            assessment by qualified humanitarian and IHL professionals.
          </p>
        </section>

        {/* Back link */}
        <div className="mt-16 border-t border-border pt-10">
          <Link
            href="/publications"
            className="btn-sweep inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-border-strong"
          >
            <span aria-hidden>←</span> All publications
          </Link>
        </div>
      </div>
    </>
  );
}
