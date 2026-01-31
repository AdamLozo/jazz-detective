import { useDraggable } from '@dnd-kit/core';
import { useState, useRef, useEffect } from 'react';

export default function EvidenceBoardItem({
  item,
  evidence,
  isConnecting,
  isHinted,
  onMove,
  onRemove,
  onClick,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: item.x, y: item.y });
  const dragRef = useRef(null);
  const startPos = useRef({ x: 0, y: 0 });

  // Sync position with item prop
  useEffect(() => {
    setPosition({ x: item.x, y: item.y });
  }, [item.x, item.y]);

  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Only left click
    e.preventDefault();
    setIsDragging(true);
    startPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const newX = Math.max(0, Math.min(e.clientX - startPos.current.x, window.innerWidth - 140));
    const newY = Math.max(60, Math.min(e.clientY - startPos.current.y, window.innerHeight - 300));
    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      onMove(item.id, position.x, position.y);
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, position]);

  const handleDoubleClick = () => {
    onRemove(item.id);
  };

  const handleClick = (e) => {
    if (!isDragging) {
      onClick(item.id, e);
    }
  };

  // Visual styles based on evidence type
  const getTypeStyles = () => {
    switch (evidence.type) {
      case 'suspect':
        return {
          bg: 'bg-gray-100',
          border: evidence.cleared ? 'border-green-500' : 'border-gray-400',
          frame: true, // Polaroid frame
        };
      case 'clue':
        return {
          bg: 'bg-amber-50',
          border: 'border-amber-700',
          frame: false,
        };
      case 'testimony':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-600',
          frame: false,
        };
      case 'contradiction':
        return {
          bg: 'bg-red-100',
          border: 'border-red-600',
          frame: false,
        };
      default:
        return {
          bg: 'bg-white',
          border: 'border-gray-400',
          frame: false,
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div
      ref={dragRef}
      className={`
        absolute cursor-move select-none z-20
        ${isDragging ? 'z-50 scale-105' : ''}
        ${isConnecting ? 'ring-4 ring-amber-400 ring-opacity-80' : ''}
        ${isHinted ? 'ring-4 ring-yellow-400 ring-opacity-100 animate-pulse' : ''}
      `}
      style={{
        left: position.x,
        top: position.y,
        width: '140px',
        transition: isDragging ? 'none' : 'transform 0.15s ease-out',
      }}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
      onClick={handleClick}
    >
      {/* Push pin */}
      <div
        className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full z-30"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #ef4444, #991b1b)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.3)',
        }}
      />

      {/* Card container */}
      <div
        className={`
          ${styles.bg} border-2 ${styles.border} rounded
          ${styles.frame ? 'p-2 pb-8' : 'p-2'}
          shadow-lg relative overflow-hidden
        `}
        style={{
          transform: `rotate(${(item.id.charCodeAt(0) % 5) - 2}deg)`,
          boxShadow: '3px 3px 8px rgba(0,0,0,0.3)',
        }}
      >
        {/* Suspect photo style */}
        {evidence.type === 'suspect' && (
          <>
            <div
              className="w-full h-20 bg-gray-300 mb-2 flex items-center justify-center text-4xl"
              style={{
                background: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)',
              }}
            >
              {evidence.icon || '👤'}
            </div>
            <p
              className="text-center text-sm font-bold text-gray-800"
              style={{ fontFamily: 'cursive' }}
            >
              {evidence.name}
            </p>
            {evidence.cleared && (
              <div
                className="absolute bottom-8 right-2 text-green-600 font-bold text-xs transform rotate-[-15deg]"
                style={{ textShadow: '1px 1px 0 white' }}
              >
                ✓ CLEARED
              </div>
            )}
          </>
        )}

        {/* Clue style */}
        {evidence.type === 'clue' && (
          <>
            <div className="text-2xl mb-1 text-center">{evidence.icon || '🔍'}</div>
            <p className="text-xs font-semibold text-gray-800 text-center leading-tight">
              {evidence.name}
            </p>
            <div
              className="absolute top-1 right-1 text-red-700 font-bold text-[8px] transform rotate-[-10deg]"
              style={{ fontFamily: 'monospace' }}
            >
              EVIDENCE
            </div>
          </>
        )}

        {/* Testimony style */}
        {evidence.type === 'testimony' && (
          <>
            <div className="text-lg mb-1">💬</div>
            <p
              className="text-xs text-gray-700 leading-tight"
              style={{ fontFamily: 'cursive' }}
            >
              "{evidence.quote || evidence.name}"
            </p>
            {evidence.source && (
              <p className="text-[10px] text-gray-500 mt-1 text-right">— {evidence.source}</p>
            )}
          </>
        )}

        {/* Contradiction style */}
        {evidence.type === 'contradiction' && (
          <>
            <div className="text-xl mb-1 text-center">⚠️</div>
            <p className="text-xs font-bold text-red-800 text-center leading-tight">
              {evidence.name}
            </p>
          </>
        )}
      </div>

      {/* Remove hint on hover */}
      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-white/60 opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap">
        Double-click to remove
      </div>
    </div>
  );
}
