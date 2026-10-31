import type { NavLink, Profile, SocialLink } from "@/types";

export const profile: Profile = {
  firstName: "Nada",
  lastName: "Ahmed",
  fullName: "Nada Ahmed",
  title: "AI/ML Engineer",
  tagline:
    "I build intelligent agents, fine-tune LLMs, and ship systems, from blockchain payroll rails to autonomous tooling.",
  bio: [
    "I'm an AI/ML engineer who turns research into practical software, mostly agents and LLM systems.",
    "I graduated in Computer Science with Honors, built Payramid, an award-winning blockchain payroll platform, and interned at SAIB Bank and Dell Technologies.",
  ],
  availability: "Open to AI/ML roles",
  location: "Cairo, Egypt",
  resumeUrl: "Nada-Ahmed-CV.pdf",
  email: "nadamo.cs@gmail.com",
};

export const socials: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/noah-mclain",
    handle: "noah-mclain",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nada-mohamed-300305ma/",
    handle: "nada-mohamed",
    icon: "linkedin",
  },
];

export const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];
