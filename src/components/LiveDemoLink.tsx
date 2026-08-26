import { Link } from "next-view-transitions";
import { products } from "@/content/site";

/**
 * The "See the live demo" button for a report page, looked up by slug.
 *
 * The Live Demos catalogue already points at the report behind each project
 * (see DemoRunner). This is the same edge walked the other way, so a reader
 * who arrives at the write-up first can go and run the thing. The catalogue is
 * the single source for the pairing: a product's `publication` field is what
 * creates the link in both directions, and a report nothing points at simply
 * gets no button.
 */
export function LiveDemoLink({ slug }: { slug: string }) {
  const product = products.find(
    (p) => p.publication === `/publications/${slug}`,
  );
  if (!product) return null;

  // A project with one hosted URL links straight to it. One with several has
  // no single "the demo", so it goes to its entry in the catalogue instead,
  // where they are all listed with their labels.
  const single = product.demo ?? (product.demos?.length === 1 ? href(product.demos[0]) : null);

  const className =
    "btn-sweep inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-border-strong";

  if (!single) {
    return (
      <Link href="/demos" className={className}>
        See it running <span aria-hidden>→</span>
      </Link>
    );
  }

  return (
    <a
      href={single}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      See the live demo <span aria-hidden>↗</span>
    </a>
  );
}

/** A demo entry is either a bare URL, a labelled link, or a group of them. */
function href(entry: NonNullable<(typeof products)[number]["demos"]>[number]) {
  if (typeof entry === "string") return entry;
  return "href" in entry ? entry.href : null;
}
