/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Cinzel", "serif"],
        body: ["Inter", "sans-serif"],
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
      },

      animation: {
        fadeIn: "fadeIn 1s ease-out forwards",
        blink: "blink 1.4s step(1) infinite",
        "bounce-slow": "bounce 2.5s infinite",
        shadowBounce: "shadowBounce 2.5s infinite",
        fadeIn: "fadeIn 1.2s ease-out forwards",
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide'),],
};
{import('tailwindcss').Config}