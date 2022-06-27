/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wmsPink: '#c171f2',
        wmsLightPink: '#cf8ff5',
        wmsPurple: '#61377a',
        wmsGrey: '#4b4848',
      }
    },
  },
  plugins: [],
}
