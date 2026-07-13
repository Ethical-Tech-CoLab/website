"use client";

import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";

const TABS = [
  { label: "Overview", href: "/portfolio" },
  { label: "Live Demos", href: "/demos" },
  { label: "Publications", href: "/publications" },
];

/**
 * Secondary navigation shared by the Portfolio, Live Demos, and Publications
 * pages, presenting the three as sub-tabs of the Portfolio section.
 */
export function SectionTabs() {
  const pathname = usePathname();

  return (
    <div className="border-b border-border bg-background/80 backdrop-blur">
      <nav
        aria-label="Portfolio sections"
        className="mx-auto flex max-w-6xl gap-6 px-6"
      >
        {TABS.map((tab) => {
          const active =
            tab.href === "/portfolio"
              ? pathname === "/portfolio"
              : pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={active ? "page" : undefined}
              className={`-mb-px border-b-2 py-4 text-sm font-medium uppercase tracking-wider transition-colors ${
                active
                  ? "border-accent text-accent"
                  : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
