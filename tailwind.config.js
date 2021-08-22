const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      theme_blue: '#464660',
      theme_green: '#368B85',
      theme_eagle: '#B4B897',
      theme_dawn_pink: '#F1E9E5',
      white: colors.white,
      black: colors.black,
    },
    fontFamily: {
      primary: ['Montserrat', 'DejaVu Sans', 'Verdana', 'sans‑serif'],
      secondary: ['Lato', 'Avenir', 'Adobe Heiti Std', 'Segoe UI', 'Trebuchet MS', 'sans‑serif'],
      heading: ['Red Hat Display', 'sans-serif']
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
