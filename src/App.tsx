import { lazy, Suspense, useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { SocialRail } from '@/components/layout/SocialRail';
import { Footer } from '@/components/layout/Footer';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Experience } from '@/components/sections/Experience';
import { Projects } from '@/components/sections/Projects';
import { Contact } from '@/components/sections/Contact';

// Decorative only — fetched and mounted once the main thread is idle so it
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

export default function App() {
  const idle = useIdleMount();

  return (
    <>
      {idle && (
        <Suspense fallback={null}>
          <CircuitBackground />
        </Suspense>
      )}
      <ScrollProgress />
      <Navbar />
      <SocialRail />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
