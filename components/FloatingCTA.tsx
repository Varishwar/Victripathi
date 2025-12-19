import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface FloatingCTAProps {
  onClose?: () => void;
}

const FloatingCTA: React.FC<FloatingCTAProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling 50% of the page
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > 50 && !hasScrolled) {
        setHasScrolled(true);
        setTimeout(() => setIsVisible(true), 500);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolled]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="fixed bottom-24 right-8 z-50 hidden md:block max-w-md"
        >
          <div className="relative group">
            {/* Animated glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-azure-500 to-teal-500 rounded-2xl blur-xl opacity-60"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.6, 0.8, 0.6]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* CTA Card - More compact */}
            <div className="relative bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-md border border-azure-500/40 rounded-2xl px-6 py-4 shadow-[0_0_40px_rgba(56,189,248,0.3)]">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <h3 className="text-white font-bold text-base mb-1">
                    Impressed by what you see?
                  </h3>
                  <p className="text-slate-400 text-xs">
                    Let's discuss your Azure infrastructure
                  </p>
                </div>
                
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-azure-500 to-teal-500 text-white px-5 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:shadow-[0_0_30px_rgba(56,189,248,0.6)] transition-all"
                  onClick={handleClose}
                >
                  Get In Touch
                </motion.a>
              </div>
              
              <button
                onClick={handleClose}
                className="absolute -top-2 -right-2 w-6 h-6 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-all group/btn"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingCTA;
