import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { ProfileData } from '../types';

interface CertsProps {
  certs: ProfileData['certifications'];
}

const Certifications: React.FC<CertsProps> = ({ certs }) => {
  return (
    <section id="certifications" className="py-20 px-6 relative z-10">
      <div className="container mx-auto">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
        >
             <h2 className="text-3xl font-bold text-white mb-4">Microsoft Certifications</h2>
             <div className="h-1 w-20 bg-azure-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6">
            {certs.map((cert, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20, rotateY: -15 }}
                    whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      y: -12, 
                      rotateY: 5,
                      scale: 1.05,
                      z: 50
                    }}
                    transition={{ 
                      delay: idx * 0.1,
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }}
                    className="relative group w-64 preserve-3d"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-azure-500 to-teal-500 rounded-xl blur-lg opacity-20 group-hover:opacity-50 group-hover:blur-xl transition-all duration-500 animate-glow-pulse"></div>
                    <div className="relative bg-gradient-to-br from-slate-900/70 via-slate-900/60 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 p-6 rounded-xl h-full flex flex-col items-center text-center hover:border-azure-400/60 transition-all duration-300 shimmer overflow-hidden">
                        {/* Rotating background gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-azure-500/0 via-teal-500/5 to-azure-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div className={`relative z-10 p-3 rounded-full ${cert.badgeColor} bg-opacity-20 mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.5)]`}>
                            <Award className={`w-8 h-8 ${cert.badgeColor.replace('bg-', 'text-')} group-hover:animate-bounce-slow`} />
                        </div>
                        <h3 className="relative z-10 text-white font-semibold mb-2 group-hover:text-azure-200 transition-colors group-hover:drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]">{cert.name}</h3>
                        <span className="text-xs font-mono text-slate-400 px-2 py-1 bg-slate-900/80 rounded uppercase tracking-wider border border-slate-700">
                            {cert.level}
                        </span>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;