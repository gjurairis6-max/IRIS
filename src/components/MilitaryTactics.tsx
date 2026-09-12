import React from 'react';
import { MILITARY_TACTICS } from '../data/skanderbegData';
import { EmblemKastrioti } from './EmblemKastrioti';
import { BattleArtStudio } from './BattleArtStudio';
import { Mountain, Shield, Compass, Crown, Swords, Award, Zap } from 'lucide-react';

export const MilitaryTactics: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Mountain': return <Mountain className="w-6 h-6 text-amber-400" />;
      case 'Shield': return <Shield className="w-6 h-6 text-red-400" />;
      case 'Compass': return <Compass className="w-6 h-6 text-amber-300" />;
      case 'Crown': return <Crown className="w-6 h-6 text-yellow-400" />;
      default: return <Swords className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <section id="taktikat" className="py-16 bg-stone-950 text-stone-100 border-b border-stone-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-700/50 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Swords className="w-3.5 h-3.5" />
            <span>Doktrina Ushtarake & Taktika</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-100 uppercase">
            Arti Ushtarak që Sfidoi Perandorinë
          </h2>
          <p className="mt-3 text-stone-400 text-sm sm:text-base">
            Si arriti një ushtri prej 8,000–12,000 luftëtarësh arbërorë të zmbrapste ushtritë perandorake prej 100,000 trupash të dy sulltanëve më të fuqishëm (Murati II dhe Mehmeti II).
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {MILITARY_TACTICS.map((tactic, idx) => (
            <div 
              key={idx}
              className="bg-stone-900/70 border border-stone-800 rounded-2xl p-6 hover:border-amber-500/40 transition-all duration-300 group shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 group-hover:border-amber-500/50 transition-colors">
                  {getIcon(tactic.icon)}
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
                    {tactic.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
                    {tactic.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Highlight Banner: Përkrenarja & Shpata e Skënderbeut */}
        <div className="bg-gradient-to-r from-red-950/80 via-stone-900 to-stone-950 border border-red-800/50 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
          <div className="grid md:grid-cols-12 gap-6 items-center">
            
            <div className="md:col-span-3 flex justify-center">
              <div className="relative">
                <EmblemKastrioti size="xl" variant="helmet" />
                <div className="text-center mt-2 text-[11px] text-amber-400 font-mono">
                  Përkrenarja me Brirët e Dhisë
                </div>
              </div>
            </div>

            <div className="md:col-span-9 space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
                  Reliket e Shenjta Historike
                </span>
                <span className="text-xs text-stone-400">Kunsthistorisches Museum, Vjenë</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-100">
                Përkrenarja dhe Shpata e Drejtësisë
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                Përkrenarja e Skënderbeut është e punuar me hekur të rrahur dhe e kurorëzuar me kokën e një dhie me brirë të praruar me ar. 
                Sipas gojëdhënave dhe simboleve helenistike, koka e dhisë lidhet me Aleksandrin e Madh (Dhul-Karnejn / "Dy-Brirëshi"). 
                Shpata e tij me dy tehe dhe dorezë ari peshonte mbi 3.2 kg, me një thyerje harkore që kërkonte forcë të pashoqe fizike në dyluftim.
              </p>
              <div className="flex flex-wrap gap-4 pt-2 text-xs text-stone-400">
                <span className="flex items-center gap-1.5 text-amber-300">
                  <Zap className="w-3.5 h-3.5" />
                  Mbi 30 beteja të fituara
                </span>
                <span className="flex items-center gap-1.5 text-stone-300">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  Titulli papal "Athleta Christi"
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Studioja e Ilustrimeve Taktike të Betejave (AI Visual Generator) */}
        <BattleArtStudio />

      </div>
    </section>
  );
};
