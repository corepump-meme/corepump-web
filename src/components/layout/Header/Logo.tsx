'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <Link 
      href="/" 
      className={`flex items-center gap-3 hover:opacity-80 transition-opacity duration-200 ${className}`}
      aria-label="CorePump Home"
    >
      <Image src="/logo.png" alt="CorePump Logo" width={32} height={32} className='rounded-full' />
      <span className="text-xl font-bold text-gray-900 dark:text-white">
        Core<span className="text-core-orange-500">Pump</span>
      </span>
    </Link>
  );
};

export default Logo;
