import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects, categoryLabels, typeLabels } from "@/data/projects";
import { SectionHeading } from "@/components/motion/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";

export function ProjectGrid() {
  const rest = projects.filter((p) => !p.featured);

  return (
    <section aria-labelledby="work-heading" className="relative border-t border-line/60">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            index="03"
            eyebrow="Selected Engineering Work"
            title="Five more problems, five more processes."
            accent={["processes."]}
            description="Academic case studies across separations, heat transfer, fluid flow, reaction engineering and environmental treatment — each documented to the same case-study standard."
          />
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm font-medium text-process"
          >
            All projects
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {rest.map((p, i) => (
            <StaggerItem key={p.slug} className="h-full">
              <TiltCard max={6} className="h-full [perspective:1200px]">
                <Link
                  href={`/projects/${p.slug}`}
                  data-cursor="View"
                  className={`beam-border relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface/70 transition-[border-color,box-shadow] duration-500 hover:border-process/45 hover:shadow-[0_24px_60px_-28px_color-mix(in_srgb,var(--process)_38%,transparent)] ${
                    i === 0 ? "sm:col-span-2" : ""
                  }`}
                >
                  <div className={`relative w-full overflow-hidden ${i === 0 ? "aspect-[21/9]" : "aspect-[16/9]"}`}>
                    <Image
                      src={p.image}
                      alt={p.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      data-parallax-img
                      className="img-industrial object-cover will-change-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent" />
                    <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                      <span className="glass tech-label rounded-full px-2.5 py-1 text-process">
                        {categoryLabels[p.category]}
                      </span>
                    </div>
                    <span className="glass tech-label absolute right-4 top-4 rounded-full px-2.5 py-1 text-muted-foreground">
                      {p.year}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-balance font-sans text-lg font-semibold leading-snug tracking-tight">
                        {p.shortTitle}
                      </h3>
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line transition-all duration-300 group-hover:border-process/50 group-hover:bg-process-soft">
                        <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition-all duration-300 group-hover:translate-x-px group-hover:-translate-y-px group-hover:text-process" />
                      </span>
                    </div>
                    <p className="mt-2.5 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {p.summary}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5 border-t border-line/60 pt-4">
                      {p.tools.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>

        <p className="mt-8 font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">
          {typeLabels.academic} · {typeLabels["final-year"]} — documented to the 15-part case-study standard
        </p>
      </div>
    </section>
  );
}
