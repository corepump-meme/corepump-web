'use client';

import React, { useState, useEffect, useRef } from 'react';
import { TickerActivityItem } from './TickerActivityItem';
import { useTickerData } from './hooks/useTickerData';

interface TickerTapeProps {
  className?: string;
}

export function TickerTape({ className = '' }: TickerTapeProps) {
  const { activities, loading, hasData } = useTickerData();
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const tickerRef = useRef<HTMLDivElement>(null);

  // Handle visibility changes to pause animation when tab is hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Don't render if no data
  if (!hasData && !loading) {
    return null;
  }

  // Calculate scroll speed based on number of activities (lower = faster)
  const getScrollSpeed = () => {
    if (activities.length === 0) return 30;
    // Faster scroll for more activities, but cap at reasonable speeds
    return Math.min(Math.max(15, activities.length * 1), 60);
  };

  const scrollSpeed = getScrollSpeed();

  return (
    <div
      className={`
        relative w-full z-20
        h-10 overflow-hidden
        bg-white/95 dark:bg-black/95 backdrop-blur-md
        border-b border-gray-200 dark:border-white/10
        ${className}
      `}
    >
      {/* Gradient overlays for edge fade effect */}
      <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-white/95 dark:from-black/95 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-white/95 dark:from-black/95 to-transparent z-10 pointer-events-none" />
      
      {/* Loading state */}
      {loading && activities.length === 0 && (
        <div className="flex items-center justify-center h-full">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <div className="w-3 h-3 border border-core-orange-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-medium">Loading...</span>
          </div>
        </div>
      )}

      {/* Ticker content */}
      {activities.length > 0 && (
        <div
          ref={tickerRef}
          className={`flex items-center h-full ticker-container ${isPaused ? 'ticker-paused' : ''}`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{
            animation: !isVisible 
              ? 'none' 
              : `ticker-scroll ${scrollSpeed}s linear infinite`,
          }}
        >
          <div className="flex items-center gap-4 px-4">
            {activities.map((activity, index) => (
              <TickerActivityItem
                key={`${activity.id}-${index}`}
                activity={activity}
                index={index}
              />
            ))}
          </div>
        </div>
      )}

      {/* Casino-style sparkle effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-gray-800 dark:bg-white rounded-full opacity-40"
            style={{
              left: `${25 + i * 25}%`,
              top: `${30 + (i % 2) * 40}%`,
              animation: `sparkle ${1.5 + i * 0.2}s infinite ${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes ticker-scroll {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(-100%);
          }
        }

        @keyframes sparkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        /* Pause animation on hover */
        .ticker-paused {
          animation-play-state: paused !important;
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          .ticker-item {
            min-width: 240px;
            max-width: 280px;
          }
        }

        /* Ensure smooth hardware acceleration */
        @media (prefers-reduced-motion: no-preference) {
          [style*="ticker-scroll"] {
            will-change: transform;
            backface-visibility: hidden;
            perspective: 1000px;
          }
        }

        /* Respect reduced motion preferences */
        @media (prefers-reduced-motion: reduce) {
          [style*="ticker-scroll"] {
            animation: none !important;
          }
          
          .animate-ping,
          .animate-pulse,
          .animate-spin {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
