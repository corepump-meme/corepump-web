import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { LoadingSpinner } from '@/components';
import { TokenDetailsContent } from './TokenDetailsContent';

interface TokenPageProps {
  params: Promise<{
    address: string;
  }>;
}

export async function generateMetadata({ params }: TokenPageProps) {
  const { address } = await params;
  return {
    title: `Token ${address} | CorePump`,
    description: `View details for token ${address} on CorePump`,
  };
}

function validateAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

export default async function TokenPage({ params }: TokenPageProps) {
  const { address } = await params;
  
  // Validate address format
  if (!validateAddress(address)) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-bg-primary dark:to-dark-bg-secondary py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[400px]">
            <LoadingSpinner size="lg" text="Loading token details..." />
          </div>
        }>
          <TokenDetailsContent address={address} />
        </Suspense>
      </div>
    </div>
  );
}
