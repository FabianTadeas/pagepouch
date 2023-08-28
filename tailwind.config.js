/** @type {import('tailwindcss').Config} */
export default {
  darkMode:"class",
  content: [
    "./src/newtab/index.html",
    "./src/newtab/**/*.{svelte,js,ts,jsx,tsx}",
    "./src/popup/index.html",
    "./src/popup/**/*.{svelte,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "rgb(var(--accent) / <alpha-value>)",
      },
    },
    fontFamily: {
      "sans": ["Cantarell-Regular"],
      "sans-bold": ["Cantarell-Bold"],
      "sans-italic": ["Cantarell-Italic"],
      "sans-italic-bold": ["Cantarell-BoldItalic"],
    },
  },
  plugins: [],
};
