'use client';

import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useState, useEffect } from 'react';
import { parseEther, keccak256, toHex, type Log } from 'viem';
import { CONTRACT_ADDRESSES } from '@/lib/wagmi';
import { COIN_FACTORY_ABI } from '@/lib/contracts';
import { useWallet } from './useWallet';

export interface TokenLaunchData {
  name: string;
  symbol: string;
  description: string;
  image: string;
  website: string;
  telegram: string;
  twitter: string;
}

export function useTokenLaunch() {
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined);
  const [tokenAddress, setTokenAddress] = useState<string | null>(null);
  const [bondingCurveAddress, setBondingCurveAddress] = useState<string | null>(null);
  
  const { isConnected, isCorrectChain, balance } = useWallet();
  
  const { writeContract, isPending: isWritePending, error: writeError, data: writeData } = useWriteContract();

  // Set transaction hash when write is successful
  useEffect(() => {
    if (writeData) {
      setTxHash(writeData);
    }
  }, [writeData]);

  const { isLoading: isConfirming, isSuccess, error: receiptError, data: receipt } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  // Parse transaction receipt when it becomes available
  useEffect(() => {
    if (receipt && isSuccess) {
      try {
        // Parse the CoinCreated event from the transaction receipt
        // CoinCreated event signature: CoinCreated(address indexed coin, address indexed bondingCurve, address indexed creator, string name, string symbol, uint256 creationFee)
        const coinCreatedEventSignature = keccak256(toHex('CoinCreated(address,address,address,string,string,uint256)'));
        
        const coinCreatedEvent = receipt.logs.find((log: Log) => 
          log.topics[0] === coinCreatedEventSignature
        );
        
        if (coinCreatedEvent && coinCreatedEvent.topics.length >= 4) {
          // Extract addresses from indexed topics
          const coinAddress = `0x${coinCreatedEvent.topics[1]?.slice(26)}` as string; // Remove 0x and padding
          const bondingCurveAddr = `0x${coinCreatedEvent.topics[2]?.slice(26)}` as string; // Remove 0x and padding
          
          setTokenAddress(coinAddress);
          setBondingCurveAddress(bondingCurveAddr);
          
          console.log('Token created successfully:', {
            tokenAddress: coinAddress,
            bondingCurveAddress: bondingCurveAddr,
            txHash: receipt.transactionHash
          });
        } else {
          console.error('CoinCreated event not found in transaction receipt');
        }
      } catch (error) {
        console.error('Error parsing transaction receipt:', error);
      }
    }
  }, [receipt, isSuccess]);

  const launchToken = async (tokenData: TokenLaunchData) => {
    if (!isConnected) {
      throw new Error('Wallet not connected');
    }

    if (!isCorrectChain) {
      throw new Error('Please switch to Core Chain');
    }

    const balanceNum = parseFloat(balance);
    const creationFeeNum = 1; // 1 CORE
    
    if (balanceNum < creationFeeNum) {
      throw new Error('Insufficient CORE balance for creation fee');
    }

    // Reset state before launching
    setTokenAddress(null);
    setBondingCurveAddress(null);
    setTxHash(undefined);

    try {
      writeContract({
        address: CONTRACT_ADDRESSES.COIN_FACTORY as `0x${string}`,
        abi: COIN_FACTORY_ABI,
        functionName: 'createCoin',
        args: [
          tokenData.name,
          tokenData.symbol,
          tokenData.description,
          tokenData.image,
          tokenData.website,
          tokenData.telegram,
          tokenData.twitter,
        ],
        value: parseEther('1'), // 1 CORE creation fee
      });
    } catch (error) {
      console.error('Token launch failed:', error);
      throw error;
    }
  };

  const canLaunch = isConnected && isCorrectChain && parseFloat(balance) >= 1;

  return {
    launchToken,
    canLaunch,
    txHash,
    tokenAddress,
    bondingCurveAddress,
    isPending: isWritePending,
    isConfirming,
    isSuccess,
    error: writeError || receiptError,
    balance,
    isConnected,
    isCorrectChain,
  };
}
