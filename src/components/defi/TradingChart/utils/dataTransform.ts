import { formatEther } from 'viem';
import { CandlestickData, HistogramData, Time } from 'lightweight-charts';
import { Interval, getIntervalSeconds } from './chartConfig';

export interface TokenOHLC {
  id: string;
  timestamp: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  trades: string;
}

export interface Trade {
  id: string;
  timestamp: string;
  price: string;
  coreAmount: string;
  tokenAmount: string;
  isBuy: boolean;
}

/**
 * Transform TokenOHLC data from subgraph to TradingView format
 */
export const transformOHLCData = (ohlcData: TokenOHLC[]): CandlestickData[] => {
  return ohlcData
    .map((candle): CandlestickData | null => {
      try {
        const timestamp = parseInt(candle.timestamp);
        const open = parseFloat(formatEther(BigInt(candle.open)));
        const high = parseFloat(formatEther(BigInt(candle.high)));
        const low = parseFloat(formatEther(BigInt(candle.low)));
        const close = parseFloat(formatEther(BigInt(candle.close)));

        // Skip invalid data
        if (timestamp <= 0 || [open, high, low, close].some(v => !isFinite(v) || v <= 0)) {
          return null;
        }

        return {
          time: timestamp as Time, // TradingView accepts Unix timestamp
          open,
          high,
          low,
          close,
        };
      } catch (error) {
        console.warn('Error transforming OHLC data:', error, candle);
        return null;
      }
    })
    .filter((candle): candle is CandlestickData => candle !== null)
    .sort((a, b) => (a.time as number) - (b.time as number));
};

/**
 * Transform volume data for histogram series
 */
export const transformVolumeData = (ohlcData: TokenOHLC[]): HistogramData[] => {
  return ohlcData
    .map((candle): HistogramData | null => {
      try {
        const timestamp = parseInt(candle.timestamp);
        const volume = parseFloat(formatEther(BigInt(candle.volume)));

        // Skip invalid data
        if (timestamp <= 0 || !isFinite(volume) || volume < 0) {
          return null;
        }

        return {
          time: timestamp as Time,
          value: volume,
          color: '#64748b', // Default gray color
        };
      } catch (error) {
        console.warn('Error transforming volume data:', error, candle);
        return null;
      }
    })
    .filter((volume): volume is HistogramData => volume !== null)
    .sort((a, b) => (a.time as number) - (b.time as number));
};

/**
 * Generate OHLC data from individual trades when subgraph data is not available
 * This is a fallback for tokens that don't have enough trading history
 * Enhanced to handle all interval types including daily and weekly candles
 */
export const generateOHLCFromTrades = (
  trades: Trade[], 
  interval: Interval,
  startTime?: number,
  endTime?: number
): { candlesticks: CandlestickData[], volumes: HistogramData[] } => {
  if (trades.length === 0) {
    return { candlesticks: [], volumes: [] };
  }

  const intervalSeconds = getIntervalSeconds(interval);
  const now = Math.floor(Date.now() / 1000);
  const start = startTime || (now - (24 * 3600)); // Default to last 24 hours
  const end = endTime || now;

  // Group trades by time intervals with proper alignment
  const intervals = new Map<number, Trade[]>();

  trades.forEach(trade => {
    const timestamp = parseInt(trade.timestamp);
    if (timestamp < start || timestamp > end) return;

    let intervalStart: number;

    // Handle special alignment for daily and weekly intervals
    if (interval === '1d') {
      // Align to UTC midnight
      const date = new Date(timestamp * 1000);
      date.setUTCHours(0, 0, 0, 0);
      intervalStart = Math.floor(date.getTime() / 1000);
    } else if (interval === '1w') {
      // Align to Monday UTC midnight
      const date = new Date(timestamp * 1000);
      const dayOfWeek = date.getUTCDay();
      const daysToMonday = (dayOfWeek + 6) % 7; // Calculate days back to Monday
      date.setUTCDate(date.getUTCDate() - daysToMonday);
      date.setUTCHours(0, 0, 0, 0);
      intervalStart = Math.floor(date.getTime() / 1000);
    } else {
      // Standard interval alignment
      intervalStart = Math.floor(timestamp / intervalSeconds) * intervalSeconds;
    }
    
    if (!intervals.has(intervalStart)) {
      intervals.set(intervalStart, []);
    }
    intervals.get(intervalStart)!.push(trade);
  });

  const candlesticks: CandlestickData[] = [];
  const volumes: HistogramData[] = [];

  // Sort intervals by time
  const sortedIntervals = Array.from(intervals.entries()).sort((a, b) => a[0] - b[0]);

  sortedIntervals.forEach(([intervalStart, intervalTrades]) => {
    if (intervalTrades.length === 0) return;

    // Sort trades by timestamp within interval
    intervalTrades.sort((a, b) => parseInt(a.timestamp) - parseInt(b.timestamp));

    try {
      const open = parseFloat(formatEther(BigInt(intervalTrades[0].price)));
      const close = parseFloat(formatEther(BigInt(intervalTrades[intervalTrades.length - 1].price)));
      
      const prices = intervalTrades.map(trade => parseFloat(formatEther(BigInt(trade.price))));
      const high = Math.max(...prices);
      const low = Math.min(...prices);

      // Calculate volume-weighted average price for longer intervals
      const totalVolume = intervalTrades.reduce((sum, trade) => {
        return sum + parseFloat(formatEther(BigInt(trade.coreAmount)));
      }, 0);

      // Skip invalid data
      if ([open, high, low, close].some(v => !isFinite(v) || v <= 0)) {
        return;
      }

      candlesticks.push({
        time: intervalStart as Time,
        open,
        high,
        low,
        close,
      });

      // Color volume bars based on price direction
      const volumeColor = close >= open ? '#10b981' : '#ef4444'; // Green for up, red for down

      volumes.push({
        time: intervalStart as Time,
        value: totalVolume,
        color: volumeColor,
      });
    } catch (error) {
      console.warn('Error generating OHLC from trades:', error);
    }
  });

  return { candlesticks, volumes };
};

/**
 * Fill missing intervals with previous close price
 * This ensures the chart doesn't have gaps during periods with no trading
 * Enhanced to handle daily and weekly intervals properly
 */
export const fillMissingCandles = (
  candlesticks: CandlestickData[],
  interval: Interval,
  startTime: number,
  endTime: number
): CandlestickData[] => {
  if (candlesticks.length === 0) return [];

  const intervalSeconds = getIntervalSeconds(interval);
  const filled: CandlestickData[] = [];
  
  let currentTime: number;
  let lastClose = candlesticks[0].close;

  // Handle special alignment for daily and weekly intervals
  if (interval === '1d') {
    // Start from UTC midnight of start date
    const startDate = new Date(startTime * 1000);
    startDate.setUTCHours(0, 0, 0, 0);
    currentTime = Math.floor(startDate.getTime() / 1000);
  } else if (interval === '1w') {
    // Start from Monday UTC midnight of start week
    const startDate = new Date(startTime * 1000);
    const dayOfWeek = startDate.getUTCDay();
    const daysToMonday = (dayOfWeek + 6) % 7;
    startDate.setUTCDate(startDate.getUTCDate() - daysToMonday);
    startDate.setUTCHours(0, 0, 0, 0);
    currentTime = Math.floor(startDate.getTime() / 1000);
  } else {
    // Standard interval alignment
    currentTime = Math.floor(startTime / intervalSeconds) * intervalSeconds;
  }

  while (currentTime <= endTime) {
    const existingCandle = candlesticks.find(c => (c.time as number) === currentTime);
    
    if (existingCandle) {
      filled.push(existingCandle);
      lastClose = existingCandle.close;
    } else if (filled.length > 0) {
      // Skip filling gaps for longer intervals to avoid cluttering
      if (interval === '1m' || interval === '5m' || interval === '15m') {
        // Fill gap with flat candle at last close price
        filled.push({
          time: currentTime as Time,
          open: lastClose,
          high: lastClose,
          low: lastClose,
          close: lastClose,
        });
      }
    }

    // Move to next interval with special handling for daily/weekly
    if (interval === '1d') {
      const nextDate = new Date(currentTime * 1000);
      nextDate.setUTCDate(nextDate.getUTCDate() + 1);
      currentTime = Math.floor(nextDate.getTime() / 1000);
    } else if (interval === '1w') {
      const nextDate = new Date(currentTime * 1000);
      nextDate.setUTCDate(nextDate.getUTCDate() + 7);
      currentTime = Math.floor(nextDate.getTime() / 1000);
    } else {
      currentTime += intervalSeconds;
    }
  }

  return filled;
};

/**
 * Calculate price change percentage
 */
export const calculatePriceChange = (
  current: number,
  previous: number
): { change: number; changePercent: number; isPositive: boolean } => {
  const change = current - previous;
  const changePercent = previous > 0 ? (change / previous) * 100 : 0;
  
  return {
    change,
    changePercent,
    isPositive: change >= 0,
  };
};

/**
 * Format price for display
 */
export const formatPrice = (price: number, precision: number = 6): string => {
  if (price === 0) return '0.000000';
  
  // For very small numbers, use more precision
  if (price < 0.000001) {
    return price.toExponential(3);
  }
  
  return price.toFixed(precision);
};

/**
 * Format volume for display
 */
export const formatVolume = (volume: number): string => {
  if (volume >= 1000000) {
    return `${(volume / 1000000).toFixed(2)}M`;
  } else if (volume >= 1000) {
    return `${(volume / 1000).toFixed(2)}K`;
  }
  return volume.toFixed(4);
};
