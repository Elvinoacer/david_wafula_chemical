"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";

interface FlowStep {
  label: string;
  tag?: string;
  note?: string;
}

interface ProcessFlowChartProps {
  steps: FlowStep[];
  /** Index where a branch output splits off (e.g. glycerol by-product) */
  branchAt?: { index: number; label: string; note?: string };
  className?: string;
  compact?: boolean;
}

/**
 * Animated vertical process flow diagram.
 * Pipes flow with marching dashes (mass flow in motion), equipment blocks
 * carry engineering tags — the visual language of a PFD (spec §12, §23).
 */
export function ProcessFlowChart({ steps, branchAt, className, compact = false }: ProcessFlowChartProps) {
  const reduce = useReducedMotion();

  return (
    <div className={cn("relative", className)} role="img" aria-label={`Process flow: ${steps.map((s) => s.label).join(", then ")}`}>
      <ol className="relative flex flex-col items-stretch">
        {steps.map((step, i) => {
          const isBranch = branchAt && i === branchAt.index;
          return (
            <li key={`${step.label}-${i}`} className="relative flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "group relative z-10 flex items-center justify-between gap-3 rounded-lg border border-line bg-surface/90 backdrop-blur-sm transition-colors duration-300 hover:border-process/50",
                  compact ? "px-3 py-2" : "px-4 py-3"
                )}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    aria-hidden
                    className={cn(
                      "relative flex shrink-0 items-center justify-center rounded-md border font-mono text-[10px] font-semibold tracking-wider",
                      compact ? "h-7 w-10" : "h-8 w-12",
                      "border-process/40 bg-process-soft text-process"
                    )}
                  >
                    {step.tag || `S-${i + 1}`}
                  </span>
                  <div className="min-w-0">
                    <p className={cn("truncate font-medium", compact ? "text-xs" : "text-sm")}>{step.label}</p>
                    {step.note && !compact && (
                      <p className="truncate font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                        {step.note}
                      </p>
                    )}
                  </div>
                </div>
                <span aria-hidden className="tech-label shrink-0 text-muted-foreground/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </motion.div>

              {isBranch && branchAt && (
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10 mt-2 ml-6 flex items-center gap-2 rounded-md border border-dashed border-analysis/40 bg-analysis-soft px-3 py-1.5"
                >
                  <span aria-hidden className="tech-label text-analysis">↳ BRANCH</span>
                  <span className="truncate text-xs font-medium">{branchAt.label}</span>
                  {branchAt.note && (
                    <span className="hidden truncate font-mono text-[10px] uppercase tracking-wider text-muted-foreground sm:inline">
                      · {branchAt.note}
                    </span>
                  )}
                </motion.div>
              )}

              {/* Connector pipe with flowing mass */}
              {i < steps.length - 1 && (
                <div aria-hidden className="relative mx-auto flex w-full max-w-6 items-start justify-center py-1">
                  <div
                    className={cn("pipe h-0.5 w-px", reduce && "animate-none")}
                    style={{ height: compact ? 12 : 16 }}
                  />
                  <span
                    className="absolute top-1/2 -translate-y-1/2 text-process/70"
                    style={{ fontSize: 9 }}
                  >
                    ▾
                  </span>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

interface RibbonProps {
  steps: string[];
  className?: string;
}

/** Compact horizontal flow ribbon — hero & section strips (spec §12). */
export function ProcessFlowRibbon({ steps, className }: RibbonProps) {
  const reduce = useReducedMotion();
  return (
    <div
      className={cn(
        "flex w-full min-w-0 items-center gap-1 overflow-x-auto snap-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [mask-image:linear-gradient(to_right,black_88%,transparent)]",
        className
      )}
      role="group"
      aria-label={`Process: ${steps.join(" → ")}`}
      tabIndex={0}
    >
      {steps.map((step, i) => (
        <div key={`${step}-${i}`} className="flex min-w-0 items-center">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="whitespace-nowrap rounded-md border border-line/90 bg-surface/90 px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-foreground shadow-[0_2px_12px_-6px_rgb(0_0_0/0.5)] backdrop-blur-sm"
          >
            {step}
          </motion.span>
          {i < steps.length - 1 && (
            <span
              aria-hidden
              className={cn(
                "pipe-h mx-1 inline-block h-0.5 w-5 shrink-0 sm:w-8",
                reduce && "animate-none"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
