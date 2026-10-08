import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { skillGroups, safetySkills } from "@/data/skills";
import { PROFICIENCY_LABELS, type Proficiency } from "@/data/types";
import { Stagger, StaggerItem, Reveal } from "@/components/motion/reveal";
import { ControlLoop } from "@/components/process/control-loop";
import { DocHeader } from "@/components/process/doc-header";

export const metadata: Metadata = {
  title: "Process Engineering",
  description:
    "David Wafula's process engineering capabilities — mass & energy balances, thermodynamics, transport, separations, reaction engineering and process control, with honest proficiency levels.",
};

const PROF_STYLE: Record<Proficiency, string> = {
  strong: "border-process/50 bg-process-soft text-process",
  "working-knowledge": "border-analysis/45 bg-analysis-soft text-analysis",
  "academic-exposure": "border-line bg-surface text-muted-foreground",
  "currently-learning": "border-safety/45 bg-safety/10 text-safety",
};

const SUSTAINABILITY = [
  { title: "Energy Efficiency", desc: "Heat recovery, pinch awareness, utility discipline." },
  { title: "Water Efficiency", desc: "Wash-water minimisation, reuse where quality allows." },
  { title: "Heat Recovery", desc: "Product streams preheating feed streams." },
  { title: "Waste Minimisation", desc: "Sources reduced before ends are treated." },
  { title: "Circular Economy", desc: "Waste cooking oil in, fuel and glycerol out." },
  { title: "By-product Recovery", desc: "Glycerol as a value stream, not a disposal problem." },
  { title: "Cleaner Production", desc: "Process choices that prevent, not just cure." },
  { title: "Material Efficiency", desc: "Methanol recovery as economics and environment." },
];

export default function ProcessEngineeringPage() {
  return (
    <PageShell
      docNo="DW-PE-005"
      eyebrow="Process Engineering"
      title="The full capability register."
      highlight={["capability", "register"]}
      description="Every skill with an honest proficiency label — Strong, Working Knowledge or Academic Exposure. No percentages, no inflations; the wording follows what I have actually done with each topic."
    >
      {/* Skills register */}
      <div className="grid gap-10 lg:grid-cols-[0.32fr_0.68fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Reveal>
            <div className="rounded-xl border border-line bg-surface/60 p-5">
              <p className="tech-label text-muted-foreground">Proficiency Key</p>
              <ul className="mt-4 space-y-2.5">
                {(Object.keys(PROFICIENCY_LABELS) as Proficiency[]).map((key) => (
                  <li key={key} className="flex items-center gap-2.5">
                    <span className={`tech-label rounded-full border px-2 py-0.5 ${PROF_STYLE[key]}`}>
                      {PROFICIENCY_LABELS[key]}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 border-t border-line/60 pt-3.5 text-xs leading-relaxed text-muted-foreground">
                Per the portfolio&apos;s honesty policy — skills are labelled by evidence, not by confidence.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="mt-4">
            <DocHeader docNo="DW-PE-005" title="Capability Register" subtitle="7 skill groups · 42 topics" />
          </Reveal>
        </div>

        <Stagger className="space-y-5" stagger={0.07}>
          {skillGroups.map((group) => (
            <StaggerItem key={group.title}>
              <div className="card-lift rounded-xl border border-line bg-surface/60 p-5 sm:p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="font-sans text-lg font-semibold tracking-tight">{group.title}</h2>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {group.skills.length} topics
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground">{group.description}</p>
                <ul className="mt-4 divide-y divide-line/50">
                  {group.skills.map((skill) => (
                    <li key={skill.name} className="flex items-center justify-between gap-3 py-2.5">
                      <span className="text-sm font-medium text-foreground/90">{skill.name}</span>
                      <span
                        className={`tech-label shrink-0 rounded-full border px-2 py-0.5 ${PROF_STYLE[skill.proficiency]}`}
                      >
                        {PROFICIENCY_LABELS[skill.proficiency]}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      {/* Control */}
      <section aria-labelledby="control-heading" className="mt-20">
        <Reveal>
          <h2 id="control-heading" className="font-sans text-2xl font-semibold tracking-tight sm:text-3xl">
            Process control, the way I was taught to see it
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-6">
          <ControlLoop />
        </Reveal>
      </section>

      {/* Safety */}
      <section aria-labelledby="safety-heading" className="mt-20">
        <Reveal>
          <h2 id="safety-heading" className="font-sans text-2xl font-semibold tracking-tight sm:text-3xl">
            Safety thinking
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">{safetySkills.statement}</p>
        </Reveal>

        <Reveal delay={0.14} className="mt-8">
          <div className="rounded-xl border border-line bg-surface/60 p-5 sm:p-6">
            <p className="tech-label text-muted-foreground">Hazard Framework</p>
            <ol className="mt-5 grid gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
              {safetySkills.framework.map((f, i) => (
                <li key={f.step} className="relative rounded-lg border border-line/70 bg-background/50 p-3.5">
                  <span className="tech-label text-safety">{String(i + 1).padStart(2, "0")}</span>
                  <p className="mt-1.5 text-[13px] font-semibold leading-tight">{f.step}</p>
                  <p className="mt-1.5 text-[11px] leading-snug text-muted-foreground">{f.note}</p>
                  {i < safetySkills.framework.length - 1 && (
                    <span aria-hidden className="pipe-h absolute -right-[11px] top-1/2 hidden h-0.5 w-5 -translate-y-1/2 lg:block" />
                  )}
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <Reveal delay={0.18} className="mt-5">
          <div className="flex flex-wrap gap-1.5">
            {safetySkills.areas.map((a) => (
              <span
                key={a}
                className="rounded-full border border-line bg-surface/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
              >
                {a}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Sustainability */}
      <section aria-labelledby="sustain-heading" className="mt-20">
        <Reveal>
          <h2 id="sustain-heading" className="font-sans text-2xl font-semibold tracking-tight sm:text-3xl">
            Sustainability, without the greenwash
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            I am interested in process improvements that reduce energy, water and material losses while maintaining
            safety and product quality — claimed only where a calculation supports them.
          </p>
        </Reveal>
        <Stagger className="mt-8 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.05}>
          {SUSTAINABILITY.map((s) => (
            <StaggerItem key={s.title}>
              <div className="card-lift h-full rounded-xl border border-line bg-surface/60 p-4.5 p-5">
                <p className="text-[15px] font-semibold tracking-tight">{s.title}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </PageShell>
  );
}
