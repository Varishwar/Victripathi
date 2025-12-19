import React, { useState, useEffect, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { RESUME_DATA } from './constants';
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Contact from './components/Contact';

// Lazy load heavy 3D background
const ParticleBackground = React.lazy(() => import('./components/ParticleBackground'));

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Reduce loading time on mobile for better UX
    const timer = setTimeout(() => {
      setLoading(false);
    }, isMobile ? 1500 : 2500);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  return (
    <>
      <CustomCursor />
      
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" />}
      </AnimatePresence>

      {!loading && (
        <main className="relative bg-slate-950 text-white min-h-screen selection:bg-azure-500/30 selection:text-azure-200 cursor-none">
            {/* Header */}
            <Header />

            {/* 3D Background Layer */}
            <div className="fixed inset-0 z-0 pointer-events-none">
              <Suspense fallback={null}>
                 <ParticleBackground />
              </Suspense>
            </div>

            {/* Content Sections */}
            <Hero data={RESUME_DATA} />
            <Skills skills={RESUME_DATA.skills} />
            <Experience jobs={RESUME_DATA.experience} />
            <Certifications certs={RESUME_DATA.certifications} />
            <Contact contact={RESUME_DATA.contact} />

            {/* Footer */}
            <footer className="relative z-10 py-8 bg-slate-950 text-center text-slate-600 text-sm border-t border-slate-900">
               <p>© {new Date().getFullYear()} Varishwar Tripathi. Built with React, Three.js & Tailwind.</p>
            </footer>
        </main>
      )}
    </>
  );
};

export default App;