export const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/process-engineering", label: "Process Engineering" },
  { href: "/education", label: "Education" },
  { href: "/about", label: "About" },
  { href: "/cv", label: "CV" },
  { href: "/contact", label: "Contact" },
] as const;

export const MOBILE_NAV_ITEMS = [
  { href: "/", label: "Home", tag: "01" },
  { href: "/projects", label: "Projects", tag: "02" },
  { href: "/experience", label: "Experience", tag: "03" },
  { href: "/process-engineering", label: "Process Engineering", tag: "04" },
  { href: "/education", label: "Education", tag: "05" },
  { href: "/about", label: "About", tag: "06" },
  { href: "/cv", label: "CV", tag: "07" },
  { href: "/recruiter", label: "Recruiter Mode", tag: "08" },
  { href: "/contact", label: "Contact", tag: "09" },
] as const;
