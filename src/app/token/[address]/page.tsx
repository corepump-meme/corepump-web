import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Card, Alert, LoadingSpinner } from '@/components';

interface TokenPageProps {
  params: {
    address: string;
  };
}

export async function generateMetadata({ params }: TokenPageProps) {
  return {
    title: `Token ${params.address} | CorePump`,
    description: `View details for token ${params.address} on CorePump`,
  };
}

function TokenDetails({ address }: { address: string }) {
  // Validate address format
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Success Message */}
      <Alert
        variant="success"
        title="Token Launched Successfully! 🚀"
        description="Your token has been deployed to Core Chain with built-in anti-rug protection."
      />

      {/* Token Info Card */}
      <Card className="p-8">
        <div className="text-center space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Token Created
            </h1>
            <p className="text-gray-600">
              Your token is now live on Core Chain
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Contract Address
            </h3>
            <div className="bg-white rounded-lg p-4 border">
              <code className="text-sm font-mono text-gray-800 break-all">
                {address}
              </code>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gradient-to-br from-core-orange-50 to-bitcoin-gold-50 rounded-lg border border-core-orange-200">
              <div className="text-2xl font-bold text-core-orange-500 mb-1">
                1B
              </div>
              <div className="text-sm text-gray-600">Total Supply</div>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-success-50 to-info-50 rounded-lg border border-success-200">
              <div className="text-2xl font-bold text-success-500 mb-1">
                80%
              </div>
              <div className="text-sm text-gray-600">Available for Trading</div>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-bitcoin-gold-50 to-warning-50 rounded-lg border border-bitcoin-gold-200">
              <div className="text-2xl font-bold text-bitcoin-gold-500 mb-1">
                $50K
              </div>
              <div className="text-sm text-gray-600">Graduation Threshold</div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              What happens next?
            </h3>
            <div className="text-left space-y-3 text-sm text-gray-700">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-core-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                  1
                </div>
                <div>
                  <strong>Trading Begins:</strong> Your token is now available for trading on the bonding curve with a starting price of 0.0001 CORE.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-success-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                  2
                </div>
                <div>
                  <strong>Fair Distribution:</strong> Each wallet can purchase a maximum of 4% of the total supply to ensure fair distribution.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-bitcoin-gold-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                  3
                </div>
                <div>
                  <strong>Automatic Graduation:</strong> When your token reaches $50,000 market cap, it will automatically graduate to DEX trading with liquidity locked forever.
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Share your token with the community and watch it grow! 
              Remember, all tokens on CorePump have built-in anti-rug protection.
            </p>
          </div>
        </div>
      </Card>

      {/* Additional Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Anti-Rug Protection
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>✅ Ownership immediately renounced</li>
            <li>✅ No minting function available</li>
            <li>✅ LP tokens will be burned on graduation</li>
            <li>✅ Immutable smart contract</li>
          </ul>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Fair Launch Mechanics
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>📈 Bonding curve price discovery</li>
            <li>🎯 4% maximum purchase per wallet</li>
            <li>💰 1% platform fee on trades</li>
            <li>🚀 Automatic DEX graduation</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

export default function TokenPage({ params }: TokenPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[400px]">
            <LoadingSpinner size="lg" text="Loading token details..." />
          </div>
        }>
          <TokenDetails address={params.address} />
        </Suspense>
      </div>
    </div>
  );
}
