import { motion } from 'framer-motion';
import TimelineDraggableEvent from './TimelineDraggableEvent';

export default function TimelineEvidenceTray({ availableEvents, onClickPlace }) {
  if (availableEvents.length === 0) {
    return (
      <div 
        className="mt-4 p-6 rounded-xl text-center"
        style={{
          background: 'rgba(15, 12, 10, 0.85)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <p className="text-amber-400 text-sm font-medium">All Evidence Placed</p>
        <p className="text-white/50 text-xs mt-1">
          Find more clues to unlock additional timeline events
        </p>
      </div>
    );
  }

  // Group events by suspect
  const eventsBySuspect = availableEvents.reduce((acc, event) => {
    const key = event.suspect || 'other';
    if (!acc[key]) acc[key] = [];
    acc[key].push(event);
    return acc;
  }, {});

  const suspectLabels = {
    snap: 'Snap Williams',
    lorraine: 'Lorraine',
    chet: 'Chet',
    ruthie: 'Ruthie',
    teddy: 'Teddy',
    other: 'Other Events',
  };

  return (
    <motion.div 
      className="mt-4 rounded-xl overflow-hidden"
      style={{
        background: 'rgba(15, 12, 10, 0.85)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* Header */}
      <div 
        className="px-6 py-4 flex items-center justify-between"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
      >
        <div>
          <h3 className="text-white text-base font-semibold">
            Evidence to Place
          </h3>
          <p className="text-white/50 text-xs mt-0.5">
            Drag onto timeline or double-click
          </p>
        </div>
        <div className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30">
          <span className="text-amber-300 text-sm font-medium">
            {availableEvents.length} item{availableEvents.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
      
      {/* Evidence cards grouped by suspect */}
      <div className="p-6">
        <div className="space-y-6">
          {Object.entries(eventsBySuspect).map(([suspectId, events]) => (
            <div key={suspectId}>
              {/* Suspect label */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-white/70 text-sm font-medium">
                  {suspectLabels[suspectId] || suspectId}
                </span>
                <div className="flex-1 h-px bg-white/10" />
              </div>
              
              {/* Cards grid */}
              <div className="flex flex-wrap gap-3">
                {events.map((event, index) => (
                  <TimelineDraggableEvent 
                    key={event.id} 
                    event={event} 
                    onClickPlace={onClickPlace}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
