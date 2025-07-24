'use client';

import React, { useState } from 'react';
import { FiSearch, FiEye, FiEyeOff, FiPlus, FiSettings } from 'react-icons/fi';
import {
  Button,
  IconButton,
  Input,
  Card,
  Alert,
  LoadingSpinner,
  WalletConnectButton,
  TokenCard
} from '../../components';

export default function DesignSystemPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [walletConnected, setWalletConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  // Mock token data
  const mockToken = {
    id: '0x1234567890abcdef1234567890abcdef12345678',
    name: 'PumpCoin',
    symbol: 'PUMP',
    description: 'The ultimate meme token for the CorePump ecosystem. Fair launch, anti-rug protection, and community-driven.',
    image: '',
    creator: '0xabcdef1234567890abcdef1234567890abcdef12',
    currentPrice: '0.0045',
    totalCoreRaised: '25000',
    tokensSold: '500000000',
    graduated: false,
    createdAt: '1704067200'
  };

  const handleWalletConnect = () => {
    setLoading(true);
    setTimeout(() => {
      setWalletConnected(true);
      setLoading(false);
    }, 2000);
  };

  const handleWalletDisconnect = () => {
    setWalletConnected(false);
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText('0x1234567890abcdef1234567890abcdef12345678');
    alert('Address copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            CorePump Design System
          </h1>
          <p className="text-lg text-gray-600">
            A comprehensive collection of reusable components for the CorePump DeFi platform.
          </p>
        </div>

        {/* Buttons Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Buttons</h2>
          <Card className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Button Variants</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="danger">Danger Button</Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Button Sizes</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button size="xl">Extra Large</Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Button States</h3>
              <div className="flex flex-wrap gap-4">
                <Button icon={FiPlus} iconPosition="left">With Icon</Button>
                <Button loading>Loading</Button>
                <Button disabled>Disabled</Button>
                <Button fullWidth>Full Width</Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Icon Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <IconButton icon={FiSettings} aria-label="Settings" />
                <IconButton icon={FiSearch} variant="primary" aria-label="Search" />
                <IconButton icon={FiPlus} variant="secondary" size="lg" aria-label="Add" />
              </div>
            </div>
          </Card>
        </section>

        {/* Inputs Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Form Inputs</h2>
          <Card className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Token Name"
                placeholder="Enter token name..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                helperText="Choose a unique name for your token"
              />
              
              <Input
                label="Token Symbol"
                placeholder="e.g., PUMP"
                leftIcon={FiSearch}
              />
              
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password..."
                rightIcon={showPassword ? FiEyeOff : FiEye}
                onRightIconClick={() => setShowPassword(!showPassword)}
              />
              
              <Input
                label="Amount (CORE)"
                placeholder="0.0"
                error="Insufficient balance"
                variant="error"
              />
            </div>
          </Card>
        </section>

        {/* Alerts Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Alerts & Notifications</h2>
          <div className="space-y-4">
            <Alert
              variant="success"
              title="Transaction Successful"
              description="Your token has been launched successfully!"
              dismissible
              onDismiss={() => console.log('Success alert dismissed')}
            />
            
            <Alert
              variant="warning"
              title="High Gas Fees"
              description="Network congestion detected. Consider waiting for lower fees."
            />
            
            <Alert
              variant="error"
              title="Transaction Failed"
              description="Insufficient balance to complete this transaction."
            />
            
            <Alert
              variant="info"
              title="Platform Update"
              description="New features have been added to improve your trading experience."
            />
          </div>
        </section>

        {/* Loading States Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Loading States</h2>
          <Card>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Spinner Sizes</h3>
                <div className="flex justify-center items-center gap-4">
                  <LoadingSpinner size="sm" />
                  <LoadingSpinner size="md" />
                  <LoadingSpinner size="lg" />
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">With Text</h3>
                <LoadingSpinner size="md" text="Loading tokens..." />
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Colors</h3>
                <div className="flex justify-center items-center gap-4">
                  <LoadingSpinner color="primary" />
                  <LoadingSpinner color="secondary" />
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Wallet Connection Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Wallet Connection</h2>
          <Card>
            <div className="flex justify-center">
              <WalletConnectButton
                isConnected={walletConnected}
                address={walletConnected ? '0x1234567890abcdef1234567890abcdef12345678' : undefined}
                balance={walletConnected ? '12.5432' : undefined}
                onConnect={handleWalletConnect}
                onDisconnect={handleWalletDisconnect}
                onCopyAddress={handleCopyAddress}
                loading={loading}
              />
            </div>
          </Card>
        </section>

        {/* Token Card Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Token Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TokenCard
              token={mockToken}
              priceChange={12.5}
              onClick={() => console.log('Token clicked')}
            />
            
            <TokenCard
              token={{
                ...mockToken,
                name: 'CoreMeme',
                symbol: 'CMEME',
                graduated: true,
                totalCoreRaised: '75000'
              }}
              priceChange={-5.2}
            />
            
            <TokenCard
              token={{
                ...mockToken,
                name: 'BitcoinPump',
                symbol: 'BTCP',
                description: 'Bitcoin-inspired meme token with fair launch mechanics.',
                totalCoreRaised: '5000'
              }}
            />
          </div>
        </section>

        {/* Cards Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Card Variants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card variant="default">
              <h3 className="font-semibold mb-2">Default Card</h3>
              <p className="text-sm text-gray-600">Standard card with border and shadow.</p>
            </Card>
            
            <Card variant="elevated">
              <h3 className="font-semibold mb-2">Elevated Card</h3>
              <p className="text-sm text-gray-600">Card with enhanced shadow.</p>
            </Card>
            
            <Card variant="outlined">
              <h3 className="font-semibold mb-2">Outlined Card</h3>
              <p className="text-sm text-gray-600">Card with prominent border.</p>
            </Card>
            
            <Card hover>
              <h3 className="font-semibold mb-2">Hover Card</h3>
              <p className="text-sm text-gray-600">Interactive card with hover effects.</p>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-gray-200">
          <p className="text-gray-600">
            CorePump Design System - Built with React 19, Next.js 13+, and Tailwind CSS
          </p>
        </footer>
      </div>
    </div>
  );
}
