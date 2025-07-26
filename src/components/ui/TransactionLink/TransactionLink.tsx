'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { getBTCScanTxUrl } from '@/lib/btcscan-utils';

interface TransactionLinkProps {
  txHash: string;
  className?: string;
  children?: React.ReactNode;
  showCopy?: boolean;
}

export function TransactionLink({ 
  txHash, 
  className = '', 
  children,
  showCopy = true 
}: TransactionLinkProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(txHash);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy transaction hash:', err);
    }
  };

  const btcScanUrl = getBTCScanTxUrl(txHash);

  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      <Link
        href={btcScanUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-core-orange-600 hover:text-core-orange-700 dark:text-core-orange-500 dark:hover:text-core-orange-400 transition-colors duration-200"
        aria-label="View transaction on BTCScan"
        title="View transaction on BTCScan"
      >
        {children || (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        )}
      </Link>
      
      {showCopy && (
        <button
          onClick={handleCopy}
          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-dark-surface-hover transition-colors duration-200"
          aria-label="Copy transaction hash"
          title="Copy transaction hash"
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
