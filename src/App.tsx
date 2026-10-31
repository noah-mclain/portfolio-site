import { lazy, Suspense, useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { SocialRail } from '@/components/layout/SocialRail';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Experience } from '@/components/sections/Experience';
import { Projects } from '@/components/sections/Projects';
import { Contact } from '@/components/sections/Contact';
import { AllProjects } from '@/components/sections/AllProjects';

// Decorative only, fetched and mounted once the main thread is idle so it
// never competes with first paint.
const CircuitBackground = lazy(() => import('@/components/layout/CircuitBackground'));

function useIdleMount() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(() => setReady(true), { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(() => setReady(true), 400);
    return () => window.clearTimeout(id);
  }, []);
  return ready;
}

/**
 * Tiny hash router: `#/projects` shows the archive, anything else the main
 * page. Hash routing keeps back/forward working on GitHub Pages without a
 * server-side fallback.
 */
function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const onChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return hash;
}

export default function App() {
  const idle = useIdleMount();
  const hash = useHashRoute();
  const isArchive = hash === '#/projects';

  useEffect(() => {
    if (isArchive) {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      return;
    }
    // Leaving the archive for a section link (e.g. "Back home" -> #projects): the section
    // only exists after this render, so the browser couldn't jump to it on hashchange.
    const target = window.location.hash.slice(1);
    if (target && !target.startsWith('/')) {
      document.getElementById(target)?.scrollIntoView({ behavior: 'instant' as ScrollBehavior });
    }
  }, [isArchive]);

  return (
    <>
      {idle && (
        <Suspense fallback={null}>
          <CircuitBackground />
        </Suspense>
      )}
      <Navbar />
      <SocialRail />
      <main>
        {isArchive ? (
          <AllProjects />
        ) : (
          <>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Contact />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
