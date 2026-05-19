import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Dog } from 'lucide-react';

const MotionLink = motion(Link);

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'INÍCIO', path: '/' },
    { name: 'HISTÓRIA', path: '/historia' },
    { name: 'SERVIÇOS', path: '/servicos' },
    { name: 'GALERIA', path: '/galeria' },
    { name: 'AVALIAÇÃO', path: '/avaliacao' },
    { name: 'CONTATO', path: '/contato' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        isScrolled ? 'bg-white/90 backdrop-blur-md py-3 md:py-4 border-brand-soft shadow-xl' : 'bg-transparent py-6 md:py-8 border-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <MotionLink 
          to="/" 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center space-x-2 group"
        >
          <div className="w-10 h-10 bg-brand-vibrant rounded-full flex items-center justify-center transition-transform group-hover:rotate-12 outline outline-4 outline-brand-vibrant/5">
            <Dog className="text-white" size={20} />
          </div>
          <span className={`${isScrolled ? 'text-brand-dark' : 'text-brand-dark'} font-bold text-xl tracking-tighter uppercase whitespace-nowrap`}>
            Cão Meu Amigo
          </span>
        </MotionLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <MotionLink
              key={link.path}
              to={link.path}
              whileHover={{ scale: 1.1, x: 2 }}
              whileTap={{ scale: 0.95 }}
              className={`text-xs font-bold tracking-[0.3em] uppercase transition-all hover:opacity-100 ${
                location.pathname === link.path ? 'text-brand-vibrant underline underline-offset-8' : 'text-brand-dark/70'
              }`}
            >
              {link.name}
            </MotionLink>
          ))}
          <MotionLink
            to="/contato"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary"
          >
            Agende já
          </MotionLink>
        </nav>

        {/* Mobile Menu Toggle */}
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="md:hidden text-brand-dark p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </motion.button>
      </div>

        {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-full left-0 right-0 bg-white border-t border-brand-soft p-6 md:hidden flex flex-col space-y-6 min-h-[calc(100vh-60px)] items-center justify-center text-center backdrop-blur-3xl bg-white/95"
          >
            {navLinks.map((link) => (
              <MotionLink
                key={link.path}
                to={link.path}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-3xl font-bold uppercase tracking-tighter transition-all ${
                  location.pathname === link.path ? 'text-brand-vibrant' : 'text-brand-dark/40'
                }`}
              >
                {link.name}
              </MotionLink>
            ))}
            <MotionLink
              to="/contato"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="btn-primary w-full max-w-xs py-4 text-center mt-6 shadow-2xl shadow-brand-vibrant/20"
            >
              Agende uma Avaliação
            </MotionLink>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
