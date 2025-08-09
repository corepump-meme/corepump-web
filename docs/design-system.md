# CorePump Design System & Style Guide

*A comprehensive design system for the CorePump token launchpad on Core Chain*

---

## Table of Contents

1. [Brand Identity & Voice](#brand-identity--voice)
2. [Color Palette](#color-palette)
3. [Dark Mode](#dark-mode)
4. [Typography](#typography)
5. [Iconography & Imagery](#iconography--imagery)
6. [Layout & Spacing](#layout--spacing)
7. [UI Components](#ui-components)
8. [Motion & Interaction](#motion--interaction)
9. [Accessibility](#accessibility)
10. [Usage Examples & Guidelines](#usage-examples--guidelines)

---

## Brand Identity & Voice

### Core Brand Values
- **Decentralized**: Trustless, permissionless, community-owned
- **Fair**: Equal opportunity, anti-rug protection, transparent
- **Innovative**: Cutting-edge DeFi mechanics, Bitcoin-powered
- **Secure**: Built-in protections, audited smart contracts
- **Community-First**: By the people, for the people

### Brand Personality
- **Bold & Confident**: We're changing the game
- **Technical yet Accessible**: Complex tech, simple UX
- **Anti-Establishment**: Fighting against rugs and scams
- **Bitcoin-Focused**: Leveraging Bitcoin's security and brand
- **Meme-Culture Aware**: Understanding the community we serve

### Tone of Voice Guidelines

#### Primary Tone: **Confident Revolutionary**
- Direct and assertive without being aggressive
- Educational but not condescending
- Rebellious against unfair practices
- Trustworthy and transparent

#### Copy Examples:
- ✅ **Good**: "Stop getting rugged. Start pumping."
- ✅ **Good**: "Fair launches. Real protection. No exceptions."
- ❌ **Avoid**: "Maybe try our platform if you want..."
- ❌ **Avoid**: "We're probably the best solution..."

#### Microcopy Guidelines:
- **Buttons**: Action-oriented ("Launch Token", "Connect Wallet", "Start Trading")
- **Errors**: Clear and helpful ("Transaction failed. Check your balance and try again.")
- **Success**: Celebratory but professional ("Token launched successfully! 🚀")
- **Loading**: Informative ("Confirming transaction on Core Chain...")

---

## Color Palette

*Using modern Tailwind CSS v4 with OKLCH color space for better consistency and manipulation*

### Primary Colors

#### Core Orange (Brand Primary) - Complete Scale
```css
/* Modern OKLCH format for better color consistency */
--color-core-orange-50: oklch(0.97 0.02 45);   /* Light tint */
--color-core-orange-100: oklch(0.92 0.05 45);  /* Very light */
--color-core-orange-200: oklch(0.85 0.08 45);  /* Light */
--color-core-orange-300: oklch(0.78 0.12 45);  /* Medium light */
--color-core-orange-400: oklch(0.70 0.15 45);  /* Medium */
--color-core-orange-500: oklch(0.65 0.18 45);  /* Primary (#FF6B35 equivalent) */
--color-core-orange-600: oklch(0.58 0.16 45);  /* Medium dark */
--color-core-orange-700: oklch(0.50 0.14 45);  /* Dark */
--color-core-orange-800: oklch(0.42 0.12 45);  /* Very dark */
--color-core-orange-900: oklch(0.35 0.10 45);  /* Darkest */
--color-core-orange-950: oklch(0.25 0.08 45);  /* Ultra dark */
```

#### Bitcoin Gold (Secondary) - Complete Scale
```css
/* OKLCH format for Bitcoin Gold */
--color-bitcoin-gold-50: oklch(0.98 0.02 85);   /* Light tint */
--color-bitcoin-gold-100: oklch(0.95 0.05 85);  /* Very light */
--color-bitcoin-gold-200: oklch(0.90 0.08 85);  /* Light */
--color-bitcoin-gold-300: oklch(0.83 0.12 85);  /* Medium light */
--color-bitcoin-gold-400: oklch(0.75 0.15 85);  /* Medium */
--color-bitcoin-gold-500: oklch(0.68 0.18 85);  /* Primary (#F7931A equivalent) */
--color-bitcoin-gold-600: oklch(0.60 0.16 85);  /* Medium dark */
--color-bitcoin-gold-700: oklch(0.52 0.14 85);  /* Dark */
--color-bitcoin-gold-800: oklch(0.44 0.12 85);  /* Very dark */
--color-bitcoin-gold-900: oklch(0.36 0.10 85);  /* Darkest */
--color-bitcoin-gold-950: oklch(0.26 0.08 85);  /* Ultra dark */
```

### Neutral Colors

#### Grayscale System (OKLCH Format)
```css
/* Modern gray scale using OKLCH for consistent lightness perception */
--color-gray-50: oklch(0.985 0.002 264.542);   /* Almost white */
--color-gray-100: oklch(0.967 0.003 264.542);  /* Very light gray */
--color-gray-200: oklch(0.928 0.006 264.531);  /* Light gray */
--color-gray-300: oklch(0.872 0.010 258.338);  /* Medium light gray */
--color-gray-400: oklch(0.707 0.022 261.325);  /* Medium gray */
--color-gray-500: oklch(0.551 0.027 264.364);  /* True middle gray */
--color-gray-600: oklch(0.446 0.030 256.802);  /* Medium dark gray */
--color-gray-700: oklch(0.373 0.034 259.733);  /* Dark gray */
--color-gray-800: oklch(0.278 0.033 256.848);  /* Very dark gray */
--color-gray-900: oklch(0.210 0.034 264.665);  /* Almost black */
--color-gray-950: oklch(0.130 0.028 261.692);  /* Ultra dark gray */

/* Utility colors */
--color-white: oklch(1 0 0);    /* Pure white */
--color-black: oklch(0 0 0);    /* Pure black */
```

### Semantic Colors

#### Success (Gains/Profits) - Complete Scale
```css
/* Success green using OKLCH */
--color-success-50: oklch(0.97 0.03 155);   /* Light success background */
--color-success-100: oklch(0.94 0.06 155);  /* Very light success */
--color-success-200: oklch(0.88 0.10 155);  /* Light success */
--color-success-300: oklch(0.80 0.15 155);  /* Medium light success */
--color-success-400: oklch(0.70 0.20 155);  /* Medium success */
--color-success-500: oklch(0.62 0.22 155);  /* Primary (#00FF88 equivalent) */
--color-success-600: oklch(0.55 0.20 155);  /* Medium dark success */
--color-success-700: oklch(0.47 0.17 155);  /* Dark success */
--color-success-800: oklch(0.39 0.14 155);  /* Very dark success */
--color-success-900: oklch(0.32 0.12 155);  /* Darkest success */
--color-success-950: oklch(0.22 0.08 155);  /* Ultra dark success */
```

#### Warning (Caution) - Complete Scale
```css
/* Warning amber using OKLCH */
--color-warning-50: oklch(0.98 0.02 80);    /* Light warning background */
--color-warning-100: oklch(0.95 0.05 80);   /* Very light warning */
--color-warning-200: oklch(0.90 0.10 80);   /* Light warning */
--color-warning-300: oklch(0.83 0.15 80);   /* Medium light warning */
--color-warning-400: oklch(0.75 0.18 80);   /* Medium warning */
--color-warning-500: oklch(0.68 0.20 80);   /* Primary (#FFB800 equivalent) */
--color-warning-600: oklch(0.60 0.18 80);   /* Medium dark warning */
--color-warning-700: oklch(0.52 0.16 80);   /* Dark warning */
--color-warning-800: oklch(0.44 0.14 80);   /* Very dark warning */
--color-warning-900: oklch(0.36 0.12 80);   /* Darkest warning */
--color-warning-950: oklch(0.26 0.08 80);   /* Ultra dark warning */
```

#### Error (Losses/Danger) - Complete Scale
```css
/* Error red using OKLCH */
--color-error-50: oklch(0.97 0.02 20);      /* Light error background */
--color-error-100: oklch(0.93 0.05 20);     /* Very light error */
--color-error-200: oklch(0.87 0.08 20);     /* Light error */
--color-error-300: oklch(0.79 0.12 20);     /* Medium light error */
--color-error-400: oklch(0.70 0.16 20);     /* Medium error */
--color-error-500: oklch(0.62 0.19 20);     /* Primary (#FF3B30 equivalent) */
--color-error-600: oklch(0.55 0.17 20);     /* Medium dark error */
--color-error-700: oklch(0.47 0.15 20);     /* Dark error */
--color-error-800: oklch(0.39 0.13 20);     /* Very dark error */
--color-error-900: oklch(0.32 0.11 20);     /* Darkest error */
--color-error-950: oklch(0.22 0.08 20);     /* Ultra dark error */
```

#### Info (Neutral Information) - Complete Scale
```css
/* Info cyan using OKLCH */
--color-info-50: oklch(0.97 0.02 200);      /* Light info background */
--color-info-100: oklch(0.93 0.05 200);     /* Very light info */
--color-info-200: oklch(0.87 0.08 200);     /* Light info */
--color-info-300: oklch(0.79 0.12 200);     /* Medium light info */
--color-info-400: oklch(0.70 0.16 200);     /* Medium info */
--color-info-500: oklch(0.62 0.19 200);     /* Primary (#00D4FF equivalent) */
--color-info-600: oklch(0.55 0.17 200);     /* Medium dark info */
--color-info-700: oklch(0.47 0.15 200);     /* Dark info */
--color-info-800: oklch(0.39 0.13 200);     /* Very dark info */
--color-info-900: oklch(0.32 0.11 200);     /* Darkest info */
--color-info-950: oklch(0.22 0.08 200);     /* Ultra dark info */
```

### System Colors (Automatic Light/Dark)

#### Background Colors
```css
/* Automatic light/dark switching using modern Tailwind CSS v4 */
--color-background-primary: light-dark(oklch(1 0 0), oklch(0.04 0 0));       /* Main background */
--color-background-secondary: light-dark(oklch(0.96 0 0), oklch(0.07 0 0));   /* Secondary background */
--color-background-tertiary: light-dark(oklch(0.90 0 0), oklch(0.10 0 0));    /* Tertiary background */
```

#### Surface Colors
```css
/* Card and component backgrounds */
--color-surface-default: light-dark(oklch(1 0 0), oklch(0.12 0 0));           /* Default surface */
--color-surface-elevated: light-dark(oklch(1 0 0), oklch(0.15 0 0));          /* Elevated surface */
--color-surface-hover: light-dark(oklch(0.96 0 0), oklch(0.17 0 0));          /* Hover states */
```

#### Text Colors
```css
/* Text hierarchy with automatic theming */
--color-text-primary: light-dark(oklch(0.10 0 0), oklch(1 0 0));              /* Primary text */
--color-text-secondary: light-dark(oklch(0.32 0 0), oklch(0.90 0 0));         /* Secondary text */
--color-text-tertiary: light-dark(oklch(0.45 0 0), oklch(0.70 0 0));          /* Tertiary text */
--color-text-disabled: light-dark(oklch(0.64 0 0), oklch(0.40 0 0));          /* Disabled text */
--color-text-inverse: light-dark(oklch(1 0 0), oklch(0.10 0 0));              /* Inverse text */
```

#### Border Colors
```css
/* Border and divider colors */
--color-border-primary: light-dark(oklch(0.90 0 0), oklch(0.20 0 0));         /* Primary borders */
--color-border-secondary: light-dark(oklch(0.83 0 0), oklch(0.17 0 0));       /* Secondary borders */
--color-border-focus: var(--color-core-orange-500);                           /* Focus state borders */
```

### Traditional Dark Mode Colors

#### Manual Dark Mode Colors (With Familiar Names)
*These colors are available for manual dark mode usage with easy-to-remember names*

```css
/* Dark Backgrounds - Traditional dark theme backgrounds */
--color-dark-bg-primary: oklch(0.04 0 0);      /* #0A0A0A - Main dark background */
--color-dark-bg-secondary: oklch(0.07 0 0);    /* #111111 - Secondary dark background */
--color-dark-bg-tertiary: oklch(0.10 0 0);     /* #1A1A1A - Tertiary dark background */

/* Dark Surfaces - Card and component backgrounds in dark mode */
--color-dark-surface: oklch(0.12 0 0);         /* #1E1E1E - Default dark surface */
--color-dark-surface-elevated: oklch(0.15 0 0); /* #252525 - Elevated dark surface */
--color-dark-surface-hover: oklch(0.17 0 0);   /* #2A2A2A - Hover state for dark surfaces */

/* Dark Text Colors - Text colors for dark mode */
--color-dark-text-primary: oklch(1 0 0);       /* #FFFFFF - Primary text on dark */
--color-dark-text-secondary: oklch(0.90 0 0);  /* #E5E5E5 - Secondary text on dark */
--color-dark-text-tertiary: oklch(0.70 0 0);   /* #B3B3B3 - Tertiary text on dark */
--color-dark-text-disabled: oklch(0.40 0 0);   /* #666666 - Disabled text on dark */
--color-dark-text-mono: oklch(0.94 0 0);       /* #F0F0F0 - Monospace text on dark */

/* Dark Borders - Border colors for dark mode */
--color-dark-border-primary: oklch(0.20 0 0);  /* #333333 - Primary border on dark */
--color-dark-border-secondary: oklch(0.17 0 0); /* #2A2A2A - Secondary border on dark */

/* Dark Semantic Colors - Status colors optimized for dark mode */
--color-dark-success: oklch(0.65 0.15 155);    /* #00E676 - Success green for dark mode */
--color-dark-success-bg: oklch(0.16 0.04 155); /* #0D2818 - Success background for dark */
--color-dark-success-border: oklch(0.26 0.08 155); /* #1B4D2E - Success border for dark */

--color-dark-warning: oklch(0.78 0.12 85);     /* #FFD54F - Warning amber for dark mode */
--color-dark-warning-bg: oklch(0.16 0.03 85);  /* #2A2416 - Warning background for dark */
--color-dark-warning-border: oklch(0.26 0.06 85); /* #4A3F1A - Warning border for dark */

--color-dark-error: oklch(0.68 0.18 20);       /* #FF5252 - Error red for dark mode */
--color-dark-error-bg: oklch(0.16 0.04 20);    /* #2A1616 - Error background for dark */
--color-dark-error-border: oklch(0.26 0.08 20); /* #4A1F1F - Error border for dark */

--color-dark-info: oklch(0.72 0.14 200);       /* #29B6F6 - Info cyan for dark mode */
--color-dark-info-bg: oklch(0.16 0.03 200);    /* #16252A - Info background for dark */
--color-dark-info-border: oklch(0.26 0.06 200); /* #1F3A4A - Info border for dark */
```

### Gradient System

#### Primary Gradients
```css
--gradient-primary: linear-gradient(135deg, #FF6B35 0%, #F7931A 100%);
--gradient-primary-hover: linear-gradient(135deg, #FF8A5C 0%, #FFB347 100%);
--gradient-primary-dark: linear-gradient(135deg, #E55A2B 0%, #D4780E 100%);
```

#### Secondary Gradients
```css
--gradient-success: linear-gradient(135deg, #00FF88 0%, #00CC6A 100%);
--gradient-warning: linear-gradient(135deg, #FFB800 0%, #FF6B35 100%);
--gradient-error: linear-gradient(135deg, #FF3B30 0%, #FF6B35 100%);
--gradient-info: linear-gradient(135deg, #00D4FF 0%, #0099CC 100%);
```

### Accessible Contrast Ratios

All color combinations meet WCAG 2.1 AA standards (4.5:1 minimum):

- **Core Orange on White**: 4.52:1 ✅
- **Bitcoin Gold on Black**: 5.89:1 ✅
- **Gray-700 on White**: 10.37:1 ✅
- **White on Gray-900**: 11.63:1 ✅

---

## Dark Mode

CorePump supports both automatic system preference detection and manual dark mode toggling. The dark mode implementation maintains brand consistency while providing optimal readability and reduced eye strain for extended trading sessions.

### Dark Mode Philosophy

Dark mode in CorePump is designed with these principles:
- **Brand Consistency**: Core Orange and Bitcoin Gold remain vibrant and prominent
- **High Contrast**: All text maintains excellent readability (>7:1 contrast ratio)
- **Depth Through Layering**: Multiple background levels create clear visual hierarchy
- **Semantic Clarity**: Success/warning/error colors remain distinguishable
- **Eye Comfort**: Deep blacks reduce eye strain in low-light conditions

### Dark Mode Color Palette

#### Background Colors
```css
/* Dark mode backgrounds */
--bg-primary-dark: #0A0A0A;        /* Main app background */
--bg-secondary-dark: #111111;      /* Section backgrounds */
--bg-tertiary-dark: #1A1A1A;       /* Elevated elements */

/* Surface colors */
--surface-dark: #1E1E1E;           /* Card backgrounds */
--surface-elevated-dark: #252525;  /* Modal/dropdown backgrounds */
--surface-hover-dark: #2A2A2A;     /* Hover states */
```

#### Text Colors (Dark Mode)
```css
/* Text hierarchy for dark mode */
--text-primary-dark: #FFFFFF;      /* Primary headings, important text */
--text-secondary-dark: #E5E5E5;    /* Body text, descriptions */
--text-tertiary-dark: #B3B3B3;     /* Captions, labels, less important text */
--text-disabled-dark: #666666;     /* Disabled text */

/* Monospace text (addresses, prices) */
--text-mono-dark: #F0F0F0;         /* High contrast for important data */
```

#### Border & Divider Colors (Dark Mode)
```css
--border-primary-dark: #333333;    /* Main borders */
--border-secondary-dark: #2A2A2A;  /* Subtle dividers */
--border-focus-dark: #FF6B35;      /* Focus states (brand orange) */
```

#### Semantic Colors (Dark Mode Optimized)
```css
/* Success (gains/profits) - optimized for dark backgrounds */
--success-dark: #00E676;           /* Slightly softer green */
--success-bg-dark: #0D2818;        /* Dark green background */
--success-border-dark: #1B4D2E;    /* Green border */

/* Warning (caution) - warmer, more visible */
--warning-dark: #FFD54F;           /* Softer yellow */
--warning-bg-dark: #2A2416;        /* Dark yellow background */
--warning-border-dark: #4A3F1A;    /* Yellow border */

/* Error (losses/danger) - slightly muted red */
--error-dark: #FF5252;             /* Softer red */
--error-bg-dark: #2A1616;          /* Dark red background */
--error-border-dark: #4A1F1F;      /* Red border */

/* Info (neutral information) - cooler blue */
--info-dark: #29B6F6;              /* Softer blue */
--info-bg-dark: #16252A;           /* Dark blue background */
--info-border-dark: #1F3A4A;       /* Blue border */
```

#### Interactive States (Dark Mode)
```css
/* Hover states */
--hover-overlay-dark: rgba(255, 255, 255, 0.05); /* Subtle white overlay */
--hover-border-dark: #404040;      /* Lighter border on hover */

/* Active/pressed states */
--active-overlay-dark: rgba(255, 255, 255, 0.1);
--active-border-dark: #4A4A4A;

/* Focus states */
--focus-ring-dark: rgba(255, 107, 53, 0.3); /* Orange focus ring */
```

#### Gradients (Dark Mode)
```css
/* Primary gradients - maintain brand vibrancy */
--gradient-primary-dark: linear-gradient(135deg, #FF6B35 0%, #F7931A 100%);
--gradient-surface-dark: linear-gradient(135deg, #1A1A1A 0%, #252525 100%);
--gradient-card-dark: linear-gradient(135deg, #1E1E1E 0%, #2A2A2A 100%);
```

#### Shadows (Dark Mode)
```css
/* Subtle shadows for depth in dark mode */
--shadow-sm-dark: 0 1px 2px rgba(0, 0, 0, 0.3);
--shadow-md-dark: 0 4px 8px rgba(0, 0, 0, 0.4);
--shadow-lg-dark: 0 8px 16px rgba(0, 0, 0, 0.5);
--shadow-core-dark: 0 2px 8px rgba(255, 107, 53, 0.2); /* Brand shadow */
```

### Dark Mode Implementation

#### CSS Custom Properties with Theme Switching
```css
:root {
  /* Light mode (default) */
  --bg-primary: #FFFFFF;
  --bg-secondary: #F5F5F5;
  --text-primary: #1A1A1A;
  --text-secondary: #525252;
  --border-primary: #E5E5E5;
  --surface: #FFFFFF;
  
  /* Semantic colors remain the same */
  --success: #00FF88;
  --warning: #FFB800;
  --error: #FF3B30;
  --info: #00D4FF;
}

/* Dark mode overrides */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #0A0A0A;
    --bg-secondary: #111111;
    --text-primary: #FFFFFF;
    --text-secondary: #E5E5E5;
    --border-primary: #333333;
    --surface: #1E1E1E;
    
    /* Dark mode semantic colors */
    --success: #00E676;
    --warning: #FFD54F;
    --error: #FF5252;
    --info: #29B6F6;
  }
}

/* Manual dark mode toggle */
[data-theme="dark"] {
  --bg-primary: #0A0A0A;
  --bg-secondary: #111111;
  --text-primary: #FFFFFF;
  --text-secondary: #E5E5E5;
  --border-primary: #333333;
  --surface: #1E1E1E;
  
  --success: #00E676;
  --warning: #FFD54F;
  --error: #FF5252;
  --info: #29B6F6;
}
```

#### Tailwind Dark Mode Configuration
```javascript
// tailwind.config.js
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Light mode colors
        background: {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
        },
        
        // Dark mode specific colors
        dark: {
          'bg-primary': '#0A0A0A',
          'bg-secondary': '#111111',
          'bg-tertiary': '#1A1A1A',
          'surface': '#1E1E1E',
          'surface-elevated': '#252525',
          'surface-hover': '#2A2A2A',
          'text-primary': '#FFFFFF',
          'text-secondary': '#E5E5E5',
          'text-tertiary': '#B3B3B3',
          'text-disabled': '#666666',
          'border-primary': '#333333',
          'border-secondary': '#2A2A2A',
          'success': '#00E676',
          'warning': '#FFD54F',
          'error': '#FF5252',
          'info': '#29B6F6',
        }
      }
    }
  }
}
```

### Dark Mode Component Examples

#### Dark Mode Button Variants
```html
<!-- Primary Button (Dark Mode) -->
<button class="bg-gradient-to-r from-core-orange-500 to-bitcoin-gold-500 text-white border-none rounded-lg px-6 py-3 font-semibold text-base cursor-pointer transition-all duration-200 shadow-core-dark hover:shadow-lg hover:-translate-y-0.5 dark:shadow-core-dark">
  Primary Button
</button>

<!-- Secondary Button (Dark Mode) -->
<button class="bg-transparent text-core-orange-500 border-2 border-core-orange-500 rounded-lg px-5 py-2.5 font-semibold text-base cursor-pointer transition-all duration-200 hover:bg-core-orange-500 hover:text-white hover:-translate-y-0.5 dark:border-core-orange-500 dark:text-core-orange-500">
  Secondary Button
</button>

<!-- Ghost Button (Dark Mode) -->
<button class="bg-transparent text-gray-700 border-none rounded-lg px-6 py-3 font-medium text-base cursor-pointer transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white">
  Ghost Button
</button>
```

#### Dark Mode Card Components
```html
<!-- Basic Card (Dark Mode) -->
<div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 dark:bg-dark-surface dark:border-dark-border-primary dark:shadow-sm-dark dark:hover:shadow-md-dark">
  <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-dark-text-primary">Card Title</h3>
  <p class="text-gray-600 dark:text-dark-text-secondary">Card content goes here...</p>
</div>

<!-- Token Card (Dark Mode) -->
<div class="bg-white border border-gray-200 rounded-xl p-6 flex items-center gap-4 cursor-pointer transition-all duration-200 hover:border-core-orange-500 hover:shadow-lg hover:shadow-core-orange-500/10 dark:bg-dark-surface dark:border-dark-border-primary dark:hover:border-core-orange-500 dark:hover:shadow-core-dark">
  <!-- Token Icon -->
  <div class="w-12 h-12 rounded-full bg-gradient-to-r from-core-orange-500 to-bitcoin-gold-500 flex items-center justify-center text-white font-semibold">
    P
  </div>
  
  <!-- Token Info -->
  <div class="flex-1">
    <h4 class="text-xl font-medium text-gray-900 dark:text-dark-text-primary">PUMP</h4>
    <p class="text-sm text-gray-600 dark:text-dark-text-secondary">PumpCoin</p>
  </div>
  
  <!-- Price Info -->
  <div class="text-right">
    <div class="text-2xl font-mono font-bold text-success-500 dark:text-dark-success">$0.0045</div>
    <div class="text-sm text-success-500 dark:text-dark-success">+12.5%</div>
  </div>
</div>
```

#### Dark Mode Form Elements
```html
<!-- Input Field (Dark Mode) -->
<input class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-base bg-white transition-all duration-200 focus:outline-none focus:border-core-orange-500 focus:ring-3 focus:ring-core-orange-500/10 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed dark:bg-dark-surface dark:border-dark-border-primary dark:text-dark-text-primary dark:focus:border-core-orange-500 dark:disabled:bg-dark-bg-secondary dark:disabled:text-dark-text-disabled" 
       type="text" 
       placeholder="Enter text..." />

<!-- Select Dropdown (Dark Mode) -->
<select class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-base bg-white cursor-pointer appearance-none transition-all duration-200 focus:outline-none focus:border-core-orange-500 focus:ring-3 focus:ring-core-orange-500/10 dark:bg-dark-surface dark:border-dark-border-primary dark:text-dark-text-primary dark:focus:border-core-orange-500">
  <option>Select option...</option>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</select>
```

#### Dark Mode Modal
```html
<!-- Modal Overlay (Dark Mode) -->
<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 dark:bg-black/70">
  <!-- Modal Container -->
  <div class="bg-white rounded-2xl p-8 max-w-md w-[90%] max-h-[90vh] overflow-y-auto shadow-2xl dark:bg-dark-surface-elevated dark:shadow-lg-dark">
    <!-- Modal Header -->
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-2xl font-semibold text-gray-900 dark:text-dark-text-primary">Modal Title</h3>
      <button class="bg-none border-none cursor-pointer p-2 rounded-md transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-dark-surface-hover">
        <svg class="w-6 h-6 text-gray-600 dark:text-dark-text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
    </div>
    
    <!-- Modal Content -->
    <div class="modal-content">
      <p class="text-gray-600 dark:text-dark-text-secondary">Modal content goes here...</p>
    </div>
    
    <!-- Modal Footer -->
    <div class="flex justify-end gap-3 mt-6">
      <button class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200 dark:text-dark-text-secondary dark:hover:bg-dark-surface-hover">
        Cancel
      </button>
      <button class="px-4 py-2 bg-core-orange-500 text-white rounded-lg hover:bg-core-orange-600 transition-colors duration-200">
        Confirm
      </button>
    </div>
  </div>
</div>
```

### Dark Mode Alerts & Notifications

#### Dark Mode Alert Variants
```html
<!-- Success Alert (Dark Mode) -->
<div class="p-4 rounded-lg border flex items-center gap-3 mb-4 bg-success-50 border-success-500 text-success-900 dark:bg-dark-success-bg dark:border-dark-success-border dark:text-dark-success">
  <svg class="w-5 h-5 text-success-500 dark:text-dark-success" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
  </svg>
  <span>Operation completed successfully!</span>
</div>

<!-- Warning Alert (Dark Mode) -->
<div class="p-4 rounded-lg border flex items-center gap-3 mb-4 bg-warning-50 border-warning-500 text-warning-900 dark:bg-dark-warning-bg dark:border-dark-warning-border dark:text-dark-warning">
  <svg class="w-5 h-5 text-warning-500 dark:text-dark-warning" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
  </svg>
  <span>Please review your input before proceeding.</span>
</div>

<!-- Error Alert (Dark Mode) -->
<div class="p-4 rounded-lg border flex items-center gap-3 mb-4 bg-error-50 border-error-500 text-error-900 dark:bg-dark-error-bg dark:border-dark-error-border dark:text-dark-error">
  <svg class="w-5 h-5 text-error-500 dark:text-dark-error" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
  </svg>
  <span>An error occurred. Please try again.</span>
</div>
```

### Dark Mode Toggle Implementation

#### React Hook for Theme Management
```jsx
// useTheme.js
import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState('system');
  const [resolvedTheme, setResolvedTheme] = useState('light');

  useEffect(() => {
    const stored = localStorage.getItem('theme') || 'system';
    setTheme(stored);
    
    const updateResolvedTheme = () => {
      if (stored === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        setResolvedTheme(systemTheme);
        document.documentElement.setAttribute('data-theme', systemTheme);
      } else {
        setResolvedTheme(stored);
        document.documentElement.setAttribute('data-theme', stored);
      }
    };

    updateResolvedTheme();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', updateResolvedTheme);

    return () => mediaQuery.removeEventListener('change', updateResolvedTheme);
  }, [theme]);

  const setThemeMode = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return { theme, resolvedTheme, setTheme: setThemeMode };
};
```

#### Theme Toggle Component
```jsx
// ThemeToggle.jsx
import { useTheme } from './useTheme';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    { key: 'light', icon: SunIcon, label: 'Light' },
    { key: 'dark', icon: MoonIcon, label: 'Dark' },
    { key: 'system', icon: ComputerDesktopIcon, label: 'System' },
  ];

  return (
    <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-dark-surface rounded-lg">
      {themes.map(({ key, icon: Icon, label }) => (
        <button
          key={key}
          onClick={() => setTheme(key)}
          className={`
            flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
            ${theme === key 
              ? 'bg-white dark:bg-dark-surface-elevated text-gray-900 dark:text-dark-text-primary shadow-sm' 
              : 'text-gray-600 dark:text-dark-text-secondary hover:text-gray-900 dark:hover:text-dark-text-primary'
            }
          `}
          aria-label={`Switch to ${label.toLowerCase()} theme`}
        >
          <Icon className="w-4 h-4" />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
};
```

### Dark Mode Accessibility

#### Contrast Ratios (Dark Mode)
All dark mode color combinations exceed WCAG 2.1 AA standards:

- **White on Dark Primary Background**: 15.3:1 ✅ (AAA)
- **Light Gray on Dark Surface**: 8.2:1 ✅ (AAA)
- **Core Orange on Dark Background**: 6.8:1 ✅ (AAA)
- **Success Green on Dark Background**: 7.1:1 ✅ (AAA)
- **Warning Yellow on Dark Background**: 9.4:1 ✅ (AAA)
- **Error Red on Dark Background**: 5.9:1 ✅ (AA+)

#### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

#### High Contrast Mode Support
```css
@media (prefers-contrast: high) {
  :root {
    --border-primary: #FFFFFF;
    --text-secondary: #FFFFFF;
  }
  
  [data-theme="dark"] {
    --bg-primary: #000000;
    --text-primary: #FFFFFF;
    --border-primary: #FFFFFF;
  }
}
```

### Dark Mode Best Practices

#### ✅ Do's
- **Maintain Brand Colors**: Keep Core Orange and Bitcoin Gold vibrant in both modes
- **Use Semantic Colors**: Ensure success/warning/error colors are clearly distinguishable
- **Test Contrast**: Verify all text meets accessibility standards
- **Respect User Preference**: Support both system preference and manual toggle
- **Consistent Shadows**: Use appropriate shadow opacity for dark backgrounds

#### ❌ Don'ts
- **Don't Invert Everything**: Carefully choose which elements to adapt
- **Don't Use Pure Black**: Use dark grays for better readability
- **Don't Forget Interactive States**: Ensure hover/focus states work in both modes
- **Don't Ignore Images**: Consider how images and icons appear in dark mode
- **Don't Break Hierarchy**: Maintain visual hierarchy in both light and dark modes

---

## Typography

### Font Stack

#### Primary Font: Inter
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```
- **Usage**: Headings, body text, UI elements
- **Characteristics**: Modern, clean, excellent readability
- **Weights**: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)

#### Monospace Font: JetBrains Mono
```css
font-family: 'JetBrains Mono', 'SF Mono', Monaco, 'Cascadia Code', monospace;
```
- **Usage**: Wallet addresses, transaction hashes, code, numbers
- **Characteristics**: Clear distinction between characters
- **Weights**: 400 (Regular), 500 (Medium), 700 (Bold)

### Typography Scale

#### Headings
```css
/* H1 - Hero Titles */
.text-h1 {
  font-size: 3.5rem; /* 56px */
  line-height: 1.1;
  font-weight: 700;
  letter-spacing: -0.02em;
}

/* H2 - Section Headers */
.text-h2 {
  font-size: 2.5rem; /* 40px */
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: -0.01em;
}

/* H3 - Subsection Headers */
.text-h3 {
  font-size: 1.875rem; /* 30px */
  line-height: 1.3;
  font-weight: 600;
}

/* H4 - Card Titles */
.text-h4 {
  font-size: 1.5rem; /* 24px */
  line-height: 1.4;
  font-weight: 600;
}

/* H5 - Component Headers */
.text-h5 {
  font-size: 1.25rem; /* 20px */
  line-height: 1.4;
  font-weight: 500;
}

/* H6 - Small Headers */
.text-h6 {
  font-size: 1.125rem; /* 18px */
  line-height: 1.4;
  font-weight: 500;
}
```

#### Body Text
```css
/* Large Body */
.text-lg {
  font-size: 1.125rem; /* 18px */
  line-height: 1.6;
  font-weight: 400;
}

/* Regular Body */
.text-base {
  font-size: 1rem; /* 16px */
  line-height: 1.6;
  font-weight: 400;
}

/* Small Text */
.text-sm {
  font-size: 0.875rem; /* 14px */
  line-height: 1.5;
  font-weight: 400;
}

/* Extra Small */
.text-xs {
  font-size: 0.75rem; /* 12px */
  line-height: 1.4;
  font-weight: 400;
}
```

#### Specialized Text
```css
/* Monospace for addresses/hashes */
.text-mono {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875rem;
  line-height: 1.4;
  letter-spacing: 0.025em;
}

/* Large numbers/prices */
.text-price {
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.2;
}

/* Labels and captions */
.text-label {
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  line-height: 1.2;
}
```

### Responsive Typography

```css
/* Mobile-first responsive scaling */
@media (max-width: 768px) {
  .text-h1 { font-size: 2.5rem; }
  .text-h2 { font-size: 2rem; }
  .text-h3 { font-size: 1.5rem; }
  .text-h4 { font-size: 1.25rem; }
}

@media (min-width: 1440px) {
  .text-h1 { font-size: 4rem; }
  .text-h2 { font-size: 3rem; }
}
```

---

## Iconography & Imagery

### Icon System

#### Icon Style: Line Icons
- **Library**: Heroicons v2 or Lucide React
- **Style**: Outline/stroke icons for consistency
- **Stroke Width**: 1.5px for optimal clarity
- **Corner Radius**: Rounded for friendly appearance

#### Icon Sizes
```css
.icon-xs { width: 16px; height: 16px; }
.icon-sm { width: 20px; height: 20px; }
.icon-md { width: 24px; height: 24px; }
.icon-lg { width: 32px; height: 32px; }
.icon-xl { width: 48px; height: 48px; }
```

#### Cryptocurrency Icons
- **Library**: Cryptocurrency-icons or custom SVGs
- **Style**: Filled, circular backgrounds
- **Usage**: Token symbols, chain identifiers
- **Fallback**: First letter of token symbol in colored circle

#### Icon Usage Guidelines

**Navigation Icons**
- Home, Dashboard, Portfolio, Settings
- Always paired with text labels on mobile
- Consistent positioning and spacing

**Action Icons**
- Plus (+) for create/add actions
- Arrow for directional actions (swap, send)
- Check for confirmations
- X for close/cancel actions

**Status Icons**
- Green checkmark for success
- Red X or warning triangle for errors
- Yellow warning triangle for caution
- Blue info circle for information

### Imagery Guidelines

#### Photography Style
- **Not Applicable**: CorePump focuses on data visualization and UI elements
- **Alternative**: Abstract geometric patterns, gradients, and data visualizations

#### Illustration Style
- **Minimal**: Clean, geometric shapes
- **Color**: Limited to brand palette
- **Usage**: Empty states, onboarding, error pages
- **Style**: Flat design with subtle shadows

#### Chart & Data Visualization
- **Style**: Clean, minimal lines
- **Colors**: Brand colors for positive data, semantic colors for status
- **Grid**: Subtle gray lines
- **Typography**: Monospace for numbers, regular for labels

---

## Layout & Spacing

### Grid System

#### 12-Column Responsive Grid
```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (min-width: 768px) {
  .container { padding: 0 2rem; }
}

@media (min-width: 1024px) {
  .container { padding: 0 3rem; }
}
```

#### Breakpoints
```css
/* Mobile First */
--breakpoint-sm: 640px;   /* Small tablets */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Small desktops */
--breakpoint-xl: 1280px;  /* Large desktops */
--breakpoint-2xl: 1536px; /* Extra large */
```

### Spacing System

#### Base Unit: 8px
```css
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-10: 2.5rem;  /* 40px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
--space-20: 5rem;    /* 80px */
--space-24: 6rem;    /* 96px */
```

#### Component Spacing
```css
/* Card padding */
.card-padding { padding: var(--space-6); }

/* Section spacing */
.section-spacing { margin: var(--space-16) 0; }

/* Element spacing */
.element-spacing { margin-bottom: var(--space-4); }

/* Tight spacing */
.tight-spacing { gap: var(--space-2); }

/* Loose spacing */
.loose-spacing { gap: var(--space-8); }
```

### Layout Patterns

#### Header Layout
```css
.header {
  height: 72px;
  padding: 0 var(--space-6);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--gray-200);
}
```

#### Main Content Layout
```css
.main-content {
  min-height: calc(100vh - 72px);
  padding: var(--space-8) 0;
}
```

#### Card Layout
```css
.card {
  background: white;
  border-radius: 12px;
  border: 1px solid var(--gray-200);
  padding: var(--space-6);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
```

---

## UI Components

### Buttons

#### Primary Button (CTA)
```html
<!-- Tailwind Classes -->
<button class="bg-gradient-to-r from-core-orange-500 to-bitcoin-gold-500 text-white border-none rounded-lg px-6 py-3 font-semibold text-base cursor-pointer transition-all duration-200 shadow-core hover:shadow-core-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-core disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none">
  Primary Button
</button>
```

#### Secondary Button
```html
<!-- Tailwind Classes -->
<button class="bg-transparent text-core-orange-500 border-2 border-core-orange-500 rounded-lg px-5 py-2.5 font-semibold text-base cursor-pointer transition-all duration-200 hover:bg-core-orange-500 hover:text-white hover:-translate-y-0.5">
  Secondary Button
</button>
```

#### Ghost Button
```html
<!-- Tailwind Classes -->
<button class="bg-transparent text-gray-700 border-none rounded-lg px-6 py-3 font-medium text-base cursor-pointer transition-all duration-200 hover:bg-gray-100 hover:text-gray-900">
  Ghost Button
</button>
```

#### Button Sizes
```html
<!-- Small Button -->
<button class="px-4 py-2 text-sm">Small</button>

<!-- Medium Button (Default) -->
<button class="px-6 py-3 text-base">Medium</button>

<!-- Large Button -->
<button class="px-8 py-4 text-lg">Large</button>

<!-- Extra Large Button -->
<button class="px-10 py-5 text-xl">Extra Large</button>
```

### Form Elements

#### Input Fields
```html
<!-- Basic Input -->
<input class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-base bg-white transition-all duration-200 focus:outline-none focus:border-core-orange-500 focus:ring-3 focus:ring-core-orange-500/10 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed" 
       type="text" 
       placeholder="Enter text..." />

<!-- Error State Input -->
<input class="w-full px-4 py-3 border-2 border-error-500 rounded-lg text-base bg-white transition-all duration-200 focus:outline-none focus:border-error-500 focus:ring-3 focus:ring-error-500/10" 
       type="text" 
       placeholder="Enter text..." />

<!-- Success State Input -->
<input class="w-full px-4 py-3 border-2 border-success-500 rounded-lg text-base bg-white transition-all duration-200 focus:outline-none focus:border-success-500 focus:ring-3 focus:ring-success-500/10" 
       type="text" 
       placeholder="Enter text..." />
```

#### Select Dropdown
```html
<!-- Custom Select with Tailwind -->
<select class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-base bg-white cursor-pointer appearance-none transition-all duration-200 focus:outline-none focus:border-core-orange-500 focus:ring-3 focus:ring-core-orange-500/10 bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6,9 12,15 18,9\'%3e%3c/polyline%3e%3c/svg%3e')] bg-no-repeat bg-[right_12px_center] bg-[length:16px]">
  <option>Select option...</option>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</select>
```

#### Checkbox & Radio
```html
<!-- Checkbox -->
<input type="checkbox" 
       class="w-5 h-5 border-2 border-gray-300 rounded cursor-pointer transition-all duration-200 checked:bg-core-orange-500 checked:border-core-orange-500 focus:ring-2 focus:ring-core-orange-500/20" />

<!-- Radio Button -->
<input type="radio" 
       name="radio-group"
       class="w-5 h-5 border-2 border-gray-300 rounded-full cursor-pointer transition-all duration-200 checked:bg-core-orange-500 checked:border-core-orange-500 focus:ring-2 focus:ring-core-orange-500/20" />
```

### Cards

#### Basic Card (React Component)
```jsx
// Using the modernized Card component with dark mode support
import { Card } from '@/components/ui/Card';

// Default card
<Card className="mb-4">
  <h3 className="text-xl font-semibold mb-2 text-text-primary dark:text-dark-text-primary">
    Card Title
  </h3>
  <p className="text-text-secondary dark:text-dark-text-secondary">
    Card content goes here...
  </p>
</Card>

// Elevated card with hover effect
<Card variant="elevated" hover={true}>
  <h3 className="text-xl font-semibold mb-2 text-text-primary dark:text-dark-text-primary">
    Elevated Card
  </h3>
  <p className="text-text-secondary dark:text-dark-text-secondary">
    This card has enhanced shadows and hover effects.
  </p>
</Card>

// Outlined card
<Card variant="outlined" padding="lg">
  <h3 className="text-xl font-semibold mb-2 text-text-primary dark:text-dark-text-primary">
    Outlined Card
  </h3>
  <p className="text-text-secondary dark:text-dark-text-secondary">
    This card has a prominent border.
  </p>
</Card>
```

#### TokenCard Component (Dark Mode Ready)
```jsx
// Complete TokenCard implementation with dark mode
import { TokenCard } from '@/components/defi/TokenCard';

const tokenData = {
  id: "pump-token-001",
  name: "PumpCoin",
  symbol: "PUMP",
  description: "The ultimate fair launch token on Core Chain with anti-rug protection.",
  creator: "0x1234567890abcdef1234567890abcdef12345678",
  currentPrice: "0.0045",
  totalCoreRaised: "125000.00",
  tokensSold: "50000000",
  graduated: false,
  createdAt: "1704067200"
};

<TokenCard 
  token={tokenData} 
  priceChange={12.5}
  onClick={() => navigate(`/token/${tokenData.id}`)}
  className="mb-4"
/>

// Graduated token example
const graduatedToken = {
  ...tokenData,
  graduated: true,
  totalCoreRaised: "75000.00"
};

<TokenCard 
  token={graduatedToken}
  priceChange={-2.1}
/>
```

#### Card Variants (CSS Classes)
```html
<!-- Modern Card with Dark Mode Support -->

<!-- Default Card -->
<div class="bg-surface-default dark:bg-dark-surface border border-border-primary dark:border-dark-border-primary rounded-xl p-6 shadow-sm dark:shadow-sm-dark transition-all duration-200">
  <h3 class="text-xl font-semibold mb-2 text-text-primary dark:text-dark-text-primary">Default Card</h3>
  <p class="text-text-secondary dark:text-dark-text-secondary">Card content with proper dark mode support.</p>
</div>

<!-- Elevated Card -->
<div class="bg-surface-elevated dark:bg-dark-surface-elevated border border-border-secondary dark:border-dark-border-secondary rounded-xl p-6 shadow-lg dark:shadow-md-dark transition-all duration-200">
  <h3 class="text-xl font-semibold mb-2 text-text-primary dark:text-dark-text-primary">Elevated Card</h3>
  <p class="text-text-secondary dark:text-dark-text-secondary">Enhanced shadows and elevated appearance.</p>
</div>

<!-- Interactive Card -->
<div class="bg-surface-default dark:bg-dark-surface border border-border-primary dark:border-dark-border-primary rounded-xl p-6 shadow-sm dark:shadow-sm-dark hover:shadow-lg dark:hover:shadow-md-dark hover:-translate-y-0.5 cursor-pointer transition-all duration-200">
  <h3 class="text-xl font-semibold mb-2 text-text-primary dark:text-dark-text-primary">Interactive Card</h3>
  <p class="text-text-secondary dark:text-dark-text-secondary">Hover effects work in both light and dark modes.</p>
</div>

<!-- Token Stats Card -->
<div class="bg-surface-default dark:bg-dark-surface border border-border-primary dark:border-dark-border-primary rounded-xl p-6 text-center shadow-sm dark:shadow-sm-dark">
  <div class="text-3xl font-mono font-bold text-core-orange-500 mb-2">$2.4M</div>
  <div class="text-sm text-text-tertiary dark:text-dark-text-tertiary uppercase tracking-wider font-medium">Total Volume</div>
  <div class="mt-2 flex items-center justify-center gap-1 text-success-500 dark:text-dark-success">
    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
    </svg>
    <span class="text-sm">+15.3%</span>
  </div>
</div>
```

#### Token List Card Pattern
```html
<!-- Complete Token Card HTML Implementation -->
<div class="bg-surface-default dark:bg-dark-surface border border-border-primary dark:border-dark-border-primary rounded-xl p-6 relative overflow-hidden hover:shadow-lg dark:hover:shadow-md-dark hover:-translate-y-0.5 cursor-pointer transition-all duration-200">
  <!-- Graduation Badge -->
  <div class="absolute top-4 right-4 bg-success-500 dark:bg-dark-success text-white text-xs font-medium px-2 py-1 rounded-full shadow-sm">
    Graduated
  </div>

  <!-- Token Header -->
  <div class="flex items-center gap-4 mb-4">
    <!-- Token Icon -->
    <div class="w-12 h-12 rounded-full bg-gradient-to-r from-core-orange-500 to-bitcoin-gold-500 flex items-center justify-center text-white font-semibold text-lg">
      P
    </div>
    
    <!-- Token Info -->
    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-2">
        <h3 class="font-semibold text-lg text-text-primary dark:text-dark-text-primary truncate">
          PumpCoin
        </h3>
        <svg class="w-4 h-4 text-text-tertiary dark:text-dark-text-tertiary flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6m4-3h6v6m-11 5L21 3"/>
        </svg>
      </div>
      <p class="text-sm text-text-secondary dark:text-dark-text-secondary font-medium">PUMP</p>
      <p class="text-xs text-text-tertiary dark:text-dark-text-tertiary font-mono">
        by 0x1234...5678
      </p>
    </div>
  </div>

  <!-- Description -->
  <p class="text-sm text-text-secondary dark:text-dark-text-secondary mb-4 line-clamp-2">
    The ultimate fair launch token on Core Chain with anti-rug protection and community governance.
  </p>

  <!-- Price and Stats -->
  <div class="space-y-3">
    <!-- Current Price -->
    <div class="flex items-center justify-between">
      <span class="text-sm text-text-secondary dark:text-dark-text-secondary">Price</span>
      <div class="flex items-center gap-2">
        <span class="text-price text-text-primary dark:text-dark-text-primary">
          0.0045 CORE
        </span>
        <div class="flex items-center gap-1 text-sm text-success-500 dark:text-dark-success">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
            <polyline points="17 6 23 6 23 12"/>
          </svg>
          <span>+12.5%</span>
        </div>
      </div>
    </div>

    <!-- Market Cap -->
    <div class="flex items-center justify-between">
      <span class="text-sm text-text-secondary dark:text-dark-text-secondary">Market Cap</span>
      <span class="text-sm font-medium text-text-primary dark:text-dark-text-primary">
        125.0K CORE
      </span>
    </div>

    <!-- Progress to Graduation -->
    <div class="space-y-2">
      <div class="flex items-center justify-between">
        <span class="text-sm text-text-secondary dark:text-dark-text-secondary">Progress to DEX</span>
        <span class="text-sm font-medium text-text-primary dark:text-dark-text-primary">
          65.0%
        </span>
      </div>
      <div class="w-full bg-surface-hover dark:bg-dark-surface-hover rounded-full h-2">
        <div class="bg-gradient-to-r from-core-orange-500 to-bitcoin-gold-500 h-2 rounded-full transition-all duration-300" style="width: 65%"></div>
      </div>
    </div>
  </div>

  <!-- Creation Date -->
  <div class="mt-4 pt-4 border-t border-border-secondary dark:border-dark-border-secondary">
    <span class="text-xs text-text-tertiary dark:text-dark-text-tertiary">
      Created January 1, 2024
    </span>
  </div>
</div>
```

#### Card Component Props & Usage

```typescript
// Card Component Interface
interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined' | 'ghost';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  children: React.ReactNode;
  className?: string;
}

// Usage Examples
<Card variant="default" padding="md" hover={false}>
  {/* Card content */}
</Card>

<Card variant="elevated" padding="lg" hover={true}>
  {/* Interactive card with enhanced styling */}
</Card>

<Card variant="outlined" padding="sm">
  {/* Card with prominent border */}
</Card>

<Card variant="ghost" padding="none">
  {/* Transparent card for overlay content */}
</Card>
```

### Navigation

#### Header Navigation
```html
<!-- Header Navigation with Tailwind -->
<nav class="flex items-center gap-8">
  <a href="/launch" class="text-gray-700 no-underline font-medium px-4 py-2 rounded-md transition-all duration-200 hover:text-core-orange-500 hover:bg-core-orange-500/10">
    Launch
  </a>
  <a href="/trade" class="text-core-orange-500 no-underline font-medium px-4 py-2 rounded-md bg-core-orange-500/10 transition-all duration-200">
    Trade
  </a>
  <a href="/portfolio" class="text-gray-700 no-underline font-medium px-4 py-2 rounded-md transition-all duration-200 hover:text-core-orange-500 hover:bg-core-orange-500/10">
    Portfolio
  </a>
</nav>
```

#### Wallet Connection
```html
<!-- Wallet Connect Button -->
<button class="bg-gradient-to-r from-core-orange-500 to-bitcoin-gold-500 text-white border-none rounded-lg px-5 py-2.5 font-semibold cursor-pointer flex items-center gap-2 transition-all duration-200 hover:-translate-y-0.5">
  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 18v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v1"/>
  </svg>
  Connect Wallet
</button>

<!-- Connected State -->
<button class="bg-success-500 text-white border-none rounded-lg px-5 py-2.5 font-semibold flex items-center gap-2">
  <div class="w-2 h-2 bg-white rounded-full"></div>
  0x1234...5678
</button>
```

### Modals & Overlays

#### Modal Base
```html
<!-- Modal Overlay with Tailwind -->
<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
  <!-- Modal Container -->
  <div class="bg-white rounded-2xl p-8 max-w-md w-[90%] max-h-[90vh] overflow-y-auto shadow-2xl">
    <!-- Modal Header -->
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-2xl font-semibold text-gray-900">Modal Title</h3>
      <button class="bg-none border-none cursor-pointer p-2 rounded-md transition-colors duration-200 hover:bg-gray-100">
        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
    </div>
    
    <!-- Modal Content -->
    <div class="modal-content">
      <p>Modal content goes here...</p>
    </div>
    
    <!-- Modal Footer -->
    <div class="flex justify-end gap-3 mt-6">
      <button class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
        Cancel
      </button>
      <button class="px-4 py-2 bg-core-orange-500 text-white rounded-lg hover:bg-core-orange-600 transition-colors duration-200">
        Confirm
      </button>
    </div>
  </div>
</div>
```

### Loading States

#### Spinner
```html
<!-- Tailwind Spinner -->
<div class="w-6 h-6 border-3 border-gray-200 border-t-core-orange-500 rounded-full animate-spin"></div>

<!-- Different Sizes -->
<div class="w-4 h-4 border-2 border-gray-200 border-t-core-orange-500 rounded-full animate-spin"></div>
<div class="w-8 h-8 border-4 border-gray-200 border-t-core-orange-500 rounded-full animate-spin"></div>
<div class="w-12 h-12 border-4 border-gray-200 border-t-core-orange-500 rounded-full animate-spin"></div>
```

#### Skeleton Loading
```html
<!-- Skeleton Text Lines -->
<div class="animate-pulse">
  <div class="h-4 bg-gray-200 rounded mb-2"></div>
  <div class="h-4 bg-gray-200 rounded mb-2 w-4/5"></div>
  <div class="h-4 bg-gray-200 rounded mb-2 w-3/5"></div>
</div>

<!-- Skeleton Card -->
<div class="animate-pulse">
  <div class="h-6 bg-gray-200 rounded w-3/5 mb-4"></div>
  <div class="h-4 bg-gray-200 rounded mb-2"></div>
  <div class="h-4 bg-gray-200 rounded mb-2"></div>
  <div class="h-4 bg-gray-200 rounded w-4/5"></div>
</div>

<!-- Skeleton Avatar + Text -->
<div class="animate-pulse flex items-center gap-4">
  <div class="w-12 h-12 bg-gray-200 rounded-full"></div>
  <div class="flex-1">
    <div class="h-4 bg-gray-200 rounded mb-2"></div>
    <div class="h-3 bg-gray-200 rounded w-2/3"></div>
  </div>
</div>
```

### Alerts & Notifications

#### Alert Base
```html
<!-- Success Alert -->
<div class="p-4 rounded-lg border flex items-center gap-3 mb-4 bg-success-50 border-success-500 text-success-900">
  <svg class="w-5 h-5 text-success-500" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
  </svg>
  <span>Operation completed successfully!</span>
</div>

<!-- Warning Alert -->
<div class="p-4 rounded-lg border flex items-center gap-3 mb-4 bg-warning-50 border-warning-500 text-warning-900">
  <svg class="w-5 h-5 text-warning-500" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
  </svg>
  <span>Please review your input before proceeding.</span>
</div>

<!-- Error Alert -->
<div class="p-4 rounded-lg border flex items-center gap-3 mb-4 bg-error-50 border-error-500 text-error-900">
  <svg class="w-5 h-5 text-error-500" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
  </svg>
  <span>An error occurred. Please try again.</span>
</div>

<!-- Info Alert -->
<div class="p-4 rounded-lg border flex items-center gap-3 mb-4 bg-info-50 border-info-500 text-info-900">
  <svg class="w-5 h-5 text-info-500" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
  </svg>
  <span>Here's some helpful information for you.</span>
</div>
```

#### Toast Notifications
```html
<!-- Toast Container (fixed positioning) -->
<div class="fixed top-6 right-6 z-50 space-y-3">
  <!-- Success Toast -->
  <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-lg animate-slide-in max-w-sm">
    <div class="flex items-center gap-3">
      <div class="w-8 h-8 bg-success-500 rounded-full flex items-center justify-center">
        <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 12l2 2 4-4"/>
        </svg>
      </div>
      <div class="flex-1">
        <h4 class="font-medium text-gray-900">Success!</h4>
        <p class="text-sm text-gray-600">Your transaction was completed.</p>
      </div>
      <button class="text-gray-400 hover:text-gray-600">
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
  </div>
  
  <!-- Error Toast -->
  <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-lg animate-slide-in max-w-sm">
    <div class="flex items-center gap-3">
      <div class="w-8 h-8 bg-error-500 rounded-full flex items-center justify-center">
        <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </div>
      <div class="flex-1">
        <h4 class="font-medium text-gray-900">Error</h4>
        <p class="text-sm text-gray-600">Transaction failed. Please try again.</p>
      </div>
      <button class="text-gray-400 hover:text-gray-600">
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
  </div>
</div>
```

---

## Motion & Interaction

### Animation Principles

#### Easing Curves
```css
--ease-out: cubic-bezier(0.25, 0.46, 0.45, 0.94);
--ease-in: cubic-bezier(0.55, 0.055, 0.675, 0.19);
--ease-in-out: cubic-bezier(0.645, 0.045, 0.355, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

#### Duration Standards
```css
--duration-fast: 150ms;    /* Micro-interactions */
--duration-normal: 200ms;  /* Standard transitions */
--duration-slow: 300ms;    /* Complex animations */
--duration-slower: 500ms;  /* Page transitions */
```

### Hover Effects

#### Button Hover
```css
.btn:hover {
  transform: translateY(-1px);
  transition: transform var(--duration-normal) var(--ease-out);
}
```

#### Card Hover
```css
.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transition: all var(--duration-normal) var(--ease-out);
}
```

#### Icon Hover
```css
.icon:hover {
  transform: scale(1.1);
  transition: transform var(--duration-fast) var(--ease-out);
}
```

### Focus States

#### Focus Ring
```css
.focus-ring:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.2);
  transition: box-shadow var(--duration-fast) var(--ease-out);
}
```

### Loading Animations

#### Pulse Effect
```css
.pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

#### Fade In
```css
.fade-in {
  animation: fadeIn var(--duration-slow) var(--ease-out);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
```

### Page Transitions

#### Slide Transitions
```css
.slide-enter {
  transform: translateX(100%);
  opacity: 0;
}

.slide-enter-active {
  transform: translateX(0);
  opacity: 1;
  transition: all var(--duration-slow) var(--ease-out);
}

.slide-exit {
  transform: translateX(0);
  opacity: 1;
}

.slide-exit-active {
  transform: translateX(-100%);
  opacity: 0;
  transition: all var(--duration-slow) var(--ease-out);
}
```

### Transaction States

#### Pending State
```css
.tx-pending {
  background: var(--warning-bg);
  border: 1px solid var(--warning);
  border-radius: 8px;
  padding: var(--space-4);
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.tx-pending .spinner {
  border-top-color: var(--warning);
}
```

#### Success State
```css
.tx-success {
  background: var(--success-bg);
  border: 1px solid var(--success);
  border-radius: 8px;
  padding: var(--space-4);
  display: flex;
  align-items: center;
  gap: var(--space-3);
  animation: successPulse 0.6s ease-out;
}

@keyframes successPulse {
  0% { transform: scale(0.95); opacity: 0.8; }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); opacity: 1; }
}
```

#### Error State
```css
.tx-error {
  background: var(--error-bg);
  border: 1px solid var(--error);
  border-radius: 8px;
  padding: var(--space-4);
  display: flex;
  align-items: center;
  gap: var(--space-3);
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}
```

---

## Accessibility

### WCAG 2.1 AA Compliance

#### Color Contrast Requirements
- **Normal text**: Minimum 4.5:1 contrast ratio
- **Large text** (18px+ or 14px+ bold): Minimum 3:1 contrast ratio
- **UI components**: Minimum 3:1 contrast ratio for borders and states

#### Keyboard Navigation
```css
/* Focus management */
.focusable:focus {
  outline: 2px solid var(--core-orange);
  outline-offset: 2px;
}

/* Skip links */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--core-orange);
  color: white;
  padding: 8px;
  text-decoration: none;
  border-radius: 4px;
  z-index: 1000;
}

.skip-link:focus {
  top: 6px;
}
```

#### Screen Reader Support
```html
<!-- ARIA Labels for buttons -->
<button aria-label="Connect wallet to start trading">
  Connect Wallet
</button>

<!-- ARIA Descriptions for complex interactions -->
<button 
  aria-describedby="launch-token-help"
  aria-label="Launch new token"
>
  Launch Token
</button>
<div id="launch-token-help" class="sr-only">
  Creates a new token with fair launch mechanics and anti-rug protection
</div>

<!-- Screen reader only text -->
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

#### Form Accessibility
```html
<!-- Proper form labeling -->
<label for="token-name" class="text-label">Token Name</label>
<input 
  id="token-name"
  type="text"
  class="input"
  aria-required="true"
  aria-describedby="token-name-error"
/>
<div id="token-name-error" class="text-error" role="alert">
  Token name must be between 3-20 characters
</div>
```

#### Loading States Accessibility
```html
<!-- Accessible loading indicators -->
<button disabled aria-busy="true">
  <span class="spinner" aria-hidden="true"></span>
  <span class="sr-only">Processing transaction...</span>
  Processing...
</button>
```

### Mobile Accessibility

#### Touch Targets
```css
/* Minimum 44px touch targets */
.touch-target {
  min-height: 44px;
  min-width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

#### Responsive Text Scaling
```css
/* Support for user text scaling preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Usage Examples & Guidelines

### DeFi-Specific Components

#### Token Launch Interface
```html
<div class="card">
  <div class="card-header">
    <h3 class="text-h4">Launch Your Token</h3>
    <span class="badge badge-success">Fair Launch</span>
  </div>
  
  <form class="launch-form">
    <div class="form-group">
      <label for="token-name" class="text-label">Token Name</label>
      <input 
        id="token-name"
        type="text"
        class="input"
        placeholder="Enter token name..."
        maxlength="20"
      />
    </div>
    
    <div class="form-group">
      <label for="token-symbol" class="text-label">Token Symbol</label>
      <input 
        id="token-symbol"
        type="text"
        class="input"
        placeholder="e.g., PUMP"
        maxlength="10"
      />
    </div>
    
    <div class="form-group">
      <label for="token-description" class="text-label">Description</label>
      <textarea 
        id="token-description"
        class="input"
        rows="3"
        placeholder="Describe your token..."
        maxlength="200"
      ></textarea>
    </div>
    
    <div class="launch-fee">
      <div class="fee-info">
        <span class="text-label">Launch Fee</span>
        <span class="text-price">1 CORE</span>
      </div>
      <p class="text-sm text-gray-600">
        One-time fee to deploy your token with built-in protections
      </p>
    </div>
    
    <button type="submit" class="btn-primary btn-lg w-full">
      Launch Token
    </button>
  </form>
</div>
```

#### Trading Interface
```html
<div class="trading-card">
  <div class="trading-header">
    <div class="token-pair">
      <div class="token-info">
        <div class="token-icon">P</div>
        <div>
          <h4 class="text-h5">PUMP</h4>
          <p class="text-sm text-gray-600">PumpCoin</p>
        </div>
      </div>
      <div class="price-info">
        <div class="text-price text-success">$0.0045</div>
        <div class="text-sm text-success">+12.5%</div>
      </div>
    </div>
  </div>
  
  <div class="bonding-curve">
    <div class="progress-bar">
      <div class="progress-fill" style="width: 65%"></div>
    </div>
    <div class="progress-info">
      <span class="text-sm">Progress to DEX</span>
      <span class="text-sm text-mono">65%</span>
    </div>
  </div>
  
  <div class="trade-form">
    <div class="trade-tabs">
      <button class="tab-button active">Buy</button>
      <button class="tab-button">Sell</button>
    </div>
    
    <div class="trade-input">
      <label class="text-label">You Pay</label>
      <div class="input-group">
        <input type="number" class="input" placeholder="0.0" />
        <div class="input-suffix">CORE</div>
      </div>
    </div>
    
    <div class="trade-arrow">
      <svg class="icon-md" viewBox="0 0 24 24">
        <path d="M7 14l5-5 5 5z"/>
      </svg>
    </div>
    
    <div class="trade-input">
      <label class="text-label">You Receive</label>
      <div class="input-group">
        <input type="number" class="input" placeholder="0.0" readonly />
        <div class="input-suffix">PUMP</div>
      </div>
    </div>
    
    <div class="trade-details">
      <div class="detail-row">
        <span class="text-sm">Price Impact</span>
        <span class="text-sm text-warning">0.5%</span>
      </div>
      <div class="detail-row">
        <span class="text-sm">Platform Fee</span>
        <span class="text-sm">1%</span>
      </div>
    </div>
    
    <button class="btn-primary btn-lg w-full">
      Buy PUMP
    </button>
  </div>
</div>
```

#### Wallet Connection Modal
```html
<div class="modal-overlay">
  <div class="modal">
    <div class="modal-header">
      <h3 class="modal-title">Connect Wallet</h3>
      <button class="modal-close" aria-label="Close modal">
        <svg class="icon-md" viewBox="0 0 24 24">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
    </div>
    
    <div class="wallet-options">
      <button class="wallet-option">
        <img src="/metamask-icon.svg" alt="MetaMask" class="wallet-icon" />
        <div>
          <div class="text-h6">MetaMask</div>
          <div class="text-sm text-gray-600">Connect using browser wallet</div>
        </div>
      </button>
      
      <button class="wallet-option">
        <img src="/walletconnect-icon.svg" alt="WalletConnect" class="wallet-icon" />
        <div>
          <div class="text-h6">WalletConnect</div>
          <div class="text-sm text-gray-600">Connect using mobile wallet</div>
        </div>
      </button>
      
      <button class="wallet-option">
        <img src="/coinbase-icon.svg" alt="Coinbase Wallet" class="wallet-icon" />
        <div>
          <div class="text-h6">Coinbase Wallet</div>
          <div class="text-sm text-gray-600">Connect using Coinbase</div>
        </div>
      </button>
    </div>
    
    <div class="modal-footer">
      <p class="text-xs text-gray-500 text-center">
        By connecting a wallet, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>
  </div>
</div>
```

### Do's and Don'ts

#### ✅ Do's

**Color Usage**
- Use Core Orange for primary actions and brand elements
- Use semantic colors consistently (green for success, red for errors)
- Maintain proper contrast ratios for accessibility
- Use gradients sparingly for key CTAs and highlights

**Typography**
- Use Inter for all UI text for consistency
- Use JetBrains Mono for addresses, hashes, and numerical data
- Maintain proper hierarchy with consistent heading sizes
- Keep line lengths readable (45-75 characters)

**Layout**
- Follow the 8px spacing system consistently
- Use the 12-column grid for responsive layouts
- Maintain consistent card padding and margins
- Ensure touch targets are at least 44px on mobile

**Interactions**
- Provide clear feedback for all user actions
- Use loading states for async operations
- Implement proper focus management for accessibility
- Keep animations subtle and purposeful

#### ❌ Don'ts

**Color Usage**
- Don't use colors that don't meet accessibility standards
- Don't use red and green as the only way to convey information
- Don't overuse gradients or bright colors
- Don't use Core Orange for destructive actions

**Typography**
- Don't mix multiple font families unnecessarily
- Don't use all caps for large amounts of text
- Don't use font sizes smaller than 12px
- Don't sacrifice readability for style

**Layout**
- Don't break the spacing system with arbitrary values
- Don't create layouts that don't work on mobile
- Don't overcrowd interfaces with too many elements
- Don't ignore the grid system for alignment

**Interactions**
- Don't create interactions without clear feedback
- Don't use animations longer than 500ms
- Don't disable functionality without explanation
- Don't forget to handle error states

### Component Combinations

#### Dashboard Layout
```html
<div class="dashboard">
  <header class="header">
    <div class="container">
      <div class="nav-header">
        <div class="logo">
          <img src="/logo.svg" alt="CorePump" />
        </div>
        <nav class="nav-links">
          <a href="/launch" class="nav-link">Launch</a>
          <a href="/trade" class="nav-link active">Trade</a>
          <a href="/portfolio" class="nav-link">Portfolio</a>
        </nav>
        <button class="wallet-connect">
          Connect Wallet
        </button>
      </div>
    </div>
  </header>
  
  <main class="main-content">
    <div class="container">
      <div class="dashboard-grid">
        <div class="stats-section">
          <div class="stats-card">
            <div class="stats-value">$2.4M</div>
            <div class="stats-label">Total Volume</div>
          </div>
          <div class="stats-card">
            <div class="stats-value">156</div>
            <div class="stats-label">Active Tokens</div>
          </div>
          <div class="stats-card">
            <div class="stats-value">$45K</div>
            <div class="stats-label">Your Portfolio</div>
          </div>
        </div>
        
        <div class="tokens-section">
          <h2 class="text-h3">Trending Tokens</h2>
          <div class="token-list">
            <!-- Token cards go here -->
          </div>
        </div>
      </div>
    </div>
  </main>
</div>
```

### Responsive Behavior

#### Mobile-First Approach
```css
/* Mobile styles (default) */
.dashboard-grid {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.stats-section {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
}

/* Tablet styles */
@media (min-width: 768px) {
  .stats-section {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop styles */
@media (min-width: 1024px) {
  .dashboard-grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: var(--space-8);
  }
  
  .stats-section {
    grid-template-columns: 1fr;
  }
}
```

---

## Implementation Notes

### Modern Tailwind CSS v4 Implementation

*CorePump uses the latest Tailwind CSS v4 with OKLCH color space and `@theme` blocks for maximum flexibility and consistency*

#### CSS Implementation Using `@theme` Blocks
```css
@import "tailwindcss";

/* Modern Tailwind CSS v4 approach using @theme blocks */
@theme {
  /* ===== BRAND COLORS ===== */
  /* Core Orange - Primary brand color */
  --color-core-orange-50: oklch(0.97 0.02 45);   /* Light tint */
  --color-core-orange-100: oklch(0.92 0.05 45);  /* Very light */
  --color-core-orange-200: oklch(0.85 0.08 45);  /* Light */
  --color-core-orange-300: oklch(0.78 0.12 45);  /* Medium light */
  --color-core-orange-400: oklch(0.70 0.15 45);  /* Medium */
  --color-core-orange-500: oklch(0.65 0.18 45);  /* Primary (#FF6B35 equivalent) */
  --color-core-orange-600: oklch(0.58 0.16 45);  /* Medium dark */
  --color-core-orange-700: oklch(0.50 0.14 45);  /* Dark */
  --color-core-orange-800: oklch(0.42 0.12 45);  /* Very dark */
  --color-core-orange-900: oklch(0.35 0.10 45);  /* Darkest */
  --color-core-orange-950: oklch(0.25 0.08 45);  /* Ultra dark */

  /* Bitcoin Gold - Secondary brand color */
  --color-bitcoin-gold-50: oklch(0.98 0.02 85);   /* Light tint */
  --color-bitcoin-gold-100: oklch(0.95 0.05 85);  /* Very light */
  --color-bitcoin-gold-200: oklch(0.90 0.08 85);  /* Light */
  --color-bitcoin-gold-300: oklch(0.83 0.12 85);  /* Medium light */
  --color-bitcoin-gold-400: oklch(0.75 0.15 85);  /* Medium */
  --color-bitcoin-gold-500: oklch(0.68 0.18 85);  /* Primary (#F7931A equivalent) */
  --color-bitcoin-gold-600: oklch(0.60 0.16 85);  /* Medium dark */
  --color-bitcoin-gold-700: oklch(0.52 0.14 85);  /* Dark */
  --color-bitcoin-gold-800: oklch(0.44 0.12 85);  /* Very dark */
  --color-bitcoin-gold-900: oklch(0.36 0.10 85);  /* Darkest */
  --color-bitcoin-gold-950: oklch(0.26 0.08 85);  /* Ultra dark */

  /* ===== SEMANTIC COLORS ===== */
  /* Success - Green (complete 50-950 scale) */
  --color-success-50: oklch(0.97 0.03 155);
  --color-success-100: oklch(0.94 0.06 155);
  --color-success-200: oklch(0.88 0.10 155);
  --color-success-300: oklch(0.80 0.15 155);
  --color-success-400: oklch(0.70 0.20 155);
  --color-success-500: oklch(0.62 0.22 155);  /* Primary */
  --color-success-600: oklch(0.55 0.20 155);
  --color-success-700: oklch(0.47 0.17 155);
  --color-success-800: oklch(0.39 0.14 155);
  --color-success-900: oklch(0.32 0.12 155);
  --color-success-950: oklch(0.22 0.08 155);

  /* Warning - Amber (complete 50-950 scale) */
  --color-warning-50: oklch(0.98 0.02 80);
  --color-warning-100: oklch(0.95 0.05 80);
  --color-warning-200: oklch(0.90 0.10 80);
  --color-warning-300: oklch(0.83 0.15 80);
  --color-warning-400: oklch(0.75 0.18 80);
  --color-warning-500: oklch(0.68 0.20 80);   /* Primary */
  --color-warning-600: oklch(0.60 0.18 80);
  --color-warning-700: oklch(0.52 0.16 80);
  --color-warning-800: oklch(0.44 0.14 80);
  --color-warning-900: oklch(0.36 0.12 80);
  --color-warning-950: oklch(0.26 0.08 80);

  /* Error - Red (complete 50-950 scale) */
  --color-error-50: oklch(0.97 0.02 20);
  --color-error-100: oklch(0.93 0.05 20);
  --color-error-200: oklch(0.87 0.08 20);
  --color-error-300: oklch(0.79 0.12 20);
  --color-error-400: oklch(0.70 0.16 20);
  --color-error-500: oklch(0.62 0.19 20);     /* Primary */
  --color-error-600: oklch(0.55 0.17 20);
  --color-error-700: oklch(0.47 0.15 20);
  --color-error-800: oklch(0.39 0.13 20);
  --color-error-900: oklch(0.32 0.11 20);
  --color-error-950: oklch(0.22 0.08 20);

  /* Info - Cyan (complete 50-950 scale) */
  --color-info-50: oklch(0.97 0.02 200);
  --color-info-100: oklch(0.93 0.05 200);
  --color-info-200: oklch(0.87 0.08 200);
  --color-info-300: oklch(0.79 0.12 200);
  --color-info-400: oklch(0.70 0.16 200);
  --color-info-500: oklch(0.62 0.19 200);     /* Primary */
  --color-info-600: oklch(0.55 0.17 200);
  --color-info-700: oklch(0.47 0.15 200);
  --color-info-800: oklch(0.39 0.13 200);
  --color-info-900: oklch(0.32 0.11 200);
  --color-info-950: oklch(0.22 0.08 200);

  /* ===== NEUTRAL COLORS ===== */
  /* Gray - Using Tailwind's default OKLCH gray scale */
  --color-gray-50: oklch(0.985 0.002 264.542);
  --color-gray-100: oklch(0.967 0.003 264.542);
  --color-gray-200: oklch(0.928 0.006 264.531);
  --color-gray-300: oklch(0.872 0.010 258.338);
  --color-gray-400: oklch(0.707 0.022 261.325);
  --color-gray-500: oklch(0.551 0.027 264.364);
  --color-gray-600: oklch(0.446 0.030 256.802);
  --color-gray-700: oklch(0.373 0.034 259.733);
  --color-gray-800: oklch(0.278 0.033 256.848);
  --color-gray-900: oklch(0.210 0.034 264.665);
  --color-gray-950: oklch(0.130 0.028 261.692);

  /* ===== SYSTEM COLORS (AUTOMATIC LIGHT/DARK) ===== */
  /* Background colors with automatic theme switching */
  --color-background-primary: light-dark(oklch(1 0 0), oklch(0.04 0 0));
  --color-background-secondary: light-dark(oklch(0.96 0 0), oklch(0.07 0 0));
  --color-background-tertiary: light-dark(oklch(0.90 0 0), oklch(0.10 0 0));

  /* Surface colors */
  --color-surface-default: light-dark(oklch(1 0 0), oklch(0.12 0 0));
  --color-surface-elevated: light-dark(oklch(1 0 0), oklch(0.15 0 0));
  --color-surface-hover: light-dark(oklch(0.96 0 0), oklch(0.17 0 0));

  /* Text colors */
  --color-text-primary: light-dark(oklch(0.10 0 0), oklch(1 0 0));
  --color-text-secondary: light-dark(oklch(0.32 0 0), oklch(0.90 0 0));
  --color-text-tertiary: light-dark(oklch(0.45 0 0), oklch(0.70 0 0));
  --color-text-disabled: light-dark(oklch(0.64 0 0), oklch(0.40 0 0));
  --color-text-inverse: light-dark(oklch(1 0 0), oklch(0.10 0 0));

  /* Border colors */
  --color-border-primary: light-dark(oklch(0.90 0 0), oklch(0.20 0 0));
  --color-border-secondary: light-dark(oklch(0.83 0 0), oklch(0.17 0 0));
  --color-border-focus: var(--color-core-orange-500);

  /* ===== TRADITIONAL DARK MODE COLORS ===== */
  /* Manual dark mode colors with familiar names */
  --color-dark-bg-primary: oklch(0.04 0 0);      /* #0A0A0A */
  --color-dark-bg-secondary: oklch(0.07 0 0);    /* #111111 */
  --color-dark-bg-tertiary: oklch(0.10 0 0);     /* #1A1A1A */
  --color-dark-surface: oklch(0.12 0 0);         /* #1E1E1E */
  --color-dark-surface-elevated: oklch(0.15 0 0); /* #252525 */
  --color-dark-surface-hover: oklch(0.17 0 0);   /* #2A2A2A */
  --color-dark-text-primary: oklch(1 0 0);       /* #FFFFFF */
  --color-dark-text-secondary: oklch(0.90 0 0);  /* #E5E5E5 */
  --color-dark-text-tertiary: oklch(0.70 0 0);   /* #B3B3B3 */
  --color-dark-text-disabled: oklch(0.40 0 0);   /* #666666 */
  --color-dark-border-primary: oklch(0.20 0 0);  /* #333333 */
  --color-dark-border-secondary: oklch(0.17 0 0); /* #2A2A2A */

  /* Dark mode semantic colors */
  --color-dark-success: oklch(0.65 0.15 155);    /* Optimized for dark backgrounds */
  --color-dark-warning: oklch(0.78 0.12 85);
  --color-dark-error: oklch(0.68 0.18 20);
  --color-dark-info: oklch(0.72 0.14 200);

  /* ===== UTILITY COLORS ===== */
  --color

### React Component Examples
```jsx
// Button Component
const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  loading = false,
  ...props 
}) => {
  const baseClasses = 'font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-3 focus:ring-core-orange/20';
  
  const variants = {
    primary: 'bg-gradient-to-r from-core-orange to-bitcoin-gold text-white hover:shadow-lg hover:-translate-y-0.5',
    secondary: 'border-2 border-core-orange text-core-orange hover:bg-core-orange hover:text-white',
    ghost: 'text-gray-700 hover:bg-gray-100'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={loading}
      {...props}
    >
      {loading && <Spinner className="mr-2" />}
      {children}
    </button>
  );
};
```

---

## Conclusion

This design system provides a comprehensive foundation for building the CorePump DeFi application with consistency, accessibility, and modern web standards. The system is designed to be:

- **Scalable**: Easy to extend with new components and patterns
- **Accessible**: WCAG 2.1 AA compliant from the ground up
- **Maintainable**: Clear guidelines and consistent patterns
- **Modern**: Following current DeFi and Web3 design trends
- **Brand-Aligned**: Reflecting CorePump's values and Core Chain's identity

Regular updates and refinements should be made based on user feedback and evolving design trends in the DeFi space.

---

*Last updated: January 2025*
*Version: 1.0*
