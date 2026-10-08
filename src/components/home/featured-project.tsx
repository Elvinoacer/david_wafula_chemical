import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { featuredProject } from "@/data/projects";
import { SectionHeading } from "@/components/motion/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Parallax } from "@/components/motion/parallax";
import { TiltCard } from "@/components/motion/tilt-card";
import { Magnetic } from "@/components/motion/magnetic";
import { MetricChip } from "@/components/process/equipment-card";
import { ProcessFlowChart } from "@/components/process/process-flow-chart";
import { DocHeader } from "@/components/process/doc-header";

export function FeaturedProject() {
  const p = featuredProject;

  return (
    <section
      aria-labelledby="featured-heading"
      className="relative overflow-hidden border-t border-line/60 bg-surface/30"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint opacity-50" />
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="aurora aurora-a right-[-14%] top-[-30%] h-[38rem] w-[38rem] bg-process/10" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            index="02"
            eyebrow="Final-Year Project · 2026"
            title="Biodiesel from waste cooking oil."
            accent={["Biodiesel"]}
            description="The flagship: a complete conceptual process turning waste cooking oil into fuel — flowsheet, balances, reactor reasoning, separations, simulation, safety and preliminary economics in one coherent design."
          />
          <Reveal delay={0.2} className="hidden lg:block">
            <DocHeader docNo="DW-FYP-001" title="Biodiesel Process Design" subtitle="Waste oil → FAME" rev="1.0" />
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* Visual column — parallax drift + 3D tilt */}
          <Reveal className="relative">
            <TiltCard max={5} className="h-full">
              <Parallax offset={26} className="h-full">
                <div className="corner-frame relative h-full min-h-[360px] overflow-hidden rounded-2xl border border-line/80">
                  <Image
                    src={p.image}
                    alt={p.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    data-parallax-img
                    className="img-industrial object-cover will-change-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/35 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <p className="tech-label scrim-text text-process">PFD · TK-101 → TK-104</p>
                    <p className="mt-2 max-w-md scrim-text text-pretty text-sm leading-relaxed text-foreground/90">
                      From feed tank to product storage — every stream accounted for, every unit operation argued from the
                      mass balance.
                    </p>
                  </div>
                </div>
              </Parallax>
            </TiltCard>
          </Reveal>

          {/* Process flow column */}
          <Reveal delay={0.12}>
            <ProcessFlowChart
              steps={p.processFlowSteps.slice(0, 8)}
              branchAt={{ index: 5, label: "Glycerol by-product → TK-104", note: "dense phase" }}
              compact
            />
          </Reveal>
        </div>

        {/* Metrics */}
        <Reveal delay={0.1} className="mt-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {p.metrics.map((m) => (
              <MetricChip key={m.label} metric={m} />
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mt-10 flex flex-wrap items-center gap-4">
          <Magnetic strength={7}>
            <Link
              href={`/projects/${p.slug}`}
              data-cursor="Read"
              className="beam-border group inline-flex items-center gap-2 rounded-full bg-process px-6 py-3.5 text-sm font-semibold text-process-foreground shadow-[0_10px_40px_-12px_color-mix(in_srgb,var(--process)_75%,transparent)] transition-all hover:brightness-110"
            >
              Explore the full process case study
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Magnetic>
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            16 documented sections · stream table · Sankey · equipment list
          </p>
        </Reveal>
      </div>
    </section>
  );
}
