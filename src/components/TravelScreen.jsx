import { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { useAudio } from '../context/AudioContextEnhanced';
import { locations } from '../data/locations';
import { LocationAtmosphere, RainEffect } from './AtmosphereEffects';
import { RevealText } from './DramaticEffects';
import Tooltip from './Tooltip';

export default function TravelScreen() {
  const { state, dispatch, canAccuse } = useGame();
  const { playSFX, TRIGGERS, isInitialized } = useAudio();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Play click sound
  const playClick = () => {
    if (isInitialized && TRIGGERS) {
      playSFX(TRIGGERS.MENU_SELECT);
    }
  };
  
  const handleTravel = (locationId) => {
    if (isTransitioning) return;
    
    playClick();
    setSelectedLocation(locationId);
    setIsTransitioning(true);
    
    setTimeout(() => {
      dispatch({ type: 'SET_LOCATION', payload: locationId });
      dispatch({ type: 'SET_SCREEN', payload: 'location' });
    }, 800);
  };
  
  const handleAccusation = () => {
    playClick();
    dispatch({ type: 'SET_SCREEN', payload: 'accusation' });
  };
  
  const handleJournal = () => {
    playClick();
    dispatch({ type: 'SET_SCREEN', payload: 'journal' });
  };
  
  const allLocations = Object.values(locations).map(loc => ({
    ...loc,
    isUnlocked: state.unlockedLocations.includes(loc.id),
    isCurrent: state.currentLocation === loc.id,
  }));

  const getLocationFlavor = (locId) => {
    switch (locId) {
      case 'emberRoom': return 'Where it happened.';
      case 'vanGelderStudio': return 'The last recording session.';
      case 'earlsApartment': return 'His private sanctuary.';
      case 'lorrainesBrownstone': return 'The widow\'s home.';
      case 'birdland': return 'Where the competition lurked.';
      default: return '';
    }
  };
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* NYC Night Background */}
      <div className="location-bg bg-travel" />
      
      {/* Atmosphere Effects - simplified on mobile */}
      <div className="hidden sm:block">
        <LocationAtmosphere screen="travel" />
      </div>
      
      {/* Transition overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 bg-black z-50 transition-opacity duration-700 opacity-100" />
      )}
      
      {/* Content */}
      <div className="relative z-10 p-4 sm:p-8 md:p-16 pb-32 sm:pb-16">
        <div className="scene-enter max-w-6xl mx-auto">
          <header className="mb-6 sm:mb-12">
            <RevealText delay={0} duration={600} type="fade-up">
              <p className="text-sm sm:text-xl md:text-2xl tracking-[0.2em] sm:tracking-[0.3em] text-white/60 uppercase mb-1 sm:mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                Where to next?
              </p>
            </RevealText>
            <RevealText delay={200} duration={800} type="fade-up">
              <h1 className="font-display text-4xl sm:text-5xl md:text-7xl tracking-wide text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
                TRAVEL
              </h1>
            </RevealText>
            <div className="w-16 sm:w-24 h-1 bg-jazz-amber/60 mt-3 sm:mt-5" />
            
            {/* Time/weather indicator - condensed on mobile */}
            <div className="mt-4 sm:mt-6 flex items-center gap-2 sm:gap-4 text-white/50 text-sm sm:text-lg">
              <span className="flex items-center gap-1 sm:gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                </svg>
                4:23 AM
              </span>
              <span className="text-white/30">•</span>
              <span className="flex items-center gap-1 sm:gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z"/>
                </svg>
                Rain
              </span>
            </div>
          </header>
          
          {/* Location grid - single column on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-12">
            {allLocations.map((loc, index) => (
              <button
                key={loc.id}
                onClick={() => loc.isUnlocked && handleTravel(loc.id)}
                disabled={!loc.isUnlocked || isTransitioning}
                style={{ animationDelay: `${index * 100}ms` }}
                className={`location-card text-left p-4 sm:p-6 border-2 transition-all duration-300 backdrop-blur-sm relative overflow-hidden group min-h-[80px] sm:min-h-[100px] ${
                  loc.isUnlocked
                    ? loc.isCurrent
                      ? 'border-jazz-amber bg-jazz-amber/20 cursor-pointer'
                      : selectedLocation === loc.id
                        ? 'border-jazz-amber bg-jazz-amber/30 scale-[0.98]'
                        : 'border-white/20 hover:border-jazz-amber/50 hover:bg-white/10 cursor-pointer bg-black/40'
                    : 'border-white/10 bg-black/60 cursor-not-allowed opacity-50'
                }`}
              >
                {/* Hover glow effect - hidden on mobile */}
                {loc.isUnlocked && !loc.isCurrent && (
                  <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-jazz-amber/0 via-jazz-amber/5 to-jazz-amber/0 
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                )}
                
                <div className="relative z-10">
                  <div className="flex items-center sm:items-baseline justify-between mb-1 sm:mb-2 gap-2">
                    <h2 className="font-display text-lg sm:text-2xl md:text-3xl tracking-wide text-light">
                      {loc.isUnlocked ? loc.name : '???'}
                    </h2>
                    {loc.isCurrent && (
                      <span className="text-jazz-amber text-xs sm:text-sm flex items-center gap-1 sm:gap-2 flex-shrink-0">
                        <span className="w-2 h-2 bg-jazz-amber rounded-full animate-pulse" />
                        <span className="hidden xs:inline">CURRENT</span>
                      </span>
                    )}
                    {!loc.isUnlocked && (
                      <span className="text-light-subtle text-xs sm:text-sm flex items-center gap-1 sm:gap-2 flex-shrink-0">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                        </svg>
                        <span className="hidden xs:inline">LOCKED</span>
                      </span>
                    )}
                  </div>
                  <p className="text-light-muted text-sm sm:text-lg md:text-xl line-clamp-1 sm:line-clamp-none">
                    {loc.isUnlocked ? loc.subtitle : 'Find more clues to unlock'}
                  </p>
                  {loc.isUnlocked && (
                    <p className="text-jazz-amber/60 text-xs sm:text-sm mt-1 sm:mt-2 italic hidden sm:block">
                      {getLocationFlavor(loc.id)}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>
          
          {/* Action buttons - stacked on mobile */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-10">
            <button
              onClick={handleJournal}
              className="btn-ghost btn-icon-bounce px-6 sm:px-8 py-4 sm:py-5 text-light font-display tracking-wide flex items-center justify-center sm:justify-start gap-2 sm:gap-3 text-base sm:text-xl md:text-2xl min-h-[44px]"
            >
              <span className="text-xl sm:text-2xl btn-icon">📓</span>
              <span>REVIEW JOURNAL</span>
              {state.collectedClues.length > 0 && (
                <span className="bg-jazz-amber text-jazz-black px-2 py-0.5 text-sm sm:text-lg rounded">
                  {state.collectedClues.length}
                </span>
              )}
            </button>
            
            {canAccuse ? (
              <button
                onClick={handleAccusation}
                className="btn-amber btn-shine btn-pulse-attention btn-icon-bounce relative px-6 sm:px-8 py-4 sm:py-5 flex items-center justify-center sm:justify-start gap-2 sm:gap-3 text-base sm:text-xl md:text-2xl min-h-[44px]"
              >
                <span className="text-xl sm:text-2xl btn-icon">⚖️</span>
                <span>MAKE ACCUSATION</span>
                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-500 opacity-75 top-2 right-2 sm:-top-1 sm:-right-1" />
              </button>
            ) : (
              <div className="px-6 sm:px-8 py-4 sm:py-5 bg-black/40 text-light-muted font-display tracking-wide flex items-center justify-center sm:justify-start gap-2 sm:gap-3 text-sm sm:text-xl md:text-2xl border border-white/10 min-h-[44px]">
                <span className="text-xl sm:text-2xl opacity-50">⚖️</span>
                <span>NEED MORE EVIDENCE ({state.collectedClues.length}/8)</span>
              </div>
            )}
          </div>
          
          {/* Investigation progress - mobile optimized */}
          <div className="p-4 sm:p-6 border border-white/20 max-w-lg bg-black/50 backdrop-blur-sm">
            <h3 className="font-display text-lg sm:text-2xl mb-3 sm:mb-4 text-jazz-amber flex items-center gap-2 sm:gap-3">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
              </svg>
              <span className="hidden xs:inline">INVESTIGATION </span>PROGRESS
            </h3>
            <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-3">
              <div className="flex-1 h-2 sm:h-3 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-jazz-amber to-jazz-amber/70 transition-all duration-700 ease-out rounded-full"
                  style={{ width: `${Math.min((state.collectedClues.length / 8) * 100, 100)}%` }}
                />
              </div>
              <span className="text-sm sm:text-lg text-light-muted font-mono">
                {state.collectedClues.length}/8
              </span>
            </div>
            <p className="text-light-subtle text-xs sm:text-base">
              {canAccuse 
                ? "✓ You have enough evidence. Ready to make your accusation."
                : `Gather ${8 - state.collectedClues.length} more piece${8 - state.collectedClues.length === 1 ? '' : 's'} of evidence.`
              }
            </p>
            
            {/* Quick clue preview - compact on mobile */}
            {state.collectedClues.length > 0 && (
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/10">
                <p className="text-white/40 text-xs sm:text-sm mb-2">Recent evidence:</p>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {state.collectedClues.slice(-3).map(clue => (
                    <span 
                      key={clue.id}
                      className="px-2 py-0.5 sm:py-1 bg-white/5 text-white/60 text-xs sm:text-sm rounded border border-white/10 truncate max-w-[120px] sm:max-w-none"
                    >
                      {clue.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Location card animation */}
      <style>{`
        .location-card {
          animation: cardSlideIn 0.5s ease-out backwards;
        }
        
        @keyframes cardSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
