/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        base:{
          primary: "#c2ff05",
          dark : "#131517",
          superdark: '#0b0d0e',
          lightdark : '#171a1c'
        }
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true })
  ],
  variants: {
    scrollbar: ['rounded']
  }
}