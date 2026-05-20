import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Compass, HeartHandshake, Smile, Search, Phone, Send, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SeoTreinamentoProfissional() {
  useEffect(() => {
    document.title = "Melhor Adestramento de Cães em Novo Hamburgo e Região | Cão Meu Amigo";
  }, []);

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Cão Meu Amigo - Adestramento de Cães Profissional",
    "telephone": "+5551996566493",
    "email": "fabianofisio@gmail.com",
    "url": "https://caomeuamigo.com.br/treinamento-profissional",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Novo Hamburgo",
      "addressRegion": "RS",
      "addressCountry": "BR"
    },
    "description": "Treinamento canino profissional com 18 anos de experiência em Novo Hamburgo e Vale do Sinos.",
    "priceRange": "$$"
  };

  const seoSearchKeywords = [
    "Adestrador de cães em Novo Hamburgo",
    "Adestramento canino no Vale do Sinos",
    "Treinador de cães em São Leopoldo",
    "Escola para cães em Novo Hamburgo",
    "Adestramento sanitário para cães",
    "Treinamento de cães de guarda",
    "Cães para terapia e interações asistidas",
    "Adestrador especializado em comportamento canino"
  ];

  const benefits = [
    { title: "Mais Obediência", desc: "Comandos firmes e claros para organizar os momentos cotidianos." },
    { title: "Redução de Comportamentos Destrutivos", desc: "Esqueça móveis roídos, chinelos destruídos ou quintais cavados." },
    { title: "Melhor Convivência Familiar", desc: "Equilíbrio emocional no lar para harmonizar o convívio diário." },
    { title: "Passeios Mais Tranquilos", desc: "Aprenda a guiar seu cão na rua de forma relaxante, sem puxões na coleira." },
    { title: "Mais Segurança", desc: "Controle total sobre o comportamento do pet para evitar fugas e acidentes." },
    { title: "Melhor Socialização", desc: "Cães tranquilos em contato com novas pessoas, cães e barulhos urbanos." }
  ];

  return (
    <div className="bg-white pt-24 md:pt-48 pb-12 md:pb-24 overflow-hidden relative">
      <script type="application/ld+json">
        {JSON.stringify(schemaMarkup)}
      </script>

      {/* Hero Background Image with Blur */}
      <div className="absolute inset-0 z-0 h-[65vh] opacity-25 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=2462&auto=format&fit=crop" 
          alt="Treinamento Canino Profissional" 
          className="w-full h-full object-cover grayscale brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
      </div>

      <div className="container mx-auto relative z-10 px-6">
        {/* Breadcrumb */}
        <nav className="text-xs uppercase tracking-widest text-[#002D5F]/60 mb-6 font-medium">
          <Link to="/" className="hover:text-brand-vibrant transition-colors">Início</Link>
          <span className="mx-2">/</span>
          <span className="text-[#002D5F]">Treinamento Profissional</span>
        </nav>

        <header className="max-w-4xl mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 bg-brand-soft border border-brand-vibrant/20 px-4 py-2 rounded-full mb-6">
              <Compass size={14} className="text-brand-vibrant" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-dark">Treinamento de Excelência</span>
            </div>
            
            <h1 className="text-brand-dark text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6">
              Treinamento Canino <span className="text-highlight">Profissional</span> em Novo Hamburgo
            </h1>
            
            <p className="text-brand-dark/80 text-lg md:text-xl font-light leading-relaxed">
              A Cão Meu Amigo Adestramento oferece treinamento canino de alta qualidade há mais de 18 anos, ajudando cães e tutores a desenvolverem uma convivência mais tranquila, segura e baseada no respeito mútuo.
            </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">
          <div className="lg:col-span-8 space-y-12">
            
            {/* Benefits Section */}
            <section className="space-y-6">
              <h2 className="text-brand-dark text-2xl md:text-3xl font-bold uppercase tracking-tight pb-2 border-b border-brand-soft flex items-center gap-2">
                <HeartHandshake className="text-brand-vibrant" size={24} /> Benefícios Reais do Adestramento
              </h2>
              <p className="text-brand-dark/70 font-light leading-relaxed">
                O treinamento adequado e ético beneficia não apenas o comportamento visível do cachorro, mas principalmente a sua saúde psicológica e o fortalecimento do vínculo de amizade verdadeira com seus tutores.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl border border-brand-soft shadow-sm space-y-2">
                    <h3 className="text-brand-dark font-bold text-sm uppercase tracking-tight flex items-center gap-2">
                      <span className="w-2 h-2 bg-brand-vibrant rounded-full" />
                      {benefit.title}
                    </h3>
                    <p className="text-brand-dark/70 text-xs font-light leading-relaxed">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="space-y-6">
              <h2 className="text-brand-dark text-2xl md:text-3xl font-bold uppercase tracking-tight pb-2 border-b border-brand-soft">
                Por Que Escolher a Cão Meu Amigo
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="space-y-2">
                  <h4 className="text-[#002D5F] font-bold text-sm uppercase">18 Anos de Bagagem Comprovada</h4>
                  <p className="text-brand-dark/75 font-light text-xs leading-relaxed">Sólida experiência em reabilitação de desvios comportamentais e refinamento de comandos no Rio Grande do Sul.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-[#002D5F] font-bold text-sm uppercase">Atendimento Sob Medida</h4>
                  <p className="text-brand-dark/75 font-light text-xs leading-relaxed">Cada família e cão recebem avaliações individuais completas para alinhar metodologias às reais necessidades.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-[#002D5F] font-bold text-sm uppercase">Ampla Cobertura Regional</h4>
                  <p className="text-brand-dark/75 font-light text-xs leading-relaxed">Atendimento residencial agendado em Novo Hamburgo, São Leopoldo, Campo Bom, Canoas, Estância Velha e mais.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-[#002D5F] font-bold text-sm uppercase">Soluções Completas</h4>
                  <p className="text-brand-dark/75 font-light text-xs leading-relaxed">Desde adestramento higiênico básico, obediência de filhotes, cães de guarda e assistência até preparação de cinema.</p>
                </div>
              </div>
            </section>

            {/* Google / SEO Search terms section (Hidden visual aspect - formatted as real local resource map) */}
            <section className="bg-brand-soft/30 p-8 rounded-3xl border border-brand-soft space-y-6">
              <h3 className="text-brand-dark font-bold text-lg uppercase tracking-tight flex items-center gap-2">
                <Search className="text-brand-vibrant" size={18} /> SEO Local e Busca de Serviços Caninos
              </h3>
              <p className="text-brand-dark/70 font-light text-xs leading-relaxed">
                Se você está na região de Novo Hamburgo e Vale do Sinos buscando ajuda técnica para o seu cão, saiba que oferecemos soluções completas alinhadas às seguintes pesquisas comuns:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-medium text-brand-dark/80 bg-white p-6 rounded-2xl border border-brand-soft/50">
                {seoSearchKeywords.map((keyword, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <span className="text-brand-vibrant">•</span>
                    <span>{keyword}</span>
                  </div>
                ))}
              </div>
            </section>

          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="bg-brand-vibrant text-white p-8 rounded-[32px] space-y-6 sticky top-28">
              <Info size={32} />
              <h4 className="text-lg font-bold uppercase tracking-tight">Cão Meu Amigo</h4>
              <p className="text-white/85 text-xs font-light leading-relaxed">
                Toda grande amizade precisa de uma base sólida de diálogo e compreensão mútua. Nós ensinamos você a ouvir e guiar o seu cão.
              </p>
              <div className="space-y-3 pt-4 border-t border-white/10">
                <p className="text-xs">✔ 18 anos de experiência prática</p>
                <p className="text-xs">✔ Atendimento em Porto Alegre e Vale do Sinos</p>
                <p className="text-xs">✔ Métodos modernos e não-punitivos</p>
              </div>
              <a 
                href="https://wa.me/5551996566493?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20as%20aulas%20de%20adestramento%20profissional."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-brand-soft transition-all text-brand-dark w-full flex items-center justify-center font-bold text-xs uppercase tracking-wider py-4 rounded-xl text-center block mt-6"
              >
                Chame pelo WhatsApp
              </a>
            </div>
          </div>
        </div>

        <section className="text-center md:py-8 mt-16">
          <p className="text-brand-dark/50 text-xs leading-relaxed max-w-2xl mx-auto font-light">
            Cão Meu Amigo Adestramento: O melhor treinamento canino profissional focado em inteligência, autocontrole e socialização harmoniosa.
          </p>
        </section>
      </div>
    </div>
  );
}
