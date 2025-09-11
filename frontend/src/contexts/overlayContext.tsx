import React, { createContext, useState, useContext } from "react";

type OverlayContextProps = {
  focused: boolean;
  toggleFocused: () => void;
  setFocused: (value: boolean) => void;
};

type OverlayProviderProps = {
  children: React.ReactNode;
};

const OverlayContext = createContext<OverlayContextProps | null>(null);

export const OverlayProvider = ({ children }: OverlayProviderProps) => {
  const [focused, setFocuseded] = useState(false);

  const toggleFocused = () => setFocuseded((prev) => !prev);
  const setFocused = (value: boolean) => setFocuseded(value);

  return <OverlayContext.Provider value={{ focused, toggleFocused, setFocused }}>{children}</OverlayContext.Provider>;
};

export const useOverlay = () => {
  const ctx = useContext(OverlayContext);
  if (!ctx) {
    throw new Error("useOverlay must be used inside OverlayProvider");
  }
  return ctx;
};
