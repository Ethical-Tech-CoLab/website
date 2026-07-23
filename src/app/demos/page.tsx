import type { Metadata } from "next";
import { RepoShowcase } from "@/components/RepoShowcase";
import { SectionTabs } from "@/components/SectionTabs";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Live Demos",
  description:
    "Live, in-browser demos and open-source repositories from the Ethical Tech CoLab — evacuation risk platforms, provenance passports, and decision-support tools you can run right now.",
};

export default function DemosPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <span className="aura" />
        <div className="relative mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <p className="text-xs uppercase tracking-wider text-muted">
              Live demos · Open source
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-4 fluid-hero font-heading uppercase leading-[0.9]">
              Run the <span className="display-em">research</span>.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
              Every project ships as an open repository — and most run live in
              your browser. Browse the catalog by theme, pick a title to read
              what it does, then press play and run it here. This is applied
              research you can actually use.
            </p>
          </Reveal>
        </div>
      </section>

      <SectionTabs />

      <div className="pt-12">
        <RepoShowcase />
      </div>
    </>
  );
}
