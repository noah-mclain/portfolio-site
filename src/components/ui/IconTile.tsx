import type { ReactNode } from 'react';
import styles from './IconTile.module.css';

/**
 * The site's one icon badge: a tinted square that holds an icon, logo or medal,
 * so marks of different shapes line up at the same size.
 */
export function IconTile({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  return <span className={`${styles.tile} ${wide ? styles.wide : ''}`}>{children}</span>;
}
