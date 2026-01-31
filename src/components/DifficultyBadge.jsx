import { useGame } from '../context/GameContext';
import Tooltip from './Tooltip';

export default function DifficultyBadge() {
  const { state } = useGame();
  
  if (!state.difficulty) return null;
  
  const isNovice = state.difficulty === 'novice';
  
  return (
    <Tooltip 
      content={isNovice 
        ? "Novice Mode: Easier trivia with hints provided" 
        : "Expert Mode: Full jazz knowledge challenge"
      }
    >
      <div className={`
        inline-flex items-center gap-2 px-3 py-1.5 rounded-sm text-sm font-medium tracking-wide
        ${isNovice 
          ? 'bg-jazz-blue/20 text-jazz-blue border border-jazz-blue/30' 
          : 'bg-jazz-amber/20 text-jazz-amber border border-jazz-amber/30'
        }
      `}>
        <span className="text-base">{isNovice ? '🎵' : '🎷'}</span>
        <span className="uppercase text-xs">
          {isNovice ? 'Novice' : 'Expert'}
        </span>
      </div>
    </Tooltip>
  );
}
