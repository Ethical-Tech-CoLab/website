/**
 * A slowly rotating 3D wireframe globe built entirely from CSS 3D transforms —
 * no WebGL, no bundle cost. Meridian + latitude rings in the theme colors, with
 * a few orbiting nodes. Decorative; hidden from assistive tech and paused under
 * reduced motion (via the global reduced-motion rule).
 */
export function WireframeGlobe({ className = "" }: { className?: string }) {
  const meridians = 9;
  const latitudes = [-52, -26, 0, 26, 52];
  const nodes = [
    { lat: -20, lon: 40 },
    { lat: 30, lon: 120 },
    { lat: 10, lon: 220 },
    { lat: -40, lon: 300 },
    { lat: 50, lon: 180 },
  ];

  return (
    <div aria-hidden className={`globe-scene ${className}`}>
      <div className="globe-spin">
        {/* meridian rings — one highlighted "prime meridian" makes the spin visible */}
        {Array.from({ length: meridians }).map((_, i) => (
          <span
            key={`m${i}`}
            className={`globe-ring globe-meridian${i === 0 ? " globe-prime" : ""}`}
            style={{ transform: `rotateY(${(i * 180) / meridians}deg)` }}
          />
        ))}
        {/* latitude rings */}
        {latitudes.map((lat, i) => {
          const scale = Math.cos((lat * Math.PI) / 180);
          const y = Math.sin((lat * Math.PI) / 180);
          return (
            <span
              key={`l${i}`}
              className="globe-ring globe-latitude"
              style={{
                transform: `rotateX(90deg) translateZ(${y * -140}px) scale(${scale})`,
              }}
            />
          );
        })}
        {/* orbiting nodes on the surface */}
        {nodes.map((n, i) => {
          const r = 140;
          const latR = (n.lat * Math.PI) / 180;
          const lonR = (n.lon * Math.PI) / 180;
          const x = r * Math.cos(latR) * Math.cos(lonR);
          const y = r * Math.sin(latR);
          const z = r * Math.cos(latR) * Math.sin(lonR);
          return (
            <span
              key={`n${i}`}
              className="globe-node"
              style={{ transform: `translate3d(${x}px, ${y}px, ${z}px)` }}
            />
          );
        })}
      </div>
    </div>
  );
}
