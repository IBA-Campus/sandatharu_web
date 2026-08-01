import React from 'react';
import { motion } from 'framer-motion';
import { Building, Sprout, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Leaf = ({ className, delay }) => (
  <motion.svg
    className={`absolute ${className}`}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    animate={{
      y: [0, -20, 0],
      rotate: [0, 10, -10, 0],
      opacity: [0.5, 0.8, 0.5]
    }}
    transition={{
      duration: 5,
      delay: delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <path d="M12 22C12 22 20 18 20 12C20 6 12 2 12 2C12 2 4 6 4 12C4 18 12 22 12 22Z" fill="currentColor" fillOpacity="0.4"/>
  </motion.svg>
);

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-emerald-deep">
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url('/Flower/1.jpeg')" }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-emerald-deep/80 to-emerald-deep/40" />

      {/* Floating Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-forest rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob z-0"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-amber-warm rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000 z-0"></div>
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-rose-floral rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-4000 z-0"></div>

      {/* Floating Leaves */}
      <Leaf className="text-white top-1/4 left-[15%] w-8 h-8" delay={0} />
      <Leaf className="text-amber-warm top-1/3 right-[15%] w-12 h-12" delay={1} />
      <Leaf className="text-rose-floral bottom-1/4 left-1/3 w-6 h-6" delay={2} />
      <Leaf className="text-white top-1/2 right-1/3 w-10 h-10" delay={0.5} />
      <Leaf className="text-emerald-forest bottom-1/3 right-[20%] w-14 h-14" delay={1.5} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center">


        <div className="mb-6 space-y-2">
          {["Elevating Hotel Spaces &", "Eco-Tourism Agriculture", "with Fresh Floral Art"].map((line, index) => (
            <div key={index} className="overflow-hidden">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="heading-serif text-white text-5xl md:text-6xl lg:text-7xl font-bold"
              >
                {line}
              </motion.h1>
            </div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-2xl text-lg md:text-xl text-white/80 mb-10"
        >
          Transforming luxury hospitality interiors and promoting sustainable agro-tourism through the art of fresh botanical styling.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link to="/contact" className="btn-gold px-8 py-3 rounded-full flex items-center justify-center gap-2 hover:scale-105 transition-transform duration-300">
            <Building size={20} />
            Hotel Interior Decor
          </Link>
          <Link to="/contact" className="btn-outline-green border-white text-white hover:bg-white/10 px-8 py-3 rounded-full flex items-center justify-center gap-2 transition-colors duration-300">
            <Sprout size={20} />
            Eco Tourism Agriculture
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
      >
        <span className="text-sm tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
