import { useState, useEffect } from 'react';

/**
 * Dramatic evidence reveal overlay
 * Shows when player discovers a new clue
 */
export default function EvidenceReveal({ clue, onComplete }) {
  const [phase, setPhase] = useState('enter');
  
  useEffect(() => {
    const sequence = [
      { phase: 'spotlight', delay: 100 },
      { phase: 'title', delay: 600 },
      { phase: 'details', delay: 1400 },
      { phase: 'exit', delay: 3500 },
      { phase: 'done', delay: 4200 },
    ];
    
    const timers = sequence.map(({ phase, delay }) =>
      setTimeout(() => {
        if (phase === 'done') {
          onComplete?.();
        } else {
          setPhase(phase);
        }
      }, delay)
    );
    
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);
  
  const phaseAtLeast = (p) => {
    const order = ['enter', 'spotlight', 'title', 'details', 'exit', 'done'];
    return order.indexOf(phase) >= order.indexOf(p);
  };
  
  // Get icon based on clue type
  const getClueIcon = () => {
    switch (clue.type) {
      case 'audio': return '🎵';
      case 'testimonial': return '👤';
      case 'document': return '📄';
      case 'physical': return '🔍';
      default: return '📋';
    }
  };
  
  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-500 ${
        phase === 'exit' ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={() => onComplete?.()}
    >
      {/* Dark overlay with radial spotlight */}
      <div 
        className={`absolute inset-0 transition-all duration-700 ${
          phaseAtLeast('spotlight') ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: phaseAtLeast('spotlight') 
            ? 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.95) 60%)'
            : 'rgba(0,0,0,0)'
        }}
      />
      
      {/* Animated spotlight ring */}
      <div 
        className={`absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full border-2 border-jazz-amber/40 transition-all duration-700 ${
          phaseAtLeast('spotlight') ? 'scale-100 opacity-100' : 'scale-150 opacity-0'
        }`}
        style={{
          boxShadow: 'inset 0 0 60px rgba(212, 165, 116, 0.1), 0 0 40px rgba(212, 165, 116, 0.2)',
          animation: phaseAtLeast('title') ? 'pulseRing 2s ease-in-out infinite' : 'none'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-lg">
        {/* "EVIDENCE FOUND" banner */}
        <div 
          className={`mb-6 transition-all duration-500 transform ${
            phaseAtLeast('title') ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
        >
          <p className="text-xs sm:text-sm tracking-[0.5em] text-jazz-amber/60 uppercase mb-2">
            New Evidence
          </p>
          <h2 
            className="font-display text-3xl sm:text-5xl md:text-6xl text-jazz-amber tracking-wider"
            style={{ textShadow: '0 0 30px rgba(212, 165, 116, 0.5), 2px 2px 0 #000' }}
          >
            EVIDENCE FOUND
          </h2>
          <div className="flex items-center justify-center gap-3 mt-3">
            <div className="w-12 sm:w-20 h-px bg-gradient-to-r from-transparent to-jazz-amber/60" />
            <span className="text-2xl sm:text-3xl">{getClueIcon()}</span>
            <div className="w-12 sm:w-20 h-px bg-gradient-to-l from-transparent to-jazz-amber/60" />
          </div>
        </div>
        
        {/* Clue details */}
        <div 
          className={`transition-all duration-500 transform ${
            phaseAtLeast('details') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-black/60 border border-jazz-amber/30 p-4 sm:p-6 backdrop-blur-sm">
            <h3 className="font-display text-xl sm:text-2xl md:text-3xl text-amber-50 mb-2">
              {clue.name}
            </h3>
            <p className="text-sm sm:text-base text-amber-100/70 leading-relaxed">
              {clue.description}
            </p>
            {clue.significance && (
              <p className="mt-3 text-xs sm:text-sm text-jazz-amber/80 italic border-t border-white/10 pt-3">
                → {clue.significance}
              </p>
            )}
          </div>
          
          <p className="mt-4 text-xs sm:text-sm text-amber-100/40">
            Tap anywhere to continue
          </p>
        </div>
      </div>
      
      {/* Animation keyframes */}
      <style>{`
        @keyframes pulseRing {
          0%, 100% { 
            transform: scale(1);
            border-color: rgba(212, 165, 116, 0.4);
          }
          50% { 
            transform: scale(1.05);
            border-color: rgba(212, 165, 116, 0.6);
          }
        }
      `}</style>
    </div>
  );
}
