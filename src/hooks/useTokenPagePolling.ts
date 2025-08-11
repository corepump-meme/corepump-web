'use client';

import { useEffect, useCallback, useRef } from 'react';
import { useTokenData } from './useTokenData';

interface UseTokenPagePollingOptions {
  tokenAddress: string;
  enabled?: boolean;
  onTradeComplete?: () => void;
}

interface UseTokenPagePollingReturn {
  token: ReturnType<typeof useTokenData>['token'];
  metrics: ReturnType<typeof useTokenData>['metrics'];
  holders: ReturnType<typeof useTokenData>['holders'];
  recentTrades: ReturnType<typeof useTokenData>['recentTrades'];
  loading: boolean;
  error: ReturnType<typeof useTokenData>['error'];
  refresh: () => Promise<void>;
}

export const useTokenPagePolling = ({
  tokenAddress,
  enabled = true,
  onTradeComplete
}: UseTokenPagePollingOptions): UseTokenPagePollingReturn => {
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastRefreshRef = useRef<number>(0);
  
  // Get token data without internal polling
  const tokenDataResult = useTokenData(tokenAddress);
  
  // Centralized refresh function with debouncing
  const refresh = useCallback(async () => {
    const now = Date.now();
    
    // Debounce refreshes to prevent rapid successive calls
    if (now - lastRefreshRef.current < 2000) {
      return;
    }
    
    lastRefreshRef.current = now;
    
    try {
      await tokenDataResult.refetch();
      
      // Notify of trade completion if callback provided
      if (onTradeComplete) {
        onTradeComplete();
      }
    } catch (error) {
      console.error('Token data refresh error:', error);
    }
  }, [tokenDataResult, onTradeComplete]);

  // Smart polling based on token status
  useEffect(() => {
    if (!enabled || !tokenAddress || !tokenDataResult.token) {
      return;
    }

    // Clear existing interval
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
    }

    // Determine polling interval based on token graduation status
    const isGraduated = tokenDataResult.token.graduated;
    const pollingInterval = isGraduated ? 30000 : 15000; // 30s for graduated, 15s for active

    // Set up polling
    pollingIntervalRef.current = setInterval(refresh, pollingInterval);

    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = null;
      }
    };
  }, [enabled, tokenAddress, tokenDataResult.token?.graduated, refresh]);

  // Pause polling when page is not visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Clear polling when tab is hidden
        if (pollingIntervalRef.current) {
          clearInterval(pollingIntervalRef.current);
          pollingIntervalRef.current = null;
        }
      } else {
        // Resume polling when tab becomes visible
        if (enabled && tokenAddress && !pollingIntervalRef.current) {
          const isGraduated = tokenDataResult.token?.graduated;
          const pollingInterval = isGraduated ? 30000 : 15000;
          pollingIntervalRef.current = setInterval(refresh, pollingInterval);
          
          // Also refresh immediately when page becomes visible
          refresh();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [enabled, tokenAddress, tokenDataResult.token?.graduated, refresh]);

  // Enhanced refresh that also notifies chart components
  const enhancedRefresh = useCallback(async () => {
    await refresh();
    
    // Dispatch custom event for chart components to update
    window.dispatchEvent(new CustomEvent('tokenDataUpdated', {
      detail: { tokenAddress }
    }));
  }, [refresh, tokenAddress]);

  return {
    token: tokenDataResult.token,
    metrics: tokenDataResult.metrics,
    holders: tokenDataResult.holders,
    recentTrades: tokenDataResult.recentTrades,
    loading: tokenDataResult.loading,
    error: tokenDataResult.error,
    refresh: enhancedRefresh,
  };
};
