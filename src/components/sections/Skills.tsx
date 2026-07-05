import { Brain, Code2, Sparkles, Users, Wrench, type LucideIcon } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Pill } from '@/components/ui/Pill';
import { skillGroups } from '@/data/skills';
import type { SkillGroup } from '@/types';
import styles from './Skills.module.css';

const ICON_MAP: Record<SkillGroup['icon'], LucideIcon> = {
  code: Code2,
  brain: Brain,
  wrench: Wrench,
  sparkles: Sparkles,
  users: Users,
};

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Toolkit"
      title="Skills & technologies"
      description="The stack I reach for when building intelligent systems and shipping them end-to-end."
    >
      <div className={styles.grid}>
        {skillGroups.map((group, i) => {
          const Icon = ICON_MAP[group.icon];
          return (
            <Card key={group.category} className={`reveal ${styles.card}`} data-delay={String((i % 5) + 1)}>
              <div className={styles.iconWrap}>
                <Icon size={20} />
              </div>
              <h3 className={styles.category}>{group.category}</h3>
              <ul className={styles.skills}>
                {group.skills.map((skill) => (
                  <li key={skill}>
                    <Pill>{skill}</Pill>
                  </li>
                ))}
              </ul>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
