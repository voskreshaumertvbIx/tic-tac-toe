// tailwind.config.js
import tailwindcssTextshadow from 'tailwindcss-textshadow';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textShadow: {
        'lg': '0 10px 15px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [
    tailwindcssTextshadow,
  ],
}
