"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { timeline } from "@/data/profile";
import { SectionHeading } from "@/components/motion/section-heading";

/**
 * Engineering timeline with a scroll-drawn spine (spec §47).
 * The vertical line fills as the visitor scrolls — progress made visible.
 */
export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 55%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      aria-labelledby="timeline-heading"
      className="relative border-t border-line/60 bg-surface/30"
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <SectionHeading
          index="09"
          eyebrow="Engineering Timeline"
          title="Five years of building process thinking."
          description="From mathematics and chemistry foundations to an integrated final-year process design — the sequence that produced the engineer you are reading about."
        />

        <div ref={ref} className="relative mt-14 pl-8 sm:pl-0">
          {/* Spine */}
          <div aria-hidden className="absolute bottom-0 left-[11px] top-1 w-px bg-line sm:left-1/2" />
          <motion.div
            aria-hidden
            style={reduce ? undefined : { scaleY: lineScale }}
            className="absolute bottom-0 left-[11px] top-1 w-px origin-top bg-gradient-to-b from-process via-process to-analysis sm:left-1/2"
          />

          <ol className="space-y-10">
            {timeline.map((entry, i) => (
              <li key={entry.year} className="relative">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className={`grid sm:grid-cols-2 sm:gap-12 ${
                    i % 2 === 1 ? "" : ""
                  }`}
                >
                  {/* Node */}
                  <span
                    aria-hidden
                    className="absolute -left-8 top-1.5 flex h-[23px] w-[23px] items-center justify-center sm:left-1/2 sm:-translate-x-1/2"
                  >
                    <span className="absolute h-full w-full rounded-full border border-process/50 bg-background" />
                    <span className="pulse-dot relative h-[7px] w-[7px] rounded-full bg-process" />
                  </span>

                  <div className={`sm:py-0 ${i % 2 === 0 ? "sm:pr-12 sm:text-right" : "sm:col-start-2 sm:pl-12"}`}>
                    <p className="font-mono text-xs font-bold tracking-widest text-process">{entry.year}</p>
                    <h3 className="mt-1.5 font-sans text-lg font-semibold tracking-tight">{entry.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{entry.description}</p>
                  </div>
                </motion.div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
