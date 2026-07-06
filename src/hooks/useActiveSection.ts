import { useEffect, useState } from 'react';

/**
 * Tracks which section is under the reader so the navbar can highlight the
 * matching link: the last section whose top has passed the viewport's upper
 * third wins. Sections are re-queried by ID on every check, so remounts from
 * route changes can never leave the highlight frozen on a stale node.
 * On `#/projects` the archive page is showing, so "projects" is forced.
 */
export function useActiveSection(sectionIds: string[]): string {
  const [active, setActive] = useState<string>(sectionIds[0] ?? '');

  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      if (window.location.hash === '#/projects') {
        setActive('projects');
        return;
      }
      const focus = window.innerHeight * 0.4;
      let current = sectionIds[0] ?? '';
      let last = current;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        last = id;
        if (el.getBoundingClientRect().top <= focus) current = id;
      }
      // At the very bottom the final (short) section may never reach the
      // focus line — light it up anyway.
      const bottomed =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
      setActive(bottomed ? last : current);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    // After a route change the new sections mount asynchronously; check once
    // right away and again shortly after so the highlight lands correctly
    // even before the first scroll.
    let settle = 0;
    const onHash = () => {
      schedule();
      window.clearTimeout(settle);
      settle = window.setTimeout(check, 150);
    };

    check();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('hashchange', onHash);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(settle);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('hashchange', onHash);
    };
  }, [sectionIds]);

  return active;
}
