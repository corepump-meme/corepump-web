'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { 
  createChart, 
  IChartApi, 
  ISeriesApi,
  HistogramSeries, 
  CandlestickSeries 
} from 'lightweight-charts';
import { Card } from '@/components/ui/Card';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ChartControls, ChartLegend } from './ChartControls';
import { useChartData } from './hooks/useChartData';
import { 
  Interval, 
  getChartOptions, 
} from './utils/chartConfig';
import { TokenMetrics as TokenMetricsType } from '@/hooks/useTokenData';
import { formatPercentage } from '@/lib/bigint-utils';

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
        <span className="text-xs font-medium text-text-secondary dark:text-dark-text-secondary">
          {label}{' '}
        {change !== undefined && (
          <span className={`text-sm font-medium ${
            change >= 0 
              ? 'text-success-500 dark:text-dark-success' 
              : 'text-error-500 dark:text-dark-error'
          }`}>
            {change >= 0 ? '↗' : '↘'} {formatPercentage(Math.abs(change))}
          </span>
        )}
        </span>
        

        {icon && (
          <div className="text-text-tertiary dark:text-dark-text-tertiary">
            {icon}
          </div>
        )}
      </div>
      
      <div className="flex items-end justify-between">
        <span className="text-md font-bold font-mono text-text-primary dark:text-dark-text-primary">
          {value}
        </span>
      </div>
    </div>
  );
}

interface TradingChartProps {
  metrics: TokenMetricsType;
  tokenAddress: string;
  tokenSymbol: string;
  className?: string;
  height?: number;
  autoUpdate?: boolean;
}

export function TradingChart({
  metrics,
  tokenAddress,
  tokenSymbol,
  className = '',
  height = 400,
  autoUpdate = true
}: TradingChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<'Histogram'> | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  
  const [interval, setInterval] = useState<Interval>('1d');
  const [isDark, setIsDark] = useState(false);
  const [chartInitialized, setChartInitialized] = useState(false);

  // Get chart data
  const {
    candlesticks,
    volumes,
    loading,
    error,
    hasData,
    latestPrice,
    priceChange,
    refresh
  } = useChartData({
    tokenAddress,
    interval,
    autoUpdate
  });

  // Detect dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    // Initial check
    checkDarkMode();

    // Watch for changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  // Initialize chart only when data is available for the first time
  useEffect(() => {
    if (!chartContainerRef.current || !hasData || chartInitialized || loading) return;

    // Create chart
    const chart = createChart(chartContainerRef.current, {
      ...getChartOptions(isDark),
      height,
      width: chartContainerRef.current.clientWidth,
    });

    // Create candlestick series - v5 API with correct type names and simplified options
    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#10b981', // green-500
      downColor: '#ef4444', // red-500
      borderUpColor: '#10b981',
      borderDownColor: '#ef4444',
      wickUpColor: '#10b981',
      wickDownColor: '#ef4444',
    });
    
    // Create volume series - v5 API with simplified options
    const volumeSeries = chart.addSeries(HistogramSeries, {
      color: isDark ? '#64748b' : '#9ca3af',
      priceScaleId: 'volume',
    });

    // Set up volume scale on the left
    chart.priceScale('volume').applyOptions({
      scaleMargins: {
        top: 0.8, // Volume takes up bottom 20%
        bottom: 0,
      },
    });

    // Store references
    chartRef.current = chart;
    candlestickSeriesRef.current = candlestickSeries;
    volumeSeriesRef.current = volumeSeries;
    setChartInitialized(true);

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    // Set up resize observer
    resizeObserverRef.current = new ResizeObserver(handleResize);
    resizeObserverRef.current.observe(chartContainerRef.current);

    // Cleanup function
    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
      if (chartRef.current) {
        chartRef.current.remove();
      }
      setChartInitialized(false);
    };
  }, [hasData, height, isDark, loading, chartInitialized]);

  // Update chart data
  useEffect(() => {
    if (!candlestickSeriesRef.current || !volumeSeriesRef.current) return;

    try {
      // Update candlestick data
      if (candlesticks.length > 0) {
        candlestickSeriesRef.current.setData(candlesticks);
      } else {
        // Clear stale data when no data available
        candlestickSeriesRef.current.setData([]);
      }

      // Update volume data
      if (volumes.length > 0) {
        volumeSeriesRef.current.setData(volumes);
      } else {
        // Clear stale data when no data available
        volumeSeriesRef.current.setData([]);
      }

      // Fit content to screen
      if (chartRef.current && (candlesticks.length > 0 || volumes.length > 0)) {
        setTimeout(() => {
          chartRef.current?.timeScale().fitContent();
        }, 100);
      }
    } catch (error) {
      console.error('Error updating chart data:', error);
    }
  }, [candlesticks, volumes]);

  // Update chart theme
  useEffect(() => {
    if (!chartRef.current) return;

    try {
      // Update main chart options
      chartRef.current.applyOptions(getChartOptions(isDark));
      
      // Update candlestick series options - simplified for v5 compatibility
      if (candlestickSeriesRef.current) {
        candlestickSeriesRef.current.applyOptions({
          upColor: '#10b981',
          downColor: '#ef4444', 
          borderUpColor: '#10b981',
          borderDownColor: '#ef4444',
          wickUpColor: '#10b981',
          wickDownColor: '#ef4444',
        });
      }

      // Update volume series options - simplified for v5 compatibility
      if (volumeSeriesRef.current) {
        volumeSeriesRef.current.applyOptions({
          color: isDark ? '#64748b' : '#9ca3af',
        });
      }
    } catch (error) {
      console.error('Error updating chart theme:', error);
    }
  }, [isDark]);

  // Handle interval change
  const handleIntervalChange = useCallback((newInterval: Interval) => {
    setInterval(newInterval);
  }, []);

  // Listen for centralized data updates
  useEffect(() => {
    const handleTokenDataUpdate = (event: CustomEvent) => {
      if (event.detail?.tokenAddress === tokenAddress) {
        refresh();
      }
    };

    window.addEventListener('tokenDataUpdated', handleTokenDataUpdate as EventListener);
    return () => window.removeEventListener('tokenDataUpdated', handleTokenDataUpdate as EventListener);
  }, [tokenAddress, refresh]);

  // Calculate total volume for legend
  const totalVolume = volumes.reduce((sum, vol) => sum + vol.value, 0);

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

  if (error) {
    return (
      <Card className={className}>
        <div className="p-6">
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-error-100 dark:bg-error-900/20 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-error-500 dark:text-error-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-error-600 dark:text-error-400 mb-2">
              Chart Error
            </h3>
            <p className="text-sm text-error-500 dark:text-error-300 mb-4">
              {error}
            </p>
            <button
              onClick={refresh}
              className="px-4 py-2 bg-error-600 text-white rounded-lg hover:bg-error-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <div className="p-4">
        {/* Chart Header */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <MetricCard
            label="Price"
            value={`${metrics.formattedPrice} CORE`}
            change={metrics.priceChange24h}
            icon={priceIcon}
            className="bg-gradient-to-br from-core-orange-50 to-bitcoin-gold-50 dark:from-core-orange-500/10 dark:to-bitcoin-gold-500/10 border-core-orange-200 dark:border-core-orange-500/30"
          />
          
          <MetricCard
            label="Market Cap"
            value={`${metrics.formattedMarketCap} CORE`}
            icon={marketCapIcon}
            className="bg-gradient-to-br from-success-50 to-info-50 dark:from-success-500/10 dark:to-info-500/10 border-success-200 dark:border-dark-success-border"
          />
          
          <MetricCard
            label="24h Volume"
            value={`${metrics.formattedVolume24h} CORE`}
            icon={volumeIcon}
            className="bg-gradient-to-br from-info-50 to-warning-50 dark:from-info-500/10 dark:to-warning-500/10 border-info-200 dark:border-dark-info-border"
          />
        </div>

        <div className="mb-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">
              {tokenSymbol} / CORE
            </h3>
            <ChartControls
              interval={interval}
              onIntervalChange={handleIntervalChange}
              loading={loading}
              onRefresh={refresh}
            />
          </div>
          
          <ChartLegend
            latestPrice={latestPrice}
            priceChange={priceChange}
            volume={totalVolume}
            tokenSymbol={tokenSymbol}
          />
        </div>

        {/* Chart Container */}
        <div className="relative">
          {loading && (
            <div className="absolute inset-0 bg-white/80 dark:bg-dark-surface/80 z-10 flex items-center justify-center rounded-lg">
              <LoadingSpinner size="lg" text="Loading chart..." />
            </div>
          )}

          {/* No Data State - Before any chart is initialized */}
          {!chartInitialized && !hasData && !loading && (
            <div className="flex items-center justify-center bg-surface-hover dark:bg-dark-surface-hover rounded-lg border border-border-secondary/50 dark:border-dark-border-secondary/50" style={{ height }}>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-surface-secondary dark:bg-dark-surface-secondary rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-text-tertiary dark:text-dark-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <p className="text-text-secondary dark:text-dark-text-secondary">
                  No trading data available yet
                </p>
                <p className="text-sm text-text-tertiary dark:text-dark-text-tertiary mt-1">
                  Chart will appear once trading begins
                </p>
              </div>
            </div>
          )}

          {/* Chart Container with potential overlay */}
          <div className="relative">
            <div 
              ref={chartContainerRef} 
              style={{ height }}
              className={`rounded-lg overflow-hidden ${!chartInitialized ? 'hidden' : 'block'} transition-opacity duration-300`}
            />
            
            {/* Overlay for when chart exists but no data for current interval */}
            {chartInitialized && !hasData && !loading && (
              <div className="absolute inset-0 bg-white/90 dark:bg-dark-surface/90 z-20 flex items-center justify-center rounded-lg">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-surface-secondary dark:bg-dark-surface-secondary rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-text-tertiary dark:text-dark-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                    No data for {interval} interval
                  </p>
                  <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary mt-1">
                    Try a different time range
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Chart Footer */}
        {hasData && (
          <div className="mt-3 text-xs text-text-tertiary dark:text-dark-text-tertiary text-center">
            Drag to pan • Scroll to zoom • Double-click to fit
          </div>
        )}
      </div>
    </Card>
  );
}
