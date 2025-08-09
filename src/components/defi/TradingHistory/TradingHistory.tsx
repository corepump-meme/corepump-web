'use client';

import React, { useState } from 'react';
import { Trade } from '@/types/graphql';
import { Card, AddressLink, TransactionLink } from '@/components';
import { formatBigIntToFixed, getTimeAgo } from '@/lib/bigint-utils';

interface TradingHistoryProps {
  trades: Trade[];
  className?: string;
}

interface TradeRowProps {
  trade: Trade;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      aria-label="Copy address"
    >
      {copied ? (
        <svg className="w-3 h-3 text-success-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-3 h-3 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )}
    </button>
  );
}

function TradeRow({ trade }: TradeRowProps) {
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatAmount = (amount: string, decimals: number = 18) => {
    return formatBigIntToFixed(BigInt(amount), decimals, 4);
  };

  const openTransaction = () => {
    // Open transaction in Core Chain explorer
    window.open(`https://scan.coredao.org/tx/${trade.transactionHash}`, '_blank');
  };

  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-dark-surface-hover transition-colors duration-200 group">
      {/* Trade Type */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            trade.isBuy 
              ? 'bg-success-500 dark:bg-dark-success' 
              : 'bg-error-500 dark:bg-dark-error'
          }`} />
          <span className={`text-sm font-medium ${
            trade.isBuy 
              ? 'text-success-600 dark:text-dark-success' 
              : 'text-error-600 dark:text-dark-error'
          }`}>
            {trade.isBuy ? 'Buy' : 'Sell'}
          </span>
        </div>
      </td>

      {/* Trader */}
      <td className="px-4 py-3">
        <AddressLink 
          address={trade.trader}
          label="trader address"
        />
      </td>

      {/* CORE Amount */}
      <td className="px-4 py-3">
        <span className="text-sm font-mono text-gray-900 dark:text-dark-text-primary">
          {formatAmount(trade.coreAmount)} CORE
        </span>
      </td>

      {/* Token Amount */}
      <td className="px-4 py-3">
        <span className="text-sm font-mono text-gray-900 dark:text-dark-text-primary">
          {formatAmount(trade.tokenAmount)}
        </span>
      </td>

      {/* Price */}
      <td className="px-4 py-3">
        <span className="text-sm font-mono text-gray-900 dark:text-dark-text-primary">
          {formatAmount(trade.price)} CORE
        </span>
      </td>

      {/* Time */}
      <td className="px-4 py-3">
        <span className="text-sm text-gray-600 dark:text-dark-text-secondary">
          {getTimeAgo(trade.timestamp)}
        </span>
      </td>

      {/* Transaction */}
      <td className="px-4 py-3">
        <TransactionLink txHash={trade.transactionHash} />
      </td>
    </tr>
  );
}

export function TradingHistory({ trades, className }: TradingHistoryProps) {
  const [showAll, setShowAll] = useState(false);
  const displayTrades = showAll ? trades : trades.slice(0, 10);

  if (trades.length === 0) {
    return (
      <Card className={`p-6 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-text-primary mb-4">
          Trading History
        </h3>
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-dark-bg-secondary rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400 dark:text-dark-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <p className="text-gray-600 dark:text-dark-text-secondary">
            No trades yet. Be the first to trade this token!
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`${className}`}>
      <div className="p-6 border-b border-gray-200 dark:border-dark-border-primary">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-text-primary">
            Trading History
          </h3>
          <span className="text-sm text-gray-600 dark:text-dark-text-secondary">
            {trades.length} trade{trades.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-dark-bg-secondary">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-text-tertiary uppercase tracking-wider">
                Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-text-tertiary uppercase tracking-wider">
                Trader
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-text-tertiary uppercase tracking-wider">
                CORE Amount
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-text-tertiary uppercase tracking-wider">
                Token Amount
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-text-tertiary uppercase tracking-wider">
                Price
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-text-tertiary uppercase tracking-wider">
                Time
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-text-tertiary uppercase tracking-wider">
                Tx
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-dark-surface divide-y divide-gray-200 dark:divide-dark-border-primary">
            {displayTrades.map((trade, index) => (
              <TradeRow key={trade.id + trade.trader + trade.timestamp + index} trade={trade} />
            ))}
          </tbody>
        </table>
      </div>

      {trades.length > 10 && (
        <div className="p-4 border-t border-gray-200 dark:border-dark-border-primary text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm text-core-orange-600 hover:text-core-orange-700 dark:text-core-orange-500 dark:hover:text-core-orange-400 font-medium transition-colors duration-200"
          >
            {showAll ? 'Show Less' : `Show All ${trades.length} Trades`}
          </button>
        </div>
      )}
    </Card>
  );
}
