"use client";

import { useRobot } from "@/hooks/useRobot";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Loading component for viewers
const ViewerLoader = () => (
  <div className="w-full h-full flex flex-col items-center justify-center">
    <div className="w-12 h-12 border-4 border-brand/20 border-t-brand rounded-full animate-spin mb-4"></div>
    <p className="text-foreground/70">Loading viewer...</p>
  </div>
);

// Dynamically import viewers to reduce initial bundle size
const UrdfViewer = dynamic(() => import("./UrdfViewer"), {
  loading: () => <ViewerLoader />,
  ssr: false, // Disable SSR for Three.js components
});

const MjcfViewer = dynamic(() => import("./MjcfViewer"), {
  loading: () => <ViewerLoader />,
  ssr: false,
});

const MujocoSceneProvider = dynamic(
  () => import("@/contexts/MujocoSceneProvider").then(mod => ({ default: mod.MujocoSceneProvider })),
  { ssr: false }
);

export default function ViewerSwitch() {
  const { activeRobotType } = useRobot();

  // Default to URDF viewer if no type is selected
  if (!activeRobotType || activeRobotType === "URDF") {
    return (
      <Suspense fallback={<ViewerLoader />}>
        <UrdfViewer />
      </Suspense>
    );
  }
  
  // MJCF viewer
  if (activeRobotType === "MJCF") {
    return (
      <Suspense fallback={<ViewerLoader />}>
        <MujocoSceneProvider>
          <MjcfViewer />
        </MujocoSceneProvider>
      </Suspense>
    );
  }
  
  // Fallback for unknown types
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-foreground/70">
      <div className="text-6xl mb-4">❓</div>
      <h3 className="text-xl font-medium text-foreground mb-2">Unknown Format</h3>
      <p className="text-center max-w-md">
        The selected file format is not supported.
      </p>
    </div>
  );
}