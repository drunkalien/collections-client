/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    content: {},
    extend: {
      screens: {
        sm: "100%",
      },
      colors: {
        black: "#1C1C1C",
        gray: "#C2C2C2",
        lightGray: "#ddd",
        green: "#52E09C",
        red: "#E84B5E",
        yellow: "#F2C143",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
