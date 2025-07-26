'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { formatAddress, getBTCScanAddressUrl } from '@/lib/btcscan-utils';

interface AddressLinkProps {
  address: string;
  label?: string;
  showCopy?: boolean;
  showExternalLink?: boolean;
  startChars?: number;
  endChars?: number;
  className?: string;
}

export function AddressLink({
  address,
  label,
  showCopy = true,
  showExternalLink = true,
  startChars = 6,
  endChars = 4,
  className = '',
}: AddressLinkProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy address:', err);
    }
  };

  const formattedAddress = formatAddress(address, startChars, endChars);
  const btcScanUrl = getBTCScanAddressUrl(address);

  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      {showExternalLink ? (
        <Link 
          href={btcScanUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-sm text-core-orange-600 hover:text-core-orange-700 dark:text-core-orange-500 dark:hover:text-core-orange-400 transition-colors duration-200"
        >
          {formattedAddress}
        </Link>
      ) : (
        <span className="font-mono text-sm text-gray-700 dark:text-dark-text-secondary">
          {formattedAddress}
        </span>
      )}
      
      {showCopy && (
        <button
          onClick={handleCopy}
          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-dark-surface-hover transition-colors duration-200"
          aria-label={`Copy ${label || 'address'}`}
          title={`Copy ${label || 'address'}`}
        >
          {copied ? (
            <svg className="w-3 h-3 text-success-500 dark:text-dark-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-3 h-3 text-gray-400 hover:text-gray-600 dark:text-dark-text-tertiary dark:hover:text-dark-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
}
