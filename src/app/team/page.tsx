import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "next-view-transitions";
import type { ReactNode } from "react";
import { team, teamOrgs, type TeamMember } from "@/content/site";
import { asset } from "@/lib/asset";
import { byLastName, excerpt, findTeamMemberBySlug } from "@/lib/team";
import { Avatar, LinkedInLink } from "@/components/TeamAvatar";
import { AlumniSection } from "@/components/AlumniSection";
import { OrgShowcase } from "@/components/OrgShowcase";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Team",
  description: team.intro,
};

/**
 * `team.currentMembers` split into the page's current lists, and the
 * advisors who are not current into the past one. A current member found in
 * `advisors` is a current advisor; any other current member — a researcher
 * from a cohort, a collaborator — is a current collaborator. Past
 * collaborators and researchers are covered by the cohort columns, so a
 * collaborator who is not current is not listed. Each list is in surname
 * order.
 *
 * A slug that names nobody fails the build rather than quietly dropping a
 * person from the page.
 */
function splitMembers() {
  const currentSlugs = new Set<string>(team.currentMembers);
  const isCurrent = (member: TeamMember) =>
    member.slug !== undefined && currentSlugs.has(member.slug);
  const advisorSlugs = new Set(team.advisors.map((member) => member.slug));

  const currentPeople = team.currentMembers.map((slug) => {
    const member = findTeamMemberBySlug(slug);
    if (!member) {
      throw new Error(
        `team.currentMembers: no team member has the slug "${slug}" in src/content/site.ts`,
      );
    }
    return member;
  });

  return {
    current: {
      advisors: currentPeople
        .filter((member) => advisorSlugs.has(member.slug))
        .sort(byLastName),
      collaborators: currentPeople
        .filter((member) => !advisorSlugs.has(member.slug))
        .sort(byLastName),
    },
    past: {
      advisors: team.advisors
        .filter((member) => !isCurrent(member))
        .sort(byLastName),
    },
  };
}

/**
 * A titled block inside the Current or Past section: Advisors,
 * Collaborators, Cohorts. A step down from the section's own heading.
 */
function Subsection({
  heading,
  id,
  children,
}: {
  heading: string;
  id?: string;
  children: ReactNode;
}) {
  return (
    <div id={id} className="mt-14 scroll-mt-24 first-of-type:mt-12">
      <h3 className="font-heading text-2xl uppercase leading-none tracking-[0.12em] text-accent sm:text-3xl">
        {heading}
      </h3>
      <div className="mt-8">{children}</div>
    </div>
  );
}

/**
 * Advisors or collaborators as one box of cells, two across: a photo, the
 * name, the organisation, a short bio, and the way to the full profile. With
 * nobody to show, it renders nothing and the heading above it stands alone.
 */
function MemberGrid({ members }: { members: TeamMember[] }) {
  if (members.length === 0) return null;
  return (
    <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
      {members.map((member) => (
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
              <h4 className="font-sans text-lg font-semibold leading-tight tracking-tight">
                {member.name}
              </h4>
            </Link>
            {member.org && (
              <p className="mt-1 text-sm text-foreground/70">{member.org}</p>
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
  );
}

/**
 * Current members, one to a row: a large photo, the name, their role and
 * organisation on one line, a short bio, and the way to the full profile.
 * Rows sit in one box of hairline-joined cells like the grids below them, so
 * they stay compact. The name's link covers the whole row through its inset
 * overlay; LinkedIn sits above that overlay so it stays clickable. With
 * nobody to show, it renders nothing and the heading above it stands alone.
 */
function MemberRows({ members }: { members: TeamMember[] }) {
  if (members.length === 0) return null;
  return (
    <ul className="flex flex-col gap-px overflow-hidden rounded-2xl border border-border bg-border">
      {members.map((member) => {
        const subtitle = [member.role, member.org].filter(Boolean).join(" · ");
        return (
          <li
            key={member.name}
            className="group relative flex flex-col gap-5 bg-background p-6 transition-colors hover:bg-surface/60 sm:flex-row sm:items-center sm:gap-8"
          >
            <Avatar
              initials={member.initials}
              photo={member.photo}
              name={member.name}
              size={128}
            />
            <div className="min-w-0 flex-1">
              <h4 className="font-sans text-xl font-semibold leading-tight tracking-tight sm:text-2xl">
                <Link
                  href={`/team/${member.slug}`}
                  className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:-outline-offset-2 focus-visible:after:outline-accent"
                >
                  {member.name}
                </Link>
              </h4>
              {subtitle && (
                <p className="mt-1 text-sm text-foreground/70">{subtitle}</p>
              )}
              {member.bio && (
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
                  {excerpt(member.bio, 220)}
                </p>
              )}
              <div className="mt-3 flex items-center gap-3">
                <span className="text-sm text-muted transition-colors group-hover:text-accent">
                  View profile →
                </span>
                <LinkedInLink
                  href={member.linkedin}
                  name={member.name}
                  className="relative z-10"
                />
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default function TeamPage() {
  const { current, past } = splitMembers();

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
            <h1 className="fluid-hero font-heading uppercase leading-[0.9]">
              Meet the <span className="display-em">Team</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground/85">
              {team.intro}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Founder — at the top, straight under the hero, ahead of the current
          and past members. */}
      <section className="bg-surface/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="fluid-h2 font-heading uppercase">Founder</h2>

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

      {/* Current members — whoever is working with the CoLab now, listed in
          `team.currentMembers`. */}
      <section id="current" className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="fluid-h2 font-heading uppercase">Current members</h2>

          <Subsection heading={team.collaboratorsLabel}>
            <MemberRows members={current.collaborators} />
          </Subsection>
          <Subsection heading={team.advisorsLabel}>
            <MemberRows members={current.advisors} />
          </Subsection>
        </div>
      </section>

      {/* Past members — the cohorts, as each group was, then the advisors
          who are not current members. */}
      <section id="past" className="border-t border-border bg-surface/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="fluid-h2 font-heading uppercase">Past members</h2>

          <Subsection heading="Cohorts" id="alumni">
            <AlumniSection />
          </Subsection>
          <Subsection heading={team.advisorsLabel}>
            <MemberGrid members={past.advisors} />
          </Subsection>
        </div>
      </section>

      {/* Partners & collaborators — the organisations behind the work, closing
          the page. One list, deliberately: `about` still holds founding
          partners, clients, and partners separately for /contact and the
          hidden /about page, but the client/partner split is not a distinction
          worth making to a visitor. The order is declared by `teamOrgs`. */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <h2 className="fluid-h2 font-heading uppercase">
              {team.orgs.heading}
            </h2>
          </Reveal>

          <div className="mt-10">
            <OrgShowcase items={teamOrgs} />
          </div>
        </div>
      </section>
    </>
  );
}
