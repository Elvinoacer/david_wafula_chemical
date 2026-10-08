"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TextReveal } from "./text-reveal";
import { Reveal } from "./reveal";

interface SectionHeadingProps {
  index?: string;
  eyebrow: string;
  title: string;
  description?: string;
  highlight?: string[];
  /** Words rendered in italic serif display gradient (editorial accent). */
  accent?: string[];
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
}

/**
 * The signature section header: engineering document number,
 * mono eyebrow, masked word-reveal title with serif accent words,
 * self-drawing rule, supporting description.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  highlight = [],
  accent = [],
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("relative", align === "center" && "text-center", className)}>
      <Reveal y={16}>
        <div
          className={cn(
            "flex items-center gap-3",
            align === "center" && "justify-center"
          )}
        >
          {index && (
            <span className="tech-label rounded-sm border border-line bg-surface px-1.5 py-0.5 text-process">
              {index}
            </span>
          )}
          <span className="tech-label text-muted-foreground">{eyebrow}</span>
          <motion.span
            aria-hidden
            className="hidden h-px origin-left bg-gradient-to-r from-process/70 via-process/25 to-transparent sm:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: 96 }}
          />
        </div>
      </Reveal>

      <h2 className="mt-5 max-w-3xl text-balance font-sans text-[clamp(1.9rem,4.6vw,3.6rem)] font-semibold leading-[1.04] tracking-[-0.02em]">
        <TextReveal text={title} highlight={highlight} accent={accent} />
      </h2>

      {description && (
        <Reveal delay={0.15} y={18}>
          <p
            className={cn(
              "mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg",
              align === "center" && "mx-auto"
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
