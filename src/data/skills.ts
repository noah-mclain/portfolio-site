import type { Skill, SkillTag } from '@/types';

/** Filter order shown in the Skills section. */
export const skillFilters: SkillTag[] = [
  'Programming Languages',
  'Machine Learning & AI',
  'Frameworks & Libraries',
  'Backend',
  'Frontend',
  'Database',
  'Cloud & DevOps',
  'Professional Skills',
];

export const skills: Skill[] = [
  // Languages
  { name: 'Python', tags: ['Programming Languages', 'Backend', 'Machine Learning & AI'] },
  { name: 'Go', tags: ['Programming Languages', 'Backend'] },
  { name: 'Java', tags: ['Programming Languages', 'Backend'] },
  { name: 'C/C++', tags: ['Programming Languages'] },
  { name: 'JavaScript', tags: ['Programming Languages', 'Frontend', 'Backend'] },
  { name: 'TypeScript', tags: ['Programming Languages', 'Frontend'] },
  { name: 'SQL', tags: ['Programming Languages', 'Database'] },
  { name: 'R', tags: ['Programming Languages'] },
  { name: 'PHP', tags: ['Programming Languages', 'Backend'] },

  // ML & AI disciplines
  { name: 'Machine Learning', tags: ['Machine Learning & AI'] },
  { name: 'Deep Learning', tags: ['Machine Learning & AI'] },
  { name: 'Natural Language Processing (NLP)', tags: ['Machine Learning & AI'] },
  { name: 'Computer Vision', tags: ['Machine Learning & AI'] },
  { name: 'Large Language Models (LLMs)', tags: ['Machine Learning & AI'] },
  { name: 'Reinforcement Learning', tags: ['Machine Learning & AI'] },
  { name: 'Speech Recognition', tags: ['Machine Learning & AI'] },

  // Frameworks & libraries
  { name: 'PyTorch', tags: ['Frameworks & Libraries', 'Machine Learning & AI'] },
  { name: 'TensorFlow', tags: ['Frameworks & Libraries', 'Machine Learning & AI'] },
  { name: 'Scikit-learn', tags: ['Frameworks & Libraries', 'Machine Learning & AI'] },
  { name: 'Hugging Face Transformers', tags: ['Frameworks & Libraries', 'Machine Learning & AI'] },
  { name: 'OpenCV', tags: ['Frameworks & Libraries', 'Machine Learning & AI'] },
  { name: 'Pandas', tags: ['Frameworks & Libraries', 'Machine Learning & AI'] },
  { name: 'NumPy', tags: ['Frameworks & Libraries', 'Machine Learning & AI'] },
  { name: 'React', tags: ['Frameworks & Libraries', 'Frontend'] },

  // Data & infrastructure
  { name: 'MySQL', tags: ['Database', 'Backend'] },
  { name: 'Docker', tags: ['Cloud & DevOps', 'Backend'] },
  { name: 'Kubernetes', tags: ['Cloud & DevOps'] },
  { name: 'Amazon Web Services (AWS)', tags: ['Cloud & DevOps', 'Backend', 'Database'] },
  { name: 'Git', tags: ['Cloud & DevOps'] },
  { name: 'CI/CD', tags: ['Cloud & DevOps'] },
  { name: 'Linux', tags: ['Cloud & DevOps', 'Backend'] },
  { name: 'Blockchain (Hyperledger Fabric)', tags: ['Backend', 'Cloud & DevOps'] },
  { name: 'REST APIs', tags: ['Backend', 'Frontend'] },

  // Professional
  { name: 'Problem Solving', tags: ['Professional Skills'] },
  { name: 'Team Collaboration', tags: ['Professional Skills'] },
  { name: 'Analytical Thinking', tags: ['Professional Skills'] },
  { name: 'Communication', tags: ['Professional Skills'] },
  { name: 'Mentorship', tags: ['Professional Skills'] },
  { name: 'Technical Documentation', tags: ['Professional Skills'] },
];
