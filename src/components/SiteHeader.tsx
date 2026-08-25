"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { nav, site } from "@/content/site";
import { asset } from "@/lib/asset";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MobileNavSidebar } from "@/components/MobileNavSidebar";

export function SiteHeader() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // Close any open dropdown on navigation. Adjusting state during render is
  // React's documented way to reset on a changed value; doing it in an effect
  // would leave the stale menu on screen for a frame after the route changes.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setOpenMenu(null);
  }

  // Close on outside click / Escape.
  useEffect(() => {
    if (!openMenu) return;
    const onPointer = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenMenu(null);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [openMenu]);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname.startsWith(href) ||
        // Portfolio stays active on its sub-tabs (Live Demos, Publications).
        (href === "/portfolio" &&
          (pathname.startsWith("/demos") ||
            pathname.startsWith("/publications") ||
            pathname.startsWith("/media") ||
            pathname.startsWith("/newsletter")));

  return (
    <header className="glass sticky top-0 z-50 border-b border-border">
      <nav
        ref={navRef}
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
      >
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
              const active = isActive(item.href);
              const itemClass = `rounded-full px-3 py-1.5 text-sm transition-colors ${
                active ? "text-foreground" : "text-muted hover:text-foreground"
              }`;

              if (item.children) {
                const open = openMenu === item.label;
                return (
                  <li
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => setOpenMenu(item.label)}
                    onMouseLeave={() => setOpenMenu(null)}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpenMenu(null)}
                      aria-haspopup="menu"
                      aria-expanded={open}
                      className={`inline-flex items-center gap-1 ${itemClass}`}
                    >
                      {item.label}
                      {/* An inline SVG, not a "▾" character.
                          next/font subsets Space Mono to latin, latin-ext and
                          vietnamese, and the generated @font-face declares a
                          matching unicode-range. U+25BE sits outside every one
                          of those ranges, so the browser was never allowed to
                          use Space Mono for it and silently substituted a
                          system font — a different typeface at a different
                          optical size, sitting on its own baseline, next to
                          text that is Space Mono. Drawing the caret removes the
                          dependency on what the visitor's OS happens to ship. */}
                      <svg
                        aria-hidden
                        viewBox="0 0 12 12"
                        className={`h-3 w-3 shrink-0 transition-transform ${
                          open ? "rotate-180" : ""
                        }`}
                      >
                        <path d="M2.5 4.75h7L6 9.25z" fill="currentColor" />
                      </svg>
                    </Link>
                    {open && (
                      <div className="absolute left-0 top-full min-w-[180px] pt-2">
                        <div className="glass overflow-hidden rounded-xl border border-border p-1 shadow-lg">
                          {item.children.map((child) => (
                            <Link
                              key={child.href + child.label}
                              href={child.href}
                              onClick={() => setOpenMenu(null)}
                              className="block rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-surface hover:text-foreground"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </li>
                );
              }

              return (
                <li key={item.href}>
                  <Link href={item.href} className={itemClass}>
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
