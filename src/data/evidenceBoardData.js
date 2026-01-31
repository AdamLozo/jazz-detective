// Evidence Board Data
// Defines available evidence, valid connections, and hint system

// Suspect data for the board
const suspects = [
  { id: 'suspect-teddy', type: 'suspect', name: 'Teddy Olson', icon: '🎺', cleared: false },
  { id: 'suspect-lorraine', type: 'suspect', name: 'Lorraine Jeffries', icon: '💃', cleared: false },
  { id: 'suspect-snap', type: 'suspect', name: 'Snap Williams', icon: '🎹', cleared: false },
  { id: 'suspect-ruthie', type: 'suspect', name: 'Ruthie Cole', icon: '🎤', cleared: false },
  { id: 'suspect-chet', type: 'suspect', name: 'Chet Malone', icon: '🥁', cleared: false },
];

// Map collected clues to evidence cards
const clueToEvidence = {
  'matchbook': { name: 'Starlight Matchbook', icon: '🔥', type: 'clue' },
  'gamblingIOUs': { name: '$4,000 Gambling IOUs', icon: '💵', type: 'clue' },
  'starlightContract': { name: 'Starlight Contract', icon: '📄', type: 'clue' },
  'earlySetList': { name: 'Early Set List', icon: '🎵', type: 'clue' },
  'reedFragment': { name: 'Broken Saxophone Reed', icon: '🎷', type: 'clue' },
  'bloodstainedCuff': { name: 'Bloodstained Cuff', icon: '🩸', type: 'clue' },
  'tornPoster': { name: 'Torn Concert Poster', icon: '📜', type: 'clue' },
  'witnesses': { name: 'Witness Statements', icon: '👁️', type: 'clue' },
  'backersNote': { name: 'Note from Backers', icon: '📝', type: 'clue' },
  'insurancePolicy': { name: 'Insurance Policy', icon: '📋', type: 'clue' },
  'hiddenCompartment': { name: 'Hidden Compartment', icon: '🗄️', type: 'clue' },
  'ransackedApartment': { name: 'Ransacked Apartment', icon: '🏚️', type: 'clue' },
};

// Map dialogue flags to testimony cards
const flagToTestimony = {
  'bartender_contradicts_teddy': {
    name: 'Jimmy contradicts Teddy',
    quote: 'Teddy was gone twenty minutes, not five',
    source: 'Jimmy the Bartender',
    type: 'testimony',
    icon: '💬',
  },
  'teddy_confirmed_debt': {
    name: 'Teddy confirms debt',
    quote: 'Earl owed me four thousand',
    source: 'Teddy Olson',
    type: 'testimony',
    icon: '💬',
  },
  'teddy_knew_about_starlight': {
    name: 'Teddy knew Earl was leaving',
    quote: 'The Starlight... he was gonna leave me holding the bag',
    source: 'Teddy Olson',
    type: 'testimony',
    icon: '💬',
  },
  'heard_teddy_threat': {
    name: 'Teddy\'s threat on tape',
    quote: 'That can be arranged',
    source: 'Recording at Van Gelder\'s',
    type: 'testimony',
    icon: '🎙️',
  },
  'earl_feared_teddy': {
    name: 'Earl feared Teddy',
    quote: 'If anything happens to me, look at Teddy',
    source: 'Lorraine Jeffries',
    type: 'testimony',
    icon: '💬',
  },
  'snap_alibi_confirmed': {
    name: 'Snap\'s alibi confirmed',
    quote: 'Snap was at the studio all night - I have the logs',
    source: 'Rudy Van Gelder',
    type: 'testimony',
    icon: '✓',
  },
  'lorraine_alibi_confirmed': {
    name: 'Lorraine\'s alibi confirmed',
    quote: 'Playing cards with Mae until 2 AM',
    source: 'Mae (sister)',
    type: 'testimony',
    icon: '✓',
  },
  'chet_alibi_established': {
    name: 'Chet\'s alibi confirmed',
    quote: 'At Birdland from 11 PM until close',
    source: 'Birdland staff',
    type: 'testimony',
    icon: '✓',
  },
  'ruthie_was_at_birdland': {
    name: 'Ruthie at Birdland',
    quote: 'Meeting with Prestige A&R, not sick',
    source: 'Ruthie Cole',
    type: 'testimony',
    icon: '✓',
  },
  'chet_witnessed_threat': {
    name: 'Chet witnessed argument',
    quote: 'Teddy was furious... Earl looked scared',
    source: 'Chet Malone',
    type: 'testimony',
    icon: '👁️',
  },
  'teddy_in_trouble': {
    name: 'Teddy\'s dangerous backers',
    quote: 'Borrowed from dangerous people',
    source: 'Multiple sources',
    type: 'testimony',
    icon: '⚠️',
  },
};

// Timeline contradictions as evidence
const contradictionCards = {
  'timeline_teddy_contradiction': {
    name: 'Teddy lied about his absence',
    type: 'contradiction',
    icon: '⚠️',
  },
  'timeline_ruthie_contradiction': {
    name: 'Ruthie lied but has alibi',
    type: 'contradiction',
    icon: '⚠️',
  },
};

// Valid connections that affect gameplay
// Each connection represents a logical link in the investigation
export const validConnections = [
  // Teddy's motive chain
  {
    items: ['suspect-teddy', 'clue-gamblingIOUs'],
    insight: 'Teddy had $4,000 riding on Earl',
    points: 10,
  },
  {
    items: ['suspect-teddy', 'clue-starlightContract'],
    insight: 'Earl leaving would bankrupt Teddy',
    points: 10,
  },
  {
    items: ['suspect-teddy', 'testimony-heard_teddy_threat'],
    insight: 'Teddy threatened Earl on tape',
    points: 15,
  },
  {
    items: ['suspect-teddy', 'testimony-earl_feared_teddy'],
    insight: 'Earl specifically named Teddy as a threat',
    points: 15,
  },
  {
    items: ['suspect-teddy', 'testimony-chet_witnessed_threat'],
    insight: 'Witness saw Teddy threatening Earl',
    points: 12,
  },
  {
    items: ['suspect-teddy', 'testimony-teddy_in_trouble'],
    insight: 'Teddy owed dangerous people money',
    points: 10,
  },
  {
    items: ['suspect-teddy', 'contradiction-timeline_teddy_contradiction'],
    insight: 'Teddy lied about his whereabouts',
    points: 15,
  },
  {
    items: ['clue-gamblingIOUs', 'clue-starlightContract'],
    insight: 'Debt + Earl leaving = financial disaster for Teddy',
    points: 10,
  },
  
  // Alibis - clearing suspects
  {
    items: ['suspect-snap', 'testimony-snap_alibi_confirmed'],
    insight: 'Snap has airtight alibi at Van Gelder\'s',
    points: 8,
  },
  {
    items: ['suspect-lorraine', 'testimony-lorraine_alibi_confirmed'],
    insight: 'Lorraine was with family all night',
    points: 8,
  },
  {
    items: ['suspect-chet', 'testimony-chet_alibi_established'],
    insight: 'Chet was at Birdland during the murder',
    points: 8,
  },
  {
    items: ['suspect-ruthie', 'testimony-ruthie_was_at_birdland'],
    insight: 'Ruthie lied but was at Birdland',
    points: 8,
  },
  
  // Earl's fear and the threat
  {
    items: ['testimony-earl_feared_teddy', 'testimony-heard_teddy_threat'],
    insight: 'Earl\'s fear was justified - Teddy did threaten him',
    points: 12,
  },
  {
    items: ['clue-insurancePolicy', 'testimony-earl_feared_teddy'],
    insight: 'Earl took out insurance because he feared for his life',
    points: 10,
  },
  
  // Investigation timeline
  {
    items: ['clue-ransackedApartment', 'clue-hiddenCompartment'],
    insight: 'Someone was searching for something Earl hid',
    points: 8,
  },
];

// Get all available evidence based on game state
export function getAvailableEvidence(state) {
  const evidence = [];

  // Add suspects (always available)
  suspects.forEach(s => {
    const cleared = 
      (s.id === 'suspect-snap' && state.dialogueFlags.snap_alibi_confirmed) ||
      (s.id === 'suspect-lorraine' && state.dialogueFlags.lorraine_alibi_confirmed) ||
      (s.id === 'suspect-chet' && state.dialogueFlags.chet_alibi_established) ||
      (s.id === 'suspect-ruthie' && state.dialogueFlags.ruthie_was_at_birdland);
    
    evidence.push({ ...s, cleared });
  });

  // Add collected clues
  state.collectedClues.forEach(clue => {
    const mapping = clueToEvidence[clue.id];
    if (mapping) {
      evidence.push({
        id: `clue-${clue.id}`,
        ...mapping,
      });
    }
  });

  // Add testimonies from dialogue flags
  Object.keys(state.dialogueFlags).forEach(flag => {
    if (state.dialogueFlags[flag] && flagToTestimony[flag]) {
      evidence.push({
        id: `testimony-${flag}`,
        ...flagToTestimony[flag],
      });
    }
  });

  // Add timeline contradictions
  state.timelineContradictionsFound?.forEach(contId => {
    if (contradictionCards[contId]) {
      evidence.push({
        id: `contradiction-${contId}`,
        ...contradictionCards[contId],
      });
    }
  });

  return evidence;
}

// Get next hint for stuck players
export function getNextHint(currentConnections, allValidConnections) {
  // Find valid connections not yet made
  const unmadeConnections = allValidConnections.filter(vc => {
    return !currentConnections.some(cc => 
      (cc.from === vc.items[0] && cc.to === vc.items[1]) ||
      (cc.from === vc.items[1] && cc.to === vc.items[0])
    );
  });

  if (unmadeConnections.length === 0) return null;

  // Prioritize high-point connections
  unmadeConnections.sort((a, b) => b.points - a.points);

  const hint = unmadeConnections[0];
  return {
    items: hint.items,
    hint: `Your gut tells you there's a connection between these two pieces of evidence...`,
    insight: hint.insight,
  };
}

// Calculate case strength for accusation
export function calculateCaseStrength(connections, hintsUsed) {
  let score = 0;
  let maxScore = validConnections.reduce((sum, vc) => sum + vc.points, 0);

  connections.forEach(conn => {
    const match = validConnections.find(vc =>
      (vc.items.includes(conn.from) && vc.items.includes(conn.to))
    );
    if (match) {
      score += match.points;
    }
  });

  // Apply hint penalty (5% per hint)
  const hintPenalty = hintsUsed * 0.05 * maxScore;
  score = Math.max(0, score - hintPenalty);

  return {
    score,
    maxScore,
    percentage: Math.round((score / maxScore) * 100),
    label: score / maxScore >= 0.76 ? 'AIRTIGHT' :
           score / maxScore >= 0.51 ? 'STRONG' :
           score / maxScore >= 0.26 ? 'MODERATE' : 'WEAK',
  };
}
