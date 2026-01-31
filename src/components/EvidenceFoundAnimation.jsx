/**
 * EvidenceFoundAnimation - Dramatic noir-style reveal when collecting new evidence
 * Shows spotlight, staggered text reveals, and cinematic flair
 */
import { useState, useEffect } from 'react';
import { useUISounds } from '../hooks/useUISounds';

function EvidenceFoundAnimation({ evidence, onComplete }) {
  const [phase, setPhase] = useState('enter');
  const { playClueFound } = useUISounds();
  
  useEffect(() => {
    // Play sound on mount
    playClueFound();
    
    // Dramatic reveal sequence
    const sequence = [
      { phase: 'spotlight', delay: 100 },
      { phase: 'title', delay: 600 },
      { phase: 'icon', delay: 1000 },
      { phase: 'name', delay: 1400 },
      { phase: 'desc', delay: 2000 },
      { phase: 'journal', delay: 2800 },
      { phase: 'exit', delay: 4000 },
    ];
    
    const timers = sequence.map(({ phase, delay }) =>
      setTimeout(() => setPhase(phase), delay)
    );
    
    // Auto-complete after animation
    const completeTimer = setTimeout(() => onComplete?.(), 4500);
    
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(completeTimer);
    };
  }, [onComplete, playClueFound]);
  
  const phaseAtLeast = (p) => {
    const order = ['enter', 'spotlight', 'title', 'icon', 'name', 'desc', 'journal', 'exit'];
    return order.indexOf(phase) >= order.indexOf(p);
  };
  
  // Allow tap to skip after description
  const handleTap = () => {
    if (phaseAtLeast('desc')) {
      onComplete?.();
    }
  };
  
  // Get icon based on evidence type
  const getIcon = () => {
    switch (evidence?.type) {
      case 'audio': return '🎵';
      case 'testimonial': return '💬';
      case 'document': return '📄';
      case 'physical': return '🔍';
      default: return '📋';
    }
  };
  
  // Get type badge
  const getTypeBadge = () => {
    if (evidence?.critical) return { text: 'Critical Evidence', color: 'red' };
    switch (evidence?.type) {
      case 'audio': return { text: 'Audio Recording', color: 'blue' };
      case 'document': return { text: 'Document', color: 'amber' };
      case 'physical': return { text: 'Physical Evidence', color: 'amber' };
      default: return { text: 'Evidence', color: 'amber' };
    }
  };
  
  const badge = getTypeBadge();
  
  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ${
        phase === 'exit' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      onClick={handleTap}
    >
      {/* Dark overlay */}
      <div 
        className={`absolute inset-0 bg-black transition-opacity duration-500 ${
          phaseAtLeast('spotlight') ? 'opacity-95' : 'opacity-0'
        }`}
      />
      
      {/* Radial spotlight */}
      <div 
        className={`absolute inset-0 transition-opacity duration-700 ${
          phaseAtLeast('spotlight') ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(ellipse 50% 40% at 50% 45%, rgba(212,165,116,0.12) 0%, transparent 60%)',
        }}
      />
      
      {/* Pulsing glow */}
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full transition-all duration-1000 ${
          phaseAtLeast('icon') ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        }`}
        style={{
          background: 'radial-gradient(circle, rgba(212,165,116,0.15) 0%, transparent 70%)',
          animation: phaseAtLeast('name') ? 'evidencePulse 2.5s ease-in-out infinite' : 'none',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-lg">
        {/* "EVIDENCE FOUND" header */}
        <div className={`mb-4 transition-all duration-500 transform ${
          phaseAtLeast('title') ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'
        }`}>
          <p className="text-xs sm:text-sm tracking-[0.5em] text-jazz-amber/50 uppercase mb-2">
            New Evidence
          </p>
          <h2 
            className="font-display text-2xl sm:text-4xl md:text-5xl text-jazz-amber tracking-wider"
            style={{ textShadow: '0 0 30px rgba(212,165,116,0.4), 2px 2px 0 #000' }}
          >
            EVIDENCE FOUND
          </h2>
        </div>
        
        {/* Icon */}
        <div className={`transition-all duration-500 transform ${
          phaseAtLeast('icon') ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        }`}>
          <span className="text-5xl sm:text-7xl block mb-2">{getIcon()}</span>
        </div>
        
        {/* Type badge */}
        <div className={`mb-4 transition-all duration-400 transform ${
          phaseAtLeast('icon') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <span className={`inline-block px-3 py-1 text-xs uppercase tracking-wider border ${
            badge.color === 'red' 
              ? 'bg-red-500/20 text-red-300 border-red-500/40' 
              : badge.color === 'blue'
                ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                : 'bg-jazz-amber/20 text-jazz-amber/80 border-jazz-amber/40'
          }`}>
            {badge.text}
          </span>
        </div>
        
        {/* Evidence name */}
        <h3 
          className={`font-display text-2xl sm:text-4xl md:text-5xl text-amber-50 tracking-wide mb-3 transition-all duration-600 transform ${
            phaseAtLeast('name') ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'
          }`}
          style={{ textShadow: '2px 2px 0 #000, 0 0 20px rgba(212,165,116,0.2)' }}
        >
          {evidence?.name || 'Unknown Evidence'}
        </h3>
        
        {/* Decorative divider */}
        <div className={`flex items-center justify-center gap-3 mb-4 transition-opacity duration-400 ${
          phaseAtLeast('name') ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="w-10 sm:w-16 h-px bg-gradient-to-r from-transparent to-jazz-amber/50" />
          <span className="text-jazz-amber/30">◆</span>
          <div className="w-10 sm:w-16 h-px bg-gradient-to-l from-transparent to-jazz-amber/50" />
        </div>
        
        {/* Description */}
        <p className={`text-sm sm:text-lg text-amber-100/70 leading-relaxed transition-all duration-600 transform ${
          phaseAtLeast('desc') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          {evidence?.description || ''}
        </p>
        
        {/* Significance hint */}
        {evidence?.significance && (
          <p className={`mt-3 text-xs sm:text-sm text-jazz-amber/60 italic transition-opacity duration-400 ${
            phaseAtLeast('journal') ? 'opacity-100' : 'opacity-0'
          }`}>
            → {evidence.significance}
          </p>
        )}
        
        {/* Added to journal */}
        <div className={`mt-6 pt-4 border-t border-white/10 transition-all duration-400 ${
          phaseAtLeast('journal') ? 'opacity-100' : 'opacity-0'
        }`}>
          <span className="text-jazz-amber/70 text-sm flex items-center justify-center gap-2">
            <span>📓</span>
            <span>Added to Journal</span>
          </span>
        </div>
        
        {/* Tap to continue */}
        <p className={`mt-4 text-xs text-amber-100/25 transition-opacity duration-400 ${
          phaseAtLeast('desc') ? 'opacity-100' : 'opacity-0'
        }`}>
          Tap to continue
        </p>
      </div>
      
      {/* Corner accents */}
      {['top-6 left-6', 'top-6 right-6', 'bottom-6 left-6', 'bottom-6 right-6'].map((pos, i) => (
        <div 
          key={i}
          className={`absolute ${pos} transition-opacity duration-700 ${
            phaseAtLeast('name') ? 'opacity-20' : 'opacity-0'
          }`}
        >
          <div className={`w-8 h-px bg-jazz-amber/50 ${pos.includes('right') ? 'ml-auto' : ''}`} />
          <div className={`w-px h-8 bg-jazz-amber/50 ${pos.includes('right') ? 'ml-auto' : ''} ${pos.includes('bottom') ? '-mt-8' : ''}`} />
        </div>
      ))}
      
      {/* Animation */}
      <style>{`
        @keyframes evidencePulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.4; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}

export default EvidenceFoundAnimation;
