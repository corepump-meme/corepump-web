'use client';

import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { TOKEN_CORE_FRAGMENT } from '@/queries/fragments/token-fragments';
import { Token, Trade } from '@/types/graphql';

// Query for recent activities (trades and token creations)
const GET_TICKER_ACTIVITIES = gql`
  query GetTickerActivities($first: Int!, $tradesFirst: Int!) {
    # Recent token creations
    tokens(
      first: $first
      orderBy: createdAt
      orderDirection: desc
    ) {
      ...TokenCore
      createdAt
    }
    
    # Recent trades across all tokens
    trades(
      first: $tradesFirst
      orderBy: timestamp
      orderDirection: desc
    ) {
      id
      token {
        ...TokenCore
      }
      trader
      isBuy
      coreAmount
      tokenAmount
      price
      timestamp
      transactionHash
    }
  }
  ${TOKEN_CORE_FRAGMENT}
`;

export interface TickerActivity {
  id: string;
  type: 'trade' | 'creation';
  timestamp: string;
  token: {
    id: string;
    name: string;
    symbol: string;
    image?: string | null;
  };
  // For trades
  isBuy?: boolean;
  coreAmount?: string;
  tokenAmount?: string;
  price?: string;
  trader?: string;
  transactionHash?: string;
  // For token creation
  creator?: string;
}

export function useTickerData() {
  const [activities, setActivities] = useState<TickerActivity[]>([]);
  
  const { data, loading, error } = useQuery(GET_TICKER_ACTIVITIES, {
    variables: {
      first: 20, // Recent tokens
      tradesFirst: 100, // Recent trades
    },
    pollInterval: 5000, // Poll every 5 seconds for real-time updates
    errorPolicy: 'ignore', // Don't break on network errors
  });

  // Transform and merge data
  const processedActivities = useMemo(() => {
    if (!data) return [];

    const activities: TickerActivity[] = [];

    // Add token creations
    if (data.tokens) {
      data.tokens.forEach((token: Token) => {
        activities.push({
          id: `creation-${token.id}`,
          type: 'creation',
          timestamp: token.createdAt,
          token: {
            id: token.id,
            name: token.name,
            symbol: token.symbol,
            image: token.image,
          },
          creator: token.creator,
        });
      });
    }

    // Add trades
    if (data.trades) {
      data.trades.forEach((trade: Trade) => {
        activities.push({
          id: `trade-${trade.id}`,
          type: 'trade',
          timestamp: trade.timestamp,
          token: {
            id: trade.token.id,
            name: trade.token.name,
            symbol: trade.token.symbol,
            image: trade.token.image,
          },
          isBuy: trade.isBuy,
          coreAmount: trade.coreAmount,
          tokenAmount: trade.tokenAmount,
          price: trade.price,
          trader: trade.trader,
          transactionHash: trade.transactionHash,
        });
      });
    }

    // Sort by timestamp (most recent first) and take top 50
    return activities
      .sort((a, b) => parseInt(b.timestamp) - parseInt(a.timestamp))
      .slice(0, 50);
  }, [data]);

  useEffect(() => {
    setActivities(processedActivities);
  }, [processedActivities]);

  // Duplicate activities for seamless infinite scroll
  const infiniteActivities = useMemo(() => {
    if (activities.length === 0) return [];
    
    // Create 3 copies for smooth infinite scroll
    return [...activities, ...activities, ...activities];
  }, [activities]);

  return {
    activities: infiniteActivities,
    loading,
    error,
    hasData: activities.length > 0,
  };
}
