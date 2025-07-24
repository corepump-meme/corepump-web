'use client';

import React from 'react';
import { FiTrendingUp, FiTrendingDown, FiExternalLink } from 'react-icons/fi';
import { Card } from '../../ui/Card';

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
        <div className="absolute top-4 right-4 bg-success-500 text-white text-xs font-medium px-2 py-1 rounded-full">
          Graduated
        </div>
      )}

      {/* Token Header */}
      <div className="flex items-center gap-4 mb-4">
        {/* Token Icon */}
        <div className="relative">
          {token.image ? (
            <img
              src={token.image}
              alt={token.name}
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
            <h3 className="font-semibold text-lg text-gray-900 truncate">
              {token.name}
            </h3>
            {onClick && (
              <FiExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
            )}
          </div>
          <p className="text-sm text-gray-600 font-medium">{token.symbol}</p>
          <p className="text-xs text-gray-500 text-mono">
            by {formatAddress(token.creator)}
          </p>
        </div>
      </div>

      {/* Description */}
      {token.description && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {token.description}
        </p>
      )}

      {/* Price and Stats */}
      <div className="space-y-3">
        {/* Current Price */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Price</span>
          <div className="flex items-center gap-2">
            <span className="text-price text-gray-900">
              {formatPrice(token.currentPrice)} CORE
            </span>
            {isPricePositive !== null && (
              <div className={`flex items-center gap-1 text-sm ${
                isPricePositive ? 'text-success-500' : 'text-error-500'
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
          <span className="text-sm text-gray-600">Market Cap</span>
          <span className="text-sm font-medium text-gray-900">
            {formatMarketCap(token.totalCoreRaised)} CORE
          </span>
        </div>

        {/* Progress to Graduation */}
        {!token.graduated && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Progress to DEX</span>
              <span className="text-sm font-medium text-gray-900">
                {progress.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-core-orange-500 to-bitcoin-gold-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Creation Date */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <span className="text-xs text-gray-500">
          Created {new Date(parseInt(token.createdAt) * 1000).toLocaleDateString()}
        </span>
      </div>
    </Card>
  );
};

export default TokenCard;
