# Timeline Redesign: Smoky Jazz Club Table
**Concept:** Overhead view of a detective's table in a dimly lit jazz club. Evidence scattered like physical objects. Moody, atmospheric, tactile.

**Started:** 2025-01-24
**Last Updated:** 2025-01-24

---

## Phase 1: Foundation & Atmosphere ✅ COMPLETE
| Task | Status | Notes |
|------|--------|-------|
| 1.1 Wood table texture background | ✅ COMPLETE | CSS gradients with grain overlay |
| 1.2 Vignette lighting effect | ✅ COMPLETE | table-spotlight + table-glow classes |
| 1.3 Ambient smoke particles | ✅ COMPLETE | smoke-wisp animations, 3 particles |
| 1.4 Table edge shadows | ✅ COMPLETE | table-edge-shadow inset box-shadow |
| 1.5 Decorative props | ✅ COMPLETE | Ashtray, whiskey glass, cigarette, pencil |

---

## Phase 2: Timeline Track Redesign ✅ COMPLETE
| Task | Status | Notes |
|------|--------|-------|
| 2.1 Chalk line time axis | ✅ COMPLETE | chalk-line class with gaps |
| 2.2 Brass time markers | ✅ COMPLETE | time-marker-brass with gold glow |
| 2.3 Murder marker as blood drop | ✅ COMPLETE | murder-marker with red gradient |
| 2.4 Suspect rows as chalk lanes | ✅ COMPLETE | Dashed chalk borders |
| 2.5 Typewriter labels | ✅ COMPLETE | Courier font, CLEARED/NO ALIBI stamps |

---

## Phase 3: Evidence Cards → Physical Objects ✅ COMPLETE
| Task | Status | Notes |
|------|--------|-------|
| 3.1 Alibi cards → Polaroid photos | ✅ COMPLETE | White border, photo area, Caveat caption |
| 3.2 Sighting cards → Napkin notes | ✅ COMPLETE | Coffee stain, handwritten text |
| 3.3 Gap/suspicious → Torn newspaper | ✅ COMPLETE | Torn edge clip-path, newsprint texture |
| 3.4 Default → Typed notes | ✅ COMPLETE | Courier font, paper clip decoration |
| 3.5 Card shadows and rotation | ✅ COMPLETE | Random rotation, realistic shadows |

---

## Phase 4: Evidence Tray (Briefcase) ✅ COMPLETE
| Task | Status | Notes |
|------|--------|-------|
| 4.1 Tray as open briefcase | ✅ COMPLETE | Leather gradient, rim, clasps |
| 4.2 Cards grouped by suspect | ✅ COMPLETE | Divider sections with labels |
| 4.3 Empty state styling | ✅ COMPLETE | "All evidence placed" message |
| 4.4 Instruction hints | ✅ COMPLETE | Subtle footer text |

---

## Phase 5: Animations & Motion ✅ COMPLETE
| Task | Status | Notes |
|------|--------|-------|
| 5.1 Install Framer Motion | ✅ COMPLETE | User runs: npm install framer-motion |
| 5.2 Card pickup animation | ✅ COMPLETE | Scale 1.1, shadow expansion, rotate to 0 |
| 5.3 Card drop animation | ✅ COMPLETE | Spring physics with overshoot |
| 5.4 Hover states | ✅ COMPLETE | Lift + scale with spring transition |
| 5.5 Placement success feedback | ✅ COMPLETE | AnimatePresence entry animation |
| 5.6 Status badge animations | ✅ COMPLETE | Pulse effects on warnings |

---

## Phase 6: Sound Design ⬜ SKIPPED (for now)
| Task | Status | Notes |
|------|--------|-------|
| 6.1 Paper shuffle on pickup | ⬜ SKIPPED | Can add later if desired |
| 6.2 Paper slap on drop | ⬜ SKIPPED | |
| 6.3 Ambient jazz murmur | ⬜ SKIPPED | |
| 6.4 Contradiction sting | ⬜ SKIPPED | |

---

## Phase 7: Polish & Refinement
| Task | Status | Notes |
|------|--------|-------|
| 7.1 Caveat font loaded | ✅ COMPLETE | Google Fonts in index.html |
| 7.2 Page title updated | ✅ COMPLETE | "The Ember Room - A Jazz Noir Mystery" |
| 7.3 Responsive adjustments | ⬜ PENDING | Mobile-friendly if needed |
| 7.4 Performance optimization | ⬜ PENDING | Monitor and adjust |
| 7.5 Accessibility check | ⬜ PENDING | Contrast, readability |

---

## Progress Tracker

**Completion:** 27/32 tasks (84%)

| Phase | Status | Tasks |
|-------|--------|-------|
| Phase 1: Foundation | ✅ COMPLETE | 5/5 |
| Phase 2: Timeline Track | ✅ COMPLETE | 5/5 |
| Phase 3: Evidence Cards | ✅ COMPLETE | 5/5 |
| Phase 4: Evidence Tray | ✅ COMPLETE | 4/4 |
| Phase 5: Animations | ✅ COMPLETE | 6/6 |
| Phase 6: Sound | ⬜ SKIPPED | 0/4 |
| Phase 7: Polish | 🔄 PARTIAL | 2/3 |

---

## Files Modified

- `index.html` - Added Caveat font, updated title
- `src/index.css` - Added all table/card/smoke CSS classes
- `src/components/Timeline.jsx` - New table surface layout
- `src/components/TimelineSuspectRow.jsx` - Chalk lanes, Framer Motion
- `src/components/TimelineDraggableEvent.jsx` - Physical card types, animations
- `src/components/TimelineEvidenceTray.jsx` - Briefcase design

---

## To Test

1. Run `npm install framer-motion` (if not done)
2. Run `npm run dev`
3. Navigate to Journal → Timeline
4. Verify:
   - Wood table background with smoke particles
   - Decorative props (ashtray, whiskey glass)
   - Brass time markers, red murder drop
   - Evidence cards as polaroids/napkins/clippings
   - Smooth drag animations
   - Drop feedback with spring physics

---

## Future Enhancements (Optional)

- Sound effects (paper shuffle, drop thud)
- Contradiction discovery screen shake
- Tutorial overlay for first-time users
- Mobile drawer for evidence tray

