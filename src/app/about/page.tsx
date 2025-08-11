import Image from "next/image";
import { FaTelegram } from "react-icons/fa";
import NotifyForm from "@/components/NotifyForm";

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
            Stable Meme Tokens.<br />Finally.
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl leading-relaxed">
            The first platform where meme tokens maintain stable prices through smart algorithms that prevent crashes and protect your investments.
          </p>
          <div className="flex items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Powered by:</span>
            <Image src="/core.png" alt="Core Logo" width={100} height={30} className="inline-block dark:hidden object-contain" />
            <Image src="/core-light.png" alt="Core Logo" width={100} height={30} className="hidden dark:inline-block object-contain" />
          </div>
        </div>

        {/* Problem Section */}
        <div className="flex flex-col gap-8 w-full">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">The Problem</h2>
          
          {/* Story Cards with Arrows */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2 items-stretch justify-center">
              <div className="flex flex-col gap-2 max-w-[160px] p-4 rounded-lg bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className="text-2xl hover:scale-110 transition-transform duration-200">🚀</div>
                <h3 className="font-semibold text-sm">Hype Launch</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300">New coin appears, everyone&apos;s excited</p>
              </div>
              
              <div className="hidden lg:flex justify-center items-center">
                <div className="text-lg text-gray-400">→</div>
              </div>
              
              <div className="flex flex-col gap-2 max-w-[160px] p-4 rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className="text-2xl hover:scale-110 transition-transform duration-200">📈📉</div>
                <h3 className="font-semibold text-sm">Wild Swings</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300">Price goes crazy, stress levels high</p>
              </div>
              
              <div className="hidden lg:flex justify-center items-center">
                <div className="text-lg text-gray-400">→</div>
              </div>
              
              <div className="flex flex-col gap-2 max-w-[160px] p-4 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className="text-2xl hover:scale-110 transition-transform duration-200">💸</div>
                <h3 className="font-semibold text-sm">Big Losses</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300">Most people lose money</p>
              </div>
            </div>
          </div>
          
          <p className="text-lg font-medium text-center">What if meme tokens could be fun AND stable?</p>
        </div>

        {/* Solution Section */}
        <div className="flex flex-col gap-8 w-full">
          <div className="flex flex-col gap-4 items-center">
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">The CorePump Solution</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl text-center">
              Smart algorithms automatically stabilize token prices, protecting your investments while keeping the fun.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="flex flex-col gap-4 p-6 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="text-3xl text-center">📊</div>
              <h4 className="text-lg font-bold text-center text-blue-700 dark:text-blue-300">Stable Growth</h4>
              <p className="text-center text-gray-700 dark:text-gray-300 text-sm">
                Automatic price stabilization means less stress, more predictable returns.
              </p>
            </div>

            <div className="flex flex-col gap-4 p-6 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="text-3xl text-center">🛡️</div>
              <h4 className="text-lg font-bold text-center text-green-700 dark:text-green-300">Crash Protection</h4>
              <p className="text-center text-gray-700 dark:text-gray-300 text-sm">
                Built-in safeguards prevent devastating price crashes and rug pulls.
              </p>
            </div>

            <div className="flex flex-col gap-4 p-6 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="text-3xl text-center">⚖️</div>
              <h4 className="text-lg font-bold text-center text-purple-700 dark:text-purple-300">Fair for Everyone</h4>
              <p className="text-center text-gray-700 dark:text-gray-300 text-sm">
                No whales dumping on you. Everyone gets equal opportunities.
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="flex flex-col gap-8 w-full">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">Why Choose CorePump?</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col gap-4 p-6 rounded-lg border border-black/[.08] dark:border-white/[.145] hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="text-3xl hover:scale-110 transition-transform duration-200">📈</div>
              <h3 className="text-xl font-bold">Better Returns</h3>
              <p className="text-gray-600 dark:text-gray-300">
                50% less price volatility means steadier gains and fewer sleepless nights.
              </p>
            </div>
            <div className="flex flex-col gap-4 p-6 rounded-lg border border-black/[.08] dark:border-white/[.145] hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="text-3xl hover:scale-110 transition-transform duration-200">👥</div>
              <h3 className="text-xl font-bold">Strong Communities</h3>
              <p className="text-gray-600 dark:text-gray-300">
                80% holder retention vs 20% elsewhere. Stability builds lasting communities.
              </p>
            </div>
            <div className="flex flex-col gap-4 p-6 rounded-lg border border-black/[.08] dark:border-white/[.145] hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="text-3xl hover:scale-110 transition-transform duration-200">🔒</div>
              <h3 className="text-xl font-bold">Your Money is Safe</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Multiple protection layers prevent rug pulls and market manipulation.
              </p>
            </div>
            <div className="flex flex-col gap-4 p-6 rounded-lg border border-black/[.08] dark:border-white/[.145] hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="text-3xl hover:scale-110 transition-transform duration-200">⚡</div>
              <h3 className="text-xl font-bold">Fast & Cheap</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Built on Core Chain for lightning-fast transactions with minimal fees.
              </p>
            </div>
          </div>
        </div>

        {/* Earn $PUMP Section */}
        <div className="flex flex-col gap-8 w-full">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">Earn $PUMP Tokens</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="flex flex-col gap-3 p-6 rounded-lg border border-black/[.08] dark:border-white/[.145] hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="text-2xl">🗳️</div>
              <h3 className="text-lg font-bold">Vote on Decisions</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Shape the platform&apos;s future through governance.
              </p>
            </div>
            <div className="flex flex-col gap-3 p-6 rounded-lg border border-black/[.08] dark:border-white/[.145] hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="text-2xl">💰</div>
              <h3 className="text-lg font-bold">Earn Platform Fees</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Get paid quarterly from platform revenues.
              </p>
            </div>
            <div className="flex flex-col gap-3 p-6 rounded-lg border border-black/[.08] dark:border-white/[.145] hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="text-2xl">🎯</div>
              <h3 className="text-lg font-bold">VIP Access</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                First access to hot launches and premium tools.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="flex flex-col gap-6 w-full max-w-md">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Ready to Start?</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Be first in line when stable meme tokens launch on Core Chain.
          </p>
          <NotifyForm />
        </div>

        {/* Community Section */}
        <div className="flex flex-col gap-6 w-full items-center">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">Join Our Community</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl text-center">
            Get the latest updates and connect with other traders who are tired of losing money to volatile meme coins.
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
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 text-center text-sm text-gray-500 dark:text-gray-400">
        © 2025 CorePump.meme - Stable Meme Tokens on Core Chain
      </footer>
    </div>
  );
}
