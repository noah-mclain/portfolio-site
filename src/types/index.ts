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

export interface SkillGroup {
  category: string;
  icon: 'code' | 'brain' | 'wrench' | 'sparkles' | 'users';
  skills: string[];
}

export interface Project {
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  tech: string[];
  status?: 'ongoing' | 'shipped' | 'archived';
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
