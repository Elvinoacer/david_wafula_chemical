"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

declare global {
  interface Window {
    __dwReady?: boolean;
  }
}

const CYCLE_WORDS = [
  "process design",
  "simulation",
  "separations",
  "reaction engineering",
  "process control",
  "safety",
];

/** Fires once the intro has finished — the hero waits for this. */
export function useAppReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (window.__dwReady) {
      // Already fired (e.g. reduced-motion skip) — flip asynchronously.
      const raf = requestAnimationFrame(() => setReady(true));
      return () => cancelAnimationFrame(raf);
    }
    const done = () => setReady(true);
    window.addEventListener("dw:ready", done, { once: true });
    // Safety net — never leave the hero hidden if anything upstream fails.
    const fallback = setTimeout(done, 3600);
    return () => {
      window.removeEventListener("dw:ready", done);
      clearTimeout(fallback);
    };
  }, []);
  return ready;
}

/**
 * The opening number — a 2.5s cinematic counter that ends in a staggered
 * curtain lift, choreographed with GSAP. While it plays, the body scroll is
 * locked (Lenis auto-pauses via the overflow observer).
 *
 * Accessibility: users who prefer reduced motion skip straight to content
 * (the event fires immediately, hero renders in its final state).
 */
export function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = rootRef.current;
    if (!root) return;

    if (reduced) {
      root.remove();
      window.__dwReady = true;
      window.dispatchEvent(new Event("dw:ready"));
      return;
    }

    document.body.style.overflow = "hidden";

    const counter = { value: 0 };
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          root.remove();
          document.body.style.overflow = "";
          window.__dwReady = true;
          window.dispatchEvent(new Event("dw:ready"));
        },
      });

      // 1 · Count 0 → 100
      tl.to(counter, {
        value: 100,
        duration: 2.0,
        ease: "power2.inOut",
        onUpdate: () => {
          const v = Math.round(counter.value);
          if (counterRef.current) counterRef.current.textContent = String(v);
          if (barRef.current) barRef.current.style.transform = `scaleX(${v / 100})`;
          if (wordRef.current) {
            const idx = Math.min(
              CYCLE_WORDS.length - 1,
              Math.floor((v / 100) * CYCLE_WORDS.length)
            );
            wordRef.current.textContent = CYCLE_WORDS[idx];
          }
        },
      });

      // 2 · Content lifts away
      tl.to(contentRef.current, {
        yPercent: -18,
        opacity: 0,
        duration: 0.45,
        ease: "power2.in",
      });

      // 3 · Curtain columns rise — the hero is already animating beneath
      tl.call(() => {
        window.__dwReady = true;
        window.dispatchEvent(new Event("dw:ready"));
      });
      tl.to(
        panelsRef.current?.children ?? [],
        {
          yPercent: -100,
          duration: 1.05,
          ease: "expo.inOut",
          stagger: 0.07,
        },
        "-=0.12"
      );
    }, root);

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="fixed inset-0 z-[300] select-none bg-background"
    >
      {/* Curtain columns */}
      <div ref={panelsRef} className="absolute inset-0 flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-full flex-1 border-r border-line/25 last:border-r-0 will-change-transform" />
        ))}
      </div>

      {/* Content layer */}
      <div ref={contentRef} className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10">
        <div className="flex items-start justify-between">
          <p className="tech-label text-muted-foreground">DW — Portfolio © 2026</p>
          <p className="tech-label text-right text-muted-foreground">
            Eldoret · Kenya
            <br />
            0.51° N — 35.27° E
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 text-center">
          <p className="tech-label text-process">Loading process units</p>
          <span
            ref={wordRef}
            className="display-accent text-3xl text-foreground/90 sm:text-4xl"
          >
            {CYCLE_WORDS[0]}
          </span>
        </div>

        <div className="flex items-end justify-between">
          <p className="tech-label max-w-[180px] leading-relaxed text-muted-foreground">
            Chemical &amp; Process Engineering
          </p>
          <p className="font-mono text-[clamp(4rem,12vw,9rem)] font-bold leading-[0.85] tracking-tighter text-foreground">
            <span ref={counterRef}>0</span>
            <span className="text-process">%</span>
          </p>
        </div>
      </div>

      {/* Progress hairline */}
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-line/60">
        <div ref={barRef} className="h-full w-full origin-left scale-x-0 bg-process will-change-transform" />
      </div>
    </div>
  );
}
