import type { Project } from "./types";

/**
 * Project portfolio — 6 case studies per the specification (§37).
 *
 * Data policy: numeric process values are illustrative academic estimates
 * typical of university design work; each carries verified: false so the UI
 * can label them honestly until real project data replaces them
 * (see VERIFICATION.md §Phase 2).
 */

export const projects: Project[] = [
  {
    slug: "biodiesel-process-design",
    title: "Design & Simulation of a Small-Scale Biodiesel Production Process from Waste Cooking Oil",
    shortTitle: "Biodiesel Process Design",
    category: "process-design",
    type: "final-year",
    featured: true,
    year: 2026,
    duration: "Two semesters",
    role: "Process Design, Simulation, Mass/Energy Balances & Evaluation",
    tools: ["Aspen Plus", "Excel", "MATLAB"],
    image: "/images/biodiesel.webp",
    imageAlt:
      "Stainless steel stirred reactor vessels of a small-scale biodiesel pilot plant with jacketed piping",
    summary:
      "A conceptual process converting waste cooking oil into biodiesel through pretreatment, transesterification, separation, washing/purification and product recovery — combining process flow development, material balances, energy estimates, reactor reasoning, separation requirements, simulation and preliminary economic and sustainability evaluation.",
    problem:
      "Waste cooking oil creates disposal and environmental challenges while also representing a potential feedstock for fuel production. The engineering challenge was to develop a process that handles variable feed quality, converts triglycerides effectively, minimises reactant loss, separates glycerol, removes impurities, meets biodiesel quality expectations, reduces energy and chemical consumption, and remains practical at small scale.",
    designBasis: [
      "Plant capacity: 100 kg/day of waste cooking oil feed (illustrative academic basis)",
      "Feed: collected waste cooking oil with assumed typical free-fatty-acid content",
      "Operating pattern: batch-wise operation, 300 operating days per year (assumed)",
      "Target triglyceride conversion: 95% (design target)",
      "Product: fatty-acid methyl esters (FAME) to biodiesel quality expectations",
      "Alcohol: methanol at 6:1 molar ratio to oil, with recovery of excess",
    ],
    constraints: [
      "Variable feed quality from collected waste oil",
      "Small-scale economics — simplicity over complexity",
      "Methanol flammability and toxicity handling",
      "Water use in washing must be managed",
    ],
    processFlowSteps: [
      { label: "Waste Cooking Oil Feed", tag: "TK-101" },
      { label: "Pretreatment", tag: "F-101", note: "filtration & drying" },
      { label: "Feed Conditioning", tag: "E-101", note: "heating to reaction temperature" },
      { label: "Methanol + Catalyst", tag: "TK-102" },
      { label: "Transesterification Reactor", tag: "R-101" },
      { label: "Phase Separation", tag: "V-101" },
      { label: "Biodiesel Washing", tag: "V-102" },
      { label: "Drying", tag: "D-101" },
      { label: "Biodiesel Product", tag: "TK-103" },
      { label: "Glycerol By-product", tag: "TK-104" },
      { label: "Methanol Recovery", tag: "C-101" },
    ],
    streams: [
      { id: "S-101", name: "Feed oil", flowRate: "100 kg/day", temperature: "25 °C", pressure: "1.0 bar", phase: "Liquid", composition: "Triglycerides + impurities", verified: false },
      { id: "S-102", name: "Methanol make-up", flowRate: "≈ 21 kg/day", temperature: "25 °C", pressure: "1.0 bar", phase: "Liquid", composition: "Methanol (6:1 molar ratio)", verified: false },
      { id: "S-103", name: "Reactor outlet", flowRate: "≈ 121 kg/day", temperature: "60 °C", pressure: "1.0 bar", phase: "Liquid", composition: "FAME / glycerol / methanol", verified: false },
      { id: "S-104", name: "Biodiesel product", flowRate: "≈ 95 kg/day", temperature: "45 °C", pressure: "1.0 bar", phase: "Liquid", composition: "FAME (target purity > 96.5%)", verified: false },
      { id: "S-105", name: "Glycerol stream", flowRate: "≈ 10 kg/day", temperature: "60 °C", pressure: "1.0 bar", phase: "Liquid", composition: "Glycerol + methanol + catalyst", verified: false },
    ],
    equipment: [
      { tag: "TK-101", name: "Feed tank", type: "tank", description: "Raw waste-oil storage with settling", verified: false },
      { tag: "F-101", name: "Feed filter", type: "filter", description: "Removes food solids and debris", verified: false },
      { tag: "E-101", name: "Feed preheater", type: "heat-exchanger", duty: "Oil heating to ~60 °C", verified: false },
      { tag: "R-101", name: "Transesterification reactor", type: "reactor", description: "Agitated, jacketed batch reactor", verified: false },
      { tag: "V-101", name: "Gravity separator", type: "separator", description: "Biodiesel / glycerol phase split", verified: false },
      { tag: "V-102", name: "Washing vessel", type: "separator", description: "Water wash removes catalyst and soap", verified: false },
      { tag: "D-101", name: "Product dryer", type: "dryer", description: "Removes residual moisture", verified: false },
      { tag: "C-101", name: "Methanol recovery", type: "column", description: "Recover excess methanol for reuse", verified: false },
      { tag: "P-101", name: "Transfer pumps", type: "pump", description: "Oil, methanol and product transfer", verified: false },
    ],
    massBalance: [
      "Overall and component balances built around the transesterification stoichiometry: triglyceride + 3 methanol → 3 FAME + glycerol.",
      "The 6:1 methanol-to-oil molar ratio drives the equilibrium toward products; the excess (above the 3:1 stoichiometric need) is recovered in C-101 and recycled.",
      "Glycerol settles as a dense phase under gravity; the split assumption (≈ 98% glycerol recovery in V-101) was checked against literature settling behaviour.",
      "Catalyst (NaOH / KOH) ends up split between the glycerol layer and the water wash — tracked as a component so the wash requirement could be justified.",
    ],
    energyBalance: [
      "Major heating duties: oil preheating to reaction temperature (E-101) and reactor jacket heating to hold 60 °C.",
      "Methanol recovery (C-101) is the largest single energy user because of methanol's latent heat.",
      "Electricity users are pumps and agitation — small relative to the thermal duties at this scale.",
      "An energy-flow (Sankey-style) summary was produced to show where heat enters and where losses leave.",
    ],
    reaction: [
      "Reaction: triglyceride + 3 CH₃OH ⇌ 3 FAME + glycerol (alkali-catalysed transesterification).",
      "Alkali catalyst chosen for speed at mild conditions — but it demands low free-fatty-acid feed, which motivates feed quality control in pretreatment.",
      "Temperature held near 60 °C: fast enough for practical residence time, below methanol's boiling point at atmospheric operation.",
      "Design target conversion of ~95% in a single agitated batch stage, with the option of a second stage if specification is missed.",
    ],
    separation: [
      "Gravity settling (V-101) exploits the density difference between FAME and glycerol — the cheapest reliable split at small scale.",
      "Water washing (V-102) removes residual catalyst, soap and methanol; wash-water quantity was limited by treating water use as a design variable.",
      "Drying (D-101) removes dissolved and entrained water to protect fuel quality.",
      "Methanol recovery (C-101) protects both economics and safety — methanol left in product is lost money and a hazard.",
    ],
    simulation: [
      "Selected unit operations were modelled in Aspen Plus with an activity-coefficient property method appropriate for polar mixtures.",
      "Model assumptions: complete wetting of stages, ideal stage behaviour for the recovery column, and literature kinetics.",
      "Simulation outputs were used for stream temperatures, phase splits and utility duties — then sanity-checked by hand calculation.",
      "The simulator was treated as a calculator, not an oracle: every converged stream was reconciled against the hand balances.",
    ],
    control: [
      "Reactor temperature loop (TIC on jacket) — transesterification rate and side reactions are temperature-sensitive.",
      "Methanol flow ratio control relative to oil feed — protects the 6:1 ratio that drives conversion.",
      "Level control on the settling vessel — keeps the biodiesel/glycerol interface stable.",
      "Wash-water flow and product moisture monitoring in the drying stage.",
    ],
    safety: [
      "Methanol: toxic and highly flammable — closed transfer, ventilation, grounding and bonding.",
      "Catalyst: caustic — PPE, closed charging procedure, spill containment.",
      "Hot surfaces: insulation and guarding on heated equipment.",
      "Academic-level hazard review with SDS consultation — not a formal HAZOP.",
    ],
    environmental: [
      "Feedstock reuse: waste cooking oil diverted to fuel rather than disposal.",
      "Wash water becomes a wastewater stream — minimised and proposed for treatment before discharge.",
      "Glycerol by-product can be purified and sold or used — treated as a value stream, not waste.",
      "Heat recovery opportunity noted: product cooling can preheat incoming feed.",
    ],
    economics: [
      "Preliminary academic OPEX built from feedstock collection, methanol, catalyst, utilities and labour allowances.",
      "Unit production cost compared against indicative biodiesel market prices — labelled as an academic estimate.",
      "CAPEX estimated by major-equipment factoring, suitable only for early-stage screening.",
      "Simple payback computed on illustrative values to demonstrate the evaluation method.",
    ],
    results: [
      "A complete, coherent process design from feed tank to product storage, with a defensible process flow diagram.",
      "Mass and energy balances that close across every node of the flowsheet.",
      "A simulation model reconciled with hand calculations, with assumptions documented.",
      "A preliminary economic and sustainability screening with honest limitations.",
    ],
    metrics: [
      { label: "Feed capacity", value: "100", unit: "kg/day", verified: false },
      { label: "Target conversion", value: "95", unit: "%", verified: false },
      { label: "Methanol ratio", value: "6:1", unit: "molar", verified: false },
      { label: "Product purity target", value: "96.5", unit: "%", verified: false },
      { label: "Unit operations", value: "9", unit: "major items", verified: false },
    ],
    limitations: [
      "Kinetics taken from literature rather than measured on the actual feed.",
      "Feed composition variability handled by assumption, not by sampling programme.",
      "Equipment sizing is preliminary — no mechanical design was attempted.",
      "Economics use indicative prices, not quotations.",
    ],
    lessons: [
      "Process design is an interconnected systems problem: improving one unit operation can create new challenges elsewhere.",
      "Conversion, separations, utilities, safety, waste generation and economics must be evaluated together rather than in isolation.",
      "A model that converges is not a design that works — assumptions carry the design until evidence replaces them.",
    ],
    improvements: [
      "Rigorous kinetic model fitted to the actual feedstock",
      "Sensitivity analysis on methanol ratio and temperature",
      "Heat-integration network for feed preheating",
      "Continuous operation concept at larger scale",
      "Waterless purification to cut wash-water generation",
      "Full techno-economic analysis and lifecycle assessment",
      "Process-control strategy and a formal HAZOP study",
    ],
    verified: false,
  },
  {
    slug: "distillation-column",
    title: "Continuous Distillation Column Design for a Binary Separation",
    shortTitle: "Distillation Column Design",
    category: "separation",
    type: "academic",
    featured: false,
    year: 2024,
    duration: "6 weeks",
    role: "VLE analysis, McCabe-Thiele staging, energy duties",
    tools: ["Excel", "MATLAB"],
    image: "/images/distillation.webp",
    imageAlt: "Tall industrial distillation column with platforms and reflux drum at dusk",
    summary:
      "Design of a continuous distillation column to separate a binary mixture to specified product purities — covering feed characterisation, VLE behaviour, reflux ratio selection, stage calculation and energy duties.",
    problem:
      "Separate a binary mixture into distillate and bottoms streams at specified purities while keeping energy consumption and column cost reasonable — the classic trade-off between capital (stages) and energy (reflux).",
    designBasis: [
      "Binary feed at known composition and flow (illustrative academic basis)",
      "Distillate purity: 99 mol% light key (specification)",
      "Bottoms purity: 98 mol% heavy key (specification)",
      "Saturated-liquid feed condition at column pressure",
      "Operation at near-atmospheric pressure",
    ],
    processFlowSteps: [
      { label: "Feed Preheating", tag: "E-201" },
      { label: "Distillation Column", tag: "T-201" },
      { label: "Condenser", tag: "E-202" },
      { label: "Reflux Drum", tag: "V-201" },
      { label: "Reboiler", tag: "E-203" },
      { label: "Distillate Product", tag: "TK-201" },
      { label: "Bottoms Product", tag: "TK-202" },
    ],
    streams: [
      { id: "S-201", name: "Feed", flowRate: "design basis", temperature: "bubble point", pressure: "~1.1 bar", phase: "Liquid", composition: "binary mixture", verified: false },
      { id: "S-202", name: "Distillate", flowRate: "by balance", temperature: "dew point", pressure: "~1.1 bar", phase: "Liquid", composition: "99 mol% light key", verified: false },
      { id: "S-203", name: "Bottoms", flowRate: "by balance", temperature: "bubble point", pressure: "~1.2 bar", phase: "Liquid", composition: "98 mol% heavy key", verified: false },
    ],
    equipment: [
      { tag: "T-201", name: "Distillation column", type: "column", description: "Sieve-tray column, stage count from McCabe-Thiele", verified: false },
      { tag: "E-202", name: "Total condenser", type: "heat-exchanger", duty: "Condenser duty from energy balance", verified: false },
      { tag: "E-203", name: "Partial reboiler", type: "heat-exchanger", duty: "Reboiler duty from energy balance", verified: false },
      { tag: "V-201", name: "Reflux drum", type: "separator", description: "Distillate accumulator with reflux return", verified: false },
    ],
    massBalance: [
      "Overall and component balances around the column fixed distillate and bottoms flows from the feed and the two purity specifications.",
      "The equilibrium curve was generated from Raoult's-law VLE data and checked against reported azeotrope behaviour.",
      "Operating lines were constructed at the selected reflux ratio (1.3× Rmin) to balance stages against energy.",
    ],
    energyBalance: [
      "Condenser and reboiler duties determined by envelope balances around the top and bottom sections.",
      "Feed condition (quality) treated explicitly — saturated-liquid feed keeps the q-line vertical and staging simpler.",
      "Utility selection discussed: cooling water for the condenser, low-pressure steam for the reboiler.",
    ],
    separation: [
      "McCabe-Thiele graphical staging used for the conceptual design and cross-checked with Fenske–Underwood–Gilliland shortcuts.",
      "Stage efficiency assumption stated and carried through to a tray-count estimate.",
      "Feed-stage location selected at the pinch of the operating lines to avoid unnecessary stages.",
    ],
    results: [
      "Stage count, feed location and reflux ratio selected with the capital/energy trade-off made explicit.",
      "Condenser and reboiler duties quantified for utility sizing conversations.",
      "A column schematic and equilibrium-curve plot documenting the method.",
    ],
    metrics: [
      { label: "Distillate purity", value: "99", unit: "mol %", verified: false },
      { label: "Bottoms purity", value: "98", unit: "mol %", verified: false },
      { label: "Reflux ratio", value: "1.3×Rmin", unit: "", verified: false },
      { label: "Stages (theoretical)", value: "design outcome", unit: "", verified: false },
    ],
    limitations: [
      "Constant molal overflow assumed for the graphical method.",
      "Ideal-stage behaviour — no tray efficiency measured.",
      "Binary ideal system; real systems with non-ideality need activity models.",
    ],
    lessons: [
      "Reflux ratio is the master lever: it trades energy against stages, and the optimum is flat but real.",
      "Graphical methods build intuition that simulation then refines — the order matters.",
    ],
    verified: false,
  },
  {
    slug: "heat-exchanger",
    title: "Shell-and-Tube Heat Exchanger Design",
    shortTitle: "Heat Exchanger Design",
    category: "heat-transfer",
    type: "academic",
    featured: false,
    year: 2023,
    duration: "4 weeks",
    role: "Thermal rating, LMTD analysis, area estimation",
    tools: ["Excel"],
    image: "/images/heat-exchanger.webp",
    imageAlt: "Close-up of an industrial shell-and-tube heat exchanger with flanged connections",
    summary:
      "Thermal design of a shell-and-tube exchanger for a process duty — heat duty, temperature driving force, LMTD, overall heat-transfer coefficient and preliminary area, with pressure-drop awareness throughout.",
    problem:
      "Recover heat from a hot process stream to raise a cold stream to a target temperature while keeping the exchanger area (cost) and pressure drops (pumping cost) within sensible bounds.",
    designBasis: [
      "Hot and cold stream flow rates and inlet temperatures defined by the process (illustrative)",
      "Cold-side target outlet temperature specified",
      "Counter-current flow arrangement preferred",
      "Single shell pass, multiple tube passes (conceptual)",
    ],
    processFlowSteps: [
      { label: "Hot Stream In", tag: "" },
      { label: "Shell Side", tag: "E-301" },
      { label: "Cold Stream In", tag: "" },
      { label: "Tube Side", tag: "E-301" },
      { label: "Heat Transferred Q", tag: "" },
      { label: "Hot Stream Out / Cold Stream Out", tag: "" },
    ],
    equipment: [
      { tag: "E-301", name: "Shell-and-tube exchanger", type: "heat-exchanger", description: "Preliminary area from Q = U·A·ΔTlm", verified: false },
    ],
    massBalance: [
      "Energy balance on each side: Q = m·cp·ΔT fixed the duty from the cold-side requirement.",
      "The hot-side outlet temperature follows from the duty — no freedom once the cold side is specified.",
    ],
    energyBalance: [
      "LMTD computed for counter-current flow and corrected for the multi-pass arrangement.",
      "Overall coefficient U estimated from film coefficients plus fouling resistances — the fouling allowance dominates the margin.",
      "Preliminary area A = Q / (U · ΔTlm) with a stated over-design margin.",
    ],
    results: [
      "A defensible first-pass area and shell/tube configuration.",
      "Sensitivity of area to fouling resistance made explicit — the design variable that quietly doubles exchangers.",
      "A calculation trail clear enough for a reviewer to check line by line.",
    ],
    metrics: [
      { label: "Duty Q", value: "by balance", unit: "kW", verified: false },
      { label: "Overall U", value: "estimated", unit: "W/m²·K", verified: false },
      { label: "LMTD", value: "computed", unit: "°C", verified: false },
      { label: "Area (prelim.)", value: "computed", unit: "m²", verified: false },
    ],
    limitations: [
      "Film coefficients from correlation ranges, not vendor data.",
      "No detailed baffle or tube-layout geometry.",
      "Pressure drop checked by rule of thumb rather than rigorous hydraulics.",
    ],
    lessons: [
      "Fouling resistance is where conservative assumptions silently accumulate.",
      "ΔTlm punishes poor temperature approach — exchanger economics are set by the process temperatures, not the hardware.",
    ],
    verified: false,
  },
  {
    slug: "pipe-pump-network",
    title: "Pumping & Pipe Network Analysis",
    shortTitle: "Pump & Pipe Network",
    category: "fluid-flow",
    type: "academic",
    featured: false,
    year: 2023,
    duration: "4 weeks",
    role: "System curve, pump head, selection reasoning",
    tools: ["Excel", "MATLAB"],
    image: "/images/pumping.webp",
    imageAlt: "Row of industrial centrifugal pumps connected to a pipe network with gauges",
    summary:
      "Analysis of a pumping system delivering a required flow through a pipe network — pipe sizing, friction and minor losses, static head, system-curve construction and pump selection reasoning.",
    problem:
      "Deliver a required flow rate of liquid from a source vessel to a destination at higher elevation and pressure, with the smallest pump that comfortably does the job.",
    designBasis: [
      "Required flow rate fixed by the process (illustrative)",
      "Source and destination elevations and pressures defined",
      "Straight-run lengths and fittings schedule given",
      "Commercial-steel pipe, standard schedules",
    ],
    processFlowSteps: [
      { label: "Source Vessel", tag: "TK-401" },
      { label: "Suction Line", tag: "" },
      { label: "Centrifugal Pump", tag: "P-401" },
      { label: "Discharge Line", tag: "" },
      { label: "Destination Vessel", tag: "TK-402" },
    ],
    equipment: [
      { tag: "P-401", name: "Centrifugal pump", type: "pump", description: "Selected on head–flow duty point", verified: false },
      { tag: "TK-401", name: "Source tank", type: "tank", description: "Suction-side vessel with minimum level", verified: false },
      { tag: "TK-402", name: "Destination tank", type: "tank", description: "Delivery vessel", verified: false },
    ],
    massBalance: [
      "Continuity checks on candidate pipe diameters — velocity kept inside economic ranges.",
      "Each diameter candidate priced against its friction penalty: bigger pipe costs more capital but less pumping energy.",
    ],
    energyBalance: [
      "Mechanical energy balance (Bernoulli with friction): pump head = static head + pressure head + friction losses.",
      "Friction factor from the Moody chart / Colebrook reasoning with Reynolds number checked on both sides of transition.",
      "Minor losses from equivalent-length and k-factor methods, compared.",
    ],
    results: [
      "A system curve rising with flow and intersecting a candidate pump curve at the duty point.",
      "Suction-side NPSH awareness: cavitation avoided by design, not by hope.",
      "Pump selection reasoning documented for the chosen duty point.",
    ],
    metrics: [
      { label: "Design flow", value: "by brief", unit: "m³/h", verified: false },
      { label: "System head", value: "computed", unit: "m", verified: false },
      { label: "Pipe size", value: "selected", unit: "", verified: false },
      { label: "Duty point", value: "curve intersection", unit: "", verified: false },
    ],
    limitations: [
      "Fluid treated as clean, Newtonian, constant-viscosity.",
      "Pump curves from typical manufacturer families, not a specific vendor.",
    ],
    lessons: [
      "The pump never decides the duty point alone — the system curve shares the decision.",
      "Suction conditions deserve more respect than discharge conditions; cavitation is unforgiving.",
    ],
    verified: false,
  },
  {
    slug: "reactor-comparison",
    title: "CSTR vs PFR Reactor Comparison Study",
    shortTitle: "CSTR vs PFR Comparison",
    category: "reaction",
    type: "academic",
    featured: false,
    year: 2024,
    duration: "3 weeks",
    role: "Design equations, sizing, sensitivity analysis",
    tools: ["MATLAB", "Excel"],
    image: "/images/reactor.webp",
    imageAlt: "Jacketed stainless steel chemical reactor vessels with agitators and instrumentation",
    summary:
      "A comparative sizing and performance study of continuous stirred-tank and plug-flow reactors for a defined reaction system — rate expressions, conversion, residence time and temperature effects on an equal footing.",
    problem:
      "For a defined reaction system and target conversion, determine which reactor configuration — CSTR, PFR, or CSTRs in series — achieves the target with the least volume, and understand why.",
    designBasis: [
      "Defined feed flow and concentration (illustrative)",
      "First-order reaction rate law as the base case, with second-order sensitivity",
      "Isothermal operation assumed",
      "Target conversion fixed for comparison",
    ],
    processFlowSteps: [
      { label: "Feed", tag: "" },
      { label: "CSTR Option", tag: "R-501", note: "one mixed volume" },
      { label: "PFR Option", tag: "R-502", note: "distributed residence time" },
      { label: "CSTRs in Series", tag: "R-503", note: "staged approach to PFR" },
      { label: "Conversion Comparison", tag: "" },
    ],
    equipment: [
      { tag: "R-501", name: "CSTR", type: "reactor", description: "Perfectly mixed, outlet-concentration kinetics", verified: false },
      { tag: "R-502", name: "PFR", type: "reactor", description: "Plug flow, concentration falls along the tube", verified: false },
    ],
    massBalance: [
      "CSTR design equation: V = F·X / (−r) evaluated at the outlet concentration — the whole volume lives at the hardest condition.",
      "PFR design equation integrated along the reactor — the rate falls progressively, so early volume works harder.",
    ],
    energyBalance: [
      "Isothermal assumption stated and its consequences noted: real exotherms demand heat removal.",
      "Temperature sensitivity of the rate constant (Arrhenius) discussed qualitatively for safety.",
    ],
    results: [
      "For the same conversion the PFR needs less volume than a single CSTR — and CSTRs in series converge toward PFR behaviour.",
      "The ranking reverses for certain autocatalytic and zero-order behaviours — comparison beats memorising rules.",
      "Conversion-vs-volume plots documenting the analysis.",
    ],
    metrics: [
      { label: "Target conversion", value: "by brief", unit: "%", verified: false },
      { label: "CSTR volume", value: "computed", unit: "relative", verified: false },
      { label: "PFR volume", value: "computed", unit: "relative", verified: false },
      { label: "Volume advantage", value: "plotted", unit: "", verified: false },
    ],
    limitations: [
      "Ideal flow models — no mixing non-idealities, dispersion or bypassing.",
      "Constant-density (liquid) system assumed.",
    ],
    lessons: [
      "Reactor choice is a consequence of kinetics, not a preference.",
      "Graphical design equations make the volume argument visible: the area under the rate curve is the reactor.",
    ],
    verified: false,
  },
  {
    slug: "wastewater-treatment",
    title: "Industrial Wastewater Treatment Process Concept",
    shortTitle: "Wastewater Treatment Concept",
    category: "environmental",
    type: "academic",
    featured: false,
    year: 2025,
    duration: "5 weeks",
    role: "Process concept, contaminant balance, treatment logic",
    tools: ["Excel", "Draw.io"],
    image: "/images/wastewater.webp",
    imageAlt: "Aerial view of a modern wastewater treatment plant with circular clarifier tanks at dusk",
    summary:
      "A treatment-train concept for reducing pollutants in an industrial wastewater stream — screening, equalisation, pH adjustment, coagulation/flocculation, sedimentation and polishing filtration, with a contaminant balance across the train.",
    problem:
      "An industrial wastewater stream cannot be discharged without treatment: solids, pH excursions and organic load must each be addressed in sequence, at reasonable cost, before the water meets discharge or reuse expectations.",
    designBasis: [
      "Illustrative industrial stream with suspended solids and pH excursions",
      "Discharge targets defined as the design specification",
      "Flow variability handled by equalisation rather than oversized equipment",
    ],
    processFlowSteps: [
      { label: "Industrial Effluent", tag: "" },
      { label: "Screening", tag: "SC-601" },
      { label: "Equalisation", tag: "TK-601" },
      { label: "pH Adjustment", tag: "TK-602" },
      { label: "Coagulation / Flocculation", tag: "R-601" },
      { label: "Sedimentation", tag: "CL-601" },
      { label: "Polishing Filtration", tag: "F-601" },
      { label: "Treated Effluent", tag: "" },
    ],
    equipment: [
      { tag: "SC-601", name: "Bar screen", type: "filter", description: "Removes coarse solids and rags", verified: false },
      { tag: "TK-601", name: "Equalisation tank", type: "tank", description: "Dampens flow and load variability", verified: false },
      { tag: "TK-602", name: "pH adjustment tank", type: "tank", description: "Neutralisation with dosing control", verified: false },
      { tag: "CL-601", name: "Clarifier", type: "separator", description: "Settles flocs under gravity", verified: false },
      { tag: "F-601", name: "Polishing filter", type: "filter", description: "Final suspended-solids removal", verified: false },
    ],
    massBalance: [
      "Contaminant balance tracked solids and pH across each stage — every stage removes something specific, and the train only works in order.",
      "Screening first protects pumps and mixers downstream; equalisation second protects every stage after it from shock loads.",
    ],
    environmental: [
      "Sludge from the clarifier is the residual problem — handling and disposal considered, not ignored.",
      "Water reuse opportunity noted where quality permits.",
      "Chemical dosing minimised by treating pH control as a control problem, not a brute-force one.",
    ],
    results: [
      "A defensible treatment train with the logic of every stage argued from the contaminant balance.",
      "A process flow diagram and contaminant-removal summary across the train.",
    ],
    metrics: [
      { label: "Treatment stages", value: "7", unit: "steps", verified: false },
      { label: "Solids removal", value: "staged", unit: "", verified: false },
      { label: "pH control", value: "dosed", unit: "", verified: false },
    ],
    limitations: [
      "No pilot data — removal efficiencies from literature ranges.",
      "Biological treatment considered conceptually only.",
    ],
    lessons: [
      "In wastewater trains, sequence is design: each stage exists to protect the next.",
      "Equalisation is cheap insurance against the variability you did not measure.",
    ],
    verified: false,
  },
];

export const featuredProject = projects[0];

export const categoryLabels: Record<string, string> = {
  "process-design": "Process Design",
  reaction: "Reaction Engineering",
  separation: "Separations",
  "heat-transfer": "Heat Transfer",
  "fluid-flow": "Fluid Mechanics",
  "process-control": "Process Control",
  environmental: "Environmental",
  research: "Research",
};

export const typeLabels: Record<string, string> = {
  "final-year": "Final-Year Project",
  academic: "Academic Project",
  laboratory: "Laboratory Project",
  team: "Team Project",
  personal: "Personal Project",
};
