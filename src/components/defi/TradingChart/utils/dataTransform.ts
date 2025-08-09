import { formatEther } from 'viem';
import { CandlestickData, HistogramData, Time } from 'lightweight-charts';
import { TimeFrame } from './chartConfig';

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
 */
export const generateOHLCFromTrades = (
  trades: Trade[], 
  timeFrame: TimeFrame,
  startTime?: number,
  endTime?: number
): { candlesticks: CandlestickData[], volumes: HistogramData[] } => {
  if (trades.length === 0) {
    return { candlesticks: [], volumes: [] };
  }

  const timeFrameSeconds = getTimeFrameSeconds(timeFrame);
  const now = Math.floor(Date.now() / 1000);
  const start = startTime || (now - (24 * 3600)); // Default to last 24 hours
  const end = endTime || now;

  // Group trades by time intervals
  const intervals = new Map<number, Trade[]>();

  trades.forEach(trade => {
    const timestamp = parseInt(trade.timestamp);
    if (timestamp < start || timestamp > end) return;

    const intervalStart = Math.floor(timestamp / timeFrameSeconds) * timeFrameSeconds;
    
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

      volumes.push({
        time: intervalStart as Time,
        value: totalVolume,
        color: '#64748b',
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
 */
export const fillMissingCandles = (
  candlesticks: CandlestickData[],
  timeFrame: TimeFrame,
  startTime: number,
  endTime: number
): CandlestickData[] => {
  if (candlesticks.length === 0) return [];

  const timeFrameSeconds = getTimeFrameSeconds(timeFrame);
  const filled: CandlestickData[] = [];
  
  let currentTime = Math.floor(startTime / timeFrameSeconds) * timeFrameSeconds;
  let lastClose = candlesticks[0].close;

  while (currentTime <= endTime) {
    const existingCandle = candlesticks.find(c => (c.time as number) === currentTime);
    
    if (existingCandle) {
      filled.push(existingCandle);
      lastClose = existingCandle.close;
    } else if (filled.length > 0) {
      // Fill gap with flat candle at last close price
      filled.push({
        time: currentTime as Time,
        open: lastClose,
        high: lastClose,
        low: lastClose,
        close: lastClose,
      });
    }

    currentTime += timeFrameSeconds;
  }

  return filled;
};

/**
 * Get time frame duration in seconds
 */
function getTimeFrameSeconds(timeFrame: TimeFrame): number {
  switch (timeFrame) {
    case '1m': return 60;
    case '5m': return 300;
    case '15m': return 900;
    case '1h': return 3600;
    default: return 300;
  }
}

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
