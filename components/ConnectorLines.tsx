import React from 'react';

const ConnectorLines: React.FC = () => {
  // Using an SVG overlay with animated dash offset to simulate running lines
  const style = `
    @keyframes dashMove { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -40; } }
  `;

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 9 }}>
      <style>{style}</style>
      <svg viewBox="0 0 1000 600" preserveAspectRatio="none" className="w-full h-full">
        <defs>
          <linearGradient id="cgrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(56,189,248,0)" />
            <stop offset="50%" stopColor="rgba(56,189,248,0.45)" />
            <stop offset="100%" stopColor="rgba(56,189,248,0)" />
          </linearGradient>
        </defs>

        {/* Top-right */}
        <line x1="500" y1="300" x2="920" y2="80" stroke="url(#cgrad)" strokeWidth="1.5" strokeDasharray="8 8" style={{ opacity: 0.85, animation: 'dashMove 1.6s linear infinite' }} />
        {/* Top-left */}
        <line x1="500" y1="300" x2="80" y2="60" stroke="url(#cgrad)" strokeWidth="1.5" strokeDasharray="8 8" style={{ opacity: 0.7, animation: 'dashMove 1.9s linear infinite' }} />
        {/* Bottom-left */}
        <line x1="500" y1="300" x2="80" y2="520" stroke="url(#cgrad)" strokeWidth="1.5" strokeDasharray="8 8" style={{ opacity: 0.7, animation: 'dashMove 1.8s linear infinite' }} />
        {/* Bottom-right */}
        <line x1="500" y1="300" x2="920" y2="520" stroke="url(#cgrad)" strokeWidth="1.5" strokeDasharray="8 8" style={{ opacity: 0.85, animation: 'dashMove 1.5s linear infinite' }} />
      </svg>
    </div>
  );
};

export default ConnectorLines;
