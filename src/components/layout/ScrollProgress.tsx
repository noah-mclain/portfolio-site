import { useEffect, useState } from 'react';
import styles from './ScrollProgress.module.css';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const next = max <= 0 ? 0 : (window.scrollY / max) * 100;
      setProgress(next);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return <div className={styles.bar} style={{ transform: `scaleX(${progress / 100})` }} aria-hidden />;
}
