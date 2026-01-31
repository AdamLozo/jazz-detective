/**
 * KeyboardShortcutsHint - Shows available keyboard shortcuts
 * 
 * Displays a small hint in the corner that can be expanded to show all shortcuts
 */
import { useState } from 'react';
import { useGame } from '../context/GameContext';

function KeyboardShortcutsHint() {
  const { state } = useGame();
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Hide on title, prologue, and ending screens
  const hiddenScreens = ['title', 'prologue', 'ending'];
  if (hiddenScreens.includes(state.currentScreen)) {
    return null;
  }
  
  // Available shortcuts based on game state
  const shortcuts = [
    { key: 'J', action: 'Journal', available: true },
    { key: 'T', action: 'Travel', available: true },
    { key: 'E', action: 'Evidence Board', available: state.collectedClues.length >= 2 },
    { key: 'L', action: 'Timeline', available: state.collectedClues.length >= 4 },
    { key: 'Esc', action: 'Go Back', available: true },
  ];
  
  const availableShortcuts = shortcuts.filter(s => s.available);
  
  return (
    <div className="fixed bottom-4 right-4 z-40">
      {/* Collapsed - just keyboard icon */}
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="group flex items-center gap-2 px-2 py-1.5 rounded-lg
                     bg-black/40 hover:bg-black/60 border border-white/10 
                     hover:border-white/20 transition-all duration-200"
          title="Keyboard Shortcuts"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="14" 
            height="14" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            className="text-white/50 group-hover:text-jazz-amber transition-colors"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M7 16h10" />
          </svg>
          <span className="text-xs text-white/40 group-hover:text-white/60 transition-colors">
            ?
          </span>
        </button>
      )}
      
      {/* Expanded - show all shortcuts */}
      {isExpanded && (
        <div className="bg-black/80 backdrop-blur-sm rounded-lg border border-white/20 
                       p-3 shadow-xl min-w-48 animate-in fade-in slide-in-from-bottom-2 duration-200">
          {/* Header with close button */}
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/10">
            <span className="text-xs font-semibold text-jazz-amber uppercase tracking-wide">
              Keyboard Shortcuts
            </span>
            <button
              onClick={() => setIsExpanded(false)}
              className="w-5 h-5 rounded flex items-center justify-center 
                        text-white/40 hover:text-white hover:bg-white/10 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          
          {/* Shortcuts list */}
          <div className="space-y-1.5">
            {availableShortcuts.map(shortcut => (
              <div key={shortcut.key} className="flex items-center justify-between gap-4">
                <span className="text-xs text-white/70">{shortcut.action}</span>
                <kbd className="px-1.5 py-0.5 text-xs font-mono bg-white/10 rounded 
                              text-jazz-cream border border-white/20">
                  {shortcut.key}
                </kbd>
              </div>
            ))}
          </div>
          
          {/* Locked shortcuts hint */}
          {shortcuts.some(s => !s.available) && (
            <div className="mt-2 pt-2 border-t border-white/10">
              <span className="text-xs text-white/30 italic">
                More shortcuts unlock as you collect evidence
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default KeyboardShortcutsHint;
