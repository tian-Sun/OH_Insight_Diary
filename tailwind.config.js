/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
        noto: ['"Noto Serif SC"', 'serif'],
      },
      colors: {
        primary: {
          50: '#f8f1e7',
          100: '#f2e3ce',
          200: '#e5c7a1',
          300: '#d9ab74',
          400: '#cc8f47',
          500: '#c0731a',
          600: '#9a5c15',
          700: '#744510',
          800: '#4d2e0a',
          900: '#271705',
        },
        secondary: {
          50: '#e6f7f7',
          100: '#ccefef',
          200: '#99dfdf',
          300: '#66cfcf',
          400: '#33bfbf',
          500: '#00afaf',
          600: '#008c8c',
          700: '#006969',
          800: '#004646',
          900: '#002323',
        },
        accent: {
          50: '#f7e6ed',
          100: '#efccdb',
          200: '#df99b7',
          300: '#cf6693',
          400: '#bf336f',
          500: '#af004b',
          600: '#8c003c',
          700: '#69002d',
          800: '#46001e',
          900: '#23000f',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
    },
  },
  plugins: [],
};