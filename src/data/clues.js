// Complete clue database for Jazz Detective
export const clues = {
  // === THE EMBER ROOM (Crime Scene) ===
  gamblingIOUs: {
    id: 'gamblingIOUs',
    name: 'Gambling IOUs',
    type: 'physical',
    description: 'A stack of IOUs in Earl\'s handwriting. He owed Teddy Olson $4,000. The paper is worn, some dated back months.',
    foundAt: 'emberRoom',
    significance: 'Establishes motive — Teddy was owed serious money.',
  },
  brokenGlass: {
    id: 'brokenGlass',
    name: 'Broken Glass with Lipstick',
    type: 'physical',
    description: 'Shattered highball glass near where they found Earl. Deep red lipstick on the rim. Ruthie\'s shade.',
    foundAt: 'emberRoom',
    significance: 'Places Ruthie at or near the crime scene.',
  },
  matchbook: {
    id: 'matchbook',
    name: 'Matchbook from The Starlight',
    type: 'physical',
    description: 'Found in Earl\'s coat pocket. The Starlight is the new club on 52nd Street — bigger room, better money. Someone wrote a phone number inside: MU 5-3890.',
    foundAt: 'emberRoom',
    significance: 'Earl was negotiating with a competing venue.',
  },
  rehearsalTape: {
    id: 'rehearsalTape',
    name: 'Rehearsal Tape',
    type: 'audio',
    description: 'A reel found in Earl\'s coat. Labeled "Quintet Rehearsal - Nov 65." Contains what sounds like an argument in the background.',
    foundAt: 'emberRoom',
    audioFile: '/audio/rehearsal-tape.mp3',
    significance: 'Audio evidence of confrontation.',
  },

  // === VAN GELDER'S STUDIO ===
  sessionLogs: {
    id: 'sessionLogs',
    name: 'Session Logs',
    type: 'physical',
    description: 'Rudy\'s meticulous session logs. November 14th: "Quintet session, 8PM-2AM. Marcus Whitmore (trumpet) arrived 7:45, departed 2:15." Timestamps don\'t lie.',
    foundAt: 'vanGelderStudio',
    significance: 'Confirms Snap\'s alibi — he was at the studio during the murder window.',
  },
  argumentTape: {
    id: 'argumentTape',
    name: 'Tape: Earl and Teddy Argument',
    type: 'audio',
    description: 'A tape Rudy didn\'t mean to keep recording. Earl and Teddy\'s voices, heated. "You\'ll get your money when I\'m dead, Teddy." "That can be arranged."',
    foundAt: 'vanGelderStudio',
    audioFile: '/audio/argument-tape.mp3',
    significance: 'Teddy threatened Earl on tape.',
  },
  snapArrangements: {
    id: 'snapArrangements',
    name: 'Stolen Arrangements',
    type: 'physical',
    description: 'Copies of Earl\'s arrangements in Snap\'s handwriting. He\'d been selling them to other bands. Earl found out — but Snap was at the studio all night.',
    foundAt: 'vanGelderStudio',
    significance: 'Snap had motive but also an airtight alibi.',
  },

  // === EARL'S APARTMENT ===
  lifeInsurance: {
    id: 'lifeInsurance',
    name: 'Life Insurance Policy',
    type: 'physical',
    description: 'A $10,000 policy on Earl\'s life. Beneficiary: Lorraine Jeffries. Dated three weeks ago. But there\'s a note in Earl\'s handwriting: "L — take this out. Just in case. T is getting dangerous."',
    foundAt: 'earlApartment',
    significance: 'Earl feared Teddy enough to get insurance. Clears Lorraine.',
  },
  loveLetters: {
    id: 'loveLetters',
    name: 'Love Letters',
    type: 'physical',
    description: 'Letters from a woman signed "S" — not Ruthie. "Earl, I\'ll leave him for you. Just say when." Looks like Earl was stepping out on his stepping out.',
    foundAt: 'earlApartment',
    significance: 'Earl had another woman. Ruthie found out.',
  },
  pawnTicket: {
    id: 'pawnTicket',
    name: 'Pawn Ticket',
    type: 'physical',
    description: 'From Morty\'s Pawn on 125th. Earl pawned a gold watch — Lorraine\'s gift to him, years ago. He was desperate for cash.',
    foundAt: 'earlApartment',
    significance: 'Earl was broke. The gambling debts were crushing him.',
  },
  threateningNote: {
    id: 'threateningNote',
    name: 'Threatening Note',
    type: 'physical',
    description: '"You owe me. Pay up or I take it out of your hide." Unsigned. But the handwriting... compare it to the IOUs.',
    foundAt: 'earlApartment',
    significance: 'Matches Teddy\'s handwriting on the IOUs.',
  },

  // === LORRAINE'S BROWNSTONE ===
  earlDatebook: {
    id: 'earlDatebook',
    name: 'Earl\'s Old Date Book',
    type: 'physical',
    description: 'From 1955. Lorraine kept it. Inside: appointments, gig schedules, and names of women. Lots of women. Lorraine circled them all in red ink.',
    foundAt: 'lorraineBrownstone',
    significance: 'Lorraine had years of grievances. But she also kept everything.',
  },
  locksmithReceipt: {
    id: 'locksmithReceipt',
    name: 'Locksmith Receipt',
    type: 'physical',
    description: 'Dated last month. Lorraine had her locks changed. "He kept coming by," she says. "I couldn\'t take it anymore."',
    foundAt: 'lorraineBrownstone',
    significance: 'Lorraine was trying to keep Earl out, not let him in.',
  },
  weddingPhotos: {
    id: 'weddingPhotos',
    name: 'Wedding Photos',
    type: 'physical',
    description: 'Earl and Lorraine, 1942. Young, hopeful, in love. She\'s kept them on the mantle all these years. Through everything.',
    foundAt: 'lorraineBrownstone',
    significance: 'Lorraine still loved him, despite it all.',
  },
  sisterTestimony: {
    id: 'sisterTestimony',
    name: 'Sister\'s Testimony',
    type: 'testimonial',
    description: 'Lorraine\'s sister Mae confirms: "Lorraine was here all night. We were playing cards until 2 AM. She didn\'t leave."',
    foundAt: 'lorraineBrownstone',
    significance: 'Lorraine has an alibi.',
  },

  // === BIRDLAND ===
  ruthiePhoto: {
    id: 'ruthiePhoto',
    name: 'Photo: Ruthie at Birdland',
    type: 'physical',
    description: 'A DownBeat photographer\'s outtake. Ruthie at a back table with a Prestige A&R man. Timestamped the night of the murder. She wasn\'t sick — she was making a deal.',
    foundAt: 'birdland',
    significance: 'Ruthie lied about where she went. But she was cutting her own deal, not killing Earl.',
  },
  chetSighting: {
    id: 'chetSighting',
    name: 'Witness: Chet at Birdland',
    type: 'testimonial',
    description: 'Symphony Sid saw Chet Malone here at Birdland around 11 PM. "Drinking alone, looked rough. Left before midnight." The murder was around 1 AM.',
    foundAt: 'birdland',
    significance: 'Chet was here, not at The Ember Room, during the crucial hours.',
  },
  gossipColumn: {
    id: 'gossipColumn',
    name: 'DownBeat Gossip Draft',
    type: 'physical',
    description: 'A draft column, not yet published. "Trouble at The Ember Room? Word is owner Teddy Olson\'s silent partners are getting impatient. Something about a loan coming due."',
    foundAt: 'birdland',
    significance: 'Teddy owed money to dangerous people. Earl\'s debt was his lifeline.',
  },
  starlightInfo: {
    id: 'starlightInfo',
    name: 'The Starlight Connection',
    type: 'testimonial',
    description: 'The DownBeat journalist confirms: The Starlight offered Earl a residency. Triple what he made at Teddy\'s. Earl was going to take it.',
    foundAt: 'birdland',
    significance: 'Teddy was about to lose Earl forever. The debt would never be paid.',
  },
};

export function getCluesByLocation(locationId) {
  return Object.values(clues).filter(clue => clue.foundAt === locationId);
}
