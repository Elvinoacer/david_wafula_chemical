"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SankeyFlow {
  name: string;
  value: number;
  unit: string;
  color: string;
}

interface SankeyDiagramProps {
  title: string;
  inflows: SankeyFlow[];
  outflows: SankeyFlow[];
  className?: string;
  caption?: string;
}

/** Cumulative offsets — pure, no reassignment during render. */
function cumulative(values: number[]) {
  return values.map((_, i) => values.slice(0, i).reduce((a, b) => a + b, 0));
}

/** Cubic-bezier band between two vertical segments. */
function band(x0: number, y0: number, x1: number, y1: number, t: number) {
  const mx = (x0 + x1) / 2;
  return `M ${x0} ${y0} C ${mx} ${y0}, ${mx} ${y1}, ${x1} ${y1} L ${x1} ${y1 + t} C ${mx} ${y1 + t}, ${mx} ${y0 + t}, ${x0} ${y0 + t} Z`;
}

/**
 * Mass / energy balance Sankey (spec §60).
 * Custom SVG — inflows converge on the process bus, outflows fan out.
 */
export function SankeyDiagram({ title, inflows, outflows, className, caption }: SankeyDiagramProps) {
  const W = 780;
  const H = 300;
  const PAD = 26;
  const usable = H - PAD * 2;

  const totalIn = inflows.reduce((a, f) => a + f.value, 0);
  const totalOut = outflows.reduce((a, f) => a + f.value, 0);
  const maxTotal = Math.max(totalIn, totalOut);
  const k = usable / maxTotal;

  const xLeftBar = 170;
  const xBus = 390;
  const xRightBar = 610;

  // Segment geometry — computed purely
  const inOffsets = cumulative(inflows.map((f) => f.value));
  const outOffsets = cumulative(outflows.map((f) => f.value));
  const outBlockH = totalOut * k;
  const outBlockTop = PAD + (usable - outBlockH) / 2;

  const inSegs = inflows.map((f, i) => ({
    ...f,
    y: PAD + inOffsets[i] * k,
    t: f.value * k,
  }));
  const outSegs = outflows.map((f, i) => ({
    ...f,
    y: outBlockTop + outOffsets[i] * k,
    t: f.value * k,
  }));

  const busTop = PAD;
  const busBottom = PAD + totalIn * k;

  return (
    <figure className={cn("overflow-hidden rounded-xl border border-line bg-surface/60", className)}>
      <figcaption className="flex items-center justify-between border-b border-line bg-surface px-4 py-2.5">
        <p className="tech-label text-muted-foreground">{title}</p>
        <p className="tech-label text-process">Balance Closes</p>
      </figcaption>
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full min-w-[560px]"
          role="img"
          aria-label={`${title}: inflows ${inflows.map((f) => `${f.name} ${f.value}${f.unit}`).join(", ")}; outflows ${outflows.map((f) => `${f.name} ${f.value}${f.unit}`).join(", ")}`}
        >
          {/* Inflow bands → bus */}
          {inSegs.map((f, i) => {
            const midIn = f.y + f.t / 2;
            const ratio = (midIn - PAD) / Math.max(totalIn, 0.001);
            const targetY = busTop + ratio * (busBottom - busTop);
            return (
              <motion.path
                key={`in-${f.name}`}
                d={band(xLeftBar + 5, midIn, xBus, targetY, 1.2)}
                fill={f.color}
                fillOpacity={0.32}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, delay: i * 0.12 }}
              />
            );
          })}

          {/* Bus → outflow bands (scaled so the bus balances) */}
          {(() => {
            const scale = totalOut > 0 ? totalIn / totalOut : 1;
            return outSegs.map((f, i) => {
              const y0 = busTop + outOffsets[i] * k * scale;
              const segH = Math.max(f.t * scale, 2);
              return (
                <motion.path
                  key={`out-${f.name}`}
                  d={band(xBus, y0 + 1, xRightBar - 5, f.y + 1, Math.max(segH - 2, 1))}
                  fill={f.color}
                  fillOpacity={0.32}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.8, delay: 0.15 + i * 0.12 }}
                />
              );
            });
          })()}

          {/* Left node bar */}
          {inSegs.map((f) => (
            <rect
              key={`lb-${f.name}`}
              x={xLeftBar - 5}
              y={f.y}
              width={5}
              height={Math.max(f.t, 2)}
              fill={f.color}
              rx={1.5}
            />
          ))}
          {/* Right node bar */}
          {outSegs.map((f) => (
            <rect
              key={`rb-${f.name}`}
              x={xRightBar}
              y={f.y}
              width={5}
              height={Math.max(f.t, 2)}
              fill={f.color}
              rx={1.5}
            />
          ))}

          {/* Bus line */}
          <line
            x1={xBus}
            y1={busTop}
            x2={xBus}
            y2={busBottom}
            stroke="var(--process)"
            strokeOpacity={0.5}
            strokeWidth={1.5}
            strokeDasharray="3 4"
          />
          <text
            x={xBus}
            y={busTop - 8}
            textAnchor="middle"
            className="fill-current font-mono text-[9px] uppercase tracking-widest text-muted-foreground"
          >
            Process
          </text>

          {/* Labels */}
          {inSegs.map((f) => (
            <g key={`li-${f.name}`}>
              <text x={xLeftBar - 14} y={f.y + f.t / 2 + 3} textAnchor="end" className="fill-current text-[11px] font-medium">
                {f.name}
              </text>
              <text x={xLeftBar - 14} y={f.y + f.t / 2 + 17} textAnchor="end" className="fill-current font-mono text-[9.5px] text-muted-foreground">
                {f.value} {f.unit}
              </text>
            </g>
          ))}
          {outSegs.map((f) => (
            <g key={`lo-${f.name}`}>
              <text x={xRightBar + 16} y={f.y + f.t / 2 + 3} textAnchor="start" className="fill-current text-[11px] font-medium">
                {f.name}
              </text>
              <text x={xRightBar + 16} y={f.y + f.t / 2 + 17} textAnchor="start" className="fill-current font-mono text-[9.5px] text-muted-foreground">
                {f.value} {f.unit}
              </text>
            </g>
          ))}
        </svg>
      </div>
      {caption && (
        <p className="border-t border-line bg-surface px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          {caption}
        </p>
      )}
    </figure>
  );
}
