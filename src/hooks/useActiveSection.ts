import { useEffect, useState } from 'react';

/** Observe section crossings, rather than measuring every section on scroll.
 * The tall observation band also covers gaps and short final sections. */
export function useActiveSection(ids: string[], isArchive: boolean): string {
  const [active, setActive] = useState(ids[0] ?? '');
  useEffect(() => {
    if (isArchive) return;
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const current = [...ids].reverse().find((id) => visible.has(id));
        if (current) setActive(current);
      },
      { rootMargin: '-15% 0px -35% 0px' },
    );
    ids.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, [ids, isArchive]);
  return isArchive ? 'projects' : active;
}
