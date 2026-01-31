import { useState, useEffect, useCallback } from 'react';
import { useGame } from '../context/GameContext';
import { useAudio } from '../context/AudioContextEnhanced';
import { locations } from '../data/locations';
import { characters } from '../data/characters';
import DialogueBox from './DialogueBox';
import ExamineView from './ExamineView';
import CharacterPortrait from './CharacterPortrait';
import LocationBackground from './LocationBackground';
import { LocationAtmosphere, CigaretteSmoke } from './AtmosphereEffects';
import { RevealText } from './DramaticEffects';
import Tooltip from './Tooltip';
import DifficultyBadge from './DifficultyBadge';
import LocationTitleCard from './LocationTitleCard';

// Map location IDs to background classes
const locationBackgrounds = {
  emberRoom: 'bg-ember-room',
  vanGelderStudio: 'bg-van-gelder-studio',
  earlsApartment: 'bg-earl-apartment',
  lorrainesBrownstone: 'bg-lorraine-brownstone',
  birdland: 'bg-birdland',
};

export default function LocationView() {
  const { state, dispatch, canAccuse } = useGame();
  const { changeMusic, playSFX, TRIGGERS, isInitialized } = useAudio();
  const [activeCharacter, setActiveCharacter] = useState(null);
  const [examiningArea, setExaminingArea] = useState(null);
  const [isEntering, setIsEntering] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [showTitleCard, setShowTitleCard] = useState(false);
  const [visitedLocations, setVisitedLocations] = useState(new Set());
  
  const location = locations[state.currentLocation];
  
  // UI click sound helper
  const playClickSound = useCallback(() => {
    if (isInitialized && TRIGGERS) {
      playSFX(TRIGGERS.MENU_SELECT);
    }
  }, [isInitialized, TRIGGERS, playSFX]);
  
  // Entrance animation and title card
  useEffect(() => {
    setIsEntering(true);
    setShowContent(false);
    
    // Show title card only on first visit to this location this session
    const isFirstVisit = !visitedLocations.has(state.currentLocation);
    if (isFirstVisit) {
      setShowTitleCard(true);
      setVisitedLocations(prev => new Set([...prev, state.currentLocation]));
    } else {
      // No title card, just do normal entrance
      const timer1 = setTimeout(() => setIsEntering(false), 300);
      const timer2 = setTimeout(() => setShowContent(true), 500);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [state.currentLocation]);
  
  // Handle title card completion
  const handleTitleCardComplete = () => {
    setShowTitleCard(false);
    setIsEntering(false);
    setTimeout(() => setShowContent(true), 200);
  };
  
  if (!location) return null;
  
  const locationCharacters = location.characters.map(id => characters[id]);
  const bgClass = locationBackgrounds[state.currentLocation] || 'bg-ember-room';
  
  // Map locations to their music tracks (matching audioConfig.js)
  const locationMusicMap = {
    emberRoom: 'emberRoom',
    vanGelderStudio: 'investigation',
    earlApartment: 'investigation',
    lorraineBrownstone: 'investigation',
    birdland: 'emberRoom',
  };
  
  const handleExamine = (area) => {
    playClickSound();
    setExaminingArea(area);
    changeMusic('investigation');
  };
  
  const handleCloseExamine = () => {
    playClickSound();
    setExaminingArea(null);
    // Restore location-specific music
    const locationMusic = locationMusicMap[state.currentLocation] || 'investigation';
    changeMusic(locationMusic);
  };
  
  const handleTalkTo = (character) => {
    playClickSound();
    setActiveCharacter(character);
    changeMusic('investigation');
  };
  
  const handleCloseDialogue = () => {
    setActiveCharacter(null);
    // Restore location-specific music
    const locationMusic = locationMusicMap[state.currentLocation] || 'investigation';
    changeMusic(locationMusic);
  };
  
  const openJournal = () => {
    playClickSound();
    dispatch({ type: 'SET_SCREEN', payload: 'journal' });
  };
  
  const openTravel = () => {
    playClickSound();
    dispatch({ type: 'SET_SCREEN', payload: 'travel' });
  };
  
  const openAccusation = () => {
    playClickSound();
    dispatch({ type: 'SET_SCREEN', payload: 'accusation' });
  };
  
  if (activeCharacter) {
    return (
      <DialogueBox 
        character={activeCharacter} 
        onClose={handleCloseDialogue}
      />
    );
  }
  
  if (examiningArea) {
    return (
      <ExamineView 
        area={examiningArea}
        onClose={handleCloseExamine}
      />
    );
  }
  
  return (
    <div className={`min-h-screen relative transition-opacity duration-500 ${isEntering ? 'opacity-0' : 'opacity-100'}`}>
      {/* Location Title Card - shown on first visit */}
      {showTitleCard && (
        <LocationTitleCard
          locationId={state.currentLocation}
          onComplete={handleTitleCardComplete}
        />
      )}
      
      {/* Atmospheric Background - CSS gradients */}
      <div className={`location-bg ${bgClass}`}>
        {/* Spotlight flicker for Ember Room */}
        {state.currentLocation === 'emberRoom' && (
          <div className="spotlight-flicker" />
        )}
      </div>
      
      {/* SVG Illustrated Background Layer */}
      <LocationBackground locationId={state.currentLocation} />
      
      {/* Location-specific atmosphere effects */}
      <LocationAtmosphere location={state.currentLocation} screen="location" />
      
      {/* Extra cigarette smoke for bar locations */}
      {(state.currentLocation === 'emberRoom' || state.currentLocation === 'birdland') && (
        <>
          <CigaretteSmoke x={20} y={75} opacity={0.08} />
          <CigaretteSmoke x={80} y={70} opacity={0.06} />
        </>
      )}
      
      {/* Enhanced Vignette Overlay */}
      <div className="enhanced-vignette" />
      
      {/* Content */}
      <div className="relative z-10 p-4 sm:p-8 md:p-16 pb-28 sm:pb-36">
        <div className={`transition-all duration-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {/* Ambient mood indicator */}
          <div className="fixed top-0 left-0 right-0 mood-bar z-20" />
          
          <header className="mb-8 sm:mb-16">
            <RevealText delay={0} duration={600} type="fade-up">
              <p className="text-base sm:text-2xl md:text-3xl tracking-[0.2em] sm:tracking-[0.3em] text-jazz-cream uppercase mb-2 sm:mb-3" style={{textShadow: '1px 1px 0 #000, 2px 2px 0 rgba(0,0,0,0.5)'}}>
                Location
              </p>
            </RevealText>
            <RevealText delay={200} duration={800} type="fade-up">
              <h1 className="font-display text-3xl sm:text-5xl md:text-8xl tracking-wide text-jazz-cream flicker" style={{textShadow: '2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 4px 4px 0 rgba(0,0,0,0.5)'}}>
                {location.name}
              </h1>
            </RevealText>
            <RevealText delay={400} duration={600} type="fade">
              <p className="text-jazz-amber mt-2 sm:mt-3 text-lg sm:text-2xl md:text-3xl" style={{textShadow: '1px 1px 0 #000, 2px 2px 0 rgba(0,0,0,0.5)'}}>{location.subtitle}</p>
            </RevealText>
            <div className="w-16 sm:w-32 h-1 bg-jazz-amber/60 mt-4 sm:mt-6" />
          </header>
          
          <div className="max-w-6xl">
            {/* Scene description with atmosphere */}
            <div className="mb-8 sm:mb-20 relative content-panel">
              <div className="absolute -left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-jazz-amber/60 via-jazz-blue/30 to-transparent" />
              <div className="pl-3 sm:pl-5">
                {location.description.split('\n\n').map((para, i) => (
                  <p key={i} className="mb-4 sm:mb-6 leading-relaxed text-base sm:text-2xl md:text-3xl text-light">
                    {para}
                  </p>
                ))}
              </div>
            </div>
            
            {/* Examine section */}
            <section className="mb-8 sm:mb-20">
              <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-8">
                <span className="text-2xl sm:text-5xl">🔍</span>
                <h2 className="font-display text-2xl sm:text-4xl md:text-5xl tracking-wide text-jazz-amber">EXAMINE</h2>
              </div>
              <div className="space-y-3 sm:space-y-4">
                {location.examinableAreas.map((area, index) => (
                  <button
                    key={area.id}
                    onClick={() => handleExamine(area)}
                    style={{ animationDelay: `${600 + index * 100}ms` }}
                    className="choice-btn animate-slide-in group"
                  >
                    <span className="font-semibold text-lg sm:text-2xl md:text-3xl text-light group-hover:text-jazz-amber transition-colors">{area.name}</span>
                    <p className="text-light-muted mt-1 sm:mt-2 text-sm sm:text-xl md:text-2xl">{area.description}</p>
                  </button>
                ))}
              </div>
            </section>
            
            {/* Talk section with portraits */}
            <section className="mb-8 sm:mb-20">
              <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-8">
                <span className="text-2xl sm:text-5xl">💬</span>
                <h2 className="font-display text-2xl sm:text-4xl md:text-5xl tracking-wide text-jazz-amber">TALK TO</h2>
              </div>
              <div className="grid gap-3 sm:gap-4">
                {locationCharacters.map((char, index) => (
                  <button
                    key={char.id}
                    onClick={() => handleTalkTo(char)}
                    style={{ animationDelay: `${800 + index * 100}ms` }}
                    className="choice-btn flex items-start gap-3 sm:gap-5 text-left animate-slide-in group"
                  >
                    {/* Character portrait */}
                    <div className="flex-shrink-0 relative">
                      <CharacterPortrait 
                        characterId={char.id} 
                        size={60}
                        className="group-hover:scale-105 transition-transform duration-300 sm:w-20 sm:h-20"
                      />
                      {/* Suspect badge */}
                      {char.isSuspect && (
                        <div className="absolute -top-1 -right-1 bg-jazz-amber text-jazz-black px-1 sm:px-1.5 py-0.5 text-xs sm:text-sm font-display tracking-wide transform rotate-6">
                          SUSPECT
                        </div>
                      )}
                      {/* Interviewed indicator */}
                      {state.interviewedCharacters.includes(char.id) && (
                        <div className="absolute -bottom-1 -right-1 bg-jazz-blue text-jazz-cream px-1 sm:px-1.5 py-0.5 text-xs sm:text-sm">
                          ✓
                        </div>
                      )}
                    </div>
                    
                    {/* Character info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
                        <span className="font-semibold text-lg sm:text-2xl md:text-3xl text-light group-hover:text-jazz-amber transition-colors">{char.name}</span>
                        <span className="text-jazz-amber text-sm sm:text-lg md:text-xl" style={{textShadow: '1px 1px 0 #000'}}>— {char.role}</span>
                      </div>
                      <p className="text-light-muted mt-1 sm:mt-2 text-sm sm:text-xl md:text-2xl line-clamp-2 sm:line-clamp-none">{char.description}</p>
                      {state.interviewedCharacters.includes(char.id) && (
                        <p className="text-jazz-blue text-sm sm:text-lg mt-2 sm:mt-3 font-semibold" style={{textShadow: '1px 1px 0 #000'}}>✓ Already interviewed</p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
      
      {/* Bottom action bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm border-t border-white/10 p-4 flex flex-wrap gap-3 justify-center items-center z-30 mobile-bottom-bar safe-area-bottom">
        {/* Travel button */}
        <Tooltip text="Travel to other locations (T)" position="top">
          <button
            onClick={openTravel}
            className="btn-blue btn-shine btn-icon-bounce px-6 py-4 flex items-center gap-3 text-xl md:text-2xl"
          >
            <span className="text-2xl btn-icon">🚕</span>
            <span>TRAVEL</span>
          </button>
        </Tooltip>
        
        {/* Journal button */}
        <Tooltip text="View collected evidence (J)" position="top">
          <button
            onClick={openJournal}
            className="btn-ghost btn-icon-bounce px-6 py-4 text-jazz-cream font-display tracking-wide flex items-center gap-3 text-xl md:text-2xl"
          >
            <span className="text-2xl btn-icon">📓</span>
            <span>JOURNAL</span>
            {state.collectedClues.length > 0 && (
              <span className="bg-jazz-amber text-jazz-black px-2 py-0.5 text-lg rounded">
                {state.collectedClues.length}
              </span>
            )}
          </button>
        </Tooltip>
        
        {/* Accusation button (if available) */}
        {canAccuse && (
          <Tooltip text="Make your accusation" position="top">
            <button
              onClick={openAccusation}
              className="btn-amber btn-shine btn-pulse-attention btn-icon-bounce px-6 py-4 flex items-center gap-3 text-xl md:text-2xl relative"
            >
              <span className="text-2xl btn-icon">⚖️</span>
              <span>ACCUSE</span>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
            </button>
          </Tooltip>
        )}
      </div>
      
      {/* Ambient time indicator */}
      <div className="fixed top-2 right-2 sm:top-8 sm:right-8 text-right z-20 mobile-time-indicator">
        <p className="font-display text-xl sm:text-3xl md:text-4xl text-jazz-cream" style={{textShadow: '1px 1px 0 #000, 2px 2px 0 rgba(0,0,0,0.5)'}}>{location.timeOfDay}</p>
        <p className="text-sm sm:text-lg text-jazz-cream/80 tracking-wider hidden sm:block" style={{textShadow: '1px 1px 0 #000'}}>{location.name.toUpperCase()}</p>
        {/* Difficulty indicator */}
        <div className="mt-1 sm:mt-3">
          <DifficultyBadge />
        </div>
      </div>
      
      {/* Slide-in animation */}
      <style>{`
        .animate-slide-in {
          animation: slideInRight 0.5s ease-out backwards;
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
