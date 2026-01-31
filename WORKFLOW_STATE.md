# Jazz Noir - Workflow State Tracker
**Last Updated:** 2025-01-24 
**Session:** Difficulty System Testing

---

## CURRENT TASK
Prologue animated background added. Ready for testing.

## RESUME INSTRUCTIONS
Read this file at session start. Continue from "CURRENT TASK" section.

---

## PROLOGUE BACKGROUND ENHANCEMENT (2025-01-24)

### New File: `src/components/PrologueBackground.jsx`
Animated NYC skyline background for the prologue sequence:
- **Skyline layers**: Distant, mid-ground, and foreground buildings with Empire State & Chrysler-like silhouettes
- **Animated elements**: Drifting smoke/haze, flickering lit windows, rising chimney plumes
- **Airplane**: Small propeller aircraft crossing the sky with blinking nav lights (red port, green starboard, white tail, red beacon strobe)
- **Atmosphere**: Water towers, hazy moon, warm amber color palette
- **Effects**: Heat shimmer, film grain, heavy vignette
- **Accessibility**: Respects `prefers-reduced-motion`

### Modified: `src/components/Prologue.jsx`
- Replaced static `bg-prologue` CSS class with `<PrologueBackground />` component

---

## DIFFICULTY SYSTEM IMPLEMENTATION ✅ COMPLETE

### Files Created
- `src/components/DifficultySelect.jsx` - Difficulty selection screen
- `src/components/DifficultyBadge.jsx` - In-game difficulty indicator
- `src/data/jazzTriviaNovice.js` - Easier trivia questions with hints
- `src/data/dialogueNovice.js` - Novice dialogue trees for trivia

### Files Modified
- `src/context/GameContext.jsx` - Added difficulty state, SET_DIFFICULTY action
- `src/App.jsx` - Wired DifficultySelect screen into flow
- `src/data/dialogue.js` - Added getDialogueNode() with difficulty support
- `src/components/DialogueBox.jsx` - Reads difficulty, shows hints in novice mode
- `src/components/LocationView.jsx` - Added DifficultyBadge to header

### Game Flow
1. Title Screen → Click BEGIN
2. Difficulty Select → Choose Novice or Expert
3. Prologue → Game begins with selected difficulty

---

## PENDING TESTS

### Difficulty System Tests
| Test | Description | Status | Notes |
|------|-------------|--------|-------|
| D.1 | Difficulty select screen appears | ⬜ PENDING | After clicking BEGIN |
| D.2 | Novice mode starts correctly | ⬜ PENDING | |
| D.3 | Expert mode starts correctly | ⬜ PENDING | |
| D.4 | DifficultyBadge shows in LocationView | ⬜ PENDING | |
| D.5 | Novice Teddy trivia (easier lies) | ⬜ PENDING | Claims 40s, Armstrong, disco |
| D.6 | Novice hints display | ⬜ PENDING | Yellow hint text shows |
| D.7 | Expert Teddy trivia (original) | ⬜ PENDING | Claims 57, Blakey, Brubeck |
| D.8 | Save/load preserves difficulty | ⬜ PENDING | |
| D.9 | New game clears difficulty | ⬜ PENDING | |

### Full Gameplay Loop (NOT STARTED)
| Test | Description | Status | Notes |
|------|-------------|--------|-------|
| 4.1 | The Ember Room - all interactions | 🔄 IN PROGRESS | 3/3 characters interviewed, 1/3 examine areas verified |
| 4.2 | Van Gelder Studio - all interactions | ⬜ PENDING | |
| 4.3 | Earl's Apartment - all interactions | ⬜ PENDING | |
| 4.4 | Lorraine's Brownstone - all interactions | ⬜ PENDING | |
| 4.5 | Birdland - all interactions | ⬜ PENDING | |
| 4.6 | All evidence collected | ⬜ PENDING | |
| 4.7 | Accusation & ending | ⬜ PENDING | |

---

## RECENT FIXES

### 2025-01-24: DifficultyBadge Added to LocationView
**File:** `src/components/LocationView.jsx`
**Change:** Added DifficultyBadge import and component to top-right header area

### 2025-01-24: Audio Context Fix
**File:** `src/components/LocationView.jsx`
**Problem:** Called non-existent `changeTrack()` from AudioContextEnhanced
**Solution:** Replaced with `changeMusic()` and mapped track names to valid audioConfig entries

### 2025-01-24: Location Unlock Bug Fix
**Problem:** Rooms 4-5 (Lorraine's Brownstone, Birdland) stayed locked even after full investigation
**Solution:** Added multiple unlock triggers in `GameContext.jsx`

### 2025-01-24: Timeline Drag-Drop Fix
**Problem:** Some timeline events could not be placed via drag-and-drop
**Solution:** Changed collision detection, added double-click fallback

---

## KNOWN ISSUES
None currently identified.

---

## BACKLOG
- Full gameplay loop testing
- Jazz trivia integration verification
- All character dialogue paths
- Multiple ending paths

---

## SESSION LOG
| Date | Summary |
|------|---------|
| 2025-01-24 | Fixed LocationView audio context bug. Passed Phase 2 & 3 tests. |
| 2025-01-24 | Fixed location unlock bug - rooms 4-5 now unlock with multiple triggers |
| 2025-01-24 | Fixed timeline drag-drop - improved collision detection + double-click fallback |
| 2025-01-24 | Added DifficultyBadge to LocationView. Difficulty system ready for testing. |
