/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '500px',
      },
    },
    colors: {
      blue: {
        dark: '#262D3F',
        light: '#E4ECF9',
      },
      green: {
        'x-dark': '#BCD59E',
        dark: '#C5DEA5',
        DEFAULT: '#D0EBAE',
        light: '#E5F3D3',
        'x-light': '#F5F8F1',
      },
      red: {
        DEFAULT: '#F5BABA',
        light: '#FADCDC',
        'x-light': '#FBEDED',
      },
      orange: {
        DEFAULT: '#FCEABC',
      },
      grey: {
        DEFAULT: '#868686',
        light: '#F0F0F0',
      },
    },
    fontFamily: {
      sans: ['Sora', 'sans-serif'],
    },
  },
  plugins: [],
};
