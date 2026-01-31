// All locations in Jazz Detective
export const locations = {
  emberRoom: {
    id: 'emberRoom',
    name: 'The Ember Room',
    subtitle: 'Harlem Jazz Club — Crime Scene',
    timeOfDay: '4:23 AM',
    description: `The stage is dark now. Earl's piano sits silent under a single work light, lid still open like a mouth frozen mid-word.

The cops have cleared out, left their chalk and their tape and their indifference. Teddy Olson hovers near the bar, watching you. The bartender polishes glasses that don't need polishing. A waitress in the corner won't meet your eyes.

The back room door is open. That's where they found him.`,
    examinableAreas: [
      {
        id: 'backRoom',
        name: 'The Back Room',
        description: 'The door to the back room stands open. Yellow tape across the frame.',
        onExamine: 'backRoomDetail',
      },
      {
        id: 'piano',
        name: "Earl's Piano",
        description: 'The Steinway grand where Earl played his last set.',
        onExamine: 'pianoDetail',
      },
      {
        id: 'bar',
        name: 'The Bar',
        description: 'Long mahogany bar. Jimmy stands behind it, waiting.',
        onExamine: 'barDetail',
      },
    ],
    characters: ['teddy', 'bartender', 'waitress'],
    unlocked: true,
  },

  vanGelderStudio: {
    id: 'vanGelderStudio',
    name: "Van Gelder's Studio",
    subtitle: 'Hackensack, New Jersey',
    timeOfDay: '7:15 AM',
    description: `The drive to Hackensack takes forty minutes in the gray dawn light. Rudy Van Gelder's house looks like any other split-level in the suburbs. But that living room has made history.

Rudy meets you at the door, already awake. Engineers keep strange hours. His glasses catch the light as he leads you inside.

"I heard about Earl," he says. "Terrible thing. He was here just last week."

The studio smells like tape and coffee. Reels are stacked everywhere, each one a piece of jazz history.`,
    examinableAreas: [
      {
        id: 'sessionLogs',
        name: 'Session Logs',
        description: 'Rudy\'s meticulous records of every session. Dates, times, personnel.',
        onExamine: 'sessionLogsDetail',
      },
      {
        id: 'tapeArchive',
        name: 'Tape Archive',
        description: 'Hundreds of reels, organized by date. Some sessions never released.',
        onExamine: 'tapeArchiveDetail',
      },
      {
        id: 'mixingDesk',
        name: 'Mixing Desk',
        description: 'Custom-built console. Rudy\'s pride and joy.',
        onExamine: 'mixingDeskDetail',
      },
    ],
    characters: ['rudy', 'snap'],
    unlocked: false,
    unlocksWhen: 'visited_ember_room',
  },

  earlApartment: {
    id: 'earlApartment',
    name: "Earl's Apartment",
    subtitle: 'Upper West Side, Manhattan',
    timeOfDay: '9:30 AM',
    description: `The super lets you in with a master key. "Cops already been through," he says. "Made a mess." He's not wrong.

Earl's apartment has been ransacked. Drawers pulled out, cushions slashed, papers scattered. Someone was looking for something. The cops? Or someone else?

The piano in the corner is untouched. Even thieves respect some things.

Morning light filters through dusty blinds. Earl's whole life is in this room — awards on the walls, photos with legends, and secrets in the desk.`,
    examinableAreas: [
      {
        id: 'desk',
        name: 'Writing Desk',
        description: 'Drawers hanging open, papers everywhere. But not everything was found.',
        onExamine: 'deskDetail',
      },
      {
        id: 'bedroom',
        name: 'Bedroom',
        description: 'Mattress slashed. Closet emptied. Someone was thorough.',
        onExamine: 'bedroomDetail',
      },
      {
        id: 'phonograph',
        name: 'Phonograph & Records',
        description: 'Earl\'s collection. Test pressings, rare sides, memories.',
        onExamine: 'phonographDetail',
      },
    ],
    characters: ['buildingSuper', 'neighbor'],
    unlocked: false,
    unlocksWhen: 'found_apartment_key',
  },

  lorraineBrownstone: {
    id: 'lorraineBrownstone',
    name: "Lorraine's Brownstone",
    subtitle: 'Harlem, Manhattan',
    timeOfDay: '11:45 AM',
    description: `The brownstone is beautiful. Three stories of carved stone and tall windows. This was supposed to be their forever home.

Lorraine answers the door herself. She's been crying, but her back is straight. A singer's posture, even now.

"I wondered when you'd come," she says. "You were always the smart one in that band."

The parlor is immaculate. Photos on every surface — Earl in younger days, their wedding, happier times. She hasn't erased him. Not yet.`,
    examinableAreas: [
      {
        id: 'parlor',
        name: 'Parlor',
        description: 'Elegant room, full of memories. Photos, mementos, a life preserved.',
        onExamine: 'parlorDetail',
      },
      {
        id: 'kitchen',
        name: 'Kitchen',
        description: 'Where Lorraine\'s sister Mae is making coffee. She knows things.',
        onExamine: 'kitchenDetail',
      },
      {
        id: 'musicRoom',
        name: 'Music Room',
        description: 'Lorraine\'s old practice room. Sheet music still on the stand.',
        onExamine: 'musicRoomDetail',
      },
    ],
    characters: ['lorraine', 'mae'],
    unlocked: false,
    unlocksWhen: 'learned_about_lorraine',
  },

  birdland: {
    id: 'birdland',
    name: 'Birdland',
    subtitle: '52nd Street, Manhattan — "The Jazz Corner of the World"',
    timeOfDay: '2:30 PM',
    description: `Even in the afternoon, Birdland has a pulse. The chairs are up on tables, but the ghosts of a thousand sessions linger in the air.

Symphony Sid is at his usual booth, nursing coffee and a hangover. A DownBeat journalist scribbles in a notebook. A few musicians wait for the evening's rehearsal.

This is where the jazz world trades secrets. If something happened, someone here knows about it.

The famous neon sign flickers, even in daylight. "BIRDLAND" in red and blue. Bird's spirit lives here.`,
    examinableAreas: [
      {
        id: 'sidsBooth',
        name: "Symphony Sid's Booth",
        description: 'The legendary DJ holds court here. He knows everyone\'s business.',
        onExamine: 'sidsBoothDetail',
      },
      {
        id: 'pressTable',
        name: 'Press Table',
        description: 'Where the DownBeat writers gather. Gossip central.',
        onExamine: 'pressTableDetail',
      },
      {
        id: 'backBar',
        name: 'Back Bar',
        description: 'Quieter corner. Good for private conversations.',
        onExamine: 'backBarDetail',
      },
    ],
    characters: ['symphonySid', 'journalist', 'ruthie', 'chet'],
    unlocked: false,
    unlocksWhen: 'need_more_witnesses',
  },
};

export const examineDetails = {
  // === EMBER ROOM ===
  backRoomDetail: {
    title: 'The Back Room',
    text: `You duck under the tape.

A small office. Desk, safe, filing cabinet. Earl's blood has dried to rust on the concrete floor. The chalk outline is shaped wrong — arms up, like he was trying to protect himself.

On the desk: scattered papers, an overturned ashtray, a broken glass. The safe is open and empty.

Something glints under the desk.`,
    cluesAvailable: ['gamblingIOUs', 'brokenGlass'],
  },
  pianoDetail: {
    title: "Earl's Piano",
    text: `You run your fingers along the keys without pressing them. This Steinway has been Earl's voice for twenty years.

Earl's coat is still draped over the bench. The cops didn't take it. You check the pockets.

Inside: a handkerchief, some loose change, and...`,
    cluesAvailable: ['matchbook', 'rehearsalTape'],
  },
  barDetail: {
    title: 'The Bar',
    text: `Bottles catch the low light. Jimmy watches you approach, his expression unreadable.

"Bourbon?" he asks. It's what Earl drank.

The bar is clean, glasses polished. Jimmy takes pride in his work. He's also been standing here all night, watching everything.`,
    cluesAvailable: [],
  },

  // === VAN GELDER'S STUDIO ===
  sessionLogsDetail: {
    title: 'Session Logs',
    text: `Rudy's logs are legendary. Every session, every take, every musician. Dates, times, who arrived when, who left when.

You flip to last week. November 14th — the night Earl died.

"Quintet session, 8PM-2AM. Marcus Whitmore arrived 7:45PM, departed 2:15AM."

Snap was here all night. Miles away from Harlem.`,
    cluesAvailable: ['sessionLogs'],
  },
  tapeArchiveDetail: {
    title: 'Tape Archive',
    text: `Hundreds of reels, maybe thousands. Each one labeled in Rudy's precise handwriting.

"I keep everything," Rudy says. "Even the mistakes. Especially the mistakes."

You find a reel labeled "MISC - Nov 58." Something about it...

"Oh, that one," Rudy says, suddenly uncomfortable. "I wasn't supposed to record that. The machine was still running after a session. Earl and... someone came in. Didn't know they were being recorded."`,
    cluesAvailable: ['argumentTape'],
  },
  mixingDeskDetail: {
    title: 'Mixing Desk',
    text: `The console is a work of art. Hand-wired, custom-built. This is where Rudy shapes the sound that defined an era.

On the desk: scattered sheet music. You recognize the arrangements — Earl's work. But there are copies in a different hand.

"Those are Snap's copies," Rudy says carefully. "He was... studying Earl's technique."

Studying. Or stealing?`,
    cluesAvailable: ['snapArrangements'],
  },

  // === EARL'S APARTMENT ===
  deskDetail: {
    title: 'Writing Desk',
    text: `The desk is a mess, but some things survived the search. In a hidden compartment — the cops missed it, but you know Earl's tricks — you find papers.

An insurance policy. A threatening note. And something that makes your blood run cold.`,
    cluesAvailable: ['lifeInsurance', 'threateningNote'],
  },
  bedroomDetail: {
    title: 'Bedroom',
    text: `The mattress has been slashed, stuffing everywhere. Clothes pulled from the closet.

In a shoebox pushed under the radiator — overlooked — you find letters. Love letters. And a pawn ticket.

Earl was more desperate than anyone knew.`,
    cluesAvailable: ['loveLetters', 'pawnTicket'],
  },
  phonographDetail: {
    title: 'Phonograph & Records',
    text: `Earl's record collection is intact. Test pressings, rare 78s, memories pressed in vinyl.

There's nothing here the killer wanted. Just a life in music.

A photo tucked into a record sleeve: Earl and his quintet, better days. You're in it. So is Snap. So is Chet, before the falling out.`,
    cluesAvailable: [],
  },

  // === LORRAINE'S BROWNSTONE ===
  parlorDetail: {
    title: 'Parlor',
    text: `Photos everywhere. Earl accepting an award. Earl shaking hands with Duke Ellington. Earl and Lorraine on their wedding day.

On the mantle, newer items: a locksmith's receipt. Earl's old date book from 1955 — Lorraine kept it all these years.

"I know about all of them," she says quietly. "Every name in that book. I still kept it."`,
    cluesAvailable: ['earlDatebook', 'locksmithReceipt'],
  },
  kitchenDetail: {
    title: 'Kitchen',
    text: `Mae, Lorraine's sister, pours coffee with steady hands.

"Lorraine was here all night," she says without being asked. "We played cards until 2 AM. Five-card draw. She won twenty dollars off me."

Her eyes are clear, her voice firm. She's not lying.`,
    cluesAvailable: ['sisterTestimony'],
  },
  musicRoomDetail: {
    title: 'Music Room',
    text: `Lorraine's old practice room. A piano, sheet music, memories of the career she gave up.

On the wall: their wedding photo, larger than life. She's kept it here, even after everything.

"I still loved him," she says from the doorway. "Isn't that stupid? After everything he did. I still loved him."`,
    cluesAvailable: ['weddingPhotos'],
  },

  // === BIRDLAND ===
  sidsBoothDetail: {
    title: "Symphony Sid's Booth",
    text: `Symphony Sid looks like he's been here since 1949. Coffee, cigarettes, and gossip.

"Chet Malone?" He laughs. "Yeah, he was here last night. Drinking alone, looking rough. Left before midnight. Said something about 'settling things with Earl.' But he came back an hour later, even drunker. Never left again."

Chet was here during the murder. Drunk, angry, but here.`,
    cluesAvailable: ['chetSighting'],
  },
  pressTableDetail: {
    title: 'Press Table',
    text: `The DownBeat journalist is working on something. He shows you a draft column.

"Off the record? Teddy Olson's in trouble. His backers — and I mean the kind you don't want to owe — they're getting impatient. Word is he needed Earl's debt paid yesterday."

He slides a photo across the table. Ruthie Davis, at this very club, with a Prestige A&R man. The night of the murder.

"She wasn't sick. She was making a deal."`,
    cluesAvailable: ['gossipColumn', 'ruthiePhoto'],
  },
  backBarDetail: {
    title: 'Back Bar',
    text: `Quieter here. A good place to think.

An older musician recognizes you. "You're the bass player, right? Earl's guy?"

He leans in. "Earl was going to The Starlight. Everyone knew. Better money, bigger room. Teddy was going to lose his star attraction — and any chance of collecting what Earl owed him."

The Starlight. The matchbook in Earl's coat.`,
    cluesAvailable: ['starlightInfo'],
  },
};
