import React from 'react';
import { motion } from 'framer-motion';

const TechStack: React.FC = () => {
  const technologies = [
    { name: 'Microsoft Azure', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg', color: '#0089D6' },
    { name: 'Terraform', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg', color: '#7B42BC' },
    { name: 'PowerShell', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/powershell/powershell-original.svg', color: '#5391FE' },
    { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', color: '#3776AB' },
    { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', color: '#F05032' },
    { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', color: '#2496ED' },
    { name: 'Kubernetes', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg', color: '#326CE5' },
    { name: 'Linux', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg', color: '#FCC624' },
    { name: 'Windows', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg', color: '#0078D6' },
    { name: 'GitHub', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', color: '#181717' },
    { name: 'VS Code', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', color: '#007ACC' },
    { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', color: '#61DAFB' }
  ];

  return (
    <section className="py-16 px-6 relative z-10">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-3">Technology Stack</h2>
          <p className="text-slate-400">Tools & Platforms I Work With Daily</p>
        </motion.div>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {technologies.map((tech, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ 
                scale: 1.15, 
                y: -10,
                rotate: [0, -5, 5, 0]
              }}
              className="relative group cursor-pointer"
            >
              {/* Glow effect */}
              <div 
                className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-all duration-500"
                style={{ backgroundColor: tech.color }}
              />
              
              {/* Card */}
              <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:border-azure-500/50 transition-all duration-300 h-32">
                <img 
                  src={tech.logo} 
                  alt={tech.name}
                  className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <span className="text-slate-300 text-xs font-medium text-center group-hover:text-white transition-colors">
                  {tech.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
