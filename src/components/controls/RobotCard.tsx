"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { ExampleRobot, RobotFileType } from "@/types/robot";
import { useRobot } from "@/hooks/useRobot";

interface RobotCardProps {
  robot: ExampleRobot;
}

// Map file types to their icons/colors
const fileTypeIcons: Record<RobotFileType, { icon: string; color: string }> = {
  URDF: {
    icon: "📄",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  },
  MJCF: {
    icon: "📝",
    color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  },
  USD: {
    icon: "🗂️",
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  },
};

export default function RobotCard({ robot }: RobotCardProps) {
  const { 
    activeRobotOwner, 
    activeRobotName, 
    setActiveRobotOwner, 
    setActiveRobotName, 
    setActiveRobotType 
  } = useRobot();
  
  const isActive = 
    activeRobotOwner === robot.owner && 
    activeRobotName === robot.repo_name;

  const handleSelect = () => {
    setActiveRobotOwner(robot.owner);
    setActiveRobotName(robot.repo_name);
    setActiveRobotType(robot.fileType);
  };

  return (
    <div 
      className={cn(
        "flex flex-col rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border-2",
        isActive 
          ? "border-highlight shadow-md scale-[1.02]" 
          : "border-transparent hover:border-brand/20 hover:shadow-sm"
      )}
      onClick={handleSelect}
    >
      {/* Robot image */}
      <div className="relative aspect-[4/3] w-full bg-tertiary">
        {robot.imagePath ? (
          <Image
            src={robot.imagePath}
            alt={robot.display_name}
            fill
            className="object-contain p-2"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-foreground/30 text-5xl">
            🤖
          </div>
        )}
      </div>
      
      {/* Robot info */}
      <div className="p-3 bg-secondary">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-foreground">{robot.display_name}</h3>
          <span 
            className={cn(
              "text-xs px-2 py-1 rounded-full", 
              fileTypeIcons[robot.fileType].color
            )}
          >
            {robot.fileType}
          </span>
        </div>
      </div>
    </div>
  );
}
