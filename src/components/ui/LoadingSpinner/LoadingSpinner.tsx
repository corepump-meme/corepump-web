'use client';

import React from 'react';

export interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'current';
  text?: string;
}

const LoadingSpinner = React.forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  (
    {
      size = 'md',
      color = 'primary',
      text,
      className = '',
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      xs: 'w-4 h-4 border-2',
      sm: 'w-5 h-5 border-2',
      md: 'w-6 h-6 border-3',
      lg: 'w-8 h-8 border-4',
      xl: 'w-12 h-12 border-4'
    };

    const colorClasses = {
      primary: 'border-gray-200 border-t-core-orange-500',
      secondary: 'border-gray-200 border-t-bitcoin-gold-500',
      current: 'border-current/20 border-t-current'
    };

    const textSizeClasses = {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl'
    };

    const spinnerClasses = [
      'rounded-full animate-spin',
      sizeClasses[size],
      colorClasses[color],
      className
    ].filter(Boolean).join(' ');

    if (text) {
      return (
        <div ref={ref} className="flex flex-col items-center gap-3" {...props}>
          <div className={spinnerClasses} />
          <span className={`text-gray-600 ${textSizeClasses[size]}`}>
            {text}
          </span>
        </div>
      );
    }

    return (
      <div ref={ref} className={spinnerClasses} {...props} />
    );
  }
);

LoadingSpinner.displayName = 'LoadingSpinner';

export default LoadingSpinner;
