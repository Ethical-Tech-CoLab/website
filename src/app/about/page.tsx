import type { Metadata } from "next";
import { about } from "@/content/site";

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
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <SectionLabel>{about.eyebrow}</SectionLabel>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            {about.heading}
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted">
            {about.intro}
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mx-auto grid max-w-6xl gap-px overflow-hidden border-b border-border md:grid-cols-2">
        {[about.mission, about.vision].map((block) => (
          <div key={block.label} className="px-6 py-16 md:px-10">
            <SectionLabel>{block.label}</SectionLabel>
            <h2 className="mt-4 text-2xl font-semibold leading-snug tracking-tight">
              {block.heading}
            </h2>
            <p className="mt-5 leading-relaxed text-muted">{block.body}</p>
          </div>
        ))}
      </section>

      {/* Lab Director */}
      <section className="border-b border-border bg-surface/40">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-[0.6fr_1.4fr]">
          <div>
            <SectionLabel>{about.director.label}</SectionLabel>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight">
              {about.director.name}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-accent">
              {about.director.summary}
            </p>
          </div>
          <div className="space-y-5 leading-relaxed text-muted">
            {about.director.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionLabel>{about.whatWeDo.label}</SectionLabel>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight">
          {about.whatWeDo.heading}
        </h2>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {about.whatWeDo.items.map((item) => (
            <div key={item.index} className="bg-background p-7">
              <span className="font-mono text-sm text-accent">{item.index}</span>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">
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
          <SectionLabel>{about.principles.label}</SectionLabel>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight">
            {about.principles.heading}
          </h2>
          <div className="mt-12 grid gap-10 sm:grid-cols-3">
            {about.principles.items.map((item) => (
              <div key={item.index}>
                <span className="font-mono text-sm text-accent">
                  {item.index}
                </span>
                <h3 className="mt-3 text-lg font-semibold tracking-tight">
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
          <SectionLabel>{about.stack.label}</SectionLabel>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight">
            {about.stack.heading}
          </h2>
          <p className="mt-5 max-w-2xl leading-relaxed text-muted">
            {about.stack.body}
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {about.stack.groups.map((group) => (
              <div key={group.name}>
                <h3 className="text-sm font-semibold text-accent">
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
          <SectionLabel>{about.collaborators.label}</SectionLabel>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight">
            {about.collaborators.heading}
          </h2>

          <div className="mt-12 grid gap-12 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-accent">
                {about.collaborators.confirmedLabel}
              </p>
              <ul className="mt-5 space-y-3">
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
            <div>
              <p className="text-sm font-semibold text-muted">
                {about.collaborators.inConversationLabel}
              </p>
              <ul className="mt-5 space-y-3">
                {about.collaborators.inConversation.map((item) => (
                  <li
                    key={item}
                    className="border-b border-border pb-3 text-sm text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Summit + founding partners */}
      <section className="border-t border-border bg-surface/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <SectionLabel>{about.summit.label}</SectionLabel>
          <h2 className="mt-4 max-w-3xl text-2xl font-semibold leading-snug tracking-tight">
            {about.summit.heading}
          </h2>

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
    </>
  );
}
