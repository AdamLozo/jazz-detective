import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { 
  speak as speakText, 
  stopSpeech, 
  loadVoices, 
  isSpeechSupported,
  speakerToCharacterId 
} from '../services/speechService';

const VoiceContext = createContext(null);

const VOICE_STORAGE_KEY = 'jazz-detective-voice-enabled';

export function VoiceProvider({ children }) {
  // Load preference from localStorage
  const [enabled, setEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem(VOICE_STORAGE_KEY);
      return saved !== null ? saved === 'true' : true; // Default to enabled
    } catch {
      return true;
    }
  });
  
  const [isSupported, setIsSupported] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [voicesReady, setVoicesReady] = useState(false);
  const [error, setError] = useState(null);
  
  const currentUtteranceRef = useRef(null);
  
  // Check support and load voices on mount
  useEffect(() => {
    if (!isSpeechSupported()) {
      setIsSupported(false);
      setError('Speech synthesis not supported in this browser');
      return;
    }
    
    // Load voices
    loadVoices().then(() => {
      setVoicesReady(true);
    });
  }, []);
  
  // Save preference to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(VOICE_STORAGE_KEY, String(enabled));
    } catch {
      // Ignore storage errors
    }
  }, [enabled]);
  
  // Stop current speech
  const stop = useCallback(() => {
    stopSpeech();
    currentUtteranceRef.current = null;
    setIsPlaying(false);
  }, []);
  
  // Toggle voice on/off
  const toggle = useCallback(() => {
    setEnabled(prev => {
      if (prev) {
        stop(); // Stop audio when disabling
      }
      return !prev;
    });
  }, [stop]);
  
  // Speak text with character voice
  const speak = useCallback((text, characterId = 'narrator', style = 'narration', onComplete = null) => {
    // Stop any current speech
    stop();
    
    if (!enabled || !isSupported || !text || text.trim().length === 0) {
      if (onComplete) {
        setTimeout(onComplete, 100);
      }
      return;
    }
    
    setError(null);
    setIsPlaying(true);
    
    // Handle character ID extraction from speaker names
    const resolvedCharacterId = characterId.includes(' ') 
      ? speakerToCharacterId(characterId) 
      : characterId;
    
    currentUtteranceRef.current = speakText(
      text,
      resolvedCharacterId,
      () => {
        // onEnd
        setIsPlaying(false);
        currentUtteranceRef.current = null;
        if (onComplete) onComplete();
      },
      (err) => {
        // onError
        setError(err);
        setIsPlaying(false);
        currentUtteranceRef.current = null;
        if (onComplete) onComplete();
      }
    );
  }, [enabled, isSupported, stop]);
  
  // Preload is a no-op for Web Speech API (no network requests needed)
  const preload = useCallback(() => {
    // Web Speech API doesn't need preloading
  }, []);
  
  // Clear cache is a no-op for Web Speech API
  const clearCache = useCallback(() => {
    // No cache to clear
  }, []);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);
  
  const value = {
    enabled,
    setEnabled,
    toggle,
    isLoading: false, // Web Speech API doesn't have loading state
    isPlaying,
    error,
    speak,
    stop,
    preload,
    clearCache,
    isSupported,
    voicesReady,
  };
  
  return (
    <VoiceContext.Provider value={value}>
      {children}
    </VoiceContext.Provider>
  );
}

export function useVoiceContext() {
  const context = useContext(VoiceContext);
  if (!context) {
    throw new Error('useVoiceContext must be used within VoiceProvider');
  }
  return context;
}
