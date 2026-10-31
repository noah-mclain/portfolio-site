import type { ReactNode } from 'react';
import styles from './Section.module.css';

interface SectionProps {
  id: string;
  title: ReactNode;
  /** Optional control shown on the title's row, e.g. a filter. */
  action?: ReactNode;
  children: ReactNode;
}

export function Section({ id, title, action, children }: SectionProps) {
  return (
    <section id={id} className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.head}>
          <h2 className={styles.title}>{title}</h2>
          {action}
        </div>
        {children}
      </div>
    </section>
  );
}
