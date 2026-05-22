import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Send, Instagram, Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  useEffect(() => {
    document.title = "Contato | Cão Meu Amigo Adestrador de Cães";
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    petInfo: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const { name, contact, petInfo, message } = formData;
    const text = `*SOLICITAÇÃO DE CONTATO - CÃO MEU AMIGO*\n\n` +
      `*Nome:* ${name}\n` +
      `*E-mail ou WhatsApp:* ${contact}\n` +
      `*Cão:* ${petInfo || 'Não informado'}\n` +
      `*Como podemos ajudar:* ${message}`;

    const whatsappUrl = `https://wa.me/5551996566493?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
    setIsSubmitted(true);
  };

  return (
    <div className="bg-[#F1F4F8] pt-20 md:pt-36 pb-10 md:pb-16 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 h-screen opacity-35 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1544568100-847a948585b9?q=80&w=2574&auto=format&fit=crop" 
          alt="Contact Background" 
          className="w-full h-full object-cover grayscale brightness-[0.85]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F1F4F8] via-[#F1F4F8]/60 to-transparent opacity-100" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="mb-3 md:mb-4 flex items-center space-x-3">
                <span className="w-8 md:w-10 h-px bg-brand-vibrant/30"></span>
                <span className="text-[10px] uppercase tracking-[0.5em] text-brand-dark/70 font-semibold">Onde Atendemos</span>
              </div>
              
              <h2 className="text-brand-dark text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-4 md:mb-6 leading-[0.85]">
                Cidades atendidas<br /><span className="text-highlight">no RS</span>
              </h2>
              
              <div className="grid grid-cols-2 gap-y-1.5 md:gap-x-4 md:gap-y-2.5 mb-6 md:mb-10">
                {[
                  'Novo Hamburgo', 'Campo Bom', 'Sapiranga', 
                  'São Leopoldo', 'Porto Alegre', 'Canoas', 
                  'Ivoti', 'Estância Velha', 'Dois Irmãos', 
                  'Vale do Sinos'
                ].map((city) => (
                  <div key={city} className="flex items-center space-x-2 text-brand-dark text-xs md:text-sm uppercase tracking-wider font-semibold">
                    <span className="w-1 md:w-1.5 h-1 md:h-1.5 bg-brand-vibrant/40 rounded-full"></span>
                    <span>{city}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div>
                  <p className="text-brand-dark/60 text-[9px] uppercase tracking-[0.4em] mb-1">WhatsApp / Celular</p>
                  <motion.a 
                    href="https://wa.me/5551996566493" 
                    whileHover={{ x: 6, opacity: 1, color: '#0076FF' }}
                    className="text-lg md:text-xl font-bold tracking-tight text-brand-dark transition-all block leading-tight"
                  >
                    (51) 99656.6493
                  </motion.a>
                </div>
                <div>
                  <p className="text-brand-dark/60 text-[9px] uppercase tracking-[0.4em] mb-1">Email</p>
                  <motion.a 
                    href="mailto:fabianofisio@gmail.com" 
                    whileHover={{ x: 6, opacity: 1, color: '#0076FF' }}
                    className="text-lg md:text-xl font-bold tracking-tight text-brand-dark transition-all block leading-tight"
                  >
                    fabianofisio@gmail.com
                  </motion.a>
                </div>
                <div>
                  <p className="text-brand-dark/60 text-[9px] uppercase tracking-[0.4em] mb-1">Insta</p>
                  <motion.a 
                    href="https://instagram.com/caomeuamigo_adestramento" 
                    whileHover={{ x: 6, opacity: 1, color: '#0076FF' }}
                    className="text-lg md:text-xl font-bold tracking-tight text-brand-dark transition-all block leading-tight"
                  >
                    @caomeuamigo_adestramento
                  </motion.a>
                </div>
                <div>
                  <p className="text-brand-dark/60 text-[9px] uppercase tracking-[0.4em] mb-1">Endereço</p>
                  <p className="text-lg md:text-xl font-bold tracking-tight text-brand-dark leading-tight">Novo Hamburgo, RS</p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 md:p-10 rounded-[28px] border border-brand-dark/5 shadow-md"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-brand-dark text-xl font-bold uppercase tracking-tight mb-2">Solicitação Enviada!</h3>
                <p className="text-brand-dark/75 text-sm leading-snug mb-6 font-medium">
                  Sua mensagem foi formatada e enviada via WhatsApp para iniciar seu contato. Entraremos em contato com você muito em breve!
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFormData({ name: '', contact: '', petInfo: '', message: '' });
                    setIsSubmitted(false);
                  }}
                  className="btn-outline py-3 px-6 text-xs"
                >
                  Enviar Outra Mensagem
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="space-y-4 md:space-y-5">
                  <div className="relative">
                    <input 
                      type="text" 
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Seu Nome" 
                      className="w-full bg-transparent border-b border-brand-vibrant/10 py-2.5 focus:border-brand-vibrant transition-all outline-none text-brand-dark text-sm md:text-base font-semibold placeholder:text-brand-dark/30"
                    />
                  </div>
                  <div className="relative">
                    <input 
                      type="text" 
                      required
                      name="contact"
                      value={formData.contact}
                      onChange={handleInputChange}
                      placeholder="E-mail ou WhatsApp" 
                      className="w-full bg-transparent border-b border-brand-vibrant/10 py-2.5 focus:border-brand-vibrant transition-all outline-none text-brand-dark text-sm md:text-base font-semibold placeholder:text-brand-dark/30"
                    />
                  </div>
                  <div className="relative">
                    <input 
                      type="text" 
                      name="petInfo"
                      value={formData.petInfo}
                      onChange={handleInputChange}
                      placeholder="Nome e Raça do Cão" 
                      className="w-full bg-transparent border-b border-brand-vibrant/10 py-2.5 focus:border-brand-vibrant transition-all outline-none text-brand-dark text-sm md:text-base font-semibold placeholder:text-brand-dark/30"
                    />
                  </div>
                  <div className="relative">
                    <textarea 
                      rows={2} 
                      required
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Como podemos ajudar?" 
                      className="w-full bg-transparent border-b border-brand-vibrant/10 py-2.5 focus:border-brand-vibrant transition-all outline-none text-brand-dark text-sm md:text-base font-semibold resize-none placeholder:text-brand-dark/30"
                    ></textarea>
                  </div>
                </div>
                <motion.button 
                  type="submit"
                  whileHover={{ scale: 1.01, boxShadow: '0 10px 20px rgba(0, 118, 255, 0.15)' }}
                  whileTap={{ scale: 0.99 }}
                  className="btn-primary w-full py-4 text-xs font-bold uppercase tracking-widest mt-2"
                >
                  Enviar Solicitação
                </motion.button>
              </form>
            )}
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
