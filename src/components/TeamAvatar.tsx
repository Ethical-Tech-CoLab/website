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
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          style={{ opacity: loaded ? 1 : 0 }}
          className="absolute inset-0 h-full w-full rounded-full object-cover transition-opacity duration-200"
        />
      )}
    </span>
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
