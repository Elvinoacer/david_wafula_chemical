"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { LiveClock } from "./live-clock";
import { MenuOverlay } from "./menu-overlay";

/**
 * Minimal elite header — brand · live local time · theme · MENU.
 * All navigation lives in the full-screen takeover menu.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu whenever the route changes (render-time reset —
  // the sanctioned pattern for adjusting state on external change)
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-[150]">
      {/* Scroll progress — a process line filling across the page */}
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-process via-process to-analysis"
      />

      <div
        className={cn(
          "transition-all duration-500",
          scrolled && !open
            ? "border-b border-line/60 bg-background/75 backdrop-blur-2xl backdrop-saturate-150"
            : "border-b border-transparent"
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* Brand */}
          <Link href="/" className="group flex items-center gap-3" aria-label="David Wafula — home">
            <span
              aria-hidden
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-process/40 bg-process-soft font-mono text-[13px] font-bold text-process transition-all duration-300 group-hover:glow-process"
            >
              DW
            </span>
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="text-sm font-semibold tracking-tight">David Wafula</span>
              <span className="tech-label text-muted-foreground">Chemical &amp; Process Engineer</span>
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Live local time — the alive detail */}
            <p className="tech-label hidden text-muted-foreground md:block" aria-label="Local time in Eldoret, Kenya">
              Eldoret · <LiveClock className="text-foreground" /> EAT
            </p>

            <ThemeToggle />

            {/* MENU toggle */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="group relative inline-flex h-10 items-center gap-3 overflow-hidden rounded-full border border-line bg-surface/70 px-4 transition-all duration-300 hover:border-process/50"
            >
              <span className="tech-label text-foreground transition-colors group-hover:text-process">
                {open ? "Close" : "Menu"}
              </span>
              <span aria-hidden className="relative flex h-3 w-4 flex-col justify-between">
                <span
                  className={cn(
                    "h-[1.5px] w-full rounded-full bg-foreground transition-all duration-300 group-hover:bg-process",
                    open && "translate-y-[5.5px] rotate-45 bg-process"
                  )}
                />
                <span
                  className={cn(
                    "h-[1.5px] w-full rounded-full bg-foreground transition-all duration-300 group-hover:bg-process",
                    open && "-translate-y-[5.5px] -rotate-45 bg-process"
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      <MenuOverlay open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
