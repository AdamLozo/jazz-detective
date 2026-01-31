// Complete character database for Jazz Detective
export const characters = {
  // === THE EMBER ROOM ===
  teddy: {
    id: 'teddy',
    name: 'Teddy Olson',
    role: 'Club Owner',
    location: 'emberRoom',
    description: 'White club owner in his 50s. Expensive suit, cheap smile. His eyes keep darting to the back room.',
    initialDialogue: 'teddyIntro',
    isSuspect: true,
  },
  bartender: {
    id: 'bartender',
    name: 'Jimmy',
    role: 'Bartender',
    location: 'emberRoom',
    description: 'Tall, quiet, sees everything. Been pouring drinks at The Ember Room for eight years.',
    initialDialogue: 'bartenderIntro',
    isSuspect: false,
  },
  waitress: {
    id: 'waitress',
    name: 'Delia',
    role: 'Waitress',
    location: 'emberRoom',
    description: 'Young, nervous. Keeps glancing toward Teddy like she\'s waiting for permission to speak.',
    initialDialogue: 'waitressIntro',
    isSuspect: false,
  },

  // === VAN GELDER'S STUDIO ===
  rudy: {
    id: 'rudy',
    name: 'Rudy Van Gelder',
    role: 'Recording Engineer',
    location: 'vanGelderStudio',
    description: 'The legendary engineer. Precise, careful, keeper of secrets pressed into vinyl.',
    initialDialogue: 'rudyIntro',
    isSuspect: false,
  },
  snap: {
    id: 'snap',
    name: 'Marcus "Snap" Whitmore',
    role: 'Trumpet Player',
    location: 'vanGelderStudio',
    description: 'Young hotshot with undeniable talent and an ego to match. Claims he was here all night.',
    initialDialogue: 'snapIntro',
    isSuspect: true,
  },

  // === EARL'S APARTMENT ===
  buildingSuper: {
    id: 'buildingSuper',
    name: 'Frank',
    role: 'Building Superintendent',
    location: 'earlApartment',
    description: 'Tired eyes, jangling keys. He\'s seen too much in this building.',
    initialDialogue: 'superIntro',
    isSuspect: false,
  },
  neighbor: {
    id: 'neighbor',
    name: 'Mrs. Patterson',
    role: 'Neighbor',
    location: 'earlApartment',
    description: 'Elderly woman from 4B. Nosy, but her nosiness might be useful.',
    initialDialogue: 'neighborIntro',
    isSuspect: false,
  },

  // === LORRAINE'S BROWNSTONE ===
  lorraine: {
    id: 'lorraine',
    name: 'Lorraine Jeffries',
    role: 'Estranged Wife',
    location: 'lorraineBrownstone',
    description: 'Singer who gave up her career for Earl. Still beautiful, still heartbroken.',
    initialDialogue: 'lorraineIntro',
    isSuspect: true,
  },
  mae: {
    id: 'mae',
    name: 'Mae Thompson',
    role: 'Lorraine\'s Sister',
    location: 'lorraineBrownstone',
    description: 'Protective older sister. Sharp eyes, sharper tongue.',
    initialDialogue: 'maeIntro',
    isSuspect: false,
  },

  // === BIRDLAND ===
  symphonySid: {
    id: 'symphonySid',
    name: 'Symphony Sid',
    role: 'Radio DJ',
    location: 'birdland',
    description: 'The voice of jazz radio. Knows everyone, hears everything.',
    initialDialogue: 'sidIntro',
    isSuspect: false,
  },
  journalist: {
    id: 'journalist',
    name: 'Pete Wilson',
    role: 'DownBeat Journalist',
    location: 'birdland',
    description: 'Always chasing a story. Currently writing about trouble in the club scene.',
    initialDialogue: 'journalistIntro',
    isSuspect: false,
  },
  ruthie: {
    id: 'ruthie',
    name: 'Ruthie Davis',
    role: 'Vocalist / Earl\'s Girlfriend',
    location: 'birdland',
    description: 'Twenty-six, ambitious, beautiful. Red lipstick, red flags.',
    initialDialogue: 'ruthieIntro',
    isSuspect: true,
  },
  chet: {
    id: 'chet',
    name: 'Chester "Chet" Malone',
    role: 'Former Drummer',
    location: 'birdland',
    description: 'Earl fired him two years ago. He got clean, but his reputation didn\'t.',
    initialDialogue: 'chetIntro',
    isSuspect: true,
  },
};

// The five main suspects for the accusation system
export const suspects = ['teddy', 'lorraine', 'snap', 'ruthie', 'chet'];

export function getSuspects() {
  return suspects.map(id => characters[id]);
}

export function getCharactersByLocation(locationId) {
  return Object.values(characters).filter(char => char.location === locationId);
}
