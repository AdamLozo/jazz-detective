/**
 * Enhanced Audio Context with full mixing and atmosphere support
 */
import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import audioManager from '../audio/AudioManager';
import { AUDIO_SOURCES, LOCATION_AUDIO, SCREEN_AUDIO, AUDIO_TRIGGERS } from '../audio/audioConfig';

const AudioContext = createContext(null);

// Fallback placeholder sounds (Web Audio API generated)
const PLACEHOLDER_SOUNDS = {
  // Will generate simple tones as fallbacks if audio files don't exist
  enabled: true,
};

export function AudioProvider({ children }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Start muted
  const [settings, setSettings] = useState({
    masterVolume: 0.8,
    musicVolume: 0.5,
    ambienceVolume: 0.4,
    sfxVolume: 0.7,
    musicEnabled: true,
    ambienceEnabled: true,
    sfxEnabled: true,
  });
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentScreen, setCurrentScreen] = useState('title');
  
  // Refs to track audio state
  const currentMusicTrack = useRef(null);
  const oscillatorRef = useRef(null);
  const audioContextRef = useRef(null);

  /**
   * Initialize audio system (call after user interaction)
   */
  const initAudio = useCallback(async () => {
    if (isInitialized) return true;
    
    const success = await audioManager.init();
    if (success) {
      setIsInitialized(true);
      // Create a simple audio context for placeholder sounds
      audioContextRef.current = audioManager.audioContext;
    }
    return success;
  }, [isInitialized]);

  /**
   * Toggle mute state
   */
  const toggleMute = useCallback(async () => {
    if (!isInitialized) {
      await initAudio();
    }
    
    const newMuted = audioManager.toggleMute();
    setIsMuted(newMuted);
    
    // If unmuting, resume any paused audio
    if (!newMuted) {
      await audioManager.resume();
    }
    
    return newMuted;
  }, [isInitialized, initAudio]);

  /**
   * Play placeholder tone (when audio files don't exist)
   */
  const playPlaceholderTone = useCallback((frequency = 440, duration = 0.15, type = 'sine') => {
    if (!audioContextRef.current || isMuted || !settings.sfxEnabled) return;
    
    try {
      const ctx = audioContextRef.current;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
      
      gainNode.gain.setValueAtTime(0.1 * settings.sfxVolume * settings.masterVolume, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch (e) {
      // Silently fail
    }
  }, [isMuted, settings]);

  /**
   * Play a sound effect
   */
  const playSFX = useCallback(async (triggerName, options = {}) => {
    if (isMuted || !settings.sfxEnabled) return;
    
    if (!isInitialized) {
      await initAudio();
    }
    
    // Map trigger to SFX config
    const sfxConfig = getSFXConfig(triggerName);
    if (!sfxConfig) {
      // Play placeholder based on trigger type
      playPlaceholderByTrigger(triggerName, playPlaceholderTone);
      return;
    }
    
    try {
      if (sfxConfig.variations) {
        await audioManager.playSFXVariation(sfxConfig.url, sfxConfig.variations, {
          volume: sfxConfig.volume * (options.volume || 1.0),
        });
      } else {
        await audioManager.playSFX(sfxConfig.url, {
          volume: sfxConfig.volume * (options.volume || 1.0),
        });
      }
    } catch (e) {
      // Fallback to placeholder
      playPlaceholderByTrigger(triggerName, playPlaceholderTone);
    }
  }, [isMuted, settings.sfxEnabled, isInitialized, initAudio, playPlaceholderTone]);

  /**
   * Change music based on screen or location
   */
  const changeMusic = useCallback(async (trackName, options = {}) => {
    if (isMuted || !settings.musicEnabled) return;
    
    if (!isInitialized) {
      await initAudio();
    }
    
    if (currentMusicTrack.current === trackName) return;
    
    const musicConfig = AUDIO_SOURCES.music[trackName];
    if (!musicConfig) {
      console.warn(`[Audio] Unknown music track: ${trackName}`);
      return;
    }
    
    currentMusicTrack.current = trackName;
    
    try {
      await audioManager.playMusic(musicConfig.url, {
        loop: musicConfig.loop,
        fadeInDuration: musicConfig.fadeIn || 2000,
        crossfadeDuration: options.crossfade || 2000,
        volume: musicConfig.volume,
      });
    } catch (e) {
      console.warn(`[Audio] Failed to play music: ${trackName}`, e.message);
    }
  }, [isMuted, settings.musicEnabled, isInitialized, initAudio]);

  /**
   * Change ambience based on location
   */
  const changeAmbience = useCallback(async (locationKey) => {
    if (isMuted || !settings.ambienceEnabled) return;
    
    if (!isInitialized) {
      await initAudio();
    }
    
    const ambienceConfig = AUDIO_SOURCES.ambience[locationKey];
    if (!ambienceConfig) {
      await audioManager.stopAllAmbience();
      return;
    }
    
    try {
      await audioManager.playAmbience(ambienceConfig.layers);
    } catch (e) {
      console.warn(`[Audio] Failed to play ambience: ${locationKey}`, e.message);
    }
  }, [isMuted, settings.ambienceEnabled, isInitialized, initAudio]);

  /**
   * Update audio when location changes
   */
  const setLocation = useCallback((locationKey) => {
    setCurrentLocation(locationKey);
    
    const locationAudio = LOCATION_AUDIO[locationKey];
    if (locationAudio) {
      if (locationAudio.music) {
        changeMusic(locationAudio.music);
      }
      if (locationAudio.ambience) {
        changeAmbience(locationAudio.ambience);
      }
    }
  }, [changeMusic, changeAmbience]);

  /**
   * Update audio when screen changes
   */
  const setScreen = useCallback((screenKey) => {
    setCurrentScreen(screenKey);
    
    const screenAudio = SCREEN_AUDIO[screenKey];
    if (screenAudio) {
      if (screenAudio.music) {
        changeMusic(screenAudio.music);
      }
      if (screenAudio.ambience) {
        changeAmbience(screenAudio.ambience);
      } else {
        audioManager.stopAllAmbience();
      }
    }
  }, [changeMusic, changeAmbience]);

  /**
   * Update volume settings
   */
  const updateSettings = useCallback((newSettings) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      
      // Apply to audio manager
      if (newSettings.masterVolume !== undefined) {
        audioManager.setMasterVolume(newSettings.masterVolume);
      }
      if (newSettings.musicVolume !== undefined) {
        audioManager.setMusicVolume(newSettings.musicVolume);
      }
      if (newSettings.ambienceVolume !== undefined) {
        audioManager.setAmbienceVolume(newSettings.ambienceVolume);
      }
      if (newSettings.sfxVolume !== undefined) {
        audioManager.setSFXVolume(newSettings.sfxVolume);
      }
      
      return updated;
    });
  }, []);

  /**
   * Stop all audio
   */
  const stopAll = useCallback(() => {
    audioManager.stopAll();
    currentMusicTrack.current = null;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      audioManager.destroy();
    };
  }, []);

  return (
    <AudioContext.Provider value={{
      // State
      isInitialized,
      isMuted,
      settings,
      currentLocation,
      currentScreen,
      
      // Actions
      initAudio,
      toggleMute,
      playSFX,
      changeMusic,
      changeAmbience,
      setLocation,
      setScreen,
      updateSettings,
      stopAll,
      
      // Triggers enum for easy access
      TRIGGERS: AUDIO_TRIGGERS,
    }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
}

// Helper: Get SFX config from trigger name
function getSFXConfig(triggerName) {
  const { sfx } = AUDIO_SOURCES;
  
  // Search through SFX categories
  for (const category of Object.values(sfx)) {
    if (category[triggerName]) {
      return category[triggerName];
    }
  }
  
  // Direct mapping from AUDIO_TRIGGERS
  const triggerMap = {
    [AUDIO_TRIGGERS.CLUE_FOUND]: sfx.investigation?.clueFound,
    [AUDIO_TRIGGERS.CLUE_INSPECT]: sfx.investigation?.clueInspect,
    [AUDIO_TRIGGERS.DIALOGUE_ADVANCE]: sfx.ui?.dialogueAdvance,
    [AUDIO_TRIGGERS.REVELATION]: sfx.stings?.revelation,
    [AUDIO_TRIGGERS.SUSPICION]: sfx.stings?.suspicion,
    [AUDIO_TRIGGERS.CAUGHT_LYING]: sfx.stings?.caught,
    [AUDIO_TRIGGERS.CONFESSION]: sfx.stings?.confession,
    [AUDIO_TRIGGERS.WRONG_ACCUSATION]: sfx.stings?.wrongAccusation,
    [AUDIO_TRIGGERS.JAZZ_TRIVIA_CORRECT]: sfx.stings?.jazzTrivia,
    [AUDIO_TRIGGERS.JAZZ_TRIVIA_WRONG]: sfx.stings?.jazzTriviaWrong,
    [AUDIO_TRIGGERS.TIMELINE_PLACE]: sfx.timeline?.cardPlace,
    [AUDIO_TRIGGERS.TIMELINE_PICKUP]: sfx.timeline?.cardPickup,
    [AUDIO_TRIGGERS.TIMELINE_CONTRADICTION]: sfx.timeline?.contradiction,
    [AUDIO_TRIGGERS.TIMELINE_VERIFIED]: sfx.timeline?.verified,
    [AUDIO_TRIGGERS.MENU_HOVER]: sfx.ui?.menuHover,
    [AUDIO_TRIGGERS.MENU_SELECT]: sfx.ui?.menuSelect,
    [AUDIO_TRIGGERS.PAGE_FLIP]: sfx.ui?.pageFlip,
  };
  
  return triggerMap[triggerName];
}

// Helper: Play placeholder tones based on trigger type
function playPlaceholderByTrigger(triggerName, playTone) {
  const toneMap = {
    [AUDIO_TRIGGERS.CLUE_FOUND]: () => playTone(880, 0.2, 'sine'), // High A
    [AUDIO_TRIGGERS.REVELATION]: () => {
      playTone(440, 0.1, 'triangle');
      setTimeout(() => playTone(554, 0.15, 'triangle'), 100);
      setTimeout(() => playTone(659, 0.2, 'triangle'), 200);
    },
    [AUDIO_TRIGGERS.SUSPICION]: () => {
      playTone(220, 0.3, 'sawtooth');
      setTimeout(() => playTone(207, 0.3, 'sawtooth'), 150);
    },
    [AUDIO_TRIGGERS.CONFESSION]: () => {
      playTone(440, 0.15, 'sine');
      setTimeout(() => playTone(349, 0.2, 'sine'), 150);
      setTimeout(() => playTone(293, 0.3, 'sine'), 350);
    },
    [AUDIO_TRIGGERS.WRONG_ACCUSATION]: () => {
      playTone(349, 0.15, 'triangle');
      setTimeout(() => playTone(311, 0.15, 'triangle'), 100);
      setTimeout(() => playTone(277, 0.25, 'triangle'), 200);
    },
    [AUDIO_TRIGGERS.JAZZ_TRIVIA_CORRECT]: () => {
      playTone(523, 0.1, 'sine');
      setTimeout(() => playTone(659, 0.15, 'sine'), 80);
    },
    [AUDIO_TRIGGERS.JAZZ_TRIVIA_WRONG]: () => playTone(155, 0.3, 'square'),
    [AUDIO_TRIGGERS.MENU_HOVER]: () => playTone(660, 0.05, 'sine'),
    [AUDIO_TRIGGERS.MENU_SELECT]: () => playTone(880, 0.1, 'sine'),
    [AUDIO_TRIGGERS.DIALOGUE_ADVANCE]: () => playTone(440, 0.05, 'sine'),
    [AUDIO_TRIGGERS.TIMELINE_PLACE]: () => playTone(523, 0.08, 'triangle'),
    [AUDIO_TRIGGERS.TIMELINE_CONTRADICTION]: () => {
      playTone(233, 0.2, 'sawtooth');
      setTimeout(() => playTone(220, 0.25, 'sawtooth'), 100);
    },
    [AUDIO_TRIGGERS.TIMELINE_VERIFIED]: () => {
      playTone(523, 0.1, 'sine');
      setTimeout(() => playTone(659, 0.1, 'sine'), 100);
      setTimeout(() => playTone(784, 0.15, 'sine'), 200);
    },
  };
  
  const playFn = toneMap[triggerName];
  if (playFn) playFn();
}

export default AudioContext;
