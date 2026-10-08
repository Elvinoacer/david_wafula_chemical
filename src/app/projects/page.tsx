import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { projects, categoryLabels, typeLabels } from "@/data/projects";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Process design, separations, heat transfer, fluid flow, reaction engineering and environmental projects by David Wafula — documented as full engineering case studies.",
};

export default function ProjectsPage() {
  return (
    <PageShell
      docNo="DW-PRJ-002"
      eyebrow="Engineering Projects"
      title="Six case studies, one standard of evidence."
      highlight={["evidence"]}
      description="Every project is documented the same way: problem, design basis, process flow, balances, reasoning, results and honest limitations. That structure is the point — it is how I want future employers to see me think."
    >
      <Stagger className="grid gap-6 md:grid-cols-2" stagger={0.08}>
        {projects.map((p, i) => (
          <StaggerItem key={p.slug} className={i === 0 ? "h-full md:col-span-2" : "h-full"}>
            <TiltCard max={4} className="h-full">
              <Link
                href={`/projects/${p.slug}`}
                className="beam-border group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface/70 transition-[border-color,box-shadow] duration-500 hover:border-process/45 hover:shadow-[0_24px_60px_-28px_color-mix(in_srgb,var(--process)_38%,transparent)] sm:flex-row"
              >
              <div
                className={`relative shrink-0 overflow-hidden ${
                  i === 0 ? "aspect-[16/9] sm:aspect-auto sm:w-1/2" : "aspect-[16/9] sm:w-2/5"
                }`}
              >
                <Image
                  src={p.image}
                  alt={p.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="img-industrial object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/40 opacity-60" />
                {p.featured && (
                  <span className="tech-label absolute left-4 top-4 rounded-full border border-process/50 bg-background/75 px-2.5 py-1 text-process backdrop-blur-md">
                    ★ Flagship
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="flex items-center gap-2">
                  <span className="tech-label rounded-sm border border-process/35 bg-process-soft px-1.5 py-0.5 text-process">
                    {categoryLabels[p.category]}
                  </span>
                  <span className="tech-label text-muted-foreground">{typeLabels[p.type]} · {p.year}</span>
                </div>

                <h2 className="mt-3 text-balance font-sans text-xl font-semibold leading-snug tracking-tight">
                  {p.shortTitle}
                </h2>
                <p className="mt-2.5 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {p.summary}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tools.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>

              <div className="mt-5 flex items-center justify-between border-t border-line/60 pt-4">
                <span className="tech-label text-muted-foreground">
                  {p.processFlowSteps.length} flow steps · {p.equipment?.length ?? 0} equipment items
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-process">
                  Case study
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
              </div>
            </Link>
            </TiltCard>
          </StaggerItem>
        ))}
      </Stagger>

      <p className="mt-10 font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">
        All numeric process values are illustrative academic estimates pending verification — see VERIFICATION.md
      </p>
    </PageShell>
  );
}
