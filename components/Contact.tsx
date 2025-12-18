import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, ArrowRight } from 'lucide-react';
import { ProfileData } from '../types';

interface ContactProps {
  contact: ProfileData['contact'];
}

const Contact: React.FC<ContactProps> = ({ contact }) => {
  return (
    <section id="contact" className="py-24 px-6 relative z-10 bg-gradient-to-t from-slate-950 to-slate-900/50">
      <div className="container mx-auto max-w-4xl text-center">
        
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
              className="group relative w-full md:w-auto flex items-center justify-center space-x-3 px-8 py-4 bg-azure-600 hover:bg-azure-500 text-white rounded-xl transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <Mail className="relative z-10 w-5 h-5" />
              <span className="relative z-10 font-medium text-lg">Send Email</span>
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