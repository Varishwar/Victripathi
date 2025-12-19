import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      {/* Top progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-azure-500 via-teal-500 to-cyan-500 origin-left z-50 shadow-[0_0_10px_rgba(56,189,248,0.5)]"
        style={{ scaleX }}
      />
      
      {/* Scroll percentage indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-8 right-8 z-50 hidden lg:flex items-center justify-center w-14 h-14 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-md border border-azure-500/30 rounded-full shadow-[0_0_25px_rgba(56,189,248,0.3)] group hover:scale-110 transition-transform cursor-pointer"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <motion.div
          className="text-azure-300 text-xs font-mono font-bold group-hover:text-azure-200 transition-colors"
          style={{
            opacity: useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
          }}
        >
          <motion.span>
            {scrollYProgress.get() > 0 ? Math.round(scrollYProgress.get() * 100) : '0'}%
          </motion.span>
        </motion.div>
        
        {/* Rotating ring */}
        <motion.div
          className="absolute inset-0 border-2 border-azure-500/50 rounded-full"
          style={{ rotate: useSpring(scrollYProgress.get() * 360, { stiffness: 100 }) }}
        />
      </motion.div>
    </>
  );
};

export default ScrollProgress;
