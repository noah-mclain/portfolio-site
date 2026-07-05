import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import styles from './ThemeToggle.module.css';

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      className={styles.toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={!isDark}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className={`${styles.icon} ${styles.sun}`} aria-hidden>
        <Sun size={16} />
      </span>
      <span className={`${styles.icon} ${styles.moon}`} aria-hidden>
        <Moon size={16} />
      </span>
      <span className={styles.thumb} aria-hidden />
    </button>
  );
}
