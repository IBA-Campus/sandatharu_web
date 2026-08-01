import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact Us', path: '/contact' }
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const drawerVariants = {
    closed: { x: '100%', transition: { type: 'spring', damping: 25, stiffness: 200 } },
    open: { x: 0, transition: { type: 'spring', damping: 25, stiffness: 200, staggerChildren: 0.1, delayChildren: 0.1 } }
  };

  const linkVariants = {
    closed: { x: 20, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass-dark bg-emerald-deep/90 shadow-glass-lg py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 z-50 group">
              <div className="text-amber-warm group-hover:rotate-12 transition-transform duration-300">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22c0-4.2-3.8-9-8-9 0-3 3-5 5-5s5 2 5 5v9z" />
                  <path d="M12 2v2" />
                  <path d="M12 22v-9" />
                  <path d="M12 22c0-4.2 3.8-9 8-9 0-3-3-5-5-5s-5 2-5 5v9z" />
                </svg>
              </div>
              <span className="heading-serif font-bold text-xl md:text-2xl text-cream tracking-wide">
                Sandatharu <span className="text-amber-warm">Agro</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
                return (
                  <div key={link.name} className="relative py-2">
                    <NavLink
                      to={link.path}
                      className={`text-sm lg:text-base font-medium transition-colors duration-300 hover:text-amber-warm ${
                        isActive ? 'text-amber-warm' : 'text-cream/90'
                      }`}
                    >
                      {link.name}
                    </NavLink>
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-warm rounded-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Desktop CTA Button */}
            <div className="hidden md:block">
              <Link to="/contact" className="btn-gold inline-flex items-center gap-2 text-sm lg:text-base px-6 py-2.5 rounded-full font-medium transition-all hover:scale-105">
                <Heart size={18} className="text-emerald-deep" />
                Book Wedding Decor
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden z-50 text-cream p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-emerald-deep/60 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={drawerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 right-0 bottom-0 w-3/4 max-w-sm bg-emerald-forest shadow-2xl z-40 md:hidden flex flex-col pt-24 px-6 pb-8 border-l border-emerald-deep/50"
          >
            <nav className="flex flex-col gap-6 mt-4">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
                return (
                  <motion.div key={link.name} variants={linkVariants}>
                    <NavLink
                      to={link.path}
                      className={`block text-xl font-medium heading-serif ${
                        isActive ? 'text-amber-warm' : 'text-cream'
                      }`}
                    >
                      {link.name}
                    </NavLink>
                  </motion.div>
                );
              })}
            </nav>

            <motion.div variants={linkVariants} className="mt-auto pt-8 border-t border-cream/10">
              <Link
                to="/contact"
                className="btn-gold flex items-center justify-center gap-2 w-full py-3 rounded-full font-medium"
              >
                <Heart size={18} className="text-emerald-deep" />
                Book Wedding Decor
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
