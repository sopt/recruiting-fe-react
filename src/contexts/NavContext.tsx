import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

interface NavContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const NavContext = createContext<NavContextValue | null>(null);

interface NavProviderProps {
  children: ReactNode;
}

export const NavProvider = ({ children }: NavProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const value = {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen((prev) => !prev),
  };

  return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
};

export const useNav = () => {
  const context = useContext(NavContext);

  if (!context)
    throw new Error('useNav 훅은 NavProvider 내에서만 사용할 수 있습니다.');

  return context;
};
