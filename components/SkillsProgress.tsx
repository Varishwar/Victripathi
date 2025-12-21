import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface Skill {
  name: string;
  level: number; // 0-100
  color: string;
}

const SkillsProgress: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const skills: Skill[] = [
    { name: 'Azure Infrastructure', level: 95, color: 'from-azure-500 to-azure-600' },
    { name: 'Azure Virtual Desktop (AVD)', level: 92, color: 'from-teal-500 to-teal-600' },
    { name: 'Azure DevOps & CI/CD', level: 88, color: 'from-cyan-500 to-cyan-600' },
    { name: 'Microsoft 365 & Intune', level: 90, color: 'from-indigo-500 to-indigo-600' },
    { name: 'PowerShell & Automation', level: 87, color: 'from-purple-500 to-purple-600' },
    { name: 'Azure Security & Compliance', level: 85, color: 'from-pink-500 to-pink-600' },
  ];

  return (
    <section ref={ref} className="py-20 px-6 relative z-10">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Skill Proficiency
          </h2>
          <p className="text-slate-400 text-lg">
            Expertise across Azure and Microsoft technologies
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {skills.map((skill, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: idx * 0.1, type: 'spring', stiffness: 100 }}
              className="group"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-medium text-lg">{skill.name}</span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: idx * 0.1 + 0.5 }}
                  className="text-azure-400 font-bold text-lg"
                >
                  {skill.level}%
                </motion.span>
              </div>
              
              {/* Progress Bar Container */}
              <div className="relative h-3 bg-slate-800/60 rounded-full overflow-hidden border border-slate-700/50 group-hover:border-azure-500/50 transition-all duration-300">
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Animated Progress */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : {}}
                  transition={{
                    delay: idx * 0.1 + 0.3,
                    duration: 1,
                    ease: 'easeOut',
                  }}
                  className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative overflow-hidden shadow-lg`}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                      ease: 'linear',
                    }}
                  />
                  
                  {/* Glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} blur-md opacity-50`}></div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsProgress;
