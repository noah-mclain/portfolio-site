import { ArrowRight, ArrowUpRight, Github } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Pill } from '@/components/ui/Pill';
import { Button } from '@/components/ui/Button';
import { awards } from '@/data/education';
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
      title="Projects I've built"
      description="Applied AI, payment infrastructure, and software built with a team."
    >
      <div className={styles.grid}>
        {spotlightProjects.map((project) => (
          <article
            key={project.name}
            className={`${styles.card} ${project.featured ? styles.featured : ''}`}
          >
            <div className={styles.cardHeader}>
              <div>
                <h3 className={styles.name}>{project.name}</h3>
                <p className={styles.tagline}>{project.tagline}</p>
                {project.period && (
                  <p className={styles.period}>{project.period}</p>
                )}
              </div>
              {project.status && (
                <Pill
                  tone={project.status === 'ongoing' ? 'accent' : 'muted'}
                  dot={project.status === 'ongoing'}
                >
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

            {project.featured && (
              <div className={styles.validation}>
                <h4>Competition results</h4>
                {awards.map((award) => (
                  <a
                    key={award.name}
                    href={award.source}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {award.name}
                    <ArrowUpRight size={14} />
                  </a>
                ))}
              </div>
            )}
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
          </article>
        ))}
      </div>

      <div className={styles.more}>
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
