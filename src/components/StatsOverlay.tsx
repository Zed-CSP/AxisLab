'use client';

import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stats } from '@react-three/drei';

export default function StatsOverlay() {
  const [panel, setPanel] = useState(0);
  
  // Handle click to cycle through panels
  const handleClick = () => {
    setPanel((prev) => (prev + 1) % 3); // Cycle through 0, 1, 2
  };

  return (
    <div 
      className="fixed top-0 right-0 z-50 w-80 h-16 pointer-events-none"
      onClick={handleClick}
    >
      <Canvas 
        className="pointer-events-auto" 
        style={{ background: 'transparent', cursor: 'pointer' }}
      >
        <Stats showPanel={panel} />
      </Canvas>
    </div>
  );
}
