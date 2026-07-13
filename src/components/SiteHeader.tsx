"use client";

import Image from "next/image";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { nav, site } from "@/content/site";
import { asset } from "@/lib/asset";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MobileNavSidebar } from "@/components/MobileNavSidebar";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="glass sticky top-0 z-50 border-b border-border">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <MobileNavSidebar />
          <Link
            href="/"
            className="flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.18em]"
          >
            <Image
              src={asset("/etc-logo.png")}
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 shrink-0 rounded-sm object-cover"
              aria-hidden
            />
            {site.name}
          </Link>
        </div>

        <div className="flex items-center gap-1">
          <ul className="hidden items-center gap-1 md:flex">
            {nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href) ||
                    // Portfolio stays active on its sub-tabs (Live Demos, Publications).
                    (item.href === "/portfolio" &&
                      (pathname.startsWith("/demos") ||
                        pathname.startsWith("/publications")));
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
            className="btn-sweep ml-2 inline-flex items-center gap-1 rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-accent-ink transition-transform hover:scale-[1.03]"
          >
            Contact <span aria-hidden>→</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
