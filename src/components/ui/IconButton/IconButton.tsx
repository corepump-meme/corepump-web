'use client';

import React from 'react';
import { IconType } from 'react-icons';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconType;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  'aria-label': string; // Required for accessibility
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon: Icon,
      variant = 'ghost',
      size = 'md',
      loading = false,
      disabled,
      className = '',
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const baseClasses = 'btn-base focus-ring rounded-full';

    const variantClasses = {
      primary: 'bg-gradient-to-r from-core-orange-500 to-bitcoin-gold-500 text-white shadow-sm hover:shadow-lg',
      secondary: 'bg-transparent text-core-orange-500 border-2 border-core-orange-500 hover:bg-core-orange-500 hover:text-white',
      ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 hover:text-gray-900',
      danger: 'bg-error-500 text-white hover:bg-error-600 shadow-sm hover:shadow-lg'
    };

    const sizeClasses = {
      sm: 'p-2',
      md: 'p-3',
      lg: 'p-4'
    };

    const iconSizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6'
    };

    const classes = [
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      className
    ].filter(Boolean).join(' ');

    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={classes}
        disabled={isDisabled}
        aria-label={ariaLabel}
        {...props}
      >
        {loading ? (
          <div className={`animate-spin rounded-full border-2 border-current border-t-transparent ${iconSizeClasses[size]}`} />
        ) : (
          <Icon className={iconSizeClasses[size]} />
        )}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

export default IconButton;
