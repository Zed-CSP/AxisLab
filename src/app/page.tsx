"use client";

import { useState } from "react";

// Contexts
import { RobotProvider } from "@/contexts/RobotContext";
import { ExampleRobotsProvider } from "@/contexts/ExampleRobotsContext";
import { UrdfRuntimeProvider } from "@/contexts/UrdfRuntimeContext";

// Components
import ViewerControls from "@/components/controls/ViewerControls";
import dynamic from "next/dynamic";
import Image from "next/image";
import FullScreenDragDrop from "@/components/FullScreenDragDrop";
import StatsOverlay from "@/components/StatsOverlay";

// Use dynamic import with no SSR for ViewerSwitch
const ViewerSwitch = dynamic(
  () => import("@/components/viewer/ViewerSwitch"),
  { ssr: false, loading: () => <div className="w-full h-full flex items-center justify-center"><div className="animate-spin h-10 w-10 border-4 border-brand border-t-transparent rounded-full"></div></div> }
);

export default function Home() {
  const [showFullScreenDragDrop, setShowFullScreenDragDrop] = useState(false);

  return (
    <ExampleRobotsProvider>
      <RobotProvider>
        <UrdfRuntimeProvider>
          {/* Performance stats overlay */}
          <StatsOverlay />
          
          <div className="w-full h-screen flex flex-col">
            {/* Navbar with logo */}
            <header className="h-16 bg-secondary border-b border-brand/20 flex items-center px-6">
              <div className="flex items-center gap-3">
                <Image 
                  src="/images/axisforge-logo.png" 
                  alt="AxisLab Logo" 
                  width={32} 
                  height={32} 
                  priority 
                />
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-medium text-white">AxisForge</span>
                  <h1 className="text-2xl font-medium text-brand">AxisLab</h1>
                </div>
              </div>
            </header>
            
            {/* Main content area */}
            <main className="flex flex-1 w-full min-h-0 bg-background p-6">
              <div className="flex flex-row w-full h-full gap-6">
                {/* Robot Selector section - hidden on mobile */}
                <div className="hidden lg:block lg:flex-[2] min-w-0 w-full h-full bg-secondary rounded-3xl overflow-hidden">
                  <ViewerControls onUploadClick={() => setShowFullScreenDragDrop(true)} />
                </div>
                
                {/* Viewer section - fills available space */}
                <div className="flex-4 min-w-0 flex items-center justify-center bg-tertiary rounded-3xl overflow-hidden h-full">
                  <ViewerSwitch />
                </div>
              </div>
            </main>
            
            {/* Footer */}
            <footer className="h-12 bg-secondary border-t border-brand/20 flex items-center justify-center">
              <p className="text-sm text-foreground/60">© Christopher Peret 2025 - AxisForge</p>
            </footer>
            
            {/* Full Screen Drag Drop Overlay */}
            {showFullScreenDragDrop && (
              <FullScreenDragDrop onClose={() => setShowFullScreenDragDrop(false)} />
            )}
          </div>
        </UrdfRuntimeProvider>
      </RobotProvider>
    </ExampleRobotsProvider>
  );
}
