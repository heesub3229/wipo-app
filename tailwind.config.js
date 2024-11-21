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
        "10vw": "10vw",
        "20vw": "20vw",
      },
      height: {
        "7vh": "7vh",
        "20vh": "20vh",
        "30vh": "30vh",
        "40vh": "40vh",
        "80vh": "80vh",
        "1/20": "5%",
        "1/15": "6%",
      },
      colors: {
        back: "#F7F7FA",
        calendar: "#FBFBFE",
        calendarHover: "#F1F2F9",
      },
      margin: {
        "7vh": "7vh",
      },
      padding: {
        "7vh": "7vh",
      },
    },
  },
  plugins: [],
};
