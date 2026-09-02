import type { Metadata } from "next";
import Image from "next/image";
import { PortfolioExplorer } from "@/components/PortfolioExplorer";
import { RepoShowcase } from "@/components/RepoShowcase";
import { SectionTabs } from "@/components/SectionTabs";
import { ArchiveExplorer } from "@/components/ArchiveExplorer";
import { archivedProjects, researchAreas } from "@/content/site";
import { asset } from "@/lib/asset";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Live, in-browser demos and open-source repositories from the Ethical Tech CoLab, and the research questions behind them — disaster response, cultural heritage, supply chains, and diplomacy.",
};

const WORDS = ["Zero","One","Two","Three","Four","Five","Six","Seven","Eight","Nine"];
const questionCount = WORDS[researchAreas.length] ?? researchAreas.length;

export default function PortfolioPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        {/* Background: NYU (W4) photo behind the hero */}
        <Image
          src={asset("/nyu-w4.jpg")}
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="pointer-events-none object-cover object-center opacity-25"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-background/70"
        />
        <span className="aura" />
        <div className="relative mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <p className="text-xs uppercase tracking-wider text-muted">
              Portfolio · Live demos · Open source
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            {/* Counted from the data, not written in: the heading said "Four"
                through a stretch when there were five areas. */}
            <h1 className="mt-4 fluid-hero font-heading uppercase leading-[0.9]">
              Run the <span className="display-em">research</span>.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
              Every project ships as an open repository — and most run live in
              your browser. Each subject below opens with the research question
              it answers: pick a title to read what it does, then press play and
              run it here. The {questionCount.toLowerCase()} research questions
              driving the current cohort follow underneath.
            </p>
          </Reveal>
        </div>
      </section>

      <SectionTabs />

      <div className="pt-12">
        <RepoShowcase />
      </div>

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 pt-20">
          <Reveal>
            <p className="text-xs uppercase tracking-wider text-muted">
              Current cohort
            </p>
            <h2 className="mt-3 fluid-h2 font-heading uppercase">
              {questionCount} questions. <span className="display-em">One frontier.</span>
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted">
              The research questions behind the catalogue above, across disaster
              response, cultural heritage, supply chains, and diplomacy. Open a
              question to see the projects exploring it, or filter by topic.
            </p>
          </Reveal>
        </div>
        <div className="pt-10">
          <PortfolioExplorer />
        </div>
      </section>

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
                worked on, with their live demos, code, and reports alongside.
              </p>
            </Reveal>

            <ArchiveExplorer />
          </div>
        </section>
      )}
    </>
  );
}
