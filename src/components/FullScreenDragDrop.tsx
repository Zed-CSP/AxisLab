"use client";

import { useState, useRef, useCallback } from "react";
import { useUrdfRuntime } from "@/hooks/useUrdfRuntime";

interface FullScreenDragDropProps {
  onClose: () => void;
}

export default function FullScreenDragDrop({ onClose }: FullScreenDragDropProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{
    status: "idle" | "loading" | "success" | "error";
    message?: string;
  }>({ status: "idle" });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { registerUrdfProcessor } = useUrdfRuntime();

  // Handle drag events
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  }, [isDragging]);

  // Process files
  const processFiles = useCallback(async (files: FileList) => {
    setUploadStatus({ status: "loading", message: "Processing files..." });

    try {
      // Find the main URDF file
      const urdfFile = Array.from(files).find(file => 
        file.name.toLowerCase().endsWith('.urdf')
      );
      
      if (!urdfFile) {
        setUploadStatus({ 
          status: "error", 
          message: "No URDF file found. Please include a .urdf file." 
        });
        return;
      }
      
      // Create a map of all files
      const fileMap: Record<string, File> = {};
      Array.from(files).forEach(file => {
        fileMap[`/${file.name}`] = file;
      });
      
      // Create blob URLs for each file
      const blobUrls: Record<string, string> = {};
      Object.entries(fileMap).forEach(([path, file]) => {
        blobUrls[path] = URL.createObjectURL(file);
      });
      
      // Create URL modifier function
      const urlModifier = (url: string): string => {
        // Handle relative paths
        if (url.startsWith('./')) {
          url = url.substring(2);
        }
        
        // Try to find the file in our map
        const normalizedPath = `/${url}`;
        if (blobUrls[normalizedPath]) {
          return blobUrls[normalizedPath];
        }
        
        // If not found, return original URL
        return url;
      };
      
      // Register the URL modifier with the URDF processor
      const urdfProcessor = {
        loadUrdf: (url: string) => {
          // This will be called by the URDF viewer component
          console.log("Loading URDF:", url);
        },
        setUrlModifierFunc: (modifier: (url: string) => string) => {
          // This will be called by the URDF viewer component
          console.log("Setting URL modifier function", modifier);
        }
      };
      
      registerUrdfProcessor(urdfProcessor);
      
      // Create a blob URL for the URDF file
      const urdfBlobUrl = URL.createObjectURL(urdfFile);
      
      // Set the URL modifier function
      urdfProcessor.setUrlModifierFunc(urlModifier);
      
      // Load the URDF file
      urdfProcessor.loadUrdf(urdfBlobUrl);
      
      setUploadStatus({ 
        status: "success", 
        message: `Successfully loaded ${urdfFile.name}` 
      });
      
      // Close the dialog after a short delay
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      console.error("Error processing files:", error);
      setUploadStatus({ 
        status: "error", 
        message: `Error: ${(error as Error).message || "Unknown error"}` 
      });
    }
  }, [registerUrdfProcessor, onClose]);

  // Handle drop event
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  }, [processFiles]);

  // Handle file input change
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  }, [processFiles]);

  // Handle browse button click
  const handleBrowseClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-background/90 backdrop-blur-md flex items-center justify-center p-4">
      {/* Close button */}
      <button 
        className="absolute top-4 right-4 text-foreground/70 hover:text-foreground"
        onClick={onClose}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      
      {/* Drop zone */}
      <div 
        className={`w-full max-w-2xl h-80 rounded-2xl border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center p-8 ${
          isDragging 
            ? "border-highlight bg-highlight/10" 
            : "border-brand/30 hover:border-brand/50"
        }`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {uploadStatus.status === "idle" && (
          <>
            <div className="text-6xl mb-4">📁</div>
            <h3 className="text-xl font-medium text-foreground mb-2">
              Drop your robot files here
            </h3>
            <p className="text-foreground/70 text-center mb-6 max-w-md">
              Upload a URDF file and its associated meshes. Make sure to include all required files.
            </p>
            <div className="flex gap-4">
              <button 
                className="px-4 py-2 bg-brand text-background rounded-lg hover:bg-brand/90 transition-colors"
                onClick={handleBrowseClick}
              >
                Browse Files
              </button>
              <input 
                ref={fileInputRef}
                type="file" 
                multiple 
                className="hidden" 
                onChange={handleFileChange}
                accept=".urdf,.stl,.dae,.obj,.mtl"
              />
            </div>
          </>
        )}
        
        {uploadStatus.status === "loading" && (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand mb-4"></div>
            <p className="text-foreground">{uploadStatus.message}</p>
          </div>
        )}
        
        {uploadStatus.status === "success" && (
          <div className="flex flex-col items-center">
            <div className="text-6xl mb-4">✅</div>
            <p className="text-foreground">{uploadStatus.message}</p>
          </div>
        )}
        
        {uploadStatus.status === "error" && (
          <div className="flex flex-col items-center">
            <div className="text-6xl mb-4">❌</div>
            <p className="text-red-500 mb-4">{uploadStatus.message}</p>
            <button 
              className="px-4 py-2 bg-brand text-background rounded-lg hover:bg-brand/90 transition-colors"
              onClick={() => setUploadStatus({ status: "idle" })}
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
