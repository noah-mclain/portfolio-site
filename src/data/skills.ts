import type { SkillGroup } from '@/types';

export const skillGroups: SkillGroup[] = [
  {
    category: 'Languages',
    icon: 'code',
    skills: ['Python', 'Java', 'C / C++', 'JavaScript', 'TypeScript', 'PHP', 'R', 'SQL'],
  },
  {
    category: 'AI / ML Frameworks',
    icon: 'brain',
    skills: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'NumPy', 'Pandas', 'HuggingFace Transformers'],
  },
  {
    category: 'Agents & LLM Tooling',
    icon: 'sparkles',
    skills: [
      'LLM Fine-tuning',
      'DeepSeek-Coder',
      'FLAN-UL2',
      'OpenAI Whisper',
      'OpenCV',
      'Twilio API',
    ],
  },
  {
    category: 'Engineering',
    icon: 'wrench',
    skills: ['Git', 'Docker', 'Kubernetes', 'AWS RDS', 'MySQL', 'SDLC', 'Tkinter'],
  },
  {
    category: 'Soft Skills',
    icon: 'users',
    skills: ['Team Collaboration', 'Analytical Thinking', 'Communication', 'Mentorship'],
  },
];
