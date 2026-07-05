import type { ReactNode } from 'react';
import styles from './Pill.module.css';

interface PillProps {
  children: ReactNode;
  tone?: 'accent' | 'neutral' | 'muted';
  dot?: boolean;
  className?: string;
}

export function Pill({ children, tone = 'neutral', dot = false, className }: PillProps) {
  const classes = [styles.pill, styles[tone], className].filter(Boolean).join(' ');
  return (
    <span className={classes}>
      {dot && <span className={styles.dot} />}
      {children}
    </span>
  );
}
