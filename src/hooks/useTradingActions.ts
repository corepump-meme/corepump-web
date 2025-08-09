'use client';

import { useState, useCallback, useMemo } from 'react';
import { useWriteContract, useReadContract, useWaitForTransactionReceipt, usePublicClient } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { BONDING_CURVE_ABI, ERC20_ABI } from '@/lib/contracts';
import { useWallet } from './useWallet';
import { safeBigIntOperation } from '@/lib/bigint-utils';

export interface TradeQuote {
  inputAmount: bigint;
  outputAmount: bigint;
  fee: bigint;
  priceImpact: number;
  isValid: boolean;
  error?: string;
}

export interface TradeState {
  isLoading: boolean;
  isPending: boolean;
  isSuccess: boolean;
  error: string | null;
  hash?: string;
}

export interface UseTradingActionsParams {
  tokenAddress: string;
  bondingCurveAddress: string;
  currentPrice: bigint;
  userTokenBalance?: bigint;
  maxPurchaseAmount?: bigint;
}


export function useTradingActions({
  tokenAddress,
  bondingCurveAddress,
  currentPrice,
  userTokenBalance = BigInt(0),
  maxPurchaseAmount
}: UseTradingActionsParams) {
  const { address, balance, isConnected } = useWallet();
  const [tradeState, setTradeState] = useState<TradeState>({
    isLoading: false,
    isPending: false,
    isSuccess: false,
    error: null,
  });

  // Contract write hook
  const { 
    writeContract, 
    data: hash, 
    error: writeError, 
    isPending: isWritePending 
  } = useWriteContract();

  // Wait for transaction receipt
  const { 
    isLoading: isConfirming, 
    isSuccess: isConfirmed,
    error: receiptError 
  } = useWaitForTransactionReceipt({
    hash,
  });

  // Get public client for direct contract calls
  const publicClient = usePublicClient();

  // Check token allowance for selling
  const { 
    data: allowance 
  } = useReadContract({
    address: tokenAddress as `0x${string}`,
    abi: ERC20_ABI,
    functionName: 'allowance',
    args: address ? [address, bondingCurveAddress as `0x${string}`] : undefined,
  });

  // Get buy quote
  const getBuyQuote = useCallback(async (coreAmount: string): Promise<TradeQuote> => {
    if (!coreAmount || coreAmount === '0') {
      return {
        inputAmount: BigInt(0),
        outputAmount: BigInt(0),
        fee: BigInt(0),
        priceImpact: 0,
        isValid: false,
        error: 'Enter an amount'
      };
    }

    try {
      const coreAmountWei = parseEther(coreAmount);
      const userBalanceWei = parseEther(balance);

      // Validate user has enough CORE
      if (coreAmountWei > userBalanceWei) {
        return {
          inputAmount: coreAmountWei,
          outputAmount: BigInt(0),
          fee: BigInt(0),
          priceImpact: 0,
          isValid: false,
          error: 'Insufficient CORE balance'
        };
      }

      // Check 4% purchase limit
      if (maxPurchaseAmount && coreAmountWei > maxPurchaseAmount) {
        return {
          inputAmount: coreAmountWei,
          outputAmount: BigInt(0),
          fee: BigInt(0),
          priceImpact: 0,
          isValid: false,
          error: `Exceeds 4% purchase limit (${formatEther(maxPurchaseAmount)} CORE max)`
        };
      }

      // Get quote from contract using direct call
      if (!publicClient) {
        throw new Error('Public client not available');
      }

      const result = await publicClient.readContract({
        address: bondingCurveAddress as `0x${string}`,
        abi: BONDING_CURVE_ABI,
        functionName: 'calculateTokensForCore',
        args: [coreAmountWei],
      });

      const [tokenAmount, fee] = result as [bigint, bigint];
      
      // Calculate price impact
      const expectedTokens = safeBigIntOperation(
        () => coreAmountWei / currentPrice,
        BigInt(0)
      );
      
      const priceImpact = expectedTokens > 0 
        ? Number((expectedTokens - tokenAmount) * BigInt(100) / expectedTokens)
        : 0;

      return {
        inputAmount: coreAmountWei,
        outputAmount: tokenAmount,
        fee,
        priceImpact,
        isValid: true
      };
    } catch (error: unknown) {
      return {
        inputAmount: parseEther(coreAmount),
        outputAmount: BigInt(0),
        fee: BigInt(0),
        priceImpact: 0,
        isValid: false,
        error: error instanceof Error ? error.message : 'Failed to calculate quote'
      };
    }
  }, [balance, maxPurchaseAmount, currentPrice, publicClient, bondingCurveAddress]);

  // Get sell quote
  const getSellQuote = useCallback(async (tokenAmount: string): Promise<TradeQuote> => {
    if (!tokenAmount || tokenAmount === '0') {
      return {
        inputAmount: BigInt(0),
        outputAmount: BigInt(0),
        fee: BigInt(0),
        priceImpact: 0,
        isValid: false,
        error: 'Enter an amount'
      };
    }

    try {
      const tokenAmountWei = parseEther(tokenAmount);

      // Validate user has enough tokens
      if (tokenAmountWei > userTokenBalance) {
        return {
          inputAmount: tokenAmountWei,
          outputAmount: BigInt(0),
          fee: BigInt(0),
          priceImpact: 0,
          isValid: false,
          error: 'Insufficient token balance'
        };
      }

      // Get quote from contract using direct call
      if (!publicClient) {
        throw new Error('Public client not available');
      }

      const result = await publicClient.readContract({
        address: bondingCurveAddress as `0x${string}`,
        abi: BONDING_CURVE_ABI,
        functionName: 'calculateCoreForTokens',
        args: [tokenAmountWei],
      });

      const [coreAmount, fee] = result as [bigint, bigint];
      
      // Calculate price impact
      const expectedCore = safeBigIntOperation(
        () => tokenAmountWei * currentPrice,
        BigInt(0)
      );
      
      const priceImpact = expectedCore > 0 
        ? Number((expectedCore - coreAmount) * BigInt(100) / expectedCore)
        : 0;

      return {
        inputAmount: tokenAmountWei,
        outputAmount: coreAmount,
        fee,
        priceImpact,
        isValid: true
      };
    } catch (error: unknown) {
      return {
        inputAmount: parseEther(tokenAmount),
        outputAmount: BigInt(0),
        fee: BigInt(0),
        priceImpact: 0,
        isValid: false,
        error: error instanceof Error ? error.message : 'Failed to calculate quote'
      };
    }
  }, [userTokenBalance, currentPrice, publicClient, bondingCurveAddress]);

  // Execute buy transaction
  const executeBuy = useCallback(async (coreAmount: string) => {
    if (!isConnected || !address) {
      setTradeState(prev => ({ ...prev, error: 'Please connect your wallet' }));
      return;
    }

    try {
      setTradeState({
        isLoading: true,
        isPending: false,
        isSuccess: false,
        error: null,
      });

      const coreAmountWei = parseEther(coreAmount);

      await writeContract({
        address: bondingCurveAddress as `0x${string}`,
        abi: BONDING_CURVE_ABI,
        functionName: 'buyTokens',
        value: coreAmountWei,
      });

      setTradeState(prev => ({ 
        ...prev, 
        isLoading: false, 
        isPending: true,
        hash: hash?.toString()
      }));

    } catch (error: unknown) {
      setTradeState({
        isLoading: false,
        isPending: false,
        isSuccess: false,
        error: error instanceof Error ? error.message : 'Transaction failed',
      });
    }
  }, [isConnected, address, bondingCurveAddress, writeContract, hash]);

  // Execute sell transaction
  const executeSell = useCallback(async (tokenAmount: string) => {
    if (!isConnected || !address) {
      setTradeState(prev => ({ ...prev, error: 'Please connect your wallet' }));
      return;
    }

    try {
      setTradeState({
        isLoading: true,
        isPending: false,
        isSuccess: false,
        error: null,
      });

      const tokenAmountWei = parseEther(tokenAmount);
      const currentAllowance = allowance as bigint || BigInt(0);

      // Check if approval is needed
      if (currentAllowance < tokenAmountWei) {
        // First approve the bonding curve to spend tokens
        await writeContract({
          address: tokenAddress as `0x${string}`,
          abi: ERC20_ABI,
          functionName: 'approve',
          args: [bondingCurveAddress as `0x${string}`, tokenAmountWei],
        });

        // Wait for approval and then execute sell
        // This is a simplified flow - in production you'd want to handle approval separately
        return;
      }

      // Execute sell
      await writeContract({
        address: bondingCurveAddress as `0x${string}`,
        abi: BONDING_CURVE_ABI,
        functionName: 'sellTokens',
        args: [tokenAmountWei],
      });

      setTradeState(prev => ({ 
        ...prev, 
        isLoading: false, 
        isPending: true,
        hash: hash?.toString()
      }));

    } catch (error: unknown) {
      setTradeState({
        isLoading: false,
        isPending: false,
        isSuccess: false,
        error: error instanceof Error ? error.message : 'Transaction failed',
      });
    }
  }, [isConnected, address, tokenAddress, bondingCurveAddress, allowance, writeContract, hash]);

  // Reset trade state
  const resetTradeState = useCallback(() => {
    setTradeState({
      isLoading: false,
      isPending: false,
      isSuccess: false,
      error: null,
    });
  }, []);

  // Update trade state based on transaction status
  useMemo(() => {
    if (isConfirmed) {
      setTradeState(prev => ({
        ...prev,
        isPending: false,
        isSuccess: true,
        error: null,
      }));
    } else if (writeError || receiptError) {
      setTradeState(prev => ({
        ...prev,
        isLoading: false,
        isPending: false,
        error: (writeError?.message || receiptError?.message) ?? 'Transaction failed',
      }));
    } else if (isWritePending) {
      setTradeState(prev => ({ ...prev, isLoading: true }));
    } else if (isConfirming) {
      setTradeState(prev => ({ ...prev, isPending: true }));
    }
  }, [isConfirmed, isConfirming, isWritePending, writeError, receiptError]);

  return {
    // Quote functions
    getBuyQuote,
    getSellQuote,

    // Transaction functions
    executeBuy,
    executeSell,

    // State
    tradeState,
    resetTradeState,

    // Utilities
    needsApproval: (tokenAmount: string) => {
      const tokenAmountWei = parseEther(tokenAmount);
      const currentAllowance = allowance as bigint || BigInt(0);
      return currentAllowance < tokenAmountWei;
    },

    // Transaction hash for tracking
    transactionHash: hash,
  };
}
