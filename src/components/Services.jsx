import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Building, Sprout, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const TiltCard = ({ children, className }) => {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateXValue = ((y - centerY) / centerY) * -5;
    const rotateYValue = ((x - centerX) / centerX) * 5;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative group perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ring-2 ring-emerald-forest/50 shadow-glow-green" />
    </motion.div>
  );
};

const Services = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-24 bg-cream">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="heading-serif text-4xl md:text-5xl text-emerald-deep mb-4"
          >
            Our Core Services
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: 64 } : { width: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 bg-amber-warm mx-auto mb-6"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            Blending luxury hospitality aesthetics with sustainable agricultural practices
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <TiltCard className="h-full bg-white rounded-2xl shadow-glass-lg flex flex-col overflow-hidden cursor-pointer">
              <div className="h-64 overflow-hidden">
                <img src="/images/hotel_lobby.jpg" alt="Hotel Interior Decor" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <div className="w-12 h-12 bg-amber-warm/10 rounded-full flex items-center justify-center mb-6">
                  <Building className="text-amber-warm w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-emerald-deep mb-4 font-serif">Hotel Interior Decor</h3>
                <p className="text-gray-600 mb-6 flex-grow">
                  Transforming hotel lobbies, luxury suites, fine dining restaurants, and resort spaces with fresh cut flower styling and natural botanical arrangements that captivate every guest.
                </p>
                <div className="flex flex-wrap items-center gap-2 md:gap-4 text-sm font-medium text-emerald-forest mb-8">
                  <span>Lobby Styling</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-warm hidden sm:block" />
                  <span>Suite Decor</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-warm hidden sm:block" />
                  <span>Restaurant Florals</span>
                </div>
                <Link to="/contact" className="inline-flex items-center gap-2 text-emerald-forest font-semibold hover:text-emerald-deep transition-colors mt-auto">
                  Explore Our Work <ArrowRight size={18} />
                </Link>
              </div>
            </TiltCard>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <TiltCard className="h-full bg-white rounded-2xl shadow-glass-lg flex flex-col overflow-hidden cursor-pointer">
              <div className="h-64 overflow-hidden">
                <img src="/images/hero_farm.jpg" alt="Eco Tourism Agriculture" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <div className="w-12 h-12 bg-emerald-forest/10 rounded-full flex items-center justify-center mb-6">
                  <Sprout className="text-emerald-forest w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-emerald-deep mb-4 font-serif">Eco Tourism Agriculture</h3>
                <p className="text-gray-600 mb-6 flex-grow">
                  Promoting eco-friendly agro-tourism experiences with fresh harvest floral displays, sustainable flower cultivation tours, and farm-fresh botanical arrangements for eco-conscious visitors.
                </p>
                <div className="flex flex-wrap items-center gap-2 md:gap-4 text-sm font-medium text-emerald-forest mb-8">
                  <span>Farm Tours</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-warm hidden sm:block" />
                  <span>Fresh Harvest</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-warm hidden sm:block" />
                  <span>Sustainable Practices</span>
                </div>
                <Link to="/contact" className="inline-flex items-center gap-2 text-emerald-forest font-semibold hover:text-emerald-deep transition-colors mt-auto">
                  Learn More <ArrowRight size={18} />
                </Link>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services;
