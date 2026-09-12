import React, { useState } from 'react';
import { EmblemKastrioti } from './EmblemKastrioti';
import { Volume2, VolumeX, Menu, X, Scroll, MapPin, Award, BookOpen, Shield, Palette, Clapperboard, Sparkles } from 'lucide-react';

interface NavbarProps {
  isPlayingAudio: boolean;
  onToggleAudio: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  isPlayingAudio, 
  onToggleAudio,
  activeSection 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'kronika', label: 'Kronika e Jetës', icon: Scroll },
    { id: 'kinemaja-ai', label: 'Kinemaja Video AI', icon: Clapperboard },
    { id: 'galeria', label: 'Galeri Portretesh', icon: Palette },
    { id: 'harta', label: 'Harta Strategjike', icon: MapPin },
    { id: 'traktatet', label: 'Traktatet & Kuvendet', icon: BookOpen },
    { id: 'glosari', label: 'Glosar Historik', icon: Sparkles },
    { id: 'taktikat', label: 'Arti Ushtarak', icon: Shield },
    { id: 'kuizi', label: 'Kuizi Historik', icon: Award },
  ];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-stone-950/95 backdrop-blur-md border-b border-amber-500/20 text-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Title */}
          <div 
            className="flex items-center gap-3.5 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <EmblemKastrioti size="md" className="group-hover:scale-105 transition-transform duration-300" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-black text-lg sm:text-xl tracking-wider text-amber-400 group-hover:text-amber-300 transition-colors uppercase">
                  Gjergj Kastrioti
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-red-950/90 text-red-300 border border-red-800/60 font-semibold tracking-wide hidden sm:inline-block">
                  Skënderbej
                </span>
              </div>
              <p className="text-xs text-stone-400 font-sans tracking-wide">
                1405–1468 • Athleta Christi & Kryetrimi i Arbërisë
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                      : 'text-stone-300 hover:text-amber-300 hover:bg-stone-900/80 border border-transparent'
                  }`}
                >
                  <Icon className="w-4 h-4 text-amber-400/80" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Controls: Narration & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleAudio}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-all duration-200 shadow-sm ${
                isPlayingAudio
                  ? 'bg-red-900/60 text-red-200 border-red-500 animate-pulse'
                  : 'bg-stone-900 text-stone-300 hover:text-amber-300 hover:border-amber-500/50 border-stone-800'
              }`}
              title="Lexo me zë kronikën historike"
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-4 h-4 text-red-400" />
                  <span>Ndalo Zërin</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline">Dëgjo Kronikën</span>
                  <span className="sm:hidden">Zëri</span>
                </>
              )}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-400 hover:text-white md:hidden hover:bg-stone-900"
              aria-label="Hap menynë"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-amber-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-stone-950 border-b border-stone-800 px-4 pt-3 pb-5 space-y-2 animate-in fade-in slide-in-from-top-4 duration-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-left text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'text-stone-300 hover:bg-stone-900 hover:text-amber-300'
                }`}
              >
                <Icon className="w-4 h-4 text-amber-400" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
