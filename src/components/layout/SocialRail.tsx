import { useEffect, useState } from 'react';
import { AtSign } from 'lucide-react';
import { socials } from '@/data/profile';
import { SocialIcon } from '@/components/ui/SocialIcon';
import styles from './SocialRail.module.css';

/**
 * Floating contact rail. Collapsed to a single glass button so it never
 * covers content; hovering (or keyboard focus) unfolds the channels.
 * No handles or numbers in plain view.
 *
 * When the outro section scrolls into view the rail unfolds on its own —
 * the closing copy points at it instead of repeating the links.
 */
export function SocialRail() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const outro = document.getElementById('contact');
    if (!outro) return;
    const observer = new IntersectionObserver(
      ([entry]) => setOpen(entry.isIntersecting),
      { threshold: 0.35 },
    );
    observer.observe(outro);
    return () => observer.disconnect();
  }, []);

  return (
    <aside className={`${styles.rail} ${open ? styles.open : ''}`} aria-label="Contact links">
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
