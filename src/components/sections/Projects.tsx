import { ArrowUpRight, Github } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Pill } from '@/components/ui/Pill';
import { projects } from '@/data/projects';
import type { Project } from '@/types';
import styles from './Projects.module.css';

const STATUS_LABEL: Record<NonNullable<Project['status']>, string> = {
  ongoing: 'Ongoing',
  shipped: 'Shipped',
  archived: 'Archived',
};

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Selected work"
      title="Projects I've built"
      description="A handful of the things I've shipped or am still pushing on — across AI agents, computer vision, RL, and developer tooling."
    >
      <div className={styles.grid}>
        {projects.map((project, i) => (
          <Card
            key={project.name}
            interactive={Boolean(project.link || project.repo)}
            className={`reveal ${styles.card}`}
            data-delay={String((i % 5) + 1)}
          >
            <div className={styles.cardHeader}>
              <div>
                <h3 className={styles.name}>{project.name}</h3>
                <p className={styles.tagline}>{project.tagline}</p>
              </div>
              {project.status && (
                <Pill tone={project.status === 'ongoing' ? 'accent' : 'muted'} dot={project.status === 'ongoing'}>
                  {STATUS_LABEL[project.status]}
                </Pill>
              )}
            </div>

            <p className={styles.description}>{project.description}</p>

            <ul className={styles.highlights}>
              {project.highlights.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>

            <ul className={styles.tech}>
              {project.tech.map((t) => (
                <li key={t}>
                  <Pill>{t}</Pill>
                </li>
              ))}
            </ul>

            {(project.link || project.repo) && (
              <div className={styles.links}>
                {project.link && (
                  <a href={project.link} className={styles.linkBtn} target="_blank" rel="noreferrer">
                    Live <ArrowUpRight size={14} />
                  </a>
                )}
                {project.repo && (
                  <a href={project.repo} className={styles.linkBtn} target="_blank" rel="noreferrer">
                    <Github size={14} /> Code
                  </a>
                )}
              </div>
            )}
          </Card>
        ))}
      </div>
    </Section>
  );
}
