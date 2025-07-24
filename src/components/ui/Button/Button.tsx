'use client';

import React from 'react';
import { IconType } from 'react-icons';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  icon?: IconType;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      icon: Icon,
      iconPosition = 'left',
      fullWidth = false,
      disabled,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses = 'btn-base focus-ring';

  const variantClasses = {
    primary: 'bg-gradient-to-r from-core-orange-500 to-bitcoin-gold-500 text-white hover:shadow-core-lg hover:-translate-y-0.5 dark:shadow-core-dark',
    secondary: 'bg-transparent text-core-orange-500 border-2 border-core-orange-500 hover:bg-core-orange-500 hover:text-white dark:text-core-orange-500 dark:border-core-orange-500',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-dark-surface-hover dark:hover:text-white',
    danger: 'bg-error-500 text-white hover:bg-error-600 dark:bg-dark-error dark:hover:bg-error-600',
  };

    const sizeClasses = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
      xl: 'px-10 py-5 text-xl'
    };

    const widthClass = fullWidth ? 'w-full' : '';

    const classes = [
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      widthClass,
      className
    ].filter(Boolean).join(' ');

    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={classes}
        disabled={isDisabled}
        {...props}
      >
        {loading && (
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
        )}
        
        {!loading && Icon && iconPosition === 'left' && (
          <Icon className="w-5 h-5" />
        )}
        
        <span>{children}</span>
        
        {!loading && Icon && iconPosition === 'right' && (
          <Icon className="w-5 h-5" />
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
