import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
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

  const picker = (
    <label className={styles.picker}>
      <span className="sr-only">Filter skills</span>
      <select id="skill-filter" value={filter} onChange={(e) => setFilter(e.target.value as Filter)}>
        {(['All', ...skillFilters] as Filter[]).map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>
      <ChevronDown size={16} aria-hidden />
    </label>
  );

  return (
    <Section id="skills" title="Skills" action={picker}>
      <Card>
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
