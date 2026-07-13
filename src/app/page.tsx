import Image from "next/image";
import { Link } from "next-view-transitions";
import { researchAreas, site } from "@/content/site";
import { asset } from "@/lib/asset";
import { HeroVisual } from "@/components/HeroVisual";
import { HeroField } from "@/components/HeroField";
import { HeroTitle } from "@/components/HeroTitle";
import { ProjectDiagram } from "@/components/ProjectDiagram";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { Tilt3D } from "@/components/motion/Tilt3D";
import { WireframeGlobe } from "@/components/WireframeGlobe";
import { CohortsShowcase } from "@/components/CohortsShowcase";
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
          </Reveal>

          {current && (
            <Reveal delay={0.35} className="mt-16 w-full max-w-sm">
              <Tilt3D max={7}>
                <HeroVisual term={current.term} caption={current.title} />
              </Tilt3D>
            </Reveal>
          )}
        </div>
      </section>

      {/* Mission strip */}
      <section className="border-b border-border bg-surface/40">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center">
          <Reveal>
            <p className="text-xs uppercase tracking-wider text-muted">Mission</p>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mx-auto mt-4 max-w-4xl fluid-h2 font-heading uppercase leading-[1.02]">
              Achieving <span className="display-em">full human potential</span>{" "}
              through technology — changing how people are informed, and how tech
              is used for good.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              What are the circumstances of the human being, and how can
              technology improve them? We see technology as a tool — part of the
              solution.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Portfolio preview */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <div className="flex items-end justify-between">
            <div>
              <Link
                href="/portfolio"
                className="link-underline text-xs uppercase tracking-wider text-muted transition-colors hover:text-accent"
              >
                Portfolio
              </Link>
              <h2 className="mt-3 fluid-h2 font-heading uppercase">
                Building at the frontier.
              </h2>
            </div>
            <Link
              href="/portfolio"
              className="link-underline hidden text-sm text-accent sm:block"
            >
              View all four →
            </Link>
          </div>
        </Reveal>

        <Stagger className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
          {researchAreas.map((area) => (
            <StaggerItem key={area.key}>
              <Link
                href="/portfolio"
                className="group card-glow flex h-full flex-col gap-3 bg-background p-8 transition-colors hover:bg-surface"
              >
                <ProjectDiagram
                  variant={area.key}
                  className="diagram-live mb-3 aspect-[16/7] w-full overflow-hidden rounded-xl border border-border bg-surface/60"
                />
                <span className="font-mono text-xs text-muted">
                  {area.index} / {area.key}
                </span>
                <h3 className="font-heading text-2xl uppercase tracking-wide sm:text-3xl group-hover:text-accent">
                  {area.question}
                </h3>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Cohorts — moved here from the retired /cohorts route */}
      <CohortsShowcase />

      {/* Collaborate CTA */}
      <section className="relative overflow-hidden border-t border-border">
        <span className="aura" />
        {/* Floating 3D wireframe globe */}
        <div className="pointer-events-none absolute right-[-60px] top-1/2 hidden -translate-y-1/2 opacity-70 lg:block">
          <WireframeGlobe />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 py-28">
          <Reveal>
            <p className="text-xs uppercase tracking-wider text-muted">Collaborate</p>
            <h2 className="mt-4 max-w-3xl fluid-h2 font-heading uppercase leading-tight">
              Have a hard problem at the edge of technology and society?
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-muted">
              We partner with institutions, agencies, and communities to prototype
              interventions that hold up outside the lab.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Magnetic>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-sweep inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-ink transition-transform hover:scale-[1.02]"
                >
                  Start a conversation <span aria-hidden>→</span>
                </a>
              </Magnetic>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                {site.email}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterSignup />
    </>
  );
}
