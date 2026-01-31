/**
 * AtmosphereEffects - Visual atmosphere effects for noir immersion
 * 
 * Features:
 * - Rain effect (configurable intensity)
 * - Smoke/fog particles
 * - Cigarette smoke wisps
 * - Flickering lights (neon, lamp)
 * - Dust particles in light beams
 * - Film grain overlay
 * - Vignette effect
 * - Neon glow
 * - Lightning flashes
 * 
 * PERFORMANCE NOTE: All effects disabled on mobile for 60fps
 */
import { useState, useEffect, useMemo, useCallback } from 'react';

// Mobile detection hook - disable effects for performance
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
};

/**
 * RainEffect - Animated rain overlay
 * DISABLED ON MOBILE for performance
 */
export function RainEffect({ 
  intensity = 'medium', // 'light', 'medium', 'heavy'
  windAngle = 15, // degrees from vertical
  color = 'rgba(174, 194, 224, 0.5)',
}) {
  const isMobile = useIsMobile();
  
  // Don't render anything on mobile
  if (isMobile) return null;
  
  const config = (() => {
    switch (intensity) {
      case 'light':
        return { count: 25, speed: 0.8, opacity: 0.3 }; // Reduced from 40
      case 'heavy':
        return { count: 60, speed: 1.3, opacity: 0.6 }; // Reduced from 150
      default: // medium
        return { count: 40, speed: 1, opacity: 0.4 }; // Reduced from 80
    }
  })();

  const raindrops = Array.from({ length: config.count }, (_, i) => ({
    id: i,
    left: Math.random() * 120 - 10,
    delay: Math.random() * 2,
    duration: (0.5 + Math.random() * 0.5) / config.speed,
    height: 15 + Math.random() * 25,
    opacity: config.opacity * (0.5 + Math.random() * 0.5),
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {raindrops.map(drop => (
        <div
          key={drop.id}
          className="rain-drop"
          style={{
            left: `${drop.left}%`,
            height: `${drop.height}px`,
            opacity: drop.opacity,
            animationDelay: `${drop.delay}s`,
            animationDuration: `${drop.duration}s`,
            transform: `rotate(${windAngle}deg)`,
            background: `linear-gradient(to bottom, transparent, ${color})`,
          }}
        />
      ))}
      
      <style>{`
        .rain-drop {
          position: absolute;
          top: -30px;
          width: 1px;
          animation: rainFall linear infinite;
          will-change: transform;
        }
        
        @keyframes rainFall {
          0% {
            transform: translateY(-100%) rotate(${windAngle}deg);
          }
          100% {
            transform: translateY(calc(100vh + 100px)) rotate(${windAngle}deg);
          }
        }
      `}</style>
    </div>
  );
}

/**
 * SmokeEffect - Drifting smoke/fog particles
 * DISABLED ON MOBILE for performance
 */
export function SmokeEffect({
  density = 'medium', // 'light', 'medium', 'heavy'
  direction = 'up', // 'up', 'left', 'right'
  color = 'rgba(255, 255, 255, 0.03)',
}) {
  const isMobile = useIsMobile();
  
  // Don't render anything on mobile
  if (isMobile) return null;
  
  const count = (() => {
    switch (density) {
      case 'light': return 3;  // Reduced from 5
      case 'heavy': return 8;  // Reduced from 20
      default: return 5;       // Reduced from 10
    }
  })();

  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: 100 + Math.random() * 200,
    x: Math.random() * 100,
    y: 50 + Math.random() * 60,
    delay: Math.random() * 20,
    duration: 15 + Math.random() * 20,
    opacity: 0.02 + Math.random() * 0.04,
  }));

  const getAnimation = () => {
    switch (direction) {
      case 'left': return 'smokeDriftLeft';
      case 'right': return 'smokeDriftRight';
      default: return 'smokeDriftUp';
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {particles.map(p => (
        <div
          key={p.id}
          className="smoke-particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            animationName: getAnimation(),
            background: `radial-gradient(ellipse at center, ${color} 0%, transparent 70%)`,
          }}
        />
      ))}
      
      <style>{`
        .smoke-particle {
          position: absolute;
          border-radius: 50%;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          filter: blur(20px);
          will-change: transform, opacity;
        }
        
        @keyframes smokeDriftUp {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: var(--opacity, 0.03); }
          50% { transform: translate(30px, -60px) scale(1.3); opacity: calc(var(--opacity, 0.03) * 1.5); }
        }
        
        @keyframes smokeDriftLeft {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-80px, -30px) scale(1.2); }
        }
        
        @keyframes smokeDriftRight {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(80px, -30px) scale(1.2); }
        }
      `}</style>
    </div>
  );
}

/**
 * CigaretteSmoke - Localized smoke wisps
 * DISABLED ON MOBILE for performance
 */
export function CigaretteSmoke({
  x = 50,
  y = 50,
  opacity = 0.15,
}) {
  const isMobile = useIsMobile();
  
  // Don't render anything on mobile
  if (isMobile) return null;
  
  const wisps = Array.from({ length: 3 }, (_, i) => ({ // Reduced from 5
    id: i,
    delay: i * 0.8,
    duration: 4 + Math.random() * 2,
    drift: -20 + Math.random() * 40,
  }));

  return (
    <div 
      className="fixed pointer-events-none z-20"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      {wisps.map(wisp => (
        <div
          key={wisp.id}
          className="cigarette-wisp"
          style={{
            animationDelay: `${wisp.delay}s`,
            animationDuration: `${wisp.duration}s`,
            '--drift': `${wisp.drift}px`,
            opacity,
          }}
        />
      ))}
      
      <style>{`
        .cigarette-wisp {
          position: absolute;
          width: 8px;
          height: 40px;
          background: linear-gradient(to top, rgba(255,255,255,0.3), transparent);
          border-radius: 50%;
          filter: blur(4px);
          animation: wispRise ease-out infinite;
          transform-origin: bottom center;
          will-change: transform, opacity;
        }
        
        @keyframes wispRise {
          0% { 
            transform: translateY(0) translateX(0) scaleX(1) rotate(0deg);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-60px) translateX(var(--drift, 0px)) scaleX(2) rotate(10deg);
            opacity: 0.2;
          }
          100% { 
            transform: translateY(-120px) translateX(calc(var(--drift, 0px) * 2)) scaleX(3) rotate(20deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

/**
 * FlickeringLight - Neon sign or lamp flicker
 * DISABLED ON MOBILE for performance
 */
export function FlickeringLight({
  type = 'neon', // 'neon', 'lamp', 'candle'
  color = 'rgba(212, 165, 116, 0.3)',
  intensity = 'medium', // 'subtle', 'medium', 'dramatic'
  position = { x: 50, y: 20 },
  size = 200,
}) {
  const isMobile = useIsMobile();
  const [flickerClass, setFlickerClass] = useState('');

  useEffect(() => {
    if (isMobile) return; // Skip on mobile
    
    if (type === 'neon' && intensity !== 'subtle') {
      // Random flicker bursts for neon
      const flickerInterval = setInterval(() => {
        if (Math.random() > 0.85) {
          setFlickerClass('neon-flicker-burst');
          setTimeout(() => setFlickerClass(''), 200);
        }
      }, 2000);
      
      return () => clearInterval(flickerInterval);
    }
  }, [type, intensity, isMobile]);

  // Don't render on mobile
  if (isMobile) return null;

  const getFlickerAnimation = () => {
    switch (type) {
      case 'neon':
        return intensity === 'dramatic' ? 'neonFlickerDramatic' : 'neonFlicker';
      case 'lamp':
        return 'lampFlicker';
      case 'candle':
        return 'candleFlicker';
      default:
        return 'neonFlicker';
    }
  };

  return (
    <div
      className={`fixed pointer-events-none z-15 ${flickerClass}`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        width: `${size}px`,
        height: `${size}px`,
        transform: 'translate(-50%, -50%)',
        background: `radial-gradient(ellipse at center, ${color} 0%, transparent 70%)`,
        animation: `${getFlickerAnimation()} ${type === 'candle' ? '0.5s' : '3s'} ease-in-out infinite`,
        willChange: 'opacity',
      }}
    >
      <style>{`
        @keyframes neonFlicker {
          0%, 100% { opacity: 1; }
          92% { opacity: 1; }
          93% { opacity: 0.8; }
          94% { opacity: 1; }
          96% { opacity: 0.9; }
          97% { opacity: 1; }
        }
        
        @keyframes neonFlickerDramatic {
          0%, 18%, 22%, 25%, 53%, 57%, 100% { opacity: 1; }
          20%, 24%, 55% { opacity: 0.4; }
        }
        
        @keyframes lampFlicker {
          0%, 100% { opacity: 1; filter: brightness(1); }
          50% { opacity: 0.95; filter: brightness(0.98); }
          75% { opacity: 0.98; filter: brightness(1.02); }
        }
        
        @keyframes candleFlicker {
          0%, 100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          25% { opacity: 0.9; transform: translate(-50%, -50%) scale(0.98); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.02); }
          75% { opacity: 0.95; transform: translate(-50%, -50%) scale(0.99); }
        }
        
        .neon-flicker-burst {
          animation: neonBurst 0.2s ease-in-out !important;
        }
        
        @keyframes neonBurst {
          0%, 100% { opacity: 1; }
          25% { opacity: 0.2; }
          50% { opacity: 0.8; }
          75% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}

/**
 * DustParticles - Floating dust in light beams
 * DISABLED ON MOBILE for performance
 */
export function DustParticles({
  count = 30,
  lightSource = { x: 80, y: 20 }, // percentage position of light
  beamWidth = 200,
  beamAngle = 45,
}) {
  const isMobile = useIsMobile();
  
  // Don't render anything on mobile
  if (isMobile) return null;
  
  const reducedCount = Math.min(count, 15); // Cap at 15 particles
  
  const particles = Array.from({ length: reducedCount }, (_, i) => ({
    id: i,
    size: 1 + Math.random() * 3,
    x: lightSource.x - beamWidth/4 + Math.random() * beamWidth/2,
    y: lightSource.y + Math.random() * 60,
    delay: Math.random() * 10,
    duration: 8 + Math.random() * 12,
    drift: -20 + Math.random() * 40,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-15 overflow-hidden">
      {particles.map(p => (
        <div
          key={p.id}
          className="dust-particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            '--drift': `${p.drift}px`,
          }}
        />
      ))}
      
      <style>{`
        .dust-particle {
          position: absolute;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 50%;
          animation: dustFloat ease-in-out infinite;
          will-change: transform, opacity;
        }
        
        @keyframes dustFloat {
          0%, 100% { 
            transform: translate(0, 0); 
            opacity: 0.2;
          }
          25% { 
            transform: translate(var(--drift, 0), 20px); 
            opacity: 0.5;
          }
          50% { 
            transform: translate(calc(var(--drift, 0) * -0.5), 10px); 
            opacity: 0.3;
          }
          75% { 
            transform: translate(calc(var(--drift, 0) * 0.3), -10px); 
            opacity: 0.4;
          }
        }
      `}</style>
    </div>
  );
}

/**
 * FilmGrain - Subtle film grain overlay
 * DISABLED ON MOBILE - SVG filters are very expensive
 */
export function FilmGrain({ 
  opacity = 0.05,
  animated = true,
}) {
  const isMobile = useIsMobile();
  
  // Don't render on mobile - SVG filters kill performance
  if (isMobile) return null;
  
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-50"
      style={{ 
        opacity,
        mixBlendMode: 'overlay',
      }}
    >
      <svg width="100%" height="100%" className={animated ? 'grain-animated' : ''}>
        <filter id="grain">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.8" 
            numOctaves="2" 
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
      
      <style>{`
        .grain-animated {
          animation: grainShift 0.8s steps(5) infinite;
        }
        
        @keyframes grainShift {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-1%, -1%); }
          50% { transform: translate(1%, 1%); }
          75% { transform: translate(-1%, 1%); }
        }
      `}</style>
    </div>
  );
}

/**
 * Vignette - Edge darkening effect
 */
export function Vignette({ 
  intensity = 'medium', // 'light', 'medium', 'heavy', 'dramatic'
  color = 'black',
}) {
  const getOpacity = () => {
    switch (intensity) {
      case 'light': return 0.15;
      case 'heavy': return 0.35;
      case 'dramatic': return 0.5;
      default: return 0.25;
    }
  };

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-40"
      style={{
        background: `radial-gradient(ellipse at center, transparent 40%, ${color} 100%)`,
        opacity: getOpacity(),
      }}
    />
  );
}

/**
 * NeonGlow - Colored neon glow effect
 * DISABLED ON MOBILE for performance (blur filter)
 */
export function NeonGlow({
  color = '#d4a574',
  position = { x: 50, y: 30 },
  size = 400,
  flicker = true,
}) {
  const isMobile = useIsMobile();
  
  // Don't render on mobile - blur filter is expensive
  if (isMobile) return null;
  
  return (
    <div
      className="fixed pointer-events-none z-5"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        width: `${size}px`,
        height: `${size}px`,
        transform: 'translate(-50%, -50%)',
        background: `radial-gradient(ellipse at center, ${color}33 0%, ${color}11 30%, transparent 70%)`,
        animation: flicker ? 'neonGlow 4s ease-in-out infinite' : 'none',
        filter: 'blur(20px)',
        willChange: 'opacity, transform',
      }}
    >
      <style>{`
        @keyframes neonGlow {
          0%, 100% { opacity: 0.8; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.05); }
        }
      `}</style>
    </div>
  );
}

/**
 * LightningFlash - Random lightning effect for stormy scenes
 * DISABLED ON MOBILE for performance
 */
export function LightningFlash({ frequency = 'rare' }) {
  const isMobile = useIsMobile();
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    if (isMobile) return; // Skip on mobile
    
    const interval = frequency === 'frequent' ? 8000 : frequency === 'occasional' ? 15000 : 25000;
    const variance = interval * 0.5;

    const scheduleFlash = () => {
      const delay = interval + (Math.random() - 0.5) * variance;
      
      const timer = setTimeout(() => {
        if (Math.random() > 0.3) { // 70% chance of flash
          setIsFlashing(true);
          
          // Double flash effect
          setTimeout(() => setIsFlashing(false), 100);
          setTimeout(() => setIsFlashing(true), 150);
          setTimeout(() => setIsFlashing(false), 200);
        }
        scheduleFlash();
      }, delay);

      return timer;
    };

    const timer = scheduleFlash();
    return () => clearTimeout(timer);
  }, [frequency, isMobile]);

  // Don't render on mobile
  if (isMobile || !isFlashing) return null;

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-60 bg-white/20"
      style={{ animation: 'lightningFlash 0.1s ease-out' }}
    >
      <style>{`
        @keyframes lightningFlash {
          0% { opacity: 0.4; }
          50% { opacity: 0.1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

/**
 * LocationAtmosphere - Preset atmosphere for each location
 */
export function LocationAtmosphere({ location, screen }) {
  // Determine which effects to show based on location/screen
  const getEffects = () => {
    // Title screen - rain and mystery
    if (screen === 'title') {
      return (
        <>
          <RainEffect intensity="medium" windAngle={12} />
          <SmokeEffect density="light" direction="up" />
          <Vignette intensity="heavy" />
          <FilmGrain opacity={0.04} />
          <NeonGlow color="#d4a574" position={{ x: 50, y: 40 }} size={600} />
        </>
      );
    }

    // Travel screen - outside, urban
    if (screen === 'travel') {
      return (
        <>
          <RainEffect intensity="light" windAngle={20} />
          <SmokeEffect density="light" direction="right" />
          <Vignette intensity="medium" />
          <FilmGrain opacity={0.03} />
          <FlickeringLight 
            type="neon" 
            color="rgba(255, 100, 100, 0.15)" 
            position={{ x: 20, y: 15 }} 
            size={150}
            intensity="subtle"
          />
          <FlickeringLight 
            type="neon" 
            color="rgba(100, 150, 255, 0.1)" 
            position={{ x: 80, y: 25 }} 
            size={180}
            intensity="subtle"
          />
        </>
      );
    }

    // Prologue - dark apartment
    if (screen === 'prologue') {
      return (
        <>
          <RainEffect intensity="heavy" windAngle={25} />
          <LightningFlash frequency="occasional" />
          <Vignette intensity="dramatic" />
          <FilmGrain opacity={0.05} />
          <SmokeEffect density="light" direction="up" color="rgba(255,255,255,0.02)" />
        </>
      );
    }

    // Ending screens
    if (screen === 'ending') {
      return (
        <>
          <SmokeEffect density="medium" direction="up" />
          <Vignette intensity="heavy" />
          <FilmGrain opacity={0.04} />
        </>
      );
    }

    // Location-specific effects
    switch (location) {
      case 'emberRoom':
        return (
          <>
            <SmokeEffect density="heavy" direction="up" />
            <CigaretteSmoke x={15} y={70} opacity={0.1} />
            <CigaretteSmoke x={85} y={65} opacity={0.08} />
            <FlickeringLight 
              type="neon" 
              color="rgba(212, 165, 116, 0.2)" 
              position={{ x: 50, y: 20 }} 
              size={300}
              intensity="medium"
            />
            <DustParticles count={20} lightSource={{ x: 50, y: 10 }} />
            <Vignette intensity="heavy" />
            <FilmGrain opacity={0.04} />
          </>
        );

      case 'vanGelderStudio':
        return (
          <>
            <SmokeEffect density="light" direction="up" color="rgba(200,200,220,0.02)" />
            <DustParticles count={40} lightSource={{ x: 70, y: 15 }} beamWidth={300} />
            <FlickeringLight 
              type="lamp" 
              color="rgba(255, 240, 200, 0.15)" 
              position={{ x: 30, y: 30 }} 
              size={200}
              intensity="subtle"
            />
            <Vignette intensity="medium" />
            <FilmGrain opacity={0.03} />
          </>
        );

      case 'earlsApartment':
        return (
          <>
            <SmokeEffect density="medium" direction="up" />
            <DustParticles count={35} lightSource={{ x: 80, y: 20 }} beamWidth={150} />
            <FlickeringLight 
              type="lamp" 
              color="rgba(255, 220, 180, 0.1)" 
              position={{ x: 25, y: 40 }} 
              size={180}
              intensity="subtle"
            />
            <Vignette intensity="medium" />
            <FilmGrain opacity={0.04} />
          </>
        );

      case 'lorrainesBrownstone':
        return (
          <>
            <SmokeEffect density="light" direction="up" color="rgba(255,255,255,0.015)" />
            <FlickeringLight 
              type="lamp" 
              color="rgba(255, 200, 150, 0.08)" 
              position={{ x: 70, y: 35 }} 
              size={150}
              intensity="subtle"
            />
            <Vignette intensity="light" />
            <FilmGrain opacity={0.02} />
          </>
        );

      case 'birdland':
        return (
          <>
            <SmokeEffect density="heavy" direction="left" />
            <CigaretteSmoke x={30} y={75} opacity={0.12} />
            <CigaretteSmoke x={70} y={80} opacity={0.1} />
            <NeonGlow color="#ff6b6b" position={{ x: 50, y: 25 }} size={250} />
            <FlickeringLight 
              type="neon" 
              color="rgba(255, 100, 100, 0.15)" 
              position={{ x: 50, y: 15 }} 
              size={200}
              intensity="dramatic"
            />
            <DustParticles count={25} lightSource={{ x: 50, y: 20 }} />
            <Vignette intensity="heavy" />
            <FilmGrain opacity={0.05} />
          </>
        );

      default:
        return (
          <>
            <SmokeEffect density="light" direction="up" />
            <Vignette intensity="medium" />
            <FilmGrain opacity={0.03} />
          </>
        );
    }
  };

  return <>{getEffects()}</>;
}

export default LocationAtmosphere;
