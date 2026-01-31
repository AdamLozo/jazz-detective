import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { characters, suspects } from '../data/characters';
import CharacterPortrait from './CharacterPortrait';
import AccusationDrama from './AccusationDrama';
import { 
  placeableEvents, 
  getTimelineCompletion,
  suspectHasAlibi 
} from '../data/timelineEvents';

export default function AccusationScreen() {
  const { state, dispatch } = useGame();
  const [selectedSuspect, setSelectedSuspect] = useState(null);
  const [confirming, setConfirming] = useState(false);
  const [showingDrama, setShowingDrama] = useState(false);
  const [showingConfrontation, setShowingConfrontation] = useState(false);
  const [confrontationStep, setConfrontationStep] = useState(0);
  
  const suspectList = suspects.map(id => characters[id]);
  const placedEvents = state.placedTimelineEvents || [];
  
  // Check timeline completion status
  const timelineCompletion = getTimelineCompletion(
    placedEvents, 
    state.collectedClues, 
    state.dialogueFlags
  );
  const hasTimelineBonus = timelineCompletion >= 50;
  const hasContradictions = state.dialogueFlags.timeline_teddy_contradiction;
  
  // Check alibis from timeline
  const snapHasAlibi = suspectHasAlibi('snap', placedEvents);
  const lorraineHasAlibi = suspectHasAlibi('lorraine', placedEvents);
  const chetHasAlibi = suspectHasAlibi('chet', placedEvents);
  const ruthieHasAlibi = suspectHasAlibi('ruthie', placedEvents);
  const teddyHasAlibi = suspectHasAlibi('teddy', placedEvents);
  
  // === EVIDENCE CHECKS ===
  // Physical clues
  const hasArgumentTape = state.collectedClues.find(c => c.id === 'argumentTape');
  const hasGossipColumn = state.collectedClues.find(c => c.id === 'gossipColumn');
  const hasMatchbook = state.collectedClues.find(c => c.id === 'matchbook');
  const hasGamblingIOUs = state.collectedClues.find(c => c.id === 'gamblingIOUs');
  const hasLifeInsurance = state.collectedClues.find(c => c.id === 'lifeInsurance');
  const hasThreateningNote = state.collectedClues.find(c => c.id === 'threateningNote');
  const hasPawnTicket = state.collectedClues.find(c => c.id === 'pawnTicket');
  const hasSessionLogs = state.collectedClues.find(c => c.id === 'sessionLogs');
  const hasBrokenGlass = state.collectedClues.find(c => c.id === 'brokenGlass');
  const hasLoveLetters = state.collectedClues.find(c => c.id === 'loveLetters');
  const hasSnapArrangements = state.collectedClues.find(c => c.id === 'snapArrangements');
  const hasRuthiePhoto = state.collectedClues.find(c => c.id === 'ruthiePhoto');
  const hasChetSighting = state.collectedClues.find(c => c.id === 'chetSighting');
  const hasSisterTestimony = state.collectedClues.find(c => c.id === 'sisterTestimony');
  const hasStarlightInfo = state.collectedClues.find(c => c.id === 'starlightInfo');
  
  // Dialogue flags
  const earlFearedTeddy = state.dialogueFlags.earl_feared_teddy;
  const chetWitnessedThreat = state.dialogueFlags.chet_witnessed_threat || state.dialogueFlags.chet_full_eyewitness;
  const sidHeardConfession = state.dialogueFlags.sid_heard_teddy_confession;
  const hasTeddyLedger = state.dialogueFlags.has_teddy_ledger;
  const mobConnectionRevealed = state.dialogueFlags.mob_connection_revealed;
  const bartenderContradicts = state.dialogueFlags.bartender_contradicts_teddy;
  const expertHumiliatedTeddy = state.dialogueFlags.expert_humiliated_teddy;
  const teddyNearConfession = state.dialogueFlags.teddy_near_confession;
  const snapWillTestify = state.dialogueFlags.snap_will_testify;
  const sidWillTestify = state.dialogueFlags.sid_will_testify;
  
  // Count evidence against each suspect for variable endings
  const getEvidenceCount = (suspectId) => {
    let count = 0;
    
    if (suspectId === 'teddy') {
      if (hasGamblingIOUs) count++;
      if (hasArgumentTape) count++;
      if (hasMatchbook || hasStarlightInfo) count++;
      if (hasGossipColumn) count++;
      if (hasThreateningNote) count++;
      if (hasTeddyLedger) count++;
      if (mobConnectionRevealed) count++;
      if (bartenderContradicts || hasContradictions) count++;
      if (chetWitnessedThreat) count++;
      if (sidHeardConfession) count++;
      if (earlFearedTeddy) count++;
      if (hasTimelineBonus && !teddyHasAlibi) count++;
    }
    
    if (suspectId === 'lorraine') {
      if (hasLifeInsurance) count++;
      if (state.collectedClues.find(c => c.id === 'earlDatebook')) count++;
      if (state.collectedClues.find(c => c.id === 'locksmithReceipt')) count++; // Actually helps her
    }
    
    if (suspectId === 'snap') {
      if (hasSnapArrangements) count++;
      if (state.dialogueFlags.snap_admitted_copying) count++;
    }
    
    if (suspectId === 'ruthie') {
      if (hasBrokenGlass) count++;
      if (hasLoveLetters) count++;
      if (state.dialogueFlags.ruthie_lied_about_sickness) count++;
    }
    
    if (suspectId === 'chet') {
      count++; // Motive is always present
      if (state.dialogueFlags.chet_confronted_earl) count++;
      if (state.dialogueFlags.chet_hated_earl) count++;
    }
    
    return count;
  };
  
  // Enhanced confrontation dialogue for Teddy
  const getConfrontationDialogue = () => {
    const dialogue = [];
    
    // === OPENING ===
    if (hasTimelineBonus && hasContradictions) {
      dialogue.push({
        speaker: 'you',
        text: "Let me walk you through the night of November 14th, Teddy. I've reconstructed the entire timeline.",
      });
      dialogue.push({
        speaker: 'teddy',
        text: "What is this? Some kind of shakedown? I already told the cops everything.",
      });
      dialogue.push({
        speaker: 'you',
        text: "You told the cops a story. I'm here to tell you the truth.",
      });
      dialogue.push({
        speaker: 'teddy',
        text: "I don't have to listen to this. I've got a club to run.",
        stage: 'dismissive',
      });
      dialogue.push({
        speaker: 'you',
        text: "Sit down, Teddy. You're going to want to hear this before the police do.",
      });
    } else {
      dialogue.push({
        speaker: 'you',
        text: "I know what you did, Teddy. I know you killed Earl.",
      });
      dialogue.push({
        speaker: 'teddy',
        text: "You're out of your mind. Earl was my headliner. Why would I—",
      });
      dialogue.push({
        speaker: 'you',
        text: "Why don't you tell me? I've got all night.",
      });
      dialogue.push({
        speaker: 'teddy',
        text: "I was running my club. Ask anyone who was here.",
        stage: 'defensive',
      });
    }
    
    // === ALIBIS OF OTHERS ===
    if (hasTimelineBonus) {
      const alibis = [];
      if (snapHasAlibi) alibis.push({ name: 'Snap', detail: "at Van Gelder's studio until 2:15 AM" });
      if (lorraineHasAlibi) alibis.push({ name: 'Lorraine', detail: "with her sister Mae playing cards" });
      if (chetHasAlibi) alibis.push({ name: 'Chet', detail: "at Birdland all night" });
      if (ruthieHasAlibi) alibis.push({ name: 'Ruthie', detail: "at Birdland making a record deal" });
      
      if (alibis.length >= 2) {
        dialogue.push({
          speaker: 'you',
          text: "Let's talk about where everyone was that night. I've checked.",
        });
        dialogue.push({
          speaker: 'teddy',
          text: "Checked? What are you, a private eye now?",
        });
        dialogue.push({
          speaker: 'you',
          text: `${alibis[0].name} was ${alibis[0].detail}. Verified. ${alibis[1].name} was ${alibis[1].detail}. Also verified.`,
        });
        
        if (alibis.length >= 3) {
          dialogue.push({
            speaker: 'you',
            text: `${alibis[2].name}? ${alibis[2].detail}. That's three suspects with airtight alibis.`,
          });
        }
        
        if (alibis.length === 4) {
          dialogue.push({
            speaker: 'you',
            text: `And ${alibis[3].name}? ${alibis[3].detail}. Four alibis. All verified.`,
          });
        }
        
        dialogue.push({
          speaker: 'teddy',
          text: "Good for them. What's your point?",
        });
        dialogue.push({
          speaker: 'you',
          text: "My point is everyone else can account for their time. Everyone except you.",
        });
        dialogue.push({
          speaker: 'teddy',
          text: "I told you — I was here! Running the club!",
          stage: 'agitated',
        });
      }
    }
    
    // === THE CONTRADICTION (20 minutes vs 5) ===
    if (hasContradictions || bartenderContradicts) {
      dialogue.push({
        speaker: 'you',
        text: "That's funny. Because I talked to Jimmy.",
      });
      dialogue.push({
        speaker: 'teddy',
        text: "Jimmy? My bartender? What about him?",
      });
      dialogue.push({
        speaker: 'you',
        text: "You told the police you stepped out for five minutes during the second set. Just to check on something in back.",
      });
      dialogue.push({
        speaker: 'teddy',
        text: "That's right. Five minutes, maybe less.",
      });
      dialogue.push({
        speaker: 'you',
        text: "Jimmy says it was twenty.",
      });
      dialogue.push({
        speaker: 'teddy',
        text: "...",
        stage: 'caught',
      });
      dialogue.push({
        speaker: 'you',
        text: "Twenty minutes, Teddy. Not five. Jimmy's been tending bar for fifteen years. He knows how to count time.",
      });
      dialogue.push({
        speaker: 'teddy',
        text: "Jimmy's confused. It was a busy night. Lots of people, lots of—",
      });
      dialogue.push({
        speaker: 'you',
        text: "He's not confused. He noticed because you left him alone during the rush. He had to cover the whole bar by himself.",
      });
      dialogue.push({
        speaker: 'teddy',
        text: "So I was gone a little longer than I thought. That doesn't mean—",
      });
      dialogue.push({
        speaker: 'you',
        text: "Twenty minutes. Right around the time Earl was killed in your back room. Your back room, Teddy.",
      });
      dialogue.push({
        speaker: 'teddy',
        text: "Anyone could have gone back there. The door wasn't locked.",
        stage: 'desperate',
      });
    }
    
    // === THE TAPE ===
    if (hasArgumentTape) {
      dialogue.push({
        speaker: 'you',
        text: "I've heard the tape, Teddy.",
      });
      dialogue.push({
        speaker: 'teddy',
        text: "What tape? I don't know what you're—",
      });
      dialogue.push({
        speaker: 'you',
        text: "Rudy Van Gelder's tape. The one where Earl told you he'd pay what he owed when he was dead.",
      });
      dialogue.push({
        speaker: 'teddy',
        text: "That was just... we were arguing. People say things when they're angry.",
      });
      dialogue.push({
        speaker: 'you',
        text: "\"That can be arranged.\" That's what you said back to him. Word for word.",
      });
      dialogue.push({
        speaker: 'teddy',
        text: "I didn't mean it like that! It was just talk!",
        stage: 'panicked',
      });
      dialogue.push({
        speaker: 'you',
        text: "Funny how that 'talk' came true three weeks later.",
      });
    }
    
    // === THE THREATENING NOTE (NEW) ===
    if (hasThreateningNote && hasGamblingIOUs) {
      dialogue.push({
        speaker: 'you',
        text: "I found the note you sent Earl. The one telling him to pay up or else.",
      });
      dialogue.push({
        speaker: 'teddy',
        text: "What note? I never sent any—",
      });
      dialogue.push({
        speaker: 'you',
        text: "\"Pay up or I take it out of your hide.\" Ring any bells?",
      });
      dialogue.push({
        speaker: 'teddy',
        text: "That could be from anyone. Earl owed money to half the city.",
      });
      dialogue.push({
        speaker: 'you',
        text: "The handwriting matches the IOUs, Teddy. Your handwriting. Same slant on the T's, same loop on the Y's.",
      });
      dialogue.push({
        speaker: 'teddy',
        text: "You're reaching. Any lawyer would laugh that out of court.",
        stage: 'defensive',
      });
      dialogue.push({
        speaker: 'you',
        text: "Maybe. But combined with everything else, it paints a picture.",
      });
    }
    
    // === THE DEBT ===
    if (hasGamblingIOUs) {
      dialogue.push({
        speaker: 'you',
        text: "Four thousand dollars. That's what Earl owed you.",
      });
      dialogue.push({
        speaker: 'teddy',
        text: "It was a loan. Between friends. He was good for it.",
      });
      dialogue.push({
        speaker: 'you',
        text: "Was he? Because I found those IOUs, Teddy. The dates go back eighteen months. That's a long time to wait for a friend to pay you back.",
      });
      dialogue.push({
        speaker: 'teddy',
        text: "Earl had expenses. A musician's life isn't easy. I was being patient.",
      });
      
      // Earl was desperate for cash
      if (hasPawnTicket) {
        dialogue.push({
          speaker: 'you',
          text: "Patient? Earl pawned his wife's gold watch — her wedding gift to him — just to make ends meet. He was drowning.",
        });
        dialogue.push({
          speaker: 'teddy',
          text: "That's news to me. I didn't know things were that bad.",
        });
        dialogue.push({
          speaker: 'you',
          text: "You knew exactly how bad things were. That's why you kept squeezing.",
        });
      }
    }
    
    // === THE BACKERS ===
    if (hasGossipColumn) {
      dialogue.push({
        speaker: 'you',
        text: "Your backers weren't being patient, though. Were they?",
      });
      dialogue.push({
        speaker: 'teddy',
        text: "I don't know what you're talking about.",
      });
      dialogue.push({
        speaker: 'you',
        text: "The silent partners. The suits who come around but never stay for the music. The ones DownBeat mentioned in their gossip column.",
      });
      dialogue.push({
        speaker: 'teddy',
        text: "Gossip columnists print anything for a headline.",
      });
      dialogue.push({
        speaker: 'you',
        text: "They printed that your backers were getting impatient. That The Ember Room was on thin ice. How much do you owe them, Teddy?",
      });
      dialogue.push({
        speaker: 'teddy',
        text: "That's none of your business.",
        stage: 'cold',
      });
      dialogue.push({
        speaker: 'you',
        text: "It became my business when Earl turned up dead.",
      });
    }
    
    // === RUDY'S LEDGER - THE BIG DEBT (NEW) ===
    if (hasTeddyLedger) {
      dialogue.push({
        speaker: 'you',
        text: "Fifty thousand dollars.",
      });
      dialogue.push({
        speaker: 'teddy',
        text: "What?",
        stage: 'caught',
      });
      dialogue.push({
        speaker: 'you',
        text: "That's what Rudy's ledger shows you owe. Fifty thousand to some very dangerous people.",
      });
      dialogue.push({
        speaker: 'teddy',
        text: "Rudy doesn't know what he's talking about. He's a recording engineer, not an accountant.",
      });
      dialogue.push({
        speaker: 'you',
        text: "He knows enough to keep records. Careful records. The kind of records that show payments, dates, names.",
      });
      dialogue.push({
        speaker: 'teddy',
        text: "That ledger is... it's out of context. Business loans. Legitimate business.",
        stage: 'panicked',
      });
      dialogue.push({
        speaker: 'you',
        text: "The Genovese family doesn't give out business loans, Teddy.",
      });
    }
    
    // === MOB CONNECTION (NEW) ===
    if (mobConnectionRevealed && !hasTeddyLedger) {
      dialogue.push({
        speaker: 'you',
        text: "I know about your connections, Teddy. The real money behind The Ember Room.",
      });
      dialogue.push({
        speaker: 'teddy',
        text: "I run a legitimate club. Everything's on the books.",
      });
      dialogue.push({
        speaker: 'you',
        text: "Pete Wilson's been digging. He found the connection to the Genovese family. The loans. The pressure.",
      });
      dialogue.push({
        speaker: 'teddy',
        text: "Wilson's a hack looking for a story. He'll print anything—",
      });
      dialogue.push({
        speaker: 'you',
        text: "He's got documentation. When that hits the papers, your backers won't be happy. Unless...",
      });
      dialogue.push({
        speaker: 'teddy',
        text: "Unless what?",
        stage: 'cornered',
      });
      dialogue.push({
        speaker: 'you',
        text: "Unless you're already in custody for murder. Then you've got bigger problems than bad press.",
      });
    }
    
    // === THE STARLIGHT ===
    if (hasMatchbook || hasStarlightInfo) {
      dialogue.push({
        speaker: 'you',
        text: "Earl was leaving. Wasn't he?",
      });
      dialogue.push({
        speaker: 'teddy',
        text: "Leaving? He was my house pianist. We had a deal.",
      });
      
      if (hasMatchbook) {
        dialogue.push({
          speaker: 'you',
          text: "I found the matchbook, Teddy. The Starlight Club. Phone number written inside — MU 5-3890.",
        });
      }
      
      if (hasStarlightInfo) {
        dialogue.push({
          speaker: 'you',
          text: "The Starlight offered Earl a residency. Triple what he made here. Bigger stage, better crowd.",
        });
      }
      
      dialogue.push({
        speaker: 'teddy',
        text: "He was just... exploring options. Every musician does that.",
      });
      dialogue.push({
        speaker: 'you',
        text: "He was leaving. And when he left, you'd never see that four thousand again. The Ember Room would lose its star attraction. Your backers would come calling.",
      });
      dialogue.push({
        speaker: 'teddy',
        text: "You're speculating. You don't know anything.",
        stage: 'cornered',
      });
    }
    
    // === CHET'S WITNESS ===
    if (chetWitnessedThreat) {
      dialogue.push({
        speaker: 'you',
        text: "Chet Malone saw you that night. In the alley.",
      });
      dialogue.push({
        speaker: 'teddy',
        text: "Chet? That washed-up drummer? He'd say anything to—",
      });
      dialogue.push({
        speaker: 'you',
        text: "He saw you arguing with Earl. Said you grabbed him by the collar. Said Earl looked scared.",
      });
      dialogue.push({
        speaker: 'teddy',
        text: "Chet hated Earl. He's not a reliable witness.",
      });
      dialogue.push({
        speaker: 'you',
        text: "He heard you say Earl wasn't leaving. That he owed you. He heard you say 'You're not going anywhere.'",
      });
      
      // Chet saw Teddy enter and exit (enhanced)
      if (state.dialogueFlags.chet_full_eyewitness) {
        dialogue.push({
          speaker: 'you',
          text: "And he saw more than that. He saw you follow Earl into the back room.",
        });
        dialogue.push({
          speaker: 'teddy',
          text: "He's lying. He didn't see—",
        });
        dialogue.push({
          speaker: 'you',
          text: "He saw you come out alone fifteen minutes later. Wiping your hands on a bar towel.",
        });
        dialogue.push({
          speaker: 'teddy',
          text: "...",
          stage: 'breaking',
        });
        dialogue.push({
          speaker: 'you',
          text: "He'll testify to that, Teddy. Under oath.",
        });
      } else {
        dialogue.push({
          speaker: 'you',
          text: "He'll testify to that.",
        });
      }
    }
    
    // === SYMPHONY SID'S PHONE CALL (NEW) ===
    if (sidHeardConfession) {
      dialogue.push({
        speaker: 'you',
        text: "Symphony Sid was at Birdland that night. Near the phone booth.",
      });
      dialogue.push({
        speaker: 'teddy',
        text: "So? Half the musicians in New York go through Birdland.",
      });
      dialogue.push({
        speaker: 'you',
        text: "He overheard a phone call. Someone talking to their 'associates.' Ring any bells?",
      });
      dialogue.push({
        speaker: 'teddy',
        text: "People make phone calls. What's your point?",
        stage: 'defensive',
      });
      dialogue.push({
        speaker: 'you',
        text: "\"It's done. He won't be leaving now.\" That's what Sid heard. Word for word.",
      });
      dialogue.push({
        speaker: 'teddy',
        text: "That could be anyone talking about anything—",
      });
      dialogue.push({
        speaker: 'you',
        text: "The call came from The Ember Room's number. Sid recognized the exchange. And the voice.",
      });
      dialogue.push({
        speaker: 'teddy',
        text: "...",
        stage: 'panicked',
      });
      
      if (sidWillTestify) {
        dialogue.push({
          speaker: 'you',
          text: "Sid's ready to testify. Grand jury if it comes to that.",
        });
      }
    }
    
    // === EXPERT HUMILIATION PATH (NEW) ===
    if (expertHumiliatedTeddy) {
      dialogue.push({
        speaker: 'you',
        text: "You know what got me suspicious in the first place, Teddy?",
      });
      dialogue.push({
        speaker: 'teddy',
        text: "Your overactive imagination?",
      });
      dialogue.push({
        speaker: 'you',
        text: "Your jazz knowledge. Or lack of it.",
      });
      dialogue.push({
        speaker: 'teddy',
        text: "What are you talking about?",
      });
      dialogue.push({
        speaker: 'you',
        text: "You run a jazz club but you couldn't tell me who played drums on Kind of Blue. You said 'Fifty-Seven' when the album came out in '59.",
      });
      dialogue.push({
        speaker: 'teddy',
        text: "So I'm not a walking encyclopedia. That doesn't make me a killer.",
        stage: 'defensive',
      });
      dialogue.push({
        speaker: 'you',
        text: "No. But it made me wonder what you're really doing in this business. And who you're really working for.",
      });
    }
    
    // === EARL KNEW ===
    if (earlFearedTeddy || hasLifeInsurance) {
      dialogue.push({
        speaker: 'you',
        text: "Earl knew, didn't he? He knew you were dangerous.",
      });
      dialogue.push({
        speaker: 'teddy',
        text: "What are you talking about?",
      });
      
      if (hasLifeInsurance) {
        dialogue.push({
          speaker: 'you',
          text: "He took out life insurance three weeks before he died. Ten thousand dollars. Named Lorraine as beneficiary.",
        });
        dialogue.push({
          speaker: 'teddy',
          text: "That's just... being responsible. He had a wife.",
        });
      }
      
      if (earlFearedTeddy) {
        dialogue.push({
          speaker: 'you',
          text: "He left a note with the policy. \"L — take this out. Just in case. T is getting dangerous.\"",
        });
        dialogue.push({
          speaker: 'teddy',
          text: "That's... that's hearsay. Lorraine hated me.",
        });
        dialogue.push({
          speaker: 'you',
          text: "Earl specifically named you, Teddy. The 'T' in his note. He was scared. He knew what you were capable of.",
        });
      }
      
      dialogue.push({
        speaker: 'teddy',
        text: "This is crazy. You're putting together coincidences and calling it evidence.",
        stage: 'desperate',
      });
    }
    
    // === NEAR CONFESSION FLAG (from earlier interrogation) ===
    if (teddyNearConfession) {
      dialogue.push({
        speaker: 'you',
        text: "You almost told me the truth before, Teddy. Back at the club. I saw it in your eyes.",
      });
      dialogue.push({
        speaker: 'teddy',
        text: "I don't know what you think you saw—",
      });
      dialogue.push({
        speaker: 'you',
        text: "The guilt. The weight of it. It's eating you up, isn't it?",
      });
      dialogue.push({
        speaker: 'teddy',
        text: "...",
      });
      dialogue.push({
        speaker: 'you',
        text: "This is your chance to put it down. To tell the truth.",
      });
    }
    
    // === CLOSING ===
    if (hasTimelineBonus && hasContradictions) {
      // Best ending - with timeline evidence
      dialogue.push({
        speaker: 'you',
        text: "Let me lay it out for you, Teddy. Everyone else has an alibi. You don't.",
      });
      dialogue.push({
        speaker: 'teddy',
        text: "I was at the club—",
      });
      dialogue.push({
        speaker: 'you',
        text: "You were gone for twenty minutes. You lied about it. Earl was killed during that window, in your back room.",
      });
      dialogue.push({
        speaker: 'teddy',
        text: "...",
      });
      dialogue.push({
        speaker: 'you',
        text: "You had motive — the money, the backers, Earl leaving. You had opportunity — those twenty minutes. And you threatened him on tape.",
      });
      dialogue.push({
        speaker: 'teddy',
        text: "You can't prove any of this.",
        stage: 'breaking',
      });
      dialogue.push({
        speaker: 'you',
        text: "I don't have to. The police will. I've already called them.",
      });
      dialogue.push({
        speaker: 'teddy',
        text: "...",
      });
      dialogue.push({
        speaker: 'you',
        text: "It's over, Teddy.",
      });
      
      // Long pause, then confession
      dialogue.push({
        speaker: 'teddy',
        text: "He laughed at me.",
        stage: 'broken',
        isConfession: true,
      });
      dialogue.push({
        speaker: 'you',
        text: "What?",
      });
      dialogue.push({
        speaker: 'teddy',
        text: "When I confronted him about the money. About leaving. He laughed. Said The Ember Room would be a memory in a month without him.",
        isConfession: true,
      });
      dialogue.push({
        speaker: 'teddy',
        text: "I made him. I gave him his first real gig. I covered his debts when nobody else would. And he laughed at me.",
        isConfession: true,
      });
      dialogue.push({
        speaker: 'you',
        text: "So you killed him.",
      });
      dialogue.push({
        speaker: 'teddy',
        text: "I didn't plan it. We argued. He pushed me. Said he'd tell my backers I was the one bleeding money. That I'd gambled away their investment.",
        isConfession: true,
      });
      dialogue.push({
        speaker: 'teddy',
        text: "He knew about the fifty grand. Somehow he knew. Said he'd make one phone call and I'd be swimming in the East River.",
        isConfession: true,
      });
      dialogue.push({
        speaker: 'teddy',
        text: "I saw red. The ashtray was right there. Heavy brass. I just... I didn't even think.",
        isConfession: true,
      });
      dialogue.push({
        speaker: 'teddy',
        text: "When I came back to myself, he was on the floor. Not moving.",
        isConfession: true,
      });
      dialogue.push({
        speaker: 'you',
        text: "And you went back out to the bar. Like nothing happened.",
      });
      dialogue.push({
        speaker: 'teddy',
        text: "What else was I supposed to do? The show had to go on.",
        isConfession: true,
      });
      dialogue.push({
        speaker: 'you',
        text: "The show's over now, Teddy.",
      });
    } else {
      // Standard ending - less evidence
      dialogue.push({
        speaker: 'you',
        text: "I'm calling the police, Teddy. You killed Earl Jeffries.",
      });
      dialogue.push({
        speaker: 'teddy',
        text: "You can't prove anything. This is all speculation.",
      });
      dialogue.push({
        speaker: 'you',
        text: "Maybe. But when they start digging — really digging — what are they going to find?",
      });
      dialogue.push({
        speaker: 'teddy',
        text: "...",
      });
      dialogue.push({
        speaker: 'you',
        text: "That's what I thought.",
      });
    }
    
    return dialogue;
  };
  
  // === VARIABLE WRONG ACCUSATION DIALOGUES ===
  const getWrongAccusationDialogue = (suspectId) => {
    const suspect = characters[suspectId];
    const firstName = suspect.name.split(' ')[0];
    const evidenceCount = getEvidenceCount(suspectId);
    const dialogue = [];
    
    // Determine tier based on evidence
    const tier = evidenceCount <= 2 ? 'minimal' : evidenceCount <= 5 ? 'moderate' : 'strong';
    
    dialogue.push({
      speaker: 'you',
      text: `I know you killed Earl, ${firstName}.`,
    });
    
    // === SNAP WHITMORE ===
    if (suspectId === 'snap') {
      if (tier === 'minimal') {
        // Short dismissive response
        dialogue.push({
          speaker: suspectId,
          text: "Me? You're joking, right?",
        });
        dialogue.push({
          speaker: 'you',
          text: "Earl found out about something. Something that could have ruined you.",
        });
        dialogue.push({
          speaker: suspectId,
          text: "I was in New Jersey that night. At Van Gelder's studio. Recording all night.",
        });
        dialogue.push({
          speaker: suspectId,
          text: "You want to accuse somebody, find someone who was actually in Manhattan.",
        });
      } else if (tier === 'moderate') {
        // Defensive with alibis
        dialogue.push({
          speaker: suspectId,
          text: "Excuse me? You think I killed Earl?",
        });
        dialogue.push({
          speaker: 'you',
          text: "You were stealing his arrangements. Selling them to other musicians. He found out.",
        });
        dialogue.push({
          speaker: suspectId,
          text: "Yeah, I was copying charts. That's a long way from murder.",
        });
        dialogue.push({
          speaker: 'you',
          text: "He was going to expose you. End your career.",
        });
        dialogue.push({
          speaker: suspectId,
          text: "Earl threatened to expose a lot of people. Didn't mean they all killed him.",
        });
        
        if (snapHasAlibi || hasSessionLogs) {
          dialogue.push({
            speaker: suspectId,
            text: "Besides, I wasn't even in Manhattan that night. I was at Van Gelder's studio in New Jersey.",
          });
          dialogue.push({
            speaker: 'you',
            text: "Anyone can claim they were somewhere else.",
          });
          dialogue.push({
            speaker: suspectId,
            text: "Rudy's got session logs with timestamps. I was there from 8 PM until after 2 in the morning. Call him.",
          });
          dialogue.push({
            speaker: suspectId,
            text: "There's a whole band of witnesses who'll tell you I was laying down tracks while Earl was getting killed.",
          });
        }
        
        dialogue.push({
          speaker: suspectId,
          text: "You're making a mistake. A big one.",
        });
      } else {
        // Strong evidence but still wrong - detailed rebuttal
        dialogue.push({
          speaker: suspectId,
          text: "You've done your homework. I'll give you that.",
        });
        dialogue.push({
          speaker: 'you',
          text: "You were stealing his arrangements. Selling them for fifty bucks a pop.",
        });
        dialogue.push({
          speaker: suspectId,
          text: "Yeah. I was. And I'm not proud of it.",
        });
        dialogue.push({
          speaker: 'you',
          text: "Earl confronted you. Threatened to blacklist you.",
        });
        dialogue.push({
          speaker: suspectId,
          text: "He did. Two weeks before he died. We had it out right there in the club.",
        });
        dialogue.push({
          speaker: 'you',
          text: "That's motive.",
        });
        dialogue.push({
          speaker: suspectId,
          text: "It's motive for a lot of things. But not murder. Not when I was in New Jersey.",
        });
        dialogue.push({
          speaker: 'you',
          text: "Prove it.",
        });
        dialogue.push({
          speaker: suspectId,
          text: "Rudy Van Gelder's session logs: 8 PM to 2:15 AM. Five musicians saw me. The engineer saw me. The tape has my playing on it.",
        });
        dialogue.push({
          speaker: suspectId,
          text: "You want to check my horn? Still has my spit in the mouthpiece from that session.",
        });
        
        if (snapWillTestify) {
          dialogue.push({
            speaker: suspectId,
            text: "I was going to testify anyway. About what I knew about Teddy. About the money.",
          });
          dialogue.push({
            speaker: 'you',
            text: "What money?",
          });
          dialogue.push({
            speaker: suspectId,
            text: "The money Teddy owed. The real money. Not Earl's four grand — the fifty thousand to those connected guys.",
          });
        }
        
        dialogue.push({
          speaker: suspectId,
          text: "I'm not your killer. But I know who is.",
        });
      }
      
    // === LORRAINE JEFFRIES ===
    } else if (suspectId === 'lorraine') {
      if (tier === 'minimal') {
        dialogue.push({
          speaker: suspectId,
          text: "You think I murdered my own husband?",
        });
        dialogue.push({
          speaker: 'you',
          text: "Ex-husband. And you had reasons.",
        });
        dialogue.push({
          speaker: suspectId,
          text: "I had reasons to divorce him. I did that years ago.",
        });
        dialogue.push({
          speaker: suspectId,
          text: "I was at my sister's house all night. Playing cards. You can ask her.",
        });
        dialogue.push({
          speaker: suspectId,
          text: "The real killer is still out there. Go find them.",
        });
      } else if (tier === 'moderate') {
        dialogue.push({
          speaker: suspectId,
          text: "You think I murdered my own husband?",
        });
        dialogue.push({
          speaker: 'you',
          text: "You had ten thousand reasons. The life insurance policy.",
        });
        dialogue.push({
          speaker: suspectId,
          text: "That policy was Earl's idea. He insisted on it. Said he wanted me taken care of.",
        });
        dialogue.push({
          speaker: 'you',
          text: "Convenient timing. Three weeks before he died.",
        });
        dialogue.push({
          speaker: suspectId,
          text: "You think I don't know what it looks like? But I loved Earl. Even after everything.",
        });
        
        if (lorraineHasAlibi || hasSisterTestimony) {
          dialogue.push({
            speaker: suspectId,
            text: "And I wasn't anywhere near The Ember Room that night. I was at my sister Mae's place in Brooklyn.",
          });
          dialogue.push({
            speaker: 'you',
            text: "Your sister would say anything to protect you.",
          });
          dialogue.push({
            speaker: suspectId,
            text: "We played cards until 2 AM. Her neighbor Mrs. Patterson stopped by around midnight for coffee. She saw me there.",
          });
          dialogue.push({
            speaker: suspectId,
            text: "You want witnesses? I've got witnesses.",
          });
        }
        
        dialogue.push({
          speaker: suspectId,
          text: "You're wasting your time with me. The real killer is still out there.",
        });
      } else {
        // Strong evidence - player has really dug deep but still wrong
        dialogue.push({
          speaker: suspectId,
          text: "So you found the insurance policy. The datebook. Everything.",
        });
        dialogue.push({
          speaker: 'you',
          text: "Ten thousand dollars. Three weeks before he died. You're the beneficiary.",
        });
        dialogue.push({
          speaker: suspectId,
          text: "I know how it looks. Don't you think I know?",
        });
        dialogue.push({
          speaker: 'you',
          text: "You circled all those women's names in his datebook. In red ink.",
        });
        dialogue.push({
          speaker: suspectId,
          text: "I circled them because I wanted to remember. Every single one. Every betrayal.",
        });
        dialogue.push({
          speaker: 'you',
          text: "That's a lot of anger.",
        });
        dialogue.push({
          speaker: suspectId,
          text: "Anger isn't murder. I had fifteen years of anger. If I was going to kill him, I'd have done it a long time ago.",
        });
        dialogue.push({
          speaker: 'you',
          text: "The insurance policy—",
        });
        dialogue.push({
          speaker: suspectId,
          text: "Was Earl's idea. He came to me scared. Said something about Teddy. Said 'T is getting dangerous.' Made me promise to take out the policy.",
        });
        
        if (state.collectedClues.find(c => c.id === 'locksmithReceipt')) {
          dialogue.push({
            speaker: suspectId,
            text: "I changed my locks last month to keep Earl OUT, not to hide from the police.",
          });
          dialogue.push({
            speaker: 'you',
            text: "Keep him out?",
          });
          dialogue.push({
            speaker: suspectId,
            text: "He kept coming by. Begging for money. For help. Said he was in trouble with Teddy. I couldn't take it anymore.",
          });
        }
        
        dialogue.push({
          speaker: suspectId,
          text: "I was at Mae's all night. Mrs. Patterson saw me at midnight. The super saw me leave at 8 AM.",
        });
        dialogue.push({
          speaker: suspectId,
          text: "I still have the wedding photos on my mantle. After everything. Does that sound like a woman who wanted him dead?",
        });
        dialogue.push({
          speaker: suspectId,
          text: "Earl was afraid. He told me who to look at if anything happened. He named Teddy.",
        });
      }
      
    // === CHET MALONE ===
    } else if (suspectId === 'chet') {
      if (tier === 'minimal') {
        dialogue.push({
          speaker: suspectId,
          text: "Me? That's a laugh.",
        });
        dialogue.push({
          speaker: 'you',
          text: "Earl ruined your career. That's motive.",
        });
        dialogue.push({
          speaker: suspectId,
          text: "Motive? Sure. I hated the man. But I was at Birdland that night. Ask anyone.",
        });
        dialogue.push({
          speaker: suspectId,
          text: "You're pointing the finger at the wrong cat.",
        });
      } else if (tier === 'moderate') {
        dialogue.push({
          speaker: suspectId,
          text: "Me? You think I did it?",
        });
        dialogue.push({
          speaker: 'you',
          text: "Earl ruined your career. Got you blacklisted from every club in the city.",
        });
        dialogue.push({
          speaker: suspectId,
          text: "Yeah, Earl screwed me over. And I hated him for it. But I didn't kill him.",
        });
        dialogue.push({
          speaker: 'you',
          text: "You confronted him in the alley that night. Right before the show.",
        });
        dialogue.push({
          speaker: suspectId,
          text: "I wanted to talk. To get him to lift the blacklist. He laughed in my face.",
        });
        dialogue.push({
          speaker: 'you',
          text: "That must have made you angry.",
        });
        dialogue.push({
          speaker: suspectId,
          text: "It made me want to punch him. But I walked away. Ask anyone.",
        });
        
        if (chetHasAlibi || hasChetSighting) {
          dialogue.push({
            speaker: suspectId,
            text: "After that, I went straight to Birdland. Got there around 11. Symphony Sid saw me. Half the jazz scene saw me.",
          });
          dialogue.push({
            speaker: 'you',
            text: "You could have come back.",
          });
          dialogue.push({
            speaker: suspectId,
            text: "I was at Birdland until closing. Two in the morning. There's a dozen musicians who'll vouch for me.",
          });
          dialogue.push({
            speaker: suspectId,
            text: "I wanted Earl to suffer, sure. But alive. I wanted him to see me succeed without him.",
          });
        }
        
        dialogue.push({
          speaker: suspectId,
          text: "You're pointing the finger at the wrong cat.",
        });
      } else {
        // Strong evidence - Chet actually has useful information
        dialogue.push({
          speaker: suspectId,
          text: "You've been busy. I'll give you that.",
        });
        dialogue.push({
          speaker: 'you',
          text: "You confronted Earl that night. In the alley. You threatened him.",
        });
        dialogue.push({
          speaker: suspectId,
          text: "I confronted him, yeah. Told him what I thought of him. But threaten? That's a stretch.",
        });
        dialogue.push({
          speaker: 'you',
          text: "Witnesses say you grabbed him by the collar.",
        });
        dialogue.push({
          speaker: suspectId,
          text: "I grabbed his lapels. There's a difference. Then I walked away.",
        });
        dialogue.push({
          speaker: 'you',
          text: "Why should I believe you?",
        });
        dialogue.push({
          speaker: suspectId,
          text: "Because I saw something. When I was leaving.",
        });
        dialogue.push({
          speaker: 'you',
          text: "What did you see?",
        });
        dialogue.push({
          speaker: suspectId,
          text: "Teddy. Coming out the back door of the club. Around quarter past midnight.",
        });
        dialogue.push({
          speaker: suspectId,
          text: "He was wiping his hands on a bar towel. Looked rattled. Didn't see me in the shadows.",
        });
        dialogue.push({
          speaker: 'you',
          text: "Why didn't you tell the police?",
        });
        dialogue.push({
          speaker: suspectId,
          text: "Because I wasn't supposed to be there. I was blacklisted, remember? If word got out I was near The Ember Room...",
        });
        dialogue.push({
          speaker: suspectId,
          text: "But I'll tell them now. I'll testify. Teddy killed Earl. I saw the proof.",
        });
        dialogue.push({
          speaker: suspectId,
          text: "You're wasting your time with me. Go get the real killer.",
        });
      }
      
    // === RUTHIE VALENTINE ===
    } else if (suspectId === 'ruthie') {
      if (tier === 'minimal') {
        dialogue.push({
          speaker: suspectId,
          text: "You can't be serious.",
        });
        dialogue.push({
          speaker: 'you',
          text: "Earl was cheating on you. You had motive.",
        });
        dialogue.push({
          speaker: suspectId,
          text: "Honey, I knew about the other women. And I didn't care anymore.",
        });
        dialogue.push({
          speaker: suspectId,
          text: "I was at Birdland that night. Making plans for my future. A future without Earl.",
        });
        dialogue.push({
          speaker: suspectId,
          text: "You've got the wrong woman.",
        });
      } else if (tier === 'moderate') {
        dialogue.push({
          speaker: suspectId,
          text: "You can't be serious.",
        });
        dialogue.push({
          speaker: 'you',
          text: "Your lipstick was on a glass in the back room. You lied about going home sick.",
        });
        dialogue.push({
          speaker: suspectId,
          text: "I was in that room earlier in the evening. With Earl. We talked. That doesn't make me a killer.",
        });
        dialogue.push({
          speaker: 'you',
          text: "You found out he was cheating on you. The letters in his apartment.",
        });
        dialogue.push({
          speaker: suspectId,
          text: "I knew about the other women. Earl wasn't subtle. But I had my own plans.",
        });
        dialogue.push({
          speaker: 'you',
          text: "What plans?",
        });
        dialogue.push({
          speaker: suspectId,
          text: "I was meeting with Prestige Records. At Birdland. A solo deal. My way out.",
        });
        
        if (ruthieHasAlibi || hasRuthiePhoto) {
          dialogue.push({
            speaker: suspectId,
            text: "DownBeat sent a photographer. There's a picture of me shaking hands with their A&R man at 11:30.",
          });
          dialogue.push({
            speaker: 'you',
            text: "That doesn't cover the whole night.",
          });
          dialogue.push({
            speaker: suspectId,
            text: "I was at Birdland from 11 until past 1. Celebrating. The deal went through.",
          });
          dialogue.push({
            speaker: suspectId,
            text: "Why would I kill Earl when I was about to leave him anyway? I had everything I wanted.",
          });
        }
        
        dialogue.push({
          speaker: suspectId,
          text: "You've got the wrong woman.",
        });
      } else {
        // Strong evidence - detailed rebuttal
        dialogue.push({
          speaker: suspectId,
          text: "You've found the glass. The lipstick. The lies. I know how it looks.",
        });
        dialogue.push({
          speaker: 'you',
          text: "You were at the scene. You lied about going home sick.",
        });
        dialogue.push({
          speaker: suspectId,
          text: "I lied because I didn't want Earl to know about Prestige. About the solo deal.",
        });
        dialogue.push({
          speaker: 'you',
          text: "You were in the back room with Earl. The night he died.",
        });
        dialogue.push({
          speaker: suspectId,
          text: "Earlier. Around 9. We talked. He wanted me to stay. I told him I had somewhere to be.",
        });
        dialogue.push({
          speaker: 'you',
          text: "The letters. The other woman. 'S.'",
        });
        dialogue.push({
          speaker: suspectId,
          text: "Sandra. A coat check girl at The Blue Note. I knew about her. I knew about all of them.",
        });
        dialogue.push({
          speaker: 'you',
          text: "That didn't make you angry?",
        });
        dialogue.push({
          speaker: suspectId,
          text: "It made me tired. Tired of being Earl's 'singer.' Tired of living in his shadow.",
        });
        dialogue.push({
          speaker: suspectId,
          text: "So I made my own deal. Prestige Records. Solo artist contract. My name on the billing.",
        });
        
        if (hasRuthiePhoto) {
          dialogue.push({
            speaker: suspectId,
            text: "DownBeat's photographer caught me signing at 11:30. I was celebrating until past 1 AM. A dozen people saw me.",
          });
        }
        
        dialogue.push({
          speaker: suspectId,
          text: "Why would I kill the man I was already leaving? I had my ticket out. Clean.",
        });
        dialogue.push({
          speaker: suspectId,
          text: "Earl's death actually complicated things. Now there's an investigation. Press. Questions.",
        });
        dialogue.push({
          speaker: suspectId,
          text: "If I wanted him dead, I'd have waited until after my first album dropped. Used the publicity.",
        });
        dialogue.push({
          speaker: suspectId,
          text: "You want the killer? Look at who needed Earl dead right now. Who couldn't wait.",
        });
      }
    }
    
    // Final exchange for wrong accusations - varies by tier
    if (tier === 'minimal') {
      dialogue.push({
        speaker: 'you',
        text: "The police will sort it out.",
      });
      dialogue.push({
        speaker: suspectId,
        text: "Call them. I've got nothing to hide.",
      });
    } else if (tier === 'moderate') {
      dialogue.push({
        speaker: 'you',
        text: "We'll let the police sort it out.",
      });
      dialogue.push({
        speaker: suspectId,
        text: "Fine. Call them. Because when they dig into this, they're going to find you made a mistake.",
      });
      dialogue.push({
        speaker: suspectId,
        text: "And while you're wasting time with me, the real killer is getting away with murder.",
      });
    } else {
      // Strong evidence tier - player realizes their mistake
      dialogue.push({
        speaker: 'you',
        text: "...",
      });
      dialogue.push({
        speaker: suspectId,
        text: "You're starting to see it now, aren't you? The real picture.",
      });
      dialogue.push({
        speaker: 'you',
        text: "Maybe I've been looking at this wrong.",
      });
      dialogue.push({
        speaker: suspectId,
        text: "You've got good instincts. Just pointed in the wrong direction.",
      });
      dialogue.push({
        speaker: suspectId,
        text: "Think about who really benefited from Earl staying put. Who needed him trapped at The Ember Room.",
      });
      dialogue.push({
        speaker: suspectId,
        text: "The answer's been in front of you the whole time.",
      });
    }
    
    return dialogue;
  };
  
  const handleSelect = (suspectId) => {
    setSelectedSuspect(suspectId);
    setConfirming(false);
    setShowingConfrontation(false);
    setConfrontationStep(0);
  };
  
  const handleConfirmStart = () => {
    setShowingDrama(true);
  };
  
  const handleDramaComplete = () => {
    setShowingDrama(false);
    setShowingConfrontation(true);
    setConfrontationStep(0);
  };
  
  const handleDramaCancel = () => {
    setShowingDrama(false);
    setSelectedSuspect(null);
  };
  
  const handleStartConfrontation = () => {
    setShowingConfrontation(true);
    setConfrontationStep(0);
  };
  
  const handleNextDialogue = () => {
    const dialogue = selectedSuspect === 'teddy' 
      ? getConfrontationDialogue() 
      : getWrongAccusationDialogue(selectedSuspect);
    
    if (confrontationStep < dialogue.length - 1) {
      setConfrontationStep(prev => prev + 1);
    } else {
      dispatch({ type: 'MAKE_ACCUSATION', payload: selectedSuspect });
    }
  };
  
  const handleCancel = () => {
    setConfirming(false);
    setShowingDrama(false);
    setShowingConfrontation(false);
    setConfrontationStep(0);
  };
  
  const handleBack = () => {
    dispatch({ type: 'SET_SCREEN', payload: 'travel' });
  };
  
  const selectedChar = selectedSuspect ? characters[selectedSuspect] : null;
  
  // Get evidence against each suspect for display
  const getEvidenceAgainst = (suspectId) => {
    const evidence = [];
    
    if (suspectId === 'teddy') {
      if (hasGamblingIOUs) evidence.push('Earl owed him $4,000');
      if (hasArgumentTape) evidence.push('Threatened Earl on tape');
      if (hasThreateningNote) evidence.push('Threatening note in his handwriting');
      if (hasMatchbook || hasStarlightInfo) evidence.push('Earl was leaving for The Starlight');
      if (hasGossipColumn) evidence.push('His backers were getting impatient');
      if (hasTeddyLedger) evidence.push('★ Owes $50K to dangerous people');
      if (mobConnectionRevealed) evidence.push('★ Connected to Genovese family');
      if (bartenderContradicts) evidence.push('Jimmy says he was gone 20 minutes');
      if (chetWitnessedThreat) evidence.push('★ Chet witnessed the threat');
      if (sidHeardConfession) evidence.push('★ Sid heard phone confession');
      if (hasContradictions) evidence.push('★ Timeline proves he lied');
      if (!teddyHasAlibi && hasTimelineBonus) evidence.push('★ No alibi during murder window');
    }
    
    if (suspectId === 'lorraine') {
      if (hasLifeInsurance) evidence.push('$10,000 life insurance beneficiary');
      if (state.collectedClues.find(c => c.id === 'earlDatebook')) evidence.push('Knew about his affairs');
      if (earlFearedTeddy) evidence.push('(Earl named Teddy as threat)');
      if (hasSisterTestimony) evidence.push('(Alibi confirmed by sister Mae)');
      if (lorraineHasAlibi) evidence.push('★ Timeline confirms alibi');
    }
    
    if (suspectId === 'snap') {
      if (hasSnapArrangements) evidence.push('Was stealing Earl\'s arrangements');
      if (hasSessionLogs) evidence.push('(Alibi confirmed by Rudy\'s logs)');
      if (snapHasAlibi) evidence.push('★ Timeline confirms alibi');
    }
    
    if (suspectId === 'ruthie') {
      if (hasBrokenGlass) evidence.push('Her lipstick on glass at scene');
      if (hasLoveLetters) evidence.push('Earl was cheating on her');
      if (hasRuthiePhoto) evidence.push('Lied about going home sick');
      if (state.dialogueFlags.ruthie_was_at_birdland) evidence.push('(Was at Birdland making a deal)');
      if (ruthieHasAlibi) evidence.push('★ Timeline confirms alibi');
    }
    
    if (suspectId === 'chet') {
      evidence.push('Earl ruined his career');
      if (state.dialogueFlags.chet_confronted_earl) evidence.push('Confronted Earl in alley that night');
      if (state.dialogueFlags.chet_full_eyewitness) evidence.push('(Saw Teddy exit back room)');
      if (hasChetSighting) evidence.push('(At Birdland during murder window)');
      if (chetHasAlibi) evidence.push('★ Timeline confirms alibi');
    }
    
    return evidence;
  };
  
  // Dramatic accusation sequence
  if (showingDrama && selectedSuspect) {
    return (
      <AccusationDrama
        suspect={characters[selectedSuspect]}
        evidenceCount={getEvidenceCount(selectedSuspect)}
        onComplete={handleDramaComplete}
        onCancel={handleDramaCancel}
      />
    );
  }
  
  // Confrontation screen
  if (showingConfrontation) {
    const dialogue = selectedSuspect === 'teddy' 
      ? getConfrontationDialogue() 
      : getWrongAccusationDialogue(selectedSuspect);
    const currentLine = dialogue[confrontationStep];
    const isPlayerSpeaking = currentLine.speaker === 'you';
    const speakerChar = isPlayerSpeaking ? null : characters[currentLine.speaker];
    
    // Determine background styling based on dialogue stage
    const getStageStyle = () => {
      switch (currentLine.stage) {
        case 'dismissive': return 'border-l-gray-400';
        case 'defensive': return 'border-l-yellow-500';
        case 'agitated': return 'border-l-orange-500';
        case 'caught': return 'border-l-red-400';
        case 'panicked': return 'border-l-red-500';
        case 'cold': return 'border-l-blue-400';
        case 'cornered': return 'border-l-red-600';
        case 'desperate': return 'border-l-red-700';
        case 'breaking': return 'border-l-red-800';
        case 'broken': return 'border-l-red-900';
        default: return 'border-l-jazz-amber';
      }
    };
    
    return (
      <div className="min-h-screen p-10 md:p-20 vignette paper-texture">
        <div className="smoke" style={{ bottom: '20%', right: '5%' }} />
        
        <div className="scene-enter max-w-5xl mx-auto">
          <header className="mb-12">
            <p className="text-xl md:text-2xl tracking-[0.3em] text-red-600 uppercase mb-2">
              {hasTimelineBonus && selectedSuspect === 'teddy' ? 'Timeline Confrontation' : 'Confrontation'}
            </p>
            <h1 className="font-display text-5xl md:text-7xl tracking-wide text-jazz-black">
              THE ACCUSATION
            </h1>
            <div className="w-24 h-1 bg-red-600/60 mt-4" />
          </header>
          
          {/* Dialogue display */}
          <div className={`bg-jazz-black/5 border-l-4 ${getStageStyle()} p-8 mb-8 transition-all duration-300`}>
            {/* Speaker info */}
            <div className="flex items-center gap-4 mb-6">
              {isPlayerSpeaking ? (
                <>
                  <div className="w-16 h-16 rounded-full bg-jazz-blue flex items-center justify-center">
                    <span className="text-jazz-cream font-display text-2xl">YOU</span>
                  </div>
                  <span className="font-display text-2xl text-jazz-blue">You</span>
                </>
              ) : (
                <>
                  <CharacterPortrait characterId={currentLine.speaker} size={64} />
                  <span className="font-display text-2xl text-jazz-amber">
                    {speakerChar?.name || currentLine.speaker}
                  </span>
                </>
              )}
            </div>
            
            {/* Dialogue text */}
            <p className={`text-2xl md:text-3xl leading-relaxed ${
              currentLine.isConfession 
                ? 'text-red-700 italic' 
                : currentLine.text === '...' 
                  ? 'text-jazz-black/40 text-4xl tracking-widest'
                  : 'text-jazz-black/90'
            }`}>
              {currentLine.text === '...' ? currentLine.text : `"${currentLine.text}"`}
            </p>
            
            {currentLine.isConfession && (
              <p className="mt-4 text-lg text-red-600 font-semibold uppercase tracking-wide">
                ★ Confession
              </p>
            )}
          </div>
          
          {/* Progress indicator */}
          <div className="flex items-center gap-1 mb-8">
            {dialogue.map((line, idx) => (
              <div 
                key={idx}
                className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                  idx < confrontationStep 
                    ? 'bg-jazz-amber' 
                    : idx === confrontationStep 
                      ? line.isConfession ? 'bg-red-500' : 'bg-jazz-blue'
                      : 'bg-jazz-black/20'
                }`}
              />
            ))}
          </div>
          
          {/* Dialogue counter */}
          <p className="text-jazz-black/40 text-sm mb-4 text-center">
            {confrontationStep + 1} / {dialogue.length}
          </p>
          
          {/* Continue button */}
          <div className="flex gap-4">
            <button
              onClick={handleCancel}
              className="px-8 py-4 border-2 border-jazz-black/30 text-jazz-black font-display tracking-wide hover:bg-jazz-black/5 transition-all duration-300 text-xl"
            >
              CANCEL
            </button>
            <button
              onClick={handleNextDialogue}
              className={`px-10 py-4 font-display tracking-wide transition-all duration-300 text-xl flex-1 ${
                confrontationStep === dialogue.length - 1
                  ? 'bg-red-700 text-white hover:bg-red-800'
                  : 'bg-jazz-black text-jazz-cream hover:bg-jazz-blue'
              }`}
            >
              {confrontationStep < dialogue.length - 1 ? 'CONTINUE →' : 'END CONFRONTATION'}
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen p-10 md:p-20 vignette paper-texture">
      {/* Atmospheric smoke */}
      <div className="smoke" style={{ bottom: '20%', right: '5%' }} />
      
      <div className="scene-enter">
        <header className="mb-16">
          <p className="text-2xl md:text-3xl tracking-[0.3em] text-jazz-amber uppercase mb-4">
            The moment of truth
          </p>
          <h1 className="font-display text-6xl md:text-8xl tracking-wide text-jazz-black flicker">
            ACCUSATION
          </h1>
          <div className="w-32 h-1 bg-jazz-amber/60 mt-6" />
          <p className="text-jazz-black/70 mt-8 text-2xl md:text-3xl max-w-3xl">
            You've gathered the evidence. You've heard the testimonies. Now it's time to name Earl's killer.
            Choose wisely — there's no going back.
          </p>
          
          {/* Timeline bonus indicator */}
          {hasTimelineBonus && (
            <div className="mt-6 inline-flex items-center gap-3 px-4 py-2 bg-purple-100 border border-purple-300 rounded-lg">
              <span className="text-2xl">📊</span>
              <span className="text-purple-800 text-lg">
                Timeline Reconstructed — Enhanced confrontation available
              </span>
            </div>
          )}
        </header>
        
        {!confirming ? (
          <>
            {/* Suspect grid with portraits */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 max-w-7xl">
              {suspectList.map(suspect => {
                const evidence = getEvidenceAgainst(suspect.id);
                const isSelected = selectedSuspect === suspect.id;
                const hasAlibiFromTimeline = (
                  (suspect.id === 'snap' && snapHasAlibi) ||
                  (suspect.id === 'lorraine' && lorraineHasAlibi) ||
                  (suspect.id === 'chet' && chetHasAlibi) ||
                  (suspect.id === 'ruthie' && ruthieHasAlibi)
                );
                const evidenceCount = getEvidenceCount(suspect.id);
                
                return (
                  <button
                    key={suspect.id}
                    onClick={() => handleSelect(suspect.id)}
                    className={`p-6 border-2 text-left transition-all duration-300 ${
                      isSelected
                        ? 'border-jazz-amber bg-jazz-amber/10 shadow-lg shadow-jazz-amber/20'
                        : hasAlibiFromTimeline
                          ? 'border-green-300 bg-green-50/50 opacity-75'
                          : 'border-jazz-black/20 hover:border-jazz-blue hover:bg-jazz-blue/5'
                    }`}
                  >
                    {/* Portrait and name */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative flex-shrink-0">
                        <CharacterPortrait 
                          characterId={suspect.id} 
                          size={80}
                        />
                        {isSelected && (
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-jazz-amber rounded-full flex items-center justify-center">
                            <span className="text-jazz-black text-xl">✓</span>
                          </div>
                        )}
                        {hasAlibiFromTimeline && !isSelected && (
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xl">✓</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-display text-2xl md:text-3xl tracking-wide">
                          {suspect.name}
                        </h3>
                        <p className="text-jazz-amber text-lg md:text-xl">
                          {suspect.role}
                        </p>
                        {hasAlibiFromTimeline && (
                          <p className="text-green-600 text-base mt-1 font-semibold">
                            ✓ Alibi confirmed by timeline
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {/* Evidence strength indicator */}
                    {suspect.id !== 'teddy' && (
                      <div className="mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-jazz-black/50">Case strength:</span>
                          <div className="flex gap-1">
                            {[1, 2, 3].map(level => (
                              <div 
                                key={level}
                                className={`w-4 h-4 rounded-full ${
                                  evidenceCount >= level * 2 
                                    ? 'bg-red-500' 
                                    : evidenceCount >= level 
                                      ? 'bg-yellow-500'
                                      : 'bg-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-jazz-black/40">
                            ({evidenceCount <= 2 ? 'Weak' : evidenceCount <= 5 ? 'Moderate' : 'Strong'})
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {/* Evidence */}
                    {evidence.length > 0 && (
                      <div className="border-t border-jazz-black/10 pt-4 mt-4">
                        <p className="text-jazz-blue text-lg mb-2 font-semibold">Evidence:</p>
                        <ul className="space-y-1">
                          {evidence.map((e, i) => (
                            <li 
                              key={i} 
                              className={`text-lg ${
                                e.startsWith('(') ? 'text-green-600 italic' : 
                                e.startsWith('★') ? 'text-purple-600 font-semibold' :
                                'text-jazz-black/70'
                              }`}
                            >
                              • {e}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {evidence.length === 0 && (
                      <p className="text-jazz-black/40 text-lg italic mt-4">
                        No direct evidence collected
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
            
            <div className="flex gap-6 flex-wrap">
              <button
                onClick={handleBack}
                className="px-10 py-6 border-2 border-jazz-black/30 text-jazz-black font-display tracking-wide hover:bg-jazz-black/5 transition-all duration-300 text-2xl"
              >
                ← BACK
              </button>
              
              {selectedSuspect && (
                <button
                  onClick={handleConfirmStart}
                  className="px-10 py-6 bg-jazz-amber text-jazz-black font-display tracking-wide hover:bg-jazz-amber/80 transition-all duration-300 text-2xl animate-pulse"
                >
                  ACCUSE {selectedChar.name.toUpperCase()}
                </button>
              )}
            </div>
          </>
        ) : (
          /* Confirmation screen with large portrait */
          <div className="max-w-4xl">
            <div className="p-12 border-2 border-jazz-amber bg-jazz-amber/5 mb-8">
              <div className="flex items-start gap-8 mb-8">
                {/* Large portrait */}
                <div className="flex-shrink-0">
                  <CharacterPortrait 
                    characterId={selectedSuspect} 
                    size={160}
                    className="accusation-portrait"
                  />
                </div>
                
                <div>
                  <h2 className="font-display text-5xl text-jazz-black mb-4">
                    Are you certain?
                  </h2>
                  <p className="text-2xl md:text-3xl text-jazz-black/80 mb-4">
                    You are about to accuse{' '}
                    <strong className="text-jazz-amber">{selectedChar.name}</strong>{' '}
                    of murdering Earl "Duke" Jeffries.
                  </p>
                  <p className="text-xl md:text-2xl text-jazz-black/60">
                    {selectedChar.role}
                  </p>
                  
                  {/* Case strength warning for wrong suspects */}
                  {selectedSuspect !== 'teddy' && (
                    <div className={`mt-6 p-4 rounded-lg ${
                      getEvidenceCount(selectedSuspect) <= 2 
                        ? 'bg-red-100 border border-red-300'
                        : getEvidenceCount(selectedSuspect) <= 5
                          ? 'bg-yellow-100 border border-yellow-300'
                          : 'bg-orange-100 border border-orange-300'
                    }`}>
                      <p className={`text-lg ${
                        getEvidenceCount(selectedSuspect) <= 2 
                          ? 'text-red-800'
                          : getEvidenceCount(selectedSuspect) <= 5
                            ? 'text-yellow-800'
                            : 'text-orange-800'
                      }`}>
                        <strong>⚠️ Warning:</strong> Your case against {selectedChar.name.split(' ')[0]} is{' '}
                        {getEvidenceCount(selectedSuspect) <= 2 
                          ? 'weak. They may dismiss your accusation entirely.'
                          : getEvidenceCount(selectedSuspect) <= 5
                            ? 'moderate. They will have counter-arguments.'
                            : 'strong, but they still have a solid defense.'
                        }
                      </p>
                    </div>
                  )}
                  
                  {/* Timeline bonus notice */}
                  {hasTimelineBonus && selectedSuspect === 'teddy' && (
                    <div className="mt-6 p-4 bg-purple-100 border border-purple-300 rounded-lg">
                      <p className="text-purple-800 text-lg">
                        <strong>📊 Timeline Bonus:</strong> Your reconstructed timeline will strengthen the confrontation significantly.
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="border-t border-jazz-black/20 pt-6">
                <p className="text-xl md:text-2xl text-jazz-black/70">
                  This accusation is final. If you're wrong, the real killer walks free 
                  and you'll never clear your name.
                </p>
              </div>
            </div>
            
            <div className="flex gap-6 flex-wrap">
              <button
                onClick={handleCancel}
                className="btn-ghost px-10 py-6 border-2 border-jazz-black/30 text-jazz-black font-display tracking-wide text-xl md:text-2xl"
              >
                WAIT, LET ME RECONSIDER
              </button>
              
              <button
                onClick={handleStartConfrontation}
                className="btn-noir btn-shine px-10 py-6 bg-jazz-black text-jazz-cream font-display tracking-wide text-xl md:text-2xl"
              >
                CONFRONT {selectedChar.name.split(' ')[0].toUpperCase()}
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Accusation portrait glow */}
      <style>{`
        .accusation-portrait {
          animation: accusationPulse 2s ease-in-out infinite;
        }
        @keyframes accusationPulse {
          0%, 100% { 
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5), 
                        inset 0 0 30px rgba(212, 165, 116, 0.1),
                        0 0 40px rgba(212, 165, 116, 0.2); 
          }
          50% { 
            box-shadow: 0 4px 30px rgba(212, 165, 116, 0.4), 
                        inset 0 0 40px rgba(212, 165, 116, 0.2),
                        0 0 60px rgba(212, 165, 116, 0.4); 
          }
        }
      `}</style>
    </div>
  );
}
