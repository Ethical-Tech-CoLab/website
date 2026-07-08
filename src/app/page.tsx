import Link from "next/link";
import { cohorts, researchAreas, site } from "@/content/site";
import { HeroVisual } from "@/components/HeroVisual";
import { WaveBackground } from "@/components/WaveBackground";
import { ProjectDiagram } from "@/components/ProjectDiagram";

export default function Home() {
  const current = cohorts.find((c) => c.current);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 60% at 20% 0%, color-mix(in oklab, var(--glow) 22%, transparent), transparent 65%)",
          }}
        />
        <WaveBackground className="opacity-[0.18]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 sm:py-28 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-accent">
              NYU CGA × Microsoft
            </p>
            <h1 className="mt-6 text-7xl font-semibold leading-[0.92] tracking-tight sm:text-8xl lg:text-9xl">
              Ethical Tech CoLab
            </h1>
            <p className="mt-6 font-serif text-4xl leading-[1.05] text-foreground sm:text-5xl">
              Emerging tech, <span className="display-em">human</span>{" "}
              condition.
            </p>
            <p className="mt-7 max-w-xl leading-relaxed text-foreground/85">
              A research collaboration between NYU&apos;s Center for Global
              Affairs and Microsoft, exploring intervention opportunities at
              the intersection of emerging technologies and the human
              condition.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
              >
                Portfolio <span aria-hidden>→</span>
              </Link>
              <Link
                href="/cohorts"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                GET TO KNOW THE LAB
              </Link>
            </div>
          </div>

          {current && (
            <HeroVisual term={current.term} caption={current.title} />
          )}
        </div>
      </section>

      {/* Portfolio preview */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted">Portfolio</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Building at the frontier.
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="hidden text-sm text-accent transition-opacity hover:opacity-80 sm:block"
          >
            View all four →
          </Link>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
          {researchAreas.map((area) => (
            <Link
              key={area.key}
              href="/portfolio"
              className="group flex flex-col gap-3 bg-background p-8 transition-colors hover:bg-surface"
            >
              <ProjectDiagram
                variant={area.key}
                className="mb-3 aspect-[16/7] w-full overflow-hidden rounded-xl border border-border bg-surface/60"
              />
              <span className="font-mono text-xs text-muted">
                {area.index} / {area.key}
              </span>
              <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl group-hover:text-accent">
                {area.question}
              </h3>
              <p className="text-base leading-relaxed text-muted">
                {area.summary}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {area.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted"
                  >
                    #{tag.replace(/\s+/g, "")}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Collaborate CTA */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="text-xs uppercase tracking-wider text-muted">Collaborate</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Have a hard problem at the edge of technology and society?
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            We partner with institutions, agencies, and communities to prototype
            interventions that hold up outside the lab.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
            >
              Start a conversation <span aria-hidden>→</span>
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              {site.email}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
