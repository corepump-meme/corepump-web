import { DeepPartial, ChartOptions, HistogramSeriesOptions } from 'lightweight-charts';

export type Interval = '1m' | '5m' | '15m' | '1h' | '4h' | '1d' | '1w';

export const INTERVAL_OPTIONS = [
  { value: '1m', label: '1m' },
  { value: '5m', label: '5m' },
  { value: '15m', label: '15m' },
  { value: '1h', label: '1h' },
  { value: '4h', label: '4h' },
  { value: '1d', label: '1d' },
  { value: '1w', label: '1w' },
] as const;

export const getChartOptions = (isDark: boolean): DeepPartial<ChartOptions> => ({
  layout: {
    background: { color: 'transparent' },
    textColor: isDark ? '#e2e8f0' : '#374151',
    fontSize: 12,
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  grid: {
    vertLines: { 
      color: isDark ? '#334155' : '#e5e7eb',
      style: 1,
      visible: true,
    },
    horzLines: { 
      color: isDark ? '#334155' : '#e5e7eb',
      style: 1,
      visible: true,
    },
  },
  crosshair: {
    mode: 1,
    vertLine: {
      width: 1,
      color: isDark ? '#64748b' : '#9ca3af',
      style: 3,
    },
    horzLine: {
      width: 1,
      color: isDark ? '#64748b' : '#9ca3af',
      style: 3,
    },
  },
  rightPriceScale: {
    borderColor: isDark ? '#334155' : '#e5e7eb',
    textColor: isDark ? '#e2e8f0' : '#374151',
    entireTextOnly: false,
    visible: true,
    borderVisible: true,
    scaleMargins: {
      top: 0.1,
      bottom: 0.1,
    },
  },
  timeScale: {
    borderColor: isDark ? '#334155' : '#e5e7eb',
    borderVisible: true,
    timeVisible: true,
    secondsVisible: false,
    rightOffset: 12,
    barSpacing: 8,
    minBarSpacing: 0.5,
  },
  handleScroll: {
    mouseWheel: true,
    pressedMouseMove: true,
    horzTouchDrag: true,
    vertTouchDrag: true,
  },
  handleScale: {
    axisPressedMouseMove: {
      time: true,
      price: true,
    },
    axisDoubleClickReset: {
      time: true,
      price: true,
    },
    mouseWheel: true,
    pinch: true,
  },
});

export const getVolumeSeriesOptions = (isDark: boolean): DeepPartial<HistogramSeriesOptions> => ({
  color: isDark ? '#64748b' : '#9ca3af',
  priceFormat: {
    type: 'volume',
  },
  priceScaleId: 'volume',
});

export const getIntervalSeconds = (interval: Interval): number => {
  switch (interval) {
    case '1m': return 60;
    case '5m': return 300;
    case '15m': return 900;
    case '1h': return 3600;
    case '4h': return 14400;
    case '1d': return 86400;
    case '1w': return 604800;
    default: return 300;
  }
};

export const getIntervalLabel = (interval: Interval): string => {
  switch (interval) {
    case '1m': return '1 Minute';
    case '5m': return '5 Minutes';
    case '15m': return '15 Minutes';
    case '1h': return '1 Hour';
    case '4h': return '4 Hours';
    case '1d': return '1 Day';
    case '1w': return '1 Week';
    default: return '5 Minutes';
  }
};

// Calculate how many candles to fetch based on interval
export const getCandleCount = (interval: Interval): number => {
  switch (interval) {
    case '1m': return 240; // 4 hours of data
    case '5m': return 288; // 24 hours of data
    case '15m': return 96; // 24 hours of data
    case '1h': return 168; // 7 days of data
    case '4h': return 180; // 30 days of data
    case '1d': return 180; // 6 months of data
    case '1w': return 104; // 2 years of data
    default: return 288;
  }
};

// Get the optimal data range duration in seconds based on interval
export const getDataRangeDuration = (interval: Interval): number => {
  switch (interval) {
    case '1m': return 4 * 3600; // 4 hours
    case '5m': return 24 * 3600; // 24 hours
    case '15m': return 24 * 3600; // 24 hours
    case '1h': return 7 * 24 * 3600; // 7 days
    case '4h': return 30 * 24 * 3600; // 30 days
    case '1d': return 180 * 24 * 3600; // 6 months
    case '1w': return 2 * 365 * 24 * 3600; // 2 years
    default: return 24 * 3600;
  }
};

// Get update frequency in milliseconds based on interval
export const getUpdateFrequency = (interval: Interval): number => {
  switch (interval) {
    case '1m': return 10000; // 10 seconds
    case '5m': return 30000; // 30 seconds
    case '15m': return 60000; // 1 minute
    case '1h': return 300000; // 5 minutes
    case '4h': return 900000; // 15 minutes
    case '1d': return 3600000; // 1 hour
    case '1w': return 21600000; // 6 hours
    default: return 30000;
  }
};
