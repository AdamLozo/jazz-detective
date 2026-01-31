import { useDraggable, useDroppable } from '@dnd-kit/core';

function TrayItem({ item }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: item.id,
  });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  const getTypeColor = () => {
    switch (item.type) {
      case 'suspect': return 'bg-gray-700 border-gray-500';
      case 'clue': return 'bg-amber-900/80 border-amber-600';
      case 'testimony': return 'bg-yellow-900/60 border-yellow-600';
      case 'contradiction': return 'bg-red-900/80 border-red-500';
      default: return 'bg-gray-700 border-gray-500';
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        ${getTypeColor()}
        border rounded px-3 py-2 cursor-grab
        hover:scale-105 transition-transform
        ${isDragging ? 'opacity-50 scale-110' : ''}
        flex items-center gap-2 min-w-[120px]
      `}
    >
      <span className="text-lg">{item.icon || '📄'}</span>
      <span className="text-xs text-white/90 truncate">{item.name}</span>
    </div>
  );
}

export default function EvidenceBoardTray({ items }) {
  const { setNodeRef, isOver } = useDroppable({
    id: 'evidence-tray',
  });

  // Group items by type
  const suspects = items.filter(i => i.type === 'suspect');
  const clues = items.filter(i => i.type === 'clue');
  const testimonies = items.filter(i => i.type === 'testimony');
  const contradictions = items.filter(i => i.type === 'contradiction');

  const sections = [
    { title: 'Suspects', items: suspects, icon: '👤' },
    { title: 'Evidence', items: clues, icon: '🔍' },
    { title: 'Testimony', items: testimonies, icon: '💬' },
    { title: 'Contradictions', items: contradictions, icon: '⚠️' },
  ].filter(s => s.items.length > 0);

  return (
    <div
      ref={setNodeRef}
      className={`
        fixed bottom-0 left-0 right-0 z-30
        transition-all duration-300
        ${isOver ? 'bg-gray-900/95' : 'bg-gray-900/90'}
      `}
      style={{
        backdropFilter: 'blur(8px)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.4)',
      }}
    >
      <div className="p-4 max-h-[180px] overflow-y-auto">
        {items.length === 0 ? (
          <div className="text-center text-white/40 py-4">
            <p className="text-lg">All evidence placed on board</p>
            <p className="text-sm">Double-click items on board to return them here</p>
          </div>
        ) : (
          <div className="flex gap-6 overflow-x-auto pb-2">
            {sections.map(section => (
              <div key={section.title} className="flex-shrink-0">
                <p className="text-white/50 text-xs uppercase tracking-wider mb-2 flex items-center gap-1">
                  <span>{section.icon}</span>
                  {section.title} ({section.items.length})
                </p>
                <div className="flex flex-wrap gap-2">
                  {section.items.map(item => (
                    <TrayItem key={item.id} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="absolute top-2 right-4 text-white/30 text-xs">
        Drag to board • Click items on board to connect
      </div>
    </div>
  );
}
