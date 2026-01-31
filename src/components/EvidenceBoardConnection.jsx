export default function EvidenceBoardConnection({
  connection,
  fromX,
  fromY,
  toX,
  toY,
  isHinted,
  onClick,
}) {
  const { color, label } = connection;

  // Calculate midpoint for label
  const midX = (fromX + toX) / 2;
  const midY = (fromY + toY) / 2;

  // Calculate line length for dash pattern
  const length = Math.sqrt(Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2));

  // Color mappings
  const colorMap = {
    red: { stroke: '#ef4444', glow: 'rgba(239,68,68,0.5)' },
    green: { stroke: '#22c55e', glow: 'rgba(34,197,94,0.5)' },
    yellow: { stroke: '#eab308', glow: 'rgba(234,179,8,0.5)' },
  };

  const colors = colorMap[color] || colorMap.red;

  return (
    <g
      className="cursor-pointer pointer-events-auto"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {/* String/yarn effect - multiple lines for thickness */}
      <line
        x1={fromX}
        y1={fromY}
        x2={toX}
        y2={toY}
        stroke={colors.stroke}
        strokeWidth={isHinted ? 6 : 4}
        strokeLinecap="round"
        strokeDasharray={isHinted ? 'none' : '8 4'}
        style={{
          filter: isHinted ? `drop-shadow(0 0 8px ${colors.glow})` : 'none',
        }}
      />

      {/* Outer glow for better visibility */}
      <line
        x1={fromX}
        y1={fromY}
        x2={toX}
        y2={toY}
        stroke={colors.glow}
        strokeWidth={8}
        strokeLinecap="round"
        strokeOpacity={0.3}
      />

      {/* Label background */}
      {label && (
        <>
          <rect
            x={midX - label.length * 4 - 8}
            y={midY - 12}
            width={label.length * 8 + 16}
            height={24}
            rx={4}
            fill="rgba(0,0,0,0.85)"
            stroke={colors.stroke}
            strokeWidth={1}
          />
          <text
            x={midX}
            y={midY + 4}
            textAnchor="middle"
            fill="white"
            fontSize={12}
            fontFamily="system-ui"
            style={{ pointerEvents: 'none' }}
          >
            {label}
          </text>
        </>
      )}

      {/* Click target (invisible wider line) */}
      <line
        x1={fromX}
        y1={fromY}
        x2={toX}
        y2={toY}
        stroke="transparent"
        strokeWidth={20}
        strokeLinecap="round"
      />

      {/* Hover indicator at midpoint */}
      <circle
        cx={midX}
        cy={midY}
        r={label ? 0 : 8}
        fill={colors.stroke}
        opacity={0}
        className="hover:opacity-60 transition-opacity"
      />
    </g>
  );
}
