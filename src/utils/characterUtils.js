/**
 * Character ID normalization and mapping utilities
 * Shared between speechService.js and elevenlabs.js
 */

/**
 * Normalize a character ID by removing separators, quotes, and lowercasing
 * @param {string} characterId - Raw character identifier
 * @returns {string} - Normalized character ID
 */
export function normalizeCharacterId(characterId) {
  if (!characterId) return '';

  return characterId
    .toLowerCase()
    .replace(/[-_\s]+/g, '')  // Remove separators (hyphens, underscores, spaces)
    .replace(/['"]/g, '');     // Remove quotes
}

/**
 * Extract character ID from speaker name in dialogue
 * Maps various speaker name formats to canonical character IDs
 * @param {string} speakerName - The speaker name from dialogue
 * @returns {string} - Normalized character ID
 */
export function speakerToCharacterId(speakerName) {
  if (!speakerName) return 'narrator';

  const name = speakerName.toLowerCase();

  // Ember Room characters
  if (name.includes('teddy')) return 'teddy';
  if (name.includes('jimmy')) return 'jimmy';
  if (name.includes('delia')) return 'delia';

  // Van Gelder's Studio
  if (name.includes('rudy')) return 'rudy';
  if (name.includes('snap') || name.includes('marcus')) return 'snap';

  // Earl's Apartment
  if (name.includes('frank')) return 'frank';
  if (name.includes('patterson') || name.includes('petterson')) return 'neighbor';

  // Lorraine's Brownstone
  if (name.includes('lorraine')) return 'lorraine';
  if (name.includes('mae')) return 'mae';

  // Birdland
  if (name.includes('sid')) return 'symphonySid';
  if (name.includes('pete') || name.includes('wilson')) return 'journalist';
  if (name.includes('ruthie')) return 'ruthie';
  if (name.includes('chet') || name.includes('chester')) return 'chet';

  // Police
  if (name.includes('morrison')) return 'morrison';

  return 'narrator';
}
