import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Dog } from 'lucide-react';

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
    { name: 'Início', path: '/' },
    { name: 'História', path: '/historia' },
    { name: 'Serviços', path: '/servicos' },
    { name: 'Galeria', path: '/galeria' },
    { name: 'Contato', path: '/contato' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        isScrolled ? 'bg-[#0F0F0F]/80 backdrop-blur-md py-4 border-white/10 shadow-2xl' : 'bg-transparent py-8 border-transparent'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center transition-transform group-hover:rotate-12">
            <Dog className="text-[#0F0F0F]" size={18} />
          </div>
          <span className="text-white font-bold text-xl tracking-tighter uppercase whitespace-nowrap">
            Cão Meu Amigo
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-xs font-bold tracking-[0.3em] uppercase transition-all hover:opacity-100 ${
                location.pathname === link.path ? 'text-white underline underline-offset-8' : 'text-white/40'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/contato"
            className="btn-primary"
          >
            Agende já
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

        {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-full left-0 right-0 bg-[#0F0F0F] border-t border-white/5 p-12 md:hidden flex flex-col space-y-10 min-h-[calc(100vh-80px)] items-center justify-center text-center"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-4xl font-bold uppercase tracking-tighter transition-all ${
                  location.pathname === link.path ? 'text-white' : 'text-white/20'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contato"
              onClick={() => setIsMobileMenuOpen(false)}
              className="btn-primary w-full max-w-xs py-6"
            >
              Agende uma Avaliação
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
