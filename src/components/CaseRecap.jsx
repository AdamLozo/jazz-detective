import { useState, useEffect } from 'react';
import { characters } from '../data/characters';
import CharacterPortrait from './CharacterPortrait';
import { Vignette } from './AtmosphereEffects';

// Map dialogue flags to recap-worthy story beats
const storyBeats = {
  // Major revelations (shown prominently)
  major: {
    earl_feared_teddy: {
      text: "Earl specifically feared Teddy — told Lorraine 'if anything happens to me...'",
      icon: "⚠️"
    },
    heard_teddy_threat: {
      text: "On tape: Teddy threatened Earl — 'That can be arranged'",
      icon: "🎙️"
    },
    chet_witnessed_threat: {
      text: "Witness saw Teddy threaten Earl in the alley before the show",
      icon: "👁️"
    },
    bartender_contradicts_teddy: {
      text: "Teddy lied about his whereabouts during the murder window",
      icon: "🕐"
    },
    teddy_in_trouble: {
      text: "Teddy owes money to dangerous people — his 'backers' want payment",
      icon: "💰"
    },
  },
  // Alibis confirmed
  alibis: {
    snap_alibi_confirmed: { name: "Snap Williams", status: "Cleared — at Van Gelder's studio all night" },
    lorraine_alibi_confirmed: { name: "Lorraine Jeffries", status: "Cleared — with sister until 2 AM" },
    chet_alibi_established: { name: "Chet Malone", status: "Cleared — at Birdland from 11 PM" },
    ruthie_was_at_birdland: { name: "Ruthie Cole", status: "Alibi confirmed — secret meeting at Birdland" },
  },
  // Motives discovered
  motives: {
    teddy_confirmed_debt: "Teddy: Earl owed him $4,000 gambling debt",
    teddy_knew_about_starlight: "Teddy: Furious Earl was leaving for The Starlight",
    learned_snap_stealing: "Snap: Was caught stealing Earl's arrangements",
    chet_confronted_earl: "Chet: Confronted Earl about being fired",
  },
  // Locations unlocked
  locations: {
    unlocked_lorraine: "Discovered Lorraine's brownstone address",
    unlocked_birdland: "Learned Chet frequents Birdland",
  }
};

// Determine current investigation status/next lead
function getNextLead(flags, clues, interviews) {
  // Priority order of suggestions
  if (!flags.teddy_admitted_absence) {
    return "Press Teddy about his whereabouts during the second set";
  }
  if (flags.teddy_admitted_absence && !flags.bartender_contradicts_teddy) {
    return "Ask Jimmy the bartender about Teddy's movements";
  }
  if (!flags.unlocked_lorraine && interviews.includes('jimmy')) {
    return "Find out where Lorraine Jeffries lives";
  }
  if (flags.unlocked_lorraine && !interviews.includes('lorraine')) {
    return "Interview Lorraine at her brownstone";
  }
  if (!flags.unlocked_birdland) {
    return "Discover where Chet Malone can be found";
  }
  if (flags.unlocked_birdland && !interviews.includes('chet')) {
    return "Track down Chet Malone at Birdland";
  }
  if (!flags.argument_tape_available && interviews.includes('snap')) {
    return "Ask Rudy Van Gelder about any recordings";
  }
  if (flags.argument_tape_available && !flags.heard_teddy_threat) {
    return "Listen to the tape Rudy mentioned";
  }
  if (clues.length >= 6 && !flags.chet_witnessed_threat) {
    return "Press Chet about what he saw in the alley";
  }
  if (clues.length >= 8) {
    return "You have enough evidence to make an accusation";
  }
  return "Continue gathering evidence and interviewing witnesses";
}

export default function CaseRecap({ saveData, onContinue, onCancel }) {
  const [phase, setPhase] = useState('fade-in');
  const [visibleSections, setVisibleSections] = useState([]);
  
  const { 
    collectedClues = [], 
    interviewedCharacters = [], 
    dialogueFlags = {},
    unlockedLocations = [],
    difficulty = 'standard'
  } = saveData || {};
  
  // Dramatic reveal sequence
  useEffect(() => {
    const sequence = [
      { phase: 'show-header', delay: 500 },
      { phase: 'show-status', delay: 1200 },
      { phase: 'show-findings', delay: 2000 },
      { phase: 'show-suspects', delay: 3000 },
      { phase: 'show-lead', delay: 4000 },
      { phase: 'show-button', delay: 4800 },
    ];
    
    const timers = sequence.map(({ phase, delay }) =>
      setTimeout(() => setPhase(phase), delay)
    );
    
    return () => timers.forEach(clearTimeout);
  }, []);
  
  const phaseAtLeast = (p) => {
    const order = ['fade-in', 'show-header', 'show-status', 'show-findings', 'show-suspects', 'show-lead', 'show-button'];
    return order.indexOf(phase) >= order.indexOf(p);
  };
  
  // Gather major findings
  const majorFindings = Object.entries(storyBeats.major)
    .filter(([key]) => dialogueFlags[key])
    .map(([key, data]) => data);
  
  // Gather confirmed alibis
  const confirmedAlibis = Object.entries(storyBeats.alibis)
    .filter(([key]) => dialogueFlags[key])
    .map(([key, data]) => data);
  
  // Get suspects (characters marked as suspects who've been interviewed)
  const interviewedSuspects = interviewedCharacters
    .map(id => characters[id])
    .filter(char => char?.isSuspect);
  
  // Get next lead
  const nextLead = getNextLead(dialogueFlags, collectedClues, interviewedCharacters);
  
  return (
    <div className="fixed inset-0 z-50 bg-black overflow-y-auto">
      {/* Noir background texture */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }} />
      </div>
      
      {/* Vignette */}
      <Vignette intensity="heavy" />
      
      {/* Content - scrollable on mobile */}
      <div className="relative z-10 min-h-screen flex flex-col items-center px-4 py-8 sm:py-12 overflow-y-auto safe-area-bottom">
        <div className="w-full max-w-3xl pb-8">
          
          {/* Header */}
          <header className={`text-center mb-8 sm:mb-12 transition-all duration-1000 transform ${phaseAtLeast('show-header') ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
            <p className="text-sm sm:text-lg tracking-[0.4em] text-jazz-amber/60 uppercase mb-2">
              Case File #1965-127
            </p>
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl text-amber-50 tracking-wide mb-3"
                style={{ textShadow: '2px 2px 0 #000, 4px 4px 0 rgba(0,0,0,0.3)' }}>
              PREVIOUSLY...
            </h1>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 sm:w-20 h-px bg-gradient-to-r from-transparent to-jazz-amber/60" />
              <span className="text-jazz-amber/40">♦</span>
              <div className="w-12 sm:w-20 h-px bg-gradient-to-l from-transparent to-jazz-amber/60" />
            </div>
          </header>
          
          {/* Case Status */}
          <section className={`mb-8 sm:mb-10 transition-all duration-1000 transform ${phaseAtLeast('show-status') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-black/40 border border-white/10 p-4 sm:p-6">
              <h2 className="font-display text-xl sm:text-2xl text-jazz-amber tracking-wide mb-4">
                THE MURDER OF EARL "DUKE" JEFFRIES
              </h2>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-3xl sm:text-4xl font-display text-amber-50">{collectedClues.length}</p>
                  <p className="text-xs sm:text-sm text-amber-100/50 uppercase tracking-wider">Evidence</p>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-display text-amber-50">{interviewedCharacters.length}</p>
                  <p className="text-xs sm:text-sm text-amber-100/50 uppercase tracking-wider">Interviews</p>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-display text-amber-50">{unlockedLocations.length}</p>
                  <p className="text-xs sm:text-sm text-amber-100/50 uppercase tracking-wider">Locations</p>
                </div>
              </div>
              {/* Progress bar */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-jazz-amber transition-all duration-1000"
                      style={{ width: `${Math.min((collectedClues.length / 8) * 100, 100)}%` }}
                    />
                  </div>
                  <span className="text-sm text-amber-100/60">{collectedClues.length}/8</span>
                </div>
                <p className="text-xs text-amber-100/40 mt-2">
                  {collectedClues.length >= 8 
                    ? "Ready to make an accusation" 
                    : `${8 - collectedClues.length} more pieces of evidence needed`}
                </p>
              </div>
            </div>
          </section>
          
          {/* Key Findings */}
          {majorFindings.length > 0 && (
            <section className={`mb-8 sm:mb-10 transition-all duration-1000 transform ${phaseAtLeast('show-findings') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h3 className="font-display text-lg sm:text-xl text-jazz-amber/80 tracking-wide mb-4 flex items-center gap-2">
                <span className="text-xl">🔍</span> KEY FINDINGS
              </h3>
              <div className="space-y-2">
                {majorFindings.slice(0, 4).map((finding, i) => (
                  <div 
                    key={i}
                    className="flex items-start gap-3 bg-jazz-amber/10 border-l-4 border-jazz-amber/60 p-3 sm:p-4"
                    style={{ 
                      animationDelay: `${i * 150}ms`,
                      animation: phaseAtLeast('show-findings') ? 'slideIn 0.5s ease-out forwards' : 'none'
                    }}
                  >
                    <span className="text-lg sm:text-xl flex-shrink-0">{finding.icon}</span>
                    <p className="text-sm sm:text-base text-amber-100/90">{finding.text}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Alibis Confirmed */}
          {confirmedAlibis.length > 0 && (
            <section className={`mb-8 sm:mb-10 transition-all duration-1000 transform ${phaseAtLeast('show-findings') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                     style={{ transitionDelay: '300ms' }}>
              <h3 className="font-display text-lg sm:text-xl text-green-400/80 tracking-wide mb-4 flex items-center gap-2">
                <span className="text-xl">✓</span> ALIBIS CONFIRMED
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {confirmedAlibis.map((alibi, i) => (
                  <div 
                    key={i}
                    className="flex items-center gap-3 bg-green-900/20 border border-green-500/20 p-3"
                  >
                    <span className="text-green-400 text-lg">✓</span>
                    <div>
                      <p className="text-sm font-semibold text-amber-50">{alibi.name}</p>
                      <p className="text-xs text-amber-100/60">{alibi.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Active Suspects */}
          {interviewedSuspects.length > 0 && (
            <section className={`mb-8 sm:mb-10 transition-all duration-1000 transform ${phaseAtLeast('show-suspects') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h3 className="font-display text-lg sm:text-xl text-red-400/80 tracking-wide mb-4 flex items-center gap-2">
                <span className="text-xl">🎯</span> SUSPECTS INTERVIEWED
              </h3>
              <div className="flex flex-wrap gap-4">
                {interviewedSuspects.map((suspect) => (
                  <div 
                    key={suspect.id}
                    className="flex items-center gap-3 bg-red-900/20 border border-red-500/30 p-3 pr-5"
                  >
                    <CharacterPortrait characterId={suspect.id} size={48} />
                    <div>
                      <p className="font-semibold text-amber-50">{suspect.name}</p>
                      <p className="text-xs text-amber-100/60">{suspect.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Next Lead */}
          <section className={`mb-10 sm:mb-12 transition-all duration-1000 transform ${phaseAtLeast('show-lead') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-jazz-blue/20 border-2 border-jazz-blue/40 p-4 sm:p-6">
              <h3 className="font-display text-lg sm:text-xl text-jazz-blue tracking-wide mb-2 flex items-center gap-2">
                <span className="text-xl">📍</span> YOUR NEXT LEAD
              </h3>
              <p className="text-base sm:text-lg text-amber-100/90 italic">
                "{nextLead}"
              </p>
            </div>
          </section>
          
          {/* Action Buttons */}
          <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center transition-all duration-1000 transform ${phaseAtLeast('show-button') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <button
              onClick={onContinue}
              className="px-8 sm:px-12 py-4 sm:py-5 bg-jazz-amber text-jazz-black font-display text-xl sm:text-3xl tracking-wide hover:bg-jazz-amber/90 transition-all duration-300 hover:scale-105 shadow-lg shadow-jazz-amber/20 min-h-[44px]"
            >
              RESUME INVESTIGATION
            </button>
            <button
              onClick={onCancel}
              className="px-6 sm:px-8 py-3 sm:py-4 border border-white/30 text-amber-100/60 font-display text-base sm:text-xl tracking-wide hover:border-white/50 hover:text-amber-50 transition-all duration-300 min-h-[44px]"
            >
              BACK
            </button>
          </div>
          
        </div>
      </div>
      
      {/* Animation keyframes */}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
