import Image from 'next/image';
import { TokenList } from '@/components';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-bg-primary dark:to-dark-bg-secondary transition-colors duration-200">
      {/* Hero Section */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-dark-text-primary mb-6 transition-colors duration-200">
            The First Meme Fair Launchpad on{' '}
            <Image src="/core.png" alt="Core Logo" width={271} height={70} className="inline-block dark:hidden object-contain" />
            <Image src="/core-light.png" alt="Core Logo" width={271} height={70} className="hidden dark:inline-block object-contain" />
          </h1>
          <p className="text-xl text-gray-600 dark:text-dark-text-secondary max-w-3xl mx-auto mb-8 transition-colors duration-200">
            The first fair launchpad on Core Chain where liquidity is burned, whales are locked, 
            and communities can actually win. Stop getting rugged. Start pumping.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/launch"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-core-orange-500 to-bitcoin-gold-500 rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              Launch Your Token
            </a>
            <a
              href="/rankings"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-core-orange-500 bg-transparent border-2 border-core-orange-500 rounded-lg hover:bg-core-orange-500 hover:text-white transition-all duration-200"
            >
              View Rankings
            </a>
          </div>
        </div>
      </div>

      {/* Token List Section */}
      <TokenList />
    </div>
  );
}
