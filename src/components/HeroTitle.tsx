"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Kinetic hero lockup. The wordmark reveals line-by-line behind a clip mask;
 * the mission line resolves after it, with "human" settling into the accent.
 * Reduced motion collapses to a simple fade.
 */
export function HeroTitle() {
  const reduce = useReducedMotion();

  const line = (delay: number) => ({
    initial: { y: reduce ? 0 : "110%", opacity: reduce ? 0 : 1 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.8, ease: EASE, delay },
  });

  return (
    <div className="text-center">
      <p className="text-xs uppercase tracking-[0.25em] text-accent">
        NYU CGA × Microsoft
      </p>

      <h1 className="mt-6 fluid-hero font-heading uppercase">
        <span className="block overflow-hidden">
          <motion.span className="block" {...line(0.05)}>
            Ethical Tech
          </motion.span>
        </span>
        <span className="block overflow-hidden">
          <motion.span className="block" {...line(0.16)}>
            CoLab
          </motion.span>
        </span>
      </h1>

      <motion.p
        className="mt-6 font-serif uppercase leading-[0.95] tracking-tight text-foreground"
        style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
        initial={{ opacity: 0, y: reduce ? 0 : 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.42 }}
      >
        Exploring technology to improve
        <br className="hidden sm:block" /> the{" "}
        <span className="display-em">human condition</span>.
      </motion.p>
    </div>
  );
}
