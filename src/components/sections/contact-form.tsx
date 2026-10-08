"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { profile } from "@/data/profile";

export function ContactForm() {
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [message, setMessage] = useState("");

  const email = profile.links[0].url.replace("mailto:", "");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Graduate engineering enquiry — ${name || "Website"}`);
    const body = encodeURIComponent(
      `From: ${name}${org ? ` (${org})` : ""}\n\n${message}\n\n— Sent from the David Wafula portfolio`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={submit} className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
      <p className="tech-label text-process">Compose a message</p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        This opens your email client with the message pre-filled — no data is stored or sent by this site.
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label htmlFor="name" className="tech-label block text-muted-foreground">
            Your name
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Otieno"
            className="mt-2 w-full rounded-lg border border-line bg-background/70 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-process/60 focus:ring-2 focus:ring-process/20"
          />
        </div>
        <div>
          <label htmlFor="org" className="tech-label block text-muted-foreground">
            Organisation <span className="normal-case">(optional)</span>
          </label>
          <input
            id="org"
            type="text"
            value={org}
            onChange={(e) => setOrg(e.target.value)}
            placeholder="Acme Process Industries"
            className="mt-2 w-full rounded-lg border border-line bg-background/70 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-process/60 focus:ring-2 focus:ring-process/20"
          />
        </div>
        <div>
          <label htmlFor="message" className="tech-label block text-muted-foreground">
            Message
          </label>
          <textarea
            id="message"
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="We are hiring graduate process engineers for our production team in…"
            className="mt-2 w-full resize-none rounded-lg border border-line bg-background/70 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-process/60 focus:ring-2 focus:ring-process/20"
          />
        </div>
        <button
          type="submit"
          className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-process px-5 py-3.5 text-sm font-semibold text-process-foreground transition-all hover:brightness-110"
        >
          <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          Compose email
        </button>
      </div>
    </form>
  );
}
