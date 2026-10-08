import type { SkillGroup } from "./types";

/**
 * Technical skills — proficiency wording follows the specification:
 * Strong / Working Knowledge / Academic Exposure / Currently Learning.
 * No percentages.
 */

export const skillGroups: SkillGroup[] = [
  {
    title: "Material & Energy Balances",
    description: "The foundation of every process calculation I do.",
    skills: [
      { name: "Steady-state mass balances", proficiency: "strong" },
      { name: "Component balances", proficiency: "strong" },
      { name: "Recycle / purge systems", proficiency: "working-knowledge" },
      { name: "Energy balances", proficiency: "strong" },
      { name: "Heat duties", proficiency: "working-knowledge" },
      { name: "Process flow calculations", proficiency: "strong" },
    ],
  },
  {
    title: "Thermodynamics",
    description: "Property and phase behaviour reasoning for design work.",
    skills: [
      { name: "Phase equilibrium", proficiency: "working-knowledge" },
      { name: "Vapor-liquid equilibrium", proficiency: "working-knowledge" },
      { name: "Equation-of-state concepts", proficiency: "academic-exposure" },
      { name: "Enthalpy calculations", proficiency: "working-knowledge" },
      { name: "Property estimation", proficiency: "working-knowledge" },
    ],
  },
  {
    title: "Fluid Mechanics",
    description: "From Bernoulli to pump selection.",
    skills: [
      { name: "Bernoulli equation", proficiency: "strong" },
      { name: "Pipe-flow calculations", proficiency: "strong" },
      { name: "Pressure drop", proficiency: "working-knowledge" },
      { name: "Pump fundamentals", proficiency: "working-knowledge" },
      { name: "Friction-factor concepts", proficiency: "strong" },
      { name: "Flow measurement", proficiency: "working-knowledge" },
    ],
  },
  {
    title: "Heat Transfer",
    description: "Conduction, convection and exchanger reasoning.",
    skills: [
      { name: "Conduction", proficiency: "strong" },
      { name: "Convection", proficiency: "strong" },
      { name: "Heat exchangers", proficiency: "working-knowledge" },
      { name: "Overall heat-transfer coefficient", proficiency: "working-knowledge" },
      { name: "LMTD method", proficiency: "working-knowledge" },
      { name: "Heat-exchanger sizing fundamentals", proficiency: "working-knowledge" },
    ],
  },
  {
    title: "Mass Transfer & Separations",
    description: "Getting mixtures to specification.",
    skills: [
      { name: "Distillation fundamentals", proficiency: "strong" },
      { name: "McCabe-Thiele method", proficiency: "working-knowledge" },
      { name: "Absorption", proficiency: "working-knowledge" },
      { name: "Extraction", proficiency: "working-knowledge" },
      { name: "Drying", proficiency: "working-knowledge" },
      { name: "Filtration", proficiency: "working-knowledge" },
    ],
  },
  {
    title: "Reaction Engineering",
    description: "Rates, conversion and reactor thinking.",
    skills: [
      { name: "Rate laws", proficiency: "strong" },
      { name: "Conversion & selectivity", proficiency: "strong" },
      { name: "Batch reactor", proficiency: "working-knowledge" },
      { name: "CSTR", proficiency: "working-knowledge" },
      { name: "PFR", proficiency: "working-knowledge" },
      { name: "Residence time & reactor sizing", proficiency: "working-knowledge" },
    ],
  },
  {
    title: "Process Control",
    description: "Keeping processes measurable and stable.",
    skills: [
      { name: "Process variables", proficiency: "strong" },
      { name: "Instrumentation fundamentals", proficiency: "working-knowledge" },
      { name: "Feedback control", proficiency: "working-knowledge" },
      { name: "PID concepts", proficiency: "working-knowledge" },
      { name: "Process response", proficiency: "working-knowledge" },
      { name: "Control-loop interpretation", proficiency: "working-knowledge" },
    ],
  },
];

export const toolGroups = {
  simulation: {
    title: "Process Simulation",
    note: "Used for academic process simulation, stream analysis and selected unit-operation studies.",
    tools: [
      { name: "Aspen Plus", level: "Working Knowledge" },
      { name: "Aspen HYSYS", level: "Working Knowledge" },
      { name: "DWSIM", level: "Working Knowledge" },
      { name: "ChemCAD", level: "Academic Exposure" },
    ],
  },
  analysis: {
    title: "Analysis & Computation",
    note: "Every project begins and ends in a spreadsheet or a script.",
    tools: [
      { name: "MATLAB", level: "Working Knowledge" },
      { name: "Microsoft Excel", level: "Strong" },
      { name: "Python", level: "Working Knowledge" },
    ],
  },
  diagrams: {
    title: "Process Diagrams & Drafting",
    note: "Communicating a process is part of designing it.",
    tools: [
      { name: "AutoCAD", level: "Working Knowledge" },
      { name: "Visio / Draw.io", level: "Working Knowledge" },
      { name: "PFD / P&ID drafting concepts", level: "Working Knowledge" },
    ],
  },
  data: {
    title: "Data & Statistics",
    note: "Lab data deserves honest statistics.",
    tools: [
      { name: "Excel data analysis", level: "Strong" },
      { name: "Minitab", level: "Academic Exposure" },
    ],
  },
};

export const safetySkills = {
  areas: [
    "Hazard identification",
    "Process safety fundamentals",
    "Pressure hazards",
    "Flammability concepts",
    "Chemical exposure",
    "Relief / venting concepts",
    "Safe operating envelopes",
    "Permit-to-work awareness",
    "Lockout / tagout exposure",
    "PPE",
    "SDS interpretation",
    "Incident prevention",
    "HAZOP fundamentals",
  ],
  statement:
    "Academic exposure to process-safety tools and supervised industrial safety procedures; not presented as independent process-safety authority.",
  framework: [
    { step: "Identify Hazard", note: "What can go wrong, and where?" },
    { step: "Understand Cause", note: "Which deviation or failure leads there?" },
    { step: "Estimate Consequence", note: "How severe could the outcome be?" },
    { step: "Apply Safeguards", note: "Prevention and mitigation layers." },
    { step: "Monitor", note: "Watch the operating envelope." },
    { step: "Review", note: "Re-assess when the process changes." },
  ],
};
