import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Mail, Phone, MapPin, Dog } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const MotionLink = motion(Link);

export default function Footer() {
  const socialLinks = [
    { name: 'Instagram', icon: <Instagram size={20} />, href: 'https://instagram.com/caomeuamigo_adestramento' },
    { name: 'Email', icon: <Mail size={20} />, href: 'mailto:fabianofisio@gmail.com' },
    { name: 'WhatsApp', icon: <Phone size={20} />, href: 'https://wa.me/5551996566493' },
  ];

  const [hoveredIcon, setHoveredIcon] = React.useState<string | null>(null);

  return (
    <footer className="bg-brand-dark text-white pt-20 pb-10 border-t border-brand-vibrant/20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <MotionLink 
              to="/inicio" 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-3 mb-6"
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center transition-transform group-hover:rotate-12">
                <Dog className="text-brand-dark md:w-7 md:h-7" />
              </div>
              <span className="text-white font-bold text-2xl tracking-tighter uppercase whitespace-nowrap">
                Cão Meu Amigo
              </span>
            </MotionLink>
            <p className="text-white/70 max-w-sm text-lg leading-relaxed mb-8 font-light">
              Transformando a relação entre você e seu cão através de adestramento ético, moderno e carinhoso em Novo Hamburgo, RS.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <div 
                  key={social.name} 
                  className="relative"
                  onMouseEnter={() => setHoveredIcon(social.name)}
                  onMouseLeave={() => setHoveredIcon(null)}
                >
                  <AnimatePresence>
                    {hoveredIcon === social.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: 10, x: '-50%' }}
                        className="absolute -top-10 left-1/2 bg-white text-brand-dark text-[8px] font-bold uppercase tracking-[0.2em] px-2 py-1 rounded pointer-events-none whitespace-nowrap z-50 shadow-xl"
                      >
                        {social.name}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-x-[4px] border-x-transparent border-t-[4px] border-t-white" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <motion.a 
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    whileHover={{ scale: 1.1, backgroundColor: '#fff', color: '#002D5F' }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center transition-all"
                  >
                    {social.icon}
                  </motion.a>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.3em] mb-6 text-white/50">Menu</h4>
            <ul className="space-y-4">
              <li><MotionLink to="/historia" whileHover={{ x: 10, color: '#fff' }} className="text-white/60 hover:text-white transition-all block text-base uppercase tracking-widest font-light">História</MotionLink></li>
              <li><MotionLink to="/servicos" whileHover={{ x: 10, color: '#fff' }} className="text-white/60 hover:text-white transition-all block text-base uppercase tracking-widest font-light">Serviços</MotionLink></li>
              <li><MotionLink to="/galeria" whileHover={{ x: 10, color: '#fff' }} className="text-white/60 hover:text-white transition-all block text-base uppercase tracking-widest font-light">Galeria</MotionLink></li>
              <li><MotionLink to="/avaliacao" whileHover={{ x: 10, color: '#fff' }} className="text-white/60 hover:text-white transition-all block text-base uppercase tracking-widest font-light">Avaliação</MotionLink></li>
              <li><MotionLink to="/contato" whileHover={{ x: 10, color: '#fff' }} className="text-white/60 hover:text-white transition-all block text-base uppercase tracking-widest font-light">Contato</MotionLink></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.3em] mb-6 text-white/50">Cidades Atendidas</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[9px] uppercase tracking-widest text-white/40 font-light">
              <span>Novo Hamburgo</span>
              <span>São Leopoldo</span>
              <span>Porto Alegre</span>
              <span>Canoas</span>
              <span>Campo Bom</span>
              <span>Estância Velha</span>
              <span>Ivoti</span>
              <span>Dois Irmãos</span>
              <span>Sapiranga</span>
              <span>Vale do Sinos</span>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 space-y-2">
               <p className="text-[10px] text-white/50 uppercase tracking-widest flex items-center">
                 <Phone size={10} className="mr-2" /> (51) 99656.6493
               </p>
               <p className="text-[10px] text-white/50 uppercase tracking-widest flex items-center">
                 <Mail size={10} className="mr-2" /> fabianofisio@gmail.com
               </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-white/30 text-[10px] tracking-[0.3em] uppercase">
          <p>© {new Date().getFullYear()} Cão Meu Amigo. Todos os direitos reservados.</p>
          <p>Transformando vidas através do adestramento.</p>
        </div>

        {/* Subtle local SEO indexing links (Hidden from prominent view, perfect for Google, SEO & AI crawler mapping) */}
        <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap justify-center md:justify-between gap-x-6 gap-y-2 text-[8px] tracking-[0.15em] uppercase text-white/10 hover:text-white/40 transition-colors duration-300">
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <Link to="/adestramento-novo-hamburgo" className="hover:text-brand-vibrant">Adestramento Novo Hamburgo</Link>
            <span className="opacity-30">•</span>
            <Link to="/comportamento-canino" className="hover:text-brand-vibrant">Especialistas em Comportamento Canino</Link>
            <span className="opacity-30">•</span>
            <Link to="/treinamento-profissional" className="hover:text-brand-vibrant">Melhor Treinamento Canino da Região</Link>
          </div>
          <div>
            <span>SEO Localizado</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
