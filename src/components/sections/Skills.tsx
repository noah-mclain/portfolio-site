import { useState } from 'react';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Pill } from '@/components/ui/Pill';
import { skillFilters, skills } from '@/data/skills';
import type { SkillTag } from '@/types';
import styles from './Skills.module.css';

type Filter = SkillTag | 'All';

export function Skills() {
  const [filter, setFilter] = useState<Filter>('All');
  const visible = filter === 'All' ? skills : skills.filter((s) => s.tags.includes(filter));

  return (
    <Section
      id="skills"
      eyebrow="Toolkit"
      title="Skills & technologies"
      description="Everything in one place — filter it the way your job post reads."
    >
      <Card className={`reveal ${styles.panel}`} data-delay="3">
        <div className={styles.filters} aria-label="Filter skills">
          {(['All', ...skillFilters] as Filter[]).map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setFilter(tag)}
              aria-pressed={filter === tag}
              className={`${styles.filterBtn} ${filter === tag ? styles.filterActive : ''}`}
            >
              {tag}
            </button>
          ))}
        </div>

        <ul className={styles.list}>
          {visible.map((skill) => (
            <li key={skill.name}>
              <Pill>{skill.name}</Pill>
            </li>
          ))}
        </ul>
      </Card>
    </Section>
  );
}
