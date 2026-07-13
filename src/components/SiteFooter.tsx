import { Link } from "next-view-transitions";
import { nav, site } from "@/content/site";

type IconProps = { className?: string };

function GitHubIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 .5C5.73.5.67 5.57.67 11.85c0 5.02 3.26 9.28 7.78 10.79.57.1.78-.25.78-.55v-1.94c-3.16.69-3.83-1.53-3.83-1.53-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.68 1.25 3.33.96.1-.74.4-1.25.72-1.54-2.52-.29-5.17-1.26-5.17-5.61 0-1.24.44-2.25 1.17-3.05-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.15 1.17a10.9 10.9 0 0 1 2.87-.39c.97 0 1.95.13 2.87.39 2.19-1.48 3.15-1.17 3.15-1.17.62 1.57.23 2.73.11 3.02.73.8 1.17 1.81 1.17 3.05 0 4.36-2.66 5.31-5.19 5.6.41.35.78 1.05.78 2.12v3.14c0 .3.2.66.79.55a11.36 11.36 0 0 0 7.77-10.79C23.33 5.57 18.27.5 12 .5Z" />
    </svg>
  );
}

function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.62c-3.15 0-3.52.01-4.76.07-1.15.05-1.77.24-2.19.41-.55.21-.94.47-1.35.88-.41.41-.67.8-.88 1.35-.17.42-.36 1.04-.41 2.19-.06 1.24-.07 1.61-.07 4.76s.01 3.52.07 4.76c.05 1.15.24 1.77.41 2.19.21.55.47.94.88 1.35.41.41.8.67 1.35.88.42.17 1.04.36 2.19.41 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c1.15-.05 1.77-.24 2.19-.41.55-.21.94-.47 1.35-.88.41-.41.67-.8.88-1.35.17-.42.36-1.04.41-2.19.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.05-1.15-.24-1.77-.41-2.19a3.63 3.63 0 0 0-.88-1.35 3.63 3.63 0 0 0-1.35-.88c-.42-.17-1.04-.36-2.19-.41-1.24-.06-1.61-.07-4.76-.07Zm0 2.76a5.3 5.3 0 1 1 0 10.6 5.3 5.3 0 0 1 0-10.6Zm0 1.62a3.68 3.68 0 1 0 0 7.36 3.68 3.68 0 0 0 0-7.36Zm5.5-2.9a1.24 1.24 0 1 1 0 2.48 1.24 1.24 0 0 1 0-2.48Z" />
    </svg>
  );
}

function XIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M18.9 2H22l-7.4 8.46L23.34 22h-6.83l-5.35-6.99L4.99 22H1.85l7.92-9.05L1 2h7l4.83 6.39L18.9 2Zm-1.2 18h1.9L7.4 3.9H5.36L17.7 20Z" />
    </svg>
  );
}

function LinkedInIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.75C24 .78 23.2 0 22.22 0Z" />
    </svg>
  );
}

const socials = [
  { key: "linkedin", href: site.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  { key: "github", href: site.social.github, label: "GitHub", Icon: GitHubIcon },
  { key: "instagram", href: site.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { key: "twitter", href: site.social.twitter, label: "X (Twitter)", Icon: XIcon },
].filter((s) => s.href);

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="max-w-sm">
            <p className="text-base font-semibold">{site.name}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {site.footerBlurb}
            </p>
            <p className="mt-4 text-xs uppercase tracking-wider text-muted">
              {site.partnersLine}
            </p>

            <div className="mt-5 flex items-center gap-3">
              {socials.map(({ key, href, label, Icon }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-muted">Navigate</p>
            <ul className="mt-4 space-y-2 text-sm">
              {[...nav.filter((item) => item.href !== "/"), { href: "/contact", label: "Contact" }].map(
                (item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-foreground/90 transition-colors hover:text-accent"
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-muted">Connect</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-foreground/90 transition-colors hover:text-accent"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <Link
                  href="/#newsletter"
                  className="text-foreground/90 transition-colors hover:text-accent"
                >
                  Join the newsletter ↗
                </Link>
              </li>
              <li>
                <a
                  href="https://www.sps.nyu.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/90 transition-colors hover:text-accent"
                >
                  NYU SPS ↗
                </a>
              </li>
              <li>
                <a
                  href="https://www.sps.nyu.edu/about/academic-divisions-and-departments/center-for-global-affairs.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/90 transition-colors hover:text-accent"
                >
                  NYU CGA ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} NYU Ethical Tech CoLab</span>
          <span>{site.cohortRange}</span>
        </div>

        {/* Legal disclaimers */}
        <div className="mt-6 space-y-3 border-t border-border pt-6 text-[11px] leading-relaxed text-muted/80">
          {site.legal.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>
    </footer>
  );
}
