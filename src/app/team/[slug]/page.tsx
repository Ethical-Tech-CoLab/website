import type { Metadata } from "next";
import { Link } from "next-view-transitions";
import { notFound } from "next/navigation";
import { Avatar, Bio } from "@/components/TeamAvatar";
import { findTeamMemberBySlug, getTeamMemberSlugs } from "@/lib/team";

export function generateStaticParams() {
  return getTeamMemberSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const member = findTeamMemberBySlug(slug);
  if (!member) return {};
  return {
    title: member.name,
    description: member.bio ?? member.role,
  };
}

export default async function TeamMemberPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = findTeamMemberBySlug(slug);
  if (!member) notFound();

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <Link
          href="/team"
          className="text-sm text-muted transition-colors hover:text-accent"
        >
          ← Back to team
        </Link>

        <div className="mt-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <Avatar
            initials={member.initials}
            photo={member.photo}
            name={member.name}
            size={120}
          />
          <div>
            <h1 className="text-4xl font-semibold tracking-tight">
              {member.name}
            </h1>
            <p className="mt-2 text-accent">{member.role}</p>
            {member.org && (
              <p className="mt-1 text-sm text-foreground/70">{member.org}</p>
            )}
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm text-muted transition-colors hover:text-accent"
              >
                LinkedIn ↗
              </a>
            )}
          </div>
        </div>

        <Bio
          text={member.bio ?? "Bio coming soon."}
          className="mt-10 max-w-2xl leading-relaxed text-foreground/80"
        />
      </div>
    </section>
  );
}
