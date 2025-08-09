import Link from 'next/link';
import React from 'react';

export const metadata = {
  title: 'Token Rankings | CorePump - Fair Token Launchpad on Core Chain',
  description: 'Discover trending tokens, top performers, and community favorites on CorePump. Track volume, market cap, and trading activity.',
};

export default function RankingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background-secondary to-background-tertiary dark:from-dark-bg-secondary dark:to-dark-bg-tertiary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-text-primary dark:text-dark-text-primary mb-4">
            Token Rankings
          </h1>
          <p className="text-xl text-text-secondary dark:text-dark-text-secondary max-w-3xl mx-auto">
            Discover the hottest tokens on CorePump. Track performance, volume, and community engagement.
          </p>
        </div>

        {/* Coming Soon Content */}
        <div className="bg-surface-default dark:bg-dark-surface rounded-2xl shadow-lg dark:shadow-md-dark p-12 text-center border border-border-primary/20 dark:border-dark-border-primary/20">
          <div className="w-24 h-24 bg-gradient-to-r from-core-orange-500 to-bitcoin-gold-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
            <svg 
              className="w-12 h-12 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" 
              />
            </svg>
          </div>
          
          <h2 className="text-3xl font-bold text-text-primary dark:text-dark-text-primary mb-4">
            Rankings Coming Soon
          </h2>
          
          <p className="text-lg text-text-secondary dark:text-dark-text-secondary mb-8 max-w-2xl mx-auto">
            We&apos;re building an advanced ranking system to help you discover the best performing tokens. 
            Track volume, market cap, price changes, and community metrics all in one place.
          </p>

          {/* Feature Preview */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="p-6 bg-success-50 dark:bg-dark-success-bg rounded-xl border border-success-200/50 dark:border-dark-success-border/50">
              <div className="w-12 h-12 bg-success-500 dark:bg-dark-success rounded-lg flex items-center justify-center mx-auto mb-4 shadow-sm">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary mb-2">Performance Tracking</h3>
              <p className="text-text-secondary dark:text-dark-text-secondary">Real-time price changes, volume, and market cap rankings.</p>
            </div>

            <div className="p-6 bg-core-orange-50 dark:bg-core-orange-500/10 rounded-xl border border-core-orange-200/50 dark:border-core-orange-500/30">
              <div className="w-12 h-12 bg-core-orange-500 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-sm">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary mb-2">Community Metrics</h3>
              <p className="text-text-secondary dark:text-dark-text-secondary">Holder count, trading activity, and social engagement.</p>
            </div>

            <div className="p-6 bg-bitcoin-gold-50 dark:bg-bitcoin-gold-500/10 rounded-xl border border-bitcoin-gold-200/50 dark:border-bitcoin-gold-500/30">
              <div className="w-12 h-12 bg-bitcoin-gold-500 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-sm">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary mb-2">Advanced Filters</h3>
              <p className="text-text-secondary dark:text-dark-text-secondary">Filter by category, launch date, volume, and more.</p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 pt-8 border-t border-border-secondary dark:border-dark-border-secondary">
            <p className="text-text-secondary dark:text-dark-text-secondary mb-6">
              Want to be notified when rankings go live?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/launch"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-core-orange-500 to-bitcoin-gold-500 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                Launch Your Token
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-core-orange-500 text-base font-medium rounded-lg text-core-orange-500 bg-transparent hover:bg-core-orange-500 hover:text-white dark:hover:bg-core-orange-500 dark:hover:text-white transition-all duration-200"
              >
                Explore Platform
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
