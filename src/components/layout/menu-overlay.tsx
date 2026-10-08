"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { profile } from "@/data/profile";
import { LiveClock } from "@/components/layout/live-clock";

const LINKS = [
  { href: "/projects", label: "Projects", tag: "01", img: "/images/biodiesel.webp", note: "Six documented case studies" },
  { href: "/experience", label: "Experience", tag: "02", img: "/images/hero-plant.webp", note: "Attachment & roles" },
  { href: "/process-engineering", label: "Process Engineering", tag: "03", img: "/images/about-pfd.webp", note: "Capability areas" },
  { href: "/education", label: "Education", tag: "04", img: "/images/education.webp", note: "B.Eng. — Moi University" },
  { href: "/about", label: "About", tag: "05", img: "/images/portrait.webp", note: "The person behind the PFDs" },
  { href: "/contact", label: "Contact", tag: "06", img: "/images/control-room.webp", note: "Say hello" },
];

const UTILITY = [
  { href: "/", label: "Home" },
  { href: "/cv", label: "CV" },
  { href: "/recruiter", label: "Recruiter Mode" },
];

/**
 * Full-screen takeover menu — clip-path curtain, staggered giant links,
 * hover image previews. One GSAP timeline played forward / reversed.
 */
export function MenuOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // Build the timeline once
  useLayoutEffect(() => {
    const root = rootRef.current;
    const panel = panelRef.current;
    if (!root || !panel) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const linkInners = root.querySelectorAll("[data-menu-link-inner]");
      const metas = root.querySelectorAll("[data-menu-meta]");

      if (reduced) {
        gsap.set(linkInners, { yPercent: 0, rotate: 0 });
        gsap.set(metas, { opacity: 1, y: 0 });
        gsap.set("[data-menu-preview]", { opacity: 1, scale: 1 });
        return;
      }

      gsap.set(linkInners, { yPercent: 120, rotate: 4 });
      gsap.set(metas, { opacity: 0, y: 22 });
      gsap.set("[data-menu-preview]", { opacity: 0, scale: 0.92 });

      const tl = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
      tl.to(panel, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.85, ease: "expo.inOut" })
        .to(linkInners, { yPercent: 0, rotate: 0, duration: 0.9, stagger: 0.055 }, "-=0.42")
        .to(metas, { opacity: 1, y: 0, duration: 0.6, stagger: 0.07 }, "-=0.62")
        .to("[data-menu-preview]", { opacity: 1, scale: 1, duration: 0.7 }, "-=0.55");
      tlRef.current = tl;
    }, root);

    return () => ctx.revert();
  }, []);

  // Play / reverse on open state
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const tl = tlRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (open) {
      root.style.pointerEvents = "auto";
      root.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      if (reduced) {
        gsap.set(panelRef.current, { clipPath: "inset(0% 0% 0% 0%)" });
      } else {
        tl?.timeScale(1).play();
      }
    } else {
      root.style.pointerEvents = "none";
      root.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (reduced) {
        gsap.set(panelRef.current, { clipPath: "inset(0% 0% 100% 0%)" });
      } else if (tl && tl.progress() > 0) {
        tl.timeScale(1.6).reverse();
      }
    }
  }, [open, tlRef]);

  // Escape closes
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      aria-hidden="true"
      inert={!open}
      className="pointer-events-none fixed inset-0 z-[140] overflow-y-auto"
    >
      <div
        ref={panelRef}
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
        className="relative min-h-full bg-background will-change-[clip-path]"
      >
        {/* Texture layers */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint opacity-50" />
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="aurora aurora-a right-[-10%] top-[-20%] h-[36rem] w-[36rem] bg-process/10" />
          <div className="aurora aurora-b left-[-12%] bottom-[-25%] h-[32rem] w-[32rem] bg-analysis/[0.07]" />
        </div>

        <div className="relative mx-auto flex min-h-full max-w-7xl flex-col justify-between px-4 pb-10 pt-28 sm:px-6 sm:pt-32 lg:px-8">
          <div className="grid flex-1 gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
            {/* ── Left · the links ─────────────────────────────── */}
            <nav aria-label="Menu">
              <p data-menu-meta className="tech-label mb-6 text-muted-foreground">
                Navigation — DW / 2026
              </p>
              <ul>
                {LINKS.map((item, i) => (
                  <li key={item.href} className="border-t border-line/60 last:border-b">
                    <Link
                      href={item.href}
                      onClick={onClose}
                      onMouseEnter={() => setActiveIdx(i)}
                      onFocus={() => setActiveIdx(i)}
                      className="group flex items-baseline gap-4 py-2.5 sm:gap-6 sm:py-3"
                    >
                      <span className="tech-label w-8 shrink-0 text-muted-foreground transition-colors duration-300 group-hover:text-process">
                        {item.tag}
                      </span>
                      <span className="overflow-hidden pb-1">
                        <span
                          data-menu-link-inner
                          className="block origin-left text-[clamp(1.85rem,5.2vw,3.9rem)] font-semibold leading-[1.08] tracking-[-0.02em] transition-all duration-500 group-hover:translate-x-2 group-hover:text-process will-change-transform"
                        >
                          {item.label}
                        </span>
                      </span>
                      <span className="ml-auto hidden items-center gap-6 md:flex">
                        <span className="tech-label text-muted-foreground/70">{item.note}</span>
                        <ArrowUpRight className="h-5 w-5 -translate-x-1 translate-y-1 text-process opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* ── Right · preview + status (large screens) ─────── */}
            <aside className="hidden flex-col justify-end gap-6 lg:flex">
              <div
                data-menu-preview
                className="corner-frame relative aspect-[4/3] w-full max-w-md self-end overflow-hidden rounded-2xl border border-line/80"
              >
                {LINKS.map((item, i) => (
                  <div
                    key={item.href}
                    aria-hidden
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      activeIdx === i ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Image src={item.img} alt="" fill sizes="(max-width: 1024px) 0px, 40vw" className="img-industrial scale-105 object-cover" />
                  </div>
                ))}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              </div>

              <div data-menu-meta className="glass max-w-md self-end rounded-2xl p-5">
                <p className="flex items-center gap-2 tech-label text-process">
                  <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-process" aria-hidden />
                  Open to graduate roles
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Process · production · plant · operations engineering — Kenya &amp; beyond.
                </p>
                <a
                  href={profile.links[0].url}
                  className="group/link mt-4 inline-flex items-center gap-2 text-sm font-medium text-foreground"
                >
                  <Mail className="h-4 w-4 text-process" />
                  <span className="link-sweep">{profile.links[0].label}</span>
                </a>
              </div>
            </aside>
          </div>

          {/* ── Footer strip ──────────────────────────────────── */}
          <div data-menu-meta className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line/60 pt-6">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {UTILITY.map((u) => (
                <li key={u.href}>
                  <Link
                    href={u.href}
                    onClick={onClose}
                    className="tech-label text-muted-foreground transition-colors hover:text-process"
                  >
                    {u.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="tech-label text-muted-foreground">
              Eldoret · <LiveClock className="text-foreground" /> EAT
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
