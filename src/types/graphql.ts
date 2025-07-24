export interface Token {
  __typename?: 'Token';
  id: string;
  name: string;
  symbol: string;
  description?: string | null;
  image?: string | null;
  website?: string | null;
  telegram?: string | null;
  twitter?: string | null;
  creator: string;
  bondingCurve: string;
  totalSupply: string;
  totalCoreRaised: string;
  tokensSold: string;
  currentPrice: string;
  basePrice: string;
  graduated: boolean;
  graduationTimestamp?: string | null;
  createdAt: string;
  updatedAt: string;
  trades: Trade[];
  holders: TokenHolder[];
  ohlcData: TokenOHLC[];
}

export interface Trade {
  __typename?: 'Trade';
  id: string;
  token: Token;
  trader: string;
  bondingCurve: string;
  isBuy: boolean;
  coreAmount: string;
  tokenAmount: string;
  price: string;
  fee: string;
  timestamp: string;
  blockNumber: string;
  transactionHash: string;
}

export interface TokenHolder {
  __typename?: 'TokenHolder';
  id: string;
  token: Token;
  holder: string;
  balance: string;
  totalPurchased: string;
  totalSold: string;
  firstPurchaseTimestamp: string;
  lastActivityTimestamp: string;
}

export interface TokenOHLC {
  __typename?: 'TokenOHLC';
  id: string;
  token: Token;
  interval: '1m' | '5m' | '15m' | '1h' | '4h' | '1d' | '1w';
  timestamp: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  trades: string;
  openTimestamp: string;
  closeTimestamp: string;
  blockNumber: string;
}

export interface Platform {
  __typename?: 'Platform';
  id: 'platform';
  totalTokensLaunched: string;
  totalCoreRaised: string;
  totalFeesCollected: string;
  totalTrades: string;
  totalGraduations: string;
  creationFee: string;
  platformFeePercentage: string;
  maxPurchasePercentage: string;
  graduationThresholdUSD: string;
  lastUpdated: string;
}
