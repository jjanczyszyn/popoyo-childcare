/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#F7F2EA",
        sand: "#E8DDC9",
        clay: "#C58F73",
        clayDeep: "#A56F54",
        espresso: "#3A2A1F",
        sage: "#7E8E76",
        sageDeep: "#5C6B55",
        ocean: "#7B96A6",
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
      maxWidth: {
        prose: "68ch",
      },
    },
  },
  plugins: [],
};
