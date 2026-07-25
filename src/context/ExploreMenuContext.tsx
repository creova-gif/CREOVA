import { createContext, useContext, useState, ReactNode } from 'react';

interface ExploreMenuContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const ExploreMenuContext = createContext<ExploreMenuContextType | undefined>(undefined);

export function ExploreMenuProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ExploreMenuContext.Provider value={{ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }}>
      {children}
    </ExploreMenuContext.Provider>
  );
}

export function useExploreMenu() {
  const context = useContext(ExploreMenuContext);
  if (!context) {
    throw new Error('useExploreMenu must be used within ExploreMenuProvider');
  }
  return context;
}
