"use client";

import { useState } from "react";
import { Link } from "next-view-transitions";
import { cohortTerms, team } from "@/content/site";
import { Avatar } from "@/components/TeamAvatar";

const CHEVRON =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23b8d400' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M6 9l6 6 6-6'/></svg>\")";

export function ResearchersExplorer() {
  const [term, setTerm] = useState(cohortTerms[cohortTerms.length - 1]);
  const visible = team.researchers.filter(
    (member) => (member.term ?? cohortTerms[cohortTerms.length - 1]) === term,
  );

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted">
            Applied AI Researchers
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            {team.researchersLabel}
          </h2>
        </div>
        <select
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          aria-label="Filter researchers by cohort"
          className="cursor-pointer appearance-none rounded-full border border-border bg-surface px-4 py-2 pr-8 font-mono text-sm text-foreground transition-colors hover:border-accent focus:border-accent focus:outline-none"
          style={{
            backgroundImage: CHEVRON,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 0.75rem center",
            backgroundSize: "0.875rem",
          }}
        >
          {cohortTerms.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

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
            <h3 className="mt-4 text-xl font-semibold leading-tight tracking-tight">
              {member.name}
            </h3>
            <p className="mt-1 text-sm text-accent">{member.role}</p>
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
