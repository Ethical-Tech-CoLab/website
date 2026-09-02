import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "next-view-transitions";
import { IssueFrame } from "@/components/IssueFrame";
import { Reveal } from "@/components/motion/Reveal";
import { asset } from "@/lib/asset";
import { newsletterIssues } from "@/content/newsletter";

export function generateStaticParams() {
  return newsletterIssues.map((issue) => ({ slug: issue.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const issue = newsletterIssues.find((i) => i.slug === slug);
  if (!issue) return {};
  return {
    title: `Newsletter · ${issue.date}`,
    description: issue.blurb,
  };
}

export default async function IssuePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const issue = newsletterIssues.find((i) => i.slug === slug);
  if (!issue) notFound();

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <span className="aura" />
        <div className="relative mx-auto max-w-6xl px-6 py-16">
          <Reveal>
            <p className="text-xs uppercase tracking-wider text-muted">
              Newsletter · Monthly Intelligence Brief
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-4 font-heading text-4xl uppercase leading-[0.95] sm:text-5xl">
              {issue.edition}
            </h1>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-12">
        <Reveal>
          <Link
            href="/newsletter"
            className="text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            ← All issues
          </Link>
        </Reveal>
        <div className="mt-6">
          <IssueFrame
            src={asset(`/newsletter/${issue.slug}.html`)}
            title={`Monthly Intelligence Brief — ${issue.date}`}
          />
        </div>
      </div>
    </>
  );
}
