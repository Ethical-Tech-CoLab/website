import { Link } from "next-view-transitions";
import { cohortTerms, team, type TeamMember } from "@/content/site";
import { Avatar } from "@/components/TeamAvatar";
import { excerpt } from "@/lib/team";

const CURRENT_TERM = cohortTerms[cohortTerms.length - 1];

/**
 * Alumni — researchers from previous cohorts, grouped by term (most recent
 * first). Each card shows a headshot, role, and a short bio excerpt, and links
 * to the person's full profile.
 */
export function AlumniSection() {
  // Past terms, newest first, excluding the current cohort.
  const pastTerms = cohortTerms
    .filter((t) => t !== CURRENT_TERM)
    .reverse();

  const byTerm = pastTerms
    .map((term) => ({
      term,
      members: team.researchers.filter((m) => m.term === term),
    }))
    .filter((group) => group.members.length > 0);

  if (byTerm.length === 0) return null;

  return (
    <section id="alumni" className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-xs uppercase tracking-wider text-muted">
          Team · Previous cohorts
        </p>
        <h2 className="mt-3 fluid-h2 font-heading uppercase">Alumni</h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">
          Each cohort seeds on what the previous cohort worked on.
        </p>

        {byTerm.map((group) => (
          <div
            key={group.term}
            id={`alumni-${group.term.toLowerCase().replace(/\s+/g, "-")}`}
            className="mt-14 scroll-mt-24 first:mt-12"
          >
            <div className="flex items-center gap-4">
              <h3 className="font-heading text-xl uppercase tracking-wide text-accent">
                {group.term}
              </h3>
              <span className="h-px flex-1 bg-border" />
              <span className="font-mono text-xs text-muted">
                {group.members.length}{" "}
                {group.members.length === 1 ? "researcher" : "researchers"}
              </span>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {group.members.map((member: TeamMember) => (
                <Link
                  key={member.name}
                  href={`/team/${member.slug}`}
                  className="group card-glow flex flex-col items-start rounded-2xl border border-border bg-card p-6 transition-colors hover:border-border-strong"
                >
                  <Avatar
                    initials={member.initials}
                    photo={member.photo}
                    name={member.name}
                    size={96}
                  />
                  <h4 className="mt-4 text-lg font-semibold leading-tight tracking-tight">
                    {member.name}
                  </h4>
                  {member.bio && (
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {excerpt(member.bio)}
                    </p>
                  )}
                  <span className="mt-4 inline-block text-sm text-muted transition-colors group-hover:text-accent">
                    View profile →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
