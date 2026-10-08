import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { aboutParagraphs, philosophyExpanded, philosophy } from "@/data/profile";
import { Reveal } from "@/components/motion/reveal";
import { DocHeader } from "@/components/process/doc-header";

export const metadata: Metadata = {
  title: "About",
  description:
    "David Wafula is a Chemical & Process Engineering graduate from Moi University with strong interest in process design, industrial operations, optimization and sustainable manufacturing.",
};

const APPROACH = [
  {
    step: "01",
    title: "Define the system boundary",
    desc: "What is inside, what is outside, and where the streams cross the line.",
  },
  {
    step: "02",
    title: "Establish the balances",
    desc: "Mass and energy first — they constrain everything that follows.",
  },
  {
    step: "03",
    title: "Identify the constraints",
    desc: "Thermodynamics, safety envelopes, equipment limits, economics.",
  },
  {
    step: "04",
    title: "Model the process",
    desc: "Hand calculations and simulation, each checking the other.",
  },
  {
    step: "05",
    title: "Evaluate the trade-offs",
    desc: "No design is free — choose deliberately, and say why.",
  },
];

export default function AboutPage() {
  return (
    <PageShell
      docNo="DW-ABT-004"
      eyebrow="About David"
      title="An engineer who thinks in systems."
      highlight={["systems."]}
      description="The person behind the balances — what drives me, how I work, and what I am looking for."
    >
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Portrait column */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Reveal>
            <div className="corner-frame overflow-hidden rounded-xl border border-line/80 p-2">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                <Image
                  src="/images/portrait.webp"
                  alt="Portrait of David Wafula"
                  fill
                  sizes="(max-width: 1024px) 90vw, 35vw"
                  className="img-industrial object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.12} className="mt-4">
            <DocHeader docNo="DW-ABT-004" title="About — David Wafula" subtitle="Profile & approach" />
          </Reveal>
        </div>

        {/* Story column */}
        <div>
          {aboutParagraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.06} y={20}>
              <p
                className={`text-pretty leading-relaxed ${
                  i === 0 ? "text-lg font-medium text-foreground/95" : "mt-5 text-[15px] text-muted-foreground"
                }`}
              >
                {p}
              </p>
            </Reveal>
          ))}

          {/* Approach — the five-step method */}
          <Reveal className="mt-14">
            <p className="tech-label text-process">How I approach a process problem</p>
          </Reveal>
          <div className="mt-5 space-y-0">
            {APPROACH.map((a, i) => (
              <Reveal key={a.step} delay={i * 0.05}>
                <div className="group flex gap-5 border-b border-line/60 py-4 transition-colors last:border-0 hover:bg-process-soft/30">
                  <span className="font-mono text-xs font-bold text-process">{a.step}</span>
                  <div>
                    <p className="text-[15px] font-semibold tracking-tight">{a.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{a.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Philosophy quote */}
          <Reveal className="mt-14">
            <blockquote className="relative overflow-hidden rounded-xl border border-process/25 bg-process-soft/60 p-6 sm:p-8">
              <span aria-hidden className="absolute -top-3 left-4 font-sans text-7xl font-bold text-process/15">
                &ldquo;
              </span>
              <p className="relative text-balance font-sans text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
                {philosophy.join(" ")}
              </p>
              <p className="relative mt-4 text-sm leading-relaxed text-muted-foreground">{philosophyExpanded}</p>
            </blockquote>
          </Reveal>

          {/* Imagery strip */}
          <Reveal className="mt-10">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line/80">
                <Image
                  src="/images/about-pfd.webp"
                  alt="David reviewing process flow diagrams with a laptop simulation nearby"
                  fill
                  sizes="(max-width: 1024px) 45vw, 25vw"
                  className="img-industrial object-cover"
                />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line/80">
                <Image
                  src="/images/hero-plant.webp"
                  alt="Chemical process plant at dusk"
                  fill
                  sizes="(max-width: 1024px) 45vw, 25vw"
                  className="img-industrial object-cover"
                />
              </div>
            </div>
          </Reveal>

          <Reveal className="mt-10">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-lg bg-process px-5 py-3 text-sm font-semibold text-process-foreground transition-all hover:brightness-110"
            >
              See the evidence — explore projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </div>
    </PageShell>
  );
}
