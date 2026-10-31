import { ProjectImage } from '@/components/ui/ProjectImage';
import { ArrowRight, ArrowUpRight, Github } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Pill } from '@/components/ui/Pill';
import { StatusPill } from '@/components/ui/StatusPill';
import { Button } from '@/components/ui/Button';
import { spotlightProjects } from '@/data/projects';
import { trackEvent } from '@/lib/analytics';
import styles from './Projects.module.css';

export function Projects() {
  return (
    <Section
      id="projects"
      title="Projects"
    >
      <div className={styles.grid}>
        {spotlightProjects.map((project) => (
          <Card
            key={project.name}
            interactive={Boolean(project.link || project.repo)}
            className={styles.card}
          >
            <ProjectImage image={project.image} video={project.video} name={project.name} />
            <div className={styles.cardHeader}>
              <div>
                <h3 className={styles.name}>{project.name}</h3>
                <p className={styles.hook}>{project.hook ?? project.tagline}</p>
              </div>
              {project.status && <StatusPill status={project.status} />}
            </div>
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
