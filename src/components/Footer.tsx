import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Mail, Phone, MapPin, Dog } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Footer() {
  const socialLinks = [
    { name: 'Instagram', icon: <Instagram size={20} />, href: 'https://instagram.com/caomeuamigo_adestramento' },
    { name: 'Email', icon: <Mail size={20} />, href: 'mailto:fabianofisio@gmail.com' },
    { name: 'WhatsApp', icon: <Phone size={20} />, href: 'https://wa.me/5551996566493' },
  ];

  const [hoveredIcon, setHoveredIcon] = React.useState<string | null>(null);

  return (
    <footer className="bg-[#0F0F0F] text-white pt-10 md:pt-20 pb-6 md:pb-10 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-10 md:mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <Dog className="text-[#0F0F0F]" size={28} />
              </div>
              <span className="text-white font-bold text-2xl tracking-tighter uppercase">
                Cão Meu Amigo
              </span>
            </Link>
            <p className="text-white/50 max-w-sm text-lg leading-relaxed mb-8">
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
                        className="absolute -top-12 left-1/2 bg-white text-[#0F0F0F] text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-2 rounded pointer-events-none whitespace-nowrap z-50 shadow-xl"
                      >
                        {social.name}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-x-[6px] border-x-transparent border-t-[6px] border-t-white" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <a 
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-[#0F0F0F] transition-all"
                  >
                    {social.icon}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-white/40">Menu</h4>
            <ul className="space-y-4">
              <li><Link to="/historia" className="text-white/60 hover:text-white transition-colors">História</Link></li>
              <li><Link to="/servicos" className="text-white/60 hover:text-white transition-colors">Serviços</Link></li>
              <li><Link to="/galeria" className="text-white/60 hover:text-white transition-colors">Galeria</Link></li>
              <li><Link to="/contato" className="text-white/60 hover:text-white transition-colors">Contato</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-white/40">Cidades Atendidas</h4>
            <div className="grid grid-cols-2 gap-2 text-[9px] uppercase tracking-widest text-white/20">
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
            <div className="mt-6 pt-6 border-t border-white/5 space-y-2">
               <p className="text-[10px] text-white/40 uppercase tracking-widest flex items-center">
                 <Phone size={12} className="mr-2" /> (51) 99656.6493
               </p>
               <p className="text-[10px] text-white/40 uppercase tracking-widest flex items-center">
                 <Mail size={12} className="mr-2" /> fabianofisio@gmail.com
               </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:row justify-between items-center text-white/30 text-xs tracking-widest uppercase">
          <p>© {new Date().getFullYear()} Cão Meu Amigo Adestramento. Todos os direitos reservados.</p>
          <p className="mt-2 md:mt-0">Desenvolvido com carinho para os pets.</p>
        </div>
      </div>
    </footer>
  );
}
