import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navLinks, profile } from '@/data/profile';
import { useActiveSection } from '@/hooks/useActiveSection';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import styles from './Navbar.module.css';
const SECTION_IDS = navLinks.map((link) => link.href.slice(1));
export function Navbar({ isArchive }: { isArchive: boolean }) {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS, isArchive);
  return (
    <header className={styles.nav}>
      <div className={`container ${styles.inner}`}>
        <a href="#home" className={styles.logo} onClick={() => setOpen(false)}>
          {profile.fullName}
          <span aria-hidden>.</span>
        </a>
        <div className={styles.controls}>
          <ThemeToggle />
          <button
            type="button"
            className={styles.menu}
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-expanded={open}
            aria-controls="primary-nav"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <nav
          id="primary-nav"
          className={`${styles.links} ${open ? styles.open : ''}`}
          aria-label="Primary"
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              setOpen(false);
              document
                .querySelector<HTMLButtonElement>(
                  '[aria-controls="primary-nav"]',
                )
                ?.focus();
            }
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={
                active === link.href.slice(1) ? 'location' : undefined
              }
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
