"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import type { ReactNode } from "react";
import { useRef } from "react";

/**
 * Pointer-driven 3D tilt. The card rotates toward the cursor in perspective,
 * and also drives `--mx/--my` so a `.card-glow` inside reacts, plus a subtle
 * moving sheen. Children can opt into parallax depth with the `.depth` utility
 * (translateZ). Disabled under reduced motion and on touch (no hover).
 */
export function Tilt3D({
  children,
  className = "",
  max = 9,
  glare = true,
  disabled = false,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
  disabled?: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 170, damping: 16, mass: 0.5 });
  const sry = useSpring(ry, { stiffness: 170, damping: 16, mass: 0.5 });

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (reduce || !el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width; // 0..1
    const py = (e.clientY - r.top) / r.height; // 0..1
    ry.set((px - 0.5) * 2 * max);
    rx.set((0.5 - py) * 2 * max);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    if (glare) {
      el.style.setProperty("--gx", `${px * 100}%`);
      el.style.setProperty("--gy", `${py * 100}%`);
      el.style.setProperty("--gop", "1");
    }
  }
  function reset() {
    rx.set(0);
    ry.set(0);
    ref.current?.style.setProperty("--gop", "0");
  }

  if (disabled) {
    return <div className={`h-full ${className}`}>{children}</div>;
  }

  return (
    <div className="tilt-scene h-full">
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
        className={`tilt-card h-full ${glare ? "tilt-glare" : ""} ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
}
