"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * FlowField — the hero's living background.
 *
 * Particles drift along sine "process stream" lines and leave luminous
 * trails, leaning gently toward the cursor. Pure 2D canvas, tuned hard
 * for performance:
 *   - DPR capped at 1.5, particle count scales with area (max ~90)
 *   - pauses when offscreen (IntersectionObserver) or tab hidden
 *   - renders nothing under prefers-reduced-motion
 *   - zero allocations inside the frame loop
 *
 * Colors are read from the live theme CSS variables and re-read when the
 * theme class flips, so it stays on-palette in light & dark mode.
 */
export function FlowField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let visible = true;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let mx = -9999;
    let my = -9999;
    let rgb = [69, 198, 138]; // process green default (dark theme)

    interface P {
      x: number;
      y: number;
      speed: number;
      amp: number;
      freq: number;
      phase: number;
      size: number;
      alpha: number;
    }
    let particles: P[] = [];

    const readColor = () => {
      const style = getComputedStyle(document.documentElement);
      const raw = style.getPropertyValue("--process").trim();
      const m = raw.match(/^#?([0-9a-f]{6})$/i);
      if (m) {
        const hex = m[1];
        rgb = [
          parseInt(hex.slice(0, 2), 16),
          parseInt(hex.slice(2, 4), 16),
          parseInt(hex.slice(4, 6), 16),
        ];
      }
    };

    const seed = () => {
      const count = Math.min(90, Math.floor((w * h) / 16000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        speed: 0.25 + Math.random() * 0.55,
        amp: 14 + Math.random() * 34,
        freq: 0.0018 + Math.random() * 0.0032,
        phase: Math.random() * Math.PI * 2,
        size: 0.8 + Math.random() * 1.7,
        alpha: 0.25 + Math.random() * 0.5,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!running || !visible) return;

      // Fade existing pixels toward transparent — trail effect that works
      // over transparent canvases (destination-out compositing).
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.055)";
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = "lighter";
      const [r, g, b] = rgb;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const prevX = p.x;
        const prevY = p.y;
        p.x += p.speed;

        // Gentle cursor attraction — particles lean toward the pointer.
        if (mx > -999) {
          const dx = mx - p.x;
          const dy = my - p.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 32400) {
            const f = (1 - d2 / 32400) * 0.9;
            p.y += dy * 0.0035 * f;
          }
        }

        const y = p.y + Math.sin(p.x * p.freq + p.phase) * p.amp * 0.16;
        p.y += Math.sin(p.phase + p.x * 0.0007) * 0.08;

        ctx.strokeStyle = `rgba(${r},${g},${b},${p.alpha})`;
        ctx.lineWidth = p.size;
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(p.x, y);
        ctx.stroke();

        if (p.x > w + 10) {
          p.x = -10;
          p.y = Math.random() * h;
        }
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;
      }
      ctx.globalCompositeOperation = "source-over";
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
    };
    const onPointerLeave = () => {
      mx = -9999;
      my = -9999;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      },
      { rootMargin: "80px" }
    );
    io.observe(canvas);

    const onVisibility = () => {
      running = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility);

    const themeObserver = new MutationObserver(readColor);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);

    readColor();
    resize();
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("pointer-events-none", className)}
    />
  );
}
