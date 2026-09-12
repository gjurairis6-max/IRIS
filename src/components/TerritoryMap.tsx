import React, { useState } from 'react';
import { STRATEGIC_LOCATIONS } from '../data/skanderbegData';
import { StrategicLocation } from '../types';
import { MapPin, Shield, Flag, Compass, CheckCircle, Navigation, Info } from 'lucide-react';

export const TerritoryMap: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<StrategicLocation>(STRATEGIC_LOCATIONS[0]);
  const [filterType, setFilterType] = useState<string>('all');

  const filteredLocations = STRATEGIC_LOCATIONS.filter(loc => 
    filterType === 'all' || loc.type === filterType
  );

  return (
    <section id="harta" className="py-16 bg-stone-900/40 text-stone-100 border-b border-stone-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-700/50 text-red-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Gjeografia e Betejave & Aleancave</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-100 uppercase">
            Harta Strategjike: Nga Petrela në Modriç & Përtej Adriatikut
          </h2>
          <p className="mt-3 text-stone-400 text-sm sm:text-base">
            Eksploroni pikat kyçe të përmendura në kronikë: Çlirimi i territorit nga Petrela deri në Modriç, Beteja e Nishit, Sanxhaku i Dibrës, dhe lidhjet me Gaetën e Napolin.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {[
            { id: 'all', label: 'Të Gjitha Pikat' },
            { id: 'fortese', label: 'Kështjella & Baza' },
            { id: 'beteje', label: 'Fushëbeteja' },
            { id: 'kuvend', label: 'Kuvende' },
            { id: 'diplomaci', label: 'Diplomaci & Itali' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filterType === tab.id
                  ? 'bg-amber-500 text-stone-950 font-bold shadow'
                  : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid: Map visualization & Info Panel */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Interactive Tactical Map SVG */}
          <div className="lg:col-span-7 bg-stone-950 border border-stone-800 rounded-2xl p-5 relative overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800/80 mb-3 text-xs text-stone-400">
              <span className="font-mono text-amber-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5" />
                Teatri Ballkano-Mesdhetar (shek. XV)
              </span>
              <span className="text-[11px] text-stone-500">Kliko mbi pikat për të parë ngjarjet</span>
            </div>

            <div className="relative w-full aspect-[4/3] bg-stone-900/60 rounded-xl overflow-hidden border border-stone-800/60">
              
              {/* SVG Map Canvas */}
              <svg 
                viewBox="0 0 100 100" 
                className="w-full h-full select-none"
              >
                {/* Background Grid Lines */}
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#262626" strokeWidth="0.3" strokeDasharray="1 2" />
                  </pattern>
                  <radialGradient id="liberatedZoneGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0.02" />
                  </radialGradient>
                </defs>
                <rect width="100" height="100" fill="url(#grid)" />

                {/* Simplified Coastline / Adriatic Sea demarcation */}
                {/* Italian Peninsula Coastline (Left) */}
                <path 
                  d="M5 20 Q12 35 15 45 T25 60 T22 75 T15 90" 
                  fill="none" 
                  stroke="#44403c" 
                  strokeWidth="1.2" 
                  strokeDasharray="2 2"
                />
                <text x="12" y="28" fill="#78716c" fontSize="3" fontStyle="italic">Gadishulli Italiko-Napolitan</text>
                
                {/* Adriatic Sea Label */}
                <text x="32" y="48" fill="#52525b" fontSize="3.5" letterSpacing="0.4" fontStyle="italic" opacity="0.6">
                  DETI ADRIATIK
                </text>

                {/* Albanian & Balkan Coastline (Right) */}
                <path 
                  d="M42 25 Q45 32 46 38 T47 50 T48 64 T50 78 T52 88" 
                  fill="none" 
                  stroke="#78716c" 
                  strokeWidth="1.5" 
                />

                {/* Liberated Territory 1443: From Petrela to Modriç zone highlight */}
                <ellipse 
                  cx="62" 
                  cy="56" 
                  rx="18" 
                  ry="9" 
                  fill="url(#liberatedZoneGrad)" 
                  stroke="#ef4444" 
                  strokeWidth="0.8" 
                  strokeDasharray="1.5 1.5"
                />
                <text x="56" y="50" fill="#f87171" fontSize="2.8" fontWeight="bold" opacity="0.9">
                  Territori: Petrelë ➔ Modriç (1443)
                </text>

                {/* Strategic Sea Routes across Adriatic (Gaeta/Napoli/Puglia <-> Kruja/Lezha) */}
                <line x1="14" y1="46" x2="48" y2="52" stroke="#eab308" strokeWidth="0.7" strokeDasharray="1.5 1.5" opacity="0.7" />
                <line x1="24" y1="64" x2="48" y2="52" stroke="#3b82f6" strokeWidth="0.7" strokeDasharray="1.5 1.5" opacity="0.7" />
                <line x1="80" y1="20" x2="48" y2="52" stroke="#ef4444" strokeWidth="0.7" strokeDasharray="1.5 1.5" opacity="0.7" />

                {/* Location Pins on Map */}
                {filteredLocations.map(loc => {
                  const isCurrent = selectedLocation.id === loc.id;
                  const pinColor = 
                    loc.type === 'fortese' ? '#ef4444' : 
                    loc.type === 'beteje' ? '#f59e0b' : 
                    loc.type === 'kuvend' ? '#10b981' : '#3b82f6';

                  return (
                    <g 
                      key={loc.id} 
                      onClick={() => setSelectedLocation(loc)}
                      className="cursor-pointer transition-transform hover:scale-125"
                    >
                      {/* Outer pulse when selected */}
                      {isCurrent && (
                        <circle 
                          cx={loc.x} 
                          cy={loc.y} 
                          r="4" 
                          fill={pinColor} 
                          opacity="0.3"
                        >
                          <animate attributeName="r" values="3;6;3" dur="2s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.6;0.1;0.6" dur="2s" repeatCount="indefinite" />
                        </circle>
                      )}
                      
                      <circle 
                        cx={loc.x} 
                        cy={loc.y} 
                        r={isCurrent ? "2.5" : "1.8"} 
                        fill={pinColor} 
                        stroke="#09090b" 
                        strokeWidth="0.6" 
                      />

                      <text 
                        x={loc.x + 2.5} 
                        y={loc.y + 1} 
                        fill={isCurrent ? "#fef08a" : "#e4e4e7"} 
                        fontSize="2.7" 
                        fontWeight={isCurrent ? "bold" : "normal"}
                        filter="drop-shadow(0px 1px 2px rgba(0,0,0,0.8))"
                      >
                        {loc.name.split(' ')[0]}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Map Legend on bottom right */}
              <div className="absolute bottom-2 right-2 bg-stone-950/90 border border-stone-800 rounded-lg p-2 text-[10px] space-y-1 backdrop-blur-sm">
                <div className="flex items-center gap-1.5 text-stone-300">
                  <span className="w-2 h-2 rounded-full bg-red-500" /> Kështjella Arbërore
                </div>
                <div className="flex items-center gap-1.5 text-stone-300">
                  <span className="w-2 h-2 rounded-full bg-amber-500" /> Fushëbetejë / Nish / Dibër
                </div>
                <div className="flex items-center gap-1.5 text-stone-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Kuvendi i Lezhës
                </div>
                <div className="flex items-center gap-1.5 text-stone-300">
                  <span className="w-2 h-2 rounded-full bg-blue-500" /> Diplomaci (Gaetë / Napoli)
                </div>
              </div>

            </div>

            {/* Quick List of Locations beneath Map */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
              {filteredLocations.map(loc => (
                <button
                  key={loc.id}
                  onClick={() => setSelectedLocation(loc)}
                  className={`p-2 rounded-lg text-left text-xs transition-all border ${
                    selectedLocation.id === loc.id
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-semibold'
                      : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <div className="truncate">{loc.name}</div>
                  <div className="text-[10px] text-stone-500 capitalize">{loc.type}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Location Detail Card (Right Column) */}
          <div className="lg:col-span-5 bg-stone-950 border border-stone-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-stone-800 pb-4 mb-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 px-2 py-0.5 rounded bg-stone-900 border border-stone-800">
                  {selectedLocation.region}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-100 mt-2">
                  {selectedLocation.name}
                </h3>
              </div>
              <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 text-amber-400">
                <MapPin className="w-6 h-6" />
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-stone-300 leading-relaxed">
              <div>
                <h4 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">
                  Përmbajtja & Konteksti Historik
                </h4>
                <p>{selectedLocation.historicalContext}</p>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">
                  Ngjarjet Kryesore të Zhvilluara
                </h4>
                <div className="space-y-1.5">
                  {selectedLocation.events.map((ev, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-stone-300">
                      <CheckCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span>{ev}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-900/90 border border-amber-500/30">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                  <Shield className="w-3.5 h-3.5" />
                  Rëndësia Taktike & Strategjike
                </h4>
                <p className="text-xs text-stone-300">{selectedLocation.importance}</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
