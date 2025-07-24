'use client';

import React from 'react';
import { FiCreditCard, FiCheck, FiCopy } from 'react-icons/fi';
import { Button } from '../../ui/Button';
import { IconButton } from '../../ui/IconButton';

export interface WalletConnectButtonProps {
  isConnected?: boolean;
  address?: string;
  balance?: string;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onCopyAddress?: () => void;
  loading?: boolean;
  className?: string;
}

const WalletConnectButton: React.FC<WalletConnectButtonProps> = ({
  isConnected = false,
  address,
  balance,
  onConnect,
  onDisconnect,
  onCopyAddress,
  loading = false,
  className = ''
}) => {
  const formatAddress = (addr: string) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const formatBalance = (bal: string) => {
    if (!bal) return '';
    const num = parseFloat(bal);
    if (num < 0.001) return '< 0.001';
    return num.toFixed(3);
  };

  if (isConnected && address) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {/* Balance Display */}
        {balance && (
          <div className="hidden sm:flex flex-col items-end text-right">
            <span className="text-sm font-medium text-gray-900">
              {formatBalance(balance)} CORE
            </span>
            <span className="text-xs text-gray-500">Balance</span>
          </div>
        )}

        {/* Connected Wallet Info */}
        <div className="flex items-center gap-2 bg-success-50 border border-success-200 rounded-lg px-4 py-2">
          <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse-glow" />
          <span className="text-mono text-sm font-medium text-success-900">
            {formatAddress(address)}
          </span>
          
          {/* Copy Address Button */}
          {onCopyAddress && (
            <IconButton
              icon={FiCopy}
              size="sm"
              variant="ghost"
              onClick={onCopyAddress}
              aria-label="Copy wallet address"
              className="text-success-700 hover:text-success-900 hover:bg-success-100"
            />
          )}
        </div>

        {/* Disconnect Button */}
        {onDisconnect && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onDisconnect}
            className="text-gray-600 hover:text-gray-900"
          >
            Disconnect
          </Button>
        )}
      </div>
    );
  }

  return (
    <Button
      variant="primary"
      icon={FiCreditCard}
      iconPosition="left"
      onClick={onConnect}
      loading={loading}
      className={className}
      disabled={!onConnect}
    >
      {loading ? 'Connecting...' : 'Connect Wallet'}
    </Button>
  );
};

export default WalletConnectButton;
