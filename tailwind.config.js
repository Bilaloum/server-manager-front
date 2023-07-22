/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  important:true,
  content: [
    "./src/**/*.{html,scss,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-teal": "#176B87",
        "light-mint": "#64CCC5",
        "light-sea": "#DAFFFB",
        "black": "#001C30"

      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}

