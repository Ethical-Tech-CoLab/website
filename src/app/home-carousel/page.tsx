import Image from "next/image";
import { Link } from "next-view-transitions";
import type { Metadata } from "next";
import {
  cohorts,
  products,
  publications,
  researchAreas,
  team,
} from "@/content/site";
import { asset } from "@/lib/asset";
import { HeroField } from "@/components/HeroField";
import { HomeBody } from "@/components/HomeBody";
import { StatementCarousel, type Statement } from "@/components/StatementCarousel";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";

export const metadata: Metadata = {
  title: "Home (carousel layout) · Ethical Tech CoLab",
  description:
    "An alternative home page whose hero rotates through the CoLab's work as single statements.",
  // A layout under review, not a page anyone should land on from a search
  // result. Drop this when (or if) it replaces the real home page.
  robots: { index: false, follow: false },
};

/**
 * Every figure here is counted from `src/content/site.ts` at build time rather
 * than typed in. The home page has already shipped a wrong number once — the
 * portfolio link read "all five" while there were four research areas — and a
 * hero that leads with figures is the worst place for that to happen again.
 */
const fieldedProjects = researchAreas.reduce(
  (total, area) => total + area.projects.length,
  0,
);
const currentCohort = cohorts.find((c) => c.current);

const statements: Statement[] = [
  {
    value: String(researchAreas.length),
    unit: "research questions",
    line: "Each one taken from a question the record skipped through to a fielded prototype, in the open.",
    href: "/portfolio",
  },
  {
    value: String(fieldedProjects),
    unit: "projects in the portfolio",
    line: "Sitting under those questions — evacuation, cultural heritage, traceability, diplomacy.",
    href: "/portfolio",
  },
  {
    value: String(products.length),
    unit: "demos you can open",
    line: "Not screenshots: the prototypes themselves, running in the browser with their source alongside.",
    href: "/demos",
  },
  {
    value: String(publications.items.length),
    unit: "reports written up",
    line: "Every research question the CoLab takes on is written up academically, including what did not hold.",
    href: "/publications",
  },
  {
    value: String(team.researchers.length),
    unit: `researchers across ${cohorts.length} cohorts`,
    line: "Graduate researchers at NYU's Center for Global Affairs, with advisors and resident fellows alongside.",
    href: "/team",
  },
  ...(currentCohort
    ? [
        {
          value: currentCohort.term,
          unit: "the current cohort",
          line: currentCohort.body,
          href: "/publications/after-the-corridor",
        },
      ]
    : []),
];

export default function HomeCarousel() {
  return (
    <>
      {/* Hero — the statement carousel carries the copy the standard hero
          spends on a paragraph, one figure at a time. */}
      <section className="relative overflow-hidden border-b border-border">
        <Image
          src={asset("/nyu-subway.jpg")}
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
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 60% at 20% 0%, color-mix(in oklab, var(--glow) 26%, transparent), transparent 65%)",
          }}
        />
        <HeroField />

        <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-28">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.25em] text-accent">
              NYU CGA × Microsoft
            </p>
            <h1 className="mt-5 max-w-4xl fluid-hero font-heading uppercase leading-[0.95]">
              Emerging tech, <span className="display-em">human condition</span>.
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <StatementCarousel
              statements={statements}
              label="Statement"
              className="mt-12"
            />
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-12 flex flex-wrap items-center gap-4">
              <Magnetic>
                <Link
                  href="/portfolio"
                  className="btn-sweep inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-ink transition-transform hover:scale-[1.02]"
                >
                  Explore the portfolio <span aria-hidden>→</span>
                </Link>
              </Magnetic>
              <Link
                href="/demos"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                See live demos
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* This route exists to be compared against `/`, so it says so and
          offers the way back rather than leaving a visitor stranded on a
          layout that is not in the navigation. */}
      <div className="border-b border-border bg-surface/60">
        <p className="mx-auto max-w-6xl px-6 py-3 text-xs text-muted">
          Alternative home page layout under review.{" "}
          <Link href="/" className="link-underline text-accent">
            See the current home page →
          </Link>
        </p>
      </div>

      <HomeBody />
    </>
  );
}
