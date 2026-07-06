import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Pill } from '@/components/ui/Pill';
import { projects } from '@/data/projects';
import styles from './AllProjects.module.css';

/** The full project archive, reachable at #/projects. */
export function AllProjects() {
  return (
    <div className={styles.page}>
      <Section
        id="all-projects"
        eyebrow="Archive"
        title="All projects"
        description="Everything I've built or am still building, newest first."
      >
      <a href="#/" className={styles.back}>
        <ArrowLeft size={15} />
        Back home
      </a>

      <div className={styles.grid}>
        {projects.map((project) => (
          <Card
            key={project.name}
            interactive={Boolean(project.link || project.repo)}
            className={`reveal ${styles.card}`}
          >
            {project.image && (
              <a
                href={project.repo ?? project.link}
                target="_blank"
                rel="noreferrer"
                className={styles.previewLink}
                aria-label={`${project.name} repository`}
                tabIndex={-1}
              >
                <img
                  src={project.image}
                  alt={`${project.name} preview`}
                  className={styles.preview}
                  loading="lazy"
                />
              </a>
            )}
            <div className={styles.cardHeader}>
              <h3 className={styles.name}>{project.name}</h3>
              {project.status === 'ongoing' && (
                <Pill tone="accent" dot>
                  Ongoing
                </Pill>
              )}
            </div>
            <p className={styles.tagline}>{project.tagline}</p>
            {project.period && <p className={styles.period}>{project.period}</p>}
            <p className={styles.description}>{project.description}</p>

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
    </div>
  );
}
