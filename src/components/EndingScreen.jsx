import { useState, useEffect, useCallback } from 'react';
import { useGame } from '../context/GameContext';
import { characters } from '../data/characters';
import CharacterPortrait from './CharacterPortrait';
import { TypewriterText, TypewriterSequence } from './TypewriterText';
import { LocationAtmosphere, SmokeEffect, Vignette, FilmGrain } from './AtmosphereEffects';
import { RevealText } from './DramaticEffects';

// Victory ending paragraphs
const victoryParagraphs = [
  "Teddy Olson breaks down under questioning. The police find bloodstains on his suit — Earl's blood. The murder weapon, a heavy brass ashtray, was hidden in the club's basement.",
  "The story comes out piece by piece. Earl was leaving for The Starlight. The gambling debt would never be paid. Teddy's backers were coming to collect. In a moment of desperation, Teddy confronted Earl in the back room after the second set.",
  '"I just wanted him to stay," Teddy says, hollow-eyed. "I grabbed the ashtray to scare him. But Earl laughed. He said I was pathetic. He said The Ember Room would be a memory in a month. And I... I swung."',
  "The papers run the story for weeks. Your name is cleared. Musicians start calling again. The quintet regroups, with a new pianist — younger, hungrier, but respectful of Earl's legacy.",
  "At the sentencing, Lorraine Jeffries sits in the front row. She doesn't cry. She watches Teddy led away in handcuffs, and she nods once. Justice, or something like it.",
];

// Defeat ending paragraphs
const getDefeatParagraphs = (accusedName, killerName) => [
  `You take your theory to the police. ${accusedName} is brought in for questioning. The detectives are skeptical, but you're so certain.`,
  `The case falls apart in days. ${accusedName}'s alibi holds up under scrutiny. Witnesses corroborate their story. The evidence you gathered points in a different direction than you thought.`,
  `Meanwhile, the real killer — ${killerName} — slips away. By the time the police realize their mistake, the trail has gone cold. Some debts are quietly forgiven. Some questions are never answered.`,
  'Your reputation in the jazz world takes a hit. "The bass player who fingered the wrong person." Gigs dry up. Musicians stop returning your calls. The quintet disbands for good.',
  "And the cops? They still like you for it. Earl's murder goes unsolved, and your name is never quite cleared. Every time you walk into a club, you feel the eyes. The whispers.",
];

export default function EndingScreen() {
  const { state, dispatch, THE_KILLER } = useGame();
  const [showNarrative, setShowNarrative] = useState(false);
  const [narrativeComplete, setNarrativeComplete] = useState(false);
  const [currentParagraph, setCurrentParagraph] = useState(0);
  
  const accusedCharacter = characters[state.accusedSuspect];
  const killerCharacter = characters[THE_KILLER];
  
  // Start narrative after initial reveal
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNarrative(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleParagraphComplete = useCallback((index) => {
    setCurrentParagraph(index + 1);
    if (state.wasCorrect && index === victoryParagraphs.length - 1) {
      setNarrativeComplete(true);
    } else if (!state.wasCorrect && index === getDefeatParagraphs('', '').length - 1) {
      setNarrativeComplete(true);
    }
  }, [state.wasCorrect]);
  
  const handleRestart = () => {
    dispatch({ type: 'RESTART_GAME' });
  };

  const skipNarrative = () => {
    setNarrativeComplete(true);
    setCurrentParagraph(state.wasCorrect ? victoryParagraphs.length : getDefeatParagraphs('', '').length);
  };
  
  if (state.wasCorrect) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Background */}
        <div className="location-bg bg-ending-victory" />
        
        {/* Atmosphere */}
        <SmokeEffect density="medium" direction="up" />
        <Vignette intensity="medium" />
        <FilmGrain opacity={0.03} />
        
        {/* Content */}
        <div className="relative z-10 p-8 md:p-16 min-h-screen">
          <div className="scene-enter max-w-4xl mx-auto">
            {/* Header */}
            <header className="mb-12">
              <RevealText delay={0} duration={800} type="fade-up">
                <p className="text-xl md:text-2xl tracking-[0.3em] text-green-500 uppercase mb-3">
                  Case Closed
                </p>
              </RevealText>
              <RevealText delay={400} duration={1000} type="scale">
                <h1 className="font-display text-6xl md:text-8xl tracking-wide text-white flicker">
                  JUSTICE
                </h1>
              </RevealText>
              <div className="w-32 h-1 bg-green-500/60 mt-6" />
            </header>
            
            {/* Killer revealed with portrait */}
            <div className="flex items-start gap-6 mb-10 p-6 bg-black/40 backdrop-blur-sm border-l-4 border-green-500">
              <div className="flex-shrink-0 relative">
                <CharacterPortrait 
                  characterId={state.accusedSuspect} 
                  size={120}
                  className="killer-portrait"
                />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-green-600 text-white px-3 py-0.5 font-display text-sm tracking-wide">
                  GUILTY
                </div>
              </div>
              <div>
                <h2 className="font-display text-3xl md:text-4xl text-white mb-1">
                  {accusedCharacter.name}
                </h2>
                <p className="text-white/60 text-lg">{accusedCharacter.role}</p>
                <p className="text-green-400 text-lg mt-3 font-semibold">
                  The killer of Earl "Duke" Jeffries
                </p>
              </div>
            </div>
            
            {/* Narrative */}
            {showNarrative && (
              <div className="space-y-6 text-xl md:text-2xl text-white/80 leading-relaxed mb-10">
                {victoryParagraphs.map((para, index) => (
                  <div 
                    key={index}
                    className={`transition-opacity duration-500 ${index <= currentParagraph ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}
                  >
                    {index === currentParagraph && !narrativeComplete ? (
                      <TypewriterText
                        text={para}
                        speed={25}
                        onComplete={() => handleParagraphComplete(index)}
                        showCursor={true}
                        skipOnClick={true}
                        className={index === 2 ? 'italic text-white/70' : ''}
                      />
                    ) : index < currentParagraph || narrativeComplete ? (
                      <p className={index === 2 ? 'italic text-white/70' : ''}>{para}</p>
                    ) : null}
                  </div>
                ))}
                
                {narrativeComplete && (
                  <p className="text-jazz-amber italic mt-8 animate-fade-in">
                    Earl "Duke" Jeffries deserved better than to die in the back room of a Harlem club. 
                    But at least his killer didn't walk free. In this business, that's about as much 
                    justice as anyone can hope for.
                  </p>
                )}
              </div>
            )}
            
            {/* Skip button */}
            {showNarrative && !narrativeComplete && (
              <button
                onClick={skipNarrative}
                className="text-white/40 hover:text-white/60 text-sm mb-8 transition-colors"
              >
                Skip narrative →
              </button>
            )}
            
            {/* Victory stats */}
            {narrativeComplete && (
              <div className="mt-10 p-6 border border-green-500/30 bg-green-900/20 backdrop-blur-sm animate-fade-in">
                <h3 className="font-display text-3xl text-green-400 mb-4">CASE COMPLETE</h3>
                <p className="text-lg text-white/70 mb-4">
                  You've solved the murder of Earl "Duke" Jeffries. Your knowledge of the jazz scene 
                  and your detective instincts led you to the truth.
                </p>
                <div className="flex gap-8 text-white/50 text-sm">
                  <span>Evidence collected: {state.collectedClues.length} clues</span>
                  <span>Suspects interviewed: {state.interviewedCharacters?.length || 0}</span>
                </div>
              </div>
            )}
            
            {narrativeComplete && (
              <button
                onClick={handleRestart}
                className="mt-10 px-10 py-5 bg-green-600 text-white font-display tracking-wide 
                           hover:bg-green-500 hover:scale-105 transition-all duration-300 text-xl"
              >
                PLAY AGAIN
              </button>
            )}
          </div>
        </div>
        
        <style>{`
          .killer-portrait {
            animation: guiltyPulse 3s ease-in-out infinite;
          }
          @keyframes guiltyPulse {
            0%, 100% { 
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5), 
                          0 0 40px rgba(34, 197, 94, 0.3); 
            }
            50% { 
              box-shadow: 0 4px 30px rgba(34, 197, 94, 0.4), 
                          0 0 60px rgba(34, 197, 94, 0.5); 
            }
          }
          .animate-fade-in {
            animation: fadeIn 1s ease-out forwards;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    );
  }
  
  // Wrong accusation
  const defeatParagraphs = getDefeatParagraphs(accusedCharacter.name, killerCharacter.name);
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="location-bg bg-ending-defeat" />
      
      {/* Atmosphere - darker, more oppressive */}
      <SmokeEffect density="heavy" direction="up" color="rgba(100,100,100,0.03)" />
      <Vignette intensity="dramatic" />
      <FilmGrain opacity={0.05} />
      
      {/* Content */}
      <div className="relative z-10 p-8 md:p-16 min-h-screen">
        <div className="scene-enter max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-12">
            <RevealText delay={0} duration={800} type="fade-up">
              <p className="text-xl md:text-2xl tracking-[0.3em] text-red-500 uppercase mb-3">
                Case Closed — Wrongly
              </p>
            </RevealText>
            <RevealText delay={400} duration={1000} type="scale">
              <h1 className="font-display text-6xl md:text-8xl tracking-wide text-white flicker">
                INJUSTICE
              </h1>
            </RevealText>
            <div className="w-32 h-1 bg-red-500/60 mt-6" />
          </header>
          
          {/* Wrong accusation with portrait */}
          <div className="flex items-start gap-6 mb-10 p-6 bg-black/40 backdrop-blur-sm border-l-4 border-red-500">
            <div className="flex-shrink-0 relative">
              <CharacterPortrait 
                characterId={state.accusedSuspect} 
                size={120}
                className="wrong-portrait"
              />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-red-600 text-white px-3 py-0.5 font-display text-sm tracking-wide">
                INNOCENT
              </div>
            </div>
            <div>
              <h2 className="font-display text-3xl md:text-4xl text-white mb-1">
                {accusedCharacter.name}
              </h2>
              <p className="text-white/60 text-lg">{accusedCharacter.role}</p>
              <p className="text-red-400 text-lg mt-3 font-semibold">
                Wrongly accused
              </p>
            </div>
          </div>
          
          {/* Narrative */}
          {showNarrative && (
            <div className="space-y-6 text-xl md:text-2xl text-white/80 leading-relaxed mb-10">
              {defeatParagraphs.map((para, index) => (
                <div 
                  key={index}
                  className={`transition-opacity duration-500 ${index <= currentParagraph ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}
                >
                  {index === currentParagraph && !narrativeComplete ? (
                    <TypewriterText
                      text={para}
                      speed={25}
                      onComplete={() => handleParagraphComplete(index)}
                      showCursor={true}
                      skipOnClick={true}
                    />
                  ) : index < currentParagraph || narrativeComplete ? (
                    <p>{para}</p>
                  ) : null}
                </div>
              ))}
              
              {narrativeComplete && (
                <p className="text-red-400/80 italic mt-8 animate-fade-in">
                  Earl "Duke" Jeffries deserved better. So did you. But justice is a rare commodity 
                  in this business, and tonight it slipped through your fingers.
                </p>
              )}
            </div>
          )}
          
          {/* Skip button */}
          {showNarrative && !narrativeComplete && (
            <button
              onClick={skipNarrative}
              className="text-white/40 hover:text-white/60 text-sm mb-8 transition-colors"
            >
              Skip narrative →
            </button>
          )}
          
          {/* The real killer reveal */}
          {narrativeComplete && (
            <div className="mt-10 p-6 border border-red-500/30 bg-red-900/20 backdrop-blur-sm animate-fade-in">
              <h3 className="font-display text-3xl text-red-400 mb-6">THE TRUTH</h3>
              
              <div className="flex items-start gap-6 mb-6">
                <div className="flex-shrink-0 relative">
                  <CharacterPortrait 
                    characterId={THE_KILLER} 
                    size={100}
                    className="real-killer-portrait"
                  />
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-black text-red-500 px-2 py-0.5 font-display text-xs tracking-wide border border-red-500">
                    KILLER
                  </div>
                </div>
                <div>
                  <p className="text-lg text-white/70">
                    <strong className="text-white">{killerCharacter.name}</strong> killed Earl Jeffries. 
                    The evidence was there — the gambling debt, the threats on tape, the missing 20 minutes 
                    during the second set, the fact that Earl was about to leave The Ember Room for good.
                  </p>
                </div>
              </div>
              
              <p className="text-sm text-white/50">
                Review your clues and try again. The truth is in the details.
              </p>
            </div>
          )}
          
          {narrativeComplete && (
            <button
              onClick={handleRestart}
              className="mt-10 px-10 py-5 bg-red-600 text-white font-display tracking-wide 
                         hover:bg-red-500 hover:scale-105 transition-all duration-300 text-xl"
            >
              TRY AGAIN
            </button>
          )}
        </div>
      </div>
      
      <style>{`
        .wrong-portrait {
          animation: wrongPulse 3s ease-in-out infinite;
          filter: grayscale(30%);
        }
        @keyframes wrongPulse {
          0%, 100% { 
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5), 
                        0 0 40px rgba(220, 38, 38, 0.2); 
          }
          50% { 
            box-shadow: 0 4px 30px rgba(220, 38, 38, 0.3), 
                        0 0 60px rgba(220, 38, 38, 0.4); 
          }
        }
        .real-killer-portrait {
          animation: killerReveal 2s ease-in-out infinite;
        }
        @keyframes killerReveal {
          0%, 100% { 
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.8), 
                        0 0 30px rgba(220, 38, 38, 0.5); 
          }
          50% { 
            box-shadow: 0 4px 30px rgba(220, 38, 38, 0.6), 
                        0 0 50px rgba(220, 38, 38, 0.7); 
          }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
