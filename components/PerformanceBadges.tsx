import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';

const clamp = (v: number, a = 0, b = 100) => Math.min(b, Math.max(a, v));

const PerformanceBadges: React.FC = () => {
  const [percent, setPercent] = useState(1);
  const [latency, setLatency] = useState(40);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const docH = document.documentElement.scrollHeight;
      const winH = window.innerHeight;
      const pct = docH - winH > 0 ? Math.round((scrollY / (docH - winH)) * 100) : 100;
      setPercent(clamp(Math.max(1, pct), 1, 100));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, []);

  useEffect(() => {
    let mounted = true;
    const tick = () => {
      if (!mounted) return;
      // random latency between 20 and 120 ms with occasional spike
      const base = 20 + Math.floor(Math.random() * 80);
      const spike = Math.random() < 0.05 ? 200 + Math.floor(Math.random() * 300) : 0;
      setLatency(base + spike);
      // next update in 1.5 - 4.5s
      const t = 1500 + Math.floor(Math.random() * 3000);
      timer = window.setTimeout(tick, t);
    };
    let timer = window.setTimeout(tick, 1000);
    return () => { mounted = false; clearTimeout(timer); };
  }, []);

  const radius = 18;
  const circ = 2 * Math.PI * radius;

  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          className="flex items-center gap-3"
        >
          {/* Circular Scroll Progress */}
          <div className="w-12 h-12 bg-slate-900/60 border border-slate-800/60 rounded-full flex items-center justify-center relative shadow-[0_10px_30px_rgba(2,6,23,0.6)]">
            <svg width="48" height="48" viewBox="0 0 48 48" className="absolute inset-0">
              <g transform="translate(24,24)">
                <circle r={radius} fill="transparent" stroke="rgba(255,255,255,0.03)" strokeWidth="4" />
                <motion.circle
                  r={radius}
                  fill="transparent"
                  stroke="#60a5fa"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={circ}
                  strokeDashoffset={circ * (1 - percent / 100)}
                  style={{ rotate: -90, transformOrigin: 'center' }}
                  transition={{ type: 'spring', stiffness: 140, damping: 18 }}
                />
              </g>
            </svg>
            <div className="relative z-10 text-xs text-azure-200 font-mono font-semibold">{percent}%</div>
          </div>

          {/* Latency Badge */}
          <div className="bg-slate-900/60 border border-slate-800/50 rounded-xl px-3 py-2 flex items-center gap-2 shadow-md backdrop-blur-sm">
            <div className="p-2 bg-gradient-to-br from-amber-400/10 to-rose-400/8 rounded-md">
              <Zap className="w-4 h-4 text-amber-300" />
            </div>
            <div className="flex flex-col">
              <div className="text-xs text-slate-400">Latency</div>
              <motion.div key={latency} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 200 }} className="text-sm font-semibold text-white">
                {latency} ms
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PerformanceBadges;
