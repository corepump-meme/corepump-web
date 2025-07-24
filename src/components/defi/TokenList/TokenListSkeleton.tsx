'use client';

import React from 'react';

interface TokenListSkeletonProps {
  count?: number;
}

export function TokenListSkeleton({ count = 6 }: TokenListSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 animate-pulse">
          {/* Token Header Skeleton */}
          <div className="flex items-center gap-4 mb-4">
            {/* Token Icon Skeleton */}
            <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0" />
            
            {/* Token Info Skeleton */}
            <div className="flex-1 min-w-0">
              <div className="h-5 bg-gray-200 rounded mb-2 w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>

            {/* Status Badge Skeleton */}
            <div className="h-6 bg-gray-200 rounded-full w-16" />
          </div>

          {/* Token Metrics Skeleton */}
          <div className="space-y-3">
            {/* Price Row */}
            <div className="flex justify-between items-center">
              <div className="h-4 bg-gray-200 rounded w-12" />
              <div className="text-right">
                <div className="h-4 bg-gray-200 rounded w-20 mb-1" />
                <div className="h-3 bg-gray-200 rounded w-12" />
              </div>
            </div>

            {/* Market Cap Row */}
            <div className="flex justify-between items-center">
              <div className="h-4 bg-gray-200 rounded w-20" />
              <div className="h-4 bg-gray-200 rounded w-16" />
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-24" />
                <div className="h-4 bg-gray-200 rounded w-12" />
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2" />
            </div>

            {/* Created Time Row */}
            <div className="flex justify-between items-center">
              <div className="h-3 bg-gray-200 rounded w-16" />
              <div className="h-3 bg-gray-200 rounded w-20" />
            </div>
          </div>

          {/* Description Skeleton */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="h-4 bg-gray-200 rounded mb-2" />
            <div className="h-4 bg-gray-200 rounded w-4/5" />
          </div>
        </div>
      ))}
    </div>
  );
}
