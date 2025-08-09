'use client';

import React, { useState } from 'react';
import { useTokenData } from '@/hooks/useTokenData';
import { useWallet } from '@/hooks/useWallet';
import { useReadContract } from 'wagmi';
import { ERC20_ABI } from '@/lib/contracts';
import { 
  TokenHeader, 
  TradingInterface,
  TradingHistory, 
  TradingChart,
  Alert, 
  LoadingSpinner,
  Card,
  AddressLink
} from '@/components';

interface TokenDetailsContentProps {
  address: string;
}

interface TabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

function Tabs({ activeTab, onTabChange }: TabsProps) {
  const tabs = [
    { id: 'trades', label: 'Trades', icon: '📊' },
    { id: 'holders', label: 'Holders', icon: '👥' },
    { id: 'info', label: 'Info', icon: 'ℹ️' },
  ];

  return (
    <div className="border-b border-gray-200 dark:border-dark-border-primary">
      <nav className="-mb-px flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
              activeTab === tab.id
                ? 'border-core-orange-500 text-core-orange-600 dark:text-core-orange-500'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-dark-text-secondary dark:hover:text-dark-text-primary'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

function HoldersTab({ holders }: { holders: any[] }) {
  if (holders.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-dark-bg-secondary rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400 dark:text-dark-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <p className="text-gray-600 dark:text-dark-text-secondary">
          No holders yet. Be the first to buy this token!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600 dark:text-dark-text-secondary mb-4">
        Top {holders.length} holders
      </div>
      
      {holders.map((holder, index) => (
        <div key={holder.holder} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-bg-secondary rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-core-orange-500 to-bitcoin-gold-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
              #{index + 1}
            </div>
            <div>
              <AddressLink 
                address={holder.holder}
                label="holder address"
                className="text-sm"
              />
              <div className="text-xs text-gray-500 dark:text-dark-text-tertiary">
                Holder since {new Date(parseInt(holder.firstPurchaseTimestamp) * 1000).toLocaleDateString()}
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="font-mono text-sm font-medium text-gray-900 dark:text-dark-text-primary">
              {(parseFloat(holder.balance) / 1e18).toFixed(2)}
            </div>
            <div className="text-xs text-gray-500 dark:text-dark-text-tertiary">
              {((parseFloat(holder.balance) / 1e27) * 100).toFixed(2)}% of supply
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function TokenInfoTab({ token }: { token: any }) {
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="space-y-6">
      {/* Contract Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-dark-text-primary">
            Contract Details
          </h4>
          
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-dark-text-secondary block mb-1">
                Token Address
              </span>
              <AddressLink 
                address={token.id}
                label="token address"
                className="text-sm"
              />
            </div>
            
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-dark-text-secondary block mb-1">
                Bonding Curve
              </span>
              <AddressLink 
                address={token.bondingCurve}
                label="bonding curve address"
                className="text-sm"
              />
            </div>
            
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-dark-text-secondary block mb-1">
                Total Supply
              </span>
              <span className="text-sm font-mono">
                1,000,000,000 {token.symbol}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-dark-text-primary">
            Token Economics
          </h4>
          
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-dark-text-secondary block mb-1">
                Base Price
              </span>
              <span className="text-sm font-mono">
                0.0001 CORE
              </span>
            </div>
            
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-dark-text-secondary block mb-1">
                Tokens Sold
              </span>
              <span className="text-sm font-mono">
                {(parseFloat(token.tokensSold) / 1e18).toLocaleString()} {token.symbol}
              </span>
            </div>
            
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-dark-text-secondary block mb-1">
                Graduation Threshold
              </span>
              <span className="text-sm font-mono">
                $50,000 USD
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Anti-Rug Protection */}
      <div className="bg-success-50 dark:bg-dark-success-bg border border-success-200 dark:border-dark-success-border rounded-lg p-6">
        <h4 className="text-lg font-semibold text-success-800 dark:text-dark-success mb-4">
          🛡️ Anti-Rug Protection
        </h4>
        <ul className="space-y-2 text-sm text-success-700 dark:text-dark-success">
          <li className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Ownership immediately renounced
          </li>
          <li className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            No minting function available
          </li>
          <li className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            LP tokens will be burned on graduation
          </li>
          <li className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Immutable smart contract
          </li>
        </ul>
      </div>
    </div>
  );
}

export function TokenDetailsContent({ address }: TokenDetailsContentProps) {
  const [activeTab, setActiveTab] = useState('trades');
  const { token, metrics, holders, recentTrades, loading, error } = useTokenData(address);
  const { address: userAddress } = useWallet();

  // Get user token balance
  const { data: userTokenBalance } = useReadContract({
    address: address as `0x${string}`,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: userAddress ? [userAddress] : undefined,
    query: {
      enabled: !!userAddress && !!address,
    },
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" text="Loading token details..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <Alert
          variant="error"
          title="Failed to Load Token"
          description="Unable to fetch token details. Please check the address and try again."
        />
      </div>
    );
  }

  if (!token || !metrics) {
    return (
      <div className="max-w-2xl mx-auto">
        <Alert
          variant="warning"
          title="Token Not Found"
          description="The token address you're looking for doesn't exist or hasn't been indexed yet."
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Token Header */}
      <TokenHeader token={token} />

      {/* Chart and Trading Interface Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TradingChart 
            metrics={metrics}
            tokenAddress={token.id}
            tokenSymbol={token.symbol}
            height={400}
            autoUpdate={true}
          />
        </div>
        <div>
          <TradingInterface
            tokenAddress={token.id}
            bondingCurveAddress={token.bondingCurve}
            tokenSymbol={token.symbol}
            currentPrice={BigInt(metrics.currentPrice)}
            userTokenBalance={userTokenBalance}
            graduated={token.graduated}
            className="sticky top-6"
            progressToGraduation={metrics.progressToGraduation}
          />
        </div>
      </div>

      {/* Tabbed Content */}
      <Card>
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="p-6">
          {activeTab === 'trades' && (
            <TradingHistory trades={recentTrades} className="!p-0 !border-0 !shadow-none" />
          )}
          
          {activeTab === 'holders' && (
            <HoldersTab holders={holders} />
          )}
          
          {activeTab === 'info' && (
            <TokenInfoTab token={token} />
          )}
        </div>
      </Card>
    </div>
  );
}
