import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Custom spacing values not covered by default Tailwind scale
      spacing: {
        '18': '4.5rem', // 72px - Custom header height
        '88': '22rem',  // 352px - Custom large container width
      },
      
      // Custom font sizes for specific use cases
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
      
      // Custom animations for the app
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'success-pulse': 'successPulse 0.6s ease-out',
        'shake': 'shake 0.5s ease-in-out',
      },
      
      // Custom keyframes
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
      
      // Custom box shadows
      boxShadow: {
        'core': '0 2px 4px var(--alpha)(var(--color-core-orange-500) / 20%)',
        'core-lg': '0 4px 8px var(--alpha)(var(--color-core-orange-500) / 30%)',
        'core-dark': '0 2px 8px var(--alpha)(var(--color-core-orange-500) / 20%)',
        'sm-dark': '0 1px 2px rgba(0, 0, 0, 0.3)',
        'md-dark': '0 4px 8px rgba(0, 0, 0, 0.4)',
        'lg-dark': '0 8px 16px rgba(0, 0, 0, 0.5)',
      },
      
      // Custom transition durations
      transitionDuration: {
        'fast': '150ms',
        'normal': '200ms',
        'slow': '300ms',
        'slower': '500ms',
      },
      
      // Custom transition timing functions
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'ease-in': 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
        'ease-in-out': 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        'ease-bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      
      // Additional backdrop blur options
      backdropBlur: {
        'xs': '2px',
      },
      
      // Additional screen sizes
      screens: {
        'xs': '475px',
      },
    }
  },
  plugins: [],
}

export default config
