import React, { useState } from 'react';
import { EmblemKastrioti } from './EmblemKastrioti';
import { Volume2, VolumeX, Shield, Swords, Flag, Landmark, Sparkles, Quote, ArrowDown, Check } from 'lucide-react';
import { FAMOUS_QUOTES } from '../data/skanderbegData';

interface HeroSectionProps {
  isPlayingAudio: boolean;
  onToggleAudio: () => void;
  onSelectEvent: (eventId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  isPlayingAudio,
  onToggleAudio,
  onSelectEvent
}) => {
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);
  const [copiedQuote, setCopiedQuote] = useState(false);

  const currentQuote = FAMOUS_QUOTES[activeQuoteIndex];

  const handleCopyQuote = () => {
    navigator.clipboard.writeText(`"${currentQuote.quote}" — ${currentQuote.author} (${currentQuote.context})`);
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 2000);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 text-stone-100 pt-10 pb-16 border-b border-stone-800">
      {/* Subtle medieval pattern background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#eab308_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Hero Header */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <div className="inline-flex items-center justify-center gap-3 px-4 py-1.5 rounded-full bg-red-950/70 border border-red-700/50 text-red-200 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-6 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span>Kryetrimi & Heroi Kombëtar i Arbërisë • 1405–1468</span>
          </div>

          <div className="flex justify-center mb-6">
            <div className="relative">
              <EmblemKastrioti size="xl" variant="shield" />
              <div className="absolute -bottom-2 -right-2 bg-stone-900 border border-amber-500/60 rounded-full p-1.5 shadow-lg">
                <EmblemKastrioti size="sm" variant="helmet" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-stone-100 uppercase">
            Gjergj Kastrioti{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">
              Skënderbeu
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-stone-300 max-w-3xl mx-auto font-sans leading-relaxed">
            Nga pengu 9-vjeçar në oborrin e Sulltanit deri te Kryekomandanti i Arbërisë dhe Mburoja e Qytetërimit Evropian. 
            Një çerek shekulli qëndresë, gjenialitet ushtarak dhe diplomaci vizionare që ndryshoi rrjedhën e historisë.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-8">
            <div className="bg-stone-900/90 border border-stone-800 rounded-xl p-3.5 text-center hover:border-amber-500/40 transition-colors">
              <div className="text-2xl sm:text-3xl font-serif font-extrabold text-amber-400">25 Vjet</div>
              <div className="text-xs text-stone-400 mt-0.5">Qëndresë e Pathyeshme (1443–1468)</div>
            </div>
            <div className="bg-stone-900/90 border border-stone-800 rounded-xl p-3.5 text-center hover:border-amber-500/40 transition-colors">
              <div className="text-2xl sm:text-3xl font-serif font-extrabold text-red-400">30+</div>
              <div className="text-xs text-stone-400 mt-0.5">Beteja Ushtarake të Fituara</div>
            </div>
            <div className="bg-stone-900/90 border border-stone-800 rounded-xl p-3.5 text-center hover:border-amber-500/40 transition-colors">
              <div className="text-2xl sm:text-3xl font-serif font-extrabold text-amber-400">1444</div>
              <div className="text-xs text-stone-400 mt-0.5">Lidhja e Lezhës (Bashkimi Arbëror)</div>
            </div>
            <div className="bg-stone-900/90 border border-stone-800 rounded-xl p-3.5 text-center hover:border-amber-500/40 transition-colors">
              <div className="text-2xl sm:text-3xl font-serif font-extrabold text-amber-300">1451</div>
              <div className="text-xs text-stone-400 mt-0.5">Traktati i Gaetës (Aleanca me Napolin)</div>
            </div>
          </div>
        </div>

        {/* The User's Historical Chronicle (Manuscript Card) */}
        <div className="max-w-4xl mx-auto mt-10">
          <div className="relative rounded-2xl bg-stone-900/95 border-2 border-amber-600/30 shadow-2xl p-6 sm:p-8 backdrop-blur-md overflow-hidden">
            
            {/* Top Bar of Manuscript */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-red-950/80 border border-red-700/60 text-amber-400">
                  <Flag className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-serif font-bold text-amber-400 tracking-wide uppercase">
                    Kronika Historike e Kastriotit
                  </h2>
                  <p className="text-xs text-stone-400">Teksti thelbësor dhe nyjet vendimtare të jetës së heroit</p>
                </div>
              </div>

              {/* Audio Listen Button */}
              <button
                onClick={onToggleAudio}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all duration-300 shadow-md ${
                  isPlayingAudio
                    ? 'bg-red-900 text-stone-100 border border-red-500 ring-2 ring-red-500/40 animate-pulse'
                    : 'bg-amber-600/20 text-amber-300 hover:bg-amber-600/30 border border-amber-500/40'
                }`}
              >
                {isPlayingAudio ? (
                  <>
                    <VolumeX className="w-4 h-4 text-red-300" />
                    <span>Ndalo Leximin</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-amber-400" />
                    <span>Dëgjo Kronikën me Zë</span>
                  </>
                )}
              </button>
            </div>

            {/* Interactive Chronicle Body */}
            <div className="mt-6 space-y-4 text-stone-200 text-sm sm:text-base leading-relaxed font-sans">
              <p>
                Si njëri prej djemëve të familjes fisnike të Kastriotëve, ai u rrëmbye në moshën{' '}
                <button 
                  onClick={() => onSelectEvent('femijeria')} 
                  className="px-1.5 py-0.5 rounded bg-red-950/90 text-red-300 border border-red-800/80 hover:bg-red-900 transition-colors font-medium underline underline-offset-2"
                  title="Shiko detajet e fëmijërisë dhe pengut në Edrene"
                >
                  9 vjeçare nga perandoria Osmane
                </button>{' '}
                dhe u dërgua në oborrin e saj. Fëmijëria e tij kaloi me sfida duke i mbijetuar politikave dhe intrigave të oborrit osman, dhe duke u arsimuar.
              </p>

              <p>
                Njohur për ekselencën dhe zgjuarsinë e tij ai më pas hyri në shërbim të Sulltanit për njëzet vitet e ardhshme. U ngrit sipas gradave duke u bërë deri{' '}
                <button 
                  onClick={() => onSelectEvent('sherbimi-dibra')} 
                  className="px-1.5 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800/80 hover:bg-amber-900 transition-colors font-medium underline underline-offset-2"
                  title="Mëso më shumë për periudhën si Sanxhakbej i Dibrës"
                >
                  Sanxhakbej i Sanxhakut të Dibrës në vitin 1440
                </button>.
              </p>

              <p>
                Më 1443, pas një planifikimi të gjatë dhe mbledhjes së djemve të tjerë bashkëkombas dezertoi ushtrinë osmane gjatë{' '}
                <button 
                  onClick={() => onSelectEvent('nishi-kruja')} 
                  className="px-1.5 py-0.5 rounded bg-red-950/90 text-red-300 border border-red-800/80 hover:bg-red-900 transition-colors font-medium underline underline-offset-2"
                  title="Zbulo ngjarjet e betejës së Nishit dhe çlirimit të Krujës"
                >
                  Betejës së Nishit
                </button>{' '}
                dhe u bë sundimtar i Krujës, në një territor nga{' '}
                <strong className="text-amber-300 font-semibold">Petrela deri në Modriç</strong>. Në vitin 1444, ai themeloi{' '}
                <button 
                  onClick={() => onSelectEvent('lidhja-lezhes')} 
                  className="px-1.5 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800/80 hover:bg-amber-900 transition-colors font-medium underline underline-offset-2"
                  title="Shiko Kuvendin dhe Besëlidhjen e Lezhës"
                >
                  Lidhjen e Lezhës
                </button>{' '}
                me mbështetjen e fisnikërisë së kohës.
              </p>

              <p>
                Në vitin 1451, Skënderbeu nënshkroi{' '}
                <button 
                  onClick={() => onSelectEvent('traktati-gaetes')} 
                  className="px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/80 hover:bg-emerald-900 transition-colors font-medium underline underline-offset-2"
                  title="Eksploro paktin gjeopolitik me Mbretin e Napolit"
                >
                  Traktatin e Gaetës
                </button>
                , ku njohu sovranitetin de jure të Mbretërisë së Napolit mbi Arbërinë, duke siguruar një aleancë mbrojtëse, edhe pse mbeti një sundimtar i pavarur. 
                Në vitet 1460–61 mbështeti{' '}
                <button 
                  onClick={() => onSelectEvent('ekspedita-itali')} 
                  className="px-1.5 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-800/80 hover:bg-blue-900 transition-colors font-medium underline underline-offset-2"
                  title="Shiko ekspeditën në Barleta dhe Troia"
                >
                  Ferdinandin I të Napolit
                </button>{' '}
                në luftërat kundër Gjonit II të Anzhuinëve.
              </p>

              <p>
                Në vitin 1463 u bë komandanti kryesor i forcave kryqtare të{' '}
                <button 
                  onClick={() => onSelectEvent('kryqezata-piut')} 
                  className="px-1.5 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-800/80 hover:bg-purple-900 transition-colors font-medium underline underline-offset-2"
                  title="Kryqëzata evropiane e Papa Piut II"
                >
                  Papa Piut II
                </button>
                , por papa vdiq ndërsa ushtritë ende po mblidheshin. Së bashku me venedikasit luftoi kundër osmanëve gjatë Luftës osmano–venedikase të viteve 1463–79, deri në{' '}
                <button 
                  onClick={() => onSelectEvent('lufta-venediku-vdekja')} 
                  className="px-1.5 py-0.5 rounded bg-red-950/90 text-red-300 border border-red-800/80 hover:bg-red-900 transition-colors font-medium underline underline-offset-2"
                  title="Vdekja dhe lavdia e përjetshme më 17 Janar 1468"
                >
                  vdekjen e tij më 17 Janar 1468
                </button>.
              </p>
            </div>

            {/* Quick interactive hint */}
            <div className="mt-5 pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Kliko mbi pikat e theksuara për të shkuar te ngjarja përkatëse
              </span>
              <span className="text-amber-500/80 font-mono text-[11px]">Arkiva Historike</span>
            </div>
          </div>
        </div>

        {/* Famous Historical Quotes Carousel */}
        <div className="max-w-3xl mx-auto mt-8 bg-stone-900/70 border border-amber-500/20 rounded-xl p-5 backdrop-blur-sm">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <Quote className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-base sm:text-lg font-serif italic text-amber-200">
                  "{currentQuote.quote}"
                </p>
                <p className="text-xs text-stone-400 mt-1 font-sans">
                  — <span className="font-semibold text-stone-200">{currentQuote.author}</span> • {currentQuote.context}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={handleCopyQuote}
                className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors text-xs flex items-center gap-1"
                title="Kopjo thënien"
              >
                {copiedQuote ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Quote className="w-3.5 h-3.5" />}
              </button>
              <div className="flex gap-1">
                {FAMOUS_QUOTES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveQuoteIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      activeQuoteIndex === idx ? 'bg-amber-400 w-5' : 'bg-stone-700 hover:bg-stone-500'
                    }`}
                    aria-label={`Thënia ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll down prompt */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => {
              const el = document.getElementById('kronika');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-2 text-xs font-semibold text-stone-400 hover:text-amber-400 tracking-wider uppercase transition-colors"
          >
            <span>Eksploro Kronikën Ndërvepruese</span>
            <ArrowDown className="w-4 h-4 animate-bounce text-amber-400" />
          </button>
        </div>

      </div>
    </section>
  );
};
