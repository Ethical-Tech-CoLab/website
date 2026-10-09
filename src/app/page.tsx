import Image from "next/image";
import { asset } from "@/lib/asset";
import { siteCounts } from "@/lib/counts";
import { HeroField } from "@/components/HeroField";
import { HomeBody } from "@/components/HomeBody";
import {
  StatementCarousel,
  type Statement,
} from "@/components/StatementCarousel";
import { DemoPoster } from "@/components/DemoPoster";
import { products, type Product } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

/* Title and description come from the root layout's defaults — this is the
   page they were written for. */

/**
 * A live demo from the catalogue, by repo name. Throws rather than falling
 * back, so a renamed or withdrawn demo fails the build instead of leaving a
 * card that points nowhere — and an internal one fails it too, since the demo
 * cards advertise demos a visitor can open.
 */
/** Card titles set by hand, by repo name, where the catalogue name would not do. */
const CARD_TITLES: Record<string, string> = {
  "mariupol-3d": "Evacuation Simulator - Mariupol 3D",
};

function liveDemo(repoName: string): Product {
  const product = products.find((p) => p.repoName === repoName);
  if (!product?.demo || product.access === "internal") {
    throw new Error(
      `Home demo card: "${repoName}" is not an openable demo in src/content/site.ts`,
    );
  }
  return product;
}

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
    centerHeading: true,
    // The wordmark carries this card the way it carries `/`, so it runs a step
    // larger than the sentence-shaped headings on the other cards.
    headingClass: "text-[clamp(4.25rem,13vw,11rem)] leading-[0.88]",
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
      <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-foreground/85 sm:text-xl">
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
  // One card per demo, all under one heading. It is not its destination's
  // `<h1>` like the others: it leads into the demos, which live at the top of
  // /portfolio. Each card's dot is named for its demo. No figure or line —
  // the poster carries the card, and it sits straight under the heading.
  ...[
    "mariupol-3d",
    "diplomatic-simulator",
    "agentic-language-development",
  ].map((repoName): Statement => {
    const product = liveDemo(repoName);
    // The part of the catalogue name before the dash, as the poster sets it,
    // unless the card has its own title.
    const [catalogueHeading] = product.name.split(" — ");
    return {
      lead: CARD_TITLES[repoName] ?? catalogueHeading,
      // Held to one line: the size follows the viewport (the width less the
      // hero's side padding, over roughly the heading's length in ems, with
      // headroom) up to a cap, so it shrinks with the screen rather than
      // wrapping.
      headingClass:
        "whitespace-nowrap text-[clamp(1.5rem,calc((100vw_-_3rem)/11),4.25rem)]!",
      name: product.name,
      block: <DemoPoster product={product} />,
      cta: "See more live demos",
      href: "/portfolio",
    };
  }),
  // Set aside, not deleted: the three demo cards above now end in "See more
  // live demos", so this card sent a reader to the same place a second time.
  // Uncomment it to bring it back — it slots in after them.
  //
  // {
  //   lead: "Run the ",
  //   em: "research",
  //   tail: ".",
  //   figure: `${siteCounts.openableDemos} demos you can open`,
  //   line: "Not screenshots: the prototypes themselves, running in the browser with their source alongside.",
  //   cta: "Open the live demos",
  //   href: "/portfolio",
  // },
  // Set aside, not deleted: the events card below is taking its place for now.
  // Uncomment it to bring it back — it goes wherever you want it in the list.
  //
  // {
  //   lead: "The research, ",
  //   em: "written up",
  //   tail: ".",
  //   figure: `${siteCounts.catalogue} in the catalogue`,
  //   line: "Every research question the CoLab takes on is written up academically, including what did not hold.",
  //   cta: "Read the publications",
  //   href: "/publications",
  // },
  {
    // No `cta` yet: there is no events page to send a reader to. The empty
    // frames under the text are kept for event photos.
    lead: "Gather With the ",
    em: "CoLab",
    // This card carries a line, a row of photos, and two buttons below its
    // heading — more than any other card — so its heading runs smaller than
    // the full hero size to keep the carousel from being driven tall by it.
    headingClass: "text-[clamp(2.25rem,5vw,4rem)]!",
    line: "Workshops, talks, and demo days where our research meets practitioners, funders, and partners.",
    block: (
      <div className="mx-auto grid max-w-3xl grid-cols-3 gap-3">
        {[
          { src: "/home/events/hackathon.jpg", alt: "Students and mentors at the Microsoft hackathon in New York City" },
          { src: "/home/events/ai-demo.jpg", alt: "A CoLab speaker presenting an AI research visualisation to a room" },
          { src: "/home/events/networking.jpg", alt: "Guests talking over coffee at a CoLab reception" },
        ].map((photo) => (
          <div
            key={photo.src}
            className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border"
          >
            <Image
              src={asset(photo.src)}
              alt={photo.alt}
              fill
              sizes="(min-width: 768px) 20vw, 30vw"
              className="object-cover object-center"
            />
          </div>
        ))}
      </div>
    ),
    actions: [
      {
        label: "Join Events",
        href: "https://luma.com/ethical-tech-colab",
        primary: true,
      },
      {
        label: "Cohost with us",
        href: "mailto:ethical-tech-colab@nyu.edu?subject=event%20collab%20inquiry",
      },
    ],
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

        {/* Less padding above than below: the demo cards have to fit from the
            top of the page to the carousel controls in one screen, and nothing
            under the controls needs to. */}
        <div className="relative mx-auto max-w-6xl px-6 pb-10 pt-5 text-center sm:pb-12 sm:pt-6">
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
