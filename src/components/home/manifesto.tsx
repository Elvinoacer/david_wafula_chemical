"use client";

import Link from "next/link";
import { useLayoutEffect, useMemo, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { philosophyExpanded } from "@/data/profile";

/** Words rendered in serif italic green — the emotional beats. */
const ACCENTS = new Set(["balances,", "safe", "practical", "awareness", "plant."]);

/**
 * The manifesto — the operating philosophy revealed word by word as you
 * scroll (GSAP scrub). Text starts as a whisper and sharpens into focus,
 * like a process variable settling at its setpoint.
 */
export function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);

  const words = useMemo(
    () =>
      philosophyExpanded.split(" ").map((w, i) => ({
        w,
        key: `${i}-${w}`,
        accent: ACCENTS.has(w),
      })),
    []
  );

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-word]",
        { opacity: 0.13 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.06,
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            end: "bottom 68%",
            scrub: 0.5,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="manifesto-heading"
      className="relative overflow-hidden border-t border-line/60"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint opacity-40" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_60%_50%_at_50%_40%,color-mix(in_srgb,var(--process)_6%,transparent),transparent)]"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-36 lg:px-8">
        <div className="flex items-center gap-4">
          <span className="h-1.5 w-1.5 rotate-45 bg-process/70" aria-hidden />
          <p className="tech-label text-muted-foreground">The operating philosophy</p>
          <span aria-hidden className="h-px flex-1 bg-line" />
        </div>

        <h2
          id="manifesto-heading"
          className="mt-10 max-w-5xl text-pretty font-sans text-[clamp(1.65rem,3.6vw,3.1rem)] font-medium leading-[1.28] tracking-[-0.01em]"
        >
          {words.map(({ w, key, accent }) => (
            <span
              key={key}
              data-word
              className={accent ? "display-accent text-[1.12em] text-process" : undefined}
            >
              {w}{" "}
            </span>
          ))}
        </h2>

        <div className="mt-14 flex items-center justify-between border-t border-line/60 pt-6">
          <p className="tech-label text-muted-foreground">
            Boundary → Balance → Constraint → Model → Trade-off
          </p>
          <Link
            href="/about"
            className="group inline-flex items-center gap-2 text-sm font-medium text-process"
          >
            More about how I work
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
