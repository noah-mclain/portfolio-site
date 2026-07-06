export interface Profile {
  firstName: string;
  lastName: string;
  fullName: string;
  title: string;
  tagline: string;
  bio: string[];
  availability: string;
  location: string;
  resumeUrl: string;
}

export interface SocialLink {
  label: string;
  href: string;
  handle?: string;
  icon: 'github' | 'linkedin' | 'mail' | 'phone' | 'codeforces' | 'twitter';
}

export type SkillTag =
  | 'Programming Languages'
  | 'Machine Learning & AI'
  | 'Frameworks & Libraries'
  | 'Backend'
  | 'Frontend'
  | 'Database'
  | 'Cloud & DevOps'
  | 'Professional Skills';

export interface Skill {
  name: string;
  tags: SkillTag[];
}

export interface Project {
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  tech: string[];
  status?: 'ongoing' | 'shipped' | 'archived';
  featured?: boolean;
  /** Shown on the home page's selected-work grid. */
  spotlight?: boolean;
  /** Human-readable timeframe, e.g. "Nov 2024 – Feb 2025". */
  period?: string;
  /** Preview screenshot URL (links to the repo when clicked). */
  image?: string;
  link?: string;
  repo?: string;
}

export interface ExperienceEntry {
  role: string;
  organization: string;
  context?: string;
  location: string;
  startDate: string;
  endDate: string;
  highlights: string[];
}

export interface EducationEntry {
  degree: string;
  institution: string;
  partnerInstitution?: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface Certification {
  name: string;
  issuer: string;
}

export interface Language {
  name: string;
  proficiency: 'Native' | 'Fluent' | 'Intermediate' | 'Basic';
}

export interface NavLink {
  label: string;
  href: string;
}
