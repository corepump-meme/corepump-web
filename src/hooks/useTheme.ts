'use client';

import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Get stored theme or default to system
    const stored = (localStorage.getItem('theme') as Theme) || 'system';
    setTheme(stored);
    
    const updateResolvedTheme = () => {
      let resolved: ResolvedTheme;
      
      if (stored === 'system') {
        resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      } else {
        resolved = stored as ResolvedTheme;
      }
      
      setResolvedTheme(resolved);
      
      // Update HTML attribute for CSS targeting
      document.documentElement.setAttribute('data-theme', resolved);
      
      // Also update class for Tailwind dark mode
      if (resolved === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    updateResolvedTheme();
    setIsLoaded(true);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (stored === 'system') {
        updateResolvedTheme();
      }
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const setThemeMode = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Immediately update resolved theme
    let resolved: ResolvedTheme;
    
    if (newTheme === 'system') {
      resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
      resolved = newTheme as ResolvedTheme;
    }
    
    setResolvedTheme(resolved);
    
    // Update HTML attribute and class
    document.documentElement.setAttribute('data-theme', resolved);
    
    if (resolved === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return { 
    theme, 
    resolvedTheme, 
    setTheme: setThemeMode, 
    isLoaded 
  };
};
