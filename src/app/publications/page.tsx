import type { Metadata } from "next";
import { publications } from "@/content/site";
import { SectionTabs } from "@/components/SectionTabs";
import { Reveal } from "@/components/motion/Reveal";
import { PublicationsShowcase } from "@/components/PublicationsShowcase";

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

      <div className="pt-12">
        <PublicationsShowcase />
      </div>
    </>
  );
}
