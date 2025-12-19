import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { Users, CloudUpload, Award, TrendingUp, DollarSign, Briefcase } from 'lucide-react';
import { ImpactMetric } from '../types';

interface ImpactMetricsProps {
  metrics: ImpactMetric[];
}

const iconMap = {
  Users,
  CloudUpload,
  Award,
  TrendingUp,
  DollarSign,
  Briefcase
};

const AnimatedCounter: React.FC<{ value: string; inView: boolean }> = ({ value, inView }) => {
  const [displayValue, setDisplayValue] = useState('0');
  
  useEffect(() => {
    if (!inView) return;
    
    // Extract numeric part and suffix
    const match = value.match(/^(\d+\.?\d*)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }
    
    const numericValue = parseFloat(match[1]);
    const suffix = match[2];
    
    let currentValue = 0;
    const increment = numericValue / 60; // Animate over ~1 second at 60fps
    const interval = setInterval(() => {
      currentValue += increment;
      if (currentValue >= numericValue) {
        setDisplayValue(value);
        clearInterval(interval);
      } else {
        setDisplayValue(`${Math.floor(currentValue)}${suffix}`);
      }
    }, 16);
    
    return () => clearInterval(interval);
  }, [inView, value]);
  
  return <span>{displayValue}</span>;
};

const ImpactMetrics: React.FC<ImpactMetricsProps> = ({ metrics }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  return (
    <section ref={ref} className="py-20 px-6 relative z-10 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950"></div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-azure-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Impact & Achievements
          </h2>
          <p className="text-slate-400 text-lg">
            Delivering measurable results across enterprise Azure deployments
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric, idx) => {
            const IconComponent = iconMap[metric.icon as keyof typeof iconMap];
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: idx * 0.1,
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  rotateY: 5
                }}
                className="relative group preserve-3d"
              >
                {/* Animated glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-500 animate-glow-pulse`}></div>
                
                {/* Card */}
                <div className="relative bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-slate-900/50 backdrop-blur-md border border-slate-700/50 rounded-2xl p-8 text-center hover:border-azure-500/50 transition-all duration-500 overflow-hidden">
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shine"></div>
                  </div>
                  
                  <div className="relative z-10">
                    {/* Icon with pulsing background */}
                    <div className="relative mx-auto w-16 h-16 mb-6">
                      <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} rounded-xl opacity-20 group-hover:opacity-30 animate-pulse`}></div>
                      <div className={`relative flex items-center justify-center w-full h-full bg-gradient-to-br ${metric.color} bg-opacity-10 rounded-xl border border-slate-700/30 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                        {IconComponent && (
                          <IconComponent className={`w-8 h-8 text-transparent bg-clip-text bg-gradient-to-br ${metric.color}`} style={{WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text'}} />
                        )}
                      </div>
                    </div>

                    {/* Counter */}
                    <div className={`text-4xl md:text-5xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-br ${metric.color} drop-shadow-[0_0_15px_rgba(56,189,248,0.3)] group-hover:drop-shadow-[0_0_25px_rgba(56,189,248,0.5)] transition-all duration-300`}>
                      <AnimatedCounter value={metric.value} inView={isInView} />
                    </div>

                    {/* Label */}
                    <p className="text-slate-300 font-medium text-sm group-hover:text-white transition-colors">
                      {metric.label}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-16 h-1 bg-gradient-to-r from-transparent via-azure-500 to-transparent rounded-full"
        />
      </div>
    </section>
  );
};

export default ImpactMetrics;
