// Web Speech API Text-to-Speech Service
// Free, built into all modern browsers

import { normalizeCharacterId, speakerToCharacterId } from '../utils/characterUtils';

// Voice profiles for each character
// pitch: 0.1-2 (1 = normal), rate: 0.1-10 (1 = normal)
export const VOICE_PROFILES = {
  // Narrator - deep, authoritative noir voice
  narrator: {
    pitch: 0.8,
    rate: 0.9,
    preferredGender: 'male',
    preferredType: 'deep',
  },

  // === THE EMBER ROOM ===
  // Teddy Olson - sleazy club owner, 50s
  teddy: {
    pitch: 0.85,
    rate: 0.95,
    preferredGender: 'male',
    preferredType: 'mature',
  },
  teddyolson: {
    pitch: 0.85,
    rate: 0.95,
    preferredGender: 'male',
    preferredType: 'mature',
  },

  // Jimmy - young bartender, observant
  jimmy: {
    pitch: 1.0,
    rate: 0.95,
    preferredGender: 'male',
    preferredType: 'young',
  },
  bartender: {
    pitch: 1.0,
    rate: 0.95,
    preferredGender: 'male',
    preferredType: 'young',
  },

  // Delia - young waitress, nervous
  delia: {
    pitch: 1.3,
    rate: 1.05,
    preferredGender: 'female',
    preferredType: 'young',
  },
  waitress: {
    pitch: 1.3,
    rate: 1.05,
    preferredGender: 'female',
    preferredType: 'young',
  },

  // === VAN GELDER'S STUDIO ===
  // Rudy Van Gelder - precise, technical engineer
  rudy: {
    pitch: 0.95,
    rate: 0.85,
    preferredGender: 'male',
    preferredType: 'mature',
  },
  rudyvangelder: {
    pitch: 0.95,
    rate: 0.85,
    preferredGender: 'male',
    preferredType: 'mature',
  },

  // Marcus "Snap" Whitmore - cocky young trumpet player
  snap: {
    pitch: 1.05,
    rate: 1.1,
    preferredGender: 'male',
    preferredType: 'young',
  },
  marcus: {
    pitch: 1.05,
    rate: 1.1,
    preferredGender: 'male',
    preferredType: 'young',
  },
  marcuswhitmore: {
    pitch: 1.05,
    rate: 1.1,
    preferredGender: 'male',
    preferredType: 'young',
  },
  'marcus"snap"whitmore': {
    pitch: 1.05,
    rate: 1.1,
    preferredGender: 'male',
    preferredType: 'young',
  },

  // === EARL'S APARTMENT ===
  // Frank - tired building super
  frank: {
    pitch: 0.75,
    rate: 0.85,
    preferredGender: 'male',
    preferredType: 'deep',
  },
  buildingsuper: {
    pitch: 0.75,
    rate: 0.85,
    preferredGender: 'male',
    preferredType: 'deep',
  },

  // Mrs. Patterson - elderly neighbor
  mrspatterson: {
    pitch: 1.2,
    rate: 0.8,
    preferredGender: 'female',
    preferredType: 'mature',
  },
  neighbor: {
    pitch: 1.2,
    rate: 0.8,
    preferredGender: 'female',
    preferredType: 'mature',
  },

  // === LORRAINE'S BROWNSTONE ===
  // Lorraine Jeffries - elegant, heartbroken singer
  lorraine: {
    pitch: 1.1,
    rate: 0.9,
    preferredGender: 'female',
    preferredType: 'warm',
  },
  lorrainejeffries: {
    pitch: 1.1,
    rate: 0.9,
    preferredGender: 'female',
    preferredType: 'warm',
  },

  // Mae Thompson - sharp older sister
  mae: {
    pitch: 1.0,
    rate: 1.0,
    preferredGender: 'female',
    preferredType: 'mature',
  },
  maethompson: {
    pitch: 1.0,
    rate: 1.0,
    preferredGender: 'female',
    preferredType: 'mature',
  },

  // === BIRDLAND ===
  // Symphony Sid - smooth radio DJ voice
  symphonysid: {
    pitch: 0.9,
    rate: 0.95,
    preferredGender: 'male',
    preferredType: 'deep',
  },
  sid: {
    pitch: 0.9,
    rate: 0.95,
    preferredGender: 'male',
    preferredType: 'deep',
  },

  // Pete Wilson - DownBeat journalist
  pete: {
    pitch: 1.0,
    rate: 1.05,
    preferredGender: 'male',
    preferredType: 'young',
  },
  petewilson: {
    pitch: 1.0,
    rate: 1.05,
    preferredGender: 'male',
    preferredType: 'young',
  },
  journalist: {
    pitch: 1.0,
    rate: 1.05,
    preferredGender: 'male',
    preferredType: 'young',
  },

  // Ruthie Davis - ambitious young vocalist
  ruthie: {
    pitch: 1.25,
    rate: 1.0,
    preferredGender: 'female',
    preferredType: 'young',
  },
  ruthiedavis: {
    pitch: 1.25,
    rate: 1.0,
    preferredGender: 'female',
    preferredType: 'young',
  },

  // Chester "Chet" Malone - reformed drummer, raspy
  chet: {
    pitch: 0.7,
    rate: 0.9,
    preferredGender: 'male',
    preferredType: 'deep',
  },
  chester: {
    pitch: 0.7,
    rate: 0.9,
    preferredGender: 'male',
    preferredType: 'deep',
  },
  chestermalone: {
    pitch: 0.7,
    rate: 0.9,
    preferredGender: 'male',
    preferredType: 'deep',
  },
  'chester"chet"malone': {
    pitch: 0.7,
    rate: 0.9,
    preferredGender: 'male',
    preferredType: 'deep',
  },

  // Default fallback
  default: {
    pitch: 1.0,
    rate: 0.95,
    preferredGender: 'male',
    preferredType: 'mature',
  },
};

// Cache for available voices
let cachedVoices = [];
let voicesLoaded = false;

/**
 * Load available voices from the browser
 * @returns {Promise<SpeechSynthesisVoice[]>}
 */
export function loadVoices() {
  return new Promise((resolve) => {
    const synth = window.speechSynthesis;
    
    // Try to get voices immediately
    let voices = synth.getVoices();
    
    if (voices.length > 0) {
      cachedVoices = voices;
      voicesLoaded = true;
      resolve(voices);
      return;
    }
    
    // Wait for voices to load (some browsers load async)
    synth.onvoiceschanged = () => {
      voices = synth.getVoices();
      cachedVoices = voices;
      voicesLoaded = true;
      resolve(voices);
    };
    
    // Timeout fallback
    setTimeout(() => {
      if (!voicesLoaded) {
        cachedVoices = synth.getVoices();
        voicesLoaded = true;
        resolve(cachedVoices);
      }
    }, 1000);
  });
}

/**
 * Get the best voice for a character profile
 * @param {Object} profile - Voice profile with preferredGender
 * @returns {SpeechSynthesisVoice|null}
 */
function selectVoice(profile) {
  if (cachedVoices.length === 0) {
    return null;
  }

  const { preferredGender } = profile;
  
  // Filter English voices
  const englishVoices = cachedVoices.filter(v => 
    v.lang.startsWith('en')
  );
  
  if (englishVoices.length === 0) {
    return cachedVoices[0];
  }

  // Try to find a voice matching gender preference
  // Voice names often contain hints like "Female", "Male", common names
  const femaleHints = ['female', 'woman', 'girl', 'samantha', 'victoria', 'karen', 'moira', 'tessa', 'fiona', 'kate', 'susan', 'zira', 'hazel', 'linda', 'ava', 'allison'];
  const maleHints = ['male', 'man', 'guy', 'david', 'daniel', 'james', 'alex', 'tom', 'mark', 'george', 'richard', 'fred', 'lee'];

  let candidates = englishVoices;
  
  if (preferredGender === 'female') {
    const femaleVoices = englishVoices.filter(v => 
      femaleHints.some(hint => v.name.toLowerCase().includes(hint))
    );
    if (femaleVoices.length > 0) {
      candidates = femaleVoices;
    }
  } else if (preferredGender === 'male') {
    const maleVoices = englishVoices.filter(v => 
      maleHints.some(hint => v.name.toLowerCase().includes(hint)) ||
      !femaleHints.some(hint => v.name.toLowerCase().includes(hint))
    );
    if (maleVoices.length > 0) {
      candidates = maleVoices;
    }
  }

  // Prefer local voices over remote (usually better quality)
  const localVoices = candidates.filter(v => v.localService);
  if (localVoices.length > 0) {
    return localVoices[0];
  }

  return candidates[0];
}

/**
 * Get voice profile for a character
 * @param {string} characterId - Character identifier
 * @returns {Object} - Voice profile
 */
export function getVoiceProfile(characterId) {
  if (!characterId) return VOICE_PROFILES.default;

  const normalizedId = normalizeCharacterId(characterId);

  return VOICE_PROFILES[normalizedId] || VOICE_PROFILES.default;
}

/**
 * Speak text using Web Speech API
 * @param {string} text - Text to speak
 * @param {string} characterId - Character identifier
 * @param {Function} onEnd - Callback when speech ends
 * @param {Function} onError - Callback on error
 * @returns {SpeechSynthesisUtterance} - The utterance object (for cancellation)
 */
export function speak(text, characterId = 'narrator', onEnd = null, onError = null) {
  const synth = window.speechSynthesis;
  
  // Cancel any ongoing speech
  synth.cancel();
  
  if (!text || text.trim().length === 0) {
    if (onEnd) onEnd();
    return null;
  }

  const profile = getVoiceProfile(characterId);
  const voice = selectVoice(profile);
  
  const utterance = new SpeechSynthesisUtterance(text);
  
  if (voice) {
    utterance.voice = voice;
  }
  
  utterance.pitch = profile.pitch;
  utterance.rate = profile.rate;
  utterance.volume = 1.0;
  
  utterance.onend = () => {
    if (onEnd) onEnd();
  };
  
  utterance.onerror = (event) => {
    console.error('Speech error:', event.error);
    if (onError) onError(event.error);
  };
  
  synth.speak(utterance);
  
  return utterance;
}

/**
 * Stop all speech
 */
export function stopSpeech() {
  window.speechSynthesis.cancel();
}

/**
 * Check if speech synthesis is supported
 * @returns {boolean}
 */
export function isSpeechSupported() {
  return 'speechSynthesis' in window;
}

/**
 * Check if currently speaking
 * @returns {boolean}
 */
export function isSpeaking() {
  return window.speechSynthesis.speaking;
}

// speakerToCharacterId is imported from '../utils/characterUtils'
// Re-export for backwards compatibility
export { speakerToCharacterId };

/**
 * Get list of available voices (for debugging/settings)
 * @returns {Array}
 */
export function getAvailableVoices() {
  return cachedVoices.map(v => ({
    name: v.name,
    lang: v.lang,
    local: v.localService,
  }));
}
