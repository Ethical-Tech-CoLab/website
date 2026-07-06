"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, site } from "@/content/site";
import { asset } from "@/lib/asset";
import { ThemeToggle } from "@/components/ThemeToggle";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
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
