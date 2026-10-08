import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/motion/section-heading";
import { experience } from "@/data/experience";

export function Industrial() {
  const exp = experience[0];
  if (!exp) return null;

  return (
    <section
      aria-labelledby="industrial-heading"
      className="relative overflow-hidden border-t border-line/60"
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <SectionHeading
          index="04"
          eyebrow="Industrial Attachment · 12 Weeks"
          title="Where theory met the plant floor."
          highlight={["plant", "floor"]}
          description={exp.summary}
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
          {/* Image side */}
          <Reveal className="relative">
            <div className="corner-frame relative h-full min-h-[300px] overflow-hidden rounded-xl border border-line/80">
              <Image
                src={exp.image ?? "/images/control-room.webp"}
                alt={exp.imageAlt ?? "Industrial control room with SCADA screens"}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="img-industrial object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/35 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="tech-label scrim-text text-process">
                  {exp.startDate} — {exp.endDate}
                </p>
                <p className="mt-1.5 text-sm font-medium">{exp.role}</p>
              </div>
            </div>
          </Reveal>

          {/* Content side */}
          <div>
            <Reveal delay={0.1}>
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {exp.responsibilities.slice(0, 8).map((r, i) => (
                  <li
                    key={r}
                    className="group flex items-start gap-3 rounded-lg border border-line/70 bg-surface/50 px-3.5 py-3 transition-colors hover:border-process/40 hover:bg-process-soft/40"
                  >
                    <span className="tech-label mt-0.5 shrink-0 text-process">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[13px] leading-snug text-foreground/85">{r}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.2} className="mt-6">
              <p className="rounded-lg border border-safety/30 bg-safety/10 px-4 py-3.5 text-sm leading-relaxed text-foreground/90">
                <span className="tech-label mr-2 text-safety">Honest positioning</span>
                Supervised exposure — observed, assisted and participated under the direction of practicing engineers.
                Not presented as independent operating authority.
              </p>
            </Reveal>

            <Reveal delay={0.25} className="mt-6 flex flex-wrap gap-1.5">
              {(exp.equipmentExposure ?? []).map((e) => (
                <span
                  key={e}
                  className="rounded-full border border-line bg-surface/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                >
                  {e}
                </span>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
