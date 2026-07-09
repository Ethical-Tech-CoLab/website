import { newsletter } from "@/content/site";

/**
 * Mailchimp embedded signup. Renders a real POST form once
 * `newsletter.action` (and the anti-bot `hiddenField`) are set in site.ts;
 * until then it shows a disabled "coming soon" state so the section still lays
 * out correctly. The form posts directly to Mailchimp (target=_blank), which
 * works on a static export — no server needed.
 */
export function NewsletterSignup() {
  const configured = Boolean(newsletter.action);

  return (
    <section
      id="newsletter"
      className="scroll-mt-24 border-t border-border bg-surface/40"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-[1fr_1fr] md:items-center">
        <div className="max-w-md">
          <p className="text-xs uppercase tracking-wider text-muted">
            {newsletter.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            {newsletter.heading}
          </h2>
          <p className="mt-5 leading-relaxed text-muted">{newsletter.body}</p>
        </div>

        <div className="md:justify-self-end md:w-full md:max-w-sm">
          {configured ? (
            <form
              action={newsletter.action}
              method="post"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-3 sm:flex-row"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                name="EMAIL"
                required
                placeholder="you@example.com"
                className="min-w-0 flex-1 rounded-full border border-border bg-background px-5 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
              />
              {/* Mailchimp anti-bot honeypot — must stay off-screen, not display:none. */}
              {newsletter.hiddenField && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-[-5000px]"
                >
                  <input
                    type="text"
                    name={newsletter.hiddenField}
                    tabIndex={-1}
                    defaultValue=""
                    autoComplete="off"
                  />
                </div>
              )}
              <button
                type="submit"
                className="shrink-0 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
              >
                {newsletter.cta}
              </button>
            </form>
          ) : (
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                disabled
                placeholder="you@example.com"
                aria-label="Email address (signup coming soon)"
                className="min-w-0 flex-1 cursor-not-allowed rounded-full border border-border bg-background px-5 py-3 text-sm text-muted opacity-70"
              />
              <span className="inline-flex shrink-0 items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-semibold text-muted">
                Coming soon
              </span>
            </div>
          )}
          <p className="mt-3 text-xs text-muted">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
