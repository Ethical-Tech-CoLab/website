import Image from "next/image";
import { asset } from "@/lib/asset";
import type { Product } from "@/content/site";
import { Tilt3D } from "@/components/motion/Tilt3D";

/**
 * Larger art for the demos that have it, by repo name. The catalogue's own
 * posters (public/repos/<repoName>.jpg) are 600px wide because /portfolio
 * shows them in small cards, and that folder's size budget would shrink
 * anything bigger back down — so the wider versions live in public/home/,
 * which has no budget. A demo not listed here uses its catalogue poster.
 */
const WIDE_POSTER: Record<string, string> = {
  "mariupol-3d": "/home/mariupol-3d.jpg",
};

/**
 * One live demo as a home-page carousel card's picture: its poster art in a
 * browser-style window, big and centred in the column. The card's own button
 * goes under it.
 *
 * The window is there to say what the picture is — a running page, with its
 * address — and to give a bare screenshot an edge, a shadow and something to
 * sit on. The whole window is the link: it opens the demo itself.
 *
 * Built from the catalogue's own `Product`, so the name and the live URL
 * cannot drift from what /portfolio shows for the same demo.
 *
 * The catalogue posters are UI screenshots at 600px wide, which is enough
 * under a dark scrim but soft at this size; keep the text on the scrim, not
 * on the image.
 */
export function DemoPoster({ product }: { product: Product }) {
  // "Mariupol 3D — Agentic Evacuation Twins": the part before the dash is the
  // name, the part after it says what it is.
  const [title, subtitle] = product.name.split(" — ");
  // "https://ethical-tech-colab.github.io/mariupol-3d/" → the bare address.
  const address = (product.demo ?? "")
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");

  return (
    <div className="mx-auto w-full text-left md:w-[min(50vw,100%)]">
      <Tilt3D max={4}>
        {/* Half the window wide and, from the window's height, as tall as the
            window leaves room for: the room taken above it (header, eyebrow,
            heading) and below it (the button and the controls) is about 25rem,
            so the whole stack down to the controls fits one screen. That
            height includes the title bar. */}
        <a
          href={product.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex h-[clamp(18rem,calc(100svh-25rem),34rem)] flex-col overflow-hidden rounded-xl border border-border bg-[var(--poster-ground)] shadow-[0_24px_70px_-24px_color-mix(in_oklab,var(--glow)_60%,transparent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          {/* Fixed dark chrome rather than theme colours: it frames a dark
              screenshot, and has to read the same in both themes. */}
          <div className="flex h-9 shrink-0 items-center gap-3 border-b border-white/10 bg-[var(--poster-ground)] px-3.5 text-white/60">
            <span aria-hidden className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
            </span>
            <span
              aria-hidden
              className="flex min-w-0 flex-1 items-center justify-between gap-2 rounded-md bg-white/[0.07] px-3 py-1 text-xs transition-colors group-hover:bg-white/[0.12]"
            >
              <span className="truncate">{address}</span>
              <span className="shrink-0 transition-colors group-hover:text-[var(--poster-accent)]">
                ↗
              </span>
            </span>
            <span
              aria-hidden
              className="flex shrink-0 items-center gap-1.5 text-[0.65rem] uppercase tracking-[0.18em] text-[var(--poster-accent)]"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--poster-accent)] opacity-60 motion-reduce:animate-none" />
                <span className="relative h-2 w-2 rounded-full bg-[var(--poster-accent)]" />
              </span>
              Live
            </span>
          </div>

          <div className="relative isolate min-h-0 flex-1 overflow-hidden">
            <Image
              src={asset(
                WIDE_POSTER[product.repoName] ??
                  `/repos/${product.repoName}.jpg`,
              )}
              alt=""
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
            {/* Fixed dark scrim rather than a theme colour: white type over a
                screenshot has to hold in both themes. */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent"
            />
            <div className="relative flex h-full flex-col justify-end p-5 text-white md:p-7">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--poster-accent)]">
                {product.theme}
              </p>
              <p className="mt-2 font-heading text-[clamp(2.25rem,4.5vw,4rem)] uppercase leading-[0.92]">
                {title}
              </p>
              {subtitle && (
                <p className="mt-2 text-sm text-white/80 md:text-base">
                  {subtitle}
                </p>
              )}
              <span className="sr-only"> (opens in a new tab)</span>
            </div>
          </div>
        </a>
      </Tilt3D>
    </div>
  );
}
