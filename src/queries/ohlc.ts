import { gql } from '@apollo/client';

export const GET_TOKEN_OHLC_DATA = gql`
  query GetTokenOHLCData($tokenId: String!, $interval: String!, $from: String!, $to: String!) {
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
      id
      timestamp
      open
      high
      low
      close
      volume
      trades
    }
  }
`;

export const GET_TOKEN_RECENT_TRADES_FOR_CHART = gql`
  query GetTokenRecentTradesForChart($tokenId: String!, $first: Int!, $from: String!) {
    trades(
      where: { 
        token: $tokenId
        timestamp_gte: $from
      }
      first: $first
      orderBy: timestamp
      orderDirection: asc
    ) {
      id
      timestamp
      price
      coreAmount
      tokenAmount
      isBuy
    }
  }
`;

// Fallback query to get recent trades when OHLC data is not available
export const GET_TOKEN_ALL_TRADES_FOR_CHART = gql`
  query GetTokenAllTradesForChart($tokenId: String!, $first: Int!) {
    trades(
      where: { token: $tokenId }
      first: $first
      orderBy: timestamp
      orderDirection: asc
    ) {
      id
      timestamp
      price
      coreAmount
      tokenAmount
      isBuy
    }
  }
`;

// Query to get the latest price for real-time updates
export const GET_TOKEN_LATEST_PRICE = gql`
  query GetTokenLatestPrice($tokenId: String!) {
    token(id: $tokenId) {
      currentPrice
      updatedAt
    }
    trades(
      where: { token: $tokenId }
      first: 1
      orderBy: timestamp
      orderDirection: desc
    ) {
      price
      timestamp
      isBuy
    }
  }
`;
