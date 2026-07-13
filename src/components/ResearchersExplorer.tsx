import { Link } from "next-view-transitions";
import { cohortTerms, team } from "@/content/site";
import { Avatar } from "@/components/TeamAvatar";

const CURRENT_TERM = cohortTerms[cohortTerms.length - 1];

export function ResearchersExplorer() {
  // Current cohort only — previous cohorts live in the Alumni section.
  const visible = team.researchers.filter(
    (member) => (member.term ?? CURRENT_TERM) === CURRENT_TERM,
  );

  return (
    <section id="researchers" className="mx-auto max-w-6xl px-6 py-20">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted">
            Applied AI Researchers · {CURRENT_TERM}
          </p>
          <h2 className="mt-3 fluid-h2 font-heading uppercase">
            {team.researchersLabel}
          </h2>
        </div>
      </div>

      <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/75">
        Our graduate student researchers are conducting applied AI research — building
        with open-source tools, generating synthetic data, integrating LLMs, and
        making sense of fragmented data.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((member) => (
          <Link
            key={member.name}
            href={`/team/${member.slug}`}
            className="group card-glow flex flex-col items-start rounded-2xl border border-border bg-card p-6 transition-colors hover:border-border-strong"
          >
            <Avatar
              initials={member.initials}
              photo={member.photo}
              name={member.name}
              size={112}
            />
            <h3 className="mt-4 font-sans text-lg font-semibold leading-tight tracking-tight">
              {member.name}
            </h3>
            {member.term && (
              <p className="mt-1 font-mono text-xs text-muted">{member.term}</p>
            )}
            <span className="mt-4 inline-block text-sm text-muted transition-colors group-hover:text-accent">
              View profile →
            </span>
          </Link>
        ))}

        {visible.length === 0 && (
          <p className="col-span-full py-16 text-muted">
            No researchers listed for this cohort yet.
          </p>
        )}
      </div>
    </section>
  );
}
