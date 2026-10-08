# VERIFICATION.md — Pre-Publication Checklist

Per the specification's placeholder policy (§2, §77): name, university, degree,
career stage and country are confirmed. **Everything else below is illustrative
or placeholder content** generated for the prototype and must be verified or
replaced before the portfolio is published under David's name.

## 1. Identity & Contact

- [ ] Replace `david.wafula@example.com` with the real email (`src/data/profile.ts`)
- [ ] Replace LinkedIn / GitHub URLs with real profiles
- [ ] Replace the AI-generated portrait (`public/images/portrait.webp`) with a real photo
- [ ] Confirm graduation year (currently 2026) and degree classification
- [ ] Update phone number if it will be published at all

## 2. Project Data (all currently `verified: false`)

All numeric process values are illustrative academic estimates typical of
university design work. Before publishing:

- [ ] Biodiesel flagship: replace feed capacity, conversion, methanol ratio,
      stream table values, mass/energy Sankey values with real project numbers
      (`src/data/projects.ts`)
- [ ] Distillation / heat-exchanger / pump-network / reactor / wastewater
      projects: replace metrics and results with actual coursework outcomes
- [ ] Replace AI-generated project imagery with real PFDs, simulation
      screenshots and lab photos where available (`public/images/`)
- [ ] Attach real report PDFs if available (`reportUrl` field)

## 3. Experience

- [ ] Replace "Process Manufacturing Plant" with the real host organisation
- [ ] Confirm attachment dates and duration (currently May–Aug 2025, 12 weeks)
- [ ] Confirm the responsibilities list matches what actually happened
- [ ] Remove or correct any equipment exposure not actually observed

## 4. Skills & Tools

- [ ] Confirm every tool listed was actually used (Aspen Plus, HYSYS, DWSIM,
      MATLAB, AutoCAD …)
- [ ] Adjust proficiency labels (Strong / Working Knowledge / Academic Exposure)
- [ ] Remove `ChemCAD` / `Minitab` if never used

## 5. Claims Audit (spec §74 content rules)

The UI already labels unverified metrics as "illustrative estimate". After
replacing data:

- [ ] Remove "illustrative estimate" chips where real data now exists
  (set `verified: true` in the data files)
- [ ] Re-read every claim against the avoid/prefer wording table in the spec
- [ ] Confirm no independent process-safety authority is implied

## 6. Technical QA

- [ ] Test CV print output (`/cv` → Print / Save as PDF)
- [ ] Test recruiter page print output (`/recruiter`)
- [ ] Test mobile PFD/ribbon scrolling on a real phone
- [ ] Update `metadataBase`, sitemap and robots URLs to the production domain
- [ ] Run Lighthouse — target 90+ Performance, 95+ Accessibility
- [ ] Verify `prefers-reduced-motion` behaviour

## 7. Multi-Student Future (spec §71)

The data layer is already shaped for reuse (`GraduatePortfolio` interface).
To add another student, add a file under `src/data/students/` and render via a
`/students/[slug]` route reusing the same components.
