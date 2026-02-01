import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import {
  generateSpeechUrl,
  getVoiceForCharacter,
  speakerToCharacterId,
  checkApiStatus
} from '../services/elevenlabs';

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
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(null);

  const audioRef = useRef(null);
  const currentUrlRef = useRef(null);

  // Check ElevenLabs API status on mount
  useEffect(() => {
    checkApiStatus().then(status => {
      if (!status.valid) {
        console.warn('ElevenLabs API not configured:', status.error);
        setIsSupported(false);
        setError(status.error);
      }
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

  // Stop current audio and cleanup
  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    // Revoke the object URL to free memory
    if (currentUrlRef.current) {
      URL.revokeObjectURL(currentUrlRef.current);
      currentUrlRef.current = null;
    }
    setIsPlaying(false);
    setIsLoading(false);
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

  // Speak text with character voice using ElevenLabs
  const speak = useCallback(async (text, characterId = 'narrator', style = 'narration', onComplete = null) => {
    // Stop any current audio
    stop();

    if (!enabled || !isSupported || !text || text.trim().length === 0) {
      if (onComplete) {
        setTimeout(onComplete, 100);
      }
      return;
    }

    setError(null);
    setIsLoading(true);

    // Handle character ID extraction from speaker names
    const resolvedCharacterId = characterId.includes(' ')
      ? speakerToCharacterId(characterId)
      : characterId;

    try {
      // Get the voice ID for this character
      const voiceId = getVoiceForCharacter(resolvedCharacterId);

      // Generate audio from ElevenLabs
      const audioUrl = await generateSpeechUrl(text, voiceId, style);
      currentUrlRef.current = audioUrl;

      // Create and play audio
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.oncanplaythrough = () => {
        setIsLoading(false);
        setIsPlaying(true);
        audio.play().catch(err => {
          console.error('Audio playback error:', err);
          setError(err.message);
          setIsPlaying(false);
          if (onComplete) onComplete();
        });
      };

      audio.onended = () => {
        setIsPlaying(false);
        // Cleanup
        if (currentUrlRef.current) {
          URL.revokeObjectURL(currentUrlRef.current);
          currentUrlRef.current = null;
        }
        audioRef.current = null;
        if (onComplete) onComplete();
      };

      audio.onerror = (e) => {
        console.error('Audio error:', e);
        setError('Audio playback failed');
        setIsLoading(false);
        setIsPlaying(false);
        if (onComplete) onComplete();
      };

    } catch (err) {
      console.error('ElevenLabs speech generation error:', err);
      setError(err.message);
      setIsLoading(false);
      setIsPlaying(false);
      if (onComplete) onComplete();
    }
  }, [enabled, isSupported, stop]);

  // Preload is a no-op for now (could implement caching later)
  const preload = useCallback(() => {
    // Could implement preloading common phrases here
  }, []);

  // Clear any cached audio
  const clearCache = useCallback(() => {
    stop();
  }, [stop]);

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
    isLoading,
    isPlaying,
    error,
    speak,
    stop,
    preload,
    clearCache,
    isSupported,
    voicesReady: isSupported, // ElevenLabs is always "ready" if API is configured
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
