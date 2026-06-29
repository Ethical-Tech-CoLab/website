import Link from "next/link";
import { nav, site } from "@/content/site";

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
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/90 transition-colors hover:text-accent"
                >
                  LinkedIn ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} NYU Ethical Tech CoLab</span>
          <span>{site.cohortRange}</span>
        </div>
      </div>
    </footer>
  );
}
