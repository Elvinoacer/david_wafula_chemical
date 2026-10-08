import type { Metadata } from "next";
import { profile, snapshot } from "@/data/profile";
import { projects, categoryLabels } from "@/data/projects";
import { experience } from "@/data/experience";
import { education } from "@/data/experience";
import { skillGroups, toolGroups } from "@/data/skills";
import { currentlyLearning } from "@/data/profile";
import { Reveal } from "@/components/motion/reveal";
import { PrintButton } from "@/components/sections/print-button";

export const metadata: Metadata = {
  title: "CV",
  description:
    "Curriculum vitae of David Wafula — Chemical & Process Engineering graduate. Print-ready summary of education, skills, projects and industrial attachment.",
};

export default function CvPage() {
  return (
    <div className="relative mx-auto max-w-4xl px-4 pb-24 pt-28 sm:px-6 sm:pt-32 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-blueprint opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" />

      <div className="relative">
        {/* Document toolbar */}
        <Reveal>
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 no-print">
            <div>
              <p className="tech-label text-process">DW-CV-007 · Rev 1.0</p>
              <h1 className="mt-2 font-sans text-3xl font-semibold tracking-tight sm:text-4xl">
                Curriculum Vitae
              </h1>
            </div>
            <PrintButton />
          </div>
        </Reveal>

        {/* ── The CV document ─────────────────────────────────── */}
        <Reveal delay={0.08}>
          <article className="rounded-2xl border border-line bg-surface p-6 shadow-xl sm:p-10 print:rounded-none print:border-0 print:shadow-none print:p-0">
            {/* Header */}
            <header className="border-b-2 border-process pb-6">
              <h2 className="font-sans text-3xl font-semibold tracking-tight">{profile.fullName}</h2>
              <p className="mt-1 text-[15px] font-medium text-process">{profile.professionalTitle}</p>
              <div className="mt-4 grid gap-1.5 text-xs text-muted-foreground sm:grid-cols-2">
                {profile.links.map((l) => (
                  <p key={l.platform} className="font-mono">
                    {l.label}
                  </p>
                ))}
                <p className="font-mono">{profile.location} · Moi University</p>
                <p className="font-mono">Graduation {education[0].graduationYear}</p>
              </div>
            </header>

            {/* Profile */}
            <section className="mt-6">
              <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-process">Profile</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-foreground/85">
                {profile.summary} Academic and practical exposure spans process design, chemical thermodynamics, mass
                and energy balances, transport phenomena, separation processes, reaction engineering, process control,
                process safety and industrial operations — with the ability to analyze process systems, model unit
                operations, document technical findings and work in multidisciplinary teams.
              </p>
            </section>

            {/* Education */}
            <section className="mt-6">
              <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-process">Education</h3>
              <div className="mt-2.5 flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-sm font-semibold">
                  {education[0].degree} — {education[0].institution}
                </p>
                <p className="font-mono text-xs text-muted-foreground">
                  {education[0].startYear} – {education[0].graduationYear}
                </p>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {education[0].school} · {education[0].location}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-foreground/75">
                Core: {education[0].coursework.map((c) => c.category).join(" · ")}
              </p>
            </section>

            {/* Projects */}
            <section className="mt-6">
              <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-process">Key Engineering Projects</h3>
              <ul className="mt-2.5 space-y-3">
                {projects.map((p) => (
                  <li key={p.slug}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="text-sm font-semibold">{p.shortTitle}</p>
                      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                        {categoryLabels[p.category]} · {p.year}
                      </p>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-foreground/75">
                      {p.summary} <span className="text-muted-foreground">Tools: {p.tools.join(", ")}.</span>
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            {/* Experience */}
            <section className="mt-6">
              <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-process">Industrial Attachment</h3>
              <div className="mt-2.5 flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-sm font-semibold">{experience[0].role}</p>
                <p className="font-mono text-xs text-muted-foreground">
                  {experience[0].startDate} – {experience[0].endDate}
                </p>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{experience[0].organization} · {experience[0].location}</p>
              <ul className="mt-2 space-y-1.5">
                {experience[0].responsibilities.slice(0, 6).map((r) => (
                  <li key={r} className="flex gap-2 text-xs leading-relaxed text-foreground/80">
                    <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-process" />
                    {r}
                  </li>
                ))}
              </ul>
            </section>

            {/* Skills */}
            <section className="mt-6">
              <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-process">Technical Skills</h3>
              <dl className="mt-2.5 space-y-2.5">
                {skillGroups.map((g) => (
                  <div key={g.title} className="grid gap-1 sm:grid-cols-[200px_1fr]">
                    <dt className="text-xs font-semibold text-foreground/90">{g.title}</dt>
                    <dd className="text-xs leading-relaxed text-foreground/75">
                      {g.skills.map((s) => s.name).join(", ")}
                    </dd>
                  </div>
                ))}
                {Object.values(toolGroups).map((g) => (
                  <div key={g.title} className="grid gap-1 sm:grid-cols-[200px_1fr]">
                    <dt className="text-xs font-semibold text-foreground/90">{g.title}</dt>
                    <dd className="text-xs leading-relaxed text-foreground/75">
                      {g.tools.map((t) => `${t.name} (${t.level})`).join(", ")}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* Currently learning */}
            <section className="mt-6">
              <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-process">Currently Developing</h3>
              <p className="mt-2.5 text-xs leading-relaxed text-foreground/75">
                {currentlyLearning.map((c) => c.name).join(" · ")}
              </p>
            </section>

            {/* Snapshot footer */}
            <footer className="mt-8 border-t border-line pt-4">
              <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 sm:grid-cols-3">
                {snapshot.slice(0, 6).map((s) => (
                  <p key={s.label} className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {s.label}: <span className="text-foreground/80">{s.value}</span>
                  </p>
                ))}
              </div>
            </footer>
          </article>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70 no-print">
            Detailed evidence lives in the portfolio — this CV is the summary layer
          </p>
        </Reveal>
      </div>

    </div>
  );
}
