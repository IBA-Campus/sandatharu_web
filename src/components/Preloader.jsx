import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 800); // wait for exit animation to complete
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const title = "Sandatharu Agro";
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.05, delayChildren: 0.5 },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 12, stiffness: 200 } },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-emerald-deep overflow-hidden"
        >
          {/* Organic background blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-forest/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-warm/10 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000" />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Glowing Ring & Icon */}
            <div className="relative flex items-center justify-center w-32 h-32 mb-8">
              <div className="absolute inset-0 rounded-full border-2 border-amber-warm/30 animate-pulse-ring" />
              
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', damping: 15, stiffness: 100, delay: 0.2 }}
                className="relative z-10 p-4 rounded-full bg-emerald-deep shadow-glow-gold"
              >
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-amber-warm"
                >
                  <path d="M12 22c0-4.2-3.8-9-8-9 0-3 3-5 5-5s5 2 5 5v9z" />
                  <path d="M12 22c0-4.2 3.8-9 8-9 0-3-3-5-5-5s-5 2-5 5v9z" />
                  <path d="M12 2v2" />
                  <path d="M12 22v-9" />
                </svg>
              </motion.div>
            </div>

            {/* Letter by Letter Title */}
            <motion.div
              variants={titleVariants}
              initial="hidden"
              animate="visible"
              className="flex heading-serif text-4xl md:text-5xl lg:text-6xl text-cream font-bold tracking-wider mb-4"
            >
              {title.split("").map((char, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  className={char === " " ? "w-3 md:w-4" : ""}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="text-amber-warm/80 tracking-widest text-sm uppercase font-sans font-medium"
            >
              Eco-Luxury Botanical Styling
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
