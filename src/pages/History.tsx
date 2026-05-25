import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db, auth, signInWithGoogle } from '../lib/firebase';
import { Camera, X, UploadCloud, Lock, Unlock, LogOut, Check } from 'lucide-react';

export default function History() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [customImages, setCustomImages] = useState<string[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loginClicks, setLoginClicks] = useState(0);
  const [successMsg, setSuccessMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title = "Nossa História | Cão Meu Amigo Adestramento";

    // 1. Listen to Auth changes
    const unsubscribeAuth = onAuthStateChanged(auth, (currUser) => {
      setUser(currUser);
      setIsAdmin(currUser?.email === 'fabianofisio@gmail.com');
    });

    // 2. Listen to Firestore custom history images
    const docRef = doc(db, 'history', 'custom_images');
    const unsubscribeDoc = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data && Array.isArray(data.images)) {
          setCustomImages(data.images);
        }
      }
    }, (error) => {
      console.error("Erro ao escutar Firestore:", error);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeDoc();
    };
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (e) {
      console.error("Erro ao conectar Google:", e);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error("Erro ao desconectar:", e);
    }
  };

  const handleLoginTrigger = () => {
    const newCount = loginClicks + 1;
    setLoginClicks(newCount);
    if (newCount >= 3) {
      handleLogin();
      setLoginClicks(0);
    }
    setTimeout(() => setLoginClicks(0), 3000);
  };

  const defaultImages = [
    "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=1200", // Canine agility hurdle jump (First card)
    "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?q=80&w=1200", // Training/Rope jump/Play (Second card)
    "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?q=80&w=1200", // Intellectual dog with glasses (Third card)
    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=1200"  // Pup with trainer on lawn (Fourth card)
  ];

  const timeline = [
    {
      year: "2008",
      title: "As Primeiras Patas",
      desc: "Nascemos da paixão por cães e da necessidade de um adestramento que respeitasse o animal, unindo técnica e carinho.",
      image: customImages[0] || defaultImages[0]
    },
    {
      year: "2014",
      title: "Expansão em Novo Hamburgo",
      desc: "Consolidamos nossa presença no Vale do Sinos, atendendo centenas de famílias de forma personalizada.",
      image: customImages[1] || defaultImages[1]
    },
    {
      year: "2020",
      title: "Inovação e Ciência",
      desc: "Aperfeiçoamos nossa metodologia com as mais modernas técnicas de reforço positivo ao redor do mundo.",
      image: customImages[2] || defaultImages[2]
    },
    {
      year: "Hoje",
      title: "Referência no Estado",
      desc: "Com 18 anos de trajetória, somos referência absoluta em adestramento comportamental e bem-estar canino.",
      image: customImages[3] || defaultImages[3]
    }
  ];

  // Canvas image compression helper
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 600;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            // Compress with JPEG format at 80% quality to output tiny files (typical ~50KB)
            const compressedBase64 = canvas.toDataURL('image/jpeg', 0.80);
            resolve(compressedBase64);
          } else {
            resolve(event.target?.result as string);
          }
        };
        img.onerror = (e) => reject(e);
      };
      reader.onerror = (e) => reject(e);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const compressed = await compressImage(file);
      setPreviewImage(compressed);
      setSuccessMsg('Imagem carregada com sucesso! Clique em "Salvar" para aplicar.');
    } catch (err) {
      console.error("Erro na compressão:", err);
      alert("Erro ao otimizar imagem. Tente outro arquivo.");
    } finally {
      setUploading(false);
    }
  };

  const handleSaveCardImage = async () => {
    if (editingIndex === null) return;
    const finalImage = previewImage || imageUrlInput;
    if (!finalImage) {
      alert("Por favor, envie um arquivo ou preencha o link da URL da imagem.");
      return;
    }

    setUploading(true);
    try {
      // Create clone of state array filled up to 4 elements
      const updatedImages = [...customImages];
      for (let i = 0; i < 4; i++) {
        if (updatedImages[i] === undefined) {
          updatedImages[i] = defaultImages[i];
        }
      }
      updatedImages[editingIndex] = finalImage;

      // Save arrays to doc (db, 'history', 'custom_images')
      await setDoc(doc(db, 'history', 'custom_images'), {
        images: updatedImages,
        updatedBy: user?.email,
        updatedAt: new Date().toISOString()
      });

      setCustomImages(updatedImages);
      setSuccessMsg('Incrível! Card atualizado em tempo real para todo o site.');
      setTimeout(() => {
        closeEditModal();
      }, 1500);
    } catch (err) {
      console.error("Erro ao salvar card:", err);
      alert("Erro ao gravar alteração. Verifique sua conexão e tente novamente.");
    } finally {
      setUploading(false);
    }
  };

  const openEditModal = (idx: number) => {
    setEditingIndex(idx);
    setPreviewImage(null);
    setImageUrlInput(timeline[idx].image.startsWith('data:') ? '' : timeline[idx].image);
    setSuccessMsg('');
  };

  const closeEditModal = () => {
    setEditingIndex(null);
    setPreviewImage(null);
    setImageUrlInput('');
    setUploading(false);
    setSuccessMsg('');
  };

  return (
    <div className="bg-brand-bg pt-20 md:pt-36 pb-10 md:pb-16 overflow-hidden relative">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 h-[60vh] opacity-35 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=2671&auto=format&fit=crop" 
          alt="History Background" 
          className="w-full h-full object-cover grayscale brightness-[0.85]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/60 to-transparent opacity-100" />
      </div>

      <div className="container mx-auto relative z-10">
        <header className="max-w-5xl mb-12 md:mb-16 relative px-6 md:px-0 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="relative">
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
                <span className="text-[10px] uppercase tracking-[0.5em] text-brand-dark/70 font-bold">Nossa Trajetória</span>
              </div>
              
              <h1 
                onClick={handleLoginTrigger}
                className="text-brand-dark text-4xl md:text-7xl font-black uppercase tracking-tighter mb-4 md:mb-6 leading-[0.85] cursor-default select-none group"
              >
                Uma vida <br /> dedicada <br /><span className="text-highlight group-hover:underline decoration-brand-vibrant/20">aos cães.</span>
              </h1>
              
              <p className="text-brand-dark/95 text-base md:text-lg font-bold leading-snug max-w-2xl px-0">
                O Cão Meu Amigo nasceu de uma necessidade real: adestrar com ética, paciência e embasamento científico, sem nunca perder o carinho.
              </p>
            </motion.div>
          </div>

          {/* Hidden/Subtle Admin Control Switch */}
          <motion.div 
            initial={{ opacity: 0.8 }}
            whileHover={{ opacity: 1 }}
            className="text-xs font-semibold uppercase tracking-wider text-brand-dark/40 flex items-center gap-2 self-start md:self-end bg-white/60 backdrop-blur-sm py-2 px-3.5 border border-brand-dark/5 rounded-full select-none"
          >
            {isAdmin ? (
              <span className="text-green-600 flex items-center gap-1.5 font-bold">
                <Unlock size={12} />
                Painel Conectado
                <button onClick={handleLogout} className="text-brand-dark/50 hover:text-red-500 ml-1 transition-colors" title="Desconectar">
                  <LogOut size={13} />
                </button>
              </span>
            ) : (
              <button onClick={handleLogin} className="flex items-center gap-1.5 hover:text-brand-vibrant transition-colors">
                <Lock size={12} className="text-brand-dark/30" />
                Área Administrativa
              </button>
            )}
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
                    <span className="text-brand-vibrant font-extrabold text-xl tabular-nums">{item.year}</span>
                    <div className="h-px flex-grow bg-brand-dark/10"></div>
                  </div>
                  <h3 className="text-brand-dark text-xl md:text-2xl font-black uppercase tracking-tight mb-2">{item.title}</h3>
                  <p className="text-brand-dark/90 text-sm md:text-base leading-snug font-medium">{item.desc}</p>
                </div>
                
                <div className="lg:w-[5%]" />
                
                {/* Image Card Container */}
                <div className="w-full lg:w-[30%] mt-4 lg:mt-0 relative">
                  <div className="aspect-[4/3] max-w-[280px] bg-white border border-brand-dark/5 rounded-2xl overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300 mx-auto lg:mx-0 relative">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />

                    {/* Admin Change overlay */}
                    {isAdmin && (
                      <div className="absolute inset-0 bg-brand-dark/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                        <button
                          onClick={() => openEditModal(idx)}
                          className="bg-white hover:bg-brand-vibrant hover:text-white text-brand-dark text-xs font-black uppercase tracking-widest py-2 px-4 rounded-xl shadow-lg transition-all flex items-center gap-1.5"
                        >
                          <Camera size={14} />
                          Alterar Foto
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="pt-12 md:pt-20 px-6 md:px-0 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="p-8 md:p-10 border border-brand-dark/5 rounded-[24px] bg-white/70 hover:bg-white hover:-translate-y-1 transition-all shadow-md">
              <h4 className="text-brand-dark text-lg md:text-xl font-black uppercase tracking-widest mb-4 underline underline-offset-4 decoration-brand-vibrant/25">Nossa Missão</h4>
              <p className="text-brand-dark/95 text-xs md:text-sm leading-snug italic font-medium">"Educar tutores e cães para que vivam em harmonia, priorizando sempre o bem-estar e a comunicação clara."</p>
            </div>
            <div className="p-8 md:p-10 border border-brand-dark/5 rounded-[24px] bg-white/70 hover:bg-white hover:-translate-y-1 transition-all shadow-md">
              <h4 className="text-brand-dark text-lg md:text-xl font-black uppercase tracking-widest mb-4 underline underline-offset-4 decoration-brand-vibrant/25">Nossos Valores</h4>
              <p className="text-brand-dark/95 text-xs md:text-sm leading-snug italic font-medium">"Ética inegociável, respeito à individualidade de cada cão, paciência infinita e inovação constante."</p>
            </div>
            <div className="p-8 md:p-10 border border-brand-dark/5 rounded-[24px] bg-white/70 hover:bg-white hover:-translate-y-1 transition-all shadow-md">
              <h4 className="text-brand-dark text-lg md:text-xl font-black uppercase tracking-widest mb-4 underline underline-offset-4 decoration-brand-vibrant/25">Nosso Futuro</h4>
              <p className="text-brand-dark/95 text-xs md:text-sm leading-snug italic font-medium">"Ser a maior referência em adestramento do Sul do Brasil, impactando milhares de vidas."</p>
            </div>
          </div>
        </section>
      </div>

      {/* Admin Image Edit Modal */}
      <AnimatePresence>
        {editingIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeEditModal}
              className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm"
            />

            {/* Content Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-[28px] shadow-2xl max-w-lg w-full p-6 md:p-8 border border-brand-dark/5 space-y-5 relative overflow-hidden z-10"
            >
              {/* Close pin */}
              <button 
                onClick={closeEditModal}
                className="absolute top-5 right-5 text-brand-dark/40 hover:text-brand-dark p-1 rounded-full hover:bg-brand-soft/50 transition-colors"
                title="Fechar"
              >
                <X size={20} />
              </button>

              <div>
                <span className="text-[10px] uppercase tracking-[0.4em] text-brand-vibrant font-black">Área Administrativa</span>
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-brand-dark">
                  Alterar Imagem Card {editingIndex + 1}
                </h3>
                <p className="text-xs text-brand-dark/60">
                  Defina a imagem para o marco "{timeline[editingIndex].title}" ({timeline[editingIndex].year}).
                </p>
              </div>

              {/* Upload Input Area */}
              <div className="space-y-4">
                <div className="border-2 border-dashed border-brand-dark/10 rounded-2xl p-6 text-center bg-brand-bg hover:border-brand-vibrant/30 transition-colors relative group">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-white rounded-xl border border-brand-dark/5 flex items-center justify-center text-brand-dark/60 group-hover:text-brand-vibrant transition-colors shadow-sm">
                      <UploadCloud size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-brand-dark">Arraste ou Selecione um Arquivo</p>
                      <p className="text-[10px] text-brand-dark/50 mt-0.5">Qualquer tamanho (compressão automática ativada)</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-brand-dark/5" />
                  <span className="text-[9px] uppercase tracking-widest text-brand-dark/30 font-bold">Ou Digite um Endereço Web</span>
                  <div className="h-px flex-1 bg-brand-dark/5" />
                </div>

                {/* Direct Link input */}
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-brand-dark/60">URL da Imagem</label>
                  <input 
                    type="text" 
                    placeholder="https://exemplo.com/foto.jpg"
                    value={imageUrlInput}
                    onChange={(e) => {
                      setImageUrlInput(e.target.value);
                      setPreviewImage(null); // URL overrides loaded files
                    }}
                    className="w-full bg-brand-bg border border-brand-dark/5 py-2.5 px-4 rounded-xl focus:border-brand-vibrant transition-all outline-none text-brand-dark text-xs md:text-sm font-semibold placeholder:text-brand-dark/30"
                  />
                </div>
              </div>

              {/* Preview Box */}
              {(previewImage || imageUrlInput) && (
                <div className="space-y-2">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-brand-dark/60 block">Pré-classificação do Card</span>
                  <div className="aspect-[4/3] rounded-xl overflow-hidden border border-brand-dark/10 shadow-inner max-w-[200px] bg-brand-bg">
                    <img 
                      src={previewImage || imageUrlInput} 
                      alt="Visualização" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              )}

              {/* Message Banner */}
              {successMsg && (
                <div className="flex items-center gap-2 text-xs font-bold text-green-600 bg-green-500/10 py-3 px-4 rounded-xl">
                  <Check size={16} />
                  <span>{successMsg}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-2">
                <button 
                  onClick={closeEditModal}
                  className="px-5 py-3 border border-brand-dark/10 hover:bg-brand-bg rounded-xl text-[10px] font-black uppercase tracking-wider text-brand-dark transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleSaveCardImage}
                  disabled={uploading || (!previewImage && !imageUrlInput)}
                  className="px-6 py-3 bg-brand-vibrant hover:bg-brand-blue disabled:opacity-50 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:shadow-lg transition-all flex items-center gap-1"
                >
                  {uploading ? 'Gravando...' : 'Salvar Alteração'}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
