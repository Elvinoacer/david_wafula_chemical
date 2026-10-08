"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle dark and light theme"
      title="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="group relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-line bg-surface/70 text-muted-foreground transition-colors hover:border-process/50 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      {/* Both icons live in the DOM; CSS class strategy decides which is visible — no hydration mismatch */}
      <Sun
        className="h-4 w-4 rotate-0 scale-100 transition-all duration-500 group-hover:rotate-12 dark:-rotate-90 dark:scale-0"
        aria-hidden
      />
      <Moon
        className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-500 group-hover:-rotate-12 dark:rotate-0 dark:scale-100"
        aria-hidden
      />
    </button>
  );
}
