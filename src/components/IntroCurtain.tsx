"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { asset } from "@/lib/asset";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Intro "curtain": the ETC logo covers the site as its entrance. It appears on
 * every fresh load of the home page (not on client-side navigation, since this
 * component mounts once per full load). Click (or keyboard) lifts it away to
 * reveal the page behind. Instant + non-animated under reduced motion.
 */
export function IntroCurtain() {
  const [show, setShow] = useState(false);
  const reduce = useReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    // Only greet on the home page, once per full page load.
    if (pathname === "/") setShow(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!show) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  function dismiss() {
    setShow(false);
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="curtain"
          role="button"
          tabIndex={0}
          aria-label="Enter the Ethical Tech CoLab site"
          onClick={dismiss}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              dismiss();
            }
          }}
          initial={{ opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { y: "-100%" }}
          transition={{ duration: reduce ? 0.25 : 0.95, ease: EASE }}
          className="fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center overflow-hidden bg-background"
        >
          <span className="aura" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 50% at 50% 40%, color-mix(in oklab, var(--glow) 30%, transparent), transparent 70%)",
            }}
          />
          <motion.div
            initial={{ scale: reduce ? 1 : 0.88, opacity: 0, rotateX: reduce ? 0 : 12 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.05 }}
            className="relative z-10 flex flex-col items-center px-6 text-center"
          >
            <Image
              src={asset("/etc-logo-3d.jpg")}
              alt="Ethical Tech CoLab"
              width={420}
              height={420}
              priority
              className="w-[min(72vw,380px)] rounded-3xl border border-border shadow-[0_40px_120px_-30px_rgba(123,92,255,0.6)]"
            />
            <p className="mt-8 font-heading text-3xl uppercase tracking-[0.16em]">
              Ethical Tech CoLab
            </p>
            <p className="mt-3 text-[11px] uppercase tracking-[0.35em] text-muted animate-pulse">
              Click to enter
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
