/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      colors: {
        'luxury-gold': '#C9A961',
        'luxury-dark': '#1a1a1a',
        'luxury-gray': '#f5f5f5',
      },
    },
  },
  plugins: [],
}
