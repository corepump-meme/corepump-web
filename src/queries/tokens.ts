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
      }
    }
  }
  ${TOKEN_FULL_FRAGMENT}
`;

export const GET_RECENT_TRADES = gql`
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
`;
