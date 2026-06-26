import type { Metadata } from "next";
import Link from "next/link";
import { team } from "@/content/site";

export const metadata: Metadata = {
  title: "Team",
  description: team.intro,
};

function Avatar({ initials }: { initials: string }) {
  return (
    <span
      aria-hidden
      className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-border bg-surface text-sm font-semibold text-accent"
    >
      {initials}
    </span>
  );
}

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

      {/* Founder */}
      <section className="border-b border-border bg-surface/40">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-xs uppercase tracking-wider text-muted">Founder</p>
          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start">
            <Avatar initials={team.founder.initials} />
            <div className="max-w-3xl">
              <h2 className="text-2xl font-semibold tracking-tight">
                {team.founder.name}
              </h2>
              <p className="mt-1 text-sm text-accent">{team.founder.role}</p>
              <p className="mt-4 leading-relaxed text-muted">
                {team.founder.body}
              </p>
              {team.founder.email && (
                <a
                  href={`mailto:${team.founder.email}`}
                  className="mt-4 inline-block text-sm text-foreground/90 transition-colors hover:text-accent"
                >
                  {team.founder.email} →
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Researchers */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex items-baseline justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted">
              Applied AI Researchers
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              {team.researchersLabel}
            </h2>
          </div>
          <span className="text-sm text-muted">{team.researchersCount}</span>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {team.researchers.map((member) => (
            <div key={member.email} className="flex gap-4 bg-background p-6">
              <Avatar initials={member.initials} />
              <div className="min-w-0">
                <h3 className="font-semibold leading-tight tracking-tight">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm text-muted">{member.role}</p>
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="mt-2 block truncate text-sm text-foreground/80 transition-colors hover:text-accent"
                  >
                    {member.email}
                  </a>
                )}
              </div>
            </div>
          ))}
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
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {team.collaborators.map((member) => (
              <div key={member.name} className="flex gap-4 bg-background p-6">
                <Avatar initials={member.initials} />
                <div>
                  <h3 className="font-semibold leading-tight tracking-tight">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{member.role}</p>
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
