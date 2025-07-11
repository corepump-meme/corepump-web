# CorePump - Token Launchpad Platform

CorePump is a revolutionary token launchpad platform built on the Core Chain blockchain, designed to maximize fairness, security, and long-term sustainability for all participants. The platform implements the "CorePump Protocol" - a comprehensive set of immutable business rules enforced programmatically through smart contracts.

## 🚀 Key Features

### **Anti-Rug Pull Protection**
- **Mandatory LP Burn**: 100% of liquidity provider tokens are automatically burned upon graduation
- **Immutable Contracts**: All token contracts have ownership renounced, preventing creator manipulation
- **Milestone-Based Vesting**: Creator and early buyer tokens are locked behind achievement milestones

### **Fair Launch Mechanism**
- **Standardized Supply**: Every token launches with exactly 1,000,000,000 tokens
- **Uniform Bonding Curves**: Identical mathematical formula ensures fair price discovery
- **Transparent Allocation**: 80% public sale, 15% early buyers, 5% creator (all with vesting)

### **Graduation System**
- **Automatic Liquidity**: At $50K market cap, 70% of raised CORE is paired with tokens for DEX liquidity
- **Creator Rewards**: 10% of raised funds go to creator as launch bonus
- **Platform Sustainability**: 20% feeds the platform treasury

### **Stability Mechanisms**
- **Stability Tax**: 1% tax on all DEX trades feeds token-specific treasuries
- **Community Governance**: Token holders vote on treasury fund deployment
- **Buyback & Burn**: Treasury funds enable community-driven token burns

## 🏗️ Technical Architecture

### **Blockchain Foundation**
- **Core Chain Exclusive**: All operations conducted on Core Chain blockchain
- **Smart Contract Enforcement**: Business rules implemented programmatically
- **DEX Integration**: Seamless integration with ArcherSwap and other Core Chain DEXs

### **Token Lifecycle**
1. **Creation Phase**: Pay 1 CORE fee, deploy immutable contract
2. **Bonding Curve Phase**: Public trading with 1% platform fees
3. **Graduation Event**: Automatic liquidity provision at $50K market cap
4. **DEX Trading**: Full decentralized trading with stability mechanisms

### **Vesting Milestones**
Creator and early buyer tokens unlock based on achievements:
- **Tranche 1 (25%)**: Sustain $250K market cap for 72 hours
- **Tranche 2 (25%)**: Reach 1,000 unique holders
- **Tranche 3 (50%)**: Achieve $1M cumulative trading volume

## 💰 Fee Structure

| Fee Type | Amount | Trigger | Destination |
|----------|--------|---------|-------------|
| **Creation Fee** | 1 CORE | Token Launch | Platform Treasury |
| **Bonding Curve Fee** | 1% of transaction | Buy/Sell on Curve | Platform Treasury |
| **Graduation Bonus** | 10% of raised CORE | Graduation Event | Creator's Wallet |
| **Platform Share** | 20% of raised CORE | Graduation Event | Platform Treasury |
| **Stability Tax** | 1% of DEX trade | Buy/Sell on DEX | Token's Treasury |

## 🏆 Certified Stable Standard

Tokens that adopt all optional stability mechanisms earn "Certified Stable" status, representing the highest standards of:
- Long-term price stability
- Community governance
- Anti-manipulation measures
- Sustainable tokenomics

## 🛠️ Development Setup

This is the web frontend for the CorePump platform, built with [Next.js](https://nextjs.org).

### Prerequisites
- Node.js 18+ 
- Core Chain wallet connection
- Access to Core Chain testnet/mainnet

### Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Environment Setup

Create a `.env.local` file with your Core Chain configuration:

```bash
NEXT_PUBLIC_CORE_CHAIN_RPC=https://rpc.coredao.org
NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address
```

## 📁 Project Structure

```
├── src/app/              # Next.js app directory
├── docs/                 # Documentation
│   └── business_rules.md # Complete protocol specification
├── public/               # Static assets
└── README.md            # This file
```

## 🎯 Governance

### Token-Level Governance
- Holders vote on treasury fund deployment
- Community-driven buyback and burn decisions
- Protocol parameter adjustments

### Platform-Level Governance
- Future $LAUNCH token holders control platform rules
- Fee structure modifications
- Graduation threshold adjustments

## 🔒 Security Features

- **Immutable Contracts**: No admin keys or upgrade mechanisms
- **Automated Execution**: Reduces human error and manipulation
- **Transparent Operations**: All transactions visible on-chain
- **Community Verification**: Open-source smart contracts

## 📚 Documentation

For complete protocol specifications, see:
- [Business Rules](./docs/business_rules.md) - Complete protocol rulebook and immutable rules
- [Smart Contract Documentation](./docs/contracts.md) - Technical implementation details (coming soon)

### Quick Links
- [📋 Complete Business Rules](./docs/business_rules.md) - Detailed protocol specification
- [🏗️ Project Structure](#-project-structure) - Codebase organization
- [🛠️ Development Setup](#️-development-setup) - Getting started guide
- [💰 Fee Structure](#-fee-structure) - Platform economics

## 🚀 Deployment

The CorePump platform is designed for deployment on Core Chain mainnet. For development:

```bash
npm run build
npm run start
```

## 🤝 Contributing

CorePump is built for the community. Contributions are welcome:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request
4. Participate in governance discussions

## 📄 License

This project is part of the CorePump Protocol ecosystem. See individual contract licenses for specific terms.

---

**Built on Core Chain | Powered by Community | Protected by Code**
