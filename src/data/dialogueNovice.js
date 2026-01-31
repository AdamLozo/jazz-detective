// Novice Mode Dialogue Trees
// Easier trivia questions with hints for casual players

export const dialogueTreesNovice = {
  // ============================================================
  // TEDDY OLSON - NOVICE MODE TRIVIA (Easier lies to catch)
  // ============================================================
  
  // === TEDDY'S JAZZ KNOWLEDGE TEST - Novice Version ===
  teddyJazzTest: {
    speaker: 'Teddy Olson',
    // NOVICE: Claims Kind of Blue was in the 40s (obviously wrong)
    text: "Knew it? I LIVED it. Twenty years of jazz in this room. Kind of Blue — that was recorded back in the '40s, right? Big band era. Earl used to play those charts.",
    isJazzTrivia: true,
    triviaId: 'teddyKindOfBlueYear',
    triviaHint: "Kind of Blue is one of the most famous jazz albums — from the late 1950s, not the big band era.",
    responses: [
      { text: "Kind of Blue was 1959, not the '40s. You're twenty years off.", next: 'teddyCaughtLie1', passesCheck: 'caught_teddy_jazz_lie_1' },
      { text: "Yeah, the '40s... big band times.", next: 'teddyJazzContinue', failsCheck: 'missed_teddy_lie_1' },
      { text: "Never mind the music. Where were you?", next: 'teddyAlibi' },
    ],
  },
  
  teddyCaughtLie1: {
    speaker: 'Teddy Olson',
    text: "I... Look, I'm not a musician. I'm a businessman. But I know what sells. I know what puts bodies in seats.",
    setsFlag: 'caught_teddy_jazz_lie_1',
    responses: [
      { text: "A businessman who doesn't know his product. Interesting.", next: 'teddyJazzContinue2' },
    ],
  },
  
  teddyJazzContinue: {
    speaker: 'Teddy Olson',
    // NOVICE: Claims Louis Armstrong played on Kind of Blue (obviously wrong)
    text: "Louis Armstrong — now THERE was a player. He played trumpet on Kind of Blue, you know. Earl worshipped him.",
    isJazzTrivia: true,
    triviaId: 'teddyKindOfBlueDrummer',
    triviaHint: "Kind of Blue was Miles Davis's album. Louis Armstrong was from a completely different era.",
    responses: [
      { text: "Miles Davis played trumpet on Kind of Blue, not Louis Armstrong. That's embarrassing.", next: 'teddyCaughtLie2', passesCheck: 'caught_teddy_jazz_lie_2' },
      { text: "Armstrong was a legend.", next: 'teddyJazzContinue3', failsCheck: 'missed_teddy_lie_2' },
    ],
  },
  
  teddyCaughtLie2: {
    speaker: 'Teddy Olson',
    text: "Alright, alright! So I mix up a few names. What does that prove?",
    setsFlag: 'caught_teddy_jazz_lie_2',
    responses: [
      { text: "It proves you're not one of us. Never were.", next: 'teddyJazzContinue3' },
    ],
  },
  
  teddyJazzContinue2: {
    speaker: 'Teddy Olson',
    // NOVICE: Claims Take Five was 70s disco (obviously wrong)
    text: "Look, 'Take Five' — that was a '70s disco hit, right? Revolutionary stuff. I understand the BUSINESS of jazz.",
    isJazzTrivia: true,
    triviaId: 'teddyTakeFiveComposer',
    triviaHint: "'Take Five' is a famous 1959 jazz instrumental by the Dave Brubeck Quartet — definitely not disco.",
    responses: [
      { text: "'Take Five' was 1959 jazz, not '70s disco. Strike three, Teddy.", next: 'teddyCaughtLie3', passesCheck: 'caught_teddy_jazz_lie_3' },
      { text: "Disco was revolutionary.", next: 'teddyExposedEnd', failsCheck: 'missed_teddy_lie_3' },
    ],
  },
  
  teddyJazzContinue3: {
    speaker: 'Teddy Olson',
    text: "You know what? I don't need to prove anything to you. I built this club. I made Earl Jeffries a star in Harlem.",
    responses: [
      { text: "And now he's dead. Let's talk about that.", next: 'teddyAlibi' },
    ],
  },
  
  teddyCaughtLie3: {
    speaker: 'Teddy Olson',
    text: "ENOUGH! I don't need to know who recorded what! I know money. I know debts. And Earl owed me.",
    setsFlag: 'caught_teddy_jazz_lie_3',
    responses: [
      { text: "Now we're getting somewhere. Tell me about those debts.", next: 'teddyDebtExposed' },
      { text: "Three lies about jazz in three minutes. You're a fraud, Teddy.", next: 'teddyMoneyMotive' },
    ],
  },

  // ============================================================
  // RUDY VAN GELDER - NOVICE MODE (Multiple Choice)
  // ============================================================
  
  rudyTest: {
    speaker: 'Rudy Van Gelder',
    text: "Before I show you anything, I need to know you're really a musician. 1959 was the greatest year in jazz. Which of these albums was NOT from 1959?",
    isJazzTrivia: true,
    triviaId: 'rudyFourAlbums1959',
    triviaHint: "Three of these are from 1959. One is from 1965 — Coltrane's spiritual masterpiece.",
    responses: [
      { text: "Kind of Blue (Miles Davis)", next: 'rudyTestFail', failsCheck: 'failed_rudy_test' },
      { text: "Giant Steps (Coltrane)", next: 'rudyTestFail', failsCheck: 'failed_rudy_test' },
      { text: "A Love Supreme (Coltrane) — that was 1965", next: 'rudyTestPass', passesCheck: 'passed_rudy_test' },
      { text: "Time Out (Dave Brubeck)", next: 'rudyTestFail', failsCheck: 'failed_rudy_test' },
    ],
  },
  
  rudyTestPass: {
    speaker: 'Rudy Van Gelder',
    text: "That's right. A Love Supreme was 1965. Kind of Blue, Giant Steps, and Time Out — all 1959. You know your history. Come, let me show you something.",
    setsFlag: 'passed_rudy_test',
    responses: [
      { text: "What do you have?", next: 'rudyShowsTape' },
    ],
  },
  
  rudyTestFail: {
    speaker: 'Rudy Van Gelder',
    text: "A Love Supreme was 1965, not 1959. A real musician would know this. I'm not sure I can help you.",
    setsFlag: 'failed_rudy_test',
    responses: [
      { text: "Give me another chance.", next: 'rudySecondChance' },
      { text: "I'll come back when I've done my homework.", next: null },
    ],
  },
  
  rudySecondChance: {
    speaker: 'Rudy Van Gelder',
    text: "Fine. One more. Who led the quartet that recorded 'Take Five'? First name starts with 'D'...",
    isJazzTrivia: true,
    triviaHint: "Dave B_____ — known for odd time signatures.",
    responses: [
      { text: "Dave Brubeck", next: 'rudyTestPass', passesCheck: 'passed_rudy_test' },
      { text: "Duke Ellington", next: 'rudyFinalFail', failsCheck: 'failed_rudy_final' },
      { text: "Dizzy Gillespie", next: 'rudyFinalFail', failsCheck: 'failed_rudy_final' },
    ],
  },
  
  rudyFinalFail: {
    speaker: 'Rudy Van Gelder',
    text: "Dave Brubeck. Come back when you've listened to more records.",
    responses: [
      { text: "[Leave]", next: null },
    ],
  },

  // ============================================================
  // JIMMY THE BARTENDER - NOVICE MODE
  // ============================================================
  
  jimmyTriviaTest: {
    speaker: 'Jimmy',
    text: "Earl used to quiz us. 'Take Five' — who led the quartet that recorded it? Starts with 'B'...",
    isJazzTrivia: true,
    triviaId: 'jimmyTakeFiveTest',
    triviaHint: "Dave B_____ — famous for playing in unusual time signatures like 5/4.",
    responses: [
      { text: "Dave Brubeck", next: 'jimmyTestPass', passesCheck: 'passed_jimmy_test' },
      { text: "Art Blakey", next: 'jimmyTestFail', failsCheck: 'failed_jimmy_test' },
      { text: "I don't know jazz history.", next: 'jimmyTestFail', failsCheck: 'failed_jimmy_test' },
    ],
  },
  
  jimmyTestPass: {
    speaker: 'Jimmy',
    text: "Dave Brubeck. Good. Earl always said that cat changed what jazz could be. Listen, there's something you should know about that night...",
    setsFlag: 'passed_jimmy_test',
    responses: [
      { text: "I'm listening.", next: 'jimmyRevealsChet' },
    ],
  },
  
  jimmyTestFail: {
    speaker: 'Jimmy',
    text: "Brubeck. Dave Brubeck. Earl's bassist would know that. Who are you really?",
    responses: [
      { text: "I'm investigating Earl's death. That's what matters.", next: 'jimmyReluctantHelp' },
    ],
  },

  // ============================================================
  // SYMPHONY SID - NOVICE MODE (True/False)
  // ============================================================
  
  sidTriviaTest: {
    speaker: 'Symphony Sid',
    text: "You say you're investigating for the musicians. Quick — McCoy Tyner played piano in Coltrane's Classic Quartet. True or false?",
    isJazzTrivia: true,
    triviaId: 'sidColtraneQuartet',
    triviaHint: "McCoy Tyner was Coltrane's pianist for years. This one's straightforward.",
    responses: [
      { text: "True. McCoy Tyner was Coltrane's pianist.", next: 'sidTestPass', passesCheck: 'passed_sid_test' },
      { text: "False.", next: 'sidTestFail', failsCheck: 'failed_sid_test' },
      { text: "I don't know Coltrane's sidemen.", next: 'sidTestFail', failsCheck: 'failed_sid_test' },
    ],
  },
  
  sidTestPass: {
    speaker: 'Symphony Sid',
    text: "That's right. McCoy Tyner, Jimmy Garrison on bass, Elvin Jones on drums. You know your stuff. Alright, I'll tell you what I saw at Birdland that night...",
    setsFlag: 'passed_sid_test',
    responses: [
      { text: "What did you see?", next: 'sidRevealsRuthie' },
    ],
  },
  
  sidTestFail: {
    speaker: 'Symphony Sid',
    text: "Of course it's true. McCoy Tyner, Jimmy Garrison, Elvin Jones. A session player for Earl and you don't know Coltrane's quartet?",
    responses: [
      { text: "I know enough. What did you see at Birdland?", next: 'sidReluctantHelp' },
    ],
  },

  // ============================================================
  // PETE WILSON (JOURNALIST) - NOVICE MODE (Multiple Choice)
  // ============================================================
  
  peteQuoteTest: {
    speaker: 'Pete Wilson',
    text: "'Don't play what's there, play what's not there.' Who said that? I need to know you're legit.",
    isJazzTrivia: true,
    triviaId: 'quoteChallenge1',
    triviaHint: "This quote is about playing with space and silence — very 'cool jazz'. Think of the coolest cat of them all.",
    responses: [
      { text: "Louis Armstrong", next: 'peteTestFail', failsCheck: 'failed_journalist_test' },
      { text: "Miles Davis", next: 'peteTestPass', passesCheck: 'passed_journalist_test' },
      { text: "Duke Ellington", next: 'peteTestFail', failsCheck: 'failed_journalist_test' },
    ],
  },
  
  peteTestPass: {
    speaker: 'Pete Wilson',
    text: "Miles Davis. You know your history. Maybe you can help me with this story after all. I've been investigating Teddy's finances...",
    setsFlag: 'passed_journalist_test',
    responses: [
      { text: "Tell me what you've found.", next: 'peteRevealsInvestigation' },
    ],
  },
  
  peteTestFail: {
    speaker: 'Pete Wilson',
    text: "That's Miles Davis. Every musician knows that quote. Are you sure you played in Earl's band?",
    responses: [
      { text: "I know enough about the music. What about Teddy?", next: 'peteReluctantHelp' },
    ],
  },

  // ============================================================
  // LORRAINE JEFFRIES - NOVICE MODE (Multiple Choice)
  // ============================================================
  
  lorraineQuoteTest: {
    speaker: 'Lorraine Jeffries',
    text: "'The piano ain't got no wrong notes.' Earl used to quote that all the time. Do you know who said it?",
    isJazzTrivia: true,
    triviaId: 'quoteChallenge2',
    triviaHint: "This pianist was known for unconventional, angular playing. Starts with 'M'.",
    responses: [
      { text: "Thelonious Monk", next: 'lorraineTestPass', passesCheck: 'passed_lorraine_test' },
      { text: "Duke Ellington", next: 'lorraineTestFail', failsCheck: 'failed_lorraine_test' },
      { text: "Count Basie", next: 'lorraineTestFail', failsCheck: 'failed_lorraine_test' },
    ],
  },
  
  lorraineTestPass: {
    speaker: 'Lorraine Jeffries',
    text: "Monk. Earl loved that quote. Said it gave him permission to make mistakes, to take risks. He was taking a big risk leaving Teddy's club...",
    setsFlag: 'passed_lorraine_test',
    responses: [
      { text: "What kind of risk?", next: 'lorraineRevealsEarlFear' },
    ],
  },
  
  lorraineTestFail: {
    speaker: 'Lorraine Jeffries',
    text: "That's Thelonious Monk. Earl quoted him every day. I thought you were his bassist.",
    responses: [
      { text: "I knew Earl the man, not just his quotes. What was he afraid of?", next: 'lorraineReluctantHelp' },
    ],
  },
};

// Export function to get novice dialogue by node ID
export function getNoviceDialogueNode(nodeId) {
  return dialogueTreesNovice[nodeId] || null;
}
