import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/skanderbegData';
import { Award, CheckCircle2, XCircle, RotateCcw, ArrowRight, Trophy, HelpCircle, BookOpen } from 'lucide-react';

export const HistoricalQuiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];
  const isCurrentAnswered = selectedAnswers[currentQ.id] !== undefined;

  const handleSelectOption = (index: number) => {
    if (isCurrentAnswered) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQ.id]: index
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setShowResults(false);
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  const score = calculateScore();
  const percentage = Math.round((score / QUIZ_QUESTIONS.length) * 100);

  const getRank = () => {
    if (percentage === 100) return { title: 'Kryekomandant i Arbërisë', desc: 'Njohuri të përkryera historike mbi të gjitha aspektet e jetës së Skënderbeut!' };
    if (percentage >= 80) return { title: 'Kapidan i Lidhjes së Lezhës', desc: 'Njohuri të thella mbi betejat, traktatet dhe historinë kombëtare.' };
    if (percentage >= 50) return { title: 'Kalorës i Krujës', desc: 'Njohuri themelore të mira. Mund të rishikoni kronikën për t\'u bërë strateg i plotë.' };
    return { title: 'Mërgimtar në Kërkim të Dijes', desc: 'Rilexoni me kujdes kronikën për të zotëruar çdo detaj të heroit tonë!' };
  };

  return (
    <section id="kuizi" className="py-16 bg-stone-900/60 text-stone-100 border-b border-stone-800 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Sfidë Diturie Historike</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-100 uppercase">
            Kuizi: Sa e Njeh Kronikën e Skënderbeut?
          </h2>
          <p className="mt-3 text-stone-400 text-sm">
            6 pyetje interaktive të bazuara besnikërisht mbi faktet historike të jetës, ngritjes, traktateve dhe betejave të Gjergj Kastriotit.
          </p>
        </div>

        {!showResults ? (
          <div className="bg-stone-950 border border-stone-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
            
            {/* Progress Bar & Header */}
            <div className="flex items-center justify-between border-b border-stone-800 pb-4 mb-6">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
                Pyetja {currentQuestionIndex + 1} nga {QUIZ_QUESTIONS.length}
              </span>
              <span className="text-xs text-stone-400 font-medium">
                Tema: <strong className="text-stone-300">{currentQ.relatedTopic}</strong>
              </span>
            </div>

            {/* Progress dots */}
            <div className="flex gap-1.5 mb-6">
              {QUIZ_QUESTIONS.map((q, idx) => {
                const answered = selectedAnswers[q.id] !== undefined;
                const isCorrect = answered && selectedAnswers[q.id] === q.correctIndex;
                const isCurrent = currentQuestionIndex === idx;

                let bgClass = 'bg-stone-800';
                if (answered) {
                  bgClass = isCorrect ? 'bg-emerald-500' : 'bg-red-500';
                } else if (isCurrent) {
                  bgClass = 'bg-amber-400';
                }

                return (
                  <div 
                    key={q.id}
                    className={`h-1.5 flex-1 rounded-full transition-all ${bgClass}`}
                  />
                );
              })}
            </div>

            {/* Question Text */}
            <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-100 mb-6">
              {currentQ.question}
            </h3>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedAnswers[currentQ.id] === idx;
                const isCorrect = currentQ.correctIndex === idx;

                let optionStyle = 'bg-stone-900/90 border-stone-800 hover:border-amber-500/60 text-stone-200';
                
                if (isCurrentAnswered) {
                  if (isCorrect) {
                    optionStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500/30';
                  } else if (isSelected) {
                    optionStyle = 'bg-red-950/80 border-red-500 text-red-200 ring-1 ring-red-500/30';
                  } else {
                    optionStyle = 'bg-stone-950/50 border-stone-800/60 text-stone-500 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isCurrentAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-4 rounded-xl text-left text-xs sm:text-sm font-medium border transition-all duration-200 flex items-center justify-between ${optionStyle}`}
                  >
                    <span>{option}</span>
                    {isCurrentAnswered && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    )}
                    {isCurrentAnswered && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Educational Explanation upon answer */}
            {isCurrentAnswered && (
              <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 text-xs sm:text-sm text-stone-300 mb-6 animate-in fade-in duration-300">
                <div className="flex items-start gap-2.5">
                  <BookOpen className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-400 block mb-1">Shpjegimi Historik:</strong>
                    {currentQ.explanation}
                  </div>
                </div>
              </div>
            )}

            {/* Next Button */}
            {isCurrentAnswered && (
              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm transition-colors shadow-lg"
                >
                  <span>{currentQuestionIndex < QUIZ_QUESTIONS.length - 1 ? 'Pyetja Tjetër' : 'Shiko Rezultatet'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>
        ) : (
          /* Results Card */
          <div className="bg-stone-950 border border-amber-500/30 rounded-2xl p-8 text-center shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border-2 border-amber-500 flex items-center justify-center mx-auto mb-4 text-amber-400">
              <Trophy className="w-8 h-8" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100 mb-2">
              Rezultati i Sfidës
            </h3>
            <p className="text-xs uppercase tracking-wider text-amber-400 font-mono mb-4">
              Titulli yt i nderit:
            </p>

            <div className="p-5 rounded-xl bg-stone-900 border border-stone-800 max-w-md mx-auto mb-6">
              <div className="text-xl sm:text-2xl font-serif font-bold text-amber-300">
                {getRank().title}
              </div>
              <p className="text-xs sm:text-sm text-stone-300 mt-2">
                {getRank().desc}
              </p>
              <div className="mt-4 text-3xl font-serif font-extrabold text-stone-100">
                {score} / {QUIZ_QUESTIONS.length}
                <span className="text-xs text-stone-400 font-sans font-normal ml-2">
                  ({percentage}% të sakta)
                </span>
              </div>
            </div>

            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm transition-colors shadow-lg"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Provo Përsëri Kuizin</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
