import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: process.env.NODE_ENV === 'production' 
    ? process.env.NEXT_PUBLIC_SUBGRAPH_URL_MAINNET
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
            merge(existing: any[] = [], incoming: any[], { args }: { args?: any }) {
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
        fields: {
          trades: {
            merge(existing: any[] = [], incoming: any[]) {
              return [...existing, ...incoming];
            },
          },
          holders: {
            merge(existing: any[] = [], incoming: any[]) {
              return [...existing, ...incoming];
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
});
