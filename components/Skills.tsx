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
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative bg-gradient-to-br from-slate-900/60 to-slate-900/30 backdrop-blur-md border border-slate-700/50 p-6 rounded-2xl hover:border-azure-500/60 transition-all duration-500 group shadow-xl hover:shadow-azure-500/20 hover:-translate-y-2 overflow-hidden"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-azure-500/0 to-teal-500/0 group-hover:from-azure-500/10 group-hover:to-teal-500/10 transition-all duration-500 rounded-2xl"></div>
              
              <div className="relative z-10">
                <h3 className="text-xl font-semibold text-azure-300 mb-4 group-hover:text-azure-200 transition-colors drop-shadow-lg">
                  {category.category}
                </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, sIdx) => (
                  <motion.span
                    key={sIdx}
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(56, 189, 248, 0.25)" }}
                    className="px-3 py-1.5 bg-slate-900/80 text-slate-300 text-sm rounded-lg border border-slate-700/50 cursor-default hover:text-white hover:border-azure-400/60 hover:shadow-lg hover:shadow-azure-500/30 transition-all duration-300"
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