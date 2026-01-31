import { useState, useEffect } from 'react';
import { locations } from '../data/locations';

/**
 * Cinematic location title card - shown when entering a new location
 * Classic noir style: location name, address, atmospheric tagline
 */

const locationMeta = {
  emberRoom: {
    address: '127th Street, Harlem',
    time: '2:47 AM',
    tagline: 'The last notes still hang in the smoky air',
  },
  vanGelderStudio: {
    address: 'Englewood Cliffs, New Jersey',
    time: '11:30 AM',
    tagline: 'Where legends are captured on tape',
  },
  earlApartment: {
    address: '142nd Street, Harlem',
    time: '9:15 AM',
    tagline: 'A life interrupted, secrets left behind',
  },
  lorraineBrownstone: {
    address: '138th Street, Harlem',
    time: '2:00 PM',
    tagline: 'Grief and secrets behind closed doors',
  },
  birdland: {
    address: 'Broadway & 52nd Street',
    time: '11:45 PM',
    tagline: 'The jazz corner of the world',
  },
};

export default function LocationTitleCard({ locationId, onComplete }) {
  const [phase, setPhase] = useState('enter');
  
  const location = locations[locationId];
  const meta = locationMeta[locationId] || {
    address: 'New York City',
    time: 'Night',
    tagline: '',
  };
  
  useEffect(() => {
    const sequence = [
      { phase: 'bars', delay: 100 },
      { phase: 'name', delay: 400 },
      { phase: 'address', delay: 1000 },
      { phase: 'tagline', delay: 1500 },
      { phase: 'hold', delay: 2500 },
      { phase: 'exit', delay: 3200 },
    ];
    
    const timers = sequence.map(({ phase, delay }) =>
      setTimeout(() => setPhase(phase), delay)
    );
    
    const completeTimer = setTimeout(() => onComplete?.(), 3700);
    
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);
  
  const phaseAtLeast = (p) => {
    const order = ['enter', 'bars', 'name', 'address', 'tagline', 'hold', 'exit'];
    return order.indexOf(phase) >= order.indexOf(p);
  };
  
  // Tap to skip
  const handleTap = () => {
    if (phaseAtLeast('address')) {
      onComplete?.();
    }
  };
  
  if (!location) return null;
  
  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-600 ${
        phase === 'exit' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      onClick={handleTap}
    >
      {/* Subtle background texture */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Cinematic letterbox bars */}
      <div className={`absolute top-0 left-0 right-0 h-14 sm:h-20 bg-black transition-all duration-500 ${
        phaseAtLeast('bars') ? 'translate-y-0' : '-translate-y-full'
      }`} />
      <div className={`absolute bottom-0 left-0 right-0 h-14 sm:h-20 bg-black transition-all duration-500 ${
        phaseAtLeast('bars') ? 'translate-y-0' : 'translate-y-full'
      }`} />
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        {/* Time indicator */}
        <div className={`flex items-center justify-center gap-4 mb-4 transition-all duration-400 ${
          phaseAtLeast('bars') ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="w-12 sm:w-20 h-px bg-jazz-amber/30" />
          <span className="text-xs sm:text-sm tracking-[0.3em] text-jazz-amber/50 uppercase font-light">
            {meta.time}
          </span>
          <div className="w-12 sm:w-20 h-px bg-jazz-amber/30" />
        </div>
        
        {/* Location name */}
        <h1 
          className={`font-display text-4xl sm:text-6xl md:text-8xl text-amber-50 tracking-wider mb-2 transition-all duration-600 transform ${
            phaseAtLeast('name') ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
          }`}
          style={{ 
            textShadow: '3px 3px 0 #000, 0 0 60px rgba(212,165,116,0.15)',
            letterSpacing: '0.1em'
          }}
        >
          {location.name.toUpperCase()}
        </h1>
        
        {/* Address */}
        <p className={`text-base sm:text-xl md:text-2xl text-jazz-amber/60 tracking-[0.15em] uppercase mb-4 transition-all duration-500 transform ${
          phaseAtLeast('address') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          {meta.address}
        </p>
        
        {/* Tagline */}
        <p className={`text-sm sm:text-lg text-amber-100/35 italic transition-all duration-500 transform ${
          phaseAtLeast('tagline') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          "{meta.tagline}"
        </p>
        
        {/* Bottom accent */}
        <div className={`flex items-center justify-center gap-3 mt-6 transition-opacity duration-400 ${
          phaseAtLeast('address') ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="w-6 sm:w-10 h-px bg-jazz-amber/20" />
          <span className="text-jazz-amber/15 text-sm">◆</span>
          <div className="w-6 sm:w-10 h-px bg-jazz-amber/20" />
        </div>
      </div>
      
      {/* Tap hint */}
      <p className={`absolute bottom-16 sm:bottom-24 left-0 right-0 text-center text-xs text-amber-100/15 transition-opacity duration-400 ${
        phaseAtLeast('tagline') ? 'opacity-100' : 'opacity-0'
      }`}>
        Tap to continue
      </p>
    </div>
  );
}
