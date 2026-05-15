import React from 'react';
import { motion } from 'motion/react';
import { Dog, Star, Heart, Users, ShieldCheck, Home as HomeIcon, Droplets, Film } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Services() {
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
    <div className="bg-[#0F0F0F] pt-48 pb-20">
      <div className="container mx-auto">
        <header className="mb-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-6 flex items-center space-x-4">
              <span className="w-10 h-px bg-white/30"></span>
              <span className="text-[10px] uppercase tracking-[0.5em] text-white/40">Soluções para seu Pet</span>
            </div>
            
            <h1 className="text-white text-6xl md:text-8xl font-bold uppercase tracking-tighter mb-12 leading-[0.85]">
              Serviços <br /><span className="text-highlight">especializados</span>
            </h1>
            <p className="text-white/30 text-xs uppercase tracking-[0.3em] max-w-2xl">
              Soluções completas de adestramento de cães em Novo Hamburgo, São Leopoldo, Porto Alegre e cidades vizinhas. Atendimento personalizado para o bem-estar do seu pet.
            </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="p-16 bg-[#0F0F0F] group hover:bg-[#0A0A0A] transition-all duration-700"
            >
              <div className="flex justify-between items-start mb-16">
                <div className="text-white/10 text-6xl font-black tracking-tighter">0{idx + 1}</div>
                <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center text-white/40 group-hover:text-white group-hover:border-white group-hover:rotate-12 transition-all">
                   {React.cloneElement(service.icon as React.ReactElement, { size: 24 })}
                </div>
              </div>
              
              <h3 className="text-3xl font-bold uppercase tracking-tight text-white mb-6 underline underline-offset-[12px] decoration-white/10">{service.title}</h3>
              <p className="text-white/40 text-lg leading-relaxed mb-12 font-light">
                {service.desc}
              </p>
              
              <div className="flex items-center justify-end">
                <Link to="/contato" className="btn-outline group-hover:bg-white group-hover:text-black">
                  Saiba Mais
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info Box */}
        <div className="mt-32 p-12 md:p-20 bg-[#0F0F0F] rounded-[48px] text-center">
          <h2 className="text-white text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8">Não sabe por onde começar?</h2>
          <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-12">Oferecemos uma avaliação gratuita para diagnosticar o comportamento do seu pet e sugerir o melhor plano.</p>
          <Link to="/contato" className="inline-block bg-white text-[#0F0F0F] px-12 py-6 rounded-[16px] font-bold uppercase tracking-widest hover:scale-105 transition-all">Solicite sua Avaliação</Link>
        </div>
      </div>
    </div>
  );
}
