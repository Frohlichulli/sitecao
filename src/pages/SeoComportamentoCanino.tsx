import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Smile, CheckSquare, PlaySquare, AlertCircle, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SeoComportamentoCanino() {
  useEffect(() => {
    document.title = "Especialistas em Comportamento Canino em Novo Hamburgo | Cão Meu Amigo";
  }, []);

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Cão Meu Amigo - Especialista em Comportamento Canino",
    "telephone": "+5551996566493",
    "email": "fabianofisio@gmail.com",
    "url": "https://caomeuamigo.com.br/comportamento-canino",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Novo Hamburgo",
      "addressRegion": "RS",
      "addressCountry": "BR"
    },
    "description": "Referência em treinamento e comportamento canino no Vale do Sinos, oferecendo atendimento personalizado para cães de pequeno, médio e grande porte.",
    "priceRange": "$$"
  };

  const behaviorProblems = [
    "Cães agressivos e reativos",
    "Ansiedade e estresse",
    "Latidos excessivos e contínuos",
    "Destruição de objetos e móveis",
    "Medos, pânico e inseguranças",
    "Falta de obediência geral",
    "Necessidades fisiológicas no local incorreto",
    "Puxões constantes na guia ao passear",
    "Dificuldade de socialização com pessoas e cães"
  ];

  return (
    <div className="bg-white pt-24 md:pt-48 pb-12 md:pb-24 overflow-hidden relative">
      <script type="application/ld+json">
        {JSON.stringify(schemaMarkup)}
      </script>

      {/* Hero Background Image with Blur */}
      <div className="absolute inset-0 z-0 h-[65vh] opacity-25 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1544568100-847a948585b9?q=80&w=2574&auto=format&fit=crop" 
          alt="Comportamento Canino" 
          className="w-full h-full object-cover grayscale brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
      </div>

      <div className="container mx-auto relative z-10 px-6">
        {/* Breadcrumb */}
        <nav className="text-xs uppercase tracking-widest text-[#002D5F]/60 mb-6 font-medium">
          <Link to="/" className="hover:text-brand-vibrant transition-colors">Início</Link>
          <span className="mx-2">/</span>
          <span className="text-[#002D5F]">Comportamento Canino</span>
        </nav>

        <header className="max-w-4xl mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 bg-brand-soft border border-brand-vibrant/20 px-4 py-2 rounded-full mb-6">
              <Sparkles size={14} className="text-brand-vibrant" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-dark">Psicologia Comportamental</span>
            </div>
            
            <h1 className="text-brand-dark text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6">
              Especialistas em <span className="text-highlight">Comportamento Canino</span>
            </h1>
            
            <p className="text-brand-dark/80 text-lg md:text-xl font-light leading-relaxed">
              A Cão Meu Amigo Adestramento é referência em treinamento, reabilitação e comportamento canino no Vale do Sinos, oferecendo atendimento personalizado conforme as necessidades de cada cão e tutor.
            </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">
          <div className="lg:col-span-8 space-y-12">
            
            {/* Behavior Issues Section */}
            <section className="space-y-6">
              <h2 className="text-brand-dark text-2xl md:text-3xl font-bold uppercase tracking-tight pb-2 border-b border-brand-soft flex items-center gap-2">
                <AlertCircle className="text-brand-vibrant" size={24} /> Desafios Comportamentais Trabalhados
              </h2>
              <p className="text-brand-dark/70 font-light leading-relaxed">
                Trabalhamos com cães de pequeno, médio e grande porte de todas as idades, auxiliando famílias no diagnóstico e tratamento de distúrbios de conduta simples e complexos. Cada caso é avaliado individualmente para a elaboração de um plano personalizado de treinamento.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {behaviorProblems.map((issue, idx) => (
                  <div key={idx} className="flex items-start space-x-3 bg-brand-soft/20 p-4 rounded-xl border border-brand-soft/40">
                    <CheckSquare size={16} className="text-brand-vibrant mt-0.5 shrink-0" />
                    <span className="text-brand-dark/90 text-sm font-medium">{issue}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Toilet Training Section */}
            <section className="bg-brand-soft/30 p-8 md:p-12 rounded-[32px] border border-brand-soft space-y-6">
              <h3 className="text-2xl font-bold uppercase tracking-tight text-brand-dark">Adestramento Sanitário para Cães</h3>
              <p className="text-brand-dark/80 font-light leading-relaxed text-sm">
                O adestramento sanitário ajuda o cão a aprender e rotinar o local correto para fazer suas necessidades fisiológicas, de forma natural e sem punições físicas. Isso reduz significativamente a sujeira e traz imensa harmonia para a rotina familiar.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-bold uppercase tracking-wider text-brand-dark/70 text-center">
                <div className="bg-white px-4 py-3 rounded-xl border border-brand-soft">Filhotes</div>
                <div className="bg-white px-4 py-3 rounded-xl border border-brand-soft">Adultos</div>
                <div className="bg-white px-4 py-3 rounded-xl border border-brand-soft">Apartamentos</div>
                <div className="bg-white px-4 py-3 rounded-xl border border-brand-soft">Casas</div>
                <div className="bg-white px-4 py-3 rounded-xl border border-brand-soft" style={{ gridColumn: 'span 2' }}>Ambientes Internos</div>
              </div>
            </section>

            {/* Special Training Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section className="bg-white border border-brand-soft p-8 rounded-[24px] space-y-4 shadow-sm">
                <Heart className="text-brand-vibrant" size={28} />
                <h3 className="text-brand-dark text-lg font-bold uppercase tracking-tight">Cães para Terapia e Assistência</h3>
                <p className="text-brand-dark/75 font-light text-xs leading-relaxed">
                  A empresa também atua no treinamento especializado de cães de terapia e assistência, preparando animais para atividades de apoio emocional, interação social e auxílio direto em diversas necessidades humanas limitantes.
                </p>
                <div className="text-[10px] font-bold uppercase tracking-widest text-brand-vibrant">
                  Equilíbrio emocional avançado • Controle público • Resposta rápida
                </div>
              </section>

              <section className="bg-white border border-brand-soft p-8 rounded-[24px] space-y-4 shadow-sm">
                <PlaySquare className="text-brand-vibrant" size={28} />
                <h3 className="text-brand-dark text-lg font-bold uppercase tracking-tight">Cães para Publicidade e Cinema</h3>
                <p className="text-brand-dark/75 font-light text-xs leading-relaxed">
                  Possuímos sólida experiência no treinamento de cães de alta performance para comerciais, sessões de publicidade impressa, participação em produções cinematográficas e eventos. Preparados para foco em estúdios barulhentos.
                </p>
                <div className="text-[10px] font-bold uppercase tracking-widest text-brand-vibrant">
                  Audiovisuais • Alta concentração • Adaptação rápida a palcos
                </div>
              </section>
            </div>

          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="bg-brand-dark text-white p-8 rounded-[32px] space-y-6 sticky top-28">
              <HelpCircle className="text-brand-vibrant" size={32} />
              <h4 className="text-xl font-bold uppercase tracking-tight mb-2">Comportamento Equilibrado</h4>
              <p className="text-white/80 text-xs font-light leading-relaxed">
                Muitos desvios de conduta são facilmente resolvidos quando entendemos a psicologia canina e nos comunicamos corretamente com o cão.
              </p>
              <div className="pt-4 border-t border-white/10 space-y-4">
                <div className="flex items-center space-x-3 text-xs">
                  <span className="w-2 h-2 bg-brand-vibrant rounded-full" />
                  <span className="font-light">Avaliação personalizada individual</span>
                </div>
                <div className="flex items-center space-x-3 text-xs">
                  <span className="w-2 h-2 bg-brand-vibrant rounded-full" />
                  <span className="font-light">Aulas presenciais com o tutor</span>
                </div>
                <div className="flex items-center space-x-3 text-xs">
                  <span className="w-2 h-2 bg-brand-vibrant rounded-full" />
                  <span className="font-light">Mais de 18 anos de bagagem teórica</span>
                </div>
              </div>
              <a 
                href="https://wa.me/5551996566493?text=Ol%C3%A1!%20Gostaria%20de%20conversar%20sobre%20comportamento%20canino%20do%20meu%20c%C3%A3o."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0076FF] hover:bg-[#0056b3] transition-all w-full flex items-center justify-center font-bold text-xs uppercase tracking-wider py-4 rounded-xl text-white block mt-6 text-center"
              >
                Inicie Avaliação no WhatsApp
              </a>
            </div>
          </div>
        </div>

        <section className="text-center md:py-8 mt-16">
          <p className="text-brand-dark/50 text-xs leading-relaxed max-w-2xl mx-auto font-light">
            Cão Meu Amigo: Soluções éticas focadas no bem-estar psicológico e físico do animal. Fortaleça seu vínculo de fidelidade com o seu cão.
          </p>
        </section>
      </div>
    </div>
  );
}
