/**
 * Tooltip - Simple hover tooltip component
 * 
 * Wrap any element to show a tooltip on hover
 */
import { useState, useRef, useEffect } from 'react';

function Tooltip({ 
  children, 
  text, 
  position = 'top', // top, bottom, left, right
  delay = 300,
  className = ''
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [actualPosition, setActualPosition] = useState(position);
  const timeoutRef = useRef(null);
  const tooltipRef = useRef(null);
  const containerRef = useRef(null);
  
  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };
  
  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };
  
  // Adjust position if tooltip goes off screen
  useEffect(() => {
    if (isVisible && tooltipRef.current && containerRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      
      let newPosition = position;
      
      // Check if tooltip goes off screen and adjust
      if (position === 'top' && tooltipRect.top < 10) {
        newPosition = 'bottom';
      } else if (position === 'bottom' && tooltipRect.bottom > window.innerHeight - 10) {
        newPosition = 'top';
      } else if (position === 'left' && tooltipRect.left < 10) {
        newPosition = 'right';
      } else if (position === 'right' && tooltipRect.right > window.innerWidth - 10) {
        newPosition = 'left';
      }
      
      if (newPosition !== actualPosition) {
        setActualPosition(newPosition);
      }
    }
  }, [isVisible, position, actualPosition]);
  
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };
  
  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-jazz-black/90 border-x-transparent border-b-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-jazz-black/90 border-x-transparent border-t-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-jazz-black/90 border-y-transparent border-r-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-jazz-black/90 border-y-transparent border-l-transparent',
  };
  
  return (
    <div 
      ref={containerRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      
      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className={`absolute z-[100] px-3 py-1.5 text-sm text-jazz-cream bg-jazz-black/90 
                   rounded whitespace-nowrap pointer-events-none
                   transition-all duration-200
                   ${positionClasses[actualPosition]}
                   ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        role="tooltip"
      >
        {text}
        
        {/* Arrow */}
        <div 
          className={`absolute w-0 h-0 border-4 ${arrowClasses[actualPosition]}`}
        />
      </div>
    </div>
  );
}

export default Tooltip;
