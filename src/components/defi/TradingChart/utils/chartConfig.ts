import { DeepPartial, ChartOptions, CandlestickSeriesOptions, HistogramSeriesOptions } from 'lightweight-charts';

export type TimeFrame = '1m' | '5m' | '15m' | '1h';

export const TIME_FRAME_OPTIONS = [
  { value: '1m', label: '1m' },
  { value: '5m', label: '5m' },
  { value: '15m', label: '15m' },
  { value: '1h', label: '1h' },
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

export const getCandlestickSeriesOptions = (isDark: boolean): DeepPartial<CandlestickSeriesOptions> => ({
  upColor: '#10b981', // green-500
  downColor: '#ef4444', // red-500
  borderUpColor: '#10b981',
  borderDownColor: '#ef4444',
  wickUpColor: '#10b981',
  wickDownColor: '#ef4444',
  priceFormat: {
    type: 'price',
    precision: 6,
    minMove: 0.000001,
  },
});

export const getVolumeSeriesOptions = (isDark: boolean): DeepPartial<HistogramSeriesOptions> => ({
  color: isDark ? '#64748b' : '#9ca3af',
  priceFormat: {
    type: 'volume',
  },
  priceScaleId: 'volume',
});

export const getTimeFrameSeconds = (timeFrame: TimeFrame): number => {
  switch (timeFrame) {
    case '1m': return 60;
    case '5m': return 300;
    case '15m': return 900;
    case '1h': return 3600;
    default: return 300;
  }
};

export const getTimeFrameLabel = (timeFrame: TimeFrame): string => {
  switch (timeFrame) {
    case '1m': return '1 Minute';
    case '5m': return '5 Minutes';
    case '15m': return '15 Minutes';
    case '1h': return '1 Hour';
    default: return '5 Minutes';
  }
};

// Calculate how many candles to fetch based on timeframe
export const getCandleCount = (timeFrame: TimeFrame): number => {
  switch (timeFrame) {
    case '1m': return 240; // 4 hours of data
    case '5m': return 288; // 24 hours of data
    case '15m': return 96; // 24 hours of data
    case '1h': return 168; // 7 days of data
    default: return 288;
  }
};
