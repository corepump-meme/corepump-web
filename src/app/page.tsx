export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 gap-4 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Hero Section */}
      <main className="flex flex-col gap-[48px] items-center text-center max-w-5xl mx-auto">
        {/* Main Headline */}
        <div className="flex flex-col gap-4 items-center">
          <h1 className="text-xl sm:text-2xl font-bold tracking-relaxed bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            CorePump.meme
          </h1>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
            Stop Getting Rugged.<br />Start Pumping.
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl leading-relaxed">
            The first fair launchpad on Core Chain where liquidity is burned, whales are locked, and communities can actually win.
          </p>
        </div>

        {/* Problem Section */}
        <div className="flex flex-col gap-8 w-full">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Tired of the Same Old Story?</h2>
          
          {/* Story Cards with Arrows */}
          <div className="flex flex-col gap-4">
            {/* Desktop: Side by side with arrows, Mobile: Stacked */}
            <div className="flex flex-wrap gap-2 items-stretch justify-center">
              <div className="flex flex-col gap-2 max-w-[200px] p-4 rounded-lg bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className="text-2xl hover:scale-110 transition-transform duration-200">🚀</div>
                <h3 className="font-semibold">Launch</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">A new coin appears. Hype goes crazy.</p>
              </div>
              
              {/* Arrow - hidden on mobile */}
              <div className="hidden lg:flex justify-center items-center">
                <div className="text-lg text-gray-400">→</div>
              </div>
              
              <div className="flex flex-col gap-2 max-w-[200px] p-4 rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className="text-2xl hover:scale-110 transition-transform duration-200">📈</div>
                <h3 className="font-semibold">Pump</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">You buy in, dreaming of financial freedom.</p>
              </div>
              
              {/* Arrow - hidden on mobile */}
              <div className="hidden lg:flex justify-center items-center">
                <div className="text-lg text-gray-400">→</div>
              </div>
              <div className="flex flex-col gap-2 max-w-[200px] p-4 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className="text-2xl hover:scale-110 transition-transform duration-200">📉</div>
                <h3 className="font-semibold">Dump</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">The creator pulls the liquidity or a whale cashes out.</p>
              </div>
              
              {/* Arrow - hidden on mobile */}
              <div className="hidden lg:flex justify-center items-center">
                <div className="text-lg text-gray-400">→</div>
              </div>
              
              <div className="flex flex-col gap-2 max-w-[200px] p-4 rounded-lg bg-gradient-to-r from-red-50 to-gray-50 dark:from-red-900/20 dark:to-gray-900/20 border border-red-200 dark:border-red-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className="text-2xl hover:scale-110 transition-transform duration-200">💸</div>
                <h3 className="font-semibold">Rekt</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">You&apos;re left with a worthless token and a lesson learned.</p>
              </div>
            </div>
          </div>
          
          <p className="text-lg font-medium text-center">The game has been rigged. Until now.</p>
        </div>

        {/* Features Section */}
        <div className="flex flex-col gap-8 w-full">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">The CorePump™ Guarantee</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg mx-auto">
            We built the rules of fair play directly into the code. Every single token launched on CorePump.meme comes with:
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="flex flex-col gap-4 p-6 rounded-lg border border-black/[.08] dark:border-white/[.145] hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="text-3xl hover:scale-110 transition-transform duration-200">🔒</div>
              <h3 className="text-xl font-bold">Permanent Anti-Rug Liquidity</h3>
              <p className="text-gray-600 dark:text-gray-300">
                When a coin graduates to a DEX, its liquidity is automatically locked and burned forever. It&apos;s programmatically impossible for creators to pull it. Period.
              </p>
            </div>
            <div className="flex flex-col gap-4 p-6 rounded-lg border border-black/[.08] dark:border-white/[.145] hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="text-3xl hover:scale-110 transition-transform duration-200">💎</div>
              <h3 className="text-xl font-bold">Diamond Hand Vesting</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Creators and early whales can&apos;t dump on you. Their tokens are locked and only release when the project hits key success milestones. We reward building, not bailing.
              </p>
            </div>
            <div className="flex flex-col gap-4 p-6 rounded-lg border border-black/[.08] dark:border-white/[.145] hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="text-3xl hover:scale-110 transition-transform duration-200">🚀</div>
              <h3 className="text-xl font-bold">True Community Launches</h3>
              <p className="text-gray-600 dark:text-gray-300">
                No presales, no insider allocations. Everyone buys from the same bonding curve, from the very first dollar. This is the home of the next true 100x gem on Core.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="flex flex-col gap-6 w-full max-w-md">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Be First in Line.</h2>
          <p className="text-gray-600 dark:text-gray-300">
            The future of meme coins on Core is about to launch. Don&apos;t miss out on the first wave of fair, safe, and explosive projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email address..."
              className="flex-1 px-4 py-3 rounded-full border border-black/[.08] dark:border-white/[.145] bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="rounded-full border border-solid border-transparent transition-all duration-300 flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 hover:shadow-lg hover:shadow-orange-500/25 hover:scale-105 font-medium text-sm sm:text-base h-12 px-6 whitespace-nowrap">
              NOTIFY ME
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            We respect your privacy. No spam, just launch alerts and early access info.
          </p>
        </div>

        {/* Community Section */}
        <div className="flex flex-col gap-6 w-full items-center">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">Join the Movement</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl text-center">
            The hype is building. The code is being audited. The revolution needs you.
          </p>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl text-center">
            Follow our socials and join our community channels. This is where the alpha will be dropped first. Be there before the rest of the world catches on.
          </p>
          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <a
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-all duration-300 flex items-center justify-center hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-md hover:-translate-y-0.5 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto"
              href="https://t.me/@corepump_meme"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="hover:scale-110 transition-transform duration-200">📱</span> Join our Telegram
            </a>
            <a
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-all duration-300 flex items-center justify-center hover:bg-sky-50 dark:hover:bg-sky-900/20 hover:border-sky-200 dark:hover:border-sky-800 hover:shadow-md hover:-translate-y-0.5 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="hover:scale-110 transition-transform duration-200">🐦</span> Follow us on X
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 text-center text-sm text-gray-500 dark:text-gray-400">
        © 2025 CorePump.meme - Launching Soon on Core Chain
      </footer>
    </div>
  );
}
