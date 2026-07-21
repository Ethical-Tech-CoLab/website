import type { Paragraph } from "@/content/publications/types";

/**
 * Renders the body of a publication section.
 *
 * Reports are transcribed from markdown papers that use prose, labelled
 * entries, lists, tables, and the occasional formula. This component is the
 * single place those block types are styled, so every report page renders
 * them identically.
 */
export function ReportBody({ paragraphs }: { paragraphs: Paragraph[] }) {
  return (
    <div className="mt-6 space-y-5 leading-relaxed text-foreground/85">
      {paragraphs.map((para, i) => {
        if (typeof para === "string") {
          return <p key={i}>{para}</p>;
        }

        if ("lead" in para) {
          return (
            <p key={i}>
              <span className="font-semibold text-accent">{para.lead}</span>{" "}
              {para.text}
            </p>
          );
        }

        if ("formula" in para) {
          return (
            <div key={i} className="rounded-xl border border-border bg-card p-5">
              <p className="overflow-x-auto font-mono text-sm text-foreground/90">
                {para.formula}
              </p>
              {para.note && (
                <p className="mt-3 text-sm text-muted">{para.note}</p>
              )}
            </div>
          );
        }

        if ("list" in para) {
          const items = para.list.map((item, n) => (
            <li key={n} className="pl-1">
              {item}
            </li>
          ));
          return (
            <div key={i}>
              {para.intro && <p className="mb-3">{para.intro}</p>}
              {para.ordered ? (
                <ol className="list-decimal space-y-2 pl-6 marker:font-mono marker:text-accent">
                  {items}
                </ol>
              ) : (
                <ul className="list-disc space-y-2 pl-6 marker:text-accent">
                  {items}
                </ul>
              )}
            </div>
          );
        }

        // Table. Scrolls inside its own container so the page body never
        // scrolls horizontally on narrow screens.
        return (
          <figure key={i}>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-card">
                  <tr>
                    {para.table.headers.map((h, n) => (
                      <th
                        key={n}
                        scope="col"
                        className="whitespace-nowrap border-b border-border px-4 py-3 font-heading text-xs uppercase tracking-wider text-accent"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {para.table.rows.map((row, r) => (
                    <tr key={r} className="border-b border-border last:border-0">
                      {row.map((cell, c) => (
                        <td
                          key={c}
                          className="px-4 py-3 align-top text-foreground/85"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {para.table.caption && (
              <figcaption className="mt-3 text-sm text-muted">
                {para.table.caption}
              </figcaption>
            )}
          </figure>
        );
      })}
    </div>
  );
}
