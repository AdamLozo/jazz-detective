import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import {
  generateSpeechUrl,
  getVoiceForCharacter,
  speakerToCharacterId,
  checkApiStatus
} from '../services/elevenlabs';
import {
  loadVoices as loadBrowserVoices,
  speak as browserSpeak,
  stopSpeech as stopBrowserSpeech,
  isSpeechSupported as isBrowserSpeechSupported
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

  // Whether ElevenLabs is configured and usable. When it isn't, we fall back
  // to the browser's built-in Web Speech API so voices still work.
  const [useElevenLabs, setUseElevenLabs] = useState(false);
  const browserSupported = isBrowserSpeechSupported();

  // Voices are "supported" if EITHER backend can produce audio.
  const [isSupported, setIsSupported] = useState(browserSupported);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(null);

  const audioRef = useRef(null);
  const currentUrlRef = useRef(null);
  const usingBrowserRef = useRef(false);

  // Preload browser voices (some browsers load them asynchronously).
  useEffect(() => {
    if (browserSupported) {
      loadBrowserVoices();
    }
  }, [browserSupported]);

  // Check ElevenLabs API status on mount to decide which backend to use.
  useEffect(() => {
    checkApiStatus().then(status => {
      if (status.valid) {
        setUseElevenLabs(true);
        setIsSupported(true);
      } else {
        console.warn(
          `ElevenLabs unavailable (${status.error}). Falling back to browser voices.`
        );
        setUseElevenLabs(false);
        setIsSupported(browserSupported);
      }
    });
  }, [browserSupported]);

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
    // Cancel any browser speech in progress
    if (usingBrowserRef.current) {
      stopBrowserSpeech();
      usingBrowserRef.current = false;
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

  // Speak using the browser's Web Speech API (free fallback).
  const speakWithBrowser = useCallback((text, resolvedCharacterId, onComplete) => {
    if (!browserSupported) {
      setIsLoading(false);
      if (onComplete) onComplete();
      return;
    }

    usingBrowserRef.current = true;
    setIsLoading(false);
    setIsPlaying(true);

    const finish = () => {
      usingBrowserRef.current = false;
      setIsPlaying(false);
      if (onComplete) onComplete();
    };

    browserSpeak(
      text,
      resolvedCharacterId,
      finish,
      (err) => {
        console.error('Browser speech error:', err);
        setError(String(err));
        finish();
      }
    );
  }, [browserSupported]);

  // Speak text with character voice. Prefers ElevenLabs, falls back to the
  // browser's Web Speech API if ElevenLabs is unconfigured or fails.
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

    // If ElevenLabs isn't available, go straight to the browser voice.
    if (!useElevenLabs) {
      speakWithBrowser(text, resolvedCharacterId, onComplete);
      return;
    }

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
      // ElevenLabs failed (quota, deleted voice, network, bad key, etc.).
      // Fall back to the browser voice so the game still speaks.
      console.error('ElevenLabs speech generation error, falling back to browser voice:', err);
      setError(err.message);
      speakWithBrowser(text, resolvedCharacterId, onComplete);
    }
  }, [enabled, isSupported, useElevenLabs, stop, speakWithBrowser]);

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
    usingFallback: !useElevenLabs && browserSupported,
    voicesReady: isSupported,
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
