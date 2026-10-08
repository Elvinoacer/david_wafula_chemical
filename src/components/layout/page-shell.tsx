import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { TextReveal } from "@/components/motion/text-reveal";
import { Reveal } from "@/components/motion/reveal";

interface PageShellProps {
  docNo: string;
  eyebrow: string;
  title: string;
  description?: string;
  highlight?: string[];
  children: ReactNode;
  className?: string;
}

/**
 * Shared subpage scaffold: engineering document header, page title,
 * then free-flowing content.
 */
export function PageShell({
  docNo,
  eyebrow,
  title,
  description,
  highlight = [],
  children,
  className,
}: PageShellProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Blueprint backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-blueprint opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-28 sm:px-6 sm:pt-32 lg:px-8">
        <header className="mb-14 sm:mb-16">
          <Reveal y={14}>
            <div className="flex flex-wrap items-center gap-3">
              <span className="tech-label rounded-sm border border-line bg-surface px-1.5 py-0.5 text-process">
                {docNo}
              </span>
              <span className="tech-label text-muted-foreground">{eyebrow}</span>
            </div>
          </Reveal>
          <h1 className="mt-5 max-w-4xl text-balance font-sans text-4xl font-semibold leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl">
            <TextReveal text={title} highlight={highlight} />
          </h1>
          {description && (
            <Reveal delay={0.18} y={16}>
              <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                {description}
              </p>
            </Reveal>
          )}
        </header>
        {children}
      </div>
    </div>
  );
}
