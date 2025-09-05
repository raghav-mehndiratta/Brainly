/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: {
          300: "#5046E3",
          600: "#E1E6FF"
        },
      },
      screens: {
        'xs': '375px',   // custom breakpoint
        'sm': '640px',   // Small screens (mobile)
        'md': '768px',   // Medium screens (tablet)
        'lg': '1024px',  // Large screens (laptop)
        'xl': '1280px',  // Extra large screens (desktop)
        '2xl': '1536px', // 2X large screens (big monitors)
      },
    },
  },
  plugins: [],
}
