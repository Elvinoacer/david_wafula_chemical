import type { Metadata } from "next";
import { Mail, MapPin, Clock } from "lucide-react";

function Linkedin(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function Github(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}
import { profile } from "@/data/profile";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { ProcessFlowRibbon } from "@/components/process/process-flow-chart";
import { ContactForm } from "@/components/sections/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact David Wafula — open to graduate chemical, process, production, plant, manufacturing and operations engineering opportunities.",
};

export default function ContactPage() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-blueprint opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent)]"
      />

      <div className="relative mx-auto max-w-5xl px-4 pb-24 pt-28 sm:px-6 sm:pt-32 lg:px-8">
        <header>
          <Reveal y={14}>
            <div className="flex items-center gap-3">
              <span className="tech-label rounded-sm border border-line bg-surface px-1.5 py-0.5 text-process">
                DW-CON-009
              </span>
              <span className="tech-label text-muted-foreground">Contact</span>
            </div>
          </Reveal>
          <h1 className="mt-5 max-w-3xl text-balance font-sans text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            <TextReveal
              text="Interested in building safer, smarter and more efficient processes?"
              highlight={["safer,", "smarter"]}
            />
          </h1>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              I am open to graduate chemical, process, production, plant, manufacturing and operations engineering
              opportunities. Tell me about the role — or the process problem — and I will respond promptly.
            </p>
          </Reveal>
        </header>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Channels */}
          <div className="space-y-4">
            {[
              {
                icon: Mail,
                label: "Email",
                value: profile.links[0].url.replace("mailto:", ""),
                href: profile.links[0].url,
                note: "Best for detailed enquiries",
              },
              {
                icon: Linkedin,
                label: "LinkedIn",
                value: profile.links[1].label,
                href: profile.links[1].url,
                note: "Professional profile & updates",
              },
              {
                icon: Github,
                label: "GitHub",
                value: profile.links[2].label,
                href: profile.links[2].url,
                note: "Calculation notebooks & experiments",
              },
            ].map((ch, i) => (
              <Reveal key={ch.label} delay={i * 0.07}>
                <a
                  href={ch.href}
                  target={ch.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="card-lift group flex items-start gap-4 rounded-xl border border-line bg-surface/70 p-5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-process/35 bg-process-soft text-process">
                    <ch.icon className="h-[18px] w-[18px]" />
                  </span>
                  <div className="min-w-0">
                    <p className="tech-label text-muted-foreground">{ch.label}</p>
                    <p className="mt-1 truncate text-sm font-semibold group-hover:text-process">{ch.value}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{ch.note}</p>
                  </div>
                </a>
              </Reveal>
            ))}

            <Reveal delay={0.24}>
              <div className="rounded-xl border border-line bg-surface/50 p-5">
                <div className="flex items-center gap-2.5 text-sm font-medium">
                  <MapPin className="h-4 w-4 text-process" />
                  Kenya · open to relocation
                </div>
                <div className="mt-3 flex items-center gap-2.5 text-sm font-medium">
                  <Clock className="h-4 w-4 text-process" />
                  Typically replies within 24 hours
                </div>
                <div className="mt-5">
                  <p className="tech-label mb-3 text-muted-foreground">The message cycle</p>
                  <ProcessFlowRibbon steps={["Your note", "My read", "My reply"]} />
                </div>
              </div>
            </Reveal>
          </div>

          {/* Compose form (mailto) */}
          <Reveal delay={0.12}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </div>
  );
}
