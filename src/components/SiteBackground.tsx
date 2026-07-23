"use client";

import { usePathname } from "next/navigation";
import { asset } from "@/lib/asset";

/**
 * A faint photographic ground behind the whole site.
 *
 * The site's atmosphere is the dark-purple ground plus the drifting `.aura`
 * and the film grain. This adds one more layer under all of that: an NYU /
 * Greenwich Village photograph, heavily desaturated and washed with the same
 * purple, sitting at high transparency so it reads as texture rather than as a
 * picture. It is fixed, so content scrolls over a still backdrop, and it is
 * purely decorative (aria-hidden, pointer-events: none).
 *
 * One image is chosen per top-level section so the site feels varied without
 * ever competing with the content. Swap or extend the map freely — every file
 * lives in public/backgrounds/.
 */
const BY_SECTION: Record<string, string> = {
  "": "washington-square-arch", // home
  about: "washington-square-arch-tall",
  team: "nyu-subway", // people in motion under the NYU sign
  publications: "washington-square-aerial", // the park from above
  portfolio: "washington-square-arch-tall",
  demos: "washington-square-arch-tall",
  media: "nyu-subway",
  contact: "washington-square-arch",
};

function imageFor(pathname: string): string {
  // First path segment, with the "/website" base path (prod) already stripped
  // by Next before usePathname returns, so we only strip a leading slash.
  const seg = pathname.replace(/^\/+/, "").split("/")[0] ?? "";
  return BY_SECTION[seg] ?? "washington-square-arch";
}

export function SiteBackground() {
  const pathname = usePathname();
  const name = imageFor(pathname);

  return (
    <div aria-hidden className="site-bg">
      <div
        key={name}
        className="site-bg__img"
        style={{
          backgroundImage: `url(${asset(`/backgrounds/${name}.jpg`)})`,
        }}
      />
      <div className="site-bg__scrim" />
    </div>
  );
}
