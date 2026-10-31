import type { CSSProperties } from 'react';
import styles from './LogoMark.module.css';

/** A logo drawn in the current text color, so it follows the theme. The file only supplies the shape. */
export function LogoMark({ src, size = 24, className = '' }: { src: string; size?: number; className?: string }) {
  return (
    <span
      className={`${styles.mark} ${className}`}
      style={{ '--logo': `url("${src}")`, width: size, height: size } as CSSProperties}
      aria-hidden
    />
  );
}
