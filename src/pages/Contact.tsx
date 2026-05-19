import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, Instagram, Phone, Mail, MapPin } from 'lucide-react';

export default function Contact() {
  useEffect(() => {
    document.title = "Contato | Cão Meu Amigo Adestrador de Cães";
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for form submission
  };

  return (
    <div className="bg-white pt-20 md:pt-48 pb-10 md:pb-20 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 h-screen opacity-30 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1544568100-847a948585b9?q=80&w=2574&auto=format&fit=crop" 
          alt="Contact Background" 
          className="w-full h-full object-cover grayscale brightness-[0.9]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent opacity-100" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="mb-4 md:mb-6 flex items-center space-x-4">
                <span className="w-8 md:w-10 h-px bg-brand-vibrant/30"></span>
                <span className="text-[10px] uppercase tracking-[0.5em] text-brand-dark/70">Onde Atendemos</span>
              </div>
              
              <h2 className="text-brand-dark text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-8 md:mb-10 leading-[0.85]">
                Cidades atendidas<br /><span className="text-highlight">no RS</span>
              </h2>
              
              <div className="grid grid-cols-2 gap-x-2 md:gap-4 mb-12 md:mb-20">
                {[
                  'Novo Hamburgo', 'Campo Bom', 'Sapiranga', 
                  'São Leopoldo', 'Porto Alegre', 'Canoas', 
                  'Ivoti', 'Estância Velha', 'Dois Irmãos', 
                  'Vale do Sinos'
                ].map((city) => (
                  <div key={city} className="flex items-center space-x-2 text-brand-dark text-xs md:text-sm uppercase tracking-wider font-light">
                    <span className="w-1 md:w-1.5 h-1 md:h-1.5 bg-brand-vibrant/40 rounded-full"></span>
                    <span>{city}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <p className="text-brand-dark/50 text-[9px] uppercase tracking-[0.4em] mb-4">WhatsApp / Celular</p>
                  <motion.a 
                    href="https://wa.me/5551996566493" 
                    whileHover={{ x: 10, opacity: 1, color: '#0076FF' }}
                    className="text-xl font-medium tracking-tight text-brand-dark transition-all block"
                  >
                    (51) 99656.6493
                  </motion.a>
                </div>
                <div>
                  <p className="text-brand-dark/50 text-[9px] uppercase tracking-[0.4em] mb-4">Email</p>
                  <motion.a 
                    href="mailto:fabianofisio@gmail.com" 
                    whileHover={{ x: 10, opacity: 1, color: '#0076FF' }}
                    className="text-xl font-medium tracking-tight text-brand-dark transition-all block"
                  >
                    fabianofisio@gmail.com
                  </motion.a>
                </div>
                <div>
                  <p className="text-brand-dark/50 text-[9px] uppercase tracking-[0.4em] mb-4">Insta</p>
                  <motion.a 
                    href="https://instagram.com/caomeuamigo_adestramento" 
                    whileHover={{ x: 10, opacity: 1, color: '#0076FF' }}
                    className="text-xl font-medium tracking-tight text-brand-dark transition-all block"
                  >
                    @caomeuamigo_adestramento
                  </motion.a>
                </div>
                <div>
                  <p className="text-brand-dark/50 text-[9px] uppercase tracking-[0.4em] mb-4">Endereço</p>
                  <p className="text-xl font-medium tracking-tight text-brand-dark">Novo Hamburgo, RS</p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-brand-soft/30 p-8 md:p-16 rounded-[40px] border border-brand-soft"
          >
            <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">
              <div className="space-y-6 md:space-y-8">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Seu Nome" 
                    className="w-full bg-transparent border-b border-brand-vibrant/10 py-3 md:py-4 focus:border-brand-vibrant transition-all outline-none text-brand-dark text-sm md:text-base font-light placeholder:text-brand-dark/30"
                  />
                </div>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="E-mail ou WhatsApp" 
                    className="w-full bg-transparent border-b border-brand-vibrant/10 py-3 md:py-4 focus:border-brand-vibrant transition-all outline-none text-brand-dark text-sm md:text-base font-light placeholder:text-brand-dark/30"
                  />
                </div>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Nome e Raça do Cão" 
                    className="w-full bg-transparent border-b border-brand-vibrant/10 py-3 md:py-4 focus:border-brand-vibrant transition-all outline-none text-brand-dark text-sm md:text-base font-light placeholder:text-brand-dark/30"
                  />
                </div>
                <div className="relative">
                  <textarea 
                    rows={3} 
                    placeholder="Como podemos ajudar?" 
                    className="w-full bg-transparent border-b border-brand-vibrant/10 py-3 md:py-4 focus:border-brand-vibrant transition-all outline-none text-brand-dark text-sm md:text-base font-light resize-none placeholder:text-brand-dark/30"
                  ></textarea>
                </div>
              </div>
              <motion.button 
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(0, 118, 255, 0.2)' }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary w-full py-5 md:py-6 text-xs md:text-sm"
              >
                Enviar Solicitação
              </motion.button>
            </form>
          </motion.div>
        </div>
 
        {/* Map Section Placeholder */}
        <div className="mt-16 md:mt-32 w-full h-[300px] md:h-[400px] rounded-[32px] md:rounded-[48px] overflow-hidden relative border border-brand-soft shadow-xl bg-brand-soft/20">
          <div className="absolute inset-0 flex items-center justify-center text-brand-vibrant/10 font-black uppercase text-xl text-center px-6 pointer-events-none z-10">
            Mapa de Novo Hamburgo
          </div>
           <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110931.3248356972!2d-51.21366114179688!3d-29.6893693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9519446d3e86c071%3A0x673c683b5847e24a!2sNovo%20Hamburgo%2C%20RS!5e0!3m2!1spt-BR!2sbr!4v1715611842000!5m2!1spt-BR!2sbr" 
            width="100%" 
            height="100%" 
            style={{ border: 0, filter: 'grayscale(1) opacity(0.8)' }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
