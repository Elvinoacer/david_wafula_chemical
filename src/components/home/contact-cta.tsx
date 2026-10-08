"use client";

import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import { profile } from "@/data/profile";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { LiveClock } from "@/components/layout/live-clock";

/**
 * The finale — the one section that inverts the entire theme.
 * Scoped `.finale` variables flip the design system to warm cream with
 * deep green, so the last screen the visitor sees feels like the lights
 * coming up after a film.
 */
export function ContactCta() {
  const email = profile.links[0].label;
  const mailto = profile.links[0].url;

  return (
    <section
      aria-labelledby="contact-heading"
      className="finale relative overflow-hidden border-t border-line/60 bg-background text-foreground"
    >
      {/* Texture */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint opacity-50" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_65%_55%_at_50%_35%,color-mix(in_srgb,var(--process)_9%,transparent),transparent)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <Reveal y={14}>
          <div className="flex items-center gap-4">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-process" aria-hidden />
            <p className="tech-label text-muted-foreground">13 · Transmission — final section</p>
            <span aria-hidden className="h-px flex-1 bg-line" />
          </div>
        </Reveal>

        {/* The giant ask */}
        <h2
          id="contact-heading"
          className="mt-10 font-sans text-[clamp(2.9rem,8.8vw,8.2rem)] font-black uppercase leading-[0.95] tracking-[-0.03em]"
        >
          <Reveal y={40}>
            <span className="block">Let&rsquo;s build</span>
          </Reveal>
          <Reveal y={40} delay={0.12}>
            <span className="block">
              something{" "}
              <span className="display-accent normal-case tracking-normal text-process">
                unforgettable.
              </span>
            </span>
          </Reveal>
        </h2>

        <div className="mt-14 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_auto]">
          <div>
            <Reveal delay={0.2} y={20}>
              <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                I am open to graduate chemical, process, production, plant, manufacturing and
                operations engineering opportunities — in Kenya and beyond. If you have a process
                that could be safer, smarter or more efficient, send a message and I will respond
                promptly.
              </p>
            </Reveal>

            <Reveal delay={0.3} y={20}>
              <a
                href={mailto}
                data-cursor="Write"
                className="link-sweep mt-8 inline-block font-mono text-[clamp(1.05rem,2.6vw,1.7rem)] font-semibold tracking-tight text-foreground"
              >
                {email}
              </a>
            </Reveal>

            <Reveal delay={0.38} y={18}>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
                <a
                  href={profile.links[1].url}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1.5 font-medium text-foreground"
                >
                  LinkedIn
                  <ArrowUpRight className="h-3.5 w-3.5 text-process transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <Link
                  href="/cv"
                  className="group inline-flex items-center gap-1.5 font-medium text-foreground"
                >
                  <Download className="h-3.5 w-3.5 text-process" />
                  Download CV
                </Link>
                <Link href="/contact" className="font-medium text-muted-foreground transition-colors hover:text-foreground">
                  Prefer a form? Contact page →
                </Link>
              </div>
            </Reveal>
          </div>

          {/* The magnetic circular CTA with rotating inscription */}
          <Reveal delay={0.25} y={24} className="justify-self-start lg:justify-self-end">
            <Magnetic strength={12}>
              <a
                href={mailto}
                data-cursor="Write"
                aria-label={`Email ${email}`}
                className="group relative flex h-44 w-44 items-center justify-center rounded-full transition-colors duration-500 hover:bg-process hover:text-process-foreground sm:h-52 sm:w-52"
              >
                <svg
                  aria-hidden
                  viewBox="0 0 100 100"
                  className="absolute inset-0 h-full w-full animate-[spin_18s_linear_infinite] text-foreground/50 transition-colors duration-500 group-hover:text-process-foreground/70"
                >
                  <defs>
                    <path
                      id="cta-circle"
                      d="M 50,50 m -41,0 a 41,41 0 1,1 82,0 a 41,41 0 1,1 -82,0"
                    />
                  </defs>
                  <text className="fill-current font-mono text-[5.2px] uppercase tracking-[0.24em]">
                    <textPath href="#cta-circle">
                      open to graduate roles · class of 2026 · eldoret · kenya ·
                    </textPath>
                  </text>
                </svg>
                <span className="pointer-events-none absolute inset-3 rounded-full border border-foreground/15 transition-colors duration-500 group-hover:border-process-foreground/30" />
                <span className="relative flex flex-col items-center gap-1 text-center">
                  <span className="tech-label opacity-70">Say</span>
                  <span className="text-xl font-semibold tracking-tight sm:text-2xl">Hello</span>
                  <ArrowUpRight
                    className="h-5 w-5 text-process transition-all duration-500 group-hover:rotate-45 group-hover:text-process-foreground"
                    aria-hidden
                  />
                </span>
              </a>
            </Magnetic>
          </Reveal>
        </div>

        {/* Status strip */}
        <Reveal delay={0.2} y={18}>
          <div className="mt-20 grid grid-cols-1 gap-6 border-t border-line pt-8 sm:grid-cols-3">
            <div>
              <p className="tech-label text-muted-foreground">Response</p>
              <p className="mt-2 text-sm font-medium">Typically within 24 hours</p>
            </div>
            <div>
              <p className="tech-label text-muted-foreground">Location</p>
              <p className="mt-2 text-sm font-medium">
                Eldoret, Kenya — <LiveClock className="font-mono" /> EAT
              </p>
            </div>
            <div>
              <p className="tech-label text-muted-foreground">Status</p>
              <p className="mt-2 text-sm font-medium">
                Open to graduate process · production · plant roles
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
