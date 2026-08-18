import { Link } from "next-view-transitions";

/**
 * The switch between the two home page layouts, `/` and `/home-carousel`.
 *
 * One component rather than a button written out on each page, so the pair
 * cannot drift apart: both sides read the same, sit in the same place under
 * the eyebrow, and only the destination differs. Drop this — and the route it
 * points at — once the comparison is settled.
 */
export function HomeViewToggle({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="mt-4 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
    >
      Change Home Page View
    </Link>
  );
}
