/**
 * AudioSettingsPanel - User controls for audio settings
 * 
 * Features:
 * - Master volume
 * - Individual channel volumes (music, ambience, SFX)
 * - Enable/disable toggles
 * - Mute button
 * - Compact and expanded modes
 */
import { useState, useCallback } from 'react';
import { useAudio } from '../context/AudioContextEnhanced';

/**
 * Compact audio toggle button for top corner
 */
export function AudioToggleButton({ className = '' }) {
  const { isMuted, toggleMute, isInitialized, initAudio } = useAudio();
  
  const handleClick = async () => {
    if (!isInitialized) {
      await initAudio();
    }
    toggleMute();
  };
  
  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 shadow-lg ${
        isMuted 
          ? 'bg-black/70 text-white/80 border border-white/20 hover:bg-black/80' 
          : 'bg-jazz-blue/90 text-white hover:bg-jazz-blue'
      } ${className}`}
      title={isMuted ? 'Enable Audio' : 'Mute Audio'}
      aria-label={isMuted ? 'Enable Audio' : 'Mute Audio'}
    >
      {/* Speaker Icon */}
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
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </>
        ) : (
          <>
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </>
        )}
      </svg>
      
      <span className="text-sm font-medium tracking-wide">
        {isMuted ? 'AUDIO' : 'AUDIO'}
      </span>
      
      {/* Playing indicator */}
      {!isMuted && (
        <span className="flex items-center gap-0.5 ml-1">
          <span className="w-0.5 h-2 bg-current animate-pulse" style={{ animationDelay: '0ms' }} />
          <span className="w-0.5 h-3 bg-current animate-pulse" style={{ animationDelay: '150ms' }} />
          <span className="w-0.5 h-2 bg-current animate-pulse" style={{ animationDelay: '300ms' }} />
        </span>
      )}
    </button>
  );
}

/**
 * Volume slider component
 */
function VolumeSlider({ 
  label, 
  value, 
  onChange, 
  enabled = true,
  onToggle,
  icon,
}) {
  return (
    <div className="flex items-center gap-3">
      {/* Toggle button */}
      {onToggle && (
        <button
          onClick={onToggle}
          className={`w-8 h-8 rounded flex items-center justify-center transition-colors ${
            enabled 
              ? 'bg-jazz-blue/30 text-jazz-amber' 
              : 'bg-black/30 text-white/30'
          }`}
          aria-label={`Toggle ${label}`}
        >
          {icon}
        </button>
      )}
      
      {/* Label */}
      <span className={`w-20 text-sm ${enabled ? 'text-white/80' : 'text-white/40'}`}>
        {label}
      </span>
      
      {/* Slider */}
      <input
        type="range"
        min="0"
        max="100"
        value={Math.round(value * 100)}
        onChange={(e) => onChange(parseInt(e.target.value) / 100)}
        disabled={!enabled}
        className={`flex-1 h-2 rounded-lg appearance-none cursor-pointer ${
          enabled 
            ? 'bg-white/20 accent-jazz-amber' 
            : 'bg-white/10 accent-white/30'
        }`}
        style={{
          background: enabled
            ? `linear-gradient(to right, rgb(212, 165, 116) 0%, rgb(212, 165, 116) ${value * 100}%, rgba(255,255,255,0.2) ${value * 100}%, rgba(255,255,255,0.2) 100%)`
            : `linear-gradient(to right, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.3) ${value * 100}%, rgba(255,255,255,0.1) ${value * 100}%, rgba(255,255,255,0.1) 100%)`,
        }}
      />
      
      {/* Value display */}
      <span className={`w-10 text-right text-sm ${enabled ? 'text-white/60' : 'text-white/30'}`}>
        {Math.round(value * 100)}%
      </span>
    </div>
  );
}

/**
 * Full audio settings panel
 */
export function AudioSettingsPanel({ className = '', onClose }) {
  const { 
    settings, 
    updateSettings, 
    isMuted, 
    toggleMute,
    playSFX,
    TRIGGERS,
  } = useAudio();
  
  // Handle volume changes with preview sound
  const handleVolumeChange = useCallback((key, value) => {
    updateSettings({ [key]: value });
    
    // Play preview sound on SFX volume change
    if (key === 'sfxVolume' && value > 0) {
      playSFX(TRIGGERS.MENU_SELECT);
    }
  }, [updateSettings, playSFX, TRIGGERS]);
  
  // Handle toggle changes
  const handleToggle = useCallback((key) => {
    updateSettings({ [key]: !settings[key] });
  }, [updateSettings, settings]);

  return (
    <div className={`bg-black/90 backdrop-blur-sm rounded-lg border border-white/20 p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-display text-jazz-amber tracking-wide">AUDIO SETTINGS</h3>
        
        {/* Close button if provided */}
        {onClose && (
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
      
      {/* Master mute */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
        <span className="text-white/80">Master Audio</span>
        <button
          onClick={toggleMute}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            isMuted 
              ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
              : 'bg-green-500/20 text-green-400 border border-green-500/30'
          }`}
        >
          {isMuted ? 'MUTED' : 'ON'}
        </button>
      </div>
      
      {/* Volume sliders */}
      <div className="space-y-4">
        {/* Master Volume */}
        <VolumeSlider
          label="Master"
          value={settings.masterVolume}
          onChange={(v) => handleVolumeChange('masterVolume', v)}
          enabled={!isMuted}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          }
        />
        
        {/* Music Volume */}
        <VolumeSlider
          label="Music"
          value={settings.musicVolume}
          onChange={(v) => handleVolumeChange('musicVolume', v)}
          enabled={!isMuted && settings.musicEnabled}
          onToggle={() => handleToggle('musicEnabled')}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="5.5" cy="17.5" r="2.5" />
              <circle cx="17.5" cy="15.5" r="2.5" />
              <path d="M8 17V5l12-2v12" />
            </svg>
          }
        />
        
        {/* Ambience Volume */}
        <VolumeSlider
          label="Ambience"
          value={settings.ambienceVolume}
          onChange={(v) => handleVolumeChange('ambienceVolume', v)}
          enabled={!isMuted && settings.ambienceEnabled}
          onToggle={() => handleToggle('ambienceEnabled')}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          }
        />
        
        {/* SFX Volume */}
        <VolumeSlider
          label="Effects"
          value={settings.sfxVolume}
          onChange={(v) => handleVolumeChange('sfxVolume', v)}
          enabled={!isMuted && settings.sfxEnabled}
          onToggle={() => handleToggle('sfxEnabled')}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          }
        />
      </div>
      
      {/* Info text */}
      <p className="mt-6 text-xs text-white/40 text-center">
        Audio plays royalty-free jazz music and ambient sounds.
        <br />
        Click "AUDIO" button to toggle sound.
      </p>
    </div>
  );
}

/**
 * Expandable audio button with dropdown settings
 */
export function AudioControlsExpanded({ className = '' }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className={`relative ${className}`}>
      <AudioToggleButton 
        className="relative z-10"
      />
      
      {/* Expand button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-2 top-0 bottom-0 w-6 flex items-center justify-center 
                   bg-black/50 hover:bg-black/70 border-l border-white/20 rounded-r-lg
                   text-white/60 hover:text-white transition-colors"
        aria-label={isExpanded ? 'Hide settings' : 'Show settings'}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="12" 
          height="12" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      
      {/* Dropdown panel */}
      {isExpanded && (
        <div className="absolute top-full right-0 mt-2 w-80 z-50">
          <AudioSettingsPanel onClose={() => setIsExpanded(false)} />
        </div>
      )}
    </div>
  );
}

export default AudioToggleButton;
