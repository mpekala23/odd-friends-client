const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [defaultTheme.fontFamily.mono],
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
