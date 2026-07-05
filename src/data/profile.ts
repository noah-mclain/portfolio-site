import type { NavLink, Profile, SocialLink } from '@/types';

export const profile: Profile = {
  firstName: 'Nada',
  lastName: 'Mohamed',
  fullName: 'Nada Mohamed',
  title: 'AI/ML Engineer',
  tagline:
    'I build intelligent agents, fine-tune LLMs, and ship systems that solve real problems — from blockchain payroll rails to autonomous tooling.',
  bio: [
    "I'm a Computer Science graduate of the Arab Academy for Science & Technology, focused on AI and Machine Learning. I love taking research ideas — Siamese networks, reinforcement learning, multimodal LLMs — and turning them into things people can actually use.",
    "I just submitted Payramid, my graduation project: a blockchain payroll layer that settles on Egypt's national payment rails with cryptographically verifiable proofs of payment. Before that I built Jarvis, a modular AI assistant with code generation, voice, and vision; interned at Dell Technologies; and completed a 7-month Microsoft ML Engineering program with DEPI.",
    "When I'm not training models, I mentor students, contribute to open-source, and chase down whatever new paper has caught my eye.",
  ],
  availability: 'Open to AI/ML roles',
  location: 'Cairo, Egypt',
  resumeUrl: 'Nada-Mohamed-CV.pdf',
};

export const socials: SocialLink[] = [
  {
    label: 'Email',
    href: 'mailto:nadamo.cs@gmail.com',
    handle: 'nadamo.cs@gmail.com',
    icon: 'mail',
  },
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
  {
    label: 'Phone',
    href: 'tel:+201200369051',
    handle: '+20 120 036 9051',
    icon: 'phone',
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
