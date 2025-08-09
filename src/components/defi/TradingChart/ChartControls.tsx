'use client';

import React from 'react';
import { TimeFrame, TIME_FRAME_OPTIONS } from './utils/chartConfig';

interface ChartControlsProps {
  timeFrame: TimeFrame;
  onTimeFrameChange: (timeFrame: TimeFrame) => void;
  loading?: boolean;
  onRefresh?: () => void;
  className?: string;
}

export function ChartControls({
  timeFrame,
  onTimeFrameChange,
  loading = false,
  onRefresh,
  className = ''
}: ChartControlsProps) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      {/* Time Frame Selector */}
      <div className="flex items-center space-x-1 bg-gray-100 dark:bg-dark-bg-secondary rounded-lg p-1">
        {TIME_FRAME_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => onTimeFrameChange(option.value as TimeFrame)}
            disabled={loading}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
              timeFrame === option.value
                ? 'bg-white dark:bg-dark-surface text-core-orange-600 dark:text-core-orange-500 shadow-sm'
                : 'text-gray-600 dark:text-dark-text-secondary hover:text-gray-800 dark:hover:text-dark-text-primary hover:bg-gray-50 dark:hover:bg-dark-surface-hover'
            } ${
              loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Chart Actions */}
      <div className="flex items-center space-x-2">
        {onRefresh && (
          <button
            onClick={onRefresh}
            disabled={loading}
            className={`p-2 rounded-lg text-gray-600 dark:text-dark-text-secondary hover:text-gray-800 dark:hover:text-dark-text-primary hover:bg-gray-100 dark:hover:bg-dark-bg-secondary transition-colors duration-200 ${
              loading ? 'opacity-50 cursor-not-allowed animate-spin' : 'cursor-pointer'
            }`}
            title="Refresh chart data"
          >
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
              />
            </svg>
          </button>
        )}

        {/* Chart Type Selector (future enhancement) */}
        <div className="hidden md:flex items-center space-x-1">
          <button
            className="p-2 rounded-lg bg-gray-100 dark:bg-dark-bg-secondary text-gray-600 dark:text-dark-text-secondary"
            title="Candlestick chart (active)"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 3v2H6v4h2v10h2V9h2V5h-2V3H8zm8 4v2h-2v4h2v8h2v-8h2V9h-2V7h-2z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

interface ChartLegendProps {
  latestPrice?: number;
  priceChange?: {
    change: number;
    changePercent: number;
    isPositive: boolean;
  };
  volume?: number;
  tokenSymbol?: string;
  className?: string;
}

export function ChartLegend({
  latestPrice,
  priceChange,
  volume,
  className = ''
}: ChartLegendProps) {
  const formatPrice = (price: number) => {
    if (price < 0.000001) {
      return price.toExponential(3);
    }
    return price.toFixed(6);
  };

  const formatVolume = (vol: number) => {
    if (vol >= 1000000) {
      return `${(vol / 1000000).toFixed(2)}M`;
    } else if (vol >= 1000) {
      return `${(vol / 1000).toFixed(2)}K`;
    }
    return vol.toFixed(4);
  };

  return (
    <div className={`flex items-center space-x-6 text-sm ${className}`}>
      {/* Current Price */}
      {latestPrice !== undefined && (
        <div className="flex items-center space-x-2">
          <span className="text-gray-600 dark:text-dark-text-secondary">Price:</span>
          <span className="font-mono font-medium text-gray-900 dark:text-dark-text-primary">
            {formatPrice(latestPrice)} CORE
          </span>
        </div>
      )}

      {/* Price Change */}
      {priceChange && (
        <div className="flex items-center space-x-2">
          <span className="text-gray-600 dark:text-dark-text-secondary">24h:</span>
          <span className={`font-mono font-medium flex items-center ${
            priceChange.isPositive 
              ? 'text-success-600 dark:text-dark-success' 
              : 'text-error-600 dark:text-dark-error'
          }`}>
            {priceChange.isPositive ? '↗' : '↘'}
            {Math.abs(priceChange.changePercent).toFixed(2)}%
          </span>
        </div>
      )}

      {/* Volume */}
      {volume !== undefined && (
        <div className="flex items-center space-x-2">
          <span className="text-gray-600 dark:text-dark-text-secondary">Vol:</span>
          <span className="font-mono font-medium text-gray-900 dark:text-dark-text-primary">
            {formatVolume(volume)} CORE
          </span>
        </div>
      )}

      {/* Live Indicator */}
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-success-500 dark:bg-dark-success rounded-full animate-pulse"></div>
        <span className="text-xs text-gray-500 dark:text-dark-text-tertiary">Live</span>
      </div>
    </div>
  );
}
