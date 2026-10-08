"use client";

import { philosophy, philosophyExpanded } from "@/data/profile";
import { TextReveal } from "@/components/motion/text-reveal";
import { Reveal } from "@/components/motion/reveal";

/**
 * The philosophy statement — full-bleed, typographic, the emotional core
 * of the portfolio (spec §48).
 */
export function Philosophy() {
  return (
    <section
      aria-labelledby="philosophy-heading"
      className="relative overflow-hidden border-t border-line/60 bg-surface/40"
    >
      {/* Ambiant texture */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint opacity-40" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_50%_60%_at_50%_50%,color-mix(in_srgb,var(--process)_7%,transparent),transparent)]"
      />

      <div className="relative mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 sm:py-32 lg:px-8">
        <Reveal y={14}>
          <p className="tech-label text-muted-foreground">11 · Process Engineering Philosophy</p>
        </Reveal>

        <h2 className="mt-8 space-y-1.5 font-sans text-[clamp(2rem,6vw,4.2rem)] font-semibold leading-[1.05] tracking-tight">
          {philosophy.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-1">
              <TextReveal
                text={line}
                delay={i * 0.22}
                highlight={i === philosophy.length - 1 ? ["safety", "efficiency."] : []}
              />
            </span>
          ))}
        </h2>

        <Reveal delay={0.55} y={20}>
          <p className="mx-auto mt-10 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
            {philosophyExpanded}
          </p>
        </Reveal>

        <Reveal delay={0.7}>
          <div aria-hidden className="mx-auto mt-10 flex items-center justify-center gap-2">
            <span className="h-px w-10 bg-process/60" />
            <span className="h-1.5 w-1.5 rotate-45 bg-process/70" />
            <span className="h-px w-10 bg-process/60" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
