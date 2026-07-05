import type { Project } from '@/types';

export const projects: Project[] = [
  {
    name: 'Payramid',
    tagline: 'Blockchain payroll on Egypt’s national rails',
    description:
      'My graduation project: a blockchain-based payroll-orchestration and immutable-audit layer that lets employers disburse salaries instantly with cryptographically verifiable proofs of payment — settling on Egypt’s national rails (InstaPay, Meeza, ACH) within local banking and data-protection regulation.',
    highlights: [
      'Hyperledger Fabric chaincode (Go) on a 3-org RAFT network with MAJORITY endorsement, validated by 91 automated tests covering serialization integrity, double-spend prevention, and a full STRIDE threat model',
      'Offline reach via encrypted SMS relay — one-time withdrawal codes for feature phones — plus non-custodial wallets using Privy threshold (MPC) key management',
      'Authored the complete IEEE 830 SRS and IEEE 829 test plan',
    ],
    tech: ['Go', 'Hyperledger Fabric', 'TypeScript', 'Privy MPC', 'Twilio', 'Docker'],
    status: 'ongoing',
    featured: true,
    repo: 'https://github.com/Payramid/Payramid-V1',
  },
  {
    name: 'Jarvis AI Assistant',
    tagline: 'Modular multimodal AI assistant',
    description:
      'A Jarvis-style assistant with code generation, image captioning, and voice interaction. Supports prompt-based instruction tuning and custom toolchains for autonomous task execution.',
    highlights: [
      'Fine-tuned DeepSeek-Coder and FLAN-UL2 for multimodal encoder-decoder workflows',
      'Integrated NLP, Whisper-based speech recognition, and intelligent agent orchestration',
    ],
    tech: ['Python', 'DeepSeek-Coder', 'FLAN-UL2', 'HuggingFace', 'Whisper'],
    status: 'ongoing',
  },
  {
    name: 'Oribu',
    tagline: 'AI-powered facial recognition',
    description:
      'Facial recognition system built around a Siamese Neural Network for criminal detection. Uses contrastive loss for high-accuracy one-shot face verification with real-time SMS alerts.',
    highlights: [
      'One-shot face verification with contrastive Siamese architecture',
      'Real-time recognition pipeline with Twilio SMS alerts on match',
    ],
    tech: ['Python', 'OpenCV', 'Siamese NN', 'Twilio API'],
    status: 'shipped',
  },
  {
    name: 'SCLPL Editor',
    tagline: 'Custom code editor with lexer & parser',
    description:
      'A full lexical and syntax analysis pipeline supporting a custom toy language (SCLPL) for educational tooling. Multi-tab IDE with automatic language recognition and syntax highlighting.',
    highlights: [
      'Hand-rolled lexer and parser for the SCLPL language',
      'Multi-tab editor with syntax highlighting and AST visualization',
    ],
    tech: ['Python', 'Tkinter', 'Pillow', 'Graphviz', 'Pytest'],
    status: 'shipped',
  },
  {
    name: 'Fera5 Invaders',
    tagline: 'RL agent in an arcade shooter',
    description:
      'An arcade-style space shooter where an AI component learns to play the game using reinforcement learning. Players fend off waves of invaders alongside (or against) the agent.',
    highlights: [
      'Reinforcement learning agent trained on game state',
      'Custom Pygame engine with TensorFlow + PyTorch experimentation',
    ],
    tech: ['Python', 'Pygame', 'TensorFlow', 'PyTorch', 'NumPy'],
    status: 'shipped',
  },
  {
    name: 'OverClocked',
    tagline: 'System monitoring & optimization',
    description:
      'A cross-platform system monitoring tool that captures hardware and software performance metrics with logging and visualization. Containerized for repeatable deployment.',
    highlights: [
      'Cross-platform metric collection (Ubuntu + macOS)',
      'Containerized with Docker for repeatable deployment',
    ],
    tech: ['Bash', 'Python', 'Zenity', 'Docker'],
    status: 'shipped',
  },
];
