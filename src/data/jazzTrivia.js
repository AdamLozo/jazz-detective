// Jazz Trivia Challenges for Jazz Detective
// Expert-level knowledge required to catch liars and prove you're a real musician

export const jazzTriviaChecks = {
  // === CATCH THE LIAR: Teddy's False Jazz Claims ===
  
  teddyKindOfBlueYear: {
    id: 'teddyKindOfBlueYear',
    type: 'catch_liar',
    character: 'Teddy Olson',
    setup: "Teddy tries to sound knowledgeable about jazz",
    falseStatement: "Kind of Blue — that was '57, right? Earl used to play those charts all the time.",
    correctAnswer: "1959",
    catchResponse: "Kind of Blue was recorded in 1959, not '57. You don't know jazz at all, do you, Teddy?",
    missResponse: null, // Player doesn't challenge
    consequence: "Teddy is rattled. He's been pretending to understand the music that built his club.",
    unlocksFlag: 'caught_teddy_jazz_lie_1',
    difficulty: 'hard',
  },

  teddyKindOfBlueDrummer: {
    id: 'teddyKindOfBlueDrummer',
    type: 'catch_liar',
    character: 'Teddy Olson',
    setup: "Teddy name-drops to seem legitimate",
    falseStatement: "Art Blakey — now THERE was a drummer. He played on Kind of Blue, you know. Earl worshipped him.",
    correctAnswer: "Jimmy Cobb",
    catchResponse: "Jimmy Cobb played drums on Kind of Blue, not Art Blakey. For a club owner, you don't know much about the music.",
    missResponse: null,
    consequence: "Teddy's credibility crumbles. He's a businessman playing at being a jazz man.",
    unlocksFlag: 'caught_teddy_jazz_lie_2',
    difficulty: 'hard',
  },

  teddyTakeFiveComposer: {
    id: 'teddyTakeFiveComposer',
    type: 'catch_liar',
    character: 'Teddy Olson',
    setup: "Teddy tries to bond over music",
    falseStatement: "Dave Brubeck wrote 'Take Five' — changed everything. Five-four time. Revolutionary.",
    correctAnswer: "Paul Desmond",
    catchResponse: "Paul Desmond wrote 'Take Five,' not Brubeck. He just played piano on it. You really don't know this world, do you?",
    missResponse: null,
    consequence: "Every lie chips away at Teddy's facade. He's desperate to seem like one of us.",
    unlocksFlag: 'caught_teddy_jazz_lie_3',
    difficulty: 'medium',
  },

  // === PROVE YOUR KNOWLEDGE: Rudy Van Gelder Tests You ===
  
  rudyFourAlbums1959: {
    id: 'rudyFourAlbums1959',
    type: 'knowledge_gate',
    character: 'Rudy Van Gelder',
    setup: "Rudy is protective of his studio and his recordings",
    question: "Before I show you anything, I need to know you're really a musician. 1959 was the greatest year in jazz history. Name the four landmark albums recorded that year.",
    correctAnswers: ['Kind of Blue', 'Giant Steps', 'Time Out', 'The Shape of Jazz to Come'],
    partialCredit: 3, // Need at least 3 correct
    passResponse: "That's right. Kind of Blue, Giant Steps, Time Out, and The Shape of Jazz to Come. All in one year. You know your history.",
    failResponse: "A real musician would know this. I'm not sure I can help you.",
    consequence: "Rudy trusts you enough to share the argument tape.",
    unlocksFlag: 'passed_rudy_test',
    unlocksTape: true,
    difficulty: 'hard',
  },

  rudyBillEvansIntro: {
    id: 'rudyBillEvansIntro',
    type: 'knowledge_gate',
    character: 'Rudy Van Gelder',
    setup: "Rudy tests your depth of knowledge",
    question: "Who wrote the haunting piano introduction to 'So What' on Kind of Blue? Most people get this wrong.",
    correctAnswer: "Bill Evans",
    altAnswers: ["Bill Evans with Gil Evans arranging", "Bill Evans and Gil Evans"],
    passResponse: "Bill Evans, that's right. Though Gil Evans helped with the arrangement. Most people think Miles wrote everything.",
    failResponse: "Not quite. Come back when you've done your homework.",
    consequence: "Rudy respects your knowledge and opens up.",
    unlocksFlag: 'passed_rudy_advanced',
    difficulty: 'expert',
  },

  // === PROVE YOUR KNOWLEDGE: Jimmy the Bartender ===
  
  jimmyTakeFiveTest: {
    id: 'jimmyTakeFiveTest',
    type: 'knowledge_gate',
    character: 'Jimmy',
    setup: "Jimmy wants to know if you're really Earl's bassist",
    question: "Earl used to quiz us on this. 'Take Five' — who actually composed it? Not who played it. Who WROTE it?",
    correctAnswer: "Paul Desmond",
    passResponse: "Paul Desmond. Good. Earl always said the world gave Brubeck too much credit.",
    failResponse: "That's not right. Earl's bassist would know that.",
    consequence: "Jimmy trusts you and tells you about Chet.",
    unlocksFlag: 'passed_jimmy_test',
    unlocksChetInfo: true,
    difficulty: 'medium',
  },

  // === PROVE YOUR KNOWLEDGE: Chet Malone's Sobriety Test ===
  
  chetLoveSupremeMovements: {
    id: 'chetLoveSupremeMovements',
    type: 'knowledge_gate',
    character: 'Chet Malone',
    setup: "Chet needs to prove his mind is sharp despite his troubles",
    question: "They say I'm washed up. That my mind's gone. Ask me anything. A Love Supreme — how many movements, and what are they called?",
    correctAnswers: ['Acknowledgement', 'Resolution', 'Pursuance', 'Psalm'],
    partialCredit: 4, // Need all 4
    passResponse: "Four movements: Acknowledgement, Resolution, Pursuance, Psalm. My mind's still sharp. I know what I saw that night.",
    playerMustAnswer: false, // Chet is proving himself, not being tested
    consequence: "Chet's testimony becomes more credible — he's clear-headed.",
    validatesTestimony: true,
    difficulty: 'hard',
  },

  // === CATCH THE LIAR: Symphony Sid ===
  
  sidColtraneQuartet: {
    id: 'sidColtraneQuartet',
    type: 'knowledge_gate',
    character: 'Symphony Sid',
    setup: "Sid tests your credentials before sharing gossip",
    question: "You say you're investigating for the musicians. Name Coltrane's Classic Quartet. All four. A real sideman would know.",
    correctAnswers: ['John Coltrane', 'McCoy Tyner', 'Jimmy Garrison', 'Elvin Jones'],
    partialCredit: 3, // Coltrane obvious, need 3 of the rhythm section
    passResponse: "Coltrane, McCoy Tyner, Jimmy Garrison, Elvin Jones. You know your stuff. Alright, I'll tell you what I saw.",
    failResponse: "A session player for Earl and you can't name Coltrane's quartet? Get out of here.",
    consequence: "Sid tells you about Ruthie being at Birdland.",
    unlocksFlag: 'passed_sid_test',
    unlocksRuthieInfo: true,
    difficulty: 'medium',
  },

  // === EXPERT LEVEL: Van Gelder Studio Knowledge ===
  
  rudyStudioHeight: {
    id: 'rudyStudioHeight',
    type: 'bonus',
    character: 'Rudy Van Gelder',
    setup: "Rudy respects those who truly understand recording",
    question: "You've been here before. You know this room. How high is the ceiling?",
    correctAnswer: "39 feet",
    altAnswers: ["39", "thirty-nine feet", "thirty nine"],
    passResponse: "39 feet exactly. The cathedral ceiling gives us that natural reverb. You're the real thing.",
    failResponse: "Musicians don't usually know that. But then, most musicians don't ask the right questions.",
    consequence: "Rudy shares additional insights about Teddy's visits.",
    unlocksFlag: 'rudy_studio_expert',
    bonusClue: true,
    difficulty: 'expert',
  },

  // === EXPERT LEVEL: Industry Knowledge ===
  
  rudyOriginalProfession: {
    id: 'rudyOriginalProfession',
    type: 'bonus',
    character: 'Narrator',
    setup: "Your knowledge of jazz history is tested",
    question: "The man in front of you recorded Kind of Blue, A Love Supreme, and hundreds of other masterpieces. But before he was an engineer, what was his profession?",
    correctAnswer: "Optometrist",
    passResponse: "You remember that Rudy was an optometrist before he dedicated his life to recording. This is a man who sees details others miss.",
    failResponse: null, // Internal narration, no failure
    consequence: "Unlocks bonus dialogue about Rudy's meticulous nature.",
    unlocksFlag: 'know_rudy_history',
    difficulty: 'expert',
  },

  // === Quote Attribution Challenge ===
  
  quoteChallenge1: {
    id: 'quoteChallenge1',
    type: 'quote_attribution',
    character: 'Pete Wilson',
    setup: "The journalist tests your jazz cred",
    quote: "Don't play what's there, play what's not there.",
    correctAnswer: "Miles Davis",
    passResponse: "Miles Davis. You know your history. Maybe you can help me with this story after all.",
    failResponse: "Every musician knows that's Miles. Are you sure you played in Earl's band?",
    consequence: "Pete shares his investigation notes.",
    unlocksFlag: 'passed_journalist_test',
    difficulty: 'medium',
  },

  quoteChallenge2: {
    id: 'quoteChallenge2',
    type: 'quote_attribution',
    character: 'Lorraine Jeffries',
    setup: "Lorraine was a singer — she knows the greats",
    quote: "The piano ain't got no wrong notes.",
    correctAnswer: "Thelonious Monk",
    passResponse: "Monk. Earl loved to quote that one. Said it gave him permission to make mistakes.",
    failResponse: "I thought you were a musician. Every player knows that's Monk.",
    consequence: "Lorraine opens up about Earl's fears.",
    unlocksFlag: 'passed_lorraine_test',
    difficulty: 'medium',
  },

  // === Critical Path: Accusation Requirements ===
  // Player must pass at least 3 jazz checks AND catch at least 1 of Teddy's lies
  // to access the "true ending" with full evidence against Teddy
};

// Helper to check if player can access true ending
export function canAccessTrueEnding(jazzKnowledgePassed) {
  const teddyLiesCaught = [
    'caught_teddy_jazz_lie_1',
    'caught_teddy_jazz_lie_2', 
    'caught_teddy_jazz_lie_3',
  ].filter(flag => jazzKnowledgePassed.includes(flag)).length;
  
  const checksPassedCount = jazzKnowledgePassed.length;
  
  return teddyLiesCaught >= 1 && checksPassedCount >= 3;
}

// Helper to get all available trivia for a character
export function getTriviaForCharacter(characterName) {
  return Object.values(jazzTriviaChecks).filter(
    check => check.character === characterName
  );
}

// Difficulty descriptions for UI
export const difficultyInfo = {
  medium: "Requires solid jazz knowledge",
  hard: "Requires deep jazz expertise", 
  expert: "Only true connoisseurs will know this",
};
