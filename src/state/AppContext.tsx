import React, { createContext, useContext, useState, ReactNode } from "react";

interface AppStateContextType {
  isHelpSidebarOpen: boolean;
  toggleHelpSidebar: () => void;
  setHelpSidebarOpen: (isOpen: boolean) => void;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [isHelpSidebarOpen, setIsHelpSidebarOpen] = useState(false);

  const toggleHelpSidebar = () => setIsHelpSidebarOpen((prev) => !prev);
  const setHelpSidebarOpen = (isOpen: boolean) => setIsHelpSidebarOpen(isOpen);

  return (
    <AppStateContext.Provider value={{ isHelpSidebarOpen, toggleHelpSidebar, setHelpSidebarOpen }}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return context;
}
