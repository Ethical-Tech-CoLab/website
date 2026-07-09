import type { Metadata } from "next";
import { Link } from "next-view-transitions";
import { team } from "@/content/site";
import { Avatar } from "@/components/TeamAvatar";
import { ResearchersExplorer } from "@/components/ResearchersExplorer";

export const metadata: Metadata = {
  title: "Team",
  description: team.intro,
};

export default function TeamPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="text-xs uppercase tracking-wider text-muted">
            {team.eyebrow}
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-6xl">
            The people <span className="display-em">building</span> this.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
            {team.intro} Past cohorts are listed in the{" "}
            <Link href="/cohorts" className="text-accent hover:opacity-80">
              timeline
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Staff */}
      <section className="border-b border-border bg-surface/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-xs uppercase tracking-wider text-muted">
            Team · Staff
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
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

      {/* Researchers */}
      <ResearchersExplorer />

      {/* Advisors */}
      <section className="border-t border-border bg-surface/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-xs uppercase tracking-wider text-muted">
            Advisors &amp; partners
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
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
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
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
