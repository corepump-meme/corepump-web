# CorePump DApp - Subgraph context (Graphql, thegraph)

## 🚀 Project Overview

CorePump is a decentralized token launchpad built on Core Chain that enables fair token launches through mathematical bonding curves with anti-rug protection mechanisms. This document provides comprehensive context for developing the frontend dapp using **Next.js 13+** and **React 19**.

### Key Features
- **Fair Distribution**: 4% maximum purchase limits per wallet
- **Anti-Rug Protection**: Immediate ownership renouncement and no post-creation minting
- **Mathematical Price Discovery**: Quadratic bonding curve provides transparent pricing
- **Automated Graduation**: Tokens automatically graduate to DEX trading at $50K market cap
- **Platform Sustainability**: 1% trading fees and 1 CORE creation fees

## 🌐 Network & Endpoints

### Blockchain Network
- **Network**: Core Chain
- **Chain ID**: 1114
- **RPC**: `https://rpc.coredao.org`
- **Block Time**: ~3 seconds

### Subgraph Endpoints
- **Test Network**: `https://thegraph.test2.btcs.network/subgraphs/name/corepump-subgraph`
- **Mainnet**: `https://thegraph.coredao.org/subgraphs/name/corepump-subgraph`

### Smart Contract Addresses
- **EventHub**: `0xd27C6810c589974975cC390eC1A1959862E8a85E`
- **PlatformTreasury**: `0x17Bc6954438a8D5F1B43c9DC5e6B6C1C4D060020`
- **BondingCurve Implementation**: `0xF39fD7CE5a4076c0F1b7EF50f801c8c44E92cDF6`
- **Coin Implementation**: `0xED9e1BD847267DbfDb49583bc2ffB5e578202815`
- **CoinFactory**: `0x7766a44216a23B8BeE5A264aa4f8C4E6aaC00c68`

## 📊 Data Schema & Entities

### Core Entities for Frontend

#### 1. Token Entity
```typescript
interface Token {
  id: string; // Token contract address
  name: string;
  symbol: string;
  description?: string;
  image?: string;
  website?: string;
  telegram?: string;
  twitter?: string;
  creator: string; // Wallet address
  bondingCurve: string; // BondingCurve contract address
  totalSupply: string; // BigInt as string
  totalCoreRaised: string; // BigInt as string
  tokensSold: string; // BigInt as string
  currentPrice: string; // BigInt as string (in wei)
  basePrice: string; // BigInt as string (in wei)
  graduated: boolean;
  graduationTimestamp?: string; // BigInt as string
  createdAt: string; // BigInt as string (Unix timestamp)
  updatedAt: string; // BigInt as string (Unix timestamp)
  trades: Trade[];
  holders: TokenHolder[];
  ohlcData: TokenOHLC[];
}
```

#### 2. Trade Entity
```typescript
interface Trade {
  id: string; // Transaction hash + log index
  token: Token;
  trader: string; // Wallet address
  bondingCurve: string; // BondingCurve contract address
  isBuy: boolean;
  coreAmount: string; // BigInt as string (in wei)
  tokenAmount: string; // BigInt as string (in wei)
  price: string; // BigInt as string (in wei)
  fee: string; // BigInt as string (in wei)
  timestamp: string; // BigInt as string (Unix timestamp)
  blockNumber: string; // BigInt as string
  transactionHash: string;
}
```

#### 3. TokenHolder Entity
```typescript
interface TokenHolder {
  id: string; // Token address + holder address
  token: Token;
  holder: string; // Wallet address
  balance: string; // BigInt as string (in wei)
  totalPurchased: string; // BigInt as string (in wei)
  totalSold: string; // BigInt as string (in wei)
  firstPurchaseTimestamp: string; // BigInt as string
  lastActivityTimestamp: string; // BigInt as string
}
```

#### 4. Platform Entity (Singleton)
```typescript
interface Platform {
  id: "platform";
  totalTokensLaunched: string; // BigInt as string
  totalCoreRaised: string; // BigInt as string
  totalFeesCollected: string; // BigInt as string
  totalTrades: string; // BigInt as string
  totalGraduations: string; // BigInt as string
  creationFee: string; // BigInt as string (1 CORE in wei)
  platformFeePercentage: string; // BigInt as string (100 = 1%)
  maxPurchasePercentage: string; // BigInt as string (400 = 4%)
  graduationThresholdUSD: string; // BigInt as string (50000)
  lastUpdated: string; // BigInt as string
}
```

#### 5. TokenOHLC Entity (Candlestick Data)
```typescript
interface TokenOHLC {
  id: string; // Format: "tokenAddress-interval-timestamp"
  token: Token;
  interval: "1m" | "5m" | "15m" | "1h" | "4h" | "1d" | "1w";
  timestamp: string; // BigInt as string (interval start)
  open: string; // BigInt as string (first price in interval)
  high: string; // BigInt as string (highest price in interval)
  low: string; // BigInt as string (lowest price in interval)
  close: string; // BigInt as string (last price in interval)
  volume: string; // BigInt as string (total CORE volume)
  trades: string; // BigInt as string (number of trades)
  openTimestamp: string; // BigInt as string
  closeTimestamp: string; // BigInt as string
  blockNumber: string; // BigInt as string
}
```

## 🔧 Business Logic Constants

### Key Constants for Frontend
```typescript
export const PLATFORM_CONSTANTS = {
  CREATION_FEE: "1000000000000000000", // 1 CORE in wei
  PLATFORM_FEE_PERCENTAGE: 100, // 1% = 100 basis points
  MAX_PURCHASE_PERCENTAGE: 400, // 4% = 400 basis points
  GRADUATION_THRESHOLD_USD: 50000, // $50,000 USD
  BASE_PRICE: "100000000000000", // 0.0001 CORE in wei
  TOTAL_SUPPLY: "1000000000000000000000000000", // 1 billion tokens in wei
  BONDING_CURVE_SUPPLY: "800000000000000000000000000", // 800M tokens (80%)
} as const;
```

### Bonding Curve Formula
```typescript
// Price calculation: price = basePrice × (1 + tokensSold/totalSupply)²
export function calculateBondingCurvePrice(
  basePrice: bigint,
  tokensSold: bigint,
  totalSupply: bigint
): bigint {
  const ratio = (tokensSold * BigInt(1e18)) / totalSupply; // Use 18 decimal precision
  const onePlusRatio = BigInt(1e18) + ratio;
  const squared = (onePlusRatio * onePlusRatio) / BigInt(1e18);
  return (basePrice * squared) / BigInt(1e18);
}
```

## 📝 Essential GraphQL Queries

### 1. Get All Tokens (Token Discovery Page)
```graphql
query GetTokens($first: Int!, $skip: Int!, $orderBy: String!, $orderDirection: String!) {
  tokens(
    first: $first
    skip: $skip
    orderBy: $orderBy
    orderDirection: $orderDirection
  ) {
    id
    name
    symbol
    description
    image
    creator
    totalCoreRaised
    tokensSold
    currentPrice
    graduated
    createdAt
    trades(first: 1, orderBy: timestamp, orderDirection: desc) {
      timestamp
      price
    }
  }
}
```

### 2. Get Token Details (Token Detail Page)
```graphql
query GetTokenDetails($tokenId: String!) {
  token(id: $tokenId) {
    id
    name
    symbol
    description
    image
    website
    telegram
    twitter
    creator
    bondingCurve
    totalSupply
    totalCoreRaised
    tokensSold
    currentPrice
    basePrice
    graduated
    graduationTimestamp
    createdAt
    updatedAt
  }
}
```

### 3. Get Recent Trades (Trading Activity)
```graphql
query GetRecentTrades($tokenId: String!, $first: Int!) {
  trades(
    where: { token: $tokenId }
    first: $first
    orderBy: timestamp
    orderDirection: desc
  ) {
    id
    trader
    isBuy
    coreAmount
    tokenAmount
    price
    fee
    timestamp
    transactionHash
  }
}
```

### 4. Get Token Holders (Holders Page)
```graphql
query GetTokenHolders($tokenId: String!, $first: Int!) {
  tokenHolders(
    where: { token: $tokenId, balance_gt: "0" }
    first: $first
    orderBy: balance
    orderDirection: desc
  ) {
    holder
    balance
    totalPurchased
    totalSold
    firstPurchaseTimestamp
    lastActivityTimestamp
  }
}
```

### 5. Get User Portfolio
```graphql
query GetUserPortfolio($userAddress: String!) {
  tokenHolders(
    where: { holder: $userAddress, balance_gt: "0" }
    orderBy: lastActivityTimestamp
    orderDirection: desc
  ) {
    token {
      id
      name
      symbol
      image
      currentPrice
      graduated
    }
    balance
    totalPurchased
    totalSold
    firstPurchaseTimestamp
  }
}
```

### 6. Get OHLC Chart Data
```graphql
query GetOHLCData($tokenId: String!, $interval: String!, $from: String!, $to: String!) {
  tokenOHLCs(
    where: {
      token: $tokenId
      interval: $interval
      timestamp_gte: $from
      timestamp_lte: $to
    }
    orderBy: timestamp
    orderDirection: asc
    first: 1000
  ) {
    timestamp
    open
    high
    low
    close
    volume
    trades
  }
}
```

### 7. Get Platform Statistics (Dashboard)
```graphql
query GetPlatformStats {
  platform(id: "platform") {
    totalTokensLaunched
    totalCoreRaised
    totalFeesCollected
    totalTrades
    totalGraduations
    lastUpdated
  }
}
```

### 8. Get Daily Analytics
```graphql
query GetDailyStats($from: String!, $to: String!) {
  dailyStats(
    where: { date_gte: $from, date_lte: $to }
    orderBy: date
    orderDirection: asc
  ) {
    date
    tokensLaunched
    totalTrades
    coreVolume
    feesCollected
    graduations
    activeTraders
  }
}
```

## ⚛️ Next.js 13+ & React 19 Integration Examples

### 1. GraphQL Client Setup (Apollo Client)
```typescript
// lib/apollo-client.ts
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: process.env.NODE_ENV === 'production' 
    ? 'https://thegraph.coredao.org/subgraphs/name/corepump-subgraph'
    : 'https://thegraph.test2.btcs.network/subgraphs/name/corepump-subgraph',
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      Token: {
        fields: {
          trades: {
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
        },
      },
    },
  }),
});
```

### 2. Token Discovery Page (App Router)
```typescript
// app/tokens/page.tsx
import { Suspense } from 'react';
import { TokenList } from '@/components/TokenList';
import { TokenListSkeleton } from '@/components/TokenListSkeleton';

export default function TokensPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Discover Tokens</h1>
      <Suspense fallback={<TokenListSkeleton />}>
        <TokenList />
      </Suspense>
    </div>
  );
}
```

### 3. Token List Component with React 19 Features
```typescript
// components/TokenList.tsx
'use client';

import { use } from 'react';
import { useQuery } from '@apollo/client';
import { GET_TOKENS } from '@/queries/tokens';
import { TokenCard } from './TokenCard';
import { formatEther } from 'ethers';

interface TokenListProps {
  searchQuery?: string;
  sortBy?: 'createdAt' | 'totalCoreRaised' | 'currentPrice';
}

export function TokenList({ searchQuery, sortBy = 'createdAt' }: TokenListProps) {
  const { data, loading, error, fetchMore } = useQuery(GET_TOKENS, {
    variables: {
      first: 20,
      skip: 0,
      orderBy: sortBy,
      orderDirection: 'desc',
    },
    notifyOnNetworkStatusChange: true,
  });

  if (loading) return <TokenListSkeleton />;
  if (error) return <div>Error loading tokens: {error.message}</div>;

  const tokens = data?.tokens || [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tokens.map((token: any) => (
          <TokenCard key={token.id} token={token} />
        ))}
      </div>
      
      <button
        onClick={() => fetchMore({
          variables: { skip: tokens.length },
        })}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Load More
      </button>
    </div>
  );
}
```

### 4. Token Detail Page with Real-time Updates
```typescript
// app/token/[address]/page.tsx
import { Suspense } from 'react';
import { TokenDetails } from '@/components/TokenDetails';
import { TradingInterface } from '@/components/TradingInterface';
import { TokenChart } from '@/components/TokenChart';

interface TokenPageProps {
  params: { address: string };
}

export default function TokenPage({ params }: TokenPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Suspense fallback={<div>Loading chart...</div>}>
            <TokenChart tokenAddress={params.address} />
          </Suspense>
        </div>
        
        <div className="space-y-6">
          <Suspense fallback={<div>Loading token details...</div>}>
            <TokenDetails tokenAddress={params.address} />
          </Suspense>
          
          <Suspense fallback={<div>Loading trading interface...</div>}>
            <TradingInterface tokenAddress={params.address} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
```

### 5. Real-time Price Hook
```typescript
// hooks/useTokenPrice.ts
'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_TOKEN_DETAILS } from '@/queries/tokens';

export function useTokenPrice(tokenAddress: string) {
  const { data, startPolling, stopPolling } = useQuery(GET_TOKEN_DETAILS, {
    variables: { tokenId: tokenAddress },
    pollInterval: 5000, // Poll every 5 seconds
  });

  useEffect(() => {
    startPolling(5000);
    return () => stopPolling();
  }, [startPolling, stopPolling]);

  const token = data?.token;
  const currentPrice = token?.currentPrice ? BigInt(token.currentPrice) : BigInt(0);
  
  return {
    currentPrice,
    formattedPrice: formatEther(currentPrice),
    graduated: token?.graduated || false,
    totalCoreRaised: token?.totalCoreRaised ? BigInt(token.totalCoreRaised) : BigInt(0),
    tokensSold: token?.tokensSold ? BigInt(token.tokensSold) : BigInt(0),
  };
}
```

### 6. Trading Interface Component
```typescript
// components/TradingInterface.tsx
'use client';

import { useState, useTransition } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import { parseEther, formatEther } from 'ethers';
import { useTokenPrice } from '@/hooks/useTokenPrice';
import { BONDING_CURVE_ABI } from '@/abis/BondingCurve';

interface TradingInterfaceProps {
  tokenAddress: string;
}

export function TradingInterface({ tokenAddress }: TradingInterfaceProps) {
  const [amount, setAmount] = useState('');
  const [isBuying, setIsBuying] = useState(true);
  const [isPending, startTransition] = useTransition();
  
  const { address } = useAccount();
  const { currentPrice, graduated } = useTokenPrice(tokenAddress);
  const { writeContract } = useWriteContract();

  const handleTrade = () => {
    if (!address || !amount || graduated) return;

    startTransition(() => {
      const coreAmount = parseEther(amount);
      
      if (isBuying) {
        writeContract({
          address: tokenAddress as `0x${string}`,
          abi: BONDING_CURVE_ABI,
          functionName: 'buyTokens',
          value: coreAmount,
        });
      } else {
        // Handle sell logic
        writeContract({
          address: tokenAddress as `0x${string}`,
          abi: BONDING_CURVE_ABI,
          functionName: 'sellTokens',
          args: [parseEther(amount)],
        });
      }
    });
  };

  if (graduated) {
    return (
      <div className="p-4 bg-green-100 rounded-lg">
        <p className="text-green-800">This token has graduated to DEX trading!</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex mb-4">
        <button
          onClick={() => setIsBuying(true)}
          className={`flex-1 py-2 px-4 rounded-l ${
            isBuying ? 'bg-green-600 text-white' : 'bg-gray-200'
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => setIsBuying(false)}
          className={`flex-1 py-2 px-4 rounded-r ${
            !isBuying ? 'bg-red-600 text-white' : 'bg-gray-200'
          }`}
        >
          Sell
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Amount (CORE)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 border rounded-lg"
            placeholder="0.0"
          />
        </div>

        <div className="text-sm text-gray-600">
          <p>Current Price: {formatEther(currentPrice)} CORE</p>
          <p>Platform Fee: 1%</p>
        </div>

        <button
          onClick={handleTrade}
          disabled={!address || !amount || isPending}
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending ? 'Processing...' : `${isBuying ? 'Buy' : 'Sell'} Tokens`}
        </button>
      </div>
    </div>
  );
}
```

### 7. Chart Component with OHLC Data
```typescript
// components/TokenChart.tsx
'use client';

import { useQuery } from '@apollo/client';
import { GET_OHLC_DATA } from '@/queries/ohlc';
import { formatEther } from 'ethers';
import dynamic from 'next/dynamic';

// Dynamically import chart library to avoid SSR issues
const Chart = dynamic(() => import('react-chartjs-2'), { ssr: false });

interface TokenChartProps {
  tokenAddress: string;
  interval?: '1h' | '1d' | '1w';
}

export function TokenChart({ tokenAddress, interval = '1h' }: TokenChartProps) {
  const { data, loading } = useQuery(GET_OHLC_DATA, {
    variables: {
      tokenId: tokenAddress,
      interval,
      from: Math.floor(Date.now() / 1000) - 86400, // Last 24 hours
      to: Math.floor(Date.now() / 1000),
    },
    pollInterval: 30000, // Update every 30 seconds
  });

  if (loading) return <div>Loading chart...</div>;

  const ohlcData = data?.tokenOHLCs || [];
  
  const chartData = {
    labels: ohlcData.map((candle: any) => 
      new Date(parseInt(candle.timestamp) * 1000).toLocaleTimeString()
    ),
    datasets: [
      {
        label: 'Price (CORE)',
        data: ohlcData.map((candle: any) => formatEther(candle.close)),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
      },
    ],
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Price Chart</h3>
      <Chart type="line" data={chartData} />
    </div>
  );
}
```

## 🔄 Real-time Updates & Subscriptions

### WebSocket Subscription (if supported)
```typescript
// hooks/useRealtimeUpdates.ts
import { useSubscription } from '@apollo/client';
import { TOKEN_UPDATES_SUBSCRIPTION } from '@/queries/subscriptions';

export function useRealtimeTokenUpdates(tokenAddress: string) {
  const { data, loading } = useSubscription(TOKEN_UPDATES_SUBSCRIPTION, {
    variables: { tokenAddress },
  });

  return {
    latestTrade: data?.tradeAdded,
    priceUpdate: data?.tokenUpdated,
    loading,
  };
}
```

### Polling Strategy for Real-time Feel
```typescript
// hooks/usePollingStrategy.ts
import { useEffect, useRef } from 'react';

export function usePollingStrategy(refetch: () => void, interval = 5000) {
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    intervalRef.current = setInterval(refetch, interval);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [refetch, interval]);

  // Pause polling when tab is not visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      } else {
        intervalRef.current = setInterval(refetch, interval);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [refetch, interval]);
}
```

## 🎨 UI/UX Patterns for DeFi

### 1. Token Status Indicators
```typescript
// components/TokenStatus.tsx
interface TokenStatusProps {
  graduated: boolean;
  totalCoreRaised: bigint;
  graduationThreshold: bigint;
}

export function TokenStatus({ graduated, totalCoreRaised, graduationThreshold }: TokenStatusProps) {
  const progress = Number((totalCoreRaised * BigInt(100)) / graduationThreshold);
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Progress to Graduation</span>
        <span>{progress.toFixed(1)}%</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${
            graduated ? 'bg-green-500' : 'bg-blue-500'
          }`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      
      {graduated && (
        <div className="flex items-center text-green-600 text-sm">
          <CheckCircleIcon className="w-4 h-4 mr-1" />
          Graduated to DEX
        </div>
      )}
    </div>
  );
}
```

### 2. Price Change Indicators
```typescript
// components/PriceChange.tsx
interface PriceChangeProps {
  currentPrice: bigint;
  previousPrice: bigint;
}

export function PriceChange({ currentPrice, previousPrice }: PriceChangeProps) {
  const change = currentPrice - previousPrice;
  const changePercent = previousPrice > 0 
    ? Number((change * BigInt(10000)) / previousPrice) / 100
    : 0;
  
  const isPositive = change >= 0;
  
  return (
    <span className={`flex items-center ${
      isPositive ? 'text-green-600' : 'text-red-600'
    }`}>
      {isPositive ? '↗' : '↘'}
      {Math.abs(changePercent).toFixed(2)}%
    </span>
  );
}
```

## 🚨 Error Handling & Edge Cases

### GraphQL Error Handling
```typescript
// utils/errorHandling.ts
export function handleGraphQLError(error: any) {
  if (error.networkError) {
    console.error('Network error:', error.networkError);
    return 'Network connection failed. Please check your internet connection.';
  }
  
  if (error.graphQLErrors?.length > 0) {
    console.error('GraphQL errors:', error.graphQLErrors);
    return 'Failed to fetch data. Please try again later.';
  }
  
  return 'An unexpected error occurred.';
}
```

### Wallet Connection Error Handling
```typescript
// hooks/useWalletConnection.ts
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useState } from 'react';

export function useWalletConnection() {
  const [error, setError] = useState<string | null>(null);
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect({
    onError: (error) => {
      setError(error.message);
    },
  });
  const { disconnect } = useDisconnect();

  const connectWallet = async () => {
    try {
      setError(null);
      const connector = connectors.find(c => c.name === 'MetaMask');
      if (connector) {
        connect({ connector });
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return {
    address,
    isConnected,
    error,
    connectWallet,
    disconnect,
  };
}
```

## 🔧 Performance Optimization

### Query Optimization
```typescript
// Use fragments for reusable query parts
const TOKEN_FRAGMENT = gql`
  fragment TokenInfo on Token {
    id
    name
    symbol
    image
    currentPrice
    totalCoreRaised
    graduated
    createdAt
  }
`;

// Optimize with proper field selection
const GET_TOKENS_OPTIMIZED = gql`
  query GetTokensOptimized($first: Int!, $skip: Int!) {
    tokens(first: $first, skip: $skip, orderBy: createdAt, orderDirection: desc) {
      ...TokenInfo
      trades(first: 1, orderBy: timestamp, orderDirection: desc) {
        timestamp
        price
      }
    }
  }
  ${TOKEN_FRAGMENT}
`;
```

### Caching Strategy
```typescript
// Apollo Client cache configuration
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        tokens: {
          keyArgs: ['orderBy', 'orderDirection'],
          merge(existing = [], incoming, { args }) {
            const { skip = 0 } = args || {};
            const merged = existing ? existing.slice() : [];
            for (let i = 0; i < incoming.length; ++i) {
              merged[skip + i] = incoming[i];
            }
            return merged;
          },
        },
      },
    },
  },
});
```

## 📱 Mobile Responsiveness

### Responsive Trading Interface
```typescript
// components/MobileTradingInterface.tsx
export function MobileTradingInterface({ tokenAddress }: { tokenAddress: string }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 md:relative md:border-t-0">
      <div className="max-w-sm mx-auto md:max-w-none">
        <TradingInterface tokenAddress={tokenAddress} />
      </div>
    </div>
  );
}
```

### Mobile-First Token Cards
```typescript
// components/TokenCard.tsx
interface TokenCardProps {
  token: Token;
}

export function TokenCard({ token }: TokenCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center space-x-3 mb-3">
        {token.image && (
          <img 
            src={token.image} 
            alt={token.name}
            className="w-12 h-12 rounded-full"
          />
        )}
        <div>
          <h3 className="font-semibold text-lg">{token.name}</h3>
          <p className="text-gray-600 text-sm">{token.symbol}</p>
        </div>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Price:</span>
          <span className="font-mono">{formatEther(token.currentPrice)} CORE</span>
        </div>
        <div className="flex justify-between">
          <span>Market Cap:</span>
          <span className="font-mono">{formatEther(token.totalCoreRaised)} CORE</span>
        </div>
        <TokenStatus 
          graduated={token.graduated}
          totalCoreRaised={BigInt(token.totalCoreRaised)}
          graduationThreshold={BigInt("50000000000000000000000")} // 50K CORE
        />
      </div>
    </div>
  );
}
```

## 🔐 Security Best Practices

### Input Validation
```typescript
// utils/validation.ts
export function validateTokenAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

export function validateAmount(amount: string): { isValid: boolean; error?: string } {
  if (!amount || amount === '0') {
    return { isValid: false, error: 'Amount must be greater than 0' };
  }
  
  try {
    const parsed = parseEther(amount);
    if (parsed <= 0) {
      return { isValid: false, error: 'Amount must be positive' };
    }
    return { isValid: true };
  } catch {
    return { isValid: false, error: 'Invalid amount format' };
  }
}

export function sanitizeUserInput(input: string): string {
  return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
}
```

### Safe BigInt Operations
```typescript
// utils/bigint.ts
export function safeBigIntOperation(
  operation: () => bigint,
  fallback: bigint = BigInt(0)
): bigint {
  try {
    return operation();
  } catch (error) {
    console.error('BigInt operation failed:', error);
    return fallback;
  }
}

export function formatBigIntToFixed(value: bigint, decimals: number = 18, precision: number = 4): string {
  try {
    const divisor = BigInt(10 ** decimals);
    const quotient = value / divisor;
    const remainder = value % divisor;
    
    const remainderStr = remainder.toString().padStart(decimals, '0');
    const decimalPart = remainderStr.slice(0, precision);
    
    return `${quotient}.${decimalPart}`;
  } catch {
    return '0.0000';
  }
}
```

## 🧪 Testing Strategies

### Component Testing with React Testing Library
```typescript
// __tests__/TokenCard.test.tsx
import { render, screen } from '@testing-library/react';
import { TokenCard } from '@/components/TokenCard';
import { mockToken } from '@/mocks/token';

describe('TokenCard', () => {
  it('renders token information correctly', () => {
    render(<TokenCard token={mockToken} />);
    
    expect(screen.getByText(mockToken.name)).toBeInTheDocument();
    expect(screen.getByText(mockToken.symbol)).toBeInTheDocument();
    expect(screen.getByText(/Price:/)).toBeInTheDocument();
  });

  it('shows graduation status for graduated tokens', () => {
    const graduatedToken = { ...mockToken, graduated: true };
    render(<TokenCard token={graduatedToken} />);
    
    expect(screen.getByText(/Graduated to DEX/)).toBeInTheDocument();
  });
});
```

### GraphQL Query Testing
```typescript
// __tests__/queries.test.ts
import { MockedProvider } from '@apollo/client/testing';
import { render, waitFor } from '@testing-library/react';
import { GET_TOKENS } from '@/queries/tokens';
import { TokenList } from '@/components/TokenList';

const mocks = [
  {
    request: {
      query: GET_TOKENS,
      variables: { first: 20, skip: 0, orderBy: 'createdAt', orderDirection: 'desc' },
    },
    result: {
      data: {
        tokens: [
          {
            id: '0x123',
            name: 'Test Token',
            symbol: 'TEST',
            currentPrice: '1000000000000000',
            // ... other fields
          },
        ],
      },
    },
  },
];

test('renders token list', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <TokenList />
    </MockedProvider>
  );

  await waitFor(() => {
    expect(screen.getByText('Test Token')).toBeInTheDocument();
  });
});
```

## 🚀 Deployment & Environment Setup

### Environment Variables
```bash
# .env.local
NEXT_PUBLIC_SUBGRAPH_URL_TESTNET=https://thegraph.test2.btcs.network/subgraphs/name/corepump-subgraph
NEXT_PUBLIC_SUBGRAPH_URL_MAINNET=https://thegraph.coredao.org/subgraphs/name/corepump-subgraph
NEXT_PUBLIC_CORE_RPC_URL=https://rpc.coredao.org
NEXT_PUBLIC_CHAIN_ID=1116
NEXT_PUBLIC_ENVIRONMENT=development
```

### Next.js Configuration
```typescript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['ipfs.io', 'gateway.pinata.cloud'],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
};

module.exports = nextConfig;
```

### Wagmi Configuration
```typescript
// lib/wagmi.ts
import { createConfig, http } from 'wagmi';
import { core } from 'wagmi/chains';
import { metaMask, walletConnect } from 'wagmi/connectors';

export const config = createConfig({
  chains: [core],
  connectors: [
    metaMask(),
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    }),
  ],
  transports: {
    [core.id]: http(process.env.NEXT_PUBLIC_CORE_RPC_URL),
  },
});
```

## 📊 Analytics & Monitoring

### User Analytics Hook
```typescript
// hooks/useAnalytics.ts
import { useEffect } from 'react';

export function useAnalytics() {
  const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    // Implement your analytics tracking here
    console.log('Analytics Event:', eventName, properties);
  };

  const trackPageView = (pageName: string) => {
    trackEvent('page_view', { page: pageName });
  };

  const trackTokenView = (tokenAddress: string, tokenName: string) => {
    trackEvent('token_view', { 
      token_address: tokenAddress,
      token_name: tokenName 
    });
  };

  const trackTrade = (tokenAddress: string, isBuy: boolean, amount: string) => {
    trackEvent('trade_attempt', {
      token_address: tokenAddress,
      trade_type: isBuy ? 'buy' : 'sell',
      amount,
    });
  };

  return {
    trackEvent,
    trackPageView,
    trackTokenView,
    trackTrade,
  };
}
```

### Performance Monitoring
```typescript
// hooks/usePerformanceMonitoring.ts
import { useEffect } from 'react';

export function usePerformanceMonitoring() {
  useEffect(() => {
    // Monitor Core Web Vitals
    if (typeof window !== 'undefined' && 'performance' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          console.log('Performance metric:', entry.name, entry.value);
        });
      });

      observer.observe({ entryTypes: ['measure', 'navigation'] });

      return () => observer.disconnect();
    }
  }, []);
}
```

## 🔧 Utility Functions

### Date & Time Utilities
```typescript
// utils/time.ts
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

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${secs}s`;
  return `${secs}s`;
}
```

### Number Formatting Utilities
```typescript
// utils/format.ts
export function formatNumber(num: number, precision: number = 2): string {
  if (num >= 1e9) return `${(num / 1e9).toFixed(precision)}B`;
  if (num >= 1e6) return `${(num / 1e6).toFixed(precision)}M`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(precision)}K`;
  return num.toFixed(precision);
}

export function formatPercentage(value: number, precision: number = 2): string {
  return `${value.toFixed(precision)}%`;
}

export function formatCurrency(amount: string, symbol: string = 'CORE'): string {
  const formatted = formatNumber(parseFloat(formatEther(amount)));
  return `${formatted} ${symbol}`;
}
```

## 🎯 Key Integration Points Summary

### Essential Queries for Frontend Features

1. **Token Discovery**: Use `GetTokens` with pagination and sorting
2. **Token Details**: Use `GetTokenDetails` for individual token pages
3. **Trading Data**: Use `GetRecentTrades` for activity feeds
4. **Portfolio**: Use `GetUserPortfolio` for user dashboard
5. **Charts**: Use `GetOHLCData` for price visualization
6. **Analytics**: Use `GetPlatformStats` and `GetDailyStats` for insights

### Real-time Updates Strategy

1. **Polling**: 5-second intervals for active trading pages
2. **Background Updates**: 30-second intervals for discovery pages
3. **Visibility API**: Pause updates when tab is hidden
4. **Error Handling**: Graceful degradation when subgraph is unavailable

### Performance Optimization Checklist

- [ ] Implement query fragments for reusable fields
- [ ] Use Apollo Client caching effectively
- [ ] Implement pagination for large datasets
- [ ] Optimize images with Next.js Image component
- [ ] Use React.memo for expensive components
- [ ] Implement virtual scrolling for large lists
- [ ] Cache static data (platform constants, ABIs)

### Security Checklist

- [ ] Validate all user inputs
- [ ] Sanitize data from external sources
- [ ] Use proper error boundaries
- [ ] Implement rate limiting for API calls
- [ ] Validate wallet addresses before transactions
- [ ] Handle BigInt operations safely
- [ ] Implement proper loading states

---

## 📞 Support & Resources

### Documentation Links
- [Next.js 13+ Documentation](https://nextjs.org/docs)
- [React 19 Documentation](https://react.dev/)
- [Apollo Client Documentation](https://www.apollographql.com/docs/react/)
- [Wagmi Documentation](https://wagmi.sh/)
- [The Graph Documentation](https://thegraph.com/docs/)

### CorePump Specific Resources
- **Subgraph Playground**: Access the GraphQL playground at your subgraph endpoint
- **Contract ABIs**: Available in the `/abis` directory of this repository
- **Test Network**: Use Core testnet for development and testing

This comprehensive context document provides everything needed to build a robust, performant, and user-friendly frontend for the CorePump platform using Next.js 13+ and React 19.
