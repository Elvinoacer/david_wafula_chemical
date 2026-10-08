"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const LOOP_NODES = [
  { label: "Process", tag: "PLANT", desc: "The physical system" },
  { label: "Sensor", tag: "FT / TT / PT", desc: "Measures the controlled variable" },
  { label: "Controller", tag: "FIC / TIC", desc: "Compares to setpoint, computes action" },
  { label: "Final Control Element", tag: "FCV", desc: "Manipulates the process" },
];

/**
 * Animated feedback control loop (spec §44).
 * Signal flows clockwise; measurement returns to close the loop.
 */
export function ControlLoop({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-xl border border-line bg-surface/60 p-5", className)}>
      <div className="mb-4 flex items-center justify-between">
        <p className="tech-label text-muted-foreground">Feedback Control Loop</p>
        <p className="tech-label text-analysis">Closed-Loop</p>
      </div>

      <div className="grid gap-2.5 sm:grid-cols-4">
        {LOOP_NODES.map((node, i) => (
          <motion.div
            key={node.tag}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.55, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-lg border border-line bg-background/60 p-3.5"
          >
            <p className="tech-label text-analysis">{node.tag}</p>
            <p className="mt-1.5 text-sm font-semibold">{node.label}</p>
            <p className="mt-1 text-xs leading-snug text-muted-foreground">{node.desc}</p>
            {i < LOOP_NODES.length - 1 && (
              <span aria-hidden className="pipe-h absolute -right-[11px] top-1/2 hidden h-0.5 w-5 -translate-y-1/2 sm:block" />
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-lg border border-dashed border-analysis/35 bg-analysis-soft px-3.5 py-2.5">
        <span aria-hidden className="pipe-h h-0.5 w-8 shrink-0 rotate-180" />
        <p className="text-xs leading-snug text-muted-foreground">
          <span className="font-medium text-foreground">Feedback path —</span> the measured variable returns to the
          controller, closing the loop. Controlled variable, manipulated variable and disturbances are identified for
          every loop I study.
        </p>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {["Flow", "Level", "Temperature", "Pressure", "Composition"].map((v) => (
          <span key={v} className="rounded-full border border-line bg-background/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {v}
          </span>
        ))}
      </div>
    </div>
  );
}
