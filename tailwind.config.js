/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        lightblue: "#7CABE3",
        lightgray: "#D5DCE5",
        gray: "#7D8CA1",
      },

      borderRadius: {
        smallest: "4px",
      },
    },

    fontSize: {
      small: ["1.4rem", { lineHeight: "1.7rem" }],
      smaller: ["1.3rem", { lineHeight: "1.6rem" }],
      smallest: ["1.2rem", { lineHeight: "1.5rem" }],
      medium: ["1.5rem", { lineHeight: "1.8rem" }],
    },
  },
  plugins: [],
};
