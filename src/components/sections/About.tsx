import type { ReactNode } from 'react';
import { ArrowUpRight, GraduationCap, Languages, MapPin } from 'lucide-react';
import { IconTile } from '@/components/ui/IconTile';
import { LogoMark } from '@/components/ui/LogoMark';
import { Medal } from '@/components/ui/Medal';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { profile } from '@/data/profile';
import { awards, certifications, education, languages } from '@/data/education';
import styles from './About.module.css';

const degree = education[0];

const educationIcon = degree.logos ? (
  <span className={styles.logoPair}>
    {degree.logos.map((logo, i) => (
      <span key={logo} className={styles.logoPair}>
        {i > 0 && <span aria-hidden>×</span>}
        <LogoMark src={logo} size={22} />
      </span>
    ))}
  </span>
) : (
  <GraduationCap size={17} />
);

const facts: { icon: ReactNode; label: string; value: ReactNode; wide?: boolean }[] = [
  {
    icon: educationIcon,
    wide: Boolean(degree.logos),
    label: 'Education',
    value: (
      <>
        <span className={styles.line}>{degree.degree}</span>
        {degree.major && <span className={styles.line}>Major in {degree.major}</span>}
        {degree.gpa && <span className={styles.line}>GPA {degree.gpa}/4.0</span>}
        {degree.honors && (
          <span className={styles.line}>
            Graduated with <strong>Honors</strong>
          </span>
        )}
      </>
    ),
  },
  { icon: <MapPin size={17} />, label: 'Based in', value: profile.location },
  {
    icon: <Languages size={17} />,
    label: 'Languages',
    value: languages.map((l) => (
      <span key={l.name} className={styles.line}>
        {l.name} ({l.proficiency.toLowerCase()})
      </span>
    )),
  },
];

export function About() {
  return (
    <Section id="about" title="About">
      <div className={styles.content}>
        <div className={styles.copy}>
          <p>{profile.bio.join(' ')}</p>
        </div>

        <Card>
          <ul className={styles.factList}>
            {facts.map(({ icon, label, value, wide }) => (
              <li key={label} className={styles.fact}>
                <IconTile wide={wide}>{icon}</IconTile>
                <div>
                  <p className={styles.factLabel}>{label}</p>
                  <p className={styles.factValue}>{value}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h3 className={styles.certsTitle}>Awards & certifications</h3>
          <ul className={styles.awardList}>
            {awards.map((award) => (
              <li key={award.name} className={styles.award}>
                <span className={styles.itemHead}>
                  <IconTile>
                    <Medal place={award.place} size={28} />
                  </IconTile>
                  <span>
                    <p className={styles.certName}>{award.name}</p>
                    <p className={styles.certIssuer}>{award.issuer}</p>
                  </span>
                </span>
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
              <li key={cert.name} className={styles.itemHead}>
                {cert.logo && (
                  <IconTile>
                    <LogoMark src={cert.logo} size={26} />
                  </IconTile>
                )}
                <span>
                  <p className={styles.certName}>{cert.name}</p>
                  <p className={styles.certIssuer}>{cert.issuer}</p>
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Section>
  );
}
