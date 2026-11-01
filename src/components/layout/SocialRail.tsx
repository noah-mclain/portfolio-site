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
 * When the outro section scrolls into view the rail unfolds on its own;
 * the closing copy points at it instead of repeating the links.
 */
export function SocialRail() {
  const [open, setOpen] = useState(false);
  // Viewport y of the contact block's center, so the open rail sits level with it.
  const [y, setY] = useState<number | null>(null);

  // Check the outro's position on each scroll frame instead of holding an
  // IntersectionObserver on the node: the outro remounts when the route
  // changes, and an observer bound to the old node goes stale silently.
  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const outro = document.getElementById('contact');
      if (!outro) {
        setOpen(false);
        return;
      }
      const rect = outro.getBoundingClientRect();
      const isOpen = rect.top < window.innerHeight * 0.7 && rect.bottom > window.innerHeight * 0.3;
      setOpen(isOpen);
      const block = (outro.firstElementChild ?? outro).getBoundingClientRect();
      const margin = 120;
      setY(isOpen ? Math.min(window.innerHeight - margin, Math.max(margin, block.top + block.height / 2)) : null);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('hashchange', schedule);
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('hashchange', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return (
    <aside
      className={`${styles.rail} ${open ? styles.open : ''}`}
      style={y === null ? undefined : { top: y }}
      aria-label="Contact links"
    >
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
