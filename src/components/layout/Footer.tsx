import { profile, socials } from '@/data/profile';
import { SocialIcon } from '@/components/ui/SocialIcon';
import styles from './Footer.module.css';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <a href="#home" className={styles.logo}>
            {profile.firstName.toLowerCase()}
            <span className={styles.dot} aria-hidden />
          </a>
          <p className={styles.tagline}>{profile.title} · {profile.location}</p>
        </div>

        <ul className={styles.socials} aria-label="Social links">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                aria-label={social.label}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={styles.socialLink}
              >
                <SocialIcon icon={social.icon} />
              </a>
            </li>
          ))}
        </ul>

        <p className={styles.copy}>
          © {year} {profile.fullName}. Built with React, TypeScript & a lot of coffee.
        </p>
      </div>
    </footer>
  );
}
