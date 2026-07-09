"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { about } from "@/content/site";

const BLOCKS = [about.mission, about.vision];

/**
 * Mission & Vision as two clickable circles. Each opens to reveal its statement
 * when clicked — and also opens automatically the first time it scrolls into
 * view. The expand is a pure CSS grid-rows transition, so reduced-motion users
 * simply get an instant open.
 */
export function MissionVision() {
  const [open, setOpen] = useState<Record<string, boolean>>({});

  return (
    <div className="mx-auto grid max-w-5xl gap-x-10 gap-y-4 px-6 py-24 sm:grid-cols-2">
      {BLOCKS.map((block) => {
        const isOpen = open[block.label] ?? false;
        return (
          <motion.div
            key={block.label}
            onViewportEnter={() =>
              setOpen((o) => (o[block.label] ? o : { ...o, [block.label]: true }))
            }
            viewport={{ once: true, margin: "-120px" }}
            className="flex flex-col items-center text-center"
          >
            <button
              type="button"
              onClick={() =>
                setOpen((o) => ({ ...o, [block.label]: !isOpen }))
              }
              aria-expanded={isOpen}
              className={`card-glow group relative flex aspect-square w-52 shrink-0 flex-col items-center justify-center overflow-hidden rounded-full border-2 transition-colors sm:w-60 ${
                isOpen ? "border-accent" : "border-border hover:border-accent"
              }`}
            >
              <span className="aura opacity-40" />
              <span className="relative z-10 font-heading text-3xl uppercase leading-none sm:text-4xl">
                {block.label}
              </span>
              <span className="relative z-10 mt-3 text-[11px] uppercase tracking-[0.25em] text-accent">
                {isOpen ? "− Close" : "+ Open"}
              </span>
            </button>

            {/* Expandable statement */}
            <div
              className={`grid w-full transition-[grid-template-rows] duration-500 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="mx-auto max-w-md pt-7">
                  <h3 className="font-heading text-xl uppercase leading-snug tracking-wide sm:text-2xl">
                    {block.heading}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted">{block.body}</p>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
