import Image from "next/image";
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
  if (photo) {
    return (
      <Image
        src={asset(photo)}
        alt={name ? `${name} headshot` : "headshot"}
        width={size}
        height={size}
        style={{ width: size, height: size }}
        className="shrink-0 rounded-full border border-border object-cover"
      />
    );
  }
  return (
    <span
      aria-hidden
      style={{ width: size, height: size }}
      className="grid shrink-0 place-items-center rounded-full border border-border bg-surface text-sm font-semibold text-accent"
    >
      {initials}
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
