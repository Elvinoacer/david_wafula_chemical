"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Custom cursor — a precise dot with a trailing ring that morphs into a
 * labelled badge over anything carrying data-cursor="VIEW | READ | OPEN…".
 *
 * Performance contract:
 * - transform-only motion via gsap.quickTo (no layout reads after mount)
 * - renders nothing on touch devices / reduced-motion users
 * - hides the native cursor only while active (body.elite-cursor)
 */
export function Cursor() {
  const [active, setActive] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  // Decide eligibility — state flips asynchronously (compiler-safe)
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    const raf = requestAnimationFrame(() => setActive(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!active) return;
    document.body.classList.add("elite-cursor");

    const root = rootRef.current;
    const ring = ringRef.current;
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!root || !ring || !dot || !label) return;

    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });
    const dotX = gsap.quickTo(dot, "x", { duration: 0.11, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.11, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      root.style.opacity = "1";
      ringX(e.clientX);
      ringY(e.clientY);
      dotX(e.clientX);
      dotY(e.clientY);
    };

    const INTERACTIVE = 'a, button, [role="button"], input, select, textarea, label, summary';

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const labelled = target.closest<HTMLElement>("[data-cursor]");
      if (labelled) {
        label.textContent = labelled.getAttribute("data-cursor")?.toUpperCase() ?? "";
        gsap.to(ring, { scale: 2.35, backgroundColor: "rgba(69,198,138,0.14)", duration: 0.35, ease: "power3.out" });
        gsap.to(label, { scale: 1, opacity: 1, duration: 0.3, ease: "power3.out" });
        gsap.to(dot, { opacity: 0, duration: 0.2 });
        return;
      }
      if (target.closest(INTERACTIVE)) {
        gsap.to(ring, { scale: 1.6, duration: 0.35, ease: "power3.out" });
      }
    };

    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const leftLabelled = !!target.closest("[data-cursor]");
      const leftInteractive = !!target.closest(INTERACTIVE);
      if (leftLabelled || leftInteractive) {
        gsap.to(ring, { scale: 1, backgroundColor: "rgba(69,198,138,0)", duration: 0.35, ease: "power3.out" });
        gsap.to(label, { scale: 0.4, opacity: 0, duration: 0.25, ease: "power3.out" });
        gsap.to(dot, { opacity: 1, duration: 0.2 });
      }
    };

    const onDown = () => gsap.to(ring, { scale: 0.85, duration: 0.18 });
    const onUp = () => gsap.to(ring, { scale: 1, duration: 0.3, ease: "back.out(2)" });
    const onLeave = () => {
      root.style.opacity = "0";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, true);
    document.addEventListener("mouseout", onOut, true);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      document.body.classList.remove("elite-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver, true);
      document.removeEventListener("mouseout", onOut, true);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[400] opacity-0 transition-opacity duration-300"
    >
      <div
        ref={dotRef}
        className="absolute -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-process"
      />
      <div
        ref={ringRef}
        className="absolute -ml-5 -mt-5 flex h-10 w-10 items-center justify-center rounded-full border border-process/60 will-change-transform"
      >
        <span
          ref={labelRef}
          className="tech-label scale-[0.4] select-none text-[9px] font-bold tracking-[0.12em] text-process opacity-0 will-change-transform"
        >
          VIEW
        </span>
      </div>
    </div>
  );
}
