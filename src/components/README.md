# CorePump Design System Components

A comprehensive collection of reusable React components built for the CorePump DeFi platform using Next.js 13+, React 19, Tailwind CSS, and react-icons.

## 🚀 Quick Start

```tsx
import { Button, Card, TokenCard, WalletConnectButton } from '@/components';

function MyComponent() {
  return (
    <Card>
      <Button variant="primary">Launch Token</Button>
      <WalletConnectButton onConnect={() => console.log('Connect wallet')} />
    </Card>
  );
}
```

## 📦 Available Components

### UI Components

#### Button
Versatile button component with multiple variants, sizes, and states.

```tsx
import { Button } from '@/components';
import { FiPlus } from 'react-icons/fi';

<Button variant="primary" size="lg" icon={FiPlus} loading={false}>
  Launch Token
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'ghost' | 'danger'
- `size`: 'sm' | 'md' | 'lg' | 'xl'
- `loading`: boolean
- `icon`: IconType from react-icons
- `iconPosition`: 'left' | 'right'
- `fullWidth`: boolean

#### IconButton
Icon-only button for compact interfaces.

```tsx
import { IconButton } from '@/components';
import { FiSettings } from 'react-icons/fi';

<IconButton 
  icon={FiSettings} 
  variant="ghost" 
  size="md"
  aria-label="Settings"
/>
```

**Props:**
- `icon`: IconType (required)
- `variant`: 'primary' | 'secondary' | 'ghost' | 'danger'
- `size`: 'sm' | 'md' | 'lg'
- `aria-label`: string (required for accessibility)

#### Input
Form input with label, validation, and icon support.

```tsx
import { Input } from '@/components';
import { FiSearch } from 'react-icons/fi';

<Input
  label="Token Name"
  placeholder="Enter token name..."
  leftIcon={FiSearch}
  error="This field is required"
  helperText="Choose a unique name"
/>
```

**Props:**
- `label`: string
- `error`: string
- `helperText`: string
- `leftIcon`: IconType
- `rightIcon`: IconType
- `onRightIconClick`: () => void
- `variant`: 'default' | 'error' | 'success'
- `fullWidth`: boolean

#### Card
Flexible container component with multiple variants.

```tsx
import { Card } from '@/components';

<Card variant="elevated" padding="lg" hover>
  <h3>Token Information</h3>
  <p>Details about the token...</p>
</Card>
```

**Props:**
- `variant`: 'default' | 'elevated' | 'outlined' | 'ghost'
- `padding`: 'none' | 'sm' | 'md' | 'lg'
- `hover`: boolean

#### Alert
Status and notification messages with dismissible option.

```tsx
import { Alert } from '@/components';

<Alert
  variant="success"
  title="Transaction Successful"
  description="Your token has been launched!"
  dismissible
  onDismiss={() => console.log('Dismissed')}
/>
```

**Props:**
- `variant`: 'success' | 'warning' | 'error' | 'info'
- `title`: string
- `description`: string
- `dismissible`: boolean
- `onDismiss`: () => void
- `icon`: IconType (optional custom icon)

#### LoadingSpinner
Loading indicators with multiple sizes and colors.

```tsx
import { LoadingSpinner } from '@/components';

<LoadingSpinner 
  size="lg" 
  color="primary" 
  text="Loading tokens..." 
/>
```

**Props:**
- `size`: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
- `color`: 'primary' | 'secondary' | 'current'
- `text`: string

### DeFi Components

#### WalletConnectButton
Specialized wallet connection component with balance display.

```tsx
import { WalletConnectButton } from '@/components';

<WalletConnectButton
  isConnected={false}
  address="0x1234...5678"
  balance="12.5432"
  onConnect={() => connectWallet()}
  onDisconnect={() => disconnectWallet()}
  onCopyAddress={() => copyToClipboard()}
  loading={false}
/>
```

**Props:**
- `isConnected`: boolean
- `address`: string
- `balance`: string
- `onConnect`: () => void
- `onDisconnect`: () => void
- `onCopyAddress`: () => void
- `loading`: boolean

#### TokenCard
Display token information with price, stats, and graduation progress.

```tsx
import { TokenCard } from '@/components';

const token = {
  id: '0x...',
  name: 'PumpCoin',
  symbol: 'PUMP',
  description: 'The ultimate meme token...',
  image: 'https://...',
  creator: '0x...',
  currentPrice: '0.0045',
  totalCoreRaised: '25000',
  tokensSold: '500000000',
  graduated: false,
  createdAt: '1704067200'
};

<TokenCard
  token={token}
  priceChange={12.5}
  onClick={() => navigateToToken(token.id)}
/>
```

**Props:**
- `token`: TokenData object (required)
- `priceChange`: number (percentage change)
- `onClick`: () => void
- `className`: string

## 🎨 Design System Integration

### Color Palette
The components use the CorePump design system colors:

- **Primary**: Core Orange (#FF6B35) to Bitcoin Gold (#F7931A) gradient
- **Success**: #00FF88 (gains/profits)
- **Warning**: #FFB800 (caution)
- **Error**: #FF3B30 (losses/danger)
- **Info**: #00D4FF (neutral information)

### Typography
- **Font Family**: Inter for UI text, JetBrains Mono for addresses/numbers
- **Responsive**: Mobile-first approach with consistent scaling

### Spacing
- **Base Unit**: 8px spacing system
- **Consistent**: All components follow the same spacing patterns

## 🔧 Customization

### CSS Custom Properties
Components use CSS custom properties for easy theming:

```css
:root {
  --core-orange-500: #FF6B35;
  --bitcoin-gold-500: #F7931A;
  --success-500: #00FF88;
  /* ... other colors */
}
```

### Tailwind Configuration
Extend your Tailwind config to include CorePump colors:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'core-orange': {
          500: '#FF6B35',
          // ... other shades
        },
        'bitcoin-gold': {
          500: '#F7931A',
          // ... other shades
        },
      },
    },
  },
};
```

## ♿ Accessibility

All components are built with accessibility in mind:

- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Proper ARIA labels and descriptions
- **Focus Management**: Visible focus indicators
- **Color Contrast**: WCAG 2.1 AA compliant
- **Touch Targets**: Minimum 44px touch targets on mobile

## 📱 Responsive Design

Components are mobile-first and responsive:

- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Flexible**: Adapts to different screen sizes
- **Touch-Friendly**: Optimized for mobile interactions

## 🧪 Testing

### Component Testing
```tsx
import { render, screen } from '@testing-library/react';
import { Button } from '@/components';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
```

### Accessibility Testing
```tsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('should not have accessibility violations', async () => {
  const { container } = render(<Button>Accessible Button</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## 📚 Examples

### Token Launch Form
```tsx
import { Card, Input, Button, Alert } from '@/components';

function TokenLaunchForm() {
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    description: ''
  });

  return (
    <Card variant="elevated" padding="lg">
      <h2 className="text-2xl font-semibold mb-6">Launch Your Token</h2>
      
      <div className="space-y-4">
        <Input
          label="Token Name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          placeholder="Enter token name..."
        />
        
        <Input
          label="Token Symbol"
          value={formData.symbol}
          onChange={(e) => setFormData({...formData, symbol: e.target.value})}
          placeholder="e.g., PUMP"
        />
        
        <Alert
          variant="info"
          title="Fair Launch"
          description="All tokens launch with anti-rug protection and 4% max purchase limits."
        />
        
        <Button variant="primary" fullWidth>
          Launch Token (1 CORE)
        </Button>
      </div>
    </Card>
  );
}
```

### Trading Dashboard
```tsx
import { Card, TokenCard, WalletConnectButton, LoadingSpinner } from '@/components';

function TradingDashboard({ tokens, loading }) {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Trading Dashboard</h1>
        <WalletConnectButton />
      </div>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" text="Loading tokens..." />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tokens.map(token => (
            <TokenCard
              key={token.id}
              token={token}
              onClick={() => navigateToToken(token.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
```

## 🔄 Updates & Versioning

Components follow semantic versioning:
- **Major**: Breaking changes
- **Minor**: New features, backward compatible
- **Patch**: Bug fixes, improvements

## 📞 Support

For questions or issues:
1. Check the component documentation
2. Review the design system guide
3. Create an issue in the repository
4. Join the CorePump developer community

---

**Built with ❤️ for the CorePump ecosystem**
