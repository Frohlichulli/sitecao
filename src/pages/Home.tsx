import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Dog, Star, Heart, Award, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MotionLink = motion(Link);

export default function Home() {
  useEffect(() => {
    document.title = "Cão Meu Amigo | Adestramento de Cães Profissional";
  }, []);

  const services = [
    {
      title: "Adestramento Básico",
      desc: "Comandos essenciais e comportamento no dia a dia.",
      icon: <Dog className="w-8 h-8" />
    },
    {
      title: "Adestramento Avançado",
      desc: "Truques e controle total em qualquer ambiente.",
      icon: <Star className="w-8 h-8" />
    },
    {
      title: "Socialização",
      desc: "Aprenda a conviver harmoniosamente com outros cães.",
      icon: <Heart className="w-8 h-8" />
    }
  ];

  return (
    <div className="bg-brand-bg">
      {/* Hero Section */}
      <section className="relative h-[85vh] md:h-screen w-full flex items-center overflow-hidden border-b border-brand-dark/10 bg-brand-dark">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2669&auto=format&fit=crop" 
            alt="Dog Training" 
            className="w-full h-full object-cover filter contrast-[1.2] brightness-[0.8] opacity-75"
          />
          {/* Dark Overlay specifically requested rgba(5,20,45,0.55) */}
          <div className="absolute inset-0 bg-[#05142D]/55 mix-blend-multiply z-10" />
          
          {/* Large Abstract Background Text */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 select-none pointer-events-none z-10">
            <span className="text-[40vw] font-black uppercase tracking-tighter text-brand-highlight/20">DOG</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/30 to-transparent opacity-90 z-15" />
        </div>

        <div className="container mx-auto relative z-20 pt-20 md:pt-40">
          <div className="max-w-4xl px-6 md:px-0">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-4 md:mb-6 flex items-center space-x-4">
                <span className="w-10 md:w-12 h-px bg-brand-highlight/55"></span>
                <span className="text-[10px] uppercase tracking-[0.4em] text-brand-highlight font-bold">Novo Hamburgo, RS</span>
              </div>
              
              <h1 className="text-white text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6 md:mb-8 leading-[0.85] drop-shadow-md">
                Cão Meu Amigo<br />
                <span className="text-brand-highlight italic font-serif lowercase tracking-wide block md:inline">adestramento</span>
              </h1>
              <p className="text-brand-highlight text-xs md:text-xl font-bold uppercase tracking-[0.25em] mb-6 md:mb-8">Treinamento de Cães no Vale do Sinos</p>
              
              <p className="text-white/90 text-base md:text-lg max-w-xl mb-8 md:mb-10 font-medium leading-snug">
                Adestramento de cães em Novo Hamburgo, São Leopoldo e toda região metropolitana. Treinando cães para o futuro.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8">
                <MotionLink 
                  to="/contato"
                  whileHover={{ scale: 1.03, boxShadow: '0 10px 30px rgba(0, 87, 255, 0.4)' }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-primary w-full sm:w-auto text-center py-4 bg-brand-vibrant border border-brand-vibrant/20 shadow-md"
                >
                  Quero Adestrar Meu Cão
                </MotionLink>
                <MotionLink 
                  to="/servicos"
                  whileHover={{ scale: 1.03, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto text-center py-4 px-8 rounded-[12px] border-2 border-white/50 text-white font-bold text-xs uppercase tracking-widest transition-all backdrop-blur-sm"
                >
                  Ver Serviços
                </MotionLink>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-3 opacity-50 z-20">
          <span className="text-[8px] uppercase tracking-[0.4em] text-white">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-brand-highlight to-transparent"></div>
        </div>
      </section>

      <section className="pt-16 md:pt-24 pb-12 bg-brand-bg relative border-b border-brand-dark/5">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
            <div className="lg:col-span-5 px-6 space-y-4">
              <span className="text-brand-vibrant text-[10px] font-extrabold uppercase tracking-[0.5em] block">Especialidades</span>
              <h2 className="text-brand-dark text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight drop-shadow-sm">
                O que <br />fazemos <br /><span className="text-[#2979FF] font-semibold italic text-highlight text-3xl md:text-5xl">por eles.</span>
              </h2>
              <p className="text-brand-dark/90 text-sm md:text-base leading-snug font-medium mb-6">
                Metodologias modernas que respeitam a individualidade biológica e comportamental de cada animal com ética e empatia.
              </p>
              <MotionLink 
                to="/servicos" 
                whileHover={{ scale: 1.05, x: 8 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center text-brand-vibrant text-xs font-bold uppercase tracking-[0.3em] group"
              >
                Explorar todos <div className="ml-4 w-12 h-px bg-brand-vibrant group-hover:w-20 transition-all"></div>
              </MotionLink>
            </div>
            
            <div className="lg:col-span-7 px-6 space-y-4">
              {services.map((service, idx) => (
                <MotionLink 
                  key={idx}
                  to="/servicos"
                  whileHover={{ y: -4, scale: 1.01, backgroundColor: '#FFFFFF', boxShadow: '0 15px 35px rgba(3, 27, 78, 0.08)' }}
                  whileTap={{ scale: 0.99 }}
                  className="group block p-6 md:p-8 bg-white/70 border border-brand-dark/5 rounded-[20px] shadow-sm backdrop-blur-md transition-all duration-300"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-6">
                      <span className="text-brand-vibrant/70 text-base md:text-lg font-mono font-bold">0{idx + 1}</span>
                      <div>
                        <h3 className="text-lg md:text-2xl font-extrabold tracking-tight text-brand-dark leading-tight group-hover:text-brand-vibrant transition-colors">{service.title}</h3>
                        <p className="text-brand-dark/70 text-xs md:text-sm font-medium leading-none mt-1 group-hover:text-brand-dark/90 transition-colors">{service.desc}</p>
                      </div>
                    </div>
                    <span className="text-brand-vibrant/60 group-hover:text-brand-vibrant transition-colors text-lg font-bold">→</span>
                  </div>
                </MotionLink>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-brand-soft/45 text-brand-dark relative overflow-hidden border-b border-brand-dark/5">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="relative group">
            <div className="aspect-[4/5] max-w-[420px] rounded-[24px] md:rounded-[32px] overflow-hidden shadow-xl border border-brand-dark/5 mx-auto">
              <img 
                src="https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2670&auto=format&fit=crop" 
                alt="Adestrador e Cão" 
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
              />
            </div>
            {/* Absolute badge with elevated shadow */}
            <div className="absolute -bottom-4 -right-2 md:-bottom-6 md:-right-4 w-28 h-28 md:w-36 md:h-36 bg-brand-vibrant rounded-full flex items-center justify-center text-white p-3 text-center shadow-lg shadow-brand-vibrant/30 border border-brand-vibrant/25 backdrop-blur-sm z-10">
              <div className="text-[10px] md:text-xs font-extrabold uppercase tracking-tight leading-tight">
                18 Anos de <br /> Experiência
              </div>
            </div>
          </div>
          <div className="pt-4 md:pt-0 space-y-4 max-w-lg">
            <span className="text-brand-vibrant text-xs font-extrabold uppercase tracking-[0.2em] block">Nossa História</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none text-brand-dark drop-shadow-sm">
              Amor e ética em cada treino.
            </h2>
            <p className="text-brand-dark/95 text-sm md:text-base leading-snug font-medium">
              Fundado com a missão de modernizar o adestramento canino no Vale do Sinos, o Cão Meu Amigo foca no bem-estar animal e na comunicação efetiva entre tutor e pet, usando reforço positivo e sensibilidade científica.
            </p>
            <MotionLink 
              to="/historia"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-3 group"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 border border-brand-vibrant/30 rounded-full flex items-center justify-center group-hover:bg-brand-vibrant group-hover:text-white transition-all shadow-md">
                <ChevronRight size={18} />
              </div>
              <span className="text-xs md:text-sm font-extrabold uppercase tracking-widest text-brand-dark/85 group-hover:text-brand-vibrant">Descubra nossa trajetória</span>
            </MotionLink>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-brand-bg relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] border border-brand-vibrant rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[1200px] h-[600px] md:h-[1200px] border border-brand-vibrant rounded-full" />
        </div>
        <div className="container mx-auto px-6 text-center relative z-10 max-w-2xl space-y-6">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-brand-dark leading-none drop-shadow-sm">
            Pronto para transformar<br /> seu melhor amigo?
          </h2>
          <p className="text-brand-dark/85 text-xs md:text-sm leading-snug font-medium max-w-md mx-auto">
            Dê o primeiro passo para uma convivência harmoniosa, feliz e sem estresse com o seu cão através do nosso método comprovado.
          </p>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="pt-2"
          >
            <Link 
              to="/avaliacao"
              className="inline-block bg-brand-vibrant text-white px-8 md:px-12 py-4 md:py-5 rounded-[16px] text-xs md:text-sm font-black uppercase tracking-[0.2em] shadow-lg shadow-brand-vibrant/25 border border-brand-vibrant/10"
            >
              Começar Avaliação
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
