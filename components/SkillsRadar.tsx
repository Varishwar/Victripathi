import React from 'react';
import { motion } from 'framer-motion';

interface SkillRadarProps {
  skills: Array<{ name: string; level: number }>;
}

const SkillsRadar: React.FC<SkillRadarProps> = ({ skills }) => {
  const centerX = 200;
  const centerY = 200;
  const maxRadius = 150;
  const levels = 5;

  // Calculate points for the skill polygon
  const getPoint = (index: number, level: number) => {
    const angle = (Math.PI * 2 * index) / skills.length - Math.PI / 2;
    const radius = (maxRadius * level) / 100;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    };
  };

  const polygonPoints = skills
    .map((skill, i) => {
      const point = getPoint(i, skill.level);
      return `${point.x},${point.y}`;
    })
    .join(' ');

  return (
    <section className="py-20 px-6 relative z-10">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-3">Skills Proficiency</h2>
          <p className="text-slate-400">Visual representation of my technical expertise</p>
        </motion.div>

        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <svg width="400" height="400" className="filter drop-shadow-[0_0_30px_rgba(56,189,248,0.3)]">
              {/* Background circles */}
              {[...Array(levels)].map((_, i) => {
                const radius = (maxRadius * (i + 1)) / levels;
                return (
                  <circle
                    key={i}
                    cx={centerX}
                    cy={centerY}
                    r={radius}
                    fill="none"
                    stroke="rgba(71, 85, 105, 0.3)"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Axes */}
              {skills.map((_, i) => {
                const point = getPoint(i, 100);
                return (
                  <line
                    key={i}
                    x1={centerX}
                    y1={centerY}
                    x2={point.x}
                    y2={point.y}
                    stroke="rgba(71, 85, 105, 0.3)"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Skill polygon */}
              <motion.polygon
                points={polygonPoints}
                fill="rgba(56, 189, 248, 0.2)"
                stroke="rgba(56, 189, 248, 0.8)"
                strokeWidth="2"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              />

              {/* Skill points */}
              {skills.map((skill, i) => {
                const point = getPoint(i, skill.level);
                return (
                  <g key={i}>
                    <motion.circle
                      cx={point.x}
                      cy={point.y}
                      r="6"
                      fill="#38bdf8"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                      className="cursor-pointer"
                    />
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r="8"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="2"
                      opacity="0.5"
                      className="animate-ping"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  </g>
                );
              })}

              {/* Labels */}
              {skills.map((skill, i) => {
                const labelPoint = getPoint(i, 110);
                const angle = (Math.PI * 2 * i) / skills.length - Math.PI / 2;
                const textAnchor = 
                  Math.abs(angle) < Math.PI / 4 ? 'start' :
                  Math.abs(angle) > (3 * Math.PI) / 4 ? 'end' : 'middle';
                
                return (
                  <text
                    key={i}
                    x={labelPoint.x}
                    y={labelPoint.y}
                    textAnchor={textAnchor}
                    fill="#e2e8f0"
                    fontSize="13"
                    fontWeight="600"
                    className="pointer-events-none"
                  >
                    {skill.name}
                  </text>
                );
              })}
            </svg>
          </motion.div>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-8 mt-8">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-azure-500 rounded"></div>
            <span className="text-slate-400 text-sm">Expert (90-100%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-azure-500/60 rounded"></div>
            <span className="text-slate-400 text-sm">Advanced (70-90%)</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsRadar;
