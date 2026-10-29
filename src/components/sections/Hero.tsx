import { ArrowRight, FileText } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { profile } from '@/data/profile';
import { trackEvent } from '@/lib/analytics';
import portrait from '@/assets/portrait.webp';
import portraitAvif from '@/assets/portrait.avif';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <svg
        className={styles.circuit}
        viewBox="0 0 440 220"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M0 30h120l40 40h160l40-40h80M0 110h80l40 40h140l50-50h130M0 200h160l40-40h160l40 40h40"
          stroke="currentColor"
        />
        <g stroke="currentColor">
          <circle cx="120" cy="30" r="4" />
          <circle cx="260" cy="150" r="4" />
          <circle cx="360" cy="160" r="4" />
        </g>
      </svg>

      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <p className={styles.availability}>
            {profile.availability} · {profile.location}
          </p>

          <h1 className={styles.headline}>{profile.fullName}</h1>

          <p className={styles.title}>
            {profile.title} · Backend & Applied Systems
          </p>

          <p className={styles.tagline}>{profile.tagline}</p>

          <div className={styles.actions}>
            <Button
              as="a"
              href="#projects"
              variant="primary"
              size="lg"
              iconRight={<ArrowRight size={18} />}
            >
              View my work
            </Button>
            <Button
              as="a"
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              variant="secondary"
              size="lg"
              iconLeft={<FileText size={18} />}
              onClick={() => trackEvent('view_cv')}
            >
              View CV
            </Button>
          </div>
        </div>

        <div className={styles.portraitWrap}>
          <picture>
            <source srcSet={portraitAvif} type="image/avif" />
            <img
              src={portrait}
              alt="Nada Mohamed"
              className={styles.portrait}
              fetchPriority="high"
              width={640}
              height={800}
            />
          </picture>
        </div>
      </div>
    </section>
  );
}
