"use client";

import { useEffect, useState } from "react";

/**
 * Live local time in Eldoret, Kenya (EAT, UTC+3) — the small detail that
 * makes the site feel alive. Renders a deterministic placeholder on the
 * server to avoid hydration mismatch, then ticks once mounted.
 */
export function LiveClock({ className }: { className?: string }) {
  const [time, setTime] = useState<string>("··:··:··");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Africa/Nairobi",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    // rAF keeps the first paint off the effect body (React Compiler safe).
    const raf = requestAnimationFrame(tick);
    const id = setInterval(tick, 1000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(id);
    };
  }, []);

  return (
    <span className={className} suppressHydrationWarning>
      {time}
    </span>
  );
}
