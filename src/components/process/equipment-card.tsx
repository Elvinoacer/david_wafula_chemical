import type { ProcessEquipment, ProcessMetric } from "@/data/types";
import { cn } from "@/lib/utils";

const EQUIPMENT_GLYPH: Record<string, string> = {
  tank: "▭",
  pump: "◉",
  reactor: "⬡",
  separator: "◁▷",
  "heat-exchanger": "⊸",
  column: "⬒",
  filter: "▤",
  dryer: "☁",
  compressor: "◇",
  other: "▢",
};

/** Equipment tag card — the P&ID vocabulary made tangible (spec §31). */
export function EquipmentCard({ item, className }: { item: ProcessEquipment; className?: string }) {
  return (
    <div className={cn("card-lift group rounded-lg border border-line bg-surface/70 p-4", className)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-xs font-bold tracking-wider text-process">{item.tag}</p>
          <p className="mt-1 text-sm font-medium leading-snug">{item.name}</p>
        </div>
        <span
          aria-hidden
          className="select-none text-lg leading-none text-muted-foreground/70 transition-colors group-hover:text-process"
        >
          {EQUIPMENT_GLYPH[item.type] ?? EQUIPMENT_GLYPH.other}
        </span>
      </div>
      {item.description && (
        <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">{item.description}</p>
      )}
      {item.duty && (
        <p className="tech-label mt-2.5 rounded-sm bg-process-soft px-1.5 py-0.5 text-process">{item.duty}</p>
      )}
    </div>
  );
}

/** Metric chip with honest verification labelling. */
export function MetricChip({ metric, className }: { metric: ProcessMetric; className?: string }) {
  return (
    <div className={cn("rounded-lg border border-line bg-surface/70 p-4", className)}>
      <p className="tech-label text-muted-foreground">{metric.label}</p>
      <p className="mt-1.5 font-sans text-2xl font-semibold tabular-nums tracking-tight">
        {metric.value}
        {metric.unit && (
          <span className="ml-1 font-mono text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            {metric.unit}
          </span>
        )}
      </p>
      {!metric.verified && (
        <p className="mt-1.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground/70">
          illustrative estimate
        </p>
      )}
    </div>
  );
}
