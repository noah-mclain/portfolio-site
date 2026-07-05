import type { NavLink, Profile, SocialLink } from '@/types';

export const profile: Profile = {
  firstName: 'Nada',
  lastName: 'Mohamed',
  fullName: 'Nada Mohamed',
  title: 'AI/ML Engineer',
  tagline:
    'I build intelligent agents, fine-tune LLMs, and ship AI that solves real problems — from facial recognition to autonomous tooling.',
  bio: [
    "I'm a final-year Computer Science student at the Arab Academy for Science & Technology, focused on AI and Machine Learning. I love taking research ideas — Siamese networks, reinforcement learning, multimodal LLMs — and turning them into things people can actually use.",
    "Lately I've been building Jarvis, a modular AI assistant with code generation, voice, and vision; interning at Dell Technologies; and finishing up a 7-month Microsoft ML Engineering program with DEPI.",
    "When I'm not training models, I mentor students, contribute to open-source, and chase down whatever new paper has caught my eye.",
  ],
  availability: 'Open to AI/ML roles',
  location: 'Cairo, Egypt',
  resumeUrl:
    'https://studentaast-my.sharepoint.com/:b:/g/personal/n_ahmed07645_student_aast_edu/Ef3CNu2TNDtOp2Tyq_giDcUBptgLR1LH2j_MdZep0ELqYg?e=FsUVjg',
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
  {
    label: 'CodeForces',
    href: 'https://codeforces.com/profile/._noah_.',
    handle: '._noah_.',
    icon: 'codeforces',
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
