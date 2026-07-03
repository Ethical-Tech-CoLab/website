/**
 * Per-research-area diagram visuals — inspired by the MIT AI Risk Initiative
 * "Tools & Data" cards: a distinctive, mostly-abstract schematic per project on
 * a dark panel. Everything is drawn with `currentColor`/CSS variables so the
 * art tracks the active theme (lime-on-purple in dark, olive on light).
 *
 * viewBox is a shared 320×140; each variant is keyed by ResearchArea.key.
 */

const VB = "0 0 320 140";
const FONT = "var(--font-space-mono), ui-monospace, monospace";

function Title({ children }: { children: string }) {
  return (
    <text
      x="14"
      y="16"
      fill="var(--muted)"
      fontSize="8"
      letterSpacing="1.4"
      style={{ fontFamily: FONT, textTransform: "uppercase" }}
    >
      {children}
    </text>
  );
}

/** Small lime "verified" badge: ringed circle with a check. */
function CheckBadge({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <circle r="7" fill="var(--background)" stroke="var(--accent)" strokeWidth="1.4" />
      <path
        d="M -3 0 L -0.8 2.4 L 3.4 -2.6"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

/* ── 01 · Evacuation — information-quality grid feeding an EII gauge ── */
function Evacuation() {
  // 5 columns × 4 rows; numbers = fill opacity, "x" = missing (dashed) tile.
  const tiles: (number | "x")[] = [
    0.8, 0.55, 0.75, "x", 0.6,
    0.5, 0.9, 0.65, "x", 0.7,
    0.65, 0.45, "x", 0.6, 0.85,
    0.7, 0.6, 0.4, 0.7, "x",
  ];
  const cols = 5;
  const s = 20;
  const gap = 6;
  const x0 = 14;
  const y0 = 26;

  return (
    <>
      <Title>Information Quality · By Zone</Title>
      {tiles.map((t, i) => {
        const cx = x0 + (i % cols) * (s + gap);
        const cy = y0 + Math.floor(i / cols) * (s + gap);
        return t === "x" ? (
          <rect
            key={i}
            x={cx}
            y={cy}
            width={s}
            height={s}
            rx="4"
            fill="none"
            stroke="var(--muted)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
        ) : (
          <rect
            key={i}
            x={cx}
            y={cy}
            width={s}
            height={s}
            rx="4"
            fill="var(--accent)"
            opacity={t}
          />
        );
      })}

      {/* connectors from grid to gauge */}
      <path d="M 138 55 C 165 55 175 78 199 84" fill="none" stroke="var(--muted)" strokeWidth="1" opacity="0.55" />
      <path d="M 138 96 C 168 96 178 96 199 92" fill="none" stroke="var(--muted)" strokeWidth="1" opacity="0.55" />

      {/* gauge */}
      <path d="M 199 100 A 46 46 0 0 1 291 100" fill="none" stroke="var(--border)" strokeWidth="6" strokeLinecap="round" />
      <path d="M 199 100 A 46 46 0 0 1 266 59" fill="none" stroke="var(--accent)" strokeWidth="6" strokeLinecap="round" />
      <line x1="245" y1="100" x2="266" y2="61" stroke="var(--foreground)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="245" cy="100" r="3.5" fill="var(--foreground)" />
      <text x="245" y="52" fill="var(--muted)" fontSize="7.5" letterSpacing="1.6" textAnchor="middle" style={{ fontFamily: FONT }}>
        INDEX
      </text>
      <text x="245" y="122" fill="var(--accent)" fontSize="15" fontWeight="700" textAnchor="middle" style={{ fontFamily: FONT }}>
        EII
      </text>
      <text x="245" y="134" fill="var(--muted)" fontSize="6.5" letterSpacing="0.8" textAnchor="middle" style={{ fontFamily: FONT }}>
        QUALITY · ACCESS · EQUITY
      </text>
    </>
  );
}

/* ── 02 · Cultural heritage — verifiable provenance chain across a border ── */
function CulturalHeritage() {
  const blocks = [
    { x: 46, label: "ORIGIN" },
    { x: 112, label: "TRANSFER" },
    { x: 178, label: "CUSTODY" },
    { x: 244, label: "RETURN" },
  ];
  const by = 84;
  const bs = 26;
  return (
    <>
      <Title>Provenance · Verified Chain</Title>

      {/* dashed "border" the artifact crosses */}
      <line x1="145" y1="30" x2="145" y2="118" stroke="var(--muted)" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />

      {/* provenance arc linking first → last block */}
      <path d="M 46 72 C 90 42 200 42 244 72" fill="none" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 3" opacity="0.55" />

      {/* ledger blocks + connectors */}
      {blocks.map((b, i) => (
        <g key={b.label}>
          {i > 0 && (
            <line
              x1={blocks[i - 1].x + bs / 2}
              y1={by + bs / 2}
              x2={b.x - bs / 2}
              y2={by + bs / 2}
              stroke="var(--muted)"
              strokeWidth="1"
              opacity="0.6"
            />
          )}
          <rect x={b.x - bs / 2} y={by} width={bs} height={bs} rx="5" fill="var(--surface)" stroke="var(--accent)" strokeWidth="1.4" opacity={0.5 + i * 0.14} />
          <text x={b.x} y={by + bs + 11} fill="var(--muted)" fontSize="6.5" letterSpacing="0.6" textAnchor="middle" style={{ fontFamily: FONT }}>
            {b.label}
          </text>
        </g>
      ))}

      {/* passport / credential shield with a verified check */}
      <g transform="translate(266,44)">
        <path d="M 0 -14 L 13 -8 L 13 6 C 13 14 7 19 0 22 C -7 19 -13 14 -13 6 L -13 -8 Z" fill="var(--surface)" stroke="var(--accent)" strokeWidth="1.4" />
        <path d="M -5 2 L -1.5 6 L 6 -4" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </>
  );
}

/* ── 03 · Traceability — origin signals through a chain of custody to shelf ── */
function Traceability() {
  const inputs = [
    { label: "MATERIALS", y: 50 },
    { label: "LABOR", y: 78 },
    { label: "IMPACT", y: 106 },
  ];
  const nodes = [
    { cx: 150, label: "SOURCE", kind: "box" as const },
    { cx: 200, label: "PROCESS", kind: "arrow" as const },
    { cx: 250, label: "TRANSPORT", kind: "arrow" as const },
    { cx: 300, label: "SHELF", kind: "shelf" as const },
  ];
  const ny = 78;
  const ns = 24;
  return (
    <>
      <Title>Auditable Traceability · Origin → Shelf</Title>

      {/* input signals converging */}
      {inputs.map((inp) => (
        <g key={inp.label}>
          <text x="14" y={inp.y + 3} fill="var(--muted)" fontSize="6.5" letterSpacing="0.6" style={{ fontFamily: FONT }}>
            {inp.label}
          </text>
          <circle cx="66" cy={inp.y} r="2.5" fill="var(--accent)" />
          <path d={`M 66 ${inp.y} C 100 ${inp.y} 108 ${ny} 138 ${ny}`} fill="none" stroke="var(--muted)" strokeWidth="1" opacity="0.6" />
        </g>
      ))}

      {nodes.map((n, i) => (
        <g key={n.label}>
          {i > 0 && (
            <g stroke="var(--muted)" strokeWidth="1" opacity="0.7">
              <line x1={nodes[i - 1].cx + ns / 2} y1={ny} x2={n.cx - ns / 2} y2={ny} />
              <path d={`M ${n.cx - ns / 2 - 4} ${ny - 3} L ${n.cx - ns / 2} ${ny} L ${n.cx - ns / 2 - 4} ${ny + 3}`} fill="none" />
            </g>
          )}
          <rect
            x={n.cx - ns / 2}
            y={ny - ns / 2}
            width={ns}
            height={ns}
            rx="5"
            fill="var(--surface)"
            stroke="var(--accent)"
            strokeWidth={n.kind === "shelf" ? 1.8 : 1.4}
          />
          {n.kind === "arrow" && (
            <path d={`M ${n.cx - 4} ${ny - 4} L ${n.cx + 4} ${ny} L ${n.cx - 4} ${ny + 4}`} fill="none" stroke="var(--foreground)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          )}
          {n.kind === "shelf" && (
            <g stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round">
              <line x1={n.cx - 5} y1={ny - 3} x2={n.cx + 5} y2={ny - 3} />
              <line x1={n.cx - 5} y1={ny + 3} x2={n.cx + 5} y2={ny + 3} />
            </g>
          )}
          {n.kind !== "shelf" && <CheckBadge x={n.cx} y={ny - ns / 2 - 3} />}
          <text
            x={n.cx}
            y={ny + ns / 2 + 12}
            fill={n.kind === "shelf" ? "var(--accent)" : "var(--muted)"}
            fontSize="6.5"
            letterSpacing="0.5"
            textAnchor="middle"
            style={{ fontFamily: FONT }}
          >
            {n.label}
          </text>
        </g>
      ))}
    </>
  );
}

/* ── 04 · Diplomacy — multi-agent negotiation branching into rehearsed scenarios ── */
function Diplomacy() {
  const table = { x: 120, y: 74 };
  const agents = [
    { x: 52, y: 44, label: "AGENT A" },
    { x: 52, y: 104, label: "AGENT B" },
    { x: 188, y: 74, label: "MEDIATOR" },
  ];
  const leaves = [42, 74, 106];
  return (
    <>
      <Title>Scenario · Multi-Agent Rehearsal</Title>

      {/* links agents → table */}
      {agents.map((a) => (
        <line key={a.label} x1={a.x} y1={a.y} x2={table.x} y2={table.y} stroke="var(--muted)" strokeWidth="1" opacity="0.6" />
      ))}

      {/* central negotiation table */}
      <circle cx={table.x} cy={table.y} r="15" fill="var(--surface)" stroke="var(--accent)" strokeWidth="1.6" />
      <circle cx={table.x} cy={table.y} r="4" fill="var(--accent)" />

      {/* agent nodes */}
      {agents.map((a) => (
        <g key={a.label}>
          <circle cx={a.x} cy={a.y} r="11" fill="var(--surface)" stroke="var(--accent)" strokeWidth="1.4" />
          <circle cx={a.x} cy={a.y - 2} r="3" fill="var(--accent)" />
          <path d={`M ${a.x - 5} ${a.y + 6} C ${a.x - 5} ${a.y + 1} ${a.x + 5} ${a.y + 1} ${a.x + 5} ${a.y + 6}`} fill="var(--accent)" />
          <text x={a.x} y={a.y + 22} fill="var(--muted)" fontSize="6" letterSpacing="0.5" textAnchor="middle" style={{ fontFamily: FONT }}>
            {a.label}
          </text>
        </g>
      ))}

      {/* scenario branch tree off the mediator */}
      {leaves.map((ly, i) => (
        <g key={i}>
          <path d={`M 199 74 C 230 74 232 ${ly} 262 ${ly}`} fill="none" stroke="var(--muted)" strokeWidth="1" opacity="0.55" />
          <circle cx="266" cy={ly} r="4" fill="none" stroke="var(--accent)" strokeWidth="1.4" />
        </g>
      ))}
      <text x="286" y="77" fill="var(--muted)" fontSize="6.5" letterSpacing="0.6" textAnchor="middle" transform="rotate(90 286 77)" style={{ fontFamily: FONT }}>
        OUTCOMES
      </text>
    </>
  );
}

const VARIANTS: Record<string, () => React.ReactElement> = {
  Evacuation,
  "Cultural heritage": CulturalHeritage,
  Traceability,
  Diplomacy,
};

export function ProjectDiagram({
  variant,
  className = "",
}: {
  variant: string;
  className?: string;
}) {
  const Art = VARIANTS[variant];
  return (
    <div className={className}>
      <svg viewBox={VB} className="h-full w-full" role="img" aria-label={`${variant} project diagram`}>
        {Art ? <Art /> : null}
      </svg>
    </div>
  );
}
