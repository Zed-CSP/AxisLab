"use client";

import { useState } from "react";
import { useExampleRobots } from "@/hooks/useExampleRobots";
import { RobotFileType } from "@/types/robot";
import RobotCard from "./RobotCard";

interface ViewerControlsProps {
  onUploadClick?: () => void;
}

export default function ViewerControls({ onUploadClick }: ViewerControlsProps) {
  const { examples, isLoading, error } = useExampleRobots();
  const [selectedType, setSelectedType] = useState<RobotFileType | "ALL">("ALL");
  
  // Filter robots by type
  const filteredRobots = examples?.filter(robot => 
    selectedType === "ALL" || robot.fileType === selectedType
  );

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-brand/10">
        <h2 className="text-xl font-medium text-brand mb-2">Robot Library</h2>
        <p className="text-sm text-foreground/70">
          Select a robot from the library or upload your own model.
        </p>
      </div>
      
      {/* Filter controls */}
      <div className="flex items-center gap-2 p-4 border-b border-brand/10">
        <div className="flex rounded-lg overflow-hidden border border-brand/20">
          <button 
            className={`px-3 py-1.5 text-sm ${selectedType === "ALL" ? "bg-brand text-background" : "bg-secondary text-foreground hover:bg-brand/10"}`}
            onClick={() => setSelectedType("ALL")}
          >
            All
          </button>
          <button 
            className={`px-3 py-1.5 text-sm ${selectedType === "URDF" ? "bg-brand text-background" : "bg-secondary text-foreground hover:bg-brand/10"}`}
            onClick={() => setSelectedType("URDF")}
          >
            URDF
          </button>
          <button 
            className={`px-3 py-1.5 text-sm ${selectedType === "MJCF" ? "bg-brand text-background" : "bg-secondary text-foreground hover:bg-brand/10"}`}
            onClick={() => setSelectedType("MJCF")}
          >
            MJCF
          </button>
        </div>
        
        {onUploadClick && (
          <button 
            onClick={onUploadClick}
            className="ml-auto px-4 py-1.5 bg-brand text-background rounded-lg text-sm font-medium hover:bg-brand/90 transition-colors"
          >
            Upload
          </button>
        )}
      </div>
      
      {/* Robot grid */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {isLoading && (
          <div className="flex items-center justify-center h-32 text-foreground/50">
            Loading robots...
          </div>
        )}
        
        {error && (
          <div className="flex items-center justify-center h-32 text-red-500">
            Error loading robots: {error}
          </div>
        )}
        
        {!isLoading && !error && filteredRobots?.length === 0 && (
          <div className="flex items-center justify-center h-32 text-foreground/50">
            No robots found for the selected filter.
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRobots?.map((robot) => (
            <RobotCard key={`${robot.owner}-${robot.repo_name}`} robot={robot} />
          ))}
        </div>
      </div>
    </div>
  );
}
