'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MobileMenuContextType {
  isOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
}

const MobileMenuContext = createContext<MobileMenuContextType | undefined>(undefined);

export const useMobileMenu = () => {
  const context = useContext(MobileMenuContext);
  if (context === undefined) {
    throw new Error('useMobileMenu must be used within a MobileMenuProvider');
  }
  return context;
};

interface MobileMenuProviderProps {
  children: ReactNode;
}

export const MobileMenuProvider: React.FC<MobileMenuProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  const value = {
    isOpen,
    openMenu,
    closeMenu,
  };

  return (
    <MobileMenuContext.Provider value={value}>
      {children}
    </MobileMenuContext.Provider>
  );
};
