'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiMenu, FiX } from 'react-icons/fi';
import { IconButton } from '../../ui/IconButton';

export interface MobileMenuProps {
  className?: string;
}

const navigationItems = [
  { href: '/', label: 'Home' },
  { href: '/launch', label: 'Launch' },
  { href: '/rankings', label: 'Rankings' },
  { href: '/about', label: 'About' },
];

const MobileMenu: React.FC<MobileMenuProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

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
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <div className={`md:hidden ${className}`}>
      {/* Hamburger Button */}
      <IconButton
        icon={FiMenu}
        size="md"
        variant="ghost"
        onClick={() => setIsOpen(true)}
        aria-label="Open navigation menu"
        className="text-gray-700 hover:text-core-orange-500"
      />

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 animate-fade-in"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Menu Panel */}
          <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 animate-slide-in">
            {/* Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
              <IconButton
                icon={FiX}
                size="md"
                variant="ghost"
                onClick={() => setIsOpen(false)}
                aria-label="Close navigation menu"
                className="text-gray-700 hover:text-core-orange-500"
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
                            : 'text-gray-700 hover:text-core-orange-500 hover:bg-core-orange-500/10'
                        }
                      `}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </>
      )}
    </div>
  );
};

export default MobileMenu;
