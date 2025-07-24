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
      <div className="w-8 h-8 bg-gradient-to-r from-core-orange-500 to-bitcoin-gold-500 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-lg">C</span>
      </div>
      <span className="text-xl font-bold text-gray-900">
        Core<span className="text-core-orange-500">Pump</span>
      </span>
    </Link>
  );
};

export default Logo;
