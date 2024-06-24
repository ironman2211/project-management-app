import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of the context value
interface AppContextType {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

// Create the context with an initial value
const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppWrapper({ children }: { children: ReactNode }) {
  // Use state to manage the loading value
  const [loading, setLoading] = useState(false);

  return (
    <AppContext.Provider value={{ loading, setLoading }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the AppContext
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppWrapper');
  }
  return context;
}
