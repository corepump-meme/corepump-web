'use client';

import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'ghost';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  children: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      padding = 'md',
      hover = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses = 'rounded-xl transition-all duration-200';

    const variantClasses = {
      default: 'bg-surface-default dark:bg-dark-surface border border-border-primary dark:border-dark-border-primary shadow-sm dark:shadow-sm-dark',
      elevated: 'bg-surface-elevated dark:bg-dark-surface-elevated shadow-lg dark:shadow-md-dark border border-border-secondary dark:border-dark-border-secondary',
      outlined: 'bg-surface-default dark:bg-dark-surface border-2 border-border-primary dark:border-dark-border-primary',
      ghost: 'bg-transparent'
    };

    const paddingClasses = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8'
    };

    const hoverClasses = hover ? 'hover:shadow-lg dark:hover:shadow-md-dark hover:-translate-y-0.5 cursor-pointer' : '';

    const classes = [
      baseClasses,
      variantClasses[variant],
      paddingClasses[padding],
      hoverClasses,
      className
    ].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
