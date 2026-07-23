import type { TableData } from "@/content/publications/types";

/**
 * A publication data table. Shared by ReportBody (for tables that stand on
 * their own) and ReportChart (for the disclosure that carries a chart's
 * underlying figures), so the two never drift apart.
 *
 * Scrolls inside its own container so the page body never scrolls
 * horizontally on narrow screens.
 */
export function DataTable({
  data,
  caption = true,
}: {
  data: TableData;
  /** Set false when the caption is already shown by the surrounding figure. */
  caption?: boolean;
}) {
  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-card">
            <tr>
              {data.headers.map((h, n) => (
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
            {data.rows.map((row, r) => (
              <tr key={r} className="border-b border-border last:border-0">
                {row.map((cell, c) => (
                  <td
                    key={c}
                    className="px-4 py-3 align-top text-foreground/85 tabular-nums"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && data.caption && (
        <figcaption className="mt-3 text-sm text-muted">
          {data.caption}
        </figcaption>
      )}
    </>
  );
}
