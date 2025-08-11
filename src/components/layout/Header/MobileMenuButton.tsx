'use client';

import React from 'react';
import { FiMenu } from 'react-icons/fi';
import { IconButton } from '../../ui/IconButton';
import { useMobileMenu } from './MobileMenuProvider';

export interface MobileMenuButtonProps {
  className?: string;
}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ className = '' }) => {
  const { openMenu } = useMobileMenu();

  return (
    <div className={`md:hidden ${className}`}>
      <IconButton
        icon={FiMenu}
        size="sm"
        variant="ghost"
        onClick={openMenu}
        aria-label="Open navigation menu"
        className="text-gray-700 dark:text-gray-300 hover:text-core-orange-500"
      />
    </div>
  );
};

export default MobileMenuButton;
