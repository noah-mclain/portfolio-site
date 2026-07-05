import type { Certification, EducationEntry, Language } from '@/types';

export const education: EducationEntry[] = [
  {
    degree: 'B.Sc. Computer Science (Dual Degree)',
    institution: 'Arab Academy for Science, Technology & Maritime Transport',
    partnerInstitution: 'University of Northampton',
    location: 'Cairo, Egypt',
    startDate: 'Sept 2022',
    endDate: 'June 2026',
    gpa: '3.60',
  },
];

export const certifications: Certification[] = [
  { name: 'Microsoft ML Engineer Course', issuer: 'DEPI — Digital Egypt Pioneers Initiative' },
  { name: 'AI & Machine Learning Course', issuer: 'Universitat Autònoma de Barcelona' },
  { name: 'First Place — AI/ML Project Submission', issuer: 'AASTMT' },
  { name: 'Computer Science Camp', issuer: 'Carnegie Mellon University' },
];

export const languages: Language[] = [
  { name: 'Arabic', proficiency: 'Native' },
  { name: 'English', proficiency: 'Fluent' },
  { name: 'Spanish', proficiency: 'Intermediate' },
];
