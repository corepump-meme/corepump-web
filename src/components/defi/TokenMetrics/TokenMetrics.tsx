'use client';

import React from 'react';
import { TokenMetrics as TokenMetricsType } from '@/hooks/useTokenData';
import { Card } from '@/components';
import { formatPercentage } from '@/lib/bigint-utils';

interface TokenMetricsProps {
  metrics: TokenMetricsType;
  className?: string;
}

interface MetricCardProps {
  label: string;
  value: string;
  change?: number;
  icon?: React.ReactNode;
  className?: string;
}

function MetricCard({ label, value, change, icon, className }: MetricCardProps) {
  return (
    <div className={`p-4 rounded-lg border ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-gray-600 dark:text-dark-text-secondary">
          {label}
        </span>
        
        {change !== undefined && (
          <span className={`text-sm font-medium ${
            change >= 0 
              ? 'text-success-500 dark:text-dark-success' 
              : 'text-error-500 dark:text-dark-error'
          }`}>
            {change >= 0 ? '↗' : '↘'} {formatPercentage(Math.abs(change))}
          </span>
        )}

        {icon && (
          <div className="text-gray-400 dark:text-dark-text-tertiary">
            {icon}
          </div>
        )}
      </div>
      
      <div className="flex items-end justify-between">
        <span className="text-md font-bold font-mono text-gray-900 dark:text-dark-text-primary">
          {value}
        </span>
      </div>
    </div>
  );
}

function ProgressBar({ progress, className }: { progress: number; className?: string }) {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex justify-between text-sm">
        <span className="font-medium text-gray-600 dark:text-dark-text-secondary">
          Progress to Graduation
        </span>
        <span className="font-mono text-gray-900 dark:text-dark-text-primary">
          {clampedProgress.toFixed(1)}%
        </span>
      </div>
      
      <div className="w-full bg-gray-200 dark:bg-dark-border-secondary rounded-full h-3">
        <div
          className={`h-3 rounded-full transition-all duration-500 ${
            clampedProgress >= 100 
              ? 'bg-gradient-to-r from-success-500 to-success-600' 
              : 'bg-gradient-to-r from-core-orange-500 to-bitcoin-gold-500'
          }`}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
      
      <div className="flex justify-between text-xs text-gray-500 dark:text-dark-text-tertiary">
        <span>$0</span>
        <span>$50K</span>
      </div>
    </div>
  );
}

export function TokenMetrics({ metrics, className }: TokenMetricsProps) {
  const priceIcon = (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
    </svg>
  );

  const marketCapIcon = (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );

  const volumeIcon = (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );

  const liquidityIcon = (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  );

  return (
    <Card className={`p-6 ${className}`}>
      <div className="space-y-6">
        {/* Main Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label="Price"
            value={`${metrics.formattedPrice} CORE`}
            change={metrics.priceChange24h}
            icon={priceIcon}
            className="bg-gradient-to-br from-core-orange-50 to-bitcoin-gold-50 dark:from-dark-bg-secondary dark:to-dark-bg-tertiary border-core-orange-200 dark:border-dark-border-primary"
          />
          
          <MetricCard
            label="Market Cap"
            value={`${metrics.formattedMarketCap} CORE`}
            icon={marketCapIcon}
            className="bg-gradient-to-br from-success-50 to-info-50 dark:from-dark-bg-secondary dark:to-dark-bg-tertiary border-success-200 dark:border-dark-border-primary"
          />
          
          <MetricCard
            label="24h Volume"
            value={`${metrics.formattedVolume24h} CORE`}
            icon={volumeIcon}
            className="bg-gradient-to-br from-info-50 to-warning-50 dark:from-dark-bg-secondary dark:to-dark-bg-tertiary border-info-200 dark:border-dark-border-primary"
          />
          
          <MetricCard
            label="Virtual Liquidity"
            value={`${metrics.formattedVirtualLiquidity} CORE`}
            icon={liquidityIcon}
            className="bg-gradient-to-br from-bitcoin-gold-50 to-warning-50 dark:from-dark-bg-secondary dark:to-dark-bg-tertiary border-bitcoin-gold-200 dark:border-dark-border-primary"
          />
        </div>

        {/* Graduation Progress */}
        <div className="p-4 bg-gray-50 dark:bg-dark-bg-secondary rounded-lg border border-gray-200 dark:border-dark-border-primary">
          <ProgressBar progress={metrics.progressToGraduation} />
          
          <div className="mt-3 text-center">
            <p className="text-sm text-gray-600 dark:text-dark-text-secondary">
              {metrics.progressToGraduation >= 100 ? (
                <span className="text-success-600 dark:text-dark-success font-medium">
                  🎉 Token has graduated to DEX trading!
                </span>
              ) : (
                <>
                  <span className="font-medium">
                    ${(50000 * (metrics.progressToGraduation / 100)).toFixed(0)}
                  </span>
                  {' '}raised of{' '}
                  <span className="font-medium">$50,000</span>
                  {' '}needed for graduation
                </>
              )}
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-white dark:bg-dark-surface rounded-lg border border-gray-200 dark:border-dark-border-primary">
            <div className="text-lg font-bold text-gray-900 dark:text-dark-text-primary">
              1%
            </div>
            <div className="text-xs text-gray-600 dark:text-dark-text-secondary uppercase tracking-wider">
              Platform Fee
            </div>
          </div>
          
          <div className="p-3 bg-white dark:bg-dark-surface rounded-lg border border-gray-200 dark:border-dark-border-primary">
            <div className="text-lg font-bold text-gray-900 dark:text-dark-text-primary">
              4%
            </div>
            <div className="text-xs text-gray-600 dark:text-dark-text-secondary uppercase tracking-wider">
              Max Purchase
            </div>
          </div>
          
          <div className="p-3 bg-white dark:bg-dark-surface rounded-lg border border-gray-200 dark:border-dark-border-primary">
            <div className="text-lg font-bold text-gray-900 dark:text-dark-text-primary">
              1B
            </div>
            <div className="text-xs text-gray-600 dark:text-dark-text-secondary uppercase tracking-wider">
              Total Supply
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
