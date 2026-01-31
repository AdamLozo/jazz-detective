import { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { useAudio } from '../context/AudioContextEnhanced';
import { examineDetails } from '../data/locations';
import { clues } from '../data/clues';
import { TypewriterText } from './TypewriterText';
import { useDramaticEffects } from './DramaticEffects';
import { SmokeEffect, DustParticles, Vignette, FilmGrain } from './AtmosphereEffects';
import EvidenceFoundAnimation from './EvidenceFoundAnimation';

export default function ExamineView({ area, onClose }) {
  const { state, dispatch } = useGame();
  const { playSFX, TRIGGERS, isInitialized } = useAudio();
  const [collectedThisSession, setCollectedThisSession] = useState([]);
  const [showDescription, setShowDescription] = useState(false);
  const [descriptionComplete, setDescriptionComplete] = useState(false);
  const [showingClueReveal, setShowingClueReveal] = useState(null);
  const [animatingClue, setAnimatingClue] = useState(null); // For full-screen animation
  const { shake, flash, pulse } = useDramaticEffects();
  
  const detail = examineDetails[area.onExamine];
  
  // Start description after brief delay
  useEffect(() => {
    const timer = setTimeout(() => setShowDescription(true), 500);
    return () => clearTimeout(timer);
  }, []);
  
  if (!detail) return null;
  
  const availableClues = detail.cluesAvailable
    .map(id => clues[id])
    .filter(clue => !state.collectedClues.find(c => c.id === clue.id));
  
  const alreadyCollected = detail.cluesAvailable
    .map(id => clues[id])
    .filter(clue => state.collectedClues.find(c => c.id === clue.id));
  
  const collectClue = (clue) => {
    // Play sound effect
    if (isInitialized && TRIGGERS) {
      playSFX(TRIGGERS.CLUE_FOUND);
    }
    
    // Show full-screen animation
    setAnimatingClue(clue);
    
    // Dramatic reveal
    setShowingClueReveal(clue.id);
    flash('amber');
  };
  
  // Called when animation completes
  const handleAnimationComplete = () => {
    if (animatingClue) {
      dispatch({ type: 'COLLECT_CLUE', payload: animatingClue });
      setCollectedThisSession([...collectedThisSession, animatingClue.id]);
      
      // Check if this unlocks anything important
      if (animatingClue.critical) {
        pulse();
      }
      
      setShowingClueReveal(null);
      setAnimatingClue(null);
    }
  };

  // Get clue significance hint
  const getClueSignificance = (clue) => {
    if (clue.critical) return 'Critical Evidence';
    if (clue.type === 'audio') return 'Audio Recording';
    if (clue.type === 'document') return 'Document';
    if (clue.type === 'physical') return 'Physical Evidence';
    return 'Evidence';
  };
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Evidence Found Animation Overlay */}
      {animatingClue && (
        <EvidenceFoundAnimation
          evidence={animatingClue}
          onComplete={handleAnimationComplete}
        />
      )}
      
      {/* Background */}
      <div className="paper-texture absolute inset-0" />
      
      {/* Atmospheric effects */}
      <DustParticles count={20} lightSource={{ x: 75, y: 15 }} beamWidth={200} />
      <SmokeEffect density="light" direction="up" color="rgba(255,255,255,0.015)" />
      <Vignette intensity="medium" />
      <FilmGrain opacity={0.03} />
      
      {/* Clue reveal overlay */}
      {showingClueReveal && (
        <div className="fixed inset-0 bg-jazz-amber/10 z-30 pointer-events-none animate-pulse" />
      )}
      
      {/* Content */}
      <div className="relative z-10 p-8 md:p-16 min-h-screen">
        <div className="scene-enter max-w-5xl mx-auto">
          {/* Back button */}
          <button
            onClick={onClose}
            className="mb-10 text-jazz-black/60 hover:text-jazz-black transition-all duration-300 flex items-center gap-3 text-2xl md:text-3xl group"
          >
            <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
            <span>Back to location</span>
          </button>
          
          {/* Header */}
          <div className="mb-12">
            <p className="text-lg md:text-xl tracking-[0.2em] text-jazz-black/40 uppercase mb-3">
              Examining
            </p>
            <h1 className="font-display text-5xl md:text-7xl tracking-wide text-jazz-black leading-tight">
              {detail.title}
            </h1>
            <div className="w-24 h-1 bg-jazz-amber/60 mt-5" />
          </div>
          
          {/* Scene description with typewriter */}
          <div className="mb-16 relative">
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-jazz-blue/40 via-jazz-black/10 to-transparent" />
            
            {showDescription && (
              <div className="text-2xl md:text-3xl text-jazz-black/85 leading-relaxed">
                {!descriptionComplete ? (
                  <TypewriterText
                    text={detail.text.replace(/\n\n/g, ' ')}
                    speed={20}
                    onComplete={() => setDescriptionComplete(true)}
                    showCursor={true}
                    skipOnClick={true}
                    dramaticPauses={true}
                  />
                ) : (
                  detail.text.split('\n\n').map((para, i) => (
                    <p key={i} className="mb-6">{para}</p>
                  ))
                )}
              </div>
            )}
            
            {showDescription && !descriptionComplete && (
              <p className="text-jazz-black/30 text-sm mt-4 animate-pulse">
                Click to skip...
              </p>
            )}
          </div>
          
          {/* Evidence to collect */}
          {descriptionComplete && availableClues.length > 0 && (
            <section className="mb-14 animate-fade-in">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-5xl animate-pulse">🔎</span>
                <h2 className="font-display text-4xl md:text-5xl tracking-wide text-jazz-amber">
                  EVIDENCE FOUND
                </h2>
              </div>
              <div className="space-y-4">
                {availableClues.map((clue, index) => (
                  <button
                    key={clue.id}
                    onClick={() => collectClue(clue)}
                    disabled={collectedThisSession.includes(clue.id)}
                    style={{ animationDelay: `${index * 150}ms` }}
                    className={`clue-card block w-full text-left px-6 py-6 border-2 transition-all duration-300 relative overflow-hidden group ${
                      collectedThisSession.includes(clue.id)
                        ? 'border-green-600 bg-green-50 cursor-default'
                        : showingClueReveal === clue.id
                          ? 'border-jazz-amber bg-jazz-amber/30 scale-[1.02]'
                          : 'border-jazz-amber/50 bg-jazz-amber/5 hover:bg-jazz-amber/15 hover:border-jazz-amber hover:scale-[1.01] cursor-pointer'
                    }`}
                  >
                    {/* Hover glow */}
                    {!collectedThisSession.includes(clue.id) && (
                      <div className="absolute inset-0 bg-gradient-to-r from-jazz-amber/0 via-jazz-amber/10 to-jazz-amber/0 
                                      opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    )}
                    
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-2">
                        <span className="font-semibold text-2xl md:text-3xl text-jazz-black">{clue.name}</span>
                        <span className={`text-base px-2 py-0.5 rounded ${
                          clue.type === 'audio' ? 'bg-jazz-blue/20 text-jazz-blue' :
                          clue.type === 'document' ? 'bg-amber-100 text-amber-700' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {getClueSignificance(clue)}
                        </span>
                      </div>
                      <p className="text-jazz-black/70 leading-relaxed text-xl md:text-2xl">{clue.description}</p>
                      
                      {collectedThisSession.includes(clue.id) ? (
                        <p className="text-green-700 mt-4 text-lg font-semibold flex items-center gap-2">
                          <span className="text-2xl">✓</span>
                          Added to journal
                        </p>
                      ) : (
                        <p className="text-jazz-amber mt-4 text-lg font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                          <span className="text-xl">+</span>
                          Click to collect
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                        </p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}
          
          {/* Already collected */}
          {descriptionComplete && alreadyCollected.length > 0 && (
            <section className="mb-10 animate-fade-in">
              <p className="text-jazz-black/40 italic flex items-center gap-3 text-xl">
                <span className="text-green-600">✓</span>
                <span>Previously collected: {alreadyCollected.map(c => c.name).join(', ')}</span>
              </p>
            </section>
          )}
          
          {/* Nothing here */}
          {descriptionComplete && detail.cluesAvailable.length === 0 && (
            <p className="text-jazz-black/40 italic text-xl animate-fade-in">
              Nothing else of interest here. But you've looked carefully — that matters.
            </p>
          )}
          
          {/* Total evidence indicator */}
          {descriptionComplete && (
            <div className="mt-12 pt-6 border-t border-jazz-black/10 animate-fade-in">
              <p className="text-jazz-black/30 text-base">
                Evidence collected: <span className="text-jazz-amber font-semibold">{state.collectedClues.length}</span> clues
                {state.collectedClues.length >= 8 && (
                  <span className="ml-3 text-green-600">• Ready to make accusation</span>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Ambient time indicator */}
      <div className="fixed top-8 right-8 text-right z-20">
        <p className="font-display text-4xl text-jazz-black/20">4:23 AM</p>
        <p className="text-lg text-jazz-black/15 tracking-wider uppercase">Examining</p>
      </div>
      
      {/* Animations */}
      <style>{`
        .animate-fade-in {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .clue-card {
          animation: clueSlideIn 0.5s ease-out backwards;
        }
        
        @keyframes clueSlideIn {
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
