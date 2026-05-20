import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Star, Users, MapPin, Phone, Mail, Award, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SeoAdestramentoNovoHamburgo() {
  useEffect(() => {
    document.title = "Adestramento de Cães em Novo Hamburgo e Vale do Sinos | Cão Meu Amigo";
  }, []);

  // Structural Schema Markup for Search Bots (Google, AI Indexers, etc.)
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Cão Meu Amigo Adestramento",
    "image": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=1000&auto=format&fit=crop",
    "telephone": "+5551996566493",
    "email": "fabianofisio@gmail.com",
    "url": "https://caomeuamigo.com.br",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Novo Hamburgo",
      "addressRegion": "RS",
      "addressCountry": "BR"
    },
    "description": "Atuando há 18 anos oferecendo serviços especializados de adestramento de cães em Novo Hamburgo, São Leopoldo, Campo Bom, Estância Velha, Canoas e toda a região do Vale do Sinos.",
    "priceRange": "$$",
    "areaServed": [
      "Novo Hamburgo",
      "São Leopoldo",
      "Campo Bom",
      "Sapiranga",
      "Estância Velha",
      "Dois Irmãos",
      "Canoas",
      "Ivoti",
      "Portão",
      "Vale do Sinos"
    ]
  };

  return (
    <div className="bg-white pt-24 md:pt-48 pb-12 md:pb-24 overflow-hidden relative">
      {/* Schema Injection */}
      <script type="application/ld+json">
        {JSON.stringify(schemaMarkup)}
      </script>

      {/* Hero Background Image with Blur */}
      <div className="absolute inset-0 z-0 h-[65vh] opacity-25 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=2670&auto=format&fit=crop" 
          alt="Adestramento em Novo Hamburgo" 
          className="w-full h-full object-cover grayscale brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
      </div>

      <div className="container mx-auto relative z-10 px-6">
        {/* Breadcrumb for crawler readability */}
        <nav className="text-xs uppercase tracking-widest text-[#002D5F]/60 mb-6 font-medium">
          <Link to="/" className="hover:text-brand-vibrant transition-colors">Início</Link>
          <span className="mx-2">/</span>
          <span className="text-[#002D5F]">Adestramento Novo Hamburgo</span>
        </nav>

        <header className="max-w-4xl mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 bg-brand-soft border border-brand-vibrant/20 px-4 py-2 rounded-full mb-6">
              <Award size={14} className="text-brand-vibrant" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-dark">18 Anos de Tradição</span>
            </div>
            
            <h1 className="text-brand-dark text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6">
              Adestramento de Cães em <span className="text-highlight">Novo Hamburgo</span> e Vale do Sinos
            </h1>
            
            <p className="text-brand-dark/80 text-lg md:text-xl font-light leading-relaxed mb-6">
              A Cão Meu Amigo Adestramento atua há 18 anos oferecendo serviços especializados de adestramento de cães em Novo Hamburgo, São Leopoldo, Campo Bom, Estância Velha, Canoas, Sapiranga e toda a região do Vale do Sinos.
            </p>
          </motion.div>
        </header>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 mb-16">
          <div className="lg:col-span-8 space-y-12">
            
            <section className="space-y-6">
              <h2 className="text-brand-dark text-2xl md:text-3xl font-bold uppercase tracking-tight pb-2 border-b border-brand-soft">
                Serviços de Adestramento Disponíveis
              </h2>
              <p className="text-brand-dark/70 font-light leading-relaxed">
                Com profunda experiência em comportamento canino, obediência, socialização e treinamento avançado, a empresa desenvolve métodos personalizados para cada cão e família, respeitando o perfil comportamental do animal e os objetivos dos tutores.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                {/* Basic Card */}
                <div className="bg-brand-soft/30 p-8 rounded-[24px] border border-brand-soft space-y-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-vibrant shadow-sm">
                    <CheckCircle2 size={24} />
                  </div>
                  <h3 className="text-brand-dark text-lg font-bold uppercase tracking-tight">Adestramento Básico</h3>
                  <p className="text-brand-dark/70 font-light text-sm leading-relaxed">
                    Indicado para cães filhotes e adultos que precisam aprender comandos essenciais e melhorar o convívio familiar. Auxilia na redução de comportamentos indesejados.
                  </p>
                  <ul className="text-xs space-y-2 text-brand-dark/70 font-medium pt-2">
                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-brand-vibrant rounded-full mr-2" /> Sentar, Deitar e Ficar</li>
                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-brand-vibrant rounded-full mr-2" /> Caminhar sem puxar a guia</li>
                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-brand-vibrant rounded-full mr-2" /> Vir quando chamado</li>
                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-brand-vibrant rounded-full mr-2" /> Controle de ansiedade & Socialização</li>
                  </ul>
                </div>

                {/* Advanced Card */}
                <div className="bg-brand-soft/30 p-8 rounded-[24px] border border-brand-soft space-y-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-vibrant shadow-sm">
                    <Star size={24} />
                  </div>
                  <h3 className="text-brand-dark text-lg font-bold uppercase tracking-tight">Adestramento Avançado</h3>
                  <p className="text-brand-dark/70 font-light text-sm leading-relaxed">
                    Indicado para cães que já possuem obediência básica e precisam de comandos precisos e controle robusto em ambientes externos e situações diversas.
                  </p>
                  <ul className="text-xs space-y-2 text-brand-dark/70 font-medium pt-2">
                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-brand-vibrant rounded-full mr-2" /> Obediência à distância</li>
                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-brand-vibrant rounded-full mr-2" /> Controle completo sem guia</li>
                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-brand-vibrant rounded-full mr-2" /> Permanência prolongada</li>
                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-brand-vibrant rounded-full mr-2" /> Alto nível de concentração</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-brand-dark text-white p-8 md:p-12 rounded-[32px] space-y-6">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-2xl font-bold uppercase tracking-tight">Treinamento de Guarda e Proteção</h3>
              <p className="text-white/80 font-light leading-relaxed text-sm">
                Realizado com extrema responsabilidade e avaliação comportamental individual. O objetivo é desenvolver a segurança, o autocontrole e a proteção patrimonial sem estimular agressividade desnecessária no animal.
              </p>
              <div className="grid grid-cols-2 gap-4 text-xs font-medium uppercase tracking-widest text-white/70">
                <div className="flex items-center"><span className="w-2 h-2 bg-brand-vibrant rounded-full mr-2" /> Residências</div>
                <div className="flex items-center"><span className="w-2 h-2 bg-brand-vibrant rounded-full mr-2" /> Empresas</div>
                <div className="flex items-center"><span className="w-2 h-2 bg-brand-vibrant rounded-full mr-2" /> Chácaras</div>
                <div className="flex items-center"><span className="w-2 h-2 bg-brand-vibrant rounded-full mr-2" /> Segurança Familiar</div>
              </div>
            </section>

          </div>

          <div className="lg:col-span-4 space-y-8">
            {/* Location Card */}
            <div className="bg-brand-soft/50 p-8 rounded-[32px] border border-brand-soft space-y-6">
              <div className="flex items-center space-x-3 text-brand-dark">
                <MapPin className="text-brand-vibrant" size={20} />
                <h4 className="text-sm font-bold uppercase tracking-wider">Cidades Atendidas</h4>
              </div>
              <p className="text-brand-dark/70 text-xs font-light leading-relaxed">
                A equipe atende a domicílio ou em ambientes programados no Vale do Sinos:
              </p>
              <div className="grid grid-cols-1 gap-2 text-xs font-semibold text-brand-dark/80">
                {['Novo Hamburgo', 'São Leopoldo', 'Campo Bom', 'Sapiranga', 'Estância Velha', 'Dois Irmãos', 'Canoas', 'Ivoti', 'Portão', 'Vale do Sinos'].map((city) => (
                  <div key={city} className="flex items-center">
                    <span className="w-1 h-1 bg-brand-vibrant rounded-full mr-3" />
                    {city}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Contact Card */}
            <div className="bg-brand-vibrant text-white p-8 rounded-[32px] space-y-6 shadow-xl shadow-brand-vibrant/20">
              <h4 className="text-lg font-bold uppercase tracking-tight">Agende um Treinamento</h4>
              <p className="text-white/80 text-xs font-light leading-relaxed">
                Entre em contato direto pelo WhatsApp de forma prática para avaliar o comportamento do seu companheiro.
              </p>
              <div className="space-y-4">
                <a 
                  href="https://wa.me/5551996566493?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20o%20adestramento%20em%20Novo%20Hamburgo." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white text-brand-dark hover:bg-brand-soft transition-all w-full flex items-center justify-center font-bold text-xs uppercase tracking-wider py-4 rounded-xl shadow-sm"
                >
                  <Phone size={14} className="mr-2" /> (51) 99656-6493
                </a>
                <Link 
                  to="/contato"
                  className="border border-white/30 hover:bg-white/10 transition-all w-full flex items-center justify-center font-bold text-xs uppercase tracking-wider py-4 rounded-xl"
                >
                  Fila de Solicitação
                </Link>
              </div>
            </div>
          </div>
        </div>

        <section className="text-center md:py-8">
          <p className="text-brand-dark/50 text-xs leading-relaxed max-w-2xl mx-auto font-light">
            O trabalho desenvolvido pela Cão Meu Amigo Adestramento é amplamente reconhecido no Vale do Sinos e na Região Metropolitana pelo comprometimento ético, dedicação à saúde mental do animal e resultados rápidos e duradouros.
          </p>
        </section>
      </div>
    </div>
  );
}
