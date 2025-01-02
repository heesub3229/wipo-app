/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        nanum: ['"NanumSquareNeo"', "sans-serif"],
        barun: ['"NanumBarunPen"', "sans-serif"],
        gummy: ['"Sour Gummy"', "sans-serif"],
        abril: ['"Abril Fatface"', "sans-serif"],
      },
      width: {
        "1/8": "12.5%",
        "1/10": "10%",
        "10vw": "10vw",
        "20vw": "20vw",
        "30vw": "30vw",
        "35vw": "35vw",
        "40vw": "40vw",
      },
      height: {
        "7vh": "7vh",
        "20vh": "20vh",
        "30vh": "30vh",
        "40vh": "40vh",
        "50vh": "50vh",
        "80vh": "80vh",
        "90vh": "90vh",
        "1/20": "5%",
        "1/15": "6%",
      },
      maxWidth: {
        "1/4": "25%",
      },
      maxHeight: {
        "4/5": "80%",
        "60vh": "60vh",
      },
      minWidth: {
        "1/6": "16.6666667%",
        "1/8": "12.5%",
        "1/10": "10%",
      },
      minHeight: {
        "1/15": "6%",
        "60vh": "60vh",
      },
      colors: {
        back: "#F7F7FA",
        inner: "#FBFBFE",
        innerHover: "#F1F2F9",
      },
      margin: {
        "7vh": "7vh",
      },
      padding: {
        "7vh": "7vh",
        "10vh": "10vh",
      },
      keyframes: {
        zoomIn: {
          "0%": { transform: "scale(0.6)", opacity: "0" },
          "25%": { transform: "scale(0.8)", opacity: "0.5" },
          "50%": { transform: "scale(1)", opacity: "1" },
          "75%": { transform: "scale(1.1)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        zoomOut: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "25%": { transform: "scale(1.1)", opacity: "1" },
          "50%": { transform: "scale(1)", opacity: "0.5" },
          "75%": { transform: "scale(0.8)", opacity: "0.5" },
          "100%": { transform: "scale(0.6)", opacity: "0" },
        },
      },
      animation: {
        zoomIn: "zoomIn 0.3s ease-out",
        zoomOut: "zoomOut 0.3s ease-in",
      },
    },
  },
  plugins: [],
};
