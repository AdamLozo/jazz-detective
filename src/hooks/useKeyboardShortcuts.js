/**
 * useKeyboardShortcuts - Global keyboard shortcuts for the game
 * 
 * Shortcuts:
 * - J: Open Journal
 * - T: Open Travel
 * - E: Open Evidence Board (when available)
 * - Escape: Go back / Close current screen
 * - Space: Skip typewriter text (in dialogue)
 * - 1-9: Quick select dialogue options
 */
import { useEffect, useCallback } from 'react';
import { useGame } from '../context/GameContext';

export function useKeyboardShortcuts() {
  const { state, dispatch } = useGame();
  
  const handleKeyDown = useCallback((event) => {
    // Don't trigger shortcuts when typing in an input
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
      return;
    }
    
    // Don't trigger on title, prologue, or ending screens
    const restrictedScreens = ['title', 'prologue', 'ending'];
    if (restrictedScreens.includes(state.currentScreen)) {
      return;
    }
    
    const key = event.key.toLowerCase();
    
    switch (key) {
      case 'j':
        // Open Journal from any game screen
        if (state.currentScreen !== 'journal') {
          dispatch({ type: 'SET_SCREEN', payload: 'journal' });
        }
        break;
        
      case 't':
        // Open Travel from any game screen
        if (state.currentScreen !== 'travel') {
          dispatch({ type: 'SET_SCREEN', payload: 'travel' });
        }
        break;
        
      case 'e':
        // Open Evidence Board (requires 2+ clues)
        if (state.collectedClues.length >= 2 && state.currentScreen !== 'evidenceBoard') {
          dispatch({ type: 'SET_SCREEN', payload: 'evidenceBoard' });
        }
        break;
        
      case 'l':
        // Open Timeline (requires 4+ clues)
        if (state.collectedClues.length >= 4 && state.currentScreen !== 'timeline') {
          dispatch({ type: 'SET_SCREEN', payload: 'timeline' });
        }
        break;
        
      case 'escape':
        // Go back based on current screen
        switch (state.currentScreen) {
          case 'journal':
          case 'travel':
          case 'timeline':
          case 'evidenceBoard':
          case 'accusation':
            // Return to location if we have one, otherwise travel
            if (state.currentLocation) {
              dispatch({ type: 'SET_SCREEN', payload: 'location' });
            } else {
              dispatch({ type: 'SET_SCREEN', payload: 'travel' });
            }
            break;
          default:
            break;
        }
        break;
        
      default:
        break;
    }
  }, [state.currentScreen, state.currentLocation, state.collectedClues.length, dispatch]);
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}

export default useKeyboardShortcuts;
