"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Lenis smooth scrolling — the butter layer under every interaction.
 *
 * Performance & accessibility contract:
 * - driven by GSAP's single rAF ticker (one loop drives Lenis + ScrollTrigger)
 * - ScrollTrigger.update() is called on every eased scroll frame, so scrub
 *   tweens and pinned sections stay perfectly locked to the eased position
 * - disabled entirely when the user prefers reduced motion
 * - skipped on small touch devices (native momentum already feels right)
 * - auto-pauses (lenis.stop) while any overlay sets body overflow hidden
 *   (menu, preloader, dialogs) via a MutationObserver on <body> style
 * - exposes window.__lenis so overlays can scrollTo/stop/start explicitly
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reduce || typeof window === "undefined") return;
    if (
      window.matchMedia("(pointer: coarse)").matches &&
      window.innerWidth < 768
    ) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.11,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      anchors: { offset: -96 },
    });
    lenisRef.current = lenis;
    window.__lenis = lenis;

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const observer = new MutationObserver(() => {
      if (document.body.style.overflow === "hidden") lenis.stop();
      else lenis.start();
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["style"],
    });

    return () => {
      observer.disconnect();
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
      if (window.__lenis === lenis) window.__lenis = undefined;
    };
  }, [reduce]);

  return <>{children}</>;
}
