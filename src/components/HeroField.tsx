"use client";

import { useEffect, useRef } from "react";

/**
 * A live contour field: ~26 horizontal lines drifting like a slow current,
 * deflecting gently away from the pointer (lerped, so it lags like liquid).
 * CPU canvas, no WebGL. Honors reduced-motion (single static frame), pauses
 * off-screen and when the tab is hidden, and drifts autonomously on touch.
 */
export function HeroField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    const parent = canvas.parentElement!;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    // Theme-aware colors, re-read when data-theme flips.
    let violet = "#7b5cff";
    let lime = "#c8f04b";
    function readColors() {
      const s = getComputedStyle(document.documentElement);
      violet = (s.getPropertyValue("--glow") || violet).trim();
      lime = (s.getPropertyValue("--accent") || lime).trim();
    }
    readColors();
    const themeObs = new MutationObserver(readColors);
    themeObs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const LINES = 26;
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    function onMove(e: PointerEvent) {
      const r = canvas.getBoundingClientRect();
      pointer.tx = e.clientX - r.left;
      pointer.ty = e.clientY - r.top;
    }
    function onLeave() {
      pointer.tx = -9999;
      pointer.ty = -9999;
    }
    if (!coarse) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerleave", onLeave);
    }
    window.addEventListener("resize", resize);

    let raf = 0;
    let t = 0;
    let visible = true;

    function hexToRgba(hex: string, a: number) {
      const m = hex.replace("#", "");
      const v =
        m.length === 3
          ? m.split("").map((c) => c + c).join("")
          : m.padEnd(6, "0").slice(0, 6);
      const n = parseInt(v, 16);
      return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
    }

    function frame() {
      // Ease pointer toward target (liquid lag).
      pointer.x += (pointer.tx - pointer.x) * 0.1;
      pointer.y += (pointer.ty - pointer.y) * 0.1;

      ctx.clearRect(0, 0, w, h);
      const step = 2;
      const spacing = h / (LINES - 1);

      for (let i = 0; i < LINES; i++) {
        const baseY = i * spacing;
        const isLime = i % 7 === 3;
        ctx.beginPath();
        for (let x = 0; x <= w; x += step) {
          const phase = t * 0.4 + i * 0.5;
          let y =
            baseY +
            Math.sin(x * 0.006 + phase) * 10 +
            Math.sin(x * 0.013 - phase * 0.7) * 6;

          // pointer deflection
          const dx = x - pointer.x;
          const dy = baseY - pointer.y;
          const dist2 = dx * dx + dy * dy;
          const R = 200;
          if (dist2 < R * R) {
            const f = 1 - Math.sqrt(dist2) / R;
            y += Math.sign(dy || 1) * f * f * 34;
          }
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = isLime
          ? hexToRgba(lime, 0.3)
          : hexToRgba(violet, 0.16);
        ctx.lineWidth = isLime ? 1.4 : 1;
        ctx.stroke();
      }

      t += 0.016;
      if (visible && !reduce) raf = requestAnimationFrame(frame);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !reduce) {
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(frame);
        } else {
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    function onVis() {
      if (document.hidden) cancelAnimationFrame(raf);
      else if (visible && !reduce) raf = requestAnimationFrame(frame);
    }
    document.addEventListener("visibilitychange", onVis);

    // First paint (also the only paint under reduced motion).
    frame();
    if (reduce) cancelAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      themeObs.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
