import { toolGroups } from "@/data/skills";
import { SectionHeading } from "@/components/motion/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

const GROUP_ICONS: Record<string, string> = {
  simulation: "SIM",
  analysis: "CALC",
  diagrams: "DWG",
  data: "DATA",
};

export function Tools() {
  return (
    <section aria-labelledby="tools-heading" className="relative border-t border-line/60">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <SectionHeading
          index="06"
          eyebrow="Process Simulation & Engineering Tools"
          title="Software I have actually used."
          description="Tools are listed with what I did with them — because a software name without a task is not a skill."
        />

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.09}>
          {Object.values(toolGroups).map((group) => (
            <StaggerItem key={group.title}>
              <div className="card-lift h-full rounded-xl border border-line bg-surface/70 p-5">
                <div className="flex items-center justify-between">
                  <p className="tech-label rounded-sm border border-analysis/40 bg-analysis-soft px-1.5 py-0.5 text-analysis">
                    {GROUP_ICONS[group.title.split(" ")[0].toLowerCase()] ?? "TOOL"}
                  </p>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {group.tools.length} tools
                  </span>
                </div>
                <h3 className="mt-4 font-sans text-lg font-semibold tracking-tight">{group.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{group.note}</p>
                <ul className="mt-4 space-y-2.5">
                  {group.tools.map((t) => (
                    <li key={t.name} className="flex items-center justify-between gap-2 border-b border-line/50 pb-2.5 last:border-0">
                      <span className="text-sm font-medium">{t.name}</span>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                        {t.level}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
