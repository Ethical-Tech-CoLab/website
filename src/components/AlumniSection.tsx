import { Link } from "next-view-transitions";
import { cohortTerms, team, type TeamMember } from "@/content/site";
import { Avatar, LinkedInLink } from "@/components/TeamAvatar";
import { byLastName } from "@/lib/team";

/**
 * The cohort columns under Past members on /team: every cohort so far, one
 * column per term (most recent first, in surname order within each), side by
 * side and scrolling sideways when they run past the page. Each card is a
 * headshot, a name linking to the full profile, and a LinkedIn link.
 *
 * Each column is a record of that group as it was, so someone who is a
 * current member now is still listed in the cohort they came through.
 *
 * Renders the row only; the page supplies the heading above it.
 */
export function AlumniSection() {
  const byTerm = [...cohortTerms]
    .reverse()
    .map((term) => ({
      term,
      members: team.researchers.filter((m) => m.term === term).sort(byLastName),
    }))
    .filter((group) => group.members.length > 0);

  if (byTerm.length === 0) return null;

  return (
    <>
      {/* One column per cohort, side by side. The row scrolls sideways
            once there are more cohorts than fit, rather than wrapping: a
            reader moves through the cohorts in order. It takes focus so the
            arrow keys can scroll it too.

            On a wide screen three columns fill the row exactly, so the
            section is as wide as the ones around it; a fourth scrolls in
            from the right. Each column after the first has a hairline
            divider down the middle of the gap before it, drawn as an
            overlay so it takes no width of its own. Narrower screens keep
            fixed-width columns and scroll sooner. */}
      <div
        role="region"
        aria-label="Cohorts"
        tabIndex={0}
        className="flex snap-x gap-16 overflow-x-auto pb-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        {byTerm.map((group) => (
          <div
            key={group.term}
            id={`alumni-${group.term.toLowerCase().replace(/\s+/g, "-")}`}
            className="relative w-72 shrink-0 snap-start scroll-mt-24 not-first:before:absolute not-first:before:inset-y-0 not-first:before:-left-8 not-first:before:w-px not-first:before:bg-border sm:w-80 lg:w-[max(18rem,calc((100%-8rem)/3))]"
          >
            <h4 className="font-heading text-xl uppercase leading-none tracking-[0.06em] text-foreground sm:text-2xl">
              {group.term}
            </h4>

            {/* One box per cohort, built like the Advisors and
                  Collaborators grids: cells on the border colour with a 1px gap,
                  so the gaps read as hairlines between them.

                  A photo, a name, and LinkedIn: the cell is the way to the
                  profile, and the profile carries the bio. The cell is a
                  wrapper, not one big Link, because the LinkedIn anchor sits
                  inside it and an anchor cannot nest in an anchor; the name's
                  link covers the cell through its inset overlay, and draws
                  the focus ring inside the cell's edge, where the box's
                  rounded clip cannot cut it off. */}
            <ul className="mt-6 flex flex-col gap-px overflow-hidden rounded-2xl border border-border bg-border">
              {group.members.map((member: TeamMember) => (
                <li
                  key={member.name}
                  className="relative flex items-center gap-4 bg-background p-4 transition-colors hover:bg-surface/60"
                >
                  <Avatar
                    initials={member.initials}
                    photo={member.photo}
                    name={member.name}
                    size={80}
                  />
                  <Link
                    href={`/team/${member.slug}`}
                    className="font-semibold leading-tight tracking-tight after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:-outline-offset-2 focus-visible:after:outline-accent"
                  >
                    {member.name}
                  </Link>
                  {/* In the bottom-right corner, above the card-wide
                        overlay so the icon stays clickable. */}
                  <LinkedInLink
                    href={member.linkedin}
                    name={member.name}
                    className="relative z-10 ml-auto shrink-0 self-end"
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
