'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { formatEther } from 'viem';
import { CandlestickData, HistogramData } from 'lightweight-charts';
import { 
  GET_TOKEN_OHLC_DATA, 
  GET_TOKEN_RECENT_TRADES_FOR_CHART,
  GET_TOKEN_LATEST_PRICE 
} from '@/queries/ohlc';
import { 
  transformOHLCData, 
  transformVolumeData, 
  generateOHLCFromTrades,
  TokenOHLC,
  Trade 
} from '../utils/dataTransform';
import { Interval, getDataRangeDuration, getUpdateFrequency } from '../utils/chartConfig';

interface UseChartDataOptions {
  tokenAddress: string;
  interval: Interval;
  autoUpdate?: boolean;
  updateInterval?: number;
}

interface PriceChange {
  change: number;
  changePercent: number;
  isPositive: boolean;
}

interface ChartDataResult {
  candlesticks: CandlestickData[];
  volumes: HistogramData[];
  loading: boolean;
  error: string | null;
  hasData: boolean;
  latestPrice?: number;
  priceChange?: PriceChange;
  refresh: () => Promise<void>;
}

export const useChartData = ({
  tokenAddress,
  interval,
  autoUpdate = true,
  updateInterval
}: UseChartDataOptions): ChartDataResult => {
  // Use dynamic update interval based on the interval type if not provided
  const actualUpdateInterval = updateInterval || getUpdateFrequency(interval);
  const [chartData, setChartData] = useState({
    candlesticks: [] as CandlestickData[],
    volumes: [] as HistogramData[],
    hasData: false,
    latestPrice: undefined as number | undefined,
    priceChange: undefined as PriceChange | undefined,
  });

  // Calculate time range based on interval
  const getTimeRange = useCallback(() => {
    const now = Math.floor(Date.now() / 1000);
    const duration = getDataRangeDuration(interval);
    
    return {
      from: (now - duration).toString(),
      to: now.toString(),
      fromTimestamp: now - duration,
      toTimestamp: now
    };
  }, [interval]);

  // Memoize time range to prevent infinite re-renders
  // Use different rounding intervals based on the chart interval
  const timeRange = useMemo(() => {
    const now = Math.floor(Date.now() / 1000);
    
    // Round to appropriate interval to avoid constant re-renders
    let roundingInterval: number;
    switch (interval) {
      case '1m': roundingInterval = 60; break; // Round to nearest minute
      case '5m': roundingInterval = 300; break; // Round to nearest 5 minutes
      case '15m': roundingInterval = 900; break; // Round to nearest 15 minutes
      case '1h': roundingInterval = 3600; break; // Round to nearest hour
      case '4h': roundingInterval = 14400; break; // Round to nearest 4 hours
      case '1d': roundingInterval = 86400; break; // Round to nearest day
      case '1w': roundingInterval = 604800; break; // Round to nearest week
      default: roundingInterval = 300; break;
    }
    
    const roundedNow = Math.floor(now / roundingInterval) * roundingInterval;
    const duration = getDataRangeDuration(interval);
    
    return {
      from: (roundedNow - duration).toString(),
      to: roundedNow.toString(),
      fromTimestamp: roundedNow - duration,
      toTimestamp: roundedNow
    };
  }, [interval]);

  // Query OHLC data from subgraph
  const { 
    data: ohlcData, 
    loading: ohlcLoading, 
    error: ohlcError, 
    refetch: refetchOHLC 
  } = useQuery(GET_TOKEN_OHLC_DATA, {
    variables: {
      tokenId: tokenAddress.toLowerCase(),
      interval: interval,
      from: timeRange.from,
      to: timeRange.to
    },
    skip: !tokenAddress,
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network',
  });

  // Fallback query for trades data
  const { 
    data: tradesData, 
    loading: tradesLoading, 
    error: tradesError,
    refetch: refetchTrades 
  } = useQuery(GET_TOKEN_RECENT_TRADES_FOR_CHART, {
    variables: {
      tokenId: tokenAddress.toLowerCase(),
      first: 1000,
      from: timeRange.from
    },
    skip: !tokenAddress,
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network',
  });

  // Query for latest price
  const { 
    data: latestPriceData,
    refetch: refetchLatestPrice 
  } = useQuery(GET_TOKEN_LATEST_PRICE, {
    variables: {
      tokenId: tokenAddress.toLowerCase()
    },
    skip: !tokenAddress,
    errorPolicy: 'ignore',
    fetchPolicy: 'cache-and-network',
  });

  // Process chart data
  useEffect(() => {
    if (ohlcLoading || tradesLoading) return;

    try {
      let candlesticks: CandlestickData[] = [];
      let volumes: HistogramData[] = [];
      let hasData = false;

      // Try OHLC data first
      if (ohlcData?.tokenOHLCs?.length > 0) {
        const ohlcCandles = ohlcData.tokenOHLCs as TokenOHLC[];
        candlesticks = transformOHLCData(ohlcCandles);
        volumes = transformVolumeData(ohlcCandles);
        hasData = candlesticks.length > 0;
      } 
      // Fallback to trades data
      else if (tradesData?.trades?.length > 0) {
        const trades = tradesData.trades as Trade[];
        // Get fresh time range for trades processing
        const currentTimeRange = getTimeRange();
        const generated = generateOHLCFromTrades(
          trades, 
          interval,
          currentTimeRange.fromTimestamp,
          currentTimeRange.toTimestamp
        );
        candlesticks = generated.candlesticks;
        volumes = generated.volumes;
        hasData = candlesticks.length > 0;
      }

      // Calculate price change
      let priceChange;
      if (candlesticks.length >= 2) {
        const latest = candlesticks[candlesticks.length - 1];
        const previous = candlesticks[candlesticks.length - 2];
        const change = latest.close - previous.close;
        const changePercent = previous.close > 0 ? (change / previous.close) * 100 : 0;
        
        priceChange = {
          change,
          changePercent,
          isPositive: change >= 0,
        };
      }

      // Get latest price
      let latestPrice: number | undefined;
      if (candlesticks.length > 0) {
        latestPrice = candlesticks[candlesticks.length - 1].close;
      } else if (latestPriceData?.trades?.[0]?.price) {
        try {
          latestPrice = parseFloat(formatEther(BigInt(latestPriceData.trades[0].price)));
        } catch {
          latestPrice = undefined;
        }
      }

      setChartData({
        candlesticks,
        volumes,
        hasData,
        latestPrice,
        priceChange,
      });

    } catch (error) {
      console.error('Error processing chart data:', error);
      setChartData({
        candlesticks: [],
        volumes: [],
        hasData: false,
        latestPrice: undefined,
        priceChange: undefined,
      });
    }
  }, [ohlcData, tradesData, latestPriceData, interval, getTimeRange]);

  // Auto-update effect
  useEffect(() => {
    if (!autoUpdate || !tokenAddress) return;

    const intervalId = setInterval(async () => {
      try {
        await refetchLatestPrice();
        await refetchOHLC();
        await refetchTrades();
      } catch (error) {
        console.error('Auto-update error:', error);
      }
    }, actualUpdateInterval);

    return () => clearInterval(intervalId);
  }, [autoUpdate, tokenAddress, actualUpdateInterval, refetchLatestPrice, refetchOHLC, refetchTrades]);

  // Manual refresh function
  const refresh = useCallback(async () => {
    try {
      await Promise.all([
        refetchOHLC(),
        refetchTrades(),
        refetchLatestPrice()
      ]);
    } catch (error) {
      console.error('Manual refresh error:', error);
    }
  }, [refetchOHLC, refetchTrades, refetchLatestPrice]);

  const loading = ohlcLoading || tradesLoading;
  const error = (ohlcError && tradesError) ? 'Failed to load chart data' : null;

  return {
    ...chartData,
    loading,
    error,
    refresh,
  };
};
