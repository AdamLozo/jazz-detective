import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import { formatTime } from '../data/timelineEvents';

export default function TimelineDraggableEvent({ 
  event, 
  isDragging = false, 
  onClickPlace = null
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: event.id,
  });

  const style = transform ? {
    transform: CSS.Translate.toString(transform),
  } : undefined;

  const timeRange = event.endHour 
    ? `${formatTime(event.startHour)} – ${formatTime(event.endHour)}`
    : formatTime(event.startHour);

  const handleDoubleClick = () => {
    if (onClickPlace) {
      onClickPlace(event.id);
    }
  };

  // Card styling based on event type - high contrast, readable
  const getCardStyle = () => {
    if (event.isAlibi || event.type === 'alibi') {
      return {
        bg: 'linear-gradient(135deg, #166534 0%, #14532d 100%)',
        border: '#22c55e',
        text: '#dcfce7',
        time: '#86efac',
        badge: '✓',
        badgeBg: '#22c55e',
      };
    }
    if (event.type === 'sighting') {
      return {
        bg: 'linear-gradient(135deg, #92400e 0%, #78350f 100%)',
        border: '#f59e0b',
        text: '#fef3c7',
        time: '#fcd34d',
        badge: '👁',
        badgeBg: '#f59e0b',
      };
    }
    if (event.type === 'gap' || event.isContradiction) {
      return {
        bg: 'linear-gradient(135deg, #991b1b 0%, #7f1d1d 100%)',
        border: '#ef4444',
        text: '#fecaca',
        time: '#fca5a5',
        badge: '!',
        badgeBg: '#ef4444',
      };
    }
    return {
      bg: 'linear-gradient(135deg, #334155 0%, #1e293b 100%)',
      border: '#64748b',
      text: '#f1f5f9',
      time: '#94a3b8',
      badge: '•',
      badgeBg: '#64748b',
    };
  };

  const cardStyle = getCardStyle();

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onDoubleClick={handleDoubleClick}
      className="relative select-none"
      title={`${event.description}\n\nDrag to timeline or double-click to place`}
    >
      <motion.div 
        className="w-40 p-3 rounded-lg cursor-grab active:cursor-grabbing relative"
        style={{
          background: cardStyle.bg,
          borderLeft: `4px solid ${cardStyle.border}`,
          boxShadow: isDragging 
            ? '0 12px 28px rgba(0,0,0,0.4)' 
            : '0 2px 8px rgba(0,0,0,0.2)',
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ 
          opacity: 1, 
          y: isDragging ? -4 : 0,
          scale: isDragging ? 1.05 : 1,
        }}
        whileHover={{ 
          scale: 1.03, 
          y: -2,
          boxShadow: '0 6px 16px rgba(0,0,0,0.3)',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {/* Badge */}
        <div 
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg"
          style={{ background: cardStyle.badgeBg }}
        >
          {cardStyle.badge}
        </div>

        {/* Content */}
        <div className="pr-3">
          <p 
            className="text-sm font-semibold leading-tight mb-1"
            style={{ color: cardStyle.text }}
          >
            {event.label}
          </p>
          <p 
            className="text-xs font-medium"
            style={{ color: cardStyle.time }}
          >
            {timeRange}
          </p>
        </div>
      </motion.div>
      
      {/* Glow effect when dragging */}
      {isDragging && (
        <motion.div 
          className="absolute inset-0 rounded-lg -z-10"
          style={{ 
            background: cardStyle.border, 
            opacity: 0.25, 
            filter: 'blur(12px)',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.25, scale: 1.15 }}
        />
      )}
    </div>
  );
}
