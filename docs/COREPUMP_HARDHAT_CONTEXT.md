# CorePump Hardhat Context

## Project Overview

**CorePump** is a decentralized token launchpad built on Core Chain featuring bonding curve mechanics, anti-rug protection, and upgradeable smart contracts. The platform enables fair token launches with mathematical price discovery and automatic graduation to DEX trading.

### Key Features
- **Fair Token Launches**: Fixed 1B supply, 1 CORE creation fee
- **Bonding Curve Trading**: Quadratic price discovery mechanism
- **Anti-Rug Protection**: Immediate ownership renouncement, LP token burning
- **Purchase Limits**: 4% maximum per wallet for fair distribution
- **Automatic Graduation**: At $50k market cap to DEX liquidity
- **Upgradeable Architecture**: UUPS proxy pattern for future enhancements

## Smart Contract Architecture

### Core Contracts

#### 1. CoinFactory (Upgradeable - Main Entry Point)
**Address**: Deployed via proxy pattern  
**Purpose**: Primary contract for token creation and platform management

**Key Constants**:
```solidity
uint256 public constant CREATION_FEE = 1 ether; // 1 CORE
uint256 public constant BASE_PRICE = 0.0001 ether; // 0.0001 CORE per token
```

**Primary Functions**:
```solidity
// Create new token with bonding curve
function createCoin(
    string memory name,
    string memory symbol,
    string memory description,
    string memory image,
    string memory website,
    string memory telegram,
    string memory twitter
) external payable

// Get all created tokens
function getAllCoins() external view returns (address[] memory)

// Get platform statistics
function getPlatformStats() external view returns (
    uint256 totalCoins,
    uint256 creationFee,
    uint256 basePrice,
    address treasury
)

// Get detailed coin information
function getCoinDetails(address coinAddress) external view returns (
    address coin,
    address bondingCurve,
    address creator,
    string memory name,
    string memory symbol,
    string memory description,
    string memory image,
    string memory website,
    string memory telegram,
    string memory twitter
)
```

**Key Events**:
```solidity
event CoinCreated(
    address indexed coin,
    address indexed bondingCurve,
    address indexed creator,
    string name,
    string symbol,
    uint256 creationFee
);
```

#### 2. BondingCurve (Upgradeable - Trading Engine)
**Purpose**: Handles price discovery and token trading via bonding curve

**Key Constants**:
```solidity
uint256 public constant PLATFORM_FEE = 100; // 1% = 100 basis points
uint256 public constant BASIS_POINTS = 10000;
uint256 public constant MAX_PURCHASE_PERCENTAGE = 400; // 4%
uint256 public constant GRADUATION_USD_THRESHOLD = 50000; // $50,000
```

**Trading Functions**:
```solidity
// Buy tokens with CORE
function buyTokens() external payable

// Sell tokens for CORE
function sellTokens(uint256 tokenAmount) external

// Calculate tokens for CORE amount
function calculateTokensForCore(uint256 coreAmount) external view returns (uint256, uint256)

// Calculate CORE for token amount
function calculateCoreForTokens(uint256 tokenAmount) external view returns (uint256, uint256)

// Get current token price
function getCurrentPrice() public view returns (uint256)

// Get graduation threshold in CORE
function getGraduationThreshold() public view returns (uint256)

// Get contract state for frontend
function getState() external view returns (
    uint256 currentPrice,
    uint256 totalRaised,
    uint256 tokensSoldAmount,
    bool isGraduated,
    uint256 graduationProgress
)
```

**Price Formula**: 
```
price = basePrice * (1 + tokensSold/totalSupply)²
```

**Key Events**:
```solidity
event TokenPurchased(
    address indexed buyer,
    uint256 coreAmount,
    uint256 tokenAmount,
    uint256 newPrice,
    uint256 fee
);

event TokenSold(
    address indexed seller,
    uint256 tokenAmount,
    uint256 coreAmount,
    uint256 newPrice,
    uint256 fee
);

event Graduated(
    address indexed token,
    uint256 totalRaised,
    uint256 liquidityCore,
    uint256 creatorBonus,
    uint256 treasuryAmount
);
```

#### 3. Coin (Non-Upgradeable - ERC20 Token)
**Purpose**: Standard ERC20 with fixed supply and metadata

**Key Properties**:
```solidity
uint256 public constant TOTAL_SUPPLY = 1_000_000_000 * 10**18; // 1B tokens
address public immutable bondingCurve;
address public immutable creator;
```

**Metadata Functions**:
```solidity
function getTokenMetadata() external view returns (
    string memory description,
    string memory image,
    string memory website,
    string memory telegram,
    string memory twitter
)
```

#### 4. EventHub (Upgradeable - Event Aggregation)
**Purpose**: Centralized event system for efficient subgraph indexing

**Key Events for Frontend**:
```solidity
event TokenLaunched(
    address indexed token,
    address indexed creator,
    address indexed bondingCurve,
    string name,
    string symbol,
    uint256 timestamp,
    uint256 creationFee
);

event TokenTraded(
    address indexed token,
    address indexed trader,
    address indexed bondingCurve,
    bool isBuy,
    uint256 coreAmount,
    uint256 tokenAmount,
    uint256 newPrice,
    uint256 fee,
    uint256 timestamp
);

event TokenGraduated(
    address indexed token,
    address indexed creator,
    uint256 totalRaised,
    uint256 liquidityCore,
    uint256 creatorBonus,
    uint256 timestamp
);

event LargePurchaseAttempted(
    address indexed token,
    address indexed buyer,
    address indexed bondingCurve,
    uint256 attemptedAmount,
    uint256 currentHoldings,
    uint256 maxAllowed,
    uint256 timestamp
);
```

#### 5. PlatformTreasury (Upgradeable - Fee Management)
**Purpose**: Collects and manages platform fees

#### 6. Price Oracles
- **API3PriceOracle**: For mainnet (Core Chain)
- **TestnetPriceOracle**: For development/testing

## Business Rules & Token Economics

### Token Creation Rules
- **Creation Fee**: 1 CORE (non-refundable)
- **Total Supply**: Fixed 1,000,000,000 tokens per launch
- **Supply Distribution**: 80% to bonding curve, 20% reserved for future features
- **Ownership**: Immediately renounced upon creation (immutable)

### Trading Rules
- **Platform Fee**: 1% on all bonding curve transactions
- **Purchase Limit**: 4% of total supply per wallet maximum
- **Base Price**: 0.0001 CORE per token (starting price)
- **Price Curve**: Quadratic bonding curve

### Graduation Rules
- **Threshold**: $50,000 USD market cap (dynamic based on CORE price)
- **Liquidity**: 70% of raised CORE goes to DEX liquidity
- **Creator Bonus**: 10% of raised CORE
- **Treasury Share**: 20% of raised CORE
- **LP Tokens**: 100% burned (anti-rug protection)

## Network Configuration

### Core Chain Testnet
- **RPC URL**: `https://rpc.test2.btcs.network`
- **Chain ID**: 1114
- **Explorer**: `https://scan.test2.btcs.network`
- **Currency**: CORE

### Core Chain Mainnet
- **Chain ID**: 1116
- **Currency**: CORE

## Frontend Integration Guide

### Essential Contract Interactions

#### 1. Token Creation Flow
```javascript
// 1. Call createCoin with 1 CORE fee
const tx = await coinFactory.createCoin(
    name, symbol, description, image, website, telegram, twitter,
    { value: ethers.parseEther("1") }
);

// 2. Listen for CoinCreated event
coinFactory.on("CoinCreated", (coin, bondingCurve, creator, name, symbol, fee) => {
    // Update UI with new token
});
```

#### 2. Token Trading Flow
```javascript
// Buy tokens
const buyTx = await bondingCurve.buyTokens({ value: coreAmount });

// Sell tokens (requires approval first)
await coin.approve(bondingCurveAddress, tokenAmount);
const sellTx = await bondingCurve.sellTokens(tokenAmount);

// Get price quotes
const [tokensOut, fee] = await bondingCurve.calculateTokensForCore(coreAmount);
const [coreOut, fee] = await bondingCurve.calculateCoreForTokens(tokenAmount);
```

#### 3. Real-time Data Fetching
```javascript
// Get platform stats
const [totalCoins, creationFee, basePrice, treasury] = await coinFactory.getPlatformStats();

// Get bonding curve state
const [currentPrice, totalRaised, tokensSold, graduated, progress] = await bondingCurve.getState();

// Get token details
const tokenDetails = await coinFactory.getCoinDetails(tokenAddress);
```

### Event Listening for Real-time Updates

```javascript
// Listen to EventHub for all platform events
eventHub.on("TokenLaunched", handleTokenLaunched);
eventHub.on("TokenTraded", handleTokenTraded);
eventHub.on("TokenGraduated", handleTokenGraduated);
eventHub.on("LargePurchaseAttempted", handleLargePurchaseAttempted);

// Listen to individual bonding curve events
bondingCurve.on("TokenPurchased", handlePurchase);
bondingCurve.on("TokenSold", handleSale);
bondingCurve.on("Graduated", handleGraduation);
```

### State Management Considerations

#### Token List Management
- Fetch all tokens via `coinFactory.getAllCoins()`
- Cache token metadata and bonding curve addresses
- Subscribe to `TokenLaunched` events for real-time updates

#### Price Updates
- Poll `getCurrentPrice()` for active trading pairs
- Listen to `TokenTraded` events for immediate price updates
- Calculate graduation progress using `getState()`

#### User Portfolio
- Track user's token balances via ERC20 `balanceOf`
- Monitor purchase limits via `purchaseAmounts` mapping
- Show trading history via event filtering

### Error Handling

#### Common Errors
- `"Insufficient creation fee"` - Need exactly 1 CORE for token creation
- `"Purchase exceeds 4% limit"` - User trying to buy more than allowed
- `"Token has graduated"` - Attempting to trade on graduated token
- `"Insufficient token balance"` - User doesn't have enough tokens to sell

#### Transaction Failures
- Always check for sufficient CORE balance before transactions
- Validate token amounts against available supply
- Handle slippage by checking price before and after quotes

## Development Environment

### Dependencies
```json
{
  "dependencies": {
    "@chainlink/contracts": "^1.4.0",
    "@openzeppelin/contracts-upgradeable": "^5.3.0",
    "@openzeppelin/hardhat-upgrades": "^3.9.1"
  },
  "devDependencies": {
    "@nomicfoundation/hardhat-toolbox": "^6.0.0",
    "dotenv": "^17.2.0",
    "hardhat": "^2.25.0"
  }
}
```

### Deployment Scripts
- `npm run deploy` - Deploy to configured network
- `npm run deploy:local` - Deploy to local hardhat network
- `npm test` - Run comprehensive test suite

### Contract Addresses (Post-Deployment)
After deployment, you'll receive addresses for:
- CoinFactory (main entry point)
- PlatformTreasury
- EventHub
- BondingCurve Implementation
- Coin Implementation
- Price Oracle

## API Reference

### CoinFactory Interface
```solidity
interface ICoinFactory {
    function createCoin(string calldata name, string calldata symbol, string calldata description, string calldata image, string calldata website, string calldata telegram, string calldata twitter) external payable;
    function getAllCoins() external view returns (address[] memory);
    function getTotalCoins() external view returns (uint256);
    function getCoinDetails(address coinAddress) external view returns (address, address, address, string memory, string memory, string memory, string memory, string memory, string memory, string memory);
    function getPlatformStats() external view returns (uint256, uint256, uint256, address);
}
```

### BondingCurve Interface
```solidity
interface IBondingCurve {
    function buyTokens() external payable;
    function sellTokens(uint256 tokenAmount) external;
    function getCurrentPrice() external view returns (uint256);
    function calculateTokensForCore(uint256 coreAmount) external view returns (uint256, uint256);
    function calculateCoreForTokens(uint256 tokenAmount) external view returns (uint256, uint256);
    function getState() external view returns (uint256, uint256, uint256, bool, uint256);
    function getGraduationThreshold() external view returns (uint256);
}
```

## Security Considerations

### Smart Contract Security
- All contracts use OpenZeppelin's battle-tested implementations
- Reentrancy protection on all external calls
- Access controls with role-based permissions
- Emergency pause functionality for critical operations

### Frontend Security
- Always validate user inputs before contract calls
- Implement proper slippage protection for trades
- Use secure wallet connection libraries
- Validate contract addresses against known deployments

## Testing & Debugging

### Local Development
1. Start local hardhat network: `npx hardhat node`
2. Deploy contracts: `npm run deploy:local`
3. Run tests: `npm test`

### Testnet Testing
1. Configure Core Chain testnet in wallet
2. Get testnet CORE from faucet
3. Deploy to testnet: `npm run deploy`
4. Test all functionality with real transactions

## Future Enhancements (Post-MVP)

### Planned Features
- **DEX Integration**: Automatic liquidity provision on graduation
- **Vesting Contracts**: Milestone-based token release for creators
- **Governance System**: Community-driven platform decisions
- **Advanced Analytics**: Comprehensive trading metrics
- **Mobile App**: Native mobile interface

### Upgrade Path
- All core contracts are upgradeable via UUPS proxy pattern
- New features can be added without disrupting existing tokens
- Frontend should be designed to handle contract upgrades gracefully

---

## Quick Start Checklist for Frontend Development

1. **Setup Web3 Connection**
   - Configure Core Chain network
   - Implement wallet connection (MetaMask, WalletConnect)
   - Handle network switching

2. **Contract Integration**
   - Import contract ABIs
   - Initialize contract instances with deployed addresses
   - Implement error handling for all contract calls

3. **Core Features to Implement**
   - Token creation form with metadata inputs
   - Token list/discovery page
   - Individual token trading interface
   - User portfolio/dashboard
   - Real-time price charts and trading data

4. **Event Handling**
   - Subscribe to EventHub for platform-wide events
   - Implement real-time updates for prices and trades
   - Show transaction status and confirmations

5. **UI/UX Considerations**
   - Clear indication of graduation progress
   - Purchase limit warnings
   - Fee breakdowns for all transactions
   - Mobile-responsive design

This context document provides comprehensive information about the CorePump platform's smart contract architecture, business logic, and integration requirements for frontend development.
