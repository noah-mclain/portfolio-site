import type { ReactNode } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './Section.module.css';

interface SectionProps {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  align?: 'left' | 'center';
}

export function Section({ id, eyebrow, title, description, children, align = 'center' }: SectionProps) {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section id={id} ref={ref} className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <header className={`${styles.header} ${styles[align]}`}>
          {eyebrow && <p className={`${styles.eyebrow} reveal`}>{eyebrow}</p>}
          <h2 className={`${styles.title} reveal`} data-delay="1">
            {title}
          </h2>
          {description && (
            <p className={`${styles.description} reveal`} data-delay="2">
              {description}
            </p>
          )}
        </header>
        {children}
      </div>
    </section>
  );
}
