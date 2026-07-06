import type { Project } from '@/types';

/**
 * Ordered newest first; projects from the same stretch are ranked by how
 * much they show off.
 */
export const projects: Project[] = [
  {
    name: 'Payramid',
    tagline: 'Blockchain payroll for Egypt',
    period: 'Sept 2025 → present',
    description:
      'My graduation project: a blockchain-based payroll platform that lets employers pay salaries instantly over Egypt’s national payment rails, with verifiable payment records — designed to work within local banking regulation.',
    highlights: [
      'Instant salary disbursement with tamper-evident, verifiable payment records',
      'Inclusive by design — salary access works even without a smartphone or banking app',
      'Authored the platform’s SRS and formal test documentation, from requirements through verification',
    ],
    tech: ['Go', 'TypeScript', 'Blockchain', 'Docker'],
    status: 'ongoing',
    featured: true,
    spotlight: true,
  },
  {
    name: 'Jarvis AI Assistant',
    tagline: 'Modular multimodal AI assistant',
    period: 'Feb 2025 → present',
    description:
      'A Jarvis-style assistant with code generation, image captioning, and voice interaction. Supports prompt-based instruction tuning and custom toolchains for autonomous task execution.',
    highlights: [
      'Fine-tuned DeepSeek-Coder and FLAN-UL2 for multimodal encoder-decoder workflows',
      'Integrated NLP, Whisper-based speech recognition, and intelligent agent orchestration',
    ],
    tech: ['Python', 'DeepSeek-Coder', 'FLAN-UL2', 'HuggingFace', 'Whisper'],
    status: 'ongoing',
    spotlight: true,
    repo: 'https://github.com/noah-mclain/Jarvis-AI-Assistant',
  },
  {
    name: 'Pixel Paradise',
    tagline: 'Retro arcade gaming website',
    period: 'May 2024 – Feb 2025',
    description:
      'A retro-styled web arcade with playable games wrapped in a handcrafted pixel-art interface. Built with a small team — I was a core developer across gameplay and site features.',
    highlights: [
      'Playable arcade games running in the browser',
      'Full-stack build with accounts and score tracking',
    ],
    tech: ['JavaScript', 'PHP', 'HTML', 'CSS', 'Python'],
    status: 'shipped',
    spotlight: true,
    image: 'https://raw.githubusercontent.com/catsdisownedz/Pixel-Paradise/main/readmeMedia/homepage.png',
    repo: 'https://github.com/catsdisownedz/Pixel-Paradise',
  },
  {
    name: 'Fera5 Invaders',
    tagline: 'RL agent in an arcade shooter',
    period: 'Nov 2024 – Feb 2025',
    description:
      'An arcade-style space shooter where an AI component learns to play the game using reinforcement learning. Players fend off waves of invaders alongside (or against) the agent.',
    highlights: [
      'Reinforcement learning agent trained on game state',
      'Custom Pygame engine with TensorFlow + PyTorch experimentation',
    ],
    tech: ['Python', 'Pygame', 'TensorFlow', 'PyTorch', 'NumPy'],
    status: 'shipped',
    image: 'https://raw.githubusercontent.com/noah-mclain/fera5-invaders/main/assets/ReadmeMedia/dekwan1.png',
    repo: 'https://github.com/noah-mclain/fera5-invaders',
  },
  {
    name: 'Trivia Game',
    tagline: 'Real-time multiplayer trivia',
    period: 'Apr 2024 – Feb 2025',
    description:
      'A JavaFX trivia game with single-player and real-time multiplayer modes: hosted rooms, live chat with typing indicators, audio cues, and scores synced through an AWS-hosted database.',
    highlights: [
      'Real-time multiplayer rooms backed by a shared AWS database',
      'Waiting room with live chat, typing indicators, and sound design',
    ],
    tech: ['Java', 'JavaFX', 'AWS', 'SQL'],
    status: 'shipped',
    image: 'https://raw.githubusercontent.com/noah-mclain/trivia_game/main/readmeMedia/trivia1.png',
    repo: 'https://github.com/noah-mclain/trivia_game',
  },
  {
    name: 'SCLPL Editor',
    tagline: 'Custom code editor with lexer & parser',
    period: 'Nov 2024 – Feb 2025',
    description:
      'A full lexical and syntax analysis pipeline supporting a custom toy language (SCLPL) for educational tooling. Multi-tab IDE with automatic language recognition and syntax highlighting.',
    highlights: [
      'Hand-rolled lexer and parser for the SCLPL language',
      'Multi-tab editor with syntax highlighting and AST visualization',
    ],
    tech: ['Python', 'Tkinter', 'Pillow', 'Graphviz', 'Pytest'],
    status: 'shipped',
    image: 'https://raw.githubusercontent.com/catsdisownedz/Text-Editor/main/readmeMedia/SCLPL1.png',
    repo: 'https://github.com/catsdisownedz/Text-Editor',
  },
  {
    name: 'OverClocked',
    tagline: 'System monitoring & optimization',
    period: 'Dec 2024 – Feb 2025',
    description:
      'A cross-platform system monitoring tool that captures hardware and software performance metrics with logging and visualization. Containerized for repeatable deployment.',
    highlights: [
      'Cross-platform metric collection (Ubuntu + macOS)',
      'Containerized with Docker for repeatable deployment',
    ],
    tech: ['Bash', 'Python', 'Zenity', 'Docker'],
    status: 'shipped',
    repo: 'https://github.com/noah-mclain/OverClocked',
  },
  {
    name: 'Oribu',
    tagline: 'AI-powered facial recognition',
    period: 'Jan – Jul 2023',
    description:
      'My first ever project: a facial recognition system built around a Siamese Neural Network for criminal detection. Uses contrastive loss for high-accuracy one-shot face verification with real-time SMS alerts.',
    highlights: [
      'One-shot face verification with contrastive Siamese architecture',
      'Real-time recognition pipeline with Twilio SMS alerts on match',
    ],
    tech: ['Python', 'OpenCV', 'Siamese NN', 'Twilio API'],
    status: 'shipped',
    repo: 'https://github.com/catsdisownedz/Oribu',
  },
];

/** Home-page picks, in display order. */
export const spotlightProjects: Project[] = [
  projects.find((p) => p.name === 'Payramid')!,
  projects.find((p) => p.name === 'Pixel Paradise')!,
  projects.find((p) => p.name === 'Jarvis AI Assistant')!,
];
