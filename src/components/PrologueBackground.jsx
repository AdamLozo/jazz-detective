import { useEffect, useState } from 'react';

/**
 * PrologueBackground - Animated NYC skyline for the prologue
 * Features: Building silhouettes, drifting smoke, flickering windows, warm uneasy night
 */
export default function PrologueBackground() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate random windows for buildings
  const generateWindows = (buildingId, count, xStart, xEnd, yStart, yEnd) => {
    const windows = [];
    for (let i = 0; i < count; i++) {
      const x = xStart + Math.random() * (xEnd - xStart);
      const y = yStart + Math.random() * (yEnd - yStart);
      const lit = Math.random() > 0.6;
      const flickerDelay = Math.random() * 10;
      windows.push(
        <rect
          key={`${buildingId}-win-${i}`}
          x={x}
          y={y}
          width={3 + Math.random() * 2}
          height={4 + Math.random() * 3}
          fill={lit ? `rgba(255, ${180 + Math.random() * 40}, ${100 + Math.random() * 50}, ${0.4 + Math.random() * 0.4})` : 'rgba(20, 15, 10, 0.8)'}
          className={lit ? 'window-flicker-slow' : ''}
          style={{ animationDelay: `${flickerDelay}s` }}
        />
      );
    }
    return windows;
  };

  return (
    <div className={`fixed inset-0 z-0 overflow-hidden transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      {/* Base warm night sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0f0a] via-[#2d1810] to-[#0d0805]" />
      
      {/* Distant city glow on horizon */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#3d1a0a]/30 via-[#2a1005]/20 to-transparent" />
      
      {/* Warm haze layer */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#4a2010]/20 via-transparent to-[#1a0a05]/30" />

      {/* SVG Skyline */}
      <svg
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Smoke gradient */}
          <linearGradient id="smokeGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="rgba(60, 40, 30, 0.4)" />
            <stop offset="50%" stopColor="rgba(80, 60, 45, 0.2)" />
            <stop offset="100%" stopColor="rgba(100, 80, 60, 0)" />
          </linearGradient>
          
          {/* Building shadow gradient */}
          <linearGradient id="buildingGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1a1210" />
            <stop offset="100%" stopColor="#0d0a08" />
          </linearGradient>
          
          {/* Moon glow */}
          <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255, 240, 200, 0.15)" />
            <stop offset="50%" stopColor="rgba(255, 220, 180, 0.05)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          
          {/* Water tower gradient */}
          <linearGradient id="waterTowerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#151010" />
            <stop offset="50%" stopColor="#1a1412" />
            <stop offset="100%" stopColor="#0f0a08" />
          </linearGradient>
        </defs>

        {/* Hazy moon */}
        <circle cx="1600" cy="150" r="80" fill="url(#moonGlow)" className="moon-pulse" />
        <circle cx="1600" cy="150" r="25" fill="rgba(255, 245, 220, 0.08)" />
        
        {/* Distant background buildings - barely visible */}
        <g className="distant-buildings" opacity="0.3">
          <rect x="100" y="650" width="80" height="430" fill="#1a1510" />
          <rect x="200" y="600" width="100" height="480" fill="#181210" />
          <rect x="350" y="680" width="60" height="400" fill="#1c1612" />
          <rect x="500" y="550" width="120" height="530" fill="#191310" />
          <rect x="700" y="620" width="90" height="460" fill="#1b1410" />
          <rect x="900" y="580" width="110" height="500" fill="#181110" />
          <rect x="1100" y="640" width="70" height="440" fill="#1a1310" />
          <rect x="1250" y="560" width="130" height="520" fill="#171010" />
          <rect x="1450" y="600" width="85" height="480" fill="#191210" />
          <rect x="1600" y="650" width="100" height="430" fill="#1c1512" />
          <rect x="1750" y="590" width="120" height="490" fill="#181210" />
        </g>

        {/* Mid-ground buildings */}
        <g className="mid-buildings">
          {/* Empire State-like building */}
          <path
            d="M850 380 L850 750 L880 750 L880 400 L895 400 L895 350 L905 350 L905 320 L910 320 L910 280 L915 280 L915 750 L945 750 L945 380 Z"
            fill="url(#buildingGradient)"
          />
          {generateWindows('empire', 40, 852, 942, 400, 740)}
          
          {/* Chrysler-like spire */}
          <path
            d="M1150 420 L1150 750 L1180 750 L1180 440 L1190 440 L1190 400 L1195 400 L1195 370 L1200 370 L1200 340 L1205 320 L1210 340 L1210 370 L1215 370 L1215 400 L1220 400 L1220 440 L1230 440 L1230 750 L1260 750 L1260 420 Z"
            fill="url(#buildingGradient)"
          />
          {generateWindows('chrysler', 35, 1152, 1258, 450, 740)}
          
          {/* Various office buildings */}
          <rect x="300" y="500" width="100" height="580" fill="url(#buildingGradient)" />
          {generateWindows('bldg1', 50, 305, 395, 510, 750)}
          
          <rect x="450" y="450" width="120" height="630" fill="url(#buildingGradient)" />
          {generateWindows('bldg2', 60, 455, 565, 460, 750)}
          
          <rect x="620" y="520" width="90" height="560" fill="url(#buildingGradient)" />
          {generateWindows('bldg3', 40, 625, 705, 530, 750)}
          
          <rect x="1000" y="480" width="110" height="600" fill="url(#buildingGradient)" />
          {generateWindows('bldg4', 55, 1005, 1105, 490, 750)}
          
          <rect x="1350" y="500" width="95" height="580" fill="url(#buildingGradient)" />
          {generateWindows('bldg5', 45, 1355, 1440, 510, 750)}
          
          <rect x="1500" y="460" width="130" height="620" fill="url(#buildingGradient)" />
          {generateWindows('bldg6', 65, 1505, 1625, 470, 750)}
          
          <rect x="1700" y="510" width="100" height="570" fill="url(#buildingGradient)" />
          {generateWindows('bldg7', 50, 1705, 1795, 520, 750)}
        </g>

        {/* Foreground buildings - darkest */}
        <g className="foreground-buildings">
          <rect x="0" y="650" width="150" height="430" fill="#0a0705" />
          <rect x="180" y="600" width="80" height="480" fill="#0c0908" />
          <rect x="1780" y="620" width="140" height="460" fill="#0b0806" />
          
          {/* Water towers */}
          <g transform="translate(350, 480)">
            <rect x="0" y="20" width="30" height="50" fill="url(#waterTowerGradient)" />
            <ellipse cx="15" cy="20" rx="18" ry="8" fill="#181412" />
            <rect x="10" y="70" width="3" height="30" fill="#0f0c0a" />
            <rect x="17" y="70" width="3" height="30" fill="#0f0c0a" />
          </g>
          
          <g transform="translate(1100, 460)">
            <rect x="0" y="20" width="35" height="55" fill="url(#waterTowerGradient)" />
            <ellipse cx="17" cy="20" rx="20" ry="9" fill="#181412" />
            <rect x="12" y="75" width="3" height="35" fill="#0f0c0a" />
            <rect x="20" y="75" width="3" height="35" fill="#0f0c0a" />
          </g>
          
          <g transform="translate(750, 500)">
            <rect x="0" y="15" width="25" height="40" fill="url(#waterTowerGradient)" />
            <ellipse cx="12" cy="15" rx="15" ry="6" fill="#181412" />
            <rect x="8" y="55" width="2" height="25" fill="#0f0c0a" />
            <rect x="14" y="55" width="2" height="25" fill="#0f0c0a" />
          </g>
        </g>

        {/* Smoke/haze layers - animated */}
        <g className="smoke-layers">
          {/* Bottom smoke layer - thickest */}
          <ellipse
            cx="400" cy="850"
            rx="500" ry="150"
            fill="url(#smokeGradient)"
            className="smoke-drift-1"
            opacity="0.5"
          />
          <ellipse
            cx="1200" cy="880"
            rx="600" ry="180"
            fill="url(#smokeGradient)"
            className="smoke-drift-2"
            opacity="0.4"
          />
          <ellipse
            cx="1700" cy="820"
            rx="400" ry="120"
            fill="url(#smokeGradient)"
            className="smoke-drift-3"
            opacity="0.45"
          />
          
          {/* Mid smoke wisps */}
          <ellipse
            cx="300" cy="650"
            rx="200" ry="80"
            fill="rgba(80, 60, 45, 0.15)"
            className="smoke-drift-4"
          />
          <ellipse
            cx="900" cy="600"
            rx="250" ry="100"
            fill="rgba(70, 50, 35, 0.12)"
            className="smoke-drift-5"
          />
          <ellipse
            cx="1500" cy="680"
            rx="180" ry="70"
            fill="rgba(90, 65, 45, 0.14)"
            className="smoke-drift-6"
          />
          
          {/* High thin wisps */}
          <ellipse
            cx="600" cy="400"
            rx="300" ry="60"
            fill="rgba(100, 80, 60, 0.08)"
            className="smoke-drift-high-1"
          />
          <ellipse
            cx="1300" cy="350"
            rx="350" ry="70"
            fill="rgba(90, 70, 50, 0.06)"
            className="smoke-drift-high-2"
          />
        </g>

        {/* Airplane crossing the sky */}
        <g className="airplane-flight">
          {/* Plane silhouette - small propeller aircraft for 1965 */}
          <g className="plane-body">
            {/* Fuselage */}
            <ellipse cx="0" cy="0" rx="12" ry="3" fill="#0a0806" />
            {/* Wings */}
            <path d="M-4 0 L-2 -12 L2 -12 L4 0 L2 12 L-2 12 Z" fill="#0c0a08" />
            {/* Tail */}
            <path d="M10 0 L14 -5 L14 5 Z" fill="#0a0806" />
            <path d="M11 0 L14 0 L14 -3 L12 0 Z" fill="#080604" />
            {/* Cockpit highlight */}
            <ellipse cx="-6" cy="0" rx="3" ry="2" fill="rgba(40, 35, 30, 0.8)" />
            
            {/* Navigation lights */}
            {/* Red light - port/left wing */}
            <circle cx="-2" cy="-11" r="1.5" fill="#ff3030" className="nav-light-red" />
            <circle cx="-2" cy="-11" r="4" fill="rgba(255, 48, 48, 0.3)" className="nav-light-red-glow" />
            
            {/* Green light - starboard/right wing */}
            <circle cx="-2" cy="11" r="1.5" fill="#30ff30" className="nav-light-green" />
            <circle cx="-2" cy="11" r="4" fill="rgba(48, 255, 48, 0.3)" className="nav-light-green-glow" />
            
            {/* White tail light */}
            <circle cx="14" cy="0" r="1" fill="#ffffff" className="nav-light-white" />
            <circle cx="14" cy="0" r="3" fill="rgba(255, 255, 255, 0.25)" className="nav-light-white-glow" />
            
            {/* Anti-collision beacon - red strobe on top */}
            <circle cx="0" cy="-2" r="1" fill="#ff2020" className="beacon-strobe" />
            <circle cx="0" cy="-2" r="3" fill="rgba(255, 32, 32, 0.2)" className="beacon-strobe-glow" />
          </g>
        </g>

        {/* Rising smoke plumes from chimneys */}
        <g className="chimney-smoke">
          <path
            d="M380 480 Q390 450 375 420 Q360 390 380 360 Q400 330 385 300"
            stroke="rgba(120, 100, 80, 0.2)"
            strokeWidth="15"
            fill="none"
            className="smoke-rise-plume-1"
          />
          <path
            d="M1120 440 Q1135 410 1115 380 Q1095 350 1120 320 Q1145 290 1125 260"
            stroke="rgba(110, 90, 70, 0.18)"
            strokeWidth="12"
            fill="none"
            className="smoke-rise-plume-2"
          />
          <path
            d="M770 485 Q780 460 768 435 Q756 410 770 385 Q784 360 772 335"
            stroke="rgba(100, 85, 65, 0.15)"
            strokeWidth="10"
            fill="none"
            className="smoke-rise-plume-3"
          />
        </g>
      </svg>

      {/* Overlay heat shimmer effect */}
      <div className="absolute inset-0 heat-shimmer pointer-events-none" />
      
      {/* Film grain */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none grain-overlay-prologue" />
      
      {/* Warm color overlay for uneasy feeling */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#4a1a08]/10 via-transparent to-[#2a0a05]/15 pointer-events-none" />
      
      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(10, 5, 3, 0.4) 70%, rgba(5, 2, 1, 0.7) 100%)'
      }} />

      <style>{`
        /* Slow window flicker */
        .window-flicker-slow {
          animation: windowFlickerSlow 8s ease-in-out infinite;
        }
        
        @keyframes windowFlickerSlow {
          0%, 100% { opacity: 1; }
          20% { opacity: 0.9; }
          40% { opacity: 1; }
          60% { opacity: 0.7; }
          65% { opacity: 1; }
          80% { opacity: 0.85; }
        }
        
        /* Moon subtle pulse */
        .moon-pulse {
          animation: moonPulse 10s ease-in-out infinite;
        }
        
        @keyframes moonPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.02); }
        }
        
        /* Smoke drift animations - horizontal movement */
        .smoke-drift-1 {
          animation: smokeDrift1 25s ease-in-out infinite;
        }
        
        .smoke-drift-2 {
          animation: smokeDrift2 30s ease-in-out infinite;
        }
        
        .smoke-drift-3 {
          animation: smokeDrift3 22s ease-in-out infinite;
        }
        
        .smoke-drift-4 {
          animation: smokeDrift4 28s ease-in-out infinite;
        }
        
        .smoke-drift-5 {
          animation: smokeDrift5 32s ease-in-out infinite;
        }
        
        .smoke-drift-6 {
          animation: smokeDrift6 26s ease-in-out infinite;
        }
        
        .smoke-drift-high-1 {
          animation: smokeDriftHigh1 35s ease-in-out infinite;
        }
        
        .smoke-drift-high-2 {
          animation: smokeDriftHigh2 40s ease-in-out infinite;
        }
        
        @keyframes smokeDrift1 {
          0%, 100% { transform: translateX(0) scaleX(1); opacity: 0.5; }
          25% { transform: translateX(80px) scaleX(1.1); opacity: 0.4; }
          50% { transform: translateX(40px) scaleX(0.95); opacity: 0.55; }
          75% { transform: translateX(100px) scaleX(1.05); opacity: 0.45; }
        }
        
        @keyframes smokeDrift2 {
          0%, 100% { transform: translateX(0) scaleX(1); opacity: 0.4; }
          33% { transform: translateX(-60px) scaleX(1.08); opacity: 0.35; }
          66% { transform: translateX(-120px) scaleX(0.92); opacity: 0.45; }
        }
        
        @keyframes smokeDrift3 {
          0%, 100% { transform: translateX(0) scaleX(1); opacity: 0.45; }
          50% { transform: translateX(70px) scaleX(1.12); opacity: 0.38; }
        }
        
        @keyframes smokeDrift4 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.15; }
          33% { transform: translate(50px, -20px) scale(1.1); opacity: 0.12; }
          66% { transform: translate(100px, -10px) scale(0.95); opacity: 0.18; }
        }
        
        @keyframes smokeDrift5 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.12; }
          50% { transform: translate(-80px, -30px) scale(1.15); opacity: 0.1; }
        }
        
        @keyframes smokeDrift6 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.14; }
          40% { transform: translate(60px, -15px) scale(1.08); opacity: 0.11; }
          80% { transform: translate(30px, -25px) scale(0.95); opacity: 0.16; }
        }
        
        @keyframes smokeDriftHigh1 {
          0%, 100% { transform: translate(0, 0) scaleX(1); opacity: 0.08; }
          50% { transform: translate(150px, -20px) scaleX(1.2); opacity: 0.05; }
        }
        
        @keyframes smokeDriftHigh2 {
          0%, 100% { transform: translate(0, 0) scaleX(1); opacity: 0.06; }
          50% { transform: translate(-100px, -15px) scaleX(1.15); opacity: 0.04; }
        }
        
        /* Rising smoke plumes */
        .smoke-rise-plume-1 {
          animation: smokeRisePlume 8s ease-out infinite;
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
        }
        
        .smoke-rise-plume-2 {
          animation: smokeRisePlume 10s ease-out infinite 2s;
          stroke-dasharray: 180;
          stroke-dashoffset: 180;
        }
        
        .smoke-rise-plume-3 {
          animation: smokeRisePlume 7s ease-out infinite 4s;
          stroke-dasharray: 150;
          stroke-dashoffset: 150;
        }
        
        @keyframes smokeRisePlume {
          0% { 
            stroke-dashoffset: 200; 
            opacity: 0;
          }
          10% {
            opacity: 0.2;
          }
          50% { 
            stroke-dashoffset: 0;
            opacity: 0.15;
          }
          100% { 
            stroke-dashoffset: -200;
            opacity: 0;
          }
        }
        
        /* Heat shimmer effect */
        .heat-shimmer {
          background: linear-gradient(
            0deg,
            transparent 0%,
            rgba(255, 200, 150, 0.02) 50%,
            transparent 100%
          );
          background-size: 100% 4px;
          animation: heatShimmer 3s linear infinite;
        }
        
        @keyframes heatShimmer {
          0% { background-position: 0 0; }
          100% { background-position: 0 20px; }
        }
        
        /* Film grain for prologue */
        .grain-overlay-prologue {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          animation: grainShiftPrologue 0.4s steps(1) infinite;
        }
        
        @keyframes grainShiftPrologue {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-1px, 1px); }
          50% { transform: translate(1px, -1px); }
          75% { transform: translate(-1px, -1px); }
        }
        
        /* Airplane flight animation */
        .airplane-flight {
          animation: planeFlightPath 45s linear infinite;
        }
        
        @keyframes planeFlightPath {
          0% {
            transform: translate(-100px, 180px) scale(0.6);
            opacity: 0;
          }
          3% {
            opacity: 0.9;
          }
          50% {
            transform: translate(960px, 120px) scale(0.8);
            opacity: 0.9;
          }
          97% {
            opacity: 0.9;
          }
          100% {
            transform: translate(2020px, 200px) scale(0.5);
            opacity: 0;
          }
        }
        
        /* Navigation light blinking */
        .nav-light-red,
        .nav-light-red-glow {
          animation: navLightBlink 2s ease-in-out infinite;
        }
        
        .nav-light-green,
        .nav-light-green-glow {
          animation: navLightBlink 2s ease-in-out infinite 0.5s;
        }
        
        .nav-light-white,
        .nav-light-white-glow {
          animation: navLightBlink 1.5s ease-in-out infinite 0.25s;
        }
        
        @keyframes navLightBlink {
          0%, 100% { opacity: 1; }
          40% { opacity: 1; }
          50% { opacity: 0.3; }
          60% { opacity: 1; }
        }
        
        /* Anti-collision beacon strobe */
        .beacon-strobe,
        .beacon-strobe-glow {
          animation: beaconStrobe 1s ease-in-out infinite;
        }
        
        @keyframes beaconStrobe {
          0%, 100% { opacity: 0.2; }
          45% { opacity: 0.2; }
          50% { opacity: 1; }
          55% { opacity: 0.2; }
        }
        
        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .window-flicker-slow,
          .moon-pulse,
          .smoke-drift-1,
          .smoke-drift-2,
          .smoke-drift-3,
          .smoke-drift-4,
          .smoke-drift-5,
          .smoke-drift-6,
          .smoke-drift-high-1,
          .smoke-drift-high-2,
          .smoke-rise-plume-1,
          .smoke-rise-plume-2,
          .smoke-rise-plume-3,
          .heat-shimmer,
          .grain-overlay-prologue,
          .airplane-flight,
          .nav-light-red,
          .nav-light-red-glow,
          .nav-light-green,
          .nav-light-green-glow,
          .nav-light-white,
          .nav-light-white-glow,
          .beacon-strobe,
          .beacon-strobe-glow {
            animation: none !important;
          }
          
          .airplane-flight {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
