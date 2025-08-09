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
import { TimeFrame } from '../utils/chartConfig';

interface UseChartDataOptions {
  tokenAddress: string;
  timeFrame: TimeFrame;
  autoUpdate?: boolean;
  updateInterval?: number;
}

interface ChartDataResult {
  candlesticks: CandlestickData[];
  volumes: HistogramData[];
  loading: boolean;
  error: string | null;
  hasData: boolean;
  latestPrice?: number;
  priceChange?: {
    change: number;
    changePercent: number;
    isPositive: boolean;
  };
  refresh: () => Promise<void>;
}

export const useChartData = ({
  tokenAddress,
  timeFrame,
  autoUpdate = true,
  updateInterval = 10000
}: UseChartDataOptions): ChartDataResult => {
  const [chartData, setChartData] = useState({
    candlesticks: [] as CandlestickData[],
    volumes: [] as HistogramData[],
    hasData: false,
    latestPrice: undefined as number | undefined,
    priceChange: undefined as any,
  });

  // Calculate time range based on timeframe
  const getTimeRange = useCallback(() => {
    const now = Math.floor(Date.now() / 1000);
    
    let duration: number;
    switch (timeFrame) {
      case '1m': duration = 4 * 3600; break; // 4 hours
      case '5m': duration = 24 * 3600; break; // 24 hours
      case '15m': duration = 24 * 3600; break; // 24 hours
      case '1h': duration = 7 * 24 * 3600; break; // 7 days
      default: duration = 24 * 3600; break;
    }
    
    return {
      from: (now - duration).toString(),
      to: now.toString(),
      fromTimestamp: now - duration,
      toTimestamp: now
    };
  }, [timeFrame]);

  // Memoize time range to prevent infinite re-renders
  // Update every 5 minutes to get fresh data while avoiding constant re-renders
  const timeRange = useMemo(() => {
    const now = Math.floor(Date.now() / 1000);
    const roundedNow = Math.floor(now / 300) * 300; // Round to nearest 5 minutes
    
    let duration: number;
    switch (timeFrame) {
      case '1m': duration = 4 * 3600; break; // 4 hours
      case '5m': duration = 24 * 3600; break; // 24 hours
      case '15m': duration = 24 * 3600; break; // 24 hours
      case '1h': duration = 7 * 24 * 3600; break; // 7 days
      default: duration = 24 * 3600; break;
    }
    
    return {
      from: (roundedNow - duration).toString(),
      to: roundedNow.toString(),
      fromTimestamp: roundedNow - duration,
      toTimestamp: roundedNow
    };
  }, [timeFrame]);

  // Query OHLC data from subgraph
  const { 
    data: ohlcData, 
    loading: ohlcLoading, 
    error: ohlcError, 
    refetch: refetchOHLC 
  } = useQuery(GET_TOKEN_OHLC_DATA, {
    variables: {
      tokenId: tokenAddress.toLowerCase(),
      interval: timeFrame,
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
          timeFrame,
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
  }, [ohlcData, tradesData, latestPriceData, timeFrame, getTimeRange]);

  // Auto-update effect
  useEffect(() => {
    if (!autoUpdate || !tokenAddress) return;

    const interval = setInterval(async () => {
      try {
        await refetchLatestPrice();
        await refetchOHLC();
        await refetchTrades();
      } catch (error) {
        console.error('Auto-update error:', error);
      }
    }, updateInterval);

    return () => clearInterval(interval);
  }, [autoUpdate, tokenAddress, updateInterval, refetchLatestPrice, refetchOHLC, refetchTrades]);

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
