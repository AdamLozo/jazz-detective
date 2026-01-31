// Audio configuration for Jazz Detective
// All audio assets, settings, and location mappings

export const AUDIO_SOURCES = {
  // === ROYALTY-FREE JAZZ MUSIC ===
  // Source recommendations: Free Music Archive, Incompetech, Pixabay
  music: {
    mainTheme: {
      name: 'Main Theme',
      // Smoky, mysterious jazz - slow tempo
      url: '/audio/music/main-theme.mp3',
      volume: 0.4,
      loop: true,
      fadeIn: 2000,
      fadeOut: 1500,
    },
    emberRoom: {
      name: 'Ember Room Blues',
      // Live club feel - upright bass, brushes on snare, muted trumpet
      url: '/audio/music/ember-room.mp3',
      volume: 0.35,
      loop: true,
      fadeIn: 3000,
      fadeOut: 2000,
    },
    investigation: {
      name: 'Investigation',
      // Tense, searching - walking bass, sparse piano
      url: '/audio/music/investigation.mp3',
      volume: 0.3,
      loop: true,
      fadeIn: 2000,
      fadeOut: 1500,
    },
    revelation: {
      name: 'Revelation',
      // Building tension - darker chords, crescendo
      url: '/audio/music/revelation.mp3',
      volume: 0.4,
      loop: false,
      fadeIn: 500,
      fadeOut: 1000,
    },
    accusation: {
      name: 'Accusation',
      // High tension - dissonant, urgent
      url: '/audio/music/accusation.mp3',
      volume: 0.45,
      loop: true,
      fadeIn: 1000,
      fadeOut: 500,
    },
    confession: {
      name: 'Confession',
      // Resolution - melancholy, piano solo
      url: '/audio/music/confession.mp3',
      volume: 0.4,
      loop: false,
      fadeIn: 2000,
      fadeOut: 3000,
    },
    endingGood: {
      name: 'Justice Served',
      // Triumphant but bittersweet
      url: '/audio/music/ending-good.mp3',
      volume: 0.4,
      loop: false,
      fadeIn: 2000,
      fadeOut: 3000,
    },
    endingBad: {
      name: 'Cold Case',
      // Lonely, unresolved
      url: '/audio/music/ending-bad.mp3',
      volume: 0.35,
      loop: false,
      fadeIn: 2000,
      fadeOut: 3000,
    },
  },

  // === AMBIENT SOUNDSCAPES ===
  ambience: {
    emberRoom: {
      name: 'Jazz Club Ambience',
      layers: [
        {
          id: 'crowd',
          url: '/audio/ambience/club-crowd-murmur.mp3',
          volume: 0.25,
          loop: true,
        },
        {
          id: 'glasses',
          url: '/audio/ambience/glasses-clink.mp3',
          volume: 0.15,
          loop: true,
        },
        {
          id: 'smoke',
          // Subtle crackling/breathing room tone
          url: '/audio/ambience/room-tone-warm.mp3',
          volume: 0.1,
          loop: true,
        },
      ],
    },
    vanGelderStudio: {
      name: 'Recording Studio',
      layers: [
        {
          id: 'tapeHiss',
          url: '/audio/ambience/tape-hiss.mp3',
          volume: 0.12,
          loop: true,
        },
        {
          id: 'equipmentHum',
          url: '/audio/ambience/equipment-hum.mp3',
          volume: 0.08,
          loop: true,
        },
        {
          id: 'clock',
          url: '/audio/ambience/clock-tick.mp3',
          volume: 0.1,
          loop: true,
        },
      ],
    },
    earlApartment: {
      name: 'Ransacked Apartment',
      layers: [
        {
          id: 'traffic',
          url: '/audio/ambience/distant-traffic.mp3',
          volume: 0.15,
          loop: true,
        },
        {
          id: 'radiator',
          url: '/audio/ambience/radiator-hiss.mp3',
          volume: 0.1,
          loop: true,
        },
        {
          id: 'pigeons',
          url: '/audio/ambience/pigeons-coo.mp3',
          volume: 0.08,
          loop: true,
        },
      ],
    },
    lorraineBrownstone: {
      name: 'Elegant Brownstone',
      layers: [
        {
          id: 'clock',
          url: '/audio/ambience/grandfather-clock.mp3',
          volume: 0.15,
          loop: true,
        },
        {
          id: 'fireplace',
          url: '/audio/ambience/fireplace-crackle.mp3',
          volume: 0.2,
          loop: true,
        },
        {
          id: 'roomTone',
          url: '/audio/ambience/room-tone-quiet.mp3',
          volume: 0.05,
          loop: true,
        },
      ],
    },
    birdland: {
      name: 'Birdland Club',
      layers: [
        {
          id: 'crowd',
          url: '/audio/ambience/busy-club-crowd.mp3',
          volume: 0.3,
          loop: true,
        },
        {
          id: 'street',
          url: '/audio/ambience/nyc-street-night.mp3',
          volume: 0.12,
          loop: true,
        },
        {
          id: 'neon',
          // Electrical buzz
          url: '/audio/ambience/neon-buzz.mp3',
          volume: 0.06,
          loop: true,
        },
      ],
    },
    travel: {
      name: 'NYC Streets',
      layers: [
        {
          id: 'traffic',
          url: '/audio/ambience/nyc-traffic.mp3',
          volume: 0.2,
          loop: true,
        },
        {
          id: 'footsteps',
          url: '/audio/ambience/distant-footsteps.mp3',
          volume: 0.1,
          loop: true,
        },
        {
          id: 'subway',
          url: '/audio/ambience/distant-subway.mp3',
          volume: 0.08,
          loop: true,
        },
      ],
    },
  },

  // === SOUND EFFECTS ===
  sfx: {
    // UI Sounds
    ui: {
      typewriter: {
        url: '/audio/sfx/typewriter-key.mp3',
        volume: 0.3,
        variations: 3, // typewriter-key-1.mp3, typewriter-key-2.mp3, etc.
      },
      typewriterReturn: {
        url: '/audio/sfx/typewriter-return.mp3',
        volume: 0.35,
      },
      pageFlip: {
        url: '/audio/sfx/page-flip.mp3',
        volume: 0.25,
        variations: 2,
      },
      paperSlide: {
        url: '/audio/sfx/paper-slide.mp3',
        volume: 0.2,
      },
      menuHover: {
        url: '/audio/sfx/menu-hover.mp3',
        volume: 0.15,
      },
      menuSelect: {
        url: '/audio/sfx/menu-select.mp3',
        volume: 0.25,
      },
      dialogueAdvance: {
        url: '/audio/sfx/dialogue-advance.mp3',
        volume: 0.2,
      },
    },
    
    // Investigation Sounds
    investigation: {
      clueFound: {
        url: '/audio/sfx/clue-found.mp3',
        volume: 0.4,
      },
      clueInspect: {
        url: '/audio/sfx/paper-rustle.mp3',
        volume: 0.25,
      },
      drawerOpen: {
        url: '/audio/sfx/drawer-open.mp3',
        volume: 0.3,
      },
      footstep: {
        url: '/audio/sfx/footstep-wood.mp3',
        volume: 0.2,
        variations: 4,
      },
      doorCreak: {
        url: '/audio/sfx/door-creak.mp3',
        volume: 0.35,
      },
      lightSwitch: {
        url: '/audio/sfx/light-switch.mp3',
        volume: 0.3,
      },
    },
    
    // Dramatic Stings
    stings: {
      revelation: {
        // Sharp piano chord + bass hit
        url: '/audio/sfx/sting-revelation.mp3',
        volume: 0.5,
      },
      suspicion: {
        // Dissonant strings swell
        url: '/audio/sfx/sting-suspicion.mp3',
        volume: 0.45,
      },
      caught: {
        // Dramatic brass hit
        url: '/audio/sfx/sting-caught.mp3',
        volume: 0.55,
      },
      confession: {
        // Melancholy piano phrase
        url: '/audio/sfx/sting-confession.mp3',
        volume: 0.5,
      },
      wrongAccusation: {
        // Deflating, descending phrase
        url: '/audio/sfx/sting-wrong.mp3',
        volume: 0.45,
      },
      jazzTrivia: {
        // Quick bebop phrase for correct answers
        url: '/audio/sfx/sting-jazz-correct.mp3',
        volume: 0.35,
      },
      jazzTriviaWrong: {
        // Off-key horn
        url: '/audio/sfx/sting-jazz-wrong.mp3',
        volume: 0.3,
      },
    },
    
    // Character-Specific
    characters: {
      teddyLaugh: {
        url: '/audio/sfx/teddy-laugh.mp3',
        volume: 0.4,
      },
      glassSet: {
        url: '/audio/sfx/glass-set-down.mp3',
        volume: 0.25,
      },
      cigaretteLighter: {
        url: '/audio/sfx/lighter-flick.mp3',
        volume: 0.3,
      },
      iceInGlass: {
        url: '/audio/sfx/ice-clink.mp3',
        volume: 0.25,
      },
    },
    
    // Timeline Feature
    timeline: {
      cardPlace: {
        url: '/audio/sfx/card-place.mp3',
        volume: 0.3,
      },
      cardPickup: {
        url: '/audio/sfx/card-pickup.mp3',
        volume: 0.25,
      },
      contradiction: {
        url: '/audio/sfx/timeline-contradiction.mp3',
        volume: 0.45,
      },
      verified: {
        url: '/audio/sfx/timeline-verified.mp3',
        volume: 0.35,
      },
    },
  },
};

// Location to audio mapping
export const LOCATION_AUDIO = {
  emberRoom: {
    music: 'emberRoom',
    ambience: 'emberRoom',
  },
  vanGelderStudio: {
    music: 'investigation',
    ambience: 'vanGelderStudio',
  },
  earlApartment: {
    music: 'investigation',
    ambience: 'earlApartment',
  },
  lorraineBrownstone: {
    music: 'investigation',
    ambience: 'lorraineBrownstone',
  },
  birdland: {
    music: 'emberRoom', // Similar vibe
    ambience: 'birdland',
  },
};

// Screen to audio mapping
export const SCREEN_AUDIO = {
  title: {
    music: 'mainTheme',
    ambience: null,
  },
  prologue: {
    music: 'mainTheme',
    ambience: null,
  },
  travel: {
    music: 'investigation',
    ambience: 'travel',
  },
  journal: {
    music: 'investigation',
    ambience: null,
  },
  timeline: {
    music: 'investigation',
    ambience: null,
  },
  accusation: {
    music: 'accusation',
    ambience: null,
  },
  ending: {
    music: null, // Set dynamically based on outcome
    ambience: null,
  },
};

// Audio trigger events
export const AUDIO_TRIGGERS = {
  CLUE_FOUND: 'clueFound',
  CLUE_INSPECT: 'clueInspect',
  DIALOGUE_ADVANCE: 'dialogueAdvance',
  REVELATION: 'revelation',
  SUSPICION: 'suspicion',
  CAUGHT_LYING: 'caught',
  CONFESSION: 'confession',
  WRONG_ACCUSATION: 'wrongAccusation',
  JAZZ_TRIVIA_CORRECT: 'jazzTrivia',
  JAZZ_TRIVIA_WRONG: 'jazzTriviaWrong',
  TIMELINE_PLACE: 'cardPlace',
  TIMELINE_PICKUP: 'cardPickup',
  TIMELINE_CONTRADICTION: 'contradiction',
  TIMELINE_VERIFIED: 'verified',
  MENU_HOVER: 'menuHover',
  MENU_SELECT: 'menuSelect',
  PAGE_FLIP: 'pageFlip',
};

// Default audio settings
export const DEFAULT_AUDIO_SETTINGS = {
  masterVolume: 0.8,
  musicVolume: 0.7,
  ambienceVolume: 0.6,
  sfxVolume: 0.8,
  muted: false,
  musicEnabled: true,
  ambienceEnabled: true,
  sfxEnabled: true,
};

// Crossfade durations (ms)
export const CROSSFADE_DURATIONS = {
  music: 2000,
  ambience: 1500,
  location: 2500,
};
