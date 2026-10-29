import { Section } from '@/components/ui/Section';
import { skillFilters, skills } from '@/data/skills';
import styles from './Skills.module.css';
export function Skills() {
  return (
    <Section id="skills" title="Skills & technologies">
      <dl className={styles.groups}>
        {skillFilters.map((group) => (
          <div key={group} className={styles.group}>
            <dt>{group}</dt>
            <dd>
              {skills
                .filter((skill) => skill.tags.includes(group))
                .map((skill) => skill.name)
                .join(' · ')}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
