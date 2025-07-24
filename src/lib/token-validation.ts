export interface TokenLaunchForm {
  name: string;
  symbol: string;
  description?: string;
  imageUrl?: string;
  website?: string;
  telegram?: string;
  twitter?: string;
  acceptTerms: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateTokenName(name: string): string | null {
  if (!name.trim()) return 'Token name is required';
  if (name.length < 3) return 'Token name must be at least 3 characters';
  if (name.length > 50) return 'Token name must be less than 50 characters';
  if (!/^[a-zA-Z0-9\s]+$/.test(name)) return 'Token name can only contain letters, numbers, and spaces';
  return null;
}

export function validateTokenSymbol(symbol: string): string | null {
  if (!symbol.trim()) return 'Token symbol is required';
  if (symbol.length < 2) return 'Token symbol must be at least 2 characters';
  if (symbol.length > 10) return 'Token symbol must be less than 10 characters';
  if (!/^[A-Z0-9]+$/.test(symbol)) return 'Token symbol can only contain uppercase letters and numbers';
  return null;
}

export function validateUrl(url: string): string | null {
  if (!url) return null; // Optional field
  
  try {
    const parsed = new URL(url);
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return 'URL must use http or https protocol';
    }
    return null;
  } catch {
    return 'Invalid URL format';
  }
}

export function validateDescription(description: string): string | null {
  if (!description) return null; // Optional field
  if (description.length > 500) return 'Description must be less than 500 characters';
  return null;
}

export function validateTokenData(data: Partial<TokenLaunchForm>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required field validations
  const nameError = validateTokenName(data.name || '');
  if (nameError) errors.push(nameError);

  const symbolError = validateTokenSymbol(data.symbol || '');
  if (symbolError) errors.push(symbolError);

  if (!data.acceptTerms) {
    errors.push('You must accept the terms and conditions');
  }

  // Optional field validations
  const descriptionError = validateDescription(data.description || '');
  if (descriptionError) errors.push(descriptionError);

  const websiteError = validateUrl(data.website || '');
  if (websiteError) errors.push(`Website: ${websiteError}`);

  const telegramError = validateUrl(data.telegram || '');
  if (telegramError) errors.push(`Telegram: ${telegramError}`);

  const twitterError = validateUrl(data.twitter || '');
  if (twitterError) errors.push(`Twitter: ${twitterError}`);

  // Warnings
  if (!data.description) {
    warnings.push('Adding a description helps users understand your token');
  }

  if (!data.imageUrl) {
    warnings.push('Adding an image makes your token more recognizable');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

export function sanitizeString(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/[<>]/g, '') // Remove angle brackets
    .trim();
}

export function sanitizeUrl(url: string): string | null {
  if (!url) return null;
  
  try {
    const parsed = new URL(url);
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return null;
    }
    return parsed.toString();
  } catch {
    return null;
  }
}

export function sanitizeTokenMetadata(metadata: Partial<TokenLaunchForm>): TokenLaunchForm {
  return {
    name: sanitizeString(metadata.name || ''),
    symbol: sanitizeString(metadata.symbol || '').toUpperCase(),
    description: metadata.description ? sanitizeString(metadata.description) : undefined,
    imageUrl: metadata.imageUrl || undefined,
    website: metadata.website ? sanitizeUrl(metadata.website) || undefined : undefined,
    telegram: metadata.telegram ? sanitizeUrl(metadata.telegram) || undefined : undefined,
    twitter: metadata.twitter ? sanitizeUrl(metadata.twitter) || undefined : undefined,
    acceptTerms: Boolean(metadata.acceptTerms),
  };
}
