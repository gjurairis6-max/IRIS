import React, { useState } from 'react';
import { TimelineItem } from '../types';
import { TIMELINE_ITEMS } from '../data/skanderbegData';
import { Calendar, MapPin, Users, ChevronDown, ChevronUp, Search, Sparkles, Award, Shield, BookOpen } from 'lucide-react';

interface TimelineSectionProps {
  selectedEventId?: string | null;
  onSelectEvent: (eventId: string) => void;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({
  selectedEventId,
  onSelectEvent
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    'femijeria': true,
    'traktati-gaetes': true
  });

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const categories = [
    { id: 'all', label: 'Të Gjitha Epokat' },
    { id: 'rinia', label: 'Fëmijëria & Oborri Osman' },
    { id: 'kryengritja', label: '1443 & Lidhja e Lezhës' },
    { id: 'diplomacia', label: 'Traktatet & Gaeta' },
    { id: 'betejat', label: 'Ekspedita në Itali' },
    { id: 'trashegimia', label: 'Kryqëzata & Pavdekësia' },
  ];

  const filteredItems = TIMELINE_ITEMS.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.year.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.keyFigures.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="kronika" className="py-16 bg-stone-900/60 text-stone-100 border-b border-stone-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <span>Kronologjia Ndërvepruese</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-100 uppercase">
            Hapat e Historisë së Kastriotit
          </h2>
          <p className="mt-3 text-stone-400 text-sm sm:text-base">
            Ndiqni me saktësi shkencore dhe dokumentare çdo fazë të jetës, ngritjes politike, betejave dhe marrëveshjeve diplomatike.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="mb-10 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Category tabs */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-stone-950 border border-stone-800 rounded-xl w-full sm:w-auto">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeCategory === cat.id
                      ? 'bg-amber-500 text-stone-950 font-bold shadow'
                      : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Kërko (p.sh. Gaeta, Dibër, Nish)..."
                className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-9 pr-4 py-2 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200 text-xs"
                >
                  Pastro
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Timeline Items List */}
        <div className="relative border-l-2 border-amber-600/30 ml-4 sm:ml-32 md:ml-40 space-y-10">
          {filteredItems.map((item) => {
            const isSelected = selectedEventId === item.id;
            const isExpanded = isSelected || !!expandedItems[item.id];

            return (
              <div 
                key={item.id} 
                id={`event-${item.id}`}
                className="relative pl-6 sm:pl-8 group"
              >
                {/* Year Marker on Left (Desktop) */}
                <div className="hidden sm:block absolute -left-32 md:-left-40 top-1 text-right w-24 md:w-32 pr-4">
                  <span className="font-serif font-bold text-base text-amber-400 block tracking-tight">
                    {item.year}
                  </span>
                  {item.exactDate && (
                    <span className="text-[11px] text-stone-500 block leading-tight">
                      {item.exactDate}
                    </span>
                  )}
                </div>

                {/* Timeline node icon */}
                <div 
                  onClick={() => {
                    toggleExpand(item.id);
                    onSelectEvent(item.id);
                  }}
                  className={`absolute -left-[17px] top-1 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
                    isSelected 
                      ? 'bg-amber-400 text-stone-950 ring-4 ring-amber-400/30 scale-110 shadow-lg' 
                      : 'bg-stone-950 border-2 border-amber-500/60 text-amber-400 hover:border-amber-300 hover:scale-105'
                  }`}
                >
                  <Shield className="w-4 h-4" />
                </div>

                {/* Card Container */}
                <div 
                  className={`rounded-2xl border transition-all duration-300 p-5 sm:p-6 backdrop-blur-sm ${
                    isSelected
                      ? 'bg-stone-950/95 border-amber-500 shadow-xl ring-1 ring-amber-500/30'
                      : 'bg-stone-950/70 border-stone-800 hover:border-stone-700'
                  }`}
                >
                  {/* Top Bar inside Card */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="sm:hidden font-serif font-bold text-amber-400 text-sm">
                        {item.year}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-stone-900 border border-amber-500/30 text-amber-300">
                        {item.badge}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-stone-400">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-red-400" />
                        {item.location}
                      </span>
                      <button
                        onClick={() => toggleExpand(item.id)}
                        className="p-1 rounded-md text-stone-400 hover:text-amber-300 hover:bg-stone-900 transition-colors"
                        aria-label={isExpanded ? 'Mbyll detajet' : 'Hap detajet'}
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 
                    onClick={() => toggleExpand(item.id)}
                    className="text-lg sm:text-xl font-serif font-bold text-stone-100 hover:text-amber-300 cursor-pointer transition-colors"
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-400 mt-0.5">
                    {item.subtitle}
                  </p>

                  {/* Prompt Excerpt Highlighting if present */}
                  {item.promptExcerpt && (
                    <div className="mt-3 p-3 rounded-lg bg-red-950/40 border border-red-800/40 text-xs sm:text-sm text-stone-300 italic font-sans flex items-start gap-2.5">
                      <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-amber-300 not-italic">Nga teksti historik: </span>
                        "{item.promptExcerpt}"
                      </div>
                    </div>
                  )}

                  {/* Summary Description */}
                  <p className="mt-3 text-sm text-stone-300 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Expandable Deep Content */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-stone-800/80 space-y-3 animate-in fade-in duration-300">
                      <div>
                        <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                          Zhvillimi i Hollësishëm Historik
                        </h4>
                        <p className="mt-1 text-xs sm:text-sm text-stone-300 leading-relaxed">
                          {item.historicalDetail}
                        </p>
                      </div>

                      {/* Key Figures */}
                      <div className="flex flex-wrap items-center gap-2 pt-2">
                        <span className="text-xs font-semibold text-stone-400 flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-stone-400" />
                          Figurat Kryesore:
                        </span>
                        {item.keyFigures.map((person, idx) => (
                          <span 
                            key={idx}
                            className="text-xs px-2 py-0.5 rounded-md bg-stone-900 text-stone-300 border border-stone-700/60"
                          >
                            {person}
                          </span>
                        ))}
                      </div>

                      {/* Historical Significance */}
                      <div className="p-3 rounded-lg bg-stone-900/90 border border-amber-500/20 text-xs text-stone-300">
                        <strong className="text-amber-400 block mb-1 flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5" />
                          Rëndësia Strategjike & Trashëgimia:
                        </strong>
                        {item.significance}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12 bg-stone-950 border border-stone-800 rounded-xl">
            <p className="text-stone-400 text-sm">Nuk u gjet asnjë ngjarje me fjalët kyçe "{searchQuery}".</p>
            <button 
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              className="mt-3 text-xs text-amber-400 hover:underline"
            >
              Rivendos të gjitha ngjarjet
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
