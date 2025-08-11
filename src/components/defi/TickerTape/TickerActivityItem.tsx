'use client';

import React from 'react';
import Link from 'next/link';
import { TickerActivity } from './hooks/useTickerData';
import { formatBigIntToFixed } from '@/lib/bigint-utils';
import Image from 'next/image';

interface TickerActivityItemProps {
  activity: TickerActivity;
  index: number;
}

export function TickerActivityItem({ activity, index }: TickerActivityItemProps) {
  const { type, token, isBuy, coreAmount } = activity;

  // Determine colors and styles based on activity type
  const getActivityStyles = () => {
    if (type === 'creation') {
      return {
        bgColor: 'bg-gradient-to-r from-core-orange-500/20 to-bitcoin-gold-500/20',
        borderColor: 'border-core-orange-500/50',
        glowColor: 'shadow-[0_0_20px_rgba(255,107,53,0.4)]',
        textColor: 'text-core-orange-400',
        iconColor: 'text-bitcoin-gold-400',
        badge: '🚀 NEW',
        badgeColor: 'bg-core-orange-500 text-white',
      };
    } else if (isBuy) {
      return {
        bgColor: 'bg-gradient-to-r from-success-500/20 to-success-600/20',
        borderColor: 'border-success-500/50',
        glowColor: 'shadow-[0_0_15px_rgba(0,255,136,0.3)]',
        textColor: 'text-success-400',
        iconColor: 'text-success-400',
        badge: '📈 BUY',
        badgeColor: 'bg-success-500 text-white',
      };
    } else {
      return {
        bgColor: 'bg-gradient-to-r from-error-500/20 to-error-600/20',
        borderColor: 'border-error-500/50',
        glowColor: 'shadow-[0_0_15px_rgba(255,59,48,0.3)]',
        textColor: 'text-error-400',
        iconColor: 'text-error-400',
        badge: '📉 SELL',
        badgeColor: 'bg-error-500 text-white',
      };
    }
  };

  const styles = getActivityStyles();

  // Format amount for display
  const formatAmount = (amount?: string) => {
    if (!amount) return '';
    try {
      const formatted = formatBigIntToFixed(BigInt(amount), 18, 2);
      return parseFloat(formatted) > 999 
        ? `${(parseFloat(formatted) / 1000).toFixed(1)}K` 
        : formatted;
    } catch {
      return '0';
    }
  };

  // Calculate activity importance for animation intensity
  const getActivityImportance = () => {
    if (type === 'creation') return 'high';
    if (coreAmount) {
      const amount = parseFloat(formatBigIntToFixed(BigInt(coreAmount), 18, 4));
      if (amount > 100) return 'high';
      if (amount > 10) return 'medium';
    }
    return 'low';
  };

  const importance = getActivityImportance();
  
  // Animation classes based on importance
  const getAnimationClasses = () => {
    const base = 'transition-all duration-300 hover:scale-105';
    switch (importance) {
      case 'high':
        return `${base} animate-pulse-glow`;
      case 'medium':
        return `${base} hover:animate-pulse`;
      default:
        return base;
    }
  };

  return (
    <Link href={`/token/${token.id}`} className="flex-shrink-0">
      <div
        className={`
          relative flex items-center gap-2 px-3 py-1 rounded-lg border backdrop-blur-sm
          ${styles.bgColor} ${styles.borderColor} ${styles.glowColor}
          ${getAnimationClasses()}
          hover:border-opacity-75 cursor-pointer
          min-w-[200px] max-w-[250px] h-8
          group
        `}
        style={{
          animationDelay: `${index * 0.05}s`,
        }}
      >
        {/* Sparkle effect for new tokens */}
        {type === 'creation' && (
          <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-bitcoin-gold-400 rounded-full animate-ping" />
        )}

        {/* Token Image */}
        <div className="flex-shrink-0 relative">
          {token.image ? (
            <Image
              src={token.image}
              alt={token.name}
              width={20}
              height={20}
              className="w-5 h-5 rounded-full object-cover ring-1 ring-white/20"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-core-orange-400 to-core-orange-600 flex items-center justify-center text-white text-[8px] font-bold">
              {token.symbol.slice(0, 2)}
            </div>
          )}
          
          {/* Activity type indicator */}
          <div className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full ${styles.badgeColor} flex items-center justify-center text-[6px]`}>
            {type === 'creation' ? '✨' : isBuy ? '↗' : '↘'}
          </div>
        </div>

        {/* Activity Content */}
        <div className="flex-1 min-w-0 flex items-center gap-2">
          {/* Activity Badge */}
          <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${styles.badgeColor}`}>
            {type === 'creation' ? 'NEW' : isBuy ? 'BUY' : 'SELL'}
          </span>
          
          {/* Token Symbol */}
          <span className={`font-bold text-xs ${styles.textColor} truncate`}>
            ${token.symbol}
          </span>

          {/* Amount */}
          {coreAmount && (
            <span className="text-[10px] text-gray-300 ml-auto">
              <span className={styles.textColor}>{formatAmount(coreAmount)}</span>
              <span className="text-gray-400 ml-0.5">CORE</span>
            </span>
          )}
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className={`w-full h-full rounded-lg ${styles.glowColor}`} />
        </div>
      </div>
    </Link>
  );
}
