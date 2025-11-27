/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f2f9e9',
          100: '#e1f2cc',
          200: '#c5e6a0',
          300: '#9ed46b',
          400: '#76bd3d',
          500: '#569c26',
          600: '#4b7916', // iHerb Green
          700: '#3a5e15',
          800: '#314b16',
          900: '#2a3f16',
        },
        accent: {
          400: '#f4d03f', // iHerb Yellow
          500: '#f1c40f',
        },
        slate: {
          850: '#1e293b',
        }
      }
    },
  },
  plugins: [],
}