import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { Trade, TokenHolder } from '@/types/graphql';

const httpLink = createHttpLink({
  uri: process.env.NODE_ENV === 'production' 
    ? process.env.NEXT_PUBLIC_SUBGRAPH_URL_TESTNET // NEXT_PUBLIC_SUBGRAPH_URL_MAINNET
    : process.env.NEXT_PUBLIC_SUBGRAPH_URL_TESTNET,
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          tokens: {
            keyArgs: ['orderBy', 'orderDirection', 'where'],
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
      Token: {
        keyFields: ['id'],
        fields: {
          trades: {
            keyArgs: false,
            merge(existing = [], incoming = []) {
              // Use Map to deduplicate by trade ID
              const tradeMap = new Map();
              
              // Add existing trades
              existing.forEach((trade: Trade) => {
                if (trade?.id) {
                  tradeMap.set(trade.id, trade);
                }
              });
              
              // Add incoming trades (overwrite existing ones)
              incoming.forEach((trade: Trade) => {
                if (trade?.id) {
                  tradeMap.set(trade.id, trade);
                }
              });
              
              // Convert back to array sorted by timestamp (most recent first)
              return Array.from(tradeMap.values()).sort((a: Trade, b: Trade) => {
                return parseInt(b.timestamp) - parseInt(a.timestamp);
              });
            },
          },
          holders: {
            keyArgs: false,
            merge(existing = [], incoming = []) {
              // Use Map to deduplicate by holder address
              const holderMap = new Map();
              
              // Add existing holders
              existing.forEach((holder: TokenHolder) => {
                if (holder?.holder) {
                  holderMap.set(holder.holder, holder);
                }
              });
              
              // Add incoming holders (overwrite existing ones)
              incoming.forEach((holder: TokenHolder) => {
                if (holder?.holder) {
                  holderMap.set(holder.holder, holder);
                }
              });
              
              // Convert back to array sorted by balance (largest first)
              return Array.from(holderMap.values()).sort((a: TokenHolder, b: TokenHolder) => {
                return parseFloat(b.balance) - parseFloat(a.balance);
              });
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: false, // Prevent loading flicker
    },
    query: {
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: false,
    },
  },
});
