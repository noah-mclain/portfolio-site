import { GraduationCap, MapPin, Rocket, Sparkles } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { profile } from '@/data/profile';
import { education } from '@/data/education';
import styles from './About.module.css';

const degree = education[0];

const facts = [
  {
    icon: GraduationCap,
    label: 'Education',
    value: `${degree.degree} — AAST × ${degree.partnerInstitution}`,
  },
  { icon: MapPin, label: 'Based in', value: profile.location },
  {
    icon: Rocket,
    label: 'Current project',
    value: 'Payramid — blockchain payroll on national rails · Sept 2025 → present',
  },
  { icon: Sparkles, label: 'Focus', value: 'LLMs, agents & applied ML' },
];

export function About() {
  return (
    <Section id="about" eyebrow="About" title="A bit about me" align="left">
      <div className={styles.grid}>
        <div className={`${styles.copy} reveal`} data-delay="3">
          {profile.bio.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <Card className={`reveal ${styles.facts}`} data-delay="4">
          <ul className={styles.factList}>
            {facts.map(({ icon: Icon, label, value }) => (
              <li key={label} className={styles.fact}>
                <span className={styles.factIcon}>
                  <Icon size={17} />
                </span>
                <div>
                  <p className={styles.factLabel}>{label}</p>
                  <p className={styles.factValue}>{value}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Section>
  );
}
