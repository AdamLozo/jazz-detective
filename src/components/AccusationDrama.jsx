import { useState, useEffect } from 'react';
import CharacterPortrait from './CharacterPortrait';

/**
 * AccusationDrama - Dramatic sequence when player makes final accusation
 * 
 * Creates cinematic tension through:
 * - Red/amber lighting shifts
 * - Dramatic text reveals
 * - Portrait focus effects
 * - Building suspense phases
 */

export default function AccusationDrama({ 
  suspect, 
  evidenceCount, 
  onComplete, 
  onCancel 
}) {
  const [phase, setPhase] = useState('enter'); 
  // Phases: enter, lighting, portrait, charge, evidence, final, exit
  
  useEffect(() => {
    const sequence = [
      { phase: 'lighting', delay: 300 },
      { phase: 'portrait', delay: 1200 },
      { phase: 'charge', delay: 2500 },
      { phase: 'evidence', delay: 4000 },
      { phase: 'final', delay: 5500 },
    ];
    
    const timers = sequence.map(({ phase: p, delay }) =>
      setTimeout(() => setPhase(p), delay)
    );
    
    return () => timers.forEach(clearTimeout);
  }, []);
  
  const phaseAtLeast = (p) => {
    const order = ['enter', 'lighting', 'portrait', 'charge', 'evidence', 'final', 'exit'];
    return order.indexOf(phase) >= order.indexOf(p);
  };
  
  const handleConfirm = () => {
    setPhase('exit');
    setTimeout(() => onComplete?.(), 600);
  };
  
  const handleCancel = () => {
    setPhase('exit');
    setTimeout(() => onCancel?.(), 600);
  };
  
  // Evidence strength text
  const getEvidenceStrength = () => {
    if (evidenceCount >= 8) return { text: 'OVERWHELMING', color: 'text-green-400' };
    if (evidenceCount >= 5) return { text: 'STRONG', color: 'text-jazz-amber' };
    if (evidenceCount >= 3) return { text: 'CIRCUMSTANTIAL', color: 'text-yellow-500' };
    return { text: 'WEAK', color: 'text-red-400' };
  };
  
  const evidenceStrength = getEvidenceStrength();
  
  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ${
        phase === 'exit' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Dynamic lighting overlay */}
      <div 
        className={`absolute inset-0 transition-all duration-1000 ${
          phaseAtLeast('lighting') ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: phaseAtLeast('final')
            ? 'radial-gradient(ellipse at 50% 30%, rgba(180,40,40,0.4) 0%, rgba(0,0,0,0.95) 70%)'
            : phaseAtLeast('charge')
            ? 'radial-gradient(ellipse at 50% 30%, rgba(212,165,116,0.3) 0%, rgba(0,0,0,0.95) 60%)'
            : 'radial-gradient(ellipse at 50% 30%, rgba(139,69,19,0.2) 0%, rgba(0,0,0,0.98) 50%)'
        }}
      />
      
      {/* Pulsing red edge glow */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
          phaseAtLeast('charge') ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          boxShadow: 'inset 0 0 150px rgba(139,0,0,0.4), inset 0 0 80px rgba(180,40,40,0.3)',
          animation: phaseAtLeast('final') ? 'pulseEdge 2s ease-in-out infinite' : 'none'
        }}
      />
      
      {/* Dramatic spotlight beam */}
      <div 
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-80 h-[600px] transition-all duration-1000 ${
          phaseAtLeast('portrait') ? 'opacity-40' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(180deg, rgba(212,165,116,0.3) 0%, transparent 100%)',
          clipPath: 'polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)',
          filter: 'blur(20px)'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl">
        
        {/* "ACCUSATION" header */}
        <div 
          className={`mb-8 transition-all duration-700 transform ${
            phaseAtLeast('lighting') ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
        >
          <p className="text-xs sm:text-sm tracking-[0.5em] text-red-400/60 uppercase mb-2 animate-pulse">
            Point of No Return
          </p>
          <h1 
            className="font-display text-4xl sm:text-6xl md:text-7xl tracking-wider"
            style={{ 
              color: '#dc2626',
              textShadow: '0 0 40px rgba(220,38,38,0.5), 3px 3px 0 #000, 0 0 80px rgba(180,40,40,0.3)'
            }}
          >
            ACCUSATION
          </h1>
        </div>
        
        {/* Suspect portrait with dramatic framing */}
        <div 
          className={`mb-8 transition-all duration-700 transform ${
            phaseAtLeast('portrait') ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          <div 
            className="relative inline-block"
            style={{
              animation: phaseAtLeast('charge') ? 'suspectPulse 3s ease-in-out infinite' : 'none'
            }}
          >
            {/* Portrait glow ring */}
            <div 
              className={`absolute -inset-4 rounded-full transition-opacity duration-500 ${
                phaseAtLeast('final') ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                background: 'radial-gradient(circle, rgba(220,38,38,0.3) 0%, transparent 70%)',
                animation: 'pulseGlow 2s ease-in-out infinite'
              }}
            />
            
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-red-800/60 shadow-2xl relative">
              <CharacterPortrait 
                characterId={suspect.id} 
                size="xl"
                className="w-full h-full object-cover"
              />
              
              {/* Dramatic overlay */}
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(180deg, transparent 50%, rgba(139,0,0,0.4) 100%)'
                }}
              />
            </div>
          </div>
          
          {/* Suspect name */}
          <h2 
            className={`font-display text-2xl sm:text-4xl text-amber-50 mt-4 transition-all duration-500 ${
              phaseAtLeast('portrait') ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {suspect.name.toUpperCase()}
          </h2>
          <p className="text-red-400/60 text-sm sm:text-base mt-1">
            {suspect.role}
          </p>
        </div>
        
        {/* Charge statement */}
        <div 
          className={`mb-8 transition-all duration-700 transform ${
            phaseAtLeast('charge') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-lg sm:text-2xl text-amber-100/80 italic leading-relaxed">
            "You are accusing <span className="text-jazz-amber font-semibold">{suspect.name}</span>
            <br />of the murder of <span className="text-red-400">Earl 'Ivory' Hines</span>."
          </p>
        </div>
        
        {/* Evidence strength meter */}
        <div 
          className={`mb-8 transition-all duration-700 ${
            phaseAtLeast('evidence') ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="bg-black/40 border border-white/10 p-4 sm:p-6 rounded-lg backdrop-blur-sm">
            <p className="text-xs sm:text-sm tracking-widest text-white/40 uppercase mb-3">
              Evidence Strength
            </p>
            
            {/* Strength bar */}
            <div className="h-3 bg-black/60 rounded-full overflow-hidden mb-3">
              <div 
                className="h-full transition-all duration-1000 ease-out rounded-full"
                style={{
                  width: `${Math.min((evidenceCount / 10) * 100, 100)}%`,
                  background: evidenceCount >= 8 
                    ? 'linear-gradient(90deg, #16a34a, #22c55e)' 
                    : evidenceCount >= 5 
                    ? 'linear-gradient(90deg, #d4a574, #f59e0b)'
                    : evidenceCount >= 3
                    ? 'linear-gradient(90deg, #eab308, #facc15)'
                    : 'linear-gradient(90deg, #dc2626, #ef4444)',
                  boxShadow: '0 0 10px currentColor'
                }}
              />
            </div>
            
            <p className={`text-xl sm:text-2xl font-display ${evidenceStrength.color}`}>
              {evidenceStrength.text}
            </p>
            <p className="text-xs text-white/30 mt-1">
              {evidenceCount} pieces of evidence collected
            </p>
          </div>
        </div>
        
        {/* Final confirmation */}
        <div 
          className={`transition-all duration-700 ${
            phaseAtLeast('final') ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <p className="text-amber-100/50 text-sm sm:text-base mb-6">
            This decision is final. Are you certain?
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleConfirm}
              className="px-8 py-4 bg-red-900/80 border-2 border-red-600 text-red-100 
                         font-display text-lg sm:text-xl tracking-wider uppercase
                         hover:bg-red-800 hover:border-red-500 hover:scale-105
                         active:scale-95 transition-all duration-200
                         shadow-[0_0_30px_rgba(220,38,38,0.3)]"
            >
              Make Accusation
            </button>
            
            <button
              onClick={handleCancel}
              className="px-8 py-4 bg-black/40 border border-white/20 text-white/60
                         font-display text-lg sm:text-xl tracking-wider uppercase
                         hover:bg-black/60 hover:text-white/80 hover:scale-105
                         active:scale-95 transition-all duration-200"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
      
      {/* CSS Animations */}
      <style>{`
        @keyframes pulseEdge {
          0%, 100% { 
            box-shadow: inset 0 0 150px rgba(139,0,0,0.4), inset 0 0 80px rgba(180,40,40,0.3);
          }
          50% { 
            box-shadow: inset 0 0 180px rgba(139,0,0,0.5), inset 0 0 100px rgba(180,40,40,0.4);
          }
        }
        
        @keyframes pulseGlow {
          0%, 100% { 
            transform: scale(1);
            opacity: 0.6;
          }
          50% { 
            transform: scale(1.1);
            opacity: 1;
          }
        }
        
        @keyframes suspectPulse {
          0%, 100% { 
            filter: drop-shadow(0 0 20px rgba(220,38,38,0.3));
          }
          50% { 
            filter: drop-shadow(0 0 40px rgba(220,38,38,0.5));
          }
        }
      `}</style>
    </div>
  );
}

/**
 * ConfrontationSequence - Shows dramatic dialogue after accusation
 */
export function ConfrontationSequence({ 
  suspect, 
  isGuilty, 
  dialogueLines, 
  onComplete 
}) {
  const [lineIndex, setLineIndex] = useState(0);
  const [showLine, setShowLine] = useState(false);
  
  useEffect(() => {
    // Fade in first line
    const showTimer = setTimeout(() => setShowLine(true), 500);
    return () => clearTimeout(showTimer);
  }, [lineIndex]);
  
  const handleNext = () => {
    setShowLine(false);
    
    setTimeout(() => {
      if (lineIndex < dialogueLines.length - 1) {
        setLineIndex(prev => prev + 1);
      } else {
        onComplete?.();
      }
    }, 300);
  };
  
  const currentLine = dialogueLines[lineIndex];
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95">
      {/* Red dramatic lighting for guilty, amber for innocent */}
      <div 
        className="absolute inset-0"
        style={{
          background: isGuilty
            ? 'radial-gradient(ellipse at 50% 40%, rgba(180,40,40,0.3) 0%, transparent 60%)'
            : 'radial-gradient(ellipse at 50% 40%, rgba(212,165,116,0.2) 0%, transparent 60%)'
        }}
      />
      
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        {/* Speaker portrait */}
        <div className="mb-8">
          <div className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 mx-auto ${
            isGuilty ? 'border-red-600' : 'border-jazz-amber'
          }`}>
            <CharacterPortrait 
              characterId={currentLine.speaker} 
              size="lg"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Dialogue line */}
        <div 
          className={`transition-all duration-500 ${
            showLine ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-xl sm:text-3xl text-amber-100/90 italic leading-relaxed mb-8">
            "{currentLine.text}"
          </p>
        </div>
        
        {/* Continue button */}
        <button
          onClick={handleNext}
          className={`px-6 py-3 border font-display tracking-wider uppercase transition-all duration-200 ${
            showLine ? 'opacity-100' : 'opacity-0'
          } ${
            isGuilty 
              ? 'border-red-600 text-red-400 hover:bg-red-900/30' 
              : 'border-jazz-amber text-jazz-amber hover:bg-amber-900/30'
          }`}
        >
          {lineIndex < dialogueLines.length - 1 ? 'Continue' : 'See Results'}
        </button>
      </div>
    </div>
  );
}
