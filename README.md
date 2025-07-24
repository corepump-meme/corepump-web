# CorePump - Fair Token Launchpad

A decentralized token launchpad built on Core Chain featuring bonding curve mechanics, anti-rug protection, and automatic DEX graduation.

## 🚀 Features

### Token Launch Page
- **Fair Launch Mechanics**: 4% maximum purchase per wallet, bonding curve pricing
- **Anti-Rug Protection**: Immediate ownership renouncement, LP token burning
- **Image Upload**: Cloudflare R2 integration for token images
- **Form Validation**: Comprehensive client and server-side validation
- **Real-time Feedback**: Loading states, error handling, and success messages

### Core Components
- **TokenLaunchForm**: Complete token creation interface
- **ImageUpload**: Drag-and-drop image upload with R2 storage
- **Token Validation**: Comprehensive input sanitization and validation
- **Server Actions**: Next.js 13+ server actions for form handling

## 🛠 Tech Stack

- **Framework**: Next.js 13+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Storage**: Cloudflare R2 for image storage
- **Blockchain**: Core Chain integration ready
- **Form Handling**: React Server Actions
- **Icons**: React Icons (Feather Icons)

## 📁 Project Structure

```
src/
├── app/
│   ├── actions/
│   │   ├── token-actions.ts      # Token launch server actions
│   │   └── upload-actions.ts     # R2 image upload actions
│   ├── launch/
│   │   └── page.tsx              # Token launch page
│   └── token/[address]/
│       └── page.tsx              # Token detail page
├── components/
│   ├── ui/                       # Base UI components
│   └── defi/
│       ├── ImageUpload/          # Image upload component
│       └── TokenLaunchForm/      # Main launch form
├── lib/
│   ├── r2-client.ts              # Cloudflare R2 configuration
│   └── token-validation.ts       # Validation utilities
└── types/                        # TypeScript type definitions
```

## 🔧 Setup & Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Copy the example environment file and configure your settings:

```bash
cp .env.example .env.local
```

Required environment variables:

```env
# Cloudflare R2 Storage
CLOUDFLARE_R2_ACCOUNT_ID=your_account_id
CLOUDFLARE_R2_ACCESS_KEY_ID=your_access_key
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your_secret_key
CLOUDFLARE_R2_BUCKET_NAME=corepump-tokens
CLOUDFLARE_R2_PUBLIC_URL=https://your-bucket.your-domain.com

# Core Chain Configuration
CORE_RPC_URL=https://rpc.coredao.org
NEXT_PUBLIC_CHAIN_ID=1116
```

### 3. Cloudflare R2 Setup

1. Create a Cloudflare account and enable R2 storage
2. Create a new R2 bucket for token images
3. Generate API tokens with R2 permissions
4. Configure public access for the bucket (optional)
5. Set up a custom domain for public URLs

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000/launch` to access the token launch page.

## 🎨 Design System

The project follows the CorePump design system with:

- **Colors**: Core Orange (#FF6B35) and Bitcoin Gold (#F7931A)
- **Typography**: Inter for UI text, JetBrains Mono for addresses/numbers
- **Components**: Consistent button, input, card, and alert components
- **Spacing**: 8px base unit system
- **Responsive**: Mobile-first design approach

## 📋 Token Launch Process

### 1. Form Validation
- **Token Name**: 3-50 characters, alphanumeric + spaces
- **Token Symbol**: 2-10 characters, uppercase letters/numbers
- **Description**: Optional, max 500 characters
- **Image**: Optional, max 5MB (JPG, PNG, GIF, WebP)
- **Social Links**: Optional URL validation

### 2. Image Upload
- Drag-and-drop interface
- Real-time preview
- Automatic R2 upload
- Error handling and retry logic

### 3. Server-Side Processing
- Input sanitization and validation
- Image upload to Cloudflare R2
- Smart contract integration (ready for implementation)
- Transaction handling and error management

### 4. Success Flow
- Redirect to token detail page
- Display contract address
- Show token economics
- Explain next steps

## 🔐 Security Features

### Input Validation
- Server-side sanitization of all inputs
- XSS protection through content filtering
- URL validation for social links
- File type and size validation for images

### Anti-Rug Protection
- Immediate ownership renouncement
- No post-creation minting capability
- LP token burning on graduation
- Immutable smart contracts

### Rate Limiting
- Form submission throttling
- Image upload size limits
- Error handling for failed uploads

## 🚀 Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy with automatic builds on push

### Environment Variables for Production

```env
NODE_ENV=production
NEXT_PUBLIC_ENVIRONMENT=production
# ... other variables from .env.example
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] Form validation works for all fields
- [ ] Image upload and preview functionality
- [ ] Error handling for invalid inputs
- [ ] Success flow and redirection
- [ ] Mobile responsiveness
- [ ] Accessibility compliance

### Test Token Launch

1. Navigate to `/launch`
2. Fill out the form with test data
3. Upload a test image
4. Submit the form
5. Verify redirection to token page
6. Check that all data is displayed correctly

## 🔗 Integration Points

### Smart Contract Integration

The token launch actions are ready for smart contract integration:

```typescript
// In src/app/actions/token-actions.ts
// TODO: Implement actual blockchain integration
async function createTokenOnBlockchain(tokenData: TokenLaunchForm): Promise<string> {
  // 1. Connect to wallet
  // 2. Call CoinFactory.createCoin() with 1 CORE fee
  // 3. Wait for transaction confirmation
  // 4. Return token address
}
```

### Wallet Integration

Ready for wallet connection libraries:
- MetaMask integration
- WalletConnect support
- Core Chain network switching

### Subgraph Integration

Prepared for GraphQL data fetching:
- Token creation events
- Trading activity
- Price history
- Holder information

## 📚 Business Rules Implementation

The implementation follows all CorePump business rules:

- **Creation Fee**: 1 CORE (non-refundable)
- **Total Supply**: Fixed 1,000,000,000 tokens
- **Distribution**: 80% bonding curve, 20% reserved
- **Purchase Limit**: 4% maximum per wallet
- **Graduation**: Automatic at $50K market cap
- **Anti-Rug**: Ownership renounced, LP burned

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the coding standards in `docs/CODING_RULES.md`
4. Test your changes thoroughly
5. Submit a pull request

## 📄 License

This project is part of the CorePump ecosystem. See LICENSE file for details.

## 🆘 Support

For technical support or questions:
- Check the documentation in the `docs/` folder
- Review the component implementation guide
- Open an issue on GitHub

---

**Built with ❤️ for the Core Chain ecosystem**
