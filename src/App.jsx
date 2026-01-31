import { GameProvider, useGame } from './context/GameContext';
import { AudioProvider, useAudio } from './context/AudioContextEnhanced';
import { VoiceProvider } from './context/VoiceContext';
import { useEffect, useState, useCallback } from 'react';
import { TransitionProvider, useTransition } from './components/ScreenTransition';
import useKeyboardShortcuts from './hooks/useKeyboardShortcuts';
import TitleScreen from './components/TitleScreen';
import DifficultySelect from './components/DifficultySelect';
import Prologue from './components/Prologue';
import LocationView from './components/LocationView';
import Journal from './components/Journal';
import TravelScreen from './components/TravelScreen';
import AccusationScreen from './components/AccusationScreen';
import EndingScreen from './components/EndingScreen';
import Timeline from './components/Timeline';
import EvidenceBoard from './components/EvidenceBoard';
import VoiceToggle from './components/VoiceToggle';
import { AudioControlsExpanded } from './components/AudioSettingsPanel';
import { LocationAtmosphere, FilmGrain, Vignette } from './components/AtmosphereEffects';
import { DramaticProvider } from './components/DramaticEffects';
import AutoSaveIndicator from './components/AutoSaveIndicator';
import KeyboardShortcutsHint from './components/KeyboardShortcutsHint';

function GameScreen() {
  const { state, dispatch } = useGame();
  const { setScreen, setLocation } = useAudio();
  const { startTransition, transitioning } = useTransition();
  const [displayedScreen, setDisplayedScreen] = useState(state.currentScreen);
  const [pendingScreen, setPendingScreen] = useState(null);
  
  // Screens that should use transitions
  const transitionScreens = ['location', 'travel', 'journal', 'timeline', 'evidenceBoard', 'accusation'];
  
  // Determine transition type based on screen change
  const getTransitionType = useCallback((from, to) => {
    // Iris for dramatic reveals
    if (to === 'accusation') return 'iris';
    if (to === 'ending') return 'dissolve';
    // Fade for most transitions
    return 'fade';
  }, []);
  
  // Handle screen changes with transitions
  useEffect(() => {
    if (state.currentScreen === displayedScreen) return;
    
    const shouldTransition = 
      transitionScreens.includes(state.currentScreen) || 
      transitionScreens.includes(displayedScreen);
    
    if (shouldTransition && !transitioning) {
      const transType = getTransitionType(displayedScreen, state.currentScreen);
      setPendingScreen(state.currentScreen);
      
      startTransition(transType, () => {
        setDisplayedScreen(state.currentScreen);
        setPendingScreen(null);
      });
    } else if (!transitioning) {
      setDisplayedScreen(state.currentScreen);
    }
  }, [state.currentScreen, displayedScreen, transitioning, startTransition, getTransitionType]);
  
  // Enable keyboard shortcuts
  useKeyboardShortcuts();
  
  // Update audio context when screen changes
  useEffect(() => {
    const screenMap = {
      title: 'title',
      difficultySelect: 'title', // Same audio as title
      prologue: 'prologue',
      location: null,
      journal: 'journal',
      timeline: 'timeline',
      evidenceBoard: 'journal', // Same audio as journal
      travel: 'travel',
      accusation: 'accusation',
      ending: 'ending',
    };
    
    const screen = screenMap[state.currentScreen];
    if (screen) {
      setScreen(screen);
    }
  }, [state.currentScreen, setScreen]);
  
  // Update audio when location changes
  useEffect(() => {
    if (state.currentScreen === 'location' && state.currentLocation) {
      setLocation(state.currentLocation);
    }
  }, [state.currentLocation, state.currentScreen, setLocation]);
  
  // Use displayed screen for rendering (allows transition to complete)
  const screenToRender = displayedScreen;
  
  switch (screenToRender) {
    case 'title':
      return <TitleScreen />;
    case 'difficultySelect':
      return <DifficultySelect />;
    case 'prologue':
      return <Prologue />;
    case 'location':
      return <LocationView />;
    case 'journal':
      return <Journal />;
    case 'timeline':
      return <Timeline />;
    case 'evidenceBoard':
      return <EvidenceBoard />;
    case 'travel':
      return <TravelScreen />;
    case 'accusation':
      return <AccusationScreen />;
    case 'ending':
      return <EndingScreen />;
    default:
      return <TitleScreen />;
  }
}

function AtmosphereLayer() {
  const { state } = useGame();
  
  // Screens that handle their own atmosphere
  const selfHandledScreens = ['title', 'prologue', 'travel', 'ending'];
  
  // Skip if screen handles its own atmosphere
  if (selfHandledScreens.includes(state.currentScreen)) {
    return (
      <>
        {/* Just global film grain for these screens */}
        <FilmGrain opacity={0.02} animated={true} />
      </>
    );
  }
  
  // Get location for location-based screens
  const location = state.currentScreen === 'location' ? state.currentLocation : null;
  
  return (
    <>
      {/* Location-specific effects */}
      {location && <LocationAtmosphere location={location} screen={state.currentScreen} />}
      
      {/* Global film grain */}
      <FilmGrain opacity={0.025} animated={true} />
      
      {/* Global vignette - varies by screen */}
      <Vignette 
        intensity={
          state.currentScreen === 'accusation' ? 'heavy' :
          state.currentScreen === 'journal' ? 'light' :
          state.currentScreen === 'timeline' ? 'light' :
          'medium'
        } 
      />
    </>
  );
}

function GlobalControls() {
  const { state } = useGame();
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Hide global controls on title screen (it has its own audio toggle)
  if (state.currentScreen === 'title') {
    return null;
  }
  
  return (
    <div className="fixed bottom-20 left-4 z-50">
      {/* Collapsed state - single icon button */}
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="w-10 h-10 rounded-full bg-black/70 border border-white/20 
                     flex items-center justify-center text-jazz-amber
                     hover:bg-black/90 hover:scale-110 transition-all duration-200
                     shadow-lg"
          title="Audio & Voice Settings"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        </button>
      )}
      
      {/* Expanded state - full controls */}
      {isExpanded && (
        <div className="bg-black/85 backdrop-blur-sm rounded-lg border border-white/20 p-3 shadow-xl">
          {/* Close/minimize button */}
          <button
            onClick={() => setIsExpanded(false)}
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-black border border-white/30
                       flex items-center justify-center text-white/60 hover:text-white
                       hover:bg-jazz-blue transition-colors"
            title="Minimize"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
          
          <div className="flex flex-col gap-2">
            <AudioControlsExpanded />
            <VoiceToggle />
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <AudioProvider>
      <GameProvider>
        <VoiceProvider>
          <TransitionProvider>
            <DramaticProvider>
            <div className="min-h-screen bg-jazz-cream text-jazz-black relative">
              {/* Main game content */}
              <GameScreen />
              
              {/* Atmosphere effects overlay */}
              <AtmosphereLayer />
              
              {/* Auto-save indicator */}
              <AutoSaveIndicator />
              
              {/* Keyboard shortcuts hint */}
              <KeyboardShortcutsHint />
              
              {/* Global controls */}
              <GlobalControls />
            </div>
            </DramaticProvider>
          </TransitionProvider>
        </VoiceProvider>
      </GameProvider>
    </AudioProvider>
  );
}

export default App;
