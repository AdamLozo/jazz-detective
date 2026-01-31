import { useVoiceContext } from '../context/VoiceContext';

/**
 * Global voice toggle button
 * Shows in corner of screen, persists across all game screens
 */
export default function VoiceToggle() {
  const { enabled, toggle, isLoading, isPlaying } = useVoiceContext();

  return (
    <button
      onClick={toggle}
      className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 shadow-lg ${
        enabled 
          ? 'bg-jazz-amber/90 text-jazz-black hover:bg-jazz-amber' 
          : 'bg-black/70 text-light border border-white/20 hover:bg-black/80'
      }`}
      title={enabled ? 'Voice Narration On' : 'Voice Narration Off'}
    >
      {/* Speaker Icon */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="18" 
        height="18" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        {enabled ? (
          <>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </>
        ) : (
          <>
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </>
        )}
      </svg>
      
      <span className="text-sm font-medium tracking-wide">
        {enabled ? 'VOICE' : 'MUTED'}
      </span>
      
      {/* Loading/Playing indicator */}
      {isLoading && (
        <span className="w-2 h-2 bg-current rounded-full animate-pulse" />
      )}
      {isPlaying && !isLoading && (
        <span className="flex items-center gap-0.5">
          <span className="w-0.5 h-3 bg-current animate-pulse" style={{ animationDelay: '0ms' }} />
          <span className="w-0.5 h-4 bg-current animate-pulse" style={{ animationDelay: '150ms' }} />
          <span className="w-0.5 h-2 bg-current animate-pulse" style={{ animationDelay: '300ms' }} />
        </span>
      )}
    </button>
  );
}
