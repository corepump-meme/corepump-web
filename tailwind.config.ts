import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Brand Colors (consistent across themes)
        'core-orange': {
          50: '#FFF4F0',
          100: '#FFE4D6',
          500: '#FF6B35',
          600: '#E55A2B',
          900: '#B8441F',
        },
        'bitcoin-gold': {
          50: '#FFFBF5',
          100: '#FFF2E0',
          500: '#F7931A',
          600: '#D4780E',
          900: '#B8690A',
        },
        
        // Light Mode Semantic Colors
        'success': {
          50: '#F0FFF8',
          500: '#00FF88',
          600: '#00CC6A',
          900: '#00A855',
        },
        'warning': {
          50: '#FFFBF0',
          500: '#FFB800',
          600: '#CC9300',
          900: '#996F00',
        },
        'error': {
          50: '#FFF5F5',
          500: '#FF3B30',
          600: '#CC2F26',
          900: '#99231C',
        },
        'info': {
          50: '#F0FCFF',
          500: '#00D4FF',
          600: '#00A8CC',
          900: '#007C99',
        },
        
        // CSS Custom Properties Integration
        background: {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          tertiary: 'var(--bg-tertiary)',
        },
        surface: {
          DEFAULT: 'var(--surface)',
          elevated: 'var(--surface-elevated)',
          hover: 'var(--surface-hover)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
          disabled: 'var(--text-disabled)',
          mono: 'var(--text-mono)',
        },
        border: {
          primary: 'var(--border-primary)',
          secondary: 'var(--border-secondary)',
          focus: 'var(--border-focus)',
        },
        
        // Dark Mode Specific Colors
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
          'text-mono': '#F0F0F0',
          'border-primary': '#333333',
          'border-secondary': '#2A2A2A',
          'success': '#00E676',
          'success-bg': '#0D2818',
          'success-border': '#1B4D2E',
          'warning': '#FFD54F',
          'warning-bg': '#2A2416',
          'warning-border': '#4A3F1A',
          'error': '#FF5252',
          'error-bg': '#2A1616',
          'error-border': '#4A1F1F',
          'info': '#29B6F6',
          'info-bg': '#16252A',
          'info-border': '#1F3A4A',
        }
      },
      
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'mono': ['JetBrains Mono', 'SF Mono', 'Monaco', 'Cascadia Code', 'monospace'],
      },
      
      fontSize: {
        'h1': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h2': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'h3': ['1.875rem', { lineHeight: '1.3', fontWeight: '600' }],
        'h4': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],
        'h5': ['1.25rem', { lineHeight: '1.4', fontWeight: '500' }],
        'h6': ['1.125rem', { lineHeight: '1.4', fontWeight: '500' }],
        'price': ['1.5rem', { lineHeight: '1.2', fontWeight: '600' }],
        'label': ['0.75rem', { lineHeight: '1.2', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' }],
      },
      
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'success-pulse': 'successPulse 0.6s ease-out',
        'shake': 'shake 0.5s ease-in-out',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        successPulse: {
          '0%': { transform: 'scale(0.95)', opacity: '0.8' },
          '50%': { transform: 'scale(1.02)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
      },
      
      boxShadow: {
        'core': '0 2px 4px rgba(255, 107, 53, 0.2)',
        'core-lg': '0 4px 8px rgba(255, 107, 53, 0.3)',
        'core-dark': '0 2px 8px rgba(255, 107, 53, 0.2)',
        'sm-dark': '0 1px 2px rgba(0, 0, 0, 0.3)',
        'md-dark': '0 4px 8px rgba(0, 0, 0, 0.4)',
        'lg-dark': '0 8px 16px rgba(0, 0, 0, 0.5)',
      },
      
      transitionDuration: {
        'fast': '150ms',
        'normal': '200ms',
        'slow': '300ms',
        'slower': '500ms',
      },
      
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'ease-in': 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
        'ease-in-out': 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        'ease-bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      
      backdropBlur: {
        'xs': '2px',
      },
      
      screens: {
        'xs': '475px',
      },
    }
  },
  plugins: [],
}

export default config
