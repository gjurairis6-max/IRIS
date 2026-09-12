import React, { useState } from 'react';
import { TREATY_OF_GAETA, LEAGUE_OF_LEZHA } from '../data/skanderbegData';
import { BookOpen, ShieldCheck, Scale, CheckCircle, ExternalLink, Globe, Landmark } from 'lucide-react';

export const TreatiesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'gaeta' | 'lezha'>('gaeta');

  const activeData = activeTab === 'gaeta' ? TREATY_OF_GAETA : LEAGUE_OF_LEZHA;

  return (
    <section id="traktatet" className="py-16 bg-stone-950 text-stone-100 border-b border-stone-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-700/50 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Scale className="w-3.5 h-3.5" />
            <span>Diplomacia & Shtetndërtimi Arbëror</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-100 uppercase">
            Traktatet & Kuvendet Historike
          </h2>
          <p className="mt-3 text-stone-400 text-sm sm:text-base">
            Analiza e thelluar e dy akteve më madhore gjeopolitike: Traktati i Gaetës (1451) dhe Besëlidhja e Lezhës (1444).
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 bg-stone-900 border border-stone-800 rounded-xl">
            <button
              onClick={() => setActiveTab('gaeta')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'gaeta'
                  ? 'bg-amber-500 text-stone-950 shadow-md font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>Traktati i Gaetës (1451)</span>
            </button>
            <button
              onClick={() => setActiveTab('lezha')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'lezha'
                  ? 'bg-amber-500 text-stone-950 shadow-md font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Landmark className="w-4 h-4" />
              <span>Besëlidhja e Lezhës (1444)</span>
            </button>
          </div>
        </div>

        {/* Main Document Display */}
        <div className="max-w-4xl mx-auto bg-stone-900/80 border border-stone-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-xl">
          
          {/* Header of active treaty */}
          <div className="border-b border-stone-800 pb-6 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-mono uppercase tracking-wider px-2.5 py-1 rounded bg-stone-950 border border-stone-700 text-amber-400">
                Viti: {activeData.year} • Vendi: {activeData.place}
              </span>
              <span className="text-xs text-stone-400">
                Partneri: <strong className="text-stone-200">{activeData.partner}</strong>
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100 mt-3">
              {activeData.title}
            </h3>
            <p className="text-sm sm:text-base text-stone-300 mt-2 leading-relaxed">
              {activeData.summary}
            </p>
          </div>

          {/* Special Focus: De Jure vs De Facto for Traktati i Gaetes */}
          {activeTab === 'gaeta' && (
            <div className="mb-8 p-5 rounded-xl bg-gradient-to-r from-red-950/40 via-stone-900 to-amber-950/40 border border-amber-500/30">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-serif font-bold text-amber-300 uppercase tracking-wide">
                    Thelbi Juridik: Sovraniteti "De Jure" vs "De Facto"
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-200 mt-1 leading-relaxed">
                    {activeData.deJureVsDeFacto}
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 mt-4">
                    <div className="p-3 rounded-lg bg-stone-950/70 border border-stone-800">
                      <span className="text-xs font-bold text-red-400 uppercase block mb-1">De Jure (Formale)</span>
                      <p className="text-xs text-stone-300">
                        Në letrat diplomatike, Skënderbeu betohej si vasal i mbrojtur nga Kurora Aragoneze e Alfonsit V, duke i dhënë Napolit të drejtën të paraqitej si mbrojtësi i Arbërisë.
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-stone-950/70 border border-stone-800">
                      <span className="text-xs font-bold text-emerald-400 uppercase block mb-1">De Facto (Reale)</span>
                      <p className="text-xs text-stone-300">
                        Skënderbeu ruajti kontrollin e plotë të ushtrisë, taksave, vendimmarrjes së brendshme dhe diplomacisë. Garnizoni napolitan në Krujë i bindej komandës së tij.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Key Clauses */}
          <div>
            <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              Klauzolat Kryesore të Marrëveshjes
            </h4>
            <div className="space-y-3">
              {activeData.keyClauses.map((clause, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-stone-950/60 border border-stone-800/80">
                  <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                    {clause}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Historical Impact */}
          <div className="mt-6 pt-5 border-t border-stone-800 text-xs sm:text-sm text-stone-300">
            <strong className="text-amber-400 block mb-1">Ndikimi Afatgjatë:</strong>
            {activeData.historicalImpact}
          </div>

        </div>

      </div>
    </section>
  );
};
