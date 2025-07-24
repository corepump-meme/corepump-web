import Image from "next/image";
import { FaTelegram } from "react-icons/fa";
import NotifyForm from "@/app/components/NotifyForm";

export default function CorePump() {
  return (
    <div className="min-h-screen p-8 pb-20 gap-4 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Hero Section */}
      <main className="flex flex-col gap-[48px] items-center text-center max-w-5xl mx-auto">
        {/* Main Headline */}
        <div className="flex flex-col gap-4 items-center">
          <span className="inline-block rounded-full bg-gradient-to-r from-yellow-400 to-red-500 text-white px-4 py-1 text-xs font-semibold tracking-wide uppercase -mb-3">
            Coming Soon
          </span>
          <h1 className="text-xl sm:text-2xl font-bold tracking-relaxed bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            CorePump.meme
          </h1>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
            Stop Getting Rugged.<br />Start Pumping.
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl leading-relaxed">
            The evolution of the fair launch is here. A launchpad on Core Chain with an on-chain defense system against dumps, monopolies, and rugs.
          </p>
          <div className="flex items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Powered by:</span>
            <Image src="/core.png" alt="Core Logo" width={100} height={30} className="inline-block dark:hidden object-contain" />
            <Image src="/core-light.png" alt="Core Logo" width={100} height={30} className="hidden dark:inline-block object-contain" />
          </div>
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

        {/* Architecture Section */}
        <div className="flex flex-col gap-8 w-full">
          <div className="flex flex-col gap-4 items-center">
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">The CorePump Architecture</h2>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-200">A 4-Layer Defense</h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl text-center">
              We built a fortress, not a doorway. Every project launched on CorePump is protected by four layers of on-chain security, enforced by code.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Layer 1 */}
            <div className="flex flex-col gap-4 p-6 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="text-3xl hover:scale-110 transition-transform duration-200">🛡️</div>
                <div>
                  <h4 className="text-lg font-bold text-blue-700 dark:text-blue-300">Layer 1: The Unruggable LP</h4>
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">(The Foundation)</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                At the moment of graduation, liquidity is locked in the DEX and the LP tokens are burned forever. This isn&apos;t a promise; it&apos;s an immutable on-chain event. The rug is physically impossible to pull.
              </p>
            </div>

            {/* Layer 2 */}
            <div className="flex flex-col gap-4 p-6 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="text-3xl hover:scale-110 transition-transform duration-200">⚡</div>
                <div>
                  <h4 className="text-lg font-bold text-purple-700 dark:text-purple-300">Layer 2: Automated Whale Vesting</h4>
                  <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">(The Anti-Dump Shield)</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                At launch, any wallet holding over 1% of the supply is automatically placed into the same Milestone-Based Vesting contract as the founder. The biggest holders are locked in for the long haul. No exceptions.
              </p>
            </div>

            {/* Layer 3 */}
            <div className="flex flex-col gap-4 p-6 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="text-3xl hover:scale-110 transition-transform duration-200">🎯</div>
                <div>
                  <h4 className="text-lg font-bold text-green-700 dark:text-green-300">Layer 3: The Fair Sale Cooldown</h4>
                  <p className="text-sm text-green-600 dark:text-green-400 font-medium">(The Anti-Crash Mechanism)</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Whales can&apos;t crash the market. Our smart contract enforces a daily sale allowance (0.5% of total supply) on the largest wallets. This prevents catastrophic dumps while allowing for healthy, gradual profit-taking that the market can absorb.
              </p>
            </div>

            {/* Layer 4 */}
            <div className="flex flex-col gap-4 p-6 rounded-lg bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="text-3xl hover:scale-110 transition-transform duration-200">🔒</div>
                <div>
                  <h4 className="text-lg font-bold text-orange-700 dark:text-orange-300">Layer 4: The Anti-Monopoly Cap</h4>
                  <p className="text-sm text-orange-600 dark:text-orange-400 font-medium">(The Decentralization Guarantee)</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                From the very first block. No single wallet can purchase more than 4% of the supply during the bonding curve launch. This guarantees a wider, healthier distribution of holders from day one.
              </p>
            </div>
          </div>
        </div>

        {/* Simplified Features Section */}
        <div className="flex flex-col gap-8 w-full">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">Why CorePump?</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="flex flex-col gap-4 p-6 rounded-lg border border-black/[.08] dark:border-white/[.145] hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="text-3xl hover:scale-110 transition-transform duration-200">🔐</div>
              <h3 className="text-xl font-bold">Unruggable by Design</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Built-in protections that make exit scams impossible. Your investment is safe from day one.
              </p>
            </div>
            <div className="flex flex-col gap-4 p-6 rounded-lg border border-black/[.08] dark:border-white/[.145] hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="text-3xl hover:scale-110 transition-transform duration-200">⚖️</div>
              <h3 className="text-xl font-bold">Truly Fair Launches</h3>
              <p className="text-gray-600 dark:text-gray-300">
                No presales, no insider allocations. Everyone starts from the same bonding curve.
              </p>
            </div>
            <div className="flex flex-col gap-4 p-6 rounded-lg border border-black/[.08] dark:border-white/[.145] hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="text-3xl hover:scale-110 transition-transform duration-200">🚀</div>
              <h3 className="text-xl font-bold">Built for Core Chain</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Optimized for Core&apos;s fast, cheap transactions. The perfect home for the next 100x gem.
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
          <NotifyForm />
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
              className="group rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-all duration-300 flex items-center justify-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-md hover:-translate-y-0.5 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto"
              href="https://t.me/@corepump_meme"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTelegram className="group-hover:scale-110 transition-transform duration-200" /> Join our Telegram
            </a>
            {/* <a
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-all duration-300 flex items-center justify-center hover:bg-sky-50 dark:hover:bg-sky-900/20 hover:border-sky-200 dark:hover:border-sky-800 hover:shadow-md hover:-translate-y-0.5 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="hover:scale-110 transition-transform duration-200">🐦</span> Follow us on X
            </a> */}
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
