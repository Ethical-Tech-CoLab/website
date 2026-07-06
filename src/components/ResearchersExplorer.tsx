"use client";

import { useState } from "react";
import Link from "next/link";
import { cohortTerms, team } from "@/content/site";
import { Avatar, Bio } from "@/components/TeamAvatar";

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

      <div className="mt-12 divide-y divide-border border-y border-border">
        {visible.map((member) => (
          <div
            key={member.name}
            className="flex flex-col gap-6 py-10 sm:flex-row sm:gap-10"
          >
            <div className="sm:w-52 sm:shrink-0">
              <Link href={`/team/${member.slug}`} aria-label={`View ${member.name}'s profile`}>
                <Avatar
                  initials={member.initials}
                  photo={member.photo}
                  name={member.name}
                  size={120}
                />
                <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-tight">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm text-accent">{member.role}</p>
              </Link>
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block truncate text-sm text-muted transition-colors hover:text-accent"
                >
                  LinkedIn ↗
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

        {visible.length === 0 && (
          <p className="py-16 text-muted">No researchers listed for this cohort yet.</p>
        )}
      </div>
    </section>
  );
}
