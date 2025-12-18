import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';
import { ProfileData } from '../types';

interface ExperienceProps {
  jobs: ProfileData['experience'];
}

const Experience: React.FC<ExperienceProps> = ({ jobs }) => {
  return (
    <section id="experience" className="py-20 px-6 relative z-10 bg-slate-900/20">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-2 flex items-center">
            <span className="w-8 h-1 bg-azure-500 mr-4"></span>
            Professional Journey
          </h2>
        </motion.div>

        <div className="relative border-l-2 border-slate-800 ml-4 md:ml-12 space-y-12">
          {jobs.map((job, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative pl-8 md:pl-12 group"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-900 border-2 border-azure-500 shadow-[0_0_10px_rgba(56,189,248,0.5)] group-hover:scale-125 transition-transform duration-300"></div>

              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2 group-hover:text-azure-300 transition-colors">
                    {job.role}
                  </h3>
                  <div className="text-azure-400 font-medium flex items-center gap-2 mt-1">
                    <Briefcase size={14} />
                    {job.company}
                  </div>
                </div>
                <div className="flex items-center text-slate-500 text-sm mt-2 md:mt-0 font-mono">
                  <Calendar size={14} className="mr-2" />
                  {job.period}
                </div>
              </div>

              <div className="mt-4 bg-slate-900/30 backdrop-blur-sm p-6 rounded-lg border border-slate-800 hover:bg-slate-800/50 hover:border-azure-500/30 transition-all duration-300">
                <ul className="space-y-2">
                  {job.details.map((detail, dIdx) => (
                    <li key={dIdx} className="text-slate-300 text-sm leading-relaxed flex items-start">
                      <span className="mr-2 text-azure-500 mt-1.5">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;