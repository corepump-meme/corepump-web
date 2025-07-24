'use client';

import React from 'react';
import { IconType } from 'react-icons';
import { FiCheckCircle, FiAlertTriangle, FiXCircle, FiInfo, FiX } from 'react-icons/fi';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'success' | 'warning' | 'error' | 'info';
  title?: string;
  description?: string;
  icon?: IconType;
  dismissible?: boolean;
  onDismiss?: () => void;
  children?: React.ReactNode;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = 'info',
      title,
      description,
      icon,
      dismissible = false,
      onDismiss,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses = 'p-4 rounded-lg border flex items-start gap-3 animate-fade-in';

    const variantClasses = {
      success: 'bg-success-50 border-success-500 text-success-900',
      warning: 'bg-warning-50 border-warning-500 text-warning-900',
      error: 'bg-error-50 border-error-500 text-error-900',
      info: 'bg-info-50 border-info-500 text-info-900'
    };

    const iconMap = {
      success: FiCheckCircle,
      warning: FiAlertTriangle,
      error: FiXCircle,
      info: FiInfo
    };

    const iconColorClasses = {
      success: 'text-success-500',
      warning: 'text-warning-500',
      error: 'text-error-500',
      info: 'text-info-500'
    };

    const IconComponent = icon || iconMap[variant];

    const classes = [
      baseClasses,
      variantClasses[variant],
      className
    ].filter(Boolean).join(' ');

    const content = children || (
      <div className="flex-1">
        {title && (
          <h4 className="font-medium mb-1">{title}</h4>
        )}
        {description && (
          <p className="text-sm opacity-90">{description}</p>
        )}
      </div>
    );

    return (
      <div ref={ref} className={classes} role="alert" {...props}>
        <IconComponent className={`w-5 h-5 mt-0.5 flex-shrink-0 ${iconColorClasses[variant]}`} />
        
        {content}
        
        {dismissible && onDismiss && (
          <button
            onClick={onDismiss}
            className={`flex-shrink-0 ml-2 p-1 rounded-md transition-colors duration-200 hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-current focus:ring-opacity-20 ${iconColorClasses[variant]}`}
            aria-label="Dismiss alert"
          >
            <FiX className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export default Alert;
