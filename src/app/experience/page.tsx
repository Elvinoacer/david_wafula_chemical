import type { Metadata } from "next";
import Image from "next/image";
import { PageShell } from "@/components/layout/page-shell";
import { experience } from "@/data/experience";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { DocHeader } from "@/components/process/doc-header";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "David Wafula's supervised industrial attachment — 12 weeks of production, utilities, process monitoring and safety exposure in a process manufacturing environment.",
};

export default function ExperiencePage() {
  const exp = experience[0];

  return (
    <PageShell
      docNo="DW-EXP-003"
      eyebrow="Industrial Experience"
      title="Twelve weeks on a real plant floor."
      highlight={["real", "plant", "floor"]}
      description={exp.summary}
    >
      {/* Role card */}
      <Reveal>
        <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Role", exp.role],
            ["Organisation", exp.organization],
            ["Duration", `${exp.startDate} — ${exp.endDate}`],
            ["Location", exp.location ?? "Kenya"],
          ].map(([k, v]) => (
            <div key={k} className="bg-surface px-5 py-4">
              <p className="tech-label text-muted-foreground">{k}</p>
              <p className="mt-1.5 text-sm font-medium leading-snug">{v}</p>
            </div>
          ))}
        </div>
      </Reveal>
      {exp.organizationNote && (
        <Reveal delay={0.08}>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">
            Note — {exp.organizationNote}
          </p>
        </Reveal>
      )}

      {/* Image */}
      <Reveal delay={0.12} className="mt-8">
        <div className="corner-frame relative overflow-hidden rounded-xl border border-line/80">
          <div className="relative aspect-[21/9]">
            <Image
              src={exp.image ?? "/images/control-room.webp"}
              alt={exp.imageAlt ?? "Industrial control room"}
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              className="img-industrial object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
          </div>
        </div>
      </Reveal>

      {/* Responsibilities */}
      <div className="mt-14 grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <Reveal>
            <p className="tech-label text-process">What I did — under supervision</p>
          </Reveal>
          <Stagger className="mt-5 space-y-0" stagger={0.05}>
            {exp.responsibilities.map((r, i) => (
              <StaggerItem key={r}>
                <div className="group flex items-start gap-4 border-b border-line/60 py-3.5 transition-colors hover:bg-process-soft/30">
                  <span className="tech-label mt-0.5 shrink-0 text-process">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm leading-snug text-foreground/85">{r}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          {/* Lessons */}
          <Reveal className="mt-12">
            <p className="tech-label text-process">What the plant taught me</p>
          </Reveal>
          <div className="mt-5 space-y-3">
            {(exp.lessons ?? []).map((l, i) => (
              <Reveal key={l} delay={i * 0.06}>
                <blockquote className="rounded-xl border border-process/25 bg-process-soft/50 px-5 py-4 text-pretty text-[15px] leading-relaxed text-foreground/90">
                  {l}
                </blockquote>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10">
            <div className="rounded-xl border border-safety/30 bg-safety/10 p-5">
              <p className="tech-label text-safety">Honest positioning</p>
              <p className="mt-2.5 text-sm leading-relaxed text-foreground/85">
                This was supervised exposure — observed, assisted and participated under the direction of practicing
                engineers. Not presented as independent operating authority.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Side column */}
        <div className="space-y-8">
          <Reveal>
            <div className="rounded-xl border border-line bg-surface/60 p-5">
              <p className="tech-label text-muted-foreground">Process Exposure</p>
              <ul className="mt-4 space-y-2.5">
                {(exp.processExposure ?? []).map((p) => (
                  <li key={p} className="flex items-center gap-2.5 text-sm text-foreground/85">
                    <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-process/70" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-xl border border-line bg-surface/60 p-5">
              <p className="tech-label text-muted-foreground">Equipment Observed</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {(exp.equipmentExposure ?? []).map((e) => (
                  <span
                    key={e}
                    className="rounded-full border border-line bg-background/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                  >
                    {e}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="rounded-xl border border-line bg-surface/60 p-5">
              <p className="tech-label text-muted-foreground">Tools & Records</p>
              <ul className="mt-4 space-y-2">
                {(exp.tools ?? []).map((t) => (
                  <li key={t} className="flex items-center justify-between text-sm">
                    <span className="text-foreground/85">{t}</span>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">used</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <DocHeader docNo="DW-EXP-003" title="Industrial Attachment" subtitle="Supervised · 12 weeks" />
          </Reveal>
        </div>
      </div>
    </PageShell>
  );
}
