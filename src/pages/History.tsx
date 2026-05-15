import React from 'react';
import { motion } from 'motion/react';

export default function History() {
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
    <div className="bg-[#0F0F0F] pt-48 pb-20 overflow-hidden">
      <div className="container mx-auto">
        <header className="max-w-5xl mb-40 relative">
          <div className="absolute -left-20 top-0 opacity-5 pointer-events-none select-none hidden md:block">
            <span className="text-[200px] font-black uppercase tracking-tighter">OUR STORY</span>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="mb-10 flex items-center space-x-4">
              <span className="w-10 h-px bg-white/20"></span>
              <span className="text-[10px] uppercase tracking-[0.5em] text-white/40">Nossa Trajetória</span>
            </div>
            
            <h1 className="text-white text-6xl md:text-8xl font-bold uppercase tracking-tighter mb-12 leading-[0.85]">
              Uma vida <br /> dedicada <br /><span className="text-highlight">aos cães.</span>
            </h1>
            
            <p className="text-white/40 text-xl font-light leading-relaxed max-w-2xl">
              O Cão Meu Amigo nasceu de uma necessidade real: adestrar com ética, paciência e embasamento científico, sem nunca perder o carinho.
            </p>
          </motion.div>
        </header>

        {/* Timeline - Split View */}
        <section className="relative py-20">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/5 hidden lg:block" />
          
          <div className="space-y-40">
            {timeline.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`relative flex flex-col lg:flex-row items-center ${idx % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}
              >
                {/* Year Badge */}
                <div className="absolute left-1/2 -translate-x-1/2 opacity-10 hidden lg:block text-[80px] font-black tracking-tighter text-white z-0">
                  {item.year === "Hoje" ? "∞" : item.year}
                </div>

                <div className={`w-full lg:w-[45%] relative z-10 ${idx % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                  <div className={`w-16 h-1 bg-white/10 mb-8 hidden lg:block ${idx % 2 === 0 ? 'ml-auto' : ''}`}></div>
                  <h3 className="text-white text-4xl font-bold uppercase tracking-tight mb-4">{item.title}</h3>
                  <p className="text-white/40 text-lg leading-relaxed font-light">{item.desc}</p>
                </div>
                <div className="lg:w-[15%]" />
                <div className="w-full lg:w-[40%] mt-10 lg:mt-0 px-6 max-w-lg mx-auto lg:mx-0">
                  <div className="aspect-[3/2] bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden group">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="pt-40">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            <div className="p-12 border border-white/10 rounded-[40px] hover:bg-white/5 transition-colors">
              <h4 className="text-white text-2xl font-bold uppercase tracking-widest mb-6">Nossa Missão</h4>
              <p className="text-white/40 leading-relaxed italic">"Educar tutores e cães para que vivam em harmonia, priorizando sempre o bem-estar e a comunicação clara."</p>
            </div>
            <div className="p-12 border border-white/10 rounded-[40px] hover:bg-white/5 transition-colors">
              <h4 className="text-white text-2xl font-bold uppercase tracking-widest mb-6">Nossos Valores</h4>
              <p className="text-white/40 leading-relaxed italic">"Ética inegociável, respeito à individualidade de cada cão, paciência infinita e inovação constante."</p>
            </div>
            <div className="p-12 border border-white/10 rounded-[40px] hover:bg-white/5 transition-colors">
              <h4 className="text-white text-2xl font-bold uppercase tracking-widest mb-6">Nosso Futuro</h4>
              <p className="text-white/40 leading-relaxed italic">"Ser a maior referência em adestramento positivo do Sul do Brasil, impactando milhares de vidas."</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
