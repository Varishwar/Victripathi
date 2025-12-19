import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Eye, MapPin } from 'lucide-react';

const LiveStats: React.FC = () => {
  const [visitors, setVisitors] = useState(1247);
  const [views, setViews] = useState(3821);

  useEffect(() => {
    // Simulate live visitor count updates
    const interval = setInterval(() => {
      setVisitors(prev => prev + Math.floor(Math.random() * 3));
      setViews(prev => prev + Math.floor(Math.random() * 5));
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const stats = [
    { 
      icon: Users, 
      value: visitors.toLocaleString(), 
      label: 'Total Visitors',
      color: 'from-azure-500 to-cyan-500'
    },
    { 
      icon: Eye, 
      value: views.toLocaleString(), 
      label: 'Page Views',
      color: 'from-teal-500 to-emerald-500'
    },
    { 
      icon: MapPin, 
      value: '15+', 
      label: 'Countries',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <div className="fixed bottom-8 left-8 z-40 hidden xl:block">
      <div className="flex flex-col gap-3">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.2 + 1 }}
            className="relative group"
          >
            {/* Glow */}
            <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-lg blur-md opacity-20 group-hover:opacity-40 transition-all duration-300`} />
            
            {/* Card */}
            <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-md border border-slate-700/50 rounded-lg px-4 py-3 min-w-[160px] hover:border-azure-500/50 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color} bg-opacity-20`}>
                  <stat.icon className={`w-4 h-4 text-transparent bg-clip-text bg-gradient-to-br ${stat.color}`} style={{WebkitTextFillColor: 'transparent'}} />
                </div>
                <div>
                  <div className="text-white font-bold text-sm">{stat.value}</div>
                  <div className="text-slate-400 text-xs">{stat.label}</div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LiveStats;
