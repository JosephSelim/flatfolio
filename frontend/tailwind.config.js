// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    './src/app/globals.css'
  ],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '100%',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
