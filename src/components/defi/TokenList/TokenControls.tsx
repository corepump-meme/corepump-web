'use client';

import React, { useState, useEffect } from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';
import { Input } from '@/components/ui/Input';
import { SortOption, SortDirection } from '@/hooks/useTokens';

interface TokenControlsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: SortOption;
  sortDirection: SortDirection;
  onSortChange: (sortBy: SortOption, direction: SortDirection) => void;
  className?: string;
}

const sortOptions = [
  { value: 'createdAt', label: 'Launch Time' },
  { value: 'totalCoreRaised', label: 'Market Cap' },
  { value: 'currentPrice', label: 'Price' },
] as const;

export function TokenControls({
  searchQuery,
  onSearchChange,
  sortBy,
  sortDirection,
  onSortChange,
  className = '',
}: TokenControlsProps) {
  const [localSearch, setLocalSearch] = useState(searchQuery);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(localSearch);
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearch, onSearchChange]);

  const handleSortChange = (newSortBy: SortOption) => {
    if (newSortBy === sortBy) {
      // Toggle direction if same sort option
      onSortChange(sortBy, sortDirection === 'desc' ? 'asc' : 'desc');
    } else {
      // Default to desc for new sort option
      onSortChange(newSortBy, 'desc');
    }
  };

  const getSortLabel = (option: SortOption) => {
    const baseLabel = sortOptions.find(opt => opt.value === option)?.label || option;
    if (option === sortBy) {
      return `${baseLabel} ${sortDirection === 'desc' ? '↓' : '↑'}`;
    }
    return baseLabel;
  };

  return (
    <div className={`bg-white border-b border-gray-200 sticky top-18 z-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex gap-4 items-center justify-between">
          {/* Search Input */}
          <div>
            <Input
              type="text"
              placeholder="Search tokens by name or symbol..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="pl-10"
              leftIcon={FiSearch}
            />
          </div>

          {/* Sort Controls */}
          <div className="flex items-center gap-2">
            <FiFilter className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-600 hidden sm:inline">Sort by:</span>
            
            {/* Desktop: Button Layout */}
            <div className="hidden sm:flex gap-1">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSortChange(option.value)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    sortBy === option.value
                      ? 'bg-core-orange-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {getSortLabel(option.value)}
                </button>
              ))}
            </div>

            {/* Mobile: Dropdown */}
            <div className="sm:hidden">
              <select
                value={`${sortBy}-${sortDirection}`}
                onChange={(e) => {
                  const [newSortBy, newDirection] = e.target.value.split('-') as [SortOption, SortDirection];
                  onSortChange(newSortBy, newDirection);
                }}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-core-orange-500 focus:border-core-orange-500"
              >
                {sortOptions.map((option) => (
                  <React.Fragment key={option.value}>
                    <option value={`${option.value}-desc`}>
                      {option.label} (High to Low)
                    </option>
                    <option value={`${option.value}-asc`}>
                      {option.label} (Low to High)
                    </option>
                  </React.Fragment>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {(searchQuery || sortBy !== 'createdAt') && (
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100">
            {searchQuery && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-core-orange-100 text-core-orange-800">
                Search: "{searchQuery}"
                <button
                  onClick={() => {
                    setLocalSearch('');
                    onSearchChange('');
                  }}
                  className="ml-2 hover:text-core-orange-900"
                >
                  ×
                </button>
              </span>
            )}
            {sortBy !== 'createdAt' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                Sort: {getSortLabel(sortBy)}
                <button
                  onClick={() => onSortChange('createdAt', 'desc')}
                  className="ml-2 hover:text-gray-900"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
