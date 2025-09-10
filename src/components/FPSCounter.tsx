'use client';

import { useState, useEffect } from 'react';

export default function FPSCounter() {
  const [fps, setFps] = useState(0);
  const [memory, setMemory] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [statMode, setStatMode] = useState<'fps' | 'memory' | 'both'>('fps');

  useEffect(() => {
    let frameCount = 0;
    let startTime = performance.now();
    let animationFrame: number;

    const calculateFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      const elapsed = currentTime - startTime;

      if (elapsed >= 1000) {
        setFps(Math.round((frameCount * 1000) / elapsed));
        
        // Try to get memory info if available
        if (window.performance && 'memory' in window.performance) {
          const memoryInfo = (window.performance as any).memory;
          if (memoryInfo && memoryInfo.usedJSHeapSize) {
            setMemory(Math.round(memoryInfo.usedJSHeapSize / (1024 * 1024)));
          }
        }
        
        frameCount = 0;
        startTime = currentTime;
      }

      animationFrame = requestAnimationFrame(calculateFPS);
    };

    animationFrame = requestAnimationFrame(calculateFPS);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  const handleClick = () => {
    if (expanded) {
      // If already expanded, cycle through stat modes
      if (statMode === 'fps') setStatMode('memory');
      else if (statMode === 'memory') setStatMode('both');
      else {
        setStatMode('fps');
        setExpanded(false);
      }
    } else {
      // If not expanded, expand it
      setExpanded(true);
    }
  };

  return (
    <div 
      className={`fixed top-4 left-4 z-50 bg-black/70 backdrop-blur-md rounded-lg p-3 transition-all duration-300 cursor-pointer
        ${expanded ? 'min-w-48' : 'min-w-24'}`}
      onClick={handleClick}
    >
      <div className="flex flex-col">
        {/* FPS Counter */}
        {(statMode === 'fps' || statMode === 'both') && (
          <div className="flex justify-between items-center mb-1">
            <p className="text-gray-400 text-xs">FPS</p>
            <p className={`text-sm font-mono ${fps > 50 ? 'text-green-400' : fps > 30 ? 'text-yellow-400' : 'text-red-400'}`}>
              {fps}
            </p>
          </div>
        )}
        
        {/* Memory Usage */}
        {(statMode === 'memory' || statMode === 'both') && memory !== null && (
          <div className="flex justify-between items-center">
            <p className="text-gray-400 text-xs">Memory</p>
            <p className={`text-sm font-mono ${memory < 100 ? 'text-green-400' : memory < 300 ? 'text-yellow-400' : 'text-red-400'}`}>
              {memory} MB
            </p>
          </div>
        )}
        
        {/* Hint text */}
        {expanded && (
          <p className="text-gray-500 text-[10px] mt-2 text-center">
            Click to cycle stats
          </p>
        )}
      </div>
    </div>
  );
}
