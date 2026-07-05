import { Section } from '@/components/ui/Section';
import { profile } from '@/data/profile';
import { OrbitGraphic } from '@/components/sections/OrbitGraphic';
import styles from './About.module.css';

export function About() {
  return (
    <Section id="about" eyebrow="About" title="A bit about me" align="left">
      <div className={styles.grid}>
        <div className={`${styles.copy} reveal`} data-delay="3">
          {profile.bio.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <div className={`${styles.visual} reveal`} data-delay="4">
          <OrbitGraphic />
        </div>
      </div>
    </Section>
  );
}
