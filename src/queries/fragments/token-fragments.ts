import { gql } from '@apollo/client';

export const TOKEN_CORE_FRAGMENT = gql`
  fragment TokenCore on Token {
    id
    name
    symbol
    description
    image
    creator
    createdAt
  }
`;

export const TOKEN_PRICE_FRAGMENT = gql`
  fragment TokenPrice on Token {
    currentPrice
    totalCoreRaised
    tokensSold
    graduated
    graduationTimestamp
  }
`;

export const TOKEN_FULL_FRAGMENT = gql`
  fragment TokenFull on Token {
    ...TokenCore
    ...TokenPrice
    website
    telegram
    twitter
    bondingCurve
    totalSupply
    basePrice
    updatedAt
  }
  ${TOKEN_CORE_FRAGMENT}
  ${TOKEN_PRICE_FRAGMENT}
`;
