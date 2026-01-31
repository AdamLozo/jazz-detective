// Location Background Illustrations
// Noir silhouette art for atmospheric scene setting

import { useGame } from '../context/GameContext';

// The Ember Room - Smoky jazz club interior
const EmberRoomSVG = () => (
  <svg 
    viewBox="0 0 1920 1080" 
    preserveAspectRatio="xMidYMid slice"
    className="absolute inset-0 w-full h-full"
    style={{ opacity: 0.35 }}
  >
    <defs>
      {/* Gradients for depth */}
      <linearGradient id="ember-floor" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#1a0f0f" stopOpacity="0" />
        <stop offset="100%" stopColor="#0d0606" stopOpacity="0.9" />
      </linearGradient>
      <linearGradient id="ember-ceiling" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#1a0f0f" stopOpacity="0" />
        <stop offset="100%" stopColor="#0a0505" stopOpacity="0.95" />
      </linearGradient>
      <radialGradient id="spotlight" cx="30%" cy="90%" r="40%">
        <stop offset="0%" stopColor="#d4a574" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#d4a574" stopOpacity="0" />
      </radialGradient>
    </defs>
    
    {/* Ceiling with hanging lights */}
    <rect x="0" y="0" width="1920" height="200" fill="url(#ember-ceiling)" />
    
    {/* Hanging pendant lights */}
    <g className="hanging-lights" fill="#1a1210">
      {/* Light 1 */}
      <line x1="300" y1="0" x2="300" y2="120" stroke="#2a1a15" strokeWidth="2" />
      <ellipse cx="300" cy="135" rx="35" ry="25" />
      <ellipse cx="300" cy="140" rx="20" ry="8" fill="#d4a574" fillOpacity="0.3" />
      
      {/* Light 2 */}
      <line x1="700" y1="0" x2="700" y2="100" stroke="#2a1a15" strokeWidth="2" />
      <ellipse cx="700" cy="115" rx="35" ry="25" />
      <ellipse cx="700" cy="120" rx="20" ry="8" fill="#d4a574" fillOpacity="0.25" />
      
      {/* Light 3 - over stage */}
      <line x1="1100" y1="0" x2="1100" y2="80" stroke="#2a1a15" strokeWidth="2" />
      <ellipse cx="1100" cy="95" rx="40" ry="28" />
      <ellipse cx="1100" cy="100" rx="22" ry="10" fill="#d4a574" fillOpacity="0.4" />
      
      {/* Light 4 */}
      <line x1="1550" y1="0" x2="1550" y2="110" stroke="#2a1a15" strokeWidth="2" />
      <ellipse cx="1550" cy="125" rx="35" ry="25" />
      <ellipse cx="1550" cy="130" rx="20" ry="8" fill="#d4a574" fillOpacity="0.2" />
    </g>
    
    {/* Stage area - left side */}
    <g className="stage" transform="translate(50, 650)">
      {/* Stage platform */}
      <rect x="0" y="180" width="500" height="250" fill="#0d0808" fillOpacity="0.8" />
      <rect x="0" y="175" width="500" height="10" fill="#2a1a15" />
      
      {/* Stage curtains */}
      <path d="M0 0 Q20 180, 0 350 L0 0" fill="#1a0a0a" fillOpacity="0.9" />
      <path d="M0 0 Q30 160, 15 350 L0 350 L0 0" fill="#250f0f" fillOpacity="0.7" />
      <path d="M500 0 Q480 180, 500 350 L500 0" fill="#1a0a0a" fillOpacity="0.9" />
      <path d="M500 0 Q470 160, 485 350 L500 350 L500 0" fill="#250f0f" fillOpacity="0.7" />
      
      {/* Grand piano silhouette */}
      <g transform="translate(80, 40)">
        <ellipse cx="120" cy="130" rx="100" ry="45" fill="#0d0606" />
        <path d="M30 80 L30 130 Q30 150, 50 160 L190 160 Q210 150, 210 130 L210 30 Q200 0, 160 0 L60 0 Q30 20, 30 80" fill="#100808" />
        {/* Piano lid open */}
        <path d="M30 80 L160 0 L210 30" fill="#151010" />
        {/* Piano bench */}
        <rect x="240" y="120" width="60" height="40" fill="#0d0606" />
      </g>
      
      {/* Upright bass silhouette */}
      <g transform="translate(350, 20)">
        <ellipse cx="35" cy="155" rx="30" ry="55" fill="#0d0606" />
        <rect x="30" y="0" width="10" height="120" fill="#100808" />
        <circle cx="35" cy="5" r="12" fill="#100808" />
        {/* Strings hint */}
        <line x1="32" y1="20" x2="32" y2="150" stroke="#1a1210" strokeWidth="1" />
        <line x1="38" y1="20" x2="38" y2="150" stroke="#1a1210" strokeWidth="1" />
      </g>
      
      {/* Drum kit silhouette - background */}
      <g transform="translate(420, 60)">
        <ellipse cx="40" cy="100" rx="35" ry="25" fill="#0d0606" /> {/* Bass drum */}
        <ellipse cx="40" cy="100" rx="25" ry="18" fill="#100808" /> {/* Bass drum head */}
        <circle cx="10" cy="50" r="18" fill="#100808" /> {/* Tom */}
        <circle cx="70" cy="45" r="20" fill="#0d0606" /> {/* Floor tom */}
        <ellipse cx="85" cy="25" rx="18" ry="5" fill="#100808" /> {/* Cymbal */}
        <line x1="85" y1="25" x2="85" y2="80" stroke="#1a1210" strokeWidth="2" />
      </g>
      
      {/* Microphone stand */}
      <g transform="translate(250, 80)">
        <line x1="20" y1="100" x2="20" y2="30" stroke="#1a1210" strokeWidth="3" />
        <circle cx="20" cy="25" r="12" fill="#100808" />
        <ellipse cx="20" cy="115" rx="25" ry="8" fill="#0d0606" />
      </g>
    </g>
    
    {/* Bar area - right side */}
    <g className="bar" transform="translate(1300, 580)">
      {/* Back bar with bottles */}
      <rect x="0" y="0" width="550" height="400" fill="#0d0808" fillOpacity="0.9" />
      
      {/* Shelves */}
      <rect x="20" y="60" width="510" height="5" fill="#1a1210" />
      <rect x="20" y="150" width="510" height="5" fill="#1a1210" />
      <rect x="20" y="240" width="510" height="5" fill="#1a1210" />
      
      {/* Bottles on shelves - row 1 */}
      <g fill="#151010">
        <rect x="40" y="20" width="20" height="40" rx="3" />
        <rect x="80" y="15" width="25" height="45" rx="3" />
        <rect x="130" y="25" width="18" height="35" rx="3" />
        <rect x="170" y="18" width="22" height="42" rx="3" />
        <rect x="210" y="22" width="20" height="38" rx="3" />
        <rect x="250" y="12" width="28" height="48" rx="3" />
        <rect x="300" y="20" width="22" height="40" rx="3" />
        <rect x="340" y="25" width="18" height="35" rx="3" />
        <rect x="380" y="18" width="24" height="42" rx="3" />
        <rect x="420" y="22" width="20" height="38" rx="3" />
        <rect x="460" y="15" width="25" height="45" rx="3" />
      </g>
      
      {/* Bottles on shelves - row 2 */}
      <g fill="#120a0a">
        <rect x="50" y="110" width="22" height="40" rx="3" />
        <rect x="95" y="105" width="28" height="45" rx="3" />
        <rect x="145" y="115" width="20" height="35" rx="3" />
        <rect x="185" y="108" width="24" height="42" rx="3" />
        <rect x="230" y="112" width="18" height="38" rx="3" />
        <rect x="270" y="100" width="30" height="50" rx="3" />
        <rect x="320" y="110" width="22" height="40" rx="3" />
        <rect x="365" y="115" width="20" height="35" rx="3" />
        <rect x="405" y="105" width="26" height="45" rx="3" />
        <rect x="450" y="110" width="22" height="40" rx="3" />
      </g>
      
      {/* Bar mirror - hint */}
      <rect x="100" y="260" width="350" height="120" fill="#1a1210" fillOpacity="0.3" />
      
      {/* Bar counter */}
      <rect x="-50" y="400" width="650" height="80" fill="#1a0f0f" />
      <rect x="-50" y="395" width="650" height="10" fill="#2a1a15" />
      
      {/* Bar stools */}
      <g fill="#0d0606">
        <circle cx="50" cy="460" r="20" />
        <rect x="45" y="460" width="10" height="40" />
        <circle cx="150" cy="465" r="20" />
        <rect x="145" y="465" width="10" height="35" />
        <circle cx="280" cy="460" r="20" />
        <rect x="275" y="460" width="10" height="40" />
        <circle cx="400" cy="463" r="20" />
        <rect x="395" y="463" width="10" height="37" />
      </g>
    </g>
    
    {/* Tables with patrons - silhouettes */}
    <g className="tables">
      {/* Table 1 - foreground right */}
      <g transform="translate(900, 850)">
        <ellipse cx="60" cy="100" rx="80" ry="30" fill="#0a0505" />
        <rect x="50" y="60" width="20" height="45" fill="#0d0808" />
        {/* Patron silhouettes */}
        <ellipse cx="20" cy="30" rx="25" ry="35" fill="#0a0505" /> {/* Body */}
        <circle cx="20" cy="-15" r="18" fill="#0a0505" /> {/* Head */}
        <ellipse cx="120" cy="35" rx="22" ry="32" fill="#080404" />
        <circle cx="125" cy="-8" r="16" fill="#080404" />
      </g>
      
      {/* Table 2 - mid left */}
      <g transform="translate(650, 780)">
        <ellipse cx="50" cy="80" rx="60" ry="25" fill="#0d0808" fillOpacity="0.7" />
        <rect x="42" y="50" width="16" height="35" fill="#100a0a" />
        <ellipse cx="10" cy="20" rx="20" ry="28" fill="#0a0606" fillOpacity="0.8" />
        <circle cx="10" cy="-15" r="14" fill="#0a0606" fillOpacity="0.8" />
      </g>
    </g>
    
    {/* Smoke wisps - animated via CSS */}
    <g className="smoke-wisps" fillOpacity="0.04" fill="#c0b0a0">
      <ellipse cx="400" cy="400" rx="150" ry="80" className="smoke-wisp-1" />
      <ellipse cx="1000" cy="350" rx="200" ry="100" className="smoke-wisp-2" />
      <ellipse cx="1500" cy="450" rx="180" ry="90" className="smoke-wisp-3" />
    </g>
    
    {/* Spotlight cone */}
    <ellipse cx="350" cy="950" rx="300" ry="150" fill="url(#spotlight)" />
    
    {/* Floor gradient */}
    <rect x="0" y="880" width="1920" height="200" fill="url(#ember-floor)" />
  </svg>
);

// Van Gelder's Studio - Recording studio
const VanGelderStudioSVG = () => (
  <svg 
    viewBox="0 0 1920 1080" 
    preserveAspectRatio="xMidYMid slice"
    className="absolute inset-0 w-full h-full"
    style={{ opacity: 0.3 }}
  >
    <defs>
      <linearGradient id="studio-window" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a0b0c0" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#708090" stopOpacity="0.05" />
      </linearGradient>
      <linearGradient id="vu-glow" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#40c080" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#40c080" stopOpacity="0" />
      </linearGradient>
    </defs>
    
    {/* Control room window - top right */}
    <g transform="translate(1400, 100)">
      <rect x="0" y="0" width="400" height="250" fill="#151820" stroke="#2a3038" strokeWidth="8" />
      <rect x="20" y="20" width="360" height="210" fill="url(#studio-window)" />
      {/* Window frame dividers */}
      <line x1="200" y1="20" x2="200" y2="230" stroke="#2a3038" strokeWidth="4" />
      <line x1="20" y1="125" x2="380" y2="125" stroke="#2a3038" strokeWidth="4" />
    </g>
    
    {/* Tape machines - right side */}
    <g className="tape-machines" transform="translate(1500, 400)">
      {/* Tape reel 1 */}
      <rect x="0" y="0" width="280" height="400" fill="#1e2428" rx="5" />
      <circle cx="80" cy="100" r="60" fill="#252a30" stroke="#3a4048" strokeWidth="3" />
      <circle cx="80" cy="100" r="45" fill="#1a1e22" />
      <circle cx="80" cy="100" r="15" fill="#3a4048" />
      <circle cx="200" cy="100" r="60" fill="#252a30" stroke="#3a4048" strokeWidth="3" />
      <circle cx="200" cy="100" r="45" fill="#1a1e22" />
      <circle cx="200" cy="100" r="15" fill="#3a4048" />
      {/* Tape path */}
      <path d="M80 160 Q140 200 200 160" stroke="#2a3038" strokeWidth="3" fill="none" />
      {/* Controls */}
      <rect x="30" y="240" width="220" height="60" fill="#1a1e22" rx="3" />
      <circle cx="60" cy="270" r="15" fill="#2a3038" />
      <circle cx="110" cy="270" r="15" fill="#2a3038" />
      <circle cx="160" cy="270" r="15" fill="#2a3038" />
      <circle cx="210" cy="270" r="15" fill="#2a3038" />
      {/* VU meters */}
      <rect x="40" y="320" width="80" height="50" fill="#151820" />
      <rect x="160" y="320" width="80" height="50" fill="#151820" />
      <rect x="45" y="355" width="30" height="8" fill="url(#vu-glow)" />
      <rect x="165" y="355" width="25" height="8" fill="url(#vu-glow)" />
    </g>
    
    {/* Mixing console - center bottom */}
    <g className="console" transform="translate(600, 700)">
      <rect x="0" y="0" width="700" height="300" fill="#1a1e22" rx="5" />
      {/* Console top surface */}
      <rect x="0" y="0" width="700" height="200" fill="#252a30" rx="5" />
      {/* Fader channels */}
      {[...Array(16)].map((_, i) => (
        <g key={i} transform={`translate(${35 + i * 40}, 30)`}>
          <rect x="0" y="0" width="30" height="150" fill="#1a1e22" rx="2" />
          <rect x="10" y={30 + Math.random() * 80} width="10" height="30" fill="#3a4048" rx="2" />
          <circle cx="15" cy="20" r="6" fill="#2a3038" />
        </g>
      ))}
      {/* Master section */}
      <rect x="680" y="30" width="15" height="150" fill="#1a1e22" />
    </g>
    
    {/* Acoustic panels - walls */}
    <g className="acoustic-panels" fill="#1e2428" fillOpacity="0.8">
      {/* Left wall panels */}
      <rect x="50" y="150" width="120" height="200" rx="3" />
      <rect x="50" y="380" width="120" height="200" rx="3" />
      <rect x="50" y="610" width="120" height="150" rx="3" />
      {/* Panel texture */}
      <g stroke="#252a30" strokeWidth="1">
        <line x1="50" y1="200" x2="170" y2="200" />
        <line x1="50" y1="250" x2="170" y2="250" />
        <line x1="50" y1="300" x2="170" y2="300" />
        <line x1="50" y1="430" x2="170" y2="430" />
        <line x1="50" y1="480" x2="170" y2="480" />
        <line x1="50" y1="530" x2="170" y2="530" />
      </g>
    </g>
    
    {/* Microphone stands in recording area */}
    <g className="microphones" transform="translate(350, 500)">
      {/* Mic stand 1 - main */}
      <line x1="100" y1="200" x2="100" y2="50" stroke="#2a3038" strokeWidth="4" />
      <ellipse cx="100" cy="210" rx="40" ry="12" fill="#1e2428" />
      <g transform="translate(100, 40)">
        <rect x="-8" y="-30" width="16" height="35" fill="#252a30" rx="4" />
        <rect x="-6" y="-35" width="12" height="8" fill="#3a4048" rx="2" />
      </g>
      
      {/* Mic stand 2 - horn section */}
      <line x1="250" y1="180" x2="250" y2="80" stroke="#2a3038" strokeWidth="3" />
      <ellipse cx="250" cy="188" rx="30" ry="10" fill="#1e2428" />
      <circle cx="250" cy="70" r="15" fill="#252a30" />
      
      {/* Boom mic */}
      <line x1="400" y1="200" x2="400" y2="100" stroke="#2a3038" strokeWidth="3" />
      <line x1="400" y1="100" x2="480" y2="60" stroke="#2a3038" strokeWidth="3" />
      <ellipse cx="400" cy="208" rx="35" ry="10" fill="#1e2428" />
      <rect x="470" y="45" width="25" height="30" fill="#252a30" rx="3" />
    </g>
    
    {/* Instrument cases and equipment */}
    <g className="equipment" transform="translate(200, 750)">
      {/* Instrument case */}
      <rect x="0" y="0" width="150" height="50" fill="#151820" rx="5" />
      <rect x="180" y="-10" width="80" height="60" fill="#1a1e22" rx="3" />
      {/* Headphones on stand */}
      <g transform="translate(300, -30)">
        <line x1="20" y1="80" x2="20" y2="30" stroke="#2a3038" strokeWidth="3" />
        <ellipse cx="20" cy="85" rx="15" ry="5" fill="#1e2428" />
        <path d="M5 25 Q20 5 35 25" stroke="#252a30" strokeWidth="6" fill="none" />
        <ellipse cx="5" cy="30" rx="10" ry="15" fill="#252a30" />
        <ellipse cx="35" cy="30" rx="10" ry="15" fill="#252a30" />
      </g>
    </g>
    
    {/* Clock on wall */}
    <g transform="translate(1100, 150)">
      <circle cx="50" cy="50" r="45" fill="#1e2428" stroke="#2a3038" strokeWidth="3" />
      <circle cx="50" cy="50" r="38" fill="#151820" />
      <line x1="50" y1="50" x2="50" y2="25" stroke="#3a4048" strokeWidth="3" />
      <line x1="50" y1="50" x2="70" y2="55" stroke="#3a4048" strokeWidth="2" />
      <circle cx="50" cy="50" r="4" fill="#3a4048" />
    </g>
  </svg>
);

// Earl's Apartment - Ransacked crime scene
const EarlApartmentSVG = () => (
  <svg 
    viewBox="0 0 1920 1080" 
    preserveAspectRatio="xMidYMid slice"
    className="absolute inset-0 w-full h-full"
    style={{ opacity: 0.3 }}
  >
    <defs>
      <linearGradient id="window-light" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fff5dc" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#e0d0b0" stopOpacity="0.05" />
      </linearGradient>
    </defs>
    
    {/* Window with venetian blinds - dramatic light source */}
    <g transform="translate(100, 150)">
      <rect x="0" y="0" width="400" height="500" fill="#2e2822" stroke="#3d352c" strokeWidth="15" />
      <rect x="20" y="20" width="360" height="460" fill="url(#window-light)" />
      {/* Venetian blinds - some broken/askew */}
      {[...Array(18)].map((_, i) => (
        <rect 
          key={i} 
          x="25" 
          y={30 + i * 25} 
          width="350" 
          height="8" 
          fill="#3d352c" 
          transform={i === 5 || i === 12 ? `rotate(${(Math.random() - 0.5) * 15} 200 ${30 + i * 25})` : ''}
          fillOpacity={i === 5 || i === 12 ? 0.5 : 0.85}
        />
      ))}
      {/* Broken blind hanging */}
      <rect x="200" y="155" width="150" height="8" fill="#3d352c" transform="rotate(25 200 155)" fillOpacity="0.6" />
    </g>
    
    {/* Overturned furniture */}
    <g className="ransacked-items">
      {/* Knocked over chair */}
      <g transform="translate(700, 650) rotate(-70)">
        <rect x="0" y="0" width="60" height="100" fill="#2e2822" rx="3" />
        <rect x="-5" y="100" width="10" height="60" fill="#3d352c" />
        <rect x="55" y="100" width="10" height="60" fill="#3d352c" />
        <rect x="10" y="-50" width="40" height="55" fill="#3d352c" rx="2" />
      </g>
      
      {/* Overturned side table */}
      <g transform="translate(1200, 700) rotate(85)">
        <rect x="0" y="0" width="80" height="60" fill="#3d352c" rx="3" />
        <rect x="30" y="60" width="20" height="50" fill="#2e2822" />
      </g>
      
      {/* Lamp on floor */}
      <g transform="translate(1350, 800) rotate(-30)">
        <ellipse cx="30" cy="60" rx="35" ry="15" fill="#2e2822" />
        <rect x="25" y="0" width="10" height="60" fill="#3d352c" />
        <path d="M0 0 Q30 -20 60 0 L50 10 Q30 -5 10 10 Z" fill="#4a4035" transform="translate(0, -15)" />
      </g>
    </g>
    
    {/* Scattered records and papers */}
    <g className="scattered-items">
      {/* Records */}
      <ellipse cx="900" cy="850" rx="50" ry="15" fill="#1a1510" transform="rotate(-15)" />
      <ellipse cx="950" cy="870" rx="45" ry="12" fill="#0f0c0a" transform="rotate(25)" />
      <ellipse cx="1050" cy="890" rx="48" ry="14" fill="#1a1510" transform="rotate(-5)" />
      
      {/* Papers scattered */}
      <rect x="600" y="900" width="60" height="80" fill="#4a4035" fillOpacity="0.6" transform="rotate(-20)" />
      <rect x="680" y="880" width="55" height="75" fill="#3d352c" fillOpacity="0.5" transform="rotate(15)" />
      <rect x="750" y="920" width="65" height="85" fill="#4a4035" fillOpacity="0.4" transform="rotate(-8)" />
      <rect x="1150" y="850" width="50" height="70" fill="#3d352c" fillOpacity="0.5" transform="rotate(30)" />
      <rect x="1100" y="900" width="60" height="80" fill="#4a4035" fillOpacity="0.6" transform="rotate(-25)" />
    </g>
    
    {/* Bookshelf - books pulled out */}
    <g transform="translate(1450, 200)">
      <rect x="0" y="0" width="350" height="600" fill="#2e2822" />
      {/* Shelves */}
      <rect x="10" y="100" width="330" height="10" fill="#3d352c" />
      <rect x="10" y="250" width="330" height="10" fill="#3d352c" />
      <rect x="10" y="400" width="330" height="10" fill="#3d352c" />
      
      {/* Remaining books - some fallen */}
      <g fill="#3d352c">
        <rect x="20" y="65" width="25" height="35" />
        <rect x="55" y="70" width="20" height="30" />
        {/* Fallen book */}
        <rect x="100" y="90" width="40" height="15" transform="rotate(-45 100 90)" fillOpacity="0.7" />
        <rect x="180" y="60" width="30" height="40" />
        <rect x="220" y="68" width="22" height="32" />
        <rect x="280" y="65" width="28" height="35" />
      </g>
      <g fill="#4a4035">
        <rect x="25" y="215" width="28" height="35" />
        <rect x="65" y="210" width="25" height="40" />
        <rect x="200" y="220" width="30" height="30" />
        <rect x="290" y="212" width="35" height="38" />
      </g>
      <g fill="#3d352c">
        <rect x="30" y="365" width="25" height="35" />
        <rect x="100" y="360" width="28" height="40" />
        {/* Books knocked over */}
        <rect x="180" y="385" width="50" height="20" fillOpacity="0.6" />
        <rect x="250" y="370" width="30" height="30" />
      </g>
    </g>
    
    {/* Piano in corner - untouched but dramatic */}
    <g transform="translate(550, 380)">
      <rect x="0" y="0" width="250" height="180" fill="#2e2822" rx="5" />
      <rect x="10" y="5" width="230" height="30" fill="#1a1510" />
      {/* Keys hint */}
      <rect x="20" y="140" width="210" height="30" fill="#4a4035" />
      {/* Piano legs */}
      <rect x="20" y="180" width="20" height="100" fill="#2e2822" />
      <rect x="210" y="180" width="20" height="100" fill="#2e2822" />
    </g>
    
    {/* Record player - cover open */}
    <g transform="translate(850, 500)">
      <rect x="0" y="0" width="150" height="100" fill="#2e2822" rx="3" />
      {/* Turntable */}
      <ellipse cx="75" cy="50" rx="45" ry="40" fill="#1a1510" />
      <circle cx="75" cy="50" r="15" fill="#2e2822" />
      {/* Tone arm */}
      <line x1="130" y1="20" x2="90" y2="50" stroke="#3d352c" strokeWidth="3" />
      {/* Open lid */}
      <rect x="0" y="-60" width="150" height="65" fill="#3d352c" fillOpacity="0.4" transform="rotate(-15 0 0)" />
    </g>
    
    {/* Blood-like shadow stain - subtle */}
    <ellipse cx="800" cy="750" rx="80" ry="30" fill="#1a0f0f" fillOpacity="0.4" />
  </svg>
);

// Lorraine's Brownstone - Elegant parlor
const LorraineBrownstoneSVG = () => (
  <svg 
    viewBox="0 0 1920 1080" 
    preserveAspectRatio="xMidYMid slice"
    className="absolute inset-0 w-full h-full"
    style={{ opacity: 0.28 }}
  >
    <defs>
      <radialGradient id="lamp-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffdcb4" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#ffdcb4" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="fireplace-glow" x1="50%" y1="100%" x2="50%" y2="0%">
        <stop offset="0%" stopColor="#ff9664" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#ff6432" stopOpacity="0" />
      </linearGradient>
    </defs>
    
    {/* Wainscoting pattern on walls */}
    <g className="wainscoting" fill="#3d3025" fillOpacity="0.5">
      <rect x="0" y="600" width="1920" height="480" />
      {/* Panel details */}
      {[...Array(12)].map((_, i) => (
        <rect key={i} x={60 + i * 155} y="640" width="120" height="380" stroke="#4d3d30" strokeWidth="2" fill="none" />
      ))}
    </g>
    
    {/* Fireplace - left side */}
    <g transform="translate(100, 450)">
      {/* Mantle */}
      <rect x="0" y="0" width="350" height="30" fill="#4d3d30" />
      <rect x="-20" y="-15" width="390" height="20" fill="#3d3025" />
      
      {/* Fireplace opening */}
      <rect x="30" y="30" width="290" height="250" fill="#1a1510" />
      <path d="M30 280 L175 150 L320 280 Z" fill="#2d2520" fillOpacity="0.5" />
      
      {/* Fire glow */}
      <ellipse cx="175" cy="260" rx="120" ry="40" fill="url(#fireplace-glow)" />
      
      {/* Fireplace surround */}
      <rect x="0" y="30" width="30" height="270" fill="#3d3025" />
      <rect x="320" y="30" width="30" height="270" fill="#3d3025" />
      <rect x="0" y="300" width="350" height="30" fill="#3d3025" />
      
      {/* Mantle decorations */}
      <rect x="50" y="-50" width="60" height="35" fill="#2d2520" /> {/* Clock */}
      <rect x="150" y="-40" width="50" height="25" fill="#3d3025" /> {/* Frame */}
      <rect x="250" y="-45" width="40" height="30" fill="#2d2520" /> {/* Vase */}
    </g>
    
    {/* Elegant sofa - center */}
    <g transform="translate(600, 680)">
      {/* Sofa back */}
      <path d="M0 0 Q100 -30 200 -30 Q300 -30 400 0 L400 80 L0 80 Z" fill="#3d3025" />
      {/* Sofa seat */}
      <rect x="-20" y="80" width="440" height="100" fill="#2d2520" rx="10" />
      {/* Sofa arms */}
      <ellipse cx="-10" cy="100" rx="40" ry="60" fill="#3d3025" />
      <ellipse cx="410" cy="100" rx="40" ry="60" fill="#3d3025" />
      {/* Cushions */}
      <rect x="30" y="60" width="100" height="40" fill="#4d3d30" rx="5" />
      <rect x="270" y="60" width="100" height="40" fill="#4d3d30" rx="5" />
      {/* Decorative pillows */}
      <ellipse cx="80" cy="40" rx="35" ry="25" fill="#4d3d30" />
      <ellipse cx="320" cy="40" rx="35" ry="25" fill="#4d3d30" />
      {/* Legs */}
      <rect x="20" y="180" width="20" height="30" fill="#2d2520" />
      <rect x="360" y="180" width="20" height="30" fill="#2d2520" />
    </g>
    
    {/* Coffee table */}
    <g transform="translate(700, 850)">
      <rect x="0" y="0" width="200" height="80" fill="#2d2520" rx="3" />
      <rect x="20" y="80" width="15" height="40" fill="#3d3025" />
      <rect x="165" y="80" width="15" height="40" fill="#3d3025" />
      {/* Items on table */}
      <rect x="30" y="-10" width="50" height="10" fill="#3d3025" /> {/* Book */}
      <ellipse cx="150" cy="-5" rx="25" ry="8" fill="#2d2520" /> {/* Dish */}
    </g>
    
    {/* Lamp with glow - right side */}
    <g transform="translate(1400, 350)">
      <circle cx="100" cy="100" r="150" fill="url(#lamp-glow)" />
      {/* Lamp table */}
      <rect x="50" y="200" width="100" height="80" fill="#3d3025" rx="3" />
      <rect x="60" y="280" width="15" height="50" fill="#2d2520" />
      <rect x="125" y="280" width="15" height="50" fill="#2d2520" />
      {/* Lamp */}
      <rect x="85" y="150" width="30" height="50" fill="#2d2520" />
      <path d="M50 150 Q100 100 150 150 L140 160 Q100 120 60 160 Z" fill="#4d3d30" />
      <ellipse cx="100" cy="155" rx="50" ry="12" fill="#3d3025" />
    </g>
    
    {/* Armchair - right */}
    <g transform="translate(1500, 700)">
      <ellipse cx="80" cy="50" rx="90" ry="70" fill="#3d3025" />
      <rect x="0" y="50" width="160" height="100" fill="#2d2520" rx="10" />
      <ellipse cx="0" cy="80" rx="30" ry="50" fill="#3d3025" />
      <ellipse cx="160" cy="80" rx="30" ry="50" fill="#3d3025" />
      <rect x="20" y="150" width="15" height="30" fill="#2d2520" />
      <rect x="125" y="150" width="15" height="30" fill="#2d2520" />
    </g>
    
    {/* Curtains - windows */}
    <g className="curtains">
      {/* Window 1 */}
      <g transform="translate(1100, 100)">
        <rect x="0" y="0" width="250" height="400" fill="#2d2520" fillOpacity="0.3" />
        {/* Curtain left */}
        <path d="M0 0 Q30 200 0 400 L-30 400 Q0 200 -30 0 Z" fill="#3d3025" />
        <path d="M-30 0 Q-10 200 -30 400 L-50 400 Q-30 200 -50 0 Z" fill="#2d2520" />
        {/* Curtain right */}
        <path d="M250 0 Q220 200 250 400 L280 400 Q250 200 280 0 Z" fill="#3d3025" />
        <path d="M280 0 Q260 200 280 400 L300 400 Q280 200 300 0 Z" fill="#2d2520" />
        {/* Valance */}
        <path d="M-60 0 Q125 40 310 0 L310 30 Q125 60 -60 30 Z" fill="#4d3d30" />
      </g>
    </g>
    
    {/* Picture frames on wall */}
    <g className="frames">
      <rect x="550" y="200" width="120" height="160" fill="#2d2520" stroke="#4d3d30" strokeWidth="8" />
      <rect x="720" y="220" width="100" height="130" fill="#2d2520" stroke="#4d3d30" strokeWidth="6" />
      <rect x="870" y="200" width="80" height="100" fill="#2d2520" stroke="#4d3d30" strokeWidth="5" />
    </g>
    
    {/* Oriental rug pattern hint */}
    <g transform="translate(500, 850)">
      <rect x="0" y="0" width="500" height="200" fill="#3d3025" fillOpacity="0.3" rx="5" />
      <rect x="20" y="20" width="460" height="160" fill="none" stroke="#4d3d30" strokeWidth="2" strokeOpacity="0.4" />
      <rect x="50" y="50" width="400" height="100" fill="none" stroke="#4d3d30" strokeWidth="1" strokeOpacity="0.3" />
    </g>
  </svg>
);

// Birdland - 52nd Street neon jazz club
const BirdlandSVG = () => (
  <svg 
    viewBox="0 0 1920 1080" 
    preserveAspectRatio="xMidYMid slice"
    className="absolute inset-0 w-full h-full"
    style={{ opacity: 0.35 }}
  >
    <defs>
      <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <linearGradient id="street-fade" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#0a0810" stopOpacity="0" />
        <stop offset="100%" stopColor="#0a0810" stopOpacity="0.9" />
      </linearGradient>
    </defs>
    
    {/* BIRDLAND neon sign - top center */}
    <g transform="translate(600, 50)" filter="url(#neon-glow)">
      {/* Sign backing */}
      <rect x="-20" y="-20" width="760" height="140" fill="#0a0810" rx="5" />
      
      {/* BIRDLAND letters - red neon */}
      <g fill="none" stroke="#ff3232" strokeWidth="4" strokeLinecap="round" className="neon-text">
        {/* B */}
        <path d="M20 20 L20 90 M20 20 L50 20 Q70 20 70 40 Q70 55 50 55 L20 55 M20 55 L55 55 Q75 55 75 75 Q75 90 55 90 L20 90" />
        {/* I */}
        <path d="M100 20 L100 90" />
        {/* R */}
        <path d="M130 20 L130 90 M130 20 L160 20 Q180 20 180 40 Q180 55 160 55 L130 55 M155 55 L180 90" />
        {/* D */}
        <path d="M210 20 L210 90 M210 20 L240 20 Q270 35 270 55 Q270 75 240 90 L210 90" />
        {/* L */}
        <path d="M300 20 L300 90 L340 90" />
        {/* A */}
        <path d="M370 90 L395 20 L420 90 M378 70 L412 70" />
        {/* N */}
        <path d="M450 90 L450 20 L490 90 L490 20" />
        {/* D */}
        <path d="M520 20 L520 90 M520 20 L550 20 Q580 35 580 55 Q580 75 550 90 L520 90" />
      </g>
      
      {/* Blue accent line */}
      <line x1="0" y1="100" x2="720" y2="100" stroke="#3c78ff" strokeWidth="3" className="neon-accent" />
      
      {/* Bird silhouette */}
      <g transform="translate(630, 30)" fill="#ff3232" fillOpacity="0.8">
        <path d="M0 30 Q10 10 30 15 Q50 5 60 20 Q65 25 60 35 Q55 50 30 45 Q10 50 0 30" />
      </g>
    </g>
    
    {/* Storefront */}
    <g transform="translate(400, 180)">
      {/* Building facade */}
      <rect x="0" y="0" width="1120" height="800" fill="#151218" />
      
      {/* Main entrance */}
      <rect x="460" y="400" width="200" height="400" fill="#0a0810" />
      {/* Door frame */}
      <rect x="465" y="405" width="190" height="390" fill="none" stroke="#2a2030" strokeWidth="5" />
      {/* Door handles */}
      <ellipse cx="510" cy="600" rx="8" ry="15" fill="#3a3040" />
      <ellipse cx="610" cy="600" rx="8" ry="15" fill="#3a3040" />
      
      {/* Windows with warm interior glow */}
      <g className="windows">
        {/* Left windows */}
        <rect x="50" y="100" width="150" height="200" fill="#201a25" />
        <rect x="55" y="105" width="140" height="190" fill="#2a2030" fillOpacity="0.5" />
        <rect x="230" y="100" width="150" height="200" fill="#201a25" />
        <rect x="235" y="105" width="140" height="190" fill="#2a2030" fillOpacity="0.5" />
        
        {/* Right windows */}
        <rect x="740" y="100" width="150" height="200" fill="#201a25" />
        <rect x="745" y="105" width="140" height="190" fill="#2a2030" fillOpacity="0.5" />
        <rect x="920" y="100" width="150" height="200" fill="#201a25" />
        <rect x="925" y="105" width="140" height="190" fill="#2a2030" fillOpacity="0.5" />
        
        {/* Window warm glow */}
        <ellipse cx="130" cy="200" rx="60" ry="80" fill="#b47850" fillOpacity="0.1" />
        <ellipse cx="810" cy="200" rx="60" ry="80" fill="#b47850" fillOpacity="0.1" />
      </g>
      
      {/* Marquee/awning */}
      <rect x="350" y="350" width="420" height="50" fill="#1a1520" />
      <rect x="350" y="395" width="420" height="10" fill="#2a2030" />
      {/* Marquee text - NOW PLAYING */}
      <g fill="#d4a574" fillOpacity="0.8">
        <text x="420" y="385" fontSize="24" fontFamily="serif">NOW PLAYING</text>
      </g>
    </g>
    
    {/* Street elements */}
    <g className="street">
      {/* Sidewalk */}
      <rect x="0" y="980" width="1920" height="100" fill="#1a1520" />
      
      {/* Street lamp - left */}
      <g transform="translate(200, 500)">
        <rect x="15" y="0" width="10" height="480" fill="#1a1520" />
        <rect x="0" y="0" width="40" height="60" fill="#201a25" rx="5" />
        <ellipse cx="20" cy="480" rx="30" ry="10" fill="#151218" />
        {/* Light glow */}
        <ellipse cx="20" cy="30" rx="60" ry="40" fill="#ffe6b4" fillOpacity="0.08" />
      </g>
      
      {/* Street lamp - right */}
      <g transform="translate(1680, 500)">
        <rect x="15" y="0" width="10" height="480" fill="#1a1520" />
        <rect x="0" y="0" width="40" height="60" fill="#201a25" rx="5" />
        <ellipse cx="20" cy="480" rx="30" ry="10" fill="#151218" />
        <ellipse cx="20" cy="30" rx="60" ry="40" fill="#ffe6b4" fillOpacity="0.08" />
      </g>
      
      {/* Parked car silhouette */}
      <g transform="translate(100, 900)">
        <ellipse cx="150" cy="80" rx="150" ry="30" fill="#0a0810" />
        <path d="M30 80 Q30 30 80 20 L220 20 Q270 30 270 80 Z" fill="#0d0a10" />
        <ellipse cx="70" cy="80" rx="30" ry="25" fill="#0a0810" />
        <ellipse cx="230" cy="80" rx="30" ry="25" fill="#0a0810" />
      </g>
    </g>
    
    {/* People silhouettes near entrance */}
    <g className="crowd" transform="translate(850, 750)">
      {/* Person 1 */}
      <g transform="translate(0, 0)">
        <ellipse cx="25" cy="180" rx="30" ry="60" fill="#0a0810" />
        <circle cx="25" cy="100" r="25" fill="#0a0810" />
        {/* Hat */}
        <ellipse cx="25" cy="80" rx="30" ry="8" fill="#0d0a10" />
        <rect x="5" y="65" width="40" height="18" fill="#0d0a10" />
      </g>
      
      {/* Person 2 - woman */}
      <g transform="translate(70, 20)">
        <path d="M10 220 Q25 140 40 220" fill="#0a0810" />
        <ellipse cx="25" cy="130" rx="20" ry="40" fill="#0a0810" />
        <circle cx="25" cy="85" r="20" fill="#0a0810" />
      </g>
      
      {/* Person 3 */}
      <g transform="translate(130, 10)">
        <ellipse cx="25" cy="175" rx="28" ry="55" fill="#0d0a10" />
        <circle cx="25" cy="100" r="22" fill="#0d0a10" />
      </g>
    </g>
    
    {/* Other businesses - left */}
    <g transform="translate(50, 200)">
      <rect x="0" y="0" width="300" height="700" fill="#0d0a10" />
      {/* Window */}
      <rect x="30" y="100" width="100" height="150" fill="#151218" />
      <rect x="170" y="100" width="100" height="150" fill="#151218" />
      {/* Small neon - BAR */}
      <g transform="translate(100, 50)" stroke="#ff6464" strokeWidth="2" fill="none">
        <path d="M0 0 L0 20 M0 0 L10 0 Q15 0 15 5 Q15 10 10 10 L0 10 M10 10 L18 20" />
        <path d="M25 20 L32 0 L39 20 M28 14 L36 14" />
        <path d="M45 0 L45 20 M45 0 L55 0 Q62 0 62 5 Q62 10 55 10 L45 10 M55 10 L65 20" />
      </g>
    </g>
    
    {/* Other businesses - right */}
    <g transform="translate(1570, 200)">
      <rect x="0" y="0" width="350" height="700" fill="#0d0a10" />
      <rect x="30" y="100" width="120" height="150" fill="#151218" />
      <rect x="200" y="100" width="120" height="150" fill="#151218" />
    </g>
    
    {/* Street fade overlay */}
    <rect x="0" y="800" width="1920" height="280" fill="url(#street-fade)" />
    
    {/* Neon reflection on wet street */}
    <ellipse cx="960" cy="1000" rx="200" ry="30" fill="#ff3232" fillOpacity="0.05" />
  </svg>
);

// Component that renders the appropriate background based on location
export default function LocationBackground({ locationId }) {
  const backgrounds = {
    emberRoom: EmberRoomSVG,
    vanGelderStudio: VanGelderStudioSVG,
    earlApartment: EarlApartmentSVG,
    lorraineBrownstone: LorraineBrownstoneSVG,
    birdland: BirdlandSVG,
  };
  
  const BackgroundComponent = backgrounds[locationId];
  
  if (!BackgroundComponent) return null;
  
  return (
    <div className="location-illustration">
      <BackgroundComponent />
    </div>
  );
}

// Export individual backgrounds for use elsewhere
export { 
  EmberRoomSVG, 
  VanGelderStudioSVG, 
  EarlApartmentSVG, 
  LorraineBrownstoneSVG, 
  BirdlandSVG 
};
