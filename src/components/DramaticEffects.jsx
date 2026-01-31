/**
 * DramaticEffects - Screen effects for impactful moments
 * 
 * Features:
 * - Screen shake
 * - Flash/white out
 * - Red flash (danger)
 * - Slow fade to black
 * - Heartbeat pulse
 */
import { useState, useEffect, useCallback, createContext, useContext } from 'react';

// Context for global dramatic effects
const DramaticContext = createContext(null);

export function DramaticProvider({ children }) {
  const [activeEffect, setActiveEffect] = useState(null);
  const [effectKey, setEffectKey] = useState(0);

  const triggerEffect = useCallback((effect, duration = 500) => {
    setEffectKey(k => k + 1);
    setActiveEffect({ type: effect, duration });
    
    setTimeout(() => {
      setActiveEffect(null);
    }, duration);
  }, []);

  // Convenience methods
  const shake = useCallback((intensity = 'medium') => {
    const durations = { light: 300, medium: 500, heavy: 800 };
    triggerEffect(`shake-${intensity}`, durations[intensity] || 500);
  }, [triggerEffect]);

  const flash = useCallback((color = 'white') => {
    triggerEffect(`flash-${color}`, 400);
  }, [triggerEffect]);

  const pulse = useCallback(() => {
    triggerEffect('pulse', 1000);
  }, [triggerEffect]);

  const fadeToBlack = useCallback((duration = 2000) => {
    triggerEffect('fade-black', duration);
  }, [triggerEffect]);

  return (
    <DramaticContext.Provider value={{ 
      shake, 
      flash, 
      pulse, 
      fadeToBlack,
      triggerEffect 
    }}>
      {children}
      <DramaticOverlay effect={activeEffect} key={effectKey} />
    </DramaticContext.Provider>
  );
}

export function useDramaticEffects() {
  const context = useContext(DramaticContext);
  if (!context) {
    // Return no-op functions if not wrapped in provider
    return {
      shake: () => {},
      flash: () => {},
      pulse: () => {},
      fadeToBlack: () => {},
      triggerEffect: () => {},
    };
  }
  return context;
}

// The overlay that renders effects
function DramaticOverlay({ effect }) {
  if (!effect) return null;

  const getEffectStyles = () => {
    switch (effect.type) {
      case 'shake-light':
        return {
          className: 'shake-light',
          overlay: false,
        };
      case 'shake-medium':
        return {
          className: 'shake-medium',
          overlay: false,
        };
      case 'shake-heavy':
        return {
          className: 'shake-heavy',
          overlay: false,
        };
      case 'flash-white':
        return {
          className: 'flash-white',
          overlay: true,
          bg: 'bg-white',
        };
      case 'flash-red':
        return {
          className: 'flash-red',
          overlay: true,
          bg: 'bg-red-600',
        };
      case 'flash-amber':
        return {
          className: 'flash-amber',
          overlay: true,
          bg: 'bg-jazz-amber',
        };
      case 'pulse':
        return {
          className: 'heartbeat-pulse',
          overlay: true,
          bg: 'bg-red-900/50',
        };
      case 'fade-black':
        return {
          className: 'fade-to-black',
          overlay: true,
          bg: 'bg-black',
        };
      default:
        return { overlay: false };
    }
  };

  const styles = getEffectStyles();

  return (
    <>
      {/* Screen shake applies to body */}
      {styles.className && !styles.overlay && (
        <style>{`
          body {
            animation: ${styles.className} ${effect.duration}ms ease-in-out;
          }
        `}</style>
      )}
      
      {/* Overlay effects */}
      {styles.overlay && (
        <div 
          className={`fixed inset-0 pointer-events-none z-[100] ${styles.bg} ${styles.className}`}
          style={{ animationDuration: `${effect.duration}ms` }}
        />
      )}
      
      {/* Effect keyframes */}
      <style>{`
        @keyframes shake-light {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-3px); }
          40% { transform: translateX(3px); }
          60% { transform: translateX(-2px); }
          80% { transform: translateX(2px); }
        }
        
        @keyframes shake-medium {
          0%, 100% { transform: translateX(0); }
          10% { transform: translateX(-6px) rotate(-0.5deg); }
          20% { transform: translateX(6px) rotate(0.5deg); }
          30% { transform: translateX(-5px) rotate(-0.3deg); }
          40% { transform: translateX(5px) rotate(0.3deg); }
          50% { transform: translateX(-4px); }
          60% { transform: translateX(4px); }
          70% { transform: translateX(-3px); }
          80% { transform: translateX(3px); }
          90% { transform: translateX(-1px); }
        }
        
        @keyframes shake-heavy {
          0%, 100% { transform: translateX(0) translateY(0); }
          10% { transform: translateX(-10px) translateY(2px) rotate(-1deg); }
          20% { transform: translateX(10px) translateY(-2px) rotate(1deg); }
          30% { transform: translateX(-8px) translateY(1px) rotate(-0.5deg); }
          40% { transform: translateX(8px) translateY(-1px) rotate(0.5deg); }
          50% { transform: translateX(-6px) translateY(1px); }
          60% { transform: translateX(6px) translateY(-1px); }
          70% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
          90% { transform: translateX(-2px); }
        }
        
        .flash-white, .flash-red, .flash-amber {
          animation: flashOverlay ease-out forwards;
        }
        
        @keyframes flashOverlay {
          0% { opacity: 0.8; }
          100% { opacity: 0; }
        }
        
        .heartbeat-pulse {
          animation: heartbeatPulse ease-in-out;
        }
        
        @keyframes heartbeatPulse {
          0%, 100% { opacity: 0; }
          15% { opacity: 0.4; }
          30% { opacity: 0.1; }
          45% { opacity: 0.5; }
          60% { opacity: 0.1; }
          75% { opacity: 0.3; }
          90% { opacity: 0; }
        }
        
        .fade-to-black {
          animation: fadeToBlack ease-in forwards;
        }
        
        @keyframes fadeToBlack {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
    </>
  );
}

/**
 * ScreenTransition - Smooth transitions between screens
 */
export function ScreenTransition({ 
  children, 
  show = true, 
  type = 'fade',
  duration = 500,
  delay = 0,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(show);

  useEffect(() => {
    if (show) {
      setShouldRender(true);
      const timer = setTimeout(() => setIsVisible(true), delay + 50);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setShouldRender(false), duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, delay]);

  if (!shouldRender) return null;

  const getTransitionClasses = () => {
    switch (type) {
      case 'fade':
        return isVisible ? 'opacity-100' : 'opacity-0';
      case 'slide-up':
        return isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8';
      case 'slide-down':
        return isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 -translate-y-8';
      case 'scale':
        return isVisible 
          ? 'opacity-100 scale-100' 
          : 'opacity-0 scale-95';
      case 'blur':
        return isVisible 
          ? 'opacity-100 blur-0' 
          : 'opacity-0 blur-sm';
      default:
        return isVisible ? 'opacity-100' : 'opacity-0';
    }
  };

  return (
    <div 
      className={`transition-all ${getTransitionClasses()}`}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
}

/**
 * RevealText - Text that reveals with dramatic effect
 */
export function RevealText({
  children,
  delay = 0,
  duration = 800,
  type = 'fade-up',
  className = '',
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const getClasses = () => {
    const base = 'transition-all';
    
    switch (type) {
      case 'fade':
        return isVisible ? 'opacity-100' : 'opacity-0';
      case 'fade-up':
        return isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-4';
      case 'fade-down':
        return isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 -translate-y-4';
      case 'scale':
        return isVisible 
          ? 'opacity-100 scale-100' 
          : 'opacity-0 scale-90';
      case 'blur':
        return isVisible 
          ? 'opacity-100 blur-0' 
          : 'opacity-0 blur-md';
      default:
        return isVisible ? 'opacity-100' : 'opacity-0';
    }
  };

  return (
    <span 
      className={`${getClasses()} ${className}`}
      style={{ 
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {children}
    </span>
  );
}

/**
 * Spotlight - Animated spotlight effect
 */
export function Spotlight({ 
  x = 50, 
  y = 50, 
  size = 300,
  color = 'rgba(212, 165, 116, 0.15)',
  pulse = true,
}) {
  return (
    <div
      className="fixed pointer-events-none z-20"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size}px`,
        transform: 'translate(-50%, -50%)',
        background: `radial-gradient(ellipse at center, ${color} 0%, transparent 70%)`,
        animation: pulse ? 'spotlightPulse 4s ease-in-out infinite' : 'none',
      }}
    >
      <style>{`
        @keyframes spotlightPulse {
          0%, 100% { opacity: 0.8; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
        }
      `}</style>
    </div>
  );
}

export default DramaticProvider;
