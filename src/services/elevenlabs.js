// ElevenLabs Text-to-Speech Service
// API Documentation: https://elevenlabs.io/docs/api-reference

const API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY;
const BASE_URL = 'https://api.elevenlabs.io/v1';

// Voice IDs for different character types
// Browse voices at: https://elevenlabs.io/voice-library
export const VOICES = {
  // Narrator - deep, smooth male voice for noir narration
  narrator: 'pNInz6obpgDQGcFmaJgB', // Adam - deep male
  
  // === THE EMBER ROOM ===
  teddy: 'TxGEqnHWrfWFTfGW9XjX', // Josh - older male, sleazy
  bartender: 'ErXwobaYiN019PkySvjV', // Antoni - young male
  jimmy: 'ErXwobaYiN019PkySvjV', // Antoni - young male (same as bartender)
  waitress: 'EXAVITQu4vr4xnSDxMaL', // Bella - young female, nervous
  delia: 'EXAVITQu4vr4xnSDxMaL', // Bella - young female
  
  // === VAN GELDER'S STUDIO ===
  rudy: 'VR6AewLTigWG4xSOukaG', // Arnold - precise, technical
  snap: 'SOYHLrjzK2X1ezoPC6cr', // Harry - expressive male, cocky
  marcus: 'SOYHLrjzK2X1ezoPC6cr', // Harry - same as snap
  
  // === EARL'S APARTMENT ===
  buildingSuper: 'ZQe5CZNOzWyzPSCn5a3c', // James - tired older male
  frank: 'ZQe5CZNOzWyzPSCn5a3c', // James - same as super
  neighbor: 'XB0fDUnXU5powFXDhCwa', // Charlotte - elderly female
  mrsPetterson: 'XB0fDUnXU5powFXDhCwa', // Charlotte - same as neighbor
  
  // === LORRAINE'S BROWNSTONE ===
  lorraine: 'jsCqWAovK2LkecY7zXl4', // Freya - elegant female, heartbroken
  mae: 'ThT5KcBeYPX3keUQqHPh', // Dorothy - sharp older female
  
  // === BIRDLAND ===
  symphonySid: 'g5CIjZEefAph4nQFvHAz', // Ethan - radio voice
  journalist: 'ErXwobaYiN019PkySvjV', // Antoni - young male
  pete: 'ErXwobaYiN019PkySvjV', // Antoni - same as journalist
  ruthie: 'jBpfuIE2acCO8z3wKNLl', // Gigi - soulful female, ambitious
  chet: 'IKne3meq5aSn9XLyUdCD', // Charlie - raspy male, reformed
  chester: 'IKne3meq5aSn9XLyUdCD', // Charlie - same as chet
  
  // === POLICE ===
  morrison: 'VR6AewLTigWG4xSOukaG', // Arnold - authoritative cop
  detective: 'VR6AewLTigWG4xSOukaG', // Arnold - same as morrison
  
  // Default fallback
  default: 'pNInz6obpgDQGcFmaJgB'
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
  
  // Normalize the ID (handle various formats)
  const normalizedId = characterId
    .toLowerCase()
    .replace(/[-_\s]+/g, '') // Remove separators
    .replace(/['"]/g, ''); // Remove quotes
  
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

/**
 * Extract character ID from speaker name in dialogue
 * @param {string} speakerName - The speaker name from dialogue
 * @returns {string} - Normalized character ID
 */
export function speakerToCharacterId(speakerName) {
  if (!speakerName) return 'narrator';
  
  const name = speakerName.toLowerCase();
  
  // Map speaker names to character IDs
  if (name.includes('teddy')) return 'teddy';
  if (name.includes('jimmy')) return 'jimmy';
  if (name.includes('delia')) return 'delia';
  if (name.includes('rudy')) return 'rudy';
  if (name.includes('snap') || name.includes('marcus')) return 'snap';
  if (name.includes('frank')) return 'frank';
  if (name.includes('patterson') || name.includes('petterson')) return 'neighbor';
  if (name.includes('lorraine')) return 'lorraine';
  if (name.includes('mae')) return 'mae';
  if (name.includes('sid')) return 'symphonySid';
  if (name.includes('pete') || name.includes('wilson')) return 'journalist';
  if (name.includes('ruthie')) return 'ruthie';
  if (name.includes('chet') || name.includes('chester')) return 'chet';
  if (name.includes('morrison')) return 'morrison';
  
  return 'narrator';
}

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
