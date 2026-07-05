import { profile } from '@/data/profile';
import styles from './Footer.module.css';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.copy}>
          © {year} {profile.fullName} · {profile.title} · Built with React, TypeScript & a lot of
          coffee.
        </p>
      </div>
    </footer>
  );
}
