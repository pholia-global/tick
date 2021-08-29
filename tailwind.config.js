const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    gridTemplateColumns: {
      'perc-50-2': '50% 1fr',
      'sidebar-15': '15rem 1fr',
      'fill-40': 'repeat(auto-fill, 10rem)',
      'fill-50': 'repeat(auto-fill, 20rem)',
    },
    colors: {
      theme_blue: '#464660',
      theme_green: '#368B85',
      theme_eagle: '#B4B897',
      theme_dawn_pink: {
        light: '#F1E9E580',
        DEFAULT: '#F1E9E5',
      },
      white: colors.white,
      black: {
        forty_op: '#00000066',
        fifty_op: '#00000080',
        sixty_op: '#00000099',
        DEFAULT: colors.black,
      },
      green: colors.green,
      red: colors.red,
      yellow: colors.yellow,
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
