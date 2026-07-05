import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navLinks, profile } from '@/data/profile';
import { useActiveSection } from '@/hooks/useActiveSection';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import styles from './Navbar.module.css';

const SECTION_IDS = navLinks.map((l) => l.href.replace('#', ''));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 16);
    handle();
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <a href="#home" className={styles.logo} aria-label="Home">
          <span className={styles.logoMark}>{profile.firstName.toLowerCase()}</span>
          <span className={styles.logoDot} aria-hidden />
        </a>

        <nav className={styles.desktop} aria-label="Primary">
          <ul>
            {navLinks.map((link) => {
              const id = link.href.replace('#', '');
              const isActive = active === id;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`${styles.link} ${isActive ? styles.linkActive : ''}`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.actions}>
          <ThemeToggle />
          <button
            type="button"
            className={styles.menuButton}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`${styles.mobile} ${open ? styles.mobileOpen : ''}`}
        aria-hidden={!open}
      >
        <ul>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setOpen(false)} className={styles.mobileLink}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
