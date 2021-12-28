const defaultTheme = require("tailwindcss/defaultTheme");
const windmill = require("@windmill/react-ui/config");

module.exports = windmill({
  purge: ["src/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        bottom:
          "0 5px 6px -7px rgba(0, 0, 0, 0.6), 0 2px 4px -5px rgba(0, 0, 0, 0.06)",
      },
    },
    colors: {
      lime: {
        50: "#f7fee7",
        100: "#ecfccb",
        200: "#d9f99d",
        300: "#bef264",
        400: "#a3e635",
        500: "#84cc16",
        600: "#65a30d",
        700: "#4d7c0f",
        800: "#3f6212",
        900: "#365314",
      },
    },
  },
  variants: {
    extend: {
      ringColor: ["focus"],
      ringOpacity: ["focus"],
      ringOffsetWidth: ["focus"],
      ringOffsetColor: ["focus"],
    }
  }
});
