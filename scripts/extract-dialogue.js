// Script to extract dialogue for voice generation
// Run with: node scripts/extract-dialogue.js

const dialogueTrees = {
  // Teddy Olson dialogues
  teddyIntro: { speaker: 'Teddy Olson', text: "Terrible thing. Terrible. Earl was... he was like family to this place. Twenty years he played here. Twenty years." },
  teddyAlibi: { speaker: 'Teddy Olson', text: "Me? I was out front the whole set. Ask anyone. Working the room, greeting guests. That's my job." },
  teddyAlibiPress: { speaker: 'Teddy Olson', text: "Maybe I stepped out for a smoke. Five minutes, tops. A man can't take a break?" },
  teddyConfronted: { speaker: 'Teddy Olson', text: "Twenty— Jimmy said that? He's mistaken. It was five minutes, maybe ten. I had a phone call. Business. Nothing to do with Earl." },
  teddyPhoneCall: { speaker: 'Teddy Olson', text: "Private business. My investors. They're... impatient people. That's all you need to know." },
  teddyThreatened: { speaker: 'Teddy Olson', text: "Watch your mouth. You don't know who you're dealing with. I run a legitimate business here. Earl's death is a tragedy, but it's not MY tragedy. Now get out of my face." },
  teddyDefensive: { speaker: 'Teddy Olson', text: "Hey, watch it. I liked Earl. We had our disagreements, sure, but I didn't— Look, you're the one who had a screaming match with him three days ago. Maybe the cops should be asking YOU questions." },
  teddyNoWitness: { speaker: 'Teddy Olson', text: "I don't know. I wasn't keeping track. It was busy. Look, are we done here?" },
  teddyDebt: { speaker: 'Teddy Olson', text: "Where'd you— That's private business. Between me and Earl. It wasn't like that. He was good for it. He had that Prestige deal coming through." },
  teddyDebtPress: { speaker: 'Teddy Olson', text: "Earl always paid. Eventually. That's just how it was with him. He'd get into a hole, then climb out. I had no reason to— This conversation is over." },
  teddyDebtOthers: { speaker: 'Teddy Olson', text: "What happens at my tables stays at my tables. But... Lorraine knew. His wife. Ex-wife. Whatever she is. She came by once, made a scene." },
  teddyLorraineAddress: { speaker: 'Teddy Olson', text: "Brownstone on 138th Street. Can't miss it. Three stories, blue door. She never moved, even after Earl left. Sentimental, I guess." },
  teddyStarlight: { speaker: 'Teddy Olson', text: "The Starlight? What about it? That's the new place on 52nd. Competition. Why are you asking about The Starlight?" },
  teddyStarlightPress: { speaker: 'Teddy Olson', text: "...Earl was talking to The Starlight? Behind my back? After everything I did for him? Twenty years, and he was going to— No. No, I don't believe it." },
  teddyStarlightReaction: { speaker: 'Teddy Olson', text: "I... no. I didn't know. Earl wouldn't— we had a deal. He owed me. He couldn't just leave." },
  teddyStarlightAccusation: { speaker: 'Teddy Olson', text: "You're out of line. I want you out of my club. NOW. Don't come back unless you have a badge or a warrant." },
  teddyWitnesses: { speaker: 'Teddy Olson', text: "The usual crowd. Jimmy at the bar, Delia working tables. Ruthie — Earl's girl — she was here early but left with a headache. Snap and the band. Maybe fifty, sixty customers." },
  teddyRuthie: { speaker: 'Teddy Olson', text: "Said she wasn't feeling well. Left before the second set. Pretty thing. Too pretty for Earl, if you ask me. But he always could charm them." },
  teddyRuthieUpset: { speaker: 'Teddy Olson', text: "Maybe. I don't know. I'm not in the business of reading women's moods. Ask Delia — they talked in the powder room." },
  teddyEnd: { speaker: 'Teddy Olson', text: "You know where to find me." },

  // Lorraine Jeffries dialogues
  lorraineIntro: { speaker: 'Lorraine Jeffries', text: "You're from Earl's band. The bass player. I remember you. You were always the quiet one, watching everything. I suppose that's why you're here now." },
  lorraineSorrow: { speaker: 'Lorraine Jeffries', text: "My loss. Yes. I suppose it is, isn't it? Even after everything. Sixteen years of marriage, then five years of... whatever we were. And now this." },
  lorraineLoved: { speaker: 'Lorraine Jeffries', text: "Is that stupid? After all the women, the lies, the broken promises? Yes. I still loved him. I gave up my singing career for that man. Raised no children because he said he wasn't ready. And I still loved him." },
  lorraineAngry: { speaker: 'Lorraine Jeffries', text: "Angry? I was furious. For years. But anger burns out eventually. All that's left is... this. A brownstone full of memories and a man who'll never come back to make more." },
  lorraineHuman: { speaker: 'Lorraine Jeffries', text: "Human. Yes. That's all any of us are, aren't we? Even Earl, with all his faults. He was just a man who loved music more than he loved anything else. Including me." },
  lorraineAlibi: { speaker: 'Lorraine Jeffries', text: "I was here. All night. My sister Mae came over for cards. We played until 2 AM. She fell asleep on the sofa. When I woke up, there were police at my door." },
  lorraineMae: { speaker: 'Lorraine Jeffries', text: "She's in the kitchen. Ask her yourself. She'll tell you the same thing. I know I look like a suspect — the scorned wife, the insurance money. But I didn't kill Earl. I couldn't." },
  lorraineDefensive: { speaker: 'Lorraine Jeffries', text: "Convenient? You think I planned this? Set up an alibi? I was playing five-card draw with my sister while my husband was being murdered. There's nothing convenient about that." },
  lorraineInsurance: { speaker: 'Lorraine Jeffries', text: "Earl asked me to take it out. A few weeks ago. He came here — first time in months — and asked me to do him this one favor. Said someone was threatening him. Someone he owed money to." },
  lorraineWho: { speaker: 'Lorraine Jeffries', text: "Teddy. The club owner. Earl said if anything happened to him, the insurance would pay off his debts. He said it like a joke, but his hands were shaking. Earl was scared." },
  lorraineConfirm: { speaker: 'Lorraine Jeffries', text: "He didn't say it outright. But yes. That's what he meant. And now Earl's dead, and Teddy... Teddy's still running his club like nothing happened." },
  lorraineRelief: { speaker: 'Lorraine Jeffries', text: "Thank you. That means something. Find who did this. Not for me — for Earl. Whatever he was, he deserved better than dying in the back room of that club." },
  lorraineEnd: { speaker: 'Lorraine Jeffries', text: "You know where to find me. This is still my home. It always will be." },

  // Marcus "Snap" Whitmore dialogues
  snapIntro: { speaker: 'Marcus "Snap" Whitmore', text: "You're the bass player, right? From Earl's quintet? Man, I can't believe he's gone. Earl was... he was a lot of things. But he didn't deserve this." },
  snapAlibi: { speaker: 'Marcus "Snap" Whitmore', text: "Here. Right here in this studio. Session ran until 2 AM. Ask Rudy — he's got the logs. I never left." },
  snapRelief: { speaker: 'Marcus "Snap" Whitmore', text: "In the clear? Man, I didn't DO anything. Earl and me, we had our problems, but I wouldn't— I'm not that kind of person." },
  snapDefensive: { speaker: 'Marcus "Snap" Whitmore', text: "Convenient? What's that supposed to mean? I was WORKING. Some of us still have careers to build." },
  snapProblems: { speaker: 'Marcus "Snap" Whitmore', text: "Earl... Look, I'm not proud of everything I did. He found out I was copying his arrangements. Selling them to other bands. It was wrong. I know that now." },
  snapThreatened: { speaker: 'Marcus "Snap" Whitmore', text: "Yeah. Said he'd ruin my career. Make sure I never played in this town again. Earl could do that — one word from him, and you're done." },
  snapDidnt: { speaker: 'Marcus "Snap" Whitmore', text: "No. He calmed down. We talked. I apologized, promised to make it right. Earl was angry, but he wasn't cruel. He gave me another chance." },
  snapEarlDifferent: { speaker: 'Marcus "Snap" Whitmore', text: "People didn't know him like I did. Yeah, he could be hard. But he was also the only one who believed in me when I was just a kid from Detroit with a horn. I owed him everything." },
  snapWhy: { speaker: 'Marcus "Snap" Whitmore', text: "Money. Stupid, I know. Earl wasn't paying enough, and I had debts. So I got greedy. It was the dumbest thing I ever did." },
  snapFallingOut: { speaker: 'Marcus "Snap" Whitmore', text: "That was weeks ago. We patched things up. I made a mistake, Earl called me on it, and we moved on. That's how it works in this business." },
  snapEnemies: { speaker: 'Marcus "Snap" Whitmore', text: "Earl made enemies. That's just facts. Teddy Olson, for one. Earl owed him money and was about to skip town. Chet Malone — Earl destroyed his career. And there were women. Always women with Earl." },
  snapTeddy: { speaker: 'Marcus "Snap" Whitmore', text: "Teddy runs that club like it's his personal kingdom. Earl owed him four grand in gambling debts. And Earl was about to leave for The Starlight — better club, better money. Teddy would've been ruined." },
  snapChet: { speaker: 'Marcus "Snap" Whitmore', text: "Chet Malone. Earl's old drummer. Earl fired him two years ago, called him a junkie in front of everyone. Chet got clean, but no one would hire him after that. Earl's word was law." },
  snapChetLocation: { speaker: 'Marcus "Snap" Whitmore', text: "Birdland, probably. He's there most nights, nursing a drink and a grudge." },
  snapEnd: { speaker: 'Marcus "Snap" Whitmore', text: "Find who did this. Earl deserved a better ending." },

  // Ruthie Davis dialogues
  ruthieIntro: { speaker: 'Ruthie Davis', text: "Before you say anything — yes, I know I lied. I wasn't sick. I didn't go home. I was here, at Birdland, meeting with a record producer. But I didn't kill Earl." },
  ruthieWhyLie: { speaker: 'Ruthie Davis', text: "Because I was ashamed. Earl gave me my start. He introduced me to people, got me gigs. And I was going behind his back to get my own record deal. It looks bad. I know it looks bad." },
  ruthieMotive: { speaker: 'Ruthie Davis', text: "I didn't need Earl dead! The Prestige man wanted to sign me — with or without Earl's blessing. I was going to tell Earl after the deal was done. I just... I needed something that was mine." },
  ruthieNotMurder: { speaker: 'Ruthie Davis', text: "No. It's ambition. I wanted a career of my own, not just 'Earl Jeffries' girlfriend.' Is that so wrong?" },
  ruthiePhoto: { speaker: 'Ruthie Davis', text: "You have a— Let me see that. Yes, that's me. With the Prestige A&R man. We were discussing my demo. That's all it was. A business meeting." },
  ruthieOtherWoman: { speaker: 'Ruthie Davis', text: "You found the letters? 'S' — I never figured out who she was. Some mystery woman Earl was stringing along. I found out that night. Delia told me in the powder room." },
  ruthieLeft: { speaker: 'Ruthie Davis', text: "Yes. I was furious. Heartbroken. I was going to confront Earl after the set, but then the Prestige man called. Said he could meet me at Birdland. So I went. I chose my career over my broken heart." },
  ruthieHeard: { speaker: 'Ruthie Davis', text: "I heard the next morning. And yes, my first thought was 'now I'll never get to tell him off.' Selfish, I know. But I didn't kill him. I loved him, even when I hated him." },
  ruthieUnderstand: { speaker: 'Ruthie Davis', text: "Thank you. I know I'm not the grieving girlfriend people expect. But Earl and I... we were complicated. I cared about him. I just cared about my career more." },
  ruthieSuspicion: { speaker: 'Ruthie Davis', text: "Teddy Olson. Earl was scared of him. Really scared. He never said it, but I could tell. The way he'd go quiet when Teddy walked in. The way he'd flinch when Teddy touched his shoulder." },
  ruthieEnd: { speaker: 'Ruthie Davis', text: "Find who did this. Not for me — for Earl. He wasn't perfect, but he deserved better." },

  // Chester "Chet" Malone dialogues
  chetIntro: { speaker: 'Chester "Chet" Malone', text: "I know why you're here. You think I killed Earl. Everyone thinks I killed Earl. The guy who ruined my life, finally got what was coming to him, and I was in the alley that night. Perfect suspect, right?" },
  chetDirect: { speaker: 'Chester "Chet" Malone', text: "No. I didn't kill Earl. I wanted to. God knows I wanted to. But I didn't. I'm two years sober, and I'm not going to throw that away for a man who already took everything else from me." },
  chetAlley: { speaker: 'Chester "Chet" Malone', text: "I went to confront him. Finally say my piece. Two years he's been badmouthing me, telling everyone I'm a junkie, a liability. I got clean, but no one would hire me. All because of Earl." },
  chetConfront: { speaker: 'Chester "Chet" Malone', text: "I tried. Caught him in the alley before the show. Told him what I thought of him. He just laughed. Said I'd never play drums in this town again. Then Teddy came out, and I left." },
  chetTeddy: { speaker: 'Chester "Chet" Malone', text: "Yeah. He and Earl started arguing about something. Money, I think. I didn't stick around to listen. I came here, to Birdland, and drank until closing. Ask Symphony Sid — he saw me." },
  chetTime: { speaker: 'Chester "Chet" Malone', text: "Maybe 10, 10:30? Before the show started. I was here by 11. Left once, came back, stayed until they kicked me out. If Earl died after midnight, I couldn't have done it." },
  chetArgument: { speaker: 'Chester "Chet" Malone', text: "I couldn't hear much. But Teddy was angry. Really angry. Something about 'not leaving' and 'what he was owed.' Earl looked scared. First time I ever saw fear in that man's eyes." },
  chetRealize: { speaker: 'Chester "Chet" Malone', text: "You think Teddy did it? That actually makes sense. Teddy needed Earl — needed his money, needed his draw. If Earl was leaving... Teddy would have lost everything." },
  chetTestify: { speaker: 'Chester "Chet" Malone', text: "If it helps put the real killer away? Yeah. I will. I spent two years being blamed for things I didn't do. I'm not going to let Earl's murder be another one." },
  chetHistory: { speaker: 'Chester "Chet" Malone', text: "I was his drummer for five years. Five years of Earl taking credit for my work, my ideas. Then I missed one session — ONE — because I was in the hospital, and he fired me. Called me a junkie in front of everyone." },
  chetUsing: { speaker: 'Chester "Chet" Malone', text: "I was in the hospital for appendicitis. APPENDICITIS. But Earl didn't care about the truth. He'd heard a rumor, and that was enough. My career ended that day." },
  chetNotFair: { speaker: 'Chester "Chet" Malone', text: "No. It wasn't. But life isn't fair, is it? I got clean — I was clean the whole time — and I rebuilt my life. I wasn't going to let Earl take that away too." },
  chetEnd: { speaker: 'Chester "Chet" Malone', text: "Find the truth. That's all any of us want. The truth about Earl, and the truth about who killed him." },
};

// Prologue narrator text
const prologueNarration = [
  "3:47 AM",
  "The phone screams you awake.",
  "For a moment you don't know where you are. Hotel room. Cleveland? No — you're home. Back in New York two days now. The gig in Cleveland was last week. Or the week before.",
  "The phone keeps ringing.",
  "Cop voice. You can always tell.",
  "It's not a question. Of course you know it. You've played there a hundred times. Earl's home base for twenty years.",
  "A pause. Static on the line.",
  "You sit up. The room tilts.",
  "Earl. Dead.",
  "Three days ago you screamed at him in front of half of Harlem. Called him a thief and a liar. Told him you were done.",
  "Now he's dead.",
  "The line goes dead.",
  "You stare at the phone in your hand.",
  "Earl is dead. And you're a suspect.",
  "Time to find out what really happened.",
];

// Extract and count
function extractByCharacter() {
  const characters = {
    'Teddy Olson': [],
    'Lorraine Jeffries': [],
    'Marcus "Snap" Whitmore': [],
    'Ruthie Davis': [],
    'Chester "Chet" Malone': [],
    'Narrator': prologueNarration,
  };

  // Extract from dialogue trees
  Object.values(dialogueTrees).forEach(node => {
    if (characters[node.speaker]) {
      characters[node.speaker].push(node.text);
    }
  });

  // Calculate stats
  console.log('\n=== VOICE GENERATION SUMMARY ===\n');
  
  let totalChars = 0;
  
  Object.entries(characters).forEach(([name, lines]) => {
    const charCount = lines.join(' ').length;
    totalChars += charCount;
    console.log(`${name}:`);
    console.log(`  Lines: ${lines.length}`);
    console.log(`  Characters: ${charCount.toLocaleString()}`);
    console.log('');
  });

  console.log(`TOTAL CHARACTERS: ${totalChars.toLocaleString()}`);
  console.log(`\nElevenLabs Free Tier: 10,000 chars/month`);
  console.log(`Months needed: ${Math.ceil(totalChars / 10000)}`);

  return characters;
}

// Run extraction
const extracted = extractByCharacter();
