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
  email: string;
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
  /** One-line hook for the home page card. Falls back to the tagline. */
  hook?: string;
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
  video?: string;
  link?: string;
  repo?: string;
}

export interface ExperienceEntry {
  role: string;
  organization: string;
  url?: string;
  logo?: string;
  /** Key points, one line each; **double asterisks** bold a term. */
  takeaways: string[];
  context?: string;
  location: string;
  startDate: string;
  endDate: string;
}

export interface EducationEntry {
  degree: string;
  institution: string;
  partnerInstitution?: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  major?: string;
  /** Institution logos, drawn in the text color. */
  logos?: string[];
  honors?: boolean;
}

export interface Certification {
  name: string;
  issuer: string;
  /** Issuer's logo, drawn in the text color. */
  logo?: string;
}

export interface Award {
  name: string;
  /** Finishing place, shown as a medal. */
  place: number;
  issuer: string;
  description: string;
  source: string;
}

export interface Language {
  name: string;
  proficiency: 'Native' | 'Fluent' | 'Intermediate' | 'Basic';
}

export interface NavLink {
  label: string;
  href: string;
}
