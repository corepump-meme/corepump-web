'use client';

import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { GET_TOKENS_LIST, GET_TOKENS_SEARCH } from '@/queries/tokens';
import { Token } from '@/types/graphql';

export type SortOption = 'createdAt' | 'totalCoreRaised' | 'currentPrice';
export type SortDirection = 'asc' | 'desc';

interface UseTokensOptions {
  initialLimit?: number;
  sortBy?: SortOption;
  sortDirection?: SortDirection;
  searchQuery?: string;
}

interface UseTokensReturn {
  tokens: Token[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
  refetch: () => void;
}

export function useTokens({
  initialLimit = 20,
  sortBy = 'createdAt',
  sortDirection = 'desc',
  searchQuery = '',
}: UseTokensOptions = {}): UseTokensReturn {
  const [limit, setLimit] = useState(initialLimit);

  // Choose query based on whether we have a search term
  const hasSearch = searchQuery.trim().length > 0;
  const query = hasSearch ? GET_TOKENS_SEARCH : GET_TOKENS_LIST;
  
  // Prepare variables based on query type
  const variables = hasSearch 
    ? {
        first: limit,
        skip: 0,
        orderBy: sortBy,
        orderDirection: sortDirection,
        search: searchQuery.trim(),
      }
    : {
        first: limit,
        skip: 0,
        orderBy: sortBy,
        orderDirection: sortDirection,
      };

  const { data, loading, error, fetchMore, refetch } = useQuery(query, {
    variables,
    pollInterval: 30000, // Poll every 30 seconds
    notifyOnNetworkStatusChange: true,
  });

  // Reset limit when sort or search changes
  useEffect(() => {
    setLimit(initialLimit);
  }, [sortBy, sortDirection, searchQuery, initialLimit]);

  const tokens = useMemo(() => {
    return data?.tokens || [];
  }, [data]);

  const hasMore = useMemo(() => {
    return tokens.length >= limit && tokens.length % initialLimit === 0;
  }, [tokens.length, limit, initialLimit]);

  const loadMore = async () => {
    if (!hasMore || loading) return;

    try {
      const fetchMoreVariables = hasSearch 
        ? {
            skip: tokens.length,
            first: initialLimit,
            orderBy: sortBy,
            orderDirection: sortDirection,
            search: searchQuery.trim(),
          }
        : {
            skip: tokens.length,
            first: initialLimit,
            orderBy: sortBy,
            orderDirection: sortDirection,
          };

      await fetchMore({
        variables: fetchMoreVariables,
      });
      setLimit(prev => prev + initialLimit);
    } catch (err) {
      console.error('Failed to load more tokens:', err);
    }
  };

  const errorMessage = error ? 
    error.networkError ? 
      'Network connection failed. Please check your internet connection.' :
      'Failed to fetch tokens. Please try again later.' :
    null;

  return {
    tokens,
    loading,
    error: errorMessage,
    hasMore,
    loadMore,
    refetch,
  };
}
