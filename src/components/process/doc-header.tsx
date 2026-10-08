import { cn } from "@/lib/utils";

interface DocHeaderProps {
  docNo: string;
  title: string;
  subtitle?: string;
  rev?: string;
  className?: string;
}

/**
 * Engineering drawing title block — the portfolio's signature authenticity
 * detail. Renders like the corner of a real process drawing.
 */
export function DocHeader({ docNo, title, subtitle, rev = "1.0", className }: DocHeaderProps) {
  return (
    <div
      className={cn(
        "grid w-full max-w-md grid-cols-1 gap-px overflow-hidden rounded-md border border-line bg-line font-mono text-[10px] uppercase tracking-wider sm:grid-cols-[1fr_auto]",
        className
      )}
      aria-label={`Document ${docNo}, revision ${rev}`}
    >
      <div className="bg-surface px-3.5 py-2.5">
        <p className="text-muted-foreground">Document</p>
        <p className="mt-1 truncate text-[11px] font-semibold tracking-wide text-foreground">{title}</p>
        {subtitle && <p className="mt-0.5 truncate text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="grid grid-cols-2 gap-px bg-line sm:grid-cols-1">
        <div className="bg-surface px-3.5 py-2.5">
          <p className="text-muted-foreground">DWG NO</p>
          <p className="mt-1 text-[11px] font-semibold text-process">{docNo}</p>
        </div>
        <div className="bg-surface px-3.5 py-2.5">
          <p className="text-muted-foreground">REV</p>
          <p className="mt-1 text-[11px] font-semibold text-foreground">{rev}</p>
        </div>
      </div>
    </div>
  );
}
