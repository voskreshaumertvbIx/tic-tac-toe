/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        'custom-green': '0 0 5px #39FF14, 0 0 10px #39FF14, 0 0 15px #39FF14',
        'custom-pink': '0 0 5px #FF69B4, 0 0 10px #FF69B4'
    },
  },
  plugins: [],
}
}
