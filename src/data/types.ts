/**
 * Shared type definitions for the portfolio data model.
 * Mirrors the specification in DAVID_WAFULA_CHEMICAL_PROCESS_PORTFOLIO_SPEC.md (§69).
 */

export type Proficiency =
  | "strong"
  | "working-knowledge"
  | "academic-exposure"
  | "currently-learning";

export interface Link {
  platform: string;
  label: string;
  url: string;
}

export interface Skill {
  name: string;
  proficiency: Proficiency;
  note?: string;
}

export interface SkillGroup {
  title: string;
  description?: string;
  skills: Skill[];
}

export interface ProcessStream {
  id: string;
  name: string;
  flowRate?: string;
  temperature?: string;
  pressure?: string;
  phase?: string;
  composition?: string;
  verified: boolean;
}

export interface ProcessEquipment {
  tag: string;
  name: string;
  type:
    | "tank"
    | "pump"
    | "reactor"
    | "separator"
    | "heat-exchanger"
    | "column"
    | "filter"
    | "dryer"
    | "compressor"
    | "other";
  description?: string;
  duty?: string;
  verified: boolean;
}

export interface ProcessMetric {
  label: string;
  value: string;
  unit?: string;
  verified: boolean;
}

export type ProjectCategory =
  | "process-design"
  | "reaction"
  | "separation"
  | "heat-transfer"
  | "fluid-flow"
  | "process-control"
  | "environmental"
  | "research";

export type ProjectType =
  | "final-year"
  | "academic"
  | "laboratory"
  | "team"
  | "personal";

export interface Project {
  slug: string;
  title: string;
  shortTitle: string;
  category: ProjectCategory;
  type: ProjectType;
  featured: boolean;
  year: number;
  duration: string;
  role: string;
  teamSize?: number;
  tools: string[];
  image: string;
  imageAlt: string;
  summary: string;
  problem: string;
  designBasis: string[];
  constraints?: string[];
  processFlowSteps: { label: string; tag?: string; note?: string }[];
  streams?: ProcessStream[];
  equipment?: ProcessEquipment[];
  massBalance?: string[];
  energyBalance?: string[];
  reaction?: string[];
  separation?: string[];
  simulation?: string[];
  control?: string[];
  safety?: string[];
  environmental?: string[];
  economics?: string[];
  results: string[];
  metrics: ProcessMetric[];
  limitations?: string[];
  lessons?: string[];
  improvements?: string[];
  verified: boolean;
}

export interface Experience {
  organization: string;
  organizationNote?: string;
  role: string;
  type: "industrial-attachment" | "internship" | "employment" | "research" | "volunteer";
  location?: string;
  startDate?: string;
  endDate?: string;
  image?: string;
  imageAlt?: string;
  summary: string;
  responsibilities: string[];
  processExposure?: string[];
  equipmentExposure?: string[];
  tools?: string[];
  lessons?: string[];
  verified: boolean;
}

export interface Education {
  institution: string;
  school?: string;
  degree: string;
  location?: string;
  startYear?: number;
  graduationYear?: number;
  classification?: string;
  coursework: { category: string; modules: string[] }[];
}

export interface LabArea {
  title: string;
  icon: string;
  work: string[];
}

export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
}

export interface GraduatePortfolio {
  profile: {
    fullName: string;
    professionalTitle: string;
    headline: string;
    summary: string;
    location: string;
    availability: string;
    portrait: string;
    links: Link[];
  };
  focusAreas: {
    title: string;
    description: string;
    topics: string[];
  }[];
  education: Education[];
  labs: LabArea[];
  skills: SkillGroup[];
  projects: Project[];
  experience: Experience[];
  currentlyLearning: { name: string; status: string; goal: string }[];
  philosophy: string[];
  timeline: TimelineEntry[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export const PROFICIENCY_LABELS: Record<Proficiency, string> = {
  strong: "Strong",
  "working-knowledge": "Working Knowledge",
  "academic-exposure": "Academic Exposure",
  "currently-learning": "Currently Learning",
};
