import type { GraduatePortfolio, Link } from "./types";

/**
 * Candidate profile — David Wafula.
 * Per the specification's placeholder policy: name, university, degree,
 * career stage and country are confirmed; remaining contact details are
 * placeholders to be replaced before publication (see VERIFICATION.md).
 */

export const links: Link[] = [
  { platform: "Email", label: "david.wafula@example.com", url: "mailto:david.wafula@example.com" },
  { platform: "LinkedIn", label: "linkedin.com/in/david-wafula", url: "https://www.linkedin.com/in/david-wafula" },
  { platform: "GitHub", label: "github.com/davidwafula", url: "https://github.com/davidwafula" },
];

export const profile: GraduatePortfolio["profile"] = {
  fullName: "David Wafula",
  professionalTitle: "Graduate Chemical & Process Engineer",
  headline:
    "Chemical & Process Engineering Graduate focused on Process Design, Optimization & Sustainable Production",
  summary:
    "Moi University engineering graduate interested in process design, simulation, plant operations and sustainable production.",
  location: "Kenya",
  availability:
    "Open to graduate process, production, plant, operations and manufacturing engineering opportunities.",
  portrait: "/images/portrait.webp",
  links,
};

export const heroSupport = {
  eyebrow: "Moi University · B.Eng. Chemical & Process Engineering",
  copy:
    "I am interested in how raw materials move through interconnected processes to become useful products safely, efficiently and consistently. My engineering background spans process design, thermodynamics, transport phenomena, reaction engineering, separations, process control, simulation and industrial operations.",
  primaryCta: { label: "Explore Process Engineering Work", href: "/projects" },
  secondaryCta: { label: "Download CV", href: "/cv" },
  tertiaryCta: { label: "Contact David", href: "/contact" },
};

export const snapshot: { label: string; value: string; note?: string }[] = [
  { label: "Degree", value: "B.Eng. Chemical & Process Engineering" },
  { label: "University", value: "Moi University" },
  { label: "Graduation", value: "2026", note: "to confirm" },
  { label: "Focus", value: "Process Design · Simulation · Operations" },
  { label: "Engineering Projects", value: "6", note: "academic" },
  { label: "Industrial Attachment", value: "12 weeks", note: "supervised" },
  { label: "Core Tools", value: "Aspen Plus / HYSYS · MATLAB · Excel" },
  { label: "Location", value: "Kenya" },
  { label: "Availability", value: "Graduate opportunities" },
];

export const aboutParagraphs = [
  "I am a Chemical & Process Engineering graduate from Moi University with strong interest in process design, industrial operations, process optimization and sustainable manufacturing. My training has exposed me to chemical thermodynamics, fluid mechanics, heat transfer, mass transfer, reaction engineering, separation processes, process control, plant design, process safety and engineering economics.",
  "I enjoy problems where multiple unit operations must work together as one system. I am particularly interested in understanding where material and energy are lost, what limits production, how operating conditions affect product quality, and how a process can be made safer and more efficient.",
  "I approach process problems by defining the system boundary, establishing mass and energy balances, identifying key constraints, modelling the process and then evaluating the technical and operational trade-offs. That sequence — boundary, balance, constraint, model, trade-off — is how I try to think about every engineering problem I meet.",
  "I am looking for graduate opportunities where I can develop my process-design and plant-operations skills while contributing to real industrial systems.",
];

export const focusAreas: GraduatePortfolio["focusAreas"] = [
  {
    title: "Process Design",
    description:
      "Turning product and production requirements into technically coherent process systems.",
    topics: [
      "Process Flowsheets",
      "Mass Balances",
      "Energy Balances",
      "Equipment Sizing Fundamentals",
      "Utility Requirements",
      "Process Integration",
      "Design Basis",
      "Process Economics",
    ],
  },
  {
    title: "Separation Processes",
    description:
      "Understanding how mixtures are separated to achieve product quality and process efficiency.",
    topics: [
      "Distillation",
      "Absorption",
      "Extraction",
      "Filtration",
      "Drying",
      "Evaporation",
      "Membrane Concepts",
      "Solid-Liquid Separation",
    ],
  },
  {
    title: "Reaction Engineering",
    description:
      "Understanding how reaction conditions and reactor configuration influence production performance.",
    topics: [
      "Reaction Kinetics",
      "Conversion",
      "Selectivity",
      "Yield",
      "Reactor Types",
      "Residence Time",
      "Temperature Effects",
      "Reactor Sizing",
    ],
  },
  {
    title: "Transport Phenomena",
    description:
      "Understanding how momentum, heat and mass move through process equipment.",
    topics: [
      "Fluid Flow",
      "Heat Transfer",
      "Mass Transfer",
      "Pressure Drop",
      "Heat Exchangers",
      "Pumps",
      "Diffusion",
      "Momentum Transfer",
    ],
  },
  {
    title: "Process Control & Operations",
    description:
      "Keeping process systems stable, measurable and within safe operating conditions.",
    topics: [
      "Sensors",
      "Controllers",
      "Feedback",
      "PID Fundamentals",
      "Process Variables",
      "Control Loops",
      "Instrumentation",
      "Operating Windows",
    ],
  },
  {
    title: "Safety & Environment",
    description:
      "Designing and operating with hazard awareness and environmental responsibility.",
    topics: [
      "Hazard Identification",
      "Safe Operating Envelopes",
      "Relief & Venting Concepts",
      "SDS Interpretation",
      "Waste Minimisation",
      "Heat Recovery",
      "Emissions Awareness",
      "Cleaner Production",
    ],
  },
];

export const currentlyLearning: GraduatePortfolio["currentlyLearning"] = [
  { name: "Aspen Plus", status: "In progress", goal: "Build rigorous flowsheet models with recycle and convergence" },
  { name: "Aspen HYSYS", status: "In progress", goal: "Model steady-state separation and utility systems" },
  { name: "Python for process calculations", status: "In progress", goal: "Automate balance solving and plot process data" },
  { name: "Process optimization", status: "Exploring", goal: "Apply sensitivity analysis to operating variables" },
  { name: "HAZOP methodology", status: "Studying", goal: "Understand guide-word based hazard studies" },
  { name: "PID tuning", status: "Studying", goal: "Practice tuning on process-control trainers" },
  { name: "Heat integration", status: "Exploring", goal: "Apply pinch concepts to recovery networks" },
  { name: "Process economics", status: "Exploring", goal: "Strengthen CAPEX / OPEX estimation for design work" },
];

export const philosophy: string[] = [
  "Balance the mass.",
  "Track the energy.",
  "Understand the chemistry.",
  "Control the process.",
  "Design for safety and efficiency.",
];

export const philosophyExpanded =
  "I see process engineering as the discipline of understanding how materials and energy move through interconnected systems. Good design requires reliable balances, realistic assumptions, safe operating conditions, practical equipment choices and awareness of how one process decision affects the rest of the plant.";

export const timeline: GraduatePortfolio["timeline"] = [
  {
    year: "2021",
    title: "Engineering & Science Foundations",
    description: "Mathematics, chemistry, physics and introductory engineering.",
  },
  {
    year: "2022",
    title: "Process Fundamentals",
    description: "Material balances, fluid mechanics, thermodynamics and laboratory work.",
  },
  {
    year: "2023",
    title: "Heat, Mass & Reaction Systems",
    description: "Heat transfer, mass transfer, separations and reaction engineering.",
  },
  {
    year: "2024",
    title: "Process Systems",
    description: "Process control, simulation, plant design and environmental engineering.",
  },
  {
    year: "2025",
    title: "Industrial Attachment",
    description: "Practical exposure to production, utilities, process monitoring and safety.",
  },
  {
    year: "2026",
    title: "Final-Year Process Design",
    description: "Completed an integrated process-design project and prepared for graduate roles.",
  },
];

export const seo: GraduatePortfolio["seo"] = {
  title: "David Wafula | Chemical & Process Engineer",
  description:
    "David Wafula is a Moi University Chemical & Process Engineering graduate focused on process design, simulation, operations and sustainable production. Explore his process projects, industrial experience and engineering portfolio.",
  keywords: [
    "David Wafula Chemical Engineer",
    "Moi University Chemical Engineering Graduate",
    "Graduate Process Engineer Kenya",
    "Chemical Engineer Kenya",
    "Process Engineer Graduate Kenya",
  ],
};

export const siteStats = [
  { value: 6, suffix: "", label: "Engineering projects", sub: "design · simulation · labs" },
  { value: 5, suffix: "", label: "Core process areas", sub: "design to control" },
  { value: 12, suffix: " wks", label: "Industrial attachment", sub: "supervised exposure" },
  { value: 30, suffix: "+", label: "Modules covered", sub: "thermo · transport · control" },
];
