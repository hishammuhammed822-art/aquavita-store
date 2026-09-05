/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#050D12',
          800: '#0B171D',
          700: '#0F2027',
          600: '#152932',
        },
        aqua: {
          DEFAULT: '#009FE3',
          light: '#00B8E6',
          glow: '#33B5E8',
        },
        gold: {
          DEFAULT: '#D9A321',
          light: '#F0C34A',
          dark: '#B8860B',
        },
        offwhite: '#F5F5F5',
        muted: '#AAB5BA',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'bubble': 'bubble 8s ease-in infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        bubble: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '0.6' },
          '50%': { opacity: '0.3' },
          '100%': { transform: 'translateY(-200px) scale(0.5)', opacity: '0' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 30px rgba(0,159,227,0.15)' },
          '50%': { boxShadow: '0 0 60px rgba(0,159,227,0.3)' },
        },
      },
    },
  },
  plugins: [],
};
