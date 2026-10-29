import type { NavLink, Profile, SocialLink } from '@/types';

export const profile: Profile = {
  firstName: 'Nada',
  lastName: 'Mohamed',
  fullName: 'Nada Mohamed',
  title: 'AI/ML Engineer',
  tagline:
    'I build intelligent agents, fine-tune LLMs, and ship systems that solve real problems — from blockchain payroll rails to autonomous tooling.',
  bio: [
    "I'm an AI/ML engineer building intelligent agents, working with LLMs, and turning research into practical software.",
    "A Computer Science graduate, I built Payramid, an award-winning blockchain payroll platform, and completed internships at SAIB Bank and Dell Technologies.",
  ],
  availability: 'Open to AI/ML roles',
  location: 'Cairo, Egypt',
  resumeUrl: 'Nada-Mohamed-CV.pdf',
};

export const socials: SocialLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/noah-mclain',
    handle: 'noah-mclain',
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/nada-mohamed-300305ma/',
    handle: 'nada-mohamed',
    icon: 'linkedin',
  },
];

export const navLinks: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];
