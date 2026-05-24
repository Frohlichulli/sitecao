import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, X, Upload, Image as ImageIcon, LogOut, Video, Play, Smartphone, Trash2, Share2, Download } from 'lucide-react';
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp, 
  query, 
  orderBy,
  setDoc
} from 'firebase/firestore';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { db, auth, signInWithGoogle } from '../lib/firebase';

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  createdAt?: any;
}

interface TrainingVideo {
  id: string;
  url: string;
  type: 'backstage' | 'before-after';
  title: string;
  createdAt?: any;
}

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

const DEFAULT_IMAGES: Partial<GalleryImage>[] = [
  { url: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=2671&auto=format&fit=crop", title: "Socialização e Foco" },
  { url: "https://images.unsplash.com/photo-1541599540903-216a46ca1ad0?q=80&w=2671&auto=format&fit=crop", title: "Aventura e Controle" },
  { url: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=2669&auto=format&fit=crop", title: "Terapia e Carinho" },
  { url: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=2574&auto=format&fit=crop", title: "Treino de Proteção" },
  { url: "https://images.unsplash.com/photo-1593134257782-e89567b7718a?q=80&w=2635&auto=format&fit=crop", title: "Cão no Set" },
  { url: "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?q=80&w=2669&auto=format&fit=crop", title: "Obediência Básica" },
  { url: "https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?q=80&w=2670&auto=format&fit=crop", title: "Passeio Educativo" },
  { url: "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=2670&auto=format&fit=crop", title: "Bem-estar Animal" },
  { url: "https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2670&auto=format&fit=crop", title: "Diversão e Guia" },
  { url: "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=2524&auto=format&fit=crop", title: "Lealdade e Treino" }
];

export default function Gallery() {
  const [activeTab, setActiveTab] = useState<'images' | 'videos'>('images');
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [videos, setVideos] = useState<TrainingVideo[]>([]);
  const [isManaging, setIsManaging] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [showVideoModal, setShowVideoModal] = useState(false);
  const [videoForm, setVideoForm] = useState({ url: '', title: '', type: 'backstage' as const });

  const [loginClicks, setLoginClicks] = useState(0);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    document.title = "Galeria de Treinos | Cão Meu Amigo";
    
    const unsubscribeAuth = onAuthStateChanged(auth, (currUser) => {
      setUser(currUser);
      // Auto-enable management if admin
      if (currUser?.email === 'fabianofisio@gmail.com') {
        setIsManaging(true);
      } else {
        setIsManaging(false);
      }
    });

    const qImages = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
    const unsubscribeGallery = onSnapshot(qImages, (snapshot) => {
      const galleryData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as GalleryImage[];
      setImages(galleryData);
      setLoading(false);
    }, (error) => {
      console.warn("Public gallery access initialized.");
      setLoading(false);
    });

    const qVideos = query(collection(db, 'videos'), orderBy('createdAt', 'desc'));
    const unsubscribeVideos = onSnapshot(qVideos, (snapshot) => {
      const videoData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as TrainingVideo[];
      setVideos(videoData);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeGallery();
      unsubscribeVideos();
    };
  }, []);

  const handleLoginTrigger = () => {
    const newCount = loginClicks + 1;
    setLoginClicks(newCount);
    if (newCount >= 3) {
      handleLogin();
      setLoginClicks(0);
    }
    // Reset click count after 3 seconds of inactivity
    setTimeout(() => setLoginClicks(0), 3000);
  };

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !user) return;

    setLoading(true);
    let processed = 0;
    const total = files.length;

    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const url = event.target?.result as string;
        const tempId = `img_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
        
        try {
          // Check for size limit (Firestore docs have 1MB limit)
          if (url.length > 800000) {
             alert(`A imagem "${file.name}" é muito grande para salvar no Firebase. Tente uma imagem menor.`);
             processed++;
             if (processed === total) setLoading(false);
             return;
          }

          await setDoc(doc(db, 'gallery', tempId), {
            url,
            title: file.name.split('.')[0],
            createdAt: serverTimestamp()
          });
          processed++;
          if (processed === total) setLoading(false);
        } catch (error) {
          handleFirestoreError(error, OperationType.CREATE, `gallery/${tempId}`);
          processed++;
          if (processed === total) setLoading(false);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const seedGallery = async () => {
    if (!isAdmin) return;
    setLoading(true);
    for (const item of DEFAULT_IMAGES) {
      const tempId = `seed_${Math.random().toString(36).substr(2, 9)}`;
      try {
        await setDoc(doc(db, 'gallery', tempId), {
          ...item,
          createdAt: serverTimestamp()
        });
      } catch (error) {
        console.error("Failed to seed", error);
      }
    }
    setLoading(false);
  };

  const deleteImage = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'gallery', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `gallery/${id}`);
    }
  };

  const updateImageTitle = async (id: string, newTitle: string) => {
    try {
      await updateDoc(doc(db, 'gallery', id), {
        title: newTitle
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `gallery/${id}`);
    }
  };

  const handleShare = async (img: GalleryImage) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: img.title,
          text: 'Confira este registro do Cão Meu Amigo Adestramento!',
          url: window.location.href,
        });
      } catch (error) {
        // Share cancelled or failed
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link da galeria copiado!');
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }
  };

  const handleDownload = async (url: string, title: string) => {
    try {
      // If it's a data URL, we can download it directly
      if (url.startsWith('data:')) {
        const link = document.createElement('a');
        link.href = url;
        link.download = `${title.replace(/\s+/g, '_').toLowerCase()}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return;
      }

      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${title.replace(/\s+/g, '_').toLowerCase()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      window.open(url, '_blank');
    }
  };

  const addVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin || !videoForm.url || !videoForm.title) return;

    try {
      const tempId = `vid_${Date.now()}`;
      await setDoc(doc(db, 'videos', tempId), {
        ...videoForm,
        createdAt: serverTimestamp()
      });
      setVideoForm({ url: '', title: '', type: 'backstage' });
      setShowVideoModal(false);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'videos');
    }
  };

  const deleteVideo = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'videos', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `videos/${id}`);
    }
  };

  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch?v=')) {
      return url.replace('watch?v=', 'embed/').split('&')[0];
    }
    if (url.includes('youtu.be/')) {
      const id = url.split('/').pop()?.split('?')[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    if (url.includes('vimeo.com/')) {
      const id = url.split('/').pop();
      return `https://player.vimeo.com/video/${id}`;
    }
    if (url.includes('instagram.com/reels/') || url.includes('instagram.com/p/')) {
      // Basic instagram embed support
      let parts = url.split('/');
      let id = parts[parts.indexOf('reels') + 1] || parts[parts.indexOf('p') + 1];
      return `https://www.instagram.com/reels/${id}/embed`;
    }
    return url;
  };

  const isAdmin = user?.email === 'fabianofisio@gmail.com';

  return (
    <div className="bg-brand-bg pt-20 md:pt-36 pb-10 md:pb-16 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 h-[60vh] opacity-35 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?q=80&w=2574&auto=format&fit=crop" 
          alt="Gallery Background" 
          className="w-full h-full object-cover grayscale brightness-[0.85]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/60 to-transparent opacity-100" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <header className="mb-10 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 space-y-4"
          >
            <div className="mb-2 md:mb-3 flex items-center space-x-3">
              <span className="w-8 md:w-10 h-px bg-brand-vibrant/30"></span>
              <span className="text-[10px] uppercase tracking-[0.5em] text-brand-dark/70 font-bold">Visão Geral</span>
            </div>
            <h1 
              onClick={handleLoginTrigger}
              className="text-brand-dark text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 md:mb-6 leading-[0.85] cursor-default select-none"
            >
              Nossa <br /><span className="text-highlight">Galeria</span>
            </h1>

            {/* Segmented Control Index for Photos and Videos - Highly Prominent with Glassmorphism, elevated shadows, and vibrant borders */}
            <div className="flex p-1.5 bg-white border-2 border-brand-vibrant/20 backdrop-blur-md rounded-2xl w-full max-w-md shadow-lg">
              <button 
                onClick={() => setActiveTab('images')}
                className={`flex-1 flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                  activeTab === 'images' 
                    ? 'bg-brand-vibrant text-white shadow-lg shadow-brand-vibrant/40 scale-[1.02]' 
                    : 'text-brand-dark/70 hover:text-brand-dark hover:bg-brand-soft/50'
                }`}
              >
                <ImageIcon size={15} />
                <span>Fotos ({images.length})</span>
              </button>
              <button 
                onClick={() => setActiveTab('videos')}
                className={`flex-1 flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                  activeTab === 'videos' 
                    ? 'bg-brand-vibrant text-white shadow-lg shadow-brand-vibrant/40 scale-[1.02]' 
                    : 'text-brand-dark/70 hover:text-brand-dark hover:bg-brand-soft/50'
                }`}
              >
                <Video size={15} />
                <span>Vídeos</span>
              </button>
            </div>
          </motion.div>

          <div className="flex flex-col items-end space-y-4">
            <div className="flex items-center space-x-4">
              {user && (
                <>
                  {isAdmin && (
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsManaging(!isManaging)}
                      className={`btn-outline flex items-center space-x-2 ${isManaging ? 'bg-brand-vibrant text-white' : 'border-brand-soft'}`}
                    >
                      {isManaging ? 'Sair do Gerenciamento' : 'Gerenciar Fotos'}
                    </motion.button>
                  )}
                  <motion.button 
                    whileHover={{ scale: 1.2, color: '#0076FF' }}
                    whileTap={{ scale: 0.8 }}
                    onClick={handleLogout}
                    className="p-3 text-brand-dark/40 transition-all"
                    title="Sair"
                  >
                    <LogOut size={20} />
                  </motion.button>
                </>
              )}
            </div>

            {isManaging && isAdmin && (
              <div className="flex items-center space-x-4">
                {activeTab === 'images' ? (
                  <>
                    {images.length === 0 && (
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={seedGallery}
                        className="btn-outline border-brand-soft text-brand-dark/60 hover:text-brand-dark"
                      >
                        Restaurar Padrão
                      </motion.button>
                    )}
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => fileInputRef.current?.click()}
                      className="btn-primary flex items-center space-x-2"
                    >
                      <Plus size={16} />
                      <span>Carregar Foto</span>
                    </motion.button>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileUpload} 
                      className="hidden" 
                      accept="image/*" 
                      multiple 
                    />
                  </>
                ) : (
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowVideoModal(true)}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Video size={16} />
                    <span>Adicionar Vídeo</span>
                  </motion.button>
                )}
              </div>
            )}
          </div>
        </header>

        {loading ? (
          <div className="py-40 flex justify-center">
            <div className="w-10 h-10 border-4 border-brand-soft border-t-brand-vibrant rounded-full animate-spin"></div>
          </div>
        ) : activeTab === 'images' ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <AnimatePresence>
              {images.map((img, idx) => (
                <motion.div 
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  viewport={{ once: true }}
                  onClick={() => {
                    if (!isManaging) {
                      setSelectedImage(img);
                    }
                  }}
                  className="relative group cursor-pointer aspect-[3/4] overflow-hidden rounded-[24px] shadow-sm hover:shadow-xl transition-shadow border border-brand-soft"
                >
                  <img 
                    src={img.url} 
                    alt={img.title}
                    loading="lazy"
                    className={`w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-1000 ${isManaging ? 'grayscale-0 brightness-75' : ''}`}
                  />
                  
                  {/* Title & Actions Overlay */}
                  <div className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4 md:p-8">
                    <div className="flex justify-end space-x-2 md:space-x-3">
                      <motion.button 
                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,1)', color: '#002D5F' }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShare(img);
                        }}
                        className="w-8 h-8 md:w-10 md:h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
                        title="Compartilhar"
                      >
                        <Share2 size={14} className="md:w-4 md:h-4" />
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,1)', color: '#002D5F' }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(img.url, img.title);
                        }}
                        className="w-8 h-8 md:w-10 md:h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
                        title="Baixar"
                      >
                        <Download size={14} className="md:w-4 md:h-4" />
                      </motion.button>
                    </div>
                    <div>
                      <p className="text-white text-[8px] md:text-[10px] font-bold uppercase tracking-[0.4em] mb-1 md:mb-2 opacity-80">0{idx + 1}</p>
                      <h4 className="text-white text-sm md:text-xl font-bold uppercase tracking-tight truncate">{img.title}</h4>
                    </div>
                  </div>

                  {/* Management Controls */}
                  {isManaging && isAdmin && (
                    <div className="absolute inset-x-0 bottom-0 bg-white p-4 z-20 flex flex-col space-y-2 border-t border-brand-soft">
                      <input 
                        type="text" 
                        value={img.title} 
                        onChange={(e) => updateImageTitle(img.id, e.target.value)}
                        placeholder="Editar legenda..."
                        className="w-full bg-brand-soft text-brand-dark text-xs font-bold uppercase tracking-widest p-2 rounded outline-none border-b-2 border-transparent focus:border-brand-vibrant transition-all"
                      />
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteImage(img.id);
                        }}
                        className="w-full bg-red-500/10 text-red-500 py-2 rounded text-[10px] font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
                      >
                        Remover Foto
                      </button>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {images.length === 0 && (
              <div className="col-span-full py-40 border border-dashed border-brand-soft flex flex-col items-center justify-center text-brand-dark/20 bg-brand-soft/20 rounded-[40px]">
                <ImageIcon size={48} className="mb-4 opacity-20" />
                <p className="uppercase tracking-[0.3em] text-xs font-bold">Nenhuma foto carregada na nuvem</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-32">
            {/* Before After Section */}
            <div>
              <div className="flex items-center space-x-4 mb-12">
                <Smartphone className="text-brand-vibrant/20" size={24} />
                <h2 className="text-brand-dark text-2xl font-bold uppercase tracking-tighter">Antes & Depois</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {videos.filter(v => v.type === 'before-after').map((vid, idx) => (
                  <motion.div 
                    key={vid.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group"
                  >
                    <div className="aspect-video bg-brand-soft border border-brand-soft rounded-3xl overflow-hidden relative mb-6 shadow-lg">
                      <iframe 
                        src={getEmbedUrl(vid.url)}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                      {isManaging && isAdmin && (
                        <button 
                          onClick={() => deleteVideo(vid.id)}
                          className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                    <div className="px-2">
                       <span className="text-brand-vibrant text-[10px] font-bold uppercase tracking-widest mb-2 block">Transformação 0{idx + 1}</span>
                       <h3 className="text-brand-dark text-xl font-bold uppercase tracking-tight">{vid.title}</h3>
                    </div>
                  </motion.div>
                ))}
                {videos.filter(v => v.type === 'before-after').length === 0 && (
                  <div className="col-span-full py-20 border border-dashed border-brand-soft rounded-[40px] flex flex-col items-center justify-center text-brand-dark/40 bg-brand-soft/20">
                    <p className="uppercase tracking-widest text-xs">Nenhum vídeo de antes e depois ainda.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Backstage Section */}
            <div>
              <div className="flex items-center space-x-4 mb-12">
                <Play className="text-brand-vibrant/20" size={24} />
                <h2 className="text-brand-dark text-2xl font-bold uppercase tracking-tighter">Bastidores de Treino</h2>
              </div>
              <div className="grid grid-cols-1 gap-12">
                {videos.filter(v => v.type === 'backstage').map((vid) => (
                  <motion.div 
                    key={vid.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group flex flex-col md:flex-row gap-8 items-center"
                  >
                    <div className="w-full md:w-2/3 aspect-video bg-brand-soft border border-brand-soft rounded-[40px] overflow-hidden relative shadow-xl">
                      <iframe 
                        src={getEmbedUrl(vid.url)}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                      {isManaging && isAdmin && (
                        <button 
                          onClick={() => deleteVideo(vid.id)}
                          className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                    <div className="w-full md:w-1/3 text-left">
                       <span className="text-brand-vibrant text-[10px] font-bold uppercase tracking-[0.5em] mb-4 block">Day in Life</span>
                       <h3 className="text-brand-dark text-2xl font-bold uppercase tracking-tighter mb-4 leading-tight">{vid.title}</h3>
                       <div className="w-12 h-px bg-brand-vibrant/20"></div>
                    </div>
                  </motion.div>
                ))}
                {videos.filter(v => v.type === 'backstage').length === 0 && (
                  <div className="col-span-full py-20 border border-dashed border-brand-soft rounded-[40px] flex flex-col items-center justify-center text-brand-dark/40 bg-brand-soft/20">
                    <p className="uppercase tracking-widest text-xs">Nenhum vídeo de bastidores gravado ainda.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="mt-32 text-center bg-brand-soft/30 py-20 rounded-[48px] border border-brand-soft">
          <p className="text-brand-dark/70 text-lg uppercase tracking-widest font-bold">Acompanhe mais em nosso Instagram</p>
          <motion.a 
            href="https://instagram.com/caomeuamigo_adestramento" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, color: '#0076FF' }}
            whileTap={{ scale: 0.9 }}
            className="mt-6 inline-block text-brand-vibrant text-xl font-black uppercase tracking-tighter transition-all"
          >
            @caomeuamigo_adestramento
          </motion.a>
        </div>
      </div>

      <AnimatePresence>
        {/* Click to zoom Lightbox Modal */}
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-[#06080B]/95 z-50 flex flex-col items-center justify-center p-4 md:p-8 backdrop-blur-md cursor-zoom-out"
          >
            {/* Close Button */}
            <motion.button 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all border border-white/15 cursor-pointer z-50 animate-bounce"
            >
              <X size={24} />
            </motion.button>

            {/* Maximize Image Wrapper */}
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 120 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[75vh] w-full rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.9)] cursor-default"
            >
              <img 
                src={selectedImage.url} 
                alt={selectedImage.title} 
                className="w-full h-full max-h-[75vh] object-contain bg-black/40"
              />
            </motion.div>

            {/* Caption & Actions below the zoomed-in image */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 text-center max-w-xl space-y-4 px-4 pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-white mb-2 leading-none">
                {selectedImage.title}
              </h3>
              
              <div className="flex items-center justify-center gap-3">
                <button 
                  onClick={() => handleShare(selectedImage)}
                  className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-all border border-white/10 flex items-center gap-2 cursor-pointer"
                >
                  <Share2 size={14} />
                  Compartilhar
                </button>
                <button 
                  onClick={() => handleDownload(selectedImage.url, selectedImage.title)}
                  className="px-5 py-2.5 bg-brand-vibrant hover:bg-brand-blue text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <Download size={14} />
                  Baixar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showVideoModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-dark/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white border border-brand-soft rounded-[32px] p-8 md:p-12 max-w-lg w-full relative shadow-2xl"
            >
              <button 
                onClick={() => setShowVideoModal(false)}
                className="absolute top-6 right-6 p-2 text-brand-dark/50 hover:text-brand-dark transition-colors"
              >
                <X size={20} />
              </button>

              <h2 className="text-brand-dark text-2xl md:text-3xl font-bold uppercase tracking-tighter mb-8 decoration-brand-vibrant underline underline-offset-8">
                Adicionar Vídeo
              </h2>

              <form onSubmit={addVideo} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-dark block">Título do Vídeo</label>
                  <input 
                    type="text" 
                    value={videoForm.title}
                    onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                    placeholder="Ex: Treino de Foco do Marley"
                    required
                    className="w-full bg-brand-soft/50 border border-brand-soft rounded-xl p-4 text-brand-dark outline-none focus:border-brand-vibrant transition-all font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-dark block">URL do Vídeo (YouTube)</label>
                  <input 
                    type="url" 
                    value={videoForm.url}
                    onChange={(e) => setVideoForm({ ...videoForm, url: e.target.value })}
                    placeholder="Ex: https://www.youtube.com/watch?v=..."
                    required
                    className="w-full bg-brand-soft/50 border border-brand-soft rounded-xl p-4 text-brand-dark outline-none focus:border-brand-vibrant transition-all font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-dark block">Seção</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setVideoForm({ ...videoForm, type: 'before-after' })}
                      className={`py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${videoForm.type === 'before-after' ? 'bg-brand-vibrant text-white' : 'bg-white text-brand-dark border border-brand-soft'}`}
                    >
                      Antes & Depois
                    </button>
                    <button
                      type="button"
                      onClick={() => setVideoForm({ ...videoForm, type: 'backstage' })}
                      className={`py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${videoForm.type === 'backstage' ? 'bg-brand-vibrant text-white' : 'bg-white text-brand-dark border border-brand-soft'}`}
                    >
                      Bastidores
                    </button>
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit"
                    className="btn-primary w-full py-5 text-xs font-bold uppercase tracking-widest"
                  >
                    Salvar Vídeo
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
