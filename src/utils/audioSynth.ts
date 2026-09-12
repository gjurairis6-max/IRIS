// Web Audio API Synthesizer for Epic Historical Cinema

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Synthesize a majestic medieval bronze war horn fanfare (Skanderbeg's war horn)
export function playWarHornFanfare() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    
    // Sequence of notes for an epic fanfare: D3 -> F3 -> A3 -> D4
    const notes = [
      { freq: 146.83, start: 0, dur: 0.35, gain: 0.25 },
      { freq: 174.61, start: 0.35, dur: 0.35, gain: 0.28 },
      { freq: 220.00, start: 0.70, dur: 0.45, gain: 0.32 },
      { freq: 293.66, start: 1.15, dur: 1.20, gain: 0.40 }
    ];

    notes.forEach(({ freq, start, dur, gain }) => {
      // Dual oscillator for rich brass harmonics (sawtooth + square)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc1.type = 'sawtooth';
      osc2.type = 'triangle';

      osc1.frequency.setValueAtTime(freq, now + start);
      osc2.frequency.setValueAtTime(freq * 1.005, now + start); // slight detune for richness

      // Lowpass brass formant filter
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, now + start);
      filter.frequency.exponentialRampToValueAtTime(1800, now + start + 0.1);
      filter.frequency.exponentialRampToValueAtTime(700, now + start + dur);

      // Envelope
      gainNode.gain.setValueAtTime(0.001, now + start);
      gainNode.gain.linearRampToValueAtTime(gain, now + start + 0.08);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + start + dur);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc1.start(now + start);
      osc2.start(now + start);
      osc1.stop(now + start + dur);
      osc2.stop(now + start + dur);
    });
  } catch (e) {
    console.warn('Audio synthesis failed', e);
  }
}

// Deep war drum beat (Kettle drum / Timpani impact)
export function playWarDrumHit(intensity: number = 0.5) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = 'sine';
    // Pitch drop from 120Hz to 40Hz
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.35);

    gainNode.gain.setValueAtTime(intensity, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.5);
  } catch (e) {
    console.warn('War drum synthesis failed', e);
  }
}

// Ambient wind & battlefield drone
let ambientOsc: OscillatorNode | null = null;
let ambientGain: GainNode | null = null;

export function startBattlefieldAmbience() {
  try {
    const ctx = getAudioContext();
    if (!ctx || ambientOsc) return;

    ambientOsc = ctx.createOscillator();
    ambientGain = ctx.createGain();

    ambientOsc.type = 'sine';
    ambientOsc.frequency.setValueAtTime(55, ctx.currentTime); // Low 55Hz rumble

    ambientGain.gain.setValueAtTime(0.01, ctx.currentTime);
    ambientGain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 1.5);

    ambientOsc.connect(ambientGain);
    ambientGain.connect(ctx.destination);

    ambientOsc.start();
  } catch (e) {
    console.warn('Ambience start failed', e);
  }
}

export function stopBattlefieldAmbience() {
  try {
    if (ambientGain && audioCtx) {
      ambientGain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
      setTimeout(() => {
        if (ambientOsc) {
          ambientOsc.stop();
          ambientOsc.disconnect();
          ambientOsc = null;
        }
        if (ambientGain) {
          ambientGain.disconnect();
          ambientGain = null;
        }
      }, 600);
    }
  } catch (e) {
    console.warn('Ambience stop failed', e);
  }
}
