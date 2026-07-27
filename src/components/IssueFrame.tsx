"use client";

import { useRef, useState } from "react";

/**
 * Embeds a bundled newsletter issue (public/newsletter/*.html) inline in the
 * site. The issue keeps its own visual identity; we auto-size the iframe to its
 * content height. Same-origin, so reading the inner scrollHeight is allowed.
 */
export function IssueFrame({ src, title }: { src: string; title: string }) {
  const ref = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(1200);

  const resize = () => {
    const doc = ref.current?.contentWindow?.document;
    if (doc) setHeight(doc.documentElement.scrollHeight);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <iframe
        ref={ref}
        src={src}
        title={title}
        onLoad={resize}
        loading="lazy"
        className="w-full"
        style={{ height, border: 0 }}
      />
    </div>
  );
}
