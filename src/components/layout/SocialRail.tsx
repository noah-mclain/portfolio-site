import { AtSign } from 'lucide-react';
import { socials } from '@/data/profile';
import { SocialIcon } from '@/components/ui/SocialIcon';
import styles from './SocialRail.module.css';

/**
 * Floating contact rail. Collapsed to a single glass button so it never
 * covers content; hovering (or keyboard focus) unfolds the channels.
 * No handles or numbers in plain view.
 */
export function SocialRail() {
  return (
    <aside className={styles.rail} aria-label="Contact links">
      <span className={styles.toggle} aria-hidden>
        <AtSign size={18} />
      </span>
      <ul className={styles.items}>
        {socials.map((social) => (
          <li key={social.label}>
            <a
              href={social.href}
              className={styles.item}
              aria-label={social.label}
              data-label={social.label}
              target={social.href.startsWith('http') ? '_blank' : undefined}
              rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              <SocialIcon icon={social.icon} size={18} />
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
