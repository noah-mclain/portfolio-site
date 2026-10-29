import { Section } from '@/components/ui/Section';
import { Pill } from '@/components/ui/Pill';
import { experience } from '@/data/experience';
import styles from './Experience.module.css';

export function Experience() {
  return (
    <Section id="experience" title="Where I've worked">
      <ol className={styles.timeline}>
        {experience.map((entry) => (
          <li
            key={`${entry.organization}-${entry.startDate}`}
            className={styles.entry}
          >
            <div className={styles.marker}>
              <span className={styles.dot} aria-hidden />
              <span className={styles.year}>
                {entry.startDate.split(' ').pop()}
              </span>
            </div>

            <div className={styles.body}>
              <header className={styles.header}>
                <h3 className={styles.role}>{entry.role}</h3>
                <p className={styles.org}>
                  {entry.organization}
                  {entry.context ? (
                    <span className={styles.context}> · {entry.context}</span>
                  ) : null}
                </p>
                <div className={styles.meta}>
                  <Pill tone="accent">
                    {entry.startDate} – {entry.endDate}
                  </Pill>
                  <Pill>{entry.location}</Pill>
                </div>
              </header>

              <ul className={styles.bullets}>
                {entry.highlights.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
