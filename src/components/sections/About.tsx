import { GraduationCap, Languages, MapPin, Rocket, Sparkles } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { profile } from '@/data/profile';
import { certifications, education, languages } from '@/data/education';
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
  {
    icon: Languages,
    label: 'Languages',
    value: languages.map((l) => `${l.name} (${l.proficiency.toLowerCase()})`).join(' · '),
  },
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

        <div className={styles.aside}>
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

          <Card className={`reveal ${styles.certs}`} data-delay="5">
            <h3 className={styles.certsTitle}>Certifications</h3>
            <ul className={styles.certList}>
              {certifications.map((cert) => (
                <li key={cert.name}>
                  <p className={styles.certName}>{cert.name}</p>
                  <p className={styles.certIssuer}>{cert.issuer}</p>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </Section>
  );
}
