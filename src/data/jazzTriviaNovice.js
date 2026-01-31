// Jazz Trivia - Novice Mode
// Easier questions with hints for casual players

export const jazzTriviaNovice = {
  // === CATCH THE LIAR: Teddy's False Jazz Claims (EASIER) ===
  
  teddyKindOfBlueYear: {
    id: 'teddyKindOfBlueYear',
    type: 'catch_liar',
    character: 'Teddy Olson',
    setup: "Teddy tries to sound knowledgeable about jazz",
    // NOVICE: More obviously wrong (40s instead of late 50s)
    falseStatement: "Kind of Blue — that was recorded back in the '40s, right? Big band era. Earl used to play those charts.",
    correctAnswer: "1959",
    hint: "Kind of Blue is from the late 1950s, one of the most famous jazz albums ever made.",
    catchResponse: "Kind of Blue was recorded in 1959, not the '40s. That's twenty years off. You don't know jazz at all, do you, Teddy?",
    missResponse: null,
    consequence: "Teddy is rattled. He's been pretending to understand the music that built his club.",
    unlocksFlag: 'caught_teddy_jazz_lie_1',
    difficulty: 'novice',
  },

  teddyKindOfBlueDrummer: {
    id: 'teddyKindOfBlueDrummer',
    type: 'catch_liar',
    character: 'Teddy Olson',
    setup: "Teddy name-drops to seem legitimate",
    // NOVICE: Louis Armstrong is obviously NOT on Kind of Blue
    falseStatement: "Louis Armstrong — now THERE was a player. He played trumpet on Kind of Blue, you know. Earl worshipped him.",
    correctAnswer: "Miles Davis",
    hint: "Kind of Blue was Miles Davis's album. Louis Armstrong was a different generation entirely.",
    catchResponse: "Miles Davis played trumpet on Kind of Blue, not Louis Armstrong. That's like confusing The Beatles with Elvis. You're not one of us, Teddy.",
    missResponse: null,
    consequence: "Teddy's credibility crumbles. He's a businessman playing at being a jazz man.",
    unlocksFlag: 'caught_teddy_jazz_lie_2',
    difficulty: 'novice',
  },

  teddyTakeFiveComposer: {
    id: 'teddyTakeFiveComposer',
    type: 'catch_liar',
    character: 'Teddy Olson',
    setup: "Teddy tries to bond over music",
    // NOVICE: Wrong decade entirely
    falseStatement: "'Take Five' — that was a '70s disco hit, right? Revolutionary stuff. I understand the BUSINESS of jazz.",
    correctAnswer: "1959 Dave Brubeck Quartet",
    hint: "'Take Five' is a famous jazz instrumental from 1959, not disco at all.",
    catchResponse: "'Take Five' was recorded in 1959 by the Dave Brubeck Quartet. It's jazz, not disco. You really don't know this world, do you?",
    missResponse: null,
    consequence: "Every lie chips away at Teddy's facade. He's desperate to seem like one of us.",
    unlocksFlag: 'caught_teddy_jazz_lie_3',
    difficulty: 'novice',
  },

  // === PROVE YOUR KNOWLEDGE: Rudy Van Gelder Tests You (WITH HINTS) ===
  
  rudyFourAlbums1959: {
    id: 'rudyFourAlbums1959',
    type: 'knowledge_gate',
    character: 'Rudy Van Gelder',
    setup: "Rudy is protective of his studio and his recordings",
    // NOVICE: Multiple choice instead of open recall
    question: "Before I show you anything, I need to know you're really a musician. 1959 was the greatest year in jazz. Which of these albums was NOT from 1959?",
    choices: [
      { text: "Kind of Blue (Miles Davis)", isCorrect: false },
      { text: "Giant Steps (Coltrane)", isCorrect: false },
      { text: "A Love Supreme (Coltrane)", isCorrect: true, hint: "This was 1965" },
      { text: "Time Out (Dave Brubeck)", isCorrect: false },
    ],
    correctAnswer: "A Love Supreme",
    hint: "Three of these are from 1959. One is from 1965.",
    passResponse: "That's right. A Love Supreme was 1965. Kind of Blue, Giant Steps, and Time Out — all 1959. You know your history.",
    failResponse: "A real musician would know this. I'm not sure I can help you.",
    consequence: "Rudy trusts you enough to share the argument tape.",
    unlocksFlag: 'passed_rudy_test',
    unlocksTape: true,
    difficulty: 'novice',
  },

  // === PROVE YOUR KNOWLEDGE: Jimmy the Bartender (WITH HINTS) ===
  
  jimmyTakeFiveTest: {
    id: 'jimmyTakeFiveTest',
    type: 'knowledge_gate',
    character: 'Jimmy',
    setup: "Jimmy wants to know if you're really Earl's bassist",
    // NOVICE: Fill in the blank with first letter hint
    question: "Earl used to quiz us. 'Take Five' — who led the quartet that recorded it? Starts with 'B'...",
    correctAnswer: "Brubeck",
    altAnswers: ["Dave Brubeck", "Brubeck Quartet", "Dave Brubeck Quartet"],
    hint: "Dave B_____ led the quartet. Famous for odd time signatures.",
    passResponse: "Dave Brubeck. Good. Earl always said that cat changed what jazz could be.",
    failResponse: "That's not right. Earl's bassist would know that.",
    consequence: "Jimmy trusts you and tells you about Chet.",
    unlocksFlag: 'passed_jimmy_test',
    unlocksChetInfo: true,
    difficulty: 'novice',
  },

  // === PROVE YOUR KNOWLEDGE: Symphony Sid (WITH HINTS) ===
  
  sidColtraneQuartet: {
    id: 'sidColtraneQuartet',
    type: 'knowledge_gate',
    character: 'Symphony Sid',
    setup: "Sid tests your credentials before sharing gossip",
    // NOVICE: True/False instead of naming all four
    question: "You say you're investigating for the musicians. Quick — McCoy Tyner played piano in Coltrane's Classic Quartet. True or false?",
    correctAnswer: "True",
    hint: "McCoy Tyner was indeed Coltrane's pianist for years.",
    passResponse: "That's right. McCoy Tyner, Jimmy Garrison on bass, Elvin Jones on drums. You know your stuff. Alright, I'll tell you what I saw.",
    failResponse: "A session player for Earl and you don't know Coltrane's quartet? Get out of here.",
    consequence: "Sid tells you about Ruthie being at Birdland.",
    unlocksFlag: 'passed_sid_test',
    unlocksRuthieInfo: true,
    difficulty: 'novice',
  },

  // === Quote Attribution Challenge (EASIER) ===
  
  quoteChallenge1: {
    id: 'quoteChallenge1',
    type: 'quote_attribution',
    character: 'Pete Wilson',
    setup: "The journalist tests your jazz cred",
    // NOVICE: Multiple choice
    quote: "Don't play what's there, play what's not there.",
    choices: [
      { text: "Louis Armstrong", isCorrect: false },
      { text: "Miles Davis", isCorrect: true },
      { text: "Duke Ellington", isCorrect: false },
    ],
    correctAnswer: "Miles Davis",
    hint: "This quote is about playing with space and silence — very 'cool jazz'.",
    passResponse: "Miles Davis. You know your history. Maybe you can help me with this story after all.",
    failResponse: "Every musician knows that's Miles. Are you sure you played in Earl's band?",
    consequence: "Pete shares his investigation notes.",
    unlocksFlag: 'passed_journalist_test',
    difficulty: 'novice',
  },

  quoteChallenge2: {
    id: 'quoteChallenge2',
    type: 'quote_attribution',
    character: 'Lorraine Jeffries',
    setup: "Lorraine was a singer — she knows the greats",
    // NOVICE: Multiple choice
    quote: "The piano ain't got no wrong notes.",
    choices: [
      { text: "Thelonious Monk", isCorrect: true },
      { text: "Duke Ellington", isCorrect: false },
      { text: "Count Basie", isCorrect: false },
    ],
    correctAnswer: "Thelonious Monk",
    hint: "This pianist was known for unconventional, angular playing.",
    passResponse: "Monk. Earl loved to quote that one. Said it gave him permission to make mistakes.",
    failResponse: "I thought you were a musician. Every player knows that's Monk.",
    consequence: "Lorraine opens up about Earl's fears.",
    unlocksFlag: 'passed_lorraine_test',
    difficulty: 'novice',
  },
};

// Helper to get novice trivia for a character
export function getNoviceTriviaForCharacter(characterName) {
  return Object.values(jazzTriviaNovice).filter(
    check => check.character === characterName
  );
}

// Export difficulty descriptions
export const noviceDifficultyInfo = {
  novice: "Hints provided to guide your answer",
  medium: "Some guidance available",
};
