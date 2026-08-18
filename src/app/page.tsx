import Image from "next/image";
import { Link } from "next-view-transitions";
import { asset } from "@/lib/asset";
import { HeroVisual } from "@/components/HeroVisual";
import { HeroField } from "@/components/HeroField";
import { HeroTitle } from "@/components/HeroTitle";
import { HomeViewToggle } from "@/components/HomeViewToggle";
import { HomeBody } from "@/components/HomeBody";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { Tilt3D } from "@/components/motion/Tilt3D";
import { cohorts } from "@/content/site";

export default function Home() {
  const current = cohorts.find((c) => c.current);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        {/* Background: NYU subway sign, sitting behind the interactive lines */}
        <Image
          src={asset("/nyu-subway.jpg")}
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="pointer-events-none object-cover object-center opacity-25"
        />
        {/* Darken so the hero stays legible and the subway reads as a backdrop */}
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
        <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 py-24 text-center sm:py-28">
          <HeroTitle />
          <Reveal delay={0.5} className="mt-7 max-w-2xl leading-relaxed text-foreground/85">
            <p>
              A research collaboration between NYU&apos;s{" "}
              <a
                href="https://www.sps.nyu.edu/about/academic-divisions-and-departments/center-for-global-affairs.html"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-accent hover:opacity-80"
              >
                Center for Global Affairs
              </a>{" "}
              and Microsoft — changing the conversation on how people are
              informed, and how emerging technology can be used for good.
            </p>
          </Reveal>
          <Reveal delay={0.6}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
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
            <HomeViewToggle href="/home-carousel" />
          </Reveal>

          {current && (
            <Reveal delay={0.35} className="mt-16 w-full max-w-sm">
              <Tilt3D max={7}>
                {/* The current cohort's card opens its synthesis report,
                    which is the thing a visitor clicking "Summer 2026"
                    actually wants, rather than the cohorts strip below. */}
                <HeroVisual
                  term={current.term}
                  caption={current.title}
                  href="/publications/after-the-corridor"
                />
              </Tilt3D>
            </Reveal>
          )}
        </div>
      </section>

      <HomeBody />
    </>
  );
}
