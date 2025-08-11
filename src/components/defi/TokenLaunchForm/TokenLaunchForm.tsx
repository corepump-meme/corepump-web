'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiGlobe, FiMessageCircle, FiTwitter, FiZap, FiShield, FiTrendingUp, FiExternalLink } from 'react-icons/fi';
import { Button, Input, Card, Alert } from '@/components';
import { ImageUpload } from '@/components/defi/ImageUpload';
import { ConnectedWalletButton } from '@/components/defi/WalletConnectButton';
import { useTokenLaunch, type TokenLaunchData } from '@/hooks/useTokenLaunch';

function SubmitButton({ 
  canLaunch, 
  isPending, 
  isConfirming, 
  isSuccess 
}: { 
  canLaunch: boolean;
  isPending: boolean;
  isConfirming: boolean;
  isSuccess: boolean;
}) {
  const getButtonText = () => {
    if (isSuccess) return 'Token Launched Successfully!';
    if (isConfirming) return 'Confirming Transaction...';
    if (isPending) return 'Launching Token...';
    return 'Launch Token (1 CORE)';
  };

  const getButtonIcon = () => {
    if (isSuccess) return FiExternalLink;
    return FiZap;
  };
  
  return (
    <Button
      type="submit"
      variant="primary"
      size="lg"
      fullWidth
      loading={isPending || isConfirming}
      disabled={isPending || isConfirming || !canLaunch || isSuccess}
      icon={getButtonIcon()}
      iconPosition="left"
      className={`text-lg font-semibold ${isSuccess ? 'bg-green-500 hover:bg-green-600' : ''}`}
    >
      {getButtonText()}
    </Button>
  );
}

export function TokenLaunchForm() {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [activeFeature, setActiveFeature] = useState(0);

  // Features data with exact existing color schemes
  const features = [
    {
      icon: FiShield,
      title: "Anti-Rug Protection",
      description: "Ownership renounced, LP tokens burned automatically",
      bgGradient: "bg-gradient-to-br from-core-orange-50 to-bitcoin-gold-50 dark:from-core-orange-500/10 dark:to-bitcoin-gold-500/10",
      borderColor: "border-core-orange-200 dark:border-core-orange-500/30",
      iconBg: "bg-core-orange-500"
    },
    {
      icon: FiTrendingUp,
      title: "Fair Launch",
      description: "4% max purchase limit, bonding curve pricing",
      bgGradient: "bg-gradient-to-br from-success-50 to-info-50 dark:from-success-500/10 dark:to-info-500/10",
      borderColor: "border-success-200 dark:border-dark-success-border",
      iconBg: "bg-success-500 dark:bg-dark-success"
    },
    {
      icon: FiZap,
      title: "Auto Graduation",
      description: "Graduates to DEX at $50K market cap",
      bgGradient: "bg-gradient-to-br from-bitcoin-gold-50 to-warning-50 dark:from-bitcoin-gold-500/10 dark:to-warning-500/10",
      borderColor: "border-bitcoin-gold-200 dark:border-bitcoin-gold-500/30",
      iconBg: "bg-bitcoin-gold-500"
    }
  ];
  
  const router = useRouter();
  const {
    launchToken,
    canLaunch,
    txHash,
    tokenAddress,
    isPending,
    isConfirming,
    isSuccess,
    error,
    balance,
    isConnected,
    isCorrectChain,
  } = useTokenLaunch();

  // Redirect to token page when token is successfully created
  useEffect(() => {
    if (isSuccess && tokenAddress) {
      // Small delay to show success state before redirecting
      const timer = setTimeout(() => {
        router.push(`/token/${tokenAddress}`);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isSuccess, tokenAddress, router]);

  // Auto-advance carousel every 4 seconds on mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [features.length]);

  const validateForm = (data: TokenLaunchData): Record<string, string> => {
    const errors: Record<string, string> = {};
    
    if (!data.name.trim()) {
      errors.name = 'Token name is required';
    } else if (data.name.length < 3 || data.name.length > 50) {
      errors.name = 'Token name must be between 3 and 50 characters';
    }
    
    if (!data.symbol.trim()) {
      errors.symbol = 'Token symbol is required';
    } else if (data.symbol.length < 2 || data.symbol.length > 10) {
      errors.symbol = 'Token symbol must be between 2 and 10 characters';
    }
    
    if (data.description && data.description.length > 500) {
      errors.description = 'Description must be less than 500 characters';
    }
    
    // Validate URLs if provided
    const urlFields = ['website', 'telegram', 'twitter'] as const;
    urlFields.forEach(field => {
      if (data[field] && data[field].trim()) {
        try {
          new URL(data[field]);
        } catch {
          errors[field] = `Invalid ${field} URL`;
        }
      }
    });
    
    return errors;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const form = event.currentTarget;
    const formDataObj = new FormData(form);
    
    const tokenData: TokenLaunchData = {
      name: formDataObj.get('name') as string,
      symbol: (formDataObj.get('symbol') as string).toUpperCase(),
      description: formDataObj.get('description') as string || '',
      image: imageUrl,
      website: formDataObj.get('website') as string || '',
      telegram: formDataObj.get('telegram') as string || '',
      twitter: formDataObj.get('twitter') as string || '',
    };
    
    // Validate form
    const errors = validateForm(tokenData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setFormErrors({});
    
    try {
      await launchToken(tokenData);
    } catch (error) {
      console.error('Token launch failed:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-text-primary dark:text-dark-text-primary tracking-tight">
          Launch Your Token
        </h1>
        <p className="text-xl text-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
          Create a fair launch token with built-in anti-rug protection on Core Chain
        </p>
      </div>

      {/* Features Section - Mobile Carousel & Desktop Grid */}
      <div className="mb-8">
        {/* Mobile Carousel */}
        <div className="block md:hidden">
          <div className="relative">
            {/* Active Feature Card */}
            <div className={`text-center p-4 rounded-xl border transition-all duration-500 ${features[activeFeature].bgGradient} ${features[activeFeature].borderColor}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm ${features[activeFeature].iconBg}`}>
                {React.createElement(features[activeFeature].icon, { className: "w-4 h-4 text-white" })}
              </div>
              <h3 className="font-semibold text-text-primary dark:text-dark-text-primary mb-1 text-sm">
                {features[activeFeature].title}
              </h3>
              <p className="text-xs text-text-secondary dark:text-dark-text-secondary leading-relaxed">
                {features[activeFeature].description}
              </p>
            </div>
            
            {/* Navigation Dots */}
            <div className="flex justify-center mt-3 gap-2">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveFeature(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeFeature
                      ? 'bg-core-orange-500 dark:bg-core-orange-400'
                      : 'bg-border-secondary dark:bg-dark-border-secondary'
                  }`}
                  aria-label={`Go to feature ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`text-center p-6 rounded-xl border ${feature.bgGradient} ${feature.borderColor}`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm ${feature.iconBg}`}>
                {React.createElement(feature.icon, { className: "w-6 h-6 text-white" })}
              </div>
              <h3 className="font-semibold text-text-primary dark:text-dark-text-primary mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Form */}
      <Card className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Hidden field for image URL */}
          <input type="hidden" name="imageUrl" value={imageUrl} />

          {/* Image Upload */}
          <ImageUpload 
            onImageUploaded={setImageUrl}
            currentImage={imageUrl}
          />

          {/* Basic Token Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-text-primary dark:text-dark-text-primary border-b border-border-secondary dark:border-dark-border-secondary pb-2">
              Token Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                name="name"
                label="Token Name"
                placeholder="Enter token name..."
                required
                maxLength={50}
                helperText="3-50 characters, letters, numbers, and spaces only"
              />

              <Input
                name="symbol"
                label="Token Symbol"
                placeholder="e.g., PUMP"
                required
                maxLength={10}
                style={{ textTransform: 'uppercase' }}
                helperText="2-10 characters, uppercase letters and numbers only"
              />
            </div>

            <div>
              <label className="text-label text-text-secondary dark:text-dark-text-secondary block mb-2">
                Description (Optional)
              </label>
              <textarea
                name="description"
                className="input-base py-[1rem] px-[0.75rem] resize-none"
                rows={4}
                maxLength={500}
                placeholder="Describe your token and its purpose..."
              />
              <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary mt-1">Maximum 500 characters</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-text-primary dark:text-dark-text-primary border-b border-border-secondary dark:border-dark-border-secondary pb-2">
              Social Links (Optional)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input
                name="website"
                label="Website"
                placeholder="https://yoursite.com"
                type="url"
                leftIcon={FiGlobe}
              />
              <Input
                name="telegram"
                label="Telegram"
                placeholder="https://t.me/yourgroup"
                type="url"
                leftIcon={FiMessageCircle}
              />
              <Input
                name="twitter"
                label="Twitter"
                placeholder="https://twitter.com/yourhandle"
                type="url"
                leftIcon={FiTwitter}
              />
            </div>
          </div>

          {/* Token Economics */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-text-primary dark:text-dark-text-primary border-b border-border-secondary dark:border-dark-border-secondary pb-2">
              Token Economics
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-surface-hover dark:bg-dark-surface-hover rounded-lg p-4 border border-border-secondary/50 dark:border-dark-border-secondary/50">
                <h4 className="font-medium text-text-primary dark:text-dark-text-primary mb-2">Total Supply</h4>
                <p className="text-2xl font-mono font-bold text-text-primary dark:text-dark-text-primary">1,000,000,000</p>
                <p className="text-sm text-text-secondary dark:text-dark-text-secondary">Fixed supply, no inflation</p>
              </div>

              <div className="bg-surface-hover dark:bg-dark-surface-hover rounded-lg p-4 border border-border-secondary/50 dark:border-dark-border-secondary/50">
                <h4 className="font-medium text-text-primary dark:text-dark-text-primary mb-2">Initial Distribution</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary dark:text-dark-text-secondary">Bonding Curve:</span>
                    <span className="font-medium text-text-primary dark:text-dark-text-primary">80%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary dark:text-dark-text-secondary">Reserved:</span>
                    <span className="font-medium text-text-primary dark:text-dark-text-primary">20%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Launch Fee */}
          <div className="bg-gradient-to-r from-core-orange-50 to-bitcoin-gold-50 dark:from-core-orange-500/10 dark:to-bitcoin-gold-500/10 border-2 border-core-orange-200 dark:border-core-orange-500/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">Launch Fee</h4>
                <p className="text-sm text-text-secondary dark:text-dark-text-secondary">One-time fee to deploy your token</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-mono font-bold text-core-orange-500">1 CORE</div>
                <div className="text-sm text-text-secondary dark:text-dark-text-secondary">Non-refundable</div>
              </div>
            </div>
            
            <div className="bg-white/50 dark:bg-dark-surface/50 rounded-lg p-4 border border-white/20 dark:border-dark-border-secondary/20">
              <h5 className="font-medium text-text-primary dark:text-dark-text-primary mb-2">What you get:</h5>
              <ul className="text-sm text-text-secondary dark:text-dark-text-secondary space-y-1">
                <li>• Immutable smart contract deployment</li>
                <li>• Built-in anti-rug protection</li>
                <li>• Bonding curve price discovery</li>
                <li>• Automatic DEX graduation</li>
                <li>• Platform listing and promotion</li>
              </ul>
            </div>
          </div>

          {/* Terms Acceptance */}
          <div className="flex items-start gap-3 p-4 bg-surface-hover dark:bg-dark-surface-hover rounded-lg border border-border-secondary/50 dark:border-dark-border-secondary/50">
            <input
              type="checkbox"
              name="acceptTerms"
              required
              className="mt-1 w-5 h-5 text-core-orange-500 border-border-primary dark:border-dark-border-primary rounded focus:ring-core-orange-500 focus:ring-2 bg-background-primary dark:bg-dark-surface"
            />
            <label className="text-sm text-text-primary dark:text-dark-text-primary leading-relaxed">
              I understand and agree that:
              <ul className="mt-2 space-y-1 text-xs text-text-secondary dark:text-dark-text-secondary">
                <li>• The launch fee of 1 CORE is non-refundable</li>
                <li>• Token ownership will be immediately renounced upon creation</li>
                <li>• The token contract will be immutable and cannot be modified</li>
                <li>• I am responsible for providing accurate token information</li>
                <li>• I comply with all applicable laws and regulations</li>
              </ul>
            </label>
          </div>

          {/* Wallet Connection */}
          {!isConnected || !canLaunch ? (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-surface-hover dark:bg-dark-surface-hover rounded-lg border border-border-secondary/50 dark:border-dark-border-secondary/50">
                <div>
                  <h4 className="font-medium text-text-primary dark:text-dark-text-primary mb-1">Connect Your Wallet</h4>
                  <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                    {!isConnected 
                      ? "Connect your wallet to launch tokens on Core Chain"
                      : !isCorrectChain
                      ? "Please switch to Core Chain to continue"
                      : parseFloat(balance) < 1
                      ? `Insufficient balance. You need at least 1 CORE (current: ${parseFloat(balance).toFixed(3)} CORE)`
                      : `Ready to launch! Balance: ${parseFloat(balance).toFixed(3)} CORE`
                    }
                  </p>
                </div>
                <ConnectedWalletButton className="shrink-0" />
              </div>

              {!canLaunch && (
                <Alert
                  variant={!isConnected ? "info" : !isCorrectChain ? "warning" : "error"}
                  description={
                    !isConnected 
                      ? "Please connect your wallet to continue with token launch."
                      : !isCorrectChain
                      ? "Please switch to Core Chain network to launch tokens."
                      : "Insufficient CORE balance. You need at least 1 CORE to launch a token."
                  }
                />
              )}
            </div>
          ) : (
            <>
              {/* Form Errors */}
              {Object.keys(formErrors).length > 0 && (
                <div className="space-y-2">
                  {Object.entries(formErrors).map(([field, error]) => (
                    <Alert
                      key={field}
                      variant="warning"
                      description={`${field}: ${error}`}
                    />
                  ))}
                </div>
              )}

              {/* Transaction Status */}
              {txHash && (
                <div className="bg-info-50 dark:bg-dark-info-bg border border-info-200 dark:border-dark-info-border rounded-lg p-4">
                  <h4 className="font-medium text-info-900 dark:text-dark-info mb-2">Transaction Submitted</h4>
                  <div className="space-y-2 text-sm text-info-800 dark:text-dark-info">
                    <p>Transaction hash: {txHash}</p>
                    {isConfirming && <p>Waiting for confirmation...</p>}
                    {isSuccess && tokenAddress && (
                      <p>Token created at address: {tokenAddress}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <Alert
                  variant="error"
                  title="Launch Failed"
                  description={error.message || 'An error occurred while launching the token'}
                />
              )}
              <SubmitButton 
                canLaunch={canLaunch}
                isPending={isPending}
                isConfirming={isConfirming}
                isSuccess={isSuccess}
              />
            </>
          )}
        </form>
      </Card>

      {/* Disclaimer */}
      <div className="text-center text-xs text-text-tertiary dark:text-dark-text-tertiary max-w-2xl mx-auto">
        <p>
          By launching a token on CorePump, you acknowledge that you understand the risks involved 
          in cryptocurrency trading and token creation. CorePump is not responsible for the success 
          or failure of any token launched on the platform.
        </p>
      </div>
    </div>
  );
}
