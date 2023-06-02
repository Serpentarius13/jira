/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        // ПЯТЬДЕСЯТ ОТТЕНКОВ СЕРОГО 😾
        lightblue: "#7CABE3",
        lightgray: "#D5DCE5",

        "lighest-gray": "#F0F3F8",

        gray: "#7D8CA1",
        "medium-gray": "#71747C",
        "medium-light-gray": " #D2DAE4",

        "dark-gray": "#38393D",
        "grayish-white": "#E5E9EF",
        fwhite: "#F5F5F5",
        bgray: "#BAC4D0",
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
      big: ["2rem", { lineHeight: "2.4rem" }],
      "h-small": ["3.2rem", { lineHeight: "3.9rem" }],
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "& > *");
    },
  ],
};
