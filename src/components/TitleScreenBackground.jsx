// Dramatic Noir Title Screen Background
// 1958 Harlem cityscape with rain, neon, and atmosphere

import { useEffect, useState, useMemo } from 'react';

export default function TitleScreenBackground({ animationPhase = 'full' }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate raindrops with consistent values using useMemo
  const raindrops = useMemo(() => {
    const drops = [];
    for (let i = 0; i < 200; i++) {
      drops.push({
        id: i,
        x: (i * 9.6) + (i % 7) * 3, // Deterministic positioning
        delay: (i % 20) * 0.1,
        duration: 0.4 + (i % 5) * 0.1,
        opacity: 0.1 + (i % 4) * 0.08,
        length: 30 + (i % 4) * 10,
      });
    }
    return drops;
  }, []);

  // Generate twinkling windows
  const distantWindows = useMemo(() => {
    const windows = [];
    for (let i = 0; i < 100; i++) {
      windows.push({
        id: i,
        x: 40 + (i % 25) * 75,
        y: 280 + Math.floor(i / 25) * 100 + (i % 7) * 30,
        width: 3 + (i % 3) * 2,
        height: 4 + (i % 4) * 3,
        delay: i % 12,
        baseOpacity: 0.1 + (i % 5) * 0.08,
      });
    }
    return windows;
  }, []);

  const midWindows = useMemo(() => {
    const windows = [];
    for (let i = 0; i < 70; i++) {
      windows.push({
        id: i,
        x: 20 + (i % 18) * 105,
        y: 420 + Math.floor(i / 18) * 90 + (i % 5) * 25,
        width: 8 + (i % 4) * 4,
        height: 12 + (i % 3) * 6,
        delay: (i + 5) % 12,
        baseOpacity: 0.15 + (i % 4) * 0.1,
      });
    }
    return windows;
  }, []);

  return (
    <div className={`title-screen-illustration absolute inset-0 transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      <svg 
        viewBox="0 0 1920 1080" 
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="title-sky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#050408" />
            <stop offset="30%" stopColor="#0a0812" />
            <stop offset="60%" stopColor="#12101a" />
            <stop offset="100%" stopColor="#1a1520" />
          </linearGradient>
          
          <linearGradient id="title-building" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0d0a10" />
            <stop offset="100%" stopColor="#060508" />
          </linearGradient>
          
          <linearGradient id="title-street" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#12101a" />
            <stop offset="100%" stopColor="#080610" />
          </linearGradient>
          
          <radialGradient id="title-streetlight" cx="50%" cy="0%" r="100%">
            <stop offset="0%" stopColor="#ffe4b5" stopOpacity="0.5" />
            <stop offset="40%" stopColor="#ffd090" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ffd090" stopOpacity="0" />
          </radialGradient>
          
          <radialGradient id="title-neon-red" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff2020" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#ff3030" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ff3030" stopOpacity="0" />
          </radialGradient>
          
          <radialGradient id="title-neon-blue" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4080ff" stopOpacity="0.7" />
            <stop offset="40%" stopColor="#4080ff" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#4080ff" stopOpacity="0" />
          </radialGradient>
          
          <radialGradient id="title-neon-amber" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#d4a574" stopOpacity="0.7" />
            <stop offset="40%" stopColor="#d4a574" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#d4a574" stopOpacity="0" />
          </radialGradient>
          
          <radialGradient id="title-window" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffd090" stopOpacity="1" />
            <stop offset="100%" stopColor="#ffd090" stopOpacity="0.4" />
          </radialGradient>
          
          <radialGradient id="title-moon" cx="30%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#f0e8d8" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#d8d0c0" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#c0b8a8" stopOpacity="0" />
          </radialGradient>
          
          <radialGradient id="title-vignette" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="60%" stopColor="#000000" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.85" />
          </radialGradient>
          
          <filter id="title-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          <filter id="title-neon-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>
        
        {/* Night Sky */}
        <rect x="0" y="0" width="1920" height="1080" fill="url(#title-sky)" />
        
        {/* Stars */}
        <g className="stars">
          {[...Array(30)].map((_, i) => (
            <circle
              key={`star-${i}`}
              cx={100 + (i * 60) + (i % 5) * 20}
              cy={50 + (i % 8) * 25}
              r={0.5 + (i % 3) * 0.5}
              fill="#ffffff"
              fillOpacity={0.2 + (i % 4) * 0.1}
              className={`star-twinkle star-delay-${i % 6}`}
            />
          ))}
        </g>
        
        {/* Moon with atmospheric haze */}
        <g className="moon">
          <circle cx="1650" cy="120" r="300" fill="url(#title-moon)" />
          <circle cx="1650" cy="120" r="60" fill="#e8e0d0" fillOpacity="0.06" />
          <circle cx="1650" cy="120" r="35" fill="#f0e8d8" fillOpacity="0.1" />
          <circle cx="1640" cy="110" r="8" fill="#d8d0c0" fillOpacity="0.05" />
        </g>
        
        {/* Distant skyline */}
        <g className="distant-skyline">
          <rect x="-20" y="250" width="140" height="830" fill="#080610" />
          <rect x="100" y="300" width="100" height="780" fill="#0a0812" />
          <rect x="180" y="220" width="180" height="860" fill="#090710" />
          <rect x="340" y="340" width="120" height="740" fill="#080610" />
          <rect x="440" y="180" width="200" height="900" fill="#0a0812" />
          <rect x="620" y="280" width="140" height="800" fill="#090710" />
          <rect x="740" y="150" width="240" height="930" fill="#080610" />
          <rect x="960" y="260" width="110" height="820" fill="#0a0812" />
          <rect x="1050" y="200" width="180" height="880" fill="#090710" />
          <rect x="1210" y="320" width="130" height="760" fill="#080610" />
          <rect x="1320" y="270" width="160" height="810" fill="#0a0812" />
          <rect x="1460" y="180" width="200" height="900" fill="#090710" />
          <rect x="1640" y="300" width="150" height="780" fill="#080610" />
          <rect x="1770" y="250" width="170" height="830" fill="#0a0812" />
        </g>
        
        {/* Distant twinkling windows */}
        <g className="distant-windows">
          {distantWindows.map(win => (
            <rect
              key={`dwin-${win.id}`}
              x={win.x}
              y={win.y}
              width={win.width}
              height={win.height}
              fill="#ffd090"
              fillOpacity={win.baseOpacity}
              className={`twinkle-window twinkle-delay-${win.delay}`}
            />
          ))}
        </g>
        
        {/* Mid-ground buildings */}
        <g className="mid-buildings">
          <rect x="-60" y="380" width="300" height="700" fill="url(#title-building)" />
          <rect x="220" y="440" width="220" height="640" fill="#0c0a12" />
          <rect x="420" y="360" width="300" height="720" fill="url(#title-building)" />
          <rect x="700" y="400" width="200" height="680" fill="#0c0a12" />
          <rect x="1050" y="380" width="280" height="700" fill="url(#title-building)" />
          <rect x="1310" y="450" width="220" height="630" fill="#0c0a12" />
          <rect x="1510" y="360" width="240" height="720" fill="url(#title-building)" />
          <rect x="1730" y="420" width="210" height="660" fill="#0c0a12" />
        </g>
        
        {/* Mid building windows */}
        <g className="mid-windows">
          {midWindows.map(win => (
            <rect
              key={`mwin-${win.id}`}
              x={win.x}
              y={win.y}
              width={win.width}
              height={win.height}
              fill="url(#title-window)"
              fillOpacity={win.baseOpacity}
              className={`twinkle-window twinkle-delay-${win.delay}`}
            />
          ))}
        </g>
        
        {/* THE EMBER ROOM - Central neon club */}
        <g className="ember-room" transform="translate(680, 520)">
          {/* Building */}
          <rect x="0" y="0" width="560" height="560" fill="#0a0810" />
          <rect x="-15" y="-20" width="590" height="30" fill="#12101a" />
          
          {/* Large club windows with warm glow */}
          <rect x="30" y="60" width="80" height="120" fill="url(#title-window)" fillOpacity="0.5" className="window-flicker" />
          <rect x="450" y="60" width="80" height="120" fill="url(#title-window)" fillOpacity="0.45" className="window-flicker-delay" />
          
          {/* Neon sign glow effects */}
          <ellipse cx="280" cy="130" rx="250" ry="100" fill="url(#title-neon-red)" className="neon-glow-pulse" filter="url(#title-neon-glow)" />
          <ellipse cx="280" cy="130" rx="180" ry="60" fill="url(#title-neon-amber)" className="neon-glow-pulse-delay" />
          
          {/* THE EMBER ROOM neon sign */}
          <g className="neon-text" filter="url(#title-glow)">
            <text x="280" y="100" textAnchor="middle" fill="#ff3030" fontSize="42" fontFamily="Georgia, serif" fontStyle="italic" className="neon-flicker-text">
              THE
            </text>
            <text x="280" y="160" textAnchor="middle" fill="#ff5030" fontSize="58" fontFamily="Georgia, serif" fontWeight="bold" letterSpacing="4" className="neon-flicker-text-delay">
              EMBER ROOM
            </text>
          </g>
          
          {/* JAZZ neon */}
          <g transform="translate(280, 230)">
            <ellipse cx="0" cy="0" rx="100" ry="45" fill="url(#title-neon-blue)" className="neon-glow-pulse" filter="url(#title-neon-glow)" />
            <text x="0" y="12" textAnchor="middle" fill="#5090ff" fontSize="38" fontFamily="Arial, sans-serif" fontWeight="bold" letterSpacing="8" className="neon-flicker-text">
              JAZZ
            </text>
          </g>
          
          {/* Live Tonight sign */}
          <g transform="translate(280, 310)">
            <text x="0" y="0" textAnchor="middle" fill="#d4a574" fontSize="22" fontFamily="Georgia, serif" className="neon-flicker-text-delay">
              ★ LIVE TONIGHT ★
            </text>
          </g>
          
          {/* Awning */}
          <path d="M140 380 L280 340 L420 380 L420 390 L280 360 L140 390 Z" fill="#1a1018" />
          
          {/* Door */}
          <rect x="200" y="420" width="160" height="140" fill="#060510" />
          <rect x="208" y="428" width="68" height="125" fill="#0c0a14" />
          <rect x="284" y="428" width="68" height="125" fill="#0c0a14" />
          <ellipse cx="268" cy="490" rx="6" ry="10" fill="#d4a574" fillOpacity="0.7" />
          <ellipse cx="292" cy="490" rx="6" ry="10" fill="#d4a574" fillOpacity="0.7" />
          
          {/* Light spilling from door */}
          <path d="M200 560 L180 600 L380 600 L360 560 Z" fill="#ffd090" fillOpacity="0.08" />
        </g>
        
        {/* Left foreground building with fire escape */}
        <g className="fg-left" transform="translate(0, 480)">
          <rect x="0" y="0" width="450" height="600" fill="#080610" />
          
          {/* Fire escape */}
          <g stroke="#1a1620" strokeWidth="2.5" fill="none">
            <rect x="100" y="70" width="100" height="70" />
            <rect x="100" y="180" width="100" height="70" />
            <rect x="100" y="290" width="100" height="70" />
            <line x1="150" y1="140" x2="150" y2="180" />
            <line x1="150" y1="250" x2="150" y2="290" />
            <line x1="100" y1="360" x2="80" y2="420" />
          </g>
          
          {/* Windows */}
          <rect x="60" y="50" width="35" height="50" fill="url(#title-window)" fillOpacity="0.6" className="twinkle-window twinkle-delay-1" />
          <rect x="240" y="50" width="35" height="50" fill="#1a1620" />
          <rect x="320" y="50" width="35" height="50" fill="url(#title-window)" fillOpacity="0.35" className="twinkle-window twinkle-delay-5" />
          <rect x="60" y="160" width="35" height="50" fill="#1a1620" />
          <rect x="240" y="160" width="35" height="50" fill="url(#title-window)" fillOpacity="0.7" className="twinkle-window twinkle-delay-3" />
          <rect x="320" y="160" width="35" height="50" fill="url(#title-window)" fillOpacity="0.25" className="twinkle-window twinkle-delay-9" />
          <rect x="60" y="270" width="35" height="50" fill="url(#title-window)" fillOpacity="0.45" className="twinkle-window twinkle-delay-7" />
          <rect x="240" y="270" width="35" height="50" fill="#1a1620" />
          <rect x="320" y="270" width="35" height="50" fill="url(#title-window)" fillOpacity="0.55" className="twinkle-window twinkle-delay-11" />
        </g>
        
        {/* Right foreground building */}
        <g className="fg-right" transform="translate(1420, 500)">
          <rect x="0" y="0" width="500" height="580" fill="#0a0812" />
          <rect x="-15" y="-18" width="530" height="25" fill="#12101a" />
          
          {/* Small neon sign - BAR */}
          <g transform="translate(250, 80)">
            <ellipse cx="0" cy="0" rx="60" ry="30" fill="url(#title-neon-red)" fillOpacity="0.4" className="neon-glow-pulse-delay" />
            <text x="0" y="8" textAnchor="middle" fill="#ff4040" fontSize="28" fontFamily="Arial" fontWeight="bold" className="neon-flicker-text">
              BAR
            </text>
          </g>
          
          {/* Windows */}
          <rect x="50" y="130" width="60" height="80" fill="url(#title-window)" fillOpacity="0.45" className="twinkle-window twinkle-delay-6" />
          <rect x="160" y="130" width="60" height="80" fill="#1a1620" />
          <rect x="270" y="130" width="60" height="80" fill="url(#title-window)" fillOpacity="0.35" className="twinkle-window twinkle-delay-2" />
          <rect x="380" y="130" width="60" height="80" fill="url(#title-window)" fillOpacity="0.55" className="twinkle-window twinkle-delay-10" />
          <rect x="50" y="260" width="60" height="80" fill="#1a1620" />
          <rect x="160" y="260" width="60" height="80" fill="url(#title-window)" fillOpacity="0.65" className="twinkle-window twinkle-delay-8" />
          <rect x="270" y="260" width="60" height="80" fill="url(#title-window)" fillOpacity="0.25" className="twinkle-window twinkle-delay-4" />
          <rect x="380" y="260" width="60" height="80" fill="#1a1620" />
        </g>
        
        {/* Street */}
        <rect x="0" y="940" width="1920" height="140" fill="url(#title-street)" />
        
        {/* Wet street reflections */}
        <g className="reflections" opacity="0.2">
          <ellipse cx="960" cy="1000" rx="350" ry="45" fill="#ff3030" className="reflection-pulse" />
          <ellipse cx="960" cy="1020" rx="250" ry="30" fill="#5090ff" className="reflection-pulse-delay" />
          <ellipse cx="180" cy="1010" rx="80" ry="30" fill="#ffd090" className="reflection-pulse" />
          <ellipse cx="1680" cy="1010" rx="80" ry="30" fill="#ffd090" className="reflection-pulse-delay" />
        </g>
        
        {/* Street lamps */}
        <g className="streetlamp-left" transform="translate(140, 620)">
          <rect x="10" y="0" width="10" height="320" fill="#1a1620" />
          <rect x="0" y="-15" width="30" height="50" fill="#12101a" rx="4" />
          <ellipse cx="15" cy="350" rx="50" ry="18" fill="#060510" />
          <ellipse cx="15" cy="60" rx="120" ry="220" fill="url(#title-streetlight)" className="lamp-glow-flicker" />
          <ellipse cx="15" cy="15" rx="10" ry="15" fill="#ffecd0" fillOpacity="0.9" />
        </g>
        
        <g className="streetlamp-right" transform="translate(1730, 650)">
          <rect x="10" y="0" width="10" height="290" fill="#1a1620" />
          <rect x="0" y="-15" width="30" height="50" fill="#12101a" rx="4" />
          <ellipse cx="15" cy="320" rx="50" ry="18" fill="#060510" />
          <ellipse cx="15" cy="60" rx="120" ry="200" fill="url(#title-streetlight)" className="lamp-glow-flicker-delay" />
          <ellipse cx="15" cy="15" rx="10" ry="15" fill="#ffecd0" fillOpacity="0.9" />
        </g>
        
        {/* Parked cars */}
        <g className="cars">
          {/* Classic 50s sedan - left */}
          <g transform="translate(40, 960)">
            <ellipse cx="130" cy="55" rx="140" ry="22" fill="#030308" />
            <path d="M15 55 Q15 8 65 3 L195 3 Q245 8 245 55 Z" fill="#080610" />
            <ellipse cx="55" cy="55" rx="28" ry="22" fill="#030308" />
            <ellipse cx="205" cy="55" rx="28" ry="22" fill="#030308" />
            <line x1="10" y1="48" x2="25" y2="48" stroke="#3a3040" strokeWidth="2.5" />
            <line x1="235" y1="48" x2="250" y2="48" stroke="#3a3040" strokeWidth="2.5" />
          </g>
          
          {/* Classic 50s sedan - right */}
          <g transform="translate(1540, 965)">
            <ellipse cx="110" cy="50" rx="125" ry="20" fill="#030308" />
            <path d="M12 50 Q12 8 55 3 L165 3 Q208 8 208 50 Z" fill="#060510" />
            <ellipse cx="45" cy="50" rx="25" ry="20" fill="#030308" />
            <ellipse cx="175" cy="50" rx="25" ry="20" fill="#030308" />
          </g>
        </g>
        
        {/* Detective silhouette */}
        <g className="detective" transform="translate(480, 800)">
          {/* Shadow */}
          <ellipse cx="45" cy="190" rx="70" ry="18" fill="#030308" fillOpacity="0.6" />
          
          {/* Body/coat */}
          <path d="M20 190 L32 95 Q38 75 45 75 Q52 75 58 95 L70 190 Z" fill="#080610" />
          <path d="M28 120 L10 190" stroke="#080610" strokeWidth="12" strokeLinecap="round" />
          <path d="M62 120 L80 190" stroke="#080610" strokeWidth="12" strokeLinecap="round" />
          
          {/* Coat lapels */}
          <path d="M35 95 L45 110 L55 95" stroke="#0a0812" strokeWidth="3" fill="none" />
          
          {/* Head */}
          <ellipse cx="45" cy="60" rx="18" ry="22" fill="#080610" />
          
          {/* Fedora */}
          <ellipse cx="45" cy="44" rx="28" ry="10" fill="#060510" />
          <path d="M20 44 Q20 32 45 30 Q70 32 70 44" fill="#060510" />
          <rect x="22" y="34" width="46" height="14" fill="#060510" rx="3" />
          
          {/* Cigarette */}
          <line x1="62" y1="72" x2="75" y2="70" stroke="#c0b0a0" strokeWidth="2" />
          
          {/* Cigarette glow */}
          <circle cx="76" cy="70" r="4" fill="#ff5030" className="cigarette-pulse" />
          <circle cx="76" cy="70" r="8" fill="#ff3020" fillOpacity="0.3" className="cigarette-pulse" />
          
          {/* Smoke wisps */}
          <path d="M78 68 Q82 60 80 50 Q85 40 82 30" stroke="#8090a0" strokeWidth="1.5" fill="none" strokeOpacity="0.15" className="smoke-rise" />
          <path d="M80 66 Q86 55 82 45 Q90 35 85 25" stroke="#8090a0" strokeWidth="1" fill="none" strokeOpacity="0.1" className="smoke-rise-delay" />
        </g>
        
        {/* Rain */}
        <g className="rain">
          {raindrops.map(drop => (
            <line
              key={`rain-${drop.id}`}
              x1={drop.x}
              y1={-50}
              x2={drop.x - 25}
              y2={drop.length}
              stroke="#8090a0"
              strokeWidth="1"
              strokeOpacity={drop.opacity}
              className="raindrop-fall"
              style={{
                animationDelay: `${drop.delay}s`,
                animationDuration: `${drop.duration}s`,
              }}
            />
          ))}
        </g>
        
        {/* Street fog */}
        <g className="fog">
          <ellipse cx="350" cy="970" rx="350" ry="70" fill="#1a1520" fillOpacity="0.3" className="fog-drift" />
          <ellipse cx="1100" cy="985" rx="450" ry="60" fill="#1a1520" fillOpacity="0.25" className="fog-drift-delay" />
          <ellipse cx="1600" cy="975" rx="300" ry="55" fill="#1a1520" fillOpacity="0.2" className="fog-drift" />
        </g>
        
        {/* Heavy vignette for drama */}
        <rect x="0" y="0" width="1920" height="1080" fill="url(#title-vignette)" />
        
        {/* Film grain overlay effect */}
        <rect x="0" y="0" width="1920" height="1080" fill="#000000" fillOpacity="0.05" className="grain-overlay" />
      </svg>
    </div>
  );
}
