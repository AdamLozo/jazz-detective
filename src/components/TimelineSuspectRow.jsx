import { useDroppable } from '@dnd-kit/core';
import { motion, AnimatePresence } from 'framer-motion';
import { timeToPosition, MURDER_TIME } from '../data/timelineEvents';

export default function TimelineSuspectRow({ 
  suspect, 
  hasAlibi, 
  placedEvents, 
  onRemoveEvent,
  discoveredContradictions 
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: `suspect-row-${suspect.id}`,
  });

  const noAlibiDuringMurder = !hasAlibi && placedEvents.length > 0;
  const firstName = suspect.name.split(' ')[0];

  return (
    <div
      ref={setNodeRef}
      className={`
        relative flex items-stretch min-h-[64px] rounded-lg transition-all duration-200
        ${isOver 
          ? 'bg-amber-500/15 ring-1 ring-amber-400/40' 
          : 'bg-white/[0.03] hover:bg-white/[0.05]'}
      `}
    >
      {/* Suspect Label */}
      <div 
        className={`
          w-32 flex-shrink-0 flex items-center gap-2 px-3 rounded-l-lg
          border-r border-white/5
          ${hasAlibi ? 'bg-green-500/15' : noAlibiDuringMurder ? 'bg-red-500/15' : ''}
        `}
      >
        {/* Status indicator */}
        <div 
          className={`
            w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0
            ${hasAlibi 
              ? 'bg-green-500/30 text-green-300 ring-1 ring-green-400/30' 
              : noAlibiDuringMurder 
                ? 'bg-red-500/30 text-red-300 ring-1 ring-red-400/30' 
                : 'bg-white/10 text-white/40'}
          `}
        >
          {hasAlibi ? '✓' : noAlibiDuringMurder ? '?' : '•'}
        </div>
        
        {/* Name */}
        <div className="flex-1 min-w-0">
          <div className={`
            text-sm font-semibold truncate
            ${hasAlibi ? 'text-green-300' : noAlibiDuringMurder ? 'text-red-300' : 'text-white'}
          `}>
            {firstName}
          </div>
          {hasAlibi && (
            <div className="text-[10px] text-green-400/80 uppercase tracking-wider font-medium">
              Cleared
            </div>
          )}
          {noAlibiDuringMurder && (
            <div className="text-[10px] text-red-400/80 uppercase tracking-wider font-medium">
              No Alibi
            </div>
          )}
        </div>
      </div>

      {/* Timeline Track */}
      <div className="flex-1 relative mx-2 my-2">
        {/* Hour grid lines */}
        <div className="absolute inset-0">
          {[20, 21, 22, 23, 24, 25, 26, 27].map(hour => (
            <div
              key={hour}
              className="absolute h-full w-px bg-white/5"
              style={{ left: `${timeToPosition(hour)}%` }}
            />
          ))}
        </div>

        {/* Murder time line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-red-500/40"
          style={{ left: `${timeToPosition(MURDER_TIME)}%` }}
        />

        {/* Placed Events */}
        <AnimatePresence mode="popLayout">
          {placedEvents.map((event, index) => {
            const startPos = timeToPosition(event.startHour);
            const endPos = event.endHour ? timeToPosition(event.endHour) : startPos + 4;
            const width = Math.max(endPos - startPos, 8);
            
            const isContradiction = event.isContradiction || 
              discoveredContradictions.some(cId => event.contradictsEvent);

            // Card colors based on type
            const getCardStyle = () => {
              if (event.isAlibi) {
                return {
                  bg: 'linear-gradient(135deg, #166534 0%, #14532d 100%)',
                  border: '#22c55e',
                  text: '#bbf7d0',
                };
              }
              if (event.type === 'sighting') {
                return {
                  bg: 'linear-gradient(135deg, #92400e 0%, #78350f 100%)',
                  border: '#f59e0b',
                  text: '#fef3c7',
                };
              }
              if (event.type === 'gap' || event.isContradiction) {
                return {
                  bg: 'linear-gradient(135deg, #991b1b 0%, #7f1d1d 100%)',
                  border: '#ef4444',
                  text: '#fecaca',
                };
              }
              return {
                bg: 'linear-gradient(135deg, #334155 0%, #1e293b 100%)',
                border: '#64748b',
                text: '#e2e8f0',
              };
            };

            const style = getCardStyle();

            return (
              <motion.div
                key={event.id}
                className="absolute top-1 bottom-1 rounded cursor-pointer overflow-hidden group"
                style={{
                  left: `${startPos}%`,
                  width: `${width}%`,
                  minWidth: '90px',
                  background: style.bg,
                  borderLeft: `3px solid ${style.border}`,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                }}
                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                whileHover={{ 
                  scale: 1.03, 
                  y: -2,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                layout
                title={`${event.description}\n\nClick to remove`}
                onClick={() => onRemoveEvent(event.id)}
              >
                {/* Card content */}
                <div className="h-full flex items-center px-2 py-1">
                  <span 
                    className="text-xs font-medium leading-tight"
                    style={{ color: style.text }}
                  >
                    {event.label}
                  </span>
                </div>
                
                {/* Remove X on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-lg font-bold">
                    ✕
                  </span>
                </div>

                {/* Contradiction badge */}
                {isContradiction && (
                  <motion.div 
                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <span className="text-white text-xs font-bold">!</span>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Drop hint when dragging over */}
        <AnimatePresence>
          {isOver && (
            <motion.div 
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="px-4 py-2 bg-amber-500/20 border border-amber-400/50 rounded-lg backdrop-blur-sm"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
              >
                <span className="text-amber-200 text-sm font-medium">Drop here</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
