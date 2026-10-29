import { useCallback, useEffect, useState } from 'react';
export type Theme = 'light' | 'dark';
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.dataset.theme === 'light' ? 'light' : 'dark',
  );
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: light)');
    const sync = () => {
      let stored: string | null = null;
      try {
        stored = localStorage.getItem('theme');
      } catch {
        /* Storage is optional. */
      }
      const next =
        stored === 'dark' || stored === 'light'
          ? stored
          : media.matches
            ? 'light'
            : 'dark';
      document.documentElement.dataset.theme = next;
      setTheme(next);
    };
    media.addEventListener('change', sync);
    window.addEventListener('storage', sync);
    return () => {
      media.removeEventListener('change', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);
  const toggle = useCallback(() => {
    const next =
      document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    setTheme(next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* Keep the in-memory choice. */
    }
  }, []);
  return { theme, toggle };
}
