/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        facebook: {
          blue: '#1877F2',
          dark: '#166FE5',
          light: '#E7F3FF',
        },
      },
    },
  },
  plugins: [],
}
