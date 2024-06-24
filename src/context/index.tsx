"use client";
import { createContext, useContext, useState } from "react";

// Define the type for the context value
type AppContextType = {
  task: {
    title: string;
    description: string;
    status: string;
    priority: string;
    dueDate: Date;
    assignId: string;
  };
  settask: React.Dispatch<React.SetStateAction<{
    title: string;
    description: string;
    status: string;
    priority: string;
    dueDate: Date;
    assignId: string;
  }>>;
};

const AppContext = createContext<AppContextType | null>(null);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [task, settask] = useState({
    title: "",
    description: "",
    status: "",
    priority: "",
    dueDate: new Date(),
    assignId: "",
  });

  return (
    <AppContext.Provider value={{ task, settask }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppWrapper");
  }
  return context;
};
