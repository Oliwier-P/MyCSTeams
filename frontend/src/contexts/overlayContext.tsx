import React, { createContext, useState, useContext } from "react";

type OverlayContextProps = {
  focused: boolean;
  toggleFocused: () => void;
};

type OverlayProviderProps = {
  children: React.ReactNode;
};

const OverlayContext = createContext<OverlayContextProps | null>(null);

export const OverlayProvider = ({ children }: OverlayProviderProps) => {
  const [focused, setFocused] = useState(false);

  const toggleFocused = () => setFocused((prev) => !prev);

  return <OverlayContext.Provider value={{ focused, toggleFocused }}>{children}</OverlayContext.Provider>;
};

export const useOverlay = () => {
  const ctx = useContext(OverlayContext);
  if (!ctx) {
    throw new Error("useOverlay must be used inside OverlayProvider");
  }
  return ctx;
};
