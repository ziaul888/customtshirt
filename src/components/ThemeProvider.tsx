'use client';

import React, { useEffect } from 'react';
import { useThemeStore, useSystemThemeListener, initializeTheme } from '@/stores';

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { theme, resolvedTheme } = useThemeStore();
  
  // Set up system theme listener
  useSystemThemeListener();

  // Initialize theme on mount
  useEffect(() => {
    initializeTheme();
  }, []);

  // Apply theme changes to document
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const root = window.document.documentElement;
    
    if (resolvedTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [resolvedTheme]);

  return <>{children}</>;
};

export default ThemeProvider;