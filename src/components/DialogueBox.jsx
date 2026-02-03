import { useState, useEffect, useRef } from 'react';
import { useGame } from '../context/GameContext';
import { useVoiceContext } from '../context/VoiceContext';
import { dialogueTrees, getDialogueNode } from '../data/dialogue';
import { speakerToCharacterId } from '../services/elevenlabs';
import CharacterPortrait from './CharacterPortrait';

export default function DialogueBox({ character, onClose }) {
  const { state, dispatch } = useGame();
  const { enabled: voiceEnabled, speak, stop, preload, isPlaying, isLoading } = useVoiceContext();
  const [currentNode, setCurrentNode] = useState(null);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showResponses, setShowResponses] = useState(false);
  const typeIntervalRef = useRef(null);
  const currentNodeIdRef = useRef(null);
  const mountedRef = useRef(true);
  
  // Initialize dialogue for character
  useEffect(() => {
    mountedRef.current = true;
    
    const initialNode = getDialogueNode(character.initialDialogue, state.difficulty) || dialogueTrees[character.initialDialogue];
    if (!initialNode) return;
    
    if (typeIntervalRef.current) {
      clearInterval(typeIntervalRef.current);
      typeIntervalRef.current = null;
    }
    
    setCurrentNode(initialNode);
    currentNodeIdRef.current = character.initialDialogue;
    setIsTyping(true);
    setShowResponses(false);
    setDisplayedText('');
    
    let index = 0;
    typeIntervalRef.current = setInterval(() => {
      if (!mountedRef.current) {
        clearInterval(typeIntervalRef.current);
        typeIntervalRef.current = null;
        return;
      }
      
      if (index < initialNode.text.length) {
        setDisplayedText(initialNode.text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typeIntervalRef.current);
        typeIntervalRef.current = null;
        setIsTyping(false);
        setShowResponses(true);
      }
    }, 25);
    
    dispatch({ 
      type: 'VISIT_DIALOGUE_NODE', 
      payload: { characterId: character.id, nodeId: character.initialDialogue } 
    });
    
    if (voiceEnabled) {
      const charId = speakerToCharacterId(initialNode.speaker);
      speak(initialNode.text, charId, 'dialogue');
    }
    
    dispatch({ type: 'MARK_INTERVIEWED', payload: character.id });
    
    return () => {
      mountedRef.current = false;
      if (typeIntervalRef.current) {
        clearInterval(typeIntervalRef.current);
        typeIntervalRef.current = null;
      }
    };
  }, [character.id, character.initialDialogue]); // eslint-disable-line react-hooks/exhaustive-deps
  
  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);
  
  const typeText = (text) => {
    setIsTyping(true);
    setShowResponses(false);
    setDisplayedText('');
    
    if (typeIntervalRef.current) {
      clearInterval(typeIntervalRef.current);
    }
    
    let index = 0;
    typeIntervalRef.current = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typeIntervalRef.current);
        typeIntervalRef.current = null;
        setIsTyping(false);
        setShowResponses(true);
        
        if (voiceEnabled && currentNode?.responses) {
          currentNode.responses.slice(0, 2).forEach(response => {
            if (response.next) {
              const nextNode = getDialogueNode(response.next, state.difficulty) || dialogueTrees[response.next];
              if (nextNode) {
                const charId = speakerToCharacterId(nextNode.speaker);
                preload(nextNode.text, charId, 'dialogue');
              }
            }
          });
        }
      }
    }, 25);
  };
  
  const skipTyping = () => {
    if (isTyping && currentNode) {
      if (typeIntervalRef.current) {
        clearInterval(typeIntervalRef.current);
        typeIntervalRef.current = null;
      }
      setDisplayedText(currentNode.text);
      setIsTyping(false);
      setShowResponses(true);
    }
  };
  
  const selectResponse = (response) => {
    if (currentNode.setsFlag) {
      dispatch({ 
        type: 'SET_DIALOGUE_FLAG', 
        payload: { key: currentNode.setsFlag, value: true } 
      });
    }
    
    if (response.next === null) {
      stop();
      onClose();
      return;
    }
    
    const nextNode = getDialogueNode(response.next, state.difficulty) || dialogueTrees[response.next];
    if (nextNode) {
      dispatch({ 
        type: 'VISIT_DIALOGUE_NODE', 
        payload: { characterId: character.id, nodeId: response.next } 
      });
      
      if (nextNode.setsFlag) {
        dispatch({ 
          type: 'SET_DIALOGUE_FLAG', 
          payload: { key: nextNode.setsFlag, value: true } 
        });
      }
      
      stop();
      setCurrentNode(nextNode);
      currentNodeIdRef.current = response.next;
      typeText(nextNode.text);
      
      if (voiceEnabled) {
        const charId = speakerToCharacterId(nextNode.speaker);
        speak(nextNode.text, charId, 'dialogue');
      }
    }
  };
  
  const getAvailableResponses = () => {
    if (!currentNode?.responses) return [];
    
    return currentNode.responses.filter(response => {
      if (response.requiresClue) {
        const hasClue = state.collectedClues.find(c => c.id === response.requiresClue);
        if (!hasClue) return false;
      }
      
      if (response.requiresFlag) {
        if (!state.dialogueFlags[response.requiresFlag]) return false;
      }
      
      return true;
    });
  };
  
  if (!currentNode) return null;
  
  const availableResponses = getAvailableResponses();
  const isSuspect = character.isSuspect;
  
  return (
    <div 
      className="min-h-screen p-4 sm:p-6 md:p-10 pb-24 sm:pb-28 vignette paper-texture relative"
      onClick={isTyping ? skipTyping : undefined}
    >
      {/* Atmospheric elements - hidden on mobile for performance */}
      <div className="smoke hidden sm:block" style={{ bottom: '30%', right: '5%' }} />
      
      <div className="scene-enter max-w-6xl mx-auto">
        {/* Character header with portrait - stacks on mobile */}
        <header className="mb-6 sm:mb-12 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-8">
          {/* Portrait */}
          <div className="flex-shrink-0 relative">
            <CharacterPortrait 
              characterId={character.id} 
              size={100}
              isSpeaking={isTyping || isPlaying}
              className="portrait-glow sm:w-[140px] sm:h-[140px] md:w-[180px] md:h-[180px]"
            />
            {/* Suspect indicator */}
            {isSuspect && (
              <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-jazz-amber text-jazz-black px-2 py-0.5 sm:px-3 sm:py-1 text-sm sm:text-xl font-display tracking-wide transform rotate-12">
                SUSPECT
              </div>
            )}
          </div>
          
          {/* Character info */}
          <div className="flex-1 text-center sm:text-left sm:pt-4">
            <p className="text-base sm:text-2xl md:text-3xl tracking-[0.2em] sm:tracking-[0.3em] text-jazz-black/40 uppercase mb-1 sm:mb-2">
              Interviewing
            </p>
            <h1 className="font-display text-3xl sm:text-5xl md:text-7xl tracking-wide text-jazz-black flicker leading-tight">
              {character.name}
            </h1>
            <p className="text-jazz-amber text-xl sm:text-3xl md:text-4xl mt-1 sm:mt-2">{character.role}</p>
            <div className="w-20 sm:w-32 h-1 bg-jazz-amber/60 mt-3 sm:mt-6 mx-auto sm:mx-0" />
          </div>
        </header>
        
        {/* Jazz Trivia Indicator */}
        {currentNode.isJazzTrivia && (
          <div className="mb-4 sm:mb-6 bg-jazz-blue/20 border-2 border-jazz-blue/60 p-3 sm:p-4 md:p-6 animate-pulse-subtle">
            <div className="flex items-start sm:items-center gap-3 sm:gap-4">
              <span className="text-2xl sm:text-4xl">🎷</span>
              <div>
                <p className="font-display text-lg sm:text-2xl md:text-3xl text-jazz-blue tracking-wider uppercase">Jazz Knowledge Test</p>
                <p className="text-sm sm:text-xl text-jazz-black/60 mt-1">Your expertise will determine what information you can unlock</p>
                {state.difficulty === 'novice' && currentNode.triviaHint && (
                  <p className="text-sm sm:text-lg text-jazz-amber mt-2 sm:mt-3 italic border-l-2 border-jazz-amber/40 pl-2 sm:pl-3">
                    💡 Hint: {currentNode.triviaHint}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Dialogue content */}
        <div className={`border-l-4 p-4 sm:p-8 md:p-12 mb-6 sm:mb-10 ${currentNode.isJazzTrivia ? 'bg-jazz-blue/10 border-jazz-blue/60' : 'bg-jazz-black/5 border-jazz-amber/40'}`}>
          {/* Speaker indicator */}
          <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-6">
            <CharacterPortrait 
              characterId={character.id} 
              size={32}
              isSpeaking={isTyping || isPlaying}
              className="sm:w-12 sm:h-12"
            />
            <p className="font-display text-xl sm:text-3xl md:text-4xl text-jazz-blue tracking-wide">
              {currentNode.speaker}
            </p>
            {/* Voice playing indicator */}
            {(isPlaying || isLoading) && voiceEnabled && (
              <span className="flex items-center gap-1 ml-2">
                {isLoading ? (
                  <span className="w-2 h-2 bg-jazz-amber rounded-full animate-pulse" />
                ) : (
                  <>
                    <span className="w-1 h-2 sm:h-3 bg-jazz-amber animate-pulse" style={{ animationDelay: '0ms' }} />
                    <span className="w-1 h-3 sm:h-4 bg-jazz-amber animate-pulse" style={{ animationDelay: '150ms' }} />
                    <span className="w-1 h-1.5 sm:h-2 bg-jazz-amber animate-pulse" style={{ animationDelay: '300ms' }} />
                  </>
                )}
              </span>
            )}
          </div>
          
          {/* Dialogue text */}
          <p className="text-xl sm:text-3xl md:text-4xl lg:text-5xl leading-relaxed text-jazz-black/90">
            "{displayedText}"
            {isTyping && <span className="animate-pulse">|</span>}
          </p>
          
          {isTyping && (
            <p className="text-jazz-black/40 mt-3 sm:mt-6 text-sm sm:text-2xl">Tap to skip...</p>
          )}
        </div>
        
        {/* Response options */}
        {showResponses && (
          <div className="space-y-3 sm:space-y-4 mb-20 sm:mb-0">
            <p className="text-base sm:text-2xl md:text-3xl tracking-[0.15em] sm:tracking-[0.2em] text-jazz-black/40 uppercase mb-3 sm:mb-6">
              Your Response
            </p>
            {availableResponses.map((response, index) => {
              const isCorrectAnswer = response.passesCheck;
              const isWrongAnswer = response.failsCheck;
              const isTriviaResponse = currentNode.isJazzTrivia && (isCorrectAnswer || isWrongAnswer);
              
              return (
                <button
                  key={index}
                  onClick={() => selectResponse(response)}
                  className={`choice-btn-enhanced text-left ${isTriviaResponse ? 'trivia-choice' : ''}`}
                >
                  <span className={`mr-2 sm:mr-4 text-xl sm:text-3xl ${currentNode.isJazzTrivia ? 'text-jazz-blue' : 'text-jazz-amber'}`}>→</span>
                  <span className="text-base sm:text-2xl md:text-3xl lg:text-4xl">{response.text}</span>
                  
                  {/* Evidence tags - hidden on small mobile */}
                  {response.requiresClue && (
                    <span className="hidden sm:inline ml-4 text-jazz-blue/60 text-lg sm:text-2xl">[Uses evidence]</span>
                  )}
                  {response.requiresFlag && (
                    <span className="hidden sm:inline ml-4 text-jazz-blue/60 text-lg sm:text-2xl">[New info available]</span>
                  )}
                  
                  {isTriviaResponse && (
                    <span className="hidden sm:inline ml-4 text-jazz-blue/40 text-base sm:text-xl italic">[Test your knowledge]</span>
                  )}
                </button>
              );
            })}
          </div>
        )}
        
        {/* Back button - fixed at bottom with safe area */}
        <div className="fixed bottom-0 left-0 right-0 sm:bottom-10 sm:left-10 sm:right-auto bg-jazz-cream/95 sm:bg-transparent p-3 sm:p-0 safe-area-bottom z-40">
          <button
            onClick={() => {
              stop();
              onClose();
            }}
            className="btn-noir w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-5 bg-jazz-black/80 text-jazz-cream font-display tracking-wide text-lg sm:text-2xl md:text-3xl"
          >
            ← END CONVERSATION
          </button>
        </div>
        
        {/* Evidence count - hidden on mobile, shown on tablet+ */}
        <div className="hidden sm:block fixed bottom-10 right-10 text-right">
          <p className="text-jazz-black/40 text-xl sm:text-2xl">Evidence collected</p>
          <p className="font-display text-4xl sm:text-5xl text-jazz-amber">{state.collectedClues.length}</p>
        </div>
      </div>
      
      {/* Portrait glow style */}
      <style>{`
        .portrait-glow {
          animation: portraitPulse 4s ease-in-out infinite;
        }
        @keyframes portraitPulse {
          0%, 100% { box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5), inset 0 0 30px rgba(212, 165, 116, 0.1); }
          50% { box-shadow: 0 4px 30px rgba(212, 165, 116, 0.3), inset 0 0 40px rgba(212, 165, 116, 0.15); }
        }
        .animate-pulse-subtle {
          animation: pulseSoft 2s ease-in-out infinite;
        }
        @keyframes pulseSoft {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.85; }
        }
        .trivia-choice:hover {
          border-color: rgba(59, 130, 246, 0.6) !important;
          background: rgba(59, 130, 246, 0.1) !important;
        }
      `}</style>
    </div>
  );
}
