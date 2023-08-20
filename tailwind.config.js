/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/newtab/index.html",
    "./src/newtab/**/*.{svelte,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      "sans": ["Cantarell-Regular"],
      "sans-bold": ["Cantarell-Bold"],
      "sans-italic": ["Cantarell-Italic"],
      "sans-italic-bold": ["Cantarell-BoldItalic"],
    },
  },
  plugins: [],
}

