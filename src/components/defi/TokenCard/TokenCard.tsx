'use client';

import React from 'react';
import { FiTrendingUp, FiTrendingDown, FiExternalLink } from 'react-icons/fi';
import { Card } from '../../ui/Card';
import Image from 'next/image';

export interface TokenCardProps {
  token: {
    id: string;
    name: string;
    symbol: string;
    description?: string;
    image?: string;
    creator: string;
    currentPrice: string;
    totalCoreRaised: string;
    tokensSold: string;
    graduated: boolean;
    createdAt: string;
  };
  priceChange?: number;
  onClick?: () => void;
  className?: string;
}

const TokenCard: React.FC<TokenCardProps> = ({
  token,
  priceChange,
  onClick,
  className = ''
}) => {
  const formatPrice = (price: string) => {
    const num = parseFloat(price);
    if (num < 0.000001) return '< 0.000001';
    if (num < 0.001) return num.toFixed(6);
    if (num < 1) return num.toFixed(4);
    return num.toFixed(3);
  };

  const formatMarketCap = (raised: string) => {
    const num = parseFloat(raised);
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toFixed(2);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getProgressToGraduation = () => {
    const raised = parseFloat(token.totalCoreRaised);
    const graduationThreshold = 50000; // $50K in CORE equivalent
    return Math.min((raised / graduationThreshold) * 100, 100);
  };

  const progress = getProgressToGraduation();
  const isPricePositive = priceChange !== undefined ? priceChange >= 0 : null;

  return (
    <Card
      hover={!!onClick}
      onClick={onClick}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Graduation Badge */}
      {token.graduated && (
        <div className="absolute top-4 right-4 bg-success-500 dark:bg-dark-success text-white text-xs font-medium px-2 py-1 rounded-full shadow-sm">
          Graduated
        </div>
      )}

      {/* Token Header */}
      <div className="flex items-center gap-4 mb-4">
        {/* Token Icon */}
        <div className="relative">
          {token.image ? (
            <Image
              src={token.image}
              alt={token.name}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-core-orange-500 to-bitcoin-gold-500 flex items-center justify-center text-white font-semibold text-lg">
              {token.symbol.charAt(0)}
            </div>
          )}
        </div>

        {/* Token Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-lg text-text-primary dark:text-dark-text-primary truncate">
              {token.name}
            </h3>
            {onClick && (
              <FiExternalLink className="w-4 h-4 text-text-tertiary dark:text-dark-text-tertiary flex-shrink-0" />
            )}
          </div>
          <p className="text-sm text-text-secondary dark:text-dark-text-secondary font-medium">{token.symbol}</p>
          <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary text-mono">
            by {formatAddress(token.creator)}
          </p>
        </div>
      </div>

      {/* Description */}
      {token.description && (
        <p className="text-sm text-text-secondary dark:text-dark-text-secondary mb-4 line-clamp-2">
          {token.description}
        </p>
      )}

      {/* Price and Stats */}
      <div className="space-y-3">
        {/* Current Price */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary dark:text-dark-text-secondary">Price</span>
          <div className="flex items-center gap-2">
            <span className="text-price text-text-primary dark:text-dark-text-primary">
              {formatPrice(token.currentPrice)} CORE
            </span>
            {isPricePositive !== null && (
              <div className={`flex items-center gap-1 text-sm ${
                isPricePositive ? 'text-success-500 dark:text-dark-success' : 'text-error-500 dark:text-dark-error'
              }`}>
                {isPricePositive ? (
                  <FiTrendingUp className="w-4 h-4" />
                ) : (
                  <FiTrendingDown className="w-4 h-4" />
                )}
                <span>{Math.abs(priceChange!).toFixed(2)}%</span>
              </div>
            )}
          </div>
        </div>

        {/* Market Cap */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary dark:text-dark-text-secondary">Market Cap</span>
          <span className="text-sm font-medium text-text-primary dark:text-dark-text-primary">
            {formatMarketCap(token.totalCoreRaised)} CORE
          </span>
        </div>

        {/* Progress to Graduation */}
        {!token.graduated && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary dark:text-dark-text-secondary">Progress to DEX</span>
              <span className="text-sm font-medium text-text-primary dark:text-dark-text-primary">
                {progress.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-surface-hover dark:bg-dark-surface-hover rounded-full h-2">
              <div
                className="bg-gradient-to-r from-core-orange-500 to-bitcoin-gold-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Creation Date */}
      <div className="mt-4 pt-4 border-t border-border-secondary dark:border-dark-border-secondary">
        <span className="text-xs text-text-tertiary dark:text-dark-text-tertiary">
          Created {new Date(parseInt(token.createdAt) * 1000).toLocaleDateString()}
        </span>
      </div>
    </Card>
  );
};

export default TokenCard;
