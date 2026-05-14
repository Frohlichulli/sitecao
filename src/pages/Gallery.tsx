import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, X, Upload, Image as ImageIcon } from 'lucide-react';

interface GalleryImage {
  id: string;
  url: string;
  title: string;
}

const DEFAULT_IMAGES: GalleryImage[] = [
  { id: '1', url: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=2671&auto=format&fit=crop", title: "Treino e Foco" },
  { id: '2', url: "https://images.unsplash.com/photo-1541599540903-216a46ca1ad0?q=80&w=2671&auto=format&fit=crop", title: "Socialização Equilibrada" },
  { id: '3', url: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=2669&auto=format&fit=crop", title: "Australian Shepherd Style" },
  { id: '4', url: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=2574&auto=format&fit=crop", title: "Aventura e Companheirismo" },
  { id: '5', url: "https://images.unsplash.com/photo-1593134257782-e89567b7718a?q=80&w=2635&auto=format&fit=crop", title: "Terapia com Cães" },
  { id: '6', url: "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?q=80&w=2669&auto=format&fit=crop", title: "Proteção e Obediência" },
  { id: '7', url: "https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?q=80&w=2670&auto=format&fit=crop", title: "Cão no Set de Filmagens" },
  { id: '8', url: "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=2670&auto=format&fit=crop", title: "Momentos de Descanso" }
];

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isManaging, setIsManaging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('cma_gallery_images');
    if (saved) {
      try {
        setImages(JSON.parse(saved));
      } catch (e) {
        setImages(DEFAULT_IMAGES);
      }
    } else {
      setImages(DEFAULT_IMAGES);
    }
  }, []);

  const saveImages = (newImages: GalleryImage[]) => {
    setImages(newImages);
    localStorage.setItem('cma_gallery_images', JSON.stringify(newImages));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newImage: GalleryImage = {
          id: Math.random().toString(36).substr(2, 9),
          url: event.target?.result as string,
          title: file.name.split('.')[0]
        };
        saveImages(prev => [newImage, ...prev]);
      };
      reader.readAsDataURL(file);
    });
  };

  const deleteImage = (id: string) => {
    saveImages(images.filter(img => img.id !== id));
  };

  const updateImageTitle = (id: string, newTitle: string) => {
    saveImages(images.map(img => img.id === id ? { ...img, title: newTitle } : img));
  };

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

          <div className="flex items-center space-x-4 mb-2">
            <button 
              onClick={() => setIsManaging(!isManaging)}
              className="btn-outline flex items-center space-x-2 border-white/10"
            >
              {isManaging ? 'Sair do Gerenciamento' : 'Gerenciar Fotos'}
            </button>
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
        </header>

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
                    <p className="text-white text-[10px] font-bold uppercase tracking-[0.4em] mb-2">0{images.length - idx}</p>
                    <h4 className="text-white text-xl font-bold uppercase tracking-tight">{img.title}</h4>
                  </div>
                </div>

                {/* Management Controls */}
                {isManaging && (
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
              <p className="uppercase tracking-[0.3em] text-xs font-bold">Nenhuma foto carregada</p>
            </div>
          )}
        </div>

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
