import { useState, useEffect, useRef, useCallback } from 'react';
import { useGame } from '../context/GameContext';
import { useVoiceContext } from '../context/VoiceContext';
import { TypewriterText } from './TypewriterText';
import { LocationAtmosphere, LightningFlash } from './AtmosphereEffects';
import PrologueBackground from './PrologueBackground';

const prologueSequence = [
  { text: "3:47 AM", style: "time", voice: null, typewriter: false },
  { text: "The phone screams you awake.", style: "narration", voice: "narrator", typewriter: true },
  { text: "For a moment you don't know where you are. Hotel room. Cleveland? No — you're home. Back in New York two days now. The gig in Cleveland was last week. Or the week before.", style: "narration", voice: "narrator", typewriter: true },
  { text: "The phone keeps ringing.", style: "narration", voice: "narrator", typewriter: true },
  { text: '"Yeah."', style: "dialogue", voice: "player", voiceText: "Yeah.", typewriter: false },
  { text: '"This the bass player? From Earl\'s band?"', style: "dialogue", voice: "morrison", voiceText: "This the bass player? From Earl's band?", typewriter: true },
  { text: "Cop voice. You can always tell.", style: "narration", voice: "narrator", typewriter: true },
  { text: '"Who\'s asking?"', style: "dialogue", voice: "player", voiceText: "Who's asking?", typewriter: false },
  { text: '"Detective Morrison, NYPD. I need you to come down to a club in Harlem. The Ember Room. You know it."', style: "dialogue", voice: "morrison", voiceText: "Detective Morrison, NYPD. I need you to come down to a club in Harlem. The Ember Room. You know it.", typewriter: true },
  { text: "It's not a question. Of course you know it. You've played there a hundred times. Earl's home base for twenty years.", style: "narration", voice: "narrator", typewriter: true },
  { text: '"What happened?"', style: "dialogue", voice: "player", voiceText: "What happened?", typewriter: false },
  { text: "A pause. Static on the line.", style: "narration", voice: "narrator", typewriter: true },
  { text: '"Earl Jeffries is dead. Someone killed him tonight, in the back room of his own club."', style: "dialogue", voice: "morrison", voiceText: "Earl Jeffries is dead. Someone killed him tonight, in the back room of his own club.", typewriter: true, dramatic: true },
  { text: "You sit up. The room tilts.", style: "narration", voice: "narrator", typewriter: true },
  { text: "Earl. Dead.", style: "emphasis", voice: "narrator", voiceStyle: "emphasis", typewriter: false, dramatic: true },
  { text: "Three days ago you screamed at him in front of half of Harlem. Called him a thief and a liar. Told him you were done.", style: "narration", voice: "narrator", typewriter: true },
  { text: "Now he's dead.", style: "narration", voice: "narrator", typewriter: true },
  { text: '"I\'ll be there in twenty minutes."', style: "dialogue", voice: "player", voiceText: "I'll be there in twenty minutes.", typewriter: false },
  { text: '"Make it fifteen. And don\'t go anywhere after. We have questions."', style: "dialogue", voice: "morrison", voiceText: "Make it fifteen. And don't go anywhere after. We have questions.", typewriter: true },
  { text: "The line goes dead.", style: "narration", voice: "narrator", typewriter: true },
  { text: "You stare at the phone in your hand.", style: "narration", voice: "narrator", typewriter: true },
  { text: "Earl is dead. And you're a suspect.", style: "emphasis", voice: "narrator", voiceStyle: "emphasis", typewriter: false, dramatic: true },
  { text: "Time to find out what really happened.", style: "final", voice: "narrator", voiceStyle: "emphasis", typewriter: false },
];

export default function Prologue() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [hasFinished, setHasFinished] = useState(false);
  const [textComplete, setTextComplete] = useState(false);
  const [showLightning, setShowLightning] = useState(false);
  const { dispatch } = useGame();
  const { enabled, speak, stop, preload, isPlaying } = useVoiceContext();
  const hasPlayedRef = useRef(new Set());
  const isAdvancingRef = useRef(false);
  
  const advance = useCallback(() => {
    if (isAdvancingRef.current || hasFinished) return;
    isAdvancingRef.current = true;
    
    stop();
    
    if (currentIndex < prologueSequence.length - 1) {
      setIsVisible(false);
      setTextComplete(false);
      setTimeout(() => {
        setCurrentIndex(prev => {
          const next = prev + 1;
          return Math.min(next, prologueSequence.length - 1);
        });
        setIsVisible(true);
        isAdvancingRef.current = false;
      }, 200);
    } else {
      setHasFinished(true);
    }
  }, [currentIndex, stop, hasFinished]);
  
  useEffect(() => {
    if (hasFinished) {
      dispatch({ type: 'SET_SCREEN', payload: 'location' });
      dispatch({ type: 'SET_LOCATION', payload: 'emberRoom' });
    }
  }, [hasFinished, dispatch]);

  useEffect(() => {
    const current = prologueSequence[currentIndex];
    if (current?.dramatic) {
      setTimeout(() => {
        setShowLightning(true);
        setTimeout(() => setShowLightning(false), 300);
      }, 100);
    }
  }, [currentIndex]);
  
  useEffect(() => {
    if (currentIndex < 0 || currentIndex >= prologueSequence.length) {
      return;
    }
    
    const current = prologueSequence[currentIndex];
    
    if (!current) {
      return;
    }

    if (!current.typewriter) {
      setTextComplete(true);
    }
    
    const isLastSlide = currentIndex === prologueSequence.length - 1;
    
    if (currentIndex < prologueSequence.length - 1) {
      const next = prologueSequence[currentIndex + 1];
      if (next && next.voice) {
        const textToPreload = next.voiceText || next.text;
        const characterMap = {
          'narrator': 'narrator',
          'player': 'narrator',
          'morrison': 'detective-morrison'
        };
        const character = characterMap[next.voice] || 'narrator';
        const style = next.voiceStyle || (next.style === 'dialogue' ? 'dialogue' : 'narration');
        preload(textToPreload, character, style);
      }
    }
    
    if (!current.voice || hasPlayedRef.current.has(currentIndex)) {
      return;
    }
    
    hasPlayedRef.current.add(currentIndex);
    
    const textToSpeak = current.voiceText || current.text;
    const voiceStyle = current.voiceStyle || (current.style === 'dialogue' ? 'dialogue' : 'narration');
    
    const characterMap = {
      'narrator': 'narrator',
      'player': 'narrator',
      'morrison': 'detective-morrison'
    };
    const character = characterMap[current.voice] || 'narrator';
    
    const onComplete = (enabled && !isLastSlide) ? () => {
      setTimeout(advance, 800);
    } : null;
    
    speak(textToSpeak, character, voiceStyle, onComplete);
  }, [currentIndex, enabled, speak, preload, advance]);
  
  useEffect(() => {
    return () => stop();
  }, [stop]);
  
  if (hasFinished) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-jazz-amber text-2xl sm:text-4xl font-display animate-pulse">Entering The Ember Room...</p>
        </div>
      </div>
    );
  }
  
  const safeIndex = Math.max(0, Math.min(currentIndex, prologueSequence.length - 1));
  const current = prologueSequence[safeIndex];
  const isLastSlide = safeIndex === prologueSequence.length - 1;
  
  if (!current || typeof current.style === 'undefined') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white text-2xl">Loading...</p>
      </div>
    );
  }
  
  const getStyle = (style) => {
    const textShadow = 'drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]';
    switch (style) {
      case 'time':
        return `font-display text-5xl sm:text-8xl md:text-[10rem] text-jazz-amber tracking-widest ${textShadow}`;
      case 'narration':
        return `text-lg sm:text-2xl md:text-4xl lg:text-5xl leading-relaxed text-white ${textShadow}`;
      case 'dialogue':
        return `text-lg sm:text-2xl md:text-4xl lg:text-5xl leading-relaxed italic text-white ${textShadow}`;
      case 'emphasis':
        return `text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold text-jazz-amber ${textShadow}`;
      case 'final':
        return `text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-jazz-amber ${textShadow}`;
      default:
        return 'text-lg sm:text-2xl md:text-4xl lg:text-5xl text-light';
    }
  };

  const handleTextComplete = () => {
    setTextComplete(true);
  };
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated NYC Skyline Background */}
      <PrologueBackground />
      
      {/* Enhanced Atmosphere Effects - simplified on mobile */}
      <div className="hidden sm:block">
        <LocationAtmosphere screen="prologue" />
      </div>
      
      {/* Dramatic lightning flash on key moments */}
      {showLightning && (
        <div className="fixed inset-0 bg-white/30 z-50 pointer-events-none animate-pulse" />
      )}
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-3 sm:p-4 md:p-8">
        {/* Progress indicator */}
        <div className="fixed top-0 left-0 h-1 bg-jazz-amber/80 transition-all duration-500 z-20"
             style={{ width: `${(safeIndex / (prologueSequence.length - 1)) * 100}%` }} 
        />
        
        {/* Centered content box */}
        <div className="w-full max-w-5xl bg-black/60 backdrop-blur-md border border-white/10 shadow-2xl">
          
          {/* Header */}
          <div className="px-4 sm:px-8 md:px-12 py-3 sm:py-6 border-b border-white/10 bg-black/40">
            <p className="text-sm sm:text-xl md:text-2xl tracking-[0.2em] sm:tracking-[0.3em] text-light-muted uppercase flex items-center gap-2 sm:gap-4">
              <span className="inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              New York City
            </p>
          </div>
          
          {/* Main content */}
          <div 
            className={`px-4 sm:px-8 md:px-16 py-8 sm:py-16 md:py-24 min-h-[200px] sm:min-h-[300px] md:min-h-[350px] flex items-center justify-center transition-all duration-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            onClick={current.typewriter && !textComplete ? handleTextComplete : undefined}
          >
            <div className={`text-center max-w-4xl ${getStyle(current.style)}`}>
              {current.typewriter && isVisible ? (
                <TypewriterText
                  key={currentIndex}
                  text={current.text}
                  speed={current.style === 'dialogue' ? 30 : 35}
                  onComplete={handleTextComplete}
                  showCursor={!textComplete}
                  skipOnClick={true}
                  dramaticPauses={true}
                />
              ) : (
                <span className={current.dramatic ? 'dramatic-text' : ''}>
                  {current.text}
                </span>
              )}
            </div>
          </div>
          
          {/* Footer with button - mobile optimized */}
          <div className="px-4 sm:px-6 md:px-12 py-4 sm:py-5 md:py-6 border-t border-white/10 bg-black/40 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-between sm:justify-start">
              <p className="text-base sm:text-xl md:text-2xl text-light-subtle whitespace-nowrap">
                {safeIndex + 1} / {prologueSequence.length}
              </p>
              <div className="flex items-center gap-2">
                {isPlaying && (
                  <span className="flex items-center gap-1">
                    <span className="w-1 h-2 sm:h-3 bg-jazz-amber animate-pulse" style={{ animationDelay: '0ms' }} />
                    <span className="w-1 h-3 sm:h-5 bg-jazz-amber animate-pulse" style={{ animationDelay: '150ms' }} />
                    <span className="w-1 h-1.5 sm:h-2 bg-jazz-amber animate-pulse" style={{ animationDelay: '300ms' }} />
                  </span>
                )}
                {current.typewriter && !textComplete && (
                  <span className="text-light-subtle text-xs sm:text-sm animate-pulse">Tap to skip</span>
                )}
              </div>
            </div>
            <button
              onClick={advance}
              disabled={hasFinished}
              className={`w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 font-display tracking-wide transition-all duration-300 text-base sm:text-xl md:text-2xl min-h-[44px] ${
                isLastSlide 
                  ? 'bg-jazz-amber text-jazz-black hover:bg-jazz-amber/90 hover:scale-105' 
                  : 'bg-white/10 text-light border border-white/20 hover:bg-white/20 hover:border-jazz-amber/50'
              } ${hasFinished ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLastSlide ? 'BEGIN INVESTIGATION →' : 'CONTINUE →'}
            </button>
          </div>
        </div>
      </div>

      {/* Dramatic text animation */}
      <style>{`
        .dramatic-text {
          animation: dramaticReveal 1s ease-out forwards;
        }
        
        @keyframes dramaticReveal {
          0% { 
            opacity: 0; 
            transform: scale(0.9);
            filter: blur(4px);
          }
          50% {
            opacity: 1;
            transform: scale(1.02);
            filter: blur(0);
          }
          100% { 
            opacity: 1; 
            transform: scale(1);
            filter: blur(0);
          }
        }
      `}</style>
    </div>
  );
}
