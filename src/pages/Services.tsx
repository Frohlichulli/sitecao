import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Dog, Star, Heart, Users, ShieldCheck, Home as HomeIcon, Droplets, Film } from 'lucide-react';
import { Link } from 'react-router-dom';

const MotionLink = motion(Link);

export default function Services() {
  useEffect(() => {
    document.title = "Serviços de Adestramento | Cão Meu Amigo";
  }, []);

  const services = [
    {
      title: "Adestramento Básico",
      desc: "Ideal para filhotes ou cães que precisam de comandos essenciais como Sentar, Ficar e Vir quando chamado. Foco em foco e calma.",
      icon: <Dog size={40} />
    },
    {
      title: "Adestramento Avançado",
      desc: "Trabalhos de precisão, comandos à distância, truques complexos e controle total sem guia em qualquer ambiente.",
      icon: <Star size={40} />
    },
    {
      title: "Socialização Controlada",
      desc: "Encontros monitorados para cães aprenderem a interagir corretamente. Essencial para cães reativos ou ansiosos.",
      icon: <Users size={40} />
    },
    {
      title: "Cães de Assistência",
      desc: "Treinamento especializado para cães que auxiliam pessoas com necessidades especiais. Rigor técnico e sensibilidade.",
      icon: <ShieldCheck size={40} />
    },
    {
      title: "Consultoria Comportamental",
      desc: "Resolução de problemas específicos como destruição de objetos, latidos excessivos e ansiedade de separação.",
      icon: <Heart size={40} />
    },
    {
      title: "Adestramento Sanitário",
      desc: "Ensine seu cão o lugar correto para as necessidades de forma higiênica e sem estresse para a família.",
      icon: <Droplets size={40} />
    },
    {
      title: "Cães para Publicidade e Cinema",
      desc: "Preparação de cães para atuar em comerciais, fotos e filmes, garantindo comportamento impecável diante das câmeras.",
      icon: <Film size={40} />
    },
    {
      title: "Aulas Particulares",
      desc: "Atendimento personalizado no conforto do seu lar ou em nosso centro de treinamento. Foco 100% no seu pet.",
      icon: <HomeIcon size={40} />
    }
  ];

  return (
    <div className="bg-[#F1F4F8] pt-20 md:pt-36 pb-10 md:pb-16 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 h-[60vh] opacity-35 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=2669&auto=format&fit=crop" 
          alt="Services Background" 
          className="w-full h-full object-cover grayscale brightness-[0.85]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F1F4F8] via-[#F1F4F8]/60 to-transparent opacity-100" />
      </div>

      <div className="container mx-auto relative z-10">
        <header className="mb-10 md:mb-16 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-3 md:mb-4 flex items-center space-x-3">
              <span className="w-8 md:w-10 h-px bg-brand-vibrant/30"></span>
              <span className="text-[10px] uppercase tracking-[0.5em] text-brand-dark/70 font-semibold">Soluções para seu Pet</span>
            </div>
            
            <h1 className="text-brand-dark text-4xl md:text-7xl font-bold uppercase tracking-tighter mb-4 md:mb-6 leading-[0.85]">
              Serviços <br /><span className="text-highlight">especializados</span>
            </h1>
            <p className="text-brand-dark/85 text-xs md:text-sm uppercase tracking-[0.3em] max-w-2xl px-6 md:px-0 font-medium">
              Soluções completas de adestramento de cães em Novo Hamburgo, São Leopoldo, Porto Alegre e cidades vizinhas. Atendimento personalizado para o bem-estar do seu pet.
            </p>
          </motion.div>
        </header>
      </div>

      <div className="container mx-auto px-6 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-brand-dark/5 border border-brand-dark/5">
          {services.map((service, idx) => (
            <motion.div 
               key={idx}
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               className="p-6 md:p-10 bg-white group hover:bg-brand-soft/20 transition-all duration-700"
            >
              <div className="flex justify-between items-start mb-6 md:mb-10">
                <div className="text-brand-vibrant/25 text-3.5xl md:text-5xl font-black tracking-tighter">0{idx + 1}</div>
                <div className="w-10 h-10 md:w-12 md:h-12 border border-brand-vibrant/20 rounded-full flex items-center justify-center text-brand-vibrant group-hover:bg-brand-vibrant group-hover:text-white group-hover:rotate-12 transition-all">
                   {React.cloneElement(service.icon as React.ReactElement, { size: 18, className: 'md:w-5 md:h-5' })}
                </div>
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-brand-dark mb-3 underline underline-offset-[8px] decoration-brand-soft">{service.title}</h3>
              <p className="text-brand-dark/90 text-sm md:text-base leading-snug mb-6 md:mb-8 font-medium">
                {service.desc}
              </p>
              
              <div className="flex items-center justify-end">
                <MotionLink 
                  to="/contato" 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-outline py-2.5 px-6 text-[10px] group-hover:bg-brand-vibrant group-hover:text-white"
                >
                  Saiba Mais
                </MotionLink>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info Box */}
        <div className="mt-10 md:mt-16 p-8 md:p-12 bg-white rounded-[24px] text-center border border-brand-dark/5 mx-6 md:mx-0 shadow-md">
          <h2 className="text-brand-dark text-2xl md:text-4xl font-black uppercase tracking-tighter mb-4 leading-none">Não sabe por onde começar?</h2>
          <p className="text-brand-dark/80 text-xs md:text-sm max-w-2xl mx-auto mb-6 md:mb-8 leading-snug font-medium">Oferecemos uma avaliação gratuita para diagnosticar o comportamento do seu pet e sugerir o melhor plano.</p>
          <MotionLink 
            to="/avaliacao" 
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0, 118, 255, 0.2)' }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary inline-block px-6 md:px-10 py-3 md:py-5"
          >
            Solicite sua Avaliação
          </MotionLink>
        </div>
      </div>
    </div>
  );
}
