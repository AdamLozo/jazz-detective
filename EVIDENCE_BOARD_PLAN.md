# Evidence Board Implementation Plan

## Status: Phase 1 In Progress
## Last Updated: 2025-01-24

---

## Overview
Cork board "murder wall" where players organize evidence and draw connections. Connections affect gameplay by unlocking hints and strengthening the accusation case.

---

## Phase 1: Foundation & Board UI
- [x] 1.1 Add `evidenceBoard` state to GameContext (items, connections, hintsUsed)
- [x] 1.2 Create reducer actions: ADD_BOARD_ITEM, MOVE_BOARD_ITEM, REMOVE_BOARD_ITEM, ADD_CONNECTION, REMOVE_CONNECTION, USE_HINT
- [x] 1.3 Create `EvidenceBoard.jsx` — main container with cork texture background
- [x] 1.4 Create `EvidenceBoardItem.jsx` — draggable item component
- [x] 1.5 Implement free drag positioning with @dnd-kit
- [x] 1.6 Add suspect photos (5 polaroids) as default available items
- [x] 1.7 Add navigation: Journal → Evidence Board button
- [ ] 1.8 Test: Items drag freely, positions persist on screen

## Phase 2: Evidence Cards & Tray
- [x] 2.1 Create `EvidenceBoardTray.jsx` — bottom drawer of available items
- [x] 2.2 Map `collectedClues` to evidence card data
- [x] 2.3 Map key `dialogueFlags` to testimony quote cards
- [x] 2.4 Map timeline contradictions to conflict cards
- [x] 2.5 Create card visual styles: Physical Clue, Testimony, Contradiction, Alibi
- [x] 2.6 Drag from tray to board places item
- [x] 2.7 Double-click on board returns item to tray
- [ ] 2.8 Test: All collected evidence appears, can be placed/removed

## Phase 3: String Connections
- [x] 3.1 Create `EvidenceBoardConnection.jsx` — SVG line component
- [x] 3.2 Implement connection creation: click item → drag to target → release
- [x] 3.3 Add connection colors: red (suspicion), green (alibi), yellow (question)
- [x] 3.4 Color picker UI on connection creation
- [x] 3.5 Click existing connection to delete
- [x] 3.6 Connections visually update when items move
- [ ] 3.7 Test: Create, move, delete connections

## Phase 4: Labels & Persistence
- [x] 4.1 Add label input when connection created (max 30 chars)
- [x] 4.2 Display labels on string midpoint
- [x] 4.3 Click label to edit
- [x] 4.4 Save board state to game save (items, connections, positions) — auto-saves via GameContext
- [x] 4.5 Load board state on continue game — handled by existing load system
- [x] 4.6 Add "Clear Board" button with confirmation
- [ ] 4.7 Test: Labels work, state persists across save/load

## Phase 5: Gameplay Integration
- [x] 5.1 Define "valid connections" data structure (which items should connect)
- [x] 5.2 Track connection accuracy score (correct connections / total possible)
- [ ] 5.3 Surface hints in accusation screen based on board completeness
- [x] 5.4 Add case strength indicator: Weak / Moderate / Strong / Airtight
- [ ] 5.5 Modify accusation outcome based on evidence board score
- [ ] 5.6 Award bonus for finding all valid connections
- [ ] 5.7 Test: Board state affects accusation screen and endings

## Phase 6: Hint System
- [x] 6.1 Create `suggestedConnections` data — correct pairings with explanations
- [x] 6.2 Add "Detective's Intuition" button (hint trigger)
- [x] 6.3 Hint reveals one unconnected valid pairing with subtle glow
- [x] 6.4 Track hints used (affects final score/ending quality)
- [x] 6.5 Limit hints: 3 maximum per playthrough
- [x] 6.6 Hint UI: "Your gut tells you [Item A] and [Item B] are connected..."
- [ ] 6.7 Test: Hints work, limited correctly, tracked in state

## Phase 7: Visual Polish
- [ ] 7.1 Cork board texture with subtle lighting
- [ ] 7.2 Push pin graphics on each item
- [ ] 7.3 Yarn/string texture on connections
- [ ] 7.4 Drop shadows on items
- [ ] 7.5 Polaroid frame for suspect photos with handwritten names
- [ ] 7.6 Torn paper effect for testimony quotes
- [ ] 7.7 Red "EVIDENCE" stamp on physical clues
- [ ] 7.8 Alibi confirmed: green "CLEARED" stamp on suspect photos
- [ ] 7.9 Smooth animations: place, remove, connect
- [ ] 7.10 Test: Visual cohesion with game's noir aesthetic

---

## Data Structures

### State Shape
```javascript
evidenceBoard: {
  items: [
    { id: 'suspect-teddy', type: 'suspect', x: 150, y: 100 },
    { id: 'clue-debt-ledger', type: 'evidence', x: 350, y: 200 },
  ],
  connections: [
    { 
      id: 'conn-1',
      from: 'suspect-teddy', 
      to: 'clue-debt-ledger', 
      color: 'red', 
      label: 'Owes $4,000' 
    }
  ],
  hintsUsed: 0
}
```

### Valid Connections (affects gameplay)
```javascript
const validConnections = [
  {
    items: ['suspect-teddy', 'clue-debt-ledger'],
    insight: 'Teddy had financial motive',
    points: 10
  },
  {
    items: ['suspect-teddy', 'testimony-threat-tape'],
    insight: 'Teddy threatened Earl on tape',
    points: 15
  },
  {
    items: ['suspect-teddy', 'clue-starlight-contract'],
    insight: 'Earl leaving would ruin Teddy financially',
    points: 10
  },
  // ... more valid pairings
];
```

### Case Strength Calculation
```
0-25% connections: Weak Case — "Circumstantial at best"
26-50% connections: Moderate Case — "Enough to question, not convict"
51-75% connections: Strong Case — "Compelling evidence"
76-100% connections: Airtight Case — "Beyond reasonable doubt"

Hint penalty: -5% per hint used
```

---

## Files to Create
- `src/components/EvidenceBoard.jsx`
- `src/components/EvidenceBoardItem.jsx`
- `src/components/EvidenceBoardTray.jsx`
- `src/components/EvidenceBoardConnection.jsx`
- `src/data/evidenceBoardData.js` (valid connections, hints, card mappings)

## Files to Modify
- `src/context/GameContext.jsx` (add state + reducers)
- `src/components/Journal.jsx` (add navigation button)
- `src/components/AccusationScreen.jsx` (integrate board score)
- `src/index.css` (board-specific styles)

---

## Current Progress
**Phase 1-6**: Core implementation complete
**Phase 7**: Visual polish — not started
**Next Task**: Test basic functionality, then polish visuals
