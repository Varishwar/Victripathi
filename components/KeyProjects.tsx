import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Network, CloudUpload, Shield, ExternalLink, CheckCircle } from 'lucide-react';
import { KeyProject } from '../types';

interface KeyProjectsProps {
  projects: KeyProject[];
}

const iconMap = {
  Monitor,
  Network,
  CloudUpload,
  Shield
};

const KeyProjects: React.FC<KeyProjectsProps> = ({ projects }) => {
  return (
    <section id="key-projects" className="py-24 px-6 relative z-10 bg-gradient-to-b from-slate-900/30 to-slate-950">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-azure-500/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-azure-400 via-teal-400 to-cyan-400 animate-gradient-x bg-[length:200%_200%]">
              Key Projects
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Enterprise-scale Azure deployments delivering measurable business impact
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-azure-500 to-teal-500 mx-auto mt-6 rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, idx) => {
            const IconComponent = iconMap[project.icon as keyof typeof iconMap];
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30, rotateX: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: idx * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  rotateY: 2
                }}
                className="relative group preserve-3d"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-azure-500/20 to-teal-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 animate-glow-pulse"></div>
                
                {/* Card content */}
                <div className="relative bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-900/40 backdrop-blur-md border border-slate-700/50 rounded-2xl p-8 h-full hover:border-azure-500/60 transition-all duration-500 overflow-hidden shimmer">
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-azure-500/0 to-teal-500/0 group-hover:from-azure-500/10 group-hover:to-teal-500/10 transition-all duration-700"></div>
                  
                  <div className="relative z-10">
                    {/* Icon and Title */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-gradient-to-br from-azure-500/20 to-teal-500/20 rounded-xl border border-azure-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(56,189,248,0.4)]">
                        {IconComponent && <IconComponent className="w-7 h-7 text-azure-400" />}
                      </div>
                      <ExternalLink className="w-5 h-5 text-slate-500 group-hover:text-azure-400 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-azure-300 transition-colors group-hover:drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]">
                      {project.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-azure-400 font-medium text-sm">{project.client}</span>
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed mb-6">
                      {project.scope}
                    </p>

                    {/* Technologies */}
                    <div className="mb-6">
                      <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, tIdx) => (
                          <motion.span
                            key={tIdx}
                            whileHover={{ 
                              scale: 1.1,
                              backgroundColor: "rgba(56, 189, 248, 0.25)",
                              boxShadow: "0 0 15px rgba(56, 189, 248, 0.4)"
                            }}
                            className="px-3 py-1 bg-slate-900/80 text-slate-300 text-xs rounded-lg border border-slate-700/50 hover:text-white hover:border-azure-400/60 transition-all duration-300"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-3">
                      {project.metrics.map((metric, mIdx) => (
                        <div 
                          key={mIdx}
                          className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-slate-800/60 to-slate-800/30 rounded-lg border border-slate-700/30 group-hover:border-teal-500/40 transition-all duration-300"
                        >
                          <CheckCircle className="w-4 h-4 text-teal-400 flex-shrink-0" />
                          <span className="text-slate-200 text-xs font-medium">{metric}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default KeyProjects;
