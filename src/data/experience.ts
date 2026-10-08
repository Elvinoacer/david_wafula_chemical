import type { Experience, Education, LabArea } from "./types";

/**
 * Experience & education data.
 * The industrial attachment is written at a supervised, graduate-appropriate
 * level per the specification (§39) — observed / assisted / participated,
 * never independent authority.
 */

export const experience: Experience[] = [
  {
    organization: "Process Manufacturing Plant",
    organizationNote: "Company name withheld pending verification — details to be confirmed with the host employer",
    role: "Chemical / Process Engineering Intern (Industrial Attachment)",
    type: "industrial-attachment",
    location: "Kenya",
    startDate: "May 2025",
    endDate: "August 2025",
    image: "/images/control-room.webp",
    imageAlt: "Industrial control room with SCADA screens showing process diagrams and trends",
    summary:
      "A 12-week supervised industrial attachment in a production environment — observing plant process flow, assisting with operating-parameter recording and production data, and participating in safety routines alongside the production team.",
    responsibilities: [
      "Observed the plant process flow and its major unit operations, from raw-material handling to packaging.",
      "Assisted with recording operating parameters and logging shift production data.",
      "Supported material-balance exercises using recorded production figures.",
      "Observed process-control systems and field instrumentation in normal operation.",
      "Assisted with routine quality checks under supervision of the quality team.",
      "Participated in safety briefings, toolbox talks and permit-to-work awareness sessions.",
      "Observed cleaning-in-place and shutdown procedures.",
      "Assisted with process documentation and record keeping.",
      "Learned operating limits and escalation procedures.",
      "Participated in troubleshooting discussions under supervision.",
      "Observed utilities operation — steam, cooling water and compressed air distribution.",
    ],
    processExposure: [
      "Batch and continuous production stages",
      "Heat transfer and utility systems",
      "Filtration and solids handling",
      "Cleaning-in-place cycles",
      "Process data recording and trending",
    ],
    equipmentExposure: [
      "Pumps",
      "Heat exchangers",
      "Storage tanks",
      "Filters",
      "Boilers",
      "Cooling towers",
      "Mixers",
      "Valves and instrumentation",
    ],
    tools: ["Excel", "Operator log sheets", "SCADA observation"],
    lessons: [
      "Process engineering is the connection between chemistry, equipment, operating conditions and production targets.",
      "Small changes in temperature, flow, pressure or composition can affect quality, safety and output.",
      "Standard operating procedures, process data, maintenance, communication and safety discipline carry the plant.",
    ],
    verified: false,
  },
];

export const education: Education[] = [
  {
    institution: "Moi University",
    school: "School of Engineering",
    degree: "Bachelor of Engineering in Chemical & Process Engineering",
    location: "Eldoret, Kenya",
    startYear: 2021,
    graduationYear: 2026,
    classification: "To be confirmed",
    coursework: [
      {
        category: "Process Fundamentals",
        modules: [
          "Material & Energy Balances",
          "Chemical Engineering Thermodynamics",
          "Process Calculations",
          "Engineering Mathematics",
          "Numerical Methods",
        ],
      },
      {
        category: "Transport Phenomena",
        modules: ["Fluid Mechanics", "Heat Transfer", "Mass Transfer", "Transport Processes"],
      },
      {
        category: "Reaction Engineering",
        modules: ["Chemical Reaction Engineering", "Reactor Design", "Kinetics", "Catalysis Fundamentals"],
      },
      {
        category: "Separations",
        modules: ["Distillation", "Absorption", "Extraction", "Drying", "Filtration", "Evaporation"],
      },
      {
        category: "Process Systems",
        modules: [
          "Process Control",
          "Instrumentation",
          "Process Design",
          "Plant Design",
          "Process Simulation",
          "Process Optimization",
        ],
      },
      {
        category: "Industrial & Management",
        modules: [
          "Engineering Economics",
          "Project Management",
          "Safety Engineering",
          "Environmental Engineering",
          "Quality Control",
          "Industrial Management",
        ],
      },
      {
        category: "Supporting Sciences",
        modules: [
          "Physical Chemistry",
          "Organic Chemistry",
          "Analytical Chemistry",
          "Materials Science",
          "Biochemical Engineering",
        ],
      },
    ],
  },
];

export const labs: LabArea[] = [
  {
    title: "Fluid Mechanics Laboratory",
    icon: "waves",
    work: ["Flow measurement", "Pressure drop", "Pipe losses", "Pump characteristics", "Reynolds number"],
  },
  {
    title: "Heat Transfer Laboratory",
    icon: "flame",
    work: ["Conduction", "Convection", "Heat exchangers", "Thermal conductivity", "Overall coefficients"],
  },
  {
    title: "Mass Transfer Laboratory",
    icon: "droplets",
    work: ["Distillation", "Drying", "Absorption", "Extraction", "Diffusion"],
  },
  {
    title: "Reaction Engineering Laboratory",
    icon: "flask-conical",
    work: ["Batch reactors", "CSTR/PFR demonstrations", "Kinetics", "Conversion", "Residence time"],
  },
  {
    title: "Process Control Laboratory",
    icon: "gauge",
    work: ["Level control", "Temperature control", "Flow control", "Controller tuning", "Process response"],
  },
  {
    title: "Chemistry / Analytical Laboratory",
    icon: "test-tubes",
    work: ["Titration", "Concentration", "pH", "Spectroscopy", "Product analysis"],
  },
];

export const pilotPlant = [
  "Distillation rig",
  "Heat-exchanger trainer",
  "Flow loop",
  "Reactor rig",
  "Process-control trainer",
  "Filtration unit",
];
