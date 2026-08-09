"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { asset } from "@/lib/asset";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Never resubscribes; the curtain only needs to know server from client. */
const subscribe = () => () => {};

/**
 * Intro "curtain": the ETC logo covers the site as its entrance. It appears on
 * every fresh load of the home page (not on client-side navigation, since the
 * entry path is captured on first render). Click (or keyboard) lifts it away to
 * reveal the page behind. Instant + non-animated under reduced motion.
 */
export function IntroCurtain() {
  const [dismissed, setDismissed] = useState(false);
  const reduce = useReducedMotion();
  const pathname = usePathname();

  // The path this page load started on. Held in state so it is captured once
  // on first render and client-side navigation later cannot bring the curtain
  // back. (A ref would be wrong: refs must not be read during render.)
  const [entryPathname] = useState(pathname);

  // Deliberately client-only: rendering the curtain into the static HTML would
  // trap anyone without JavaScript behind a panel they cannot dismiss.
  // useSyncExternalStore reports false on the server and true on the client
  // without setting state from an effect.
  const isClient = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  const show = isClient && !dismissed && entryPathname === "/";

  useEffect(() => {
    if (!show) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  // Idempotent — a tap can fire both pointerup and click, and this must never
  // run twice.
  const dismiss = useCallback(() => setDismissed(true), []);

  // Failsafe: never trap a visitor. If a tap somehow fails to register (some
  // mobile browsers swallow synthetic clicks on non-native elements), the
  // curtain lifts on its own so the site is always reachable.
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(dismiss, 5000);
    return () => clearTimeout(t);
  }, [show, dismiss]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="curtain"
          role="button"
          tabIndex={0}
          aria-label="Enter the Ethical Tech CoLab site"
          onPointerUp={dismiss}
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
              Tap to enter
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
