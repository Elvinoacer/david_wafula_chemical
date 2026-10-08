"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const WORDS = [
  "Process Design",
  "Simulation",
  "Separation",
  "Reaction",
  "Control",
  "Safety",
  "Energy",
];

/**
 * Giant velocity-reactive marquee — the strip breathes with your scroll:
 * GSAP timeScale surges with scroll velocity, then settles back.
 * Alternating solid / outlined words give it editorial depth.
 */
export function VelocityMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      // Infinite loop — track holds two copies, animate -50%
      const tween = gsap.to(track, {
        xPercent: -50,
        ease: "none",
        duration: 30,
        repeat: -1,
      });

      // Surge with scroll velocity, then settle
      let settle: gsap.core.Tween | null = null;
      const st = ScrollTrigger.create({
        onUpdate: (self) => {
          const boost = Math.min(Math.abs(self.getVelocity()) / 380, 5);
          settle?.kill();
          settle = gsap.to(tween, {
            timeScale: 1 + boost,
            duration: 0.25,
            ease: "power2.out",
            overwrite: true,
            onComplete: () => {
              settle = gsap.to(tween, {
                timeScale: 1,
                duration: 1.2,
                ease: "power2.inOut",
                overwrite: true,
              });
            },
          });
        },
      });

      return () => {
        settle?.kill();
        st.kill();
        tween.kill();
      };
    }, section);

    return () => ctx.revert();
  }, []);

  const row = (hidden: boolean) => (
    <div aria-hidden={hidden} className="flex shrink-0 items-center">
      {WORDS.map((w, i) => (
        <span key={`${w}-${i}`} className="flex items-center">
          <span
            className={`whitespace-nowrap px-5 font-sans text-[clamp(2.6rem,6.5vw,5.5rem)] font-black uppercase leading-none tracking-[-0.03em] ${
              i % 2 === 0 ? "text-foreground/90" : "text-outline"
            }`}
          >
            {w}
          </span>
          <span aria-hidden className="h-2.5 w-2.5 rotate-45 bg-process/70" />
        </span>
      ))}
    </div>
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Discipline keywords"
      className="relative overflow-hidden border-y border-line/60 bg-surface/30 py-6 sm:py-8"
    >
      <div className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div ref={trackRef} className="flex w-max will-change-transform">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}
