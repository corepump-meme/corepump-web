'use client';

import React from 'react';
import { FiCreditCard, FiPower, FiCopy } from 'react-icons/fi';
import { Button } from '../../ui/Button';
import { IconButton } from '../../ui/IconButton';
import { useIsHydrated } from '../../../hooks/useIsHydrated';

export interface WalletConnectButtonProps {
  isConnected?: boolean;
  address?: string;
  balance?: string;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onCopyAddress?: () => void;
  loading?: boolean;
  className?: string;
  compact?: boolean;
  hideBalance?: boolean;
  headerMode?: boolean;
}

const WalletConnectButton: React.FC<WalletConnectButtonProps> = ({
  isConnected = false,
  address,
  balance,
  onConnect,
  onDisconnect,
  onCopyAddress,
  loading = false,
  className = '',
  compact = false,
  hideBalance = false,
  headerMode = false
}) => {
  const isHydrated = useIsHydrated();
  
  // Header mode enables multiple compact features
  const isCompact = compact || headerMode;
  const shouldHideBalance = hideBalance || headerMode;
  
  // Only show connected state after hydration to prevent SSR mismatch
  const showConnectedState = isHydrated && isConnected && address;

  const formatAddress = (addr: string, isCompactMode: boolean = false) => {
    if (!addr) return '';
    if (isCompactMode) {
      // Shorter format for compact mode
      return `${addr.slice(0, 4)}...${addr.slice(-2)}`;
    }
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const formatBalance = (bal: string) => {
    if (!bal) return '';
    const num = parseFloat(bal);
    if (num < 0.001) return '< 0.001';
    return num.toFixed(3);
  };

  if (showConnectedState) {
    const gapClass = isCompact ? 'gap-2' : 'gap-3';
    const containerPadding = isCompact ? 'px-2 py-1' : 'px-4 py-2';
    const statusDotSize = isCompact ? 'w-1.5 h-1.5' : 'w-2 h-2';
    const textSize = isCompact ? 'text-xs' : 'text-sm';
    const iconButtonSize = isCompact ? 'sm' : 'sm';

    return (
      <div className={`flex items-center ${gapClass} ${className}`}>
        {/* Balance Display - Hidden in header mode */}
        {balance && !shouldHideBalance && (
          <div className="hidden sm:flex flex-col items-end text-right">
            <span className={`${textSize} font-medium text-gray-900`}>
              {formatBalance(balance)} CORE
            </span>
            <span className="text-xs text-gray-500">Balance</span>
          </div>
        )}

        {/* Connected Wallet Info */}
        <div className={`flex items-center gap-1.5 bg-success-50 border border-success-200 rounded-lg ${containerPadding}`}>
          <div className={`${statusDotSize} bg-success-500 rounded-full animate-pulse-glow`} />
          <span className={`text-mono ${textSize} font-medium text-success-900`}>
            {formatAddress(address, isCompact)}
          </span>
          
          {/* Copy Address Button */}
          {onCopyAddress && (
            <IconButton
              icon={FiCopy}
              size={iconButtonSize}
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
            className={`text-gray-600 hover:text-gray-900 ${isCompact ? 'hidden sm:inline-flex' : ''}`}
          >
            {isCompact ? (
              <>
                <span className="hidden lg:inline">Disconnect</span>
                <FiPower className="lg:hidden inline h-4 w-4" />

              </>
            ) : (
              'Disconnect'
            )}
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
      {loading ? 'Connecting...' : 'Connect'}
    </Button>
  );
};

export default WalletConnectButton;
