import type { Metadata } from "next";
import { Link } from "next-view-transitions";
import { Reveal } from "@/components/motion/Reveal";
import { newsletterIssues } from "@/content/newsletter";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "The Monthly Intelligence Brief — one email a month on technology creating measurable impact for people, communities, and the planet. AI for good, humanitarian innovation, startups, opportunities, and tools.",
};

// TODO: replace ACCOUNT with the Ethical Tech CoLab Buttondown username
// (or swap this action for a Mailchimp / other provider embed). The hosted
// signup page, if one is ever linked, is https://buttondown.com/ACCOUNT.
const SUBSCRIBE_ACTION =
  "https://buttondown.com/api/emails/embed-subscribe/ACCOUNT";

export default function NewsletterPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <span className="aura" />
        <div className="relative mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <p className="text-xs uppercase tracking-wider text-muted">
              Newsletter · Monthly Intelligence Brief
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-4 fluid-hero font-heading uppercase leading-[0.9]">
              Technology that{" "}
              <span className="display-em">creates impact</span>.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
              One email a month: breakthrough AI for good, humanitarian
              innovation, exciting startups, research in plain English,
              opportunities for students and early-career professionals, and
              tools that make us better researchers. No model-release hype.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-6 sm:grid-cols-2">
          {newsletterIssues.map((issue) => (
            <Reveal key={issue.slug}>
              <Link
                href={`/newsletter/${issue.slug}`}
                className="card-glow flex h-full flex-col rounded-2xl border border-border bg-card p-7 transition-colors hover:border-border-strong"
              >
                <p className="font-mono text-xs text-accent">
                  {issue.edition}
                </p>
                <h3 className="mt-3 font-heading text-lg uppercase leading-snug tracking-wide">
                  Monthly Intelligence Brief
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {issue.blurb}
                </p>
                <span className="mt-auto pt-4 text-sm font-medium text-accent">
                  Read the issue →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="card-glow mt-20 rounded-2xl border border-border-strong bg-card p-8 sm:p-10">
            <h2 className="font-heading text-2xl uppercase tracking-wide">
              Subscribe
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
              Join the list to get each edition in your inbox. Free, one email a
              month, unsubscribe anytime.
            </p>
            <form
              action={SUBSCRIBE_ACTION}
              method="post"
              target="popupwindow"
              className="mt-6 flex flex-wrap gap-3"
            >
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                aria-label="Email address"
                className="min-w-[240px] flex-1 rounded-full border border-border bg-surface px-5 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
              />
              <button
                type="submit"
                className="btn-sweep inline-flex items-center gap-1 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-ink transition-transform hover:scale-[1.03]"
              >
                Subscribe <span aria-hidden>→</span>
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </>
  );
}
