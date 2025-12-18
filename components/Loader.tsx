import React from 'react';
import { motion } from 'framer-motion';

const Loader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center text-azure-400"
    >
      <div className="relative w-24 h-24 mb-8">
        {/* Animated Initials VT */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-4xl font-mono font-bold border border-azure-500/30"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
        >
          VT
        </motion.div>
        
        {/* Scanning line */}
        <motion.div 
            className="absolute top-0 left-0 w-full h-1 bg-azure-400 shadow-[0_0_15px_rgba(56,189,248,0.8)]"
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 2, ease: "linear", repeat: Infinity }}
        />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-mono text-sm tracking-widest text-azure-200"
      >
        INITIALIZING AZURE ENVIRONMENT...
      </motion.p>
    </motion.div>
  );
};

export default Loader;