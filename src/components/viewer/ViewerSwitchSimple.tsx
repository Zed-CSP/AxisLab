"use client";

// Simple loading component
const ViewerLoader = () => (
  <div className="w-full h-full flex flex-col items-center justify-center">
    <div className="w-12 h-12 border-4 border-brand/20 border-t-brand rounded-full animate-spin mb-4"></div>
    <p className="text-foreground/70">Loading viewer...</p>
  </div>
);

export default function ViewerSwitchSimple() {
  // We don't need activeRobotType since this is just a simple loader
  // const { activeRobotType } = useRobot();

  // Always return the loader during server-side rendering
  // The actual components will be loaded client-side
  return <ViewerLoader />;
}
