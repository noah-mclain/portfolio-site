import type { ReactNode } from 'react';
import styles from './Section.module.css';
interface SectionProps {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
}
export function Section({ id, title, description, children }: SectionProps) {
  return (
    <section id={id} className={styles.section}>
      <div className="container">
        <header className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          {description && <p className={styles.description}>{description}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}
