"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { MoveRight } from "lucide-react";
import { gsap } from "@/lib/gsap";

const GALLERY = [
  { img: "/images/lab.webp", tag: "LAB-01", title: "Unit Operations Lab", note: "Heat & mass transfer rigs — measured, analysed, reported" },
  { img: "/images/control-room.webp", tag: "CTR-02", title: "Control Room", note: "Loops, trends and the operating picture" },
  { img: "/images/reactor.webp", tag: "R-101", title: "Reactor Systems", note: "Batch chemistry at 60 °C — stirred, jacketed, controlled" },
  { img: "/images/heat-exchanger.webp", tag: "E-101", title: "Heat Exchange", note: "Shell & tube duty and LMTD reasoning" },
  { img: "/images/pumping.webp", tag: "P-101", title: "Fluid Flow & Pumping", note: "Head loss, NPSH and the pump curve" },
  { img: "/images/education.webp", tag: "EDU-06", title: "The Making", note: "Moi University — B.Eng., class of 2026" },
];

/**
 * The Process Gallery — a pinned horizontal traverse on desktop
 * (GSAP ScrollTrigger + per-image parallax via containerAnimation),
 * degrading to a native snap-scroll strip on touch / reduced motion.
 */
export function Playground() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track) return;

    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        viewport.style.overflow = "visible";
        const getDistance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getDistance()}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressRef.current) {
                progressRef.current.style.transform = `scaleX(${self.progress})`;
              }
            },
          },
        });

        // Inner image parallax — images drift inside their frames as the
        // traverse moves, adding depth without extra scroll work.
        gsap.utils.toArray<HTMLElement>("[data-gallery-img]").forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -6, scale: 1.18 },
            {
              xPercent: 6,
              scale: 1.18,
              ease: "none",
              scrollTrigger: {
                trigger: img.closest("[data-gallery-card]") as HTMLElement,
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        });

        return () => {
          viewport.style.overflow = "";
        };
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="gallery-heading"
      className="relative border-t border-line/60 bg-surface/30 py-20 lg:flex lg:h-[100svh] lg:flex-col lg:justify-center lg:py-0"
    >
      {/* Heading */}
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="tech-label text-muted-foreground">12 · The Process Gallery</p>
            <h2
              id="gallery-heading"
              className="mt-4 text-balance font-sans text-[clamp(2.1rem,4.8vw,3.8rem)] font-semibold leading-[1.04] tracking-[-0.02em]"
            >
              Where theory meets{" "}
              <span className="display-accent text-process">hardware.</span>
            </h2>
          </div>
          <p className="tech-label flex items-center gap-2 text-muted-foreground">
            ( Keep scrolling )
            <MoveRight className="h-4 w-4 text-process" aria-hidden />
          </p>
        </div>
        {/* Traverse progress (desktop) */}
        <div aria-hidden className="mt-8 hidden h-px w-full bg-line lg:block">
          <div ref={progressRef} className="h-full w-full origin-left scale-x-0 bg-process" />
        </div>
      </div>

      {/* Horizontal traverse */}
      <div
        ref={viewportRef}
        className="mt-10 snap-x snap-mandatory overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div
          ref={trackRef}
          className="flex w-max snap-always items-stretch gap-5 px-4 pb-4 sm:gap-6 sm:px-6 lg:px-8 lg:pb-0 will-change-transform"
        >
          {GALLERY.map((item, i) => (
            <figure
              key={item.tag}
              data-gallery-card
              className="corner-frame group relative h-[52vh] min-h-[380px] w-[80vw] shrink-0 snap-center overflow-hidden rounded-2xl border border-line/80 sm:w-[52vw] lg:h-[54vh] lg:w-[36vw] xl:w-[30vw]"
            >
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={item.img}
                  alt={`${item.title} — ${item.note}`}
                  fill
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 52vw, 36vw"
                  className="img-industrial object-cover will-change-transform"
                  data-gallery-img
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/25 to-transparent" />

              {/* Ghost index */}
              <span
                aria-hidden
                className="absolute right-4 top-2 font-sans text-6xl font-black leading-none tracking-tighter text-foreground/10 transition-colors duration-500 group-hover:text-process/25"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <figcaption className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <span className="glass tech-label inline-block rounded-full px-2.5 py-1 text-process">
                  {item.tag}
                </span>
                <h3 className="mt-3 font-sans text-xl font-semibold tracking-tight sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-muted-foreground">
                  {item.note}
                </p>
              </figcaption>
            </figure>
          ))}

          {/* End spacer */}
          <div aria-hidden className="w-2 shrink-0" />
        </div>
      </div>
    </section>
  );
}
