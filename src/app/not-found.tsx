import Link from "next/link";
import { projects } from "@/data/projects";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[80vh] flex-col items-center justify-center px-4 pt-16 text-center">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-blueprint opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="relative">
        <p className="tech-label text-process">Error 404 · Stream Not Found</p>
        <h1 className="mt-6 font-sans text-5xl font-semibold tracking-tight sm:text-6xl">
          Off-spec stream.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-balance text-sm leading-relaxed text-muted-foreground">
          This stream never reached a unit operation — the page you requested does not exist. Recycle back to a
          known-good source instead.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-lg bg-process px-5 py-3 text-sm font-semibold text-process-foreground transition-all hover:brightness-110"
          >
            Back to homepage
          </Link>
          <Link
            href={`/projects/${projects[0].slug}`}
            className="rounded-lg border border-line bg-surface/70 px-5 py-3 text-sm font-semibold transition-colors hover:border-process/50 hover:text-process"
          >
            View flagship project
          </Link>
        </div>
      </div>
    </div>
  );
}
