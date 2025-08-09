'use client';

import React from 'react';
import { IconType } from 'react-icons';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: IconType;
  rightIcon?: IconType;
  onRightIconClick?: () => void;
  variant?: 'default' | 'error' | 'success';
  fullWidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      onRightIconClick,
      variant = 'default',
      fullWidth = true,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = error ? `${inputId}-error` : undefined;
    const helperId = helperText ? `${inputId}-helper` : undefined;

    const baseInputClasses = 'input-base py-[1rem]';
    
    const variantClasses = {
      default: 'border-gray-300 focus:border-core-orange-500 focus:ring-core-orange-500/10 dark:border-dark-border-primary dark:bg-dark-surface dark:text-dark-text-primary dark:focus:border-core-orange-500',
      error: 'border-error-500 focus:border-error-500 focus:ring-error-500/10 dark:border-dark-error dark:bg-dark-surface dark:text-dark-text-primary',
      success: 'border-success-500 focus:border-success-500 focus:ring-success-500/10 dark:border-dark-success dark:bg-dark-surface dark:text-dark-text-primary'
    };

    const actualVariant = error ? 'error' : variant;
    const widthClass = fullWidth ? 'w-full' : '';
    
    const inputClasses = [
      baseInputClasses,
      variantClasses[actualVariant],
      LeftIcon ? 'pl-12' : 'pl-[0.75rem]',
      RightIcon ? 'pr-12' : 'pr-[0.75rem]',
      widthClass,
      className
    ].filter(Boolean).join(' ');

    const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;

    return (
      <div className={`space-y-2 ${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label htmlFor={inputId} className="text-label text-gray-700 dark:text-dark-text-secondary">
            {label}
          </label>
        )}
        
        <div className="relative">
          {LeftIcon && (
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-dark-text-tertiary">
              <LeftIcon className="w-5 h-5" />
            </div>
          )}
          
          <input
            ref={ref}
            id={inputId}
            className={inputClasses}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={describedBy}
            {...props}
          />
          
          {RightIcon && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              {onRightIconClick ? (
                <button
                  type="button"
                  onClick={onRightIconClick}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none focus:text-core-orange-500"
                  aria-label="Toggle input action"
                >
                  <RightIcon className="w-5 h-5" />
                </button>
              ) : (
                <RightIcon className="w-5 h-5 text-gray-400" />
              )}
            </div>
          )}
        </div>
        
        {error && (
          <p id={errorId} className="text-sm text-error-500" role="alert">
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p id={helperId} className="text-sm text-gray-600">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
