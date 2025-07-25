'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface NavigationProps {
  className?: string;
}

const navigationItems = [
  { href: '/', label: 'Home' },
  { href: '/launch', label: 'Launch' },
  { href: '/rankings', label: 'Rankings' },
  { href: '/about', label: 'About' },
];

const Navigation: React.FC<NavigationProps> = ({ className = '' }) => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className={`hidden md:flex items-center gap-1 lg:gap-4 ${className}`} role="navigation">
      {navigationItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`
            text-base font-medium px-4 py-2 rounded-md transition-all duration-200
            hover:text-core-orange-500 hover:bg-core-orange-500/10
            focus:outline-none focus:ring-2 focus:ring-core-orange-500/20
            ${
              isActive(item.href)
                ? 'text-core-orange-500 bg-core-orange-500/10'
                : 'text-gray-700 dark:text-gray-300'
            }
          `}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
