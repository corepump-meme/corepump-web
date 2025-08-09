'use client';

import { useQuery, ApolloError } from '@apollo/client';
import { useState, useEffect, useMemo } from 'react';
import { GET_TOKEN_DETAILS, GET_TOKEN_METRICS } from '@/queries/tokens';
import { formatBigIntToFixed, safeBigIntOperation, formatNumber } from '@/lib/bigint-utils';
import { Token, Trade, TokenHolder } from '@/types/graphql';

export interface TokenMetrics {
  currentPrice: string;
  formattedPrice: string;
  marketCap: string;
  formattedMarketCap: string;
  volume24h: string;
  formattedVolume24h: string;
  priceChange24h: number;
  progressToGraduation: number;
  virtualLiquidity: string;
  formattedVirtualLiquidity: string;
}

export interface UseTokenDataReturn {
  token: Token | null;
  metrics: TokenMetrics | null;
  holders: TokenHolder[];
  recentTrades: Trade[];
  loading: boolean;
  error: ApolloError | null;
  refetch: () => void;
}

const GRADUATION_THRESHOLD = BigInt("50000000000000000000000"); // 50K CORE in wei

export function useTokenData(tokenAddress: string): UseTokenDataReturn {
  const [pollingInterval, setPollingInterval] = useState(5000);

  // Get current timestamp for 24h calculations
  const from24h = Math.floor(Date.now() / 1000) - 86400;

  // Main token details query
  const { 
    data: tokenData, 
    loading: tokenLoading, 
    error: tokenError,
    refetch: refetchToken,
    startPolling: startTokenPolling,
    stopPolling: stopTokenPolling
  } = useQuery(GET_TOKEN_DETAILS, {
    variables: { tokenId: tokenAddress },
    skip: !tokenAddress,
    errorPolicy: 'all',
  });

  // Metrics query for 24h data
  const { 
    data: metricsData, 
    loading: metricsLoading,
    error: metricsError,
    refetch: refetchMetrics,
    startPolling: startMetricsPolling,
    stopPolling: stopMetricsPolling
  } = useQuery(GET_TOKEN_METRICS, {
    variables: { 
      tokenId: tokenAddress,
      from24h: from24h.toString()
    },
    skip: !tokenAddress,
    errorPolicy: 'all',
  });

  // Calculate metrics from the data
  const metrics = useMemo((): TokenMetrics | null => {
    if (!tokenData?.token || !metricsData?.token) return null;

    const token = tokenData.token;
    const currentPrice = BigInt(token.currentPrice);
    const marketCap = BigInt(token.totalCoreRaised);
    
    // Calculate 24h volume
    const volume24h = safeBigIntOperation(
      () => {
        return metricsData.trades24h?.reduce(
          (sum: bigint, trade: Trade) => sum + BigInt(trade.coreAmount),
          BigInt(0)
        ) || BigInt(0);
      },
      BigInt(0)
    );

    // Calculate 24h price change
    const priceChange24h = safeBigIntOperation(
      () => {
        const oldPrice = metricsData.trades24hAgo?.[0]?.price;
        if (!oldPrice) return 0;
        
        const oldPriceBigInt = BigInt(oldPrice);
        if (oldPriceBigInt === BigInt(0)) return 0;
        
        const change = currentPrice - oldPriceBigInt;
        return Number((change * BigInt(10000)) / oldPriceBigInt) / 100;
      },
      0
    );

    // Calculate graduation progress
    const progressToGraduation = safeBigIntOperation(
      () => {
        return Number((marketCap * BigInt(100)) / GRADUATION_THRESHOLD);
      },
      0
    );

    // Calculate virtual liquidity (bonding curve calculation)
    const virtualLiquidity = safeBigIntOperation(
      () => {
        const basePrice = BigInt(token.basePrice);
        const tokensSold = BigInt(token.tokensSold);
        const totalSupply = BigInt(token.totalSupply);
        
        // Simplified bonding curve calculation for virtual liquidity
        const ratio = (tokensSold * BigInt(1e18)) / totalSupply;
        const onePlusRatio = BigInt(1e18) + ratio;
        const squared = (onePlusRatio * onePlusRatio) / BigInt(1e18);
        return (basePrice * squared) / BigInt(1e18);
      },
      currentPrice
    );

    return {
      currentPrice: currentPrice.toString(),
      formattedPrice: formatBigIntToFixed(currentPrice, 18, 6),
      marketCap: marketCap.toString(),
      formattedMarketCap: formatNumber(parseFloat(formatBigIntToFixed(marketCap, 18, 2))),
      volume24h: volume24h.toString(),
      formattedVolume24h: formatNumber(parseFloat(formatBigIntToFixed(volume24h, 18, 2))),
      priceChange24h,
      progressToGraduation: Math.min(progressToGraduation, 100),
      virtualLiquidity: virtualLiquidity.toString(),
      formattedVirtualLiquidity: formatBigIntToFixed(virtualLiquidity, 18, 6),
    };
  }, [tokenData, metricsData]);

  // Adjust polling based on token status
  useEffect(() => {
    const token = tokenData?.token;
    if (token) {
      const interval = token.graduated ? 30000 : 5000; // 30s for graduated, 5s for active
      setPollingInterval(interval);
      
      startTokenPolling(interval);
      startMetricsPolling(interval);
    }

    return () => {
      stopTokenPolling();
      stopMetricsPolling();
    };
  }, [tokenData?.token, startTokenPolling, stopTokenPolling, startMetricsPolling, stopMetricsPolling]);

  // Pause polling when tab is not visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopTokenPolling();
        stopMetricsPolling();
      } else {
        startTokenPolling(pollingInterval);
        startMetricsPolling(pollingInterval);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [pollingInterval, startTokenPolling, stopTokenPolling, startMetricsPolling, stopMetricsPolling]);

  const refetch = () => {
    refetchToken();
    refetchMetrics();
  };

  return {
    token: tokenData?.token || null,
    metrics,
    holders: tokenData?.token?.holders || [],
    recentTrades: tokenData?.token?.trades || [],
    loading: tokenLoading || metricsLoading,
    error: tokenError || metricsError || null,
    refetch,
  };
}
