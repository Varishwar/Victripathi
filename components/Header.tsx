import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Globe, ShieldCheck } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-40 px-6 py-6 flex items-center justify-between bg-gradient-to-b from-slate-950/80 to-transparent pointer-events-none"
    >
      {/* Left: Signature */}
      <div className="pointer-events-auto">
        <h1 className="font-mono text-2xl font-bold tracking-tighter text-white">
          VT<span className="text-azure-400 text-3xl">.</span>
        </h1>
      </div>

      {/* Right: Animated Visualizations */}
      <div className="flex items-center space-x-6 pointer-events-auto">
        
        {/* Viz 1: Cloud Status */}
        <div className="hidden md:flex flex-col items-center gap-1 group cursor-default">
           <div className="relative w-8 h-8 flex items-center justify-center">
              <motion.div 
                 className="absolute inset-0 border border-dashed border-azure-500/50 rounded-full"
                 animate={{ rotate: 360 }}
                 transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              <Cloud className="w-4 h-4 text-azure-300" />
           </div>
           <span className="text-[10px] font-mono text-azure-500/80 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Cloud</span>
        </div>

        {/* Viz 2: Global Network */}
        <div className="hidden md:flex flex-col items-center gap-1 group cursor-default">
           <div className="relative w-8 h-8 flex items-center justify-center">
              <motion.div 
                 className="absolute w-full h-full border-t border-b border-teal-500/50 rounded-full"
                 animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                 transition={{ duration: 3, repeat: Infinity }}
              />
              <Globe className="w-4 h-4 text-teal-300" />
           </div>
           <span className="text-[10px] font-mono text-teal-500/80 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Net</span>
        </div>

        {/* Viz 3: Security Shield */}
        <div className="hidden md:flex flex-col items-center gap-1 group cursor-default">
           <div className="relative w-8 h-8 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-purple-300 relative z-10" />
              <motion.div 
                 className="absolute inset-0 bg-purple-500/20 rounded-full blur-sm"
                 animate={{ opacity: [0.2, 0.6, 0.2] }}
                 transition={{ duration: 2, repeat: Infinity }}
              />
           </div>
           <span className="text-[10px] font-mono text-purple-500/80 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Sec</span>
        </div>

      </div>
    </motion.header>
  );
};

export default Header;