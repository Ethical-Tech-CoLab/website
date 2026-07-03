/**
 * The Summer '26 Tech Rehearsal signature background: two crossing ribbons of
 * offset lime strokes that fade out as they stack. Purely decorative — sits
 * behind hero content. Stroke color follows the current accent so it adapts to
 * light and dark themes.
 */
export function WaveBackground({
  className = "",
  opacity = 1,
}: {
  className?: string;
  opacity?: number;
}) {
  // Two ribbons: the first (w1) rises, the second (w2) crosses it descending.
  const ribbon1 = Array.from({ length: 15 }, (_, i) => ({
    dy: -8 * i,
    op: Math.max(0.1, 0.9 - i * 0.055),
  }));
  const ribbon2 = Array.from({ length: 10 }, (_, i) => ({
    dy: 8 * i,
    op: Math.max(0.06, 0.7 - i * 0.065),
  }));

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity }}
    >
      <svg
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        className="absolute h-[140%] w-[140%] -top-[20%] -left-[20%]"
      >
        <defs>
          <path id="etc-w1" d="M -150,480 C 100,280 300,580 520,380 S 780,120 1050,300" />
          <path id="etc-w2" d="M -150,180 C 150,380 380,80 600,260 S 880,460 1150,220" />
        </defs>
        {ribbon1.map((r, i) => (
          <use
            key={`w1-${i}`}
            href="#etc-w1"
            stroke="var(--accent)"
            strokeWidth="1.1"
            opacity={r.op}
            transform={`translate(0,${r.dy})`}
          />
        ))}
        {ribbon2.map((r, i) => (
          <use
            key={`w2-${i}`}
            href="#etc-w2"
            stroke="var(--accent)"
            strokeWidth="1.1"
            opacity={r.op}
            transform={`translate(0,${r.dy})`}
          />
        ))}
      </svg>
    </div>
  );
}
