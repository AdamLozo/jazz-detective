/**
 * AudioManager - Advanced Web Audio API manager for Jazz Detective
 * 
 * Features:
 * - Layered audio mixing (music, ambience, sfx)
 * - Crossfading between tracks
 * - Multi-layer ambience per location
 * - Sound effect pooling
 * - Dynamic volume control
 */

class AudioManager {
  constructor() {
    this.audioContext = null;
    this.masterGain = null;
    this.musicGain = null;
    this.ambienceGain = null;
    this.sfxGain = null;
    
    // Audio sources
    this.currentMusic = null;
    this.nextMusic = null;
    this.ambienceLayers = new Map();
    this.sfxPool = new Map();
    
    // State
    this.isInitialized = false;
    this.isMuted = false;
    this.settings = {
      masterVolume: 0.8,
      musicVolume: 0.5,
      ambienceVolume: 0.4,
      sfxVolume: 0.7,
    };
    
    // Audio buffer cache
    this.bufferCache = new Map();
    this.loadingPromises = new Map();
    
    // Crossfade state
    this.crossfadeInterval = null;
  }

  /**
   * Initialize the audio context (must be called after user interaction)
   */
  async init() {
    if (this.isInitialized) return true;
    
    try {
      // Create audio context
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Create gain nodes for mixing
      this.masterGain = this.audioContext.createGain();
      this.musicGain = this.audioContext.createGain();
      this.ambienceGain = this.audioContext.createGain();
      this.sfxGain = this.audioContext.createGain();
      
      // Connect gain nodes to master
      this.musicGain.connect(this.masterGain);
      this.ambienceGain.connect(this.masterGain);
      this.sfxGain.connect(this.masterGain);
      this.masterGain.connect(this.audioContext.destination);
      
      // Set initial volumes
      this.applyVolumes();
      
      this.isInitialized = true;
      console.log('[AudioManager] Initialized successfully');
      return true;
    } catch (error) {
      console.error('[AudioManager] Failed to initialize:', error);
      return false;
    }
  }

  /**
   * Resume audio context if suspended (browser autoplay policy)
   */
  async resume() {
    if (this.audioContext?.state === 'suspended') {
      await this.audioContext.resume();
    }
  }

  /**
   * Apply volume settings to gain nodes
   */
  applyVolumes() {
    if (!this.isInitialized) return;
    
    const master = this.isMuted ? 0 : this.settings.masterVolume;
    this.masterGain.gain.setValueAtTime(master, this.audioContext.currentTime);
    this.musicGain.gain.setValueAtTime(this.settings.musicVolume, this.audioContext.currentTime);
    this.ambienceGain.gain.setValueAtTime(this.settings.ambienceVolume, this.audioContext.currentTime);
    this.sfxGain.gain.setValueAtTime(this.settings.sfxVolume, this.audioContext.currentTime);
  }

  /**
   * Load an audio file and return its buffer
   */
  async loadAudio(url) {
    // Return cached buffer if available
    if (this.bufferCache.has(url)) {
      return this.bufferCache.get(url);
    }
    
    // Return existing loading promise if in progress
    if (this.loadingPromises.has(url)) {
      return this.loadingPromises.get(url);
    }
    
    // Start loading
    const loadPromise = (async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
        this.bufferCache.set(url, audioBuffer);
        this.loadingPromises.delete(url);
        return audioBuffer;
      } catch (error) {
        this.loadingPromises.delete(url);
        console.warn(`[AudioManager] Failed to load audio: ${url}`, error.message);
        return null;
      }
    })();
    
    this.loadingPromises.set(url, loadPromise);
    return loadPromise;
  }

  /**
   * Play music with optional crossfade
   */
  async playMusic(url, options = {}) {
    if (!this.isInitialized) return;
    
    const {
      loop = true,
      fadeInDuration = 2000,
      crossfadeDuration = 2000,
      volume = 1.0,
    } = options;
    
    const buffer = await this.loadAudio(url);
    if (!buffer) return;
    
    await this.resume();
    
    // If music is already playing, crossfade
    if (this.currentMusic) {
      await this.crossfadeMusic(buffer, loop, crossfadeDuration, volume);
    } else {
      // Start fresh
      this.currentMusic = this.createMusicSource(buffer, loop, volume);
      this.currentMusic.source.start(0);
      this.fadeGain(this.currentMusic.gain, 0, volume, fadeInDuration);
    }
  }

  /**
   * Create a music source with its own gain node
   */
  createMusicSource(buffer, loop, volume) {
    const source = this.audioContext.createBufferSource();
    const gain = this.audioContext.createGain();
    
    source.buffer = buffer;
    source.loop = loop;
    gain.gain.setValueAtTime(0, this.audioContext.currentTime);
    
    source.connect(gain);
    gain.connect(this.musicGain);
    
    return { source, gain, volume };
  }

  /**
   * Crossfade between current and new music
   */
  async crossfadeMusic(buffer, loop, duration, targetVolume) {
    const oldMusic = this.currentMusic;
    const newMusic = this.createMusicSource(buffer, loop, targetVolume);
    
    this.currentMusic = newMusic;
    newMusic.source.start(0);
    
    // Fade out old, fade in new simultaneously
    if (oldMusic) {
      this.fadeGain(oldMusic.gain, oldMusic.gain.gain.value, 0, duration);
      setTimeout(() => {
        try {
          oldMusic.source.stop();
          oldMusic.source.disconnect();
          oldMusic.gain.disconnect();
        } catch (e) {
          // Already stopped
        }
      }, duration + 100);
    }
    
    this.fadeGain(newMusic.gain, 0, targetVolume, duration);
  }

  /**
   * Stop music with fade out
   */
  async stopMusic(fadeOutDuration = 1500) {
    if (!this.currentMusic) return;
    
    const music = this.currentMusic;
    this.currentMusic = null;
    
    this.fadeGain(music.gain, music.gain.gain.value, 0, fadeOutDuration);
    
    setTimeout(() => {
      try {
        music.source.stop();
        music.source.disconnect();
        music.gain.disconnect();
      } catch (e) {
        // Already stopped
      }
    }, fadeOutDuration + 100);
  }

  /**
   * Play multi-layer ambience for a location
   */
  async playAmbience(layers) {
    if (!this.isInitialized) return;
    
    await this.resume();
    
    // Stop any existing ambience layers not in new config
    const newLayerIds = new Set(layers.map(l => l.id));
    for (const [id, layer] of this.ambienceLayers) {
      if (!newLayerIds.has(id)) {
        this.stopAmbienceLayer(id);
      }
    }
    
    // Start or update layers
    for (const layerConfig of layers) {
      if (this.ambienceLayers.has(layerConfig.id)) {
        // Update existing layer volume
        const existing = this.ambienceLayers.get(layerConfig.id);
        this.fadeGain(existing.gain, existing.gain.gain.value, layerConfig.volume, 1000);
      } else {
        // Start new layer
        await this.startAmbienceLayer(layerConfig);
      }
    }
  }

  /**
   * Start a single ambience layer
   */
  async startAmbienceLayer(config) {
    const buffer = await this.loadAudio(config.url);
    if (!buffer) return;
    
    const source = this.audioContext.createBufferSource();
    const gain = this.audioContext.createGain();
    
    source.buffer = buffer;
    source.loop = config.loop !== false;
    gain.gain.setValueAtTime(0, this.audioContext.currentTime);
    
    source.connect(gain);
    gain.connect(this.ambienceGain);
    
    source.start(0);
    this.fadeGain(gain, 0, config.volume, 1500);
    
    this.ambienceLayers.set(config.id, { source, gain, config });
  }

  /**
   * Stop a single ambience layer
   */
  stopAmbienceLayer(id, fadeOut = 1500) {
    const layer = this.ambienceLayers.get(id);
    if (!layer) return;
    
    this.ambienceLayers.delete(id);
    
    this.fadeGain(layer.gain, layer.gain.gain.value, 0, fadeOut);
    
    setTimeout(() => {
      try {
        layer.source.stop();
        layer.source.disconnect();
        layer.gain.disconnect();
      } catch (e) {
        // Already stopped
      }
    }, fadeOut + 100);
  }

  /**
   * Stop all ambience
   */
  stopAllAmbience(fadeOut = 1500) {
    for (const id of this.ambienceLayers.keys()) {
      this.stopAmbienceLayer(id, fadeOut);
    }
  }

  /**
   * Play a one-shot sound effect
   */
  async playSFX(url, options = {}) {
    if (!this.isInitialized) return;
    
    const { volume = 1.0, playbackRate = 1.0 } = options;
    
    const buffer = await this.loadAudio(url);
    if (!buffer) return;
    
    await this.resume();
    
    const source = this.audioContext.createBufferSource();
    const gain = this.audioContext.createGain();
    
    source.buffer = buffer;
    source.playbackRate.setValueAtTime(playbackRate, this.audioContext.currentTime);
    gain.gain.setValueAtTime(volume, this.audioContext.currentTime);
    
    source.connect(gain);
    gain.connect(this.sfxGain);
    
    source.start(0);
    
    // Cleanup after playback
    source.onended = () => {
      source.disconnect();
      gain.disconnect();
    };
  }

  /**
   * Play a random variation of a sound effect
   */
  async playSFXVariation(baseUrl, variations, options = {}) {
    const variationIndex = Math.floor(Math.random() * variations) + 1;
    const url = baseUrl.replace('.mp3', `-${variationIndex}.mp3`);
    await this.playSFX(url, options);
  }

  /**
   * Fade a gain node's value over time
   */
  fadeGain(gainNode, from, to, duration) {
    const now = this.audioContext.currentTime;
    gainNode.gain.setValueAtTime(from, now);
    gainNode.gain.linearRampToValueAtTime(to, now + duration / 1000);
  }

  /**
   * Set master volume
   */
  setMasterVolume(volume) {
    this.settings.masterVolume = Math.max(0, Math.min(1, volume));
    this.applyVolumes();
  }

  /**
   * Set music volume
   */
  setMusicVolume(volume) {
    this.settings.musicVolume = Math.max(0, Math.min(1, volume));
    this.applyVolumes();
  }

  /**
   * Set ambience volume
   */
  setAmbienceVolume(volume) {
    this.settings.ambienceVolume = Math.max(0, Math.min(1, volume));
    this.applyVolumes();
  }

  /**
   * Set SFX volume
   */
  setSFXVolume(volume) {
    this.settings.sfxVolume = Math.max(0, Math.min(1, volume));
    this.applyVolumes();
  }

  /**
   * Toggle mute
   */
  toggleMute() {
    this.isMuted = !this.isMuted;
    this.applyVolumes();
    return this.isMuted;
  }

  /**
   * Set mute state
   */
  setMuted(muted) {
    this.isMuted = muted;
    this.applyVolumes();
  }

  /**
   * Get current settings
   */
  getSettings() {
    return {
      ...this.settings,
      isMuted: this.isMuted,
      isInitialized: this.isInitialized,
    };
  }

  /**
   * Stop all audio
   */
  stopAll(fadeOut = 1000) {
    this.stopMusic(fadeOut);
    this.stopAllAmbience(fadeOut);
  }

  /**
   * Cleanup
   */
  destroy() {
    this.stopAll(0);
    if (this.audioContext) {
      this.audioContext.close();
    }
    this.bufferCache.clear();
    this.loadingPromises.clear();
    this.isInitialized = false;
  }
}

// Singleton instance
export const audioManager = new AudioManager();
export default audioManager;
