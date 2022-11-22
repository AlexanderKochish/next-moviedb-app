/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily:{
      logo:['Satisfy', 'cursive'],
      roboto:['Roboto','ui-sans-serif']
    }
  },
  plugins: [
    require('tailwindcss-textshadow'),
    require("tailwindcss-scrollbar"),
    require('tailwind-scrollbar-hide')
  ],
}
