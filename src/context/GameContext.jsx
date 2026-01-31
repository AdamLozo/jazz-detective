import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';

const SAVE_KEY = 'jazz-detective-save';

const initialState = {
  currentScreen: 'title', // title, difficultySelect, prologue, location, journal, travel, accusation, ending
  currentLocation: null,
  collectedClues: [],
  dialogueFlags: {},
  interviewedCharacters: [],
  visitedDialogueNodes: {}, // { characterId: ['nodeId1', 'nodeId2', ...] }
  audioCluesCompleted: [],
  unlockedLocations: ['emberRoom'], // Start with only the crime scene
  gameEnded: false,
  accusedSuspect: null,
  wasCorrect: false,
  // Difficulty setting: 'novice' or 'expert'
  difficulty: null,
  // Track playtime and save metadata
  startedAt: null,
  lastSavedAt: null,
  // Jazz knowledge tracking - required to unlock key evidence
  jazzKnowledgePassed: [], // IDs of passed knowledge checks
  jazzKnowledgeFailed: [], // IDs of failed knowledge checks
  // Timeline reconstruction feature
  placedTimelineEvents: [], // IDs of events placed on timeline
  timelineContradictionsFound: [], // IDs of discovered contradictions
  // Evidence Board feature
  evidenceBoard: {
    items: [], // { id, type, x, y }
    connections: [], // { id, from, to, color, label }
    hintsUsed: 0,
  },
};

// The killer is Teddy Olson
const THE_KILLER = 'teddy';

// Required evidence to make accusation available
const REQUIRED_CLUES_FOR_ACCUSATION = 8;

// Load saved game from localStorage
function loadSavedGame() {
  try {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Validate the save has required fields
      if (parsed.collectedClues && parsed.unlockedLocations) {
        // Migrate old saves: add evidenceBoard if missing
        if (!parsed.evidenceBoard) {
          parsed.evidenceBoard = {
            items: [],
            connections: [],
            hintsUsed: 0,
          };
        }
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Failed to load saved game:', e);
  }
  return null;
}

// Save game to localStorage
function saveGame(state) {
  try {
    const saveData = {
      ...state,
      lastSavedAt: new Date().toISOString(),
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
    return true;
  } catch (e) {
    console.warn('Failed to save game:', e);
    return false;
  }
}

// Clear saved game
function clearSave() {
  try {
    localStorage.removeItem(SAVE_KEY);
    return true;
  } catch (e) {
    console.warn('Failed to clear save:', e);
    return false;
  }
}

function gameReducer(state, action) {
  switch (action.type) {
    case 'SET_SCREEN':
      return { ...state, currentScreen: action.payload };
      
    case 'SET_LOCATION':
      return { ...state, currentLocation: action.payload };
      
    case 'COLLECT_CLUE': {
      if (state.collectedClues.find(c => c.id === action.payload.id)) {
        return state;
      }
      const newClues = [...state.collectedClues, action.payload];
      let newUnlocked = [...state.unlockedLocations];
      
      // Unlock Earl's apartment when matchbook is found
      if (action.payload.id === 'matchbook' && !newUnlocked.includes('earlApartment')) {
        newUnlocked.push('earlApartment');
      }
      
      // Unlock Lorraine's brownstone when gambling IOUs are found (proof of debt)
      if (action.payload.id === 'gamblingIOUs' && !newUnlocked.includes('lorraineBrownstone')) {
        newUnlocked.push('lorraineBrownstone');
      }
      
      // Unlock Birdland after collecting 3+ clues (investigation momentum)
      if (newClues.length >= 3 && !newUnlocked.includes('birdland')) {
        newUnlocked.push('birdland');
      }
      
      // Unlock Van Gelder after collecting any evidence (investigation started)
      if (newClues.length >= 1 && !newUnlocked.includes('vanGelderStudio')) {
        newUnlocked.push('vanGelderStudio');
      }
      
      return { 
        ...state, 
        collectedClues: newClues,
        unlockedLocations: newUnlocked,
      };
    }
      
    case 'SET_DIALOGUE_FLAG': {
      const newFlags = { ...state.dialogueFlags, [action.payload.key]: action.payload.value };
      // Check for location unlocks based on flags
      let newUnlocked = [...state.unlockedLocations];
      
      // Van Gelder's Studio unlocks after learning something from bartender or Teddy
      if ((newFlags.bartender_contradicts_teddy || newFlags.learned_chet_in_alley || newFlags.teddy_confirmed_debt) 
          && !newUnlocked.includes('vanGelderStudio')) {
        newUnlocked.push('vanGelderStudio');
      }
      
      // Birdland unlocks when you learn about Chet OR after interviewing bartender
      if ((newFlags.learned_chet_in_alley || newFlags.unlocked_birdland || newFlags.bartender_contradicts_teddy) 
          && !newUnlocked.includes('birdland')) {
        newUnlocked.push('birdland');
      }
      
      // Lorraine's brownstone unlocks when you learn about her OR learn about Teddy's debt
      if ((newFlags.learned_lorraine_knew_debt || newFlags.unlocked_lorraine || newFlags.teddy_confirmed_debt) 
          && !newUnlocked.includes('lorraineBrownstone')) {
        newUnlocked.push('lorraineBrownstone');
      }
      
      // Earl's apartment unlocks after talking to Lorraine or finding the matchbook
      if ((newFlags.earl_feared_teddy || state.collectedClues.find(c => c.id === 'matchbook'))
          && !newUnlocked.includes('earlApartment')) {
        newUnlocked.push('earlApartment');
      }
      
      return { 
        ...state, 
        dialogueFlags: newFlags,
        unlockedLocations: newUnlocked,
      };
    }
    
    case 'UNLOCK_LOCATION':
      if (state.unlockedLocations.includes(action.payload)) {
        return state;
      }
      return { ...state, unlockedLocations: [...state.unlockedLocations, action.payload] };
      
    case 'MARK_INTERVIEWED':
      if (state.interviewedCharacters.includes(action.payload)) {
        return state;
      }
      return { ...state, interviewedCharacters: [...state.interviewedCharacters, action.payload] };
    
    case 'VISIT_DIALOGUE_NODE': {
      const { characterId, nodeId } = action.payload;
      const existingNodes = state.visitedDialogueNodes[characterId] || [];
      if (existingNodes.includes(nodeId)) {
        return state;
      }
      return {
        ...state,
        visitedDialogueNodes: {
          ...state.visitedDialogueNodes,
          [characterId]: [...existingNodes, nodeId],
        },
      };
    }
      
    case 'COMPLETE_AUDIO_CLUE':
      return { ...state, audioCluesCompleted: [...state.audioCluesCompleted, action.payload] };
      
    case 'PASS_JAZZ_CHECK':
      if (state.jazzKnowledgePassed.includes(action.payload)) {
        return state;
      }
      return { ...state, jazzKnowledgePassed: [...state.jazzKnowledgePassed, action.payload] };
      
    case 'FAIL_JAZZ_CHECK':
      if (state.jazzKnowledgeFailed.includes(action.payload)) {
        return state;
      }
      return { ...state, jazzKnowledgeFailed: [...state.jazzKnowledgeFailed, action.payload] };
    
    case 'PLACE_TIMELINE_EVENT':
      if (state.placedTimelineEvents.includes(action.payload)) {
        return state;
      }
      return { 
        ...state, 
        placedTimelineEvents: [...state.placedTimelineEvents, action.payload] 
      };
    
    case 'REMOVE_TIMELINE_EVENT':
      return { 
        ...state, 
        placedTimelineEvents: state.placedTimelineEvents.filter(id => id !== action.payload) 
      };
    
    case 'DISCOVER_TIMELINE_CONTRADICTION':
      if (state.timelineContradictionsFound.includes(action.payload)) {
        return state;
      }
      return { 
        ...state, 
        timelineContradictionsFound: [...state.timelineContradictionsFound, action.payload] 
      };
    
    // Evidence Board actions
    case 'ADD_BOARD_ITEM': {
      const { id, type, x, y, xPercent, yPercent } = action.payload;
      // Don't add if already on board
      if (state.evidenceBoard.items.find(item => item.id === id)) {
        return state;
      }
      return {
        ...state,
        evidenceBoard: {
          ...state.evidenceBoard,
          items: [...state.evidenceBoard.items, { id, type, x, y, xPercent, yPercent }],
        },
      };
    }
    
    case 'MOVE_BOARD_ITEM': {
      const { id, x, y, xPercent, yPercent } = action.payload;
      return {
        ...state,
        evidenceBoard: {
          ...state.evidenceBoard,
          items: state.evidenceBoard.items.map(item =>
            item.id === id ? { ...item, x, y, xPercent, yPercent } : item
          ),
        },
      };
    }
    
    case 'REMOVE_BOARD_ITEM': {
      const itemId = action.payload;
      return {
        ...state,
        evidenceBoard: {
          ...state.evidenceBoard,
          items: state.evidenceBoard.items.filter(item => item.id !== itemId),
          // Also remove any connections involving this item
          connections: state.evidenceBoard.connections.filter(
            conn => conn.from !== itemId && conn.to !== itemId
          ),
        },
      };
    }
    
    case 'ADD_CONNECTION': {
      const { id, from, to, color, label } = action.payload;
      // Don't add duplicate connections
      const exists = state.evidenceBoard.connections.find(
        conn => (conn.from === from && conn.to === to) || (conn.from === to && conn.to === from)
      );
      if (exists) return state;
      return {
        ...state,
        evidenceBoard: {
          ...state.evidenceBoard,
          connections: [...state.evidenceBoard.connections, { id, from, to, color, label }],
        },
      };
    }
    
    case 'UPDATE_CONNECTION': {
      const { id, color, label } = action.payload;
      return {
        ...state,
        evidenceBoard: {
          ...state.evidenceBoard,
          connections: state.evidenceBoard.connections.map(conn =>
            conn.id === id ? { ...conn, color: color ?? conn.color, label: label ?? conn.label } : conn
          ),
        },
      };
    }
    
    case 'REMOVE_CONNECTION': {
      return {
        ...state,
        evidenceBoard: {
          ...state.evidenceBoard,
          connections: state.evidenceBoard.connections.filter(conn => conn.id !== action.payload),
        },
      };
    }
    
    case 'USE_BOARD_HINT': {
      if (state.evidenceBoard.hintsUsed >= 3) return state; // Max 3 hints
      return {
        ...state,
        evidenceBoard: {
          ...state.evidenceBoard,
          hintsUsed: state.evidenceBoard.hintsUsed + 1,
        },
      };
    }
    
    case 'CLEAR_BOARD': {
      return {
        ...state,
        evidenceBoard: {
          items: [],
          connections: [],
          hintsUsed: state.evidenceBoard.hintsUsed, // Preserve hints used
        },
      };
    }
      
    case 'MAKE_ACCUSATION': {
      const isCorrect = action.payload === THE_KILLER;
      return {
        ...state,
        accusedSuspect: action.payload,
        wasCorrect: isCorrect,
        gameEnded: true,
        currentScreen: 'ending',
      };
    }
    
    case 'LOAD_GAME':
      return { ...action.payload };
    
    case 'RESTART_GAME':
      clearSave();
      return { ...initialState, startedAt: new Date().toISOString() };
    
    case 'START_NEW_GAME':
      clearSave();
      return { ...initialState, startedAt: new Date().toISOString(), currentScreen: 'difficultySelect' };
    
    case 'SET_DIFFICULTY':
      return { 
        ...state, 
        difficulty: action.payload, 
        currentScreen: 'prologue' 
      };
      
    default:
      return state;
  }
}

const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  
  // Helper to check if accusation is available
  const canAccuse = state.collectedClues.length >= REQUIRED_CLUES_FOR_ACCUSATION;
  
  // Check for existing save
  const hasSave = useCallback(() => {
    return loadSavedGame() !== null;
  }, []);
  
  // Load saved game
  const loadGame = useCallback(() => {
    const saved = loadSavedGame();
    if (saved) {
      dispatch({ type: 'LOAD_GAME', payload: saved });
      return true;
    }
    return false;
  }, []);
  
  // Manual save (auto-save happens on state change)
  const manualSave = useCallback(() => {
    return saveGame(state);
  }, [state]);
  
  // Get save info without loading
  const getSaveInfo = useCallback(() => {
    const saved = loadSavedGame();
    if (saved) {
      return {
        cluesFound: saved.collectedClues?.length || 0,
        locationsUnlocked: saved.unlockedLocations?.length || 0,
        lastSaved: saved.lastSavedAt,
        currentLocation: saved.currentLocation,
      };
    }
    return null;
  }, []);
  
  // Get full save data for recap screen
  const getFullSaveData = useCallback(() => {
    return loadSavedGame();
  }, []);
  
  // Auto-save whenever state changes (but not on title screen or ending)
  useEffect(() => {
    if (state.currentScreen !== 'title' && !state.gameEnded && state.startedAt) {
      saveGame(state);
    }
  }, [state]);
  
  return (
    <GameContext.Provider value={{ 
      state, 
      dispatch, 
      canAccuse, 
      THE_KILLER,
      hasSave,
      loadGame,
      manualSave,
      getSaveInfo,
      getFullSaveData,
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
}
