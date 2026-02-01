// ElevenLabs Text-to-Speech Service
// API Documentation: https://elevenlabs.io/docs/api-reference

import { normalizeCharacterId, speakerToCharacterId } from '../utils/characterUtils';

const API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY;
const BASE_URL = 'https://api.elevenlabs.io/v1';

// Voice IDs - Custom voices from Adam's ElevenLabs account
// Mapped from Wicked Smaht characters to Jazz Noir personalities
export const VOICES = {
  // Narrator - deep noir narration (sully: gravelly, authoritative)
  narrator: 'NywA242qQXB7MIJrCoqS',

  // === THE EMBER ROOM ===
  teddy: 'rLOxQ3Ng9cSsUw5PcOHf',      // miles: fake refined, fits sleazy club owner
  bartender: 'QPnMNBEEOmsb7ezbv7f1',   // brendan: young, energetic
  jimmy: 'QPnMNBEEOmsb7ezbv7f1',       // brendan: young male
  waitress: '5h7yamR53TAavMtELWLe',    // colleen: sharp female
  delia: '5h7yamR53TAavMtELWLe',       // colleen: sharp, no-nonsense

  // === VAN GELDER'S STUDIO ===
  rudy: 'W31Vf96FFmtR0O1RDPKp',        // simon: academic, precise
  snap: 'pooz8IrjkxHDBt14Xi8v',        // fitz: energetic, expressive
  marcus: 'pooz8IrjkxHDBt14Xi8v',      // fitz: same as snap

  // === EARL'S APARTMENT ===
  buildingSuper: '0STyFUxfI6C3cJtqD8bn', // eddie: gruff, few words
  frank: '0STyFUxfI6C3cJtqD8bn',       // eddie: gruff older male
  neighbor: 'TgKgL4AAQZFIC8wypQ2l',    // mary_catherine: matriarch, 60s
  mrsPetterson: 'TgKgL4AAQZFIC8wypQ2l', // mary_catherine: elderly female

  // === LORRAINE'S BROWNSTONE ===
  lorraine: 'eWtfC1JrnYxr8lIrjQt4',    // elena: mysterious, elegant
  mae: 'iQwW0Wk6Yn8dGykrQVXU',         // trish: refined, sharp older female

  // === BIRDLAND ===
  symphonySid: 'mXCULW79xNk7bZvGBPnL', // jerome: performer energy, radio voice
  journalist: 'QjqXzCkVChvjEoE397Wj',  // danny: earnest, eager
  pete: 'QjqXzCkVChvjEoE397Wj',        // danny: same as journalist
  ruthie: 'vmaJr0jlXauKX3wB1cyW',      // maeve: professional, ambitious
  chet: 'gPPSy02AZNNwzjeTEfx4',        // enzo: older male, weathered
  chester: 'gPPSy02AZNNwzjeTEfx4',     // enzo: same as chet

  // === POLICE ===
  morrison: 'MK8VT39pGxFCrNQTuylS',    // tommy: gruff 50s male, authoritative
  detective: 'MK8VT39pGxFCrNQTuylS',   // tommy: same as morrison

  // Default fallback (narrator voice)
  default: 'NywA242qQXB7MIJrCoqS'
};

// Voice settings for different styles
const VOICE_SETTINGS = {
  narration: {
    stability: 0.75,
    similarity_boost: 0.75,
  },
  dialogue: {
    stability: 0.65,
    similarity_boost: 0.80,
  },
  emphasis: {
    stability: 0.50,
    similarity_boost: 0.85,
  }
};

/**
 * Generate speech from text using ElevenLabs API
 * @param {string} text - The text to convert to speech
 * @param {string} voiceId - The voice ID to use
 * @param {string} style - 'narration', 'dialogue', or 'emphasis'
 * @returns {Promise<Blob>} - Audio blob
 */
export async function generateSpeech(text, voiceId = VOICES.narrator, style = 'narration') {
  if (!API_KEY) {
    console.error('ElevenLabs API key not found. Check your .env file.');
    throw new Error('API key not configured');
  }

  const settings = VOICE_SETTINGS[style] || VOICE_SETTINGS.narration;

  const response = await fetch(`${BASE_URL}/text-to-speech/${voiceId}`, {
    method: 'POST',
    headers: {
      'Accept': 'audio/mpeg',
      'Content-Type': 'application/json',
      'xi-api-key': API_KEY
    },
    body: JSON.stringify({
      text,
      voice_settings: settings
    })
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    console.error('ElevenLabs API error:', error);
    throw new Error(`Speech generation failed: ${response.status}`);
  }

  return await response.blob();
}

/**
 * Generate speech and return as playable audio URL
 * @param {string} text - The text to convert to speech
 * @param {string} voiceId - The voice ID to use
 * @param {string} style - 'narration', 'dialogue', or 'emphasis'
 * @returns {Promise<string>} - Object URL for audio playback
 */
export async function generateSpeechUrl(text, voiceId = VOICES.narrator, style = 'narration') {
  const blob = await generateSpeech(text, voiceId, style);
  return URL.createObjectURL(blob);
}

/**
 * Get voice ID for a character
 * @param {string} characterId - Character identifier
 * @returns {string} - Voice ID
 */
export function getVoiceForCharacter(characterId) {
  if (!characterId) return VOICES.default;

  const normalizedId = normalizeCharacterId(characterId);
  
  // Direct mapping
  const directMappings = {
    'narrator': VOICES.narrator,
    'player': VOICES.narrator,
    
    // Ember Room
    'teddy': VOICES.teddy,
    'teddyolson': VOICES.teddy,
    'jimmy': VOICES.jimmy,
    'bartender': VOICES.bartender,
    'delia': VOICES.delia,
    'waitress': VOICES.waitress,
    
    // Van Gelder's Studio
    'rudy': VOICES.rudy,
    'rudyvangelder': VOICES.rudy,
    'snap': VOICES.snap,
    'marcus': VOICES.marcus,
    'marcuswhitmore': VOICES.marcus,
    'marcussnapwhitmore': VOICES.snap,
    
    // Earl's Apartment
    'frank': VOICES.frank,
    'buildingsuper': VOICES.buildingSuper,
    'super': VOICES.buildingSuper,
    'mrspetterson': VOICES.neighbor,
    'mrspatterson': VOICES.neighbor,
    'neighbor': VOICES.neighbor,
    
    // Lorraine's Brownstone
    'lorraine': VOICES.lorraine,
    'lorrainejeffries': VOICES.lorraine,
    'mae': VOICES.mae,
    'maethompson': VOICES.mae,
    
    // Birdland
    'symphonysid': VOICES.symphonySid,
    'sid': VOICES.symphonySid,
    'pete': VOICES.journalist,
    'petewilson': VOICES.journalist,
    'journalist': VOICES.journalist,
    'ruthie': VOICES.ruthie,
    'ruthiedavis': VOICES.ruthie,
    'chet': VOICES.chet,
    'chester': VOICES.chester,
    'chestermalone': VOICES.chet,
    'chesterchetmalone': VOICES.chet,
    
    // Police
    'morrison': VOICES.morrison,
    'detectivemorrison': VOICES.morrison,
    'detective': VOICES.detective,
  };
  
  return directMappings[normalizedId] || VOICES.default;
}

// speakerToCharacterId is imported from '../utils/characterUtils'
// Re-export for backwards compatibility
export { speakerToCharacterId };

/**
 * Fetch available voices from ElevenLabs
 * @returns {Promise<Array>} - List of available voices
 */
export async function getAvailableVoices() {
  if (!API_KEY) {
    throw new Error('API key not configured');
  }

  const response = await fetch(`${BASE_URL}/voices`, {
    headers: {
      'xi-api-key': API_KEY
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch voices');
  }

  const data = await response.json();
  return data.voices;
}

/**
 * Check API key validity
 * @returns {Promise<Object>} - API status info
 */
export async function checkApiStatus() {
  if (!API_KEY) {
    return { valid: false, error: 'No API key' };
  }

  try {
    const response = await fetch(`${BASE_URL}/user`, {
      headers: {
        'xi-api-key': API_KEY
      }
    });

    if (!response.ok) {
      return { valid: false, error: `API error: ${response.status}` };
    }

    const data = await response.json();
    return {
      valid: true,
      tier: data.subscription?.tier || 'free',
      remaining: data.subscription?.character_limit - data.subscription?.character_count,
    };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}
