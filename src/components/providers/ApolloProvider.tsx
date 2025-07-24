'use client';

import React from 'react';
import { ApolloProvider as ApolloClientProvider } from '@apollo/client';
import { apolloClient } from '@/lib/apollo-client';

interface ApolloProviderProps {
  children: React.ReactNode;
}

export function ApolloProvider({ children }: ApolloProviderProps) {
  return (
    <ApolloClientProvider client={apolloClient}>
      {children}
    </ApolloClientProvider>
  );
}
