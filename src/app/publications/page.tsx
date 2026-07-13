import type { Metadata } from "next";
import { publications } from "@/content/site";
import { SectionTabs } from "@/components/SectionTabs";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "Academic reports from the Ethical Tech CoLab — one write-up per research question, across evacuation, cultural heritage, supply-chain traceability, and diplomacy.",
};

export default function PublicationsPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <span className="aura" />
        <div className="relative mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <p className="text-xs uppercase tracking-wider text-muted">
              {publications.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-4 fluid-hero font-heading uppercase leading-[0.9]">
              The research,{" "}
              <span className="display-em">written up</span>.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
              {publications.intro}
            </p>
          </Reveal>
        </div>
      </section>

      <SectionTabs />

      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-6 sm:grid-cols-2">
          {publications.items.map((pub) => (
            <Reveal key={pub.index}>
              <article className="card-glow flex h-full flex-col rounded-2xl border border-border bg-card p-7 transition-colors hover:border-border-strong">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-mono text-sm text-accent">
                    {pub.index} / {pub.area}
                  </p>
                  {pub.url ? (
                    <span className="shrink-0 rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent-ink">
                      ● Published
                    </span>
                  ) : (
                    <span className="shrink-0 rounded-full border border-border px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-muted">
                      {pub.status}
                    </span>
                  )}
                </div>

                <h2 className="mt-4 font-heading text-xl uppercase leading-snug tracking-wide sm:text-2xl">
                  {pub.title}
                </h2>
                <p className="mt-2 text-sm font-medium text-muted">
                  {pub.question}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {pub.summary}
                </p>

                <div className="mt-auto pt-6">
                  {pub.url ? (
                    <a
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-sweep inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-ink transition-transform hover:scale-[1.03]"
                    >
                      Read report <span aria-hidden>↗</span>
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-border px-5 py-2.5 text-sm text-muted">
                      Academic report — coming soon
                    </span>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
