/**
 * AutoSaveIndicator - Shows when game auto-saves
 * 
 * Displays a subtle indicator when the game saves to localStorage
 */
import { useState, useEffect, useRef } from 'react';
import { useGame } from '../context/GameContext';

function AutoSaveIndicator() {
  const { state } = useGame();
  const [showIndicator, setShowIndicator] = useState(false);
  const [saveCount, setSaveCount] = useState(0);
  const previousStateRef = useRef(null);
  const timeoutRef = useRef(null);
  
  // Track meaningful state changes that trigger saves
  useEffect(() => {
    // Skip title screen and ending
    if (state.currentScreen === 'title' || state.gameEnded) {
      return;
    }
    
    // Skip if no game started
    if (!state.startedAt) {
      return;
    }
    
    // Check if meaningful game state changed
    const currentKey = JSON.stringify({
      clues: state.collectedClues.length,
      locations: state.unlockedLocations.length,
      interviews: state.interviewedCharacters.length,
      flags: Object.keys(state.dialogueFlags).length,
      timeline: state.placedTimelineEvents.length,
      board: state.evidenceBoard?.items?.length || 0,
    });
    
    if (previousStateRef.current && previousStateRef.current !== currentKey) {
      // State changed - show save indicator
      setSaveCount(c => c + 1);
      setShowIndicator(true);
      
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Hide after 2 seconds
      timeoutRef.current = setTimeout(() => {
        setShowIndicator(false);
      }, 2000);
    }
    
    previousStateRef.current = currentKey;
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [state]);
  
  // Don't render on title/ending screens
  if (state.currentScreen === 'title' || state.currentScreen === 'ending') {
    return null;
  }
  
  return (
    <div 
      className={`fixed top-4 left-4 z-40 flex items-center gap-2 px-3 py-1.5 
                  rounded-full bg-black/60 backdrop-blur-sm border border-white/10
                  transition-all duration-500 ease-out
                  ${showIndicator 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 -translate-y-2 pointer-events-none'
                  }`}
    >
      {/* Animated save icon */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="14" 
        height="14" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
        className="text-jazz-gold animate-pulse"
      >
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
        <polyline points="17 21 17 13 7 13 7 21" />
        <polyline points="7 3 7 8 15 8" />
      </svg>
      
      <span className="text-xs text-jazz-cream/80 font-medium">
        Saved
      </span>
    </div>
  );
}

export default AutoSaveIndicator;
