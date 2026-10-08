import { snapshot, siteStats } from "@/data/profile";
import { SectionHeading } from "@/components/motion/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Counter } from "@/components/motion/counter";

export function Snapshot() {
  return (
    <section aria-labelledby="snapshot-heading" className="relative border-t border-line/60">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <SectionHeading
          index="01"
          eyebrow="Candidate Snapshot"
          title="Profile at a glance."
          description="The short version of a chemical and process engineering degree — degree, focus, evidence and availability, the way a recruiter would scan it."
        />

        {/* Stat counters */}
        <Stagger className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4" stagger={0.1}>
          {siteStats.map((stat) => (
            <StaggerItem
              key={stat.label}
              className="card-lift rounded-xl border border-line bg-surface/70 p-5"
            >
              <p className="font-sans text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm font-medium">{stat.label}</p>
              <p className="tech-label mt-1 text-muted-foreground">{stat.sub}</p>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Snapshot table — P&ID data-block aesthetic */}
        <div className="mt-10 overflow-hidden rounded-xl border border-line bg-surface/50">
          <div className="grid grid-cols-1 divide-y divide-line/60 sm:grid-cols-2 sm:divide-x lg:grid-cols-3">
            {snapshot.map((item, i) => (
              <div
                key={item.label}
                className="group flex items-baseline justify-between gap-4 px-5 py-4 transition-colors hover:bg-process-soft/50"
              >
                <span className="tech-label shrink-0 text-muted-foreground">
                  {String(i + 1).padStart(2, "0")} · {item.label}
                </span>
                <span className="text-right text-sm font-medium leading-snug">
                  {item.value}
                  {item.note && (
                    <span className="ml-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">
                      ({item.note})
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
