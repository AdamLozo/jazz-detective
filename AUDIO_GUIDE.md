# Audio Assets Guide for Jazz Detective

## Free Audio Sources

### Music (Royalty-Free Jazz)

| Source | URL | Notes |
|--------|-----|-------|
| **Free Music Archive** | https://freemusicarchive.org/genre/Jazz | Search "jazz noir", "bebop instrumental" |
| **Incompetech** | https://incompetech.com/music/royalty-free/collections.php | Kevin MacLeod's jazz collection |
| **Pixabay Music** | https://pixabay.com/music/search/jazz/ | Free for commercial use |
| **Mixkit** | https://mixkit.co/free-stock-music/jazz/ | High quality, no attribution |
| **Bensound** | https://www.bensound.com/royalty-free-music/jazz | Some free tracks |
| **ccMixter** | https://ccmixter.org/ | Creative Commons jazz samples |

**Recommended search terms:**
- "jazz noir"
- "bebop instrumental"
- "smoky jazz"
- "detective jazz"
- "1950s jazz"
- "cool jazz"
- "jazz club ambience"

### Ambient Sounds

| Source | URL | Best For |
|--------|-----|----------|
| **Freesound.org** | https://freesound.org/ | Everything - best selection |
| **Zapsplat** | https://www.zapsplat.com/ | UI sounds, ambience |
| **BBC Sound Effects** | https://sound-effects.bbcrewind.co.uk/ | High quality, free for personal |
| **SoundBible** | https://soundbible.com/ | Short clips |

**Recommended Freesound searches:**
```
# Club ambience
"bar crowd" "restaurant ambience" "jazz club" "crowd murmur"

# Studio
"tape hiss" "vinyl crackle" "equipment hum" "clock tick"

# Apartment
"city traffic distant" "radiator" "pigeons" "apartment ambience"

# Brownstone
"fireplace" "grandfather clock" "room tone quiet"

# Street/Travel
"nyc traffic" "1950s street" "footsteps concrete" "subway distant"

# UI Sounds
"typewriter" "paper" "page turn" "drawer open"
```

### Sound Effects

| Effect | Freesound Search | Notes |
|--------|-----------------|-------|
| Typewriter | "typewriter key single" | Get 3-4 variations |
| Page flip | "book page turn" | Subtle versions |
| Drawer open | "wooden drawer" | Slow creak |
| Glass clink | "glass clink bar" | Multiple |
| Lighter flick | "zippo lighter" | Classic sound |
| Door creak | "door creak slow" | Noir feel |

---

## File Structure

Create this folder structure in `/public/audio/`:

```
public/
└── audio/
    ├── music/
    │   ├── main-theme.mp3
    │   ├── ember-room.mp3
    │   ├── investigation.mp3
    │   ├── revelation.mp3
    │   ├── accusation.mp3
    │   ├── confession.mp3
    │   ├── ending-good.mp3
    │   └── ending-bad.mp3
    │
    ├── ambience/
    │   ├── club-crowd-murmur.mp3
    │   ├── glasses-clink.mp3
    │   ├── room-tone-warm.mp3
    │   ├── tape-hiss.mp3
    │   ├── equipment-hum.mp3
    │   ├── clock-tick.mp3
    │   ├── distant-traffic.mp3
    │   ├── radiator-hiss.mp3
    │   ├── pigeons-coo.mp3
    │   ├── grandfather-clock.mp3
    │   ├── fireplace-crackle.mp3
    │   ├── room-tone-quiet.mp3
    │   ├── busy-club-crowd.mp3
    │   ├── nyc-street-night.mp3
    │   ├── neon-buzz.mp3
    │   ├── nyc-traffic.mp3
    │   ├── distant-footsteps.mp3
    │   └── distant-subway.mp3
    │
    └── sfx/
        ├── typewriter-key-1.mp3
        ├── typewriter-key-2.mp3
        ├── typewriter-key-3.mp3
        ├── typewriter-return.mp3
        ├── page-flip-1.mp3
        ├── page-flip-2.mp3
        ├── paper-slide.mp3
        ├── menu-hover.mp3
        ├── menu-select.mp3
        ├── dialogue-advance.mp3
        ├── clue-found.mp3
        ├── paper-rustle.mp3
        ├── drawer-open.mp3
        ├── footstep-wood-1.mp3
        ├── footstep-wood-2.mp3
        ├── footstep-wood-3.mp3
        ├── footstep-wood-4.mp3
        ├── door-creak.mp3
        ├── light-switch.mp3
        ├── sting-revelation.mp3
        ├── sting-suspicion.mp3
        ├── sting-caught.mp3
        ├── sting-confession.mp3
        ├── sting-wrong.mp3
        ├── sting-jazz-correct.mp3
        ├── sting-jazz-wrong.mp3
        ├── teddy-laugh.mp3
        ├── glass-set-down.mp3
        ├── lighter-flick.mp3
        ├── ice-clink.mp3
        ├── card-place.mp3
        ├── card-pickup.mp3
        ├── timeline-contradiction.mp3
        └── timeline-verified.mp3
```

---

## Audio Specifications

| Type | Format | Bitrate | Sample Rate | Notes |
|------|--------|---------|-------------|-------|
| Music | MP3 | 192 kbps | 44.1 kHz | Stereo |
| Ambience | MP3 | 128 kbps | 44.1 kHz | Loop seamlessly |
| SFX | MP3 | 128 kbps | 44.1 kHz | Mono preferred |

### Loop Points
For seamless ambience loops:
1. Use Audacity to trim to clean loop points
2. Export with no silence at start/end
3. Test loop by playing twice consecutively

---

## Quick Start (Minimum Viable Audio)

If you want basic audio quickly, download just these files:

### Essential Music (3 tracks)
1. **main-theme.mp3** - Any smoky jazz instrumental (2-4 min)
2. **investigation.mp3** - Tense, mysterious jazz (2-3 min)
3. **accusation.mp3** - Dark, urgent jazz (1-2 min)

### Essential Ambience (3 tracks)
1. **club-crowd-murmur.mp3** - Bar/restaurant crowd (loop, 30+ sec)
2. **room-tone-quiet.mp3** - Empty room tone (loop, 10+ sec)
3. **distant-traffic.mp3** - City sounds (loop, 30+ sec)

### Essential SFX (5 sounds)
1. **clue-found.mp3** - Discovery sound (0.5-1 sec)
2. **dialogue-advance.mp3** - Subtle click (0.1 sec)
3. **menu-select.mp3** - UI confirmation (0.2 sec)
4. **sting-revelation.mp3** - Dramatic chord (1-2 sec)
5. **sting-confession.mp3** - Melancholy phrase (2-3 sec)

---

## Freesound.org Direct Links (Example Pack)

Here are some specific Freesound.org sounds that work well:

```
# Club ambience
https://freesound.org/people/klankbeeld/sounds/133099/ (restaurant)
https://freesound.org/people/Leandros.Ntounis/sounds/163477/ (bar)

# Typewriter
https://freesound.org/people/tams_kp/sounds/43573/ (keys)
https://freesound.org/people/Zott820/sounds/209572/ (carriage return)

# Paper
https://freesound.org/people/flag2/sounds/63318/ (page turn)
https://freesound.org/people/Breviceps/sounds/445109/ (paper rustle)

# Room tones
https://freesound.org/people/Benboncan/sounds/66569/ (room tone)

# UI
https://freesound.org/people/broumbroum/sounds/50561/ (click)
```

*Note: Freesound requires free account for downloads. Check individual licenses.*

---

## Integration Notes

The audio system includes **placeholder tones** that play automatically when audio files aren't found. This means the game works immediately - audio files are optional enhancement.

### Placeholder Sounds
- Clue found: High-pitched "ding"
- Revelation: Rising chord
- Suspicion: Low, ominous tone
- Wrong accusation: Descending phrase
- UI sounds: Subtle clicks

### To Enable Real Audio
1. Create `/public/audio/` folder structure above
2. Add MP3 files with exact filenames
3. Files load automatically when available
4. Fallback to placeholder if file missing
