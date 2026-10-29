import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SocialIcon } from '@/components/ui/SocialIcon';
import { profile, socials } from '@/data/profile';
import { trackEvent } from '@/lib/analytics';
import styles from './Contact.module.css';

export function Contact() {
  return (
    <section id="contact" className={styles.outro}>
      <div className={`container ${styles.inner}`}>
        <h2 className={styles.heading}>Contact</h2>

        <p className={styles.text}>
          I'm open to AI/ML roles, research collaborations, and weird ideas — I
          read everything.
        </p>

        <div className={styles.actions}>
          <Button
            as="a"
            href="mailto:nadamo.cs@gmail.com"
            variant="primary"
            size="lg"
            onClick={() => trackEvent('email_click')}
          >
            Email me
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

        <ul className={styles.channels} aria-label="Contact links">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                className={styles.channel}
                aria-label={social.label}
                data-label={social.label}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={
                  social.href.startsWith('http')
                    ? 'noopener noreferrer'
                    : undefined
                }
                onClick={() => trackEvent(`social_${social.icon}_click`)}
              >
                <SocialIcon icon={social.icon} size={19} />
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
