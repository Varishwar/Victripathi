import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      name: "John Mitchell",
      role: "IT Director",
      company: "UK Education Trust",
      avatar: "https://ui-avatars.com/api/?name=John+Mitchell&background=0EA5E9&color=fff&size=128",
      content: "Varishwar's expertise in Azure Virtual Desktop transformed our infrastructure. He deployed AVD for 5000+ users with zero downtime. His technical knowledge and project management skills are exceptional.",
      rating: 5
    },
    {
      name: "Sarah Thompson",
      role: "CTO",
      company: "Financial Services Ltd",
      avatar: "https://ui-avatars.com/api/?name=Sarah+Thompson&background=14B8A6&color=fff&size=128",
      content: "The cloud migration project was executed flawlessly. Varishwar's Terraform automation and Azure Landing Zone architecture saved us 40% in costs. Highly recommended for enterprise Azure projects.",
      rating: 5
    },
    {
      name: "David Chen",
      role: "Infrastructure Manager",
      company: "Healthcare Organization",
      avatar: "https://ui-avatars.com/api/?name=David+Chen&background=8B5CF6&color=fff&size=128",
      content: "Outstanding security implementation! Varishwar implemented Microsoft Sentinel and Zero Trust architecture. His attention to detail is remarkable.",
      rating: 5
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-24 px-6 relative z-10 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-950 to-slate-900/50"></div>
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Client Testimonials
          </h2>
          <p className="text-slate-400 text-lg">
            Trusted by leading organizations across the UK
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-azure-500 to-teal-500 mx-auto mt-6 rounded-full"></div>
        </motion.div>

        <div className="relative">
          {/* Quote icon */}
          <div className="absolute -top-8 left-8 opacity-10">
            <Quote className="w-24 h-24 text-azure-400" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Card */}
              <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-md border border-slate-700/50 rounded-3xl p-12 shadow-[0_0_50px_rgba(56,189,248,0.1)] hover:shadow-[0_0_80px_rgba(56,189,248,0.2)] transition-all duration-500">
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Star className="w-6 h-6 fill-yellow-500 text-yellow-500" />
                    </motion.div>
                  ))}
                </div>

                {/* Content */}
                <p className="text-slate-300 text-lg leading-relaxed text-center mb-8 italic">
                  "{currentTestimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center justify-center gap-4">
                  <img
                    src={currentTestimonial.avatar}
                    alt={currentTestimonial.name}
                    className="w-16 h-16 rounded-full border-2 border-azure-500/50"
                  />
                  <div>
                    <h4 className="text-white font-semibold text-lg">{currentTestimonial.name}</h4>
                    <p className="text-azure-400 text-sm">{currentTestimonial.role}</p>
                    <p className="text-slate-500 text-xs">{currentTestimonial.company}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="w-12 h-12 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600 rounded-full flex items-center justify-center text-white transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex 
                      ? 'w-8 bg-azure-500' 
                      : 'bg-slate-600 hover:bg-slate-500'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="w-12 h-12 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600 rounded-full flex items-center justify-center text-white transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
