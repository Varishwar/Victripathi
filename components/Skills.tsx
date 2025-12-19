import React from 'react';
import { motion } from 'framer-motion';
import { ProfileData } from '../types';

interface SkillsProps {
  skills: ProfileData['skills'];
}

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  return (
    <section id="skills" className="py-20 px-6 relative z-10">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-2 flex items-center">
            <span className="w-8 h-1 bg-azure-500 mr-4"></span>
            Technical Arsenal
          </h2>
          <p className="text-slate-400 ml-12">Expertise across the Azure Ecosystem</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.05, rotateY: 5, z: 50 }}
              className="relative bg-gradient-to-br from-slate-900/60 to-slate-900/30 backdrop-blur-md border border-slate-700/50 p-6 rounded-2xl hover:border-azure-500/60 transition-all duration-500 group shadow-xl hover:shadow-[0_0_40px_rgba(56,189,248,0.3)] overflow-hidden preserve-3d"
            >
              {/* Animated glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-azure-500/0 to-teal-500/0 group-hover:from-azure-500/20 group-hover:to-teal-500/20 transition-all duration-500 rounded-2xl animate-glow-pulse"></div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shine"></div>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-xl font-semibold text-azure-300 mb-4 group-hover:text-azure-100 transition-colors drop-shadow-lg group-hover:drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]">
                  {category.category}
                </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, sIdx) => (
                  <motion.span
                    key={sIdx}
                    whileHover={{ 
                      scale: 1.15, 
                      backgroundColor: "rgba(56, 189, 248, 0.3)",
                      boxShadow: "0 0 20px rgba(56, 189, 248, 0.5)"
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="px-3 py-1.5 bg-slate-900/80 text-slate-300 text-sm rounded-lg border border-slate-700/50 cursor-default hover:text-white hover:border-azure-400 transition-all duration-300 shimmer"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;