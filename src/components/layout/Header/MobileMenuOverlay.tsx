'use client';

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiX } from 'react-icons/fi';
import { IconButton } from '../../ui/IconButton';
import { useMobileMenu } from './MobileMenuProvider';

const navigationItems = [
  { href: '/', label: 'Home' },
  { href: '/launch', label: 'Launch' },
  { href: '/rankings', label: 'Rankings' },
  { href: '/about', label: 'About' },
];

const MobileMenuOverlay: React.FC = () => {
  const { isOpen, closeMenu } = useMobileMenu();
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  // Close menu when route changes
//   useEffect(() => {
    // closeMenu();
    // console.log("close", closeMenu)
//   }, [pathname, closeMenu]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, closeMenu]);

  // Don't render anything if menu is closed or we're on server
  if (!isOpen || typeof window === 'undefined') {
    return null;
  }

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-[9998] animate-fade-in"
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white dark:bg-gray-900 shadow-2xl z-[9999] animate-slide-in">
        {/* Menu Header */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h2>
          <IconButton
            icon={FiX}
            size="md"
            variant="ghost"
            onClick={closeMenu}
            aria-label="Close navigation menu"
            className="text-gray-700 dark:text-gray-300 hover:text-core-orange-500"
          />
        </div>

        {/* Navigation Links */}
        <nav className="p-6" role="navigation">
          <ul className="space-y-4">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    block w-full text-left px-4 py-3 rounded-lg text-base font-medium
                    transition-all duration-200 min-h-[44px] flex items-center
                    focus:outline-none focus:ring-2 focus:ring-core-orange-500/20
                    ${
                      isActive(item.href)
                        ? 'text-core-orange-500 bg-core-orange-500/10'
                        : 'text-gray-700 dark:text-gray-300 hover:text-core-orange-500 hover:bg-core-orange-500/10'
                    }
                  `}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>,
    document.body
  );
};

export default MobileMenuOverlay;
