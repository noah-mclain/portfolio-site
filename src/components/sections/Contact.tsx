import { Download, Sparkles } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SocialIcon } from '@/components/ui/SocialIcon';
import { profile, socials } from '@/data/profile';
import { certifications, languages } from '@/data/education';
import styles from './Contact.module.css';

export function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Let's talk"
      title="Build something together?"
      description="I'm open to AI/ML roles, research collaborations, and freelance work. Drop a line — I read everything."
    >
      <div className={styles.grid}>
        <Card className={`reveal ${styles.cta}`} data-delay="3">
          <div className={styles.ctaHeader}>
            <Sparkles size={18} className={styles.ctaIcon} />
            <h3>Get in touch</h3>
          </div>
          <p className={styles.ctaText}>
            The fastest way to reach me is email. For everything else — code, conversations, weird ideas — every channel is an icon away.
          </p>
          <div className={styles.ctaActions}>
            <Button as="a" href="mailto:nadamo.cs@gmail.com" variant="primary" size="md">
              Email me
            </Button>
            <Button as="a" href={profile.resumeUrl} download="Nada-Mohamed-CV.pdf" variant="secondary" size="md" iconLeft={<Download size={16} />}>
              Download CV
            </Button>
          </div>

          <ul className={styles.socials} aria-label="Social links">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  className={styles.socialBtn}
                  aria-label={social.label}
                  data-label={social.label}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <SocialIcon icon={social.icon} size={19} />
                </a>
              </li>
            ))}
          </ul>
        </Card>

        <div className={styles.aside}>
          <Card className={`reveal ${styles.asideCard}`} data-delay="4">
            <h4 className={styles.asideTitle}>Certifications</h4>
            <ul className={styles.asideList}>
              {certifications.map((cert) => (
                <li key={cert.name}>
                  <p className={styles.asideListPrimary}>{cert.name}</p>
                  <p className={styles.asideListSecondary}>{cert.issuer}</p>
                </li>
              ))}
            </ul>
          </Card>

          <Card className={`reveal ${styles.asideCard}`} data-delay="5">
            <h4 className={styles.asideTitle}>Languages</h4>
            <ul className={styles.languages}>
              {languages.map((lang) => (
                <li key={lang.name}>
                  <span className={styles.langName}>{lang.name}</span>
                  <span className={styles.langLevel}>{lang.proficiency}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </Section>
  );
}
