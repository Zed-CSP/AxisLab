"use client";

import React, { createContext, useCallback, useRef } from "react";

// Define the UrdfProcessor interface
export interface UrdfProcessor {
  loadUrdf: (urdfPath: string) => void;
  setUrlModifierFunc: (func: (url: string) => string) => void;
}

export type UrdfRuntimeContextType = {
  registerUrdfProcessor: (processor: UrdfProcessor) => void;
};

export const UrdfRuntimeContext = createContext<
  UrdfRuntimeContextType | undefined
>(undefined);

export const UrdfRuntimeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const processorRef = useRef<UrdfProcessor | null>(null);

  const registerUrdfProcessor = useCallback((processor: UrdfProcessor) => {
    processorRef.current = processor;
  }, []);

  return (
    <UrdfRuntimeContext.Provider value={{ registerUrdfProcessor }}>
      {children}
    </UrdfRuntimeContext.Provider>
  );
};
