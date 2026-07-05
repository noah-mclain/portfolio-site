import { Github, Linkedin, Mail, Phone, Twitter, Code2 } from 'lucide-react';
import type { SocialLink } from '@/types';

const ICON_SIZE = 18;

const ICON_MAP = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  phone: Phone,
  twitter: Twitter,
  codeforces: Code2,
} as const;

interface SocialIconProps {
  icon: SocialLink['icon'];
  size?: number;
}

export function SocialIcon({ icon, size = ICON_SIZE }: SocialIconProps) {
  const Component = ICON_MAP[icon];
  return <Component size={size} aria-hidden />;
}
