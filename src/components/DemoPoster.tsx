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
  "agentic-language-development": "/home/agentic-language-development.jpg",
  "diplomatic-simulator": "/home/diplomatic-simulator.jpg",
};

/**
 * Where each picture is anchored when it is cropped to fill the frame. The
 * default keeps the top, which is where a poster's title art sits; a screenshot
 * whose content is in the middle is anchored there instead.
 */
const FRAME_POSITION: Record<string, string> = {
  "diplomatic-simulator": "object-center",
};

/**
 * One live demo as a home-page carousel card's picture: its poster art, big
 * and centred in the column. The card's own button goes under it.
 *
 * The picture carries the card on its own; the demo's name is still in the
 * card's heading, which is visually hidden here, and in the link's label for
 * screen readers.
 *
 * Built from the catalogue's own `Product`, so the live URL cannot drift from
 * what /portfolio shows for the same demo.
 */
export function DemoPoster({ product }: { product: Product }) {
  return (
    <div className="mx-auto w-full text-left md:w-[min(50vw,100%)]">
      <Tilt3D max={4}>
        {/* Half the column wide and, from the frame's height, as tall as the
            frame leaves room for: the room taken above it (header, eyebrow,
            heading) and below it (the button and the controls) is about 25rem,
            so the whole stack down to the controls fits one screen. */}
        <a
          href={product.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex h-[clamp(18rem,calc(100svh-25rem),34rem)] flex-col overflow-hidden rounded-xl border border-border bg-[var(--poster-ground)] shadow-[0_24px_70px_-24px_color-mix(in_oklab,var(--glow)_60%,transparent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <div className="relative min-h-0 flex-1 overflow-hidden">
            <Image
              src={asset(
                WIDE_POSTER[product.repoName] ??
                  `/repos/${product.repoName}.jpg`,
              )}
              alt=""
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100 ${
                FRAME_POSITION[product.repoName] ?? "object-top"
              }`}
            />
          </div>
          <span className="sr-only">{product.name} (opens in a new tab)</span>
        </a>
      </Tilt3D>
    </div>
  );
}
