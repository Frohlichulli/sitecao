import React, { useEffect } from 'react';
import { motion } from 'motion/react';

export default function History() {
  useEffect(() => {
    document.title = "Nossa História | Cão Meu Amigo Adestramento";
  }, []);

  const timeline = [
    {
      year: "2008",
      title: "As Primeiras Patas",
      desc: "Nascemos da paixão por cães e da necessidade de um adestramento que respeitasse o animal, unindo técnica e carinho.",
      image: "https://images.unsplash.com/photo-1591160690555-5debfba289f0?q=80&w=2000&auto=format&fit=crop"
    },
    {
      year: "2014",
      title: "Expansão em Novo Hamburgo",
      desc: "Consolidamos nossa presença no Vale do Sinos, atendendo centenas de famílias de forma personalizada.",
      image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2000&auto=format&fit=crop"
    },
    {
      year: "2020",
      title: "Inovação e Ciência",
      desc: "Aperfeiçoamos nossa metodologia com as mais modernas técnicas de reforço positivo ao redor do mundo.",
      image: "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?q=80&w=2000&auto=format&fit=crop"
    },
    {
      year: "Hoje",
      title: "Referência no Estado",
      desc: "Com 18 anos de trajetória, somos referência absoluta em adestramento comportamental e bem-estar canino.",
      image: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=2000&auto=format&fit=crop"
    }
  ];

  return (
    <div className="bg-[#F1F4F8] pt-20 md:pt-36 pb-10 md:pb-16 overflow-hidden relative">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 h-[60vh] opacity-35 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=2671&auto=format&fit=crop" 
          alt="History Background" 
          className="w-full h-full object-cover grayscale brightness-[0.85]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F1F4F8] via-[#F1F4F8]/60 to-transparent opacity-100" />
      </div>

      <div className="container mx-auto relative z-10">
        <header className="max-w-5xl mb-12 md:mb-16 relative px-6 md:px-0">
          <div className="absolute -left-10 md:-left-20 top-0 opacity-5 pointer-events-none select-none">
            <span className="text-[100px] md:text-[200px] font-black uppercase tracking-tighter text-brand-blue">STORY</span>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="mb-4 md:mb-6 flex items-center space-x-3">
              <span className="w-8 md:w-10 h-px bg-brand-vibrant/30"></span>
              <span className="text-[10px] uppercase tracking-[0.5em] text-brand-dark/70 font-semibold">Nossa Trajetória</span>
            </div>
            
            <h1 className="text-brand-dark text-4xl md:text-7xl font-bold uppercase tracking-tighter mb-4 md:mb-6 leading-[0.85]">
              Uma vida <br /> dedicada <br /><span className="text-highlight">aos cães.</span>
            </h1>
            
            <p className="text-brand-dark/95 text-base md:text-lg font-medium leading-snug max-w-2xl px-0">
              O Cão Meu Amigo nasceu de uma necessidade real: adestrar com ética, paciência e embasamento científico, sem nunca perder o carinho.
            </p>
          </motion.div>
        </header>

        {/* Timeline - Split View */}
        <section className="relative py-4 md:py-8 px-6 md:px-0">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-brand-dark/10 hidden lg:block" />
          
          <div className="space-y-12 md:space-y-16">
            {timeline.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`relative flex flex-col lg:flex-row items-center ${idx % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}
              >
                {/* Year Badge */}
                <div className="absolute left-1/2 -translate-x-1/2 opacity-5 hidden lg:block text-[80px] font-black tracking-tighter text-brand-blue z-0">
                  {item.year === "Hoje" ? "∞" : item.year}
                </div>
 
                <div className={`w-full lg:w-[55%] relative z-10 ${idx % 2 === 0 ? 'lg:text-right' : 'lg:text-left'} text-left`}>
                  <div className={`w-12 h-1 bg-brand-vibrant/20 mb-4 hidden lg:block ${idx % 2 === 0 ? 'ml-auto' : ''}`}></div>
                  <div className="flex items-center space-x-4 mb-2 lg:hidden">
                    <span className="text-brand-vibrant font-bold text-xl tabular-nums">{item.year}</span>
                    <div className="h-px flex-grow bg-brand-dark/10"></div>
                  </div>
                  <h3 className="text-brand-dark text-xl md:text-2xl font-bold uppercase tracking-tight mb-2">{item.title}</h3>
                  <p className="text-brand-dark/90 text-sm md:text-base leading-snug font-medium">{item.desc}</p>
                </div>
                <div className="lg:w-[5%]" />
                <div className="w-full lg:w-[30%] mt-4 lg:mt-0">
                  <div className="aspect-[4/3] max-w-[280px] bg-white border border-brand-dark/5 rounded-2xl overflow-hidden group shadow-md mx-auto lg:mx-0">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="pt-12 md:pt-20 px-6 md:px-0 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="p-8 md:p-10 border border-brand-dark/5 rounded-[24px] bg-white/70 hover:bg-white transition-all shadow-sm">
              <h4 className="text-brand-dark text-lg md:text-xl font-bold uppercase tracking-widest mb-4 underline underline-offset-4 decoration-brand-vibrant/20">Nossa Missão</h4>
              <p className="text-brand-dark/90 text-xs md:text-sm leading-snug italic">"Educar tutores e cães para que vivam em harmonia, priorizando sempre o bem-estar e a comunicação clara."</p>
            </div>
            <div className="p-8 md:p-10 border border-brand-dark/5 rounded-[24px] bg-white/70 hover:bg-white transition-all shadow-sm">
              <h4 className="text-brand-dark text-lg md:text-xl font-bold uppercase tracking-widest mb-4 underline underline-offset-4 decoration-brand-vibrant/20">Nossos Valores</h4>
              <p className="text-brand-dark/90 text-xs md:text-sm leading-snug italic">"Ética inegociável, respeito à individualidade de cada cão, paciência infinita e inovação constante."</p>
            </div>
            <div className="p-8 md:p-10 border border-brand-dark/5 rounded-[24px] bg-white/70 hover:bg-white transition-all shadow-sm">
              <h4 className="text-brand-dark text-lg md:text-xl font-bold uppercase tracking-widest mb-4 underline underline-offset-4 decoration-brand-vibrant/20">Nosso Futuro</h4>
              <p className="text-brand-dark/90 text-xs md:text-sm leading-snug italic">"Ser a maior referência em adestramento do Sul do Brasil, impactando milhares de vidas."</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
