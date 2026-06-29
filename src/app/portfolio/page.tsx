import type { Metadata } from "next";
import { PortfolioExplorer } from "@/components/PortfolioExplorer";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Research questions the current cohort is exploring across disaster response, cultural heritage, supply chains, and diplomacy.",
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
            Four questions.
            <br />
            <span className="display-em">One frontier.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
            The current cohort is exploring research questions across disaster
            response, cultural heritage, supply chains, and diplomacy. Open a
            question to see the projects exploring it, or filter by topic.
          </p>
        </div>
      </section>

      <div className="pt-12">
        <PortfolioExplorer />
      </div>
    </>
  );
}
