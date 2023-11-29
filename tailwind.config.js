/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('postcss-nesting'), // Ensure this is before Tailwind CSS
    require('tailwindcss'),
    // ...other plugins
  ],
}