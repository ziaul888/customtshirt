import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import React from 'react';

export type Theme = 'light' | 'dark' | 'system';

export interface ThemeState {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  systemTheme: 'light' | 'dark';
}

export interface ThemeActions {
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setSystemTheme: (systemTheme: 'light' | 'dark') => void;
  getResolvedTheme: () => 'light' | 'dark';
}

export type ThemeStore = ThemeState & ThemeActions;

// Function to detect system theme
const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Function to apply theme to document
const applyTheme = (theme: 'light' | 'dark') => {
  if (typeof window === 'undefined') return;
  
  const root = window.document.documentElement;
  
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
};

export const useThemeStore = create<ThemeStore>()(
  devtools(
    persist(
      (set, get) => {
        // Initialize system theme
        const systemTheme = getSystemTheme();
        
        return {
          // Initial state
          theme: 'system',
          resolvedTheme: systemTheme,
          systemTheme,

          // Actions
          setTheme: (theme: Theme) => {
            const state = get();
            const resolvedTheme = theme === 'system' ? state.systemTheme : theme;
            
            set({ theme, resolvedTheme }, false, 'setTheme');
            applyTheme(resolvedTheme);
          },

          toggleTheme: () => {
            const state = get();
            const currentResolved = state.resolvedTheme;
            const newTheme = currentResolved === 'light' ? 'dark' : 'light';
            
            set({ 
              theme: newTheme, 
              resolvedTheme: newTheme 
            }, false, 'toggleTheme');
            applyTheme(newTheme);
          },

          setSystemTheme: (systemTheme: 'light' | 'dark') => {
            const state = get();
            const resolvedTheme = state.theme === 'system' ? systemTheme : state.resolvedTheme;
            
            set({ 
              systemTheme, 
              resolvedTheme 
            }, false, 'setSystemTheme');
            
            if (state.theme === 'system') {
              applyTheme(resolvedTheme);
            }
          },

          getResolvedTheme: () => {
            const state = get();
            return state.theme === 'system' ? state.systemTheme : state.resolvedTheme;
          },
        };
      },
      {
        name: 'theme-store',
        partialize: (state) => ({ theme: state.theme }), // Only persist the theme preference
      }
    ),
    {
      name: 'theme-store',
    }
  )
);

// Hook to set up system theme listener
export const useSystemThemeListener = () => {
  const setSystemTheme = useThemeStore((state) => state.setSystemTheme);
  
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    // Set initial system theme
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [setSystemTheme]);
};

// Initialize theme on app start
export const initializeTheme = () => {
  if (typeof window === 'undefined') return;
  
  const store = useThemeStore.getState();
  const resolvedTheme = store.getResolvedTheme();
  applyTheme(resolvedTheme);
};