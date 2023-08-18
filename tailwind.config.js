/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{svelte,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      "sans": ["Cantarell-Regular"],
      "sans-bold": ["Cantarell-Bold"],
      "sans-italic": ["Cantarell-Italic"],
      "sans-italic-bold": ["Cantarell-BoldItalic"],
      "tabler-icons": ["tabler-icons"],
    },
  },
  plugins: [],
}

