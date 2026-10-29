import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { BriefcaseBusiness, FolderGit2, Home, Mail, Sparkles, UserRound } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { navLinks, profile } from '@/data/profile';
import { useActiveSection } from '@/hooks/useActiveSection';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import styles from './Navbar.module.css';

const SECTION_IDS = navLinks.map((l) => l.href.replace('#', ''));

const DOCK_ICONS: Record<string, LucideIcon> = {
  home: Home,
  about: UserRound,
  skills: Sparkles,
  experience: BriefcaseBusiness,
  projects: FolderGit2,
  contact: Mail,
};

/* Dock geometry — keep in sync with the CSS. */
const DOCK_ITEM = 42;
const DOCK_GAP = 4;
const DOCK_PAD = 6;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  const listRef = useRef<HTMLUListElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false });

  // Clicking pins the blob to the chosen section so it doesn't slide back
  // while the smooth scroll is still on its way there. Hover chases the
  // pointer; otherwise the blob rests on the active section.
  const target = pinned ?? hovered ?? active;

  // Release the pin once the scroll arrives (or if it never does, e.g. the
  // user grabs the scrollbar mid-flight).
  useEffect(() => {
    if (!pinned) return;
    if (active === pinned) {
      setPinned(null);
      return;
    }
    const timeout = window.setTimeout(() => setPinned(null), 2500);
    return () => window.clearTimeout(timeout);
  }, [pinned, active]);

  useEffect(() => {
    const handle = () => {
      setScrolled(window.scrollY > 16);
      // The mobile dock stays out of the way until the hero (with its own
      // pill-shaped CTAs) is mostly gone. Subpages have no hero, so it
      // shows right away there.
      setPastHero(
        window.location.hash.startsWith('#/') || window.scrollY > window.innerHeight * 0.5,
      );
    };
    handle();
    window.addEventListener('scroll', handle, { passive: true });
    window.addEventListener('hashchange', handle);
    return () => {
      window.removeEventListener('scroll', handle);
      window.removeEventListener('hashchange', handle);
    };
  }, []);

  // Native listener: React synthesizes mouseleave from mouseout pairs, which
  // can miss when the pointer exits the pill quickly.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const clear = () => setHovered(null);
    list.addEventListener('mouseleave', clear);
    return () => list.removeEventListener('mouseleave', clear);
  }, []);

  // Liquid indicator: measure the target link and glide the glass blob to it.
  useLayoutEffect(() => {
    const measure = () => {
      const link = listRef.current?.querySelector<HTMLAnchorElement>(`a[data-section="${target}"]`);
      if (!link) return;
      setIndicator({ left: link.offsetLeft, width: link.offsetWidth, ready: true });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [target]);

  const dockIndex = Math.max(0, SECTION_IDS.indexOf(active));

  return (
    <>
      <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.inner}`}>
          <a href="#home" className={styles.logo} aria-label="Home">
            <span className={styles.logoMark}>{profile.firstName.toLowerCase()}</span>
            <span className={styles.logoDot} aria-hidden />
          </a>

          <nav className={styles.desktop} aria-label="Primary">
            <ul ref={listRef} className={styles.pill}>
              <span
                className={styles.indicator}
                aria-hidden
                style={{
                  transform: `translateX(${indicator.left}px)`,
                  width: indicator.width,
                  opacity: indicator.ready ? 1 : 0,
                }}
              />
              {navLinks.map((link) => {
                const id = link.href.replace('#', '');
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      data-section={id}
                      className={`${styles.link} ${active === id ? styles.linkActive : ''}`}
                      onMouseEnter={() => setHovered(id)}
                      onFocus={() => setHovered(id)}
                      onBlur={() => setHovered(null)}
                      onClick={() => setPinned(id)}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <ThemeToggle />
        </div>
      </header>

      {/* Mobile: floating glass dock, app-style. Slides in after the hero. */}
      <nav className={`${styles.dock} ${pastHero ? '' : styles.dockHidden}`} aria-label="Primary">
        <span
          className={styles.dockIndicator}
          aria-hidden
          style={{ transform: `translateX(${DOCK_PAD + dockIndex * (DOCK_ITEM + DOCK_GAP)}px)` }}
        />
        {navLinks.map((link) => {
          const id = link.href.replace('#', '');
          const Icon = DOCK_ICONS[id] ?? Home;
          return (
            <a
              key={link.href}
              href={link.href}
              aria-label={link.label}
              title={link.label}
              className={`${styles.dockItem} ${active === id ? styles.dockItemActive : ''}`}
            >
              <Icon size={19} />
            </a>
          );
        })}
      </nav>
    </>
  );
}
