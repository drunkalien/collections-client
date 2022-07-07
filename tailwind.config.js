/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    content: {},
    extend: {
      colors: {
        black: "#1C1C1C",
        gray: "#C2C2C2",
        green: "#52E09C",
        red: "#E84B5E",
        yellow: "#F2C143",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
