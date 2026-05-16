import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Dog, Star, Heart, Award, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
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
    <div className="bg-[#0F0F0F]">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center overflow-hidden border-b border-white/5">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2669&auto=format&fit=crop" 
            alt="Dog Training" 
            className="w-full h-full object-cover grayscale brightness-[0.2]"
          />
          {/* Large Abstract Background Text */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 select-none pointer-events-none">
            <span className="text-[40vw] font-black uppercase tracking-tighter">DOG</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent opacity-90" />
        </div>

        <div className="container mx-auto relative z-10 pt-24 md:pt-56">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-8 flex items-center space-x-4">
                <span className="w-12 h-px bg-white/30"></span>
                <span className="text-[10px] uppercase tracking-[0.4em] text-white/50">Novo Hamburgo, RS</span>
              </div>
              
              <h1 className="text-white text-6xl md:text-8xl font-bold uppercase tracking-tighter mb-12 leading-[0.85]">
                Cão Meu Amigo<br />
                <span className="text-highlight">adestramento</span>
              </h1>
              <p className="sr-only">Especialista em adestramento de cães no Vale do Sinos, Novo Hamburgo e São Leopoldo.</p>
              <p className="text-white text-sm md:text-2xl font-bold uppercase tracking-[0.3em] mb-12">Treinamento de Cães no Vale do Sinos</p>
              
              <p className="text-white/50 text-lg md:text-xl max-w-xl mb-12 font-light leading-relaxed">
                Adestramento de cães em Novo Hamburgo, São Leopoldo e toda região metropolitana. Treinando cães para o futuro.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8">
                <Link 
                  to="/contato"
                  className="btn-primary w-full sm:w-auto text-center"
                >
                  Quero Adestrar Meu Cão
                </Link>
                <Link 
                  to="/servicos"
                  className="btn-outline w-full sm:w-auto text-center"
                >
                  Ver Serviços
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4 opacity-20">
          <span className="text-[9px] uppercase tracking-[0.4em]">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </section>

      {/* Services Preview - Dark High End Version */}
      <section className="pt-20 md:pt-40 pb-12 bg-[#0A0A0A] relative border-b border-white/5">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-20">
            <div className="lg:col-span-5 px-6">
              <span className="text-white/20 text-[10px] font-bold uppercase tracking-[0.5em] mb-6 block">Especialidades</span>
              <h2 className="text-white text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-none mb-10">
                O que <br />fazemos <br /><span className="text-highlight text-4xl md:text-6xl">por eles.</span>
              </h2>
              <p className="text-white/40 text-lg leading-relaxed mb-12 font-light">
                Metodologias modernas que respeitam a individualidade biológica e comportamental de cada animal.
              </p>
              <Link to="/servicos" className="inline-flex items-center text-white text-xs font-bold uppercase tracking-[0.3em] group">
                Explorar todos <div className="ml-4 w-12 h-px bg-white group-hover:w-20 transition-all"></div>
              </Link>
            </div>
            
            <div className="lg:col-span-7 px-6 space-y-px">
              {services.map((service, idx) => (
                <Link 
                  key={idx}
                  to="/servicos"
                  className="group block py-10 border-b border-white/5 transition-all hover:bg-white/5 hover:px-8"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-8">
                      <span className="text-white/10 text-xl font-mono">0{idx + 1}</span>
                      <h3 className="text-2xl md:text-4xl font-medium tracking-tight text-white group-hover:translate-x-4 transition-transform">{service.title}</h3>
                    </div>
                    <span className="text-white/20 group-hover:text-white transition-colors">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* History Teaser */}
      <section className="pt-8 md:pt-12 pb-16 md:pb-32 bg-[#0F0F0F] text-white">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
          <div className="relative group">
            <div className="aspect-[4/5] rounded-[40px] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2670&auto=format&fit=crop" 
                alt="Adestrador e Cão" 
                className="w-full h-full object-cover grayscale brightness-75 group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Absolute badge */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white rounded-full flex items-center justify-center text-[#0F0F0F] p-4 text-center">
              <div className="text-sm font-bold uppercase tracking-tight">
                18 Anos de <br /> Experiência
              </div>
            </div>
          </div>
          <div>
            <span className="text-white/30 text-sm font-bold uppercase tracking-[0.2em] mb-4 block">Nossa História</span>
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-none">
              Amor e ética em cada treino.
            </h2>
            <p className="text-white/60 text-lg md:text-xl leading-relaxed mb-10 font-light">
              Fundado com a missão de modernizar o adestramento canino no Vale do Sinos, o Cão Meu Amigo foca no bem-estar animal e na comunicação efetiva entre tutor e pet.
            </p>
            <Link 
              to="/historia"
              className="inline-flex items-center space-x-4 group"
            >
              <div className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-[#0F0F0F] transition-all">
                <ChevronRight size={24} />
              </div>
              <span className="text-lg font-bold uppercase tracking-widest">Descubra nossa trajetória</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-32 bg-[#0F0F0F] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/20 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-white/20 rounded-full" />
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-12 leading-[0.85]">
            Pronto para transformar<br /> seu melhor amigo?
          </h2>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/contato"
              className="inline-block bg-white text-[#0F0F0F] px-16 py-8 rounded-[24px] text-xl font-bold uppercase tracking-[0.2em] shadow-2xl"
            >
              Agende Agora
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
