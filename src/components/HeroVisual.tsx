import Link from "next/link";

/**
 * The hero's featured card: a purple gradient panel with an abstract green
 * waveform and the current-cohort overlay, mirrors the Lovable template.
 */
export function HeroVisual({
  term,
  caption,
  href = "/#cohorts",
}: {
  term: string;
  caption: string;
  /** Where the overlay links. Defaults to the cohorts strip further down the
   *  home page; the current cohort points at its own report instead. */
  href?: string;
}) {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border">
      {/* gradient ground */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(150deg, #3b1878 0%, #241533 55%, #160d1c 100%)",
        }}
      />

      {/* waveform */}
      <svg
        aria-hidden
        viewBox="0 0 400 300"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full opacity-90"
      >
        {Array.from({ length: 60 }).map((_, i) => {
          const x = (i / 59) * 400;
          const phase = Math.sin(i * 0.5) + Math.sin(i * 0.17) * 0.6;
          const h = 30 + Math.abs(phase) * 70;
          return (
            <line
              key={i}
              x1={x}
              y1={150 - h / 2}
              x2={x}
              y2={150 + h / 2}
              stroke="#c8f04b"
              strokeWidth={2.5}
              strokeLinecap="round"
              opacity={0.55 + Math.abs(phase) * 0.25}
              style={{
                transformBox: "fill-box",
                transformOrigin: "center",
                animation: `wave-osc ${2.6 + (i % 5) * 0.35}s ease-in-out ${
                  (i % 12) * 0.12
                }s infinite`,
              }}
            />
          );
        })}
      </svg>

      {/* current-cohort overlay */}
      <Link
        href={href}
        className="absolute inset-x-4 bottom-4 rounded-xl border border-border bg-background/70 p-5 backdrop-blur-md transition-colors hover:border-accent"
      >
        <p className="text-[0.65rem] uppercase tracking-[0.2em] text-muted">
          Current cohort
        </p>
        <p className="mt-1 font-serif text-2xl font-semibold tracking-tight">
          {term}
        </p>
        <p className="mt-1 text-sm text-muted">{caption}</p>
      </Link>
    </div>
  );
}
