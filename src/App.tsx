import { useLayoutEffect, useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Experience } from '@/components/sections/Experience';
import { Projects } from '@/components/sections/Projects';
import { Contact } from '@/components/sections/Contact';
import { AllProjects } from '@/components/sections/AllProjects';

export default function App() {
  const [hash, setHash] = useState(window.location.hash);
  const isArchive = hash === '#/projects';
  useEffect(() => {
    const update = () => setHash(window.location.hash);
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);
  // Native fragment navigation can run before the destination remounts when
  // leaving the archive. Resolve it after React commits the new route.
  useLayoutEffect(() => {
    if (isArchive || !hash || hash === '#/')
      window.scrollTo({ top: 0, behavior: 'instant' });
    else
      document
        .getElementById(hash.slice(1))
        ?.scrollIntoView({ behavior: 'instant' });
  }, [hash, isArchive]);
  return (
    <>
      <a
        className="skipLink"
        href="#main"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById('main')?.focus();
          document
            .getElementById('main')
            ?.scrollIntoView({ behavior: 'instant' });
        }}
      >
        Skip to content
      </a>
      <Navbar isArchive={isArchive} />
      <main id="main" tabIndex={-1}>
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
