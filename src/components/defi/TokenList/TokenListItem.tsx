'use client';

import React from 'react';
import Link from 'next/link';
import { Token } from '@/types/graphql';
import { formatBigIntToFixed, formatCurrency, getTimeAgo, formatPercentage } from '@/lib/bigint-utils';

interface TokenListItemProps {
  token: Token;
}

export function TokenListItem({ token }: TokenListItemProps) {
  // Calculate price change from recent trade
  const recentTrade = token.trades?.[0];
  const currentPrice = BigInt(token.currentPrice);
  const previousPrice = recentTrade ? BigInt(recentTrade.price) : currentPrice;
  const priceChange = currentPrice - previousPrice;
  const priceChangePercent = previousPrice > 0 
    ? Number((priceChange * BigInt(10000)) / previousPrice) / 100
    : 0;

  // Calculate progress to graduation (assuming $50K threshold)
  const graduationThreshold = BigInt('50000000000000000000000'); // 50K CORE in wei
  const progress = Number((BigInt(token.totalCoreRaised) * BigInt(100)) / graduationThreshold);

  return (
    <Link href={`/token/${token.id}`}>
      <div className="bg-surface-default dark:bg-dark-surface border border-border-primary dark:border-dark-border-primary rounded-xl p-6 hover:border-core-orange-500 hover:shadow-lg hover:shadow-core-orange-500/10 dark:hover:shadow-md-dark transition-all duration-200 cursor-pointer">
        {/* Token Header */}
        <div className="flex items-center gap-4 mb-4">
          {/* Token Icon */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-core-orange-500 to-bitcoin-gold-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
            {token.image ? (
              <img 
                src={token.image} 
                alt={token.name}
                className="w-12 h-12 rounded-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling!.textContent = token.symbol.charAt(0);
                }}
              />
            ) : null}
            <span className={token.image ? 'hidden' : ''}>
              {token.symbol.charAt(0)}
            </span>
          </div>
          
          {/* Token Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary truncate">
              {token.name}
            </h3>
            <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
              {token.symbol}
            </p>
          </div>

          {/* Status Badge */}
          {token.graduated ? (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-success-500 dark:text-dark-success bg-success-50 dark:bg-dark-success-bg border border-success-200 dark:border-dark-success-border">
              Graduated
            </span>
          ) : (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-info-500 dark:text-dark-info bg-info-50 dark:bg-dark-info-bg border border-info-200 dark:border-dark-info-border">
              Active
            </span>
          )}
        </div>

        {/* Token Metrics */}
        <div className="space-y-3">
          {/* Price and Change */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-text-secondary dark:text-dark-text-secondary">Price</span>
            <div className="text-right">
              <div className="font-mono text-sm font-medium text-text-primary dark:text-dark-text-primary">
                {formatBigIntToFixed(currentPrice)} CORE
              </div>
              {priceChangePercent !== 0 && (
                <div className={`text-xs ${
                  priceChangePercent >= 0 ? 'text-success-500 dark:text-dark-success' : 'text-error-500 dark:text-dark-error'
                }`}>
                  {formatPercentage(priceChangePercent)}
                </div>
              )}
            </div>
          </div>

          {/* Market Cap */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-text-secondary dark:text-dark-text-secondary">Market Cap</span>
            <span className="font-mono text-sm font-medium text-text-primary dark:text-dark-text-primary">
              {formatCurrency(token.totalCoreRaised)}
            </span>
          </div>

          {/* Progress to Graduation */}
          {!token.graduated && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary dark:text-dark-text-secondary">Progress to DEX</span>
                <span className="font-medium text-text-primary dark:text-dark-text-primary">{Math.min(progress, 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-surface-hover dark:bg-dark-surface-hover rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-core-orange-500 to-bitcoin-gold-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* Created Time */}
          <div className="flex justify-between items-center text-xs text-text-tertiary dark:text-dark-text-tertiary">
            <span>Created</span>
            <span>{getTimeAgo(token.createdAt)}</span>
          </div>
        </div>

        {/* Description Preview */}
        {token.description && (
          <div className="mt-4 pt-4 border-t border-border-secondary dark:border-dark-border-secondary">
            <p className="text-sm text-text-secondary dark:text-dark-text-secondary line-clamp-2">
              {token.description}
            </p>
          </div>
        )}
      </div>
    </Link>
  );
}
