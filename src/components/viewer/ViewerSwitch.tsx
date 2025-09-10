"use client";

import { useRobot } from "@/hooks/useRobot";
import UrdfViewer from "./UrdfViewer";

export default function ViewerSwitch() {
  const { activeRobotType } = useRobot();

  // For now, we only have the URDF viewer implemented
  // In the future, we can add MJCF and USD viewers
  
  // Default to URDF viewer if no type is selected
  if (!activeRobotType || activeRobotType === "URDF") {
    return <UrdfViewer />;
  }
  
  // Placeholder for MJCF viewer
  if (activeRobotType === "MJCF") {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-foreground/70">
        <div className="text-6xl mb-4">🔧</div>
        <h3 className="text-xl font-medium text-foreground mb-2">MJCF Viewer</h3>
        <p className="text-center max-w-md">
          MJCF viewer is coming soon. For now, please use the URDF viewer.
        </p>
      </div>
    );
  }
  
  // Placeholder for USD viewer
  if (activeRobotType === "USD") {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-foreground/70">
        <div className="text-6xl mb-4">🔧</div>
        <h3 className="text-xl font-medium text-foreground mb-2">USD Viewer</h3>
        <p className="text-center max-w-md">
          USD viewer is coming soon. For now, please use the URDF viewer.
        </p>
      </div>
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
