import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin } from 'lucide-react';

const OpenToWorkBadge: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="fixed top-24 right-8 z-40 hidden lg:block"
    >
      <motion.div
        whileHover={{ scale: 1.05, rotate: 2 }}
        className="relative group cursor-pointer"
      >
        {/* Pulsing glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-green-500/30 to-emerald-500/30 rounded-xl blur-lg"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Badge content */}
        <div className="relative bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-md border border-green-500/40 rounded-xl px-5 py-3 shadow-[0_0_25px_rgba(34,197,94,0.2)]">
          <div className="flex items-center gap-3">
            {/* Pulsing dot */}
            <div className="relative">
              <motion.div
                className="w-3 h-3 bg-green-500 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.8, 1]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity
                }}
              />
              <motion.div
                className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full"
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.6, 0, 0.6]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity
                }}
              />
            </div>
            
            <div>
              <div className="flex items-center gap-2 text-green-400 font-semibold text-sm">
                <Briefcase className="w-4 h-4" />
                <span>Open to Work</span>
              </div>
              <div className="flex items-center gap-1 text-slate-400 text-xs mt-0.5">
                <MapPin className="w-3 h-3" />
                <span>UK Remote/Hybrid</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OpenToWorkBadge;
