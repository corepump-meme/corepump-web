'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { formatEther, parseEther } from 'viem';
import { Button, Input, Card } from '@/components';
import { useTradingActions, TradeQuote } from '@/hooks/useTradingActions';
import { useWallet } from '@/hooks/useWallet';
import { formatBigIntToFixed, formatNumber } from '@/lib/bigint-utils';
import { TransactionLink } from '@/components/ui/TransactionLink';

interface TradingInterfaceProps {
  tokenAddress: string;
  bondingCurveAddress: string;
  tokenSymbol: string;
  currentPrice: bigint;
  userTokenBalance?: bigint;
  maxPurchaseAmount?: bigint;
  graduated?: boolean;
  className?: string;
  progressToGraduation: number; // Percentage from 0 to 100
}

interface TradeInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  balance?: string;
  symbol: string;
  disabled?: boolean;
  error?: string;
  onMaxClick?: () => void;
}

function TradeInput({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  balance, 
  symbol, 
  disabled, 
  error,
  onMaxClick 
}: TradeInputProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700 dark:text-dark-text-secondary">
          {label}
        </label>
        {balance && (
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500 dark:text-dark-text-tertiary">
              Balance: {balance} {symbol}
            </span>
            {onMaxClick && (
              <button
                onClick={onMaxClick}
                className="text-xs px-2 py-1 rounded bg-core-orange-100 text-core-orange-600 hover:bg-core-orange-200 dark:bg-dark-surface dark:text-core-orange-400"
                disabled={disabled}
              >
                MAX
              </button>
            )}
          </div>
        )}
      </div>
      
      <div className="relative">
        <Input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={`pr-16 ${error ? 'border-error-500 focus:border-error-500' : ''}`}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500 dark:text-dark-text-secondary">
          {symbol}
        </div>
      </div>
      
      {error && (
        <p className="text-xs text-error-500 dark:text-dark-error">{error}</p>
      )}
    </div>
  );
}

interface QuoteDisplayProps {
  quote: TradeQuote | null;
  isBuy: boolean;
  tokenSymbol: string;
  loading?: boolean;
}

function QuoteDisplay({ quote, isBuy, tokenSymbol, loading }: QuoteDisplayProps) {
  if (loading) {
    return (
      <div className="p-4 bg-gray-50 dark:bg-dark-bg-secondary rounded-lg">
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-dark-border-secondary rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-dark-border-secondary rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!quote || !quote.isValid) {
    return (
      <div className="p-4 bg-gray-50 dark:bg-dark-bg-secondary rounded-lg">
        <p className="text-sm text-gray-500 dark:text-dark-text-tertiary text-center">
          {quote?.error || 'Enter an amount to see quote'}
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-50 dark:bg-dark-bg-secondary rounded-lg space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600 dark:text-dark-text-secondary">
          You {isBuy ? 'receive' : 'get'}:
        </span>
        <span className="text-base font-mono font-medium text-gray-900 dark:text-dark-text-primary">
          {formatBigIntToFixed(quote.outputAmount, 18, 4)} {isBuy ? tokenSymbol : 'CORE'}
        </span>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600 dark:text-dark-text-secondary">
          Platform fee (1%):
        </span>
        <span className="text-sm font-mono text-gray-900 dark:text-dark-text-primary">
          {formatBigIntToFixed(quote.fee, 18, 6)} CORE
        </span>
      </div>
      
      {quote.priceImpact > 0.1 && (
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-dark-text-secondary">
            Price impact:
          </span>
          <span className={`text-sm font-mono ${
            quote.priceImpact > 2 
              ? 'text-error-500 dark:text-dark-error' 
              : quote.priceImpact > 1 
                ? 'text-warning-500 dark:text-dark-warning'
                : 'text-gray-900 dark:text-dark-text-primary'
          }`}>
            {quote.priceImpact.toFixed(2)}%
          </span>
        </div>
      )}
      
      {quote.priceImpact > 2 && (
        <div className="p-2 bg-warning-100 dark:bg-warning-900/20 rounded text-xs text-warning-700 dark:text-warning-300">
          ⚠️ High price impact. Consider reducing your trade size.
        </div>
      )}
    </div>
  );
}

export function TradingInterface({
  tokenAddress,
  bondingCurveAddress,
  tokenSymbol,
  currentPrice,
  userTokenBalance = BigInt(0),
  maxPurchaseAmount,
  graduated = false,
  className,
  progressToGraduation
}: TradingInterfaceProps) {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [inputAmount, setInputAmount] = useState('');
  const [quote, setQuote] = useState<TradeQuote | null>(null);
  const [quoteLoading, setQuoteLoading] = useState(false);
  
  const { balance, isConnected } = useWallet();
  
  const {
    getBuyQuote,
    getSellQuote,
    executeBuy,
    executeSell,
    tradeState,
    resetTradeState,
    needsApproval,
    transactionHash
  } = useTradingActions({
    tokenAddress,
    bondingCurveAddress,
    currentPrice,
    userTokenBalance,
    maxPurchaseAmount
  });

  // Debounced quote fetching
  useEffect(() => {
    if (!inputAmount || inputAmount === '0') {
      setQuote(null);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setQuoteLoading(true);
      try {
        const newQuote = activeTab === 'buy' 
          ? await getBuyQuote(inputAmount)
          : await getSellQuote(inputAmount);
        setQuote(newQuote);
      } catch (error) {
        console.error('Quote error:', error);
      } finally {
        setQuoteLoading(false);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [inputAmount, activeTab, getBuyQuote, getSellQuote]);

  // Reset form when switching tabs
  const handleTabChange = useCallback((tab: 'buy' | 'sell') => {
    setActiveTab(tab);
    setInputAmount('');
    setQuote(null);
    resetTradeState();
  }, [resetTradeState]);

  // Handle max button click
  const handleMaxClick = useCallback(() => {
    if (activeTab === 'buy' && balance) {
      // Leave some CORE for gas fees
      const maxBuy = Math.max(0, parseFloat(balance) - 0.01);
      setInputAmount(maxBuy.toString());
    } else if (activeTab === 'sell' && userTokenBalance > 0) {
      setInputAmount(formatEther(userTokenBalance));
    }
  }, [activeTab, balance, userTokenBalance]);

  // Handle trade execution
  const handleTrade = useCallback(async () => {
    if (!quote?.isValid || !inputAmount) return;
    
    if (activeTab === 'buy') {
      await executeBuy(inputAmount);
    } else {
      await executeSell(inputAmount);
    }
  }, [activeTab, quote, inputAmount, executeBuy, executeSell]);

  // Show graduated message
  if (graduated) {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="text-center space-y-4">
          <div className="text-success-600 dark:text-dark-success text-lg font-medium">
            🎉 Token Graduated!
          </div>
          <p className="text-gray-600 dark:text-dark-text-secondary">
            This token has graduated to DEX trading. You can now trade it on ArcherSwap or other DEXs.
          </p>
          <Button
            variant="primary"
            fullWidth
            onClick={() => window.open('https://archerswap.finance', '_blank')}
          >
            Trade on ArcherSwap
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`p-4 md:p-6 ${className}`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-text-primary">
            Trade {tokenSymbol}
          </h3>
          <p className="text-sm text-gray-600 dark:text-dark-text-secondary mt-1">
            Current price: {formatBigIntToFixed(currentPrice, 18, 6)} CORE
          </p>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-100 dark:bg-dark-bg-secondary rounded-lg p-1">
          <button
            onClick={() => handleTabChange('buy')}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all ${
              activeTab === 'buy'
                ? 'bg-white dark:bg-dark-surface text-success-600 dark:text-dark-success shadow-sm'
                : 'text-gray-600 dark:text-dark-text-secondary hover:text-gray-800 dark:hover:text-dark-text-primary'
            }`}
          >
            Buy
          </button>
          <button
            onClick={() => handleTabChange('sell')}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all ${
              activeTab === 'sell'
                ? 'bg-white dark:bg-dark-surface text-error-600 dark:text-dark-error shadow-sm'
                : 'text-gray-600 dark:text-dark-text-secondary hover:text-gray-800 dark:hover:text-dark-text-primary'
            }`}
          >
            Sell
          </button>
        </div>

        {/* Trade Form */}
        <div className="space-y-4">
          <TradeInput
            label={activeTab === 'buy' ? 'You pay' : 'You sell'}
            value={inputAmount}
            onChange={setInputAmount}
            placeholder="0.0"
            balance={activeTab === 'buy' 
              ? balance 
              : formatBigIntToFixed(userTokenBalance, 18, 4)
            }
            symbol={activeTab === 'buy' ? 'CORE' : tokenSymbol}
            onMaxClick={handleMaxClick}
            error={quote && !quote.isValid ? quote.error : undefined}
          />

          {/* Quote Display */}
          <QuoteDisplay
            quote={quote}
            isBuy={activeTab === 'buy'}
            tokenSymbol={tokenSymbol}
            loading={quoteLoading}
          />

          {/* Trade Button */}
          {!isConnected ? (
            <div className="text-center text-sm text-gray-600 dark:text-dark-text-secondary">
              Connect your wallet to start trading
            </div>
          ) : (
            <div className="space-y-3">
              {activeTab === 'sell' && needsApproval(inputAmount) && quote?.isValid && (
                <div className="p-3 bg-info-100 dark:bg-info-900/20 rounded-lg text-sm text-info-700 dark:text-info-300">
                  You need to approve {tokenSymbol} spending first
                </div>
              )}
              
              <Button
                variant={activeTab === 'buy' ? 'primary' : 'danger'}
                size="lg"
                fullWidth
                loading={tradeState.isLoading || tradeState.isPending}
                disabled={!quote?.isValid || !inputAmount}
                onClick={handleTrade}
              >
                {tradeState.isLoading
                  ? 'Preparing...'
                  : tradeState.isPending
                  ? 'Confirming...'
                  : activeTab === 'buy'
                  ? `Buy ${tokenSymbol}`
                  : `Sell ${tokenSymbol}`
                }
              </Button>
            </div>
          )}

          {/* Transaction Status */}
          {tradeState.error && (
            <div className="p-3 bg-error-100 dark:bg-error-900/20 rounded-lg text-sm text-error-700 dark:text-error-300">
              {tradeState.error}
            </div>
          )}

          {tradeState.isSuccess && transactionHash && (
            <div className="p-3 bg-success-100 dark:bg-success-900/20 rounded-lg text-sm text-success-700 dark:text-success-300">
              Transaction successful!{' '}
              <TransactionLink txHash={transactionHash} className="underline">
                View on explorer
              </TransactionLink>
            </div>
          )}

          {tradeState.isPending && transactionHash && (
            <div className="p-3 bg-info-100 dark:bg-info-900/20 rounded-lg text-sm text-info-700 dark:text-info-300">
              Transaction pending...{' '}
              <TransactionLink txHash={transactionHash} className="underline">
                View on explorer
              </TransactionLink>
            </div>
          )}
        </div>


        {/* Graduation Progress */}
        <div className="p-4 bg-gray-50 dark:bg-dark-bg-secondary rounded-lg border border-gray-200 dark:border-dark-border-primary mb-6">
          <ProgressBar progress={progressToGraduation} />
          
          <div className="mt-3 text-center">
            <p className="text-sm text-gray-600 dark:text-dark-text-secondary">
              {progressToGraduation >= 100 ? (
                <span className="text-success-600 dark:text-dark-success font-medium">
                  🎉 Token has graduated to DEX trading!
                </span>
              ) : (
                <>
                  <span className="font-medium">
                    ${(50000 * (progressToGraduation / 100)).toFixed(0)}
                  </span>
                  {' '}raised of{' '}
                  <span className="font-medium">$50,000</span>
                  {' '}needed for graduation
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

function ProgressBar({ progress, className }: { progress: number; className?: string }) {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex justify-between text-sm">
        <span className="font-medium text-gray-600 dark:text-dark-text-secondary">
          Progress to Graduation
        </span>
        <span className="font-mono text-gray-900 dark:text-dark-text-primary">
          {clampedProgress.toFixed(1)}%
        </span>
      </div>
      
      <div className="w-full bg-gray-200 dark:bg-dark-border-secondary rounded-full h-3">
        <div
          className={`h-3 rounded-full transition-all duration-500 ${
            clampedProgress >= 100 
              ? 'bg-gradient-to-r from-success-500 to-success-600' 
              : 'bg-gradient-to-r from-core-orange-500 to-bitcoin-gold-500'
          }`}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
      
      <div className="flex justify-between text-xs text-gray-500 dark:text-dark-text-tertiary">
        <span>$0</span>
        <span>$50K</span>
      </div>
    </div>
  );
}