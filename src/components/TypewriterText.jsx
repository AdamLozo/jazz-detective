/**
 * TypewriterText - Dramatic character-by-character text reveal
 * 
 * Features:
 * - Variable typing speed with natural rhythm
 * - Dramatic pauses after punctuation
 * - Slight randomization for organic feel
 * - Skip functionality (click to complete)
 * - Cursor animation
 * - Emotion-based speed modifiers
 */
import { useState, useEffect, useRef, useCallback } from 'react';

// Character categories for variable speed
const FAST_CHARS = new Set(['e', 't', 'a', 'o', 'i', 'n', 's', 'r', 'h', 'l', ' ']);
const SLOW_CHARS = new Set(['q', 'z', 'x', 'j', 'k', 'v', 'w', 'y']);

// Quote characters for pause detection (curly and straight quotes)
const QUOTE_CHARS = ['"', '"', '"', "'", "'", "'"];

export function TypewriterText({
  text,
  speed = 40,
  onComplete,
  className = '',
  showCursor = true,
  skipOnClick = true,
  startDelay = 0,
  dramaticPauses = true,
  naturalRhythm = true, // Adds slight randomization
  emotionSpeed = 'normal', // 'slow' for dramatic, 'fast' for urgent, 'normal'
}) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const indexRef = useRef(0);
  const timeoutRef = useRef(null);

  // Emotion-based speed multiplier
  const getEmotionMultiplier = useCallback(() => {
    switch (emotionSpeed) {
      case 'slow': return 1.5;
      case 'fast': return 0.6;
      case 'dramatic': return 1.8;
      default: return 1;
    }
  }, [emotionSpeed]);

  // Calculate delay for current character (dramatic pauses + natural variation)
  const getCharDelay = useCallback((char, nextChar, prevChar) => {
    const emotionMult = getEmotionMultiplier();
    let delay = speed * emotionMult;
    
    if (dramaticPauses) {
      // Long pause after sentence-ending punctuation
      if (['.', '!', '?'].includes(char)) {
        // Extra long if followed by space (end of sentence)
        if (nextChar === ' ' || nextChar === undefined) {
          delay = speed * 12 * emotionMult;
        } else {
          // Part of ellipsis or abbreviation
          delay = speed * 2 * emotionMult;
        }
      }
      // Handle ellipsis (...)
      else if (char === '.' && prevChar === '.') {
        delay = speed * 6 * emotionMult;
      }
      // Medium pause after commas
      else if (char === ',') {
        delay = speed * 4 * emotionMult;
      }
      // Pause for semicolons and colons
      else if ([';', ':'].includes(char)) {
        delay = speed * 5 * emotionMult;
      }
      // Pause for em-dashes (dramatic effect)
      else if (char === '—' || char === '–') {
        delay = speed * 6 * emotionMult;
      }
      // Brief pause after closing quotes
      else if (QUOTE_CHARS.includes(char) && nextChar === ' ') {
        delay = speed * 2.5 * emotionMult;
      }
      // Slight pause before opening quotes
      else if (QUOTE_CHARS.includes(char) && prevChar === ' ') {
        delay = speed * 1.5 * emotionMult;
      }
      // Pause at paragraph breaks
      else if (char === '\n') {
        delay = speed * 8 * emotionMult;
      }
    }
    
    // Natural rhythm variation based on character
    if (naturalRhythm) {
      const lowerChar = char.toLowerCase();
      
      // Common letters are typed faster
      if (FAST_CHARS.has(lowerChar)) {
        delay *= 0.85;
      }
      // Uncommon letters are typed slower
      else if (SLOW_CHARS.has(lowerChar)) {
        delay *= 1.2;
      }
      
      // Add slight randomization (±15%)
      const variance = 0.15;
      const randomFactor = 1 + (Math.random() * variance * 2 - variance);
      delay *= randomFactor;
    }
    
    // Ensure minimum delay for readability
    return Math.max(delay, 15);
  }, [speed, dramaticPauses, naturalRhythm, getEmotionMultiplier]);

  // Type next character
  const typeNextChar = useCallback(() => {
    if (indexRef.current < text.length) {
      const currentChar = text[indexRef.current];
      const nextChar = text[indexRef.current + 1] || '';
      const prevChar = text[indexRef.current - 1] || '';
      
      setDisplayedText(text.slice(0, indexRef.current + 1));
      indexRef.current++;
      
      const delay = getCharDelay(currentChar, nextChar, prevChar);
      timeoutRef.current = setTimeout(typeNextChar, delay);
    } else {
      setIsComplete(true);
      onComplete?.();
    }
  }, [text, getCharDelay, onComplete]);

  // Start typing after delay
  useEffect(() => {
    const startTimer = setTimeout(() => {
      setHasStarted(true);
      typeNextChar();
    }, startDelay);

    return () => {
      clearTimeout(startTimer);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [startDelay, typeNextChar]);

  // Skip to end on click
  const handleSkip = useCallback(() => {
    if (skipOnClick && !isComplete) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setDisplayedText(text);
      setIsComplete(true);
      onComplete?.();
    }
  }, [skipOnClick, isComplete, text, onComplete]);

  // Reset when text changes
  useEffect(() => {
    indexRef.current = 0;
    setDisplayedText('');
    setIsComplete(false);
    setHasStarted(false);
  }, [text]);

  return (
    <span 
      className={`typewriter-container ${className} ${skipOnClick && !isComplete ? 'cursor-pointer' : ''}`}
      onClick={handleSkip}
    >
      {displayedText}
      {showCursor && hasStarted && !isComplete && (
        <span className="typewriter-cursor">|</span>
      )}
      
      <style>{`
        .typewriter-cursor {
          animation: cursorBlink 0.7s ease-in-out infinite;
          margin-left: 1px;
          font-weight: 100;
          color: currentColor;
          opacity: 0.8;
        }
        
        @keyframes cursorBlink {
          0%, 45% { opacity: 0.8; }
          50%, 100% { opacity: 0; }
        }
        
        /* Subtle text shadow for just-typed characters */
        .typewriter-container {
          text-shadow: 0 0 0 transparent;
        }
      `}</style>
    </span>
  );
}

/**
 * TypewriterParagraph - Full paragraph with typewriter effect
 */
export function TypewriterParagraph({
  text,
  speed = 35,
  onComplete,
  className = '',
  showSkipHint = true,
  emotionSpeed = 'normal',
}) {
  const [isComplete, setIsComplete] = useState(false);

  const handleComplete = () => {
    setIsComplete(true);
    onComplete?.();
  };

  return (
    <div className={className}>
      <TypewriterText
        text={text}
        speed={speed}
        onComplete={handleComplete}
        showCursor={true}
        skipOnClick={true}
        emotionSpeed={emotionSpeed}
      />
      
      {!isComplete && showSkipHint && (
        <p className="text-white/30 text-lg mt-4 animate-pulse">
          Click to skip...
        </p>
      )}
    </div>
  );
}

/**
 * TypewriterSequence - Multiple paragraphs revealed in sequence
 */
export function TypewriterSequence({
  paragraphs,
  speed = 35,
  paragraphDelay = 500,
  onComplete,
  onParagraphComplete,
  className = '',
  paragraphClassName = '',
  emotionSpeed = 'normal',
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedParagraphs, setCompletedParagraphs] = useState([]);

  const handleParagraphComplete = useCallback(() => {
    const completedText = paragraphs[currentIndex];
    setCompletedParagraphs(prev => [...prev, completedText]);
    onParagraphComplete?.(currentIndex, completedText);
    
    if (currentIndex < paragraphs.length - 1) {
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, paragraphDelay);
    } else {
      onComplete?.();
    }
  }, [currentIndex, paragraphs, paragraphDelay, onComplete, onParagraphComplete]);

  return (
    <div className={className}>
      {/* Completed paragraphs */}
      {completedParagraphs.map((text, i) => (
        <p key={i} className={`${paragraphClassName} mb-6`}>
          {text}
        </p>
      ))}
      
      {/* Currently typing paragraph */}
      {currentIndex < paragraphs.length && !completedParagraphs.includes(paragraphs[currentIndex]) && (
        <TypewriterParagraph
          text={paragraphs[currentIndex]}
          speed={speed}
          onComplete={handleParagraphComplete}
          className={paragraphClassName}
          showSkipHint={true}
          emotionSpeed={emotionSpeed}
        />
      )}
    </div>
  );
}

/**
 * DramaticReveal - Text that appears word by word with fade
 */
export function DramaticReveal({
  text,
  wordDelay = 150,
  onComplete,
  className = '',
}) {
  const words = text.split(' ');
  const [visibleWords, setVisibleWords] = useState(0);

  useEffect(() => {
    if (visibleWords < words.length) {
      const timer = setTimeout(() => {
        setVisibleWords(prev => prev + 1);
      }, wordDelay);
      return () => clearTimeout(timer);
    } else {
      onComplete?.();
    }
  }, [visibleWords, words.length, wordDelay, onComplete]);

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className={`transition-all duration-500 inline-block mr-[0.3em] ${
            i < visibleWords 
              ? 'opacity-100 translate-y-0 blur-0' 
              : 'opacity-0 translate-y-2 blur-sm'
          }`}
        >
          {word}
        </span>
      ))}
    </span>
  );
}

/**
 * NoirTypewriter - Specialized for noir dialogue with emotion detection
 * Automatically adjusts speed based on dialogue content
 */
export function NoirTypewriter({
  text,
  speaker,
  onComplete,
  className = '',
  baseSpeed = 35,
}) {
  // Detect emotion from text content
  const detectEmotion = useCallback((text) => {
    const lowerText = text.toLowerCase();
    
    // Urgent/angry indicators
    if (text.includes('!') || lowerText.includes('damn') || lowerText.includes('hell')) {
      return 'fast';
    }
    // Dramatic/mysterious indicators
    if (text.includes('...') || text.includes('—') || lowerText.includes('murder') || lowerText.includes('dead')) {
      return 'dramatic';
    }
    // Slow/sad indicators
    if (lowerText.includes('sorry') || lowerText.includes('loved') || lowerText.includes('miss')) {
      return 'slow';
    }
    
    return 'normal';
  }, []);

  const emotion = detectEmotion(text);

  return (
    <TypewriterText
      text={text}
      speed={baseSpeed}
      onComplete={onComplete}
      className={className}
      showCursor={true}
      skipOnClick={true}
      dramaticPauses={true}
      naturalRhythm={true}
      emotionSpeed={emotion}
    />
  );
}

export default TypewriterText;
