/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        nanum: ['"NanumSquareNeo"', "sans-serif"],
        gummy: ['"Sour Gummy"', "sans-serif"],
      },
      width: {
        "1/8": "12.5%",
        "1/10": "10%",
      },
      height: {
        header: "7vh",
        "1/20": "5%",
      },
      colors: {
        back: "#F7F7FA",
      },
    },
  },
  plugins: [],
};
