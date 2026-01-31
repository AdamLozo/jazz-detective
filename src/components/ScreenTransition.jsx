import { useState, useEffect, createContext, useContext } from 'react';

/**
 * ScreenTransition - Cinematic noir transitions between screens
 * 
 * Transition Types:
 * - fade: Classic fade to black
 * - iris: Circular iris-out/in (classic film technique)
 * - wipe: Horizontal wipe transition
 * - dissolve: Cross-dissolve effect
 */

// Context for triggering transitions from anywhere
const TransitionContext = createContext(null);

export function useTransition() {
  return useContext(TransitionContext);
}

export function TransitionProvider({ children }) {
  const [transitioning, setTransitioning] = useState(false);
  const [transitionType, setTransitionType] = useState('fade');
  const [phase, setPhase] = useState('idle'); // idle, out, hold, in
  const [callback, setCallback] = useState(null);
  
  // Trigger a transition with optional callback
  const startTransition = (type = 'fade', onMidpoint) => {
    if (transitioning) return;
    
    setTransitioning(true);
    setTransitionType(type);
    setPhase('out');
    setCallback(() => onMidpoint);
  };
  
  // Handle transition phases
  useEffect(() => {
    if (!transitioning) return;
    
    let timer;
    
    if (phase === 'out') {
      // Fade out complete - hold at black, trigger callback
      timer = setTimeout(() => {
        setPhase('hold');
        callback?.();
      }, getOutDuration(transitionType));
    } else if (phase === 'hold') {
      // Hold at black briefly
      timer = setTimeout(() => {
        setPhase('in');
      }, 200);
    } else if (phase === 'in') {
      // Fade in complete - reset
      timer = setTimeout(() => {
        setPhase('idle');
        setTransitioning(false);
        setCallback(null);
      }, getInDuration(transitionType));
    }
    
    return () => clearTimeout(timer);
  }, [phase, transitioning, callback, transitionType]);
  
  return (
    <TransitionContext.Provider value={{ startTransition, transitioning }}>
      {children}
      <TransitionOverlay 
        type={transitionType} 
        phase={phase} 
        active={transitioning} 
      />
    </TransitionContext.Provider>
  );
}

// Duration helpers
function getOutDuration(type) {
  switch (type) {
    case 'iris': return 600;
    case 'wipe': return 400;
    case 'dissolve': return 500;
    default: return 400; // fade
  }
}

function getInDuration(type) {
  switch (type) {
    case 'iris': return 600;
    case 'wipe': return 400;
    case 'dissolve': return 500;
    default: return 400; // fade
  }
}

// The visual overlay component
function TransitionOverlay({ type, phase, active }) {
  if (!active && phase === 'idle') return null;
  
  const isVisible = phase === 'out' || phase === 'hold';
  const isEntering = phase === 'out';
  const isExiting = phase === 'in';
  
  return (
    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
      {type === 'fade' && (
        <FadeTransition isVisible={isVisible} isEntering={isEntering} isExiting={isExiting} />
      )}
      {type === 'iris' && (
        <IrisTransition isVisible={isVisible} isEntering={isEntering} isExiting={isExiting} />
      )}
      {type === 'wipe' && (
        <WipeTransition isVisible={isVisible} isEntering={isEntering} isExiting={isExiting} />
      )}
      {type === 'dissolve' && (
        <DissolveTransition isVisible={isVisible} isEntering={isEntering} isExiting={isExiting} />
      )}
    </div>
  );
}

// Fade to black transition
function FadeTransition({ isVisible, isEntering, isExiting }) {
  return (
    <div 
      className={`absolute inset-0 bg-black transition-opacity ${
        isEntering ? 'duration-400' : 'duration-400'
      } ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    />
  );
}

// Classic film iris transition
function IrisTransition({ isVisible, isEntering, isExiting }) {
  // Calculate circle size based on viewport
  const maxRadius = Math.max(window.innerWidth, window.innerHeight) * 1.5;
  
  return (
    <div className="absolute inset-0">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <mask id="irisMask">
            <rect width="100" height="100" fill="white" />
            <circle 
              cx="50" 
              cy="50" 
              className={`transition-all ${isEntering ? 'duration-600' : 'duration-600'} ease-in-out`}
              r={isVisible ? 0 : 80}
              fill="black"
            />
          </mask>
        </defs>
        <rect 
          width="100" 
          height="100" 
          fill="black" 
          mask="url(#irisMask)"
        />
      </svg>
      
      {/* Center point glow during hold */}
      {isVisible && (
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(212,165,116,0.6) 0%, transparent 70%)',
            boxShadow: '0 0 30px rgba(212,165,116,0.4)'
          }}
        />
      )}
    </div>
  );
}

// Horizontal wipe transition
function WipeTransition({ isVisible, isEntering, isExiting }) {
  return (
    <div 
      className={`absolute inset-0 bg-black transition-transform ${
        isEntering ? 'duration-400' : 'duration-400'
      } ease-in-out`}
      style={{
        transform: isVisible 
          ? 'translateX(0%)' 
          : (isExiting ? 'translateX(100%)' : 'translateX(-100%)')
      }}
    >
      {/* Subtle film grain */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

// Cross-dissolve transition (fade with texture)
function DissolveTransition({ isVisible, isEntering, isExiting }) {
  return (
    <div 
      className={`absolute inset-0 transition-opacity ${
        isEntering ? 'duration-500' : 'duration-500'
      } ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{
        background: 'linear-gradient(180deg, #0a0a0a 0%, #000 50%, #0a0a0a 100%)'
      }}
    >
      {/* Film grain overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Subtle vignette */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)'
        }}
      />
    </div>
  );
}

/**
 * Shortcut component for simple transition triggers
 * Usage: <TransitionTrigger type="iris" onComplete={...} />
 */
export function TransitionTrigger({ type = 'fade', onComplete, trigger }) {
  const { startTransition } = useTransition();
  
  useEffect(() => {
    if (trigger) {
      startTransition(type, onComplete);
    }
  }, [trigger, type, onComplete, startTransition]);
  
  return null;
}

export default TransitionProvider;
