# David Wafula — Chemical & Process Engineering Portfolio

A state-of-the-art graduate portfolio built to the specification in
`DAVID_WAFULA_CHEMICAL_PROCESS_PORTFOLIO_SPEC.md` — a precision-industrial,
process-engineering editorial system with animated PFD diagrams, stream tables,
mass/energy Sankey diagrams, scroll-driven motion and full light/dark theming.

## v3 — The Elite Experience Layer

On top of the content system, the site now opens like a film and scrolls like
one. Highlights:

- **Cinematic preloader** — 0→100 counter, cycling discipline words, and a
  five-column curtain lift (GSAP), with `prefers-reduced-motion` fast-path.
- **Custom cursor** — dot + trailing ring that morphs into labelled badges
  (`VIEW`, `READ`, `OPEN`, `WRITE`…) over anything tagged `data-cursor`.
  Fine pointers only; touch users get nothing extra to download.
- **Full-screen takeover menu** — clip-path curtain, staggered giant links,
  hover image previews, live Eldoret clock, ESC/route-change close.
- **GSAP ScrollTrigger + Lenis** on one shared ticker (`ScrollTrigger.update`
  on every eased frame) — pinned and scrubbed effects stay butter-smooth.
- **Velocity-reactive marquee** — giant solid/outline word strip whose speed
  surges with scroll velocity, then settles.
- **Scrub manifesto** — the operating philosophy reveals word-by-word as you
  scroll, serif-italic accent beats.
- **Pinned horizontal Process Gallery** — a scroll-driven traverse with
  per-image parallax (`containerAnimation`) and a progress hairline; falls
  back to native snap-scroll on touch / reduced motion.
- **Capability index rows** — editorial rows with a cursor-following image
  preview and hover sweeps.
- **Parallax imagery** — every `data-parallax-img` drifts inside its frame
  (transform-only, scrubbed).
- **Inverted cream finale** — the last section flips the entire design system
  (scoped `.finale` CSS variables) to warm cream + deep green, with a magnetic
  circular CTA ringed by a rotating inscription.
- **Performance discipline** — transform/opacity-only motion, `will-change`
  only where animated, `next/image` everywhere, canvas paused offscreen,
  and every effect gated by `matchMedia` + reduced-motion checks.

## Quick Start

```bash
# install (bun or npm)
bun install        # or: npm install

# develop
bun run dev        # or: npm run dev
# → http://localhost:3000

# production build
bun run build      # or: npm run build
bun start          # or: npm start
```

No database setup is required to run the portfolio — all content is
TypeScript data under `src/data/`. (A Prisma/SQLite scaffold is included for
future extensions; see `prisma/schema.prisma`.)

## Tech Stack

| Layer      | Choice |
|------------|--------|
| Framework  | Next.js 16 (App Router, RSC, static params) |
| Language   | TypeScript 5 (strict) |
| Styling    | Tailwind CSS 4 + design tokens (CSS variables) |
| Motion     | GSAP 3 + ScrollTrigger (pin/scrub/velocity), Lenis smooth scroll, Framer Motion 12 (reveals, parallax, layout pills) |
| UI         | shadcn/ui (New York) + Lucide icons |
| Theming    | next-themes — dark default, class strategy |
| Fonts      | Geist Sans (display/body) + Geist Mono (technical labels) |
| SEO        | Metadata API, JSON-LD `Person`, sitemap, robots, Open Graph |

## Routes

```
/                       Homepage — 13 sections (hero → contact)
/about                  Story, five-step method, philosophy
/projects               All six case studies
/projects/[slug]        16-part engineering case study (×6)
/experience             Industrial attachment record
/process-engineering    Skills register, control loop, safety, sustainability
/education              Degree, coursework, labs, pilot plant, timeline
/cv                     Print-ready CV (Print / Save as PDF)
/recruiter              Recruiter quick view (print-optimised)
/contact                Channels + mailto compose form
```

## Editing Content

All copy and data live in typed data modules:

```
src/data/
├── types.ts        # Data model (mirrors spec §69)
├── profile.ts      # Headline, snapshot, about, philosophy, timeline, SEO
├── skills.ts       # Skill groups, tools, safety framework
├── projects.ts     # 6 projects — full case-study data
└── experience.ts   # Attachment, education, coursework, labs
```

Change the wording there and every page updates. Equipment tags, stream
tables, Sankey values and metrics all come from the same files.

### Theming

Palette tokens are defined once in `src/app/globals.css`
(`:root` light, `.dark` dark) per spec §7 — process green, engineering blue,
safety amber. Change `--process` to re-skin the entire site.

### Imagery

All imagery lives in `public/images/*.webp` (AI-generated illustrative
placeholders, cohesive cinematic-industrial style). Replace with real
photography before publication — see `VERIFICATION.md`.
`scripts/generate-images.ts` can regenerate the placeholder set.

## Signature Components

- `ProcessFlowChart` / `ProcessFlowRibbon` — animated PFD-style flows with
  marching-dash mass flow and equipment tags (TK-101, R-101 …)
- `StreamTable` — mono-spaced stream data with verification labelling
- `SankeyDiagram` — custom SVG mass/energy balance diagrams
- `ControlLoop` — animated feedback-control visual
- `DocHeader` — engineering drawing title block (DWG NO / REV)
- `TextReveal`, `Reveal`, `Stagger`, `Counter`, `Parallax` — motion toolkit

## Accessibility & Performance

- Semantic HTML, ARIA-labelled diagrams and controls, keyboard navigable
- `prefers-reduced-motion` respected globally (animations disabled)
- Next/Image with WebP, responsive `sizes`, priority hero only
- Static generation for all routes; viewport-height images lazy-loaded

## Deploying to Vercel

```bash
npx vercel        # from the project root
```

No environment variables are required. Update `metadataBase` in
`src/app/layout.tsx` and the URL in `src/app/sitemap.ts` / `robots.ts` to the
final domain after deployment.

---

## v2 — Elite Motion & Design Upgrade

The portfolio was elevated to an award-tier ("SOTD-calibre") experience:

**Motion system**
- **Lenis smooth scrolling** (`lenis`) — lerp 0.11, shared rAF loop, auto-pauses
  during overlay menus, skipped on small touch devices and reduced-motion users.
- **Magnetic buttons** — spring-physics cursor attraction on primary CTAs.
- **3D tilt cards** — cursor-tracked rotation with glare + spotlight sheets on
  project cards and the hero portrait (fine pointers only).
- **FlowField canvas** — a living particle "process stream" background in the
  hero: DPR-capped, intersection-paused, theme-aware, zero per-frame allocations.
- **Apex word reveals** — hero headline lines rise out of masks with rotation;
  section titles reveal word-by-word with italic serif accents
  (Instrument Serif) and an animated gradient treatment.

**Design system**
- Cinematic film grain overlay, drifting aurora light fields, Ken Burns hero
  imagery, rotating conic "beam" borders on hover, glass panels with luminous
  edges, ghost outlined display type, refined selection/focus/scrollbar states.
- Floating glass header card with layout-animated nav pill and scroll progress.
- Light-mode contrast tuning (gradient text, glass, outline type).

**Performance discipline**
- All scroll-linked animation is transform/opacity only; `whileInView` reveals
  fire once; canvas pauses offscreen and on hidden tabs; tilt/magnetic disabled
  on touch and reduced motion; production build is fully static/SSG (20 routes).
