import React from 'react';
import { motion } from 'motion/react';
import { Send, Instagram, Phone, Mail, MapPin, ChevronDown } from 'lucide-react';

export default function Contact() {
  const [activeFaq, setActiveFaq] = React.useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for form submission
  };

  const faqs = [
    {
      q: "Com que idade meu cão pode começar o adestramento?",
      a: "O adestramento pode começar logo nos primeiros meses de vida, a partir dos 60 dias, quando o filhote já está em fase de socialização. Cães adultos também aprendem perfeitamente, nunca é tarde para começar!"
    },
    {
      q: "Quanto tempo dura uma aula e o processo completo?",
      a: "As aulas individuais duram em média 50 minutos. O tempo total do processo varia de acordo com os objetivos do tutor e o comportamento do cão, mas resultados significativos são notados já nas primeiras semanas."
    },
    {
      q: "Vocês utilizam métodos punitivos?",
      a: "Não. Utilizamos metodologias modernas baseadas no reforço positivo e bem-estar animal. O foco é recompensar os comportamentos desejados e criar uma comunicação clara e prazerosa entre cão e tutor."
    },
    {
      q: "Preciso estar presente durante as aulas?",
      a: "Sim, a participação do tutor é fundamental. O objetivo do adestramento não é apenas ensinar o cão, mas capacitar o tutor a se comunicar corretamente com ele no dia a dia."
    }
  ];

  return (
    <div className="bg-[#0F0F0F] pt-48 pb-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="mb-6 flex items-center space-x-4">
                <span className="w-10 h-px bg-white/30"></span>
                <span className="text-[10px] uppercase tracking-[0.5em] text-white/40">Onde Atendemos</span>
              </div>
              
              <h2 className="text-white text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-10 leading-[0.85]">
                Cidades atendidas<br /><span className="text-highlight">no RS</span>
              </h2>
              
              <div className="grid grid-cols-2 gap-4 mb-20">
                {[
                  'Novo Hamburgo', 'Campo Bom', 'Sapiranga', 
                  'São Leopoldo', 'Porto Alegre', 'Canoas', 
                  'Ivoti', 'Estância Velha', 'Dois Irmãos', 
                  'Vale do Sinos'
                ].map((city) => (
                  <div key={city} className="flex items-center space-x-2 text-white/60 text-sm">
                    <span className="w-1.5 h-1.5 bg-white/20 rounded-full"></span>
                    <span>{city}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                <div>
                  <p className="text-white/20 text-[9px] uppercase tracking-[0.4em] mb-4">WhatsApp / Celular</p>
                  <a href="https://wa.me/5551996566493" className="text-xl font-medium tracking-tight text-white hover:opacity-70 transition-opacity">(51) 99656.6493</a>
                </div>
                <div>
                  <p className="text-white/20 text-[9px] uppercase tracking-[0.4em] mb-4">Email</p>
                  <a href="mailto:fabianofisio@gmail.com" className="text-xl font-medium tracking-tight text-white hover:opacity-70 transition-opacity">fabianofisio@gmail.com</a>
                </div>
                <div>
                  <p className="text-white/20 text-[9px] uppercase tracking-[0.4em] mb-4">Insta</p>
                  <a href="https://instagram.com/caomeuamigo_adestramento" className="text-xl font-medium tracking-tight text-white hover:opacity-70 transition-opacity">@caomeuamigo_adestramento</a>
                </div>
                <div>
                  <p className="text-white/20 text-[9px] uppercase tracking-[0.4em] mb-4">Endereço</p>
                  <p className="text-xl font-medium tracking-tight text-white">Novo Hamburgo, RS</p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0A0A0A] p-10 md:p-16 rounded-2xl border border-white/5"
          >
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="space-y-8">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Seu Nome" 
                    className="w-full bg-transparent border-b border-white/10 py-4 focus:border-white transition-all outline-none text-white font-light"
                  />
                </div>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="E-mail ou WhatsApp" 
                    className="w-full bg-transparent border-b border-white/10 py-4 focus:border-white transition-all outline-none text-white font-light"
                  />
                </div>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Nome e Raça do Cão" 
                    className="w-full bg-transparent border-b border-white/10 py-4 focus:border-white transition-all outline-none text-white font-light"
                  />
                </div>
                <div className="relative">
                  <textarea 
                    rows={3} 
                    placeholder="Como podemos ajudar?" 
                    className="w-full bg-transparent border-b border-white/10 py-4 focus:border-white transition-all outline-none text-white font-light resize-none"
                  ></textarea>
                </div>
              </div>
              <button 
                type="submit"
                className="btn-primary w-full py-6 text-sm"
              >
                Enviar Solicitação
              </button>
            </form>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <div className="mt-32 max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-white text-3xl font-bold uppercase tracking-tight mb-4">Dúvidas Frequentes</h2>
            <p className="text-white/40 text-sm tracking-widest uppercase">FAQ Adestramento</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
              >
                <div className="p-6 flex items-center justify-between">
                  <h3 className="text-white font-medium text-lg pr-8">{faq.q}</h3>
                  <ChevronDown className={`w-5 h-5 text-white/20 group-hover:text-white transition-transform duration-300 ${activeFaq === idx ? 'rotate-180 text-white' : ''}`} />
                </div>
                
                <motion.div
                  initial={false}
                  animate={{ height: activeFaq === idx ? 'auto' : 0, opacity: activeFaq === idx ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 text-white/40 leading-relaxed">
                    {faq.a}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Map Section Placeholder */}
        <div className="mt-32 w-full h-[400px] bg-[#f5f5f5] rounded-[48px] overflow-hidden relative">
          <div className="absolute inset-0 flex items-center justify-center text-[#0F0F0F]/20 font-black uppercase text-xl text-center px-6">
            Mapa Interativo de Novo Hamburgo<br />
            <span className="text-sm font-bold opacity-50 tracking-widest mt-2">[Integrável com Google Maps]</span>
          </div>
          {/* Real map could be an iframe here but for demo we just show a styled placeholder */}
           <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110931.3248356972!2d-51.21366114179688!3d-29.6893693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9519446d3e86c071%3A0x673c683b5847e24a!2sNovo%20Hamburgo%2C%20RS!5e0!3m2!1spt-BR!2sbr!4v1715611842000!5m2!1spt-BR!2sbr" 
            width="100%" 
            height="100%" 
            style={{ border: 0, filter: 'grayscale(1) invert(1) opacity(0.8)' }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
