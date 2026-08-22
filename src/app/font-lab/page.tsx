import type { Metadata } from "next";
import {
  Bebas_Neue,
  Chakra_Petch,
  Michroma,
  Orbitron,
  Pixelify_Sans,
  Press_Start_2P,
  Rajdhani,
  Sixtyfour,
  Silkscreen,
  Space_Grotesk,
  VT323,
} from "next/font/google";

/**
 * A throwaway comparison page for choosing the wordmark face.
 *
 * Every candidate renders the real lockup at real hero size on the real
 * background, because a font specimen at 16px says nothing about how a
 * two-word wordmark sits in the card. Not linked from the nav and excluded
 * from search — delete this route (and the fonts loaded here, which are loaded
 * in this file precisely so they never ship on any other page) once a face is
 * picked.
 */
export const metadata: Metadata = {
  title: "Wordmark font lab",
  robots: { index: false, follow: false },
};

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });
const sixtyfour = Sixtyfour({ subsets: ["latin"], weight: "400" });
const pixelify = Pixelify_Sans({ subsets: ["latin"], weight: ["400", "700"] });
const silkscreen = Silkscreen({ subsets: ["latin"], weight: ["400", "700"] });
const pressStart = Press_Start_2P({ subsets: ["latin"], weight: "400" });
const vt323 = VT323({ subsets: ["latin"], weight: "400" });
const orbitron = Orbitron({ subsets: ["latin"], weight: ["500", "800"] });
const michroma = Michroma({ subsets: ["latin"], weight: "400" });
const chakra = Chakra_Petch({ subsets: ["latin"], weight: ["600", "700"] });
const rajdhani = Rajdhani({ subsets: ["latin"], weight: ["600", "700"] });
const grotesk = Space_Grotesk({ subsets: ["latin"], weight: ["500", "700"] });

type Candidate = {
  /** Number the user can quote back: "let's go with 6". */
  n: number;
  name: string;
  /** Which of the three directions this face belongs to. */
  group: string;
  /** Why it is in the running, and what it costs. */
  note: string;
  className: string;
  /** Per-face size, since a dot-matrix face and a condensed face at the same
      font-size are wildly different physical widths. */
  style: React.CSSProperties;
};

const candidates: Candidate[] = [
  {
    n: 1,
    name: "Bebas Neue",
    group: "Current",
    note: "What the site uses today, and what every other heading is set in.",
    className: bebas.className,
    style: { fontSize: "clamp(2.6rem,9vw,7rem)", lineHeight: 0.88 },
  },
  {
    n: 2,
    name: "Sixtyfour",
    group: "Dot matrix",
    note: "Closest to the banner: separate square tiles. You rejected this one.",
    className: sixtyfour.className,
    style: {
      fontSize: "clamp(1rem,3.4vw,2.3rem)",
      lineHeight: 1.5,
      letterSpacing: "-0.04em",
    },
  },
  {
    n: 3,
    name: "Press Start 2P",
    group: "Pixel",
    note: "The arcade classic. Chunky, square, unmistakably 8-bit.",
    className: pressStart.className,
    style: { fontSize: "clamp(1rem,3.2vw,2.2rem)", lineHeight: 1.5 },
  },
  {
    n: 4,
    name: "Silkscreen",
    group: "Pixel",
    note: "Small-pixel face. You rejected this one.",
    className: silkscreen.className,
    style: { fontSize: "clamp(1.5rem,5.4vw,4rem)", lineHeight: 1.25 },
  },
  {
    n: 5,
    name: "Pixelify Sans",
    group: "Pixel",
    note: "Solid strokes with stepped edges. You rejected this one.",
    className: pixelify.className,
    style: { fontSize: "clamp(2.2rem,8vw,6.5rem)", lineHeight: 1.04, fontWeight: 700 },
  },
  {
    n: 6,
    name: "VT323",
    group: "Terminal",
    note: "Old CRT terminal. Reads as a screen rather than as a grid of blocks.",
    className: vt323.className,
    style: { fontSize: "clamp(2.8rem,10vw,8rem)", lineHeight: 0.95 },
  },
  {
    n: 7,
    name: "Orbitron",
    group: "Wide tech",
    note: "Squared geometric. Says 'technology' with no pixel grid at all.",
    className: orbitron.className,
    style: { fontSize: "clamp(1.7rem,6vw,4.4rem)", lineHeight: 1.1, fontWeight: 800 },
  },
  {
    n: 8,
    name: "Michroma",
    group: "Wide tech",
    note: "Very wide, square, calm. Closest to the banner's proportions.",
    className: michroma.className,
    style: { fontSize: "clamp(1.3rem,4.6vw,3.3rem)", lineHeight: 1.3 },
  },
  {
    n: 9,
    name: "Chakra Petch",
    group: "Wide tech",
    note: "Squared with clipped corners — a technical look that still reads fast.",
    className: chakra.className,
    style: { fontSize: "clamp(2.2rem,8vw,6rem)", lineHeight: 1.02, fontWeight: 700 },
  },
  {
    n: 10,
    name: "Rajdhani",
    group: "Wide tech",
    note: "Condensed and squared: nearest to Bebas's proportions, but technical.",
    className: rajdhani.className,
    style: { fontSize: "clamp(2.8rem,10vw,7.5rem)", lineHeight: 0.95, fontWeight: 700 },
  },
  {
    n: 11,
    name: "Space Grotesk",
    group: "Neutral",
    note: "A quiet modern sans, sibling to the Space Mono already used for body.",
    className: grotesk.className,
    style: { fontSize: "clamp(2.2rem,8vw,6rem)", lineHeight: 1, fontWeight: 700 },
  },
];

export default function FontLab() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <p className="text-xs uppercase tracking-[0.25em] text-accent">
        Internal · not linked from the site
      </p>
      <h1 className="mt-4 fluid-h2 font-heading uppercase">Wordmark font lab</h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-foreground/85">
        The lockup at hero size in every candidate, on the real background.
        Tell me a number and I will set the wordmark in it — or say none of
        them and we will go the SVG route instead.
      </p>

      <ul className="mt-16 space-y-16">
        {candidates.map((c) => (
          <li key={c.n} className="border-t border-border pt-8">
            <p className="text-sm uppercase tracking-[0.18em] text-muted">
              {c.n} · {c.name}{" "}
              <span className="text-accent">— {c.group}</span>
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
              {c.note}
            </p>
            <div
              className={`mt-6 uppercase ${c.className}`}
              style={c.style}
            >
              <span className="block">Ethical Tech</span>
              <span className="block">CoLab</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
