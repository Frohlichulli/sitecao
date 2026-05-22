import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Film, ChevronRight, Upload, Image as ImageIcon, Sparkles, LogIn, LogOut, Check, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { doc, onSnapshot, setDoc, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { db, auth, signInWithGoogle } from '../lib/firebase';

export default function Splash() {
  const [posterUrl, setPosterUrl] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('anfitrias_poster_base64');
      if (cached) return cached;
    }
    return '/anfitrias.jpg';
  });
  const [isDragging, setIsDragging] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [canEditPoster, setCanEditPoster] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Determine if we are running inside the Google AI Studio editor environment (loaded in an iframe)
    const isInsideAIStudioIframe = window.self !== window.top;
    
    // The user can edit the poster ONLY under two conditions:
    // 1. They are explicitly logged-in as the Administrator (fabianofisio@gmail.com) in any window/browser
    // 2. They are viewing the applet inside the Google AI Studio developer workspace (iframe container)
    setCanEditPoster(isAdmin || isInsideAIStudioIframe);
  }, [isAdmin]);

  useEffect(() => {
    // 2. Fetch real-time poster from Firestore to keep it synchronized globally
    const splashDocRef = doc(db, 'gallery', 'splash_poster');
    const unsubscribeSnapshot = onSnapshot(splashDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const firestoreUrl = docSnap.data().url;
        setPosterUrl(firestoreUrl);
        // Save to local cache so next refresh is instantaneous
        localStorage.setItem('anfitrias_poster_base64', firestoreUrl);
      }
    }, (error) => {
      console.error("Erro ao ler cartaz do Firestore:", error);
    });

    // 3. Monitor Auth State to grant admin privileges
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAdmin(currentUser?.email === 'fabianofisio@gmail.com');
    });

    return () => {
      unsubscribeSnapshot();
      unsubscribeAuth();
    };
  }, []);

  // SEO dynamic updates
  useEffect(() => {
    document.title = "Cão Meu Amigo nos Cinemas | Anfitriãs o Filme - Adestramento de Cães no Vale do Sinos";
    
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        if (isProperty) el.setAttribute('property', name);
        else el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    updateMetaTag('description', 'Cão Meu Amigo apresenta Anfitriãs o Filme nos Cinemas. Líder em adestramento canino profissional, psicologia e comportamento canino no Vale do Sinos.');
    updateMetaTag('keywords', 'cão meu amigo, adestramento de cães, adestrador novo hamburgo, anfitrias o filme, adestramento são leopoldo, comportamento canino de cães');
    updateMetaTag('og:title', 'Cão Meu Amigo nos Cinemas | Anfitriãs o Filme', true);
    updateMetaTag('og:description', 'Assista ao cartaz oficial de Anfitriãs o Filme pela Cão Meu Amigo Adestramento, referência em reabilitação de comportamento animal no Vale do Sinos.', true);
    updateMetaTag('robots', 'index, follow');

    if (posterUrl) {
      updateMetaTag('og:image', posterUrl, true);
    }
  }, [posterUrl]);

  // Helper compression function (canvas resize and JPEG compression)
  const compressImage = (base64Str: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64Str;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(base64Str);
          return;
        }

        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1600;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        // Compress to JPEG with 0.72 quality (~150-250KB, well under the 900,000 bytes Firestore rule limit)
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.72);
        resolve(compressedDataUrl);
      };
      img.onerror = () => {
        resolve(base64Str);
      };
    });
  };

  const savePosterToFirestore = async (base64Url: string) => {
    try {
      setIsSaving(true);
      setUploadStatus("Salvando e sincronizando cartaz no servidor para todos os navegadores...");
      const splashDocRef = doc(db, 'gallery', 'splash_poster');
      
      // Delete the old document first to completely bypass Firestore "url stays same" update rule restriction
      await deleteDoc(splashDocRef).catch(() => {});
      
      // Write fresh document (fits the create rule)
      await setDoc(splashDocRef, {
        url: base64Url,
        title: "Splash Poster",
        createdAt: new Date().toISOString()
      });
      
      setUploadStatus("Cartaz publicado com sucesso! Agora todos os celulares e computadores verão a mesma imagem.");
      setTimeout(() => setUploadStatus(''), 6000);
    } catch (error) {
      console.error("Erro ao salvar cartaz no Firestore:", error);
      setUploadStatus("Falha ao publicar para todos: " + (error instanceof Error ? error.message : String(error)));
    } finally {
      setIsSaving(false);
    }
  };

  const handleFile = async (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const rawBase64 = e.target?.result as string;
        try {
          setUploadStatus("Processando cartaz...");
          const compressed = await compressImage(rawBase64);
          
          localStorage.setItem('anfitrias_poster_base64', compressed);
          setPosterUrl(compressed);
          setUploadStatus("Iniciando publicação automática...");
          
          if (auth.currentUser?.email === 'fabianofisio@gmail.com') {
            await savePosterToFirestore(compressed);
          } else {
            setUploadStatus("Salvo localmente! Entre como administrador (botão abaixo) para salvar para o resto da internet.");
          }
        } catch (err) {
          console.error(err);
          setUploadStatus("Ocorreu um erro ao otimizar a imagem.");
        }
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
    if (posterUrl === '/anfitrias.jpg') {
      setPosterUrl('');
    }
  };

  const handleLogin = async () => {
    try {
      setUploadStatus("Realizando login...");
      await signInWithGoogle();
      setUploadStatus("Autenticado com sucesso!");
      setTimeout(() => setUploadStatus(''), 2000);
    } catch (error) {
      console.error(error);
      setUploadStatus("Erro no login.");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUploadStatus("Sessão encerrada.");
  };

  const syncCurrentFromLocal = async () => {
    const localImg = localStorage.getItem('anfitrias_poster_base64');
    if (localImg) {
      await savePosterToFirestore(localImg);
    } else {
      setUploadStatus("Não há nenhum cartaz ativo em seu navegador para sincronizar.");
    }
  };

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "DogTrainer",
        "@id": "https://caomeuamigo.com.br/#trainer",
        "name": "Cão Meu Amigo Adestramento",
        "url": "https://caomeuamigo.com.br",
        "telephone": "+5551996566493",
        "email": "fabianofisio@gmail.com",
        "description": "Serviços especializados de adestramento de cães, adestramento de obediência profissional e psicologia comportamental canina com 18 anos de experiência no Rio Grande do Sul.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Novo Hamburgo",
          "addressRegion": "RS",
          "postalCode": "93510-000",
          "addressCountry": "BR"
        }
      },
      {
        "@type": "Movie",
        "@id": "https://caomeuamigo.com.br/#movie",
        "name": "Anfitriãs o Filme",
        "alternativeHeadline": "Anfitriãs o Filme nos Cinemas - Cão Meu Amigo",
        "description": "Uma realização cultural evidenciando o preparo e a inteligência de cães atores adestrados pela equipe Cão Meu Amigo.",
        "image": posterUrl || "https://caomeuamigo.com.br/anfitrias.jpg",
        "dateCreated": "2027",
        "productionCompany": {
          "@type": "Organization",
          "name": "Cão Meu Amigo Adestramento"
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#06080B] text-white flex flex-col justify-between p-6 overflow-x-hidden relative selection:bg-brand-vibrant selection:text-white-80">
      <script type="application/ld+json">
        {JSON.stringify(schemaMarkup)}
      </script>

      {/* Hidden Semantically Rich Content for Search Engine Optimization, Indexers, and AI Grids */}
      <section className="sr-only">
        <h1>Cão Meu Amigo nos Cinemas | Anfitriãs o Filme</h1>
        <h2>Adestramento de Cães e Comportamento Canino Profissional</h2>
        <p>
          A empresa <strong>Cão Meu Amigo Adestramento</strong> é liderada por especialistas com mais de 18 anos de experiência prática, atuando em Novo Hamburgo, São Leopoldo, Campo Bom, Sapiranga, Estância Velha, Canoas e em todo o Vale do Sinos e região de Porto Alegre, RS.
        </p>
        <p>
          Nossa atuação estende-se desde o adestramento básico de obediência e filhotes, adestramento sanitário higiênico personalizado, socialização de cães agressivos ou inseguros, reabilitação comportamental, treinamento avançado de guarda e proteção, até o preparo e assessoria de cães atores de alta performance para publicações digitais, comerciais, teatros, estúdios e grandes produções de cinema.
        </p>
        <div>
          <h3>Anfitriãs o Filme (Estreia em 2027)</h3>
          <p>
            O projeto cinematográfico <strong>Anfitriãs</strong> é uma inovadora obra que destaca o potencial intelectual e artístico dos cães de alto nível adestrados pelo Cão Meu Amigo. Com técnicas de reforço positivo, paciência e profundo respeito psicológico, preparamos animais capazes de focar em ambientes barulhentos e desafiadores como palcos e estúdios de cinema.
          </p>
          <p>
            Navegue pelo nosso site oficial para obter informações de contato, solicitar orçamentos de adestramento particular em domicílio no Vale do Sinos, ou preencher sua fila de solicitação.
          </p>
        </div>
        <nav>
          <Link to="/inicio">Acesse nosso site oficial de adestramento</Link>
          <Link to="/adestramento-novo-hamburgo">Serviço de Adestramento em Novo Hamburgo</Link>
          <Link to="/comportamento-canino">Dificuldades de Comportamento Canino</Link>
          <Link to="/treinamento-profissional">Adestramento de Cães Profissional</Link>
        </nav>
      </section>

      {/* Cinematic Ambient Background Blur */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-[#0076FF]/10 rounded-full blur-[120px] opacity-70" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-[#002D5F]/20 rounded-full blur-[150px] opacity-70" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
      </div>

      <div className="h-4" /> {/* Compact Spacer instead of Header Area to remove Logo & 'Ir Direto' per user instruction */}

      {/* Main Poster Container */}
      <main className="relative z-10 flex-grow flex flex-col items-center justify-center py-4">
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
            onDragOver={canEditPoster ? handleDragOver : undefined}
            onDragLeave={canEditPoster ? handleDragLeave : undefined}
            onDrop={canEditPoster ? handleDrop : undefined}
            onClick={canEditPoster ? triggerFileInput : undefined}
            className={`relative aspect-[9/16] w-full rounded-[20px] overflow-hidden bg-[#0d1117] border-2 transition-all duration-300 shadow-[0_0_80px_rgba(0,0,0,0.85)] flex flex-col items-center justify-center group ${
              canEditPoster 
                ? 'cursor-pointer border-white/15 hover:border-[#0076FF]/40' 
                : 'cursor-default border-white/5'
            } ${
              isDragging && canEditPoster 
                ? 'border-brand-vibrant bg-brand-vibrant/10 scale-[1.02]' 
                : ''
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
                  loading="eager"
                  fetchPriority="high"
                  className="w-full h-full object-cover z-10 transition-transform duration-700 ease-out group-hover:scale-[1.005]"
                />
                
                {/* Subtle overlay on hover to easily change it - ONLY shown to administrators or Google Studio developers */}
                {canEditPoster && (
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
                )}
              </>
            ) : (
              /* Beautiful Cinematic Placeholder - dynamically responsive */
              <div className="relative p-8 text-center flex flex-col items-center justify-center space-y-6 z-10 select-none pointer-events-none">
                {canEditPoster ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 rounded-full bg-blue-950/40 border border-blue-500/10 flex items-center justify-center">
                      <Loader2 size={24} className="text-[#0076FF] animate-spin" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xs font-bold tracking-wider uppercase text-white/60">
                        Carregando Cartaz...
                      </h3>
                    </div>
                  </>
                )}
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

            {/* Upload status messages */}
            {uploadStatus && (
              <motion.div 
                initial={{ opacity: 0, y: 5 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="p-3 rounded-lg bg-neutral-900 border border-white/10 text-center max-w-xs w-full"
              >
                <p className="text-[11px] font-medium text-amber-400 leading-normal flex items-center justify-center gap-1.5 flex-wrap">
                  <Sparkles size={12} className="shrink-0 animate-pulse" />
                  <span>{uploadStatus}</span>
                </p>
              </motion.div>
            )}

            {/* Subtle administrative synchronization/login widget */}
            <div className="pt-2 w-full flex flex-col items-center">
              {isAdmin ? (
                <div className="flex flex-col items-center space-y-2 p-2 bg-blue-950/20 border border-blue-500/20 rounded-xl w-full max-w-xs">
                  <div className="flex items-center justify-between w-full px-1">
                    <span className="text-[9px] text-blue-400 font-bold uppercase tracking-wider flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                      Painel do Administrador
                    </span>
                    <button 
                      onClick={handleLogout}
                      className="text-[9px] text-white/40 hover:text-white transition-colors flex items-center gap-1"
                    >
                      <LogOut size={10} /> Sair
                    </button>
                  </div>
                  
                  <button 
                    onClick={syncCurrentFromLocal}
                    disabled={isSaving}
                    className="w-full py-1.5 px-3 rounded-md bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-bold text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 size={11} className="animate-spin" />
                        <span>Fazendo Upload...</span>
                      </>
                    ) : (
                      <>
                        <Upload size={11} />
                        <span>Publicar Cartaz na Web</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                /* Tiny secret key in footer or discrete admin trigger */
                <button 
                  onClick={handleLogin}
                  className="text-[8px] text-white/5 hover:text-white/20 transition-all font-mono uppercase tracking-widest mt-1 cursor-pointer"
                >
                  [ painel de controle ]
                </button>
              )}
            </div>
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

