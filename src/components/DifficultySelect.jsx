import { useGame } from '../context/GameContext';
import { useState, useEffect } from 'react';
import { RainEffect, Vignette, FilmGrain } from './AtmosphereEffects';

export default function DifficultySelect() {
  const { dispatch } = useGame();
  const [animationPhase, setAnimationPhase] = useState('initial');
  const [hoveredOption, setHoveredOption] = useState(null);
  
  useEffect(() => {
    // Entrance animation
    const timers = [
      setTimeout(() => setAnimationPhase('fade-in'), 100),
      setTimeout(() => setAnimationPhase('show-title'), 500),
      setTimeout(() => setAnimationPhase('show-options'), 1200),
      setTimeout(() => setAnimationPhase('full'), 2000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);
  
  const selectDifficulty = (difficulty) => {
    dispatch({ type: 'SET_DIFFICULTY', payload: difficulty });
  };
  
  const phaseAtLeast = (phase) => {
    const order = ['initial', 'fade-in', 'show-title', 'show-options', 'full'];
    return order.indexOf(animationPhase) >= order.indexOf(phase);
  };
  
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-jazz-black via-[#1a1510] to-jazz-black">
      {/* Atmospheric Effects */}
      <RainEffect intensity="light" windAngle={10} color="rgba(174, 194, 224, 0.3)" />
      <FilmGrain opacity={0.03} animated={true} />
      <Vignette intensity="medium" />
      
      {/* Background texture */}
      <div className="absolute inset-0 paper-texture opacity-5" />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        
        {/* Title */}
        <div className={`text-center mb-16 transition-all duration-1000 transform ${phaseAtLeast('show-title') ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
          <p className="text-xl md:text-2xl tracking-[0.4em] text-jazz-amber/60 uppercase mb-4">
            Before We Begin
          </p>
          <h1 className="font-display text-5xl md:text-7xl text-jazz-cream tracking-wide mb-4">
            How Well Do You Know Jazz?
          </h1>
          <p className="text-xl md:text-2xl text-jazz-cream/50 max-w-2xl mx-auto leading-relaxed">
            Your answer will shape how the investigation unfolds.
          </p>
        </div>
        
        {/* Options */}
        <div className={`flex flex-col md:flex-row gap-8 md:gap-12 transition-all duration-1000 ${phaseAtLeast('show-options') ? 'opacity-100' : 'opacity-0'}`}>
          
          {/* Jazz Novice */}
          <button
            onClick={() => selectDifficulty('novice')}
            onMouseEnter={() => setHoveredOption('novice')}
            onMouseLeave={() => setHoveredOption(null)}
            className={`group relative w-80 p-8 border-2 transition-all duration-500 ${
              hoveredOption === 'novice' 
                ? 'border-jazz-blue bg-jazz-blue/10 scale-105' 
                : 'border-jazz-cream/30 bg-jazz-black/50 hover:border-jazz-cream/50'
            }`}
          >
            {/* Icon */}
            <div className="text-6xl mb-4">🎵</div>
            
            {/* Title */}
            <h2 className={`font-display text-3xl tracking-wide mb-3 transition-colors ${
              hoveredOption === 'novice' ? 'text-jazz-blue' : 'text-jazz-cream'
            }`}>
              Jazz Novice
            </h2>
            
            {/* Description */}
            <p className="text-jazz-cream/60 text-lg leading-relaxed mb-4">
              I appreciate the music but don't know the history inside-out.
            </p>
            
            {/* What to expect */}
            <div className={`text-sm transition-all duration-300 ${
              hoveredOption === 'novice' ? 'text-jazz-blue/80' : 'text-jazz-cream/40'
            }`}>
              <p className="mb-2 font-semibold uppercase tracking-wider">What to expect:</p>
              <ul className="space-y-1 text-left">
                <li>• Hints provided for trivia questions</li>
                <li>• Easier clues to catch the killer lying</li>
                <li>• Full story experience</li>
              </ul>
            </div>
            
            {/* Hover glow */}
            <div className={`absolute inset-0 bg-jazz-blue/5 transition-opacity duration-300 ${
              hoveredOption === 'novice' ? 'opacity-100' : 'opacity-0'
            }`} />
          </button>
          
          {/* Jazz Expert */}
          <button
            onClick={() => selectDifficulty('expert')}
            onMouseEnter={() => setHoveredOption('expert')}
            onMouseLeave={() => setHoveredOption(null)}
            className={`group relative w-80 p-8 border-2 transition-all duration-500 ${
              hoveredOption === 'expert' 
                ? 'border-jazz-amber bg-jazz-amber/10 scale-105' 
                : 'border-jazz-cream/30 bg-jazz-black/50 hover:border-jazz-cream/50'
            }`}
          >
            {/* Icon */}
            <div className="text-6xl mb-4">🎷</div>
            
            {/* Title */}
            <h2 className={`font-display text-3xl tracking-wide mb-3 transition-colors ${
              hoveredOption === 'expert' ? 'text-jazz-amber' : 'text-jazz-cream'
            }`}>
              Jazz Expert
            </h2>
            
            {/* Description */}
            <p className="text-jazz-cream/60 text-lg leading-relaxed mb-4">
              I know my bebop from my hard bop. Test me.
            </p>
            
            {/* What to expect */}
            <div className={`text-sm transition-all duration-300 ${
              hoveredOption === 'expert' ? 'text-jazz-amber/80' : 'text-jazz-cream/40'
            }`}>
              <p className="mb-2 font-semibold uppercase tracking-wider">What to expect:</p>
              <ul className="space-y-1 text-left">
                <li>• Deep trivia requiring real knowledge</li>
                <li>• Subtle clues — attention to detail rewarded</li>
                <li>• The authentic jazz detective experience</li>
              </ul>
            </div>
            
            {/* Hover glow */}
            <div className={`absolute inset-0 bg-jazz-amber/5 transition-opacity duration-300 ${
              hoveredOption === 'expert' ? 'opacity-100' : 'opacity-0'
            }`} />
          </button>
        </div>
        
        {/* Subtext */}
        <p className={`mt-12 text-jazz-cream/30 text-lg transition-all duration-1000 ${phaseAtLeast('full') ? 'opacity-100' : 'opacity-0'}`}>
          Either way, a man is dead and someone must answer for it.
        </p>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      
      {/* Musical notes decoration */}
      <div className={`absolute top-20 left-10 text-4xl text-jazz-amber/10 transition-all duration-2000 ${phaseAtLeast('full') ? 'opacity-100' : 'opacity-0'}`}>
        ♪ ♫
      </div>
      <div className={`absolute top-32 right-16 text-3xl text-jazz-blue/10 transition-all duration-2000 delay-500 ${phaseAtLeast('full') ? 'opacity-100' : 'opacity-0'}`}>
        ♫ ♪
      </div>
    </div>
  );
}
