/**
 * useUISounds - Easy UI sound effects hook
 * 
 * Provides simple methods for common UI sounds
 * Works even when audio not yet initialized (sounds will play after user interaction)
 */
import { useCallback } from 'react';
import { useAudio } from '../context/AudioContextEnhanced';

export function useUISounds() {
  const { playSFX, TRIGGERS } = useAudio();
  
  // Wrap playSFX to handle any errors gracefully
  const safePlay = useCallback((trigger) => {
    try {
      playSFX(trigger);
    } catch (e) {
      // Silently fail - audio might not be ready
    }
  }, [playSFX]);
  
  const playClick = useCallback(() => {
    safePlay(TRIGGERS.MENU_SELECT);
  }, [safePlay, TRIGGERS]);
  
  const playHover = useCallback(() => {
    safePlay(TRIGGERS.MENU_HOVER);
  }, [safePlay, TRIGGERS]);
  
  const playPageFlip = useCallback(() => {
    safePlay(TRIGGERS.PAGE_FLIP);
  }, [safePlay, TRIGGERS]);
  
  const playClueFound = useCallback(() => {
    safePlay(TRIGGERS.CLUE_FOUND);
  }, [safePlay, TRIGGERS]);
  
  const playRevelation = useCallback(() => {
    safePlay(TRIGGERS.REVELATION);
  }, [safePlay, TRIGGERS]);
  
  const playCorrect = useCallback(() => {
    safePlay(TRIGGERS.JAZZ_TRIVIA_CORRECT);
  }, [safePlay, TRIGGERS]);
  
  const playWrong = useCallback(() => {
    safePlay(TRIGGERS.JAZZ_TRIVIA_WRONG);
  }, [safePlay, TRIGGERS]);
  
  const playDialogueAdvance = useCallback(() => {
    safePlay(TRIGGERS.DIALOGUE_ADVANCE);
  }, [safePlay, TRIGGERS]);
  
  const playTimelinePlace = useCallback(() => {
    safePlay(TRIGGERS.TIMELINE_PLACE);
  }, [safePlay, TRIGGERS]);
  
  const playContradiction = useCallback(() => {
    safePlay(TRIGGERS.TIMELINE_CONTRADICTION);
  }, [safePlay, TRIGGERS]);
  
  return {
    playClick,
    playHover,
    playPageFlip,
    playClueFound,
    playRevelation,
    playCorrect,
    playWrong,
    playDialogueAdvance,
    playTimelinePlace,
    playContradiction,
  };
}

export default useUISounds;
