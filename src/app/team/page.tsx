import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { team } from "@/content/site";

export const metadata: Metadata = {
  title: "Team",
  description: team.intro,
};

function Avatar({
  initials,
  photo,
  name,
  size = 48,
}: {
  initials: string;
  photo?: string;
  name?: string;
  size?: number;
}) {
  if (photo) {
    return (
      <Image
        src={photo}
        alt={name ? `${name} headshot` : "headshot"}
        width={size}
        height={size}
        style={{ width: size, height: size }}
        className="shrink-0 rounded-full border border-border object-cover"
      />
    );
  }
  return (
    <span
      aria-hidden
      style={{ width: size, height: size }}
      className="grid shrink-0 place-items-center rounded-full border border-border bg-surface text-sm font-semibold text-accent"
    >
      {initials}
    </span>
  );
}

/** Renders a bio string, splitting blank-line-separated paragraphs. */
function Bio({ text, className }: { text: string; className?: string }) {
  return (
    <div className={className}>
      {text.split(/\n\n+/).map((para, i) => (
        <p key={i} className={i > 0 ? "mt-3" : undefined}>
          {para}
        </p>
      ))}
    </div>
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
            <Avatar
              initials={team.founder.initials}
              photo={team.founder.photo}
              name={team.founder.name}
              size={96}
            />
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

        <div className="mt-12 divide-y divide-border border-y border-border">
          {team.researchers.map((member) => (
            <div
              key={member.email}
              className="flex flex-col gap-6 py-10 sm:flex-row sm:gap-10"
            >
              <div className="sm:w-52 sm:shrink-0">
                <Avatar
                  initials={member.initials}
                  photo={member.photo}
                  name={member.name}
                  size={120}
                />
                <h3 className="mt-4 font-semibold leading-tight tracking-tight">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm text-accent">{member.role}</p>
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="mt-2 block truncate text-sm text-muted transition-colors hover:text-accent"
                  >
                    {member.email}
                  </a>
                )}
              </div>
              {member.bio && (
                <Bio
                  text={member.bio}
                  className="max-w-3xl leading-relaxed text-foreground/80"
                />
              )}
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
                <Avatar
                  initials={member.initials}
                  photo={member.photo}
                  name={member.name}
                />
                <div>
                  <h3 className="font-semibold leading-tight tracking-tight">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{member.role}</p>
                  {member.bio && (
                    <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                      {member.bio}
                    </p>
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
