import React from 'react';
import { motion } from 'motion/react';
import { ClipboardCheck, ExternalLink } from 'lucide-react';

export default function Assessment() {
  return (
    <div className="bg-[#0F0F0F] pt-24 md:pt-48 pb-10 md:pb-20 min-h-screen">
      <div className="container mx-auto px-6">
        <header className="mb-16 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-[1px] bg-highlight"></div>
              <span className="text-white/40 text-[10px] font-bold uppercase tracking-[0.5em]">Perfil de Comportamento</span>
            </div>
            
            <h1 className="text-white text-6xl md:text-8xl font-bold uppercase tracking-tighter mb-12 leading-[0.85]">
              Ficha de <br /><span className="text-highlight">Avaliação</span>
            </h1>
            
            <p className="text-white/50 text-xl md:text-2xl font-light leading-relaxed max-w-2xl">
              Para entendermos melhor as necessidades do seu cão e traçarmos o melhor plano de treinamento, preencha nossa ficha de perfil comportamental abaixo.
            </p>
          </motion.div>
        </header>

        {/* Assessment Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full h-[800px] bg-[#0A0A0A] rounded-[48px] overflow-hidden border border-white/5 relative group"
        >
          <iframe 
            src="https://paw-print-profile-builder.lovable.app/" 
            className="w-full h-full border-none"
            title="Ficha de Avaliação Comportamental"
          />
          
          {/* Overlay link for external access if needed */}
          <div className="absolute bottom-8 right-8 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            <a 
              href="https://paw-print-profile-builder.lovable.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="pointer-events-auto flex items-center space-x-2 bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest border border-white/10 hover:bg-white hover:text-black transition-all"
            >
              <span>Abrir em aba cheia</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </motion.div>

        {/* Additional Info Box */}
        <div className="mt-16 md:mt-32 p-8 md:p-20 bg-[#0F0F0F] rounded-[48px] text-center border border-white/5">
          <ClipboardCheck className="text-highlight mx-auto mb-8" size={48} />
          <h2 className="text-white text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8">O que acontece após o preenchimento?</h2>
          <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-12">
            Nossa equipe analisará as informações enviadas e entrará em contato em até 24 horas úteis para agendar a primeira visita técnica ou aula experimental.
          </p>
          <div className="flex justify-center">
            <div className="flex items-center space-x-6 text-white/40 text-xs font-bold uppercase tracking-[0.2em]">
              <span>Análise Técnica</span>
              <span className="w-1 h-1 bg-white/20 rounded-full"></span>
              <span>Contato Rápido</span>
              <span className="w-1 h-1 bg-white/20 rounded-full"></span>
              <span>Plano Personalizado</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
