import { Fragment, useRef } from 'react';
import { LogoMark } from '@/components/ui/LogoMark';
import { Section } from '@/components/ui/Section';
import { experience } from '@/data/experience';
import { ExperienceCircuit } from './ExperienceCircuit';
import styles from './Experience.module.css';

/** Renders **bold** segments in a takeaway line. */
function Emphasis({ text }: { text: string }) {
  return (
    <>
      {text.split('**').map((part, i) => (
        <Fragment key={i}>{i % 2 ? <strong>{part}</strong> : part}</Fragment>
      ))}
    </>
  );
}

export function Experience() {
  const listRef = useRef<HTMLOListElement>(null);

  return (
    <Section id="experience" title="Experience">
      <div className={styles.wrap}>
        <ExperienceCircuit listRef={listRef} />
        <ol ref={listRef} className={styles.list}>
        {experience.map((entry) => (
          <li key={`${entry.organization}-${entry.startDate}`} className={styles.entry}>
            <div className={styles.rail}>
              <span className={styles.node} data-node>
                {entry.logo ? (
                  <LogoMark src={entry.logo} size={34} />
                ) : (
                  <span className={styles.initials}>{entry.organization}</span>
                )}
              </span>
              <span className={styles.year} data-year>{entry.startDate.split(' ').pop()}</span>
            </div>

            <div className={styles.body} data-body>
              <h3 className={styles.org}>
                {entry.url ? (
                  <a href={entry.url} target="_blank" rel="noreferrer">
                    {entry.organization}
                  </a>
                ) : (
                  entry.organization
                )}
              </h3>
              <p className={styles.role}>
                {entry.role}
                {entry.context ? ` · ${entry.context}` : ''}
              </p>
              <p className={styles.dates}>
                {entry.startDate} – {entry.endDate}
              </p>

              <ul className={styles.takeaways}>
                {entry.takeaways.map((line) => (
                  <li key={line} data-takeaway>
                    <Emphasis text={line} />
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
        </ol>
      </div>
    </Section>
  );
}
