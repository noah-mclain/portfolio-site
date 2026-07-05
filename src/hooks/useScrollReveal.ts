import { useEffect, useRef } from 'react';

interface Options {
  threshold?: number | number[];
  rootMargin?: string;
  once?: boolean;
}

/**
 * Add `.reveal` to any element and ref it through this hook to fade/slide in
 * when scrolled into view. Children with `.reveal` are also observed, so a
 * single hook on a section animates every nested item.
 */
export function useScrollReveal<T extends HTMLElement>({
  threshold = 0,
  rootMargin = '0px 0px -80px 0px',
  once = true,
}: Options = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const targets = new Set<Element>();
    if (root.classList.contains('reveal')) targets.add(root);
    root.querySelectorAll('.reveal').forEach((el) => targets.add(el));
    if (targets.size === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove('is-visible');
          }
        }
      },
      { threshold, rootMargin },
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return ref;
}
