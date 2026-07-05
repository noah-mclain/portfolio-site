import { ArrowRight, FileText } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SocialIcon } from '@/components/ui/SocialIcon';
import { profile, socials } from '@/data/profile';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './Contact.module.css';

/**
 * Closing note. No contact card, no addresses on the page — on desktop the
 * floating rail unfolds itself when this section scrolls into view and the
 * copy simply points at it; on narrow screens the channels appear inline.
 */
export function Contact() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section id="contact" ref={ref} className={styles.outro}>
      <div className={`container ${styles.inner}`}>
        <p className={`${styles.eyebrow} reveal`}>One more thing</p>

        <h2 className={`${styles.heading} reveal`} data-delay="1">
          Let's build something together.
        </h2>

        <p className={`${styles.text} reveal`} data-delay="2">
          I'm open to AI/ML roles, research collaborations, and weird ideas — I read everything.
        </p>

        <div className={`${styles.actions} reveal`} data-delay="3">
          <Button as="a" href="mailto:nadamo.cs@gmail.com" variant="primary" size="lg">
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
          >
            View CV
          </Button>
        </div>

        {/* Desktop: the rail has already unfolded — just point at it. */}
        <p className={`${styles.railHint} reveal`} data-delay="4" aria-hidden>
          or pick a channel
          <ArrowRight size={14} className={styles.railArrow} />
        </p>

        {/* Narrow screens have no rail; offer the channels inline. */}
        <ul className={`${styles.channels} reveal`} data-delay="4" aria-label="Contact links">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                className={styles.channel}
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
      </div>
    </section>
  );
}
