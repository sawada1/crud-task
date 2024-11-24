/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],  
  theme: {
    extend: {
      colors: {
        "primary": "#00668A",
        "secondary": "#004E71",
      },
      container: {
        padding: "2rem",
        center: true,
      },
      screens: {
        sm: "640px",
        md: "768px",
      },
    },
  },
  plugins: [],
}

