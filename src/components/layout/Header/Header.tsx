'use client';

import React from 'react';
import Logo from './Logo';
import Navigation from './Navigation';
import MobileMenuButton from './MobileMenuButton';
import { WalletConnectButton } from '../../defi/WalletConnectButton';
import { useWallet } from '../../../hooks/useWallet';

export interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const {
    isConnected,
    address,
    balance,
    isPending,
    connectWallet,
    disconnect,
  } = useWallet();

  const copyAddress = async () => {
    if (address) {
      try {
        await navigator.clipboard.writeText(address);
        // You could add a toast notification here
      } catch (err) {
        console.error('Failed to copy address:', err);
      }
    }
  };

  return (
    <header className={`sticky top-0 z-30 bg-surface border-b border-border-primary backdrop-blur-sm transition-colors duration-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center gap-8">
            <Logo />
            <Navigation />
          </div>

          {/* Right side - Mobile Menu and Wallet */}
          <div className="flex items-center gap-4">
            <MobileMenuButton />
            <WalletConnectButton
              isConnected={isConnected}
              address={address}
              balance={balance}
              loading={isPending}
              onConnect={connectWallet}
              onDisconnect={disconnect}
              onCopyAddress={copyAddress}
              headerMode={true}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
