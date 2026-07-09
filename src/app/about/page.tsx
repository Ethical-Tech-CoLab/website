import type { Metadata } from "next";
import { about } from "@/content/site";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "About",
  description: about.intro,
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs uppercase tracking-wider text-muted">{children}</p>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* Intro */}
      <section className="relative overflow-hidden border-b border-border">
        <span className="aura" />
        <div className="relative mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <SectionLabel>{about.eyebrow}</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-4 max-w-4xl fluid-hero font-heading uppercase leading-[0.9]">
              Exploring technology to improve the{" "}
              <span className="display-em">human condition</span>.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted">
              {about.intro}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mx-auto grid max-w-6xl gap-px overflow-hidden border-b border-border md:grid-cols-2">
        {[about.mission, about.vision].map((block) => (
          <Reveal key={block.label} className="px-6 py-16 md:px-10">
            <SectionLabel>{block.label}</SectionLabel>
            <h2 className="mt-4 font-heading text-2xl uppercase leading-snug tracking-wide sm:text-3xl">
              {block.heading}
            </h2>
            <p className="mt-5 leading-relaxed text-muted">{block.body}</p>
          </Reveal>
        ))}
      </section>

      {/* Lab Director */}
      <section className="border-b border-border bg-surface/40">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-[0.6fr_1.4fr]">
          <Reveal>
            <SectionLabel>{about.director.label}</SectionLabel>
            <h2 className="mt-4 font-heading text-3xl uppercase tracking-wide">
              {about.director.name}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-accent">
              {about.director.summary}
            </p>
          </Reveal>
          <Reveal delay={0.1} className="space-y-5 leading-relaxed text-muted">
            {about.director.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* What we do */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <SectionLabel>{about.whatWeDo.label}</SectionLabel>
          <h2 className="mt-3 fluid-h2 font-heading uppercase">
            {about.whatWeDo.heading}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {about.whatWeDo.items.map((item) => (
            <div key={item.index} className="bg-background p-7">
              <span className="font-mono text-sm text-accent">{item.index}</span>
              <h3 className="mt-4 font-heading text-lg uppercase tracking-wide">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Principles */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <SectionLabel>{about.principles.label}</SectionLabel>
            <h2 className="mt-3 fluid-h2 font-heading uppercase">
              {about.principles.heading}
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-10 sm:grid-cols-3">
            {about.principles.items.map((item) => (
              <div key={item.index}>
                <span className="font-mono text-sm text-accent">
                  {item.index}
                </span>
                <h3 className="mt-3 font-heading text-lg uppercase tracking-wide">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="border-t border-border bg-surface/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <SectionLabel>{about.stack.label}</SectionLabel>
            <h2 className="mt-3 fluid-h2 font-heading uppercase">
              {about.stack.heading}
            </h2>
            <p className="mt-5 max-w-2xl leading-relaxed text-muted">
              {about.stack.body}
            </p>
          </Reveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {about.stack.groups.map((group) => (
              <div key={group.name}>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">
                  {group.name}
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-foreground/85">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaborators */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <SectionLabel>{about.collaborators.label}</SectionLabel>
            <h2 className="mt-3 fluid-h2 font-heading uppercase">
              {about.collaborators.heading}
            </h2>
          </Reveal>

          <div className="mt-12">
            <p className="text-sm font-semibold text-accent">
              {about.collaborators.confirmedLabel}
            </p>
            <ul className="mt-5 grid gap-x-12 gap-y-3 sm:grid-cols-2">
              {about.collaborators.confirmed.map((item) => (
                <li
                  key={item}
                  className="border-b border-border pb-3 text-sm text-foreground/85"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Summit + founding partners */}
      <section className="border-t border-border bg-surface/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <SectionLabel>{about.summit.label}</SectionLabel>
            <h2 className="mt-4 max-w-3xl font-heading text-2xl uppercase leading-snug tracking-wide sm:text-3xl">
              {about.summit.heading}
            </h2>
          </Reveal>

          <div className="mt-16 border-t border-border pt-10">
            <SectionLabel>Founding partners</SectionLabel>
            <div className="mt-6 flex flex-wrap gap-x-10 gap-y-3 text-sm text-foreground/85">
              {about.foundingPartners.map((partner) => (
                <span key={partner}>{partner}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterSignup />
    </>
  );
}
