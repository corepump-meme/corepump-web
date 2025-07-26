/**
 * Utility functions for BTCScan explorer links
 */

const BTCSCAN_BASE_URL = 'https://scan.test2.btcs.network';

/**
 * Generate BTCScan address URL
 * @param address - Ethereum address (0x...)
 * @returns Full BTCScan address URL
 */
export function getBTCScanAddressUrl(address: string): string {
  return `${BTCSCAN_BASE_URL}/address/${address}`;
}

/**
 * Generate BTCScan transaction URL
 * @param txHash - Transaction hash (0x...)
 * @returns Full BTCScan transaction URL
 */
export function getBTCScanTxUrl(txHash: string): string {
  return `${BTCSCAN_BASE_URL}/tx/${txHash}`;
}

/**
 * Open BTCScan address page in new tab
 * @param address - Ethereum address (0x...)
 */
export function openBTCScanAddress(address: string): void {
  window.open(getBTCScanAddressUrl(address), '_blank', 'noopener,noreferrer');
}

/**
 * Open BTCScan transaction page in new tab
 * @param txHash - Transaction hash (0x...)
 */
export function openBTCScanTx(txHash: string): void {
  window.open(getBTCScanTxUrl(txHash), '_blank', 'noopener,noreferrer');
}

/**
 * Format address for display (truncated)
 * @param address - Ethereum address (0x...)
 * @param startChars - Number of characters to show at start (default: 6)
 * @param endChars - Number of characters to show at end (default: 4)
 * @returns Formatted address string
 */
export function formatAddress(address: string, startChars: number = 6, endChars: number = 4): string {
  if (!address || address.length < startChars + endChars) {
    return address;
  }
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}
