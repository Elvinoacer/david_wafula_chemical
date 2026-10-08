"use client";

import type { ProcessStream } from "@/data/types";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Stream table — the heart of honest process documentation (spec §25, §59).
 * Every value is labelled as verified or an illustrative academic estimate.
 */
export function StreamTable({ streams, className }: { streams: ProcessStream[]; className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-line bg-surface/60",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-line bg-surface px-4 py-2.5">
        <p className="tech-label text-muted-foreground">Stream Table</p>
        <p className="tech-label text-process">S-100 Series</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-line/70">
              {["Stream", "Flow Rate", "Temp", "Pressure", "Phase", "Main Components"].map((h) => (
                <th key={h} className="tech-label whitespace-nowrap px-4 py-2.5 text-left font-medium text-muted-foreground">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {streams.map((s, i) => (
              <motion.tr
                key={s.id}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="group border-b border-line/50 transition-colors last:border-0 hover:bg-process-soft/60"
              >
                <td className="whitespace-nowrap px-4 py-3">
                  <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-process align-middle" aria-hidden />
                  <span className="font-mono text-xs font-semibold text-process">{s.id}</span>
                  <span className="ml-2 text-foreground/90">{s.name}</span>
                </td>
                <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-foreground/85">{s.flowRate}</td>
                <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-foreground/85">{s.temperature}</td>
                <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-foreground/85">{s.pressure}</td>
                <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-foreground/85">{s.phase}</td>
                <td className="whitespace-nowrap px-4 py-3 text-xs text-muted-foreground">{s.composition}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t border-line bg-surface px-4 py-2">
        <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          Values shown are illustrative academic estimates pending project data verification
        </p>
      </div>
    </div>
  );
}
