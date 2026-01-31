// Timeline events data for Jazz Detective
// Timeline covers 8:00 PM - 3:00 AM (November 14-15, 1965)

export const TIMELINE_START = 20; // 8 PM in 24hr
export const TIMELINE_END = 27; // 3 AM (next day, represented as 27)
export const MURDER_TIME = 25; // 1 AM

// Convert 24hr time to timeline position (0-100%)
export function timeToPosition(hour, minutes = 0) {
  const totalHours = hour + minutes / 60;
  const adjusted = totalHours < 12 ? totalHours + 24 : totalHours; // Handle AM times
  return ((adjusted - TIMELINE_START) / (TIMELINE_END - TIMELINE_START)) * 100;
}

// Format time for display
export function formatTime(hour, minutes = 0) {
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  const ampm = hour >= 12 && hour < 24 ? 'PM' : 'AM';
  const adjustedHour = hour >= 24 ? hour - 24 : hour;
  const finalHour = adjustedHour > 12 ? adjustedHour - 12 : adjustedHour === 0 ? 12 : adjustedHour;
  const finalAmPm = adjustedHour >= 12 ? 'PM' : 'AM';
  return minutes ? `${finalHour}:${minutes.toString().padStart(2, '0')} ${finalAmPm}` : `${finalHour} ${finalAmPm}`;
}

// Suspects who appear on timeline
export const timelineSuspects = [
  { id: 'snap', name: 'Snap Whitmore', role: 'Trumpet Player' },
  { id: 'lorraine', name: 'Lorraine Jeffries', role: 'Estranged Wife' },
  { id: 'chet', name: 'Chet Malone', role: 'Former Drummer' },
  { id: 'ruthie', name: 'Ruthie Davis', role: "Earl's Girlfriend" },
  { id: 'teddy', name: 'Teddy Olson', role: 'Club Owner' },
];

// Fixed events (always shown on timeline)
export const fixedEvents = {
  firstSet: {
    id: 'firstSet',
    label: "Earl's First Set",
    startHour: 21,
    endHour: 22.5,
    type: 'event',
    description: 'Earl performs at The Ember Room',
    color: 'bg-jazz-blue/30',
  },
  secondSet: {
    id: 'secondSet',
    label: "Earl's Second Set",
    startHour: 23,
    endHour: 24,
    type: 'event',
    description: "Earl's final performance",
    color: 'bg-jazz-blue/30',
  },
  murder: {
    id: 'murder',
    label: 'MURDER',
    startHour: 25,
    type: 'murder',
    description: 'Earl killed in the back room',
    color: 'bg-red-600',
  },
};

// Placeable timeline events (unlocked by clues or dialogue flags)
export const placeableEvents = {
  // SNAP's alibi
  snapAlibi: {
    id: 'snapAlibi',
    suspect: 'snap',
    label: 'At Van Gelder Studio',
    startHour: 20,
    endHour: 26.25, // 2:15 AM
    type: 'alibi',
    requiresClue: 'sessionLogs',
    description: "Rudy's session logs confirm Snap was recording all night (8 PM - 2:15 AM)",
    color: 'bg-green-600/60',
    isAlibi: true,
  },

  // LORRAINE's alibi
  lorraineAlibi: {
    id: 'lorraineAlibi',
    suspect: 'lorraine',
    label: 'With Sister Mae',
    startHour: 20,
    endHour: 26, // 2 AM
    type: 'alibi',
    requiresClue: 'sisterTestimony',
    description: 'Sister confirms they played cards until 2 AM',
    color: 'bg-green-600/60',
    isAlibi: true,
  },

  // CHET's events
  chetAlley: {
    id: 'chetAlley',
    suspect: 'chet',
    label: 'Confronts Earl',
    startHour: 22,
    endHour: 22.5,
    type: 'sighting',
    requiresFlag: 'chet_confronted_earl',
    description: 'Chet confronted Earl in the alley before the show',
    color: 'bg-yellow-600/60',
  },
  chetBirdland: {
    id: 'chetBirdland',
    suspect: 'chet',
    label: 'At Birdland',
    startHour: 23,
    endHour: 24, // Until midnight
    type: 'alibi',
    requiresClue: 'chetSighting',
    description: 'Symphony Sid saw Chet at Birdland around 11 PM',
    color: 'bg-green-600/60',
    isAlibi: true,
  },

  // RUTHIE's events
  ruthieLeaves: {
    id: 'ruthieLeaves',
    suspect: 'ruthie',
    label: 'Leaves Club',
    startHour: 22.75, // 10:45 PM
    endHour: 23,
    type: 'sighting',
    requiresFlag: 'learned_ruthie_got_call',
    description: 'Ruthie left early, claimed she was sick',
    color: 'bg-yellow-600/60',
    isLie: true,
  },
  ruthieBirdland: {
    id: 'ruthieBirdland',
    suspect: 'ruthie',
    label: 'At Birdland (Photo)',
    startHour: 23,
    endHour: 25, // 1 AM
    type: 'alibi',
    requiresClue: 'ruthiePhoto',
    description: 'DownBeat photo proves she was meeting Prestige A&R',
    color: 'bg-green-600/60',
    isAlibi: true,
    contradictsEvent: 'ruthieLeaves',
  },

  // TEDDY's events
  teddyAtClub: {
    id: 'teddyAtClub',
    suspect: 'teddy',
    label: 'At The Ember Room',
    startHour: 20,
    endHour: 27,
    type: 'location',
    requiresFlag: 'teddy_admitted_absence',
    description: 'Teddy claims he was at the club all night',
    color: 'bg-gray-500/40',
    hasGap: true,
  },
  teddyAbsence: {
    id: 'teddyAbsence',
    suspect: 'teddy',
    label: 'MISSING (20 min)',
    startHour: 23.25, // 11:15 PM
    endHour: 23.58, // 11:35 PM
    type: 'gap',
    requiresFlag: 'bartender_contradicts_teddy',
    description: 'Jimmy confirms Teddy was gone 20 minutes, not 5',
    color: 'bg-red-600/60',
    isContradiction: true,
    contradictsEvent: 'teddyAtClub',
  },
  teddyThreat: {
    id: 'teddyThreat',
    suspect: 'teddy',
    label: 'Threatens Earl',
    startHour: 22,
    endHour: 22.25,
    type: 'evidence',
    requiresClue: 'argumentTape',
    description: '"That can be arranged." - Teddy on tape',
    color: 'bg-red-600/60',
  },
  teddyWitness: {
    id: 'teddyWitness',
    suspect: 'teddy',
    label: 'Argues with Earl',
    startHour: 22,
    endHour: 22.25,
    type: 'evidence',
    requiresFlag: 'chet_witnessed_threat',
    description: 'Chet witnessed Teddy arguing furiously with Earl',
    color: 'bg-red-600/60',
  },

  // Post-murder event
  apartmentRansacked: {
    id: 'apartmentRansacked',
    suspect: null, // Doesn't belong to a specific suspect row
    label: 'Apartment Searched',
    startHour: 27, // 3 AM
    endHour: 27.5,
    type: 'event',
    requiresFlag: 'apartment_searched',
    description: "Someone searched Earl's apartment around 3 AM",
    color: 'bg-purple-600/60',
  },
};

// Contradictions that can be discovered
export const contradictions = [
  {
    id: 'teddy_time_lie',
    events: ['teddyAbsence'],
    flags: ['teddy_admitted_absence', 'bartender_contradicts_teddy'],
    description: 'Teddy claimed 5 minutes. Jimmy says 20.',
    journalNote: '★ TIMELINE: Teddy lied about how long he was gone during the second set',
    journalFlag: 'timeline_teddy_contradiction',
  },
  {
    id: 'ruthie_sick_lie',
    events: ['ruthieLeaves', 'ruthieBirdland'],
    description: 'Ruthie claimed she was sick. Photo proves she was at Birdland.',
    journalNote: '★ TIMELINE: Ruthie lied about being sick — but she has an alibi',
    journalFlag: 'timeline_ruthie_contradiction',
  },
];

// Check if an event is available based on game state
export function isEventAvailable(event, collectedClues, dialogueFlags) {
  if (event.requiresClue) {
    const hasClue = collectedClues.some(c => c.id === event.requiresClue);
    if (!hasClue) return false;
  }
  if (event.requiresFlag) {
    if (!dialogueFlags[event.requiresFlag]) return false;
  }
  return true;
}

// Get all available events for a suspect
export function getAvailableEventsForSuspect(suspectId, collectedClues, dialogueFlags) {
  return Object.values(placeableEvents)
    .filter(e => e.suspect === suspectId)
    .filter(e => isEventAvailable(e, collectedClues, dialogueFlags));
}

// Check if suspect has alibi covering murder time
export function suspectHasAlibi(suspectId, placedEvents) {
  const suspectEvents = placedEvents.filter(e => {
    const event = placeableEvents[e];
    return event && event.suspect === suspectId && event.isAlibi;
  });
  
  // Check if any alibi covers the murder time (1 AM = 25)
  return suspectEvents.some(eventId => {
    const event = placeableEvents[eventId];
    return event && event.startHour <= MURDER_TIME && event.endHour >= MURDER_TIME;
  });
}

// Calculate timeline completion percentage
export function getTimelineCompletion(placedEvents, collectedClues, dialogueFlags) {
  const totalAvailable = Object.values(placeableEvents)
    .filter(e => isEventAvailable(e, collectedClues, dialogueFlags))
    .length;
  
  if (totalAvailable === 0) return 0;
  return Math.round((placedEvents.length / totalAvailable) * 100);
}
