// Re-export from VoiceContext for backwards compatibility
// New code should import directly from '../context/VoiceContext'

import { useVoiceContext } from '../context/VoiceContext';
import { isSpeechSupported, getAvailableVoices } from '../services/speechService';

/**
 * @deprecated Use useVoiceContext from '../context/VoiceContext' instead
 */
export function useVoice() {
  const context = useVoiceContext();
  
  return {
    ...context,
    checkStatus: () => ({
      valid: isSpeechSupported(),
      voices: getAvailableVoices(),
    }),
  };
}

export default useVoice;
