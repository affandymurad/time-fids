/**
 * Web Audio API synthesizer for tactile mechanical split-flap / flip-disc click sound
 */

let audioCtx: AudioContext | null = null;
let lastSoundTime = 0;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playFlipSound(volume = 0.15) {
  try {
    const now = Date.now();
    // Throttle sounds to avoid harsh cacophony
    if (now - lastSoundTime < 35) return;
    lastSoundTime = now;

    const ctx = getAudioContext();
    if (!ctx) return;

    // Create a snappy plastic mechanical flap sound
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    // Noise buffer for mechanical texture
    const bufferSize = ctx.sampleRate * 0.025; // 25ms
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.2));
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1800 + Math.random() * 600, ctx.currentTime);
    filter.Q.setValueAtTime(3.5, ctx.currentTime);

    gain.gain.setValueAtTime(volume * 0.6, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    whiteNoise.start();
    whiteNoise.stop(ctx.currentTime + 0.035);

    // Subtle low thud
    osc.type = 'sine';
    osc.frequency.setValueAtTime(120, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.02);

    const oscGain = ctx.createGain();
    oscGain.gain.setValueAtTime(volume * 0.4, ctx.currentTime);
    oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.025);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.03);
  } catch {
    // Ignore audio autoplay restrictions gracefully
  }
}

/** Short two-note cue: rising = city added, falling = city removed. Soft sine tones, very quiet. */
function playBlips(notes: number[], volume: number) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const t0 = ctx.currentTime;
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t0 + i * 0.075);
      gain.gain.setValueAtTime(0.0001, t0 + i * 0.075);
      gain.gain.exponentialRampToValueAtTime(volume, t0 + i * 0.075 + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + i * 0.075 + 0.14);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t0 + i * 0.075);
      osc.stop(t0 + i * 0.075 + 0.16);
    });
  } catch {
    // audio is optional
  }
}

export function playAddSound(volume = 0.09) {
  playBlips([523.25, 783.99], volume); // C5 -> G5
}

export function playRemoveSound(volume = 0.09) {
  playBlips([587.33, 392.0], volume); // D5 -> G4
}
