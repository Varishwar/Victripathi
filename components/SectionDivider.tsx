import React from 'react';
import { motion } from 'framer-motion';

interface SectionDividerProps {
  gradient?: string;
}

const SectionDivider: React.FC<SectionDividerProps> = ({ 
  gradient = "from-azure-500 via-teal-500 to-cyan-500" 
}) => {
  return (
    <div className="relative py-12 overflow-hidden">
      {/* Animated particles */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 bg-gradient-to-r ${gradient} rounded-full`}
            animate={{
              x: ['-50vw', '50vw'],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Main divider line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative"
      >
        <div className={`h-px bg-gradient-to-r ${gradient} opacity-30`} />
        
        {/* Center glow */}
        <motion.div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-8 bg-gradient-to-r ${gradient} blur-xl opacity-50`}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
      
      {/* Decorative dots */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-2">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${gradient}`}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionDivider;
