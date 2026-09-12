import React, { useState, useEffect, useRef } from 'react';
import { CINEMATIC_SCENES, CinematicScene } from '../data/cinemaData';
import { 
  playWarHornFanfare, 
  playWarDrumHit, 
  startBattlefieldAmbience, 
  stopBattlefieldAmbience 
} from '../utils/audioSynth';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  X, 
  Copy, 
  Check, 
  Sparkles, 
  Clapperboard, 
  Video, 
  Camera, 
  Sliders, 
  Film, 
  Flame, 
  Mic, 
  MicOff, 
  Info,
  ChevronRight
} from 'lucide-react';

export const VideoCinemaSection: React.FC = () => {
  const [activeSceneId, setActiveSceneId] = useState<string>('kthimi-kruje-1443');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isSpeakingQuote, setIsSpeakingQuote] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [copiedPromptPlatform, setCopiedPromptPlatform] = useState<string | null>(null);

  // Video AI Prompt Builder Customizers
  const [selectedPlatform, setSelectedPlatform] = useState<'veo' | 'sora' | 'runway'>('veo');
  const [customCamera, setCustomCamera] = useState<string>('cinematic_drone');
  const [customLens, setCustomLens] = useState<string>('anamorphic_35mm');
  const [customLighting, setCustomLighting] = useState<string>('golden_hour');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const timelineIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const drumIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const activeScene = CINEMATIC_SCENES.find(s => s.id === activeSceneId) || CINEMATIC_SCENES[0];

  // Stop speech when scene changes or unmounts
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeakingQuote(false);
    }
  }, [activeSceneId]);

  // Handle Play / Pause
  const togglePlay = () => {
    if (isPlaying) {
      pausePlayback();
    } else {
      startPlayback();
    }
  };

  const startPlayback = () => {
    setIsPlaying(true);
    if (!isMuted) {
      playWarHornFanfare();
      startBattlefieldAmbience();
    }

    // Play drum beats every 1.8 seconds during battle scenes
    if (!isMuted) {
      drumIntervalRef.current = setInterval(() => {
        playWarDrumHit(0.4);
      }, 1800);
    }

    // Timeline progress ticker
    timelineIntervalRef.current = setInterval(() => {
      setCurrentTime(prev => {
        if (prev >= activeScene.durationSeconds) {
          pausePlayback();
          return activeScene.durationSeconds;
        }
        return prev + 0.1;
      });
    }, 100);
  };

  const pausePlayback = () => {
    setIsPlaying(false);
    stopBattlefieldAmbience();
    if (drumIntervalRef.current) clearInterval(drumIntervalRef.current);
    if (timelineIntervalRef.current) clearInterval(timelineIntervalRef.current);
  };

  const restartPlayback = () => {
    pausePlayback();
    setCurrentTime(0);
    setTimeout(() => {
      startPlayback();
    }, 100);
  };

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      stopBattlefieldAmbience();
      if (drumIntervalRef.current) clearInterval(drumIntervalRef.current);
      if (timelineIntervalRef.current) clearInterval(timelineIntervalRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, []);

  // Text-To-Speech Speech Handler for Skanderbeg's Quote
  const toggleQuoteNarration = () => {
    if (!('speechSynthesis' in window)) {
      alert('Shfletuesi nuk e mbështet zërin (Web Speech API).');
      return;
    }

    if (isSpeakingQuote) {
      window.speechSynthesis.cancel();
      setIsSpeakingQuote(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(activeScene.speechQuote);
      
      const voices = window.speechSynthesis.getVoices();
      const sqVoice = voices.find(v => v.lang.startsWith('sq')) || voices.find(v => v.lang.startsWith('it')) || voices[0];
      if (sqVoice) {
        utterance.voice = sqVoice;
      }
      utterance.rate = 0.92;
      utterance.pitch = 0.95;

      utterance.onend = () => setIsSpeakingQuote(false);
      utterance.onerror = () => setIsSpeakingQuote(false);

      window.speechSynthesis.speak(utterance);
      setIsSpeakingQuote(true);

      // Play dramatic war horn at start of speech
      if (!isMuted) {
        playWarHornFanfare();
      }
    }
  };

  // Continuous 60fps Canvas Animation Render Loop (Ken Burns Motion Engine)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frameCount = 0;
    const particles: Array<{ x: number; y: number; size: number; speedX: number; speedY: number; opacity: number }> = [];

    // Initialize 70 embers and dust particles
    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * 1280,
        y: Math.random() * 720,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 1.5 - 0.5,
        speedY: -Math.random() * 1.8 - 0.5,
        opacity: Math.random() * 0.8 + 0.2
      });
    }

    const render = () => {
      frameCount++;
      const width = canvas.width;
      const height = canvas.height;

      // Camera pan calculation (Ken Burns effect based on currentTime or continuous breathing)
      const progress = activeScene.durationSeconds > 0 ? currentTime / activeScene.durationSeconds : 0;
      const panOffset = isPlaying ? progress * 60 : Math.sin(frameCount * 0.008) * 15;
      const zoomScale = isPlaying ? 1 + progress * 0.08 : 1 + Math.sin(frameCount * 0.005) * 0.02;

      ctx.save();
      // Apply Camera Center Zoom & Pan
      ctx.translate(width / 2, height / 2);
      ctx.scale(zoomScale, zoomScale);
      ctx.translate(-width / 2 - panOffset * 0.4, -height / 2);

      // 1. Sky Gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.7);
      const colors = activeScene.canvasTheme.skyGradient;
      skyGrad.addColorStop(0, colors[0]);
      skyGrad.addColorStop(0.35, colors[1]);
      skyGrad.addColorStop(0.7, colors[2]);
      skyGrad.addColorStop(1, colors[3]);
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Rising Sun or Torch/Moon Glow
      const glowGrad = ctx.createRadialGradient(width * 0.55 + panOffset, 240, 20, width * 0.55 + panOffset, 240, 320);
      glowGrad.addColorStop(0, 'rgba(254, 215, 170, 0.45)');
      glowGrad.addColorStop(0.5, 'rgba(245, 158, 11, 0.2)');
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      // 3. Far Distant Balkan Mountain Silhouettes
      ctx.fillStyle = '#140e0b';
      ctx.beginPath();
      ctx.moveTo(-100, 390);
      const peaks1 = [
        [-100, 390], [150, 260], [350, 340], [550, 220], [750, 310], [950, 180], [1150, 290], [1400, 240], [1400, 720], [-100, 720]
      ];
      peaks1.forEach(([x, y]) => ctx.lineTo(x, y));
      ctx.closePath();
      ctx.fill();

      // 4. Middle Ground Ridge & Kruja Mountain Fortress
      ctx.fillStyle = '#0a0705';
      ctx.beginPath();
      ctx.moveTo(-100, 450);
      const peaks2 = [
        [-100, 450], [120, 370], [320, 430], [520, 330], [720, 420], [920, 310], [1120, 390], [1400, 350], [1400, 720], [-100, 720]
      ];
      peaks2.forEach(([x, y]) => ctx.lineTo(x, y));
      ctx.closePath();
      ctx.fill();

      // Draw Kruja Citadel Towers on the Craggy Cliff
      if (activeScene.canvasTheme.terrainType === 'kruja_cliffs') {
        ctx.fillStyle = '#050403';
        // Main Keep
        ctx.fillRect(360, 260, 180, 110);
        // Left Watchtower
        ctx.fillRect(330, 230, 50, 140);
        // Right Bastion
        ctx.fillRect(520, 220, 55, 150);
        // Battlements (crenellations)
        for (let b = 330; b < 570; b += 22) {
          ctx.fillRect(b, 212, 12, 14);
        }
        // Church belfry silhouette
        ctx.beginPath();
        ctx.moveTo(450, 210);
        ctx.lineTo(470, 260);
        ctx.lineTo(430, 260);
        ctx.closePath();
        ctx.fill();
      }

      // 5. Atmospheric Low Fog / Dust Layer
      const fogGrad = ctx.createLinearGradient(0, 420, 0, 560);
      fogGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
      fogGrad.addColorStop(0.5, activeScene.canvasTheme.fogColor);
      fogGrad.addColorStop(1, 'rgba(12, 10, 9, 0.75)');
      ctx.fillStyle = fogGrad;
      ctx.fillRect(-100, 420, width + 200, 140);

      // 6. Foreground Cliff & Hero Staging Area
      const fgGrad = ctx.createLinearGradient(0, 490, 0, 720);
      fgGrad.addColorStop(0, '#120b08');
      fgGrad.addColorStop(1, '#050302');
      ctx.fillStyle = fgGrad;
      ctx.beginPath();
      ctx.moveTo(-100, 510);
      ctx.quadraticCurveTo(400, 480, 800, 530);
      ctx.quadraticCurveTo(1100, 560, 1400, 500);
      ctx.lineTo(1400, 720);
      ctx.lineTo(-100, 720);
      ctx.closePath();
      ctx.fill();

      // 7. Foreground Hero Silhouette (Gjergj Kastrioti Skënderbeu)
      const heroX = width * 0.44;
      const heroY = 550;

      // Animated cape fluttering
      const capeWave = Math.sin(frameCount * 0.08) * 12;
      ctx.fillStyle = '#991b1b'; // Crimson cloak
      ctx.beginPath();
      ctx.moveTo(heroX - 10, heroY - 75);
      ctx.quadraticCurveTo(heroX - 65 + capeWave, heroY - 60, heroX - 105 + capeWave * 1.5, heroY - 40);
      ctx.lineTo(heroX - 40, heroY - 15);
      ctx.closePath();
      ctx.fill();

      // Horse body & legs
      ctx.fillStyle = '#040302';
      ctx.beginPath();
      ctx.ellipse(heroX, heroY, 70, 42, -0.15, 0, Math.PI * 2);
      ctx.fill();
      // Horse neck and head raised proudly
      ctx.beginPath();
      ctx.moveTo(heroX + 45, heroY - 15);
      ctx.lineTo(heroX + 105, heroY - 65);
      ctx.lineTo(heroX + 120, heroY - 50);
      ctx.lineTo(heroX + 70, heroY + 15);
      ctx.closePath();
      ctx.fill();
      // Horse front leg raised in salute/stride
      ctx.lineWidth = 10;
      ctx.strokeStyle = '#040302';
      ctx.beginPath();
      ctx.moveTo(heroX + 55, heroY + 20);
      ctx.lineTo(heroX + 100, heroY + 80);
      ctx.moveTo(heroX - 45, heroY + 20);
      ctx.lineTo(heroX - 75, heroY + 105);
      ctx.stroke();

      // Skanderbeg Torso & Armor
      ctx.beginPath();
      ctx.moveTo(heroX - 15, heroY - 20);
      ctx.lineTo(heroX + 8, heroY - 80);
      ctx.lineTo(heroX + 32, heroY - 75);
      ctx.lineTo(heroX + 22, heroY - 15);
      ctx.closePath();
      ctx.fill();

      // Skanderbeg Helmet with Golden Goat Horns
      ctx.beginPath();
      ctx.arc(heroX + 20, heroY - 95, 16, 0, Math.PI * 2);
      ctx.fill();
      // Golden goat horn crest
      ctx.lineWidth = 4.5;
      ctx.strokeStyle = '#f59e0b';
      ctx.beginPath();
      ctx.moveTo(heroX + 20, heroY - 106);
      ctx.quadraticCurveTo(heroX - 6, heroY - 130, heroX - 26, heroY - 120);
      ctx.stroke();

      // Raised Scimitar / Sword
      ctx.strokeStyle = '#f8fafc';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(heroX + 25, heroY - 70);
      ctx.quadraticCurveTo(heroX + 70, heroY - 120, heroX + 105, heroY - 145);
      ctx.stroke();

      // Flagpole and Animated Double-Headed Eagle Red Banner
      const bannerX = heroX - 55;
      const bannerY = heroY - 180;
      // Flagpole
      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = 4.5;
      ctx.beginPath();
      ctx.moveTo(bannerX, bannerY);
      ctx.lineTo(bannerX, heroY + 30);
      ctx.stroke();

      // Red fabric fluttering with multi-point sine wave
      const flagWave1 = Math.sin(frameCount * 0.1) * 15;
      const flagWave2 = Math.cos(frameCount * 0.08) * 12;
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.moveTo(bannerX, bannerY);
      ctx.bezierCurveTo(
        bannerX - 50, bannerY - 10 + flagWave1, 
        bannerX - 90, bannerY + 15 + flagWave2, 
        bannerX - 140, bannerY + flagWave1
      );
      ctx.lineTo(bannerX - 135, bannerY + 70 + flagWave1);
      ctx.bezierCurveTo(
        bannerX - 90, bannerY + 80 + flagWave2, 
        bannerX - 50, bannerY + 60 + flagWave1, 
        bannerX, bannerY + 65
      );
      ctx.closePath();
      ctx.fill();

      // Silhouette of Double-headed eagle on the banner
      ctx.fillStyle = '#050302';
      ctx.beginPath();
      ctx.arc(bannerX - 65, bannerY + 35, 12, 0, Math.PI * 2);
      ctx.fill();

      // 8. Animated Embers and Dust Particles Drifting in the Wind
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < 0) p.y = height;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.fillStyle = `rgba(249, 115, 22, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 9. Cinema Letterbox 2.39:1 Anamorphic Aspect Bars
      ctx.restore(); // Restore camera pan/zoom

      // Top letterbox
      ctx.fillStyle = '#050302';
      ctx.fillRect(0, 0, width, 40);
      // Bottom letterbox
      ctx.fillRect(0, height - 40, width, 40);

      // Subtle Film Grain effect simulation
      ctx.fillStyle = 'rgba(255, 255, 255, 0.015)';
      for (let g = 0; g < 400; g++) {
        ctx.fillRect(Math.random() * width, Math.random() * height, 1, 1);
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [activeScene, isPlaying, currentTime]);

  // Copy customized AI Video Prompt
  const handleCopyPrompt = (platform: 'veo' | 'sora' | 'runway') => {
    let basePrompt = activeScene.aiVideoPrompts[platform];
    
    // Append user custom modifiers
    const cameraMap: Record<string, string> = {
      cinematic_drone: '8K dynamic FPV drone dive sweeping around the fortress battlements',
      dolly_zoom: 'Hitchcock vertigo dolly-zoom shot intensifying the psychological weight',
      close_up: 'Extreme intimate close-up tracking shot on eyes, weathered facial features, and helmet',
      tracking_charge: 'Ultra-fast ground-level tracking shot matching the galloping cavalry speed'
    };
    const lensMap: Record<string, string> = {
      anamorphic_35mm: 'Panavision 35mm anamorphic prime lens, subtle horizontal flare, cinematic oval bokeh',
      imax_70mm: 'Shot on IMAX 70mm film camera, crystal clear panoramic sharpness, massive depth of field',
      vintage_kodachrome: '1970s vintage 35mm Technicolor film stock aesthetic, authentic grain and rich warmth'
    };
    const lightingMap: Record<string, string> = {
      golden_hour: 'Warm golden hour rim lighting, long dramatic cast shadows, dust particles illuminated',
      storm_dusk: 'Stormy dusk twilight with lightning flashes illuminating dark billowing battle clouds',
      torch_night: 'Pitch black midnight illuminated solely by dancing orange torch flames and moonlight'
    };

    const finalPrompt = `${basePrompt} Camera Directive: ${cameraMap[customCamera]}. Lens & Format: ${lensMap[customLens]}. Lighting Atmosphere: ${lightingMap[customLighting]}.`;

    navigator.clipboard.writeText(finalPrompt);
    setCopiedPromptPlatform(platform);
    setTimeout(() => setCopiedPromptPlatform(null), 2500);
  };

  return (
    <section id="kinemaja-ai" className="py-20 bg-stone-950 border-t border-amber-500/20 text-stone-100 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-1/3 w-[600px] h-[600px] bg-red-950/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-semibold tracking-wider uppercase mb-4">
            <Clapperboard className="w-3.5 h-3.5 text-red-400" />
            <span>Kinemaja Historike & Rindërtimet Video AI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-stone-100 tracking-tight mb-4">
            Rindërtimet Kinematografike të Skënderbeut
          </h2>
          <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
            Përjetoni betejat dhe momentet kulmore të historisë shqiptare përmes videoplejerit 
            të animuar me lëvizje kamere, zërit narrativ të Skënderbeut dhe gjeneruesit të prompteve për video AI (Google Veo, Sora, Runway).
          </p>
        </div>

        {/* Episode Selector Navigation Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-8">
          {CINEMATIC_SCENES.map((scene, idx) => {
            const isActive = scene.id === activeSceneId;
            return (
              <button
                key={scene.id}
                onClick={() => {
                  pausePlayback();
                  setCurrentTime(0);
                  setActiveSceneId(scene.id);
                }}
                className={`text-left p-3 rounded-xl border transition-all duration-200 relative overflow-hidden ${
                  isActive
                    ? 'bg-amber-950/70 border-amber-500 ring-2 ring-amber-500/40 shadow-lg shadow-amber-950/40 text-stone-100'
                    : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono text-amber-400 font-bold">
                    EPISODI 0{idx + 1}
                  </span>
                  <span className="text-[10px] text-stone-400 font-mono">
                    {scene.durationSeconds}s
                  </span>
                </div>
                <div className="font-serif font-bold text-xs line-clamp-2 mb-1 text-stone-100">
                  {scene.title.split(':')[0]}
                </div>
                <div className="text-[10px] text-stone-400 truncate">
                  {scene.year.split(' ')[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Cinema Viewport (16:9 Aspect Ratio Master Display) */}
        <div className="bg-stone-900/90 border-2 border-amber-600/40 rounded-2xl overflow-hidden shadow-2xl relative mb-8">
          
          {/* Top Cinema Bar */}
          <div className="px-4 py-3 bg-stone-950/90 border-b border-stone-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />
              <div>
                <h3 className="font-serif font-bold text-stone-100 text-base sm:text-lg">
                  {activeScene.title}
                </h3>
                <p className="text-xs text-stone-400">
                  {activeScene.subtitle} • {activeScene.location}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Mute Toggle */}
              <button
                onClick={() => {
                  const nextState = !isMuted;
                  setIsMuted(nextState);
                  if (nextState) stopBattlefieldAmbience();
                }}
                className={`p-2 rounded-lg border transition-colors ${
                  isMuted
                    ? 'bg-stone-900 border-red-900/60 text-red-400'
                    : 'bg-stone-900 border-stone-800 text-stone-300 hover:text-amber-400'
                }`}
                title={isMuted ? 'Aktivizo Tingujt' : 'Çaktivizo Tingujt'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              {/* Fullscreen Toggle */}
              <button
                onClick={() => setIsFullscreen(true)}
                className="p-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 hover:text-amber-400 transition-colors"
                title="Shiko në Ekran të Plotë"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 60fps Canvas Display Surface */}
          <div className="relative aspect-[16/9] w-full bg-black flex items-center justify-center overflow-hidden">
            <canvas
              ref={canvasRef}
              width={1280}
              height={720}
              className="w-full h-full object-cover select-none"
            />

            {/* Play Overlay Button if Paused */}
            {!isPlaying && (
              <div className="absolute inset-0 bg-stone-950/40 backdrop-blur-[2px] flex flex-col items-center justify-center gap-4 transition-all">
                <button
                  onClick={togglePlay}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-amber-500 to-red-600 hover:from-amber-400 hover:to-red-500 text-stone-950 flex items-center justify-center shadow-2xl shadow-red-900/60 hover:scale-105 transition-transform"
                >
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-stone-950 translate-x-0.5" />
                </button>
                <div className="text-center px-4">
                  <span className="text-sm sm:text-base font-serif font-bold text-stone-100 block">
                    Luaj Skenën Kinematografike
                  </span>
                  <span className="text-xs text-amber-300/90 font-mono">
                    {activeScene.cameraMovementName}
                  </span>
                </div>
              </div>
            )}

            {/* In-Video Live Tagline Badge */}
            <div className="absolute top-5 left-5 z-10 max-w-md px-3.5 py-1.5 rounded-lg bg-stone-950/85 backdrop-blur-md border border-amber-500/30 text-amber-300 text-xs font-serif italic shadow-lg hidden sm:block">
              {activeScene.tagline}
            </div>

            {/* Camera Direction Pill */}
            <div className="absolute top-5 right-5 z-10 px-2.5 py-1 rounded-md bg-stone-950/85 backdrop-blur-md border border-stone-800 text-stone-400 text-xs font-mono hidden sm:flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-amber-400" />
              <span>{activeScene.cameraMovementName}</span>
            </div>
          </div>

          {/* Video Control Bar & Progress Scrubber */}
          <div className="p-4 bg-stone-950/95 border-t border-stone-800 space-y-3">
            
            {/* Timeline Progress Bar */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-stone-400 min-w-[36px]">
                {currentTime.toFixed(1)}s
              </span>
              <div 
                className="flex-1 h-2 bg-stone-800 rounded-full overflow-hidden cursor-pointer relative"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const newPercent = clickX / rect.width;
                  setCurrentTime(newPercent * activeScene.durationSeconds);
                }}
              >
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-red-600 rounded-full transition-all duration-100"
                  style={{ width: `${(currentTime / activeScene.durationSeconds) * 100}%` }}
                />
              </div>
              <span className="text-xs font-mono text-stone-400 min-w-[36px]">
                {activeScene.durationSeconds}s
              </span>
            </div>

            {/* Playback Controls & Direct Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-2 shadow transition-colors"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 fill-stone-950" />
                      <span>Ndalo</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-stone-950" />
                      <span>Luaj</span>
                    </>
                  )}
                </button>

                <button
                  onClick={restartPlayback}
                  className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-amber-400 transition-colors"
                  title="Rinis Skenën"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                {/* Sound War Horn Button */}
                <button
                  onClick={() => playWarHornFanfare()}
                  className="px-3 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-xs text-amber-300 flex items-center gap-1.5 transition-colors"
                  title="Bjer borisë së luftës"
                >
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Boria e Luftës</span>
                </button>
              </div>

              {/* Talking Portrait / Voice Narration Trigger */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleQuoteNarration}
                  className={`px-3.5 py-2 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all ${
                    isSpeakingQuote
                      ? 'bg-red-950 border-red-500 text-red-200 animate-pulse'
                      : 'bg-stone-900 border-amber-500/40 text-amber-300 hover:bg-stone-800'
                  }`}
                >
                  {isSpeakingQuote ? (
                    <>
                      <MicOff className="w-3.5 h-3.5 text-red-400" />
                      <span>Ndalo Fjalimin</span>
                    </>
                  ) : (
                    <>
                      <Mic className="w-3.5 h-3.5 text-amber-400" />
                      <span>Dëgjo Fjalimin me Zë</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Two-Column Deep Exploration: 
            Left: Portreti i Gjallë & Historical Speech 
            Right: AI Video Prompt Generator Studio (Veo, Sora, Runway) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Portreti i Gjallë & Historical Speech (5 Cols) */}
          <div className="lg:col-span-5 bg-stone-900/90 border border-amber-500/30 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <Film className="w-4 h-4 text-amber-400" />
                <h4 className="font-serif font-bold text-stone-100 text-sm sm:text-base">
                  Fjalimi Historik & Rindërtimi me Zë
                </h4>
              </div>
              {isSpeakingQuote && (
                <div className="flex items-center gap-1">
                  <span className="h-3 w-1 bg-amber-400 animate-pulse" />
                  <span className="h-5 w-1 bg-amber-400 animate-pulse delay-75" />
                  <span className="h-2 w-1 bg-amber-400 animate-pulse delay-150" />
                </div>
              )}
            </div>

            {/* Speech Quote Card */}
            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 relative">
              <span className="text-3xl font-serif text-amber-500/30 absolute top-2 left-2">“</span>
              <p className="font-serif text-stone-200 text-sm sm:text-base leading-relaxed italic pl-5">
                {activeScene.speechQuote}
              </p>
              <div className="mt-3 text-right">
                <span className="text-xs font-mono text-amber-400 block font-semibold">
                  {activeScene.speechAuthor}
                </span>
              </div>
            </div>

            {/* Historical Synopsis & Context */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-amber-300 uppercase tracking-wider block">
                Sfondi Historik i Skenës
              </span>
              <p className="text-stone-300 leading-relaxed">
                {activeScene.synopsis}
              </p>
            </div>

            {/* Trivia Badge */}
            <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200/90">
              <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{activeScene.historicalTrivia}</span>
            </div>

          </div>

          {/* Right: AI Video Prompt Studio (Google Veo / Sora / Runway) (7 Cols) */}
          <div className="lg:col-span-7 bg-stone-900/90 border border-amber-500/30 rounded-2xl p-5 sm:p-6 shadow-xl space-y-5">
            
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-800 pb-3">
              <div>
                <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wide block">
                  Studioja e Gjenerimit të Videove AI
                </span>
                <h4 className="font-serif font-bold text-stone-100 text-base">
                  Prompte Kinematografike për Modelet Video
                </h4>
              </div>

              {/* Platform Selector Tabs */}
              <div className="flex items-center gap-1.5 p-1 bg-stone-950 rounded-xl border border-stone-800 text-xs">
                {(['veo', 'sora', 'runway'] as const).map(platform => (
                  <button
                    key={platform}
                    onClick={() => setSelectedPlatform(platform)}
                    className={`px-3 py-1.5 rounded-lg font-mono uppercase text-[11px] font-bold transition-all ${
                      selectedPlatform === platform
                        ? 'bg-amber-500 text-stone-950 shadow'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {platform === 'veo' ? 'Google Veo' : platform === 'sora' ? 'OpenAI Sora' : 'Runway Gen-3'}
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt Customization Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-bold text-stone-300 uppercase tracking-wider block mb-1.5">
                  Lëvizja e Kamerës
                </label>
                <select
                  value={customCamera}
                  onChange={(e) => setCustomCamera(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-2.5 py-1.5 text-xs text-stone-200 focus:border-amber-500 focus:outline-none"
                >
                  <option value="cinematic_drone">Dron Ajror 8K (FPV Sweep)</option>
                  <option value="dolly_zoom">Dolly Zoom Dramatik</option>
                  <option value="close_up">Fokus i Ngushtë (Portret)</option>
                  <option value="tracking_charge">Ndjekje me Shpejtësi (Gallop)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-stone-300 uppercase tracking-wider block mb-1.5">
                  Lente & Format Filmi
                </label>
                <select
                  value={customLens}
                  onChange={(e) => setCustomLens(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-2.5 py-1.5 text-xs text-stone-200 focus:border-amber-500 focus:outline-none"
                >
                  <option value="anamorphic_35mm">35mm Anamorfike (Widescreen)</option>
                  <option value="imax_70mm">IMAX 70mm Formati Madh</option>
                  <option value="vintage_kodachrome">Film Historik 35mm Technicolor</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-stone-300 uppercase tracking-wider block mb-1.5">
                  Ndriçimi & Moti
                </label>
                <select
                  value={customLighting}
                  onChange={(e) => setCustomLighting(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-2.5 py-1.5 text-xs text-stone-200 focus:border-amber-500 focus:outline-none"
                >
                  <option value="golden_hour">Dritë e Artë (Golden Hour)</option>
                  <option value="storm_dusk">Muzg me Vetëtima & Shi</option>
                  <option value="torch_night">Natë e Errët me Pishtarë</option>
                </select>
              </div>
            </div>

            {/* Prompt Output Display Box */}
            <div className="p-4 rounded-xl bg-stone-950 border border-amber-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 font-mono uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  Prompt i Kompletuar ({selectedPlatform.toUpperCase()})
                </span>
                
                <button
                  onClick={() => handleCopyPrompt(selectedPlatform)}
                  className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 hover:text-amber-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  {copiedPromptPlatform === selectedPlatform ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">U Kopjua!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-amber-400" />
                      <span>Kopjo Promptin</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs font-mono text-stone-300 leading-relaxed bg-stone-900/70 p-3 rounded-lg border border-stone-800 max-h-48 overflow-y-auto">
                {activeScene.aiVideoPrompts[selectedPlatform]}
              </p>

              <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
                <span>I optimizuar për 24fps, fotorealizëm dhe lëvizje fizike të pëlhurës/tymit.</span>
                <span className="font-mono text-amber-400">8K • 2.39:1 Aspect</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col p-4 sm:p-8"
          onClick={() => setIsFullscreen(false)}
        >
          <div 
            className="w-full max-w-6xl mx-auto flex flex-col h-full justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div>
                <h4 className="font-serif font-bold text-amber-400 text-lg sm:text-xl">
                  {activeScene.title}
                </h4>
                <p className="text-xs text-stone-400">
                  {activeScene.subtitle} • {activeScene.location}
                </p>
              </div>
              <button
                onClick={() => setIsFullscreen(false)}
                className="p-2 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-stone-100 border border-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Large Canvas Viewport */}
            <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden rounded-xl border border-stone-800">
              <canvas
                ref={canvasRef}
                width={1280}
                height={720}
                className="max-h-full max-w-full object-contain rounded-lg"
              />
            </div>

            {/* Modal Controls */}
            <div className="flex items-center justify-between pt-3 border-t border-stone-800">
              <button
                onClick={togglePlay}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-2 shadow"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 fill-stone-950" /> : <Play className="w-3.5 h-3.5 fill-stone-950" />}
                <span>{isPlaying ? 'Ndalo' : 'Luaj'}</span>
              </button>
              <span className="text-xs text-stone-400 italic">
                {activeScene.tagline}
              </span>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
