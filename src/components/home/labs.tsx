import Image from "next/image";
import { Flame, Droplets, Waves, FlaskConical, Gauge, TestTubes } from "lucide-react";
import { labs, pilotPlant } from "@/data/experience";
import { SectionHeading } from "@/components/motion/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Reveal } from "@/components/motion/reveal";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  flame: Flame,
  droplets: Droplets,
  waves: Waves,
  "flask-conical": FlaskConical,
  gauge: Gauge,
  "test-tubes": TestTubes,
};

export function Labs() {
  return (
    <section aria-labelledby="labs-heading" className="relative border-t border-line/60">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <SectionHeading
          index="08"
          eyebrow="Laboratory & Pilot Plant Exposure"
          title="Equations are louder with equipment."
          description="Six laboratory strands and a pilot-plant toolkit — where correlations, coefficients and control loops were checked against reality."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Stagger className="grid gap-4 sm:grid-cols-2" stagger={0.07}>
            {labs.map((lab) => {
              const Icon = ICONS[lab.icon] ?? FlaskConical;
              return (
                <StaggerItem key={lab.title}>
                  <div className="card-lift h-full rounded-xl border border-line bg-surface/70 p-5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-process/35 bg-process-soft text-process">
                        <Icon className="h-4 w-4" />
                      </span>
                      <h3 className="text-[15px] font-semibold leading-tight tracking-tight">{lab.title}</h3>
                    </div>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {lab.work.map((w) => (
                        <li
                          key={w}
                          className="rounded-full border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                        >
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>

          <Reveal delay={0.15}>
            <div className="corner-frame relative h-full min-h-[280px] overflow-hidden rounded-xl border border-line/80">
              <Image
                src="/images/lab.webp"
                alt="University engineering laboratory with pilot-scale process training rigs"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="img-industrial object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <p className="tech-label scrim-text text-process">Pilot-Scale Equipment</p>
                <p className="mt-2 scrim-text text-sm font-medium leading-relaxed text-foreground/90">
                  Hands-on time with training rigs builds the judgement that lectures alone cannot.
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {pilotPlant.map((p) => (
                    <span
                      key={p}
                      className="rounded-full border border-line bg-background/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground backdrop-blur-sm"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
