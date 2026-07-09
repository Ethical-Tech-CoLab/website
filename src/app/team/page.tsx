import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { team } from "@/content/site";
import { asset } from "@/lib/asset";
import { Avatar } from "@/components/TeamAvatar";
import { ResearchersExplorer } from "@/components/ResearchersExplorer";
import { AlumniSection } from "@/components/AlumniSection";
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
              {team.intro} Past cohorts are listed in the{" "}
              <Link href="/cohorts" className="text-accent hover:opacity-80">
                timeline
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* Staff */}
      <section className="border-b border-border bg-surface/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-xs uppercase tracking-wider text-muted">
            Team · Staff
          </p>
          <h2 className="mt-3 fluid-h2 font-heading uppercase">
            {team.residentFellowsLabel}
          </h2>

          {/* Founder */}
          <Link
            href={`/team/${team.founder.slug}`}
            className="group card-glow mt-10 flex flex-col gap-6 rounded-2xl border border-border bg-card p-7 transition-colors hover:border-border-strong sm:flex-row sm:items-center"
          >
            <Avatar
              initials={team.founder.initials}
              photo={team.founder.photo}
              name={team.founder.name}
              size={128}
            />
            <div className="max-w-3xl">
              <h3 className="text-2xl font-semibold tracking-tight">
                {team.founder.name}
              </h3>
              <p className="mt-1 text-sm text-accent">{team.founder.role}</p>
              {team.founder.org && (
                <p className="mt-1 text-sm text-foreground/70">
                  {team.founder.org}
                </p>
              )}
              <span className="mt-3 inline-block text-sm text-muted transition-colors group-hover:text-accent">
                Read full bio →
              </span>
            </div>
          </Link>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
            {team.residentFellows.map((member) => (
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
                    <h3 className="text-xl font-semibold leading-tight tracking-tight">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-sm text-accent">{member.role}</p>
                  </Link>
                  <Link
                    href={`/team/${member.slug}`}
                    className="mt-2 inline-block text-sm text-muted transition-colors hover:text-accent"
                  >
                    View profile →
                  </Link>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm text-muted transition-colors hover:text-accent"
                    >
                      LinkedIn ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
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
                    <h3 className="text-xl font-semibold leading-tight tracking-tight">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-sm text-accent">{member.role}</p>
                  </Link>
                  {member.org && (
                    <p className="mt-1 text-sm text-foreground/70">
                      {member.org}
                    </p>
                  )}
                  <Link
                    href={`/team/${member.slug}`}
                    className="mt-2 inline-block text-sm text-muted transition-colors hover:text-accent"
                  >
                    View profile →
                  </Link>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm text-muted transition-colors hover:text-accent"
                    >
                      LinkedIn ↗
                    </a>
                  )}
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
                    <h3 className="text-xl font-semibold leading-tight tracking-tight">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-sm text-accent">{member.role}</p>
                  </Link>
                  <Link
                    href={`/team/${member.slug}`}
                    className="mt-2 inline-block text-sm text-muted transition-colors hover:text-accent"
                  >
                    View profile →
                  </Link>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm text-muted transition-colors hover:text-accent"
                    >
                      LinkedIn ↗
                    </a>
                  )}
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
    </>
  );
}
