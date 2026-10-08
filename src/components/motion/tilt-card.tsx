"use client";

import {
  useRef,
  type ReactNode,
  type MouseEvent,
} from "react";
import { motion, useReducedMotion, useSpring, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Max rotation in degrees. */
  max?: number;
  /** Include the cursor glare sheet. */
  glare?: boolean;
  /** Include the cursor spotlight wash. */
  spotlight?: boolean;
  scale?: number;
}

/**
 * 3D tilt with cursor-tracked glare + spotlight — the awwwards card.
 * transform-only (GPU), spring-smoothed, fine-pointer & non-reduced-motion only.
 * On touch it renders as a plain container so nothing is lost.
 */
export function TiltCard({
  children,
  className,
  max = 7,
  glare = true,
  spotlight = true,
  scale = 1.0,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const s = useMotionValue(1);
  const rotateX = useSpring(rx, { stiffness: 220, damping: 20, mass: 0.5 });
  const rotateY = useSpring(ry, { stiffness: 220, damping: 20, mass: 0.5 });
  const scaleS = useSpring(s, { stiffness: 220, damping: 20, mass: 0.5 });

  const fine = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current || !fine()) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * 2 * max);
    rx.set(-(py - 0.5) * 2 * max);
    s.set(scale);
    ref.current.style.setProperty("--gx", `${px * 100}%`);
    ref.current.style.setProperty("--gy", `${py * 100}%`);
    ref.current.style.setProperty("--mx", `${px * 100}%`);
    ref.current.style.setProperty("--my", `${py * 100}%`);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
    s.set(1);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={
        reduce
          ? undefined
          : {
              rotateX,
              rotateY,
              scale: scaleS,
              transformStyle: "preserve-3d",
              transformPerspective: 900,
            }
      }
      className={cn("group", spotlight && "spotlight", className)}
    >
      {children}
      {glare && !reduce && <span aria-hidden className="tilt-glare" />}
    </motion.div>
  );
}
