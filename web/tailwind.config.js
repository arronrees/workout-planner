/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layout/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '500px',
      },
    },
    colors: {
      blue: {
        dark: {
          'x-dark': '#D9E3EF',
          dark: '#DDE6F2',
          DEFAULT: '#262D3F',
        },
        light: {
          'x-dark': '#D9E3EF',
          dark: '#DDE6F2',
          DEFAULT: '#E4ECF9',
        },
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
        dark: '#EBA4A4',
        'x-dark': '#DF9D9D',
      },
      orange: {
        'x-dark': '#F0D795',
        dark: '#F5E0A9',
        DEFAULT: '#FCEABC',
      },
      grey: {
        DEFAULT: '#868686',
        light: '#F0F0F0',
        'x-light': '#F8F8F8',
      },
    },
    fontFamily: {
      sans: ['Sora', 'sans-serif'],
    },
  },
  plugins: [],
};
