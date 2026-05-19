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
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] md:h-screen w-full flex items-center overflow-hidden border-b border-brand-soft">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2669&auto=format&fit=crop" 
            alt="Dog Training" 
            className="w-full h-full object-cover grayscale brightness-[0.7] opacity-20"
          />
          {/* Large Abstract Background Text */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 select-none pointer-events-none">
            <span className="text-[40vw] font-black uppercase tracking-tighter text-brand-blue">DOG</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-90" />
        </div>

        <div className="container mx-auto relative z-10 pt-20 md:pt-56">
          <div className="max-w-4xl px-6 md:px-0">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-6 md:mb-8 flex items-center space-x-4">
                <span className="w-10 md:w-12 h-px bg-brand-vibrant/30"></span>
                <span className="text-[10px] uppercase tracking-[0.4em] text-brand-dark/70">Novo Hamburgo, RS</span>
              </div>
              
              <h1 className="text-brand-dark text-5xl md:text-8xl font-bold uppercase tracking-tighter mb-8 md:mb-12 leading-[0.85]">
                Cão Meu Amigo<br />
                <span className="text-highlight">adestramento</span>
              </h1>
              <p className="text-brand-vibrant text-xs md:text-2xl font-bold uppercase tracking-[0.3em] mb-8 md:mb-12">Treinamento de Cães no Vale do Sinos</p>
              
              <p className="text-brand-dark/80 text-base md:text-xl max-w-xl mb-10 md:mb-12 font-light leading-relaxed">
                Adestramento de cães em Novo Hamburgo, São Leopoldo e toda região metropolitana. Treinando cães para o futuro.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8">
                <MotionLink 
                  to="/contato"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary w-full sm:w-auto text-center py-5 md:py-6"
                >
                  Quero Adestrar Meu Cão
                </MotionLink>
                <MotionLink 
                  to="/servicos"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-outline w-full sm:w-auto text-center py-5 md:py-6"
                >
                  Ver Serviços
                </MotionLink>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4 opacity-30">
          <span className="text-[9px] uppercase tracking-[0.4em] text-brand-dark">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-brand-vibrant to-transparent"></div>
        </div>
      </section>

      <section className="pt-16 md:pt-40 pb-12 bg-white relative border-b border-brand-soft">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-20">
            <div className="lg:col-span-5 px-6">
              <span className="text-brand-vibrant text-[10px] font-bold uppercase tracking-[0.5em] mb-4 md:mb-6 block">Especialidades</span>
              <h2 className="text-brand-dark text-4xl md:text-7xl font-bold uppercase tracking-tighter leading-none mb-8 md:mb-10">
                O que <br />fazemos <br /><span className="text-highlight text-3xl md:text-6xl">por eles.</span>
              </h2>
              <p className="text-brand-dark/70 text-base md:text-lg leading-relaxed mb-10 md:mb-12 font-light">
                Metodologias modernas que respeitam a individualidade biológica e comportamental de cada animal.
              </p>
              <MotionLink 
                to="/servicos" 
                whileHover={{ scale: 1.05, x: 10 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center text-brand-vibrant text-xs font-bold uppercase tracking-[0.3em] group"
              >
                Explorar todos <div className="ml-4 w-12 h-px bg-brand-vibrant group-hover:w-20 transition-all"></div>
              </MotionLink>
            </div>
            
            <div className="lg:col-span-7 px-6 space-y-px">
              {services.map((service, idx) => (
                <MotionLink 
                  key={idx}
                  to="/servicos"
                  whileHover={{ x: 10, backgroundColor: 'rgba(0, 86, 179, 0.05)' }}
                  whileTap={{ scale: 0.98 }}
                  className="group block py-8 md:py-10 border-b border-brand-soft transition-all hover:px-8"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-6 md:space-x-8">
                      <span className="text-brand-vibrant/60 text-lg md:text-xl font-mono">0{idx + 1}</span>
                      <h3 className="text-xl md:text-4xl font-medium tracking-tight text-brand-dark group-hover:translate-x-4 transition-transform">{service.title}</h3>
                    </div>
                    <span className="text-brand-vibrant/60 group-hover:text-brand-vibrant transition-colors">→</span>
                  </div>
                </MotionLink>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pt-8 md:pt-12 pb-16 md:pb-32 bg-brand-soft text-brand-dark overflow-hidden">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
          <div className="relative group">
            <div className="aspect-[4/5] rounded-[32px] md:rounded-[40px] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2670&auto=format&fit=crop" 
                alt="Adestrador e Cão" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Absolute badge */}
            <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 w-32 h-32 md:w-40 md:h-40 bg-brand-vibrant rounded-full flex items-center justify-center text-white p-4 text-center shadow-2xl">
              <div className="text-[10px] md:text-sm font-bold uppercase tracking-tight">
                18 Anos de <br /> Experiência
              </div>
            </div>
          </div>
          <div className="pt-8 md:pt-0">
            <span className="text-brand-vibrant text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-4 block">Nossa História</span>
            <h2 className="text-3xl md:text-7xl font-black uppercase tracking-tighter mb-6 md:mb-8 leading-none text-brand-dark">
              Amor e ética em cada treino.
            </h2>
            <p className="text-brand-dark/80 text-base md:text-xl leading-relaxed mb-8 md:mb-10 font-light">
              Fundado com a missão de modernizar o adestramento canino no Vale do Sinos, o Cão Meu Amigo foca no bem-estar animal e na comunicação efetiva entre tutor e pet.
            </p>
            <MotionLink 
              to="/historia"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-3 md:space-x-4 group"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 border border-brand-vibrant/20 rounded-full flex items-center justify-center group-hover:bg-brand-vibrant group-hover:text-white transition-all">
                <ChevronRight size={20} className="md:w-6 md:h-6" />
              </div>
              <span className="text-sm md:text-lg font-bold uppercase tracking-widest text-brand-dark/70 group-hover:text-brand-vibrant">Descubra nossa trajetória</span>
            </MotionLink>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] border border-brand-vibrant rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[1200px] h-[600px] md:h-[1200px] border border-brand-vibrant rounded-full" />
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter text-brand-dark mb-10 md:mb-12 leading-[0.85]">
            Pronto para transformar<br /> seu melhor amigo?
          </h2>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/avaliacao"
              className="inline-block bg-brand-vibrant text-white px-10 md:px-16 py-6 md:py-8 rounded-[16px] md:rounded-[24px] text-base md:text-xl font-bold uppercase tracking-[0.2em] shadow-2xl shadow-brand-vibrant/30"
            >
              Começar Avaliação
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
