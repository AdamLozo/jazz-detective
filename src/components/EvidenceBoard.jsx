import { useState, useCallback, useRef, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { getAvailableEvidence, validConnections, getNextHint, calculateCaseStrength } from '../data/evidenceBoardData';

export default function EvidenceBoard() {
  const { state, dispatch } = useGame();
  const [connectingFrom, setConnectingFrom] = useState(null);
  const [showInsight, setShowInsight] = useState(null);
  const [hintedItems, setHintedItems] = useState([]);
  const boardRef = useRef(null);
  const [boardSize, setBoardSize] = useState({ width: 800, height: 400 });
  
  // Safety: handle old saves without evidenceBoard
  const evidenceBoard = state.evidenceBoard || { items: [], connections: [], hintsUsed: 0 };
  const boardItems = evidenceBoard.items || [];
  const connections = evidenceBoard.connections || [];
  const hintsUsed = evidenceBoard.hintsUsed || 0;

  // Get all available evidence
  const allEvidence = getAvailableEvidence(state);
  const trayItems = allEvidence.filter(e => !boardItems.find(b => b.id === e.id));
  
  // Calculate case strength
  const caseStrength = calculateCaseStrength(connections, hintsUsed);

  // Track board size for responsive positioning
  useEffect(() => {
    const updateSize = () => {
      if (boardRef.current) {
        setBoardSize({
          width: boardRef.current.offsetWidth,
          height: boardRef.current.offsetHeight,
        });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const goBack = () => {
    dispatch({ type: 'SET_SCREEN', payload: 'journal' });
  };

  // Grid-based positioning using percentages for responsiveness
  const getNextPosition = () => {
    const cols = Math.max(3, Math.floor(boardSize.width / 150));
    const rows = Math.max(2, Math.floor(boardSize.height / 130));
    
    const index = boardItems.length;
    const row = Math.floor(index / cols) % rows;
    const col = index % cols;
    
    // Use percentages for responsive layout
    const cellWidth = 100 / cols;
    const cellHeight = 100 / rows;
    
    // Add small random offset for natural look
    const randomX = (Math.random() - 0.5) * 2;
    const randomY = (Math.random() - 0.5) * 2;
    
    return {
      // Store as percentages
      xPercent: (col * cellWidth) + (cellWidth / 2) - 8 + randomX,
      yPercent: (row * cellHeight) + (cellHeight / 2) - 8 + randomY,
    };
  };

  const addToBoard = (item) => {
    const pos = getNextPosition();
    dispatch({
      type: 'ADD_BOARD_ITEM',
      payload: {
        id: item.id,
        type: item.type,
        xPercent: pos.xPercent,
        yPercent: pos.yPercent,
      },
    });
  };

  const removeFromBoard = (id) => {
    dispatch({ type: 'REMOVE_BOARD_ITEM', payload: id });
    if (connectingFrom === id) setConnectingFrom(null);
  };

  // Handle clicking an item - either start connection or complete it
  const handleItemClick = (id) => {
    if (!connectingFrom) {
      // Start a new connection
      setConnectingFrom(id);
    } else if (connectingFrom === id) {
      // Cancel connection
      setConnectingFrom(null);
    } else {
      // Try to make connection
      makeConnection(connectingFrom, id);
      setConnectingFrom(null);
    }
  };

  const makeConnection = (fromId, toId) => {
    // Check if connection already exists
    const exists = connections.find(
      c => (c.from === fromId && c.to === toId) || (c.from === toId && c.to === fromId)
    );
    if (exists) return;

    // Check if this is a valid connection
    const validMatch = validConnections.find(
      vc => vc.items.includes(fromId) && vc.items.includes(toId)
    );

    const connectionId = `conn-${Date.now()}`;
    
    dispatch({
      type: 'ADD_CONNECTION',
      payload: {
        id: connectionId,
        from: fromId,
        to: toId,
        color: validMatch ? 'green' : 'red',
        label: validMatch ? validMatch.insight : null,
      },
    });

    // Show insight if valid connection
    if (validMatch) {
      setShowInsight({
        text: validMatch.insight,
        points: validMatch.points,
      });
      setTimeout(() => setShowInsight(null), 4000);
    }
  };

  const removeConnection = (connId) => {
    dispatch({ type: 'REMOVE_CONNECTION', payload: connId });
  };

  const useHint = () => {
    if (hintsUsed >= 3) return;
    
    const hint = getNextHint(connections, validConnections);
    if (hint) {
      dispatch({ type: 'USE_BOARD_HINT' });
      setHintedItems(hint.items);
      setTimeout(() => setHintedItems([]), 5000);
    }
  };

  const clearBoard = () => {
    if (confirm('Clear all items and connections from the board?')) {
      dispatch({ type: 'CLEAR_BOARD' });
    }
  };

  // Group tray items by type
  const groupedTray = {
    suspects: trayItems.filter(i => i.type === 'suspect'),
    clues: trayItems.filter(i => i.type === 'clue'),
    testimony: trayItems.filter(i => i.type === 'testimony'),
    contradictions: trayItems.filter(i => i.type === 'contradiction'),
  };

  return (
    <div 
      className="min-h-screen relative"
      style={{
        background: 'linear-gradient(135deg, #8B6914 0%, #A67B2C 50%, #6B5310 100%)',
      }}
    >
      {/* Cork texture overlay */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Header */}
      <div className="relative z-20 p-4 flex items-center justify-between bg-black/40 backdrop-blur-sm border-b border-white/10">
        <button
          onClick={goBack}
          className="text-white hover:text-amber-300 text-xl flex items-center gap-2"
        >
          ← Back to Journal
        </button>
        
        <h1 className="text-white text-3xl font-bold tracking-wide">
          📌 EVIDENCE BOARD
        </h1>
        
        <div className="flex items-center gap-4">
          {/* Case strength indicator */}
          <div className="text-right">
            <p className="text-white/60 text-sm">Case Strength</p>
            <p className={`text-lg font-bold ${
              caseStrength.label === 'AIRTIGHT' ? 'text-green-400' :
              caseStrength.label === 'STRONG' ? 'text-blue-400' :
              caseStrength.label === 'MODERATE' ? 'text-yellow-400' :
              'text-red-400'
            }`}>
              {caseStrength.label} ({caseStrength.percentage}%)
            </p>
          </div>
        </div>
      </div>

      {/* Instructions bar */}
      <div className="relative z-20 px-4 py-2 bg-black/20 text-center">
        <p className="text-white/80 text-sm">
          {connectingFrom 
            ? '🔗 Click another item to connect, or same item to cancel'
            : '👆 Click item to start connection • Double-click to remove • Drag from tray to add'
          }
        </p>
      </div>

      {/* Board area */}
      <div 
        ref={boardRef}
        className="relative z-10 mx-4 my-4 rounded-lg border-4 border-amber-950 overflow-hidden"
        style={{ 
          height: 'calc(100vh - 340px)', 
          minHeight: '300px',
          boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.4)',
        }}
      >
        {/* SVG for connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-30">
          {connections.map(conn => {
            const fromItem = boardItems.find(i => i.id === conn.from);
            const toItem = boardItems.find(i => i.id === conn.to);
            if (!fromItem || !toItem) return null;
            
            // Convert percentages to pixels for SVG
            const fromXPct = fromItem.xPercent ?? (fromItem.x / boardSize.width * 100) ?? 50;
            const fromYPct = fromItem.yPercent ?? (fromItem.y / boardSize.height * 100) ?? 50;
            const toXPct = toItem.xPercent ?? (toItem.x / boardSize.width * 100) ?? 50;
            const toYPct = toItem.yPercent ?? (toItem.y / boardSize.height * 100) ?? 50;
            
            const fromX = (fromXPct / 100) * boardSize.width + 60;
            const fromY = (fromYPct / 100) * boardSize.height + 40;
            const toX = (toXPct / 100) * boardSize.width + 60;
            const toY = (toYPct / 100) * boardSize.height + 40;
            const midX = (fromX + toX) / 2;
            const midY = (fromY + toY) / 2;
            
            const color = conn.color === 'green' ? '#22c55e' : 
                         conn.color === 'yellow' ? '#eab308' : '#ef4444';
            
            return (
              <g key={conn.id} className="cursor-pointer" onClick={() => removeConnection(conn.id)}>
                <line
                  x1={fromX} y1={fromY}
                  x2={toX} y2={toY}
                  stroke={color}
                  strokeWidth="3"
                  strokeDasharray="8 4"
                  className="pointer-events-auto hover:stroke-width-4"
                />
                {conn.label && (
                  <>
                    <rect
                      x={midX - 80} y={midY - 12}
                      width="160" height="24"
                      fill="rgba(0,0,0,0.8)"
                      rx="4"
                    />
                    <text
                      x={midX} y={midY + 4}
                      fill="white"
                      fontSize="11"
                      textAnchor="middle"
                      className="pointer-events-none"
                    >
                      {conn.label.length > 30 ? conn.label.substring(0, 30) + '...' : conn.label}
                    </text>
                  </>
                )}
              </g>
            );
          })}
        </svg>

        {/* Empty state */}
        {boardItems.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white/50">
              <p className="text-6xl mb-4">📌</p>
              <p className="text-xl">Click evidence below to add to the board</p>
              <p className="text-sm mt-2">Connect related items to build your case</p>
            </div>
          </div>
        )}

        {/* Board items */}
        {boardItems.map(item => {
          const evidence = allEvidence.find(e => e.id === item.id);
          if (!evidence) return null;
          
          const isConnecting = connectingFrom === item.id;
          const isHinted = hintedItems.includes(item.id);
          
          // Support both old (x,y) and new (xPercent,yPercent) formats
          const xPct = item.xPercent ?? (item.x / boardSize.width * 100) ?? 10;
          const yPct = item.yPercent ?? (item.y / boardSize.height * 100) ?? 10;
          
          return (
            <div
              key={item.id}
              className={`
                absolute cursor-pointer select-none transition-all duration-200
                ${isConnecting ? 'ring-4 ring-amber-400 scale-105 z-40' : 'z-20'}
                ${isHinted ? 'ring-4 ring-yellow-400 animate-pulse z-40' : ''}
                hover:scale-105 hover:z-30
              `}
              style={{
                left: `${Math.min(Math.max(xPct, 2), 85)}%`,
                top: `${Math.min(Math.max(yPct, 2), 75)}%`,
                width: '120px',
                transform: `rotate(${(item.id.charCodeAt(5) % 7) - 3}deg)`,
              }}
              onClick={() => handleItemClick(item.id)}
              onDoubleClick={() => removeFromBoard(item.id)}
            >
              {/* Push pin */}
              <div
                className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full z-10"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, #ef4444, #991b1b)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.5)',
                }}
              />
              
              {/* Card */}
              <div
                className={`
                  rounded shadow-lg p-2 border-2
                  ${evidence.type === 'suspect' ? 'bg-gray-100 border-gray-400' : ''}
                  ${evidence.type === 'clue' ? 'bg-amber-50 border-amber-700' : ''}
                  ${evidence.type === 'testimony' ? 'bg-yellow-50 border-yellow-600' : ''}
                  ${evidence.type === 'contradiction' ? 'bg-red-100 border-red-600' : ''}
                  ${evidence.cleared ? 'border-green-500' : ''}
                `}
                style={{ boxShadow: '3px 3px 8px rgba(0,0,0,0.3)' }}
              >
                <div className="text-3xl text-center mb-1">{evidence.icon || '📄'}</div>
                <p className="text-xs font-semibold text-gray-800 text-center leading-tight">
                  {evidence.name}
                </p>
                {evidence.cleared && (
                  <p className="text-[10px] text-green-600 text-center font-bold">✓ CLEARED</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Insight popup */}
      {showInsight && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-black/90 backdrop-blur-sm px-8 py-6 rounded-lg border-2 border-green-500 max-w-md text-center animate-pulse">
          <p className="text-green-400 text-lg font-bold mb-2">✓ CONNECTION FOUND!</p>
          <p className="text-white text-xl">{showInsight.text}</p>
          <p className="text-green-300 mt-2">+{showInsight.points} case points</p>
        </div>
      )}

      {/* Tray */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t-2 border-amber-800 z-40">
        {/* Tray header with controls */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
          <p className="text-white/70 text-sm font-semibold">
            AVAILABLE EVIDENCE ({trayItems.length})
          </p>
          <div className="flex gap-2">
            <button
              onClick={useHint}
              disabled={hintsUsed >= 3}
              className={`px-3 py-1 rounded text-sm ${
                hintsUsed >= 3 
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                  : 'bg-yellow-600 hover:bg-yellow-500 text-white'
              }`}
            >
              💡 Hint ({3 - hintsUsed} left)
            </button>
            <button
              onClick={clearBoard}
              className="px-3 py-1 rounded text-sm bg-red-800 hover:bg-red-700 text-white"
            >
              🗑️ Clear
            </button>
          </div>
        </div>
        
        {/* Evidence categories */}
        <div className="p-3 max-h-40 overflow-y-auto">
          <div className="flex flex-wrap gap-4">
            {/* Suspects */}
            {groupedTray.suspects.length > 0 && (
              <div>
                <p className="text-white/50 text-xs mb-1">SUSPECTS</p>
                <div className="flex gap-2">
                  {groupedTray.suspects.map(item => (
                    <button
                      key={item.id}
                      onClick={() => addToBoard(item)}
                      className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded text-sm flex items-center gap-2"
                    >
                      <span>{item.icon}</span>
                      <span>{item.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Clues */}
            {groupedTray.clues.length > 0 && (
              <div>
                <p className="text-white/50 text-xs mb-1">EVIDENCE</p>
                <div className="flex gap-2 flex-wrap">
                  {groupedTray.clues.map(item => (
                    <button
                      key={item.id}
                      onClick={() => addToBoard(item)}
                      className="bg-amber-800 hover:bg-amber-700 text-white px-3 py-2 rounded text-sm flex items-center gap-2"
                    >
                      <span>{item.icon}</span>
                      <span>{item.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Testimony */}
            {groupedTray.testimony.length > 0 && (
              <div>
                <p className="text-white/50 text-xs mb-1">TESTIMONY</p>
                <div className="flex gap-2 flex-wrap">
                  {groupedTray.testimony.map(item => (
                    <button
                      key={item.id}
                      onClick={() => addToBoard(item)}
                      className="bg-yellow-700 hover:bg-yellow-600 text-white px-3 py-2 rounded text-sm flex items-center gap-2"
                    >
                      <span>{item.icon}</span>
                      <span className="max-w-32 truncate">{item.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Contradictions */}
            {groupedTray.contradictions.length > 0 && (
              <div>
                <p className="text-white/50 text-xs mb-1">CONTRADICTIONS</p>
                <div className="flex gap-2">
                  {groupedTray.contradictions.map(item => (
                    <button
                      key={item.id}
                      onClick={() => addToBoard(item)}
                      className="bg-red-800 hover:bg-red-700 text-white px-3 py-2 rounded text-sm flex items-center gap-2"
                    >
                      <span>{item.icon}</span>
                      <span>{item.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {trayItems.length === 0 && (
              <p className="text-white/40 text-sm">All evidence is on the board</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
