import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

// Define music tracks for different game states
const TRACKS = {
  title: '/audio/title-theme.mp3',
  prologue: '/audio/tension.mp3',
  location: '/audio/club-ambient.mp3',
  dialogue: '/audio/dialogue-underscore.mp3',
  evidence: '/audio/discovery.mp3',
  journal: '/audio/reflection.mp3',
  accusation: '/audio/tension.mp3',
  victory: '/audio/victory.mp3',
  defeat: '/audio/defeat.mp3',
};

const AudioContext = createContext(null);

export function AudioProvider({ children }) {
  const [isMuted, setIsMuted] = useState(true); // Start muted until user enables
  const [volume, setVolume] = useState(0.3);
  const [currentTrack, setCurrentTrack] = useState('title');
  const [isPlaying, setIsPlaying] = useState(false);
  
  const audioRef = useRef(null);
  const fadeIntervalRef = useRef(null);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.loop = true;
    audioRef.current.volume = 0;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
    };
  }, []);

  const fadeOut = useCallback((callback, duration = 1000) => {
    if (!audioRef.current) return callback?.();
    
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }
    
    const startVolume = audioRef.current.volume;
    if (startVolume === 0) return callback?.();
    
    const steps = 20;
    const stepTime = duration / steps;
    const volumeStep = startVolume / steps;
    
    let step = 0;
    fadeIntervalRef.current = setInterval(() => {
      step++;
      if (audioRef.current) {
        audioRef.current.volume = Math.max(0, audioRef.current.volume - volumeStep);
      }
      
      if (step >= steps) {
        clearInterval(fadeIntervalRef.current);
        callback?.();
      }
    }, stepTime);
  }, []);

  const fadeIn = useCallback((targetVol, duration = 1500) => {
    if (!audioRef.current) return;
    
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }
    
    const steps = 30;
    const stepTime = duration / steps;
    const volumeStep = targetVol / steps;
    
    audioRef.current.volume = 0;
    
    let step = 0;
    fadeIntervalRef.current = setInterval(() => {
      step++;
      if (audioRef.current) {
        audioRef.current.volume = Math.min(targetVol, audioRef.current.volume + volumeStep);
      }
      
      if (step >= steps) {
        clearInterval(fadeIntervalRef.current);
      }
    }, stepTime);
  }, []);

  // Handle track changes with crossfade
  const changeTrack = useCallback((trackName) => {
    if (trackName === currentTrack) return;
    
    setCurrentTrack(trackName);
    
    if (!audioRef.current || isMuted) return;
    
    // Fade out current track, then load new one
    fadeOut(() => {
      const trackUrl = TRACKS[trackName];
      if (trackUrl && audioRef.current) {
        audioRef.current.src = trackUrl;
        audioRef.current.play().then(() => {
          fadeIn(volume);
          setIsPlaying(true);
        }).catch(e => {
          // Silently fail if no audio files exist yet
          console.log('Audio play failed (this is normal if no audio files exist yet):', e.message);
        });
      }
    }, 800);
  }, [currentTrack, isMuted, volume, fadeOut, fadeIn]);

  // Handle mute toggle
  const toggleMute = useCallback(() => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    
    if (audioRef.current) {
      if (newMuted) {
        fadeOut(() => {
          if (audioRef.current) {
            audioRef.current.pause();
          }
          setIsPlaying(false);
        });
      } else {
        // Start playing current track
        const trackUrl = TRACKS[currentTrack];
        if (trackUrl) {
          audioRef.current.src = trackUrl;
          audioRef.current.play().then(() => {
            setIsPlaying(true);
            fadeIn(volume);
          }).catch(e => {
            console.log('Audio play failed:', e.message);
          });
        }
      }
    }
  }, [isMuted, currentTrack, volume, fadeOut, fadeIn]);

  // Handle volume change
  const changeVolume = useCallback((newVolume) => {
    setVolume(newVolume);
    if (audioRef.current && !isMuted) {
      audioRef.current.volume = newVolume;
    }
  }, [isMuted]);

  return (
    <AudioContext.Provider value={{ 
      isMuted, 
      volume, 
      currentTrack,
      isPlaying,
      toggleMute, 
      changeVolume, 
      changeTrack 
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

// Compact audio control component for top corner
export function AudioControls() {
  const { isMuted, toggleMute } = useAudio();
  
  return (
    <button
      onClick={toggleMute}
      className={`fixed top-16 right-6 z-50 px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 shadow-lg ${
        isMuted 
          ? 'bg-black/70 text-light border border-white/20 hover:bg-black/80' 
          : 'bg-jazz-blue/90 text-white hover:bg-jazz-blue'
      }`}
      title={isMuted ? 'Enable Music' : 'Mute Music'}
    >
      {/* Music Icon */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="18" 
        height="18" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        {isMuted ? (
          <>
            <circle cx="5.5" cy="17.5" r="2.5" />
            <circle cx="17.5" cy="15.5" r="2.5" />
            <path d="M8 17V5l12-2v12" />
            <line x1="1" y1="1" x2="23" y2="23" />
          </>
        ) : (
          <>
            <circle cx="5.5" cy="17.5" r="2.5" />
            <circle cx="17.5" cy="15.5" r="2.5" />
            <path d="M8 17V5l12-2v12" />
          </>
        )}
      </svg>
      
      <span className="text-sm font-medium tracking-wide">
        {isMuted ? 'MUSIC' : 'MUSIC'}
      </span>
      
      {/* Playing indicator */}
      {!isMuted && (
        <span className="flex items-center gap-0.5">
          <span className="w-0.5 h-2 bg-current animate-pulse" style={{ animationDelay: '0ms' }} />
          <span className="w-0.5 h-3 bg-current animate-pulse" style={{ animationDelay: '100ms' }} />
          <span className="w-0.5 h-2 bg-current animate-pulse" style={{ animationDelay: '200ms' }} />
        </span>
      )}
    </button>
  );
}
