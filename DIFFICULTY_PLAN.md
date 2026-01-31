# Difficulty Toggle Implementation Plan

## Overview
Add a difficulty toggle (Jazz Novice / Jazz Expert) that allows casual players to enjoy the murder mystery without deep jazz knowledge, while experts get the full trivia experience.

## Design Decisions
- **Novice Mode**: Trivia questions have hints/easier alternatives. Player can still catch Teddy lying but with more accessible questions.
- **Expert Mode**: Original challenging trivia requiring deep jazz knowledge.
- **Selection Point**: After clicking "BEGIN" on title screen, before prologue.
- **Persistent**: Difficulty saved with game state.
- **Visual Indicator**: Small badge showing current difficulty in-game.

---

## Task Checklist

### Phase 1: State Management ✅ COMPLETE
- [x] 1.1 Add `difficulty` field to `initialState` in GameContext (default: null)
- [x] 1.2 Add `SET_DIFFICULTY` action to reducer
- [x] 1.3 Update `START_NEW_GAME` to require difficulty selection first
- [x] 1.4 Include difficulty in save/load functionality

### Phase 2: Difficulty Selection Screen ✅ COMPLETE
- [x] 2.1 Create `DifficultySelect.jsx` component
- [x] 2.2 Jazz Novice option: "Enjoy the story, easier questions"
- [x] 2.3 Jazz Expert option: "Full challenge, deep knowledge required"
- [x] 2.4 Atmospheric styling matching title screen
- [x] 2.5 Wire up to game flow (title → difficulty → prologue)

### Phase 3: Novice Trivia Questions ✅ COMPLETE
- [x] 3.1 Create `jazzTriviaNovice.js` with easier alternatives
- [x] 3.2 Novice Teddy lies: simpler mistakes (wrong decades, obvious errors)
- [x] 3.3 Novice knowledge gates: hints provided, multiple choice
- [x] 3.4 Maintain same unlock flags for game progression

### Phase 4: Dialogue System Updates ✅ COMPLETE
- [x] 4.1 Create difficulty-aware dialogue getter function (`getDialogueNode`)
- [x] 4.2 Update `dialogueTrees` export to support difficulty branching
- [x] 4.3 Modify `DialogueBox.jsx` to read difficulty from context
- [x] 4.4 Added `NOVICE_OVERRIDE_NODES` list for trivia-related dialogues

### Phase 5: UI Indicators ✅ COMPLETE
- [x] 5.1 Create `DifficultyBadge.jsx` component (small, unobtrusive)
- [x] 5.2 Add to LocationView header area
- [x] 5.3 Tooltip explaining current difficulty

### Phase 6: Testing & Polish 🔄 IN PROGRESS
- [ ] 6.1 Test complete novice playthrough (can identify murderer)
- [ ] 6.2 Test complete expert playthrough (same as before)
- [ ] 6.3 Test save/load preserves difficulty
- [ ] 6.4 Test new game clears difficulty selection
- [ ] 6.5 Update WORKFLOW_STATE.md

---

## Novice Trivia Design ✅ IMPLEMENTED

### Teddy's Lies (Easier to Catch)
| Expert Version | Novice Version |
|----------------|----------------|
| "Kind of Blue was '57" | "Kind of Blue was recorded in the '40s" |
| "Art Blakey played drums on Kind of Blue" | "Louis Armstrong played trumpet on Kind of Blue" |
| "Dave Brubeck wrote Take Five" | "Take Five was a '70s disco hit" |

### Knowledge Gates (With Hints)
| Expert Question | Novice Version |
|-----------------|----------------|
| "Name the four 1959 landmark albums" | Multiple choice: "Which was NOT from 1959?" |
| "Who led the Take Five quartet?" | Fill-in-blank: "Starts with 'B'..." |
| "Name Coltrane's Classic Quartet" | True/False: "McCoy Tyner played piano?" |

---

## File Changes Summary ✅ COMPLETE

| File | Status |
|------|--------|
| `src/context/GameContext.jsx` | ✅ Modified (difficulty state) |
| `src/components/TitleScreen.jsx` | ✅ Modified (wired difficulty flow) |
| `src/components/DifficultySelect.jsx` | ✅ **CREATED** |
| `src/data/jazzTriviaNovice.js` | ✅ **CREATED** |
| `src/data/dialogueNovice.js` | ✅ **CREATED** |
| `src/data/dialogue.js` | ✅ Modified (getDialogueNode function) |
| `src/components/DialogueBox.jsx` | ✅ Modified (reads difficulty, shows hints) |
| `src/components/DifficultyBadge.jsx` | ✅ **CREATED** |
| `src/components/LocationView.jsx` | ✅ Modified (added badge) |
| `src/App.jsx` | ✅ Modified (wired DifficultySelect screen) |

---

## Current Status: TESTING PHASE

**Implementation complete. Ready for gameplay testing.**

Last Updated: 2026-01-24
