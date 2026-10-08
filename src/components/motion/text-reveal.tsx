"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

interface TextRevealProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  /** Words to highlight in process green */
  highlight?: string[];
  /** Words set in italic serif display — editorial accents */
  accent?: string[];
}

/**
 * Word-by-word masked heading reveal — the signature "best scrolls" effect.
 * Each word rises out of its own overflow-hidden clip.
 */
export function TextReveal({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.045,
  once = true,
  highlight = [],
  accent = [],
}: TextRevealProps) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={cn("inline-block", className)} aria-label={text}>
      {words.map((word, i) => {
        const clean = word.replace(/[.,;:—]/g, "");
        const isHi = highlight.includes(clean);
        const isAcc = accent.includes(clean);
        return (
          <span key={`${word}-${i}`} aria-hidden className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
            <motion.span
              className={cn(
                "inline-block will-change-transform",
                isHi && !isAcc && "text-process",
                isAcc && "display-accent text-flow text-[1.09em]",
                wordClassName
              )}
              initial={{ y: "110%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once, margin: "-60px" }}
              transition={{ duration: 0.85, delay: delay + i * stagger, ease: EASE }}
            >
              {word}
              {i < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}
