import { gql } from '@apollo/client';
import { TOKEN_CORE_FRAGMENT, TOKEN_PRICE_FRAGMENT, TOKEN_FULL_FRAGMENT } from './fragments/token-fragments';

export const GET_TOKENS_LIST = gql`
  query GetTokensList(
    $first: Int!
    $skip: Int!
    $orderBy: String!
    $orderDirection: String!
  ) {
    tokens(
      first: $first
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      ...TokenCore
      ...TokenPrice
      trades(first: 1, orderBy: timestamp, orderDirection: desc) {
        timestamp
        price
      }
    }
  }
  ${TOKEN_CORE_FRAGMENT}
  ${TOKEN_PRICE_FRAGMENT}
`;

export const GET_TOKENS_SEARCH = gql`
  query GetTokensSearch(
    $first: Int!
    $skip: Int!
    $orderBy: String!
    $orderDirection: String!
    $search: String!
  ) {
    tokens(
      first: $first
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: {
        or: [
          { name_contains_nocase: $search }
          { symbol_contains_nocase: $search }
        ]
      }
    ) {
      ...TokenCore
      ...TokenPrice
      trades(first: 1, orderBy: timestamp, orderDirection: desc) {
        timestamp
        price
      }
    }
  }
  ${TOKEN_CORE_FRAGMENT}
  ${TOKEN_PRICE_FRAGMENT}
`;

export const GET_TOKEN_DETAILS = gql`
  query GetTokenDetails($tokenId: String!) {
    token(id: $tokenId) {
      ...TokenFull
      holders(first: 10, orderBy: balance, orderDirection: desc) {
        holder
        balance
        totalPurchased
        totalSold
        firstPurchaseTimestamp
        lastActivityTimestamp
      }
      trades(first: 20, orderBy: timestamp, orderDirection: desc) {
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
  }
  ${TOKEN_FULL_FRAGMENT}
`;

export const GET_TOKEN_CHART_DATA = gql`
  query GetTokenChartData($tokenId: String!, $interval: String!, $from: String!, $to: String!) {
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
`;

export const GET_RECENT_TRADES = gql`
  query GetRecentTrades($tokenId: String!, $first: Int!, $skip: Int!) {
    trades(
      where: { token: $tokenId }
      first: $first
      skip: $skip
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
`;

export const GET_TOKEN_HOLDERS = gql`
  query GetTokenHolders($tokenId: String!, $first: Int!, $skip: Int!) {
    tokenHolders(
      where: { token: $tokenId, balance_gt: "0" }
      first: $first
      skip: $skip
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
`;

export const GET_TOKEN_METRICS = gql`
  query GetTokenMetrics($tokenId: String!, $from24h: String!) {
    token(id: $tokenId) {
      id
      currentPrice
      totalCoreRaised
      tokensSold
      graduated
    }
    
    # Get trades from last 24h for volume calculation
    trades24h: trades(
      where: { 
        token: $tokenId
        timestamp_gte: $from24h
      }
      orderBy: timestamp
      orderDirection: desc
      first: 1000
    ) {
      coreAmount
      timestamp
      price
    }
    
    # Get price from 24h ago for change calculation
    trades24hAgo: trades(
      where: { 
        token: $tokenId
        timestamp_lte: $from24h
      }
      orderBy: timestamp
      orderDirection: desc
      first: 1
    ) {
      price
      timestamp
    }
  }
`;
