import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, X, Upload, Image as ImageIcon, LogIn, LogOut } from 'lucide-react';
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
  { url: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=2671&auto=format&fit=crop", title: "Pastor Australiano - Estilo" },
  { url: "https://images.unsplash.com/photo-1541599540903-216a46ca1ad0?q=80&w=2671&auto=format&fit=crop", title: "Aventura no Caiaque" },
  { url: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=2669&auto=format&fit=crop", title: "Terapia com Cães" },
  { url: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=2574&auto=format&fit=crop", title: "Treinamento de Proteção" },
  { url: "https://images.unsplash.com/photo-1593134257782-e89567b7718a?q=80&w=2635&auto=format&fit=crop", title: "Cão no Set de Cinema" },
  { url: "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?q=80&w=2669&auto=format&fit=crop", title: "Obediência e Foco" },
  { url: "https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?q=80&w=2670&auto=format&fit=crop", title: "Socialização no Parque" },
  { url: "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=2670&auto=format&fit=crop", title: "Conexão e Bem-estar" }
];

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isManaging, setIsManaging] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currUser) => {
      setUser(currUser);
      // Auto-enable management if admin
      if (currUser?.email === 'fabianofisio@gmail.com') {
        setIsManaging(true);
      } else {
        setIsManaging(false);
      }
    });

    const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
    const unsubscribeGallery = onSnapshot(q, (snapshot) => {
      const galleryData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as GalleryImage[];
      setImages(galleryData);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'gallery');
      setLoading(false);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeGallery();
    };
  }, []);

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

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const url = event.target?.result as string;
        const tempId = Math.random().toString(36).substr(2, 9);
        
        try {
          await setDoc(doc(db, 'gallery', tempId), {
            url,
            title: file.name.split('.')[0],
            createdAt: serverTimestamp()
          });
        } catch (error) {
          handleFirestoreError(error, OperationType.CREATE, `gallery/${tempId}`);
        }
      };
      reader.readAsDataURL(file);
    });
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

  const isAdmin = user?.email === 'fabianofisio@gmail.com';

  return (
    <div className="bg-[#0F0F0F] pt-48 pb-20">
      <div className="container mx-auto px-6">
        <header className="mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1"
          >
            <div className="mb-6 flex items-center space-x-4">
              <span className="w-10 h-px bg-white/30"></span>
              <span className="text-[10px] uppercase tracking-[0.5em] text-white/40">Visão Geral</span>
            </div>
            <h1 className="text-white text-7xl md:text-[9rem] font-bold uppercase tracking-tighter mb-8 leading-[0.85]">
              Nossa <br /><span className="text-highlight">Galeria</span>
            </h1>
          </motion.div>

          <div className="flex flex-col items-end space-y-4">
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  {isAdmin && (
                    <button 
                      onClick={() => setIsManaging(!isManaging)}
                      className={`btn-outline flex items-center space-x-2 ${isManaging ? 'bg-white text-black' : 'border-white/10'}`}
                    >
                      {isManaging ? 'Sair do Gerenciamento' : 'Gerenciar Fotos'}
                    </button>
                  )}
                  <button 
                    onClick={handleLogout}
                    className="p-3 text-white/40 hover:text-white transition-colors"
                    title="Sair"
                  >
                    <LogOut size={20} />
                  </button>
                </>
              ) : (
                <button 
                  onClick={handleLogin}
                  className="btn-outline flex items-center space-x-2 border-white/10"
                >
                  <LogIn size={16} />
                  <span>Acesso Restrito</span>
                </button>
              )}
            </div>

            {isManaging && isAdmin && (
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Plus size={16} />
                  <span>Carregar Foto</span>
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  className="hidden" 
                  accept="image/*" 
                  multiple 
                />
              </div>
            )}
          </div>
        </header>

        {loading ? (
          <div className="py-40 flex justify-center">
            <div className="w-10 h-10 border-4 border-white/10 border-t-white rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            <AnimatePresence>
              {images.map((img, idx) => (
                <motion.div 
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  viewport={{ once: true }}
                  className="relative group cursor-pointer aspect-[3/4] overflow-hidden"
                >
                  <img 
                    src={img.url} 
                    alt={img.title}
                    className={`w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-1000 ${isManaging ? 'grayscale-0 brightness-75' : ''}`}
                  />
                  
                  {/* Title Overlay */}
                  <div className="absolute inset-0 bg-[#0F0F0F]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                    <div>
                      <p className="text-white text-[10px] font-bold uppercase tracking-[0.4em] mb-2">0{idx + 1}</p>
                      <h4 className="text-white text-xl font-bold uppercase tracking-tight">{img.title}</h4>
                    </div>
                  </div>

                  {/* Management Controls */}
                  {isManaging && isAdmin && (
                    <div className="absolute inset-x-0 bottom-0 bg-white p-4 z-20 flex flex-col space-y-2">
                      <input 
                        type="text" 
                        value={img.title} 
                        onChange={(e) => updateImageTitle(img.id, e.target.value)}
                        placeholder="Editar legenda..."
                        className="w-full bg-[#f5f5f5] text-[#0F0F0F] text-xs font-bold uppercase tracking-widest p-2 rounded outline-none border-b-2 border-transparent focus:border-[#0F0F0F] transition-all"
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
              <div className="col-span-full py-40 border border-dashed border-white/10 flex flex-col items-center justify-center text-white/30">
                <ImageIcon size={48} className="mb-4 opacity-20" />
                <p className="uppercase tracking-[0.3em] text-xs font-bold">Nenhuma foto carregada na nuvem</p>
              </div>
            )}
          </div>
        )}

        <div className="mt-32 text-center">
          <p className="text-white/40 text-lg uppercase tracking-widest font-bold">Acompanhe mais em nosso Instagram</p>
          <a 
            href="https://instagram.com/caomeuamigo_adestramento" 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-6 inline-block text-white text-2xl md:text-4xl font-black uppercase tracking-tighter hover:text-white/70 transition-colors"
          >
            @caomeuamigo_adestramento
          </a>
        </div>
      </div>
    </div>
  );
}
