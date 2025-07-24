'use client';

import React from 'react';
import { useTheme } from '@/hooks/useTheme';

const SunIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
  </svg>
);

const MoonIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const ComputerIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);

export interface ThemeToggleProps {
  className?: string;
  showLabels?: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  className = '', 
  showLabels = true 
}) => {
  const { theme, setTheme, isLoaded } = useTheme();

  const themes = [
    { key: 'light' as const, icon: SunIcon, label: 'Light' },
    { key: 'dark' as const, icon: MoonIcon, label: 'Dark' },
    { key: 'system' as const, icon: ComputerIcon, label: 'System' },
  ];

  // Don't render until theme is loaded to prevent hydration mismatch
  if (!isLoaded) {
    return (
      <div className={`flex items-center gap-1 p-1 bg-gray-100 dark:bg-dark-surface rounded-lg ${className}`}>
        <div className="w-20 h-8 bg-gray-200 dark:bg-dark-surface-hover rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-1 p-1 bg-gray-100 dark:bg-dark-surface rounded-lg transition-colors duration-200 ${className}`}>
      {themes.map(({ key, icon: Icon, label }) => (
        <button
          key={key}
          onClick={() => setTheme(key)}
          className={`
            flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
            ${theme === key 
              ? 'bg-white dark:bg-dark-surface-elevated text-gray-900 dark:text-dark-text-primary shadow-sm' 
              : 'text-gray-600 dark:text-dark-text-secondary hover:text-gray-900 dark:hover:text-dark-text-primary hover:bg-gray-50 dark:hover:bg-dark-surface-hover'
            }
          `}
          aria-label={`Switch to ${label.toLowerCase()} theme`}
          title={`Switch to ${label.toLowerCase()} theme`}
        >
          <Icon />
          {showLabels && <span className="hidden sm:inline">{label}</span>}
        </button>
      ))}
    </div>
  );
};

export default ThemeToggle;
