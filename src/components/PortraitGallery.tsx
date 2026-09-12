import React, { useState, useEffect, useRef } from 'react';
import { PORTRAIT_ARTWORKS } from '../data/skanderbegData';
import { PortraitArtwork } from '../types';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  X, 
  Play, 
  Pause, 
  Info, 
  MapPin, 
  Calendar, 
  Palette, 
  Check, 
  Copy, 
  Compass, 
  Sparkles,
  Layers,
  ZoomIn
} from 'lucide-react';

export const PortraitGallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [imageErrorMap, setImageErrorMap] = useState<Record<string, boolean>>({});
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredArtworks = selectedCategory === 'all'
    ? PORTRAIT_ARTWORKS
    : PORTRAIT_ARTWORKS.filter(art => art.category === selectedCategory);

  // Keep index in bounds when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory]);

  const activeArt: PortraitArtwork = filteredArtworks[currentIndex] || PORTRAIT_ARTWORKS[0];

  // Auto-play timer
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredArtworks.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isAutoPlaying, filteredArtworks.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredArtworks.length, isFullscreen]);

  const goToNext = () => {
    setIsImageLoading(true);
    setCurrentIndex((prev) => (prev + 1) % filteredArtworks.length);
  };

  const goToPrev = () => {
    setIsImageLoading(true);
    setCurrentIndex((prev) => (prev - 1 + filteredArtworks.length) % filteredArtworks.length);
  };

  const handleSelectThumbnail = (index: number) => {
    if (index !== currentIndex) {
      setIsImageLoading(true);
      setCurrentIndex(index);
    }
  };

  const handleCopyCitation = (art: PortraitArtwork) => {
    const citation = `"${art.title}" nga ${art.artist} (${art.year}). Teknika: ${art.technique}. Vendndodhja: ${art.location}.`;
    navigator.clipboard.writeText(citation);
    setCopiedId(art.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleImageError = (id: string) => {
    setImageErrorMap((prev) => ({ ...prev, [id]: true }));
    setIsImageLoading(false);
  };

  const categories = [
    { id: 'all', label: 'Të Gjitha Veprat', count: PORTRAIT_ARTWORKS.length },
    { id: 'pikture', label: 'Piktura Rilindase', count: PORTRAIT_ARTWORKS.filter(a => a.category === 'pikture').length },
    { id: 'gravure', label: 'Gravura në Bakër', count: PORTRAIT_ARTWORKS.filter(a => a.category === 'gravure').length },
    { id: 'dorëshkrim', label: 'Ksilografi & Dorëshkrime', count: PORTRAIT_ARTWORKS.filter(a => a.category === 'dorëshkrim').length },
    { id: 'ilustrim', label: 'Ilustrime Kostumi', count: PORTRAIT_ARTWORKS.filter(a => a.category === 'ilustrim').length },
  ];

  return (
    <section id="galeria" className="py-20 bg-stone-950 border-t border-amber-500/20 text-stone-100 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-red-900/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase mb-4">
            <Palette className="w-3.5 h-3.5 text-amber-400" />
            <span>Ikonografia e Kryetrimit të Arbërisë</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-stone-100 tracking-tight mb-4">
            Galeri Portretesh & Veprash Historike
          </h2>
          <p className="text-stone-400 text-base sm:text-lg leading-relaxed font-sans">
            Eksploroni pikturat, gravurat dhe vizatimet autentike nga shekujt XV–XVII që përjetësuan 
            tiparet dhe përmasën madhështore të Gjergj Kastriotit në muzetë më prestigjiozë të Evropës.
          </p>
        </div>

        {/* Category Filter Chips & Carousel Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-stone-800">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center gap-2 ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20 font-bold'
                    : 'bg-stone-900 text-stone-400 hover:text-stone-200 hover:bg-stone-800 border border-stone-800'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedCategory === cat.id ? 'bg-stone-950/20 text-stone-950 font-bold' : 'bg-stone-800 text-stone-400'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Carousel Action Buttons */}
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                isAutoPlaying
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                  : 'bg-stone-900 text-stone-400 hover:text-stone-200 border-stone-800'
              }`}
              title={isAutoPlaying ? 'Ndalo karuselin automatik' : 'Nis shfletimin automatik (çdo 5.5s)'}
            >
              {isAutoPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-stone-400" />}
              <span>{isAutoPlaying ? 'Auto: Aktiv' : 'Auto-Luaj'}</span>
            </button>

            <span className="text-xs text-stone-500 px-2 font-mono">
              {currentIndex + 1} / {filteredArtworks.length}
            </span>

            <button
              onClick={goToPrev}
              className="p-2 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-amber-500/40 text-stone-300 hover:text-amber-400 transition-all"
              aria-label="Vepra e mëparshme"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={goToNext}
              className="p-2 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-amber-500/40 text-stone-300 hover:text-amber-400 transition-all"
              aria-label="Vepra tjetër"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Center: Interactive Museum Art Frame */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-stone-900 to-stone-950 border-2 border-amber-600/30 shadow-2xl group">
              
              {/* Museum Wall Border Plaque */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                <span className="px-3 py-1 rounded-md bg-stone-950/85 backdrop-blur-md border border-amber-500/30 text-amber-300 font-mono text-xs font-semibold tracking-wider uppercase">
                  {activeArt.category === 'pikture' && 'Pikturë me Vaj'}
                  {activeArt.category === 'gravure' && 'Gravurë në Bakër'}
                  {activeArt.category === 'dorëshkrim' && 'Ksilografi / Dru'}
                  {activeArt.category === 'ilustrim' && 'Studim Kostumi'}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-stone-950/85 backdrop-blur-md border border-stone-800 text-stone-400 text-xs font-mono">
                  {activeArt.year}
                </span>
              </div>

              {/* Quick Fullscreen Button */}
              <button
                onClick={() => setIsFullscreen(true)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-lg bg-stone-950/80 backdrop-blur-md border border-stone-800 hover:border-amber-500/60 text-stone-300 hover:text-amber-400 transition-all opacity-90 group-hover:opacity-100 shadow-md"
                title="Shiko në ekran të plotë"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Artwork Visual Stage */}
              <div className="relative min-h-[420px] sm:min-h-[500px] flex items-center justify-center p-6 bg-stone-950/90 overflow-hidden">
                
                {/* Visual Backdrop Pattern */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]" />

                {/* The Artwork Image or Fallback */}
                {imageErrorMap[activeArt.id] ? (
                  /* Stylized Museum Canvas Fallback */
                  <div className="relative w-full max-w-md aspect-[3/4] rounded-xl bg-gradient-to-b from-stone-900 to-amber-950/40 border border-amber-500/30 p-8 flex flex-col items-center justify-between text-center shadow-inner">
                    <div className="w-full flex justify-between items-center text-xs text-amber-400 font-mono">
                      <span>DOC. HISTORIK</span>
                      <span>{activeArt.year}</span>
                    </div>

                    <div className="my-auto space-y-4">
                      {/* Stylized Silhouette Frame */}
                      <div className="w-32 h-32 mx-auto rounded-full bg-stone-950 border-2 border-amber-500/50 flex items-center justify-center shadow-lg relative">
                        <span className="font-serif font-black text-4xl text-amber-400">GK</span>
                        <div className="absolute -bottom-2 px-2 py-0.5 rounded bg-red-950 border border-red-800 text-[10px] text-red-300 font-bold uppercase">
                          Kastrioti
                        </div>
                      </div>
                      <h4 className="font-serif font-bold text-lg text-stone-100">
                        {activeArt.title}
                      </h4>
                      <p className="text-xs text-stone-400 max-w-xs line-clamp-3">
                        {activeArt.artist}
                      </p>
                    </div>

                    <div className="text-[11px] text-amber-500/80 font-mono">
                      {activeArt.location}
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      src={activeArt.imageUrl}
                      alt={activeArt.title}
                      referrerPolicy="no-referrer"
                      onLoad={() => setIsImageLoading(false)}
                      onError={() => handleImageError(activeArt.id)}
                      className="max-h-[460px] sm:max-h-[520px] w-auto object-contain rounded-lg shadow-2xl border border-stone-800 transition-transform duration-300 hover:scale-[1.02] cursor-zoom-in"
                      onClick={() => setIsFullscreen(true)}
                    />
                  </div>
                )}

                {/* Floating Previous / Next Overlay arrows */}
                <button
                  onClick={goToPrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-stone-950/70 hover:bg-stone-900 border border-stone-800 hover:border-amber-500/50 text-stone-300 hover:text-amber-400 transition-all opacity-0 group-hover:opacity-100 z-20 backdrop-blur-sm"
                  aria-label="Foto paraardhëse"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-stone-950/70 hover:bg-stone-900 border border-stone-800 hover:border-amber-500/50 text-stone-300 hover:text-amber-400 transition-all opacity-0 group-hover:opacity-100 z-20 backdrop-blur-sm"
                  aria-label="Foto pasardhëse"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Bottom Frame Plaque */}
              <div className="p-4 bg-stone-900/90 border-t border-amber-500/20 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-serif font-bold text-amber-300 text-sm block">
                    {activeArt.title}
                  </span>
                  <span className="text-stone-400">
                    {activeArt.artist} • {activeArt.year}
                  </span>
                </div>
                <button
                  onClick={() => handleCopyCitation(activeArt)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-stone-950 hover:bg-stone-800 border border-stone-800 hover:border-amber-500/40 text-stone-300 hover:text-amber-300 transition-colors"
                >
                  {copiedId === activeArt.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">U Kopjua</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-amber-400" />
                      <span>Kopjo Citimin</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Thumbnails Navigation Strip */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  Katalogu i Veprave ({filteredArtworks.length})
                </span>
                <span className="text-xs text-stone-500">
                  Klikoni për të parë detajet
                </span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
                {filteredArtworks.map((art, idx) => {
                  const isSelected = idx === currentIndex;
                  return (
                    <button
                      key={art.id}
                      onClick={() => handleSelectThumbnail(idx)}
                      className={`relative rounded-xl overflow-hidden aspect-[4/5] bg-stone-900 border transition-all duration-200 group text-left ${
                        isSelected
                          ? 'border-amber-500 ring-2 ring-amber-500/40 scale-[1.03] shadow-lg shadow-amber-500/10'
                          : 'border-stone-800 hover:border-stone-600 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={art.imageUrl}
                        alt={art.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                          // Hide broken img in thumb and show fallback text
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent p-1.5 flex flex-col justify-end">
                        <span className="text-[10px] font-bold text-stone-200 truncate leading-tight">
                          {art.title.split(' ')[0]} {art.title.split(' ')[1]}
                        </span>
                        <span className="text-[9px] text-amber-400 font-mono">
                          {art.year}
                        </span>
                      </div>
                      {isSelected && (
                        <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right: Rich Historical Dossier Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-7 rounded-2xl bg-stone-900/90 border border-amber-500/25 shadow-xl relative overflow-hidden">
              
              {/* Subtle watermarked crest */}
              <div className="absolute -right-8 -top-8 w-40 h-40 opacity-5 pointer-events-none font-serif font-black text-9xl text-amber-400">
                ⚜
              </div>

              {/* Header Title & Museum Meta */}
              <div className="border-b border-stone-800 pb-5 mb-5">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-2 uppercase tracking-wide">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Dossier Kuratorial</span>
                </div>
                <h3 className="font-serif font-black text-2xl sm:text-3xl text-stone-100 mb-2 leading-tight">
                  {activeArt.title}
                </h3>
                <p className="text-sm font-semibold text-amber-300">
                  {activeArt.artist}
                </p>
              </div>

              {/* Quick Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-xs">
                <div className="p-3 rounded-xl bg-stone-950/70 border border-stone-800/80">
                  <div className="flex items-center gap-1.5 text-stone-400 mb-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>Periudha / Viti</span>
                  </div>
                  <div className="font-semibold text-stone-200 font-mono">
                    {activeArt.year}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-stone-950/70 border border-stone-800/80">
                  <div className="flex items-center gap-1.5 text-stone-400 mb-1">
                    <Palette className="w-3.5 h-3.5 text-amber-400" />
                    <span>Teknika Artistike</span>
                  </div>
                  <div className="font-semibold text-stone-200">
                    {activeArt.technique}
                  </div>
                </div>

                <div className="sm:col-span-2 p-3 rounded-xl bg-stone-950/70 border border-stone-800/80">
                  <div className="flex items-center gap-1.5 text-stone-400 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>Vendndodhja Aktuale</span>
                  </div>
                  <div className="font-semibold text-amber-200">
                    {activeArt.location}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3 mb-6">
                <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-amber-400" />
                  Përshkrimi i Veprës
                </h4>
                <p className="text-sm text-stone-300 leading-relaxed font-sans">
                  {activeArt.description}
                </p>
              </div>

              {/* Iconographical Elements */}
              <div className="space-y-3 mb-6 p-4 rounded-xl bg-stone-950/50 border border-stone-800">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-amber-400" />
                  Elementet Ikonografike
                </h4>
                <ul className="space-y-2 text-xs text-stone-300">
                  {activeArt.iconography.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold mt-0.5">•</span>
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Historical Context & Significance */}
              <div className="space-y-4 pt-2 border-t border-stone-800 text-xs">
                <div>
                  <span className="font-bold text-stone-300 block mb-1">
                    Konteksti Historik:
                  </span>
                  <p className="text-stone-400 leading-relaxed">
                    {activeArt.historicalContext}
                  </p>
                </div>
                <div>
                  <span className="font-bold text-amber-300 block mb-1">
                    Vlera & Trashëgimia:
                  </span>
                  <p className="text-stone-400 leading-relaxed">
                    {activeArt.significance}
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-lg flex items-center justify-center p-4 sm:p-8"
          onClick={() => setIsFullscreen(false)}
        >
          <div 
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Controls */}
            <div className="w-full flex items-center justify-between pb-3 text-stone-300 border-b border-stone-800 mb-4">
              <div>
                <h4 className="font-serif font-bold text-lg text-amber-400">
                  {activeArt.title}
                </h4>
                <p className="text-xs text-stone-400">
                  {activeArt.artist} • {activeArt.year} • {activeArt.location}
                </p>
              </div>
              <button
                onClick={() => setIsFullscreen(false)}
                className="p-2 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-stone-100 border border-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* High-res Image Preview */}
            <div className="relative flex-1 flex items-center justify-center overflow-hidden max-h-[75vh]">
              <img
                src={activeArt.imageUrl}
                alt={activeArt.title}
                referrerPolicy="no-referrer"
                className="max-h-full max-w-full object-contain rounded-lg shadow-2xl border border-amber-500/30"
              />
            </div>

            {/* Modal Navigation Footer */}
            <div className="w-full flex items-center justify-between pt-4 mt-4 border-t border-stone-800 text-xs text-stone-400">
              <span>Përdorni shigjetat e tastierës (← / →) ose butonin mbyll (Esc)</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={goToPrev}
                  className="px-3 py-1.5 rounded-md bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-800 flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" /> Paraardhësi
                </button>
                <button
                  onClick={goToNext}
                  className="px-3 py-1.5 rounded-md bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-800 flex items-center gap-1"
                >
                  Pasardhësi <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
