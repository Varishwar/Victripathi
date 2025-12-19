import React from 'react';
import { motion } from 'framer-motion';

const ConnectorLines: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 9 }}>
      <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(56,189,248,0)" />
            <stop offset="50%" stopColor="rgba(56,189,248,0.6)" />
            <stop offset="100%" stopColor="rgba(56,189,248,0)" />
          </linearGradient>
          <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(168,85,247,0)" />
            <stop offset="50%" stopColor="rgba(168,85,247,0.6)" />
            <stop offset="100%" stopColor="rgba(168,85,247,0)" />
          </linearGradient>
        </defs>

        {/* four cross lines using percentages so they stay responsive */}
        <motion.line x1="50%" y1="50%" x2="88%" y2="18%" stroke="url(#g1)" strokeWidth={0.6} strokeLinecap="round"
          strokeDasharray="6 6"
          animate={{ strokeDashoffset: [0, -48] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
          style={{ opacity: 0.9 }}
        />

        <motion.line x1="50%" y1="50%" x2="12%" y2="15%" stroke="url(#g2)" strokeWidth={0.5} strokeLinecap="round"
          strokeDasharray="6 6"
          animate={{ strokeDashoffset: [0, -48] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'linear', delay: 0.4 }}
          style={{ opacity: 0.75 }}
        />

        <motion.line x1="50%" y1="50%" x2="15%" y2="85%" stroke="url(#g1)" strokeWidth={0.5} strokeLinecap="round"
          strokeDasharray="6 6"
          animate={{ strokeDashoffset: [0, -48] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'linear', delay: 0.9 }}
          style={{ opacity: 0.75 }}
        />

        <motion.line x1="50%" y1="50%" x2="90%" y2="88%" stroke="url(#g2)" strokeWidth={0.6} strokeLinecap="round"
          strokeDasharray="6 6"
          animate={{ strokeDashoffset: [0, -48] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'linear', delay: 1.1 }}
          style={{ opacity: 0.85 }}
        />
      </svg>
    </div>
  );
};

export default ConnectorLines;
