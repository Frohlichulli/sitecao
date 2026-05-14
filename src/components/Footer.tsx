import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Mail, Phone, MapPin, Dog } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0F0F0F] text-white pt-20 pb-10 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
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
              <a href="https://instagram.com/caomeuamigo_adestramento" target="_blank" rel="noopener noreferrer" className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-[#0F0F0F] transition-all">
                <Instagram size={20} />
              </a>
              <a href="mailto:fabianofisio@gmail.com" className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-[#0F0F0F] transition-all">
                <Mail size={20} />
              </a>
              <a href="https://wa.me/5551996566493" target="_blank" rel="noopener noreferrer" className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-[#0F0F0F] transition-all">
                <Phone size={20} />
              </a>
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
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-white/40">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-white/60">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>Novo Hamburgo, RS</span>
              </li>
              <li className="flex items-start space-x-3 text-white/60">
                <Phone size={18} className="mt-1 flex-shrink-0" />
                <span>(51) 99656.6493</span>
              </li>
              <li className="flex items-start space-x-3 text-white/60">
                <Mail size={18} className="mt-1 flex-shrink-0" />
                <span>fabianofisio@gmail.com</span>
              </li>
            </ul>
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
