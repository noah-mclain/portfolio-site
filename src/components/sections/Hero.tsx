import { ArrowRight, FileText } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { profile } from '@/data/profile';
import { trackEvent } from '@/lib/analytics';
import portrait from '@/assets/portrait.png';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section id="home" className={styles.hero}>

      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <p className={styles.status}>
            <span aria-hidden />
            {profile.availability}
          </p>

          <h1 className={styles.headline}>
            Hey, I'm <span className={styles.name}>{profile.firstName}</span>.
          </h1>

          <p className={styles.title}>
            {profile.title}
          </p>

          <p className={styles.tagline}>
            {profile.tagline}
          </p>

          <div className={styles.actions}>
            <Button as="a" href="#projects" variant="primary" size="lg" iconRight={<ArrowRight size={18} />}>
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
          <img
            src={portrait}
            alt="Nada Mohamed"
            className={styles.portrait}
            width={1120}
            height={1400}
          />
        </div>
      </div>

    </section>
  );
}
