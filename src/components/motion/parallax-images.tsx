"use client";

import { useLayoutEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "@/lib/gsap";

/**
 * Scroll parallax for every image tagged `data-parallax-img`.
 * Mounted once around the page sections — each image drifts vertically
 * inside its overflow-hidden frame as the page scrolls (scrub, GPU
 * transforms only). Disabled entirely for reduced-motion users.
 */
export function ParallaxImages({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (reduce) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-parallax-img]").forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -8, scale: 1.22 },
          {
            yPercent: 8,
            scale: 1.22,
            ease: "none",
            scrollTrigger: {
              trigger: img.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.7,
            },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <div ref={ref} className="contents">
      {children}
    </div>
  );
}
