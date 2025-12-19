import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, ArrowRight, Download } from 'lucide-react';
import { ProfileData } from '../types';

interface ContactProps {
  contact: ProfileData['contact'];
}

const Contact: React.FC<ContactProps> = ({ contact }) => {
  return (
    <section id="contact" className="py-24 px-6 relative z-10 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-azure-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="container mx-auto max-w-4xl text-center relative z-10">
        
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
        >
             <h2 className="text-4xl font-bold text-white mb-6">Contact Me</h2>
             <p className="text-slate-400 text-lg max-w-2xl mx-auto">
               I am currently open to remote and hybrid opportunities with UK-based organizations. 
               Whether you need expertise in Azure Virtual Desktop, Cloud Migrations, or Infrastructure Security, feel free to reach out.
             </p>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-center gap-6"
        >
            <a 
              href={`mailto:${contact.email}`}
              className="group relative w-full md:w-auto flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-azure-600 to-azure-500 hover:from-azure-500 hover:to-teal-500 text-white rounded-xl transition-all duration-500 shadow-[0_0_25px_rgba(14,165,233,0.4)] hover:shadow-[0_0_40px_rgba(14,165,233,0.6)] hover:scale-105 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
              <Mail className="relative z-10 w-5 h-5" />
              <span className="relative z-10 font-semibold text-lg">Send Email</span>
              <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            {contact.linkedin && (
              <a 
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full md:w-auto flex items-center justify-center space-x-3 px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 hover:border-azure-400/50 rounded-xl transition-all"
              >
                <Linkedin className="w-5 h-5 text-azure-400" />
                <span className="font-medium text-lg">LinkedIn Profile</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform opacity-0 group-hover:opacity-100" />
              </a>
            )}
            
            {/* Resume Download Button */}
            <a 
              href="https://drive.google.com/uc?export=download&id=1XRdV7Mo7YSc3Cu7NxoRVu-v5vBHzEcqa"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full md:w-auto flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white border border-teal-500/30 hover:border-teal-400/60 rounded-xl transition-all duration-500 shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_35px_rgba(20,184,166,0.5)] hover:scale-105"
            >
              <Download className="w-5 h-5" />
              <span className="font-semibold text-lg">Download Resume</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform opacity-0 group-hover:opacity-100" />
            </a>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-16 pt-8 border-t border-slate-800/50 flex flex-col items-center gap-4 text-slate-500"
        >
            <p>Preferred Communication: Email or LinkedIn</p>
            <p className="font-mono text-sm">{contact.location}</p>
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;