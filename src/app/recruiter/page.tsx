import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, FileText, Calendar } from "lucide-react";
import { profile, snapshot } from "@/data/profile";
import { featuredProject, projects, categoryLabels } from "@/data/projects";
import { experience } from "@/data/experience";
import { toolGroups } from "@/data/skills";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { DocHeader } from "@/components/process/doc-header";
import { PrintButton } from "@/components/sections/print-button";

export const metadata: Metadata = {
  title: "Recruiter Mode",
  description:
    "Recruiter summary of David Wafula — Chemical & Process Engineering graduate: core focus, strongest evidence, tools and availability at a glance. Print-friendly.",
};

export default function RecruiterPage() {
  const strongest = [
    { label: "Final-year process design project", note: "biodiesel from waste oil — full flowsheet & balances" },
    { label: "Process simulation", note: "Aspen Plus / HYSYS academic models, reconciled by hand" },
    { label: "Distillation / separation project", note: "VLE, staging, duties" },
    { label: "Industrial attachment", note: "12 weeks, production environment" },
    { label: "Heat-transfer & fluid-flow work", note: "exchanger and pumping case studies" },
  ];

  return (
    <div className="relative mx-auto max-w-5xl px-4 pb-24 pt-28 sm:px-6 sm:pt-32 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-blueprint opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" />

      <div className="relative">
        {/* Toolbar */}
        <Reveal>
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 no-print">
            <div>
              <p className="tech-label text-process">DW-REC-008 · Quick Assessment</p>
              <h1 className="mt-2 font-sans text-3xl font-semibold tracking-tight sm:text-4xl">
                Recruiter Mode
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Everything a hiring decision needs — on one page, in ninety seconds.
              </p>
            </div>
            <PrintButton label="Print this page" />
          </div>
        </Reveal>

        {/* Summary card */}
        <Reveal delay={0.08}>
          <div className="grid gap-8 rounded-2xl border border-line bg-surface p-6 sm:p-8 lg:grid-cols-[auto_1fr]">
            <div className="corner-frame mx-auto w-40 overflow-hidden rounded-xl border border-line/80 p-1.5 lg:mx-0">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                <Image
                  src="/images/portrait.webp"
                  alt="Portrait of David Wafula"
                  fill
                  sizes="160px"
                  className="img-industrial object-cover"
                />
              </div>
            </div>
            <div>
              <h2 className="font-sans text-2xl font-semibold tracking-tight">{profile.fullName}</h2>
              <p className="mt-1 text-[15px] font-medium text-process">{profile.professionalTitle}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {profile.summary}
              </p>

              <dl className="mt-5 grid grid-cols-2 gap-x-8 gap-y-2.5 sm:grid-cols-3">
                {[
                  ["Core Focus", "Process Design · Simulation · Operations"],
                  ["Education", "B.Eng. Chemical & Process Eng."],
                  ["University", "Moi University"],
                  ["Graduation", "2026"],
                  ["Location", "Kenya"],
                  ["Availability", "Graduate opportunities"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{k}</dt>
                    <dd className="mt-0.5 text-[13px] font-medium leading-snug">{v}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 flex flex-wrap gap-2.5">
                <a
                  href={`mailto:${profile.links[0].url.replace("mailto:", "")}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-process px-4 py-2.5 text-[13px] font-semibold text-process-foreground transition-all hover:brightness-110"
                >
                  <Mail className="h-3.5 w-3.5" /> Email David
                </a>
                <Link
                  href="/cv"
                  className="inline-flex items-center gap-2 rounded-lg border border-line bg-background/60 px-4 py-2.5 text-[13px] font-semibold transition-colors hover:border-process/50 hover:text-process"
                >
                  <FileText className="h-3.5 w-3.5" /> Download CV
                </Link>
                <Link
                  href={`/projects/${featuredProject.slug}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-line bg-background/60 px-4 py-2.5 text-[13px] font-semibold transition-colors hover:border-process/50 hover:text-process"
                >
                  View flagship project
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
                <a
                  href={profile.links[1].url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-line bg-background/60 px-4 py-2.5 text-[13px] font-semibold transition-colors hover:border-process/50 hover:text-process"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Strongest evidence */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Reveal delay={0.12}>
            <div className="h-full rounded-2xl border border-line bg-surface p-6">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-process">
                Strongest Evidence
              </p>
              <ul className="mt-4 space-y-3">
                {strongest.map((e, i) => (
                  <li key={e.label} className="flex gap-3.5">
                    <span className="tech-label mt-0.5 text-process">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="text-sm font-semibold leading-tight">{e.label}</p>
                      <p className="mt-1 text-xs leading-snug text-muted-foreground">{e.note}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="flex h-full flex-col gap-6">
              <div className="rounded-2xl border border-line bg-surface p-6">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-process">Tools</p>
                <div className="mt-4 space-y-3">
                  {Object.values(toolGroups).map((g) => (
                    <div key={g.title} className="flex items-baseline justify-between gap-3 border-b border-line/50 pb-2.5 last:border-0">
                      <span className="text-[13px] font-medium">{g.title}</span>
                      <span className="text-right font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                        {g.tools.map((t) => t.name).join(" · ")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1 rounded-2xl border border-line bg-surface p-6">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-process">
                  Industrial Attachment
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground/85">
                  {experience[0].role} — {experience[0].startDate} to {experience[0].endDate}, supervised. Production
                  observation, data recording, utilities and safety routines.
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  References and attachment report available on request
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* All projects compact */}
        <Reveal delay={0.2} className="mt-8">
          <div className="rounded-2xl border border-line bg-surface p-6">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-process">
              Project Portfolio — 6 Case Studies
            </p>
            <Stagger className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
              {projects.map((p) => (
                <StaggerItem key={p.slug}>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="group flex h-full flex-col rounded-xl border border-line/70 bg-background/50 p-4 transition-colors hover:border-process/45 hover:bg-process-soft/30"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="tech-label text-process">{categoryLabels[p.category]}</span>
                      <span className="font-mono text-[10px] text-muted-foreground">{p.year}</span>
                    </div>
                    <p className="mt-2 text-sm font-semibold leading-tight">{p.shortTitle}</p>
                    <p className="mt-1.5 line-clamp-2 text-xs leading-snug text-muted-foreground">{p.summary}</p>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Reveal>

        <Reveal delay={0.24} className="mt-8 flex justify-center">
          <DocHeader docNo="DW-REC-008" title="Recruiter Summary" subtitle="Prints cleanly on one page" />
        </Reveal>
      </div>
    </div>
  );
}

