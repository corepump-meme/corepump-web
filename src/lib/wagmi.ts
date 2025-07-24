import { createConfig, http } from 'wagmi';
import { metaMask, walletConnect, injected } from 'wagmi/connectors';
import { defineChain } from 'viem';

// Core Chain configuration
export const coreChain = defineChain({
  id: 1116,
  name: 'Core Blockchain',
  nativeCurrency: {
    decimals: 18,
    name: 'Core',
    symbol: 'CORE',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.coredao.org'],
    },
  },
  blockExplorers: {
    default: {
      name: 'CoreScan',
      url: 'https://scan.coredao.org',
    },
  },
});

// Core Chain Testnet configuration
export const coreTestnet = defineChain({
  id: 1114,
  name: 'Core Blockchain Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Core',
    symbol: 'tCORE',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.test2.btcs.network'],
    },
  },
  blockExplorers: {
    default: {
      name: 'CoreScan Testnet',
      url: 'https://scan.test2.btcs.network',
    },
  },
});

// Wagmi configuration
export const wagmiConfig = createConfig({
  chains: [coreTestnet, coreChain], // Default to testnet first
  connectors: [
    metaMask(),
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '2f5a2b1c8d3e4f5a6b7c8d9e0f1a2b3c', // Better demo project ID
    }),
    injected(),
  ],
  transports: {
    [coreChain.id]: http(),
    [coreTestnet.id]: http(),
  },
});

// Contract addresses (from hardhat context)
export const CONTRACT_ADDRESSES = {
  COIN_FACTORY: process.env.NEXT_PUBLIC_COIN_FACTORY_ADDRESS || '0x7766a44216a23B8BeE5A264aa4f8C4E6aaC00c68',
  PLATFORM_TREASURY: process.env.NEXT_PUBLIC_PLATFORM_TREASURY_ADDRESS || '0x17Bc6954438a8D5F1B43c9DC5e6B6C1C4D060020',
  EVENT_HUB: process.env.NEXT_PUBLIC_EVENT_HUB_ADDRESS || '0xd27C6810c589974975cC390eC1A1959862E8a85E',
} as const;

// Platform constants
export const PLATFORM_CONSTANTS = {
  CREATION_FEE: '1000000000000000000', // 1 CORE in wei
  PLATFORM_FEE_PERCENTAGE: 100, // 1% = 100 basis points
  MAX_PURCHASE_PERCENTAGE: 400, // 4% = 400 basis points
  GRADUATION_THRESHOLD_USD: 50000, // $50,000 USD
  BASE_PRICE: '100000000000000', // 0.0001 CORE in wei
  TOTAL_SUPPLY: '1000000000000000000000000000', // 1 billion tokens in wei
  BONDING_CURVE_SUPPLY: '800000000000000000000000000', // 800M tokens (80%)
} as const;
