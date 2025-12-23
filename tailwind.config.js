/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#3780f6",
        "primary-dark": "#2a6ad4",
        secondary: "#ff6b6b",
        "background-light": "#f5f7f8",
        "background-dark": "#101723",
        "surface-dark": "#1e293b",
        "surface-highlight": "#2A3649",
        surface: "#223149",
        "surface-hover": "#2c3f5c",
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
      },
      animation: {
          'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
}