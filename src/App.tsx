import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TimelineSection } from './components/TimelineSection';
import { VideoCinemaSection } from './components/VideoCinemaSection';
import { PortraitGallery } from './components/PortraitGallery';
import { TreatiesSection } from './components/TreatiesSection';
import { TerritoryMap } from './components/TerritoryMap';
import { MilitaryTactics } from './components/MilitaryTactics';
import { HistoricalGlossary } from './components/HistoricalGlossary';
import { HistoricalQuiz } from './components/HistoricalQuiz';
import { Footer } from './components/Footer';
import { USER_PROMPT_SNIPPET } from './data/skanderbegData';

export default function App() {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>('femijeria');
  const [activeSection, setActiveSection] = useState<string>('kronika');

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sections = ['kronika', 'kinemaja-ai', 'galeria', 'harta', 'traktatet', 'glosari', 'taktikat', 'kuizi'];
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Web Speech API Narration Handler
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleToggleAudio = () => {
    if (!('speechSynthesis' in window)) {
      alert('Shfletuesi juaj nuk e mbështet leximin me zë (Web Speech API).');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(USER_PROMPT_SNIPPET);
      // Try to match Albanian or Italian/standard European voice if available
      const voices = window.speechSynthesis.getVoices();
      const sqVoice = voices.find(v => v.lang.startsWith('sq')) || voices.find(v => v.lang.startsWith('it')) || voices[0];
      if (sqVoice) {
        utterance.voice = sqVoice;
      }
      utterance.rate = 0.95; // Steady, stately pace
      utterance.pitch = 1.0;

      utterance.onend = () => {
        setIsPlayingAudio(false);
      };

      utterance.onerror = () => {
        setIsPlayingAudio(false);
      };

      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  const handleSelectEvent = (eventId: string) => {
    setSelectedEventId(eventId);
    const element = document.getElementById(`event-${eventId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      const kronikaSec = document.getElementById('kronika');
      if (kronikaSec) {
        kronikaSec.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-amber-500 selection:text-stone-950">
      {/* Top Navigation */}
      <Navbar 
        isPlayingAudio={isPlayingAudio}
        onToggleAudio={handleToggleAudio}
        activeSection={activeSection}
      />

      {/* Main Content Areas */}
      <main>
        {/* Hero & Original Chronicle Showcase */}
        <HeroSection 
          isPlayingAudio={isPlayingAudio}
          onToggleAudio={handleToggleAudio}
          onSelectEvent={handleSelectEvent}
        />

        {/* Detailed Timeline from 1405 to 1468 */}
        <TimelineSection 
          selectedEventId={selectedEventId}
          onSelectEvent={setSelectedEventId}
        />

        {/* Cinematic Video AI: Animated Scenes, Voice Speeches & Video Prompt Generator */}
        <VideoCinemaSection />

        {/* Historical Portrait & Artwork Gallery (Interactive Carousel) */}
        <PortraitGallery />

        {/* Treaties: Traktati i Gaetës (1451) & Lidhja e Lezhës (1444) */}
        <TreatiesSection />

        {/* Historical Glossary: Key terms (Sanxhak, Anzhuin, Sovranitet de jure) with interactive tooltips */}
        <HistoricalGlossary />

        {/* Strategic Map: Kruja, Petrela deri në Modriç, Nishi, Dibra, Gaeta, Napoli */}
        <TerritoryMap />

        {/* Military Doctrine, Arms & Tactics */}
        <MilitaryTactics />

        {/* Interactive Knowledge Quiz based on the prompt's chronicle */}
        <HistoricalQuiz />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
