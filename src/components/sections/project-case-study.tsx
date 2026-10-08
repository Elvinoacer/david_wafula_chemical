import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/data/types";
import { ProcessFlowChart } from "@/components/process/process-flow-chart";
import { StreamTable } from "@/components/process/stream-table";
import { SankeyDiagram } from "@/components/process/sankey";
import { EquipmentCard, MetricChip } from "@/components/process/equipment-card";
import { DocHeader } from "@/components/process/doc-header";
import { Reveal, DrawLine } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { categoryLabels, typeLabels } from "@/data/projects";

interface Block {
  id: string;
  number: string;
  title: string;
  body?: string[];
  children?: React.ReactNode;
}

function SectionBlock({ block }: { block: Block }) {
  return (
    <section aria-labelledby={`s-${block.id}`} className="scroll-mt-24">
      <DrawLine />
      <div className="py-10">
        <Reveal y={14}>
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-xs font-bold tracking-widest text-process">{block.number}</span>
            <h2 id={`s-${block.id}`} className="text-balance font-sans text-2xl font-semibold tracking-tight sm:text-3xl">
              {block.title}
            </h2>
          </div>
        </Reveal>
        {block.body && (
          <Reveal delay={0.1}>
            <div className="mt-5 max-w-3xl space-y-4">
              {block.body.map((p, i) => (
                <p key={i} className="text-pretty text-[15px] leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        )}
        {block.children && <div className="mt-7">{block.children}</div>}
      </div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-2.5 sm:grid-cols-2">
      {items.map((item, i) => (
        <Reveal key={item} delay={i * 0.04}>
          <li className="flex items-start gap-3 rounded-lg border border-line/70 bg-surface/60 px-4 py-3">
            <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-process/70" />
            <span className="text-sm leading-snug text-foreground/85">{item}</span>
          </li>
        </Reveal>
      ))}
    </ul>
  );
}

export function ProjectCaseStudy({ project, next }: { project: Project; next: Project }) {
  // Dynamic numbering across present sections
  const blocks: Block[] = [];
  let n = 0;
  const push = (id: string, title: string, body?: string[], children?: React.ReactNode) => {
    n += 1;
    blocks.push({ id, number: String(n).padStart(2, "0"), title, body, children });
  };

  push("problem", "The Process Problem", [project.problem]);
  push("basis", "Design Basis", undefined, <BulletList items={project.designBasis} />);
  if (project.constraints?.length) push("constraints", "Key Constraints", undefined, <BulletList items={project.constraints} />);
  push("flow", "Process Flow", undefined, (
    <ProcessFlowChart
      steps={project.processFlowSteps}
      branchAt={
        project.slug === "biodiesel-process-design"
          ? { index: 5, label: "Glycerol by-product → TK-104", note: "dense phase" }
          : undefined
      }
    />
  ));
  if (project.streams?.length)
    push("streams", "Stream Table", undefined, <StreamTable streams={project.streams} />);
  if (project.slug === "biodiesel-process-design")
    push("mass-balance", "Mass Balance", project.massBalance, (
      <div className="grid gap-5">
        <SankeyDiagram
          title="Overall Mass Balance — kg/day basis"
          inflows={[
            { name: "Waste oil", value: 100, unit: "kg/d", color: "var(--process)" },
            { name: "Methanol make-up", value: 21, unit: "kg/d", color: "var(--analysis)" },
          ]}
          outflows={[
            { name: "Biodiesel", value: 95, unit: "kg/d", color: "var(--process)" },
            { name: "Glycerol phase", value: 10, unit: "kg/d", color: "var(--analysis)" },
            { name: "Wash losses", value: 16, unit: "kg/d", color: "var(--safety)" },
          ]}
          caption="Illustrative academic estimates — 121 kg/d in, 121 kg/d out"
        />
        <SankeyDiagram
          title="Energy Distribution — share of thermal duty"
          inflows={[{ name: "Thermal input", value: 100, unit: "%", color: "var(--safety)" }]}
          outflows={[
            { name: "Feed preheating", value: 15, unit: "%", color: "var(--process)" },
            { name: "Reactor heating", value: 20, unit: "%", color: "var(--process)" },
            { name: "Methanol recovery", value: 45, unit: "%", color: "var(--analysis)" },
            { name: "Drying", value: 12, unit: "%", color: "var(--analysis)" },
            { name: "Losses", value: 8, unit: "%", color: "var(--safety)" },
          ]}
          caption="Methanol recovery dominates — the heat-integration opportunity (spec §29)"
        />
      </div>
    ));
  else if (project.massBalance?.length) push("mass-balance", "Material Balance", project.massBalance);
  if (project.energyBalance?.length) push("energy", "Energy Balance", project.energyBalance);
  if (project.reaction?.length) push("reaction", "Reaction Engineering", project.reaction);
  if (project.separation?.length) push("separation", "Separation Strategy", project.separation);
  if (project.simulation?.length) push("simulation", "Process Simulation", project.simulation);
  if (project.equipment?.length)
    push("equipment", "Preliminary Equipment List", undefined, (
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {project.equipment.map((eq) => (
          <EquipmentCard key={eq.tag} item={eq} />
        ))}
      </div>
    ));
  if (project.control?.length) push("control", "Control Considerations", project.control);
  if (project.safety?.length) push("safety", "Safety Review", project.safety);
  if (project.environmental?.length) push("environment", "Sustainability", project.environmental);
  if (project.economics?.length) push("economics", "Preliminary Economics", project.economics);
  push("results", "Results & Outcomes", undefined, (
    <>
      <BulletList items={project.results} />
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {project.metrics.map((m) => (
          <MetricChip key={m.label} metric={m} />
        ))}
      </div>
    </>
  ));
  if (project.limitations?.length) push("limitations", "Limitations & Assumptions", undefined, <BulletList items={project.limitations} />);
  if (project.lessons?.length) push("lessons", "What I Learned", project.lessons);
  if (project.improvements?.length) push("improvements", "Future Improvements", undefined, <BulletList items={project.improvements} />);

  return (
    <div className="relative">
      {/* Blueprint backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-blueprint opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" />

      <div className="relative mx-auto max-w-4xl px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-8">
        {/* ── Document header ─────────────────────────────────── */}
        <header>
          <Reveal y={14}>
            <div className="flex flex-wrap items-center gap-3">
              <span className="tech-label rounded-sm border border-process/40 bg-process-soft px-1.5 py-0.5 text-process">
                {typeLabels[project.type]} · {project.year}
              </span>
              <span className="tech-label text-muted-foreground">{categoryLabels[project.category]}</span>
            </div>
          </Reveal>

          <h1 className="mt-5 text-balance font-sans text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
            <TextReveal text={project.title} highlight={[project.shortTitle.split(" ")[0]]} />
          </h1>

          <Reveal delay={0.15}>
            <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
              {project.summary}
            </p>
          </Reveal>

          {/* Meta strip */}
          <Reveal delay={0.2} className="mt-8">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line font-mono text-[10px] uppercase tracking-wider sm:grid-cols-4">
              {[
                ["Role", project.role],
                ["Duration", project.duration],
                ["Tools", project.tools.join(" · ")],
                ["Category", categoryLabels[project.category]],
              ].map(([k, v]) => (
                <div key={k} className="bg-surface px-3.5 py-3">
                  <p className="text-muted-foreground">{k}</p>
                  <p className="mt-1.5 truncate text-[10.5px] font-semibold normal-case tracking-wide text-foreground" title={v}>
                    {v}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Hero image */}
          <Reveal delay={0.25} className="mt-8">
            <div className="corner-frame relative overflow-hidden rounded-xl border border-line/80">
              <div className="relative aspect-[21/9]">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 896px) 100vw, 896px"
                  className="img-industrial object-cover"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.3} className="mt-4">
            <DocHeader docNo={`DW-PRJ-${project.year}-${project.slug.slice(0, 3).toUpperCase()}`} title={project.shortTitle} subtitle={project.type.replace("-", " ")} />
          </Reveal>
        </header>

        {/* ── Sections ────────────────────────────────────────── */}
        <div className="mt-10">
          {blocks.map((b) => (
            <SectionBlock key={b.id} block={b} />
          ))}
        </div>

        {/* ── Footer nav ──────────────────────────────────────── */}
        <div className="mt-8 flex flex-col gap-3 border-t border-line pt-8 sm:flex-row sm:justify-between">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 rounded-lg border border-line bg-surface/70 px-4 py-3 text-sm font-medium transition-colors hover:border-process/50 hover:text-process"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            All projects
          </Link>
          <Link
            href={`/projects/${next.slug}`}
            className="group inline-flex items-center gap-2 rounded-lg bg-process px-5 py-3 text-sm font-semibold text-process-foreground transition-all hover:brightness-110"
          >
            Next: {next.shortTitle}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
