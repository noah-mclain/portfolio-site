import { useEffect, useState } from 'react';

/**
 * Tracks which section ID is currently most visible in the viewport so the
 * navbar can highlight the matching link. Uses one IntersectionObserver
 * shared across all section IDs.
 */
export function useActiveSection(sectionIds: string[]): string {
  const [active, setActive] = useState<string>(sectionIds[0] ?? '');

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const visibility = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(entry.target.id, entry.intersectionRatio);
        }
        let topId = sectionIds[0] ?? '';
        let topRatio = 0;
        for (const [id, ratio] of visibility) {
          if (ratio > topRatio) {
            topRatio = ratio;
            topId = id;
          }
        }
        if (topRatio > 0) setActive(topId);
      },
      { threshold: [0.15, 0.35, 0.55, 0.75], rootMargin: '-20% 0px -40% 0px' },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds]);

  return active;
}
