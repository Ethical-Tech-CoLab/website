import type { ChartBlock } from "@/content/publications/types";
import { DataTable } from "@/components/DataTable";

/**
 * Charts for the publication reports.
 *
 * Everything here is plain HTML and CSS on the theme tokens: no chart
 * library, no client JavaScript, which keeps the static export small and
 * lets the marks track the light/dark themes for free.
 *
 * Mark specs are fixed across the four forms: 12px bars with a 4px rounded
 * data-end and a square baseline, 10px dots carrying a 2px ring in the
 * surface colour, a 2px surface gap between touching stack segments, and no
 * gridlines, since every value is directly labelled.
 *
 * Series colours come from --chart-1 and --chart-2, which are the lime and
 * violet brand hues snapped to steps that clear the palette checks against
 * the card surface in both themes. See the note in globals.css.
 */

const BAR = "h-3"; // 12px, under the 24px cap
const DOT = 10; // px, over the 8px minimum

/** Percentage of the axis a value occupies, floored so a very small value
 *  still leaves a visible mark rather than disappearing. */
function pct(value: number, max: number) {
  if (max <= 0) return 0;
  return Math.max(0, Math.min(100, (value / max) * 100));
}

interface LegendItem {
  label: string;
  color: string;
  /** "band" draws the swatch as a short bar, matching the shape of the mark
   *  it stands for. A wash is too faint to read as a 10px dot. */
  shape?: "dot" | "band";
}

function Legend({ items }: { items: LegendItem[] }) {
  return (
    <ul className="mb-6 flex flex-wrap gap-x-5 gap-y-2">
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-2 text-xs text-muted">
          <span
            aria-hidden
            className={`inline-block shrink-0 ${
              item.shape === "band" ? "h-2.5 w-6 rounded-sm" : "h-2.5 w-2.5 rounded-full"
            }`}
            style={{ background: item.color }}
          />
          {item.label}
        </li>
      ))}
    </ul>
  );
}

/** The label line above each row's mark: name on the left, value on the
 *  right. Values live here rather than on the marks because several of these
 *  charts cluster their marks tightly, where riding labels would collide. */
function RowHeader({
  label,
  value,
  muted,
}: {
  label: string;
  value: string;
  muted?: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="text-sm text-foreground/85">{label}</span>
      <span className="shrink-0 font-mono text-xs tabular-nums text-foreground/70">
        {value}
        {muted && <span className="text-muted"> {muted}</span>}
      </span>
    </div>
  );
}

function Note({ children }: { children: string }) {
  return <p className="mt-1.5 text-xs leading-relaxed text-muted">{children}</p>;
}

/** The track a bar or dot sits on. */
function Track({ children }: { children?: React.ReactNode }) {
  return (
    <div
      className={`relative mt-2 w-full rounded-sm ${BAR}`}
      style={{ background: "var(--chart-track)" }}
    >
      {children}
    </div>
  );
}

/** A dot on a dumbbell or range row. The ring is drawn in the card colour so
 *  the dot stays readable where it overlaps the connector or the band. */
function Dot({ left, color }: { left: number; color: string }) {
  return (
    <span
      aria-hidden
      className="absolute top-1/2 rounded-full"
      style={{
        left: `${left}%`,
        width: DOT,
        height: DOT,
        marginLeft: -DOT / 2,
        marginTop: -DOT / 2,
        background: color,
        boxShadow: "0 0 0 2px var(--card)",
      }}
    />
  );
}

export function ReportChart({ chart }: ChartBlock) {
  const c1 = "var(--chart-1)";
  const c2 = "var(--chart-2)";

  let legend: LegendItem[] = [];
  let body: React.ReactNode = null;

  if (chart.kind === "bars") {
    // One series, so no legend: the caption already says what is plotted.
    const max = chart.max ?? Math.max(...chart.rows.map((r) => r.value));
    body = chart.rows.map((row) => (
      <div key={row.label} className="mt-6 first:mt-0">
        <RowHeader label={row.label} value={row.valueLabel} />
        <Track>
          <div
            className="h-full rounded-r-[4px]"
            style={{
              width: `${pct(row.value, max)}%`,
              minWidth: 2,
              background: c1,
            }}
            title={`${row.label}: ${row.valueLabel}`}
          />
        </Track>
        {row.note && <Note>{row.note}</Note>}
      </div>
    ));
  }

  if (chart.kind === "stack") {
    legend = [
      { label: chart.keys[0], color: c1 },
      { label: chart.keys[1], color: c2 },
    ];
    const totals = chart.rows.map((r) => r.parts[0] + r.parts[1]);
    const max = chart.max ?? Math.max(...totals);
    body = chart.rows.map((row, i) => {
      const total = totals[i];
      return (
        <div key={row.label} className="mt-6 first:mt-0">
          <RowHeader label={row.label} value={row.valueLabel} />
          <Track>
            <div
              className="flex h-full"
              style={{ width: `${pct(total, max)}%`, minWidth: 2 }}
              title={`${row.label}: ${row.valueLabel}`}
            >
              <div
                style={{
                  width: `${(row.parts[0] / total) * 100}%`,
                  background: c1,
                }}
              />
              {/* The 2px gap between segments is a border in the card colour,
                  not a stroke around the segment. */}
              <div
                className="rounded-r-[4px]"
                style={{
                  width: `${(row.parts[1] / total) * 100}%`,
                  background: c2,
                  borderLeft: "2px solid var(--card)",
                }}
              />
            </div>
          </Track>
          {row.note && <Note>{row.note}</Note>}
        </div>
      );
    });
  }

  if (chart.kind === "dumbbell") {
    legend = [
      { label: chart.keys[0], color: c1 },
      { label: chart.keys[1], color: c2 },
    ];
    const max =
      chart.max ??
      Math.max(...chart.rows.flatMap((r) => [r.a, r.b ?? 0]));
    body = chart.rows.map((row) => {
      const a = pct(row.a, max);
      const b = row.b === undefined ? undefined : pct(row.b, max);
      return (
        <div key={row.label} className="mt-6 first:mt-0">
          <RowHeader
            label={row.label}
            value={row.aLabel}
            muted={row.bLabel ? `vs ${row.bLabel}` : row.missingLabel}
          />
          <Track>
            {b !== undefined && (
              <span
                aria-hidden
                className="absolute top-1/2 h-px -translate-y-1/2"
                style={{
                  left: `${Math.min(a, b)}%`,
                  width: `${Math.abs(a - b)}%`,
                  background: "var(--muted)",
                }}
              />
            )}
            <Dot left={a} color={c1} />
            {b !== undefined && <Dot left={b} color={c2} />}
          </Track>
          {row.note && <Note>{row.note}</Note>}
        </div>
      );
    });
  }

  if (chart.kind === "range") {
    legend = [
      ...(chart.bandKey
        ? [
            {
              label: chart.bandKey,
              color: "var(--chart-wash)",
              shape: "band" as const,
            },
          ]
        : []),
      { label: chart.pointKey, color: c1 },
    ];
    const max =
      chart.max ?? Math.max(...chart.rows.map((r) => r.high ?? r.point));
    body = chart.rows.map((row) => {
      const hasBand = row.low !== undefined && row.high !== undefined;
      return (
        <div key={row.label} className="mt-6 first:mt-0">
          <RowHeader label={row.label} value={row.pointLabel} />
          <Track>
            {hasBand && (
              <span
                aria-hidden
                className="absolute inset-y-0 rounded-sm"
                style={{
                  left: `${pct(row.low as number, max)}%`,
                  width: `${
                    pct(row.high as number, max) - pct(row.low as number, max)
                  }%`,
                  background: "var(--chart-wash)",
                }}
              />
            )}
            <Dot left={pct(row.point, max)} color={c1} />
          </Track>
          {row.note && <Note>{row.note}</Note>}
        </div>
      );
    });
  }

  return (
    <figure className="rounded-2xl border border-border bg-card p-6 sm:p-7">
      {legend.length > 0 && <Legend items={legend} />}
      <div>{body}</div>
      {chart.caption && (
        <figcaption className="mt-7 border-t border-border pt-4 text-sm leading-relaxed text-muted">
          {chart.caption}
        </figcaption>
      )}
      {/* The figures behind the graphic, always available and never gated. */}
      <details className="group mt-4">
        <summary className="cursor-pointer list-none text-xs uppercase tracking-wider text-accent marker:content-none">
          <span className="link-underline">
            Data table <span aria-hidden>▸</span>
          </span>
        </summary>
        <div className="mt-4">
          <DataTable data={chart.data} caption={false} />
        </div>
      </details>
    </figure>
  );
}
