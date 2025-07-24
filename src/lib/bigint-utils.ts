export function safeBigIntOperation<T>(
  operation: () => T,
  fallback: T,
  errorMessage?: string
): T {
  try {
    return operation();
  } catch (error) {
    console.error(errorMessage || 'BigInt operation failed:', error);
    return fallback;
  }
}

export function formatBigIntToFixed(
  value: bigint,
  decimals: number = 18,
  precision: number = 4
): string {
  return safeBigIntOperation(
    () => {
      const divisor = BigInt(10 ** decimals);
      const quotient = value / divisor;
      const remainder = value % divisor;
      
      const remainderStr = remainder.toString().padStart(decimals, '0');
      const decimalPart = remainderStr.slice(0, precision);
      
      return `${quotient}.${decimalPart}`;
    },
    '0.0000',
    'Failed to format BigInt'
  );
}

export function parseToBigInt(value: string, decimals: number = 18): bigint {
  return safeBigIntOperation(
    () => {
      const [whole, decimal = ''] = value.split('.');
      const paddedDecimal = decimal.padEnd(decimals, '0').slice(0, decimals);
      return BigInt(whole + paddedDecimal);
    },
    BigInt(0),
    `Failed to parse "${value}" to BigInt`
  );
}

export function formatNumber(num: number, precision: number = 2): string {
  if (num >= 1e9) return `${(num / 1e9).toFixed(precision)}B`;
  if (num >= 1e6) return `${(num / 1e6).toFixed(precision)}M`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(precision)}K`;
  return num.toFixed(precision);
}

export function formatCurrency(amount: string, symbol: string = 'CORE'): string {
  const formatted = formatNumber(parseFloat(formatBigIntToFixed(BigInt(amount))));
  return `${formatted} ${symbol}`;
}

export function formatPercentage(value: number, precision: number = 2): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(precision)}%`;
}

export function formatTimestamp(timestamp: string): string {
  const date = new Date(parseInt(timestamp) * 1000);
  return date.toLocaleString();
}

export function getTimeAgo(timestamp: string): string {
  const now = Date.now();
  const time = parseInt(timestamp) * 1000;
  const diff = now - time;

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return 'Just now';
}
