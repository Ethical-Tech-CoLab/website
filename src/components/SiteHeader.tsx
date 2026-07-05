"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, site } from "@/content/site";
import { ThemeToggle } from "@/components/ThemeToggle";

/** CGA badge + Microsoft mark lockup — the founding-partners badge from the Summer '26 deck. */
function PartnerLockup() {
  return (
    <span className="flex items-center gap-1.5" aria-hidden>
      <span className="flex flex-col items-center justify-center rounded-sm bg-secondary px-1.5 py-1 leading-none">
        <span className="text-[0.4rem] font-semibold uppercase tracking-wider text-white/75">
          NYU SPS
        </span>
        <span className="text-[0.65rem] font-bold tracking-wide text-white">
          CGA
        </span>
      </span>
      <svg width="18" height="18" viewBox="0 0 26 26" className="shrink-0">
        <rect x="0" y="0" width="12" height="12" fill="#f25022" />
        <rect x="14" y="0" width="12" height="12" fill="#7fba00" />
        <rect x="0" y="14" width="12" height="12" fill="#00a4ef" />
        <rect x="14" y="14" width="12" height="12" fill="#ffb900" />
      </svg>
    </span>
  );
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.18em]"
        >
          <PartnerLockup />
          {site.name}
        </Link>

        <div className="flex items-center gap-1">
          <ul className="hidden items-center gap-1 md:flex">
            {nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                      active
                        ? "text-foreground"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ThemeToggle />
          <Link
            href="/contact"
            className="ml-2 inline-flex items-center gap-1 rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            Contact <span aria-hidden>→</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
