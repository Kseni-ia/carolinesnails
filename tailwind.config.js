/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fbf7e3',
          100: '#f5ebc2',
          200: '#ebd68f',
          300: '#e0c05e',
          400: '#d4af37', // Metallic Gold
          500: '#b8962e',
          600: '#997b26',
          700: '#7a6120',
          800: '#5e4b1b',
          900: '#453716',
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
