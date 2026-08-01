import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const MagneticIcon = ({ icon: Icon, href }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center p-2 rounded-full border border-white/20 text-white/80 hover:text-amber-warm hover:border-amber-warm transition-colors duration-300"
    >
      <Icon className="w-5 h-5" />
    </motion.a>
  );
};

export default function Footer() {
  return (
    <footer className="bg-emerald-deep text-white py-16 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1 - Brand */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <span className="heading-serif text-2xl text-white">Sandatharu</span>
              <span className="heading-serif text-2xl text-amber-warm">Agro</span>
            </Link>
            <p className="text-white/60 leading-relaxed text-sm">
              Bringing the freshest blooms and most beautiful floral decorations from our farms to your special moments.
            </p>
            <div className="flex space-x-4 pt-2">
              <MagneticIcon icon={Facebook} href="https://facebook.com" />
              <MagneticIcon icon={Instagram} href="https://instagram.com" />
              <MagneticIcon icon={Twitter} href="https://twitter.com" />
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'About Us', 'Gallery', 'Contact Us'].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '')}`}
                    className="text-white/60 hover:text-amber-warm transition-colors duration-300 text-sm block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Services */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Our Services</h3>
            <ul className="space-y-3">
              {[
                'Fresh Cut Flowers', 
                'Wedding Decor', 
                'Event Styling', 
                'Wholesale Supply', 
                'Corporate Flowers'
              ].map((item) => (
                <li key={item}>
                  <Link 
                    to="/services"
                    className="text-white/60 hover:text-amber-warm transition-colors duration-300 text-sm block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Stay Updated</h3>
            <p className="text-white/60 text-sm mb-4">
              Subscribe for seasonal offers and floral inspiration.
            </p>
            <form className="flex w-full" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address" 
                required
                className="w-full bg-white/10 border border-white/20 rounded-l-xl px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-amber-warm transition-colors"
              />
              <button 
                type="submit"
                className="bg-amber-warm text-emerald-deep rounded-r-xl px-4 py-3 font-semibold hover:bg-amber-warm/90 transition-colors flex items-center justify-center flex-shrink-0"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom section - Divider + Copyright */}
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Sandatharu Agro. All rights reserved.
          </p>
          <p className="text-white/40 text-sm text-center md:text-right">
            Crafted with ❤️ in Sri Lanka
          </p>
        </div>
      </div>
    </footer>
  );
}
