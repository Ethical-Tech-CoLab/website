import { team, type TeamMember } from "@/content/site";

/** Trim a bio to a short card blurb without cutting a word in half. */
export function excerpt(bio: string, max = 150): string {
  const firstPara = bio.split("\n").find(Boolean) ?? bio;
  if (firstPara.length <= max) return firstPara;
  const cut = firstPara.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(" ")).trimEnd() + "…";
}

function getAllTeamMembers(): TeamMember[] {
  return [
    team.founder as TeamMember,
    ...team.advisors,
    ...team.residentFellows,
    ...team.researchers,
    ...team.collaborators,
  ];
}

/** Unique slugs across all non-founder team members, for generateStaticParams. */
export function getTeamMemberSlugs(): string[] {
  const slugs = new Set<string>();
  for (const member of getAllTeamMembers()) {
    if (member.slug) slugs.add(member.slug);
  }
  return [...slugs];
}

/**
 * A person can appear in more than one list (e.g. a staff member who is also
 * a researcher). When that happens, prefer the record with a real bio.
 */
export function findTeamMemberBySlug(slug: string): TeamMember | undefined {
  const matches = getAllTeamMembers().filter((member) => member.slug === slug);
  return matches.find((member) => member.bio) ?? matches[0];
}
