import React, { useState, useEffect, useRef } from 'react';
import { 
  HISTORICAL_BATTLES, 
  TACTICAL_OPTIONS, 
  ART_STYLES, 
  TIME_MOODS, 
  PERSPECTIVES 
} from '../data/battleArtData';
import { BattleTemplate, GeneratedBattleIllustration } from '../types';
import { 
  Swords, 
  Sparkles, 
  Wand2, 
  Download, 
  Copy, 
  Check, 
  Maximize2, 
  X, 
  RotateCcw, 
  ShieldAlert, 
  Compass, 
  Flame, 
  Mountain, 
  Zap, 
  Info, 
  Layers, 
  Clock, 
  Eye, 
  History,
  Palette
} from 'lucide-react';

export const BattleArtStudio: React.FC = () => {
  const [selectedBattleId, setSelectedBattleId] = useState<string>('torvioll-1444');
  const [selectedTacticId, setSelectedTacticId] = useState<string>('prita_pylli');
  const [selectedMoodId, setSelectedMoodId] = useState<'agim' | 'mesdite' | 'muzg' | 'nate'>('agim');
  const [selectedPerspectiveId, setSelectedPerspectiveId] = useState<string>('panoramike');
  const [selectedStyleId, setSelectedStyleId] = useState<string>('rilindje_vaj');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState<string>('');
  const [currentIllustration, setCurrentIllustration] = useState<GeneratedBattleIllustration | null>(null);
  const [historyList, setHistoryList] = useState<GeneratedBattleIllustration[]>([]);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const activeBattle = HISTORICAL_BATTLES.find(b => b.id === selectedBattleId) || HISTORICAL_BATTLES[0];
  const activeTactic = TACTICAL_OPTIONS.find(t => t.id === selectedTacticId) || TACTICAL_OPTIONS[0];
  const activeMood = TIME_MOODS.find(m => m.id === selectedMoodId) || TIME_MOODS[0];
  const activePerspective = PERSPECTIVES.find(p => p.id === selectedPerspectiveId) || PERSPECTIVES[0];
  const activeStyle = ART_STYLES.find(s => s.id === selectedStyleId) || ART_STYLES[0];

  // Draw the battle artwork onto the Canvas with fine details
  const renderBattleCanvas = (
    battle: BattleTemplate,
    mood: typeof TIME_MOODS[0],
    style: typeof ART_STYLES[0],
    tactic: typeof TACTICAL_OPTIONS[0],
    perspective: typeof PERSPECTIVES[0]
  ): string => {
    const canvas = canvasRef.current || document.createElement('canvas');
    canvas.width = 1280;
    canvas.height = 720;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Dramatic Sky Gradient based on Time of Day
    const skyGrad = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.7);
    if (mood.id === 'agim') {
      skyGrad.addColorStop(0, '#1c1917');
      skyGrad.addColorStop(0.35, '#451a03');
      skyGrad.addColorStop(0.7, '#78350f');
      skyGrad.addColorStop(1, '#d97706');
    } else if (mood.id === 'mesdite') {
      skyGrad.addColorStop(0, '#0c1929');
      skyGrad.addColorStop(0.4, '#1e293b');
      skyGrad.addColorStop(0.75, '#b45309');
      skyGrad.addColorStop(1, '#f59e0b');
    } else if (mood.id === 'muzg') {
      skyGrad.addColorStop(0, '#0f0a0a');
      skyGrad.addColorStop(0.3, '#450a0a');
      skyGrad.addColorStop(0.65, '#7f1d1d');
      skyGrad.addColorStop(1, '#dc2626');
    } else { // nate
      skyGrad.addColorStop(0, '#050508');
      skyGrad.addColorStop(0.5, '#0b1120');
      skyGrad.addColorStop(0.85, '#1e1b4b');
      skyGrad.addColorStop(1, '#311042');
    }
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Stars / Moon or Rising Sun
    if (mood.id === 'nate') {
      // Moon
      ctx.save();
      ctx.fillStyle = '#fef08a';
      ctx.shadowColor = '#fef08a';
      ctx.shadowBlur = 35;
      ctx.beginPath();
      ctx.arc(canvas.width * 0.82, 110, 32, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Distant stars
      ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
      for (let i = 0; i < 60; i++) {
        const sx = (Math.sin(i * 99) * 0.5 + 0.5) * canvas.width;
        const sy = (Math.cos(i * 33) * 0.5 + 0.5) * 220;
        ctx.fillRect(sx, sy, 1.5, 1.5);
      }
    } else if (mood.id === 'agim') {
      // Rising Sun glow behind peaks
      const sunGrad = ctx.createRadialGradient(canvas.width * 0.45, 280, 10, canvas.width * 0.45, 280, 200);
      sunGrad.addColorStop(0, 'rgba(254, 215, 170, 0.8)');
      sunGrad.addColorStop(0.4, 'rgba(245, 158, 11, 0.4)');
      sunGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');
      ctx.fillStyle = sunGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // 3. Majestic Albanian Mountain Ranges (Layer 1: Far Distance)
    ctx.fillStyle = mood.id === 'nate' ? '#090d16' : '#291e17';
    ctx.beginPath();
    ctx.moveTo(0, 380);
    const peaks1 = [
      [0, 380], [180, 260], [320, 340], [520, 220], [700, 310], [900, 190], [1080, 290], [1280, 250], [1280, 720], [0, 720]
    ];
    peaks1.forEach(([x, y]) => ctx.lineTo(x, y));
    ctx.closePath();
    ctx.fill();

    // 4. Middle Mountain Ridges with Castle / Fortresses
    ctx.fillStyle = mood.id === 'nate' ? '#06080e' : '#1c130d';
    ctx.beginPath();
    ctx.moveTo(0, 440);
    const peaks2 = [
      [0, 440], [140, 370], [300, 420], [480, 340], [640, 410], [820, 320], [980, 380], [1140, 310], [1280, 390], [1280, 720], [0, 720]
    ];
    peaks2.forEach(([x, y]) => ctx.lineTo(x, y));
    ctx.closePath();
    ctx.fill();

    // Castle Citadel on Peak (Kruja Fortress representation)
    if (battle.id.includes('kruja') || perspective.id === 'muret_keshtjelles') {
      ctx.fillStyle = '#0f0b08';
      // Castle base & towers
      ctx.fillRect(260, 280, 160, 90);
      ctx.fillRect(240, 260, 45, 110);
      ctx.fillRect(390, 250, 50, 120);
      // Crenellations
      for (let c = 260; c < 410; c += 18) {
        ctx.fillRect(c, 272, 10, 10);
      }
      // Red & Black Albanian Banner fluttering on fortress tower
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.moveTo(415, 220);
      ctx.lineTo(465, 230);
      ctx.lineTo(415, 242);
      ctx.closePath();
      ctx.fill();
      // Flagpole
      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(415, 250);
      ctx.lineTo(415, 215);
      ctx.stroke();
    }

    // 5. Dense Valley Woodland & Fog
    const fogGrad = ctx.createLinearGradient(0, 420, 0, 530);
    fogGrad.addColorStop(0, 'rgba(217, 119, 6, 0.05)');
    fogGrad.addColorStop(0.5, mood.id === 'nate' ? 'rgba(30, 41, 59, 0.35)' : 'rgba(180, 83, 9, 0.25)');
    fogGrad.addColorStop(1, 'rgba(12, 10, 9, 0.8)');
    ctx.fillStyle = fogGrad;
    ctx.fillRect(0, 420, canvas.width, 140);

    // 6. Foreground Battlefield Ground & Ravines
    const groundGrad = ctx.createLinearGradient(0, 480, 0, 720);
    groundGrad.addColorStop(0, '#1c110a');
    groundGrad.addColorStop(1, '#0c0704');
    ctx.fillStyle = groundGrad;
    ctx.beginPath();
    ctx.moveTo(0, 500);
    ctx.quadraticCurveTo(350, 470, 700, 520);
    ctx.quadraticCurveTo(1050, 560, 1280, 510);
    ctx.lineTo(1280, 720);
    ctx.lineTo(0, 720);
    ctx.closePath();
    ctx.fill();

    // 7. Tactical Battle Formations & Silhouettes (Charging Cavalry & Banners)
    // Ambient dust and sparks
    ctx.save();
    for (let p = 0; p < 80; p++) {
      const px = Math.random() * canvas.width;
      const py = 450 + Math.random() * 240;
      const pr = 1 + Math.random() * 2.5;
      ctx.fillStyle = mood.id === 'muzg' || mood.id === 'nate' 
        ? 'rgba(249, 115, 22, 0.6)' 
        : 'rgba(254, 240, 138, 0.4)';
      ctx.beginPath();
      ctx.arc(px, py, pr, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // Charging Albanian Vanguard with Skanderbeg's Iconic Horned Helmet Silhouette
    ctx.fillStyle = '#050302';
    
    // Draw Skanderbeg on White/War Charger in foreground left/center
    const heroX = canvas.width * 0.36;
    const heroY = 560;

    // Horse body
    ctx.beginPath();
    ctx.ellipse(heroX, heroY, 65, 38, -0.2, 0, Math.PI * 2);
    ctx.fill();
    // Horse neck and head (charging forward)
    ctx.beginPath();
    ctx.moveTo(heroX + 40, heroY - 10);
    ctx.lineTo(heroX + 95, heroY - 50);
    ctx.lineTo(heroX + 110, heroY - 35);
    ctx.lineTo(heroX + 60, heroY + 15);
    ctx.closePath();
    ctx.fill();
    // Horse raised front legs
    ctx.lineWidth = 9;
    ctx.strokeStyle = '#050302';
    ctx.beginPath();
    ctx.moveTo(heroX + 50, heroY + 20);
    ctx.lineTo(heroX + 90, heroY + 80);
    ctx.moveTo(heroX + 35, heroY + 20);
    ctx.lineTo(heroX + 70, heroY + 95);
    // Back legs
    ctx.moveTo(heroX - 45, heroY + 20);
    ctx.lineTo(heroX - 70, heroY + 105);
    ctx.moveTo(heroX - 30, heroY + 20);
    ctx.lineTo(heroX - 45, heroY + 115);
    ctx.stroke();

    // Skanderbeg Rider Body
    ctx.beginPath();
    ctx.moveTo(heroX - 10, heroY - 20);
    ctx.lineTo(heroX + 5, heroY - 75); // chest
    ctx.lineTo(heroX + 28, heroY - 70);
    ctx.lineTo(heroX + 18, heroY - 15);
    ctx.closePath();
    ctx.fill();

    // Skanderbeg Helmet with Horns of Goat (Iconic Silhouette)
    ctx.beginPath();
    ctx.arc(heroX + 16, heroY - 88, 14, 0, Math.PI * 2); // Head
    ctx.fill();
    // Goat horns
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#eab308'; // gilded horns glinting in the light!
    ctx.beginPath();
    ctx.moveTo(heroX + 16, heroY - 98);
    ctx.quadraticCurveTo(heroX - 5, heroY - 120, heroX - 22, heroY - 110);
    ctx.stroke();

    // Crimson Cloak Flapping
    ctx.fillStyle = '#991b1b';
    ctx.beginPath();
    ctx.moveTo(heroX - 5, heroY - 70);
    ctx.quadraticCurveTo(heroX - 55, heroY - 60, heroX - 85, heroY - 45);
    ctx.lineTo(heroX - 35, heroY - 20);
    ctx.closePath();
    ctx.fill();

    // Raised Curved Saber / Scimitar Sword (Glinting)
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(heroX + 20, heroY - 65);
    ctx.quadraticCurveTo(heroX + 60, heroY - 110, heroX + 90, heroY - 130);
    ctx.stroke();

    // Double-headed eagle War Banner carried by vanguard right behind Skanderbeg
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.moveTo(heroX - 60, heroY - 160);
    ctx.lineTo(heroX - 130, heroY - 145);
    ctx.lineTo(heroX - 70, heroY - 120);
    ctx.closePath();
    ctx.fill();
    // Banner staff
    ctx.strokeStyle = '#451a03';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(heroX - 60, heroY - 170);
    ctx.lineTo(heroX - 60, heroY + 10);
    ctx.stroke();

    // Background Charging Cavalry Ranks (Squadrons)
    ctx.fillStyle = '#080504';
    for (let h = 0; h < 14; h++) {
      const rx = 100 + h * 75 + (h % 3) * 15;
      const ry = 510 + (h % 4) * 22;
      // spear / lance
      ctx.strokeStyle = '#050302';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(rx, ry + 20);
      ctx.lineTo(rx + 45, ry - 40);
      ctx.stroke();
      // rider silhouette
      ctx.beginPath();
      ctx.arc(rx + 10, ry - 15, 7, 0, Math.PI * 2);
      ctx.ellipse(rx, ry, 26, 16, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Torches if Night Mood
    if (mood.id === 'nate') {
      for (let t = 0; t < 12; t++) {
        const tx = 140 + t * 90;
        const ty = 480 + (t % 3) * 25;
        // torch glow
        const torchGrad = ctx.createRadialGradient(tx, ty, 2, tx, ty, 35);
        torchGrad.addColorStop(0, 'rgba(255, 237, 213, 0.9)');
        torchGrad.addColorStop(0.3, 'rgba(249, 115, 22, 0.7)');
        torchGrad.addColorStop(1, 'rgba(239, 68, 68, 0)');
        ctx.fillStyle = torchGrad;
        ctx.beginPath();
        ctx.arc(tx, ty, 35, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 8. Style Texture & Fine Overlay
    if (style.id === 'gravure_baker') {
      // Vintage sepia and engraved cross-hatching effect
      ctx.fillStyle = 'rgba(217, 119, 6, 0.12)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(24, 18, 12, 0.15)';
      ctx.lineWidth = 1;
      for (let l = 0; l < canvas.width; l += 8) {
        ctx.beginPath();
        ctx.moveTo(l, 0);
        ctx.lineTo(l + canvas.height, canvas.height);
        ctx.stroke();
      }
    } else if (style.id === 'rilindje_vaj') {
      // Warm oil glaze overlay
      const oilGrad = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 200, 
        canvas.width / 2, canvas.height / 2, canvas.width * 0.75
      );
      oilGrad.addColorStop(0, 'rgba(245, 158, 11, 0)');
      oilGrad.addColorStop(1, 'rgba(10, 5, 2, 0.55)');
      ctx.fillStyle = oilGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // 9. Ornate Renaissance Museum Gilded Frame Border
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 14;
    ctx.strokeRect(7, 7, canvas.width - 14, canvas.height - 14);

    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 3;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    // Decorative corner rosettes
    const corners = [
      [22, 22],
      [canvas.width - 22, 22],
      [22, canvas.height - 22],
      [canvas.width - 22, canvas.height - 22]
    ];
    corners.forEach(([cx, cy]) => {
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(cx, cy, 7, 0, Math.PI * 2);
      ctx.fill();
    });

    // 10. Bottom Tactical Plaque Inscription
    ctx.fillStyle = 'rgba(12, 10, 9, 0.85)';
    ctx.fillRect(canvas.width / 2 - 280, canvas.height - 56, 560, 36);
    ctx.strokeStyle = 'rgba(217, 119, 6, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(canvas.width / 2 - 280, canvas.height - 56, 560, 36);

    ctx.fillStyle = '#fef3c7';
    ctx.font = 'bold 15px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText(
      `${battle.name.toUpperCase()} (${battle.year}) — ${tactic.title.toUpperCase()}`,
      canvas.width / 2,
      canvas.height - 33
    );

    return canvas.toDataURL('image/png');
  };

  // Build the complete prompt text for AI Image tools (Midjourney, DALL-E, Imagen)
  const buildMasterPrompt = (
    battle: BattleTemplate,
    tactic: typeof TACTICAL_OPTIONS[0],
    mood: typeof TIME_MOODS[0],
    perspective: typeof PERSPECTIVES[0],
    style: typeof ART_STYLES[0]
  ): string => {
    return `Historical epic masterpiece painting depicting the ${battle.name} (${battle.year}) in Albania during the Ottoman-Albanian Wars. Focus on the tactical maneuver: ${tactic.title} (${tactic.description}). Landscape: ${battle.terrain}. Perspective: ${perspective.desc}. Atmosphere: ${mood.label} with ${mood.lightType}. Protagonist: Gjergj Kastrioti Skanderbeg in 15th-century engraved steel plate armor, wearing the legendary goat-head crested helmet and crimson commander cloak on a charging warhorse, brandishing his curved scimitar sword. Albanian light cavalry vanguard charging beside him holding crimson red banners emblazoned with the black double-headed eagle. Style: ${style.promptModifier}. Cinematic composition, historical accuracy, museum quality, dynamic motion, volumetric battle smoke and dust particles, 8k resolution.`;
  };

  // Trigger illustration generation
  const handleGenerate = () => {
    setIsGenerating(true);
    setGenerationStep('Analizimi i të dhënave gjeografike dhe terrenit...');

    setTimeout(() => {
      setGenerationStep('Llogaritja e formacioneve taktike dhe pozicioneve...');
    }, 700);

    setTimeout(() => {
      setGenerationStep(`Aplikimi i stilit: ${activeStyle.label}...`);
    }, 1400);

    setTimeout(() => {
      const dataUrl = renderBattleCanvas(activeBattle, activeMood, activeStyle, activeTactic, activePerspective);
      const prompt = buildMasterPrompt(activeBattle, activeTactic, activeMood, activePerspective, activeStyle);

      const newIllustration: GeneratedBattleIllustration = {
        id: `${activeBattle.id}-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        battleName: activeBattle.name,
        year: activeBattle.year,
        title: `${activeBattle.name}: ${activeTactic.title}`,
        tacticName: activeTactic.title,
        tacticDesc: activeTactic.description,
        timeLabel: activeMood.label,
        perspectiveLabel: activePerspective.label,
        styleLabel: activeStyle.label,
        promptText: prompt,
        historicalContext: activeBattle.summary,
        palette: ['#1c1917', '#78350f', '#d97706', '#dc2626', '#fef3c7'],
        tacticalAdvantage: activeTactic.bonus,
        imageDataUrl: dataUrl,
        svgConfig: {
          theme: activeBattle.bannerBg,
          weather: activeMood.label,
          elevation: activeBattle.terrain,
          frontline: activeBattle.skanderbegForces
        }
      };

      setCurrentIllustration(newIllustration);
      setHistoryList(prev => [newIllustration, ...prev.slice(0, 5)]);
      setIsGenerating(false);
      setGenerationStep('');
    }, 2200);
  };

  // Initial generation on first mount
  useEffect(() => {
    const dataUrl = renderBattleCanvas(activeBattle, activeMood, activeStyle, activeTactic, activePerspective);
    const prompt = buildMasterPrompt(activeBattle, activeTactic, activeMood, activePerspective, activeStyle);

    const initialItem: GeneratedBattleIllustration = {
      id: `${activeBattle.id}-init`,
      timestamp: 'Tani',
      battleName: activeBattle.name,
      year: activeBattle.year,
      title: `${activeBattle.name}: ${activeTactic.title}`,
      tacticName: activeTactic.title,
      tacticDesc: activeTactic.description,
      timeLabel: activeMood.label,
      perspectiveLabel: activePerspective.label,
      styleLabel: activeStyle.label,
      promptText: prompt,
      historicalContext: activeBattle.summary,
      palette: ['#1c1917', '#78350f', '#d97706', '#dc2626', '#fef3c7'],
      tacticalAdvantage: activeTactic.bonus,
      imageDataUrl: dataUrl,
      svgConfig: {
        theme: activeBattle.bannerBg,
        weather: activeMood.label,
        elevation: activeBattle.terrain,
        frontline: activeBattle.skanderbegForces
      }
    };
    setCurrentIllustration(initialItem);
    setHistoryList([initialItem]);
  }, []);

  const handleCopyPrompt = () => {
    if (!currentIllustration) return;
    navigator.clipboard.writeText(currentIllustration.promptText);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  };

  const handleDownloadImage = () => {
    if (!currentIllustration?.imageDataUrl) return;
    const link = document.createElement('a');
    link.download = `Skenderbeu_${currentIllustration.battleName.replace(/\s+/g, '_')}_${currentIllustration.year}.png`;
    link.href = currentIllustration.imageDataUrl;
    link.click();
  };

  return (
    <div className="mt-16 pt-12 border-t border-amber-500/20">
      
      {/* Hidden processing canvas */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Wand2 className="w-3.5 h-3.5 text-amber-400" />
          <span>Studioja e Ilustrimeve Taktike të Betejave</span>
        </div>
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-stone-100 uppercase tracking-tight">
          Gjeneruesi Vizual i Betejave Epike
        </h3>
        <p className="mt-3 text-stone-400 text-sm sm:text-base leading-relaxed">
          Përzgjidhni betejën, konfiguroni manovrën taktike, orën e ditës dhe stilin artistik 
          për të rindërtuar vizualisht përplasjet vendimtare të Gjergj Kastriotit Skënderbeut.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Panel: Tactical Configuration Form (5 Columns) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-stone-900/90 border border-amber-500/30 rounded-2xl p-5 sm:p-6 shadow-xl space-y-5">
            
            {/* Step 1: Select Historical Battle */}
            <div>
              <label className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                <Swords className="w-3.5 h-3.5 text-amber-400" />
                1. Përzgjidhni Betejën Historike
              </label>
              <div className="grid grid-cols-1 gap-2">
                {HISTORICAL_BATTLES.map((battle) => {
                  const isSelected = battle.id === selectedBattleId;
                  return (
                    <button
                      key={battle.id}
                      onClick={() => {
                        setSelectedBattleId(battle.id);
                        setSelectedMoodId(battle.defaultMood);
                      }}
                      className={`text-left p-3 rounded-xl border transition-all duration-200 ${
                        isSelected 
                          ? 'bg-amber-950/60 border-amber-500 text-stone-100 shadow-md shadow-amber-950/30 ring-1 ring-amber-500/50'
                          : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-serif font-bold text-sm text-stone-100">
                          {battle.name}
                        </span>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-amber-400">
                          {battle.year}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-400 line-clamp-1">
                        {battle.terrain}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Tactical Doctrine */}
            <div>
              <label className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                2. Taktika & Manovra Luftarake
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {TACTICAL_OPTIONS.map((tactic) => {
                  const isSelected = tactic.id === selectedTacticId;
                  return (
                    <button
                      key={tactic.id}
                      onClick={() => setSelectedTacticId(tactic.id)}
                      className={`text-left p-2.5 rounded-xl border transition-all text-xs ${
                        isSelected 
                          ? 'bg-amber-500 text-stone-950 font-bold border-amber-400 shadow-md'
                          : 'bg-stone-950/70 border-stone-800 text-stone-300 hover:border-stone-700'
                      }`}
                    >
                      <div className="font-bold truncate mb-0.5">{tactic.title}</div>
                      <div className={`text-[10px] ${isSelected ? 'text-stone-900' : 'text-amber-400/90'}`}>
                        {tactic.bonus}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Atmosphere / Time of Day */}
            <div>
              <label className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                3. Koha e Ditës & Atmosfera
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {TIME_MOODS.map((mood) => {
                  const isSelected = mood.id === selectedMoodId;
                  return (
                    <button
                      key={mood.id}
                      onClick={() => setSelectedMoodId(mood.id as any)}
                      className={`p-2 rounded-xl border text-center transition-all ${
                        isSelected
                          ? 'bg-amber-950 border-amber-500 text-amber-300 font-bold'
                          : 'bg-stone-950/70 border-stone-800 text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      <span className="text-xs block">{mood.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Art Style & Perspective */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <Palette className="w-3.5 h-3.5 text-amber-400" />
                  Stili Artistik
                </label>
                <select
                  value={selectedStyleId}
                  onChange={(e) => setSelectedStyleId(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                >
                  {ART_STYLES.map(style => (
                    <option key={style.id} value={style.id}>{style.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                  Këndvështrimi
                </label>
                <select
                  value={selectedPerspectiveId}
                  onChange={(e) => setSelectedPerspectiveId(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                >
                  {PERSPECTIVES.map(p => (
                    <option key={p.id} value={p.id}>{p.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Generate Action Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-red-600 hover:from-amber-400 hover:to-red-500 text-stone-950 font-serif font-black text-sm tracking-wider uppercase transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-stone-950" />
                  <span>Duke Gjeneruar Ilustrimin...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 text-stone-950" />
                  <span>Gjenero Ilustrimin e Betejës</span>
                </>
              )}
            </button>

            {isGenerating && (
              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 text-center animate-pulse">
                <span className="text-xs text-amber-300 font-mono">
                  {generationStep}
                </span>
              </div>
            )}

          </div>

          {/* Quick Historical Quote Badge */}
          <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 text-xs text-stone-400 italic">
            {activeBattle.historicalQuote}
          </div>

        </div>

        {/* Right Panel: Generated Master Artwork Showcase (7 Columns) */}
        <div className="lg:col-span-7 space-y-5">
          
          <div className="bg-stone-900/90 border-2 border-amber-600/40 rounded-2xl overflow-hidden shadow-2xl relative group">
            
            {/* Top Toolbar */}
            <div className="p-4 bg-stone-950/90 border-b border-stone-800 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wide block">
                  Ilustrim Taktik i Gjeneruar
                </span>
                <h4 className="font-serif font-bold text-stone-100 text-base">
                  {currentIllustration?.title || 'Skenë Beteje'}
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsFullscreen(true)}
                  className="p-2 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-amber-400 transition-colors"
                  title="Ekran i Plotë"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={handleDownloadImage}
                  className="p-2 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-emerald-400 transition-colors"
                  title="Shkarko Ilustrimin (.PNG)"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* The Visual Artwork Canvas View */}
            <div className="relative aspect-[16/9] w-full bg-stone-950 flex items-center justify-center overflow-hidden">
              {currentIllustration?.imageDataUrl ? (
                <img
                  src={currentIllustration.imageDataUrl}
                  alt={currentIllustration.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                />
              ) : (
                <div className="text-stone-500 text-sm">
                  Duke përgatitur kanavacën...
                </div>
              )}

              {/* Live Tactical Advantage Pill */}
              <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-lg bg-stone-950/85 backdrop-blur-md border border-amber-500/40 text-amber-300 font-mono text-xs font-bold shadow-lg">
                {currentIllustration?.tacticalAdvantage}
              </div>

              <div className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded-md bg-stone-950/85 backdrop-blur-md border border-stone-800 text-stone-400 text-xs font-mono">
                {currentIllustration?.timeLabel} • {currentIllustration?.styleLabel}
              </div>
            </div>

            {/* Tactical Briefing Bar */}
            <div className="p-4 bg-stone-950/80 border-t border-stone-800 space-y-3">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-2 rounded-lg bg-stone-900 border border-stone-800/80">
                  <span className="text-stone-500 block text-[10px]">Forcat Arbërore:</span>
                  <span className="font-semibold text-stone-200 truncate block">
                    {activeBattle.skanderbegForces.split(' ')[0]} trupa
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-stone-900 border border-stone-800/80">
                  <span className="text-stone-500 block text-[10px]">Forcat Osmane:</span>
                  <span className="font-semibold text-red-300 truncate block">
                    {activeBattle.enemyForces.split(' ')[0]} trupa
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-stone-900 border border-stone-800/80">
                  <span className="text-stone-500 block text-[10px]">Vendndodhja:</span>
                  <span className="font-semibold text-amber-300 truncate block">
                    {activeBattle.location.split(',')[0]}
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-stone-900 border border-stone-800/80">
                  <span className="text-stone-500 block text-[10px]">Përparësia:</span>
                  <span className="font-semibold text-emerald-400 truncate block">
                    {activeTactic.bonus}
                  </span>
                </div>
              </div>

              {/* Master Prompt Box for AI Tools (Midjourney, DALL-E, Imagen, Veo) */}
              <div className="p-3 rounded-xl bg-stone-900/90 border border-amber-500/20 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Prompti i Gjenerimit AI (Master Prompt)
                  </span>
                  <button
                    onClick={handleCopyPrompt}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-stone-950 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-amber-300 transition-colors text-[11px]"
                  >
                    {copiedPrompt ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-300">U Kopjua</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-amber-400" />
                        <span>Kopjo Promptin</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-stone-300 font-mono text-[11px] leading-relaxed line-clamp-3 bg-stone-950/60 p-2 rounded border border-stone-800/60">
                  {currentIllustration?.promptText}
                </p>
                <span className="text-[10px] text-stone-500 block">
                  I formatuar për modele gjenerative: Google Imagen, Veo, Midjourney dhe Stable Diffusion.
                </span>
              </div>
            </div>

          </div>

          {/* Session History Strip */}
          {historyList.length > 1 && (
            <div className="space-y-2">
              <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
                <History className="w-3.5 h-3.5 text-amber-400" />
                Rindërtimet e Sesionit ({historyList.length})
              </span>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {historyList.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentIllustration(item)}
                    className={`relative rounded-xl overflow-hidden aspect-[16/9] border transition-all ${
                      item.id === currentIllustration?.id
                        ? 'border-amber-500 ring-2 ring-amber-500/40 shadow-lg'
                        : 'border-stone-800 opacity-70 hover:opacity-100'
                    }`}
                  >
                    {item.imageDataUrl && (
                      <img
                        src={item.imageDataUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent p-1 flex items-end">
                      <span className="text-[9px] text-stone-200 font-bold truncate">
                        {item.battleName.split(' ')[1] || item.battleName}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {isFullscreen && currentIllustration?.imageDataUrl && (
        <div 
          className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-lg flex items-center justify-center p-4 sm:p-8"
          onClick={() => setIsFullscreen(false)}
        >
          <div 
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between pb-3 text-stone-300 border-b border-stone-800 mb-4">
              <div>
                <h4 className="font-serif font-bold text-lg text-amber-400">
                  {currentIllustration.title}
                </h4>
                <p className="text-xs text-stone-400">
                  {currentIllustration.battleName} ({currentIllustration.year}) • {currentIllustration.tacticName}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadImage}
                  className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-xs text-stone-200 border border-stone-700 flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  Shkarko PNG
                </button>
                <button
                  onClick={() => setIsFullscreen(false)}
                  className="p-2 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-stone-100 border border-stone-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="relative flex-1 flex items-center justify-center overflow-hidden max-h-[75vh]">
              <img
                src={currentIllustration.imageDataUrl}
                alt={currentIllustration.title}
                className="max-h-full max-w-full object-contain rounded-lg shadow-2xl border border-amber-500/40"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
