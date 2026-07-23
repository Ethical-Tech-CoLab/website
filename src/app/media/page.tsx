import type { Metadata } from "next";
import { media } from "@/content/site";
import { SectionTabs } from "@/components/SectionTabs";
import { SlideDeck } from "@/components/SlideDeck";
import { Reveal } from "@/components/motion/Reveal";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Media",
  description:
    "The Ethical Tech Summit — a semesterly convening at the intersection of emerging technology, human-rights policy, and global affairs. Past summits, partners, and moments from the room.",
};

export default function MediaPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <span className="aura" />
        <div className="relative mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <p className="text-xs uppercase tracking-wider text-muted">
              {media.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-4 fluid-hero font-heading uppercase leading-[0.9]">
              The Summit,{" "}
              <span className="display-em">in the room</span>.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
              {media.intro}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
              {media.threads}
            </p>
          </Reveal>
        </div>
      </section>

      <SectionTabs />

      <div className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <h2 className="font-heading text-2xl uppercase tracking-wide">
            Past summits
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {media.pastSummits.map((s) => (
            <Reveal key={s.title}>
              <article className="card-glow flex h-full flex-col rounded-2xl border border-border bg-card p-7 transition-colors hover:border-border-strong">
                <p className="font-mono text-xs text-accent">{s.term}</p>
                <h3 className="mt-3 font-heading text-lg uppercase leading-snug tracking-wide">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {s.blurb}
                </p>
                <div className="mt-auto flex flex-wrap gap-2 pt-4">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <h2 className="mt-20 font-heading text-2xl uppercase tracking-wide">
            Media &amp; moments
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
            A visual sampler from past Summits and Hackathons — panels, student
            demos, partner roundtables, and the convening floor. Click any image
            for the full-size version.
          </p>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {media.gallery.map((g) => (
            <a
              key={g.src}
              href={asset(g.src)}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-[4/3] overflow-hidden rounded-xl border border-border bg-secondary"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset(g.src)}
                alt={g.caption}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2 text-[11px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                {g.caption}
              </span>
            </a>
          ))}
        </div>

        <Reveal>
          <h2 className="mt-20 font-heading text-2xl uppercase tracking-wide">
            From the stage
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
            Decks presented at the Summit, in full. Use the arrows to advance, or
            open a deck in Slides for full screen.
          </p>
        </Reveal>
        <div className="mt-8 space-y-10">
          {media.decks.map((d) => (
            <Reveal key={d.id}>
              <SlideDeck deck={d} />
            </Reveal>
          ))}
        </div>

      </div>
    </>
  );
}
