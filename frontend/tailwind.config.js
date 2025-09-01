/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purple :{
          300: "#5046E3",
          600: "#E1E6FF"
        }
      }
    },
  },
  plugins: [],
}

