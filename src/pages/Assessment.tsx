import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Dog, 
  Activity, 
  Calendar, 
  ArrowRight, 
  ArrowLeft, 
  Send, 
  CheckCircle2,
  Check,
  Mail
} from 'lucide-react';

const steps = [
  { id: 'tutor', title: 'Sobre Você', icon: <User size={20} /> },
  { id: 'pet', title: 'Sobre o Pet', icon: <Dog size={20} /> },
  { id: 'behavior', title: 'Comportamento', icon: <Activity size={20} /> },
  { id: 'routine', title: 'Rotina e Saúde', icon: <Calendar size={20} /> },
];

export default function Assessment() {
  useEffect(() => {
    document.title = "Ficha de Avaliação | Cão Meu Amigo";
  }, []);

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Tutor
    tutorName: '',
    tutorPhone: '',
    tutorEmail: '',
    tutorAddress: '',
    // Pet
    petName: '',
    petBreed: '',
    petAge: '',
    petSex: 'macho',
    petNeutered: 'sim',
    // Behavior
    energyLevel: '3',
    socialization: [] as string[],
    mainIssues: '',
    goals: '',
    reactivity: [] as string[],
    // Routine
    walksPerDay: '',
    timeAlone: '',
    diet: '',
    healthIssues: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleArrayItem = (field: 'socialization' | 'reactivity', item: string) => {
    setFormData(prev => {
      const arr = prev[field];
      if (arr.includes(item)) {
        return { ...prev, [field]: arr.filter(i => i !== item) };
      }
      return { ...prev, [field]: [...arr, item] };
    });
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const formatMessageText = () => {
    const { 
      tutorName, tutorPhone, tutorEmail, tutorAddress,
      petName, petBreed, petAge, petSex, petNeutered,
      energyLevel, socialization, mainIssues, goals, reactivity,
      walksPerDay, timeAlone, diet, healthIssues
    } = formData;

    return `*FICHA DE AVALIAÇÃO - CÃO MEU AMIGO*\n\n` +
      `*DADOS DO TUTOR*\n` +
      `Nome: ${tutorName}\n` +
      `Telefone: ${tutorPhone}\n` +
      `Email: ${tutorEmail}\n` +
      `Endereço: ${tutorAddress}\n\n` +
      `*DADOS DO PET*\n` +
      `Nome: ${petName}\n` +
      `Raça: ${petBreed}\n` +
      `Idade: ${petAge}\n` +
      `Sexo: ${petSex}\n` +
      `Castrado: ${petNeutered}\n\n` +
      `*COMPORTAMENTO*\n` +
      `Nível de Energia: ${energyLevel}/5\n` +
      `Socialização: ${socialization.join(', ') || 'Nenhuma'}\n` +
      `Reatividade/Desafios: ${reactivity.join(', ') || 'Nenhuma'}\n` +
      `Resumo das Queixas: ${mainIssues}\n` +
      `Objetivos: ${goals}\n\n` +
      `*ROTINA E SAÚDE*\n` +
      `Passeios/dia: ${walksPerDay}\n` +
      `Tempo sozinho: ${timeAlone}\n` +
      `Dieta: ${diet}\n` +
      `Saúde: ${healthIssues}`;
  };

  const handleFinalSubmit = () => {
    const text = formatMessageText();
    const whatsappUrl = `https://wa.me/5551996566493?text=${encodeURIComponent(text)}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    setIsSubmitted(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === steps.length - 1) {
      handleFinalSubmit();
    } else {
      nextStep();
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-brand-soft min-h-screen flex items-center justify-center p-4 md:p-6">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-xl w-full bg-white border border-brand-soft rounded-[32px] md:rounded-[48px] p-8 md:p-12 text-center shadow-2xl"
        >
          <div className="w-16 h-16 md:w-24 md:h-24 bg-[#25D366] rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-2xl">
            <CheckCircle2 className="w-8 h-8 md:w-12 md:h-12 text-white" />
          </div>
          <h2 className="text-brand-dark text-2xl md:text-4xl font-bold uppercase tracking-tighter mb-4 md:mb-6">Avaliação Enviada!</h2>
          <p className="text-brand-dark/80 text-sm md:text-xl font-light leading-relaxed mb-8 md:mb-12">
            Sua ficha técnica foi enviada com sucesso para o WhatsApp: <span className="text-brand-vibrant font-bold">5551996566493</span>. Entraremos em contato em breve.
          </p>
          <div className="space-y-4">
            <button 
              onClick={handleFinalSubmit}
              className="btn-primary w-full py-4 md:py-6 flex items-center justify-center space-x-3 bg-[#25D366] border-none text-white shadow-xl shadow-green-500/20"
            >
              <Send size={18} />
              <span>Abrir WhatsApp Novamente</span>
            </button>
            <button 
              onClick={() => setIsSubmitted(false)}
              className="text-brand-dark/40 hover:text-brand-vibrant text-[10px] md:text-xs font-bold uppercase tracking-widest pt-4 block mx-auto transition-colors"
            >
              Preencher nova ficha
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-white pt-24 md:pt-48 pb-12 md:pb-24 min-h-screen">
      <div className="container mx-auto px-6">
        <header className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-[1px] bg-brand-vibrant"></div>
              <span className="text-brand-dark/50 text-[10px] font-bold uppercase tracking-[0.5em]">Etapa {currentStep + 1} de {steps.length}</span>
            </div>
            
            <h1 className="text-brand-dark text-6xl md:text-8xl font-bold uppercase tracking-tighter mb-8 leading-[0.85]">
              Ficha de <br /><span className="text-highlight">Avaliação</span>
            </h1>
            
            <p className="text-brand-dark/80 text-lg md:text-xl font-medium leading-tight max-w-2xl">
              Dedique alguns minutos para nos contar sobre seu melhor amigo. Essas informações são o alicerce de um treinamento de sucesso.
            </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar Progress - Desktop */}
          <div className="lg:col-span-3 flex flex-col space-y-4">
            {steps.map((step, idx) => (
              <div 
                key={step.id}
                onClick={() => idx < currentStep && setCurrentStep(idx)}
                className={`flex items-center space-x-4 p-6 rounded-[24px] cursor-pointer transition-all ${
                  idx === currentStep 
                    ? 'bg-brand-vibrant text-white shadow-xl shadow-brand-vibrant/20' 
                    : idx < currentStep 
                      ? 'bg-brand-soft text-brand-vibrant' 
                      : 'bg-brand-soft/30 text-brand-dark/40 hover:bg-brand-soft/50'
                }`}
              >
                <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${idx === currentStep ? 'border-white/50' : idx < currentStep ? 'border-brand-vibrant' : 'border-brand-dark/10'}`}>
                  {idx < currentStep ? <Check size={18} /> : step.icon}
                </div>
                <div>
                  <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${idx === currentStep ? 'text-white/60' : 'text-brand-dark/40'}`}>Passo 0{idx + 1}</p>
                  <p className="text-sm font-bold uppercase tracking-tighter">{step.title}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form Area */}
          <div className="lg:col-span-9">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-brand-soft/20 border border-brand-soft rounded-[32px] md:rounded-[48px] p-6 md:p-20 shadow-sm"
            >
              <form onSubmit={handleSubmit}>
                {currentStep === 0 && (
                  <div className="space-y-8 md:space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      <div className="space-y-3 md:space-y-4">
                        <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-brand-dark block">Seu Nome Completo</label>
                        <input 
                          type="text" 
                          name="tutorName"
                          required
                          value={formData.tutorName}
                          onChange={handleInputChange}
                          placeholder="Ex: Fabiano Silva"
                          className="w-full bg-white border-2 border-brand-soft rounded-xl md:rounded-2xl p-4 md:p-6 text-brand-dark text-base md:text-lg outline-none focus:border-brand-vibrant transition-all font-medium placeholder:text-brand-dark/20"
                        />
                      </div>
                      <div className="space-y-3 md:space-y-4">
                        <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-brand-dark block">WhatsApp / Celular</label>
                        <input 
                          type="tel" 
                          name="tutorPhone"
                          required
                          value={formData.tutorPhone}
                          onChange={handleInputChange}
                          placeholder="(51) 99999-9999"
                          className="w-full bg-white border-2 border-brand-soft rounded-xl md:rounded-2xl p-4 md:p-6 text-brand-dark text-base md:text-lg outline-none focus:border-brand-vibrant transition-all font-medium placeholder:text-brand-dark/20"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      <div className="space-y-3 md:space-y-4">
                        <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-brand-dark block">E-mail</label>
                        <input 
                          type="email" 
                          name="tutorEmail"
                          required
                          value={formData.tutorEmail}
                          onChange={handleInputChange}
                          className="w-full bg-white border-2 border-brand-soft rounded-xl md:rounded-2xl p-4 md:p-6 text-brand-dark text-base md:text-lg outline-none focus:border-brand-vibrant transition-all font-medium"
                        />
                      </div>
                      <div className="space-y-3 md:space-y-4">
                        <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-brand-dark block">Cidade / Bairro</label>
                        <input 
                          type="text" 
                          name="tutorAddress"
                          required
                          value={formData.tutorAddress}
                          onChange={handleInputChange}
                          className="w-full bg-white border-2 border-brand-soft rounded-xl md:rounded-2xl p-4 md:p-6 text-brand-dark text-base md:text-lg outline-none focus:border-brand-vibrant transition-all font-medium"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <label className="text-xs font-bold uppercase tracking-widest text-brand-dark block">Nome do Cão</label>
                        <input 
                          type="text" 
                          name="petName"
                          required
                          value={formData.petName}
                          onChange={handleInputChange}
                          className="w-full bg-white border-2 border-brand-soft rounded-2xl p-6 text-brand-dark text-lg outline-none focus:border-brand-vibrant transition-all font-medium"
                        />
                      </div>
                      <div className="space-y-4">
                        <label className="text-xs font-bold uppercase tracking-widest text-brand-dark block">Raça</label>
                        <input 
                          type="text" 
                          name="petBreed"
                          value={formData.petBreed}
                          onChange={handleInputChange}
                          placeholder="SRD, Golden, Border..."
                          className="w-full bg-white border-2 border-brand-soft rounded-2xl p-6 text-brand-dark text-lg outline-none focus:border-brand-vibrant transition-all font-medium placeholder:text-brand-dark/20"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="space-y-4">
                        <label className="text-xs font-bold uppercase tracking-widest text-brand-dark block">Idade</label>
                        <input 
                          type="text" 
                          name="petAge"
                          value={formData.petAge}
                          onChange={handleInputChange}
                          className="w-full bg-white border-2 border-brand-soft rounded-2xl p-6 text-brand-dark text-lg outline-none focus:border-brand-vibrant transition-all font-medium"
                        />
                      </div>
                      <div className="space-y-4">
                        <label className="text-xs font-bold uppercase tracking-widest text-brand-dark block">Sexo</label>
                        <div className="grid grid-cols-2 gap-4">
                          {['macho', 'fêmea'].map(opt => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => setFormData({ ...formData, petSex: opt })}
                              className={`py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${formData.petSex === opt ? 'bg-brand-vibrant text-white' : 'bg-white text-brand-dark border border-brand-soft'}`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <label className="text-xs font-bold uppercase tracking-widest text-brand-dark block">Castrado?</label>
                        <div className="grid grid-cols-2 gap-4">
                          {['sim', 'não'].map(opt => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => setFormData({ ...formData, petNeutered: opt })}
                              className={`py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${formData.petNeutered === opt ? 'bg-brand-vibrant text-white' : 'bg-white text-brand-dark border border-brand-soft'}`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-12">
                     <div className="space-y-4">
                      <label className="text-xs font-bold uppercase tracking-widest text-brand-dark block">Descreva as principais dificuldades comportamentais</label>
                      <textarea 
                        name="mainIssues"
                        required
                        rows={4}
                        value={formData.mainIssues}
                        onChange={handleInputChange}
                        placeholder="Ex: Pula excessivamente, reage a outros cães na guia, destrói objetos..."
                        className="w-full bg-white border-2 border-brand-soft rounded-2xl p-6 text-brand-dark text-lg outline-none focus:border-brand-vibrant transition-all font-medium resize-none placeholder:text-brand-dark/20"
                      />
                    </div>

                    <div className="space-y-6">
                      <label className="text-xs font-bold uppercase tracking-widest text-brand-dark block">Problemas observados</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          'Medo de estranhos', 'Agressão / Rosnados', 'Ansiedade de Separação', 
                          'Puxa muito a guia', 'Pula nas pessoas', 'Muito Latido', 
                          'Guarda de recursos', 'Reatividade a cães', 'Fobia de barulho'
                        ].map(item => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => toggleArrayItem('reactivity', item)}
                            className={`flex items-center space-x-3 p-4 rounded-xl text-[11px] font-bold uppercase tracking-widest text-left transition-all ${formData.reactivity.includes(item) ? 'bg-brand-vibrant/10 text-brand-vibrant border-2 border-brand-vibrant' : 'bg-white text-brand-dark border border-brand-soft'}`}
                          >
                            <div className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center transition-all ${formData.reactivity.includes(item) ? 'bg-brand-vibrant border-brand-vibrant' : 'border-brand-soft'}`}>
                              {formData.reactivity.includes(item) && <Check size={14} className="text-white stroke-[3]" />}
                            </div>
                            <span className={formData.reactivity.includes(item) ? 'text-brand-vibrant' : 'text-brand-dark'}>{item}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-xs font-bold uppercase tracking-widest text-brand-dark block">Nível de Energia (1: Baixo | 5: Muito Alto)</label>
                      <div className="flex justify-between items-center bg-white border border-brand-soft p-8 rounded-[32px] shadow-sm">
                        {[1, 2, 3, 4, 5].map(val => (
                          <button
                            key={val}
                            type="button"
                            onClick={() => setFormData({ ...formData, energyLevel: val.toString() })}
                            className={`w-12 h-12 rounded-full font-bold transition-all ${formData.energyLevel === val.toString() ? 'bg-brand-vibrant text-white scale-125 shadow-xl shadow-brand-vibrant/20' : 'bg-brand-soft text-brand-dark/40 hover:text-brand-vibrant'}`}
                          >
                            {val}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-4">
                        <label className="text-xs font-bold uppercase tracking-widest text-brand-dark block">Passeios por dia / Duração</label>
                        <input 
                          type="text" 
                          name="walksPerDay"
                          value={formData.walksPerDay}
                          onChange={handleInputChange}
                          className="w-full bg-white border-2 border-brand-soft rounded-2xl p-6 text-brand-dark text-lg outline-none focus:border-brand-vibrant transition-all font-medium"
                        />
                      </div>
                      <div className="space-y-4">
                        <label className="text-xs font-bold uppercase tracking-widest text-brand-dark block">Problemas de Saúde / Medicamentos</label>
                        <input 
                          type="text" 
                          name="healthIssues"
                          value={formData.healthIssues}
                          onChange={handleInputChange}
                          placeholder="Caso possua alguma restrição biológica"
                          className="w-full bg-white border-2 border-brand-soft rounded-2xl p-6 text-brand-dark text-lg outline-none focus:border-brand-vibrant transition-all font-medium placeholder:text-brand-dark/20"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-xs font-bold uppercase tracking-widest text-brand-dark block">O que você mais deseja alcançar com ele?</label>
                      <textarea 
                        name="goals"
                        required
                        rows={4}
                        value={formData.goals}
                        onChange={handleInputChange}
                        placeholder="Ex: Poder passear no parque com tranquilidade e receber visitas..."
                        className="w-full bg-white border-2 border-brand-soft rounded-2xl p-6 text-brand-dark text-lg outline-none focus:border-brand-vibrant transition-all font-medium resize-none placeholder:text-brand-dark/20"
                      />
                    </div>

                     <div className="p-8 bg-brand-vibrant/5 border border-brand-vibrant/10 rounded-[32px]">
                       <p className="text-brand-vibrant text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Finalizar Avaliação</p>
                       <p className="text-brand-dark/80 text-sm leading-relaxed mb-8">
                         Ao clicar abaixo, sua ficha será formatada e enviada diretamente para o WhatsApp da nossa equipe técnica para análise imediata.
                       </p>
                       <div className="grid grid-cols-1 gap-4">
                          <button 
                            type="button" 
                            onClick={handleFinalSubmit}
                            className="bg-[#25D366] text-white py-6 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center space-x-3 hover:scale-[1.02] transition-all shadow-xl shadow-green-500/20"
                          >
                            <Send size={16} />
                            <span>Finalizar e Enviar via WhatsApp</span>
                          </button>
                       </div>
                    </div>
                  </div>
                )}

                {/* Footer Buttons */}
                <div className="mt-16 pt-12 border-t border-brand-soft flex items-center justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className={`flex items-center space-x-3 font-bold uppercase tracking-widest text-xs transition-all ${currentStep === 0 ? 'opacity-0 pointer-events-none' : 'text-brand-dark hover:text-brand-vibrant'}`}
                  >
                    <ArrowLeft size={16} />
                    <span>Voltar</span>
                  </button>

                  {currentStep < steps.length - 1 && (
                    <button
                      type="submit"
                      className="inline-flex items-center space-x-4 px-12 py-6 bg-brand-vibrant text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-xl shadow-brand-vibrant/10"
                    >
                      <span>Continuar</span>
                      <ArrowRight size={16} />
                    </button>
                  )}
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
