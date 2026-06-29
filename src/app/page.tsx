import Link from "next/link";
import { cohorts, researchAreas, site } from "@/content/site";
import { HeroVisual } from "@/components/HeroVisual";

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
              "radial-gradient(70% 60% at 20% 0%, oklch(0.65 0.22 305 / 0.18), transparent 65%)",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 sm:py-28 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-accent">
              NYU CGA × Microsoft Research
            </p>
            <h1 className="mt-6 text-6xl font-semibold leading-[0.98] tracking-tight sm:text-7xl">
              Ethical Tech CoLab
            </h1>
            <p className="mt-5 font-serif text-3xl leading-snug text-foreground sm:text-4xl">
              Emerging tech, <span className="display-em">human</span>{" "}
              condition.
            </p>
            <p className="mt-7 max-w-xl leading-relaxed text-muted">
              A research collaboration between NYU&apos;s Center for Global
              Affairs and Microsoft Research, exploring tech interventions for
              migration, forced labor, IDPs and refugees.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
              >
                See the portfolio <span aria-hidden>→</span>
              </Link>
              <Link
                href="/cohorts"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                {site.cohortRange.replace("· ", "")}
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
              <span className="font-mono text-xs text-muted">
                {area.index} / {area.key}
              </span>
              <h3 className="text-xl font-semibold tracking-tight group-hover:text-accent">
                {area.question}
              </h3>
              <p className="text-sm leading-relaxed text-muted">
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
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            Start a conversation <span aria-hidden>→</span>
          </a>
        </div>
      </section>
    </>
  );
}
