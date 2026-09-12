import React, { useState, useRef, useEffect } from 'react';
import { 
  BookOpen, 
  Info, 
  HelpCircle, 
  Volume2, 
  VolumeX, 
  Search, 
  Shield, 
  Crown, 
  Scale, 
  Scroll, 
  Check, 
  Layers, 
  Sparkles, 
  ArrowRight,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react';
import { GlossaryTerm } from '../types';
import { GLOSSARY_TERMS, CHRONICLE_SNIPPET_SEGMENTS } from '../data/glossaryData';

export const HistoricalGlossary: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTooltipTermId, setActiveTooltipTermId] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number; placement: 'top' | 'bottom' }>({ x: 0, y: 0, placement: 'bottom' });
  const [expandedTermId, setExpandedTermId] = useState<string | null>('sanxhak');
  const [speakingTermId, setSpeakingTermId] = useState<string | null>(null);
  const [copiedTermId, setCopiedTermId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'lexuesi' | 'katalogu' | 'krahasimi'>('lexuesi');
  
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Categories list
  const categories = [
    { id: 'all', label: 'Të Gjithë Termat', count: GLOSSARY_TERMS.length },
    { id: 'administrate', label: 'Administratë Osmane', count: GLOSSARY_TERMS.filter(t => t.category === 'administrate').length },
    { id: 'diplomaci', label: 'Diplomaci & Ligj', count: GLOSSARY_TERMS.filter(t => t.category === 'diplomaci').length },
    { id: 'dinasti', label: 'Dinasti & Mbretëri', count: GLOSSARY_TERMS.filter(t => t.category === 'dinasti').length },
    { id: 'tituj', label: 'Tituj & Urdhra', count: GLOSSARY_TERMS.filter(t => t.category === 'tituj').length },
    { id: 'ushtri', label: 'Ushtri & Terren', count: GLOSSARY_TERMS.filter(t => t.category === 'ushtri').length },
  ];

  // Filtered terms based on category and search query
  const filteredTerms = GLOSSARY_TERMS.filter((term) => {
    const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = 
      query === '' ||
      term.term.toLowerCase().includes(query) ||
      term.shortDefinition.toLowerCase().includes(query) ||
      term.fullExplanation.toLowerCase().includes(query) ||
      term.etymology.toLowerCase().includes(query) ||
      term.skanderbegContext.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        tooltipRef.current && 
        !tooltipRef.current.contains(e.target as Node) &&
        !(e.target as HTMLElement).closest('[data-tooltip-trigger]')
      ) {
        setActiveTooltipTermId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Web Speech API for term pronunciation
  const handleSpeakTerm = (term: GlossaryTerm) => {
    if (!('speechSynthesis' in window)) {
      return;
    }

    if (speakingTermId === term.id) {
      window.speechSynthesis.cancel();
      setSpeakingTermId(null);
      return;
    }

    window.speechSynthesis.cancel();
    setSpeakingTermId(term.id);

    const textToSpeak = `${term.term}. ${term.shortDefinition}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    const voices = window.speechSynthesis.getVoices();
    const sqVoice = voices.find(v => v.lang.startsWith('sq')) || voices.find(v => v.lang.startsWith('it')) || voices[0];
    if (sqVoice) {
      utterance.voice = sqVoice;
    }
    utterance.rate = 0.92;
    utterance.onend = () => setSpeakingTermId(null);
    utterance.onerror = () => setSpeakingTermId(null);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopyTerm = (term: GlossaryTerm) => {
    const text = `${term.term} (${term.languageOrigin})\nEtimologjia: ${term.etymology}\nPërkufizimi: ${term.shortDefinition}\nKonteksti te Skënderbeu: ${term.skanderbegContext}`;
    navigator.clipboard.writeText(text);
    setCopiedTermId(term.id);
    setTimeout(() => setCopiedTermId(null), 2000);
  };

  const handleTriggerTooltip = (termId: string, event: React.MouseEvent<HTMLElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    // Check if there is more space above or below
    const spaceBelow = viewportHeight - rect.bottom;
    const placement = spaceBelow < 280 ? 'top' : 'bottom';
    
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: placement === 'bottom' ? rect.bottom + 8 : rect.top - 8,
      placement
    });
    setActiveTooltipTermId(activeTooltipTermId === termId ? null : termId);
  };

  const scrollToTermCard = (termId: string) => {
    setActiveTooltipTermId(null);
    setActiveTab('katalogu');
    setExpandedTermId(termId);
    setTimeout(() => {
      const element = document.getElementById(`term-card-${termId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);
  };

  const activeTermData = GLOSSARY_TERMS.find(t => t.id === activeTooltipTermId);

  return (
    <section id="glosari" className="relative py-24 bg-stone-950 text-stone-100 border-t border-amber-500/20 overflow-hidden">
      {/* Background Decorative Gradients & Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#b45309_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-red-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={containerRef}>
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Flluskat e Diturisë Mesjetare</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-stone-100 uppercase">
            Glosar Historik
          </h2>
          
          <p className="mt-4 text-base sm:text-lg text-stone-300 font-sans leading-relaxed">
            Eksploroni konceptet, termat administrativë dhe traktatet themelore të epokës së Kastriotit përmes flluskave interaktive të informacionit (<span className="text-amber-400 font-medium">tooltips</span>).
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveTab('lexuesi')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border ${
              activeTab === 'lexuesi'
                ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-lg shadow-amber-500/20'
                : 'bg-stone-900/80 text-stone-300 border-stone-800 hover:border-amber-500/40 hover:text-white'
            }`}
          >
            <Scroll className="w-4 h-4" />
            <span>Lexuesi me Flluska (Teksti Historik)</span>
          </button>

          <button
            onClick={() => setActiveTab('katalogu')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border ${
              activeTab === 'katalogu'
                ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-lg shadow-amber-500/20'
                : 'bg-stone-900/80 text-stone-300 border-stone-800 hover:border-amber-500/40 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Katalogu i Termave ({GLOSSARY_TERMS.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('krahasimi')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border ${
              activeTab === 'krahasimi'
                ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-lg shadow-amber-500/20'
                : 'bg-stone-900/80 text-stone-300 border-stone-800 hover:border-amber-500/40 hover:text-white'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>De Jure vs. De Facto</span>
          </button>
        </div>

        {/* TAB 1: Lexuesi Interaktiv me Flluska të Kontekstit */}
        {activeTab === 'lexuesi' && (
          <div className="bg-stone-900/60 border border-stone-800/80 rounded-2xl p-6 sm:p-10 backdrop-blur-sm relative shadow-2xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-stone-800 mb-8">
              <div>
                <span className="text-xs uppercase font-mono tracking-wider text-amber-400 block mb-1">
                  Ndërfaqe Interaktive e Leximit
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-100 flex items-center gap-2.5">
                  <Scroll className="w-6 h-6 text-amber-400" />
                  Kronika e Kastriotit me Flluska Informative
                </h3>
              </div>
              <div className="inline-flex items-center gap-2 text-xs text-stone-400 bg-stone-950 px-3.5 py-2 rounded-lg border border-stone-800">
                <Info className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Kaloni kursorin ose klikoni mbi fjalët e theksuara me ngjyrë të artë</span>
              </div>
            </div>

            {/* Editorial Chronicle Text with Rich Tooltip Spans */}
            <div className="prose prose-invert max-w-none text-base sm:text-lg lg:text-xl font-serif leading-relaxed sm:leading-loose text-stone-200 space-y-6">
              <p className="whitespace-pre-line">
                {CHRONICLE_SNIPPET_SEGMENTS.map((segment, index) => {
                  if (!segment.termId) {
                    return <span key={index}>{segment.text}</span>;
                  }

                  const termData = GLOSSARY_TERMS.find(t => t.id === segment.termId);
                  const isHovered = activeTooltipTermId === segment.termId;

                  return (
                    <span 
                      key={index}
                      data-tooltip-trigger="true"
                      onClick={(e) => handleTriggerTooltip(segment.termId!, e)}
                      onMouseEnter={(e) => {
                        // For non-touch, open on hover
                        if (window.matchMedia('(hover: hover)').matches) {
                          handleTriggerTooltip(segment.termId!, e);
                        }
                      }}
                      className={`inline-flex items-center gap-1 cursor-pointer transition-all duration-200 px-2 py-0.5 rounded-md font-sans font-semibold text-sm sm:text-base mx-1 select-none ${
                        isHovered 
                          ? 'bg-amber-400 text-stone-950 ring-2 ring-amber-400/50 shadow-md scale-105'
                          : 'bg-amber-500/15 text-amber-300 border-b-2 border-amber-400/60 hover:bg-amber-500/30 hover:text-amber-200'
                      }`}
                      title={termData?.shortDefinition}
                    >
                      <span>{segment.text}</span>
                      <HelpCircle className={`w-3.5 h-3.5 ${isHovered ? 'text-stone-950' : 'text-amber-400/70'}`} />
                    </span>
                  );
                })}
              </p>
            </div>

            {/* Quick Helper Legend */}
            <div className="mt-10 pt-6 border-t border-stone-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-400 font-sans">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="font-semibold text-stone-300">Termat Kryesorë të Përfshirë:</span>
                <span className="flex items-center gap-1.5 text-amber-400">
                  <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                  Sanxhak & Sanxhakbej
                </span>
                <span className="flex items-center gap-1.5 text-amber-400">
                  <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                  Anzhuin & Dinastia e Anzhusë
                </span>
                <span className="flex items-center gap-1.5 text-amber-400">
                  <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                  Sovranitet de jure & de facto
                </span>
              </div>
              <button
                onClick={() => setActiveTab('katalogu')}
                className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-semibold transition-colors"
              >
                <span>Hap katalogun e plotë</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: Katalogu i Plotë me Kërkim & Flluska */}
        {activeTab === 'katalogu' && (
          <div className="space-y-8">
            
            {/* Search and Category Filter Bar */}
            <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-4 sm:p-6 backdrop-blur-sm space-y-4">
              <div className="flex flex-col md:flex-row items-center gap-4">
                
                {/* Search Bar */}
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Kërko termin (p.sh. Sanxhak, Anzhuin, De jure)..."
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Category Pills */}
                <div className="flex items-center gap-1.5 flex-wrap w-full md:w-auto">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 flex items-center gap-1.5 ${
                        selectedCategory === cat.id
                          ? 'bg-amber-500 text-stone-950 shadow-sm'
                          : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800 hover:border-stone-700'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        selectedCategory === cat.id ? 'bg-stone-950 text-amber-400' : 'bg-stone-900 text-stone-500'
                      }`}>
                        {cat.count}
                      </span>
                    </button>
                  ))}
                </div>

              </div>
            </div>

            {/* Term Cards Grid */}
            {filteredTerms.length === 0 ? (
              <div className="bg-stone-900/40 border border-stone-800 rounded-2xl p-12 text-center">
                <HelpCircle className="w-12 h-12 text-stone-600 mx-auto mb-3" />
                <h4 className="text-lg font-serif font-bold text-stone-300">Nuk u gjet asnjë term historik</h4>
                <p className="text-sm text-stone-500 mt-1 max-w-md mx-auto">
                  Provoni të kërkoni një fjalë kyçe tjetër ose pastroni filtrat për të parë të gjithë termat.
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                  className="mt-4 px-4 py-2 bg-stone-800 hover:bg-stone-700 text-xs font-semibold rounded-lg text-amber-300 transition-colors"
                >
                  Pastro kërkimin
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredTerms.map((term) => {
                  const isExpanded = expandedTermId === term.id;
                  const isSpeaking = speakingTermId === term.id;
                  const isCopied = copiedTermId === term.id;

                  // Determine Category Icon & Accent Colors
                  let categoryBadgeClass = 'bg-stone-800 text-stone-300 border-stone-700';
                  let icon = <BookOpen className="w-4 h-4 text-amber-400" />;

                  if (term.category === 'administrate') {
                    categoryBadgeClass = 'bg-red-950/70 text-red-300 border-red-800/50';
                    icon = <Crown className="w-4 h-4 text-red-400" />;
                  } else if (term.category === 'diplomaci') {
                    categoryBadgeClass = 'bg-sky-950/70 text-sky-300 border-sky-800/50';
                    icon = <Scale className="w-4 h-4 text-sky-400" />;
                  } else if (term.category === 'dinasti') {
                    categoryBadgeClass = 'bg-purple-950/70 text-purple-300 border-purple-800/50';
                    icon = <Crown className="w-4 h-4 text-purple-400" />;
                  } else if (term.category === 'tituj') {
                    categoryBadgeClass = 'bg-amber-950/70 text-amber-300 border-amber-800/50';
                    icon = <Shield className="w-4 h-4 text-amber-400" />;
                  } else if (term.category === 'ushtri') {
                    categoryBadgeClass = 'bg-emerald-950/70 text-emerald-300 border-emerald-800/50';
                    icon = <Shield className="w-4 h-4 text-emerald-400" />;
                  }

                  return (
                    <article
                      id={`term-card-${term.id}`}
                      key={term.id}
                      className={`bg-stone-900/70 border rounded-2xl p-5 sm:p-6 transition-all duration-200 flex flex-col justify-between group ${
                        isExpanded 
                          ? 'border-amber-500/60 shadow-xl shadow-amber-500/5 ring-1 ring-amber-500/30' 
                          : 'border-stone-800/90 hover:border-amber-500/40 hover:bg-stone-900/90'
                      }`}
                    >
                      {/* Top Row: Term Header & Interactive Info Bubble Trigger */}
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap mb-1.5">
                              <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-0.5 rounded-full border font-medium ${categoryBadgeClass}`}>
                                {icon}
                                <span>{term.categoryLabel}</span>
                              </span>
                              {term.keyDate && (
                                <span className="text-[11px] font-mono text-stone-400 bg-stone-950 px-2 py-0.5 rounded border border-stone-800">
                                  {term.keyDate}
                                </span>
                              )}
                            </div>
                            <h3 className="text-xl sm:text-2xl font-serif font-black text-stone-100 group-hover:text-amber-300 transition-colors tracking-wide">
                              {term.term}
                            </h3>
                          </div>

                          {/* Quick Interactive Bubble Trigger & Actions */}
                          <div className="flex items-center gap-1.5 shrink-0">
                            {/* Speech Button */}
                            <button
                              onClick={() => handleSpeakTerm(term)}
                              className={`p-2 rounded-lg border transition-all duration-150 ${
                                isSpeaking 
                                  ? 'bg-red-900/80 text-red-300 border-red-500 animate-pulse' 
                                  : 'bg-stone-950 text-stone-400 hover:text-amber-400 hover:border-amber-500/40 border-stone-800'
                              }`}
                              title="Dëgjo shqiptimin dhe shpjegimin"
                            >
                              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                            </button>

                            {/* Copy button */}
                            <button
                              onClick={() => handleCopyTerm(term)}
                              className="p-2 rounded-lg bg-stone-950 text-stone-400 hover:text-amber-400 hover:border-amber-500/40 border border-stone-800 transition-colors"
                              title="Kopjo të dhënat e termit"
                            >
                              {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Layers className="w-4 h-4" />}
                            </button>

                            {/* Floating Bubble Quick Preview Trigger */}
                            <button
                              data-tooltip-trigger="true"
                              onClick={(e) => handleTriggerTooltip(term.id, e)}
                              className="p-2 rounded-lg bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/30 transition-colors"
                              title="Hap flluskën e informacionit"
                            >
                              <HelpCircle className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Language & Etymology Pill with Interactive Bubble */}
                        <div className="mb-4 inline-flex items-center gap-2 bg-stone-950 px-3 py-1 rounded-lg border border-stone-800/80 text-xs text-amber-300/90 font-mono">
                          <span className="text-stone-500">Origjina:</span>
                          <span>{term.languageOrigin}</span>
                        </div>

                        {/* Short Definition - Punchy & Clear */}
                        <p className="text-sm sm:text-base font-sans text-stone-300 leading-relaxed mb-4">
                          {term.shortDefinition}
                        </p>

                        {/* Skanderbeg Context Box */}
                        <div className="bg-stone-950/80 border-l-2 border-amber-500 p-3.5 rounded-r-xl text-xs sm:text-sm text-stone-300 leading-relaxed mb-4">
                          <strong className="text-amber-400 block font-serif uppercase tracking-wider text-[11px] mb-1">
                            Lidhja me Skënderbeun:
                          </strong>
                          {term.skanderbegContext}
                        </div>
                      </div>

                      {/* Expandable Section: Etimologjia & Shpjegimi i Plotë */}
                      <div>
                        {isExpanded && (
                          <div className="mt-4 pt-4 border-t border-stone-800 space-y-4 animate-in fade-in duration-200">
                            <div>
                              <span className="text-xs font-semibold text-stone-400 block mb-1">
                                Rrënja & Etimologjia:
                              </span>
                              <p className="text-xs sm:text-sm text-stone-300 bg-stone-950 p-3 rounded-lg border border-stone-800 font-sans">
                                {term.etymology}
                              </p>
                            </div>

                            <div>
                              <span className="text-xs font-semibold text-stone-400 block mb-1">
                                Shpjegimi i Thelluar Historik:
                              </span>
                              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
                                {term.fullExplanation}
                              </p>
                            </div>

                            {term.historicalQuote && (
                              <div className="bg-amber-950/20 border border-amber-500/30 p-3 rounded-lg">
                                <span className="text-[11px] font-mono text-amber-400 block mb-1 uppercase tracking-wider">
                                  Citimi Historik:
                                </span>
                                <blockquote className="text-xs italic text-stone-200 font-serif">
                                  "{term.historicalQuote}"
                                </blockquote>
                                {term.quoteSource && (
                                  <cite className="block text-[10px] text-stone-400 mt-1 font-sans not-italic">
                                    — {term.quoteSource}
                                  </cite>
                                )}
                              </div>
                            )}

                            {/* Related Terms tags */}
                            {term.relatedTerms && term.relatedTerms.length > 0 && (
                              <div className="pt-2">
                                <span className="text-xs text-stone-400 block mb-1.5">Termat e Lidhura:</span>
                                <div className="flex flex-wrap gap-1.5">
                                  {term.relatedTerms.map((relId) => {
                                    const relTerm = GLOSSARY_TERMS.find(t => t.id === relId);
                                    if (!relTerm) return null;
                                    return (
                                      <button
                                        key={relId}
                                        onClick={() => scrollToTermCard(relId)}
                                        className="text-[11px] px-2.5 py-1 rounded-md bg-stone-950 text-amber-300 hover:bg-amber-500/20 hover:border-amber-400 border border-stone-800 transition-colors flex items-center gap-1"
                                      >
                                        <span>{relTerm.term}</span>
                                        <ArrowRight className="w-3 h-3 text-amber-400" />
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Toggle Expand / Collapse Button */}
                        <button
                          onClick={() => setExpandedTermId(isExpanded ? null : term.id)}
                          className="w-full mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs font-semibold text-stone-400 hover:text-amber-400 transition-colors"
                        >
                          <span>{isExpanded ? 'Mbyll analizën' : 'Hap analizën e plotë & etimologjinë'}</span>
                          {isExpanded ? <ChevronUp className="w-4 h-4 text-amber-400" /> : <ChevronDown className="w-4 h-4 text-amber-400" />}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Krahasimi De Jure vs De Facto */}
        {activeTab === 'krahasimi' && (
          <div className="bg-stone-900/60 border border-stone-800 rounded-2xl p-6 sm:p-10 backdrop-blur-sm space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs uppercase font-mono tracking-widest text-amber-400 block mb-1">
                Paradoksi Diplomatik i Vitit 1451
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-black text-stone-100">
                Sovranitet De Jure vs. Pushtet De Facto
              </h3>
              <p className="mt-2 text-sm sm:text-base text-stone-300 font-sans">
                Si arriti Skënderbeu të njihte në Traktatin e Gaetës mbretin Alfons V të Napolit, duke ruajtur pavarësinë absolute të Arbërisë.
              </p>
            </div>

            {/* Side by Side Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              
              {/* Card 1: De Jure */}
              <div className="bg-stone-950 border border-sky-900/50 rounded-2xl p-6 relative overflow-hidden group hover:border-sky-500/50 transition-colors">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-sky-950 text-sky-300 border border-sky-800">
                    Sipas Letrës & Ligjit
                  </span>
                  <button
                    data-tooltip-trigger="true"
                    onClick={(e) => handleTriggerTooltip('sovranitet-de-jure', e)}
                    className="p-1.5 rounded-lg text-sky-400 hover:bg-sky-950 border border-sky-800 transition-colors"
                    title="Shiko flluskën e plotë"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>

                <h4 className="text-2xl font-serif font-black text-sky-200 mb-2">
                  Sovraniteti De Jure
                </h4>
                <p className="text-xs font-mono text-sky-400/90 mb-4">
                  Latinisht: "De Jure" (Sipas së drejtës ligjore formale)
                </p>

                <ul className="space-y-3 text-sm text-stone-300 font-sans mb-6">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0" />
                    <span><strong>Në dokument:</strong> Skënderbeu u zotua për vasalitet formal ndaj Kurorës së Aragonës e Napolit në Gaetë (1451).</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0" />
                    <span><strong>Përfitimi ushtarak:</strong> Napoli dërgoi topa artilerie, drithë, barut dhe një garnizon prej 100 trupash katalanë në kështjellë.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0" />
                    <span><strong>Mburoja diplomatike:</strong> Arbëria mori mbrojtje nga një prej superfuqive më të mëdha detare perëndimore të Mesdheut.</span>
                  </li>
                </ul>

                <div className="bg-sky-950/40 border border-sky-800/40 p-3.5 rounded-xl text-xs text-sky-200">
                  <strong className="text-sky-300 block mb-0.5 font-semibold">Qëllimi i Kastriotit:</strong>
                  Të fitonte mbështetjen e një mbreti të fuqishëm pa sakrifikuar asnjë grimë nga vendimmarrja e pavarur.
                </div>
              </div>

              {/* Card 2: De Facto */}
              <div className="bg-stone-950 border border-amber-900/50 rounded-2xl p-6 relative overflow-hidden group hover:border-amber-500/50 transition-colors">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-amber-950 text-amber-300 border border-amber-800">
                    Realiteti në Terren
                  </span>
                  <button
                    data-tooltip-trigger="true"
                    onClick={(e) => handleTriggerTooltip('de-facto', e)}
                    className="p-1.5 rounded-lg text-amber-400 hover:bg-amber-950 border border-amber-800 transition-colors"
                    title="Shiko flluskën e plotë"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>

                <h4 className="text-2xl font-serif font-black text-amber-300 mb-2">
                  Sovraniteti De Facto
                </h4>
                <p className="text-xs font-mono text-amber-400/90 mb-4">
                  Latinisht: "De Facto" (Në të vërtetë / Ushtrim real i pushtetit)
                </p>

                <ul className="space-y-3 text-sm text-stone-300 font-sans mb-6">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                    <span><strong>Komanda supreme:</strong> Skënderbeu mbajti kontrollin absolut mbi çdo lëvizje të ushtrisë dhe vendosi i vetëm strategjinë.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                    <span><strong>Autonomia e brendshme:</strong> Përfaqësuesi i Napolit (Ramon d'Ortafa) nuk kishte autoritet mbi princërit arbërorë apo popullsinë vendase.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                    <span><strong>Përmbysja e roleve:</strong> Në 1460, nuk ishte Napoli që mbronte Arbërinë, por vetë Skënderbeu që shkoi në Pulje për të shpëtuar mbretin Ferrante nga disfata anzhuine.</span>
                  </li>
                </ul>

                <div className="bg-amber-950/40 border border-amber-800/40 p-3.5 rounded-xl text-xs text-amber-200">
                  <strong className="text-amber-300 block mb-0.5 font-semibold">Përfundimi Historik:</strong>
                  Skënderbeu mbeti monark i lirë dhe i pavarur në tokën e tij, duke përdorur mjeshtërisht të drejtën ndërkombëtare mesjetare.
                </div>
              </div>

            </div>

            {/* Interactive Callout to open related terms */}
            <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="font-serif font-bold text-stone-100 text-base">
                    Dëshironi të thelloheni në Traktatin e Gaetës (1451)?
                  </h5>
                  <p className="text-xs sm:text-sm text-stone-400">
                    Shikoni të gjitha klauzolat origjinale në seksionin e dedikuar të Traktateve.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  const el = document.getElementById('traktatet');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold uppercase tracking-wider transition-colors shrink-0 flex items-center gap-2"
              >
                <span>Shiko Traktatet</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

      </div>

      {/* FLOATING INFORMATION BUBBLE (TOOLTIP) MODAL / PORTAL */}
      {activeTooltipTermId && activeTermData && (
        <div
          ref={tooltipRef}
          style={{
            position: 'fixed',
            left: `${Math.min(Math.max(tooltipPosition.x, 160), window.innerWidth - 170)}px`,
            top: `${tooltipPosition.y}px`,
            transform: `translate(-50%, ${tooltipPosition.placement === 'top' ? '-100%' : '0'})`,
            zIndex: 9999
          }}
          className="w-80 sm:w-96 max-w-[92vw] bg-stone-900/98 text-stone-100 border border-amber-500/60 rounded-2xl shadow-2xl backdrop-blur-xl p-5 animate-in fade-in zoom-in-95 duration-150 ring-1 ring-amber-500/30"
          role="tooltip"
        >
          {/* Arrow pointing to trigger */}
          <div 
            className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-stone-900 border-amber-500/60 transform rotate-45 ${
              tooltipPosition.placement === 'top' 
                ? 'bottom-[-7px] border-b border-r' 
                : 'top-[-7px] border-t border-l'
            }`} 
          />

          {/* Tooltip Header */}
          <div className="flex items-start justify-between gap-3 mb-2.5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {activeTermData.categoryLabel}
                </span>
                {activeTermData.keyDate && (
                  <span className="text-[10px] font-mono text-stone-400">
                    {activeTermData.keyDate}
                  </span>
                )}
              </div>
              <h4 className="text-lg sm:text-xl font-serif font-black text-amber-300">
                {activeTermData.term}
              </h4>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => handleSpeakTerm(activeTermData)}
                className="p-1.5 rounded-lg bg-stone-950 text-stone-400 hover:text-amber-400 border border-stone-800 transition-colors"
                title="Dëgjo shqiptimin"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setActiveTooltipTermId(null)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
                title="Mbyll flluskën"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Etymology Tag */}
          <p className="text-[11px] font-mono text-stone-400 border-b border-stone-800 pb-2 mb-2.5">
            Origjina: <span className="text-amber-200/90">{activeTermData.languageOrigin}</span>
          </p>

          {/* Core Short Definition */}
          <p className="text-xs sm:text-sm text-stone-200 font-sans leading-relaxed mb-3">
            {activeTermData.shortDefinition}
          </p>

          {/* Skanderbeg Role Snippet */}
          <div className="bg-stone-950/80 p-2.5 rounded-xl border border-stone-800 mb-3.5">
            <span className="text-[10px] font-serif uppercase tracking-wider text-amber-400 block font-bold mb-0.5">
              Roli te Skënderbeu:
            </span>
            <p className="text-xs text-stone-300 leading-snug">
              {activeTermData.skanderbegContext}
            </p>
          </div>

          {/* Action to Jump to Full Card in Glossary */}
          <div className="flex items-center justify-between pt-1 text-xs">
            <span className="text-[10px] text-stone-500 italic">
              Klikoni jashtë për të mbyllur
            </span>
            <button
              onClick={() => scrollToTermCard(activeTermData.id)}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold transition-colors"
            >
              <span>Kartela e plotë</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
