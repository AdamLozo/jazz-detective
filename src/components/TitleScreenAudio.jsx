// Synthesized Noir Audio for Title Screen
// Uses Web Audio API to create atmospheric jazz and street ambiance

import { useRef, useCallback, useState } from 'react';

export function useTitleAudio() {
  const audioContextRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Create noise buffer
  const createNoiseBuffer = (ctx, duration, type = 'brown') => {
    const sampleRate = ctx.sampleRate;
    const bufferSize = duration * sampleRate;
    const buffer = ctx.createBuffer(1, bufferSize, sampleRate);
    const data = buffer.getChannelData(0);
    
    let b0 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      if (type === 'pink') {
        data[i] = white * 0.5;
      } else {
        b0 = (b0 + (0.02 * white)) / 1.02;
        data[i] = b0 * 3.5;
      }
    }
    return buffer;
  };

  const startAudio = useCallback(async () => {
    console.log('=== START AUDIO CALLED ===');
    
    if (audioContextRef.current) {
      console.log('Audio already running');
      return;
    }
    
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      audioContextRef.current = ctx;
      
      console.log('Context created, state:', ctx.state);
      
      if (ctx.state === 'suspended') {
        await ctx.resume();
        console.log('Context resumed, state:', ctx.state);
      }
      
      setIsPlaying(true);
      
      // Master volume
      const master = ctx.createGain();
      master.gain.value = 0.6;
      master.connect(ctx.destination);
      
      // === RAIN ===
      const rainBuffer = createNoiseBuffer(ctx, 4, 'brown');
      const rain = ctx.createBufferSource();
      rain.buffer = rainBuffer;
      rain.loop = true;
      
      const rainFilter = ctx.createBiquadFilter();
      rainFilter.type = 'bandpass';
      rainFilter.frequency.value = 800;
      
      const rainGain = ctx.createGain();
      rainGain.gain.value = 0.15;
      
      rain.connect(rainFilter);
      rainFilter.connect(rainGain);
      rainGain.connect(master);
      rain.start();
      
      console.log('Rain started');
      
      // === JAZZ LOOP ===
      const now = ctx.currentTime;
      const bpm = 72;
      const beat = 60 / bpm;
      const bar = beat * 4;
      
      const freq = {
        C2: 65.41, G2: 98.00, F2: 87.31, D2: 73.42,
        C3: 130.81, F3: 174.61, G3: 196.00,
        Eb4: 311.13, G4: 392.00, Bb4: 466.16, Ab4: 415.30, C4: 261.63
      };
      
      // Piano chord function
      const chord = (notes, time, dur) => {
        notes.forEach((f, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.value = f;
          gain.gain.setValueAtTime(0, time);
          gain.gain.linearRampToValueAtTime(0.12, time + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, time + dur);
          osc.connect(gain);
          gain.connect(master);
          osc.start(time + i * 0.015);
          osc.stop(time + dur + 0.1);
        });
      };
      
      // Bass function
      const bass = (f, time, dur) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        osc.type = 'triangle';
        osc.frequency.value = f;
        filter.type = 'lowpass';
        filter.frequency.value = 500;
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(0.25, time + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, time + dur);
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(master);
        osc.start(time);
        osc.stop(time + dur + 0.1);
      };
      
      // Brush function
      const brush = (time, vol = 0.08) => {
        const buffer = createNoiseBuffer(ctx, 0.25, 'pink');
        const src = ctx.createBufferSource();
        src.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.value = 4000;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(vol, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.25);
        src.connect(filter);
        filter.connect(gain);
        gain.connect(master);
        src.start(time);
        src.stop(time + 0.3);
      };
      
      // Schedule 20 loops
      for (let loop = 0; loop < 20; loop++) {
        const t = now + 0.5 + (loop * bar * 4);
        
        // Chords: Cm7 - Fm7 - G7 - Cm7
        chord([freq.C3, freq.Eb4, freq.G4, freq.Bb4], t, bar * 0.9);
        chord([freq.F3, freq.Ab4, freq.C4], t + bar, bar * 0.9);
        chord([freq.G3, freq.Ab4], t + bar * 2, bar * 0.9);
        chord([freq.C3, freq.Eb4, freq.G4], t + bar * 3, bar * 0.9);
        
        // Bass
        bass(freq.C2, t, beat * 1.5);
        bass(freq.G2, t + beat * 2, beat * 1.5);
        bass(freq.F2, t + bar, beat * 1.5);
        bass(freq.C3, t + bar + beat * 2, beat * 1.5);
        bass(freq.G2, t + bar * 2, beat * 1.5);
        bass(freq.D2, t + bar * 2 + beat * 2, beat * 1.5);
        bass(freq.C2, t + bar * 3, beat * 1.5);
        bass(freq.G2, t + bar * 3 + beat * 2, beat * 1.5);
        
        // Brushes on 2 and 4
        for (let b = 0; b < 16; b++) {
          const bt = t + b * beat;
          brush(bt, (b % 4 === 1 || b % 4 === 3) ? 0.1 : 0.04);
        }
      }
      
      console.log('Jazz scheduled');
      
    } catch (err) {
      console.error('Audio error:', err);
      alert('Audio error: ' + err.message);
    }
  }, []);

  const stopAudio = useCallback(() => {
    console.log('=== STOP AUDIO CALLED ===');
    setIsPlaying(false);
    
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  }, []);

  return { startAudio, stopAudio, isPlaying };
}

// Audio toggle button - Mobile-friendly version
// Positioned top-right, compact on mobile, expanded on desktop
export function TitleAudioToggle({ startAudio, stopAudio, isPlaying }) {
  const handleClick = async () => {
    console.log('Button clicked! isPlaying:', isPlaying);
    
    if (isPlaying) {
      stopAudio();
    } else {
      await startAudio();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="fixed top-4 right-4 z-[100] group cursor-pointer"
      style={{ pointerEvents: 'auto' }}
      aria-label={isPlaying ? 'Sound on - click to mute' : 'Sound off - click to play'}
    >
      {/* Mobile: Compact icon-only button */}
      <div className="md:hidden flex items-center justify-center w-14 h-14 bg-black/80 rounded-full border-2 border-jazz-amber/50 hover:border-jazz-amber transition-all duration-300 shadow-lg">
        <span className="text-2xl">
          {isPlaying ? '🎷' : '🔇'}
        </span>
        {!isPlaying && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
        )}
      </div>
      
      {/* Desktop: Full button with text */}
      <div className="hidden md:flex items-center gap-3 bg-black/80 px-5 py-3 rounded-full border-2 border-jazz-amber/50 hover:border-jazz-amber transition-all duration-300 hover:bg-black/90 shadow-lg">
        <span className="text-3xl">
          {isPlaying ? '🎷' : '🔇'}
        </span>
        <span className="text-amber-100 text-lg font-bold">
          {isPlaying ? 'SOUND ON' : 'SOUND'}
        </span>
        {!isPlaying && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
        )}
      </div>
    </button>
  );
}
