export interface TimelineItem {
  id: string;
  year: string;
  exactDate?: string;
  title: string;
  subtitle: string;
  category: 'rinia' | 'kryengritja' | 'diplomacia' | 'betejat' | 'trashegimia';
  description: string;
  historicalDetail: string;
  promptExcerpt?: string;
  location: string;
  keyFigures: string[];
  significance: string;
  badge: string;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  category: 'administrate' | 'diplomaci' | 'dinasti' | 'tituj' | 'ushtri';
  categoryLabel: string;
  languageOrigin: string;
  etymology: string;
  shortDefinition: string;
  fullExplanation: string;
  skanderbegContext: string;
  historicalQuote?: string;
  quoteSource?: string;
  relatedTerms: string[];
  keyDate?: string;
}

export interface TreatyDetail {
  id: string;
  title: string;
  year: string;
  partner: string;
  place: string;
  summary: string;
  keyClauses: string[];
  historicalImpact: string;
  deJureVsDeFacto: string;
}

export interface StrategicLocation {
  id: string;
  name: string;
  type: 'fortese' | 'beteje' | 'kuvend' | 'diplomaci';
  region: string;
  historicalContext: string;
  x: number; // percentage for custom map SVG (0 - 100)
  y: number; // percentage for custom map SVG (0 - 100)
  events: string[];
  importance: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  relatedTopic: string;
}

export interface PortraitArtwork {
  id: string;
  title: string;
  artist: string;
  year: string;
  technique: string;
  location: string;
  imageUrl: string;
  category: 'pikture' | 'gravure' | 'ilustrim' | 'dorëshkrim';
  description: string;
  iconography: string[];
  historicalContext: string;
  significance: string;
}

export interface BattleTemplate {
  id: string;
  name: string;
  year: string;
  location: string;
  terrain: string;
  skanderbegForces: string;
  enemyForces: string;
  defaultTactic: string;
  historicalQuote: string;
  summary: string;
  suggestedPrompt: string;
  defaultMood: 'agim' | 'muzg' | 'nate' | 'mesdite';
  bannerBg: string;
  accentColor: string;
}

export interface BattleSceneConfig {
  battleId: string;
  tactic: string;
  timeOfDay: 'agim' | 'muzg' | 'nate' | 'mesdite';
  perspective: 'panoramike' | 'skenderbeu_ballor' | 'muret_keshtjelles' | 'ajrore_taktike';
  artStyle: 'rilindje_vaj' | 'gravure_baker' | 'kinematografike' | 'miniature_mesjetare';
  customNotes?: string;
}

export interface GeneratedBattleIllustration {
  id: string;
  timestamp: string;
  battleName: string;
  year: string;
  title: string;
  tacticName: string;
  tacticDesc: string;
  timeLabel: string;
  perspectiveLabel: string;
  styleLabel: string;
  promptText: string;
  historicalContext: string;
  palette: string[];
  tacticalAdvantage: string;
  imageDataUrl?: string;
  svgConfig: {
    theme: string;
    weather: string;
    elevation: string;
    frontline: string;
  };
}

