/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Warm cream backgrounds so products pop
        cream: {
          50: '#FDFaf4',
          100: '#FBF4E9',
          200: '#F5E9D6',
          300: '#EAD7B7',
        },
        // Deep terracotta / clay — primary brand
        clay: {
          50: '#FBEAE3',
          100: '#F4C9B8',
          200: '#E59C7F',
          300: '#D6744E',
          400: '#C75B39',
          500: '#B4492C',
          600: '#963a24',
          700: '#762d1d',
        },
        // Mustard / ochre gold — accent
        ochre: {
          50: '#FDF4DD',
          100: '#FAE6B3',
          200: '#F2CF6E',
          300: '#E7B43A',
          400: '#D89B22',
          500: '#B97E16',
          600: '#946212',
        },
        // Rich indigo — depth / contrast
        indigo: {
          50: '#E8EAF3',
          100: '#C3C8E0',
          200: '#8F97C0',
          300: '#5A65A0',
          400: '#363F7A',
          500: '#2B3A67',
          600: '#212C4E',
          700: '#171E38',
        },
        // Emerald — secondary accent
        emerald: {
          50: '#E2F3F0',
          100: '#B6E0D9',
          200: '#79C5BA',
          300: '#3FA797',
          400: '#1B998B',
          500: '#14796E',
          600: '#0F5C54',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 30px -12px rgba(118, 45, 29, 0.25)',
        'card-hover': '0 22px 48px -16px rgba(118, 45, 29, 0.42)',
        glow: '0 0 0 4px rgba(216, 155, 34, 0.25)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        'fade-in': 'fade-in 0.5s ease-out both',
        'slide-in': 'slide-in 0.35s cubic-bezier(0.16, 1, 0.3, 1) both',
        'scale-in': 'scale-in 0.3s ease-out both',
        marquee: 'marquee 32s linear infinite',
      },
    },
  },
  plugins: [],
}
