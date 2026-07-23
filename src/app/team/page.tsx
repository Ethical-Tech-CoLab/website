import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { about, team } from "@/content/site";
import { asset } from "@/lib/asset";
import { excerpt } from "@/lib/team";
import { Avatar, LinkedInLink } from "@/components/TeamAvatar";
import { ResearchersExplorer } from "@/components/ResearchersExplorer";
import { AlumniSection } from "@/components/AlumniSection";
import { OrgShowcase } from "@/components/OrgShowcase";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Team",
  description: team.intro,
};

export default function TeamPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        {/* Background: NYU subway station */}
        <Image
          src={asset("/nyu-subway.jpg")}
          alt="Commuters passing the New York University subway station sign"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_35%]"
        />
        {/* Legibility overlays: darken overall + fade heavier on the left where the text sits */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/45"
        />
        <div aria-hidden className="absolute inset-0 bg-background/30" />

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-32">
          <Reveal>
            <p className="text-xs uppercase tracking-wider text-accent">
              {team.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-4 fluid-hero font-heading uppercase leading-[0.9]">
              The people <span className="display-em">building</span> this.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground/85">
              {team.intro}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Founder */}
      <section className="border-b border-border bg-surface/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-xs uppercase tracking-wider text-muted">
            Team · Leadership
          </p>
          <h2 className="mt-3 fluid-h2 font-heading uppercase">Founder</h2>

          {/* A wrapper, not one big Link, so the LinkedIn anchor can live
              inside it. The bio link still covers the card via the overlay. */}
          <div className="group card-glow relative mt-10 flex flex-col gap-6 rounded-2xl border border-border bg-card p-7 transition-colors hover:border-border-strong sm:flex-row sm:items-center">
            <Avatar
              initials={team.founder.initials}
              photo={team.founder.photo}
              name={team.founder.name}
              size={128}
            />
            <div className="max-w-3xl">
              <h3 className="font-sans text-2xl font-semibold tracking-tight">
                {team.founder.name}
              </h3>
              {team.founder.org && (
                <p className="mt-1 text-sm text-foreground/70">
                  {team.founder.org}
                </p>
              )}
              <div className="mt-3 flex items-center gap-3">
                <Link
                  href={`/team/${team.founder.slug}`}
                  className="text-sm text-muted transition-colors after:absolute after:inset-0 after:content-[''] group-hover:text-accent"
                >
                  Read full bio →
                </Link>
                <LinkedInLink
                  href={team.founder.linkedin}
                  name={team.founder.name}
                  className="relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Researchers — current cohort */}
      <ResearchersExplorer />

      {/* Alumni — previous cohorts */}
      <AlumniSection />

      {/* Advisors */}
      <section className="border-t border-border bg-surface/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-xs uppercase tracking-wider text-muted">
            Advisors &amp; partners
          </p>
          <h2 className="mt-3 fluid-h2 font-heading uppercase">
            {team.advisorsLabel}
          </h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
            {team.advisors.map((member) => (
              <div
                key={member.name}
                className="flex gap-4 bg-background p-6 transition-colors hover:bg-surface/60"
              >
                <Link
                  href={`/team/${member.slug}`}
                  aria-label={`View ${member.name}'s profile`}
                >
                  <Avatar
                    initials={member.initials}
                    photo={member.photo}
                    name={member.name}
                  />
                </Link>
                <div>
                  <Link href={`/team/${member.slug}`} className="block">
                    <h3 className="font-sans text-lg font-semibold leading-tight tracking-tight">
                      {member.name}
                    </h3>
                  </Link>
                  {member.org && (
                    <p className="mt-1 text-sm text-foreground/70">
                      {member.org}
                    </p>
                  )}
                  {member.bio && (
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {excerpt(member.bio)}
                    </p>
                  )}
                  <div className="mt-2 flex items-center gap-3">
                    <Link
                      href={`/team/${member.slug}`}
                      className="text-sm text-muted transition-colors hover:text-accent"
                    >
                      View profile →
                    </Link>
                    <LinkedInLink href={member.linkedin} name={member.name} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other members */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-xs uppercase tracking-wider text-muted">
            Collaborators
          </p>
          <h2 className="mt-3 fluid-h2 font-heading uppercase">
            {team.collaboratorsLabel}
          </h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
            {team.collaborators.map((member) => (
              <div
                key={member.name}
                className="flex gap-4 bg-background p-6 transition-colors hover:bg-surface/60"
              >
                <Link
                  href={`/team/${member.slug}`}
                  aria-label={`View ${member.name}'s profile`}
                >
                  <Avatar
                    initials={member.initials}
                    photo={member.photo}
                    name={member.name}
                  />
                </Link>
                <div>
                  <Link href={`/team/${member.slug}`} className="block">
                    <h3 className="font-sans text-lg font-semibold leading-tight tracking-tight">
                      {member.name}
                    </h3>
                  </Link>
                  {member.bio && (
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {excerpt(member.bio)}
                    </p>
                  )}
                  <div className="mt-2 flex items-center gap-3">
                    <Link
                      href={`/team/${member.slug}`}
                      className="text-sm text-muted transition-colors hover:text-accent"
                    >
                      View profile →
                    </Link>
                    <LinkedInLink href={member.linkedin} name={member.name} />
                  </div>
                  {member.org && (
                    <p className="mt-2 text-sm text-foreground/70">
                      {member.org}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients & partners — closes the page on the organisations behind the
          work. OrgShowcase used to appear only on /about, which is currently
          hidden, so the logos in public/logos/ had nowhere to render. */}
      <section className="border-t border-border bg-surface/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <p className="text-xs uppercase tracking-wider text-muted">
              {team.orgs.eyebrow}
            </p>
            <h2 className="mt-3 fluid-h2 font-heading uppercase">
              {team.orgs.heading}
            </h2>
          </Reveal>

          <div className="mt-12">
            <p className="text-xs uppercase tracking-wider text-muted">
              {team.orgs.foundingLabel}
            </p>
            <p className="mt-2 text-sm text-muted">{team.orgs.foundingNote}</p>
            <div className="mt-6">
              <OrgShowcase
                items={about.foundingPartners}
                className="sm:grid-cols-3"
              />
            </div>
          </div>

          <div className="mt-14 border-t border-border pt-10">
            <p className="text-xs uppercase tracking-wider text-muted">
              {about.clients.label}
            </p>
            <p className="mt-2 text-sm text-muted">{team.orgs.clientsNote}</p>
            <div className="mt-6">
              <OrgShowcase items={about.clients.items} />
            </div>
          </div>

          <div className="mt-14 border-t border-border pt-10">
            <p className="text-xs uppercase tracking-wider text-muted">
              {about.partners.label}
            </p>
            <p className="mt-2 text-sm text-muted">{about.partners.note}</p>
            <div className="mt-6">
              <OrgShowcase items={about.partners.items} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
