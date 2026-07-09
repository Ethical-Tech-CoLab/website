"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { asset } from "@/lib/asset";
import type { PartnerOrg } from "@/content/site";

function monogram(name: string) {
  const words = name.replace(/[^\w\s]/g, " ").split(/\s+/).filter(Boolean);
  const letters = (words[0]?.[0] ?? "") + (words[1]?.[0] ?? "");
  return (letters || name.slice(0, 2)).toUpperCase();
}

function Logo({ org, size }: { org: PartnerOrg; size: number }) {
  if (org.logo) {
    return (
      <Image
        src={asset(org.logo)}
        alt={`${org.name} logo`}
        width={size}
        height={size}
        style={{ width: size, height: size }}
        className="shrink-0 rounded-xl border border-border bg-white object-contain p-2"
      />
    );
  }
  return (
    <span
      aria-hidden
      style={{ width: size, height: size }}
      className="grid shrink-0 place-items-center rounded-xl border border-border bg-surface font-heading uppercase tracking-wide text-accent"
    >
      {monogram(org.name)}
    </span>
  );
}

/**
 * A grid of clickable org cards (clients / partners). Clicking one opens a
 * modal with its logo, description, and a link. Closes on backdrop click or Esc.
 */
export function OrgShowcase({
  items,
  className = "sm:grid-cols-2 lg:grid-cols-3",
}: {
  items: PartnerOrg[];
  className?: string;
}) {
  const [active, setActive] = useState<PartnerOrg | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <>
      <div className={`grid gap-4 ${className}`}>
        {items.map((org) => (
          <button
            key={org.name}
            type="button"
            onClick={() => setActive(org)}
            aria-label={`View details for ${org.name}`}
            className="card-glow group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 text-left transition-colors hover:border-border-strong"
          >
            <Logo org={org} size={56} />
            <span className="min-w-0">
              <span className="block truncate font-semibold">{org.name}</span>
              <span className="text-xs text-muted transition-colors group-hover:text-accent">
                View details →
              </span>
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setActive(null)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={active.name}
              initial={{ scale: 0.95, y: 12, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
              >
                ✕
              </button>
              <Logo org={active} size={80} />
              <h3 className="mt-5 font-heading text-2xl uppercase tracking-wide">
                {active.name}
              </h3>
              {active.about && (
                <p className="mt-3 leading-relaxed text-muted">{active.about}</p>
              )}
              {active.url ? (
                <a
                  href={active.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-sweep mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-ink transition-transform hover:scale-[1.03]"
                >
                  Visit site <span aria-hidden>↗</span>
                </a>
              ) : (
                <p className="mt-6 text-xs uppercase tracking-wider text-muted">
                  Website coming soon
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
