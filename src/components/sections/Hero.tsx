import { ArrowRight, FileText } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Pill } from '@/components/ui/Pill';
import { profile } from '@/data/profile';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { trackEvent } from '@/lib/analytics';
import portrait from '@/assets/portrait.png';
import styles from './Hero.module.css';

export function Hero() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section id="home" ref={ref} className={styles.hero}>
      <div className={styles.glow} aria-hidden />

      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <div className={`${styles.pillRow} reveal`}>
            <Pill tone="accent" dot>
              {profile.availability}
            </Pill>
          </div>

          <h1 className={`${styles.headline} reveal`} data-delay="1">
            Hey, I'm <span className={styles.name}>{profile.firstName}</span>.
          </h1>

          <p className={`${styles.title} reveal`} data-delay="2">
            {profile.title}
          </p>

          <p className={`${styles.tagline} reveal`} data-delay="3">
            {profile.tagline}
          </p>

          <div className={`${styles.actions} reveal`} data-delay="4">
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

        <div className={`${styles.portraitWrap} reveal`} data-delay="2">
          <div className={styles.portraitGlow} aria-hidden />
          <img
            src={portrait}
            alt="Nada Mohamed"
            className={styles.portrait}
            width={1120}
            height={1400}
          />
        </div>
      </div>

      <a href="#about" className={styles.scrollHint} aria-label="Scroll to next section">
        <span className={styles.scrollLabel}>scroll</span>
        <span className={styles.scrollLine} aria-hidden />
      </a>
    </section>
  );
}
