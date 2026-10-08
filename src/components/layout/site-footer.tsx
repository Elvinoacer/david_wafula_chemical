"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";
import { NAV_ITEMS } from "./nav-config";
import { profile } from "@/data/profile";

export function SiteFooter() {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto border-t border-line bg-surface/40">
      {/* Gradient hairline — deliberate close of the document */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-process/50 to-transparent"
      />
      {/* Blueprint texture */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint opacity-60" />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.35fr_0.85fr_1.05fr]">
          <div>
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="flex h-9 w-9 items-center justify-center rounded-md border border-process/40 bg-process-soft font-mono text-[13px] font-bold text-process"
              >
                DW
              </span>
              <div className="leading-tight">
                <p className="text-sm font-semibold">David Wafula</p>
                <p className="tech-label text-muted-foreground">Graduate Chemical & Process Engineer</p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {profile.availability}
            </p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">
              {profile.location} · Moi University · B.Eng. {new Date().getFullYear()}
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="tech-label text-muted-foreground">Site Map</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`text-sm transition-colors hover:text-process ${
                      pathname === item.href ? "text-process" : "text-foreground/80"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="tech-label text-muted-foreground">Direct Lines</p>
            <ul className="mt-4 space-y-2.5">
              {profile.links.map((link) => (
                <li key={link.platform}>
                  <a
                    href={link.url}
                    target={link.url.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="link-sweep text-sm text-foreground/80 hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link href="/recruiter" className="link-sweep text-sm font-medium text-process">
                  Recruiter quick view →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">
            DW-PORT · Rev 1.0 · © {year} David Wafula
          </p>
          <p className="hidden font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70 lg:block">
            Balance the mass · Track the energy · Control the process
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition-colors hover:text-process"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
