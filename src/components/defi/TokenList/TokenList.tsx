'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { TokenListItem } from './TokenListItem';
import { TokenListSkeleton } from './TokenListSkeleton';
import { TokenControls } from './TokenControls';
import { useTokens, SortOption, SortDirection } from '@/hooks/useTokens';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';

interface TokenListProps {
  className?: string;
}

export function TokenList({ className = '' }: TokenListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('createdAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const { tokens, loading, error, hasMore, loadMore, refetch } = useTokens({
    searchQuery,
    sortBy,
    sortDirection,
  });

  const handleSortChange = (newSortBy: SortOption, newDirection: SortDirection) => {
    setSortBy(newSortBy);
    setSortDirection(newDirection);
  };

  if (error) {
    return (
      <div className={className}>
        <Alert
          variant="error"
          title="Failed to load tokens"
          description={error}
        />
        <div className="mt-4 text-center">
          <Button onClick={refetch} variant="secondary">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Search and Sort Controls */}
      <TokenControls
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortChange={handleSortChange}
      />

      {/* Token Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading && tokens.length === 0 ? (
          <TokenListSkeleton />
        ) : tokens.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-surface-hover dark:bg-dark-surface-hover rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-text-tertiary dark:text-dark-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-text-primary dark:text-dark-text-primary mb-2">No tokens found</h3>
            <p className="text-text-secondary dark:text-dark-text-secondary mb-6">
              {searchQuery 
                ? `No tokens match "${searchQuery}". Try a different search term.`
                : 'No tokens have been launched yet. Be the first to create one!'
              }
            </p>
            {searchQuery ? (
              <Button onClick={() => setSearchQuery('')} variant="secondary">
                Clear Search
              </Button>
            ) : (
              <Link
                href="/launch"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-core-orange-500 to-bitcoin-gold-500 rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                Launch Your Token
              </Link>
            )}
          </div>
        ) : (
          <>
            {/* Token Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tokens.map((token) => (
                <TokenListItem key={token.id} token={token} />
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="mt-12 text-center">
                <Button
                  onClick={loadMore}
                  loading={loading}
                  variant="secondary"
                  size="lg"
                >
                  {loading ? 'Loading...' : 'Load More Tokens'}
                </Button>
              </div>
            )}

            {/* Results Summary */}
            <div className="mt-8 text-center text-sm text-text-tertiary dark:text-dark-text-tertiary">
              {searchQuery ? (
                <p>
                  Showing {tokens.length} result{tokens.length !== 1 ? 's' : ''} for "{searchQuery}"
                </p>
              ) : (
                <p>
                  Showing {tokens.length} token{tokens.length !== 1 ? 's' : ''}
                  {hasMore && ' • Load more to see additional tokens'}
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
