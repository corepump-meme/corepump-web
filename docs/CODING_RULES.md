# CorePump Coding Rules & Standards

*Comprehensive development guidelines for the CorePump DeFi token launchpad platform*

---

## Table of Contents

1. [Project Architecture & Structure](#project-architecture--structure)
2. [Next.js App Router Patterns](#nextjs-app-router-patterns)
3. [GraphQL Conventions](#graphql-conventions)
4. [TypeScript Standards](#typescript-standards)
5. [React Component Guidelines](#react-component-guidelines)
6. [Design System Compliance](#design-system-compliance)
7. [DeFi-Specific Rules](#defi-specific-rules)
8. [Security & Best Practices](#security--best-practices)
9. [Performance & Optimization](#performance--optimization)
10. [Testing Standards](#testing-standards)
11. [Code Quality & Linting](#code-quality--linting)

---

## Project Architecture & Structure

### File Organization

#### Directory Structure
```
src/
├── app/                          # Next.js App Router
│   ├── (routes)/                 # Route groups
│   │   ├── tokens/
│   │   ├── launch/
│   │   └── portfolio/
│   ├── actions/                  # Server Actions (NO API routes)
│   │   ├── token-actions.ts
│   │   ├── trade-actions.ts
│   │   └── wallet-actions.ts
│   ├── components/               # App-specific components
│   └── globals.css
├── components/                   # Reusable components
│   ├── ui/                       # Base UI components
│   ├── defi/                     # DeFi-specific components
│   └── index.ts                  # Barrel exports
├── lib/                          # Utilities & configurations
│   ├── apollo-client.ts          # GraphQL client
│   ├── wagmi.ts                  # Wallet configuration
│   ├── utils.ts                  # General utilities
│   └── constants.ts              # Platform constants
├── queries/                      # GraphQL queries & fragments
│   ├── fragments/
│   ├── tokens.ts
│   ├── trades.ts
│   └── platform.ts
├── types/                        # TypeScript type definitions
│   ├── graphql.ts                # Generated GraphQL types
│   ├── token.ts                  # Token-related types
│   └── platform.ts               # Platform types
└── hooks/                        # Custom React hooks
    ├── useTokenData.ts
    ├── useWallet.ts
    └── useGraphQL.ts
```

#### Naming Conventions

**Files & Directories:**
- Use kebab-case for directories: `token-details/`, `wallet-connect/`
- Use PascalCase for React components: `TokenCard.tsx`, `WalletButton.tsx`
- Use camelCase for utilities: `formatPrice.ts`, `validateInput.ts`
- Use UPPER_SNAKE_CASE for constants: `PLATFORM_CONSTANTS.ts`

**Components:**
- Component files: `ComponentName.tsx`
- Index files: `index.ts` (for barrel exports)
- Test files: `ComponentName.test.tsx`
- Story files: `ComponentName.stories.tsx`

**Import Rules:**
- **ABSOLUTE IMPORTS ONLY**: All imports must use `@/` alias paths
- **NO RELATIVE IMPORTS**: Never use `./`, `../`, or relative paths
- **Barrel Exports**: Import from index files using absolute paths
- **Consistent Ordering**: Follow the 4-category import order system

### Import/Export Standards

#### Barrel Exports
```typescript
// ✅ Good: components/index.ts
export { Button } from './ui/Button';
export { TokenCard } from './defi/TokenCard';
export { WalletConnectButton } from './defi/WalletConnectButton';

// ✅ Good: Import from barrel
import { Button, TokenCard, WalletConnectButton } from '@/components';
```

#### Import Order
```typescript
// ✅ Good: Consistent import order (NO RELATIVE IMPORTS)
// 1. React & Next.js
import React from 'react';
import { Suspense } from 'react';
import Link from 'next/link';

// 2. Third-party libraries
import { useQuery } from '@apollo/client';
import { formatEther } from 'ethers';

// 3. Internal utilities & types
import { formatPrice, validateAddress } from '@/lib/utils';
import { Token, Trade } from '@/types';

// 4. Internal components
import { Button, Card, TokenCard } from '@/components';

// Note: All imports must use absolute paths with @/ alias
// ❌ NEVER use relative imports like './styles.css' or '../utils'
```

#### Path Aliases
```typescript
// tsconfig.json paths
{
  "paths": {
    "@/*": ["./src/*"],
    "@/components/*": ["./src/components/*"],
    "@/lib/*": ["./src/lib/*"],
    "@/queries/*": ["./src/queries/*"],
    "@/types/*": ["./src/types/*"],
    "@/hooks/*": ["./src/hooks/*"]
  }
}
```

---

## Next.js App Router Patterns

### Server Components First

#### Data Fetching in Server Components
```typescript
// ✅ Good: Server component with GraphQL data fetching
// app/tokens/page.tsx
import { apolloClient } from '@/lib/apollo-client';
import { GET_TOKENS } from '@/queries/tokens';
import { TokenList } from '@/components/TokenList';

export default async function TokensPage() {
  // Fetch data in server component
  const { data } = await apolloClient.query({
    query: GET_TOKENS,
    variables: {
      first: 20,
      orderBy: 'createdAt',
      orderDirection: 'desc'
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Discover Tokens</h1>
      <TokenList initialTokens={data.tokens} />
    </div>
  );
}
```

#### Client Components for Interactivity
```typescript
// ✅ Good: Client component for interactive features
'use client';

import { useState, useTransition } from 'react';
import { Token } from '@/types';
import { TokenCard } from '@/components';

interface TokenListProps {
  initialTokens: Token[];
}

export function TokenList({ initialTokens }: TokenListProps) {
  const [tokens, setTokens] = useState(initialTokens);
  const [isPending, startTransition] = useTransition();

  const loadMore = () => {
    startTransition(async () => {
      // Client-side data fetching for pagination
      const response = await fetch('/api/tokens?skip=' + tokens.length);
      const newTokens = await response.json();
      setTokens(prev => [...prev, ...newTokens]);
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tokens.map(token => (
          <TokenCard key={token.id} token={token} />
        ))}
      </div>
      
      <button 
        onClick={loadMore}
        disabled={isPending}
        className="btn-primary"
      >
        {isPending ? 'Loading...' : 'Load More'}
      </button>
    </div>
  );
}
```

### Server Actions (NO API Routes)

#### Form Handling with Server Actions
```typescript
// ✅ Good: Server action for token launch
// app/actions/token-actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { apolloClient } from '@/lib/apollo-client';
import { CREATE_TOKEN_MUTATION } from '@/queries/tokens';

export async function launchToken(formData: FormData) {
  const name = formData.get('name') as string;
  const symbol = formData.get('symbol') as string;
  const description = formData.get('description') as string;

  // Validate input
  if (!name || !symbol) {
    throw new Error('Name and symbol are required');
  }

  try {
    // Execute GraphQL mutation
    const { data } = await apolloClient.mutate({
      mutation: CREATE_TOKEN_MUTATION,
      variables: { name, symbol, description }
    });

    // Revalidate relevant pages
    revalidatePath('/tokens');
    revalidatePath('/portfolio');

    // Redirect to token page
    redirect(`/token/${data.createToken.id}`);
  } catch (error) {
    throw new Error('Failed to launch token');
  }
}
```

#### Using Server Actions in Components
```typescript
// ✅ Good: Form with server action
// app/launch/page.tsx
import { launchToken } from '@/app/actions/token-actions';
import { Button, Input, Card } from '@/components';

export default function LaunchPage() {
  return (
    <Card className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Launch Your Token</h2>
      
      <form action={launchToken} className="space-y-4">
        <Input
          name="name"
          label="Token Name"
          placeholder="Enter token name..."
          required
        />
        
        <Input
          name="symbol"
          label="Token Symbol"
          placeholder="e.g., PUMP"
          required
        />
        
        <textarea
          name="description"
          className="input"
          placeholder="Describe your token..."
          rows={3}
        />
        
        <Button type="submit" variant="primary" fullWidth>
          Launch Token (1 CORE)
        </Button>
      </form>
    </Card>
  );
}
```

#### Server Actions with Client State
```typescript
// ✅ Good: Server action with client-side state management
'use client';

import { useFormStatus } from 'react-dom';
import { useFormState } from 'react-dom';
import { launchToken } from '@/app/actions/token-actions';

const initialState = {
  message: '',
  errors: {},
};

export function LaunchTokenForm() {
  const [state, formAction] = useFormState(launchToken, initialState);
  
  return (
    <form action={formAction}>
      {/* Form fields */}
      <SubmitButton />
      {state.message && (
        <div className="alert alert-error">{state.message}</div>
      )}
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <Button 
      type="submit" 
      loading={pending}
      disabled={pending}
    >
      {pending ? 'Launching...' : 'Launch Token'}
    </Button>
  );
}
```

### Data Revalidation Patterns

#### Strategic Revalidation
```typescript
// ✅ Good: Targeted revalidation
'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

export async function buyTokens(tokenId: string, amount: string) {
  try {
    // Execute trade
    await executeTradeTransaction(tokenId, amount);

    // Revalidate specific paths
    revalidatePath(`/token/${tokenId}`);
    revalidatePath('/portfolio');
    
    // Revalidate by tags
    revalidateTag('token-data');
    revalidateTag(`token-${tokenId}`);
    
  } catch (error) {
    throw new Error('Trade failed');
  }
}
```

---

## GraphQL Conventions

### Query Organization

#### File Structure
```
queries/
├── fragments/
│   ├── token-fragments.ts        # Token-related fragments
│   ├── trade-fragments.ts        # Trade-related fragments
│   └── platform-fragments.ts     # Platform-related fragments
├── tokens.ts                     # Token queries & mutations
├── trades.ts                     # Trade queries & mutations
├── platform.ts                   # Platform queries
└── index.ts                      # Export all queries
```

#### Fragment Patterns
```typescript
// ✅ Good: Reusable fragments
// queries/fragments/token-fragments.ts
import { gql } from '@apollo/client';

export const TOKEN_CORE_FRAGMENT = gql`
  fragment TokenCore on Token {
    id
    name
    symbol
    description
    image
    creator
    createdAt
  }
`;

export const TOKEN_PRICE_FRAGMENT = gql`
  fragment TokenPrice on Token {
    currentPrice
    totalCoreRaised
    tokensSold
    graduated
    graduationTimestamp
  }
`;

export const TOKEN_FULL_FRAGMENT = gql`
  fragment TokenFull on Token {
    ...TokenCore
    ...TokenPrice
    website
    telegram
    twitter
    bondingCurve
    totalSupply
    basePrice
    updatedAt
  }
  ${TOKEN_CORE_FRAGMENT}
  ${TOKEN_PRICE_FRAGMENT}
`;
```

#### Query Naming Conventions
```typescript
// ✅ Good: Consistent query naming
// queries/tokens.ts
import { gql } from '@apollo/client';
import { TOKEN_FULL_FRAGMENT, TOKEN_CORE_FRAGMENT } from './fragments/token-fragments';

// Query naming: GET_[ENTITY]_[PURPOSE]
export const GET_TOKENS_LIST = gql`
  query GetTokensList($first: Int!, $skip: Int!, $orderBy: String!, $orderDirection: String!) {
    tokens(
      first: $first
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      ...TokenCore
      ...TokenPrice
      trades(first: 1, orderBy: timestamp, orderDirection: desc) {
        timestamp
        price
      }
    }
  }
  ${TOKEN_CORE_FRAGMENT}
  ${TOKEN_PRICE_FRAGMENT}
`;

export const GET_TOKEN_DETAILS = gql`
  query GetTokenDetails($tokenId: String!) {
    token(id: $tokenId) {
      ...TokenFull
      holders(first: 10, orderBy: balance, orderDirection: desc) {
        holder
        balance
        totalPurchased
      }
    }
  }
  ${TOKEN_FULL_FRAGMENT}
`;

// Mutation naming: [ACTION]_[ENTITY]
export const CREATE_TOKEN_MUTATION = gql`
  mutation CreateToken($name: String!, $symbol: String!, $description: String) {
    createToken(name: $name, symbol: $symbol, description: $description) {
      ...TokenFull
    }
  }
  ${TOKEN_FULL_FRAGMENT}
`;
```

### Apollo Client Configuration

#### Client Setup with Caching
```typescript
// ✅ Good: Apollo Client configuration
// lib/apollo-client.ts
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: process.env.NODE_ENV === 'production' 
    ? process.env.NEXT_PUBLIC_SUBGRAPH_URL_MAINNET
    : process.env.NEXT_PUBLIC_SUBGRAPH_URL_TESTNET,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      // Add any required headers
    }
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          tokens: {
            keyArgs: ['orderBy', 'orderDirection', 'where'],
            merge(existing = [], incoming, { args }) {
              const { skip = 0 } = args || {};
              const merged = existing ? existing.slice() : [];
              for (let i = 0; i < incoming.length; ++i) {
                merged[skip + i] = incoming[i];
              }
              return merged;
            },
          },
        },
      },
      Token: {
        fields: {
          trades: {
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
          holders: {
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
});
```

### Real-time Updates Strategy

#### Polling Patterns
```typescript
// ✅ Good: Smart polling strategy
// hooks/useTokenData.ts
'use client';

import { useQuery } from '@apollo/client';
import { useEffect, useRef } from 'react';
import { GET_TOKEN_DETAILS } from '@/queries/tokens';

export function useTokenData(tokenId: string) {
  const intervalRef = useRef<NodeJS.Timeout>();
  
  const { data, loading, error, startPolling, stopPolling } = useQuery(
    GET_TOKEN_DETAILS,
    {
      variables: { tokenId },
      pollInterval: 0, // Start with no polling
      notifyOnNetworkStatusChange: true,
    }
  );

  useEffect(() => {
    // Start polling when component mounts
    startPolling(5000); // 5 seconds for active trading

    // Pause polling when tab is not visible
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopPolling();
      } else {
        startPolling(5000);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      stopPolling();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [startPolling, stopPolling]);

  return {
    token: data?.token,
    loading,
    error,
  };
}
```

#### Conditional Polling
```typescript
// ✅ Good: Conditional polling based on token state
export function useTokenPrice(tokenId: string) {
  const { data, startPolling, stopPolling } = useQuery(GET_TOKEN_DETAILS, {
    variables: { tokenId },
  });

  const token = data?.token;
  const isActive = token && !token.graduated;

  useEffect(() => {
    if (isActive) {
      // Active tokens need frequent updates
      startPolling(3000);
    } else {
      // Graduated tokens need less frequent updates
      startPolling(30000);
    }

    return () => stopPolling();
  }, [isActive, startPolling, stopPolling]);

  return token;
}
```

### Error Handling

#### GraphQL Error Management
```typescript
// ✅ Good: Comprehensive error handling
// lib/graphql-errors.ts
import { ApolloError } from '@apollo/client';

export interface GraphQLErrorInfo {
  message: string;
  type: 'network' | 'graphql' | 'unknown';
  retryable: boolean;
}

export function handleGraphQLError(error: ApolloError): GraphQLErrorInfo {
  // Network errors
  if (error.networkError) {
    console.error('Network error:', error.networkError);
    return {
      message: 'Network connection failed. Please check your internet connection.',
      type: 'network',
      retryable: true,
    };
  }

  // GraphQL errors
  if (error.graphQLErrors?.length > 0) {
    const graphQLError = error.graphQLErrors[0];
    console.error('GraphQL error:', graphQLError);
    
    return {
      message: graphQLError.message || 'Failed to fetch data from the blockchain.',
      type: 'graphql',
      retryable: false,
    };
  }

  // Unknown errors
  return {
    message: 'An unexpected error occurred. Please try again.',
    type: 'unknown',
    retryable: true,
  };
}
```

#### Error Boundary for GraphQL
```typescript
// ✅ Good: GraphQL-aware error boundary
'use client';

import React from 'react';
import { ApolloError } from '@apollo/client';
import { handleGraphQLError } from '@/lib/graphql-errors';
import { Alert } from '@/components';

interface GraphQLErrorBoundaryState {
  hasError: boolean;
  error: GraphQLErrorInfo | null;
}

export class GraphQLErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  GraphQLErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): GraphQLErrorBoundaryState {
    if (error instanceof ApolloError) {
      return {
        hasError: true,
        error: handleGraphQLError(error),
      };
    }

    return {
      hasError: true,
      error: {
        message: 'An unexpected error occurred.',
        type: 'unknown',
        retryable: true,
      },
    };
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <Alert
          variant="error"
          title="Data Loading Error"
          description={this.state.error.message}
          dismissible={this.state.error.retryable}
          onDismiss={() => this.setState({ hasError: false, error: null })}
        />
      );
    }

    return this.props.children;
  }
}
```

---

## TypeScript Standards

### Type Definitions

#### GraphQL Generated Types
```typescript
// ✅ Good: Generated GraphQL types
// types/graphql.ts (auto-generated)
export interface Token {
  __typename?: 'Token';
  id: string;
  name: string;
  symbol: string;
  description?: string | null;
  image?: string | null;
  website?: string | null;
  telegram?: string | null;
  twitter?: string | null;
  creator: string;
  bondingCurve: string;
  totalSupply: string;
  totalCoreRaised: string;
  tokensSold: string;
  currentPrice: string;
  basePrice: string;
  graduated: boolean;
  graduationTimestamp?: string | null;
  createdAt: string;
  updatedAt: string;
  trades: Trade[];
  holders: TokenHolder[];
  ohlcData: TokenOHLC[];
}

export interface Trade {
  __typename?: 'Trade';
  id: string;
  token: Token;
  trader: string;
  bondingCurve: string;
  isBuy: boolean;
  coreAmount: string;
  tokenAmount: string;
  price: string;
  fee: string;
  timestamp: string;
  blockNumber: string;
  transactionHash: string;
}
```

#### Custom Type Extensions
```typescript
// ✅ Good: Extended types for UI
// types/token.ts
import { Token as GraphQLToken, Trade as GraphQLTrade } from './graphql';

// Extended token type with computed properties
export interface TokenWithMetrics extends GraphQLToken {
  // Computed fields
  priceChange24h?: number;
  volume24h?: string;
  marketCap?: string;
  progressToGraduation?: number;
  
  // UI state
  isLoading?: boolean;
  hasError?: boolean;
}

// Form types
export interface TokenLaunchForm {
  name: string;
  symbol: string;
  description: string;
  image?: File;
  website?: string;
  telegram?: string;
  twitter?: string;
}

// Trading types
export interface TradeForm {
  tokenId: string;
  amount: string;
  isBuy: boolean;
  slippage: number;
}

export interface TradePreview {
  inputAmount: string;
  outputAmount: string;
  priceImpact: number;
  platformFee: string;
  minimumReceived: string;
}
```

#### Utility Types
```typescript
// ✅ Good: Utility types for common patterns
// types/utils.ts

// BigInt string handling
export type BigIntString = string;

// Wallet address type
export type Address = `0x${string}`;

// Timestamp type
export type Timestamp = BigIntString;

// API response wrapper
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
  timestamp: number;
}

// Pagination types
export interface PaginationParams {
  first: number;
  skip: number;
  orderBy: string;
  orderDirection: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  items: T[];
  hasMore: boolean;
  total: number;
}

// Form state types
export interface FormState<T> {
  data: T;
  errors: Partial<Record<keyof T, string>>;
  isSubmitting: boolean;
  isValid: boolean;
}
```

### Interface Conventions

#### Component Props
```typescript
// ✅ Good: Component prop interfaces
interface TokenCardProps {
  token: TokenWithMetrics;
  onClick?: (token: TokenWithMetrics) => void;
  showMetrics?: boolean;
  className?: string;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  icon?: IconType;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  children: React.ReactNode;
}
```

#### Hook Return Types
```typescript
// ✅ Good: Hook return type interfaces
interface UseTokenDataReturn {
  token: TokenWithMetrics | null;
  loading: boolean;
  error: GraphQLErrorInfo | null;
  refetch: () => Promise<void>;
}

interface UseWalletReturn {
  address: Address | null;
  isConnected: boolean;
  balance: string;
  connect: () => Promise<void>;
  disconnect: () => void;
  error: string | null;
}
```

### Generic Types

#### Generic Component Patterns
```typescript
// ✅ Good: Generic components
interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  onRowClick?: (item: T) => void;
}

export function DataTable<T>({ 
  data, 
  columns, 
  loading, 
  onRowClick 
}: DataTableProps<T>) {
  // Implementation
}

// Usage
<DataTable<Token>
  data={tokens}
  columns={tokenColumns}
  onRowClick={(token) => navigate(`/token/${token.id}`)}
/>
```

#### Generic Hook Patterns
```typescript
// ✅ Good: Generic hooks
function useFormState<T>(
  initialData: T,
  validationSchema?: ValidationSchema<T>
): FormState<T> {
  const [data, setData] = useState<T>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Implementation

  return {
    data,
    errors,
    isSubmitting,
    isValid: Object.keys(errors).length === 0,
  };
}
```

---

## React Component Guidelines

### Component Structure

#### Component File Template
```typescript
// ✅ Good: Standard component structure
'use client'; // Only if client-side features needed

import React from 'react';
import { IconType } from 'react-icons';
import { cn } from '@/lib/utils';

// Types
export interface ComponentNameProps {
  // Props definition
  variant?: 'default' | 'primary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

// Component
const ComponentName = React.forwardRef<
  HTMLDivElement,
  ComponentNameProps
>(({ 
  variant = 'default',
  size = 'md',
  children,
  className,
  ...props 
}, ref) => {
  // Hooks
  const [state, setState] = useState();

  // Computed values
  const classes = cn(
    'base-classes',
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  // Event handlers
  const handleClick = () => {
    // Handler logic
  };

  // Effects
  useEffect(() => {
    // Effect logic
  }, []);

  // Render
  return (
    <div
      ref={ref}
      className={classes}
      {...props}
    >
      {children}
    </div>
  );
});

ComponentName.displayName = 'ComponentName';

export default ComponentName;
```

#### Component Composition
```typescript
// ✅ Good: Compound component pattern
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className }: CardProps) => (
  <div className={cn('card-base', className)}>
    {children}
  </div>
);

const CardHeader = ({ children, className }: CardHeaderProps) => (
  <div className={cn('card-header', className)}>
    {children}
  </div>
);

const CardContent = ({ children, className }: CardContentProps) => (
  <div className={cn('card-content', className)}>
    {children}
  </div>
);

// Compound component
Card.Header = CardHeader;
Card.Content = CardContent;

export { Card };

// Usage
<Card>
  <Card.Header>
    <h3>Token Details</h3>
  </Card.Header>
  <Card.Content>
    <p>Token information...</p>
  </Card.Content>
</Card>
```

### Hook Patterns

#### Custom Hook Structure
```typescript
// ✅ Good: Custom hook pattern
// hooks/useTokenData.ts
import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_TOKEN_DETAILS } from '@/queries/tokens';
import { TokenWithMetrics } from '@/types/token';

export function useTokenData(tokenId: string): UseTokenDataReturn {
  const [metrics, setMetrics] = useState<TokenMetrics | null>(null);

  const { data, loading, error, refetch } = useQuery(GET_TOKEN_DETAILS, {
    variables: { tokenId },
    skip: !tokenId,
  });

  // Compute metrics
  useEffect(() => {
    if (data?.token) {
      const computedMetrics = computeTokenMetrics(data.token);
      setMetrics(computedMetrics);
    }
  }, [data]);

  // Combine GraphQL data with computed metrics
  const tokenWithMetrics: TokenWithMetrics | null = data?.token ? {
    ...data.token,
    ...metrics,
  } : null;

  return {
    token: tokenWithMetrics,
    loading,
    error: error ? handleGraphQLError(error) : null,
    refetch: async () => {
      await refetch();
    },
  };
}
```

#### Hook Composition
```typescript
// ✅ Good: Composing hooks
export function useTokenTrading(tokenId: string) {
  const { token, loading: tokenLoading } = useTokenData(tokenId);
  const { address, isConnected } = useWallet();
  const [tradeForm, setTradeForm] = useFormState<TradeForm>({
    tokenId,
    amount: '',
    isBuy: true,
    slippage: 1,
  });

  const canTrade = isConnected && token && !token.graduated;

  const executeTrade = async () => {
    if (!canTrade) return;
    
    try {
      await executeTradeAction(tradeForm.data);
    } catch (error) {
      console.error('Trade failed:', error);
    }
  };

  return {
    token,
    tradeForm,
    canTrade,
    executeTrade,
    loading: tokenLoading,
  };
}
```

### State Management

#### Local State Patterns
```typescript
// ✅ Good: Structured state management
interface TokenPageState {
  selectedTab: 'chart' | 'trades' | 'holders';
  chartInterval: '1h' | '1d' | '1w';
  tradeAmount: string;
  showTradeModal: boolean;
}

export function TokenPage({ tokenId }: { tokenId: string }) {
  const [state, setState] = useState<TokenPageState>({
    selectedTab: 'chart',
    chartInterval: '1h',
    tradeAmount: '',
    showTradeModal: false,
  });

  const updateState = (updates: Partial<TokenPageState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  return (
    <div>
      {/* Component implementation */}
    </div>
  );
}
```

#### Context Patterns
```typescript
// ✅ Good: Context for shared state
// contexts/WalletContext.tsx
'use client';

import React, { createContext, useContext, useReducer } from 'react';

interface WalletState {
  address: Address | null;
  isConnected: boolean;
  balance: string;
  chainId: number;
}

interface WalletContextType extends WalletState {
  connect: () => Promise<void>;
  disconnect: () => void;
  switchChain: (chainId: number) => Promise<void>;
}

const WalletContext = createContext<WalletContextType | null>(null);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(walletReducer, initialState);

  const contextValue: WalletContextType = {
    ...state,
    connect: async () => {
      // Implementation
    },
    disconnect: () => {
      // Implementation
    },
    switchChain: async (chainId: number) => {
      // Implementation
    },
  };

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
}
```

---

## Design System Compliance

### Color Usage

#### CorePump Brand Colors
```typescript
// ✅ Good: Using design system colors
const TokenCard = ({ token }: TokenCardProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:border-core-orange-500 transition-colors">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-core-orange-500 to-bitcoin-gold-500 flex items-center justify-center text-white font-semibold">
          {token.symbol.charAt(0)}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{token.name}</h3>
          <p className="text-sm text-gray-600">{token.symbol}</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Price</span>
          <span className="font-mono text-sm font-medium">{formatPrice(token.currentPrice)} CORE</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">24h Change</span>
          <span className={`text-sm font-medium ${
            token.priceChange24h >= 0 ? 'text-success-500' : 'text-error-500'
          }`}>
            {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h?.toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
};
```

#### Semantic Color Usage
```typescript
// ✅ Good: Semantic color patterns
const TradeButton = ({ isBuy, onClick }: { isBuy: boolean; onClick: () => void }) => {
  return (
    <Button
      onClick={onClick}
      className={isBuy 
        ? 'bg-success-500 hover:bg-success-600 text-white' 
        : 'bg-error-500 hover:bg-error-600 text-white'
      }
    >
      {isBuy ? 'Buy' : 'Sell'}
    </Button>
  );
};

const StatusIndicator = ({ status }: { status: 'active' | 'graduated' | 'failed' }) => {
  const statusConfig = {
    active: { color: 'text-info-500', bg: 'bg-info-50', label: 'Active' },
    graduated: { color: 'text-success-500', bg: 'bg-success-50', label: 'Graduated' },
    failed: { color: 'text-error-500', bg: 'bg-error-50', label: 'Failed' },
  };

  const config = statusConfig[status];

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color} ${config.bg}`}>
      {config.label}
    </span>
  );
};
```

### Typography Hierarchy

#### Consistent Typography Usage
```typescript
// ✅ Good: Typography hierarchy
const TokenDetailsPage = ({ token }: { token: Token }) => {
  return (
    <div className="space-y-8">
      {/* H1 - Page Title */}
      <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
        {token.name} ({token.symbol})
      </h1>
      
      {/* H2 - Section Headers */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Trading Information
        </h2>
        
        {/* H3 - Subsection Headers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Price Details
            </h3>
            
            {/* Body text */}
            <div className="space-y-2 text-base text-gray-700">
              <p>Current Price: <span className="font-mono">{formatPrice(token.currentPrice)} CORE</span></p>
              <p>Market Cap: <span className="font-mono">{formatPrice(token.totalCoreRaised)} CORE</span></p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Labels and captions */}
      <div className="text-xs uppercase tracking-wider text-gray-500 font-medium">
        Created {formatDate(token.createdAt)}
      </div>
    </div>
  );
};
```

#### Monospace for Financial Data
```typescript
// ✅ Good: Monospace for addresses and numbers
const WalletAddress = ({ address }: { address: string }) => {
  return (
    <code className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
      {formatAddress(address)}
    </code>
  );
};

const PriceDisplay = ({ price, symbol = 'CORE' }: { price: string; symbol?: string }) => {
  return (
    <span className="font-mono text-lg font-semibold">
      {formatPrice(price)} {symbol}
    </span>
  );
};
```

### Spacing System

#### Consistent Spacing Usage
```typescript
// ✅ Good: Using design system spacing
const TokenCard = () => {
  return (
    <div className="p-6 space-y-4"> {/* Card padding and internal spacing */}
      <div className="flex items-center gap-3"> {/* Element spacing */}
        {/* Content */}
      </div>
      
      <div className="space-y-2"> {/* Tight spacing for related items */}
        {/* Content */}
      </div>
      
      <div className="pt-4 border-t border-gray-200"> {/* Section spacing */}
        {/* Content */}
      </div>
    </div>
  );
};

const TokenGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Grid spacing */}
      {/* Token cards */}
    </div>
  );
};
```

### Component Variants

#### Consistent Variant Implementation
```typescript
// ✅ Good: Following design system variants
const Alert = ({ variant, title, description }: AlertProps) => {
  const variantClasses = {
    success: 'bg-success-50 border-success-500 text-success-900',
    warning: 'bg-warning-50 border-warning-500 text-warning-900',
    error: 'bg-error-50 border-error-500 text-error-900',
    info: 'bg-info-50 border-info-500 text-info-900',
  };

  return (
    <div className={`p-4 rounded-lg border ${variantClasses[variant]}`}>
      <h4 className="font-medium">{title}</h4>
      <p className="text-sm mt-1">{description}</p>
    </div>
  );
};
```

---

## DeFi-Specific Rules

### BigInt Handling

#### Safe BigInt Operations
```typescript
// ✅ Good: Safe BigInt utilities
// lib/bigint-utils.ts
export function safeBigIntOperation<T>(
  operation: () => T,
  fallback: T,
  errorMessage?: string
): T {
  try {
    return operation();
  } catch (error) {
    console.error(errorMessage || 'BigInt operation failed:', error);
    return fallback;
  }
}

export function formatBigIntToFixed(
  value: bigint,
  decimals: number = 18,
  precision: number = 4
): string {
  return safeBigIntOperation(
    () => {
      const divisor = BigInt(10 ** decimals);
      const quotient = value / divisor;
      const remainder = value % divisor;
      
      const remainderStr = remainder.toString().padStart(decimals, '0');
      const decimalPart = remainderStr.slice(0, precision);
      
      return `${quotient}.${decimalPart}`;
    },
    '0.0000',
    'Failed to format BigInt'
  );
}

export function parseToBigInt(value: string, decimals: number = 18): bigint {
  return safeBigIntOperation(
    () => {
      const [whole, decimal = ''] = value.split('.');
      const paddedDecimal = decimal.padEnd(decimals, '0').slice(0, decimals);
      return BigInt(whole + paddedDecimal);
    },
    BigInt(0),
    `Failed to parse "${value}" to BigInt`
  );
}
```

#### Price Calculations
```typescript
// ✅ Good: Bonding curve calculations
// lib/bonding-curve.ts
export function calculateBondingCurvePrice(
  basePrice: bigint,
  tokensSold: bigint,
  totalSupply: bigint
): bigint {
  return safeBigIntOperation(
    () => {
      // Price = basePrice × (1 + tokensSold/totalSupply)²
      const ratio = (tokensSold * BigInt(1e18)) / totalSupply;
      const onePlusRatio = BigInt(1e18) + ratio;
      const squared = (onePlusRatio * onePlusRatio) / BigInt(1e18);
      return (basePrice * squared) / BigInt(1e18);
    },
    basePrice,
    'Failed to calculate bonding curve price'
  );
}

export function calculateTokensForCore(
  coreAmount: bigint,
  currentPrice: bigint,
  platformFeePercent: number = 1
): bigint {
  return safeBigIntOperation(
    () => {
      const feeAmount = (coreAmount * BigInt(platformFeePercent)) / BigInt(100);
      const netCoreAmount = coreAmount - feeAmount;
      return (netCoreAmount * BigInt(1e18)) / currentPrice;
    },
    BigInt(0),
    'Failed to calculate tokens for CORE'
  );
}
```

### Wallet Integration

#### Wallet Connection Patterns
```typescript
// ✅ Good: Wallet integration
// hooks/useWallet.ts
'use client';

import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi';
import { useState, useEffect } from 'react';

export function useWallet() {
  const [error, setError] = useState<string | null>(null);
  
  const { address, isConnected, chainId } = useAccount();
  const { connect, connectors, isPending } = useConnect({
    onError: (error) => {
      setError(error.message);
    },
    onSuccess: () => {
      setError(null);
    },
  });
  
  const { disconnect } = useDisconnect();
  
  const { data: balance } = useBalance({
    address,
    query: {
      enabled: !!address,
    },
  });

  // Check if on correct chain
  const isCorrectChain = chainId === parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '1116');

  const connectWallet = async () => {
    try {
      setError(null);
      const connector = connectors.find(c => c.name === 'MetaMask');
      if (connector) {
        connect({ connector });
      } else {
        setError('MetaMask not found');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return {
    address: address as Address | null,
    isConnected,
    isCorrectChain,
    balance: balance?.formatted || '0',
    error,
    isPending,
    connectWallet,
    disconnect,
  };
}
```

#### Transaction Handling
```typescript
// ✅ Good: Transaction patterns
// hooks/useTransaction.ts
'use client';

import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useState } from 'react';

export function useTransaction() {
  const [txHash, setTxHash] = useState<`0x${string}` | null>(null);
  
  const { writeContract, isPending: isWritePending, error: writeError } = useWriteContract({
    onSuccess: (hash) => {
      setTxHash(hash);
    },
  });

  const { isLoading: isConfirming, isSuccess, error: receiptError } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  const executeTransaction = async (
    address: `0x${string}`,
    abi: any,
    functionName: string,
    args?: any[],
    value?: bigint
  ) => {
    try {
      writeContract({
        address,
        abi,
        functionName,
        args,
        value,
      });
    } catch (error) {
      console.error('Transaction failed:', error);
    }
  };

  return {
    executeTransaction,
    txHash,
    isPending: isWritePending,
    isConfirming,
    isSuccess,
    error: writeError || receiptError,
  };
}
```

### Trading Interface Patterns

#### Trade Form Validation
```typescript
// ✅ Good: Trade validation
// lib/trade-validation.ts
export interface TradeValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateTrade(
  amount: string,
  token: Token,
  userBalance: string,
  isBuy: boolean
): TradeValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Basic validation
  if (!amount || amount === '0') {
    errors.push('Amount must be greater than 0');
  }

  try {
    const amountBigInt = parseToBigInt(amount);
    const balanceBigInt = parseToBigInt(userBalance);

    // Balance check
    if (isBuy && amountBigInt > balanceBigInt) {
      errors.push('Insufficient CORE balance');
    }

    // Max purchase limit (4% of total supply)
    if (isBuy) {
      const maxPurchase = (BigInt(token.totalSupply) * BigInt(4)) / BigInt(100);
      const tokensForAmount = calculateTokensForCore(amountBigInt, BigInt(token.currentPrice));
      
      if (tokensForAmount > maxPurchase) {
        errors.push('Purchase exceeds 4% maximum limit');
      }
    }

    // Graduation check
    if (token.graduated) {
      errors.push('Token has graduated to DEX trading');
    }

    // Price impact warning
    const priceImpact = calculatePriceImpact(amountBigInt, token);
    if (priceImpact > 5) {
      warnings.push(`High price impact: ${priceImpact.toFixed(2)}%`);
    }

  } catch (error) {
    errors.push('Invalid amount format');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}
```

#### Trading Component
```typescript
// ✅ Good: Trading interface
'use client';

import { useState, useEffect } from 'react';
import { Button, Input, Alert } from '@/components';
import { useWallet, useTransaction } from '@/hooks';
import { validateTrade } from '@/lib/trade-validation';

interface TradingInterfaceProps {
  token: Token;
}

export function TradingInterface({ token }: TradingInterfaceProps) {
  const [amount, setAmount] = useState('');
  const [isBuy, setIsBuy] = useState(true);
  const [validation, setValidation] = useState<TradeValidationResult | null>(null);

  const { address, isConnected, balance } = useWallet();
  const { executeTransaction, isPending, isSuccess, error } = useTransaction();

  // Validate trade on amount change
  useEffect(() => {
    if (amount && token) {
      const result = validateTrade(amount, token, balance, isBuy);
      setValidation(result);
    } else {
      setValidation(null);
    }
  }, [amount, token, balance, isBuy]);

  const handleTrade = async () => {
    if (!isConnected || !validation?.isValid) return;

    const amountBigInt = parseToBigInt(amount);

    if (isBuy) {
      await executeTransaction(
        token.bondingCurve as `0x${string}`,
        BONDING_CURVE_ABI,
        'buyTokens',
        [],
        amountBigInt
      );
    } else {
      const tokenAmount = calculateTokensForCore(amountBigInt, BigInt(token.currentPrice));
      await executeTransaction(
        token.bondingCurve as `0x${string}`,
        BONDING_CURVE_ABI,
        'sellTokens',
        [tokenAmount]
      );
    }
  };

  if (token.graduated) {
    return (
      <Alert
        variant="info"
        title="Token Graduated"
        description="This token has graduated to DEX trading. Trade on ArcherSwap or other DEXs."
      />
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex mb-4">
        <button
          onClick={() => setIsBuy(true)}
          className={`flex-1 py-2 px-4 rounded-l-lg font-medium transition-colors ${
            isBuy 
              ? 'bg-success-500 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => setIsBuy(false)}
          className={`flex-1 py-2 px-4 rounded-r-lg font-medium transition-colors ${
            !isBuy 
              ? 'bg-error-500 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Sell
        </button>
      </div>

      <div className="space-y-4">
        <Input
          label={`Amount (CORE)`}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.0"
          type="number"
          step="0.0001"
          min="0"
        />

        {validation?.warnings.map((warning, index) => (
          <Alert
            key={index}
            variant="warning"
            description={warning}
          />
        ))}

        {validation?.errors.map((error, index) => (
          <Alert
            key={index}
            variant="error"
            description={error}
          />
        ))}

        <div className="text-sm text-gray-600 space-y-1">
          <div className="flex justify-between">
            <span>Current Price:</span>
            <span className="font-mono">{formatBigIntToFixed(BigInt(token.currentPrice))} CORE</span>
          </div>
          <div className="flex justify-between">
            <span>Platform Fee:</span>
            <span>1%</span>
          </div>
          {amount && validation?.isValid && (
            <div className="flex justify-between">
              <span>You {isBuy ? 'receive' : 'pay'}:</span>
              <span className="font-mono">
                {formatBigIntToFixed(
                  calculateTokensForCore(parseToBigInt(amount), BigInt(token.currentPrice))
                )} {token.symbol}
              </span>
            </div>
          )}
        </div>

        <Button
          onClick={handleTrade}
          disabled={!isConnected || !validation?.isValid || isPending}
          loading={isPending}
          variant="primary"
          fullWidth
        >
          {!isConnected 
            ? 'Connect Wallet' 
            : isPending 
            ? 'Processing...' 
            : `${isBuy ? 'Buy' : 'Sell'} ${token.symbol}`
          }
        </Button>

        {error && (
          <Alert
            variant="error"
            title="Transaction Failed"
            description={error.message}
          />
        )}

        {isSuccess && (
          <Alert
            variant="success"
            title="Transaction Successful"
            description={`Successfully ${isBuy ? 'bought' : 'sold'} ${token.symbol}!`}
          />
        )}
      </div>
    </div>
  );
}
```

---

## Security & Best Practices

### Input Validation

#### Form Validation Patterns
```typescript
// ✅ Good: Comprehensive input validation
// lib/validation.ts
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

export function validateAddress(address: string): string | null {
  if (!address) return 'Address is required';
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) return 'Invalid Ethereum address format';
  return null;
}

export function validateAmount(amount: string, min: string = '0', max?: string): string | null {
  if (!amount) return 'Amount is required';
  
  try {
    const amountBigInt = parseToBigInt(amount);
    const minBigInt = parseToBigInt(min);
    
    if (amountBigInt <= minBigInt) return `Amount must be greater than ${min}`;
    
    if (max) {
      const maxBigInt = parseToBigInt(max);
      if (amountBigInt > maxBigInt) return `Amount must be less than ${max}`;
    }
    
    return null;
  } catch {
    return 'Invalid amount format';
  }
}
```

#### Sanitization
```typescript
// ✅ Good: Input sanitization
// lib/sanitization.ts
export function sanitizeString(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/[<>]/g, '') // Remove angle brackets
    .trim();
}

export function sanitizeUrl(url: string): string | null {
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

export function sanitizeTokenMetadata(metadata: any): TokenLaunchForm {
  return {
    name: sanitizeString(metadata.name || ''),
    symbol: sanitizeString(metadata.symbol || '').toUpperCase(),
    description: sanitizeString(metadata.description || ''),
    website: metadata.website ? sanitizeUrl(metadata.website) : undefined,
    telegram: metadata.telegram ? sanitizeUrl(metadata.telegram) : undefined,
    twitter: metadata.twitter ? sanitizeUrl(metadata.twitter) : undefined,
  };
}
```

### Error Handling

#### Comprehensive Error Boundaries
```typescript
// ✅ Good: Error boundary with logging
'use client';

import React from 'react';
import { Alert, Button } from '@/components';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallback?: React.ComponentType<{ error: Error; retry: () => void }> }>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ errorInfo });
    
    // Log error to monitoring service
    console.error('Error caught by boundary:', error, errorInfo);
    
    // In production, send to error tracking service
    if (process.env.NODE_ENV === 'production') {
      // logErrorToService(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      const { fallback: Fallback } = this.props;
      
      if (Fallback && this.state.error) {
        return (
          <Fallback 
            error={this.state.error} 
            retry={() => this.setState({ hasError: false, error: null, errorInfo: null })}
          />
        );
      }

      return (
        <div className="p-8 text-center">
          <Alert
            variant="error"
            title="Something went wrong"
            description="An unexpected error occurred. Please try refreshing the page."
          />
          <Button
            onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
            className="mt-4"
          >
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

#### Async Error Handling
```typescript
// ✅ Good: Async error handling patterns
// lib/async-utils.ts
export interface AsyncResult<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

export async function safeAsync<T>(
  asyncFn: () => Promise<T>,
  errorMessage?: string
): Promise<{ data: T | null; error: string | null }> {
  try {
    const data = await asyncFn();
    return { data, error: null };
  } catch (error) {
    console.error(errorMessage || 'Async operation failed:', error);
    return { 
      data: null, 
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

// Usage in hooks
export function useAsyncOperation<T>(
  asyncFn: () => Promise<T>,
  deps: React.DependencyList = []
): AsyncResult<T> {
  const [state, setState] = useState<AsyncResult<T>>({
    data: null,
    error: null,
    loading: false,
  });

  useEffect(() => {
    let cancelled = false;

    const execute = async () => {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const { data, error } = await safeAsync(asyncFn);
      
      if (!cancelled) {
        setState({ data, error, loading: false });
      }
    };

    execute();

    return () => {
      cancelled = true;
    };
  }, deps);

  return state;
}
```

### Environment Variables

#### Secure Environment Handling
```typescript
// ✅ Good: Environment variable validation
// lib/env.ts
interface EnvironmentConfig {
  NODE_ENV: 'development' | 'production' | 'test';
  NEXT_PUBLIC_SUBGRAPH_URL_MAINNET: string;
  NEXT_PUBLIC_SUBGRAPH_URL_TESTNET: string;
  NEXT_PUBLIC_CORE_RPC_URL: string;
  NEXT_PUBLIC_CHAIN_ID: string;
  NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: string;
}

function validateEnv(): EnvironmentConfig {
  const requiredEnvVars = [
    'NEXT_PUBLIC_SUBGRAPH_URL_MAINNET',
    'NEXT_PUBLIC_SUBGRAPH_URL_TESTNET',
    'NEXT_PUBLIC_CORE_RPC_URL',
    'NEXT_PUBLIC_CHAIN_ID',
    'NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID',
  ];

  const missing = requiredEnvVars.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  return {
    NODE_ENV: (process.env.NODE_ENV as any) || 'development',
    NEXT_PUBLIC_SUBGRAPH_URL_MAINNET: process.env.NEXT_PUBLIC_SUBGRAPH_URL_MAINNET!,
    NEXT_PUBLIC_SUBGRAPH_URL_TESTNET: process.env.NEXT_PUBLIC_SUBGRAPH_URL_TESTNET!,
    NEXT_PUBLIC_CORE_RPC_URL: process.env.NEXT_PUBLIC_CORE_RPC_URL!,
    NEXT_PUBLIC_CHAIN_ID: process.env.NEXT_PUBLIC_CHAIN_ID!,
    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  };
}

export const env = validateEnv();
```

---

## Performance & Optimization

### Bundle Optimization

#### Dynamic Imports
```typescript
// ✅ Good: Dynamic imports for code splitting
// components/TradingChart.tsx
import dynamic from 'next/dynamic';
import { LoadingSpinner } from '@/components';

// Dynamically import heavy chart library
const Chart = dynamic(() => import('react-chartjs-2'), {
  ssr: false,
  loading: () => <LoadingSpinner size="lg" text="Loading chart..." />,
});

const TradingViewChart = dynamic(() => import('./TradingViewChart'), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />,
});

export function TradingChart({ tokenId }: { tokenId: string }) {
  return (
    <div className="space-y-4">
      <Chart tokenId={tokenId} />
      <TradingViewChart tokenId={tokenId} />
    </div>
  );
}
```

#### Component Optimization
```typescript
// ✅ Good: Optimized component patterns
import React, { memo, useMemo, useCallback } from 'react';

interface TokenListProps {
  tokens: Token[];
  onTokenClick: (token: Token) => void;
  searchQuery: string;
}

export const TokenList = memo(({ tokens, onTokenClick, searchQuery }: TokenListProps) => {
  // Memoize filtered tokens
  const filteredTokens = useMemo(() => {
    if (!searchQuery) return tokens;
    
    return tokens.filter(token => 
      token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [tokens, searchQuery]);

  // Memoize click handler
  const handleTokenClick = useCallback((token: Token) => {
    onTokenClick(token);
  }, [onTokenClick]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredTokens.map(token => (
        <TokenCard
          key={token.id}
          token={token}
          onClick={handleTokenClick}
        />
      ))}
    </div>
  );
});

TokenList.displayName = 'TokenList';
```

### GraphQL Optimization

#### Query Optimization
```typescript
// ✅ Good: Optimized GraphQL queries
// queries/optimized-tokens.ts
export const GET_TOKENS_OPTIMIZED = gql`
  query GetTokensOptimized($first: Int!, $skip: Int!, $search: String) {
    tokens(
      first: $first
      skip: $skip
      orderBy: createdAt
      orderDirection: desc
      where: $search ? {
        or: [
          { name_contains_nocase: $search }
          { symbol_contains_nocase: $search }
        ]
      } : {}
    ) {
      id
      name
      symbol
      image
      currentPrice
      totalCoreRaised
      graduated
      createdAt
      # Only fetch recent trade for price change calculation
      trades(first: 1, orderBy: timestamp, orderDirection: desc) {
        price
        timestamp
      }
    }
  }
`;

// Use fragments to avoid over-fetching
export const GET_TOKEN_SUMMARY = gql`
  query GetTokenSummary($tokenId: String!) {
    token(id: $tokenId) {
      ...TokenCore
      ...TokenPrice
      # Don't fetch all trades, just summary data
      tradesCount: trades(first: 0) @client
      holdersCount: holders(first: 0) @client
    }
  }
  ${TOKEN_CORE_FRAGMENT}
  ${TOKEN_PRICE_FRAGMENT}
`;
```

#### Caching Strategies
```typescript
// ✅ Good: Advanced caching
// lib/apollo-cache.ts
export const cacheConfig = {
  typePolicies: {
    Query: {
      fields: {
        tokens: {
          keyArgs: ['orderBy', 'orderDirection', 'where'],
          merge(existing = [], incoming, { args }) {
            const { skip = 0 } = args || {};
            const merged = existing ? existing.slice() : [];
            
            // Merge incoming data
            for (let i = 0; i < incoming.length; ++i) {
              merged[skip + i] = incoming[i];
            }
            
            return merged;
          },
        },
      },
    },
    Token: {
      fields: {
        trades: {
          keyArgs: ['orderBy', 'orderDirection'],
          merge(existing = [], incoming, { args }) {
            const { skip = 0 } = args || {};
            if (skip === 0) {
              // Fresh fetch, replace existing
              return incoming;
            }
            // Pagination, append to existing
            return [...existing, ...incoming];
          },
        },
      },
    },
  },
};
```

### Image Optimization

#### Next.js Image Component
```typescript
// ✅ Good: Optimized image usage
import Image from 'next/image';

interface TokenImageProps {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
}

export function TokenImage({ src, alt, size = 'md' }: TokenImageProps) {
  const sizeMap = {
    sm: { width: 32, height: 32, className: 'w-8 h-8' },
    md: { width: 48, height: 48, className: 'w-12 h-12' },
    lg: { width: 64, height: 64, className: 'w-16 h-16' },
  };

  const { width, height, className } = sizeMap[size];

  if (!src) {
    // Fallback to generated avatar
    return (
      <div className={`${className} rounded-full bg-gradient-to-r from-core-orange-500 to-bitcoin-gold-500 flex items-center justify-center text-white font-semibold`}>
        {alt.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`${className} rounded-full object-cover`}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
      priority={size === 'lg'} // Prioritize larger images
    />
  );
}
```

### Performance Monitoring

#### Web Vitals Tracking
```typescript
// ✅ Good: Performance monitoring
// lib/performance.ts
export function reportWebVitals(metric: any) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vital:', metric);
  }

  // Send to analytics in production
  if (process.env.NODE_ENV === 'production') {
    // Example: Send to Google Analytics
    // gtag('event', metric.name, {
    //   value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    //   event_category: 'Web Vitals',
    //   non_interaction: true,
    // });
  }
}

// Usage in _app.tsx or layout.tsx
export { reportWebVitals };
```

---

## Testing Standards

### Component Testing

#### React Testing Library Patterns
```typescript
// ✅ Good: Component testing
// __tests__/components/TokenCard.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { TokenCard } from '@/components/TokenCard';
import { mockToken } from '@/mocks/token';

const renderWithProviders = (component: React.ReactElement, mocks: any[] = []) => {
  return render(
    <MockedProvider mocks={mocks} addTypename={false}>
      {component}
    </MockedProvider>
  );
};

describe('TokenCard', () => {
  it('renders token information correctly', () => {
    renderWithProviders(<TokenCard token={mockToken} />);
    
    expect(screen.getByText(mockToken.name)).toBeInTheDocument();
    expect(screen.getByText(mockToken.symbol)).toBeInTheDocument();
    expect(screen.getByText(/Price:/)).toBeInTheDocument();
  });

  it('shows graduation status for graduated tokens', () => {
    const graduatedToken = { ...mockToken, graduated: true };
    renderWithProviders(<TokenCard token={graduatedToken} />);
    
    expect(screen.getByText(/Graduated/)).toBeInTheDocument();
  });

  it('calls onClick when card is clicked', () => {
    const handleClick = jest.fn();
    renderWithProviders(
      <TokenCard token={mockToken} onClick={handleClick} />
    );
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledWith(mockToken);
  });

  it('handles loading state', () => {
    const loadingToken = { ...mockToken, isLoading: true };
    renderWithProviders(<TokenCard token={loadingToken} />);
    
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });
});
```

#### Hook Testing
```typescript
// ✅ Good: Hook testing
// __tests__/hooks/useTokenData.test.tsx
import { renderHook, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { useTokenData } from '@/hooks/useTokenData';
import { GET_TOKEN_DETAILS } from '@/queries/tokens';

const mocks = [
  {
    request: {
      query: GET_TOKEN_DETAILS,
      variables: { tokenId: 'test-token-id' },
    },
    result: {
      data: {
        token: {
          id: 'test-token-id',
          name: 'Test Token',
          symbol: 'TEST',
          currentPrice: '1000000000000000',
          graduated: false,
        },
      },
    },
  },
];

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MockedProvider mocks={mocks} addTypename={false}>
    {children}
  </MockedProvider>
);

describe('useTokenData', () => {
  it('fetches and returns token data', async () => {
    const { result } = renderHook(() => useTokenData('test-token-id'), {
      wrapper,
    });

    expect(result.current.loading).toBe(true);
    expect(result.current.token).toBe(null);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.token).toEqual(
      expect.objectContaining({
        id: 'test-token-id',
        name: 'Test Token',
        symbol: 'TEST',
      })
    );
  });

  it('handles errors gracefully', async () => {
    const errorMocks = [
      {
        request: {
          query: GET_TOKEN_DETAILS,
          variables: { tokenId: 'error-token-id' },
        },
        error: new Error('Network error'),
      },
    ];

    const errorWrapper = ({ children }: { children: React.ReactNode }) => (
      <MockedProvider mocks={errorMocks} addTypename={false}>
        {children}
      </MockedProvider>
    );

    const { result } = renderHook(() => useTokenData('error-token-id'), {
      wrapper: errorWrapper,
    });

    await waitFor(() => {
      expect(result.current.error).toBeTruthy();
    });

    expect(result.current.error?.type).toBe('network');
  });
});
```

### Integration Testing

#### Server Action Testing
```typescript
// ✅ Good: Server action testing
// __tests__/actions/token-actions.test.ts
import { launchToken } from '@/app/actions/token-actions';
import { apolloClient } from '@/lib/apollo-client';

// Mock Apollo Client
jest.mock('@/lib/apollo-client', () => ({
  apolloClient: {
    mutate: jest.fn(),
  },
}));

// Mock Next.js functions
jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

describe('launchToken', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('successfully launches a token', async () => {
    const mockMutate = apolloClient.mutate as jest.Mock;
    mockMutate.mockResolvedValue({
      data: {
        createToken: {
          id: 'new-token-id',
          name: 'Test Token',
          symbol: 'TEST',
        },
      },
    });

    const formData = new FormData();
    formData.append('name', 'Test Token');
    formData.append('symbol', 'TEST');
    formData.append('description', 'A test token');

    await expect(launchToken(formData)).resolves.not.toThrow();

    expect(mockMutate).toHaveBeenCalledWith({
      mutation: expect.any(Object),
      variables: {
        name: 'Test Token',
        symbol: 'TEST',
        description: 'A test token',
      },
    });
  });

  it('throws error for missing required fields', async () => {
    const formData = new FormData();
    formData.append('name', '');
    formData.append('symbol', 'TEST');

    await expect(launchToken(formData)).rejects.toThrow(
      'Name and symbol are required'
    );
  });
});
```

### E2E Testing

#### Playwright Tests
```typescript
// ✅ Good: E2E testing
// e2e/token-launch.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Token Launch Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/launch');
  });

  test('should launch a token successfully', async ({ page }) => {
    // Fill out the form
    await page.fill('[name="name"]', 'Test Token');
    await page.fill('[name="symbol"]', 'TEST');
    await page.fill('[name="description"]', 'A test token for E2E testing');

    // Submit the form
    await page.click('button[type="submit"]');

    // Wait for navigation to token page
    await page.waitForURL(/\/token\/0x[a-fA-F0-9]{40}/);

    // Verify token details are displayed
    await expect(page.locator('h1')).toContainText('Test Token (TEST)');
    await expect(page.locator('[data-testid="token-description"]')).toContainText(
      'A test token for E2E testing'
    );
  });

  test('should show validation errors for invalid input', async ({ page }) => {
    // Try to submit with empty fields
    await page.click('button[type="submit"]');

    // Check for validation errors
    await expect(page.locator('[role="alert"]')).toContainText(
      'Name and symbol are required'
    );
  });

  test('should connect wallet before launching', async ({ page }) => {
    // Mock wallet connection
    await page.addInitScript(() => {
      // Mock MetaMask
      (window as any).ethereum = {
        request: async ({ method }: { method: string }) => {
          if (method === 'eth_requestAccounts') {
            return ['0x1234567890123456789012345678901234567890'];
          }
          if (method === 'eth_chainId') {
            return '0x45c'; // Core Chain ID
          }
        },
        on: () => {},
        removeListener: () => {},
      };
    });

    // Connect wallet
    await page.click('button:has-text("Connect Wallet")');
    await expect(page.locator('button:has-text("0x1234...7890")')).toBeVisible();

    // Now launch token
    await page.fill('[name="name"]', 'Test Token');
    await page.fill('[name="symbol"]', 'TEST');
    await page.click('button[type="submit"]');

    // Should proceed without wallet connection error
    await expect(page.locator('[role="alert"]:has-text("Connect wallet")')).not.toBeVisible();
  });
});
```

---

## Code Quality & Linting

### ESLint Configuration

#### Comprehensive ESLint Setup
```javascript
// ✅ Good: .eslintrc.js
module.exports = {
  extends: [
    'next/core-web-vitals',
    '@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react-hooks', 'jsx-a11y'],
  rules: {
    // TypeScript specific rules
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'warn',

    // React specific rules
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',

    // Accessibility rules
    'jsx-a11y/anchor-is-valid': 'off', // Next.js Link component
    'jsx-a11y/click-events-have-key-events': 'warn',
    'jsx-a11y/no-noninteractive-element-interactions': 'warn',

    // General code quality
    'prefer-const': 'error',
    'no-var': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',

    // Import organization
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
```

### Prettier Configuration

#### Code Formatting
```javascript
// ✅ Good: .prettierrc.js
module.exports = {
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'avoid',
  endOfLine: 'lf',
  plugins: ['prettier-plugin-tailwindcss'],
};
```

### Husky & Lint-Staged

#### Pre-commit Hooks
```json
// ✅ Good: package.json scripts
{
  "scripts": {
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "e2e": "playwright test",
    "prepare": "husky install"
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md,css}": [
      "prettier --write"
    ]
  }
}
```

```bash
# ✅ Good: .husky/pre-commit
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
npm run type-check
npm run test -- --passWithNoTests
```

### Code Documentation

#### JSDoc Standards
```typescript
// ✅ Good: JSDoc documentation
/**
 * Calculates the bonding curve price for a given amount of tokens sold
 * 
 * @param basePrice - The base price of the token in wei
 * @param tokensSold - The number of tokens already sold in wei
 * @param totalSupply - The total supply of tokens in wei
 * @returns The calculated price in wei
 * 
 * @example
 * ```typescript
 * const price = calculateBondingCurvePrice(
 *   BigInt('100000000000000'), // 0.0001 CORE
 *   BigInt('500000000000000000000000000'), // 500M tokens
 *   BigInt('1000000000000000000000000000') // 1B tokens
 * );
 * ```
 */
export function calculateBondingCurvePrice(
  basePrice: bigint,
  tokensSold: bigint,
  totalSupply: bigint
): bigint {
  // Implementation
}

/**
 * Custom hook for managing token data with real-time updates
 * 
 * @param tokenId - The unique identifier of the token
 * @returns Object containing token data, loading state, and error information
 * 
 * @example
 * ```typescript
 * const { token, loading, error } = useTokenData('0x123...');
 * 
 * if (loading) return <LoadingSpinner />;
 * if (error) return <ErrorMessage error={error} />;
 * if (!token) return <NotFound />;
 * 
 * return <TokenDetails token={token} />;
 * ```
 */
export function useTokenData(tokenId: string): UseTokenDataReturn {
  // Implementation
}
```

---

## Summary & Best Practices

### Key Principles

1. **Server Components First**: Use server components for data fetching, client components only for interactivity
2. **Server Actions Only**: No API routes - use server actions for all mutations and form handling
3. **GraphQL Conventions**: Consistent naming, fragments, and caching strategies
4. **Type Safety**: Comprehensive TypeScript usage with proper interfaces and generics
5. **Design System Compliance**: Follow CorePump design tokens and component patterns
6. **DeFi Security**: Safe BigInt operations, input validation, and wallet integration
7. **Performance**: Code splitting, memoization, and optimized queries
8. **Testing**: Comprehensive unit, integration, and E2E testing
9. **Code Quality**: ESLint, Prettier, and pre-commit hooks

### Development Workflow

1. **Planning**: Review requirements and design system before coding
2. **Implementation**: Follow file structure and naming conventions
3. **Testing**: Write tests alongside implementation
4. **Review**: Use linting and type checking
5. **Documentation**: Update JSDoc and README files
6. **Deployment**: Ensure environment variables and build optimization

### Common Patterns to Follow

- Use fragments for reusable GraphQL queries
- Implement proper error boundaries and loading states
- Follow the component composition patterns
- Use proper TypeScript interfaces for all props and return types
- Implement accessibility features from the start
- Use the design system colors and spacing consistently
- Handle BigInt operations safely
- Validate all user inputs
- Use server actions for all form submissions
- Implement proper caching strategies

### Anti-Patterns to Avoid

- ❌ Creating API routes instead of using server actions
- ❌ Using client components when server components would suffice
- ❌ Using relative imports (`./`, `../`) instead of absolute imports (`@/`)
- ❌ Ignoring TypeScript errors or using `any` type
- ❌ Not following the design system colors and spacing
- ❌ Unsafe BigInt operations without error handling
- ❌ Missing input validation and sanitization
- ❌ Not implementing proper loading and error states
- ❌ Ignoring accessibility requirements
- ❌ Not writing tests for critical functionality
- ❌ Inconsistent naming conventions

---

*This document serves as the comprehensive coding standard for the CorePump project. All team members should follow these guidelines to ensure consistency, maintainability, and quality across the codebase.*

**Last Updated**: January 2025  
**Version**: 1.0
