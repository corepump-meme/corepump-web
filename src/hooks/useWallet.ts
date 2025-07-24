'use client';

import { useAccount, useConnect, useDisconnect, useBalance, useSwitchChain } from 'wagmi';
import { useState, useEffect } from 'react';
import { coreChain, coreTestnet } from '@/lib/wagmi';

export function useWallet() {
  const [error, setError] = useState<string | null>(null);
  
  const { address, isConnected, chainId } = useAccount();
  const { connect, connectors, isPending } = useConnect({
    mutation: {
      onError: (error) => {
        setError(error.message);
      },
      onSuccess: () => {
        setError(null);
      },
    },
  });
  
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  
  const { data: balance } = useBalance({
    address,
    query: {
      enabled: !!address,
    },
  });

  // Check if on correct chain (Core Chain mainnet or testnet)
  const isCorrectChain = chainId === coreChain.id || chainId === coreTestnet.id;
  const isMainnet = chainId === coreChain.id;

  const connectWallet = async () => {
    try {
      setError(null);
      const connector = connectors.find(c => c.name === 'MetaMask') || connectors[0];
      if (connector) {
        connect({ connector });
      } else {
        setError('No wallet connector found');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const switchToCore = async () => {
    try {
      setError(null);
      await switchChain({ chainId: coreChain.id });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const switchToTestnet = async () => {
    try {
      setError(null);
      await switchChain({ chainId: coreTestnet.id });
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return {
    address: address as `0x${string}` | undefined,
    isConnected,
    isCorrectChain,
    isMainnet,
    chainId,
    balance: balance?.formatted || '0',
    balanceSymbol: balance?.symbol || 'CORE',
    error,
    isPending,
    connectWallet,
    disconnect,
    switchToCore,
    switchToTestnet,
  };
}
