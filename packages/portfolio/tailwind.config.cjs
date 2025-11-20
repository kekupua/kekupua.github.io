export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#19647e",
          50: "#eef7f9",
          100: "#d5ebf0",
          200: "#afdbe5",
          300: "#7cc3d4",
          400: "#4fa4bd",
          500: "#2f88a4",
          600: "#19647e",
          700: "#175268",
          800: "#184557",
          900: "#173a49",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      animation: {
        "fade-in-up": "fadeInUp 0.3s ease-out forwards",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
