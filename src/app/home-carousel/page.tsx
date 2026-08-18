import Image from "next/image";
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
import { HomeViewToggle } from "@/components/HomeViewToggle";
import { StatementCarousel, type Statement } from "@/components/StatementCarousel";
import { Reveal } from "@/components/motion/Reveal";

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

/**
 * /portfolio spells its count out in its own heading ("Four questions."), so
 * the slide that links there has to spell it the same way — a slide that says
 * "4 questions" while the page it opens says "Four" reads as a different page.
 */
const WORDS = ["Zero","One","Two","Three","Four","Five","Six","Seven","Eight","Nine"];
const questionCount = WORDS[researchAreas.length] ?? researchAreas.length;

/**
 * One card per destination, each led by that destination's own `<h1>` — same
 * words, same accent half — so the carousel reads as doors into the site
 * rather than as statistics. The figure a card carries is the one its heading
 * does NOT already state, which is why the portfolio card counts projects (its
 * heading counts the questions) and the publications card says "in the
 * catalogue" rather than repeating "written up".
 *
 * The first card stands for the home page itself — the standard layout's own
 * wordmark and mission line. It carries no button: this IS the home page, so
 * there is nowhere to send a reader who is already here.
 */
const statements: Statement[] = [
  {
    lead: "Ethical Tech CoLab",
    // The wordmark carries this card the way it carries `/`, so it runs a step
    // larger than the sentence-shaped headings on the other cards.
    headingClass: "text-[clamp(4.25rem,13vw,11rem)] leading-[0.88]",
    // Both lines are the home page's own markup, not a paraphrase of it: the
    // serif mission line with "human condition" in the accent, and the intro
    // with its live link out to the Center for Global Affairs. Passed as nodes
    // so the card renders them exactly as `/` does rather than flattening them
    // to the caps-and-muted styling the counting cards use.
    figure: (
      <p
        className="font-serif uppercase leading-[0.95] tracking-tight text-foreground"
        style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
      >
        Exploring technology to improve
        <br className="hidden sm:block" /> the{" "}
        <span className="display-em">human condition</span>.
      </p>
    ),
    line: (
      <p className="mx-auto mt-7 max-w-2xl leading-relaxed text-foreground/85">
        A research collaboration between NYU&apos;s{" "}
        <a
          href="https://www.sps.nyu.edu/about/academic-divisions-and-departments/center-for-global-affairs.html"
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline text-accent hover:opacity-80"
        >
          Center for Global Affairs
        </a>{" "}
        and Microsoft — changing the conversation on how people are informed,
        and how emerging technology can be used for good.
      </p>
    ),
  },
  {
    lead: `${questionCount} questions. `,
    em: "One frontier.",
    figure: `${fieldedProjects} projects in the portfolio`,
    line: "Evacuation, cultural heritage, traceability, diplomacy — each question carried through to a fielded prototype, in the open.",
    cta: "Explore the portfolio",
    href: "/portfolio",
  },
  {
    lead: "Run the ",
    em: "research",
    tail: ".",
    figure: `${products.length} demos you can open`,
    line: "Not screenshots: the prototypes themselves, running in the browser with their source alongside.",
    cta: "Open the live demos",
    href: "/demos",
  },
  {
    lead: "The research, ",
    em: "written up",
    tail: ".",
    figure: `${publications.items.length} in the catalogue`,
    line: "Every research question the CoLab takes on is written up academically, including what did not hold.",
    cta: "Read the publications",
    href: "/publications",
  },
  {
    lead: "The people ",
    em: "building",
    tail: " this.",
    figure: `${team.researchers.length} researchers across ${cohorts.length} cohorts`,
    line: "Graduate researchers at NYU's Center for Global Affairs, with advisors and resident fellows alongside.",
    cta: "Meet the team",
    href: "/team",
  },
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

        <div className="relative mx-auto max-w-6xl px-6 py-24 text-center sm:py-28">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.25em] text-accent">
              NYU CGA × Microsoft
            </p>
          </Reveal>

          {/* The carousel supplies the page's `<h1>`: the hero heading IS the
              rotating statement, rather than a slogan with the statements
              parked underneath it. */}
          <Reveal delay={0.15}>
            <StatementCarousel
              statements={statements}
              label="Statement"
              className="mt-5"
            />
          </Reveal>

          {/* Sits under the carousel's own button, which is the last thing in
              the band — the same position the toggle takes on `/`, under that
              hero's pair of buttons. */}
          <Reveal delay={0.3}>
            <HomeViewToggle href="/" />
          </Reveal>
        </div>
      </section>

      <HomeBody />
    </>
  );
}
