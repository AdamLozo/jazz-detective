import { useGame } from '../context/GameContext';
import { useState, useEffect } from 'react';
import TitleScreenBackground from './TitleScreenBackground';
import { useTitleAudio, TitleAudioToggle } from './TitleScreenAudio';
import { RainEffect, SmokeEffect, Vignette, FilmGrain, NeonGlow, FlickeringLight } from './AtmosphereEffects';
import CaseRecap from './CaseRecap';

export default function TitleScreen() {
  const { dispatch, hasSave, loadGame, getSaveInfo, getFullSaveData } = useGame();
  const [saveInfo, setSaveInfo] = useState(null);
  const [showNewGameConfirm, setShowNewGameConfirm] = useState(false);
  const [showCaseRecap, setShowCaseRecap] = useState(false);
  const [fullSaveData, setFullSaveData] = useState(null);
  const [animationPhase, setAnimationPhase] = useState('initial');
  
  // Audio hook
  const { startAudio, stopAudio, isPlaying } = useTitleAudio();
  
  useEffect(() => {
    if (hasSave()) {
      setSaveInfo(getSaveInfo());
    }
    
    // Dramatic entrance sequence
    const phases = [
      { phase: 'fade-in', delay: 100 },
      { phase: 'show-location', delay: 1500 },
      { phase: 'show-title', delay: 2500 },
      { phase: 'show-subtitle', delay: 4000 },
      { phase: 'show-buttons', delay: 5500 },
      { phase: 'full', delay: 6500 },
    ];
    
    const timers = phases.map(({ phase, delay }) => 
      setTimeout(() => setAnimationPhase(phase), delay)
    );
    
    return () => timers.forEach(clearTimeout);
  }, [hasSave, getSaveInfo]);
  
  const startNewGame = () => {
    if (saveInfo && !showNewGameConfirm) {
      setShowNewGameConfirm(true);
      return;
    }
    stopAudio();
    dispatch({ type: 'START_NEW_GAME' });
  };
  
  // Show case recap when continuing
  const showRecap = () => {
    const data = getFullSaveData();
    setFullSaveData(data);
    setShowCaseRecap(true);
  };
  
  // Actually continue the game after recap
  const continueGame = () => {
    stopAudio();
    setShowCaseRecap(false);
    loadGame();
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const phaseAtLeast = (phase) => {
    const order = ['initial', 'fade-in', 'show-location', 'show-title', 'show-subtitle', 'show-buttons', 'full'];
    return order.indexOf(animationPhase) >= order.indexOf(phase);
  };
  
  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Illustrated Background */}
      <TitleScreenBackground animationPhase={animationPhase} />
      
      {/* Atmospheric Effects - simplified on mobile for performance */}
      {phaseAtLeast('fade-in') && (
        <>
          {/* Rain - lighter on mobile */}
          <RainEffect 
            intensity={phaseAtLeast('show-title') ? 'medium' : 'light'} 
            windAngle={15} 
            color="rgba(174, 194, 224, 0.4)"
          />
          
          {/* Smoke/fog - hidden on small mobile */}
          <div className="hidden sm:block">
            <SmokeEffect 
              density="medium" 
              direction="right" 
              color="rgba(255,255,255,0.02)"
            />
          </div>
          
          {/* Neon glow from club sign */}
          <NeonGlow 
            color="#d4a574" 
            position={{ x: 50, y: 35 }} 
            size={500} 
            flicker={true}
          />
          
          {/* Flickering neon signs - hidden on mobile */}
          <div className="hidden md:block">
            <FlickeringLight
              type="neon"
              color="rgba(255, 100, 100, 0.1)"
              position={{ x: 25, y: 25 }}
              size={150}
              intensity="medium"
            />
            <FlickeringLight
              type="neon"
              color="rgba(100, 150, 255, 0.08)"
              position={{ x: 75, y: 30 }}
              size={120}
              intensity="subtle"
            />
          </div>
        </>
      )}
      
      {/* Extra atmospheric overlay */}
      <div className={`absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 transition-opacity duration-2000 ${phaseAtLeast('fade-in') ? 'opacity-100' : 'opacity-0'}`} />
      
      {/* Film grain - lighter on mobile */}
      <FilmGrain opacity={0.04} animated={true} />
      
      {/* Heavy vignette for noir feel */}
      <Vignette intensity="heavy" />
      
      {/* Title Content - Upper area */}
      <div className="relative z-10 pt-8 sm:pt-12 md:pt-16 flex flex-col items-center px-4">
        <div className="text-center">
          {/* Location text */}
          <p className={`text-lg sm:text-2xl md:text-3xl tracking-[0.3em] sm:tracking-[0.4em] text-amber-100/70 mb-2 sm:mb-4 uppercase transition-all duration-1000 transform ${phaseAtLeast('show-location') ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
            Harlem, 1965
          </p>
          
          {/* Main title - responsive sizing */}
          <div className={`transition-all duration-1500 transform ${phaseAtLeast('show-title') ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <h1 className="font-display text-[4rem] sm:text-[6rem] md:text-[10rem] lg:text-[12rem] text-amber-50 tracking-wider mb-0 leading-none title-glow">
              JAZZ
            </h1>
            <h1 className="font-display text-[4rem] sm:text-[6rem] md:text-[10rem] lg:text-[12rem] text-jazz-amber tracking-wider leading-none title-glow-amber">
              NOIR
            </h1>
          </div>
          
          {/* Decorative line */}
          <div className={`flex items-center justify-center gap-2 sm:gap-4 my-2 sm:my-4 transition-all duration-1000 ${phaseAtLeast('show-subtitle') ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-10 sm:w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-jazz-amber/60" />
            <span className="text-jazz-amber/60 text-base sm:text-xl md:text-2xl">♪ ♪ ♪</span>
            <div className="w-10 sm:w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-jazz-amber/60" />
          </div>
          
          {/* Subtitle */}
          <p className={`text-lg sm:text-2xl md:text-4xl text-amber-100/60 italic transition-all duration-1000 transform ${phaseAtLeast('show-subtitle') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            A Murder in Three Sets
          </p>
        </div>
      </div>
      
      {/* Buttons - Fixed at bottom with safe area */}
      <div className={`absolute bottom-0 left-0 right-0 z-20 transition-all duration-1000 safe-area-bottom ${phaseAtLeast('show-buttons') ? 'opacity-100' : 'opacity-0'}`}>
        {/* Gradient fade behind buttons */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
        
        <div className="relative pb-4 sm:pb-8 pt-10 sm:pt-16 flex flex-col items-center px-4">
          {/* Game buttons */}
          <div className="flex flex-col items-center gap-3 sm:gap-4 w-full max-w-md">
            {saveInfo && (
              <>
                <button
                  onClick={showRecap}
                  className="btn-amber btn-shine w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 text-2xl sm:text-4xl md:text-5xl min-h-[44px]"
                >
                  CONTINUE
                </button>
                <p className="text-xs sm:text-lg text-amber-100/50 text-center">
                  {saveInfo.cluesFound} clues • {saveInfo.locationsUnlocked} locations
                  <span className="hidden sm:inline">
                    {saveInfo.lastSaved && (
                      <span className="ml-2">• Saved {formatDate(saveInfo.lastSaved)}</span>
                    )}
                  </span>
                </p>
              </>
            )}
            
            {showNewGameConfirm ? (
              <div className="flex flex-col items-center gap-3 sm:gap-4 mt-2 w-full">
                <p className="text-sm sm:text-xl text-amber-100/60 text-center">Start fresh? Your saved progress will be lost.</p>
                <div className="flex gap-2 sm:gap-4 w-full sm:w-auto">
                  <button
                    onClick={startNewGame}
                    className="btn-amber flex-1 sm:flex-none px-4 sm:px-8 py-3 sm:py-4 text-base sm:text-2xl min-h-[44px]"
                  >
                    YES, START NEW
                  </button>
                  <button
                    onClick={() => setShowNewGameConfirm(false)}
                    className="btn-ghost flex-1 sm:flex-none px-4 sm:px-8 py-3 sm:py-4 text-amber-100/60 font-display text-base sm:text-2xl tracking-wide min-h-[44px]"
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={startNewGame}
                className={`btn-ghost btn-shine w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 text-amber-50 font-display text-2xl sm:text-4xl md:text-5xl tracking-wide min-h-[44px] ${saveInfo ? 'mt-2' : ''}`}
              >
                {saveInfo ? 'NEW GAME' : 'BEGIN'}
              </button>
            )}
          </div>
          
          {/* Tagline - hidden on very small screens */}
          <p className={`mt-4 sm:mt-6 text-xs sm:text-base md:text-lg text-amber-100/30 max-w-2xl mx-auto text-center leading-relaxed transition-all duration-1000 hidden xs:block ${phaseAtLeast('full') ? 'opacity-100' : 'opacity-0'}`}>
            A game for those who know their bebop from their hard bop.
            <span className="hidden sm:inline"> Knowledge of the 1950s scene may prove... useful.</span>
          </p>
        </div>
      </div>
      
      {/* Audio Toggle - repositioned for mobile */}
      <TitleAudioToggle 
        startAudio={startAudio} 
        stopAudio={stopAudio} 
        isPlaying={isPlaying} 
      />
      
      {/* Credits - hidden on mobile */}
      <div className={`absolute bottom-24 right-8 text-right text-amber-100/20 text-sm transition-all duration-1000 z-10 hidden sm:block ${phaseAtLeast('full') ? 'opacity-100' : 'opacity-0'}`}>
        <p>A Jazz Detective Mystery</p>
      </div>
      
      {/* Case Recap Overlay */}
      {showCaseRecap && fullSaveData && (
        <CaseRecap
          saveData={fullSaveData}
          onContinue={continueGame}
          onCancel={() => setShowCaseRecap(false)}
        />
      )}
      
      {/* Crisp noir text styling */}
      <style>{`
        .title-glow {
          text-shadow: 
            2px 2px 0 #000,
            -1px -1px 0 #000,
            1px -1px 0 #000,
            -1px 1px 0 #000,
            4px 4px 0 rgba(0,0,0,0.4);
        }
        
        @media (min-width: 640px) {
          .title-glow {
            text-shadow: 
              3px 3px 0 #000,
              -1px -1px 0 #000,
              1px -1px 0 #000,
              -1px 1px 0 #000,
              6px 6px 0 rgba(0,0,0,0.4);
          }
        }
        
        .title-glow-amber {
          text-shadow: 
            2px 2px 0 #000,
            -1px -1px 0 #000,
            1px -1px 0 #000,
            -1px 1px 0 #000,
            4px 4px 0 rgba(0,0,0,0.4);
        }
        
        @media (min-width: 640px) {
          .title-glow-amber {
            text-shadow: 
              3px 3px 0 #000,
              -1px -1px 0 #000,
              1px -1px 0 #000,
              -1px 1px 0 #000,
              6px 6px 0 rgba(0,0,0,0.4);
          }
        }
      `}</style>
    </div>
  );
}
