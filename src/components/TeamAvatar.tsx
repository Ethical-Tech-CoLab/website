"use client";

import { useState } from "react";
import { asset } from "@/lib/asset";

export function Avatar({
  initials,
  photo,
  name,
  size = 48,
}: {
  initials: string;
  photo?: string;
  name?: string;
  size?: number;
}) {
  // Initials sit underneath as the base; the photo is layered on top and only
  // becomes visible once it loads successfully. A missing/broken file therefore
  // never flashes — the initials just stay showing. (No photo -> initials only.)
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <span
      aria-hidden
      style={{ width: size, height: size }}
      className="relative grid shrink-0 place-items-center overflow-hidden rounded-full border border-border bg-surface text-sm font-semibold text-accent"
    >
      {initials}
      {photo && !failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={asset(photo)}
          alt={name ? `${name} headshot` : "headshot"}
          width={size}
          height={size}
          loading="lazy"
          // A cached image can already be complete before React attaches
          // onLoad, in which case that event never fires and the photo stays
          // at opacity 0 for good. Catching it on the ref covers that case;
          // onLoad still covers the one that is genuinely still loading.
          ref={(el) => {
            if (el?.complete && el.naturalWidth > 0) setLoaded(true);
          }}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          style={{ opacity: loaded ? 1 : 0 }}
          className="absolute inset-0 h-full w-full rounded-full object-cover transition-opacity duration-200"
        />
      )}
    </span>
  );
}

/**
 * A person's LinkedIn, as an icon button.
 *
 * It used to render as the words "LinkedIn ↗" stacked under "View profile",
 * which put a link to someone's actual profile at the bottom of a column of
 * small grey text. The mark is recognised instantly and gives a proper tap
 * target, so it sits on the same row as the profile link instead.
 *
 * Renders nothing without a href, so a member with no LinkedIn on file simply
 * has no icon rather than a dead one.
 */
export function LinkedInLink({
  href,
  name,
  className = "",
}: {
  href?: string;
  name?: string;
  className?: string;
}) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={name ? `${name} on LinkedIn` : "LinkedIn profile"}
      title={name ? `${name} on LinkedIn` : "LinkedIn profile"}
      className={`inline-grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent focus-visible:border-accent focus-visible:outline-none ${className}`}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="h-3.5 w-3.5">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.75C24 .78 23.2 0 22.22 0Z" />
      </svg>
    </a>
  );
}

/** Renders a bio string, splitting blank-line-separated paragraphs. */
export function Bio({ text, className }: { text: string; className?: string }) {
  return (
    <div className={className}>
      {text.split(/\n\n+/).map((para, i) => (
        <p key={i} className={i > 0 ? "mt-3" : undefined}>
          {para}
        </p>
      ))}
    </div>
  );
}
