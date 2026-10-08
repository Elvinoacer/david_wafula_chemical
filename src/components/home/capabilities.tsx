"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { focusAreas } from "@/data/profile";
import { gsap } from "@/lib/gsap";
import { SectionHeading } from "@/components/motion/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

/** One image per capability area — the floating preview swaps between them. */
const AREA_IMAGES = [
  "/images/about-pfd.webp",
  "/images/distillation.webp",
  "/images/reactor.webp",
  "/images/heat-exchanger.webp",
  "/images/control-room.webp",
  "/images/lab.webp",
];

/**
 * Capability rows — the editorial index pattern. Each row sweeps on hover
 * while a floating image preview trails the cursor (fine pointers only).
 */
export function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Wire the cursor-follow preview (desktop, fine pointer, motion OK).
  // The preview element always exists but stays opacity-0 until wired.
  useEffect(() => {
    const section = sectionRef.current;
    const preview = previewRef.current;
    if (!section || !preview) return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!fine || reduced || !desktop) return;

    gsap.set(preview, { xPercent: 8, yPercent: -112, scale: 0.85, opacity: 0 });

    const xTo = gsap.quickTo(preview, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(preview, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const onEnter = () => gsap.to(preview, { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" });
    const onLeave = () => gsap.to(preview, { opacity: 0, scale: 0.85, duration: 0.3, ease: "power3.out" });

    section.addEventListener("mousemove", onMove, { passive: true });
    section.addEventListener("mouseenter", onEnter);
    section.addEventListener("mouseleave", onLeave);

    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseenter", onEnter);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="capabilities-heading"
      className="relative border-t border-line/60 bg-surface/30"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-dots opacity-40" />

      {/* Floating cursor preview — hidden by default, revealed by GSAP when wired */}
      <div
        ref={previewRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-30 hidden w-72 opacity-0 will-change-transform lg:block"
      >
        <div className="corner-frame relative aspect-[4/3] overflow-hidden rounded-xl border border-line/80 bg-surface shadow-[0_32px_80px_-32px_rgb(0_0_0/0.6)]">
          {AREA_IMAGES.map((src, i) => (
            <div
              key={src}
              className={`absolute inset-0 transition-opacity duration-300 ${
                active === i ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image src={src} alt="" fill sizes="288px" className="img-industrial object-cover" />
            </div>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <SectionHeading
          index="05"
          eyebrow="Core Process Capability Areas"
          title="Six ways I think about a process."
          description="Chemical engineering is not a list of courses — it is a set of lenses. Each area below is one lens, with the topics I can actually work with."
        />

        <Stagger className="mt-14" stagger={0.07}>
          {focusAreas.map((area, i) => (
            <StaggerItem key={area.title}>
              <div className="border-t border-line/70 last:border-b last:border-line/70">
                <Link
                  href="/process-engineering"
                  data-cursor="Open"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="row-sweep group grid grid-cols-[auto_1fr_auto] items-center gap-4 px-2 py-6 sm:px-4 lg:grid-cols-[64px_1.05fr_1fr_52px] lg:gap-8 lg:py-7"
                >
                  <span className="tech-label w-7 text-muted-foreground transition-colors duration-300 group-hover:text-process">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <h3 className="text-balance font-sans text-[clamp(1.45rem,3.1vw,2.5rem)] font-semibold leading-tight tracking-[-0.015em] transition-transform duration-500 ease-out group-hover:translate-x-2">
                      {area.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 max-w-lg text-[13px] leading-relaxed text-muted-foreground lg:hidden">
                      {area.description}
                    </p>
                  </div>

                  <div className="hidden lg:block">
                    <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                      {area.description}
                    </p>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {area.topics.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition-colors group-hover:border-process/30 group-hover:text-foreground/80"
                        >
                          {t}
                        </span>
                      ))}
                      {area.topics.length > 3 && (
                        <span className="rounded-full bg-process-soft px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-process">
                          +{area.topics.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  <span className="flex h-11 w-11 items-center justify-center justify-self-end rounded-full border border-line transition-all duration-500 group-hover:rotate-45 group-hover:border-process/50 group-hover:bg-process-soft">
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors duration-300 group-hover:text-process" />
                  </span>
                </Link>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <p className="mt-8 text-sm text-muted-foreground">
          See the full proficiency breakdown on the{" "}
          <Link href="/process-engineering" className="link-sweep font-medium text-process">
            Process Engineering
          </Link>{" "}
          page — Strong / Working Knowledge / Academic Exposure, no invented percentages.
        </p>
      </div>
    </section>
  );
}
