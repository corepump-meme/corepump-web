'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { validateTokenData, sanitizeTokenMetadata, TokenLaunchForm } from '@/lib/token-validation';

export interface TokenLaunchState {
  success: boolean;
  error?: string;
  tokenAddress?: string;
  warnings?: string[];
}

export async function launchToken(
  prevState: TokenLaunchState,
  formData: FormData
): Promise<TokenLaunchState> {
  try {
    // Extract form data
    const rawData = {
      name: formData.get('name') as string,
      symbol: formData.get('symbol') as string,
      description: formData.get('description') as string,
      imageUrl: formData.get('imageUrl') as string,
      website: formData.get('website') as string,
      telegram: formData.get('telegram') as string,
      twitter: formData.get('twitter') as string,
      acceptTerms: formData.get('acceptTerms') === 'on',
    };

    // Validate data
    const validation = validateTokenData(rawData);
    if (!validation.isValid) {
      return {
        success: false,
        error: validation.errors[0],
        warnings: validation.warnings,
      };
    }

    // Sanitize metadata
    const sanitizedData = sanitizeTokenMetadata(rawData);
    console.log('Sanitized token data:', sanitizedData);

    // TODO: Integrate with smart contract
    // This is where you would call the CoinFactory contract
    // const tokenAddress = await createTokenOnBlockchain(sanitizedData);
    
    // For now, simulate the token creation process
    await simulateTokenCreation(sanitizedData);
    
    // Generate mock token address for demonstration
    const mockTokenAddress = '0x' + Math.random().toString(16).substr(2, 40);

    // Revalidate relevant pages
    revalidatePath('/tokens');
    revalidatePath('/');

    // Redirect to token page
    redirect(`/token/${mockTokenAddress}`);

  } catch (error) {
    console.error('Token launch error:', error);
    
    // Handle specific error types
    if (error instanceof Error) {
      if (error.message.includes('insufficient funds')) {
        return {
          success: false,
          error: 'Insufficient CORE balance. You need at least 1 CORE to launch a token.',
        };
      }
      
      if (error.message.includes('user rejected')) {
        return {
          success: false,
          error: 'Transaction was rejected. Please try again.',
        };
      }
    }

    return {
      success: false,
      error: 'Failed to launch token. Please try again.',
    };
  }
}

// Simulate token creation process
async function simulateTokenCreation(tokenData: TokenLaunchForm): Promise<void> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Simulate potential errors (for testing)
  if (Math.random() < 0.1) { // 10% chance of error
    throw new Error('Network error occurred');
  }
  
  // Log token creation for development
  console.log('Token creation simulated:', {
    name: tokenData.name,
    symbol: tokenData.symbol,
    description: tokenData.description,
    imageUrl: tokenData.imageUrl,
    hasWebsite: !!tokenData.website,
    hasTelegram: !!tokenData.telegram,
    hasTwitter: !!tokenData.twitter,
  });
}

// TODO: Implement actual blockchain integration
/*
async function createTokenOnBlockchain(tokenData: TokenLaunchForm): Promise<string> {
  // This would integrate with the CoinFactory contract
  // 1. Connect to wallet
  // 2. Call CoinFactory.createCoin() with 1 CORE fee
  // 3. Wait for transaction confirmation
  // 4. Return token address
  
  const { ethers } = await import('ethers');
  const provider = new ethers.JsonRpcProvider(process.env.CORE_RPC_URL);
  
  // Contract interaction would go here
  // const coinFactory = new ethers.Contract(COIN_FACTORY_ADDRESS, COIN_FACTORY_ABI, signer);
  // const tx = await coinFactory.createCoin(
  //   tokenData.name,
  //   tokenData.symbol,
  //   tokenData.description || '',
  //   tokenData.imageUrl || '',
  //   tokenData.website || '',
  //   tokenData.telegram || '',
  //   tokenData.twitter || '',
  //   { value: ethers.parseEther('1') }
  // );
  // const receipt = await tx.wait();
  // return receipt.events.find(e => e.event === 'CoinCreated').args.coin;
}
*/

export async function validateTokenForm(formData: FormData) {
  const rawData = {
    name: formData.get('name') as string,
    symbol: formData.get('symbol') as string,
    description: formData.get('description') as string,
    imageUrl: formData.get('imageUrl') as string,
    website: formData.get('website') as string,
    telegram: formData.get('telegram') as string,
    twitter: formData.get('twitter') as string,
    acceptTerms: formData.get('acceptTerms') === 'on',
  };

  return validateTokenData(rawData);
}
