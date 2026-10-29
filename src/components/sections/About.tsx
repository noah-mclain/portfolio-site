import { ArrowUpRight, GraduationCap, Languages, MapPin, Rocket, Sparkles } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { profile } from '@/data/profile';
import { awards, certifications, education, languages } from '@/data/education';
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
      <div className={styles.content}>
        <div className={`${styles.copy} reveal`} data-delay="3">
          <p>{profile.bio.join(' ')}</p>
        </div>

        <Card className="reveal" data-delay="4">
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

        <Card className="reveal" data-delay="5">
          <h3 className={styles.certsTitle}>Awards & certifications</h3>
          <ul className={styles.awardList}>
            {awards.map((award) => (
              <li key={award.name} className={styles.award}>
                <p className={styles.certName}>{award.name}</p>
                <p className={styles.certIssuer}>{award.issuer}</p>
                <p className={styles.awardDescription}>{award.description}</p>
                <a
                  href={award.source}
                  className={styles.awardLink}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Read the announcement for ${award.name} (opens in a new tab)`}
                >
                  Read announcement <ArrowUpRight size={14} aria-hidden />
                </a>
              </li>
            ))}
          </ul>
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
    </Section>
  );
}
