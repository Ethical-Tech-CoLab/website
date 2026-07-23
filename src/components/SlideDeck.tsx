import type { SummitDeck } from "@/content/site";

/**
 * A Google Slides deck embedded in a 16:9 frame, with the source deck linked
 * underneath for anyone who wants it full-screen or presenter-mode.
 *
 * The deck must be shared as "anyone with the link can view" — Slides serves
 * the /embed URL to signed-out visitors only when it is.
 */
export function SlideDeck({ deck }: { deck: SummitDeck }) {
  const embedSrc = `https://docs.google.com/presentation/d/${deck.id}/embed?start=false&loop=false&delayms=5000`;
  const openSrc = `https://docs.google.com/presentation/d/${deck.id}/view`;

  return (
    <figure className="card-glow overflow-hidden rounded-2xl border border-border bg-card">
      <div className="relative aspect-video w-full bg-secondary">
        <iframe
          src={embedSrc}
          title={deck.title}
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
      <figcaption className="flex flex-wrap items-start justify-between gap-4 border-t border-border p-6">
        <div>
          <p className="font-mono text-xs text-accent">{deck.term}</p>
          <h3 className="mt-2 font-heading text-lg uppercase leading-snug tracking-wide">
            {deck.title}
          </h3>
          {deck.blurb && (
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
              {deck.blurb}
            </p>
          )}
        </div>
        <a
          href={openSrc}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-full border border-border px-4 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          Open in Slides ↗
        </a>
      </figcaption>
    </figure>
  );
}
