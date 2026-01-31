import { useState, useEffect } from 'react';
import {
  DndContext,
  DragOverlay,
  rectIntersection,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  useDroppable,
} from '@dnd-kit/core';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import TimelineSuspectRow from './TimelineSuspectRow';
import TimelineEvidenceTray from './TimelineEvidenceTray';
import TimelineDraggableEvent from './TimelineDraggableEvent';
import {
  timelineSuspects,
  fixedEvents,
  placeableEvents,
  contradictions,
  isEventAvailable,
  getTimelineCompletion,
  suspectHasAlibi,
  MURDER_TIME,
  timeToPosition,
  formatTime,
} from '../data/timelineEvents';

export default function Timeline() {
  const { state, dispatch } = useGame();
  const [activeId, setActiveId] = useState(null);
  const [discoveredContradictions, setDiscoveredContradictions] = useState([]);
  
  const placedEvents = state.placedTimelineEvents || [];
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 8 },
    }),
    useSensor(KeyboardSensor)
  );

  const { setNodeRef: setTimelineDropRef, isOver: isOverTimeline } = useDroppable({
    id: 'timeline-drop-zone',
  });

  const availableEvents = Object.values(placeableEvents)
    .filter(e => isEventAvailable(e, state.collectedClues, state.dialogueFlags))
    .filter(e => !placedEvents.includes(e.id));

  useEffect(() => {
    contradictions.forEach(contradiction => {
      const allEventsPlaced = contradiction.events.every(eventId => 
        placedEvents.includes(eventId)
      );
      const allFlagsSet = !contradiction.flags || contradiction.flags.every(flag => 
        state.dialogueFlags[flag]
      );
      
      if (allEventsPlaced && allFlagsSet && !discoveredContradictions.includes(contradiction.id)) {
        setDiscoveredContradictions(prev => [...prev, contradiction.id]);
        
        if (!state.dialogueFlags[contradiction.journalFlag]) {
          dispatch({ 
            type: 'SET_DIALOGUE_FLAG', 
            payload: { flag: contradiction.journalFlag, value: true } 
          });
        }
      }
    });
  }, [placedEvents, state.dialogueFlags, discoveredContradictions, dispatch]);

  const handleDragStart = (event) => setActiveId(event.active.id);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;

    const eventId = active.id;
    const isValidDrop = over.id.startsWith('suspect-row-') || over.id === 'timeline-drop-zone';
    
    if (isValidDrop && !placedEvents.includes(eventId)) {
      dispatch({ type: 'PLACE_TIMELINE_EVENT', payload: eventId });
    }
  };

  const handleRemoveEvent = (eventId) => {
    dispatch({ type: 'REMOVE_TIMELINE_EVENT', payload: eventId });
  };

  const handleClickPlace = (eventId) => {
    if (!placedEvents.includes(eventId)) {
      dispatch({ type: 'PLACE_TIMELINE_EVENT', payload: eventId });
    }
  };

  const goBack = () => {
    dispatch({ type: 'SET_SCREEN', payload: 'journal' });
  };

  const completion = getTimelineCompletion(placedEvents, state.collectedClues, state.dialogueFlags);
  const activeEvent = activeId ? placeableEvents[activeId] : null;
  const timeMarkers = [20, 21, 22, 23, 24, 25, 26, 27];

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={rectIntersection}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="min-h-screen relative overflow-hidden">
        
        {/* === LAYER 1: Wood table background (visible at edges) === */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              repeating-linear-gradient(
                90deg,
                transparent 0px,
                transparent 2px,
                rgba(0,0,0,0.03) 2px,
                rgba(0,0,0,0.03) 4px
              ),
              linear-gradient(
                180deg,
                #1a1512 0%,
                #2a2118 30%,
                #2a2118 70%,
                #1a1512 100%
              )
            `,
          }}
        />

        {/* === LAYER 2: Decorative props (corners, behind glass) === */}
        <div className="absolute bottom-6 right-6 flex items-end gap-4 opacity-40 pointer-events-none z-10">
          <div className="relative">
            <div className="ashtray" />
            <div className="cigarette absolute -top-1 left-2" />
            <div className="smoke-rising absolute -top-2 left-6" />
          </div>
          <div className="whiskey-glass" />
        </div>
        <div className="absolute bottom-8 left-6 pencil opacity-30 pointer-events-none z-10" />

        {/* === LAYER 3: Subtle smoke (edges only, reduced) === */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
          <div 
            className="smoke-wisp" 
            style={{ left: '5%', top: '70%', opacity: 0.15 }} 
          />
          <div 
            className="smoke-wisp" 
            style={{ right: '5%', top: '30%', opacity: 0.12, width: '80px', height: '80px' }} 
          />
        </div>

        {/* === LAYER 4: Frosted glass working area === */}
        <div className="relative z-20 p-4 md:p-8 pb-48">
          <div className="max-w-6xl mx-auto">
            
            {/* Header - on glass */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={goBack}
                className="text-white/70 hover:text-white transition-colors flex items-center gap-2 text-base font-medium"
              >
                <span>←</span>
                <span>Back to Journal</span>
              </button>
              
              <div className="flex items-center gap-3">
                <span className="text-white/50 text-sm">Progress</span>
                <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-amber-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${completion}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span className="text-white/70 text-sm font-medium">{completion}%</span>
              </div>
            </div>

            {/* Main Working Panel - frosted glass effect */}
            <div 
              ref={setTimelineDropRef}
              className={`
                rounded-xl overflow-hidden transition-all duration-300
                ${isOverTimeline ? 'ring-2 ring-amber-500/40' : ''}
              `}
              style={{
                background: 'rgba(15, 12, 10, 0.85)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
              }}
            >
              <div className="p-6 md:p-8">
                
                {/* Title */}
                <div className="mb-6 text-center">
                  <h1 className="font-display text-3xl md:text-4xl tracking-wide text-white">
                    THE NIGHT OF THE MURDER
                  </h1>
                  <p className="text-white/50 text-sm mt-1 tracking-widest">
                    NOVEMBER 14–15, 1965
                  </p>
                </div>

                {/* Time Header */}
                <div className="relative h-12 mb-4 ml-32 mr-4">
                  {/* Base line */}
                  <div className="absolute inset-x-0 bottom-0 h-px bg-white/20" />
                  
                  {timeMarkers.map(hour => (
                    <div
                      key={hour}
                      className="absolute flex flex-col items-center"
                      style={{ left: `${timeToPosition(hour)}%`, transform: 'translateX(-50%)' }}
                    >
                      <span className="text-white/80 text-sm font-medium">
                        {formatTime(hour)}
                      </span>
                      <div className="w-px h-2 bg-white/30 mt-1" />
                    </div>
                  ))}
                  
                  {/* Murder marker */}
                  <div
                    className="absolute flex flex-col items-center z-10"
                    style={{ left: `${timeToPosition(MURDER_TIME)}%`, transform: 'translateX(-50%)', top: '-4px' }}
                  >
                    <div 
                      className="px-2 py-1 rounded text-xs font-bold text-white"
                      style={{ 
                        background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
                        boxShadow: '0 2px 8px rgba(220,38,38,0.4)',
                      }}
                    >
                      1 AM — MURDER
                    </div>
                    <div 
                      className="w-0.5 bg-red-500/60" 
                      style={{ height: '400px', marginTop: '4px' }} 
                    />
                  </div>
                </div>

                {/* Suspect Rows */}
                <div className="space-y-1">
                  {timelineSuspects.map(suspect => {
                    const hasAlibi = suspectHasAlibi(suspect.id, placedEvents);
                    const suspectPlacedEvents = placedEvents
                      .map(id => placeableEvents[id])
                      .filter(e => e && e.suspect === suspect.id);
                    
                    return (
                      <TimelineSuspectRow
                        key={suspect.id}
                        suspect={suspect}
                        hasAlibi={hasAlibi}
                        placedEvents={suspectPlacedEvents}
                        onRemoveEvent={handleRemoveEvent}
                        discoveredContradictions={discoveredContradictions}
                      />
                    );
                  })}
                  
                  {/* Other Events row */}
                  {(() => {
                    const otherEvents = placedEvents
                      .map(id => placeableEvents[id])
                      .filter(e => e && e.suspect === null);
                    const hasOtherAvailable = availableEvents.some(e => e.suspect === null);
                    
                    if (otherEvents.length > 0 || hasOtherAvailable) {
                      return (
                        <TimelineSuspectRow
                          key="other"
                          suspect={{ id: 'other', name: 'Other', role: 'Events' }}
                          hasAlibi={false}
                          placedEvents={otherEvents}
                          onRemoveEvent={handleRemoveEvent}
                          discoveredContradictions={discoveredContradictions}
                        />
                      );
                    }
                    return null;
                  })()}
                </div>

                {/* Legend */}
                <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-green-600" />
                    <span className="text-white/70">Confirmed Alibi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-amber-600" />
                    <span className="text-white/70">Sighting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-red-600" />
                    <span className="text-white/70">Suspicious / Gap</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Discovered Contradictions */}
            {discoveredContradictions.length > 0 && (
              <motion.div 
                className="mt-4 p-4 rounded-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  background: 'rgba(127, 29, 29, 0.3)',
                  border: '1px solid rgba(220, 38, 38, 0.4)',
                }}
              >
                <h3 className="text-red-400 text-sm font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span>⚠</span> Contradictions Found
                </h3>
                <ul className="space-y-1">
                  {discoveredContradictions.map(id => {
                    const contradiction = contradictions.find(c => c.id === id);
                    return contradiction ? (
                      <li key={id} className="text-sm text-red-200">
                        {contradiction.description}
                      </li>
                    ) : null;
                  })}
                </ul>
              </motion.div>
            )}

            {/* Evidence Tray */}
            <TimelineEvidenceTray 
              availableEvents={availableEvents} 
              onClickPlace={handleClickPlace}
            />

            {/* Instructions */}
            {availableEvents.length > 0 && placedEvents.length === 0 && (
              <div className="mt-4 text-center">
                <p className="text-amber-400/80 text-sm">
                  Drag evidence onto the timeline or double-click to place automatically
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Drag Overlay */}
        <DragOverlay>
          {activeEvent ? (
            <TimelineDraggableEvent event={activeEvent} isDragging />
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
}
