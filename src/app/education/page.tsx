import type { Metadata } from "next";
import Image from "next/image";
import { PageShell } from "@/components/layout/page-shell";
import { education, labs, pilotPlant } from "@/data/experience";
import { timeline } from "@/data/profile";
import { Stagger, StaggerItem, Reveal } from "@/components/motion/reveal";
import { Counter } from "@/components/motion/counter";
import { DocHeader } from "@/components/process/doc-header";

export const metadata: Metadata = {
  title: "Education",
  description:
    "David Wafula's B.Eng. in Chemical & Process Engineering at Moi University — the full module record, laboratory strands and academic timeline.",
};

export default function EducationPage() {
  const uni = education[0];
  const moduleCount = uni.coursework.reduce((a, c) => a + c.modules.length, 0);

  return (
    <PageShell
      docNo="DW-EDU-006"
      eyebrow="Education"
      title="B.Eng. Chemical & Process Engineering."
      highlight={["Chemical", "&", "Process"]}
      description={`${uni.institution}, ${uni.location} — ${uni.startYear} to ${uni.graduationYear}. The complete academic record behind the portfolio.`}
    >
      {/* Degree card */}
      <Reveal>
        <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Institution", uni.institution],
            ["School", uni.school ?? ""],
            ["Degree", uni.degree],
            ["Years", `${uni.startYear} – ${uni.graduationYear}`],
          ].map(([k, v]) => (
            <div key={k} className="bg-surface px-5 py-4">
              <p className="tech-label text-muted-foreground">{k}</p>
              <p className="mt-1.5 text-sm font-medium leading-snug">{v}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Stats */}
      <Stagger className="mt-6 grid grid-cols-3 gap-3" stagger={0.08}>
        {[
          { value: moduleCount, suffix: "", label: "Modules" },
          { value: labs.length, suffix: "", label: "Lab strands" },
          { value: pilotPlant.length, suffix: "", label: "Pilot rigs" },
        ].map((s) => (
          <StaggerItem key={s.label} className="rounded-xl border border-line bg-surface/60 p-5 text-center">
            <p className="font-sans text-3xl font-semibold tracking-tight">
              <Counter value={s.value} suffix={s.suffix} />
            </p>
            <p className="tech-label mt-2 text-muted-foreground">{s.label}</p>
          </StaggerItem>
        ))}
      </Stagger>

      {/* Imagery + coursework */}
      <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Reveal>
            <p className="tech-label text-process">Coursework record</p>
          </Reveal>
          <Stagger className="mt-5 space-y-3.5" stagger={0.06}>
            {uni.coursework.map((c, i) => (
              <StaggerItem key={c.category}>
                <div className="card-lift rounded-xl border border-line bg-surface/60 p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="tech-label rounded-sm border border-process/35 bg-process-soft px-1.5 py-0.5 text-process">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h2 className="text-[15px] font-semibold tracking-tight">{c.category}</h2>
                    </div>
                    <span className="font-mono text-[10px] text-muted-foreground">{c.modules.length} modules</span>
                  </div>
                  <div className="mt-3.5 flex flex-wrap gap-1.5">
                    {c.modules.map((m) => (
                      <span
                        key={m}
                        className="rounded-full border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <Reveal>
            <div className="corner-frame overflow-hidden rounded-xl border border-line/80">
              <div className="relative aspect-[16/10]">
                <Image
                  src="/images/education.webp"
                  alt="Engineering desk with blueprints, calculator and notebook"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="img-industrial object-cover"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-xl border border-line bg-surface/60 p-5">
              <p className="tech-label text-muted-foreground">Year-by-year</p>
              <ol className="mt-4 space-y-3.5">
                {timeline.map((t) => (
                  <li key={t.year} className="flex gap-3.5">
                    <span className="w-10 shrink-0 font-mono text-xs font-bold text-process">{t.year}</span>
                    <div className="border-l border-line pl-3.5">
                      <p className="text-sm font-medium leading-tight">{t.title}</p>
                      <p className="mt-1 text-xs leading-snug text-muted-foreground">{t.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <DocHeader docNo="DW-EDU-006" title="Education Record" subtitle="Moi University · B.Eng." />
          </Reveal>
        </div>
      </div>

      {/* Labs */}
      <section aria-labelledby="labs-heading" className="mt-20">
        <Reveal>
          <h2 id="labs-heading" className="font-sans text-2xl font-semibold tracking-tight sm:text-3xl">
            Laboratory & pilot plant
          </h2>
        </Reveal>
        <Stagger className="mt-8 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {labs.map((lab) => (
            <StaggerItem key={lab.title}>
              <div className="card-lift h-full rounded-xl border border-line bg-surface/60 p-5">
                <p className="text-[15px] font-semibold tracking-tight">{lab.title}</p>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{lab.work.join(" · ")}</p>
              </div>
            </StaggerItem>
          ))}
          <StaggerItem>
            <div className="h-full rounded-xl border border-dashed border-process/40 bg-process-soft/40 p-5">
              <p className="tech-label text-process">Pilot-Scale Rigs</p>
              <p className="mt-2.5 text-sm leading-relaxed text-foreground/85">{pilotPlant.join(" · ")}</p>
            </div>
          </StaggerItem>
        </Stagger>
      </section>
    </PageShell>
  );
}
