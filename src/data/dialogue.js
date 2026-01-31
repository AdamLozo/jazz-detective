// Complete dialogue trees for Jazz Detective
export const dialogueTrees = {
  // ============================================================
  // THE EMBER ROOM - Teddy Olson (THE KILLER)
  // ============================================================
  teddyIntro: {
    speaker: 'Teddy Olson',
    text: "Terrible thing. Terrible. Earl was... he was like family to this place. Twenty years he played here. Twenty years.",
    responses: [
      { text: "Where were you when it happened?", next: 'teddyAlibi' },
      { text: "I heard Earl owed you money.", next: 'teddyDebt', requiresClue: 'gamblingIOUs' },
      { text: "Tell me about The Starlight.", next: 'teddyStarlight', requiresClue: 'matchbook' },
      { text: "Who else was here tonight?", next: 'teddyWitnesses' },
      { text: "You really knew Earl's music?", next: 'teddyJazzTest' },
    ],
  },
  
  // === TEDDY'S JAZZ KNOWLEDGE TEST - Catch the Liar ===
  teddyJazzTest: {
    speaker: 'Teddy Olson',
    text: "Knew it? I LIVED it. Twenty years of jazz in this room. Kind of Blue — that was '57, right? Earl used to play those charts all the time.",
    isJazzTrivia: true,
    triviaId: 'teddyKindOfBlueYear',
    responses: [
      { text: "Kind of Blue was 1959, not '57. You don't know jazz at all.", next: 'teddyCaughtLie1', passesCheck: 'caught_teddy_jazz_lie_1' },
      { text: "Yeah, '57... classic.", next: 'teddyJazzContinue', failsCheck: 'missed_teddy_lie_1' },
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
    text: "Art Blakey — now THERE was a drummer. He played on Kind of Blue, you know. Earl worshipped him.",
    isJazzTrivia: true,
    triviaId: 'teddyKindOfBlueDrummer',
    responses: [
      { text: "Jimmy Cobb played drums on Kind of Blue, not Blakey. Another lie.", next: 'teddyCaughtLie2', passesCheck: 'caught_teddy_jazz_lie_2' },
      { text: "Blakey was a legend.", next: 'teddyJazzContinue3', failsCheck: 'missed_teddy_lie_2' },
    ],
  },
  teddyCaughtLie2: {
    speaker: 'Teddy Olson',
    text: "Alright, alright! So I don't know every session player. What does that prove?",
    setsFlag: 'caught_teddy_jazz_lie_2',
    responses: [
      { text: "It proves you're not one of us. Never were.", next: 'teddyJazzContinue3' },
    ],
  },
  teddyJazzContinue2: {
    speaker: 'Teddy Olson',
    text: "Look, Dave Brubeck wrote 'Take Five' — changed everything. Five-four time. Revolutionary. I understand the BUSINESS of jazz.",
    isJazzTrivia: true,
    triviaId: 'teddyTakeFiveComposer',
    responses: [
      { text: "Paul Desmond wrote 'Take Five,' not Brubeck. Strike three.", next: 'teddyCaughtLie3', passesCheck: 'caught_teddy_jazz_lie_3' },
      { text: "Revolutionary indeed.", next: 'teddyExposedEnd', failsCheck: 'missed_teddy_lie_3' },
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
    text: "ENOUGH! I don't need to know who wrote what! I know money. I know debts. And Earl owed me.",
    setsFlag: 'caught_teddy_jazz_lie_3',
    responses: [
      { text: "Now we're getting somewhere. Tell me about those debts.", next: 'teddyDebtExposed' },
      { text: "Three lies about jazz in three minutes. You're not one of us. You never were. Did you even know what Van Gelder inscribes on every record?", next: 'teddyVanGelderTest' },
    ],
  },
  
  // === TEDDY'S EXPERT HUMILIATION PATH ===
  teddyVanGelderTest: {
    speaker: 'Teddy Olson',
    text: "Van Gelder? The recording guy in Jersey? What about him?",
    isJazzTrivia: true,
    triviaId: 'teddyVanGelderRVG',
    responses: [
      { text: "RVG. Rudy Van Gelder. He scratches it into the run-out groove of every record. Earl had twenty albums with that mark. You wouldn't know.", next: 'teddyExpertHumiliation', passesCheck: 'expert_humiliated_teddy' },
      { text: "Never mind. Tell me about the debts.", next: 'teddyDebtExposed' },
    ],
  },
  teddyExpertHumiliation: {
    speaker: 'Teddy Olson',
    text: "I don't— Look, I don't collect records like some hobbyist! I RUN A BUSINESS! Earl made money for this club. That's what mattered. Not some scratches on vinyl.",
    setsFlag: 'expert_humiliated_teddy',
    setsFlag2: 'teddy_completely_exposed',
    responses: [
      { text: "And when the money was about to walk out the door...", next: 'teddyMoneyMotive' },
    ],
  },
  teddyMoneyMotive: {
    speaker: 'Teddy Olson',
    text: "You don't understand the pressure I'm under! The people I owe money to — they don't send letters. They send... Look, Earl was my lifeline. When he said he was leaving for The Starlight, I... I panicked.",
    setsFlag: 'teddy_admitted_panic',
    responses: [
      { text: "Panicked enough to kill?", next: 'teddyBreakdown' },
    ],
  },
  teddyBreakdown: {
    speaker: 'Teddy Olson',
    text: "I didn't— I just wanted to talk to him! Make him understand what he was doing to me! Things got heated. He said he'd rather die than stay in my club one more night. And I said— I said—",
    setsFlag: 'teddy_near_confession',
    responses: [
      { text: "What did you say, Teddy?", next: 'teddyConfessionEdge' },
    ],
  },
  teddyConfessionEdge: {
    speaker: 'Teddy Olson',
    text: "I said I could arrange that. It was just words! I didn't mean— But he laughed at me. LAUGHED. Said I was pathetic. Said I didn't even know the music I was selling. And then I... I...",
    setsFlag: 'teddy_confession_edge',
    responses: [
      { text: "You what?", next: 'teddyAlmostConfess' },
      { text: "[Stay silent and let him talk]", next: 'teddyAlmostConfess' },
    ],
  },
  teddyAlmostConfess: {
    speaker: 'Teddy Olson',
    text: "...I need a lawyer. Get out. GET OUT OF MY CLUB!",
    setsFlag: 'teddy_demanded_lawyer',
    setsFlag2: 'teddy_near_breakdown',
    responses: [
      { text: "[End conversation]", next: null },
    ],
  },
  teddyDebtExposed: {
    speaker: 'Teddy Olson',
    text: "Four thousand dollars. He owed me four thousand dollars. And he was about to skip town. Leave me holding the bag. You think I didn't have a reason to be angry?",
    setsFlag: 'teddy_admitted_motive',
    responses: [
      { text: "Angry enough to kill?", next: 'teddyDefensive' },
      { text: "Where were you during the second set?", next: 'teddyAlibiPress' },
    ],
  },
  teddyExposedEnd: {
    speaker: 'Teddy Olson',
    text: "Now, are we done with the music history lesson? I have a club to run.",
    responses: [
      { text: "For now.", next: 'teddyEnd' },
    ],
  },
  teddyAlibi: {
    speaker: 'Teddy Olson',
    text: "Me? I was out front the whole set. Ask anyone. Working the room, greeting guests. That's my job.",
    responses: [
      { text: "The whole set? You never stepped away?", next: 'teddyAlibiPress' },
      { text: "Jimmy says you were gone for twenty minutes.", next: 'teddyConfronted', requiresFlag: 'bartender_contradicts_teddy' },
      { text: "Let's talk about something else.", next: 'teddyIntro' },
    ],
  },
  teddyAlibiPress: {
    speaker: 'Teddy Olson',
    text: "Maybe I stepped out for a smoke. Five minutes, tops. A man can't take a break?",
    setsFlag: 'teddy_admitted_absence',
    responses: [
      { text: "Five minutes. That's enough time.", next: 'teddyDefensive' },
      { text: "Who saw you smoking?", next: 'teddyNoWitness' },
    ],
  },
  teddyConfronted: {
    speaker: 'Teddy Olson',
    text: "Twenty— Jimmy said that? He's mistaken. It was five minutes, maybe ten. I had a phone call. Business. Nothing to do with Earl.",
    setsFlag: 'teddy_caught_lying',
    responses: [
      { text: "That's not what you said before.", next: 'teddyDefensive' },
      { text: "Who was on the phone?", next: 'teddyPhoneCall' },
    ],
  },
  teddyPhoneCall: {
    speaker: 'Teddy Olson',
    text: "Private business. My investors. They're... impatient people. That's all you need to know.",
    responses: [
      { text: "The kind of investors who break legs?", next: 'teddyThreatened' },
      { text: "I'll find out eventually.", next: 'teddyEnd' },
    ],
  },
  teddyThreatened: {
    speaker: 'Teddy Olson',
    text: "Watch your mouth. You don't know who you're dealing with. I run a legitimate business here. Earl's death is a tragedy, but it's not MY tragedy. Now get out of my face.",
    responses: [
      { text: "[End conversation]", next: null },
    ],
  },
  teddyDefensive: {
    speaker: 'Teddy Olson',
    text: "Hey, watch it. I liked Earl. We had our disagreements, sure, but I didn't— Look, you're the one who had a screaming match with him three days ago. Maybe the cops should be asking YOU questions.",
    responses: [
      { text: "I didn't kill him. But someone in this room might have.", next: 'teddyEnd' },
    ],
  },
  teddyNoWitness: {
    speaker: 'Teddy Olson',
    text: "I don't know. I wasn't keeping track. It was busy. Look, are we done here?",
    responses: [
      { text: "For now.", next: 'teddyEnd' },
    ],
  },
  teddyDebt: {
    speaker: 'Teddy Olson',
    text: "Where'd you— That's private business. Between me and Earl. It wasn't like that. He was good for it. He had that Prestige deal coming through.",
    setsFlag: 'teddy_confirmed_debt',
    responses: [
      { text: "Four thousand dollars is a lot to trust someone for.", next: 'teddyDebtPress' },
      { text: "Did anyone else know about the debt?", next: 'teddyDebtOthers' },
    ],
  },
  teddyDebtPress: {
    speaker: 'Teddy Olson',
    text: "Earl always paid. Eventually. That's just how it was with him. He'd get into a hole, then climb out. I had no reason to— This conversation is over.",
    responses: [
      { text: "We'll talk again.", next: 'teddyEnd' },
    ],
  },
  teddyDebtOthers: {
    speaker: 'Teddy Olson',
    text: "What happens at my tables stays at my tables. But... Lorraine knew. His wife. Ex-wife. Whatever she is. She came by once, made a scene.",
    setsFlag: 'learned_lorraine_knew_debt',
    responses: [
      { text: "Interesting. Where can I find Lorraine?", next: 'teddyLorraineAddress' },
    ],
  },
  teddyLorraineAddress: {
    speaker: 'Teddy Olson',
    text: "Brownstone on 138th Street. Can't miss it. Three stories, blue door. She never moved, even after Earl left. Sentimental, I guess.",
    setsFlag: 'unlocked_lorraine',
    responses: [
      { text: "Thanks.", next: 'teddyEnd' },
    ],
  },
  teddyStarlight: {
    speaker: 'Teddy Olson',
    text: "The Starlight? What about it? That's the new place on 52nd. Competition. Why are you asking about The Starlight?",
    responses: [
      { text: "Earl had their matchbook. With a phone number.", next: 'teddyStarlightPress' },
      { text: "Nothing. Forget I mentioned it.", next: 'teddyEnd' },
    ],
  },
  teddyStarlightPress: {
    speaker: 'Teddy Olson',
    text: "...Earl was talking to The Starlight? Behind my back? After everything I did for him? Twenty years, and he was going to— No. No, I don't believe it.",
    setsFlag: 'teddy_knew_about_starlight',
    responses: [
      { text: "You didn't know.", next: 'teddyStarlightReaction' },
      { text: "Or maybe you did know. And that's why he's dead.", next: 'teddyStarlightAccusation' },
    ],
  },
  teddyStarlightReaction: {
    speaker: 'Teddy Olson',
    text: "I... no. I didn't know. Earl wouldn't— we had a deal. He owed me. He couldn't just leave.",
    responses: [
      { text: "But he was going to. And then you'd never see that money.", next: 'teddyStarlightAccusation' },
    ],
  },
  teddyStarlightAccusation: {
    speaker: 'Teddy Olson',
    text: "You're out of line. I want you out of my club. NOW. Don't come back unless you have a badge or a warrant.",
    responses: [
      { text: "[End conversation]", next: null },
    ],
  },
  teddyWitnesses: {
    speaker: 'Teddy Olson',
    text: "The usual crowd. Jimmy at the bar, Delia working tables. Ruthie — Earl's girl — she was here early but left with a headache. Snap and the band. Maybe fifty, sixty customers.",
    responses: [
      { text: "Ruthie left early?", next: 'teddyRuthie' },
      { text: "I'll talk to the staff.", next: 'teddyEnd' },
    ],
  },
  teddyRuthie: {
    speaker: 'Teddy Olson',
    text: "Said she wasn't feeling well. Left before the second set. Pretty thing. Too pretty for Earl, if you ask me. But he always could charm them.",
    responses: [
      { text: "Did she seem upset?", next: 'teddyRuthieUpset' },
      { text: "Thanks.", next: 'teddyEnd' },
    ],
  },
  teddyRuthieUpset: {
    speaker: 'Teddy Olson',
    text: "Maybe. I don't know. I'm not in the business of reading women's moods. Ask Delia — they talked in the powder room.",
    setsFlag: 'learned_ruthie_talked_to_delia',
    responses: [
      { text: "I will.", next: 'teddyEnd' },
    ],
  },
  teddyEnd: {
    speaker: 'Teddy Olson',
    text: "You know where to find me.",
    responses: [
      { text: "[End conversation]", next: null },
    ],
  },

  // ============================================================
  // THE EMBER ROOM - Jimmy the Bartender
  // ============================================================
  bartenderIntro: {
    speaker: 'Jimmy',
    text: "Hell of a night. Hell of a thing. Earl didn't deserve... Well. What do you need?",
    responses: [
      { text: "Did you see anything unusual tonight?", next: 'bartenderSaw' },
      { text: "How well did you know Earl?", next: 'bartenderKnewEarl' },
      { text: "Tell me about Teddy.", next: 'bartenderTeddy' },
    ],
  },
  
  // === JIMMY'S JAZZ KNOWLEDGE TEST ===
  bartenderJazzGate: {
    speaker: 'Jimmy',
    text: "Hold on. Earl used to quiz us on this stuff. If you're really his bassist, answer me this: 'Take Five' — who actually composed it? Not who played it. Who WROTE it?",
    isJazzTrivia: true,
    triviaId: 'jimmyTakeFiveTest',
    responses: [
      { text: "Paul Desmond wrote it. Brubeck just played piano.", next: 'bartenderJazzPass', passesCheck: 'passed_jimmy_test' },
      { text: "Dave Brubeck, obviously.", next: 'bartenderJazzFail', failsCheck: 'failed_jimmy_test' },
      { text: "I don't have time for trivia.", next: 'bartenderJazzSkip' },
    ],
  },
  bartenderJazzPass: {
    speaker: 'Jimmy',
    text: "Paul Desmond. Good. Earl always said the world gave Brubeck too much credit. Alright, you're the real deal. I'll tell you what I saw.",
    setsFlag: 'passed_jimmy_test',
    responses: [
      { text: "What did you see?", next: 'bartenderSaw' },
    ],
  },
  bartenderJazzFail: {
    speaker: 'Jimmy',
    text: "Wrong. Desmond wrote it. Earl's bassist would know that. You sure you played in his band?",
    setsFlag: 'failed_jimmy_test',
    responses: [
      { text: "I was the bassist. Trust me.", next: 'bartenderReluctant' },
    ],
  },
  bartenderReluctant: {
    speaker: 'Jimmy',
    text: "Alright, alright. But I'm watching you. What do you want to know?",
    responses: [
      { text: "Did you see anything unusual tonight?", next: 'bartenderSaw' },
      { text: "Tell me about Teddy.", next: 'bartenderTeddy' },
    ],
  },
  bartenderJazzSkip: {
    speaker: 'Jimmy',
    text: "No time for the music that made this place? Fine. But don't expect me to spill everything to a stranger.",
    responses: [
      { text: "I'm not a stranger. I played with Earl.", next: 'bartenderReluctant' },
    ],
  },
  bartenderSaw: {
    speaker: 'Jimmy',
    text: "I see a lot, standing behind this bar. Teddy disappeared during the second set. Twenty minutes, maybe more. Said he was out front, but I can see the front from here. He wasn't there.",
    setsFlag: 'bartender_contradicts_teddy',
    responses: [
      { text: "Twenty minutes. That's a long smoke break.", next: 'bartenderTeddyAbsence' },
      { text: "Anyone else acting strange?", next: 'bartenderOthers' },
    ],
  },
  bartenderTeddyAbsence: {
    speaker: 'Jimmy',
    text: "I'm just telling you what I saw. Or didn't see. Draw your own conclusions.",
    responses: [
      { text: "Thanks, Jimmy.", next: 'bartenderEnd' },
    ],
  },
  bartenderOthers: {
    speaker: 'Jimmy',
    text: "Ruthie left early. Looked like she'd been crying. And I saw Chet — you know Chet Malone? Earl's old drummer? — I saw him in the alley before the show. Didn't think much of it then.",
    setsFlag: 'learned_chet_in_alley',
    responses: [
      { text: "Chet was here? Earl fired him two years ago.", next: 'bartenderChet' },
    ],
  },
  bartenderChet: {
    speaker: 'Jimmy',
    text: "Yeah, it ended bad. Earl said some things... Chet never recovered. Couldn't get a gig anywhere after that. But I only saw him before the show. Don't know if he stuck around.",
    setsFlag: 'unlocked_birdland',
    responses: [
      { text: "Where would I find Chet now?", next: 'bartenderChetLocation' },
    ],
  },
  bartenderChetLocation: {
    speaker: 'Jimmy',
    text: "Try Birdland. Chet practically lives there now. Drinking away what's left of his reputation.",
    responses: [
      { text: "Appreciate the honesty.", next: 'bartenderEnd' },
    ],
  },
  bartenderTeddy: {
    speaker: 'Jimmy',
    text: "Teddy? He's... complicated. Runs a good club, pays on time. But there's something off about him. The people he meets with after hours. The phone calls he takes in the back room. I don't ask questions.",
    responses: [
      { text: "What kind of people?", next: 'bartenderTeddyPeople' },
      { text: "Smart policy.", next: 'bartenderEnd' },
    ],
  },
  bartenderTeddyPeople: {
    speaker: 'Jimmy',
    text: "Suits. Not musicians. Not jazz people. The kind of suits that make you look away when they walk in. Teddy owes somebody, I think. Or a lot of somebodies.",
    setsFlag: 'learned_teddy_has_backers',
    responses: [
      { text: "Interesting.", next: 'bartenderEnd' },
    ],
  },
  bartenderKnewEarl: {
    speaker: 'Jimmy',
    text: "Eight years I've been pouring his drinks. Bourbon, neat. Earl was complicated. Generous one minute, cruel the next. Made a lot of friends. Made a lot of enemies too.",
    responses: [
      { text: "What kind of enemies?", next: 'bartenderEnemies' },
    ],
  },
  bartenderEnemies: {
    speaker: 'Jimmy',
    text: "People he owed money. People whose careers he stepped on. Women he left behind. Take your pick.",
    responses: [
      { text: "That's a long list.", next: 'bartenderEnd' },
    ],
  },
  bartenderEnd: {
    speaker: 'Jimmy',
    text: "You need anything else, you know where I am.",
    responses: [
      { text: "[End conversation]", next: null },
    ],
  },

  // ============================================================
  // THE EMBER ROOM - Delia the Waitress
  // ============================================================
  waitressIntro: {
    speaker: 'Delia',
    text: "I already told the police everything I know. Which isn't much.",
    responses: [
      { text: "I'm not the police. I played in Earl's band.", next: 'waitressTrust' },
      { text: "Just a few questions.", next: 'waitressReluctant' },
    ],
  },
  waitressTrust: {
    speaker: 'Delia',
    text: "Oh. I'm sorry. This must be... I mean, you knew him. That's different. What do you want to know?",
    responses: [
      { text: "I heard you talked to Ruthie tonight.", next: 'waitressRuthie', requiresFlag: 'learned_ruthie_talked_to_delia' },
      { text: "Did you see anything strange?", next: 'waitressStrange' },
    ],
  },
  waitressReluctant: {
    speaker: 'Delia',
    text: "I don't want any trouble. Teddy's already on edge...",
    responses: [
      { text: "This is about finding who killed Earl.", next: 'waitressTrust' },
    ],
  },
  waitressRuthie: {
    speaker: 'Delia',
    text: "She was upset. Crying in the powder room. Said Earl was a liar. That he'd been seeing someone else. Then she got a phone call and... her whole mood changed. She fixed her makeup and left.",
    setsFlag: 'learned_ruthie_got_call',
    responses: [
      { text: "A phone call changed her mood?", next: 'waitressRuthieCall' },
    ],
  },
  waitressRuthieCall: {
    speaker: 'Delia',
    text: "Whoever it was, she called them 'honey.' So not Earl. She left looking... determined. Not sad anymore. Angry, maybe.",
    responses: [
      { text: "Interesting. Thank you, Delia.", next: 'waitressEnd' },
    ],
  },
  waitressStrange: {
    speaker: 'Delia',
    text: "I don't know about strange. Teddy was nervous all night. More than usual. Kept checking the back room door. And there was a guy I didn't recognize — older, nice suit — watching the band real close.",
    responses: [
      { text: "Did you get a name?", next: 'waitressStranger' },
    ],
  },
  waitressStranger: {
    speaker: 'Delia',
    text: "No. He paid cash, sat alone, left before the second set. Same time as Ruthie, actually. Might be nothing.",
    setsFlag: 'learned_stranger_at_club',
    responses: [
      { text: "Might be something. Thanks.", next: 'waitressEnd' },
    ],
  },
  waitressEnd: {
    speaker: 'Delia',
    text: "Please don't tell Teddy I said anything. I need this job.",
    responses: [
      { text: "[End conversation]", next: null },
    ],
  },

  // ============================================================
  // VAN GELDER'S STUDIO - Rudy Van Gelder
  // ============================================================
  rudyIntro: {
    speaker: 'Rudy Van Gelder',
    text: "I heard about Earl. Terrible news. He was here just last week, recording with the quintet. What can I do for you?",
    responses: [
      { text: "I need to see your session logs from the night Earl died.", next: 'rudyLogs' },
      { text: "Did Earl seem worried about anything?", next: 'rudyEarlMood' },
      { text: "Is Marcus Whitmore here?", next: 'rudySnap' },
      { text: "I heard you have a tape of Earl and Teddy arguing.", next: 'rudyTapeRequest', requiresFlag: 'argument_tape_available' },
    ],
  },
  
  // === RUDY'S EXPERT JAZZ KNOWLEDGE GATE ===
  rudyTapeRequest: {
    speaker: 'Rudy Van Gelder',
    text: "That tape... it's sensitive. Before I share it with anyone, I need to know you're legitimate. A lot of people claim to be musicians.",
    responses: [
      { text: "Test me. I know my jazz history.", next: 'rudyJazzTest1' },
      { text: "I played bass in Earl's quintet for three years.", next: 'rudyNeedProof' },
      { text: "I know you were an optometrist before you built this studio.", next: 'rudyExpertShortcut' },
    ],
  },
  
  // === RUDY EXPERT SHORTCUT - Optometrist Knowledge ===
  rudyExpertShortcut: {
    speaker: 'Rudy Van Gelder',
    text: "You know about my optometry practice? Most musicians don't care about the man behind the console. They just want their sound. You're different.",
    isJazzTrivia: true,
    triviaId: 'rudyOptometristExpert',
    setsFlag: 'knows_rudy_history',
    responses: [
      { text: "Pennsylvania College of Optometry, class of '46. You practiced by day, recorded by night.", next: 'rudyDeepExpert' },
      { text: "I just heard you used to be an eye doctor.", next: 'rudyJazzTest1' },
    ],
  },
  rudyDeepExpert: {
    speaker: 'Rudy Van Gelder',
    text: "Sometimes I only got two hours of sleep. Examining eyes at 8 AM after recording until 4. But the music was worth it. You've done your homework. Let me ask you something only a true insider would know.",
    setsFlag: 'rudy_impressed',
    responses: [
      { text: "Go ahead.", next: 'rudyExpertTest' },
    ],
  },
  rudyExpertTest: {
    speaker: 'Rudy Van Gelder',
    text: "How tall is the ceiling in this room? The cathedral ceiling that gives us that natural reverb. To the foot.",
    isJazzTrivia: true,
    triviaId: 'rudyCeilingHeight',
    responses: [
      { text: "39 feet. David Henken designed it — Frank Lloyd Wright's protégé.", next: 'rudyExpertPass', passesCheck: 'passed_rudy_expert' },
      { text: "It's... very high. I don't know the exact measurement.", next: 'rudyExpertPartial' },
    ],
  },
  rudyExpertPass: {
    speaker: 'Rudy Van Gelder',
    text: "39 feet exactly. And you know about Henken. I've had critics in here for decades who never asked about the architecture. You understand that the ROOM is an instrument. I'll give you everything I have.",
    setsFlag: 'passed_rudy_expert',
    setsFlag2: 'rudy_full_trust',
    responses: [
      { text: "Thank you, Rudy. The tape — and anything else you know.", next: 'rudyFullReveal' },
    ],
  },
  rudyFullReveal: {
    speaker: 'Rudy Van Gelder',
    text: "The tape is yours. But there's more. Earl came to me three days before he died. Asked me to hide something for him. Said if anything happened, give it to someone who understood the music. I think that's you.",
    setsFlag: 'rudy_has_evidence',
    responses: [
      { text: "What did he give you?", next: 'rudySecretEvidence' },
    ],
  },
  rudySecretEvidence: {
    speaker: 'Rudy Van Gelder',
    text: "A ledger. Teddy's real books. Shows the gambling operation, the money he owes to... dangerous people. Earl was going to use it as insurance. 'If I go down, Teddy goes down.' Those were his words.",
    setsFlag: 'has_teddy_ledger',
    setsFlag2: 'critical_evidence_unlocked',
    responses: [
      { text: "This is enough to put Teddy away.", next: 'rudyPlayTape' },
    ],
  },
  rudyExpertPartial: {
    speaker: 'Rudy Van Gelder',
    text: "It's 39 feet. The cathedral ceiling is what makes this room special. You know more than most, but not everything. I'll show you the tape, but that's all I can give you.",
    responses: [
      { text: "The tape is what I need.", next: 'rudyPlayTape' },
    ],
  },
  rudyNeedProof: {
    speaker: 'Rudy Van Gelder',
    text: "Anyone can say that. Prove it. 1959 was the greatest year in jazz history. Name the four landmark albums recorded that year.",
    isJazzTrivia: true,
    triviaId: 'rudyFourAlbums1959',
    responses: [
      { text: "Kind of Blue, Giant Steps, Time Out, and The Shape of Jazz to Come.", next: 'rudyJazzPass1', passesCheck: 'passed_rudy_1959_test' },
      { text: "Kind of Blue... and... I need a moment.", next: 'rudyJazzPartial' },
      { text: "I don't remember all four.", next: 'rudyJazzFail1', failsCheck: 'failed_rudy_1959_test' },
    ],
  },
  rudyJazzTest1: {
    speaker: 'Rudy Van Gelder',
    text: "1959 was the greatest year in jazz history. Name the four landmark albums recorded that year. All four.",
    isJazzTrivia: true,
    triviaId: 'rudyFourAlbums1959',
    responses: [
      { text: "Kind of Blue, Giant Steps, Time Out, and The Shape of Jazz to Come.", next: 'rudyJazzPass1', passesCheck: 'passed_rudy_1959_test' },
      { text: "Kind of Blue, Giant Steps, Time Out... and Mingus Ah Um?", next: 'rudyJazzClose' },
      { text: "I'm not sure I can name all four.", next: 'rudyJazzFail1', failsCheck: 'failed_rudy_1959_test' },
    ],
  },
  rudyJazzPass1: {
    speaker: 'Rudy Van Gelder',
    text: "That's right. Kind of Blue, Giant Steps, Time Out, and The Shape of Jazz to Come. All in one year. You know your history. One more question.",
    setsFlag: 'passed_rudy_1959_test',
    responses: [
      { text: "Go ahead.", next: 'rudyJazzTest2' },
    ],
  },
  rudyJazzClose: {
    speaker: 'Rudy Van Gelder',
    text: "Close. Mingus Ah Um was '59 too, but the four I'm thinking of: Kind of Blue, Giant Steps, Time Out, and The Shape of Jazz to Come. Ornette Coleman changed everything that year.",
    responses: [
      { text: "Right. Ornette.", next: 'rudyJazzTest2Partial' },
    ],
  },
  rudyJazzTest2: {
    speaker: 'Rudy Van Gelder',
    text: "Who wrote the haunting piano introduction to 'So What' on Kind of Blue? Most people get this wrong.",
    isJazzTrivia: true,
    triviaId: 'rudyBillEvansIntro',
    responses: [
      { text: "Bill Evans wrote that introduction.", next: 'rudyJazzPass2', passesCheck: 'passed_rudy_evans_test' },
      { text: "Miles Davis composed the whole album.", next: 'rudyJazzFail2', failsCheck: 'failed_rudy_evans_test' },
      { text: "Gil Evans?", next: 'rudyJazzPartialCredit' },
    ],
  },
  rudyJazzTest2Partial: {
    speaker: 'Rudy Van Gelder',
    text: "Let me ask you something harder. Who wrote the piano introduction to 'So What'? And I don't mean Miles.",
    isJazzTrivia: true,
    triviaId: 'rudyBillEvansIntro',
    responses: [
      { text: "Bill Evans.", next: 'rudyJazzPass2', passesCheck: 'passed_rudy_evans_test' },
      { text: "I'm not sure.", next: 'rudyJazzFail2', failsCheck: 'failed_rudy_evans_test' },
    ],
  },
  rudyJazzPass2: {
    speaker: 'Rudy Van Gelder',
    text: "Bill Evans, that's right. Though Gil Evans helped with the arrangement. Most people think Miles wrote everything. You're the real thing. One more — this one separates the experts from everyone else.",
    setsFlag: 'passed_rudy_full_test',
    responses: [
      { text: "Hit me.", next: 'rudyBonusExpert' },
      { text: "I think I've proven myself. The tape?", next: 'rudyPlayTape' },
    ],
  },
  
  // === RUDY'S BONUS EXPERT QUESTION ===
  rudyBonusExpert: {
    speaker: 'Rudy Van Gelder',
    text: "Scott LaFaro recorded with Bill Evans at the Village Vanguard in 1961. Greatest bass playing ever captured on tape. How many days after that session did Scott die?",
    isJazzTrivia: true,
    triviaId: 'rudyScottLaFaro',
    responses: [
      { text: "Eleven days. Car accident. July 6th, 1961. He was 25 years old.", next: 'rudyBonusPass', passesCheck: 'passed_rudy_bonus' },
      { text: "I know he died young, but I don't know exactly when.", next: 'rudyBonusFail' },
    ],
  },
  rudyBonusPass: {
    speaker: 'Rudy Van Gelder',
    text: "Eleven days. The greatest bassist of his generation, gone at 25. I recorded his last session with Ornette Coleman. Sometimes I listen to it and... Well. You understand loss. Here's the tape — and something else Earl left with me.",
    setsFlag: 'passed_rudy_bonus',
    setsFlag2: 'unlocks_bonus_evidence',
    responses: [
      { text: "What else did Earl leave?", next: 'rudySecretEvidence' },
    ],
  },
  rudyBonusFail: {
    speaker: 'Rudy Van Gelder',
    text: "Eleven days. July 6th, 1961. Some things you never forget. Here's the tape. It's what you came for.",
    responses: [
      { text: "Thank you, Rudy.", next: 'rudyPlayTape' },
    ],
  },
  rudyJazzPartialCredit: {
    speaker: 'Rudy Van Gelder',
    text: "Gil Evans did the arrangement, but Bill Evans wrote the actual piano part. Close enough. You know more than most. I'll show you the tape.",
    setsFlag: 'passed_rudy_partial',
    responses: [
      { text: "I appreciate it.", next: 'rudyPlayTape' },
    ],
  },
  rudyJazzFail1: {
    speaker: 'Rudy Van Gelder',
    text: "A real musician would know this. I'm not sure I can help you. Come back when you've done your homework.",
    setsFlag: 'failed_rudy_test',
    responses: [
      { text: "Wait — I know Snap was here that night. At least confirm that.", next: 'rudyLogsBasic' },
    ],
  },
  rudyJazzFail2: {
    speaker: 'Rudy Van Gelder',
    text: "No. Bill Evans wrote that introduction. For a session player, you don't know your fundamentals. I'll confirm Snap's alibi, but the tape stays with me.",
    setsFlag: 'failed_rudy_advanced',
    responses: [
      { text: "Just the session logs, then.", next: 'rudyLogsBasic' },
    ],
  },
  rudyLogsBasic: {
    speaker: 'Rudy Van Gelder',
    text: "Fine. November 14th: session ran from 8 PM to 2:15 AM. Marcus Whitmore was here the entire time. That's all you're getting from me.",
    setsFlag: 'snap_alibi_confirmed',
    responses: [
      { text: "That clears Snap, at least.", next: 'rudyEnd' },
    ],
  },
  rudyLogs: {
    speaker: 'Rudy Van Gelder',
    text: "I keep records of everything. November 14th... here. Session ran from 8 PM to 2:15 AM. Marcus Whitmore was here the entire time. I can vouch for that personally.",
    setsFlag: 'snap_alibi_confirmed',
    responses: [
      { text: "That clears Snap, then.", next: 'rudyLogsConfirm' },
      { text: "Did anyone else come by that night?", next: 'rudyVisitors' },
    ],
  },
  rudyLogsConfirm: {
    speaker: 'Rudy Van Gelder',
    text: "Whatever else that young man might be guilty of, he wasn't in Harlem when Earl died. He was in my living room, playing some of the best trumpet I've heard in years.",
    responses: [
      { text: "Whatever else? What do you mean?", next: 'rudySnapSecret' },
    ],
  },
  rudySnapSecret: {
    speaker: 'Rudy Van Gelder',
    text: "I shouldn't... Look, I found copies of Earl's arrangements in Snap's handwriting. I think he was selling them to other bands. Earl found out. They had a big argument, right here in the studio.",
    setsFlag: 'learned_snap_stealing',
    responses: [
      { text: "When was this argument?", next: 'rudyArgument' },
    ],
  },
  rudyArgument: {
    speaker: 'Rudy Van Gelder',
    text: "Two weeks ago. Earl was furious. Said he was going to fire Snap, ruin his career. But then... nothing. They were back in the studio like nothing happened. I don't understand musicians sometimes.",
    responses: [
      { text: "Did you keep any recordings of that argument?", next: 'rudyArgumentTape' },
    ],
  },
  rudyArgumentTape: {
    speaker: 'Rudy Van Gelder',
    text: "I... the machine was still running. I didn't mean to record it. But there's something else on that tape. Another argument. Earl and someone else. About money.",
    setsFlag: 'argument_tape_available',
    responses: [
      { text: "I need to hear that tape.", next: 'rudyPlayTape' },
    ],
  },
  rudyPlayTape: {
    speaker: 'Rudy Van Gelder',
    text: "It's Earl and... I think it's Teddy Olson. The club owner. Listen: 'You'll get your money when I'm dead, Teddy.' And Teddy says, 'That can be arranged.' Gives me chills.",
    setsFlag: 'heard_teddy_threat',
    responses: [
      { text: "That's a threat. On tape.", next: 'rudyTapeEnd' },
    ],
  },
  rudyTapeEnd: {
    speaker: 'Rudy Van Gelder',
    text: "I didn't want to get involved. But if this helps find who killed Earl... You can take the reel. I made a copy for the police, but they didn't seem interested.",
    responses: [
      { text: "Thank you, Rudy. This is important.", next: 'rudyEnd' },
    ],
  },
  rudyVisitors: {
    speaker: 'Rudy Van Gelder',
    text: "No one else. Just me and the quintet. Well, minus Earl — he wasn't scheduled for that session. It was a trumpet date.",
    responses: [
      { text: "Thanks for your help.", next: 'rudyEnd' },
    ],
  },
  rudyEarlMood: {
    speaker: 'Rudy Van Gelder',
    text: "Earl was always worried about something. Money, women, his reputation. But last week... he seemed almost optimistic. Said he had a new deal coming through. A fresh start.",
    responses: [
      { text: "The Prestige deal?", next: 'rudyPrestige' },
    ],
  },
  rudyPrestige: {
    speaker: 'Rudy Van Gelder',
    text: "That's right. And something else — a new club. Bigger room, better money. He was excited. Said he was finally going to get out from under some debts.",
    setsFlag: 'confirmed_earl_leaving',
    responses: [
      { text: "Did he say which club?", next: 'rudyStarlight' },
    ],
  },
  rudyStarlight: {
    speaker: 'Rudy Van Gelder',
    text: "The Starlight. On 52nd Street. Brand new place. They wanted Earl as their house band. Triple what Teddy was paying him.",
    responses: [
      { text: "Teddy wouldn't have liked that.", next: 'rudyEnd' },
    ],
  },
  rudySnap: {
    speaker: 'Rudy Van Gelder',
    text: "He's in the back, warming up. Been here since dawn. I think he's taking Earl's death hard, even if they didn't always get along.",
    responses: [
      { text: "I'd like to talk to him.", next: 'rudyEnd' },
    ],
  },
  // === RUDY'S EXPERT BONUS - Industry Knowledge ===
  rudyExpertBonus: {
    speaker: 'Rudy Van Gelder',
    text: "You passed my test. But I'm curious — how much do you really know about the business side of jazz? About those of us behind the glass?",
    responses: [
      { text: "Try me. I know my industry history.", next: 'rudyExpertTest1' },
      { text: "I know the music. That's enough.", next: 'rudyEnd' },
    ],
  },
  rudyExpertTest1: {
    speaker: 'Rudy Van Gelder',
    text: "Before I dedicated my life to recording, I had another profession. Most people don't know this. What was I before I was an engineer?",
    isJazzTrivia: true,
    triviaId: 'rudyOriginalProfession',
    responses: [
      { text: "You were an optometrist. Practiced by day, recorded by night.", next: 'rudyExpertPass1', passesCheck: 'passed_rudy_expert_1' },
      { text: "A music teacher?", next: 'rudyExpertFail1', failsCheck: 'failed_rudy_expert_1' },
      { text: "I don't know.", next: 'rudyExpertFail1', failsCheck: 'failed_rudy_expert_1' },
    ],
  },
  rudyExpertPass1: {
    speaker: 'Rudy Van Gelder',
    text: "An optometrist. Pennsylvania College of Optometry, 1946. I'd examine eyes all day, then record Kind of Blue at night. Sometimes I got two hours of sleep. You know your history.",
    setsFlag: 'passed_rudy_expert_1',
    responses: [
      { text: "I know more. Test me again.", next: 'rudyExpertTest2' },
      { text: "That's dedication.", next: 'rudyExpertBonus2' },
    ],
  },
  rudyExpertFail1: {
    speaker: 'Rudy Van Gelder',
    text: "Optometrist. I examined eyes for a living while recording the greatest jazz albums ever made. Most people don't know that.",
    responses: [
      { text: "Interesting. What else don't people know?", next: 'rudyExpertBonus2' },
    ],
  },
  rudyExpertTest2: {
    speaker: 'Rudy Van Gelder',
    text: "This studio — my cathedral. The ceiling above us. How high is it? A real engineer would know.",
    isJazzTrivia: true,
    triviaId: 'rudyStudioHeight',
    responses: [
      { text: "39 feet. That's where you get that natural reverb.", next: 'rudyExpertPass2', passesCheck: 'passed_rudy_expert_2' },
      { text: "Twenty feet?", next: 'rudyExpertFail2', failsCheck: 'failed_rudy_expert_2' },
      { text: "I've never measured it.", next: 'rudyExpertFail2', failsCheck: 'failed_rudy_expert_2' },
    ],
  },
  rudyExpertPass2: {
    speaker: 'Rudy Van Gelder',
    text: "39 feet exactly. David Henken designed it — he was Frank Lloyd Wright's protégé. That dome gives us the sound that no other studio can match. You're remarkable. Here's something that might help your investigation.",
    setsFlag: 'passed_rudy_expert_2',
    setsFlag2: 'rudy_bonus_clue',
    responses: [
      { text: "What is it?", next: 'rudyBonusClue' },
    ],
  },
  rudyExpertFail2: {
    speaker: 'Rudy Van Gelder',
    text: "39 feet. The cathedral ceiling. It's not just aesthetics — it's acoustics. That height gives us natural reverb you can't fake.",
    responses: [
      { text: "I should pay more attention to architecture.", next: 'rudyExpertBonus2' },
    ],
  },
  rudyExpertBonus2: {
    speaker: 'Rudy Van Gelder',
    text: "There's one more thing. You know I'm secretive about my techniques. What do I do when photographers come into my studio?",
    isJazzTrivia: true,
    triviaId: 'rudyPhotographers',
    responses: [
      { text: "You move the microphones so they can't see your placement.", next: 'rudyExpertPass3', passesCheck: 'passed_rudy_expert_3' },
      { text: "You ask them to leave?", next: 'rudyExpertFail3', failsCheck: 'failed_rudy_expert_3' },
    ],
  },
  rudyExpertPass3: {
    speaker: 'Rudy Van Gelder',
    text: "Exactly. I move every microphone before any camera clicks. My placement techniques are my secret. Creed Taylor tells people: 'Don't wear wet shoes into the studio, and don't ask questions about his recording techniques.' You understand the game.",
    setsFlag: 'passed_rudy_expert_3',
    responses: [
      { text: "I do. Now — what else do you know about Earl?", next: 'rudyBonusClue' },
    ],
  },
  rudyExpertFail3: {
    speaker: 'Rudy Van Gelder',
    text: "I move the microphones. Every single one. Nobody photographs my placement techniques. That's how I've kept my sound unique for twenty years.",
    responses: [
      { text: "Clever. About Earl...", next: 'rudyEnd' },
    ],
  },
  rudyBonusClue: {
    speaker: 'Rudy Van Gelder',
    text: "Earl came to me three days before he died. Asked me to hold onto something — a ledger. Said if anything happened to him, I should give it to someone who understood the music. Someone who passed my tests. That's you.",
    setsFlag: 'received_teddy_ledger',
    responses: [
      { text: "What's in the ledger?", next: 'rudyLedgerReveal' },
    ],
  },
  rudyLedgerReveal: {
    speaker: 'Rudy Van Gelder',
    text: "Teddy's accounts. Every loan, every payment, every threat. Earl was keeping records. He knew Teddy was dangerous. This ledger proves Teddy owed fifty thousand dollars to some very bad people. Earl was his only asset.",
    setsFlag: 'has_teddy_ledger',
    responses: [
      { text: "This is the evidence I needed.", next: 'rudyEnd' },
    ],
  },
  rudyEnd: {
    speaker: 'Rudy Van Gelder',
    text: "Let me know if you need anything else. And... find who did this. Earl deserved better.",
    responses: [
      { text: "[End conversation]", next: null },
    ],
  },

  // ============================================================
  // VAN GELDER'S STUDIO - Marcus "Snap" Whitmore
  // ============================================================
  snapIntro: {
    speaker: 'Marcus "Snap" Whitmore',
    text: "You're the bass player, right? From Earl's quintet? Man, I can't believe he's gone. Earl was... he was a lot of things. But he didn't deserve this.",
    responses: [
      { text: "Where were you last night?", next: 'snapAlibi' },
      { text: "I heard you and Earl had a falling out.", next: 'snapFallingOut' },
      { text: "Did Earl have any enemies?", next: 'snapEnemies' },
      { text: "Before we talk — you were copying Earl's arrangements. Prove you actually understood them.", next: 'snapJazzGate' },
    ],
  },
  
  // === SNAP'S EXPERT JAZZ KNOWLEDGE GATE ===
  snapJazzGate: {
    speaker: 'Marcus "Snap" Whitmore',
    text: "You want to test ME? I was Earl's lead trumpet for three years. Fine. Ask me something hard.",
    responses: [
      { text: "What composition defined 'Coltrane Changes'?", next: 'snapJazzTest1' },
    ],
  },
  snapJazzTest1: {
    speaker: 'Marcus "Snap" Whitmore',
    text: "Coltrane Changes...",
    isJazzTrivia: true,
    triviaId: 'snapColtraneChanges',
    responses: [
      { text: "'Giant Steps.' Those chord substitutions changed everything.", next: 'snapJazzPass1', passesCheck: 'passed_snap_test_1' },
      { text: "'My Favorite Things'?", next: 'snapJazzFail1', failsCheck: 'failed_snap_test_1' },
    ],
  },
  snapJazzPass1: {
    speaker: 'Marcus "Snap" Whitmore',
    text: "Giant Steps. Those ii-V progressions moving in major thirds — most players couldn't touch it. Tommy Flanagan stumbled through the solo on the original take. Earl used to drill us on those changes for hours.",
    setsFlag: 'passed_snap_test_1',
    responses: [
      { text: "Here's a harder one: On Kind of Blue, who played piano on 'Freddie Freeloader'?", next: 'snapJazzTest2' },
    ],
  },
  snapJazzFail1: {
    speaker: 'Marcus "Snap" Whitmore',
    text: "'My Favorite Things'? That's modal, man. Totally different thing. 'Giant Steps' — THAT'S where Coltrane Changes come from. The substitutions, the third-based movement. How do you not know this?",
    setsFlag: 'failed_snap_test_1',
    responses: [
      { text: "Look, I need to know what you saw.", next: 'snapEnemiesBasic' },
    ],
  },
  snapEnemiesBasic: {
    speaker: 'Marcus "Snap" Whitmore',
    text: "Teddy Olson. That's who you should be looking at. Earl owed him money. But I'm not telling you more until you prove you actually know the music Earl dedicated his life to.",
    responses: [
      { text: "[End conversation]", next: null },
    ],
  },
  snapJazzTest2: {
    speaker: 'Marcus "Snap" Whitmore',
    text: "Kind of Blue... 'Freddie Freeloader'...",
    isJazzTrivia: true,
    triviaId: 'snapFreddieFreeloader',
    responses: [
      { text: "Wynton Kelly. Bill Evans sat that one out.", next: 'snapJazzPass2', passesCheck: 'passed_snap_test_2' },
      { text: "Bill Evans played the whole album.", next: 'snapJazzFail2', failsCheck: 'failed_snap_test_2' },
    ],
  },
  snapJazzPass2: {
    speaker: 'Marcus "Snap" Whitmore',
    text: "Wynton Kelly! Man, nobody knows that. Bill Evans played the whole album except 'Freddie Freeloader' — Miles wanted a bluesier feel for that track. You're the real deal. Ask me anything.",
    setsFlag: 'passed_snap_full_test',
    responses: [
      { text: "Tell me everything about the night Earl died.", next: 'snapFullConfession' },
    ],
  },
  snapJazzFail2: {
    speaker: 'Marcus "Snap" Whitmore',
    text: "Wrong. Wynton Kelly played 'Freddie Freeloader.' Miles wanted a different feel for that track. You got one right, one wrong. I'll talk, but I'm not giving you everything.",
    setsFlag: 'failed_snap_test_2',
    responses: [
      { text: "Tell me what you can.", next: 'snapEnemies' },
    ],
  },
  snapFullConfession: {
    speaker: 'Marcus "Snap" Whitmore',
    text: "Here's what I didn't tell the cops: A week before Earl died, I heard Teddy on the phone. He said, 'If Earl leaves, we're both dead.' I thought it was about money. Now I'm not so sure.",
    setsFlag: 'snap_overheard_teddy',
    responses: [
      { text: "Teddy said 'we're both dead'?", next: 'snapTeddyThreat' },
      { text: "Wait — before that. You were copying Earl's arrangements. Did you know about George Russell's Lydian Concept?", next: 'snapLydianTest' },
    ],
  },
  
  // === SNAP'S EXPERT THEORY KNOWLEDGE ===
  snapLydianTest: {
    speaker: 'Marcus "Snap" Whitmore',
    text: "George Russell? You want to talk theory NOW? Alright. What do you know about the Lydian Chromatic Concept?",
    isJazzTrivia: true,
    triviaId: 'snapLydianConcept',
    responses: [
      { text: "Russell's 1953 book. It influenced modal jazz — Kind of Blue wouldn't exist without it.", next: 'snapLydianPass', passesCheck: 'passed_snap_lydian' },
      { text: "Something about modes and scales.", next: 'snapLydianFail' },
    ],
  },
  snapLydianPass: {
    speaker: 'Marcus "Snap" Whitmore',
    text: "The Lydian Chromatic Concept of Tonal Organization. 1953. Changed everything. Miles used it for Kind of Blue. Earl used it for his arrangements — the ones I was copying. I wasn't just stealing notes. I was stealing a whole philosophy.",
    setsFlag: 'passed_snap_lydian',
    responses: [
      { text: "And Sonny Rollins was Miles's first choice before Coltrane. Sometimes the understudies become the stars.", next: 'snapSonnyRollins' },
      { text: "Now tell me about Teddy.", next: 'snapTeddyThreat' },
    ],
  },
  snapSonnyRollins: {
    speaker: 'Marcus "Snap" Whitmore',
    text: "You know about that? Sonny turned Miles down to get clean. Coltrane got the gig instead. And Trane had his own demons — Miles fired him in '57 for showing up inebriated. Then hired him back. Second chances make legends.",
    isJazzTrivia: true,
    triviaId: 'snapSonnyColtraneHistory',
    setsFlag: 'snap_deep_history',
    responses: [
      { text: "Earl gave you a second chance too.", next: 'snapSecondChance' },
    ],
  },
  snapSecondChance: {
    speaker: 'Marcus "Snap" Whitmore',
    text: "He did. After catching me stealing his arrangements, he could have destroyed me. Instead, he sat me down and taught me WHY those voicings worked. Said I had talent but no discipline. He was right.",
    setsFlag: 'snap_earl_mentor',
    responses: [
      { text: "And now you're going to honor that by helping me find his killer.", next: 'snapHonorEarl' },
    ],
  },
  snapHonorEarl: {
    speaker: 'Marcus "Snap" Whitmore',
    text: "Damn right I am. Earl deserved better than Teddy's greed. Here's everything I know: The phone call, the arguments, the look on Teddy's face when he realized Earl was really leaving. I'll testify to all of it.",
    setsFlag: 'snap_full_testimony',
    responses: [
      { text: "Tell me about that phone call.", next: 'snapTeddyThreat' },
    ],
  },
  snapLydianFail: {
    speaker: 'Marcus "Snap" Whitmore',
    text: "It's a complete theory of harmony based on the Lydian mode. Russell figured out that the Lydian scale is more consonant with the overtone series than the major scale. It's why modal jazz sounds so... inevitable.",
    responses: [
      { text: "Interesting. Now tell me about Teddy.", next: 'snapTeddyThreat' },
    ],
  },
  snapTeddyThreat: {
    speaker: 'Marcus "Snap" Whitmore',
    text: "Word for word. 'If Earl leaves, we're both dead.' I think Teddy owes money to some very dangerous people, and Earl was his only way out. When Earl decided to go to The Starlight... Teddy had nothing left to lose.",
    setsFlag: 'snap_knows_teddy_motive',
    responses: [
      { text: "Will you tell this to the police?", next: 'snapTestify' },
    ],
  },
  snapTestify: {
    speaker: 'Marcus "Snap" Whitmore',
    text: "If it helps catch Earl's killer? Yeah. I owe him that much. Even after everything.",
    setsFlag: 'snap_will_testify',
    responses: [
      { text: "Thank you, Snap.", next: 'snapEnd' },
    ],
  },
  snapAlibi: {
    speaker: 'Marcus "Snap" Whitmore',
    text: "Here. Right here in this studio. Session ran until 2 AM. Ask Rudy — he's got the logs. I never left.",
    responses: [
      { text: "Rudy confirmed it. You're in the clear.", next: 'snapRelief' },
      { text: "That's convenient.", next: 'snapDefensive' },
    ],
  },
  snapRelief: {
    speaker: 'Marcus "Snap" Whitmore',
    text: "In the clear? Man, I didn't DO anything. Earl and me, we had our problems, but I wouldn't— I'm not that kind of person.",
    responses: [
      { text: "What kind of problems?", next: 'snapProblems' },
    ],
  },
  snapDefensive: {
    speaker: 'Marcus "Snap" Whitmore',
    text: "Convenient? What's that supposed to mean? I was WORKING. Some of us still have careers to build.",
    responses: [
      { text: "Take it easy. I'm just asking questions.", next: 'snapProblems' },
    ],
  },
  snapProblems: {
    speaker: 'Marcus "Snap" Whitmore',
    text: "Earl... Look, I'm not proud of everything I did. He found out I was copying his arrangements. Selling them to other bands. It was wrong. I know that now.",
    responses: [
      { text: "He threatened to fire you.", next: 'snapThreatened' },
      { text: "Why did you do it?", next: 'snapWhy' },
    ],
  },
  snapThreatened: {
    speaker: 'Marcus "Snap" Whitmore',
    text: "Yeah. Said he'd ruin my career. Make sure I never played in this town again. Earl could do that — one word from him, and you're done.",
    responses: [
      { text: "But he didn't.", next: 'snapDidnt' },
    ],
  },
  snapDidnt: {
    speaker: 'Marcus "Snap" Whitmore',
    text: "No. He calmed down. We talked. I apologized, promised to make it right. Earl was angry, but he wasn't cruel. He gave me another chance.",
    setsFlag: 'snap_reconciled',
    responses: [
      { text: "That's not what everyone says about Earl.", next: 'snapEarlDifferent' },
    ],
  },
  snapEarlDifferent: {
    speaker: 'Marcus "Snap" Whitmore',
    text: "People didn't know him like I did. Yeah, he could be hard. But he was also the only one who believed in me when I was just a kid from Detroit with a horn. I owed him everything.",
    responses: [
      { text: "I believe you.", next: 'snapEnd' },
    ],
  },
  snapWhy: {
    speaker: 'Marcus "Snap" Whitmore',
    text: "Money. Stupid, I know. Earl wasn't paying enough, and I had debts. So I got greedy. It was the dumbest thing I ever did.",
    responses: [
      { text: "But Earl forgave you?", next: 'snapDidnt' },
    ],
  },
  snapFallingOut: {
    speaker: 'Marcus "Snap" Whitmore',
    text: "That was weeks ago. We patched things up. I made a mistake, Earl called me on it, and we moved on. That's how it works in this business.",
    responses: [
      { text: "What kind of mistake?", next: 'snapProblems' },
    ],
  },
  snapEnemies: {
    speaker: 'Marcus "Snap" Whitmore',
    text: "Earl made enemies. That's just facts. Teddy Olson, for one. Earl owed him money and was about to skip town. Chet Malone — Earl destroyed his career. And there were women. Always women with Earl.",
    responses: [
      { text: "Tell me about Teddy.", next: 'snapTeddy' },
      { text: "What about Chet?", next: 'snapChet' },
    ],
  },
  snapTeddy: {
    speaker: 'Marcus "Snap" Whitmore',
    text: "Teddy runs that club like it's his personal kingdom. Earl owed him four grand in gambling debts. And Earl was about to leave for The Starlight — better club, better money. Teddy would've been ruined.",
    setsFlag: 'snap_confirms_motive',
    responses: [
      { text: "That's a motive.", next: 'snapEnd' },
    ],
  },
  snapChet: {
    speaker: 'Marcus "Snap" Whitmore',
    text: "Chet Malone. Earl's old drummer. Earl fired him two years ago, called him a junkie in front of everyone. Chet got clean, but no one would hire him after that. Earl's word was law.",
    responses: [
      { text: "Where can I find Chet?", next: 'snapChetLocation' },
    ],
  },
  snapChetLocation: {
    speaker: 'Marcus "Snap" Whitmore',
    text: "Birdland, probably. He's there most nights, nursing a drink and a grudge.",
    responses: [
      { text: "Thanks, Snap.", next: 'snapEnd' },
    ],
  },
  // === SNAP'S EXPERT BONUS: Industry Insider Knowledge ===
  snapExpertGate: {
    speaker: 'Marcus "Snap" Whitmore',
    text: "You passed my tests. But there's something else I need to know. You understand the music — but do you understand the BUSINESS? The industry that made Earl who he was?",
    responses: [
      { text: "Test me. I know the labels, the producers, the deals.", next: 'snapExpertTest1' },
      { text: "I know enough. What about Teddy?", next: 'snapEnd' },
    ],
  },
  snapExpertTest1: {
    speaker: 'Marcus "Snap" Whitmore',
    text: "Blue Note Records. What made them different from every other jazz label? What did Alfred Lion do that nobody else did?",
    isJazzTrivia: true,
    triviaId: 'snapBlueNoteRehearsals',
    responses: [
      { text: "Blue Note paid musicians for rehearsals. Three sessions before recording. Nobody else did that.", next: 'snapExpertPass1', passesCheck: 'passed_snap_expert_1' },
      { text: "Better recording equipment?", next: 'snapExpertFail1', failsCheck: 'failed_snap_expert_1' },
      { text: "Higher royalties?", next: 'snapExpertFail1', failsCheck: 'failed_snap_expert_1' },
    ],
  },
  snapExpertPass1: {
    speaker: 'Marcus "Snap" Whitmore',
    text: "That's right. Alfred Lion PAID for rehearsals. Three sessions, sometimes more, before you even stepped into Van Gelder's studio. That's why Blue Note records sound tighter — the musicians actually knew the material. Earl recorded for them once. Said it was the best experience of his life.",
    setsFlag: 'passed_snap_expert_1',
    responses: [
      { text: "Earl recorded for Blue Note?", next: 'snapExpertTest2' },
    ],
  },
  snapExpertFail1: {
    speaker: 'Marcus "Snap" Whitmore',
    text: "Rehearsals, man. They PAID for rehearsals. Only label that did. Three sessions to learn the charts before you ever cut tape. That's why their records are tighter than anyone else's.",
    responses: [
      { text: "I didn't know that.", next: 'snapExpertTest2' },
    ],
  },
  snapExpertTest2: {
    speaker: 'Marcus "Snap" Whitmore',
    text: "Here's one that most people get wrong. Before Miles hired Coltrane for his quintet, who was his first choice for saxophone?",
    isJazzTrivia: true,
    triviaId: 'snapSonnyRollinsFirst',
    responses: [
      { text: "Sonny Rollins. But he turned it down to recover from addiction.", next: 'snapExpertPass2', passesCheck: 'passed_snap_expert_2' },
      { text: "Cannonball Adderley?", next: 'snapExpertFail2', failsCheck: 'failed_snap_expert_2' },
      { text: "Coltrane was always his first choice.", next: 'snapExpertFail2', failsCheck: 'failed_snap_expert_2' },
    ],
  },
  snapExpertPass2: {
    speaker: 'Marcus "Snap" Whitmore',
    text: "Sonny Rollins. Turned Miles down because he was getting clean. Went to Chicago to kick the habit. So Miles hired Trane instead — and the rest is history. Sometimes the second choice changes everything. Earl was someone's second choice too. Teddy's.",
    setsFlag: 'passed_snap_expert_2',
    responses: [
      { text: "What do you mean?", next: 'snapExpertTest3' },
    ],
  },
  snapExpertFail2: {
    speaker: 'Marcus "Snap" Whitmore',
    text: "Sonny Rollins, man. He was Miles's first choice. Turned him down to get clean. So Miles hired Coltrane. The whole course of jazz history changed because Sonny said no.",
    responses: [
      { text: "Interesting. What about Earl?", next: 'snapExpertTest3' },
    ],
  },
  snapExpertTest3: {
    speaker: 'Marcus "Snap" Whitmore',
    text: "Last one. George Russell wrote a book that changed how musicians think about harmony. It influenced Kind of Blue, modal jazz, everything. What's it called?",
    isJazzTrivia: true,
    triviaId: 'snapLydianConcept',
    responses: [
      { text: "The Lydian Chromatic Concept of Tonal Organization.", next: 'snapExpertPass3', passesCheck: 'passed_snap_expert_3' },
      { text: "The Theory of Modal Jazz?", next: 'snapExpertFail3', failsCheck: 'failed_snap_expert_3' },
      { text: "I don't know theory books.", next: 'snapExpertFail3', failsCheck: 'failed_snap_expert_3' },
    ],
  },
  snapExpertPass3: {
    speaker: 'Marcus "Snap" Whitmore',
    text: "The Lydian Chromatic Concept. George Russell. That book taught Miles and Bill Evans how to think in modes instead of chords. Without that book, there's no Kind of Blue. Earl studied it for years. Said it unlocked everything.",
    setsFlag: 'passed_snap_expert_3',
    responses: [
      { text: "You really knew Earl.", next: 'snapFinalSecret' },
    ],
  },
  snapExpertFail3: {
    speaker: 'Marcus "Snap" Whitmore',
    text: "The Lydian Chromatic Concept of Tonal Organization. George Russell wrote it. Changed how everyone thought about harmony. Earl used to quote from it all the time.",
    responses: [
      { text: "Tell me what else you know.", next: 'snapFinalSecret' },
    ],
  },
  snapFinalSecret: {
    speaker: 'Marcus "Snap" Whitmore',
    text: "Here's what I never told anyone. The night before Earl died, he called me. Apologized for threatening to ruin my career. Said he was leaving The Ember Room, leaving Teddy, leaving everything behind. Said if anything happened to him, I should tell people: 'Teddy Olson is not who he pretends to be.'",
    setsFlag: 'snap_earl_warning',
    responses: [
      { text: "Earl knew he was in danger.", next: 'snapEarlKnew' },
    ],
  },
  snapEarlKnew: {
    speaker: 'Marcus "Snap" Whitmore',
    text: "He knew. He KNEW. And he went back anyway. Because The Starlight deal wasn't final yet, and he needed one more night at The Ember Room. One more night. That's all it took.",
    setsFlag: 'snap_knows_earl_foreknowledge',
    responses: [
      { text: "Will you testify to this?", next: 'snapTestifyFull' },
    ],
  },
  snapTestifyFull: {
    speaker: 'Marcus "Snap" Whitmore',
    text: "Every word. Earl was going to give me another chance. He forgave me. The least I can do is make sure his killer pays.",
    setsFlag: 'snap_will_testify_full',
    responses: [
      { text: "Thank you, Snap. Earl would be proud.", next: 'snapEnd' },
    ],
  },
  snapEnd: {
    speaker: 'Marcus "Snap" Whitmore',
    text: "Find who did this. Earl deserved a better ending.",
    responses: [
      { text: "[End conversation]", next: null },
    ],
  },

  // ============================================================
  // EARL'S APARTMENT - Frank the Super
  // ============================================================
  superIntro: {
    speaker: 'Frank',
    text: "You're another one looking into Earl's death? Cops already came through, made a mess. Not that it wasn't already a mess when they got here.",
    responses: [
      { text: "Someone else searched the apartment?", next: 'superSearched' },
      { text: "Did you see anyone unusual lately?", next: 'superVisitors' },
      { text: "How well did you know Earl?", next: 'superKnewEarl' },
    ],
  },
  superSearched: {
    speaker: 'Frank',
    text: "That's what I told the cops. Door was busted open when I came up this morning. Place was tossed. Drawers emptied, mattress slashed. Whoever did it was looking for something specific.",
    setsFlag: 'apartment_searched',
    responses: [
      { text: "Before or after Earl died?", next: 'superTiming' },
      { text: "Did they find what they were looking for?", next: 'superFound' },
    ],
  },
  superTiming: {
    speaker: 'Frank',
    text: "After, I think. Mrs. Patterson in 4B says she heard noises around 3 AM. Figured it was Earl coming home drunk. Wasn't until morning she heard the news.",
    responses: [
      { text: "I should talk to Mrs. Patterson.", next: 'superEnd' },
    ],
  },
  superFound: {
    speaker: 'Frank',
    text: "Couldn't say. I don't go through tenants' things. But they missed some spots. The compartment behind the desk drawer, for instance. Earl showed me once — thought it was clever.",
    setsFlag: 'hidden_compartment',
    responses: [
      { text: "Thanks for the tip.", next: 'superEnd' },
    ],
  },
  superVisitors: {
    speaker: 'Frank',
    text: "Earl had a lot of visitors. Women, mostly. That girlfriend of his — Ruthie — she was here a lot. And his wife came by once, about a month ago. That was... loud.",
    responses: [
      { text: "His wife? Lorraine?", next: 'superLorraine' },
      { text: "Anything unusual recently?", next: 'superRecent' },
    ],
  },
  superLorraine: {
    speaker: 'Frank',
    text: "Yeah, the singer. Beautiful woman. She came to pick up some of her things, I think. Earl wasn't home. She had a key — must've been from before. Spent about an hour, left crying.",
    responses: [
      { text: "That's interesting.", next: 'superEnd' },
    ],
  },
  superRecent: {
    speaker: 'Frank',
    text: "Last week, there was a white guy. Nice suit, slicked hair. Earl didn't seem happy to see him. They argued in the hallway. The guy said something about 'what he was owed.'",
    setsFlag: 'teddy_visited_earl',
    responses: [
      { text: "That sounds like Teddy Olson.", next: 'superTeddy' },
    ],
  },
  superTeddy: {
    speaker: 'Frank',
    text: "I don't know names. But Earl looked scared. First time I ever saw that. Earl was always cool, you know? Nothing rattled him. But this guy... Earl was scared.",
    responses: [
      { text: "Thanks, Frank. That's helpful.", next: 'superEnd' },
    ],
  },
  superKnewEarl: {
    speaker: 'Frank',
    text: "Ten years in this building. Good tenant, mostly. Paid late sometimes, but always paid. He'd play piano at 3 AM, but nobody complained. When Earl played, you wanted to listen.",
    responses: [
      { text: "Did he seem worried about anything lately?", next: 'superWorried' },
    ],
  },
  superWorried: {
    speaker: 'Frank',
    text: "Worried? Earl was always worried about something. Money, women, his music. But yeah, last few weeks... he looked tired. Like he wasn't sleeping. Kept checking over his shoulder.",
    responses: [
      { text: "Like someone was following him.", next: 'superEnd' },
    ],
  },
  superEnd: {
    speaker: 'Frank',
    text: "You need anything else, I'll be downstairs. And... find whoever did this. Earl was one of the good ones.",
    responses: [
      { text: "[End conversation]", next: null },
    ],
  },

  // ============================================================
  // EARL'S APARTMENT - Mrs. Patterson (Neighbor)
  // ============================================================
  neighborIntro: {
    speaker: 'Mrs. Patterson',
    text: "Oh, you're here about Earl. Such a tragedy. Such a lovely man. Always said hello in the hallway. Not like some people in this building.",
    responses: [
      { text: "Did you hear anything unusual last night?", next: 'neighborHeard' },
      { text: "Did Earl have many visitors?", next: 'neighborVisitors' },
    ],
  },
  neighborHeard: {
    speaker: 'Mrs. Patterson',
    text: "Around 3 AM, yes. Footsteps, banging. I thought it was Earl, coming home from one of his shows. But the noises went on too long. Crashing, like furniture being moved. I almost called the police.",
    responses: [
      { text: "But you didn't?", next: 'neighborDidnt' },
    ],
  },
  neighborDidnt: {
    speaker: 'Mrs. Patterson',
    text: "I didn't want to be a bother. That's my problem — always too polite. If I had called... maybe they would have caught whoever did that to his apartment.",
    responses: [
      { text: "You couldn't have known.", next: 'neighborComfort' },
    ],
  },
  neighborComfort: {
    speaker: 'Mrs. Patterson',
    text: "I suppose not. But I keep thinking... what were they looking for? Earl didn't have much. Just his music and his memories.",
    responses: [
      { text: "Maybe that's exactly what they wanted.", next: 'neighborEnd' },
    ],
  },
  neighborVisitors: {
    speaker: 'Mrs. Patterson',
    text: "Women, mostly. That young singer — Ruthie — practically lived here some weeks. And once I saw a older woman leave crying. Beautiful, elegant. I think it was his wife.",
    responses: [
      { text: "His wife Lorraine?", next: 'neighborLorraine' },
    ],
  },
  neighborLorraine: {
    speaker: 'Mrs. Patterson',
    text: "I don't know her name. But she had a key. Let herself in when Earl wasn't home. Stayed about an hour, came out with a box. Old photos, I think. She looked heartbroken.",
    responses: [
      { text: "When was this?", next: 'neighborWhen' },
    ],
  },
  neighborWhen: {
    speaker: 'Mrs. Patterson',
    text: "A month ago? Maybe more. I remember because she dropped a photograph in the hallway. Their wedding picture. I gave it back to her. She just stared at it and cried.",
    responses: [
      { text: "That's very sad.", next: 'neighborEnd' },
    ],
  },
  neighborEnd: {
    speaker: 'Mrs. Patterson',
    text: "Find who did this, won't you? Earl was a good neighbor. This building won't be the same without his music.",
    responses: [
      { text: "[End conversation]", next: null },
    ],
  },

  // ============================================================
  // LORRAINE'S BROWNSTONE - Lorraine Jeffries
  // ============================================================
  lorraineIntro: {
    speaker: 'Lorraine Jeffries',
    text: "You're from Earl's band. The bass player. I remember you. You were always the quiet one, watching everything. I suppose that's why you're here now.",
    responses: [
      { text: "I'm sorry for your loss.", next: 'lorraineSorrow' },
      { text: "Where were you the night Earl died?", next: 'lorraineAlibi' },
      { text: "I need to ask about the insurance policy.", next: 'lorraineInsuranceGate', requiresClue: 'lifeInsurance' },
    ],
  },
  
  // === LORRAINE'S EXPERT JAZZ KNOWLEDGE GATE ===
  lorraineInsuranceGate: {
    speaker: 'Lorraine Jeffries',
    text: "The insurance? That's very personal. Earl trusted you, but I need to know you're really one of his musicians. I was a singer once — I know the music. Name the four movements of Coltrane's 'A Love Supreme.' In order.",
    isJazzTrivia: true,
    triviaId: 'lorraineALoveSupreme',
    responses: [
      { text: "Acknowledgement, Resolution, Pursuance, Psalm.", next: 'lorraineJazzPass', passesCheck: 'passed_lorraine_test' },
      { text: "Acknowledgement, Resolution... I don't remember the rest.", next: 'lorraineJazzPartial' },
      { text: "I'm a bassist, not a Coltrane scholar.", next: 'lorraineJazzFail', failsCheck: 'failed_lorraine_test' },
    ],
  },
  lorraineJazzPass: {
    speaker: 'Lorraine Jeffries',
    text: "Acknowledgement, Resolution, Pursuance, Psalm. Earl played that album every Sunday morning. Said it was his church. You know your Coltrane. I'll tell you about the insurance.",
    setsFlag: 'passed_lorraine_test',
    responses: [
      { text: "Thank you.", next: 'lorraineInsurance' },
      { text: "Coltrane only performed A Love Supreme live once. In France. Earl told me he cried when he heard about it.", next: 'lorraineDeepColtrane' },
    ],
  },
  
  // === LORRAINE'S EXPERT COLTRANE PATH ===
  lorraineDeepColtrane: {
    speaker: 'Lorraine Jeffries',
    text: "You know about the Antibes performance? July 1965. Earl was obsessed with finding a recording of it. Said hearing Coltrane play that suite live must have been like... like witnessing a miracle.",
    isJazzTrivia: true,
    triviaId: 'lorraineAntibes',
    setsFlag: 'lorraine_coltrane_bond',
    responses: [
      { text: "And there's a church in San Francisco now. Saint John Coltrane African Orthodox Church. They worship through A Love Supreme.", next: 'lorraineColtraneChurch' },
      { text: "Earl understood spiritual music. Tell me about him.", next: 'lorraineEarlSpiritual' },
    ],
  },
  lorraineColtraneChurch: {
    speaker: 'Lorraine Jeffries',
    text: "Earl told me about that church. He wanted to visit someday. Said if any music could be holy, it was A Love Supreme. That's why I played it at his funeral. Even though we were separated. Even though...",
    isJazzTrivia: true,
    triviaId: 'lorraineColtraneSaintJohn',
    setsFlag: 'knows_coltrane_church',
    responses: [
      { text: "You still loved him.", next: 'lorraineStillLoved' },
    ],
  },
  lorraineStillLoved: {
    speaker: 'Lorraine Jeffries',
    text: "I never stopped. Sixteen years of marriage, five years of separation, and I never stopped. He was impossible. Selfish. Brilliant. The most infuriating man I ever met. And the only one who ever made me feel truly alive.",
    setsFlag: 'lorraine_loved_earl',
    responses: [
      { text: "Who would want him dead?", next: 'lorraineWhoKilled' },
    ],
  },
  lorraineWhoKilled: {
    speaker: 'Lorraine Jeffries',
    text: "Teddy Olson. Earl was terrified of him those last weeks. Said Teddy's 'investors' had threatened to hurt me if Earl didn't stay. That's when I knew it was serious. Earl never cared about threats to himself. But threatening me...",
    setsFlag: 'lorraine_threatened',
    setsFlag2: 'teddy_threatened_lorraine',
    responses: [
      { text: "Teddy threatened you?", next: 'lorraineThreatened' },
    ],
  },
  lorraineThreatened: {
    speaker: 'Lorraine Jeffries',
    text: "Through Earl. 'Tell your wife to stay inside.' That's what Teddy said. Earl was terrified. That's why he asked me to take out the insurance policy. He knew something bad was coming. He just didn't know when.",
    setsFlag: 'lorraine_full_motive',
    responses: [
      { text: "I'll make sure Teddy pays for what he did.", next: 'lorraineEnd' },
    ],
  },
  lorraineEarlSpiritual: {
    speaker: 'Lorraine Jeffries',
    text: "Earl believed music was sacred. Not just entertainment — a connection to something higher. That's why Teddy never understood him. Teddy saw Earl as a product. Earl saw himself as a priest of sound.",
    responses: [
      { text: "And Teddy killed his own church.", next: 'lorraineInsurance' },
    ],
  },
  lorraineJazzPartial: {
    speaker: 'Lorraine Jeffries',
    text: "Pursuance and Psalm. The last two. Earl would be disappointed — he loved that record. But I can see you're sincere. I'll tell you what you want to know.",
    responses: [
      { text: "I appreciate it.", next: 'lorraineInsurance' },
    ],
  },
  lorraineJazzFail: {
    speaker: 'Lorraine Jeffries',
    text: "Any real musician in Earl's band would know 'A Love Supreme.' He played it constantly. I'm not sure I can trust you with personal information.",
    setsFlag: 'failed_lorraine_test',
    responses: [
      { text: "Earl asked you to take out the policy. That's suspicious.", next: 'lorraineDefensiveFail' },
    ],
  },
  lorraineDefensiveFail: {
    speaker: 'Lorraine Jeffries',
    text: "Suspicious? I'm the one who should be suspicious of YOU. Earl's 'bassist' who doesn't know basic jazz. Talk to Mae. She'll confirm I was here all night. That's all you're getting from me.",
    responses: [
      { text: "[End conversation]", next: null },
    ],
  },
  lorraineSorrow: {
    speaker: 'Lorraine Jeffries',
    text: "My loss. Yes. I suppose it is, isn't it? Even after everything. Sixteen years of marriage, then five years of... whatever we were. And now this.",
    responses: [
      { text: "You still loved him.", next: 'lorraineLoved' },
    ],
  },
  lorraineLoved: {
    speaker: 'Lorraine Jeffries',
    text: "Is that stupid? After all the women, the lies, the broken promises? Yes. I still loved him. I gave up my singing career for that man. Raised no children because he said he wasn't ready. And I still loved him.",
    responses: [
      { text: "That must have made you angry.", next: 'lorraineAngry' },
      { text: "That's not stupid. That's human.", next: 'lorraineHuman' },
    ],
  },
  lorraineAngry: {
    speaker: 'Lorraine Jeffries',
    text: "Angry? I was furious. For years. But anger burns out eventually. All that's left is... this. A brownstone full of memories and a man who'll never come back to make more.",
    responses: [
      { text: "I'm sorry.", next: 'lorraineAlibi' },
    ],
  },
  lorraineHuman: {
    speaker: 'Lorraine Jeffries',
    text: "Human. Yes. That's all any of us are, aren't we? Even Earl, with all his faults. He was just a man who loved music more than he loved anything else. Including me.",
    responses: [
      { text: "I need to ask where you were that night.", next: 'lorraineAlibi' },
    ],
  },
  lorraineAlibi: {
    speaker: 'Lorraine Jeffries',
    text: "I was here. All night. My sister Mae came over for cards. We played until 2 AM. She fell asleep on the sofa. When I woke up, there were police at my door.",
    responses: [
      { text: "Can Mae confirm that?", next: 'lorraineMae' },
      { text: "That's convenient.", next: 'lorraineDefensive' },
    ],
  },
  lorraineMae: {
    speaker: 'Lorraine Jeffries',
    text: "She's in the kitchen. Ask her yourself. She'll tell you the same thing. I know I look like a suspect — the scorned wife, the insurance money. But I didn't kill Earl. I couldn't.",
    responses: [
      { text: "I believe you.", next: 'lorraineRelief' },
      { text: "Tell me about the insurance.", next: 'lorraineInsurance' },
    ],
  },
  lorraineDefensive: {
    speaker: 'Lorraine Jeffries',
    text: "Convenient? You think I planned this? Set up an alibi? I was playing five-card draw with my sister while my husband was being murdered. There's nothing convenient about that.",
    responses: [
      { text: "I'm sorry. I have to ask these questions.", next: 'lorraineMae' },
    ],
  },
  lorraineInsurance: {
    speaker: 'Lorraine Jeffries',
    text: "Earl asked me to take it out. A few weeks ago. He came here — first time in months — and asked me to do him this one favor. Said someone was threatening him. Someone he owed money to.",
    setsFlag: 'earl_feared_for_life',
    responses: [
      { text: "Did he say who?", next: 'lorraineWho' },
    ],
  },
  lorraineWho: {
    speaker: 'Lorraine Jeffries',
    text: "Teddy. The club owner. Earl said if anything happened to him, the insurance would pay off his debts. He said it like a joke, but his hands were shaking. Earl was scared.",
    setsFlag: 'earl_feared_teddy',
    responses: [
      { text: "Earl thought Teddy might kill him.", next: 'lorraineConfirm' },
    ],
  },
  lorraineConfirm: {
    speaker: 'Lorraine Jeffries',
    text: "He didn't say it outright. But yes. That's what he meant. And now Earl's dead, and Teddy... Teddy's still running his club like nothing happened.",
    responses: [
      { text: "Not for long.", next: 'lorraineEnd' },
    ],
  },
  lorraineRelief: {
    speaker: 'Lorraine Jeffries',
    text: "Thank you. That means something. Find who did this. Not for me — for Earl. Whatever he was, he deserved better than dying in the back room of that club.",
    responses: [
      { text: "I will.", next: 'lorraineEnd' },
    ],
  },
  lorraineEnd: {
    speaker: 'Lorraine Jeffries',
    text: "You know where to find me. This is still my home. It always will be.",
    responses: [
      { text: "[End conversation]", next: null },
    ],
  },

  // ============================================================
  // LORRAINE'S BROWNSTONE - Mae Thompson (Sister)
  // ============================================================
  maeIntro: {
    speaker: 'Mae Thompson',
    text: "So you're the detective now? The bass player turned investigator? I've seen stranger things in this family.",
    responses: [
      { text: "I just want to find the truth.", next: 'maeTruth' },
      { text: "Can you confirm Lorraine was here all night?", next: 'maeConfirm' },
      { text: "I know you're skeptical. Test me — prove I'm really a musician.", next: 'maeJazzGate' },
    ],
  },
  
  // === MAE'S EXPERT JAZZ KNOWLEDGE GATE ===
  maeJazzGate: {
    speaker: 'Mae Thompson',
    text: "You want to be tested? Fine. I taught music theory for fifteen years before I retired. Let's see what you actually know. What's the fundamental harmonic difference between bebop and modal jazz?",
    isJazzTrivia: true,
    triviaId: 'maeModalVsBebop',
    responses: [
      { text: "Bebop uses rapid chord changes. Modal jazz stays on one scale for extended periods.", next: 'maeJazzPass', passesCheck: 'passed_mae_test' },
      { text: "Bebop is faster?", next: 'maeJazzFail', failsCheck: 'failed_mae_test' },
    ],
  },
  maeJazzPass: {
    speaker: 'Mae Thompson',
    text: "Exactly. Bebop — ii-V-I progressions, constant movement. Modal — one scale, sometimes for an entire piece. Miles revolutionized everything with Kind of Blue. Earl understood this better than most. Maybe you did play in his band.",
    setsFlag: 'passed_mae_test',
    responses: [
      { text: "Now will you tell me what you know?", next: 'maeFullInfo' },
    ],
  },
  maeJazzFail: {
    speaker: 'Mae Thompson',
    text: "Tempo? That's the best you can do? Modal jazz is about HARMONY, not speed. Scales instead of chord changes. Any real musician would know this. Lorraine was here all night. That's all I'm telling you.",
    setsFlag: 'failed_mae_test',
    responses: [
      { text: "At least confirm her alibi.", next: 'maeConfirm' },
    ],
  },
  maeFullInfo: {
    speaker: 'Mae Thompson',
    text: "Lorraine was here all night — I'll swear to that. But there's something else. The night before Earl died, he came to see Lorraine. First time in months. He was scared. Said someone was going to 'make an example' of him.",
    setsFlag: 'earl_warned_lorraine',
    responses: [
      { text: "Did he say who?", next: 'maeWho' },
    ],
  },
  maeWho: {
    speaker: 'Mae Thompson',
    text: "The club owner. Teddy. Earl said Teddy's 'friends' were putting pressure on him. Dangerous friends. Earl wanted Lorraine to know — in case anything happened. I guess he knew.",
    setsFlag: 'mae_confirms_teddy_threat',
    responses: [
      { text: "That's important. Thank you.", next: 'maeEnd' },
    ],
  },
  maeTruth: {
    speaker: 'Mae Thompson',
    text: "The truth? The truth is my sister wasted the best years of her life on a man who didn't deserve her. The truth is she's a suspect in his murder because she had the bad luck to still love him. That truth?",
    responses: [
      { text: "I don't think Lorraine killed Earl.", next: 'maeRelief' },
      { text: "Everyone's a suspect until they're not.", next: 'maeDefensive' },
    ],
  },
  maeRelief: {
    speaker: 'Mae Thompson',
    text: "Finally, someone with sense. Lorraine couldn't hurt anyone. She gave up her singing career, her dreams, everything — for Earl. And this is how it ends.",
    responses: [
      { text: "Can you confirm she was here all night?", next: 'maeConfirm' },
    ],
  },
  maeDefensive: {
    speaker: 'Mae Thompson',
    text: "Then let me make it simple: Lorraine was here, with me, playing cards until 2 AM. She beat me out of twenty dollars. I fell asleep on the sofa. She never left this house.",
    setsFlag: 'lorraine_alibi_confirmed',
    responses: [
      { text: "That clears her.", next: 'maeCleared' },
    ],
  },
  maeConfirm: {
    speaker: 'Mae Thompson',
    text: "I was here all night. We played five-card draw until my eyes wouldn't stay open. Lorraine was across the table the whole time. She never left. Not even to make coffee.",
    setsFlag: 'lorraine_alibi_confirmed',
    responses: [
      { text: "Thank you. That's important.", next: 'maeCleared' },
    ],
  },
  maeCleared: {
    speaker: 'Mae Thompson',
    text: "Find whoever did this. Not for Earl — I never liked the man. But for Lorraine. She deserves to know the truth. She deserves closure.",
    responses: [
      { text: "I'll find them.", next: 'maeEnd' },
    ],
  },
  maeEnd: {
    speaker: 'Mae Thompson',
    text: "See that you do. And if it was that club owner... make sure he pays.",
    responses: [
      { text: "[End conversation]", next: null },
    ],
  },

  // ============================================================
  // BIRDLAND - Symphony Sid
  // ============================================================
  sidIntro: {
    speaker: 'Symphony Sid',
    text: "Well, well. The bass player from Earl's quintet. I heard about what happened. Terrible thing. Terrible. Earl was one of the originals, man. They don't make them like that anymore.",
    responses: [
      { text: "Did you see Chet Malone last night?", next: 'sidChet' },
      { text: "What have you heard about Earl's death?", next: 'sidGossip' },
      { text: "Do you know Ruthie Davis?", next: 'sidRuthie' },
      { text: "You've been broadcasting from Birdland since '49. You know this place better than anyone.", next: 'sidBirdlandExpert' },
    ],
  },
  
  // === SYMPHONY SID'S BIRDLAND EXPERT PATH ===
  sidBirdlandExpert: {
    speaker: 'Symphony Sid',
    text: "Since opening night. December 15th, 1949. You know your history. Most cats today don't even know why this place is called Birdland.",
    responses: [
      { text: "Named for Charlie Parker. Bird.", next: 'sidBirdlandTest1' },
      { text: "I just know you're a legend.", next: 'sidJazzGate' },
    ],
  },
  sidBirdlandTest1: {
    speaker: 'Symphony Sid',
    text: "That's right. And Bird played opening night. Alright, you want the real stories? The ones I don't put on the radio? Answer me this: What was the original admission price at Birdland in 1949?",
    isJazzTrivia: true,
    triviaId: 'sidBirdlandPrice',
    responses: [
      { text: "A dollar fifty. Cheapest ticket to the best music in the world.", next: 'sidBirdlandPass1', passesCheck: 'passed_sid_birdland_1' },
      { text: "I don't know the exact price.", next: 'sidBirdlandFail1' },
    ],
  },
  sidBirdlandPass1: {
    speaker: 'Symphony Sid',
    text: "Dollar fifty. Now it's five bucks and they water the drinks. Progress, they call it. Here's a harder one — August 25th, 1959. What happened to Miles Davis right outside this club?",
    isJazzTrivia: true,
    triviaId: 'sidMilesBirdland',
    setsFlag: 'passed_sid_birdland_1',
    responses: [
      { text: "A cop beat him. Split his head open for standing on the sidewalk during a break.", next: 'sidBirdlandPass2', passesCheck: 'passed_sid_miles' },
      { text: "Something with the police?", next: 'sidBirdlandPartial' },
    ],
  },
  sidBirdlandPass2: {
    speaker: 'Symphony Sid',
    text: "Miles Davis. The biggest star in jazz. Standing outside his own gig, and a cop cracks his skull for 'loitering.' I was there. Saw the blood on the sidewalk. This business... it takes everything from you.",
    setsFlag: 'passed_sid_miles',
    responses: [
      { text: "And Irving Levy? What happened to him?", next: 'sidIrvingLevy' },
    ],
  },
  sidIrvingLevy: {
    speaker: 'Symphony Sid',
    text: "You know about Irving too? January 1959. Stabbed to death right here in the club. His own club. They never caught who did it. Some say it was mob connected. Some say a jealous husband. I say this business is dangerous.",
    isJazzTrivia: true,
    triviaId: 'sidIrvingLevy',
    setsFlag: 'knows_birdland_murder',
    responses: [
      { text: "A club owner killed in his own place. Sound familiar?", next: 'sidConnection' },
    ],
  },
  sidConnection: {
    speaker: 'Symphony Sid',
    text: "You're sharp. Yeah, it sounds like Earl. And Teddy Olson's been nervous ever since — asking questions about what happened to Irving. Maybe he's worried he's next. Or maybe he's making sure history repeats itself.",
    setsFlag: 'sid_teddy_connection',
    setsFlag2: 'unlocks_teddy_fear',
    responses: [
      { text: "What else do you know about Teddy?", next: 'sidTeddyDeep' },
    ],
  },
  sidTeddyDeep: {
    speaker: 'Symphony Sid',
    text: "Teddy came to me last month. Asked if I remembered how Irving's murder was investigated. Asked what the cops looked for, what questions they asked. I thought he was paranoid. Now I think he was planning.",
    setsFlag: 'sid_teddy_premeditation',
    responses: [
      { text: "That's premeditation. He was researching how to get away with murder.", next: 'sidCriticalInfo' },
    ],
  },
  sidCriticalInfo: {
    speaker: 'Symphony Sid',
    text: "I'll testify to that. Put me on the stand. Teddy Olson asked me how to get away with killing a man in a jazz club. That's what I'll tell the jury.",
    setsFlag: 'sid_will_testify_premeditation',
    responses: [
      { text: "That changes everything. Thank you, Sid.", next: 'sidEnd' },
    ],
  },
  sidBirdlandFail1: {
    speaker: 'Symphony Sid',
    text: "A dollar fifty. Everyone forgets. Alright, you're not a historian, but maybe you're still legit. What do you want to know?",
    responses: [
      { text: "What have you heard about Earl's death?", next: 'sidGossip' },
    ],
  },
  sidBirdlandPartial: {
    speaker: 'Symphony Sid',
    text: "Not just 'something.' A cop beat Miles Davis bloody on the sidewalk. For standing outside during a break. The biggest star in jazz. That's what this world does to Black musicians. I saw it happen.",
    responses: [
      { text: "That's horrifying.", next: 'sidGossip' },
    ],
  },
  
  // === SYMPHONY SID'S JAZZ KNOWLEDGE GATE ===
  sidJazzGate: {
    speaker: 'Symphony Sid',
    text: "You say you're investigating for the musicians. Name Coltrane's Classic Quartet. All four. A real sideman would know.",
    isJazzTrivia: true,
    triviaId: 'sidColtraneQuartet',
    responses: [
      { text: "Coltrane on sax, McCoy Tyner on piano, Jimmy Garrison on bass, Elvin Jones on drums.", next: 'sidJazzPass', passesCheck: 'passed_sid_test' },
      { text: "Coltrane, McCoy Tyner... and I forget the rhythm section.", next: 'sidJazzPartial' },
      { text: "I'm a bassist, not a historian.", next: 'sidJazzFail', failsCheck: 'failed_sid_test' },
    ],
  },
  sidJazzPass: {
    speaker: 'Symphony Sid',
    text: "Coltrane, McCoy Tyner, Jimmy Garrison, Elvin Jones. You know your stuff. Alright, I'll tell you what I saw. But this stays between us.",
    setsFlag: 'passed_sid_test',
    responses: [
      { text: "What did you see?", next: 'sidGossip' },
    ],
  },
  sidJazzPartial: {
    speaker: 'Symphony Sid',
    text: "Jimmy Garrison on bass, Elvin Jones on drums. The greatest rhythm section in jazz. You should know your own instrument's history, bass man.",
    responses: [
      { text: "You're right. What did you see last night?", next: 'sidGossip' },
    ],
  },
  sidJazzFail: {
    speaker: 'Symphony Sid',
    text: "A session player for Earl and you can't name Coltrane's quartet? Jimmy Garrison was one of the greatest bassists who ever lived. Get out of here.",
    setsFlag: 'failed_sid_test',
    responses: [
      { text: "Fine. But someone killed Earl, and I'm going to find out who.", next: 'sidReluctant' },
    ],
  },
  sidReluctant: {
    speaker: 'Symphony Sid',
    text: "...Alright. For Earl's sake, I'll tell you a little. But don't expect me to hold your hand.",
    responses: [
      { text: "What have you heard?", next: 'sidGossipLimited' },
    ],
  },
  sidGossipLimited: {
    speaker: 'Symphony Sid',
    text: "Earl owed money to the wrong people. That's all anyone's talking about. Teddy Olson's name keeps coming up.",
    responses: [
      { text: "What about Ruthie?", next: 'sidRuthieBasic' },
      { text: "Thanks.", next: 'sidEnd' },
    ],
  },
  sidRuthieBasic: {
    speaker: 'Symphony Sid',
    text: "Ruthie was here last night. That's all I'm saying.",
    responses: [
      { text: "Here? She said she went home sick.", next: 'sidRuthieLied' },
    ],
  },
  sidChet: {
    speaker: 'Symphony Sid',
    text: "Chet? Yeah, he was here. Came in around 10, maybe 11. Drinking alone, looking rough. Said he was going to 'settle things with Earl.' Made some noise, then left before midnight.",
    responses: [
      { text: "Did he come back?", next: 'sidChetReturn' },
    ],
  },
  sidChetReturn: {
    speaker: 'Symphony Sid',
    text: "Yeah, about an hour later. Even drunker. Sat in that corner and didn't move until closing. If he killed Earl, he did it between leaving and coming back. But that's a tight window.",
    setsFlag: 'chet_alibi_partial',
    responses: [
      { text: "Where is Chet now?", next: 'sidChetNow' },
    ],
  },
  sidChetNow: {
    speaker: 'Symphony Sid',
    text: "In the back, probably. He's been here since it opened. Drinking coffee, not booze. The news about Earl hit him hard. Harder than you'd expect, given their history.",
    responses: [
      { text: "I'll talk to him.", next: 'sidEnd' },
    ],
  },
  sidGossip: {
    speaker: 'Symphony Sid',
    text: "What haven't I heard? Earl owed money to the wrong people. He was leaving The Ember Room for greener pastures. His girlfriend was cheating on him. Pick your motive, man.",
    responses: [
      { text: "Who was his girlfriend cheating with?", next: 'sidRuthieCheating' },
      { text: "Tell me about the money.", next: 'sidMoney' },
    ],
  },
  sidRuthieCheating: {
    speaker: 'Symphony Sid',
    text: "Ruthie? She wasn't cheating — not in the romantic sense. But she was making deals behind Earl's back. Saw her here last night with a Prestige A&R man. Looked like she was cutting her own record deal.",
    setsFlag: 'ruthie_was_at_birdland',
    responses: [
      { text: "She told everyone she went home sick.", next: 'sidRuthieLied' },
    ],
  },
  sidRuthieLied: {
    speaker: 'Symphony Sid',
    text: "Sick of Earl, maybe. That girl's ambitious. Nothing wrong with that, but she should've been straight with him. Earl didn't deserve to be played.",
    responses: [
      { text: "Is Ruthie here now?", next: 'sidRuthieHere' },
    ],
  },
  sidRuthieHere: {
    speaker: 'Symphony Sid',
    text: "Came in about an hour ago. She's in the back, avoiding everyone. Guilt, probably. Or maybe she's just working on her alibi.",
    responses: [
      { text: "I'll talk to her.", next: 'sidEnd' },
    ],
  },
  sidMoney: {
    speaker: 'Symphony Sid',
    text: "Earl owed Teddy Olson four grand in gambling debts. Everyone knew it. But here's the thing — Earl was about to be flush. The Prestige deal, the new club. He would've been able to pay Teddy off in a month.",
    responses: [
      { text: "Unless someone didn't want to wait.", next: 'sidEnd' },
    ],
  },
  sidRuthie: {
    speaker: 'Symphony Sid',
    text: "Ruthie Davis? Sure, I know her. Good singer, better hustler. She was here last night, as a matter of fact. With a Prestige man, talking business.",
    responses: [
      { text: "That's interesting. She said she went home sick.", next: 'sidRuthieLied' },
    ],
  },
  // === SYMPHONY SID'S EXPERT BIRDLAND HISTORY ===
  sidExpertGate: {
    speaker: 'Symphony Sid',
    text: "You want the real story? The stuff I don't tell just anyone? Prove you know Birdland. This place has history — dark history. What was the original admission price when Birdland opened in 1949?",
    isJazzTrivia: true,
    triviaId: 'sidBirdlandPrice',
    responses: [
      { text: "$1.50. 'The Jazz Corner of the World' for a buck fifty.", next: 'sidExpertPass1', passesCheck: 'passed_sid_expert_1' },
      { text: "Five dollars?", next: 'sidExpertFail1', failsCheck: 'failed_sid_expert_1' },
      { text: "I don't know the history.", next: 'sidExpertFail1', failsCheck: 'failed_sid_expert_1' },
    ],
  },
  sidExpertPass1: {
    speaker: 'Symphony Sid',
    text: "$1.50. December 15, 1949. Named after Bird himself — Charlie Parker. You know your Birdland. Here's another one: What happened to Miles Davis right outside this club on August 15, 1959?",
    setsFlag: 'passed_sid_expert_1',
    isJazzTrivia: true,
    triviaId: 'sidMilesBeating',
    responses: [
      { text: "He was beaten by an NYPD officer. During a break between sets.", next: 'sidExpertPass2', passesCheck: 'passed_sid_expert_2' },
      { text: "He got into a car accident?", next: 'sidExpertFail2', failsCheck: 'failed_sid_expert_2' },
    ],
  },
  sidExpertPass2: {
    speaker: 'Symphony Sid',
    text: "That's right. Miles was standing outside, escorting a white woman to a cab. Cop told him to move. Miles said he worked here. Cop beat him bloody, right on the sidewalk. Twelve stitches. The greatest trumpet player in the world, treated like a criminal.",
    setsFlag: 'passed_sid_expert_2',
    responses: [
      { text: "That's the world we live in.", next: 'sidExpertTest3' },
    ],
  },
  sidExpertFail1: {
    speaker: 'Symphony Sid',
    text: "$1.50. That's what it cost to hear the greatest jazz on earth in 1949. You don't know this place like I do.",
    responses: [
      { text: "Tell me what you know about Earl anyway.", next: 'sidGossipLimited' },
    ],
  },
  sidExpertFail2: {
    speaker: 'Symphony Sid',
    text: "He was BEATEN. By a cop. Right outside this club. For being a Black man with a white woman. That's the history of jazz in America, man. You don't know enough.",
    responses: [
      { text: "I'm sorry. What about Earl?", next: 'sidGossipLimited' },
    ],
  },
  sidExpertTest3: {
    speaker: 'Symphony Sid',
    text: "One more. 1959 was a bad year for Birdland. Something terrible happened inside these walls. Irving Levy — one of the owners. What happened to him?",
    isJazzTrivia: true,
    triviaId: 'sidIrvingLevy',
    responses: [
      { text: "He was stabbed to death. Inside the club.", next: 'sidExpertPass3', passesCheck: 'passed_sid_expert_3' },
      { text: "Heart attack?", next: 'sidExpertFail3', failsCheck: 'failed_sid_expert_3' },
      { text: "I don't know.", next: 'sidExpertFail3', failsCheck: 'failed_sid_expert_3' },
    ],
  },
  sidExpertPass3: {
    speaker: 'Symphony Sid',
    text: "Stabbed. Right here. Jazz clubs have always been dangerous places, man. Money, drugs, women, power — people die for less. You understand that. So let me tell you what I REALLY saw the night Earl died.",
    setsFlag: 'passed_sid_expert_3',
    responses: [
      { text: "Tell me everything.", next: 'sidFullTestimony' },
    ],
  },
  sidExpertFail3: {
    speaker: 'Symphony Sid',
    text: "Stabbed to death. 1959. Same year Miles got beaten outside. Jazz has always been surrounded by violence. You don't know the half of it.",
    responses: [
      { text: "I'm learning. What about Earl?", next: 'sidGossip' },
    ],
  },
  sidFullTestimony: {
    speaker: 'Symphony Sid',
    text: "Teddy Olson came here that night. After Earl died. He was shaking, man. White as a ghost. Ordered three bourbons and drank them like water. Then he made a phone call. I heard him say, 'It's done. He won't be leaving now.'",
    setsFlag: 'sid_heard_teddy_confession',
    responses: [
      { text: "'It's done'? That sounds like a confession.", next: 'sidConfessionDetail' },
    ],
  },
  sidConfessionDetail: {
    speaker: 'Symphony Sid',
    text: "That's what I heard. 'It's done. He won't be leaving now.' Then he hung up and sat there staring at nothing for an hour. I've seen a lot of guilty men in my life. Teddy looked like a man who'd just sold his soul.",
    setsFlag: 'sid_will_testify',
    responses: [
      { text: "Will you tell this to the police?", next: 'sidTestify' },
    ],
  },
  sidTestify: {
    speaker: 'Symphony Sid',
    text: "For Earl? Yeah. I'll testify. But you better have more than my word. Teddy's got friends. Dangerous friends. My testimony alone won't be enough to bring him down.",
    responses: [
      { text: "I'm building a case. Every piece helps.", next: 'sidEnd' },
    ],
  },
  // === SID'S BONUS: Village Vanguard History ===
  sidVanguardTest: {
    speaker: 'Symphony Sid',
    text: "You passed the Birdland test. But there's another club that matters. The Village Vanguard. What was the first live album ever recorded there?",
    isJazzTrivia: true,
    triviaId: 'sidVanguardFirst',
    responses: [
      { text: "Sonny Rollins — A Night at the Village Vanguard. 1957.", next: 'sidVanguardPass', passesCheck: 'passed_sid_vanguard' },
      { text: "Bill Evans?", next: 'sidVanguardFail', failsCheck: 'failed_sid_vanguard' },
    ],
  },
  sidVanguardPass: {
    speaker: 'Symphony Sid',
    text: "Sonny Rollins, 1957. Most people say Bill Evans, but that was 1961 — the sessions where Scott LaFaro played his final recordings. Eleven days later, LaFaro was dead. Car accident. Age 25. This music costs lives, man.",
    setsFlag: 'passed_sid_vanguard',
    responses: [
      { text: "Too many young musicians gone too soon.", next: 'sidTragicHistory' },
    ],
  },
  sidVanguardFail: {
    speaker: 'Symphony Sid',
    text: "Bill Evans was 1961. Sonny Rollins was first — 1957. But those Evans sessions... Scott LaFaro's final recordings. Eleven days later, he was dead. Car accident at 25.",
    responses: [
      { text: "This music has a dark history.", next: 'sidTragicHistory' },
    ],
  },
  sidTragicHistory: {
    speaker: 'Symphony Sid',
    text: "Clifford Brown, 1956 — car accident, age 25. Scott LaFaro, 1961 — same thing, same age. Lee Morgan, 1972 — shot by his own woman at Slug's Saloon. Charlie Parker, 34. Coltrane, 40. This music takes everything from you. Earl knew that.",
    responses: [
      { text: "And now Earl's part of that history.", next: 'sidEnd' },
    ],
  },
  sidEnd: {
    speaker: 'Symphony Sid',
    text: "Find the truth, bass man. The jazz world deserves to know what happened to Earl Jeffries.",
    responses: [
      { text: "[End conversation]", next: null },
    ],
  },

  // ============================================================
  // BIRDLAND - Pete Wilson (Journalist)
  // ============================================================
  journalistIntro: {
    speaker: 'Pete Wilson',
    text: "You're investigating Earl's murder? Good. The cops won't dig deep enough. They see a dead Black musician and figure it's drugs or a woman. But there's more to this story.",
    responses: [
      { text: "What have you found?", next: 'journalistFound' },
      { text: "I found a matchbook from The Starlight.", next: 'journalistStarlight', requiresClue: 'matchbook' },
      { text: "What do you know about Teddy Olson?", next: 'journalistTeddy' },
      { text: "You cover the industry. What do you know about Blue Note's practices?", next: 'journalistIndustryExpert' },
    ],
  },
  
  // === JOURNALIST'S INDUSTRY EXPERT PATH ===
  journalistIndustryExpert: {
    speaker: 'Pete Wilson',
    text: "Blue Note? Now you're talking. Alfred Lion and Francis Wolff. Two German Jews who understood jazz better than most Americans. Why do you ask?",
    responses: [
      { text: "Blue Note was the only label that paid musicians for rehearsals.", next: 'journalistBlueNoteTest' },
      { text: "I'm just making conversation.", next: 'journalistFound' },
    ],
  },
  journalistBlueNoteTest: {
    speaker: 'Pete Wilson',
    text: "You know about the rehearsal payments? That's insider knowledge. Lion paid for three rehearsal sessions before every recording. No other label did that. You've done your research.",
    isJazzTrivia: true,
    triviaId: 'journalistBlueNote',
    setsFlag: 'knows_blue_note_practices',
    responses: [
      { text: "And Reid Miles only got paid fifty dollars per album cover. Created the most iconic jazz art in history for fifty bucks.", next: 'journalistReidMiles' },
      { text: "The music business exploits everyone.", next: 'journalistExploitation' },
    ],
  },
  journalistReidMiles: {
    speaker: 'Pete Wilson',
    text: "Fifty dollars! And here's the irony — Reid Miles preferred classical music. Didn't even like jazz. But he created the visual language of the entire genre. You're not just a bassist, are you?",
    isJazzTrivia: true,
    triviaId: 'journalistReidMiles',
    setsFlag: 'knows_reid_miles',
    responses: [
      { text: "I pay attention. What else do you know about the money in this business?", next: 'journalistMoneyTrail' },
    ],
  },
  journalistMoneyTrail: {
    speaker: 'Pete Wilson',
    text: "Money? That's the story I'm really chasing. Teddy Olson didn't build The Ember Room with his own cash. He borrowed from people who don't file tax returns. And when Earl was about to leave...",
    setsFlag: 'journalist_money_lead',
    responses: [
      { text: "Teddy's investors would have lost their meal ticket.", next: 'journalistInvestors' },
    ],
  },
  journalistInvestors: {
    speaker: 'Pete Wilson',
    text: "Exactly. I've been trying to trace the money for months. Teddy's backers are connected to the Genovese family. Earl's death might not just be about Teddy — it might go all the way to the top.",
    setsFlag: 'mob_connection_revealed',
    setsFlag2: 'journalist_deep_story',
    responses: [
      { text: "That's a dangerous story to chase.", next: 'journalistDanger' },
    ],
  },
  journalistDanger: {
    speaker: 'Pete Wilson',
    text: "Dangerous? It's the truth. And I'm going to print it. With your help, I'll have the evidence I need. Find proof that Teddy's mob-connected, and I'll make sure the whole world knows what happened to Earl Jeffries.",
    setsFlag: 'journalist_alliance',
    responses: [
      { text: "You'll have your proof.", next: 'journalistEnd' },
    ],
  },
  journalistExploitation: {
    speaker: 'Pete Wilson',
    text: "That's the truth. Musicians create the art, owners take the money. Earl figured that out. That's why he was leaving Teddy for The Starlight. And that's why he's dead.",
    responses: [
      { text: "Tell me more about The Starlight.", next: 'journalistStarlight' },
    ],
  },
  
  // === JOURNALIST'S QUOTE ATTRIBUTION TEST ===
  journalistJazzGate: {
    speaker: 'Pete Wilson',
    text: "I cover jazz. I know the music. But I want to make sure you do too before I share my notes. Who said: 'Don't play what's there, play what's not there'?",
    isJazzTrivia: true,
    triviaId: 'quoteChallenge1',
    responses: [
      { text: "Miles Davis. Everyone knows that.", next: 'journalistJazzPass', passesCheck: 'passed_journalist_test' },
      { text: "Coltrane?", next: 'journalistJazzFail', failsCheck: 'failed_journalist_test' },
      { text: "I don't have time for quotes.", next: 'journalistSkip' },
    ],
  },
  journalistJazzPass: {
    speaker: 'Pete Wilson',
    text: "Miles Davis. You know your history. Maybe you can help me with this story after all. I've been investigating Teddy Olson for months.",
    setsFlag: 'passed_journalist_test',
    responses: [
      { text: "What have you found on Teddy?", next: 'journalistFound' },
    ],
  },
  journalistJazzFail: {
    speaker: 'Pete Wilson',
    text: "Every musician knows that's Miles. Are you sure you played in Earl's band? I'll tell you what I know, but I'm not sharing my sources with someone who doesn't know the basics.",
    setsFlag: 'failed_journalist_test',
    responses: [
      { text: "Just tell me about Teddy.", next: 'journalistFoundBasic' },
    ],
  },
  journalistSkip: {
    speaker: 'Pete Wilson',
    text: "No time for the words that shaped this music? Fine. But don't expect the full picture.",
    responses: [
      { text: "What do you know about Teddy?", next: 'journalistFoundBasic' },
    ],
  },
  journalistFoundBasic: {
    speaker: 'Pete Wilson',
    text: "Teddy Olson owes money to dangerous people. Earl was his lifeline. That's all I'm saying without knowing you better.",
    responses: [
      { text: "I need more than that.", next: 'journalistTeddy' },
    ],
  },
  journalistFound: {
    speaker: 'Pete Wilson',
    text: "I've been working on a story about Teddy Olson. His club is in trouble — his backers want their money, and Earl was his biggest draw. Without Earl, The Ember Room is dead.",
    responses: [
      { text: "What kind of backers?", next: 'journalistBackers' },
    ],
  },
  journalistBackers: {
    speaker: 'Pete Wilson',
    text: "The kind that break legs. Teddy borrowed money from the wrong people to open that club. He's been struggling to pay them back. Earl's gambling debts were keeping him afloat.",
    setsFlag: 'teddy_in_trouble',
    responses: [
      { text: "So when Earl was about to leave...", next: 'journalistMotive' },
    ],
  },
  journalistMotive: {
    speaker: 'Pete Wilson',
    text: "Teddy was finished. No Earl, no star attraction. No star attraction, no paying customers. No paying customers, no money for his backers. Teddy had every reason to want Earl dead.",
    responses: [
      { text: "Or to want him to stay.", next: 'journalistStay' },
    ],
  },
  journalistStay: {
    speaker: 'Pete Wilson',
    text: "That's the thing. I think Teddy tried to make Earl stay. Maybe it got heated. Maybe Teddy snapped. Either way, Earl's dead and Teddy's the only one who benefits.",
    responses: [
      { text: "Can you print this?", next: 'journalistPrint' },
    ],
  },
  journalistPrint: {
    speaker: 'Pete Wilson',
    text: "Not without proof. But if you find it... bring it to me. DownBeat will run the story. The whole world will know what Teddy Olson did.",
    responses: [
      { text: "I'll find the proof.", next: 'journalistEnd' },
    ],
  },
  journalistStarlight: {
    speaker: 'Pete Wilson',
    text: "The Starlight! That's the new club on 52nd. They were trying to steal Earl from Teddy. Offered him triple the money, house band status, the works.",
    responses: [
      { text: "Earl was going to take it?", next: 'journalistDeal' },
    ],
  },
  journalistDeal: {
    speaker: 'Pete Wilson',
    text: "From what I hear, yes. He'd already agreed in principle. Just had to work out the details. Teddy would have been ruined — and furious.",
    setsFlag: 'starlight_deal_confirmed',
    responses: [
      { text: "That's a motive.", next: 'journalistEnd' },
    ],
  },
  journalistTeddy: {
    speaker: 'Pete Wilson',
    text: "Teddy Olson is a man who owes money to dangerous people and smiles to your face while he plans your destruction. I've been investigating him for months. Earl's death might be the story I've been looking for.",
    responses: [
      { text: "Tell me more.", next: 'journalistFound' },
    ],
  },
  journalistEnd: {
    speaker: 'Pete Wilson',
    text: "Good luck. And if you crack this case... remember who helped you.",
    responses: [
      { text: "[End conversation]", next: null },
    ],
  },

  // ============================================================
  // BIRDLAND - Ruthie Davis
  // ============================================================
  ruthieIntro: {
    speaker: 'Ruthie Davis',
    text: "Before you say anything — yes, I know I lied. I wasn't sick. I didn't go home. I was here, at Birdland, meeting with a record producer. But I didn't kill Earl.",
    responses: [
      { text: "Why did you lie?", next: 'ruthieWhyLie' },
      { text: "I have a photo of you here that night.", next: 'ruthiePhoto', requiresClue: 'ruthiePhoto' },
      { text: "Did you know Earl was seeing someone else?", next: 'ruthieOtherWoman', requiresClue: 'loveLetters' },
    ],
  },
  ruthieWhyLie: {
    speaker: 'Ruthie Davis',
    text: "Because I was ashamed. Earl gave me my start. He introduced me to people, got me gigs. And I was going behind his back to get my own record deal. It looks bad. I know it looks bad.",
    responses: [
      { text: "It looks like motive.", next: 'ruthieMotive' },
      { text: "But it's not murder.", next: 'ruthieNotMurder' },
    ],
  },
  ruthieMotive: {
    speaker: 'Ruthie Davis',
    text: "I didn't need Earl dead! The Prestige man wanted to sign me — with or without Earl's blessing. I was going to tell Earl after the deal was done. I just... I needed something that was mine.",
    responses: [
      { text: "I understand.", next: 'ruthieUnderstand' },
    ],
  },
  ruthieNotMurder: {
    speaker: 'Ruthie Davis',
    text: "No. It's ambition. I wanted a career of my own, not just 'Earl Jeffries' girlfriend.' Is that so wrong?",
    responses: [
      { text: "No. It's not wrong.", next: 'ruthieUnderstand' },
    ],
  },
  ruthiePhoto: {
    speaker: 'Ruthie Davis',
    text: "You have a— Let me see that. Yes, that's me. With the Prestige A&R man. We were discussing my demo. That's all it was. A business meeting.",
    setsFlag: 'ruthie_admitted_meeting',
    responses: [
      { text: "Why keep it secret?", next: 'ruthieWhyLie' },
    ],
  },
  ruthieOtherWoman: {
    speaker: 'Ruthie Davis',
    text: "You found the letters? 'S' — I never figured out who she was. Some mystery woman Earl was stringing along. I found out that night. Delia told me in the powder room.",
    responses: [
      { text: "Is that why you left the club?", next: 'ruthieLeft' },
    ],
  },
  ruthieLeft: {
    speaker: 'Ruthie Davis',
    text: "Yes. I was furious. Heartbroken. I was going to confront Earl after the set, but then the Prestige man called. Said he could meet me at Birdland. So I went. I chose my career over my broken heart.",
    responses: [
      { text: "And Earl was dead by the time you heard.", next: 'ruthieHeard' },
    ],
  },
  ruthieHeard: {
    speaker: 'Ruthie Davis',
    text: "I heard the next morning. And yes, my first thought was 'now I'll never get to tell him off.' Selfish, I know. But I didn't kill him. I loved him, even when I hated him.",
    responses: [
      { text: "I believe you.", next: 'ruthieEnd' },
    ],
  },
  ruthieUnderstand: {
    speaker: 'Ruthie Davis',
    text: "Thank you. I know I'm not the grieving girlfriend people expect. But Earl and I... we were complicated. I cared about him. I just cared about my career more.",
    responses: [
      { text: "Where do you think I should look?", next: 'ruthieSuspicion' },
    ],
  },
  ruthieSuspicion: {
    speaker: 'Ruthie Davis',
    text: "Teddy Olson. Earl was scared of him. Really scared. He never said it, but I could tell. The way he'd go quiet when Teddy walked in. The way he'd flinch when Teddy touched his shoulder.",
    setsFlag: 'ruthie_suspects_teddy',
    responses: [
      { text: "Thank you, Ruthie.", next: 'ruthieEnd' },
    ],
  },
  ruthieEnd: {
    speaker: 'Ruthie Davis',
    text: "Find who did this. Not for me — for Earl. He wasn't perfect, but he deserved better.",
    responses: [
      { text: "[End conversation]", next: null },
    ],
  },

  // ============================================================
  // BIRDLAND - Chester "Chet" Malone
  // ============================================================
  chetIntro: {
    speaker: 'Chester "Chet" Malone',
    text: "I know why you're here. You think I killed Earl. Everyone thinks I killed Earl. The guy who ruined my life, finally got what was coming to him, and I was in the alley that night. Perfect suspect, right?",
    responses: [
      { text: "Did you kill him?", next: 'chetDirect' },
      { text: "What were you doing in the alley?", next: 'chetAlley' },
      { text: "Tell me what happened between you and Earl.", next: 'chetHistory' },
      { text: "I need to ask about what you saw. But first — prove you're sober.", next: 'chetJazzGate' },
    ],
  },
  
  // === CHET'S EXPERT JAZZ KNOWLEDGE GATE ===
  chetJazzGate: {
    speaker: 'Chester "Chet" Malone',
    text: "Prove I'm sober? Fine. Ask me anything about jazz. My mind's clear for the first time in years. Test me.",
    responses: [
      { text: "1959. Two jazz legends died that same year. Name them.", next: 'chetJazzTest1' },
    ],
  },
  chetJazzTest1: {
    speaker: 'Chester "Chet" Malone',
    text: "1959? The year everything changed...",
    isJazzTrivia: true,
    triviaId: 'chet1959Deaths',
    responses: [
      { text: "Billie Holiday and Lester Young. Both gone that year.", next: 'chetJazzPass1', passesCheck: 'passed_chet_test_1' },
      { text: "Charlie Parker?", next: 'chetJazzFail1', failsCheck: 'failed_chet_test_1' },
      { text: "Lady Day in July, Prez in March. And Sidney Bechet in May. 1959 took three of the greats.", next: 'chetJazzExpert1', passesCheck: 'passed_chet_expert_1' },
    ],
  },
  chetJazzExpert1: {
    speaker: 'Chester "Chet" Malone',
    text: "You know about Bechet too? Most people forget him. He was the first great jazz soloist. Soprano sax before Coltrane made it famous again. You REALLY know this music.",
    setsFlag: 'passed_chet_expert_1',
    responses: [
      { text: "And Clifford Brown in '56. Car accident at 25. The greats always die young.", next: 'chetDeepExpert' },
      { text: "Tell me what you saw that night.", next: 'chetFullTestimony' },
    ],
  },
  chetDeepExpert: {
    speaker: 'Chester "Chet" Malone',
    text: "Brownie. The greatest trumpet player who ever lived, and he died on the Pennsylvania Turnpike. His pianist's wife fell asleep at the wheel. Richie Powell gone too. All that genius, just... gone.",
    isJazzTrivia: true,
    triviaId: 'chetCliffordBrown',
    setsFlag: 'chet_bonding',
    responses: [
      { text: "And Lee Morgan. Shot at Slug's Saloon by his own common-law wife.", next: 'chetLeeMorgan' },
      { text: "This music takes everything. Tell me about Earl.", next: 'chetFullTestimony' },
    ],
  },
  chetLeeMorgan: {
    speaker: 'Chester "Chet" Malone',
    text: "February 19th, 1972. Helen More shot him right there on the bandstand. I was supposed to be at that gig. Switched shifts at the last minute. Could've been me standing next to him when she pulled that trigger.",
    isJazzTrivia: true,
    triviaId: 'chetLeeMorganDeath',
    setsFlag: 'chet_morgan_connection',
    responses: [
      { text: "You've seen a lot of death in this business.", next: 'chetDeathWisdom' },
    ],
  },
  chetDeathWisdom: {
    speaker: 'Chester "Chet" Malone',
    text: "Too much. Bird at 34, looking like he was 60. Brownie at 25. Lee at 33. Scott LaFaro at 25 — eleven days after his greatest recording. And now Earl. This music kills the people who love it most.",
    setsFlag: 'chet_death_wisdom',
    responses: [
      { text: "But you survived.", next: 'chetSurvivor' },
    ],
  },
  chetSurvivor: {
    speaker: 'Chester "Chet" Malone',
    text: "Barely. The drinking almost got me. Earl's betrayal almost finished what the bottle started. But I'm still here. And I'm going to help you find who killed him. Not because he deserved it — but because the truth matters.",
    setsFlag: 'chet_full_commitment',
    responses: [
      { text: "Tell me everything you saw.", next: 'chetFullTestimony' },
    ],
  },
  chetJazzPass1: {
    speaker: 'Chester "Chet" Malone',
    text: "Lady Day and Prez. March and July. The year jazz lost its heart and soul. You know your history. Hit me with another one.",
    setsFlag: 'passed_chet_test_1',
    responses: [
      { text: "What's 'sheets of sound'?", next: 'chetJazzTest2' },
    ],
  },
  chetJazzFail1: {
    speaker: 'Chester "Chet" Malone',
    text: "Bird died in '55, man. How do you not know this? Billie Holiday and Lester Young — THEY died in '59. March and July. Maybe YOU'RE the one who's not thinking straight.",
    setsFlag: 'failed_chet_test_1',
    responses: [
      { text: "Fine. What did you see in the alley?", next: 'chetAlleyLimited' },
    ],
  },
  chetAlleyLimited: {
    speaker: 'Chester "Chet" Malone',
    text: "I saw Earl and Teddy arguing. That's all you're getting from someone who doesn't respect the music.",
    responses: [
      { text: "[End conversation]", next: null },
    ],
  },
  chetJazzTest2: {
    speaker: 'Chester "Chet" Malone',
    text: "Sheets of sound?",
    isJazzTrivia: true,
    triviaId: 'chetSheetsOfSound',
    responses: [
      { text: "Coltrane's technique — rapid arpeggios creating a wall of notes.", next: 'chetJazzPass2', passesCheck: 'passed_chet_test_2' },
      { text: "Something about big band arrangements?", next: 'chetJazzFail2', failsCheck: 'failed_chet_test_2' },
    ],
  },
  chetJazzPass2: {
    speaker: 'Chester "Chet" Malone',
    text: "Coltrane's sheets of sound. Playing so many notes so fast it sounds like one continuous wave. Earl tried to get me to play behind that style once. Nearly killed me. Alright, you're legit. I'll tell you everything I saw.",
    setsFlag: 'passed_chet_full_test',
    responses: [
      { text: "What did you see?", next: 'chetFullTestimony' },
    ],
  },
  chetJazzFail2: {
    speaker: 'Chester "Chet" Malone',
    text: "Big band? Coltrane? Man, you don't know Trane at all. Sheets of sound is his solo technique — rapid arpeggios. I'll talk to you, but you don't deserve the full story.",
    setsFlag: 'failed_chet_test_2',
    responses: [
      { text: "Tell me what you can.", next: 'chetAlley' },
    ],
  },
  chetFullTestimony: {
    speaker: 'Chester "Chet" Malone',
    text: "Here's what I saw: Teddy grabbed Earl by the collar. Said 'You're not leaving. You OWE me.' Earl said, 'I'll pay you when I'm dead.' And Teddy... Teddy said, 'That can be arranged.' Word for word. I'll testify to that.",
    setsFlag: 'chet_heard_teddy_threat',
    setsFlag2: 'chet_will_testify_full',
    responses: [
      { text: "That's a death threat on a witness's word.", next: 'chetCritical' },
    ],
  },
  chetCritical: {
    speaker: 'Chester "Chet" Malone',
    text: "Put me on the stand. I'll say it again. I may have hated Earl, but I'm not going to let his killer walk free just because of that.",
    responses: [
      { text: "Thank you, Chet. That took courage.", next: 'chetEnd' },
    ],
  },
  chetDirect: {
    speaker: 'Chester "Chet" Malone',
    text: "No. I didn't kill Earl. I wanted to. God knows I wanted to. But I didn't. I'm two years sober, and I'm not going to throw that away for a man who already took everything else from me.",
    responses: [
      { text: "What were you doing at The Ember Room?", next: 'chetAlley' },
    ],
  },
  chetAlley: {
    speaker: 'Chester "Chet" Malone',
    text: "I went to confront him. Finally say my piece. Two years he's been badmouthing me, telling everyone I'm a junkie, a liability. I got clean, but no one would hire me. All because of Earl.",
    responses: [
      { text: "Did you confront him?", next: 'chetConfront' },
    ],
  },
  chetConfront: {
    speaker: 'Chester "Chet" Malone',
    text: "I tried. Caught him in the alley before the show. Told him what I thought of him. He just laughed. Said I'd never play drums in this town again. Then Teddy came out, and I left.",
    setsFlag: 'chet_confronted_earl',
    responses: [
      { text: "Teddy came out?", next: 'chetTeddy' },
    ],
  },
  chetTeddy: {
    speaker: 'Chester "Chet" Malone',
    text: "Yeah. He and Earl started arguing about something. Money, I think. I didn't stick around to listen. I came here, to Birdland, and drank until closing. Ask Symphony Sid — he saw me.",
    setsFlag: 'chet_saw_teddy_argument',
    responses: [
      { text: "What time was this?", next: 'chetTime' },
    ],
  },
  chetTime: {
    speaker: 'Chester "Chet" Malone',
    text: "Maybe 10, 10:30? Before the show started. I was here by 11. Left once, came back, stayed until they kicked me out. If Earl died after midnight, I couldn't have done it.",
    setsFlag: 'chet_alibi_established',
    responses: [
      { text: "What were Teddy and Earl arguing about?", next: 'chetArgument' },
    ],
  },
  chetArgument: {
    speaker: 'Chester "Chet" Malone',
    text: "I couldn't hear much. But Teddy was angry. Really angry. Something about 'not leaving' and 'what he was owed.' Earl looked scared. First time I ever saw fear in that man's eyes.",
    setsFlag: 'chet_witnessed_threat',
    responses: [
      { text: "You might have witnessed the motive.", next: 'chetRealize' },
    ],
  },
  chetRealize: {
    speaker: 'Chester "Chet" Malone',
    text: "You think Teddy did it? That actually makes sense. Teddy needed Earl — needed his money, needed his draw. If Earl was leaving... Teddy would have lost everything.",
    responses: [
      { text: "Will you testify to what you saw?", next: 'chetTestify' },
    ],
  },
  chetTestify: {
    speaker: 'Chester "Chet" Malone',
    text: "If it helps put the real killer away? Yeah. I will. I spent two years being blamed for things I didn't do. I'm not going to let Earl's murder be another one.",
    setsFlag: 'chet_will_testify',
    responses: [
      { text: "Thank you, Chet.", next: 'chetEnd' },
    ],
  },
  chetHistory: {
    speaker: 'Chester "Chet" Malone',
    text: "I was his drummer for five years. Five years of Earl taking credit for my work, my ideas. Then I missed one session — ONE — because I was in the hospital, and he fired me. Called me a junkie in front of everyone.",
    responses: [
      { text: "Were you using?", next: 'chetUsing' },
    ],
  },
  chetUsing: {
    speaker: 'Chester "Chet" Malone',
    text: "I was in the hospital for appendicitis. APPENDICITIS. But Earl didn't care about the truth. He'd heard a rumor, and that was enough. My career ended that day.",
    responses: [
      { text: "That's not fair.", next: 'chetNotFair' },
    ],
  },
  chetNotFair: {
    speaker: 'Chester "Chet" Malone',
    text: "No. It wasn't. But life isn't fair, is it? I got clean — I was clean the whole time — and I rebuilt my life. I wasn't going to let Earl take that away too.",
    responses: [
      { text: "So what were you doing at The Ember Room?", next: 'chetAlley' },
    ],
  },
  // === CHET'S EXPERT BONUS: Jazz Martyrs ===
  chetExpertGate: {
    speaker: 'Chester "Chet" Malone',
    text: "You passed my test. But there's something else — something that connects Earl to a long line of musicians who died too young. You want to understand Earl's death? You need to understand jazz's death toll.",
    responses: [
      { text: "Test me. I know the martyrs.", next: 'chetExpertTest1' },
      { text: "I just need your testimony.", next: 'chetEnd' },
    ],
  },
  chetExpertTest1: {
    speaker: 'Chester "Chet" Malone',
    text: "Scott LaFaro. Bill Evans' bassist. He recorded at the Village Vanguard in June 1961 — some of the greatest trio recordings ever made. How many days later did he die?",
    isJazzTrivia: true,
    triviaId: 'chetScottLaFaro',
    responses: [
      { text: "Eleven days. Car accident. He was 25.", next: 'chetExpertPass1', passesCheck: 'passed_chet_expert_1' },
      { text: "A month later?", next: 'chetExpertFail1', failsCheck: 'failed_chet_expert_1' },
      { text: "I don't know.", next: 'chetExpertFail1', failsCheck: 'failed_chet_expert_1' },
    ],
  },
  chetExpertPass1: {
    speaker: 'Chester "Chet" Malone',
    text: "Eleven days. July 6, 1961. Tree on Route 20 in upstate New York. Bill Evans never fully recovered — you can hear it in everything he recorded after. The loss broke him. Here's another one.",
    setsFlag: 'passed_chet_expert_1',
    responses: [
      { text: "Go on.", next: 'chetExpertTest2' },
    ],
  },
  chetExpertFail1: {
    speaker: 'Chester "Chet" Malone',
    text: "Eleven days, man. ELEVEN DAYS. June 25 he recorded Sunday at the Village Vanguard. July 6 he was dead. That's how fast this life takes you.",
    responses: [
      { text: "That's brutal.", next: 'chetExpertTest2' },
    ],
  },
  chetExpertTest2: {
    speaker: 'Chester "Chet" Malone',
    text: "Lee Morgan. 'The Sidewinder.' One of the greatest trumpet players who ever lived. How did he die?",
    isJazzTrivia: true,
    triviaId: 'chetLeeMorgan',
    responses: [
      { text: "Shot by his common-law wife at Slug's Saloon. 1972.", next: 'chetExpertPass2', passesCheck: 'passed_chet_expert_2' },
      { text: "Overdose?", next: 'chetExpertFail2', failsCheck: 'failed_chet_expert_2' },
      { text: "Car accident?", next: 'chetExpertFail2', failsCheck: 'failed_chet_expert_2' },
    ],
  },
  chetExpertPass2: {
    speaker: 'Chester "Chet" Malone',
    text: "Helen More. His own woman. Shot him between sets at Slug's Saloon on the Lower East Side. February 19, 1972. He was 33 years old. Jazz clubs are dangerous places, man. People die in back rooms all the time.",
    setsFlag: 'passed_chet_expert_2',
    responses: [
      { text: "Like Earl.", next: 'chetExpertTest3' },
    ],
  },
  chetExpertFail2: {
    speaker: 'Chester "Chet" Malone',
    text: "Shot. By Helen More, his common-law wife. At Slug's Saloon. Between sets. 1972. That's how jazz takes you — not always the drugs or the lifestyle. Sometimes it's the people closest to you.",
    responses: [
      { text: "Like Earl.", next: 'chetExpertTest3' },
    ],
  },
  chetExpertTest3: {
    speaker: 'Chester "Chet" Malone',
    text: "One more. Clifford Brown. 'Brownie.' Maybe the most promising trumpeter of his generation. Same age as Scott LaFaro when he died. What happened?",
    isJazzTrivia: true,
    triviaId: 'chetCliffordBrown',
    responses: [
      { text: "Car accident. 1956. On the Pennsylvania Turnpike. He was 25.", next: 'chetExpertPass3', passesCheck: 'passed_chet_expert_3' },
      { text: "Drug overdose?", next: 'chetExpertFail3', failsCheck: 'failed_chet_expert_3' },
    ],
  },
  chetExpertPass3: {
    speaker: 'Chester "Chet" Malone',
    text: "June 26, 1956. Pennsylvania Turnpike. Rain, bad tires. Richie Powell was driving — Bud's brother. Both of them, gone. Brownie never touched drugs, never drank. Did everything right. Still died at 25. You understand now? This life doesn't care if you're clean.",
    setsFlag: 'passed_chet_expert_3',
    responses: [
      { text: "Earl did everything right too. And look where it got him.", next: 'chetFinalRevelation' },
    ],
  },
  chetExpertFail3: {
    speaker: 'Chester "Chet" Malone',
    text: "No, man. Brownie was CLEAN. Never touched the stuff. Car accident. Pennsylvania Turnpike. 1956. That's the cruelest thing about jazz — even the ones who do everything right still die young.",
    responses: [
      { text: "Earl did everything right too.", next: 'chetFinalRevelation' },
    ],
  },
  chetFinalRevelation: {
    speaker: 'Chester "Chet" Malone',
    text: "Here's what I didn't tell you before. The night Earl died, I saw something else in that alley. After Teddy grabbed Earl, after I left... I looked back. I saw Teddy follow Earl into the back room. And I saw him come out alone, wiping his hands.",
    setsFlag: 'chet_saw_teddy_enter',
    responses: [
      { text: "You SAW Teddy go in and come out alone?", next: 'chetEyewitness' },
    ],
  },
  chetEyewitness: {
    speaker: 'Chester "Chet" Malone',
    text: "I was drunk. I thought maybe I imagined it. But now, after everything you've told me... I didn't imagine anything. Teddy went into that back room with Earl. And only Teddy came out.",
    setsFlag: 'chet_eyewitness_testimony',
    responses: [
      { text: "That's eyewitness testimony. That changes everything.", next: 'chetWillTestifyFull' },
    ],
  },
  chetWillTestifyFull: {
    speaker: 'Chester "Chet" Malone',
    text: "Put me on the stand. I'll tell them everything. The argument, the threat, Teddy going in, Teddy coming out alone. I've spent two years being blamed for things I didn't do. It's time the truth came out.",
    setsFlag: 'chet_full_eyewitness',
    responses: [
      { text: "Thank you, Chet. This is the break I needed.", next: 'chetEnd' },
    ],
  },
  chetEnd: {
    speaker: 'Chester "Chet" Malone',
    text: "Find the truth. That's all any of us want. The truth about Earl, and the truth about who killed him.",
    responses: [
      { text: "[End conversation]", next: null },
    ],
  },
};

// Import novice dialogue trees
import { dialogueTreesNovice } from './dialogueNovice';

// Nodes that have novice alternatives (trivia-related)
const NOVICE_OVERRIDE_NODES = [
  'teddyJazzTest',
  'teddyCaughtLie1', 
  'teddyJazzContinue',
  'teddyCaughtLie2',
  'teddyJazzContinue2',
  'teddyJazzContinue3',
  'teddyCaughtLie3',
  'rudyTest',
  'rudyTestPass',
  'rudyTestFail',
  'rudySecondChance',
  'rudyFinalFail',
  'jimmyTriviaTest',
  'jimmyTestPass',
  'jimmyTestFail',
  'sidTriviaTest',
  'sidTestPass',
  'sidTestFail',
  'peteQuoteTest',
  'peteTestPass',
  'peteTestFail',
  'lorraineQuoteTest',
  'lorraineTestPass',
  'lorraineTestFail',
];

/**
 * Get dialogue node based on difficulty setting
 * @param {string} nodeId - The dialogue node ID
 * @param {string} difficulty - 'novice' or 'expert'
 * @returns {object|null} The dialogue node
 */
export function getDialogueNode(nodeId, difficulty = 'expert') {
  // If novice mode and this node has a novice alternative, use it
  if (difficulty === 'novice' && NOVICE_OVERRIDE_NODES.includes(nodeId)) {
    const noviceNode = dialogueTreesNovice[nodeId];
    if (noviceNode) {
      return noviceNode;
    }
  }
  
  // Otherwise use the standard (expert) dialogue
  return dialogueTrees[nodeId] || null;
}
