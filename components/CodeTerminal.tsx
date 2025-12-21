import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

const CodeTerminal: React.FC = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  
  const codeLines = [
    '$ az login --tenant microsoft.com',
    '✓ Successfully authenticated',
    '$ az vm create --resource-group Production',
    '✓ Virtual Machine deployed',
    '$ kubectl apply -f deployment.yaml',
    '✓ AKS cluster configured',
    '$ az monitor metrics list --resource $VM_ID',
    '✓ Performance optimized: 99.9% uptime',
  ];

  useEffect(() => {
    if (currentLineIndex >= codeLines.length) {
      setTimeout(() => {
        setDisplayedText('');
        setCurrentLineIndex(0);
      }, 3000);
      return;
    }

    const currentLine = codeLines[currentLineIndex];
    let charIndex = 0;

    const typingInterval = setInterval(() => {
      if (charIndex < currentLine.length) {
        setDisplayedText((prev) => prev + currentLine[charIndex]);
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setDisplayedText((prev) => prev + '\n');
          setCurrentLineIndex((prev) => prev + 1);
        }, 500);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [currentLineIndex]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative group"
    >
      {/* Terminal Window */}
      <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-xl overflow-hidden shadow-2xl hover:shadow-[0_0_50px_rgba(56,189,248,0.3)] transition-all duration-500">
        {/* Terminal Header */}
        <div className="bg-slate-800/80 px-4 py-3 flex items-center justify-between border-b border-slate-700/50">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex items-center space-x-2 text-slate-400 text-sm">
            <Terminal className="w-4 h-4" />
            <span className="font-mono">Azure Cloud Shell</span>
          </div>
        </div>
        
        {/* Terminal Content */}
        <div className="p-6 font-mono text-sm">
          <pre className="text-green-400 whitespace-pre-wrap">
            {displayedText}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-2 h-4 bg-green-400 ml-1"
            />
          </pre>
        </div>
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-azure-500/10 to-teal-500/10 rounded-xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
    </motion.div>
  );
};

export default CodeTerminal;
