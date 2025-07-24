// Contract ABIs for CorePump platform
export const COIN_FACTORY_ABI = [
  {
    "type": "function",
    "name": "createCoin",
    "inputs": [
      { "name": "name", "type": "string" },
      { "name": "symbol", "type": "string" },
      { "name": "description", "type": "string" },
      { "name": "image", "type": "string" },
      { "name": "website", "type": "string" },
      { "name": "telegram", "type": "string" },
      { "name": "twitter", "type": "string" }
    ],
    "outputs": [
      { "name": "coin", "type": "address" },
      { "name": "bondingCurve", "type": "address" }
    ],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "getAllCoins",
    "inputs": [],
    "outputs": [{ "name": "", "type": "address[]" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getTotalCoins",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getCoinDetails",
    "inputs": [{ "name": "coinAddress", "type": "address" }],
    "outputs": [
      { "name": "coin", "type": "address" },
      { "name": "bondingCurve", "type": "address" },
      { "name": "creator", "type": "address" },
      { "name": "name", "type": "string" },
      { "name": "symbol", "type": "string" },
      { "name": "description", "type": "string" },
      { "name": "image", "type": "string" },
      { "name": "website", "type": "string" },
      { "name": "telegram", "type": "string" },
      { "name": "twitter", "type": "string" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getPlatformStats",
    "inputs": [],
    "outputs": [
      { "name": "totalCoins", "type": "uint256" },
      { "name": "creationFee", "type": "uint256" },
      { "name": "basePrice", "type": "uint256" },
      { "name": "treasury", "type": "address" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "event",
    "name": "CoinCreated",
    "inputs": [
      { "name": "coin", "type": "address", "indexed": true },
      { "name": "bondingCurve", "type": "address", "indexed": true },
      { "name": "creator", "type": "address", "indexed": true },
      { "name": "name", "type": "string", "indexed": false },
      { "name": "symbol", "type": "string", "indexed": false },
      { "name": "creationFee", "type": "uint256", "indexed": false }
    ]
  }
] as const;

export const BONDING_CURVE_ABI = [
  {
    "type": "function",
    "name": "buyTokens",
    "inputs": [],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "sellTokens",
    "inputs": [{ "name": "tokenAmount", "type": "uint256" }],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "getCurrentPrice",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "calculateTokensForCore",
    "inputs": [{ "name": "coreAmount", "type": "uint256" }],
    "outputs": [
      { "name": "tokenAmount", "type": "uint256" },
      { "name": "fee", "type": "uint256" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "calculateCoreForTokens",
    "inputs": [{ "name": "tokenAmount", "type": "uint256" }],
    "outputs": [
      { "name": "coreAmount", "type": "uint256" },
      { "name": "fee", "type": "uint256" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getState",
    "inputs": [],
    "outputs": [
      { "name": "currentPrice", "type": "uint256" },
      { "name": "totalRaised", "type": "uint256" },
      { "name": "tokensSoldAmount", "type": "uint256" },
      { "name": "isGraduated", "type": "bool" },
      { "name": "graduationProgress", "type": "uint256" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getGraduationThreshold",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "event",
    "name": "TokenPurchased",
    "inputs": [
      { "name": "buyer", "type": "address", "indexed": true },
      { "name": "coreAmount", "type": "uint256", "indexed": false },
      { "name": "tokenAmount", "type": "uint256", "indexed": false },
      { "name": "newPrice", "type": "uint256", "indexed": false },
      { "name": "fee", "type": "uint256", "indexed": false }
    ]
  },
  {
    "type": "event",
    "name": "TokenSold",
    "inputs": [
      { "name": "seller", "type": "address", "indexed": true },
      { "name": "tokenAmount", "type": "uint256", "indexed": false },
      { "name": "coreAmount", "type": "uint256", "indexed": false },
      { "name": "newPrice", "type": "uint256", "indexed": false },
      { "name": "fee", "type": "uint256", "indexed": false }
    ]
  },
  {
    "type": "event",
    "name": "Graduated",
    "inputs": [
      { "name": "token", "type": "address", "indexed": true },
      { "name": "totalRaised", "type": "uint256", "indexed": false },
      { "name": "liquidityCore", "type": "uint256", "indexed": false },
      { "name": "creatorBonus", "type": "uint256", "indexed": false },
      { "name": "treasuryAmount", "type": "uint256", "indexed": false }
    ]
  }
] as const;

export const ERC20_ABI = [
  {
    "type": "function",
    "name": "balanceOf",
    "inputs": [{ "name": "account", "type": "address" }],
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "approve",
    "inputs": [
      { "name": "spender", "type": "address" },
      { "name": "amount", "type": "uint256" }
    ],
    "outputs": [{ "name": "", "type": "bool" }],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "allowance",
    "inputs": [
      { "name": "owner", "type": "address" },
      { "name": "spender", "type": "address" }
    ],
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "totalSupply",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "name",
    "inputs": [],
    "outputs": [{ "name": "", "type": "string" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "symbol",
    "inputs": [],
    "outputs": [{ "name": "", "type": "string" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "decimals",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint8" }],
    "stateMutability": "view"
  }
] as const;
