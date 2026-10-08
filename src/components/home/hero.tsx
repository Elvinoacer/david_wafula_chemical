"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight, FileText, Mail } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { heroSupport } from "@/data/profile";
import { ProcessFlowRibbon } from "@/components/process/process-flow-chart";
import { ScrollScale } from "@/components/motion/parallax";
import { Magnetic } from "@/components/motion/magnetic";
import { TiltCard } from "@/components/motion/tilt-card";
import { FlowField } from "@/components/motion/flow-field";
import { useAppReady } from "@/components/experience/preloader";

const EASE = [0.22, 1, 0.36, 1] as const;

const HERO_FLOW = ["Feed", "Pretreat", "Reactor", "Separation", "Purify", "Product"];

const STREAM_CHIPS = [
  { tag: "F", value: "100 kg/day", label: "Flow" },
  { tag: "T", value: "60 °C", label: "Temp" },
  { tag: "P", value: "1.0 bar", label: "Press" },
  { tag: "X", value: "95 %", label: "Conv." },
];

const MARQUEE_TAGS = [
  "TK-101 FEED TANK",
  "P-101 TRANSFER PUMP",
  "R-101 REACTOR",
  "E-101 PREHEATER",
  "V-101 SEPARATOR",
  "C-101 MeOH RECOVERY",
  "D-101 DRYER",
  "TIC-101 TEMPERATURE LOOP",
  "FIC-102 FLOW LOOP",
  "LIC-103 LEVEL LOOP",
  "PFD · P&ID",
  "MASS BALANCE",
  "ENERGY BALANCE",
  "SANKEY ANALYSIS",
];

/** Character-split line — each glyph rises from its own mask. */
function CharLine({ text, className }: { text: string; className?: string }) {
  return (
    <span className={`inline-flex ${className ?? ""}`} aria-label={text}>
      {text.split("").map((ch, i) => (
        <span key={i} aria-hidden className="char-mask">
          <span data-hero-char className="char-inner">
            {ch === " " ? "\u00A0" : ch}
          </span>
        </span>
      ))}
    </span>
  );
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.95, delay, ease: EASE },
  }),
};

export function Hero() {
  const reduce = useReducedMotion();
  const ready = useAppReady();
  const sectionRef = useRef<HTMLElement>(null);

  // Entrance choreography — fires the moment the preloader curtain lifts.
  useLayoutEffect(() => {
    if (!ready || reduce) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.06 });
      tl.fromTo(
        "[data-hero-char]",
        { yPercent: 118, rotate: 6, transformOrigin: "0% 100%" },
        { yPercent: 0, rotate: 0, duration: 1.05, ease: "expo.out", stagger: 0.032 }
      ).fromTo(
        "[data-hero-word]",
        { yPercent: 114 },
        { yPercent: 0, duration: 1.15, ease: "expo.out" },
        "-=0.72"
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [ready, reduce]);

  // Scroll depth — ghost watermark and columns drift at different rates.
  useLayoutEffect(() => {
    if (reduce) return;
    const ctx = gsap.context(() => {
      const st = {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.6,
      } as const;
      gsap.to("[data-hero-ghost]", { xPercent: -9, yPercent: 18, ease: "none", scrollTrigger: st });
      gsap.to("[data-hero-left]", { yPercent: 8, ease: "none", scrollTrigger: { ...st, scrub: 0.45 } });
      gsap.to("[data-hero-right]", { yPercent: 15, ease: "none", scrollTrigger: st });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduce]);

  const show = ready || reduce;

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
      aria-label="Introduction"
    >
      {/* ── L0 · Imagery — Ken Burns under scroll parallax ─────────── */}
      <div aria-hidden className="absolute inset-0">
        <ScrollScale className="absolute inset-0">
          <div className={reduce ? "absolute inset-0" : "ken-burns absolute inset-0"}>
            <Image
              src="/images/hero-plant.webp"
              alt=""
              fill
              priority
              sizes="100vw"
              className="img-industrial object-cover opacity-40 dark:opacity-30"
            />
          </div>
        </ScrollScale>
      </div>

      {/* ── L1 · Flow field canvas — living process streams ────────── */}
      <FlowField className="absolute inset-0 h-full w-full opacity-70" />

      {/* ── L2 · Aurora light fields ───────────────────────────────── */}
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <div className="aurora aurora-a left-[-10%] top-[-15%] h-[46rem] w-[46rem] bg-process/15" />
        <div className="aurora aurora-b right-[-12%] top-[20%] h-[40rem] w-[40rem] bg-analysis/10" />
      </div>

      {/* ── L3 · Blueprint grid + cinematic vignettes ──────────────── */}
      <div aria-hidden className="absolute inset-0">
        <div className="absolute inset-0 bg-blueprint opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/55 to-background" />
        <div className="absolute inset-0 [background:radial-gradient(ellipse_75%_60%_at_50%_42%,transparent,color-mix(in_srgb,var(--background)_88%,transparent))]" />
      </div>

      {/* ── L4 · Ghost watermark — oversized outlined "Engineer" ────── */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-[16vh] z-[1] select-none overflow-hidden">
        <span
          data-hero-ghost
          className="text-outline block whitespace-nowrap text-center font-sans text-[clamp(4.5rem,17vw,17rem)] font-black uppercase leading-none tracking-[-0.02em] will-change-transform"
        >
          Engineer
        </span>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          {/* ── Left: identity ─────────────────────────────── */}
          <div data-hero-left>
            <motion.div
              variants={fadeUp}
              custom={0.95}
              initial={reduce ? false : "hidden"}
              animate={show ? "show" : "hidden"}
              className="flex flex-wrap items-center gap-2.5"
            >
              <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5">
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-process" aria-hidden />
                <span className="tech-label text-process">Open to graduate roles</span>
              </span>
              <span className="tech-label hidden text-muted-foreground xl:inline">{heroSupport.eyebrow}</span>
              <span className="tech-label hidden text-muted-foreground/60 lg:inline">
                0.51° N — 35.27° E
              </span>
            </motion.div>

            <h1 className="mt-8 font-sans text-[clamp(3.6rem,11vw,9.6rem)] font-bold leading-[0.92] tracking-[-0.035em]">
              <CharLine text="David" />
              <span className="block overflow-hidden pb-[0.08em]">
                <span data-hero-word className="text-flow block origin-left will-change-transform">
                  Wafula
                </span>
              </span>
            </h1>

            {/* Editorial serif tagline — the human line under the name */}
            <motion.p
              variants={fadeUp}
              custom={1.12}
              initial={reduce ? false : "hidden"}
              animate={show ? "show" : "hidden"}
              className="mt-6 max-w-xl text-pretty font-sans text-lg font-medium leading-snug text-foreground/90 sm:text-xl"
            >
              <span className="display-accent text-[1.28em] text-process">Waste into fuel.</span>{" "}
              <span className="display-accent text-[1.28em] text-process">Ideas into flowsheets.</span>{" "}
              <span className="display-accent text-[1.28em] text-process">Problems into processes.</span>
            </motion.p>

            <motion.p
              variants={fadeUp}
              custom={1.22}
              initial={reduce ? false : "hidden"}
              animate={show ? "show" : "hidden"}
              className="mt-5 max-w-xl text-pretty text-[15px] leading-relaxed text-muted-foreground"
            >
              {heroSupport.copy}
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={1.34}
              initial={reduce ? false : "hidden"}
              animate={show ? "show" : "hidden"}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Magnetic strength={7}>
                <Link
                  href={heroSupport.primaryCta.href}
                  data-cursor="Explore"
                  className="beam-border group inline-flex items-center gap-2 rounded-full bg-process px-6 py-3.5 text-sm font-semibold text-process-foreground shadow-[0_10px_40px_-12px_color-mix(in_srgb,var(--process)_75%,transparent)] transition-all hover:brightness-110 hover:shadow-[0_18px_54px_-14px_color-mix(in_srgb,var(--process)_85%,transparent)]"
                >
                  {heroSupport.primaryCta.label}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Magnetic>
              <Magnetic strength={5}>
                <Link
                  href={heroSupport.secondaryCta.href}
                  data-cursor="Open"
                  className="glass inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all hover:border-process/50 hover:text-process"
                >
                  <FileText className="h-4 w-4" />
                  {heroSupport.secondaryCta.label}
                </Link>
              </Magnetic>
              <Link
                href={heroSupport.tertiaryCta.href}
                data-cursor="Write"
                className="group inline-flex items-center gap-2 rounded-full px-4 py-3.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="h-4 w-4" />
                {heroSupport.tertiaryCta.label}
                <span className="link-sweep" />
              </Link>
            </motion.div>

            {/* Process ribbon — the hero's technical signature */}
            <motion.div
              variants={fadeUp}
              custom={1.46}
              initial={reduce ? false : "hidden"}
              animate={show ? "show" : "hidden"}
              className="mt-12"
            >
              <p className="tech-label mb-3 text-muted-foreground">
                How I see every process — inputs to products
              </p>
              <ProcessFlowRibbon steps={HERO_FLOW} />
            </motion.div>
          </div>

          {/* ── Right: portrait + stream chips ─────────────────── */}
          <motion.div
            variants={fadeUp}
            custom={1.05}
            initial={reduce ? false : "hidden"}
            animate={show ? "show" : "hidden"}
            data-hero-right
            className="relative mx-auto w-full max-w-sm lg:max-w-none"
          >
            <TiltCard max={6} className="relative">
              <div className="corner-frame relative overflow-hidden rounded-2xl glass p-2">
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                  <Image
                    src="/images/portrait.webp"
                    alt="Portrait of David Wafula, graduate chemical & process engineer"
                    fill
                    priority
                    sizes="(max-width: 1024px) 90vw, 40vw"
                    className="img-industrial object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="tech-label scrim-text text-process">B.Eng. · Moi University</p>
                    <p className="mt-1 scrim-text text-sm font-medium text-foreground">
                      Eldoret, Kenya · Class of 2026
                    </p>
                  </div>
                </div>
              </div>
            </TiltCard>

            {/* Floating stream chips (T / P / F / X) */}
            <div className="pointer-events-none absolute -left-3 top-6 hidden flex-col gap-2 sm:flex lg:-left-10">
              {STREAM_CHIPS.slice(0, 2).map((chip, i) => (
                <motion.div
                  key={chip.tag}
                  className="glass flex items-center gap-2.5 rounded-xl px-3 py-2"
                  animate={reduce ? undefined : { y: [0, -7, 0] }}
                  transition={{ duration: 5 + i * 1.2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-md border border-process/40 bg-process-soft font-mono text-[11px] font-bold text-process">
                    {chip.tag}
                  </span>
                  <div>
                    <p className="font-mono text-xs font-semibold leading-none">{chip.value}</p>
                    <p className="tech-label mt-1 text-muted-foreground">{chip.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="pointer-events-none absolute -right-3 bottom-16 hidden flex-col gap-2 sm:flex lg:-right-8">
              {STREAM_CHIPS.slice(2).map((chip, i) => (
                <motion.div
                  key={chip.tag}
                  className="glass flex items-center gap-2.5 rounded-xl px-3 py-2"
                  animate={reduce ? undefined : { y: [0, 7, 0] }}
                  transition={{ duration: 5.6 + i * 1.4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-md border border-analysis/40 bg-analysis-soft font-mono text-[11px] font-bold text-analysis">
                    {chip.tag}
                  </span>
                  <div>
                    <p className="font-mono text-xs font-semibold leading-none">{chip.value}</p>
                    <p className="tech-label mt-1 text-muted-foreground">{chip.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Equipment-tag marquee ────────────────────────────────── */}
      <div className="relative z-10 border-t border-line/70 py-3.5 backdrop-blur-md">
        <div className="pointer-events-none absolute inset-0 bg-surface/40" />
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="marquee-track flex w-max items-center gap-8">
            {[...MARQUEE_TAGS, ...MARQUEE_TAGS].map((tag, i) => (
              <span key={`${tag}-${i}`} className="flex items-center gap-8 whitespace-nowrap">
                <span className="font-mono text-[11px] font-medium uppercase tracking-wider text-foreground/70">
                  {tag}
                </span>
                <span aria-hidden className="h-1 w-1 rounded-full bg-process/60" />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll cue — animated line in a track ─────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-20 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2.5 lg:flex"
      >
        <span className="tech-label text-muted-foreground/70">Scroll</span>
        <span className="relative h-12 w-px overflow-hidden bg-line">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-process"
            animate={reduce ? undefined : { y: [-16, 48] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
          />
        </span>
      </div>
    </section>
  );
}
