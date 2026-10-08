import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { education } from "@/data/experience";
import { SectionHeading } from "@/components/motion/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Reveal } from "@/components/motion/reveal";

export function Academic() {
  const uni = education[0];
  return (
    <section
      aria-labelledby="academic-heading"
      className="relative overflow-hidden border-t border-line/60 bg-surface/30"
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              index="07"
              eyebrow="Academic Foundation"
              title="The degree, module by module."
              description="A five-year engineering education covering the full chemical & process spine — from mathematics and thermodynamics to plant design and engineering economics."
            />

            <Reveal delay={0.15} className="relative mt-8">
              <div className="corner-frame relative overflow-hidden rounded-xl border border-line/80">
                <div className="relative aspect-[16/10]">
                  <Image
                    src="/images/education.webp"
                    alt="Engineering desk with process flow diagram blueprints, calculator and notebook"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="img-industrial object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/85 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                  <div>
                    <p className="tech-label text-process">{uni.institution}</p>
                    <p className="mt-1.5 text-sm font-medium leading-snug">{uni.degree}</p>
                  </div>
                  <span className="tech-label rounded-sm border border-line bg-background/70 px-2 py-1 text-muted-foreground backdrop-blur-sm">
                    {uni.startYear}–{uni.graduationYear}
                  </span>
                </div>
              </div>
            </Reveal>

            <Link
              href="/education"
              className="group mt-7 inline-flex items-center gap-2 text-sm font-medium text-process"
            >
              Full education record
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div>
            <Stagger className="grid gap-3.5 sm:grid-cols-2" stagger={0.07}>
              {uni.coursework.map((c, i) => (
                <StaggerItem key={c.category}>
                  <div className="card-lift h-full rounded-xl border border-line bg-surface/70 p-4.5 p-5">
                    <div className="flex items-center justify-between">
                      <p className="tech-label text-process">YR-{String(i + 1).padStart(2, "0")}</p>
                      <span className="font-mono text-[10px] text-muted-foreground">
                        {c.modules.length} modules
                      </span>
                    </div>
                    <h3 className="mt-2.5 text-[15px] font-semibold tracking-tight">{c.category}</h3>
                    <ul className="mt-3 space-y-1.5">
                      {c.modules.map((m) => (
                        <li key={m} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span aria-hidden className="h-px w-3 shrink-0 bg-process/50" />
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}
