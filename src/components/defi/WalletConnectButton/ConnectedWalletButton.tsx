'use client';

import React from 'react';
import { FiCreditCard, FiAlertTriangle, FiRefreshCw } from 'react-icons/fi';
import { Button, Alert } from '@/components';
import { useWallet } from '@/hooks/useWallet';

export interface ConnectedWalletButtonProps {
  className?: string;
}

export const ConnectedWalletButton = React.forwardRef<
  HTMLButtonElement,
  ConnectedWalletButtonProps
>(({ className }, ref) => {
  const { 
    address, 
    isConnected, 
    isCorrectChain, 
    balance, 
    balanceSymbol,
    error, 
    isPending, 
    connectWallet, 
    disconnect,
    switchToCore 
  } = useWallet();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const formatBalance = (bal: string) => {
    const num = parseFloat(bal);
    if (num < 0.001) return '< 0.001';
    return num.toFixed(3);
  };

  // Show error if present
  if (error) {
    return (
      <div className={className}>
        <Alert
          variant="error"
          description={error}
          dismissible
        />
      </div>
    );
  }

  // Connected but wrong chain
  if (isConnected && !isCorrectChain) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <Button
          ref={ref}
          variant="danger"
          size="md"
          onClick={switchToCore}
          icon={FiAlertTriangle}
          iconPosition="left"
        >
          Switch to Core Chain
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => disconnect()}
        >
          Disconnect
        </Button>
      </div>
    );
  }

  // Connected and correct chain
  if (isConnected && address && isCorrectChain) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {/* Balance Display */}
        <div className="hidden sm:flex flex-col items-end text-right">
          <span className="text-sm font-medium text-gray-900">
            {formatBalance(balance)} {balanceSymbol}
          </span>
          <span className="text-xs text-gray-500">Balance</span>
        </div>

        {/* Connected Wallet Info */}
        <div className="flex items-center gap-2 bg-success-50 border border-success-200 rounded-lg px-4 py-2">
          <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse" />
          <span className="font-mono text-sm font-medium text-success-900">
            {formatAddress(address)}
          </span>
        </div>

        {/* Disconnect Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => disconnect()}
          className="text-gray-600 hover:text-gray-900"
        >
          Disconnect
        </Button>
      </div>
    );
  }

  // Not connected
  return (
    <Button
      ref={ref}
      variant="primary"
      size="md"
      onClick={connectWallet}
      loading={isPending}
      icon={isPending ? FiRefreshCw : FiCreditCard}
      iconPosition="left"
      className={className}
    >
      {isPending ? 'Connecting...' : 'Connect'}
    </Button>
  );
});

ConnectedWalletButton.displayName = 'ConnectedWalletButton';
