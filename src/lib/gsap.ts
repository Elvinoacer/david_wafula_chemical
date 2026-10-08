"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Client-side GSAP registration.
 * Imported by every component that animates — registration is idempotent.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  // Mobile browsers fire resize when the URL bar hides — ignore those
  // so pinned sections and scrub tweens don't jitter-refresh.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger };

/** Signature easings shared across the experience layer. */
export const EASE = {
  out: "expo.out",
  io: "expo.inOut",
  soft: "power3.out",
} as const;
