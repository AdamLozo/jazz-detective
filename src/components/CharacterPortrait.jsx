// Stylized noir character portraits for Jazz Detective
// Each portrait uses SVG with a 1950s art deco / jazz aesthetic

const portraits = {
  // TEDDY OLSON - Club owner, slick, dangerous (THE KILLER)
  teddy: ({ size }) => (
    <svg viewBox="0 0 200 200" width={size} height={size} className="portrait-svg">
      <defs>
        <linearGradient id="teddy-bg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a1a2e" />
          <stop offset="100%" stopColor="#0f0f1a" />
        </linearGradient>
        <linearGradient id="teddy-suit" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2d2d44" />
          <stop offset="100%" stopColor="#1a1a2e" />
        </linearGradient>
      </defs>
      {/* Background */}
      <rect width="200" height="200" fill="url(#teddy-bg)" />
      {/* Smoke wisps */}
      <path d="M30 180 Q50 150 40 120 Q30 90 50 70" stroke="#d4a574" strokeWidth="1" fill="none" opacity="0.3" />
      {/* Suit/shoulders */}
      <path d="M40 200 L60 160 L100 145 L140 160 L160 200" fill="url(#teddy-suit)" />
      {/* Shirt collar */}
      <path d="M85 160 L100 145 L115 160" fill="#f5f0e6" />
      {/* Tie */}
      <polygon points="100,145 95,160 100,200 105,160" fill="#8b0000" />
      {/* Face silhouette */}
      <ellipse cx="100" cy="95" rx="40" ry="50" fill="#2a2a3a" />
      {/* Slicked back hair */}
      <path d="M60 75 Q100 40 140 75 Q145 60 100 45 Q55 60 60 75" fill="#1a1a1a" />
      {/* Fedora */}
      <ellipse cx="100" cy="55" rx="55" ry="12" fill="#1a1a1a" />
      <path d="M45 55 Q100 20 155 55" fill="#1a1a1a" />
      <rect x="45" y="43" width="110" height="12" fill="#2d2d44" />
      <rect x="85" y="43" width="30" height="12" fill="#d4a574" opacity="0.8" />
      {/* Eye glints - menacing */}
      <circle cx="85" cy="90" r="3" fill="#d4a574" opacity="0.9" />
      <circle cx="115" cy="90" r="3" fill="#d4a574" opacity="0.9" />
      {/* Cigar glow */}
      <ellipse cx="130" cy="120" rx="4" ry="2" fill="#ff6b35" />
      <circle cx="130" cy="120" r="6" fill="#ff6b35" opacity="0.3" />
      {/* Thin smile */}
      <path d="M85 115 Q100 122 115 115" stroke="#d4a574" strokeWidth="2" fill="none" opacity="0.6" />
    </svg>
  ),

  // JIMMY - Bartender, tall, quiet, observant
  bartender: ({ size }) => (
    <svg viewBox="0 0 200 200" width={size} height={size} className="portrait-svg">
      <defs>
        <linearGradient id="jimmy-bg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a2a1a" />
          <stop offset="100%" stopColor="#0f1a0f" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="url(#jimmy-bg)" />
      {/* Bar reflection */}
      <rect x="0" y="170" width="200" height="30" fill="#3d2914" opacity="0.5" />
      {/* Vest */}
      <path d="M50 200 L65 155 L100 145 L135 155 L150 200" fill="#2d2d2d" />
      {/* White shirt */}
      <path d="M70 200 L80 160 L100 150 L120 160 L130 200" fill="#f5f0e6" />
      {/* Bow tie */}
      <ellipse cx="100" cy="152" rx="12" ry="6" fill="#1a1a1a" />
      <rect x="97" y="148" width="6" height="8" fill="#2d2d2d" />
      {/* Face - darker skin tone represented as deeper silhouette */}
      <ellipse cx="100" cy="95" rx="35" ry="45" fill="#1a2a2a" />
      {/* Short hair */}
      <ellipse cx="100" cy="60" rx="38" ry="20" fill="#0f0f0f" />
      {/* Thoughtful eyes */}
      <ellipse cx="85" cy="90" rx="5" ry="3" fill="#d4a574" opacity="0.7" />
      <ellipse cx="115" cy="90" r="5" ry="3" fill="#d4a574" opacity="0.7" />
      {/* Neutral expression */}
      <line x1="85" y1="115" x2="115" y2="115" stroke="#d4a574" strokeWidth="2" opacity="0.5" />
      {/* Glass in hand */}
      <path d="M160 180 L165 150 L175 150 L180 180" fill="none" stroke="#f5f0e6" strokeWidth="2" opacity="0.6" />
      {/* Towel over shoulder */}
      <path d="M45 165 Q30 155 35 145" stroke="#f5f0e6" strokeWidth="8" strokeLinecap="round" opacity="0.8" />
    </svg>
  ),

  // DELIA - Waitress, young, nervous
  waitress: ({ size }) => (
    <svg viewBox="0 0 200 200" width={size} height={size} className="portrait-svg">
      <defs>
        <linearGradient id="delia-bg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2a1a2a" />
          <stop offset="100%" stopColor="#1a0f1a" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="url(#delia-bg)" />
      {/* Waitress uniform */}
      <path d="M55 200 L70 155 L100 140 L130 155 L145 200" fill="#1a1a1a" />
      {/* White collar/apron accent */}
      <path d="M80 155 L100 145 L120 155 L115 165 L100 155 L85 165 Z" fill="#f5f0e6" />
      {/* Face */}
      <ellipse cx="100" cy="90" rx="32" ry="42" fill="#2a2a3a" />
      {/* 1950s styled hair - waves */}
      <path d="M68 75 Q65 50 80 45 Q100 35 120 45 Q135 50 132 75" fill="#2d1810" />
      <path d="M70 70 Q75 55 90 50 Q100 48 110 50 Q125 55 130 70" fill="#3d2820" />
      {/* Hair curls at sides */}
      <circle cx="65" cy="80" r="8" fill="#2d1810" />
      <circle cx="135" cy="80" r="8" fill="#2d1810" />
      {/* Wide, nervous eyes */}
      <ellipse cx="87" cy="85" rx="6" ry="5" fill="#d4a574" opacity="0.8" />
      <ellipse cx="113" cy="85" rx="6" ry="5" fill="#d4a574" opacity="0.8" />
      {/* Small worried mouth */}
      <ellipse cx="100" cy="115" rx="6" ry="3" fill="#8b4557" opacity="0.7" />
      {/* Earrings */}
      <circle cx="68" cy="100" r="3" fill="#d4a574" opacity="0.8" />
      <circle cx="132" cy="100" r="3" fill="#d4a574" opacity="0.8" />
      {/* Serving tray hint */}
      <ellipse cx="170" cy="170" rx="25" ry="5" fill="#d4a574" opacity="0.4" />
    </svg>
  ),

  // RUDY VAN GELDER - Recording engineer, precise, older, glasses
  rudy: ({ size }) => (
    <svg viewBox="0 0 200 200" width={size} height={size} className="portrait-svg">
      <defs>
        <linearGradient id="rudy-bg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a1a2e" />
          <stop offset="100%" stopColor="#0f0f1a" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="url(#rudy-bg)" />
      {/* Studio equipment silhouette */}
      <rect x="150" y="50" width="40" height="100" fill="#2d2d44" opacity="0.3" />
      <circle cx="170" cy="80" r="10" fill="#d4a574" opacity="0.2" />
      {/* Lab coat / work shirt */}
      <path d="M45 200 L60 150 L100 135 L140 150 L155 200" fill="#3d3d4d" />
      {/* Collar */}
      <path d="M80 150 L100 140 L120 150" fill="#f5f0e6" opacity="0.8" />
      {/* Face - older, distinguished */}
      <ellipse cx="100" cy="90" rx="35" ry="45" fill="#2a2a3a" />
      {/* Receding hairline */}
      <path d="M65 65 Q75 50 100 48 Q125 50 135 65 L130 75 Q100 65 70 75 Z" fill="#4a4a4a" />
      {/* Signature glasses */}
      <circle cx="82" cy="88" r="15" fill="none" stroke="#d4a574" strokeWidth="2" />
      <circle cx="118" cy="88" r="15" fill="none" stroke="#d4a574" strokeWidth="2" />
      <line x1="97" y1="88" x2="103" y2="88" stroke="#d4a574" strokeWidth="2" />
      <line x1="67" y1="85" x2="55" y2="80" stroke="#d4a574" strokeWidth="2" />
      <line x1="133" y1="85" x2="145" y2="80" stroke="#d4a574" strokeWidth="2" />
      {/* Eyes behind glasses */}
      <circle cx="82" cy="88" r="3" fill="#d4a574" opacity="0.6" />
      <circle cx="118" cy="88" r="3" fill="#d4a574" opacity="0.6" />
      {/* Slight knowing smile */}
      <path d="M90 115 Q100 120 110 115" stroke="#d4a574" strokeWidth="2" fill="none" opacity="0.5" />
      {/* Headphones around neck hint */}
      <path d="M60 145 Q55 130 65 120" stroke="#2d2d44" strokeWidth="6" fill="none" />
      <path d="M140 145 Q145 130 135 120" stroke="#2d2d44" strokeWidth="6" fill="none" />
    </svg>
  ),

  // SNAP - Young trumpet player, confident, sharp
  snap: ({ size }) => (
    <svg viewBox="0 0 200 200" width={size} height={size} className="portrait-svg">
      <defs>
        <linearGradient id="snap-bg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a2a3e" />
          <stop offset="100%" stopColor="#0f1a2e" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="url(#snap-bg)" />
      {/* Sharp suit */}
      <path d="M45 200 L65 155 L100 140 L135 155 L155 200" fill="#1a3a5a" />
      {/* Suit lapels */}
      <path d="M65 155 L85 165 L100 145 L115 165 L135 155 L120 175 L100 160 L80 175 Z" fill="#0f2a4a" />
      {/* White shirt peek */}
      <polygon points="100,145 95,160 100,175 105,160" fill="#f5f0e6" />
      {/* Thin tie */}
      <polygon points="100,160 97,175 100,200 103,175" fill="#d4a574" />
      {/* Face - young, confident */}
      <ellipse cx="100" cy="90" rx="33" ry="43" fill="#1a2a2a" />
      {/* Stylish high-top fade */}
      <path d="M67 70 Q70 40 100 35 Q130 40 133 70 Q100 60 67 70" fill="#0f0f0f" />
      {/* Cool, confident eyes */}
      <path d="M80 88 L90 86 L90 90 L80 92 Z" fill="#d4a574" opacity="0.8" />
      <path d="M110 86 L120 88 L120 92 L110 90 Z" fill="#d4a574" opacity="0.8" />
      {/* Slight smirk */}
      <path d="M88 115 Q100 118 115 112" stroke="#d4a574" strokeWidth="2" fill="none" opacity="0.6" />
      {/* Trumpet */}
      <path d="M155 140 L175 140 L185 130 L185 150 L175 140" fill="#d4a574" opacity="0.7" />
      <rect x="140" y="137" width="20" height="6" fill="#d4a574" opacity="0.7" />
      <circle cx="138" cy="140" r="4" fill="#d4a574" opacity="0.5" />
      <circle cx="130" cy="140" r="4" fill="#d4a574" opacity="0.5" />
      <circle cx="122" cy="140" r="4" fill="#d4a574" opacity="0.5" />
    </svg>
  ),

  // FRANK - Building super, tired, working class
  buildingSuper: ({ size }) => (
    <svg viewBox="0 0 200 200" width={size} height={size} className="portrait-svg">
      <defs>
        <linearGradient id="frank-bg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2a2a1a" />
          <stop offset="100%" stopColor="#1a1a0f" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="url(#frank-bg)" />
      {/* Doorframe hint */}
      <rect x="0" y="0" width="15" height="200" fill="#3d2914" opacity="0.3" />
      {/* Work jacket */}
      <path d="M45 200 L55 155 L100 145 L145 155 L155 200" fill="#3d4a3d" />
      {/* Work shirt collar */}
      <path d="M80 155 L100 148 L120 155" fill="#6a6a5a" />
      {/* Face - tired, weathered */}
      <ellipse cx="100" cy="92" rx="36" ry="46" fill="#2a2a2a" />
      {/* Thinning hair, cap */}
      <ellipse cx="100" cy="55" rx="45" ry="15" fill="#4a4a3a" />
      <path d="M55 55 Q100 30 145 55" fill="#4a4a3a" />
      <rect x="55" y="45" width="90" height="10" fill="#3d3d2d" />
      {/* Tired, droopy eyes */}
      <path d="M80 90 Q85 87 92 90" stroke="#d4a574" strokeWidth="3" fill="none" opacity="0.6" />
      <path d="M108 90 Q115 87 120 90" stroke="#d4a574" strokeWidth="3" fill="none" opacity="0.6" />
      {/* Stubble suggestion */}
      <ellipse cx="100" cy="120" rx="20" ry="15" fill="#1a1a1a" opacity="0.3" />
      {/* Tired line mouth */}
      <line x1="88" y1="118" x2="112" y2="118" stroke="#d4a574" strokeWidth="2" opacity="0.4" />
      {/* Keys */}
      <circle cx="160" cy="180" r="8" fill="none" stroke="#d4a574" strokeWidth="2" opacity="0.6" />
      <rect x="158" y="185" width="4" height="12" fill="#d4a574" opacity="0.6" />
      <rect x="165" y="185" width="4" height="8" fill="#d4a574" opacity="0.6" />
    </svg>
  ),

  // MRS. PATTERSON - Elderly neighbor, nosy but kind
  neighbor: ({ size }) => (
    <svg viewBox="0 0 200 200" width={size} height={size} className="portrait-svg">
      <defs>
        <linearGradient id="patterson-bg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2a2a3a" />
          <stop offset="100%" stopColor="#1a1a2a" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="url(#patterson-bg)" />
      {/* Door frame peeking */}
      <rect x="170" y="0" width="30" height="200" fill="#3d2914" opacity="0.3" />
      {/* Cardigan/housecoat */}
      <path d="M50 200 L60 155 L100 145 L140 155 L150 200" fill="#5a4a6a" />
      {/* Pearl necklace hint */}
      <path d="M75 155 Q100 165 125 155" stroke="#f5f0e6" strokeWidth="3" fill="none" opacity="0.6" />
      {/* Face - elderly, kind */}
      <ellipse cx="100" cy="92" rx="34" ry="44" fill="#2a2a3a" />
      {/* Grey curled hair */}
      <ellipse cx="100" cy="58" rx="40" ry="22" fill="#6a6a6a" />
      <circle cx="65" cy="70" r="12" fill="#6a6a6a" />
      <circle cx="135" cy="70" r="12" fill="#6a6a6a" />
      <circle cx="75" cy="55" r="8" fill="#5a5a5a" />
      <circle cx="125" cy="55" r="8" fill="#5a5a5a" />
      {/* Soft, curious eyes */}
      <ellipse cx="87" cy="88" rx="5" ry="4" fill="#d4a574" opacity="0.7" />
      <ellipse cx="113" cy="88" rx="5" ry="4" fill="#d4a574" opacity="0.7" />
      {/* Reading glasses on nose */}
      <ellipse cx="87" cy="95" rx="10" ry="7" fill="none" stroke="#d4a574" strokeWidth="1.5" opacity="0.5" />
      <ellipse cx="113" cy="95" rx="10" ry="7" fill="none" stroke="#d4a574" strokeWidth="1.5" opacity="0.5" />
      <line x1="97" y1="95" x2="103" y2="95" stroke="#d4a574" strokeWidth="1.5" opacity="0.5" />
      {/* Kind smile */}
      <path d="M90 115 Q100 122 110 115" stroke="#d4a574" strokeWidth="2" fill="none" opacity="0.5" />
    </svg>
  ),

  // LORRAINE - Beautiful, heartbroken singer, elegant
  lorraine: ({ size }) => (
    <svg viewBox="0 0 200 200" width={size} height={size} className="portrait-svg">
      <defs>
        <linearGradient id="lorraine-bg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2a1a2a" />
          <stop offset="100%" stopColor="#1a0f1a" />
        </linearGradient>
        <linearGradient id="lorraine-dress" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4a1a3a" />
          <stop offset="100%" stopColor="#2a0f2a" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="url(#lorraine-bg)" />
      {/* Elegant dress */}
      <path d="M55 200 L70 155 L100 140 L130 155 L145 200" fill="url(#lorraine-dress)" />
      {/* Bare shoulders hint */}
      <ellipse cx="70" cy="155" rx="15" ry="8" fill="#2a2a3a" />
      <ellipse cx="130" cy="155" rx="15" ry="8" fill="#2a2a3a" />
      {/* Elegant neckline */}
      <path d="M75 155 Q100 145 125 155" stroke="#4a1a3a" strokeWidth="3" fill="none" />
      {/* Face - beautiful, sad */}
      <ellipse cx="100" cy="90" rx="32" ry="42" fill="#2a2a3a" />
      {/* Elegant updo hairstyle */}
      <ellipse cx="100" cy="50" rx="35" ry="20" fill="#1a0f0f" />
      <path d="M68 65 Q65 45 85 40 Q100 35 115 40 Q135 45 132 65" fill="#1a0f0f" />
      {/* Hair ornament */}
      <circle cx="130" cy="50" r="5" fill="#d4a574" opacity="0.8" />
      {/* Sad, beautiful eyes */}
      <path d="M82 85 Q87 82 92 85" stroke="#d4a574" strokeWidth="3" fill="none" opacity="0.8" />
      <path d="M108 85 Q113 82 118 85" stroke="#d4a574" strokeWidth="3" fill="none" opacity="0.8" />
      {/* Tear track */}
      <line x1="118" y1="90" x2="120" y2="105" stroke="#7aa7c7" strokeWidth="1" opacity="0.4" />
      {/* Full lips, slight downturn */}
      <path d="M90 112 Q100 115 110 112" stroke="#8b4557" strokeWidth="3" fill="none" opacity="0.7" />
      {/* Elegant earrings */}
      <path d="M68 95 L65 115" stroke="#d4a574" strokeWidth="2" />
      <circle cx="65" cy="118" r="4" fill="#d4a574" opacity="0.8" />
      <path d="M132 95 L135 115" stroke="#d4a574" strokeWidth="2" />
      <circle cx="135" cy="118" r="4" fill="#d4a574" opacity="0.8" />
    </svg>
  ),

  // MAE - Protective sister, sharp, no-nonsense
  mae: ({ size }) => (
    <svg viewBox="0 0 200 200" width={size} height={size} className="portrait-svg">
      <defs>
        <linearGradient id="mae-bg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2a2a2a" />
          <stop offset="100%" stopColor="#1a1a1a" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="url(#mae-bg)" />
      {/* Sensible blouse/jacket */}
      <path d="M50 200 L60 155 L100 145 L140 155 L150 200" fill="#3a3a4a" />
      {/* Collar */}
      <path d="M75 155 L100 148 L125 155" fill="#f5f0e6" opacity="0.7" />
      {/* Face - older, sharp features */}
      <ellipse cx="100" cy="90" rx="33" ry="43" fill="#2a2a3a" />
      {/* Practical short hair */}
      <path d="M67 75 Q70 50 100 45 Q130 50 133 75 Q115 65 85 65 Q67 68 67 75" fill="#3a3a3a" />
      <path d="M65 80 Q60 70 70 65" fill="#3a3a3a" />
      <path d="M135 80 Q140 70 130 65" fill="#3a3a3a" />
      {/* Sharp, assessing eyes */}
      <line x1="80" y1="88" x2="92" y2="85" stroke="#d4a574" strokeWidth="3" opacity="0.8" />
      <line x1="108" y1="85" x2="120" y2="88" stroke="#d4a574" strokeWidth="3" opacity="0.8" />
      {/* Stern eyebrows */}
      <line x1="78" y1="78" x2="90" y2="80" stroke="#2a2a2a" strokeWidth="2" />
      <line x1="110" y1="80" x2="122" y2="78" stroke="#2a2a2a" strokeWidth="2" />
      {/* Firm, thin lips */}
      <line x1="88" y1="115" x2="112" y2="115" stroke="#6a4a5a" strokeWidth="2" opacity="0.7" />
      {/* Arms crossed suggestion */}
      <path d="M45 180 Q55 170 70 175" stroke="#3a3a4a" strokeWidth="8" fill="none" />
      <path d="M155 180 Q145 170 130 175" stroke="#3a3a4a" strokeWidth="8" fill="none" />
    </svg>
  ),

  // SYMPHONY SID - Radio DJ, charismatic, animated
  symphonySid: ({ size }) => (
    <svg viewBox="0 0 200 200" width={size} height={size} className="portrait-svg">
      <defs>
        <linearGradient id="sid-bg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3a1a1a" />
          <stop offset="100%" stopColor="#1a0f0f" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="url(#sid-bg)" />
      {/* Radio waves */}
      <path d="M160 30 Q180 50 160 70" stroke="#d4a574" strokeWidth="2" fill="none" opacity="0.3" />
      <path d="M170 35 Q195 55 170 75" stroke="#d4a574" strokeWidth="2" fill="none" opacity="0.2" />
      {/* Flashy suit */}
      <path d="M40 200 L60 155 L100 140 L140 155 L160 200" fill="#5a2a2a" />
      {/* Wide lapels */}
      <path d="M60 155 L80 170 L100 145 L120 170 L140 155 L125 180 L100 160 L75 180 Z" fill="#4a1a1a" />
      {/* Loud tie */}
      <polygon points="100,145 95,165 100,200 105,165" fill="#d4a574" />
      {/* Pocket square */}
      <polygon points="65,165 70,160 75,165 70,175" fill="#d4a574" opacity="0.8" />
      {/* Face - animated, expressive */}
      <ellipse cx="100" cy="90" rx="35" ry="45" fill="#2a2a3a" />
      {/* Slick processed hair */}
      <path d="M65 70 Q70 40 100 35 Q130 40 135 70 Q110 55 90 55 Q65 58 65 70" fill="#0f0f0f" />
      {/* Wide, bright eyes */}
      <ellipse cx="85" cy="88" rx="6" ry="5" fill="#d4a574" opacity="0.9" />
      <ellipse cx="115" cy="88" rx="6" ry="5" fill="#d4a574" opacity="0.9" />
      {/* Big smile - showman */}
      <path d="M82 112 Q100 125 118 112" stroke="#d4a574" strokeWidth="3" fill="none" opacity="0.7" />
      {/* Microphone */}
      <rect x="150" y="100" width="8" height="30" fill="#4a4a4a" />
      <ellipse cx="154" cy="100" rx="10" ry="12" fill="#3a3a3a" />
      <ellipse cx="154" cy="100" rx="8" ry="10" fill="#2a2a2a" />
    </svg>
  ),

  // PETE WILSON - Journalist, investigative, rumpled
  journalist: ({ size }) => (
    <svg viewBox="0 0 200 200" width={size} height={size} className="portrait-svg">
      <defs>
        <linearGradient id="pete-bg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2a2a1a" />
          <stop offset="100%" stopColor="#1a1a0f" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="url(#pete-bg)" />
      {/* Rumpled suit jacket */}
      <path d="M40 200 L55 155 L100 145 L145 155 L160 200" fill="#4a4a3a" />
      {/* Loose tie */}
      <polygon points="100,150 96,165 100,200 104,165" fill="#6a5a4a" />
      {/* Unbuttoned collar */}
      <path d="M82 155 L100 145 L118 155" fill="#f5f0e6" opacity="0.8" />
      {/* Face - intense, curious */}
      <ellipse cx="100" cy="90" rx="34" ry="44" fill="#2a2a3a" />
      {/* Messy hair */}
      <path d="M66 70 Q75 45 100 42 Q125 45 134 70" fill="#4a3a2a" />
      <path d="M70 65 Q68 55 75 52" fill="#4a3a2a" />
      <path d="M85 55 Q90 48 95 52" fill="#4a3a2a" />
      <path d="M115 52 Q120 48 125 55" fill="#4a3a2a" />
      {/* Intense, searching eyes */}
      <ellipse cx="85" cy="88" rx="5" ry="4" fill="#d4a574" opacity="0.9" />
      <ellipse cx="115" cy="88" rx="5" ry="4" fill="#d4a574" opacity="0.9" />
      {/* Slight frown - thinking */}
      <path d="M90 115 Q100 112 110 115" stroke="#d4a574" strokeWidth="2" fill="none" opacity="0.5" />
      {/* Press hat with card */}
      <ellipse cx="100" cy="48" rx="42" ry="10" fill="#5a5a4a" />
      <path d="M58 48 Q100 25 142 48" fill="#5a5a4a" />
      <rect x="120" y="38" width="15" height="10" fill="#f5f0e6" opacity="0.7" />
      {/* Notepad */}
      <rect x="150" y="160" width="20" height="30" fill="#f5f0e6" opacity="0.6" />
      <line x1="155" y1="170" x2="165" y2="170" stroke="#2a2a2a" strokeWidth="1" opacity="0.5" />
      <line x1="155" y1="175" x2="165" y2="175" stroke="#2a2a2a" strokeWidth="1" opacity="0.5" />
    </svg>
  ),

  // RUTHIE DAVIS - Young vocalist, ambitious, beautiful
  ruthie: ({ size }) => (
    <svg viewBox="0 0 200 200" width={size} height={size} className="portrait-svg">
      <defs>
        <linearGradient id="ruthie-bg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3a1a2a" />
          <stop offset="100%" stopColor="#1a0f1a" />
        </linearGradient>
        <linearGradient id="ruthie-dress" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8b0000" />
          <stop offset="100%" stopColor="#5a0000" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="url(#ruthie-bg)" />
      {/* Spotlight effect */}
      <ellipse cx="100" cy="100" rx="80" ry="100" fill="#d4a574" opacity="0.05" />
      {/* Red dress - femme fatale */}
      <path d="M55 200 L68 150 L100 138 L132 150 L145 200" fill="url(#ruthie-dress)" />
      {/* Sweetheart neckline */}
      <path d="M72 152 Q100 140 128 152" stroke="#8b0000" strokeWidth="2" fill="none" />
      {/* Face - young, beautiful, calculating */}
      <ellipse cx="100" cy="88" rx="30" ry="40" fill="#2a2a3a" />
      {/* Glamorous waves */}
      <path d="M70 75 Q65 50 85 45 Q100 40 115 45 Q135 50 130 75" fill="#1a0f0f" />
      <path d="M68 80 Q60 70 65 60" fill="#1a0f0f" />
      <path d="M132 80 Q140 70 135 60" fill="#1a0f0f" />
      {/* Waves over shoulder */}
      <path d="M65 85 Q55 100 58 130" fill="#1a0f0f" />
      {/* Sharp, knowing eyes */}
      <path d="M85 85 Q90 82 95 85" stroke="#d4a574" strokeWidth="3" fill="none" opacity="0.9" />
      <path d="M105 85 Q110 82 115 85" stroke="#d4a574" strokeWidth="3" fill="none" opacity="0.9" />
      {/* Red lipstick - signature */}
      <ellipse cx="100" cy="110" rx="8" ry="4" fill="#8b0000" opacity="0.9" />
      {/* Beauty mark */}
      <circle cx="115" cy="105" r="2" fill="#1a1a1a" />
      {/* Earrings */}
      <circle cx="70" cy="95" r="4" fill="#d4a574" opacity="0.8" />
      <circle cx="130" cy="95" r="4" fill="#d4a574" opacity="0.8" />
    </svg>
  ),

  // CHET MALONE - Former drummer, worn down, haunted
  chet: ({ size }) => (
    <svg viewBox="0 0 200 200" width={size} height={size} className="portrait-svg">
      <defs>
        <linearGradient id="chet-bg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a2a2a" />
          <stop offset="100%" stopColor="#0f1a1a" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="url(#chet-bg)" />
      {/* Bar stool / counter hint */}
      <rect x="0" y="180" width="200" height="20" fill="#3d2914" opacity="0.4" />
      {/* Worn jacket */}
      <path d="M45 200 L58 155 L100 145 L142 155 L155 200" fill="#3a4a4a" />
      {/* Open collar - no tie */}
      <path d="M82 158 L100 148 L118 158" fill="#5a5a5a" />
      {/* Face - haunted, weathered */}
      <ellipse cx="100" cy="90" rx="35" ry="45" fill="#1a2a2a" />
      {/* Unkempt hair */}
      <path d="M65 70 Q75 45 100 42 Q125 45 135 70" fill="#2a2a2a" />
      <path d="M68 68 Q63 60 70 55 Q75 50 72 58" fill="#2a2a2a" />
      <path d="M132 68 Q137 60 130 55 Q125 50 128 58" fill="#2a2a2a" />
      {/* Hollow, tired eyes */}
      <ellipse cx="85" cy="88" rx="8" ry="5" fill="#0f1a1a" />
      <ellipse cx="115" cy="88" rx="8" ry="5" fill="#0f1a1a" />
      <circle cx="85" cy="88" r="3" fill="#d4a574" opacity="0.5" />
      <circle cx="115" cy="88" r="3" fill="#d4a574" opacity="0.5" />
      {/* Dark circles under eyes */}
      <path d="M78 93 Q85 97 92 93" stroke="#0f1a1a" strokeWidth="3" fill="none" opacity="0.5" />
      <path d="M108 93 Q115 97 122 93" stroke="#0f1a1a" strokeWidth="3" fill="none" opacity="0.5" />
      {/* Stubble */}
      <ellipse cx="100" cy="118" rx="18" ry="12" fill="#1a1a1a" opacity="0.4" />
      {/* Grim line mouth */}
      <line x1="88" y1="115" x2="112" y2="115" stroke="#d4a574" strokeWidth="2" opacity="0.4" />
      {/* Coffee cup */}
      <path d="M155 175 L160 155 L175 155 L180 175 Z" fill="#5a4a3a" />
      <ellipse cx="167" cy="155" rx="10" ry="3" fill="#3a2a1a" />
      <path d="M180 160 Q190 165 180 170" stroke="#5a4a3a" strokeWidth="3" fill="none" />
    </svg>
  ),
};

// Default fallback portrait
const DefaultPortrait = ({ size }) => (
  <svg viewBox="0 0 200 200" width={size} height={size} className="portrait-svg">
    <defs>
      <linearGradient id="default-bg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#2a2a3a" />
        <stop offset="100%" stopColor="#1a1a2a" />
      </linearGradient>
    </defs>
    <rect width="200" height="200" fill="url(#default-bg)" />
    <ellipse cx="100" cy="90" rx="35" ry="45" fill="#3a3a4a" />
    <ellipse cx="100" cy="55" rx="38" ry="20" fill="#2a2a3a" />
    <circle cx="85" cy="88" r="4" fill="#d4a574" opacity="0.5" />
    <circle cx="115" cy="88" r="4" fill="#d4a574" opacity="0.5" />
    <line x1="88" y1="115" x2="112" y2="115" stroke="#d4a574" strokeWidth="2" opacity="0.4" />
    <path d="M50 200 L65 155 L100 145 L135 155 L150 200" fill="#3a3a4a" />
  </svg>
);

export default function CharacterPortrait({ characterId, size = 120, className = '', isSpeaking = false }) {
  const PortraitComponent = portraits[characterId] || DefaultPortrait;
  
  return (
    <div 
      className={`character-portrait ${isSpeaking ? 'portrait-speaking' : ''} ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: '4px',
        overflow: 'hidden',
        boxShadow: isSpeaking 
          ? '0 4px 20px rgba(212, 165, 116, 0.4), 0 0 40px rgba(212, 165, 116, 0.3), inset 0 0 30px rgba(212, 165, 116, 0.15)'
          : '0 4px 20px rgba(0, 0, 0, 0.5), inset 0 0 30px rgba(212, 165, 116, 0.1)',
        border: isSpeaking 
          ? '2px solid rgba(212, 165, 116, 0.6)'
          : '2px solid rgba(212, 165, 116, 0.3)',
        transition: 'all 0.3s ease',
        transform: isSpeaking ? 'scale(1.02)' : 'scale(1)',
      }}
    >
      <PortraitComponent size={size} />
      
      {/* Speaking indicator pulse */}
      {isSpeaking && (
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(212, 165, 116, 0.15) 0%, transparent 70%)',
            animation: 'portraitSpeakingPulse 1.5s ease-in-out infinite',
          }}
        />
      )}
      
      <style>{`
        @keyframes portraitSpeakingPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        
        .portrait-speaking {
          position: relative;
        }
      `}</style>
    </div>
  );
}

// Export individual portraits for special uses
export { portraits };
