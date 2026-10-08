"use client";

import { Printer } from "lucide-react";

export function PrintButton({ label = "Print / Save as PDF" }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-lg bg-process px-5 py-3 text-sm font-semibold text-process-foreground transition-all hover:brightness-110"
    >
      <Printer className="h-4 w-4" />
      {label}
    </button>
  );
}
