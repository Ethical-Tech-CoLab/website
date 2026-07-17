import type { Metadata } from "next";
import { Link } from "next-view-transitions";
import { researchReport } from "@/content/publications/ai-research-assistant";
import { SectionTabs } from "@/components/SectionTabs";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "AI-Powered Research Questions",
  description:
    "An Ethical Tech CoLab report on how AI supports researchers in formulating research questions — finding gaps, generating candidate questions, summarizing the state of the art, and flagging contradictions — with guardrails and a reusable Copilot 'Researcher' prompt.",
};

export default function ResearchAssistantPage() {
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
              ← {researchReport.eyebrow}
            </Link>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 fluid-hero font-heading uppercase leading-[0.9]">
              {researchReport.heroLead}{" "}
              <span className="display-em">{researchReport.heroEm}</span>{" "}
              {researchReport.heroTail}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-2xl font-heading text-2xl uppercase tracking-wide text-muted sm:text-3xl">
              {researchReport.subtitle}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-accent">
              <span className="font-semibold">{researchReport.org}</span>
              <span aria-hidden className="text-muted">·</span>
              <span>{researchReport.date}</span>
              <span aria-hidden className="text-muted">·</span>
              <a
                href={researchReport.publishedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline"
              >
                Published version ↗
              </a>
            </div>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
              {researchReport.authors}
            </p>
          </Reveal>
        </div>
      </section>

      <SectionTabs />

      {/* Key figures */}
      <section className="border-b border-border bg-surface/40">
        <div className="mx-auto grid max-w-6xl gap-px overflow-hidden border-x border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {researchReport.stats.map((stat) => (
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
        {/* Abstract / thesis */}
        <Reveal>
          <p className="border-l-2 border-accent pl-6 text-lg leading-relaxed text-foreground/90">
            {researchReport.thesis}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-4 pl-6 text-sm italic leading-relaxed text-muted">
            {researchReport.acknowledgement}
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
              {researchReport.sections.map((section) => (
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
              <li>
                <a
                  href="#capabilities"
                  className="link-underline inline-flex gap-2 text-sm text-foreground/85"
                >
                  <span className="font-mono text-accent">＋</span>
                  Capabilities at a Glance
                </a>
              </li>
              <li>
                <a
                  href="#researcher-agent"
                  className="link-underline inline-flex gap-2 text-sm text-foreground/85"
                >
                  <span className="font-mono text-accent">＋</span>
                  The Researcher Agent
                </a>
              </li>
            </ol>
          </nav>
        </Reveal>

        {/* Body */}
        {researchReport.sections.map((section) => (
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
              {section.blocks.map((block, i) => {
                if (typeof block === "string") {
                  return <p key={i}>{block}</p>;
                }
                if ("list" in block) {
                  return (
                    <ul key={i} className="space-y-2 pl-1">
                      {block.list.map((item, j) => (
                        <li key={j} className="flex gap-3">
                          <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={i} className="border-l-2 border-border pl-5">
                    <span className="font-semibold text-accent">
                      {block.lead}.
                    </span>{" "}
                    {block.text}
                  </p>
                );
              })}
            </div>
          </section>
        ))}

        {/* Comparison table */}
        <section id="capabilities" className="mt-16 scroll-mt-24">
          <Reveal>
            <p className="font-mono text-sm text-accent">Summary</p>
            <h2 className="mt-2 fluid-h2 font-heading uppercase">
              {researchReport.comparison.heading}
            </h2>
            <p className="mt-4 leading-relaxed text-foreground/85">
              {researchReport.comparison.intro}
            </p>
          </Reveal>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border-strong">
                  <th className="py-3 pr-4 font-heading text-xs uppercase tracking-wider text-muted">
                    AI application
                  </th>
                  <th className="py-3 pr-4 font-heading text-xs uppercase tracking-wider text-muted">
                    Example tools
                  </th>
                  <th className="py-3 font-heading text-xs uppercase tracking-wider text-muted">
                    Capabilities & approach
                  </th>
                </tr>
              </thead>
              <tbody>
                {researchReport.comparison.rows.map((row) => (
                  <tr
                    key={row.application}
                    className="border-b border-border align-top"
                  >
                    <td className="py-4 pr-4 font-semibold text-foreground/90">
                      {row.application}
                    </td>
                    <td className="py-4 pr-4 text-muted">
                      <ul className="space-y-1">
                        {row.tools.map((tool) => (
                          <li key={tool} className="font-mono text-xs">
                            {tool}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="py-4 leading-relaxed text-foreground/85">
                      {row.approach}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Appendix: the Researcher agent */}
        <section id="researcher-agent" className="mt-16 scroll-mt-24">
          <Reveal>
            <p className="font-mono text-sm text-accent">Appendix</p>
            <h2 className="mt-2 fluid-h2 font-heading uppercase">
              The Researcher Agent
            </h2>
          </Reveal>

          {/* Red-team layer */}
          <Reveal>
            <h3 className="mt-10 font-heading text-xl uppercase tracking-wide">
              {researchReport.redTeam.heading}
            </h3>
          </Reveal>
          <p className="mt-4 leading-relaxed text-foreground/85">
            {researchReport.redTeam.intro}
          </p>
          <ul className="mt-4 space-y-2 pl-1">
            {researchReport.redTeam.checklist.map((item, i) => (
              <li key={i} className="flex gap-3 text-foreground/85">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 leading-relaxed text-foreground/85">
            {researchReport.redTeam.closing}
          </p>

          {/* Reusable prompt */}
          <Reveal>
            <h3 className="mt-12 font-heading text-xl uppercase tracking-wide">
              {researchReport.prompt.heading}
            </h3>
          </Reveal>
          <div className="mt-4 space-y-4 leading-relaxed text-foreground/85">
            {researchReport.prompt.intro.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <pre className="mt-6 overflow-x-auto rounded-2xl border border-border bg-card p-6 font-mono text-xs leading-relaxed text-foreground/85">
            {researchReport.prompt.body}
          </pre>

          {/* Rubric */}
          <Reveal>
            <h3 className="mt-12 font-heading text-xl uppercase tracking-wide">
              {researchReport.rubric.heading}
            </h3>
          </Reveal>
          <p className="mt-4 leading-relaxed text-foreground/85">
            {researchReport.rubric.intro}
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border-strong">
                  <th className="py-3 pr-4 font-heading text-xs uppercase tracking-wider text-muted">
                    Score
                  </th>
                  <th className="py-3 pr-4 font-heading text-xs uppercase tracking-wider text-muted">
                    Criteria
                  </th>
                  <th className="py-3 font-heading text-xs uppercase tracking-wider text-muted">
                    Examples
                  </th>
                </tr>
              </thead>
              <tbody>
                {researchReport.rubric.rows.map((row) => (
                  <tr key={row.score} className="border-b border-border align-top">
                    <td className="whitespace-nowrap py-4 pr-4 font-heading text-lg text-accent">
                      {row.score}
                    </td>
                    <td className="py-4 pr-4 leading-relaxed text-foreground/85">
                      {row.criteria}
                    </td>
                    <td className="py-4 leading-relaxed text-muted">
                      {row.examples}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* References */}
        <section id="references" className="mt-16 scroll-mt-24">
          <Reveal>
            <p className="font-mono text-sm text-accent">References</p>
            <h2 className="mt-2 fluid-h2 font-heading uppercase">
              Sources & Tools
            </h2>
          </Reveal>
          <ol className="mt-8 space-y-4 text-sm leading-relaxed text-muted">
            {researchReport.citations.map((cite, i) => (
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
