import type { Award, Certification, EducationEntry, Language } from '@/types';

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

export const awards: Award[] = [
  {
    name: '3rd Place — Arab FinTech Challenge 2026',
    issuer: 'Jordan FinTech Festival · Jordan · Sept 2026',
    description:
      'Represented Egypt with support from the Central Bank of Egypt (CBE) in the regional competition organized by GIE.',
    source: 'https://www.linkedin.com/posts/fintecharab_arifintech-fintecharab-arabfintechchallenge-activity-7508907901780967424-L328',
  },
  {
    name: '2nd Place — FinTech Got Talent 2026',
    issuer: 'FinTech Egypt · Central Bank of Egypt · Sept 2026',
    description:
      'Won with Payramid as part of a team sponsored by SAIB Bank, earning a place to represent Egypt at the Arab FinTech Challenge.',
    source: 'https://fintech-egypt.com/news/news_details.php?id=214',
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
