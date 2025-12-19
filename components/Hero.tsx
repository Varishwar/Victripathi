import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Mail, MapPin, Linkedin, Server, Database, Shield, Smartphone, Download } from 'lucide-react';
import NetworkGraph from './NetworkGraph';
import ConnectorLines from './ConnectorLines';
import { ProfileData } from '../types';

interface HeroProps {
  data: ProfileData;
}

const Hero: React.FC<HeroProps> = ({ data }) => {
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const Typing: React.FC<{ text: string; speed?: number }> = ({ text, speed = 40 }) => {
    const [typed, setTyped] = useState('');
    useEffect(() => {
      if (prefersReduced) { setTyped(text); return; }
      let i = 0;
      let mounted = true;
      const tick = () => {
        if (!mounted) return;
        setTyped(text.slice(0, ++i));
        if (i < text.length) setTimeout(tick, speed + Math.random() * 40);
      };
      const start = setTimeout(tick, 400);
      return () => { mounted = false; clearTimeout(start); };
    }, [text, speed]);
    return <span className="font-mono text-lg md:text-xl text-azure-200">{typed}</span>;
  };

  const CountUp: React.FC<{ value: string; duration?: number }> = ({ value, duration = 1200 }) => {
    const [display, setDisplay] = useState(value);
    const raf = useRef<number | null>(null);

    useEffect(() => {
      if (prefersReduced) { setDisplay(value); return; }
      const match = value.match(/(\d+[\d,]*)/);
      if (!match) { setDisplay(value); return; }
      const num = parseInt(match[1].replace(/,/g, ''), 10);
      const suffix = value.replace(match[1], '');
      const start = performance.now();
      const step = (ts: number) => {
        const t = Math.min(1, (ts - start) / duration);
        const cur = Math.floor(t * num);
        setDisplay(cur.toLocaleString() + suffix);
        if (t < 1) raf.current = requestAnimationFrame(step);
      };
      raf.current = requestAnimationFrame(step);
      return () => { if (raf.current) cancelAnimationFrame(raf.current); };
    }, [value, duration]);

    return <span className="text-2xl md:text-3xl font-bold text-white">{display}</span>;
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-azure-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 z-10">
        
        {/* Left: Text Content */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span className="inline-block px-3 py-1 mb-4 text-xs font-mono font-semibold tracking-wider text-azure-950 bg-azure-400 rounded-full shadow-[0_0_15px_rgba(56,189,248,0.4)] animate-bounce-slow">
              AZURE INFRASTRUCTURE LEAD
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-2 drop-shadow-2xl">
              Varishwar <span className="text-transparent bg-clip-text bg-gradient-to-r from-azure-400 via-teal-400 to-cyan-400 animate-gradient-x bg-[length:200%_200%] drop-shadow-[0_0_30px_rgba(56,189,248,0.5)]">Tripathi</span>
            </h1>
            <motion.h2 
              className="text-xl md:text-2xl text-slate-400 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Typing text={data.title} />
            </motion.h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-slate-300 leading-relaxed max-w-2xl text-lg"
          >
            {data.summary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap gap-4 pt-4"
          >
             <div className="flex items-center space-x-2 text-sm text-azure-300">
                <Mail size={16} />
                <span>{data.contact.email}</span>
             </div>
             <div className="flex items-center space-x-2 text-sm text-azure-300">
                <MapPin size={16} />
                <span>{data.contact.location}</span>
             </div>
             {data.contact.linkedin && (
                 <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-sm text-azure-300 hover:text-white transition-colors">
                    <Linkedin size={16} />
                    <span>LinkedIn Profile</span>
                 </a>
             )}
          </motion.div>

            {/* Quick Impact Counters */}
            {data.impactMetrics && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.05 }}
                className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-md"
              >
                {data.impactMetrics.slice(0,6).map((m, idx) => (
                  <div key={idx} className="bg-slate-900/60 border border-slate-700/40 rounded-xl p-3 flex flex-col items-start gap-1">
                    <CountUp value={m.value} />
                    <div className="text-xs text-slate-400">{m.label}</div>
                  </div>
                ))}
              </motion.div>
            )}

          {/* Resume Download Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="pt-6"
          >
            <motion.a 
              href="https://drive.google.com/uc?export=download&id=1XRdV7Mo7YSc3Cu7NxoRVu-v5vBHzEcqa"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white rounded-xl transition-all duration-300 shadow-[0_0_25px_rgba(20,184,166,0.4)] hover:shadow-[0_0_40px_rgba(20,184,166,0.6)] relative overflow-hidden"
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                  x: ['-200%', '200%']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 1
                }}
              />
              <Download className="w-5 h-5 relative z-10 group-hover:animate-bounce" />
              <span className="font-semibold text-lg relative z-10">Download Resume</span>
            </motion.a>
          </motion.div>
        </div>

        {/* Right: Azure Architecture Ecosystem Visualization */}
        <div className="lg:col-span-5 hidden lg:flex items-center justify-center relative min-h-[500px]">
           
           {/* Central Azure Cloud Hub */}
           <motion.div 
             className="relative z-20 w-40 h-40 flex items-center justify-center"
             animate={{ 
               scale: [1, 1.05, 1],
               rotateY: [0, 360]
             }}
             transition={{ 
               scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
               rotateY: { duration: 20, repeat: Infinity, ease: "linear" }
             }}
           >
              <div className="absolute inset-0 bg-gradient-to-br from-azure-500/30 via-teal-500/30 to-cyan-500/30 rounded-2xl blur-xl animate-glow-pulse"></div>
              <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-md border-2 border-azure-500/50 rounded-2xl p-6 shadow-[0_0_40px_rgba(56,189,248,0.3)]">
                <div className="text-center">
                  <div className="text-azure-400 font-bold text-sm mb-1">AZURE</div>
                  <div className="text-white font-bold text-lg">CLOUD</div>
                  <div className="text-xs text-slate-400 mt-1">Infrastructure</div>
                </div>
              </div>
              {/* Rotating Data Rings */}
              <motion.div 
                className="absolute inset-0 w-full h-full border border-azure-500/30 rounded-2xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute inset-0 w-full h-full border border-dashed border-teal-500/20 rounded-2xl"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />
           </motion.div>

           {/* Connector animated dashed lines removed per request */}

           {/* Interactive 3D network graph layered above the connector lines */}
           <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
             <React.Suspense fallback={null}>
               <NetworkGraph />
             </React.Suspense>
           </div>

           {/* 1. AVD/Virtual Desktop (Top Right) */}
           <motion.div 
             className="absolute top-8 right-12"
             whileHover={{ scale: 1.1, rotate: 5 }}
             transition={{ type: "spring", stiffness: 300 }}
           >
              <div className="relative w-32 h-28 group cursor-pointer">
                 <div className="absolute inset-0 bg-gradient-to-br from-azure-500/20 to-cyan-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
                 <div className="relative bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-md border border-azure-500/40 rounded-xl p-4 flex flex-col items-center justify-center gap-2 shadow-[0_0_25px_rgba(56,189,248,0.2)] group-hover:shadow-[0_0_40px_rgba(56,189,248,0.4)] transition-all">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Server className="text-azure-400 w-8 h-8" />
                    </motion.div>
                    <div className="text-center">
                      <div className="text-azure-300 font-bold text-xs">Azure AVD</div>
                      <div className="text-slate-400 text-[10px]">5000+ Users</div>
                    </div>
                 </div>
              </div>
           </motion.div>

           {/* 2. Security & Compliance (Top Left) */}
           <motion.div 
             className="absolute top-12 left-8"
             whileHover={{ scale: 1.1, rotate: -5 }}
             transition={{ type: "spring", stiffness: 300 }}
           >
              <div className="relative w-28 h-28 group cursor-pointer">
                 <motion.div 
                   className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300"
                   animate={{ scale: [1, 1.2, 1] }}
                   transition={{ duration: 2, repeat: Infinity }}
                 />
                 <div className="relative bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-md border border-purple-500/40 rounded-full w-full h-full flex items-center justify-center shadow-[0_0_25px_rgba(168,85,247,0.2)] group-hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] transition-all">
                    <div className="text-center">
                      <Shield className="w-10 h-10 text-purple-400 mx-auto mb-1" />
                      <div className="text-purple-300 font-bold text-[10px]">Zero Trust</div>
                    </div>
                 </div>
                 {/* Security Scan Effect */}
                 <motion.div
                   className="absolute inset-0 border-2 border-purple-400/50 rounded-full"
                   animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
                   transition={{ duration: 2, repeat: Infinity }}
                 />
              </div>
           </motion.div>

           {/* 3. Terraform/IaC (Bottom Left) */}
           <motion.div 
             className="absolute bottom-16 left-6"
             whileHover={{ scale: 1.1, rotate: 5 }}
             transition={{ type: "spring", stiffness: 300 }}
           >
              <div className="relative w-32 h-28 group cursor-pointer">
                 <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-emerald-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
                 <div className="relative bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-md border border-teal-500/40 rounded-xl p-4 flex flex-col items-center justify-center gap-2 shadow-[0_0_25px_rgba(20,184,166,0.2)] group-hover:shadow-[0_0_40px_rgba(20,184,166,0.4)] transition-all">
                    <motion.div
                      animate={{ rotate: [0, 180, 360] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      <Database className="text-teal-400 w-8 h-8" />
                    </motion.div>
                    <div className="text-center">
                      <div className="text-teal-300 font-bold text-xs">Terraform</div>
                      <div className="text-slate-400 text-[10px]">IaC Expert</div>
                    </div>
                 </div>
                 {/* Code flow micro-dots removed for clarity */}
              </div>
           </motion.div>

           {/* 4. Endpoint Management (Bottom Right) */}
           <motion.div 
             className="absolute bottom-8 right-10"
             whileHover={{ scale: 1.1, rotate: -5 }}
             transition={{ type: "spring", stiffness: 300 }}
           >
              <div className="relative w-28 h-32 group cursor-pointer">
                 <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
                 <div className="relative bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-md border border-pink-500/40 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 shadow-[0_0_25px_rgba(236,72,153,0.2)] group-hover:shadow-[0_0_40px_rgba(236,72,153,0.4)] transition-all overflow-hidden">
                    <Smartphone className="text-pink-400 w-10 h-10 z-10" />
                    <div className="text-center z-10">
                      <div className="text-pink-300 font-bold text-xs">Intune MDM</div>
                      <div className="text-slate-400 text-[10px]">Autopilot</div>
                    </div>
                    {/* Scanning Animation */}
                    <motion.div 
                      className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent shadow-[0_0_15px_rgba(236,72,153,0.8)]"
                      animate={{ top: ['0%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                 </div>
              </div>
           </motion.div>

        </div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-azure-400"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ArrowDown size={24} />
      </motion.div>
    </section>
  );
};

export default Hero;