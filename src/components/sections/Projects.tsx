import { ArrowRight, ArrowUpRight, Github } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Pill } from '@/components/ui/Pill';
import { Button } from '@/components/ui/Button';
import { spotlightProjects } from '@/data/projects';
import { trackEvent } from '@/lib/analytics';
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
      description="Current favourites — the full archive is one click away."
    >
      <div className={styles.grid}>
        {spotlightProjects.map((project, i) => (
          <Card
            key={project.name}
            interactive={Boolean(project.link || project.repo)}
            className={`reveal ${styles.card} ${project.featured ? styles.featured : ''}`}
            data-delay={String((i % 5) + 1)}
          >
            <div className={styles.cardHeader}>
              <div>
                <h3 className={styles.name}>{project.name}</h3>
                <p className={styles.tagline}>{project.tagline}</p>
                {project.period && <p className={styles.period}>{project.period}</p>}
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
                  <a
                    href={project.link}
                    className={styles.linkBtn}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackEvent(`project_live_${project.name}`)}
                  >
                    Live <ArrowUpRight size={14} />
                  </a>
                )}
                {project.repo && (
                  <a
                    href={project.repo}
                    className={styles.linkBtn}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackEvent(`project_repo_${project.name}`)}
                  >
                    <Github size={14} /> Code
                  </a>
                )}
              </div>
            )}
          </Card>
        ))}
      </div>

      <div className={`${styles.more} reveal`} data-delay="1">
        <Button
          as="a"
          href="#/projects"
          variant="secondary"
          size="md"
          iconRight={<ArrowRight size={16} />}
          onClick={() => trackEvent('view_all_projects')}
        >
          View all projects
        </Button>
      </div>
    </Section>
  );
}
