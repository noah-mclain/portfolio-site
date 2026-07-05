import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import styles from './ThemeToggle.module.css';

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <button type="button" onClick={toggle} className={styles.toggle} aria-label={label} title={label}>
      <Sun size={18} className={`${styles.icon} ${styles.sun}`} aria-hidden />
      <Moon size={18} className={`${styles.icon} ${styles.moon}`} aria-hidden />
    </button>
  );
}
