/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fbf9f0',
          100: '#f5f0db',
          200: '#ebe2bf',
          300: '#e0d4a3',
          400: '#c2b280', // Ecru / Muted Gold
          500: '#a39466',
          600: '#857850',
          700: '#665c3d',
          800: '#47402a',
          900: '#292518',
        },
        dark: {
          bg: '#050505', // Deeper black
          card: '#121212',
          text: '#ffffff',
          muted: '#a3a3a3',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'], // Adding a serif font for luxury feel
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'gold': '0 0 20px rgba(194, 178, 128, 0.3)',
        'gold-hover': '0 0 30px rgba(194, 178, 128, 0.5)',
        'gold-sm': '0 0 15px rgba(194, 178, 128, 0.4)',
        'gold-light': '0 0 20px rgba(194, 178, 128, 0.1)',
      },
      dropShadow: {
        'gold': '0 0 10px rgba(194, 178, 128, 0.3)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        width: {
          '0%': { width: '0' },
          '100%': { width: '5rem' }, // 20 * 0.25rem = 5rem
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-out forwards',
        width: 'width 1s ease-out forwards',
      },
    },
  },
  plugins: [],
}
