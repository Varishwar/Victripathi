import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Mail, MapPin, Linkedin, Server, Database, Shield, Smartphone } from 'lucide-react';
import { ProfileData } from '../types';

interface HeroProps {
  data: ProfileData;
}

const Hero: React.FC<HeroProps> = ({ data }) => {
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
            <span className="inline-block px-3 py-1 mb-4 text-xs font-mono font-semibold tracking-wider text-azure-950 bg-azure-400 rounded-full shadow-[0_0_15px_rgba(56,189,248,0.4)]">
              AZURE INFRASTRUCTURE LEAD
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-2 drop-shadow-2xl">
              Varishwar <span className="text-transparent bg-clip-text bg-gradient-to-r from-azure-400 via-teal-400 to-cyan-400 animate-gradient-x bg-[length:200%_200%]">Tripathi</span>
            </h1>
            <h2 className="text-xl md:text-2xl text-slate-400 font-light font-mono">
              {data.title}
            </h2>
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
        </div>

        {/* Right: Visual Abstract - Virtualization & Infrastructure Animations */}
        <div className="lg:col-span-5 hidden lg:flex items-center justify-center relative min-h-[500px]">
           
           {/* Background Rings */}
           <motion.div 
             className="absolute inset-0 m-auto w-[28rem] h-[28rem] border border-slate-800 rounded-full"
             animate={{ rotate: 360 }}
             transition={{ duration: 60, ease: "linear", repeat: Infinity }}
           />
           <motion.div 
             className="absolute inset-0 m-auto w-[22rem] h-[22rem] border border-dashed border-slate-800/50 rounded-full"
             animate={{ rotate: -360 }}
             transition={{ duration: 40, ease: "linear", repeat: Infinity }}
           />

           {/* 1. Virtualization / Host Pool (Top Right) */}
           <div className="absolute top-4 right-12">
              <div className="relative w-32 h-32 transform hover:scale-105 transition-transform cursor-default">
                 <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md border border-azure-500/30 rounded-lg flex items-center justify-center z-10 shadow-[0_0_20px_rgba(56,189,248,0.1)]">
                    <Server className="text-azure-400 w-8 h-8" />
                 </div>
                 {[...Array(4)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-8 h-8 bg-slate-800 border border-azure-400/50 rounded flex items-center justify-center"
                        animate={{ 
                            x: [0, (i % 2 === 0 ? 45 : -45), 0],
                            y: [0, (i < 2 ? -45 : 45), 0],
                            opacity: [0, 1, 0]
                        }}
                        transition={{ 
                            duration: 4, 
                            repeat: Infinity, 
                            delay: i * 0.5,
                            ease: "easeInOut"
                        }}
                    >
                        <div className="w-1.5 h-1.5 bg-azure-400 rounded-sm"></div>
                    </motion.div>
                 ))}
                 <div className="absolute -bottom-8 left-0 right-0 text-center text-xs font-mono text-azure-300 bg-slate-950/50 py-1 rounded">Host Pools</div>
              </div>
           </div>

           {/* 2. Cloud Sync (Bottom Left) */}
           <div className="absolute bottom-12 left-8">
              <div className="relative w-28 h-28 flex items-center justify-center transform hover:scale-105 transition-transform cursor-default">
                 <div className="absolute w-full h-full border-2 border-teal-500/20 rounded-full animate-ping-slow"></div>
                 <div className="z-10 bg-slate-900/80 backdrop-blur-md p-4 rounded-full border border-teal-500/30">
                    <Database className="text-teal-400 w-8 h-8" />
                 </div>
                 <motion.div 
                    className="absolute w-full h-full border-t-2 border-teal-400 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                 />
                 <div className="absolute -bottom-8 left-0 right-0 text-center text-xs font-mono text-teal-300 bg-slate-950/50 py-1 rounded">Hybrid Sync</div>
              </div>
           </div>

           {/* 3. Zero Trust (Top Left) */}
           <div className="absolute top-12 left-6">
               <div className="relative w-28 h-28 transform hover:scale-105 transition-transform cursor-default">
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                        <Shield className="w-12 h-12 text-purple-400" />
                    </div>
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent rounded-full origin-bottom"
                        style={{ clipPath: 'polygon(50% 50%, 0 0, 100% 0)' }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div 
                        className="absolute inset-0 border border-purple-500/30 rounded-full"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="absolute -bottom-8 left-0 right-0 text-center text-xs font-mono text-purple-300 bg-slate-950/50 py-1 rounded">Zero Trust</div>
               </div>
           </div>

           {/* 4. Intune / Endpoint Manager (Bottom Right) */}
           <div className="absolute bottom-4 right-8">
              <div className="relative w-24 h-36 transform hover:scale-105 transition-transform cursor-default">
                 <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md border border-pink-500/30 rounded-xl flex items-center justify-center z-10 overflow-hidden">
                    <Smartphone className="text-pink-400 w-10 h-10" />
                    {/* Scanning Line */}
                    <motion.div 
                        className="absolute top-0 left-0 w-full h-1 bg-pink-400 shadow-[0_0_10px_rgba(236,72,153,0.8)]"
                        animate={{ top: ['0%', '100%', '0%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                 </div>
                 <div className="absolute -bottom-8 left-0 right-0 text-center text-xs font-mono text-pink-300 bg-slate-950/50 py-1 rounded">Intune MDM</div>
              </div>
           </div>

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