import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Film, ChevronRight, Upload, Image as ImageIcon, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Splash() {
  const [posterUrl, setPosterUrl] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title = "Cão Meu Amigo nos Cinemas | Anfitriãs o Filme";
    
    // Check if image exists in localStorage
    const savedPoster = localStorage.getItem('anfitrias_poster_base64');
    if (savedPoster) {
      setPosterUrl(savedPoster);
    } else {
      // Fallback to check if a file named anfitrias.jpg exists on the public folder
      // We can set it as default source, but if details fail, fallback shows upload instructions.
      setPosterUrl('/anfitrias.jpg');
    }
  }, []);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        localStorage.setItem('anfitrias_poster_base64', base64);
        setPosterUrl(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleImageError = () => {
    // If the image failed to load (e.g. /anfitrias.jpg is not there and no localStorage image is uploaded yet)
    // reset to empty so we show the beautiful upload instructions
    if (posterUrl === '/anfitrias.jpg') {
      setPosterUrl('');
    }
  };

  return (
    <div className="min-h-screen bg-[#06080B] text-white flex flex-col justify-between p-6 overflow-x-hidden relative selection:bg-brand-vibrant selection:text-white-80">
      {/* Cinematic Ambient Background Blur */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-[#0076FF]/10 rounded-full blur-[120px] opacity-70" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-[#002D5F]/20 rounded-full blur-[150px] opacity-70" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
      </div>

      {/* Header Area */}
      <header className="relative z-10 w-full max-w-5xl mx-auto flex justify-between items-center py-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-brand-vibrant rounded-full flex items-center justify-center shadow-lg shadow-brand-vibrant/20">
            <Film className="text-white" size={16} />
          </div>
          <span className="font-bold text-sm tracking-[0.25em] uppercase text-white/90">
            Cão Meu Amigo
          </span>
        </div>
        <Link 
          to="/inicio" 
          className="text-xs uppercase tracking-[0.2em] text-white/50 hover:text-[#0076FF] font-bold transition-all flex items-center gap-1 group"
        >
          Ir direto para o site <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </header>

      {/* Main Poster Container */}
      <main className="relative z-10 flex-grow flex flex-col items-center justify-center py-6">
        <div className="w-full max-w-md px-4">
          
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          {/* Main Visual Poster Card with integrated file upload dropzone */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={triggerFileInput}
            className={`relative aspect-[9/16] w-full rounded-[20px] overflow-hidden bg-[#0d1117] border-2 cursor-pointer transition-all duration-300 shadow-[0_0_80px_rgba(0,0,0,0.85)] flex flex-col items-center justify-center group ${
              isDragging 
                ? 'border-brand-vibrant bg-brand-vibrant/10 scale-[1.02]' 
                : posterUrl 
                  ? 'border-white/10 hover:border-white/20' 
                  : 'border-white/10 border-dashed hover:border-brand-vibrant/50 hover:bg-[#0f1520]'
            }`}
          >
            {posterUrl ? (
              <>
                {/* Real Unified Original Poster Image (No programmatically overlaid text) */}
                <img 
                  src={posterUrl} 
                  alt="Anfitriãs o Filme - Cartaz Oficial" 
                  referrerPolicy="no-referrer"
                  onError={handleImageError}
                  className="w-full h-full object-cover z-10 transition-transform duration-700 ease-out group-hover:scale-[1.01]"
                />
                
                {/* Subtle overlay on hover to easily change it */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col items-center justify-center gap-2 backdrop-blur-sm">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                    <Upload size={20} className="text-white" />
                  </div>
                  <p className="text-xs tracking-wider uppercase font-bold text-white text-center">
                    Substituir Cartaz
                  </p>
                  <p className="text-[10px] text-white/50 text-center px-4">
                    Arraste a nova imagem ou clique para selecionar
                  </p>
                </div>
              </>
            ) : (
              /* Beautiful Cinematic Placeholder explaining how to put their exact poster */
              <div className="relative p-8 text-center flex flex-col items-center justify-center space-y-6 z-10 select-none pointer-events-none">
                <div className="w-16 h-16 rounded-full bg-brand-vibrant/10 border border-brand-vibrant/30 flex items-center justify-center animate-pulse">
                  <Upload size={28} className="text-brand-vibrant" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-bold tracking-wider uppercase text-white/95">
                    Adicione Seu Cartaz
                  </h3>
                  <p className="text-xs text-white/60 leading-relaxed max-w-xs">
                    Arraste o arquivo de imagem anexado do cartaz e solte-o aqui, ou clique para selecionar do computador.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-3 max-w-[280px]">
                  <p className="text-[11px] text-neutral-400 font-mono leading-relaxed">
                    <Sparkles size={12} className="inline mr-1 text-[#0076FF]" /> 
                    Dica: Você também pode simplesmente salvar a imagem de impacto na pasta <span className="text-[#0076FF] font-semibold">/public</span> com o nome <span className="text-[#0076FF] font-semibold">anfitrias.jpg</span>.
                  </p>
                </div>
              </div>
            )}
          </motion.div>

          {/* Action / Entrance button below the poster */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-6 flex flex-col items-center space-y-3"
          >
            <Link 
              to="/inicio"
              className="group relative w-full bg-[#0076FF] hover:bg-blue-600 text-white py-4 px-6 rounded-xl font-bold text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-2 transition-all shadow-[0_12px_40px_rgba(0,118,255,0.3)] hover:shadow-[0_12px_40px_rgba(0,118,255,0.5)] hover:scale-[1.01]"
            >
              Entrar no Site
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <p className="text-[10px] text-white/30 tracking-wider text-center max-w-xs leading-normal">
              Clique para acessar nossa página e conferir todos os serviços profissionais de adestramento e comportamento.
            </p>
          </motion.div>
        </div>
      </main>

      {/* Footer Area */}
      <footer className="relative z-10 w-full max-w-5xl mx-auto py-4 text-center border-t border-white/5">
        <p className="text-[9px] uppercase tracking-[0.2em] text-white/30">
          © {new Date().getFullYear()} Cão Meu Amigo Adestramento • Todos os Direitos Reservados
        </p>
      </footer>
    </div>
  );
}

