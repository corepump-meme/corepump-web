import { Suspense } from 'react';
import { TokenLaunchForm, LoadingSpinner } from '@/components';

export const metadata = {
  title: 'Launch Token | CorePump - Fair Token Launchpad on Core Chain',
  description: 'Launch your own token with built-in anti-rug protection, fair distribution, and automatic DEX graduation on Core Chain.',
};

export default function LaunchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background-secondary to-background-tertiary dark:from-dark-bg-secondary dark:to-dark-bg-tertiary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[400px]">
            <LoadingSpinner size="lg" text="Loading launch form..." />
          </div>
        }>
          <TokenLaunchForm />
        </Suspense>
      </div>
    </div>
  );
}
