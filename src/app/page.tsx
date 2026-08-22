import Image from "next/image";
import { asset } from "@/lib/asset";
import { siteCounts } from "@/lib/counts";
import { HeroField } from "@/components/HeroField";
import { HomeBody } from "@/components/HomeBody";
import { StatementCarousel, type Statement } from "@/components/StatementCarousel";
import { Reveal } from "@/components/motion/Reveal";

/* Title and description come from the root layout's defaults — this is the
   page they were written for. */

/**
 * /portfolio spells its count out in its own heading ("Four questions."), so
 * the slide that links there has to spell it the same way — a slide that says
 * "4 questions" while the page it opens says "Four" reads as a different page.
 */
const WORDS = ["Zero","One","Two","Three","Four","Five","Six","Seven","Eight","Nine"];
const questionCount =
  WORDS[siteCounts.researchQuestions] ?? siteCounts.researchQuestions;

/**
 * One card per destination, each led by that destination's own `<h1>` — same
 * words, same accent half — so the carousel reads as doors into the site
 * rather than as statistics. The figure a card carries is the one its heading
 * does NOT already state, which is why the portfolio card counts projects (its
 * heading counts the questions) and the publications card says "in the
 * catalogue" rather than repeating "written up".
 *
 * The first card stands for the home page itself — the wordmark and mission
 * line. It carries no button: this IS the home page, so there is nowhere to
 * send a reader who is already here.
 */
const statements: Statement[] = [
  {
    lead: "Ethical Tech CoLab",
    // The wordmark carries this card the way it carries `/`, so it runs a step
    // larger than the sentence-shaped headings on the other cards.
    // `wordmark-pixel` swaps Bebas for the dot-matrix face and brings its own
    // scale with it — Silkscreen's glyphs are far wider, so the Bebas clamp
    // would overrun the card.
    headingClass: "wordmark-pixel",
    // The serif mission line with "human condition" in the accent, and the
    // intro with its live link out to the Center for Global Affairs. Passed as
    // nodes so the card keeps that markup rather than being flattened to the
    // caps-and-muted styling the counting cards use.
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
    figure: `${siteCounts.projects} projects in the portfolio`,
    line: "Evacuation, cultural heritage, traceability, diplomacy — each question carried through to a fielded prototype, in the open.",
    cta: "Explore the portfolio",
    href: "/portfolio",
  },
  {
    lead: "Run the ",
    em: "research",
    tail: ".",
    figure: `${siteCounts.openableDemos} demos you can open`,
    line: "Not screenshots: the prototypes themselves, running in the browser with their source alongside.",
    cta: "Open the live demos",
    href: "/demos",
  },
  {
    lead: "The research, ",
    em: "written up",
    tail: ".",
    figure: `${siteCounts.catalogue} in the catalogue`,
    line: "Every research question the CoLab takes on is written up academically, including what did not hold.",
    cta: "Read the publications",
    href: "/publications",
  },
  {
    lead: "The people ",
    em: "building",
    tail: " this.",
    figure: `${siteCounts.researchers} researchers across ${siteCounts.cohorts} cohorts`,
    line: "Graduate researchers at NYU's Center for Global Affairs, with advisors and resident fellows alongside.",
    cta: "Meet the team",
    href: "/team",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero — the statement carousel carries what a hero paragraph would,
          one figure at a time. */}
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
            {/* Runs larger than the site's other eyebrows: this one names the
                collaboration the whole page rests on, and the carousel below
                it does not otherwise say who is behind the work. */}
            <p className="text-base uppercase tracking-[0.25em] text-accent sm:text-lg">
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
        </div>
      </section>

      <HomeBody />
    </>
  );
}
