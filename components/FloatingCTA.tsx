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
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 hidden md:block"
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
            
            {/* CTA Card */}
            <div className="relative bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-md border border-azure-500/40 rounded-2xl px-8 py-5 shadow-[0_0_40px_rgba(56,189,248,0.3)] flex items-center gap-6">
              <div>
                <h3 className="text-white font-bold text-lg mb-1">
                  Impressed by what you see?
                </h3>
                <p className="text-slate-400 text-sm">
                  Let's discuss how I can help transform your Azure infrastructure
                </p>
              </div>
              
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-azure-500 to-teal-500 text-white px-6 py-3 rounded-xl font-semibold whitespace-nowrap shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:shadow-[0_0_30px_rgba(56,189,248,0.6)] transition-all"
                onClick={handleClose}
              >
                Get In Touch
              </motion.a>
              
              <button
                onClick={handleClose}
                className="absolute -top-3 -right-3 w-8 h-8 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-all group/btn"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingCTA;
